const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const upload = require('../middlewares/fileUpload.handler');
const validationHandler = require('../middlewares/validator.handler');
const validationUpdateHandler = require('../helpers/validationRegister');
const checkTokenBlack = require('../middlewares/token-valid.handler');
const { checkRole } = require('../middlewares/auth.handler');
const { updateProfileSchema, listProfilesSchema } = require('../schemas/profile.schema');
const {
  getProfiles, updateProfile,
} = require('../services/profile.service');

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  validationHandler(listProfilesSchema, 'query'),
  checkRole('admin'),
  checkTokenBlack(),
  async (req, res, next) => {
    try {
      const result = await getProfiles(req?.query);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  '/update-profile',
  passport.authenticate('jwt', { session: false }),
  upload.single('photo'),
  async (req, res, next) => {
    try {
      const { sub } = req.user;
      let objToJson = JSON.stringify(req.body);

      objToJson = JSON.parse(objToJson);

      if (!req.file) delete objToJson.photo;

      const resultVal = validationUpdateHandler(updateProfileSchema, objToJson);

      if (resultVal === true) {
        const file = req.file?.location || 'empty';
        const fileName = req.file?.key || 'empty';
        objToJson.photoName = fileName;
        objToJson.photoUrl = file;
        const updateUser = await updateProfile(sub, objToJson);
        res.status(201).json(updateUser);
      } else {
        throw boom.badRequest(resultVal);
      }
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
