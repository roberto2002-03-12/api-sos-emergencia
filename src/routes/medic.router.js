const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const fileUpload = require('../middlewares/fileUpload.handler');
const validationRegisterHandler = require('../helpers/validationRegister');
const { createMedic, checkMedicStatus } = require('../services/medic.service');
const { getName } = require('../helpers/getNameFromUrl');

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
      }
    ]
  ),
  async (req, res, next) => {
    try {
      let objToJson = JSON.stringify(req.body);
      objToJson = JSON.parse(objToJson);

      const resultVal = validationRegisterHandler(registerSchema, objToJson);

      if (resultVal === true) {
        // const file = req.file?.location || 'empty';
        // const fileName = getName(file);
        // objToJson.photoName = fileName;
        // objToJson.photoUrl = file;
        // const newUser = await createProfile(objToJson);
        // res.status(201).json(newUser);
        const photoName = req.files['photo'];
        console.log(photoName);
      } else {
        throw boom.badRequest(resultVal);
      }
      // const result = await createMedic(req.body);
      // res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/pending-medics',
  async (req, res, next) => {
    try {
      const result = await checkMedicStatus();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
