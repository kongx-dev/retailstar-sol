import { useState, useEffect } from 'react';
import { getRetailTicketLog } from '../lib/supabase';
import { 
  getLocalRetailTickets, 
  saveLocalRetailTickets,
  logLocalRetailTicket 
} from '../lib/localStorage';

export interface TicketLog {
  id: string;
  wallet: string;
  action: string;
  source: string;
  amount: number;
  notes?: string;
  created_at: string;
}

export interface RetailTicketsData {
  balance: number;
  logs: TicketLog[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRetailTickets(wallet: string | null): RetailTicketsData {
  const [balance, setBalance] = useState(0);
  const [logs, setLogs] = useState<TicketLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!wallet) {
      setBalance(0);
      setLogs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try Supabase first
      const [ticketLogs] = await Promise.all([
        getRetailTicketLog(wallet)
      ]);

      if (ticketLogs.length > 0) {
        // Calculate balance from logs
        const calculatedBalance = ticketLogs.reduce((sum, log) => sum + log.amount, 0);
        setBalance(Math.max(0, calculatedBalance));
        setLogs(ticketLogs);
      } else {
        // Fallback to localStorage
        const localBalance = getLocalRetailTickets(wallet);
        setBalance(localBalance);
        setLogs([]);
      }
    } catch (err) {
      console.error('Error fetching retail tickets:', err);
      
      // Fallback to localStorage
      const localBalance = getLocalRetailTickets(wallet);
      setBalance(localBalance);
      setLogs([]);
      setError('Failed to fetch from database, using local data');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [wallet]);

  return {
    balance,
    logs,
    loading,
    error,
    refetch
  };
}

// Helper function to spend tickets
export async function spendTickets(
  wallet: string, 
  amount: number, 
  action: string, 
  source: string, 
  notes?: string
): Promise<boolean> {
  try {
    // Log the transaction
    const success = await logLocalRetailTicket({
      wallet,
      action,
      amount: -amount,
      target: source,
      notes
    });

    if (success) {
      // Update local balance
      const currentBalance = getLocalRetailTickets(wallet);
      saveLocalRetailTickets(wallet, currentBalance - amount);
    }

    return success;
  } catch (error) {
    console.error('Error spending tickets:', error);
    return false;
  }
}






