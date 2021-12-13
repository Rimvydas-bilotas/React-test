/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const postCrime = async (description, date, town, severity) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute('INSERT INTO crimes (description, date, town, severity) VALUES (?, ?, ?, ?)', [description, date, town, severity]);
    await conn.end();
    return result;
  } catch (error) {
    return ({ error });
  }
};

module.exports = {
  postCrime,
};
