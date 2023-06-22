const express = require('express');
const passport = require('passport');
const validationHandler = require('../middlewares/validator.handler');
const checkTokenBlack = require('../middlewares/token-valid.handler');
const { checkRole } = require('../middlewares/auth.handler');
const { addRoleToSomeOneSchema } = require('../schemas/role.schema');
const {
  getRoles, createRole, addRoleToUser, deleteRoleAssigned,
} = require('../services/role.service');

const router = express.Router();

// use this only in dev, in production roles should be alredy created.
router.post(
  '/',
  async (req, res, next) => {
    try {
      const result = await createRole(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  checkTokenBlack(),
  async (req, res, next) => {
    try {
      const result = await getRoles();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/add-role-to-user',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  validationHandler(addRoleToSomeOneSchema, 'body'),
  checkTokenBlack(),
  async (req, res, next) => {
    try {
      const result = await addRoleToUser(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  '/delete-role-to-user/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  checkTokenBlack(),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteRoleAssigned(id);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
