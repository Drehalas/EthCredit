# EthCredit Complete System Testing Guide

## SECTION 1: PREREQUISITES
* Backend running (`npm run dev`)
* `.env` configured with:
  * 0G compute API key (`ZERO_G_API_KEY`)
  * 0G storage RPC + indexer (`ZERO_G_STORAGE_RPC`, `ZERO_G_INDEXER_RPC`)
  * private key funded with testnet tokens (`ZERO_G_PRIVATE_KEY`)
* Vault Wallet funded (with ETH/USDC on Base Sepolia for swap fees)

## SECTION 2: STEP-BY-STEP TEST FLOW

### Step 1: Register Agent
```http
POST /api/agent/register
Content-Type: application/json

{
  "name": "TestAgent-001"
}
```
**Response:**
```json
{
  "agentId": "...",
  "walletAddress": "..."
}
```
*Save `agentId` and `walletAddress` for the next steps.*

### Step 2: Fund Wallet
* Send testnet USDC/WETH tokens to the `walletAddress`.
* Verify balance on blockchain explorer.

### Step 3: Trigger Execution
```http
POST /agent/run
Content-Type: application/json

{
  "agentId": "YOUR_AGENT_ID"
}
```
**Expected Internal Flow:**
* Escrow locked
* Compute called
* Swap executed
* Storage uploaded
* Escrow released

### Step 4: Check Logs
```http
GET /agent/transactions/YOUR_AGENT_ID
```
**Response:**
```json
[
  {
    "txHash": "...",
    "rootHash": "...",
    "payload": {...}
  }
]
```

### Step 5 (Optional): Verify Storage
```http
GET /agent/transactions/data/YOUR_ROOT_HASH
```
*Returns the actual stored data JSON from the 0G Network.*

## SECTION 3: EXPECTED RESULTS
* Swap transaction successful (Base Sepolia)
* 0G compute decision returned via Router API
* 0G storage `rootHash` generated via Testnet
* Escrow released cleanly
* DB entry created in `transaction_logs`

## SECTION 4: FAILURE CASES
* **Insufficient funds**: Throws `400` error, escrow is never locked.
* **Compute failure**: Escrow is refunded. Returns fallback stub if API is down.
* **Storage failure**: Swap succeeds, but storage log fails (non-fatal, logs warning).
* **Invalid decision**: Validation fails, escrow is refunded.

## SECTION 5: DEBUGGING
* Log the compute response in `zeroGComputeService.js`.
* Log the storage `txHash` in `zeroGStorageService.js`.
* Check escrow state in the `escrows` DB table to ensure statuses are correctly migrating from `LOCKED` to `RELEASED`/`REFUNDED`.
