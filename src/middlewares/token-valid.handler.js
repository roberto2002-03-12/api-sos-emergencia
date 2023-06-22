const boom = require('@hapi/boom');
const { getBlackTokenByToken } = require('../services/black_token.service');

function checkTokenBlack() {
  return async (req, res, next) => {
    const tokenBearer = req.headers.authorization;

    const token = tokenBearer.split(' ');

    const rta = await getBlackTokenByToken(token[1]);

    if (rta) next(boom.unauthorized('Token desahabilitado'));

    next();
  };
}

module.exports = checkTokenBlack;
