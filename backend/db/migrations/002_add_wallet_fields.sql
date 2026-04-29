-- Add wallet and reputation fields to agents table (if not exists)
DO $$ BEGIN
  ALTER TABLE agents ADD COLUMN agent_id TEXT UNIQUE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE agents ADD COLUMN wallet_address TEXT UNIQUE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE agents ADD COLUMN reputation_score FLOAT NOT NULL DEFAULT 0;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Create indexes for efficient lookups (safely)
DO $$ BEGIN
  CREATE INDEX idx_agents_agent_id ON agents(agent_id);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$ BEGIN
  CREATE INDEX idx_agents_wallet_address ON agents(wallet_address);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Ensure _migrations table exists
CREATE TABLE IF NOT EXISTS _migrations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Mark migration as applied (if not already)
INSERT INTO _migrations (name) VALUES ('002_add_wallet_fields')
ON CONFLICT (name) DO NOTHING;
