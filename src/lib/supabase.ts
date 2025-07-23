// @ts-ignore: Supabase types
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with better error handling
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

// Only create client if we have valid credentials
let supabase: any = null;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://your-project.supabase.co' && supabaseKey !== 'your-anon-key') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
    supabase = null;
  }
} else {
  console.warn('Supabase credentials not configured. Using localStorage fallback only.');
}

// Database utility functions
export async function getUserAccessData(walletAddress: string) {
  if (!supabase) {
    console.warn('Supabase not available, returning null');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('RetailpunkRegistry')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user access data:', error);
      return null;
    }

    // Return default data if user doesn't exist
    return data || {
      wallet_address: walletAddress,
      tier: 'Tier 0',
      domains_owned: 0,
      wifhoodie_holder: false,
      retailpass_expiry: null,
      total_rts: 0,
      status: 'Active'
    };
  } catch (error) {
    console.error('Supabase query failed:', error);
    return null;
  }
}

export async function createUserRecord(walletAddress: string, alias?: string) {
  if (!supabase) {
    console.warn('Supabase not available, cannot create user record');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('RetailpunkRegistry')
      .insert({
        wallet_address: walletAddress,
        alias,
        tier: 'Tier 0',
        domains_owned: 0,
        wifhoodie_holder: false,
        total_rts: 0,
        status: 'Active'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user record:', error);
      return null;
    }

    return data;
  } catch (error) {
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
      .from('RetailpunkRegistry')
      .update({ tier })
      .eq('wallet_address', walletAddress)
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
  target, 
  notes 
}: {
  wallet: string;
  action: 'Earn' | 'Spend' | 'Access Granted' | 'Slot Pull' | 'Bonus Drop';
  amount: number;
  target?: string;
  notes?: string;
}) {
  if (!supabase) {
    console.warn('Supabase not available, cannot log retail ticket');
    return false;
  }

  try {
    const { error } = await supabase
      .from('TicketLog')
      .insert({
        wallet_address: wallet,
        action,
        amount,
        access_target: target,
        notes
      });

    if (error) {
      console.error('RT log failed:', error);
      return false;
    }

    // Update user's RT balance
    const { error: updateError } = await supabase
      .from('RetailpunkRegistry')
      .update({ 
        total_rts: supabase.sql`total_rts + ${amount}` 
      })
      .eq('wallet_address', wallet);

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
      .from('RetailpunkRegistry')
      .select('total_rts')
      .eq('wallet_address', walletAddress)
      .single();

    if (!user || user.total_rts < 1) {
      return { success: false, error: 'Insufficient Retail Tickets' };
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour pass

    const { error } = await supabase
      .from('RetailpunkRegistry')
      .update({ 
        retailpass_expiry: expiresAt.toISOString(),
        total_rts: user.total_rts - 1
      })
      .eq('wallet_address', walletAddress);

    if (error) {
      return { success: false, error: 'Failed to claim day pass' };
    }

    // Log the RT spend
    await logRetailTicket({
      wallet: walletAddress,
      action: 'Spend',
      amount: -1,
      target: 'Day Pass',
      notes: '24-hour mall access'
    });

    return { success: true, expiresAt };
  } catch (error) {
    console.error('Supabase query failed:', error);
    return { success: false, error: 'Database error' };
  }
} 