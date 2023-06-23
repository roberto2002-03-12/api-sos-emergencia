const { MEDIC_TABLE, MedicSchema } = require('../models/medic.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(MEDIC_TABLE, 'profile_id', MedicSchema.profileId);
  },
};
