const { PROFILE_TABLE, ProfileSchema } = require('../models/profile.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(PROFILE_TABLE, 'dni', ProfileSchema.dni);
  },
};
