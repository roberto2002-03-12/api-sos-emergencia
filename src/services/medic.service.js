const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');
const { getUserByEmail } = require('./user.service');
const { sendMail } = require('./auth.service');
const { deleteObjectsFromAWS } = require('../helpers/deleteAWSObjects');
const { config } = require('../config/config');

const getListMedics = async (query, active) => {
  const options = {
    include: [
      {
        model: models.Profile,
        as: 'profile',
        where: {},
        attributes: {
          exclude: ['userId', 'user_id'],
        },
        include: [
          {
            model: models.User,
            as: 'user',
            where: {
              activated: active,
            },
            attributes: {
              exclude: ['password', 'recoveryToken', 'loggedToken'],
            },
          },
        ],
      },
      'speciality',
      'university',
    ],
    attributes: {
      exclude: ['profileId', 'profile_id', 'speciality_id', 'university_id', 'specialityId', 'universityId'],
    },
    where: {},
    offset: 0,
    limit: 20,
  };

  const {
    offset, limit, dateStart, dateEnd, order,
    fullName, email, speciality, university,
  } = query || {};

  if (offset) options.offset = parseInt(offset, 10);
  if (limit) options.limit = parseInt(limit, 10);

  if (fullName) {
    options.include[0].where = Sequelize.where(
      Sequelize.fn('concat', Sequelize.col('first_name'), ' ', Sequelize.col('last_name')),
      {
        [Op.like]: `%${fullName}%`,
      },
    );
  }

  if (email) {
    options.include[0].include[0].where = Sequelize.and(
      options.include[0].include[0].where,
      {
        email: {
          [Op.like]: `%${email}%`,
        },
      },
    );
  }

  if (order) {
    options.order = [
      [
        'createdAt',
        order === 'asc' ? 'ASC' : 'DESC',
      ],
    ];
  }

  if (dateStart && dateEnd) {
    options.where.createdAt = {
      [Op.between]: [dateStart, dateEnd],
    };
  }

  if (dateStart && !dateEnd) {
    options.where.createdAt = {
      [Op.gte]: dateStart,
    };
  }

  if (dateEnd && !dateStart) {
    options.where.createdAt = {
      [Op.lte]: dateEnd,
    };
  }

  if (speciality) options.where.specialityId = speciality;

  if (university) options.where.universityId = university;

  const listMedics = await models.Medic.findAll(options);

  return listMedics;
};

const createMedic = async (obj) => {
  let transaction;

  try {
    if (obj.medic.photoUrlCertification === 'empty') throw boom.badRequest('Certification is required');

    transaction = await sequelize.transaction();

    const user = await getUserByEmail(obj.user.email);

    if (user !== null) throw boom.unauthorized('Email has been registered');

    const hash = await bcrypt.hash(obj.user.password, 10);

    const finalData = {
      ...obj,
      user: {
        ...obj.user,
        password: hash,
        activated: 0,
        loggedToken: 'not authenticated yet',
      },
    };

    const profile = await models.Profile.create(finalData, {
      include: ['user', 'medic'],
      transaction,
    });

    await transaction.commit();

    delete profile.dataValues.user.dataValues.password;
    delete profile.dataValues.user_id;
    delete profile.dataValues.userId;

    return profile;
  } catch (err) {
    if (transaction) await transaction.rollback();
    if (obj.photoName !== 'empty' && obj.medic.photoCertification !== 'empty') {
      await deleteObjectsFromAWS([obj.photoName, obj.medic.photoCertification]);
    }
    throw err;
  }
};

const selectMedic = async (id) => {
  const medic = await models.Medic.findByPk(id, {
    include: [
      {
        model: models.Medic,
        as: 'profile',
        attributes: {
          exclude: ['userId', 'user_id'],
        },
        include: [
          {
            model: models.User,
            as: 'user',
            attributes: {
              exclude: ['password', 'recoveryToken', 'loggedToken'],
            },
          },
        ],
      },
      'speciality',
      'university',
    ],
  });

  if (!medic) throw boom.notFound('Medic not found');

  return medic;
};

const acceptMedic = async (id, sub) => {
  const medic = await models.User.findByPk(id);

  if (!medic) throw boom.notFound('Medic not found');

  const role = await models.Role.findOne({
    where: {
      roleName: 'medic',
    },
  });

  if (!role) throw boom.notFound('Role not found');

  const userWhoAccepted = await models.User.findByPk(sub);

  if (!userWhoAccepted) throw boom.notFound('User not found, how you did it?');

  await models.UserRole.create({
    userId: id,
    roleId: role.dataValues.idRol,
    assignedBy: userWhoAccepted.dataValues.email,
  });

  await medic.update({
    activated: true,
  });

  const emailInfo = {
    from: config.emailRecype,
    to: `${medic.dataValues.email}`,
    subject: 'Has sido aceptado para formar parte del equipo médico',
    text: `Usted a sido aceptado para estar en la plataforma, hemos validado sus datos y son genuinos,
    gracias por ser parte del equipo, podrá salvar y/o ayudar a varias personas,
    ya puede iniciar sesión`,
  };

  await sendMail(emailInfo);

  return 'Medic activated. An email and notification have send.';
};

module.exports = {
  createMedic,
  getListMedics,
  acceptMedic,
  selectMedic,
};
