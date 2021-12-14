/* eslint-disable camelcase */
const express = require('express');
const usersEntity = require('../database-entities/users');
// const isAuthenticated = require('../middleware/middleware');

const router = express.Router();

const handleRegisterUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const data = await usersEntity.registerUser(name, password);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const handleLoginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const data = await usersEntity.loginUser(name, password);
    if (data.error) {
      throw new Error('Something went wrong');
    } else {
      return res.send({ message: 'Succsessfully logged in', data });
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};

router.post('/register', handleRegisterUser);
router.post('/login', handleLoginUser);

module.exports = router;
