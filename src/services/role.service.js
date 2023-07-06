const boom = require('@hapi/boom');
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
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

const listOfRelations = async (query) => {
  const options = {
    where: {},
    limit: 20,
    offset: 0,
  };

  const {
    roleName, userEmail, assignedBy, order,
    limit, offset, dateStart, dateEnd,
  } = query || {};

  if (roleName) {
    options.where = {
      roleName,
    };
  }

  if (userEmail) {
    options.where = Sequelize.and(
      options.where,
      {
        userEmail: {
          [Op.like]: `%${userEmail}%`,
        },
      },
    );
  }

  if (assignedBy) {
    options.where = Sequelize.and(
      options.where,
      {
        assignedBy: {
          [Op.like]: `%${assignedBy}%`,
        },
      },
    );
  }

  if (dateStart && dateEnd) {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    options.where = Sequelize.and(
      options.where,
      {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
    );
  }

  if (dateStart && !dateEnd) {
    const start = new Date(dateStart);
    options.where = Sequelize.and(
      options.where,
      {
        createdAt: {
          [Op.gte]: start,
        },
      },
    );
  }

  if (dateEnd && !dateStart) {
    const end = new Date(dateEnd);
    options.where = Sequelize.and(
      options.where,
      {
        createdAt: {
          [Op.lte]: end,
        },
      },
    );
  }

  if (order) {
    options.order = [
      [
        'created_at',
        order === 'asc' ? 'ASC' : 'DESC',
      ],
    ];
  }

  if (limit) options.limit = parseInt(limit, 10);
  if (offset) options.offset = parseInt(offset, 10);

  const userRoles = await models.UserRole.findAll(options);

  return userRoles;
};

const addRoleToUser = async (body, sub) => {
  const userWhoAssigned = await getUserById(sub);
  // This method alredy has "not found" error, so you don't need to add it here.
  const user = await getUserById(body.userId);
  const role = await getRoleById(body.roleId);

  const roleAssigned = await models.UserRole.create({
    userId: body.userId,
    userEmail: user.dataValues.email,
    roleId: body.roleId,
    roleName: role.dataValues.roleName,
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
  listOfRelations,
};
