const express = require("express");
const router = express.Router();
const divaDb = require("../config/diva.db");
const { terminerIntervention } = require("../services/intervention.service");

/**
 * 📋 Liste interventions
 */
router.get("/", async (req, res) => {
  const [rows] = await divaDb.execute(`
    SELECT i.IDIntervention,
           i.Etat,
           i.DateDebut,
           i.DateFin,
           i.IDMecanicien,
           d.Numero,
           m.Nom AS Mecanicien
    FROM intervention i
    JOIN demandeintervention d ON d.IDDemandeIntervention = i.IDDemandeIntervention
    LEFT JOIN mecanicien m ON m.IDMecanicien = i.IDMecanicien
    ORDER BY i.IDIntervention DESC
  `);

  res.json(rows);
});

/**
 * 🔧 Affectation manuelle
 */
router.put("/:id/affecter/:idMec", async (req, res) => {
  const { id, idMec } = req.params;
  const conn = await divaDb.getConnection();

  try {
    await conn.beginTransaction();
    // 1️⃣ vérifier intervention EN ATTENTE
    const [[inter]] = await conn.execute(
      `SELECT IDMecanicien, Etat
       FROM intervention
       WHERE IDIntervention = ?`,
      [id]
    );
    if (!inter) {
      throw new Error("Intervention inexistante");
    }
    if (inter.Etat !== 1) {
      throw new Error("Intervention déjà terminée");
    }
    if (inter.IDMecanicien && inter.IDMecanicien > 0) {
      throw new Error("Intervention déjà affectée");
    }
    // 2️⃣ vérifier mécanicien disponible
    const [[mec]] = await conn.execute(
      `SELECT Etat
       FROM mecanicien
       WHERE IDMecanicien = ?
         AND Etat = 1`,
      [idMec]
    );
    if (!mec) {
      throw new Error("Mécanicien non disponible");
    }
    // 3️⃣ affecter intervention
    await conn.execute(
      `UPDATE intervention
       SET IDMecanicien = ?, DateDebut = NOW()
       WHERE IDIntervention = ?`,
      [idMec, id]
    );
    // 4️⃣ occuper mécanicien
    await conn.execute(
      `UPDATE mecanicien
       SET Etat = 0,
           DerniereAffectation = NOW()
       WHERE IDMecanicien = ?`,
      [idMec]
    );
    await conn.commit();
    res.json({ message: "Affectation réussie" });
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ error: err.message });
  } finally {
    conn.release();
  }
});
/**
 * ✅ Terminer intervention
 */
router.put("/:id/close", async (req, res) => {
  try {
    await terminerIntervention(req.params.id);
    res.json({ message: "Intervention terminée" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
