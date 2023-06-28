const Joi = require('joi');

const idUser = Joi.string().uuid();

// register
const firstName = Joi.string().max(65);
const lastName = Joi.string().max(65);
const dni = Joi.string().max(8).min(8);
const phoneNumber = Joi.string().max(15);
const photoName = Joi.string();
const photoUrl = Joi.string();
const birthDate = Joi.date();
const sex = Joi.string().max(15);
const address = Joi.string().max(85);
const email = Joi.string().email().max(85);
const password = Joi.string().max(32);

const description = Joi.string().max(1000);
// eslint-disable-next-line camelcase
const certification_code = Joi.string().max(255);
const photoUrlCertification = Joi.string();
const photoCertification = Joi.string();
const specialityId = Joi.string().uuid();
const universityId = Joi.string().uuid();

// queries
const offset = Joi.string();
const limit = Joi.string().max(2);
const dateStart = Joi.date();
const dateEnd = Joi.date();
const order = Joi.string().valid('asc', 'desc');
const fullName = Joi.string().max(85);

const registerAsMedicSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  dni: dni.required(),
  phoneNumber: phoneNumber.required(),
  photoName: photoName.optional(),
  photoUrl: photoUrl.optional(),
  birthDate: birthDate.required(),
  sex: sex.required(),
  address: address.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
  medic: Joi.object({
    description: description.required(),
    // eslint-disable-next-line camelcase
    certification_code: certification_code.required(),
    photoUrlCertification: photoUrlCertification.optional(),
    photoCertification: photoCertification.optional(),
    specialityId: specialityId.required(),
    universityId: universityId.required(),
  }),
});

const getPendingMedicsSchema = Joi.object({
  offset: offset.optional(),
  limit: limit.optional(),
  dateStart: dateStart.optional(),
  dateEnd: dateEnd.optional(),
  order: order.optional(),
});

const getMedicsQueriesSchema = Joi.object({
  offset: offset.optional(),
  limit: limit.optional(),
  dateStart: dateStart.optional(),
  dateEnd: dateEnd.optional(),
  order: order.optional(),
  fullName: fullName.optional(),
  email: email.optional(),
  speciality: specialityId.optional(),
  university: universityId.optional(),
});

const getOneMedicSchema = Joi.object({
  id: idUser.required(),
});

module.exports = {
  getOneMedicSchema,
  registerAsMedicSchema,
  getPendingMedicsSchema,
  getMedicsQueriesSchema,
};
