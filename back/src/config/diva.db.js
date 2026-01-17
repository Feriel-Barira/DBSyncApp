const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DIVA_HOST,
  user: process.env.DIVA_USER,
  password: process.env.DIVA_PASSWORD,
  database: process.env.DIVA_DB,
  timezone: 'local',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
