/* eslint-disable camelcase */
const express = require('express');
const incidentsEntity = require('../database-entities/carincidents');
const isAuthenticated = require('../middleware/middleware');

const router = express.Router();

const handlePostIncident = async (req, res) => {
  try {
    let data;
    // const userId = req.user.userid;
    if (req.user) {
      const {
        description, date, town, contributingFactor,
      } = req.body;
      data = await incidentsEntity.postIncident(description, date, town, contributingFactor);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleGetIncidents = async (req, res) => {
  try {
    const { townId } = req.params;
    const data = await incidentsEntity.getIncidents(townId);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleDeleteIncident = async (req, res) => {
  try {
    let data;
    if (req.user) {
      const { incidentId } = req.params;
      data = incidentsEntity.deleteIncident(incidentId);
    }
    res.send({ message: 'Succsessfully deleted the item', data });
  } catch (e) {
    res.status(500).json({ e });
  }
};

router.post('/crimes', isAuthenticated, handlePostIncident);
router.get('/crimes/:townId', handleGetIncidents);
router.delete('/crimes/:crimeId', isAuthenticated, handleDeleteIncident);

module.exports = router;
