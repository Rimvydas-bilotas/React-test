/* eslint-disable camelcase */
const express = require('express');
const townsEntity = require('../database-entities/towns');
// const isAuthenticated = require('../middleware/middleware');

const router = express.Router();

// const handlePostBill = async (req, res) => {
//   try {
//     let data;
//     if (req.user) {
//       const { groupId, amount, description } = req.body;
//       data = await billsEntity.postBill(groupId, amount, description);
//     }
//     res.status(200).send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const handleGetTowns = async (req, res) => {
  try {
    // const { groupId } = req.params;
    const data = await townsEntity.getTowns();
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

// router.post('/bills', isAuthenticated, handlePostBill);
router.get('/towns', handleGetTowns);

module.exports = router;
