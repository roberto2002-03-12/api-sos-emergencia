const { PROFILE_TABLE, ProfileSchema } = require('../models/profile.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PROFILE_TABLE, ProfileSchema);
  },
};
