const divaDb = require('../config/diva.db');
const { setMecanicienDisponible } = require('./mecanicien.service');

async function createIntervention(demandeId) {
  await divaDb.execute(
    `INSERT INTO intervention
     (IDDemandeIntervention, Etat, IDMecanicien)
     VALUES (?, 1, NULL)`,
    [demandeId]
  );
}

async function terminerIntervention(idIntervention) {
  const conn = await divaDb.getConnection();

  try {
    await conn.beginTransaction();

    // récupérer l’intervention en cours
    const [[inter]] = await conn.execute(
      `SELECT IDMecanicien
       FROM intervention
       WHERE IDIntervention = ?
         AND Etat = 1`,
      [idIntervention]
    );

    if (!inter) {
      throw new Error('Intervention non en cours');
    }

    // terminer l'intervention
    await conn.execute(
      `UPDATE intervention
       SET Etat = 0, DateFin = NOW()
       WHERE IDIntervention = ?`,
      [idIntervention]
    );

    // rendre le mécanicien disponible seulement s’il existe
    if (inter.IDMecanicien) {
      await setMecanicienDisponible(inter.IDMecanicien, conn);
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = { createIntervention, terminerIntervention };
