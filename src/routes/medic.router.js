const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const fileUpload = require('../middlewares/fileUpload.handler');
const validationRegisterHandler = require('../helpers/validationRegister');
const { registerAsMedicSchema } = require('../schemas/medic.schema');
const { createMedic, checkMedicStatus } = require('../services/medic.service');
const { checkRole } = require('../middlewares/auth.handler');
const checkTokenBlack = require('../middlewares/token-valid.handler');

const router = express.Router();

router.post(
  '/register-as-medic',
  fileUpload.fields(
    [
      {
        name: 'photo',
        maxCount: 1,
      },
      {
        name: 'certification',
        maxCount: 1,
      },
    ],
  ),
  async (req, res, next) => {
    try {
      let objToJson = JSON.stringify(req.body);
      objToJson = JSON.parse(objToJson);

      const resultVal = validationRegisterHandler(registerAsMedicSchema, objToJson);
      if (resultVal === true) {
        objToJson.photoName = req.files.photo[0]?.key || 'empty';
        objToJson.photoUrl = req.files.photo[0]?.location || 'empty';
        objToJson.medic.photoUrlCertification = req.files.certification[0]?.location || 'empty';
        objToJson.medic.photoCertification = req.files.certification[0]?.key || 'empty';

        const result = await createMedic(objToJson);
        res.status(201).json(result);
      } else {
        throw boom.badRequest(resultVal);
      }
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/pending-medics',
  passport.authenticate('jwt', { session: false }),
  checkRole('admin'),
  checkTokenBlack(),
  async (req, res, next) => {
    try {
      const result = await checkMedicStatus(req?.query, false);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
