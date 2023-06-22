const Joi = require('joi');

const userId = Joi.string().uuid();
const roleId = Joi.string().uuid();
const idWhoAssigned = Joi.string().uuid();
const roleName = Joi.string().max(85);
const description = Joi.string().max(700);

const addRoleToSomeOneSchema = Joi.object({
  userId: userId.required(),
  roleId: roleId.required(),
  idWhoAssigned: idWhoAssigned.required(),
});

const createRoleSchema = Joi.object({
  roleName: roleName.required(),
  description: description.required(),
});

module.exports = {
  addRoleToSomeOneSchema,
  createRoleSchema,
};
