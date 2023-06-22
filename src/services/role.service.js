const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { getUserById } = require('./user.service');

const getRoleById = async (id) => {
  const role = await models.Role.findByPk(id);

  if (!role) throw boom.notFound('Role not found');

  return role;
};

const getRoles = async () => {
  const listRoles = await models.Role.findAll();

  return listRoles;
};

const createRole = async (obj) => {
  const roleToCreate = await models.Role.create(obj);

  return roleToCreate;
};

const updateRole = async (id, obj) => {
  const roleToUpdate = await getRoleById(id);

  await roleToUpdate.update(obj);

  return 'role updated';
};

const addRoleToUser = async (body) => {
  const userWhoAssigned = await getUserById(body.idWhoAssigned);
  // This method alredy has "not found" error, so you don't need to add it here.
  await getUserById(body.userId);
  await getRoleById(body.roleId);

  const roleAssigned = await models.UserRole.create({
    userId: body.userId,
    roleId: body.roleId,
    assignedBy: userWhoAssigned.dataValues.email,
  });

  return roleAssigned;
};

const deleteRoleAssigned = async (idUserRole) => {
  const roleAssigned = await models.UserRole.findByPk(idUserRole);

  await roleAssigned.destroy();

  return 'role assigned deleted';
};

module.exports = {
  getRoleById,
  getRoles,
  createRole,
  updateRole,
  addRoleToUser,
  deleteRoleAssigned,
};
