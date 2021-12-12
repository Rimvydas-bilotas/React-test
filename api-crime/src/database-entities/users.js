/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { dbConfig, secretKey } = require('../config');

const registerUser = async (name, password) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const con = await mysql.createConnection(dbConfig);
    const [validation] = await con.execute('SELECT COUNT(id) AS count FROM users WHERE name = ?', [name]);
    await con.end();
    if (validation[0].count === 0) {
      const conn = await mysql.createConnection(dbConfig);
      const [result] = await conn.execute('INSERT INTO users (name, password, reg_timestamp) VALUES (?, ?, CURRENT_TIMESTAMP)', [name, hashedPassword]);
      await conn.end();
      return result;
    }
    // eslint-disable-next-line no-return-assign
    return data = 'Account with this name already exists';
  } catch (error) {
    return error;
  }
};

const loginUser = async (name, password) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT * FROM users WHERE name = ?', [name]);
    await con.end();
    const doesPasswordMatch = bcrypt.compareSync(password, result[0].password);
    if (!doesPasswordMatch) {
      return 'Could not authenticate the user. Password or name is incorrect.';
    }
    const token = jwt.sign(
      {
        userid: result[0].id,
      },
      secretKey,
    );
    return token;
  } catch (error) {
    return error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};
