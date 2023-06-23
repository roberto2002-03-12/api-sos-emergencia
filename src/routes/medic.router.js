const express = require('express');
const { createMedic, checkMedicStatus } = require('../services/medic.service');

const router = express.Router();

router.post(
  '/register-as-medic',
  async (req, res, next) => {
    try {
      const result = await createMedic(req.body);
      res.status(201).json(result);
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
