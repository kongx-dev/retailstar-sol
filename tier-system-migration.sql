-- =====================================================
-- Tier System Migration Script
-- =====================================================
-- This script migrates the RetailpunkRegistry table
-- from the old tier system to the new tier system:
-- 
-- OLD: 'Tier 0', 'Retailpunk', 'Mallrat', 'Slotlord', 'Hoodieguard'
-- NEW: 'Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'
-- =====================================================

-- =====================================================
-- STEP 1: Check which column name exists and migrate data
-- =====================================================
-- The table might use 'tier' or 'current_tier' column name
-- This script handles both cases

-- For retailpunk_registry (snake_case) - Try 'current_tier' first
DO $$
BEGIN
    -- Check if current_tier column exists and migrate
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'retailpunk_registry' 
        AND column_name = 'current_tier'
        AND table_schema = 'public'
    ) THEN
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
        
        RAISE NOTICE 'Migrated retailpunk_registry using current_tier column';
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'retailpunk_registry' 
        AND column_name = 'tier'
    ) THEN
        -- Migrate 'Tier 0' -> 'Retailpunk'
        UPDATE retailpunk_registry 
        SET tier = 'Retailpunk' 
        WHERE tier = 'Tier 0' OR tier IS NULL;
        
        -- Migrate 'Slotlord' -> 'SolDealer'
        UPDATE retailpunk_registry 
        SET tier = 'SolDealer' 
        WHERE tier = 'Slotlord';
        
        -- Migrate 'Hoodieguard' -> 'Ghostrunner'
        UPDATE retailpunk_registry 
        SET tier = 'Ghostrunner' 
        WHERE tier = 'Hoodieguard';
        
        RAISE NOTICE 'Migrated retailpunk_registry using tier column';
    ELSE
        RAISE NOTICE 'No tier column found in retailpunk_registry';
    END IF;
END $$;

-- For RetailpunkRegistry (PascalCase) - Try 'current_tier' first
DO $$
BEGIN
    -- Check if current_tier column exists and migrate
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'RetailpunkRegistry' 
        AND column_name = 'current_tier'
        AND table_schema = 'public'
    ) THEN
        -- Migrate 'Tier 0' -> 'Retailpunk'
        UPDATE "RetailpunkRegistry" 
        SET current_tier = 'Retailpunk' 
        WHERE current_tier = 'Tier 0' OR current_tier IS NULL;
        
        -- Migrate 'Slotlord' -> 'SolDealer'
        UPDATE "RetailpunkRegistry" 
        SET current_tier = 'SolDealer' 
        WHERE current_tier = 'Slotlord';
        
        -- Migrate 'Hoodieguard' -> 'Ghostrunner'
        UPDATE "RetailpunkRegistry" 
        SET current_tier = 'Ghostrunner' 
        WHERE current_tier = 'Hoodieguard';
        
        RAISE NOTICE 'Migrated RetailpunkRegistry using current_tier column';
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'RetailpunkRegistry' 
        AND column_name = 'tier'
    ) THEN
        -- Migrate 'Tier 0' -> 'Retailpunk'
        UPDATE "RetailpunkRegistry" 
        SET tier = 'Retailpunk' 
        WHERE tier = 'Tier 0' OR tier IS NULL;
        
        -- Migrate 'Slotlord' -> 'SolDealer'
        UPDATE "RetailpunkRegistry" 
        SET tier = 'SolDealer' 
        WHERE tier = 'Slotlord';
        
        -- Migrate 'Hoodieguard' -> 'Ghostrunner'
        UPDATE "RetailpunkRegistry" 
        SET tier = 'Ghostrunner' 
        WHERE tier = 'Hoodieguard';
        
        RAISE NOTICE 'Migrated RetailpunkRegistry using tier column';
    ELSE
        RAISE NOTICE 'No tier column found in RetailpunkRegistry';
    END IF;
END $$;

-- =====================================================
-- STEP 2: Drop old constraints and add new ones
-- =====================================================
-- Handle both 'tier' and 'current_tier' column names

-- For retailpunk_registry (snake_case) - current_tier column
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'retailpunk_registry' 
        AND column_name = 'current_tier'
        AND table_schema = 'public'
    ) THEN
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
        
        RAISE NOTICE 'Updated constraints for retailpunk_registry.current_tier';
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'retailpunk_registry' 
        AND column_name = 'tier'
    ) THEN
        -- Drop old constraint if it exists
        ALTER TABLE retailpunk_registry 
          DROP CONSTRAINT IF EXISTS retailpunk_registry_tier_check;
        
        -- Add new constraint
        ALTER TABLE retailpunk_registry 
          ADD CONSTRAINT retailpunk_registry_tier_check 
          CHECK (tier IN ('Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'));
        
        -- Update default value
        ALTER TABLE retailpunk_registry 
          ALTER COLUMN tier SET DEFAULT 'Retailpunk';
        
        RAISE NOTICE 'Updated constraints for retailpunk_registry.tier';
    END IF;
END $$;

-- For RetailpunkRegistry (PascalCase) - current_tier column
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'RetailpunkRegistry' 
        AND column_name = 'current_tier'
        AND table_schema = 'public'
    ) THEN
        -- Drop old constraint if it exists
        ALTER TABLE "RetailpunkRegistry" 
          DROP CONSTRAINT IF EXISTS "RetailpunkRegistry_current_tier_check";
        
        ALTER TABLE "RetailpunkRegistry" 
          DROP CONSTRAINT IF EXISTS "RetailpunkRegistry_tier_check";
        
        -- Add new constraint
        ALTER TABLE "RetailpunkRegistry" 
          ADD CONSTRAINT "RetailpunkRegistry_current_tier_check" 
          CHECK (current_tier IN ('Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'));
        
        -- Update default value
        ALTER TABLE "RetailpunkRegistry" 
          ALTER COLUMN current_tier SET DEFAULT 'Retailpunk';
        
        RAISE NOTICE 'Updated constraints for RetailpunkRegistry.current_tier';
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'RetailpunkRegistry' 
        AND column_name = 'tier'
    ) THEN
        -- Drop old constraint if it exists
        ALTER TABLE "RetailpunkRegistry" 
          DROP CONSTRAINT IF EXISTS "RetailpunkRegistry_tier_check";
        
        -- Add new constraint
        ALTER TABLE "RetailpunkRegistry" 
          ADD CONSTRAINT "RetailpunkRegistry_tier_check" 
          CHECK (tier IN ('Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'));
        
        -- Update default value
        ALTER TABLE "RetailpunkRegistry" 
          ALTER COLUMN tier SET DEFAULT 'Retailpunk';
        
        RAISE NOTICE 'Updated constraints for RetailpunkRegistry.tier';
    END IF;
END $$;

-- =====================================================
-- STEP 3: Update TierRules table (if it exists)
-- =====================================================

-- Delete old tier rules
DELETE FROM TierRules 
WHERE tier_name IN ('Tier 0', 'Slotlord', 'Hoodieguard');

-- Insert new tier rules (or update if they exist)
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
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify the migration:

-- Check tier distribution (snake_case) - try both column names
-- SELECT current_tier as tier, COUNT(*) as count 
-- FROM retailpunk_registry 
-- GROUP BY current_tier 
-- ORDER BY current_tier;
-- OR if using 'tier' column:
-- SELECT tier, COUNT(*) as count 
-- FROM retailpunk_registry 
-- GROUP BY tier 
-- ORDER BY tier;

-- Check tier distribution (PascalCase) - try both column names
-- SELECT current_tier as tier, COUNT(*) as count 
-- FROM "RetailpunkRegistry" 
-- GROUP BY current_tier 
-- ORDER BY current_tier;
-- OR if using 'tier' column:
-- SELECT tier, COUNT(*) as count 
-- FROM "RetailpunkRegistry" 
-- GROUP BY tier 
-- ORDER BY tier;

-- Check TierRules
-- SELECT tier_name, requirements, visual_identity 
-- FROM TierRules 
-- ORDER BY tier_name;

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. This migration preserves existing user data
-- 2. Old 'Tier 0' users become 'Retailpunk' (entry level)
-- 3. Old 'Slotlord' users become 'SolDealer'
-- 4. Old 'Hoodieguard' users become 'Ghostrunner'
-- 5. If you have existing 'Retailpunk' users from the old system,
--    they will remain as 'Retailpunk' (entry level). If you want
--    to upgrade them to 'Mallrat', uncomment the migration line above.
-- 6. The new tier system:
--    - Retailpunk (Tier 0) - Entry level, default
--    - Mallrat (Tier 1) - Earned through engagement
--    - SolDealer (Tier 2) - Advanced tier
--    - Retailrunner (Tier 3) - Elite tier
--    - Ghostrunner (Prestige) - Secret prestige tier

