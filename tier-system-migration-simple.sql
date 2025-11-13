-- =====================================================
-- Tier System Migration Script (Simplified)
-- =====================================================
-- STEP 1: First, check which column your table uses
-- Run this query to see what column exists:
-- =====================================================

-- Check which column exists (run this first)
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'retailpunk_registry' 
  AND column_name IN ('tier', 'current_tier');

-- =====================================================
-- STEP 2: Based on the result above, run ONE of the sections below
-- =====================================================

-- =====================================================
-- OPTION A: If your table uses 'current_tier' column
-- =====================================================

-- Migrate data for retailpunk_registry with 'current_tier' column
UPDATE retailpunk_registry 
SET current_tier = 'Retailpunk' 
WHERE current_tier = 'Tier 0' OR current_tier IS NULL;

UPDATE retailpunk_registry 
SET current_tier = 'SolDealer' 
WHERE current_tier = 'Slotlord';

UPDATE retailpunk_registry 
SET current_tier = 'Ghostrunner' 
WHERE current_tier = 'Hoodieguard';

-- Drop old constraint and add new one
ALTER TABLE retailpunk_registry 
  DROP CONSTRAINT IF EXISTS retailpunk_registry_current_tier_check;

ALTER TABLE retailpunk_registry 
  DROP CONSTRAINT IF EXISTS retailpunk_registry_tier_check;

ALTER TABLE retailpunk_registry 
  ADD CONSTRAINT retailpunk_registry_current_tier_check 
  CHECK (current_tier IN ('Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'));

-- Update default value
ALTER TABLE retailpunk_registry 
  ALTER COLUMN current_tier SET DEFAULT 'Retailpunk';

-- =====================================================
-- OPTION B: If your table uses 'tier' column
-- =====================================================

-- Migrate data for retailpunk_registry with 'tier' column
UPDATE retailpunk_registry 
SET tier = 'Retailpunk' 
WHERE tier = 'Tier 0' OR tier IS NULL;

UPDATE retailpunk_registry 
SET tier = 'SolDealer' 
WHERE tier = 'Slotlord';

UPDATE retailpunk_registry 
SET tier = 'Ghostrunner' 
WHERE tier = 'Hoodieguard';

-- Drop old constraint and add new one
ALTER TABLE retailpunk_registry 
  DROP CONSTRAINT IF EXISTS retailpunk_registry_tier_check;

ALTER TABLE retailpunk_registry 
  ADD CONSTRAINT retailpunk_registry_tier_check 
  CHECK (tier IN ('Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'));

-- Update default value
ALTER TABLE retailpunk_registry 
  ALTER COLUMN tier SET DEFAULT 'Retailpunk';

-- =====================================================
-- STEP 3: Update TierRules table (run this regardless)
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
-- After running the migration, verify with:

-- For 'current_tier' column:
-- SELECT current_tier, COUNT(*) as count 
-- FROM retailpunk_registry 
-- GROUP BY current_tier 
-- ORDER BY current_tier;

-- For 'tier' column:
-- SELECT tier, COUNT(*) as count 
-- FROM retailpunk_registry 
-- GROUP BY tier 
-- ORDER BY tier;

