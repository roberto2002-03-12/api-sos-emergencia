function validatorRegisterHandler(schema, values) {
  const { error } = schema.validate(values, { abortEarly: false });

  if (error) return error;

  return true;
}

module.exports = validatorRegisterHandler;
