const Joi = require('joi');

// data for queries
const fullName = Joi.string().max(130);
const limit = Joi.number().max(40);
const offset = Joi.number().min(0);
const startDate = Joi.string().max(24);
const endDate = Joi.string().max(24);
const email = Joi.string().email();

const firstName = Joi.string().max(65);
const lastName = Joi.string().max(65);
const dni = Joi.string().max(8).min(8);
const phoneNumber = Joi.string().max(15);
const photoName = Joi.string();
const photoUrl = Joi.string();
const birthDate = Joi.date();
const sex = Joi.string().max(15);
const address = Joi.string().max(85);

const updateProfileSchema = Joi.object({
  firstName: firstName.optional(),
  lastName: lastName.optional(),
  dni: dni.optional(),
  phoneNumber: phoneNumber.optional(),
  photoName: photoName.optional(),
  photoUrl: photoUrl.optional(),
  birthDate: birthDate.optional(),
  sex: sex.optional(),
  address: address.optional(),
});

const listProfilesSchema = Joi.object({
  fullName: fullName.optional(),
  limit: limit.optional(),
  offset: offset.optional(),
  startDate: startDate.optional(),
  endDate: endDate.optional(),
  email: email.optional(),
  sex: sex.optional(),
});

module.exports = {
  updateProfileSchema,
  listProfilesSchema,
};
