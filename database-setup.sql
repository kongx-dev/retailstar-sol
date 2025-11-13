-- RetailStar Mall Phase 2 Access System Database Setup
-- Run these scripts in your Supabase SQL editor

-- Table: RetailpunkRegistry
CREATE TABLE IF NOT EXISTS RetailpunkRegistry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE NOT NULL,
  alias TEXT,
  tier TEXT CHECK (tier IN ('Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner')) DEFAULT 'Retailpunk',
  domains_owned INT DEFAULT 0,
  wifhoodie_holder BOOLEAN DEFAULT FALSE,
  retailpass_expiry TIMESTAMP,
  total_rts INT DEFAULT 0,
  available_rts INT GENERATED ALWAYS AS (total_rts) STORED,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table: TicketLog
CREATE TABLE IF NOT EXISTS TicketLog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL REFERENCES RetailpunkRegistry(wallet_address),
  action TEXT CHECK (action IN ('Earn', 'Spend', 'Access Granted', 'Slot Pull', 'Bonus Drop')),
  amount INT NOT NULL,
  access_target TEXT,
  notes TEXT,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Table: TierRules
CREATE TABLE IF NOT EXISTS TierRules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_name TEXT UNIQUE NOT NULL,
  requirements TEXT,
  is_nft_based BOOLEAN DEFAULT FALSE,
  duration_days INT,
  benefits TEXT[],
  unlockable_areas TEXT[],
  visual_identity TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table: RetailpassClaims
CREATE TABLE IF NOT EXISTS RetailpassClaims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet TEXT NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  claim_method TEXT CHECK (claim_method IN ('RT Spend', 'Email Invite', 'Promo Code'))
);

-- Insert default tier rules
-- Note: These are documentation examples. Actual tier requirements and benefits should be configured based on your implementation.
INSERT INTO TierRules (tier_name, requirements, benefits, unlockable_areas, visual_identity) VALUES
('Retailpunk', 'Default tier - entry level', ARRAY['Basic mall access'], ARRAY['Outer ring'], 'Blue'),
('Mallrat', 'Earned through engagement', ARRAY['Full mall access', 'Priority notifications'], ARRAY['All areas', 'VIP sections'], 'Green'),
('SolDealer', 'Advanced tier', ARRAY['All Mallrat benefits', 'Exclusive deals', 'Early access'], ARRAY['All areas', 'Black market'], 'Yellow'),
('Retailrunner', 'Elite tier', ARRAY['All SolDealer benefits', 'System access', 'Bot privileges'], ARRAY['All areas', 'Admin zones'], 'Orange'),
('Ghostrunner', 'Secret prestige tier', ARRAY['Unlimited access', 'All benefits', 'Hidden areas'], ARRAY['All areas', 'Secret paths'], 'Red');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_retailpunk_wallet ON RetailpunkRegistry(wallet_address);
CREATE INDEX IF NOT EXISTS idx_retailpunk_tier ON RetailpunkRegistry(tier);
CREATE INDEX IF NOT EXISTS idx_ticketlog_wallet ON TicketLog(wallet_address);
CREATE INDEX IF NOT EXISTS idx_ticketlog_timestamp ON TicketLog(timestamp);
CREATE INDEX IF NOT EXISTS idx_retailpass_wallet ON RetailpassClaims(wallet);

-- Enable Row Level Security (RLS)
ALTER TABLE RetailpunkRegistry ENABLE ROW LEVEL SECURITY;
ALTER TABLE TicketLog ENABLE ROW LEVEL SECURITY;
ALTER TABLE TierRules ENABLE ROW LEVEL SECURITY;
ALTER TABLE RetailpassClaims ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic - adjust as needed)
CREATE POLICY "Users can view their own data" ON RetailpunkRegistry
  FOR SELECT USING (wallet_address = current_user);

CREATE POLICY "Users can update their own data" ON RetailpunkRegistry
  FOR UPDATE USING (wallet_address = current_user);

CREATE POLICY "Users can view their own ticket logs" ON TicketLog
  FOR SELECT USING (wallet_address = current_user);

CREATE POLICY "Users can insert their own ticket logs" ON TicketLog
  FOR INSERT WITH CHECK (wallet_address = current_user);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_retailpunk_updated_at 
  BEFORE UPDATE ON RetailpunkRegistry 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 