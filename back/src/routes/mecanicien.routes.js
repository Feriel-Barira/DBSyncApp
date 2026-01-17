const express = require('express');
const router = express.Router();
const divaDb = require('../config/diva.db');

/*Rendre liste de mecaniciens*/
router.get('/', async (req, res) => {
  const [rows] = await divaDb.execute(`
    SELECT IDMecanicien, Nom, Etat, DerniereAffectation
    FROM mecanicien
    ORDER BY Nom
  `);

  res.json(rows);
});

module.exports = router;
