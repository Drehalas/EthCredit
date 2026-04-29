const express = require('express');
const router = express.Router();

router.get('/bootstrap', async (req, res) => {
  // TODO: implement agent bootstrap logic
  res.json({ message: 'agents bootstrap placeholder' });
});

router.get('/list', async (req, res) => {
  // TODO: return list of managed agents
  res.json({ agents: [] });
});

module.exports = router;
