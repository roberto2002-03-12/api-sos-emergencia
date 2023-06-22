const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setUpModels = require('../db/models/index');

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false,
    },
  },
);

setUpModels(sequelize);

module.exports = sequelize;
