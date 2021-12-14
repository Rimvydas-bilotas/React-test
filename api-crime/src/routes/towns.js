/* eslint-disable camelcase */
const express = require('express');
const townsEntity = require('../database-entities/towns');

const router = express.Router();

const handleGetTowns = async (req, res) => {
  try {
    const data = await townsEntity.getTowns();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

router.get('/towns', handleGetTowns);

module.exports = router;
