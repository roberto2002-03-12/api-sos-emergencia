const { USER_TABLE, UserSchema } = require('../models/user.model');
const { ROLE_TABLE, RoleSchema } = require('../models/role.model');
const { USER_ROLE_TABLE, UserRoleSchema } = require('../models/user_role.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(ROLE_TABLE, RoleSchema);
    await queryInterface.createTable(USER_ROLE_TABLE, UserRoleSchema);
  },
};
