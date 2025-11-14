// @ts-ignore: Supabase types
import { createClient } from '@supabase/supabase-js';

// Domain interface matching Supabase schema
export interface Domain {
  id?: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  featured?: boolean;
  status: 'available' | 'not_for_sale' | 'vaulted' | string;
  price: string;
  category: 'premium' | 'mid' | 'quickSnag' | 'flashRack' | 'vaulted' | 'scav' | 'basement' | string;
  quickSnagPrice?: string;
  hasWebsite?: boolean;
  website?: string;
  hasLore?: boolean;
  rarity?: 'epic' | 'rare' | 'base';
  vaulted?: boolean;
  flashRack?: boolean;
  redacted?: boolean;
  archetype?: 'builder' | 'degen' | 'both';
  listed: boolean;
  available: boolean;
  tags: string[];
  meta_json?: any;
  has_build?: boolean;
  has_pfp?: boolean;
  [key: string]: any;
}

// ENV CHECK - Log at the top to verify Vite is loading .env.local
// Check both Vite env vars (build-time) and runtime config (runtime)
const getEnvVar = (key: string): string | undefined => {
  // First check Vite build-time env vars
  const viteValue = import.meta.env[key];
  if (viteValue) return viteValue;
  
  // Fallback to runtime config (for cases where build-time vars aren't available)
  if (typeof window !== 'undefined' && (window as any).__RUNTIME_CONFIG__) {
    return (window as any).__RUNTIME_CONFIG__[key];
  }
  
  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

console.log("ENV CHECK URL:", supabaseUrl || "undefined");
console.log("ENV CHECK KEY:", supabaseKey ? "Loaded" : "Missing");
console.log("ENV SOURCE:", import.meta.env.VITE_SUPABASE_URL ? "Build-time" : 
  (typeof window !== 'undefined' && (window as any).__RUNTIME_CONFIG__?.VITE_SUPABASE_URL ? "Runtime config" : "None"));

// Warn if variables would evaluate to undefined
if (!supabaseUrl) {
  console.warn("⚠️ WARNING: VITE_SUPABASE_URL is undefined. Vite will not load .env.local if it doesn't exist or variables don't start with VITE_");
  console.warn("⚠️ App will run in fallback mode without database features.");
}

if (!supabaseKey) {
  console.warn("⚠️ WARNING: VITE_SUPABASE_ANON_KEY is undefined. Vite will not load .env.local if it doesn't exist or variables don't start with VITE_");
  console.warn("⚠️ App will run in fallback mode without database features.");
}

// Initialize Supabase client conditionally - only if both URL and key are provided
// This prevents the app from crashing when env vars are missing in production
let supabaseClient: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey && 
    supabaseUrl !== 'https://your-project.supabase.co' && 
    supabaseKey !== 'your-anon-key') {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    console.log(`✅ Supabase initialized: ${supabaseUrl.substring(0, 30)}...`);
  } catch (error) {
    console.error("❌ Failed to initialize Supabase client:", error);
    supabaseClient = null;
  }
} else {
  console.warn("⚠️ Supabase not initialized - missing or placeholder credentials");
  console.warn("⚠️ App will run in fallback mode. Database features will be disabled.");
}

export const supabase = supabaseClient;

// Helper function to assert Supabase is available
export function assertSupabase() {
  if (!supabase) {
    console.warn("⚠️ Supabase not available, returning empty array");
    return false;
  }
  return true;
}

// Test function to validate Supabase keys
export async function validateSupabaseKeys() {
  if (!supabase) {
    return {
      valid: false,
      error: "Supabase client not initialized - check environment variables",
      status: null
    };
  }

  try {
    // Test query to validate keys
    const { data, error, status } = await supabase
      .from("retail_ticket_log")
      .select("*")
      .limit(1);

    if (status === 401) {
      return {
        valid: false,
        error: "Invalid anon key - Supabase keys may have been rotated. Please update VITE_SUPABASE_ANON_KEY in .env.local",
        status: 401
      };
    }

    if (status === 403) {
      return {
        valid: false,
        error: "RLS policy issue - anon key valid but access denied. Check Row Level Security policies.",
        status: 403
      };
    }

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" which is fine for a test query
      return {
        valid: false,
        error: `Database error: ${error.message}`,
        status: status || null
      };
    }

    // Success - keys are valid
    return {
      valid: true,
      error: null,
      status: status || 200,
      message: "Supabase keys are valid"
    };
  } catch (error: any) {
    // Network error or other exception
    return {
      valid: false,
      error: `Network error: ${error.message || "Unable to connect to Supabase. Check VITE_SUPABASE_URL."}`,
      status: null
    };
  }
}

// Database utility functions
export async function getUserAccessData(walletAddress: string) {
  if (!supabase) {
    console.warn('Supabase not available, returning null');
    return null;
  }

  // Skip query if wallet is truncated/display format
  if (!walletAddress || walletAddress.includes('...') || walletAddress.length < 32) {
    console.warn('getUserAccessData: Invalid wallet format, returning default data:', walletAddress);
    return {
      wallet: walletAddress,
      current_tier: 'Retailpunk',
      retail_tickets: 0,
      last_login: new Date().toISOString(),
      discord_id: null,
      username: null
    };
  }

  try {
    // Try different table/column combinations
    let result = await supabase
      .from('retailpunk_registry')
      .select('*')
      .eq('wallet', walletAddress)
      .maybeSingle();
    
    // If that fails with 400/406, try wallet_address column
    if (result.error && (result.status === 400 || result.status === 406 || result.error.code === '42703')) {
      console.log('Trying wallet_address column instead of wallet...');
      result = await supabase
        .from('retailpunk_registry')
        .select('*')
        .eq('wallet_address', walletAddress)
        .maybeSingle();
    }
    
    // If still fails, try PascalCase table name with wallet_address
    if (result.error && (result.status === 400 || result.status === 406 || result.error.code === '42P01')) {
      console.log('Trying RetailpunkRegistry table...');
      result = await supabase
        .from('RetailpunkRegistry')
        .select('*')
        .eq('wallet_address', walletAddress)
        .maybeSingle();
    }
    
    // If still fails, try PascalCase with wallet column
    if (result.error && (result.status === 400 || result.status === 406)) {
      console.log('Trying RetailpunkRegistry table with wallet column...');
      result = await supabase
        .from('RetailpunkRegistry')
        .select('*')
        .eq('wallet', walletAddress)
        .maybeSingle();
    }
    
    const { data, error, status } = result;

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user access data:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        status: status,
        walletAddress: walletAddress
      });
      // If it's a 400 error, the table/column might not exist - return default data silently
      if (status === 400) {
        console.warn('Table/column mismatch - returning default data. Check your Supabase schema.');
      }
      // Return default data on error instead of null
      return {
        wallet: walletAddress,
        current_tier: 'Retailpunk',
        retail_tickets: 0,
        last_login: new Date().toISOString(),
        discord_id: null,
        username: null
      };
    }

    // Return default data if user doesn't exist
    return data || {
      wallet: walletAddress,
      current_tier: 'Retailpunk',
      retail_tickets: 0,
      last_login: new Date().toISOString(),
      discord_id: null,
      username: null
    };
  } catch (error: any) {
    console.error('Supabase query failed:', error);
    // Return default data on exception
    return {
      wallet: walletAddress,
      current_tier: 'Retailpunk',
      retail_tickets: 0,
      last_login: new Date().toISOString(),
      discord_id: null,
      username: null
    };
  }
}

/**
 * Link Supabase auth session to wallet address
 * This connects social auth (Google/Twitter/Discord) with wallet addresses
 */
export async function linkAuthToWallet(walletAddress: string, session: any) {
  if (!supabase || !session?.user) {
    return null;
  }

  // Skip if wallet is truncated/display format
  if (!walletAddress || walletAddress.includes('...') || walletAddress.length < 32) {
    return null;
  }

  try {
    const user = session.user;
    const provider = user.app_metadata?.provider || user.user_metadata?.provider || 'unknown';
    
    // Extract provider-specific IDs and info
    let discordId: string | null = null;
    let googleId: string | null = null;
    let twitterId: string | null = null;
    let username: string | null = null;
    let email: string | null = user.email || null;
    
    if (provider === 'discord') {
      discordId = user.user_metadata?.sub || user.id || null;
      username = user.user_metadata?.preferred_username || user.user_metadata?.full_name || email;
    } else if (provider === 'google') {
      googleId = user.user_metadata?.sub || user.id || null;
      username = user.user_metadata?.name || user.user_metadata?.full_name || email;
    } else if (provider === 'twitter') {
      twitterId = user.user_metadata?.sub || user.id || null;
      username = user.user_metadata?.preferred_username || user.user_metadata?.user_name || email;
    } else {
      username = user.user_metadata?.name || user.user_metadata?.full_name || email;
    }

    // Try to update existing record with all auth fields
    let result = await supabase
      .from('retailpunk_registry')
      .update({
        auth_user_id: user.id,
        discord_id: discordId,
        google_id: googleId,
        twitter_id: twitterId,
        username: username,
        email: email,
        auth_provider: provider,
        last_login: new Date().toISOString()
      })
      .eq('wallet', walletAddress)
      .select()
      .single();

    // If that fails, try wallet_address column
    if (result.error && (result.error.code === '42703' || result.status === 400)) {
      result = await supabase
        .from('retailpunk_registry')
        .update({
          auth_user_id: user.id,
          discord_id: discordId,
          google_id: googleId,
          twitter_id: twitterId,
          alias: username,
          email: email,
          auth_provider: provider,
          last_login: new Date().toISOString()
        })
        .eq('wallet_address', walletAddress)
        .select()
        .single();
    }

    // If still fails, try PascalCase table
    if (result.error && (result.error.code === '42P01' || result.status === 400)) {
      result = await supabase
        .from('RetailpunkRegistry')
        .update({
          auth_user_id: user.id,
          discord_id: discordId,
          google_id: googleId,
          twitter_id: twitterId,
          alias: username,
          email: email,
          auth_provider: provider,
          last_login: new Date().toISOString()
        })
        .eq('wallet_address', walletAddress)
        .select()
        .single();
    }

    if (result.error && result.error.code !== 'PGRST116') {
      console.error('Error linking auth to wallet:', result.error);
      return null;
    }

    console.log(`✅ Linked ${provider} auth to wallet:`, walletAddress);
    return result.data;
  } catch (error: any) {
    console.error('Error linking auth to wallet:', error);
    return null;
  }
}

export async function createUserRecord(walletAddress: string, username?: string) {
  if (!supabase) {
    console.warn('Supabase not available, cannot create user record');
    return null;
  }

  // Skip if wallet is truncated/display format
  if (!walletAddress || walletAddress.includes('...') || walletAddress.length < 32) {
    console.warn('createUserRecord: Invalid wallet format, skipping:', walletAddress);
    return null;
  }

  try {
    // Try different table/column combinations
    let result = await supabase
      .from('retailpunk_registry')
      .insert({
        wallet: walletAddress,
        username: username || null,
        current_tier: 'Retailpunk',
        retail_tickets: 0,
        last_login: new Date().toISOString()
      })
      .select()
      .single();

    // If that fails, try with wallet_address column
    if (result.error && (result.error.code === '42703' || result.status === 400)) {
      console.log('Trying wallet_address column for insert...');
      result = await supabase
        .from('retailpunk_registry')
        .insert({
          wallet_address: walletAddress,
          alias: username || null,
          tier: 'Retailpunk',
          total_rts: 0,
          status: 'Active'
        })
        .select()
        .single();
    }

    // If still fails, try PascalCase table
    if (result.error && (result.error.code === '42P01' || result.status === 400)) {
      console.log('Trying RetailpunkRegistry table for insert...');
      result = await supabase
        .from('RetailpunkRegistry')
        .insert({
          wallet_address: walletAddress,
          alias: username || null,
          tier: 'Retailpunk',
          total_rts: 0,
          status: 'Active'
        })
        .select()
        .single();
    }

    if (result.error) {
      // If it's a duplicate key error, that's okay - user already exists
      if (result.error.code === '23505') {
        console.log('User record already exists:', walletAddress);
        return null; // Return null to indicate user exists (not an error)
      }
      console.error('Error creating user record:', {
        message: result.error.message,
        details: result.error.details,
        code: result.error.code,
        status: result.status
      });
      return null;
    }

    console.log('✅ User record created successfully:', walletAddress);
    return result.data;
  } catch (error: any) {
    console.error('Supabase query failed:', error);
    return null;
  }
}

export async function updateUserTier(walletAddress: string, tier: string) {
  if (!supabase) {
    console.warn('Supabase not available, cannot update user tier');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('retailpunk_registry')
      .update({ current_tier: tier })
      .eq('wallet', walletAddress)
      .select()
      .single();

    if (error) {
      console.error('Error updating user tier:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Supabase query failed:', error);
    return null;
  }
}

export async function logRetailTicket({ 
  wallet, 
  action, 
  amount, 
  source, 
  notes 
}: {
  wallet: string;
  action: string;
  amount: number;
  source: string;
  notes?: string;
}) {
  if (!supabase) {
    console.warn('Supabase not available, cannot log retail ticket');
    return false;
  }

  try {
    const { error } = await supabase
      .from('retail_ticket_log')
      .insert({
        wallet,
        action,
        amount,
        source,
        notes
      });

    if (error) {
      console.error('RT log failed:', error);
      return false;
    }

    // Update user's RT balance - fetch current value, increment, and update
    const { data: currentUser, error: fetchError } = await supabase
      .from('retailpunk_registry')
      .select('retail_tickets')
      .eq('wallet', wallet)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching current RT balance:', fetchError);
      return false;
    }

    const currentBalance = currentUser?.retail_tickets || 0;
    const newBalance = Math.max(0, currentBalance + amount);

    const { error: updateError } = await supabase
      .from('retailpunk_registry')
      .update({ retail_tickets: newBalance })
      .eq('wallet', wallet);

    if (updateError) {
      console.error('Error updating RT balance:', updateError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Supabase query failed:', error);
    return false;
  }
}

export async function claimDayPass(walletAddress: string) {
  if (!supabase) {
    console.warn('Supabase not available, cannot claim day pass');
    return { success: false, error: 'Database not available' };
  }

  try {
    const { data: user } = await supabase
      .from('retailpunk_registry')
      .select('retail_tickets')
      .eq('wallet', walletAddress)
      .single();

    if (!user || user.retail_tickets < 1) {
      return { success: false, error: 'Insufficient Retail Tickets' };
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour pass

    // Create claim record
    const { error: claimError } = await supabase
      .from('retailpass_claims')
      .insert({
        wallet: walletAddress,
        tier_name: 'Day Pass',
        expires_at: expiresAt.toISOString(),
        claim_method: 'RT Spend'
      });

    if (claimError) {
      return { success: false, error: 'Failed to create claim' };
    }

    // Log the RT spend
    await logRetailTicket({
      wallet: walletAddress,
      action: 'Spend',
      amount: -1,
      source: 'Day Pass',
      notes: '24-hour mall access'
    });

    return { success: true, expiresAt };
  } catch (error) {
    console.error('Supabase query failed:', error);
    return { success: false, error: 'Database error' };
  }
}

// New functions for the updated schema
export async function getRetailTicketLog(wallet: string) {
  if (!assertSupabase()) {
    return [];
  }

  // Skip query if wallet is truncated/display format
  if (!wallet || wallet.includes('...') || wallet.length < 32) {
    console.warn('getRetailTicketLog: Invalid wallet format, skipping query:', wallet);
    return [];
  }

  try {
    const { data, error, status } = await supabase
      .from('retail_ticket_log')
      .select('*')
      .eq('wallet', wallet)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ticket log:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        status: status
      });
      return [];
    }

    return data || [];
  } catch (error: any) {
    console.error('Supabase query failed:', error);
    return [];
  }
}

export async function getRetailpassTiers() {
  if (!assertSupabase()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('retailpass_tiers')
      .select('*')
      .order('tier_name');

    if (error) {
      console.error('Error fetching tiers:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Supabase query failed:', error);
    return [];
  }
}

export async function getUserClaims(wallet: string) {
  if (!assertSupabase()) {
    return [];
  }

  // Skip query if wallet is truncated/display format
  if (!wallet || wallet.includes('...') || wallet.length < 32) {
    console.warn('getUserClaims: Invalid wallet format, skipping query:', wallet);
    return [];
  }

  try {
    // Query claims first (without nested select since relationship may not exist)
    const { data: claims, error: claimsError, status: claimsStatus } = await supabase
      .from('retailpass_claims')
      .select('*')
      .eq('wallet', wallet)
      .order('issued_at', { ascending: false });

    if (claimsError) {
      console.error('Error fetching claims:', {
        message: claimsError.message,
        details: claimsError.details,
        hint: claimsError.hint,
        code: claimsError.code,
        status: claimsStatus
      });
      return [];
    }

    if (!claims || claims.length === 0) {
      return [];
    }

    // If we have claims, optionally fetch tier details separately
    // Get unique tier names from claims
    const tierNames = [...new Set(claims.map((c: any) => c.tier_name).filter(Boolean))];
    
    if (tierNames.length > 0) {
      const { data: tiers } = await supabase
        .from('retailpass_tiers')
        .select('tier_name, requirements, benefits, areas, visual_asset')
        .in('tier_name', tierNames);

      // Merge tier data into claims
      if (tiers) {
        const tierMap = new Map(tiers.map((t: any) => [t.tier_name, t]));
        return claims.map((claim: any) => ({
          ...claim,
          retailpass_tiers: tierMap.get(claim.tier_name) || null
        }));
      }
    }

    return claims || [];
  } catch (error: any) {
    console.error('Supabase query failed:', error);
    return [];
  }
}

export async function createRetailpassClaim(wallet: string, tierName: string, method: string) {
  if (!supabase) {
    console.warn('Supabase not available, cannot create claim');
    return { success: false, error: 'Database not available' };
  }

  try {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Default 24 hour pass

    const { error } = await supabase
      .from('retailpass_claims')
      .insert({
        wallet,
        tier_name: tierName,
        expires_at: expiresAt.toISOString(),
        claim_method: method
      });

    if (error) {
      console.error('Error creating claim:', error);
      return { success: false, error: 'Failed to create claim' };
    }

    return { success: true };
  } catch (error) {
    console.error('Supabase query failed:', error);
    return { success: false, error: 'Database error' };
  }
}

// Enhanced function for creating retail ticket logs with action enums
export async function createRetailTicketLog({
  wallet,
  action,
  source,
  amount,
  notes
}: {
  wallet: string;
  action: 'earn' | 'spend' | 'bonus' | 'penalty' | 'refund' | 'transfer';
  source: string;
  amount: number;
  notes?: string;
}) {
  if (!supabase) {
    console.warn('Supabase not available, cannot create ticket log');
    return { success: false, error: 'Database not available' };
  }

  try {
    // Create the log entry
    const { error: logError } = await supabase
      .from('retail_ticket_log')
      .insert({
        wallet,
        action,
        source,
        amount,
        notes
      });

    if (logError) {
      console.error('Error creating ticket log:', logError);
      return { success: false, error: 'Failed to create ticket log' };
    }

    // Update user's ticket balance - fetch current value, increment, and update
    const { data: currentUser, error: fetchError } = await supabase
      .from('retailpunk_registry')
      .select('retail_tickets')
      .eq('wallet', wallet)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching current ticket balance:', fetchError);
      return { success: false, error: 'Failed to fetch current balance' };
    }

    const currentBalance = currentUser?.retail_tickets || 0;
    const newBalance = Math.max(0, currentBalance + amount);

    const { error: updateError } = await supabase
      .from('retailpunk_registry')
      .update({ retail_tickets: newBalance })
      .eq('wallet', wallet);

    if (updateError) {
      console.error('Error updating ticket balance:', updateError);
      return { success: false, error: 'Failed to update ticket balance' };
    }

    return { success: true };
  } catch (error) {
    console.error('Supabase query failed:', error);
    return { success: false, error: 'Database error' };
  }
} 