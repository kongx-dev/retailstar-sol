import { useEffect, useState } from 'react';
import { getUserAccessData, createUserRecord } from '../lib/supabase';
import { useRetailTickets } from './useRetailTickets';
import { useRetailpassClaims } from './useRetailpassClaims';
import { 
  getLocalUserAccess, 
  getLocalRetailTickets, 
  getLocalDayPassExpiry, 
  isLocalDayPassValid 
} from '../lib/localStorage';

export interface RetailAccess {
  hasAccess: boolean;
  tier: string;
  expiresAt: string | null;
  wifhoodie: boolean;
  retailTickets: number;
  loading: boolean;
}

export function useRetailAccess(wallet: string | null): RetailAccess {
  const [access, setAccess] = useState({
    hasAccess: false,
    tier: 'Retailpunk',
    expiresAt: null,
    wifhoodie: false,
    retailTickets: 0,
    loading: true
  } as RetailAccess);

  // Use new hooks for tickets and claims
  const { balance: retailTickets, loading: ticketsLoading } = useRetailTickets(wallet);
  const { activeClaim, loading: claimsLoading } = useRetailpassClaims(wallet);

  useEffect(() => {
    if (!wallet) {
      setAccess(prev => ({ ...prev, loading: false }));
      return;
    }

    const checkAccess = async () => {
      try {
        // Try Supabase first
        let data = await getUserAccessData(wallet);
        
        // If user doesn't exist in Supabase, create a new record
        if (!data || (data.wallet === wallet && (data.current_tier === 'Tier 0' || data.current_tier === 'Retailpunk') && data.retail_tickets === 0)) {
          // Check if this is truly a new user (no data at all, not just default data)
          const localData = getLocalUserAccess(wallet);
          if (!localData) {
            // This is a new user - create record in Supabase
            console.log('🆕 New wallet detected, creating user record:', wallet);
            const newRecord = await createUserRecord(wallet);
            if (newRecord) {
              data = newRecord;
            } else {
              // If Supabase insert failed, use default data
              data = {
                wallet: wallet,
                current_tier: 'Retailpunk',
                retail_tickets: 0,
                last_login: new Date().toISOString(),
                discord_id: null,
                username: null
              };
            }
          } else {
            // User exists in localStorage but not Supabase - migrate data
            data = {
              wallet: localData.wallet_address,
              current_tier: localData.tier,
              retail_tickets: localData.total_rts,
              last_login: new Date().toISOString(),
              discord_id: null,
              username: null
            };
            // Try to create Supabase record with existing data
            await createUserRecord(wallet);
          }
        }
        
        // If Supabase still fails, fall back to localStorage
        if (!data) {
          const localData = getLocalUserAccess(wallet);
          if (localData) {
            data = {
              wallet: localData.wallet_address,
              current_tier: localData.tier,
              retail_tickets: localData.total_rts,
              last_login: new Date().toISOString(),
              discord_id: null,
              username: null
            };
          } else {
            // Create default data
            data = {
              wallet: wallet,
              current_tier: 'Retailpunk',
              retail_tickets: 0,
              last_login: new Date().toISOString(),
              discord_id: null,
              username: null
            };
          }
        }

        // Check for active claim
        const now = new Date();
        const hasActiveClaim = activeClaim && new Date(activeClaim.expires_at) > now;
        
        // Determine access based on new logic
        const hasAccess = hasActiveClaim || 
                         ['Retailpunk', 'Mallrat', 'SolDealer', 'Retailrunner', 'Ghostrunner'].includes(data.current_tier);

        setAccess({
          hasAccess,
          tier: data.current_tier,
          expiresAt: activeClaim?.expires_at || null,
          wifhoodie: false, // This would need to be determined from NFT ownership
          retailTickets: retailTickets,
          loading: ticketsLoading || claimsLoading
        });
      } catch (error) {
        console.error('Error checking access:', error);
        
        // Fallback to localStorage only
        const localTickets = getLocalRetailTickets(wallet);
        const dayPassValid = isLocalDayPassValid(wallet);
        
        setAccess({
          hasAccess: dayPassValid,
          tier: 'Retailpunk',
          expiresAt: getLocalDayPassExpiry(wallet),
          wifhoodie: false,
          retailTickets: localTickets,
          loading: false
        });
      }
    };

    checkAccess();
  }, [wallet, retailTickets, activeClaim, ticketsLoading, claimsLoading]);

  return access;
} 