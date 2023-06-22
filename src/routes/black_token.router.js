const express = require('express');
const passport = require('passport');
const validationHandler = require('../middlewares/validator.handler');
const { addBlackTokenSchema } = require('../schemas/token.schema');
const { checkRole } = require('../middlewares/auth.handler');
const {
  addBlackToken, getBlackTokens, deleteBlackToken,
} = require('../services/black_token.service');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  async (req, res, next) => {
    try {
      const result = await getBlackTokens();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/ban-to-user',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validationHandler(addBlackTokenSchema, 'body'),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const result = await addBlackToken(req.body, sub);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteBlackToken(id);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
