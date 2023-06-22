const { BLACK_TOKEN_TABLE, BlackTokenSchema } = require('../models/black_token.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(BLACK_TOKEN_TABLE, 'token', BlackTokenSchema.token);
  },
};
