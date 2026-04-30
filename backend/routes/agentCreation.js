const express = require('express');
const { createAgentRecord, getAgentByDid } = require('../src/services/agentCreationService');

const router = express.Router();

function getSwapStrategy() {
  const tokenIn = process.env.SEPOLIA_USDC_ADDRESS || process.env.SWAP_TOKEN_IN_ADDRESS;
  const tokenOut = process.env.SEPOLIA_WETH_ADDRESS || process.env.SWAP_TOKEN_OUT_ADDRESS;

  if (!tokenIn || !tokenOut) {
    const error = new Error('Sepolia swap token addresses are not configured');
    error.statusCode = 500;
    throw error;
  }

  return {
    action: 'swap',
    tokenIn,
    tokenOut,
    amount: '10',
  };
}

router.post('/create', async (req, res) => {
  try {
    const { walletAddress, message, signature } = req.body || {};
    const agent = await createAgentRecord({ walletAddress, message, signature });

    return res.json({
      did: agent.did,
      agentId: agent.agentId,
      walletAddress: agent.walletAddress,
      reputationScore: agent.reputationScore,
      createdAt: agent.createdAt,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      error: error.message || 'Failed to create agent',
    });
  }
});

router.get('/by-did/:did', async (req, res) => {
  try {
    const { did } = req.params;
    const agent = await getAgentByDid(did);

    if (!agent) {
      return res.status(404).json({
        error: 'Agent not found',
      });
    }

    return res.json({
      did: agent.did,
      agentId: agent.agentId,
      walletAddress: agent.walletAddress,
      reputationScore: agent.reputationScore,
      createdAt: agent.createdAt,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      error: error.message || 'Failed to retrieve agent',
    });
  }
});

router.get('/action', async (req, res) => {
  try {
    return res.json(getSwapStrategy());
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      error: error.message || 'Failed to get agent action',
    });
  }
});

module.exports = router;
