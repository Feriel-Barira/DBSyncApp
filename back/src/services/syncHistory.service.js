const divaDb = require('../config/diva.db');

async function isAlreadySynced(sourceId) {
  const sql = `
    SELECT 1
    FROM SyncHistory
    WHERE SourceSystem = 'SDT'
      AND SourceID = ?
    LIMIT 1
  `;
  const [rows] = await divaDb.execute(sql, [sourceId]);
  return rows.length > 0;
}

async function markAsSynced(sourceId) {
  const sql = `
    INSERT INTO SyncHistory (SourceSystem, SourceID)
    VALUES ('SDT', ?)
  `;
  await divaDb.execute(sql, [sourceId]);
}

module.exports = {
  isAlreadySynced,
  markAsSynced
};
