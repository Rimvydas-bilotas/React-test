/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const getSeverities = async () => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT * from crime_severity');
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getSeverities,
};
