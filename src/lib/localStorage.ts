// LocalStorage fallback for RetailStar access system
// Used when Supabase is not available

const STORAGE_KEYS = {
  RETAIL_TICKETS: 'retailstar_retail_tickets',
  USER_ACCESS: 'retailstar_user_access',
  TICKET_LOG: 'retailstar_ticket_log',
  DAY_PASS: 'retailstar_day_pass'
};

export interface LocalUserAccess {
  wallet_address: string;
  tier: string;
  domains_owned: number;
  wifhoodie_holder: boolean;
  retailpass_expiry: string | null;
  total_rts: number;
  status: string;
}

// New interface for updated schema
export interface LocalRetailpunkRegistry {
  wallet: string;
  current_tier: string;
  retail_tickets: number;
  last_login: string;
  discord_id?: string;
  username?: string;
}

export interface LocalTicketLog {
  id: string;
  wallet_address: string;
  action: 'Earn' | 'Spend' | 'Access Granted' | 'Slot Pull' | 'Bonus Drop';
  amount: number;
  access_target?: string;
  notes?: string;
  timestamp: string;
}

// New interface for updated ticket log schema
export interface LocalRetailTicketLog {
  id: string;
  wallet: string;
  action: string;
  source: string;
  amount: number;
  notes?: string;
  created_at: string;
}

// Get user access data from localStorage
export function getLocalUserAccess(walletAddress: string): LocalUserAccess | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_ACCESS);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    return data[walletAddress] || null;
  } catch (error) {
    console.error('Error reading local user access:', error);
    return null;
  }
}

// Save user access data to localStorage
export function saveLocalUserAccess(walletAddress: string, data: LocalUserAccess): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_ACCESS);
    const allData = stored ? JSON.parse(stored) : {};
    allData[walletAddress] = data;
    localStorage.setItem(STORAGE_KEYS.USER_ACCESS, JSON.stringify(allData));
  } catch (error) {
    console.error('Error saving local user access:', error);
  }
}

// Get retail tickets for a wallet
export function getLocalRetailTickets(walletAddress: string): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RETAIL_TICKETS);
    if (!stored) return 0;
    
    const data = JSON.parse(stored);
    return data[walletAddress] || 0;
  } catch (error) {
    console.error('Error reading local retail tickets:', error);
    return 0;
  }
}

// Save retail tickets for a wallet
export function saveLocalRetailTickets(walletAddress: string, tickets: number): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RETAIL_TICKETS);
    const data = stored ? JSON.parse(stored) : {};
    data[walletAddress] = Math.max(0, Math.min(5, tickets)); // Cap at 5 tickets
    localStorage.setItem(STORAGE_KEYS.RETAIL_TICKETS, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving local retail tickets:', error);
  }
}

// Log a retail ticket transaction
export function logLocalRetailTicket({
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
}): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TICKET_LOG);
    const logs: LocalTicketLog[] = stored ? JSON.parse(stored) : [];
    
    const newLog: LocalTicketLog = {
      id: Date.now().toString(),
      wallet_address: wallet,
      action,
      amount,
      access_target: target,
      notes,
      timestamp: new Date().toISOString()
    };
    
    logs.push(newLog);
    localStorage.setItem(STORAGE_KEYS.TICKET_LOG, JSON.stringify(logs));
    
    // Update ticket balance
    const currentTickets = getLocalRetailTickets(wallet);
    saveLocalRetailTickets(wallet, currentTickets + amount);
    
    return true;
  } catch (error) {
    console.error('Error logging local retail ticket:', error);
    return false;
  }
}

// Claim a day pass using local storage
export function claimLocalDayPass(walletAddress: string): { success: boolean; error?: string; expiresAt?: Date } {
  try {
    const currentTickets = getLocalRetailTickets(walletAddress);
    
    if (currentTickets < 1) {
      return { success: false, error: 'Insufficient Retail Tickets' };
    }
    
    // Deduct 1 ticket
    saveLocalRetailTickets(walletAddress, currentTickets - 1);
    
    // Set day pass expiry (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    
    // Save day pass
    const stored = localStorage.getItem(STORAGE_KEYS.DAY_PASS);
    const passes = stored ? JSON.parse(stored) : {};
    passes[walletAddress] = expiresAt.toISOString();
    localStorage.setItem(STORAGE_KEYS.DAY_PASS, JSON.stringify(passes));
    
    // Log the transaction
    logLocalRetailTicket({
      wallet: walletAddress,
      action: 'Spend',
      amount: -1,
      target: 'Day Pass',
      notes: '24-hour mall access'
    });
    
    return { success: true, expiresAt };
  } catch (error) {
    console.error('Error claiming local day pass:', error);
    return { success: false, error: 'Failed to claim day pass' };
  }
}

// Get day pass expiry for a wallet
export function getLocalDayPassExpiry(walletAddress: string): string | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DAY_PASS);
    if (!stored) return null;
    
    const passes = JSON.parse(stored);
    return passes[walletAddress] || null;
  } catch (error) {
    console.error('Error reading local day pass:', error);
    return null;
  }
}

// Check if day pass is still valid
export function isLocalDayPassValid(walletAddress: string): boolean {
  const expiry = getLocalDayPassExpiry(walletAddress);
  if (!expiry) return false;
  
  const now = new Date();
  const expireDate = new Date(expiry);
  return expireDate > now;
} 