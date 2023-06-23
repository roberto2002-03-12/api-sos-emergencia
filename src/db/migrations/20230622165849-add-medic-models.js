const { CERTIFICATION_TABLE, CertificationSchema } = require('../models/certification.model');
const { MedicSchema, MEDIC_TABLE } = require('../models/medic.model');
const { MEDIC_UNIVERSITY_TABLE, MedicUniversitySchema } = require('../models/medic_university.model');
const { SPECIALITY_TABLE, SpecialitySchema } = require('../models/speciality.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SPECIALITY_TABLE, SpecialitySchema);
    await queryInterface.createTable(MEDIC_UNIVERSITY_TABLE, MedicUniversitySchema);
    await queryInterface.createTable(MEDIC_TABLE, MedicSchema);
    await queryInterface.createTable(CERTIFICATION_TABLE, CertificationSchema);
  },
};
