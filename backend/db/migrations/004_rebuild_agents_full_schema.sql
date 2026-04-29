-- Drop existing agents table if it exists (to rebuild with complete schema)
DROP TABLE IF EXISTS agents CASCADE;

-- Recreate agents table with all required columns
CREATE TABLE agents (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active',
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  agent_id TEXT UNIQUE,
  wallet_address TEXT UNIQUE,
  reputation_score FLOAT NOT NULL DEFAULT 0,
  did TEXT UNIQUE
);

-- Create all necessary indexes
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_name ON agents(name);
CREATE INDEX idx_agents_agent_id ON agents(agent_id);
CREATE INDEX idx_agents_wallet_address ON agents(wallet_address);
CREATE INDEX idx_agents_did ON agents(did);

-- Mark migration as applied
INSERT INTO _migrations (name) VALUES ('004_rebuild_agents_full_schema')
ON CONFLICT (name) DO NOTHING;
