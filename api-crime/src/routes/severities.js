/* eslint-disable camelcase */
const express = require('express');
const severitiesEntity = require('../database-entities/severities');

const router = express.Router();

const handleGetSeverities = async (req, res) => {
  try {
    const data = await severitiesEntity.getSeverities();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

router.get('/severities', handleGetSeverities);

module.exports = router;
