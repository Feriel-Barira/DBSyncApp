const { getMechanicalFailures } = require('./lostTime.service');
const { createDemandeIntervention } = require('./demandeIntervention.service');
const { createIntervention } = require('./intervention.service');
const { isAlreadySynced, markAsSynced } = require('./syncHistory.service');

async function syncLostTimes() {
  console.log('SYNCRONISATION START');
  const lostTimes = await getMechanicalFailures();
  for (const lt of lostTimes) {
    //si panne synchronisé en passe 
    if (await isAlreadySynced(lt.TransactionID)){
      console.log(`Already synchronized LostTime ${lt.TransactionID}`);
      continue;
    }
    //creation de demandeIntervention pour le panne 
    const demandeId = await createDemandeIntervention(lt);
    //creer intervention en attente
    await createIntervention(demandeId);
    await markAsSynced(lt.TransactionID);
    console.log(`Newly synchronized LostTime ${lt.TransactionID}`);
  }
}

module.exports = { syncLostTimes };
