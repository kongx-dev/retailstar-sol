-- =====================================================
-- Tier System Migration Script (Direct - for current_tier column)
-- =====================================================
-- This script assumes your table uses 'current_tier' column
-- OLD: 'Tier 0', 'Retailpunk', 'Mallrat', 'Slotlord', 'Hoodieguard'
-- NEW: 'Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'
-- =====================================================

-- =====================================================
-- STEP 1: Migrate existing data
-- =====================================================

-- Migrate 'Tier 0' -> 'Retailpunk'
UPDATE retailpunk_registry 
SET current_tier = 'Retailpunk' 
WHERE current_tier = 'Tier 0' OR current_tier IS NULL;

-- Migrate 'Slotlord' -> 'SolDealer'
UPDATE retailpunk_registry 
SET current_tier = 'SolDealer' 
WHERE current_tier = 'Slotlord';

-- Migrate 'Hoodieguard' -> 'Ghostrunner'
UPDATE retailpunk_registry 
SET current_tier = 'Ghostrunner' 
WHERE current_tier = 'Hoodieguard';

-- =====================================================
-- STEP 2: Update constraint and default value
-- =====================================================

-- Drop old constraint if it exists
ALTER TABLE retailpunk_registry 
  DROP CONSTRAINT IF EXISTS retailpunk_registry_current_tier_check;

ALTER TABLE retailpunk_registry 
  DROP CONSTRAINT IF EXISTS retailpunk_registry_tier_check;

-- Add new constraint
ALTER TABLE retailpunk_registry 
  ADD CONSTRAINT retailpunk_registry_current_tier_check 
  CHECK (current_tier IN ('Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'));

-- Update default value
ALTER TABLE retailpunk_registry 
  ALTER COLUMN current_tier SET DEFAULT 'Retailpunk';

-- =====================================================
-- STEP 3: Update TierRules table
-- =====================================================

-- Delete old tier rules
DELETE FROM TierRules 
WHERE tier_name IN ('Tier 0', 'Slotlord', 'Hoodieguard');

-- Insert new tier rules
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

-- =====================================================
-- VERIFICATION
-- =====================================================
-- After running, verify with:
-- SELECT current_tier, COUNT(*) as count 
-- FROM retailpunk_registry 
-- GROUP BY current_tier 
-- ORDER BY current_tier;

