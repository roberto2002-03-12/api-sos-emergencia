const Joi = require('joi');

// change-password
// /update-desactivated-status/:id

const password = Joi.string();
const activated = Joi.number().max(1).min(0);

const changePasswordSchema = Joi.object({
  password: password.required(),
});

const changeStatusSchema = Joi.object({
  activated: activated.required(),
});

module.exports = {
  changePasswordSchema,
  changeStatusSchema,
};
