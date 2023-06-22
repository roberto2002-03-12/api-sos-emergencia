const boom = require('@hapi/boom');

function checkRole(...roles) {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < req.user.role.length; i++) {
      if (roles.includes(req.user.role[i])) {
        return next();
      }
    }
    // eslint-disable-next-line quotes
    next(boom.unauthorized(`You don't have credentials`));
  };
}

module.exports = {
  checkRole,
};
