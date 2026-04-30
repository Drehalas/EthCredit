const express = require('express');
const router = express.Router();
const { logSwapTransaction, getTransactionHistory, updateTransactionStatus } = require('../src/services/swapService');
const { getTokenCatalog } = require('../src/config/tokenCatalog');

/**
 * GET /swap/tokens
 * Return Base Sepolia token catalog for the frontend swap dropdowns.
 */
router.get('/tokens', async (req, res) => {
  try {
    // Return a stable JSON envelope so frontend can rely on `data` and `success`
    res.json({ success: true, data: getTokenCatalog() });
  } catch (err) {
    console.error('Error loading token catalog:', err.message);
    res.status(500).json({ error: err.message || 'Failed to load token catalog' });
  }
});

/**
 * POST /swap/log
 * Log a manual swap transaction (called after frontend executes swap via MetaMask)
 */
router.post('/log', async (req, res) => {
  try {
    const { walletAddress, agentId, tokenIn, tokenOut, amount, txHash, status } = req.body;

    // Validate required fields
    if (!walletAddress || !tokenIn || !tokenOut || !amount) {
      return res.status(400).json({
        error: 'Missing required fields: walletAddress, tokenIn, tokenOut, amount',
      });
    }

    const result = await logSwapTransaction({
      walletAddress,
      agentId,
      tokenIn,
      tokenOut,
      amount,
      txHash,
      status: status || 'pending',
    });

    res.json(result);
  } catch (err) {
    console.error('Error logging swap:', err.message);
    res.status(500).json({ error: err.message || 'Failed to log swap transaction' });
  }
});

/**
 * GET /swap/history/:walletAddress
 * Retrieve swap transaction history for a wallet
 */
router.get('/history/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { limit = 50 } = req.query;

    const transactions = await getTransactionHistory(walletAddress, Number.parseInt(limit, 10));
    res.json({ transactions });
  } catch (err) {
    console.error('Error fetching transaction history:', err.message);
    res.status(500).json({ error: err.message || 'Failed to fetch transaction history' });
  }
});

/**
 * PATCH /swap/:txId/status
 * Update transaction status after confirmation
 */
router.patch('/:txId/status', async (req, res) => {
  try {
    const { txId } = req.params;
    const { status, txHash } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const transaction = await updateTransactionStatus(txId, status, txHash);
    res.json({ success: true, transaction });
  } catch (err) {
    console.error('Error updating transaction:', err.message);
    res.status(500).json({ error: err.message || 'Failed to update transaction' });
  }
});

router.post('/quote', async (req, res) => {
  res.json({ message: 'swap quote placeholder' });
});

router.post('/execute', async (req, res) => {
  res.json({ message: 'swap execute placeholder' });
});

module.exports = router;
