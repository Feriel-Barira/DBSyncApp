const divaDb = require('../config/diva.db');

async function createDemandeIntervention(lt) {
  const [res] = await divaDb.execute(
    `INSERT INTO demandeintervention
     (IDMachine, Numero, DatePanne, Description, SaisiLe, SaisiPar)
     VALUES (?, ?, ?, ?, NOW(), 'SYNC')`,
     /* Numero = num  de demande, Description du prob*/
    [
      1,
      `LT-${lt.TransactionID}`,
      lt.StartTime,
      `Panne détectée sur terminal ${lt.TerminalNo}`
    ]
  );
  return res.insertId;
}

module.exports = { createDemandeIntervention };
