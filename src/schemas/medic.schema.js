const Joi = require('joi');

// login
const email = Joi.string().email().max(85);
const password = Joi.string().max(32);

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

const description = Joi.string().max(1000);
const certification_code = Joi.string().max(255);
const photoUrlCertification = Joi.string();
const photoCertification = Joi.string();
const specialityId = Joi.string().uuid();
const universityId = Joi.string().uuid();

const registerAsMedic = Joi.object({
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
    certification_code: certification_code.required(),
    photoUrlCertification: photoUrlCertification.required(),
    photoCertification: photoCertification.required(),
    specialityId: specialityId.optional(),
    universityId: universityId.optional(),
  }),
});

module.exports = {
  registerAsMedic
}
