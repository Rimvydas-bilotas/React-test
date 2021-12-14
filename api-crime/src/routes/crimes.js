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
      const check = 0;
      data = await crimesEntity.postCrime(description, date, town, severity, check);
    }
    if (data.error) {
      throw new Error('Something went wrong');
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleGetCrimes = async (req, res) => {
  try {
    const { townId } = req.params;
    const data = await crimesEntity.getCrimes(townId);
    if (data.error) {
      throw new Error('Something went wrong');
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleDeleteCrime = async (req, res) => {
  try {
    let data;
    if (req.user) {
      const { crimeId } = req.params;
      data = crimesEntity.deleteCrime(crimeId);
    }
    res.send({ message: 'Succsessfully deleted the item', data });
  } catch (e) {
    res.status(500).json({ e });
  }
};

router.post('/crimes', isAuthenticated, handlePostCrime);
router.get('/crimes/:townId', handleGetCrimes);
router.delete('/crimes/:crimeId', isAuthenticated, handleDeleteCrime);

module.exports = router;
