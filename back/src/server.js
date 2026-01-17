const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { syncLostTimes } = require('./services/sync.service');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API DivaTex OK' });
});

app.use('/api/interventions', require('./routes/intervention.routes'));
app.use('/api/mecaniciens', require('./routes/mecanicien.routes'));

app.listen(PORT, async () => {
  console.log(`Backend démarré sur le port ${PORT}`);
  await syncLostTimes();
});
