const { UserRoleSchema, USER_ROLE_TABLE } = require('../models/user_role.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_ROLE_TABLE, 'user_email', UserRoleSchema.userEmail);
    await queryInterface.addColumn(USER_ROLE_TABLE, 'role_name', UserRoleSchema.roleName);
  },
};
