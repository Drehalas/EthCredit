-- Create swap_transactions table to track all user swaps (manual and agent-driven)
CREATE TABLE IF NOT EXISTS swap_transactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  token_in TEXT NOT NULL,
  token_out TEXT NOT NULL,
  amount TEXT NOT NULL,
  tx_hash TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_swap_transactions_agent_id ON swap_transactions(agent_id);
CREATE INDEX IF NOT EXISTS idx_swap_transactions_wallet_address ON swap_transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_swap_transactions_status ON swap_transactions(status);
CREATE INDEX IF NOT EXISTS idx_swap_transactions_source ON swap_transactions(source);
CREATE INDEX IF NOT EXISTS idx_swap_transactions_created_at ON swap_transactions(created_at DESC);

-- Mark migration as applied
INSERT INTO _migrations (name) VALUES ('005_create_swap_transactions_table')
ON CONFLICT (name) DO NOTHING;
