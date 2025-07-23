import { useEffect, useState } from 'react';
import { getUserAccessData } from '../lib/supabase';
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
    tier: 'Tier 0',
    expiresAt: null,
    wifhoodie: false,
    retailTickets: 0,
    loading: true
  } as RetailAccess);

  useEffect(() => {
    if (!wallet) {
      setAccess(prev => ({ ...prev, loading: false }));
      return;
    }

    const checkAccess = async () => {
      try {
        // Try Supabase first
        let data = await getUserAccessData(wallet);
        
        // If Supabase fails, fall back to localStorage
        if (!data) {
          const localData = getLocalUserAccess(wallet);
          if (localData) {
            data = localData;
          } else {
            // Create default data
            data = {
              wallet_address: wallet,
              tier: 'Tier 0',
              domains_owned: 0,
              wifhoodie_holder: false,
              retailpass_expiry: null,
              total_rts: 0,
              status: 'Active'
            };
          }
        }

        // Get retail tickets from localStorage as fallback
        const localTickets = getLocalRetailTickets(wallet);
        const tickets = data.total_rts || localTickets;

        // Check day pass from localStorage
        const localDayPass = getLocalDayPassExpiry(wallet);
        const dayPassExpiry = data.retailpass_expiry || localDayPass;

        const now = new Date();
        const passActive = dayPassExpiry && new Date(dayPassExpiry) > now;
        const hasAccess = data.wifhoodie_holder || 
                         passActive || 
                         ['Retailpunk', 'Mallrat', 'Slotlord', 'Hoodieguard'].includes(data.tier);

        setAccess({
          hasAccess,
          tier: data.tier,
          expiresAt: dayPassExpiry,
          wifhoodie: data.wifhoodie_holder,
          retailTickets: tickets,
          loading: false
        });
      } catch (error) {
        console.error('Error checking access:', error);
        
        // Fallback to localStorage only
        const localTickets = getLocalRetailTickets(wallet);
        const dayPassValid = isLocalDayPassValid(wallet);
        
        setAccess({
          hasAccess: dayPassValid,
          tier: 'Tier 0',
          expiresAt: getLocalDayPassExpiry(wallet),
          wifhoodie: false,
          retailTickets: localTickets,
          loading: false
        });
      }
    };

    checkAccess();
  }, [wallet]);

  return access;
} 