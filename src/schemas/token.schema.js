const Joi = require('joi');

const idUser = Joi.string().uuid();
const bannedTo = Joi.string().max(75);
const addedBy = Joi.string().max(75);
const startDate = Joi.string().max(24);
const endDate = Joi.string().max(24);

const addBlackTokenSchema = Joi.object({
  idUser: idUser.required(),
});

const getTokenSchemaQuery = Joi.object({
  userBanned: bannedTo.optional(),
  whoBanned: addedBy.optional(),
  startDate: startDate.optional(),
  endDate: endDate.optional(),
});

module.exports = {
  addBlackTokenSchema,
  getTokenSchemaQuery,
};
