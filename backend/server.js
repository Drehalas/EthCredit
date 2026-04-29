const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const agentsRouter = require('./routes/agents');
const swapRouter = require('./routes/swap');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/agents', agentsRouter);
app.use('/swap', swapRouter);

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

module.exports = app;
