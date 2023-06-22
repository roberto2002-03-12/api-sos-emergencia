require('dotenv').config();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { awsS3Client } = require('../config/configS3');
const sequelize = require('../libs/sequelize');
const { getUserByEmail } = require('./user.service');

const getProfileById = async (id) => {
  const profile = await models.Profile.findByPk(id);

  if (!profile) throw boom.notFound('not found');

  return profile;
};

const getProfiles = async (query) => {
  const options = {
    include: [
      {
        model: models.User,
        as: 'user',
        attributes: {
          exclude: ['password', 'recoveryToken', 'loggedToken'],
        },
        where: {},
      },
    ],
    where: {},
    limit: 20,
    offset: 20,
  };

  const {
    limit, offset, fullName,
    startDate, endDate, sex, email,
  } = query || {};

  if (fullName) {
    options.where = Sequelize.where(Sequelize.fn('concat', Sequelize.col('firstName'), ' ', Sequelize.col('lastName')), {
      [Op.like]: `%${fullName}%`,
    });
  }

  if (email) {
    options.include[0].where = {
      email: {
        [Op.like]: `%${email}%`,
      },
    };
  }

  if (sex) {
    options.where = Sequelize.and(options.where, { sex });
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    options.include[0].where = Sequelize.and(
      options.include[0].where,
      {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
    );
  }

  if (startDate && endDate === undefined) {
    const start = new Date(startDate);
    options.include[0].where = Sequelize.and(
      options.include[0].where,
      {
        createdAt: {
          [Op.gte]: start,
        },
      },
    );
  }

  if (endDate && startDate === undefined) {
    const end = new Date(endDate);
    options.include[0].where = Sequelize.and(
      options.include[0].where,
      {
        createdAt: {
          [Op.lte]: end,
        },
      },
    );
  }

  if (limit) options.limit = parseInt(limit, 10);

  if (offset) options.offset = parseInt(limit, 10);

  const listProfiles = await models.Profile.findAll(options);

  return listProfiles;
};

const createProfile = async (obj) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    // adaptarlo para cuando este en form-data
    const user = await getUserByEmail(obj.user.email);

    if (user !== null) throw boom.unauthorized('Email has been registered');

    const hash = await bcrypt.hash(obj.user.password, 10);

    const finalData = {
      ...obj,
      user: {
        email: obj.user.email,
        password: hash,
        activated: 1,
        loggedToken: 'not authenticated yet',
      },
    };

    const profile = await models.Profile.create(finalData, {
      include: ['user'],
      transaction,
    });

    // if you use code.model you should create a service about code and the next line
    // await useCode(obj.code, obj.user.email);

    await transaction.commit();

    delete profile.dataValues.user.dataValues.password;
    delete profile.dataValues.user_id;
    delete profile.dataValues.userId;

    return profile;
  } catch (err) {
    if (transaction) await transaction.rollback();
    if (obj.photoName !== 'empty') {
      try {
        await awsS3Client.deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: obj.photoName,
        });
      } catch (errS3) {
        console.log(errS3);
      }
    }
    throw err;
  }
};

const updateProfile = async (sub, obj) => {
  const profileToUpdate = await models.Profile.findOne({
    include: [{
      model: models.User,
      as: 'user',
      where: {
        idUser: sub,
      },
    }],
  });

  if (obj.photoName !== 'empty') {
    try {
      await awsS3Client.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: profileToUpdate.dataValues.photoName,
      });
    } catch (err) {
      throw boom.internal(err);
    }
  } else {
    // eslint-disable-next-line no-param-reassign
    delete obj.photoName;
    // eslint-disable-next-line no-param-reassign
    delete obj.photoUrl;
  }

  await profileToUpdate.update(obj);

  return 'profile updated';
};

const deleteProfile = async (id) => {
  const profileToDestroy = await models.Profile.findOne(id);

  await profileToDestroy.destroy();

  return 'profile destroyed';
};

module.exports = {
  getProfileById,
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
};
