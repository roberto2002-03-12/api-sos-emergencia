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

// other auths
const token = Joi.string();

const registerSchema = Joi.object({
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
});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoverySchema = Joi.object({
  email: email.required(),
});

const changePasswordRecoverySchema = Joi.object({
  token: token.required(),
  newPassword: password.required(),
});

const changePasswordSchema = Joi.object({
  password: password.required(),
});

module.exports = {
  loginSchema,
  registerSchema,
  recoverySchema,
  changePasswordRecoverySchema,
  changePasswordSchema,
};
