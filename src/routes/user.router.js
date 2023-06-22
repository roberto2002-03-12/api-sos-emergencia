const express = require('express');
const passport = require('passport');
const validationHandler = require('../middlewares/validator.handler');
const { changePasswordSchema, changeStatusSchema } = require('../schemas/user.schema');
const { checkRole } = require('../middlewares/auth.handler');
const {
  updateUser, deleteUser, changePassword, getUsers,
} = require('../services/user.service');

const router = express.Router();

router.patch(
  '/change-password',
  passport.authenticate('jwt', { session: false }),
  validationHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      const result = await changePassword(sub, req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/update-desactivated-status/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validationHandler(changeStatusSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await updateUser(id, req.body);
      res.status(201).json('user status updated');
    } catch (err) {
      next(err);
    }
  },
);

// use this if you want
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteUser(id);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/',
  async (req, res, next) => {
    try {
      const result = await getUsers();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
