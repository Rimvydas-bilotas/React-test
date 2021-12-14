/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const postIncident = async (description, date, town, contributingFactor) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute('INSERT INTO car_accidents (description, date, town, contributingFactor) VALUES (?, ?, ?, ?)', [description, date, town, contributingFactor]);
    await conn.end();
    return result;
  } catch (error) {
    return ({ error });
  }
};

const getIncidents = async (townId) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT car_accidents.id, car_accidents.description, car_accidents.date, car_accidents.contributingFactor FROM towns left join crimes on towns.id=crimes.town where towns.id=?;', [townId]);
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

const deleteIncident = async (incidentId) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [rows] = await con.execute('DELETE FROM car_accidents WHERE id = ?', [incidentId]);
    console.log('deleted');
    await con.end();
    return rows;
  } catch (e) {
    return e;
  }
};

module.exports = {
  postIncident,
  getIncidents,
  deleteIncident,
};
