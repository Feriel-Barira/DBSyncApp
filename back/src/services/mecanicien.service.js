const divaDb = require('../config/diva.db');

async function setMecanicienDisponible(id, conn = divaDb) {
  await conn.execute(
    `UPDATE mecanicien SET Etat = 1 WHERE IDMecanicien = ?`,
    [id]
  );
}

module.exports = { setMecanicienDisponible };
