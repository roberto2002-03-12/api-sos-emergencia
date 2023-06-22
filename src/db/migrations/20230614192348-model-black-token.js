const { BlackTokenSchema, BLACK_TOKEN_TABLE } = require('../models/black_token.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(BLACK_TOKEN_TABLE, BlackTokenSchema);
  },
};
