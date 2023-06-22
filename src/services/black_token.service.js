const boom = require('@hapi/boom');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const { getUserById } = require('./user.service');

const getBlackTokenById = async (id) => {
  const blackToken = await models.BlackToken.findByPk(id);

  if (!blackToken) throw boom.notFound('not found');

  return blackToken;
};

const getBlackTokenByToken = async (token) => {
  const blackToken = await models.BlackToken.findOne({ where: { token } });

  return blackToken;
};

const getBlackTokens = async (query) => {
  const options = {
    where: {},
    limit: 20,
    offset: 0,
  };

  const {
    userBanned, whoBanned, startDate, endDate,
  } = query || {};

  if (userBanned) {
    options.where = {
      bannedTo: userBanned,
    };
  }

  if (whoBanned) {
    options.where = Sequelize.and(options.where, { addedBy: whoBanned });
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    options.where = Sequelize.and(
      options.where,
      {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
    );
  }

  if (startDate && endDate === undefined) {
    const start = new Date(startDate);
    options.where = Sequelize.and(
      options.where,
      {
        createdAt: {
          [Op.gte]: start,
        },
      },
    );
  }

  if (endDate && startDate === undefined) {
    const end = new Date(endDate);
    options.where = Sequelize.and(
      options.where,
      {
        createdAt: {
          [Op.lte]: end,
        },
      },
    );
  }

  const listBlackTokens = await models.BlackToken.findAll();

  return listBlackTokens;
};

const addBlackToken = async ({ idUser }, sub) => {
  const user = await getUserById(idUser);
  const userAdmin = await getUserById(sub);

  const blackTokenToCreate = await models.BlackToken.create({
    token: user.dataValues.loggedToken,
    bannedTo: user.dataValues.email,
    addedBy: userAdmin.dataValues.email,
  });

  return blackTokenToCreate;
};

const deleteBlackToken = async (id) => {
  const blackTokenToDestroy = await getBlackTokenById(id);

  await blackTokenToDestroy.destroy();

  return 'blackToken destroyed';
};

module.exports = {
  getBlackTokenById,
  getBlackTokens,
  addBlackToken,
  deleteBlackToken,
  getBlackTokenByToken,
};
