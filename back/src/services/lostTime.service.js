const { connect } = require('../config/sdt.db');

//récupérer les pannes mécaniques 
async function getMechanicalFailures() {
  const pool = await connect();

  const result = await pool.request().query(`
    SELECT TransactionID, TerminalNo, StartTime, EndTime
    FROM LostTimeTransaction
  `);

  return result.recordset;
}

module.exports = { getMechanicalFailures };
