/* eslint-disable camelcase */
const express = require('express');
const crimesEntity = require('../database-entities/crimes');
const isAuthenticated = require('../middleware/middleware');

const router = express.Router();

const handlePostCrime = async (req, res) => {
  try {
    let data;
    // const userId = req.user.userid;
    if (req.user) {
      const {
        description, date, town, severity,
      } = req.body;
      data = await crimesEntity.postCrime(description, date, town, severity);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleGetAccount = async (req, res) => {
  try {
    let data;
    const userId = req.user.userid;
    if (req.user) {
      data = await crimesEntity.getAccounts(userId);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

router.post('/crimes', isAuthenticated, handlePostCrime);
router.get('/crimes:townId', isAuthenticated, handleGetAccount);
router.delete('/crimes', isAuthenticated, handleGetAccount);

module.exports = router;
