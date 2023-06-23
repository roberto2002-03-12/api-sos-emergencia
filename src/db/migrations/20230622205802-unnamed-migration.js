const { MEDIC_TABLE, MedicSchema } = require('../models/medic.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(MEDIC_TABLE, 'university_id', MedicSchema.universityId);
  },
};
