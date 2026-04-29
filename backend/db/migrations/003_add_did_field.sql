-- Add DID fields to agents table (if not exists)
DO $$ BEGIN
  ALTER TABLE agents ADD COLUMN did TEXT UNIQUE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Create indexes for efficient lookups (safely)
DO $$ BEGIN
  CREATE INDEX idx_agents_did ON agents(did);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Ensure _migrations table exists
CREATE TABLE IF NOT EXISTS _migrations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Mark migration as applied (if not already)
INSERT INTO _migrations (name) VALUES ('003_add_did_field')
ON CONFLICT (name) DO NOTHING;
