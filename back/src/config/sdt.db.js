const sql = require('mssql');

const config = {
  user: process.env.SDT_USER,
  password: process.env.SDT_PASSWORD,
  server: process.env.SDT_HOST,   
  database: process.env.SDT_DB,   
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

module.exports = {
  connect: () => sql.connect(config)
};
