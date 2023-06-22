const { USER_ROLE_TABLE, UserRoleSchema } = require('../models/user_role.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(USER_ROLE_TABLE, 'role_id', UserRoleSchema.roleId);
    await queryInterface.changeColumn(USER_ROLE_TABLE, 'user_id', UserRoleSchema.userId);
  },
};
