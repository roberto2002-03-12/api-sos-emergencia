const { Strategy } = require('passport-local');
const { getUser } = require('../../../services/auth.service');

const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await getUser(email, password);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  },
);

module.exports = LocalStrategy;
