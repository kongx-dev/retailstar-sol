-- =====================================================
-- SECURITY FIX: Update update_last_login function
-- =====================================================
-- This fixes the security issue where the function has a 
-- mutable search_path, which can lead to SQL injection or
-- privilege escalation vulnerabilities.
-- =====================================================

-- Drop and recreate the function with an explicit, immutable search_path
DROP FUNCTION IF EXISTS public.update_last_login() CASCADE;

CREATE OR REPLACE FUNCTION public.update_last_login()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
BEGIN
    -- Use pg_catalog.now() to be explicit (though search_path ensures correct resolution)
    -- This function runs with the privileges of the caller (not SECURITY DEFINER)
    -- Setting search_path prevents search_path injection attacks
    NEW.last_login = pg_catalog.now();
    RETURN NEW;
END;
$$;

-- Recreate the triggers that use this function
-- For retailpunk_registry (snake_case)
DROP TRIGGER IF EXISTS update_retailpunk_last_login ON public.retailpunk_registry;
CREATE TRIGGER update_retailpunk_last_login
  BEFORE UPDATE ON public.retailpunk_registry
  FOR EACH ROW
  EXECUTE FUNCTION public.update_last_login();

-- For RetailpunkRegistry (PascalCase)
DROP TRIGGER IF EXISTS update_retailpunk_last_login_pascal ON public."RetailpunkRegistry";
CREATE TRIGGER update_retailpunk_last_login_pascal
  BEFORE UPDATE ON public."RetailpunkRegistry"
  FOR EACH ROW
  EXECUTE FUNCTION public.update_last_login();

-- =====================================================
-- VERIFICATION
-- =====================================================
-- After running this, verify the function has the correct search_path:
-- SELECT 
--   p.proname as function_name,
--   pg_get_functiondef(p.oid) as definition
-- FROM pg_proc p
-- JOIN pg_namespace n ON p.pronamespace = n.oid
-- WHERE n.nspname = 'public' 
--   AND p.proname = 'update_last_login';
--
-- The definition should include: SET search_path = pg_catalog, public
-- =====================================================

