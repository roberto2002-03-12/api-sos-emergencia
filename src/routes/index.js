const express = require('express');
const userRouter = require('./user.router');
const roleRouter = require('./role.router');
const profileRouter = require('./profile.router');
const authRouter = require('./auth.router');
const tokenRouter = require('./black_token.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/user', userRouter);
  router.use('/role', roleRouter);
  router.use('/profile', profileRouter);
  router.use('/auth', authRouter);
  router.use('/token', tokenRouter);
}

module.exports = routerApi;
