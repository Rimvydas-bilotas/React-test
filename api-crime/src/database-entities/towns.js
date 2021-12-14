/* eslint-disable camelcase */
const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

const getTowns = async () => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [result] = await con.execute('SELECT towns.id, towns.name, towns.population, count(crimes.town) AS NumberOfCrimes, CAST(AVG(severity) as decimal(10,1)) AS AverageSeverity FROM towns left join crimes on towns.id=crimes.town group by towns.id');
    await con.end();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getTowns,
};
