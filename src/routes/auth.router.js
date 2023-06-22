const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const fileUpload = require('../middlewares/fileUpload.handler');
const validationHandler = require('../middlewares/validator.handler');
const validationRegisterHandler = require('../helpers/validationRegister');
const {
  changePasswordRecoverySchema, loginSchema, registerSchema, recoverySchema,
} = require('../schemas/auth.schema');
const { createProfile } = require('../services/profile.service');
const { signToken, sendRecovery, changePassword } = require('../services/auth.service');
const { getName } = require('../helpers/getNameFromUrl');

const router = express.Router();

router.post(
  '/login',
  validationHandler(loginSchema, 'user'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      // req.user it's only aviable with an auth middleware.
      const result = await signToken(req.user);
      console.log(req.user);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/recovery',
  validationHandler(recoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await sendRecovery(email);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/change-password-recovery',
  validationHandler(changePasswordRecoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const respuesta = await changePassword(token, newPassword);
      res.status(201).json(respuesta);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/register',
  fileUpload.single('photo'),
  async (req, res, next) => {
    try {
      let objToJson = JSON.stringify(req.body);
      objToJson = JSON.parse(objToJson);

      const resultVal = validationRegisterHandler(registerSchema, objToJson);

      if (resultVal === true) {
        const file = req.file?.location || 'empty';
        const fileName = getName(file);
        objToJson.photoName = fileName;
        objToJson.photoUrl = file;
        const newUser = await createProfile(objToJson);
        res.status(201).json(newUser);
      } else {
        throw boom.badRequest(resultVal);
      }
    } catch (err) {
      next(err);
    }
  },
);

// un-comment renew-token if you want it
/*
router.get(
  '/renew-token',
  passport.authenticate('jwt', {session: false}),
  async(req, res, next) => {
    try {
      const { sub } = req.user;
      const result = await renewToken(sub);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);
*/

module.exports = router;
