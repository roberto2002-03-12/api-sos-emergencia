const Joi = require('joi');

const userId = Joi.string().uuid();
const roleId = Joi.string().uuid();
const roleName = Joi.string().max(85);
const description = Joi.string().max(700);

// queries
const userEmail = Joi.string().max(85);
const assignedBy = Joi.string().max(85);
const order = Joi.string().valid('asc', 'desc');
const limit = Joi.number().max(40);
const offset = Joi.number().min(0);
const dateStart = Joi.date();
const dateEnd = Joi.date();

const addRoleToSomeOneSchema = Joi.object({
  userId: userId.required(),
  roleId: roleId.required(),
});

const createRoleSchema = Joi.object({
  roleName: roleName.required(),
  description: description.required(),
});

const listRolesAssignedSchema = Joi.object({
  userEmail: userEmail.optional(),
  assignedBy: assignedBy.optional(),
  roleName: roleName.optional(),
  order: order.optional(),
  limit: limit.optional(),
  offset: offset.optional(),
  dateStart: dateStart.optional(),
  dateEnd: dateEnd.optional(),
});

module.exports = {
  addRoleToSomeOneSchema,
  createRoleSchema,
  listRolesAssignedSchema,
};
