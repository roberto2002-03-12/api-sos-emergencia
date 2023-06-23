require('dotenv').config();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { awsS3Client } = require('../config/configS3');
const sequelize = require('../libs/sequelize');
const { getUserByEmail } = require('./user.service');

const checkMedicStatus = async (query) => {
  const options = {
    include: [
      {
        model: models.Profile,
        as: 'profile',
        where: {},
        include: [
          {
            model: models.User,
            as: 'user',
            where: {},
          },
        ],
      },
    ],
  };

  const listMedics = await models.Medic.findAll(options);

  return listMedics;
};

const createMedic = async (obj) => {
  let transaction;

  try {
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
    if (transaction) await transaction.rollBack();
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
    // ToDo delete certification
    throw err;
  }
};

module.exports = {
  createMedic,
  checkMedicStatus,
};
