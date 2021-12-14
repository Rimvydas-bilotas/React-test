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

const getCrimes = async (townId) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT crimes.id, crimes.description, crimes.date, crimes.severity FROM towns left join crimes on towns.id=crimes.town where towns.id=?;', [townId]);
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

const deleteCrime = async (crimeId) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [rows] = await con.execute('DELETE FROM crimes WHERE id = ?', [crimeId]);
    await con.end();
    return rows;
  } catch (e) {
    return e;
  }
};

module.exports = {
  postCrime,
  getCrimes,
  deleteCrime,
};
