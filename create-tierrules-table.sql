-- =====================================================
-- Create TierRules Table (if it doesn't exist)
-- =====================================================

-- Create the TierRules table
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

-- Insert tier rules
INSERT INTO TierRules (tier_name, requirements, benefits, unlockable_areas, visual_identity) 
VALUES
  ('Retailpunk', 'Default tier - entry level', ARRAY['Basic mall access'], ARRAY['Outer ring'], 'Blue'),
  ('Mallrat', 'Earned through engagement', ARRAY['Full mall access', 'Priority notifications'], ARRAY['All areas', 'VIP sections'], 'Green'),
  ('SolDealer', 'Advanced tier', ARRAY['All Mallrat benefits', 'Exclusive deals', 'Early access'], ARRAY['All areas', 'Black market'], 'Yellow'),
  ('Retailrunner', 'Elite tier', ARRAY['All SolDealer benefits', 'System access', 'Bot privileges'], ARRAY['All areas', 'Admin zones'], 'Orange'),
  ('Ghostrunner', 'Secret prestige tier', ARRAY['Unlimited access', 'All benefits', 'Hidden areas'], ARRAY['All areas', 'Secret paths'], 'Red')
ON CONFLICT (tier_name) 
DO UPDATE SET
  requirements = EXCLUDED.requirements,
  benefits = EXCLUDED.benefits,
  unlockable_areas = EXCLUDED.unlockable_areas,
  visual_identity = EXCLUDED.visual_identity;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_tierrules_tier_name ON TierRules(tier_name);

-- Enable Row Level Security (if needed)
ALTER TABLE TierRules ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow everyone to read tier rules (adjust as needed)
DROP POLICY IF EXISTS "Anyone can view tier rules" ON TierRules;
CREATE POLICY "Anyone can view tier rules" ON TierRules
  FOR SELECT
  USING (true);

-- Verification query
SELECT tier_name, requirements, visual_identity 
FROM TierRules 
ORDER BY tier_name;

