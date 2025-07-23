import { useEffect, useState } from 'react';
import RetailSpinWheel from './RetailSpinWheel';

export default function RetailTicketsDashboard({ wallet }: { wallet: string }) {
  const [ticketBalance, setTicketBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate wallet-based fetch
  useEffect(() => {
    if (!wallet) return;
    
    setIsLoading(true);
    const stored = localStorage.getItem(`tickets-${wallet}`);
    const balance = stored ? parseInt(stored, 10) : 34; // Default 34 tickets
    setTicketBalance(balance);
    setIsLoading(false);
  }, [wallet]);

  // Persist ticket balance
  useEffect(() => {
    if (wallet) {
      localStorage.setItem(`tickets-${wallet}`, ticketBalance.toString());
    }
  }, [ticketBalance, wallet]);

  if (isLoading) {
    return (
      <div className="p-6 text-zinc-200">
        <div className="animate-pulse">
          <div className="h-8 bg-zinc-800 rounded mb-4"></div>
          <div className="h-4 bg-zinc-800 rounded mb-2"></div>
          <div className="h-4 bg-zinc-800 rounded mb-6"></div>
          <div className="h-64 bg-zinc-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-zinc-200">
      <h1 className="text-2xl font-bold mb-2 text-cyan-400">🎟️ Your Retail Tickets</h1>
      <p className="mb-4">Wallet: <span className="text-sm text-zinc-400 font-mono">{wallet}</span></p>
      <p className="mb-6">Tickets Available: <span className="font-bold text-cyan-300">{ticketBalance}</span></p>

      <RetailSpinWheel
        wallet={wallet}
        ticketBalance={ticketBalance}
        setTicketBalance={setTicketBalance}
      />

      {/* Ticket earning info */}
      <div className="mt-8 p-4 bg-zinc-900/50 border border-zinc-700/50 rounded-lg">
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">💡 How to Earn Tickets</h3>
        <div className="space-y-2 text-sm text-zinc-300">
          <div>• Buy domains (1-3 tickets each)</div>
          <div>• Submit feedback (3 tickets)</div>
          <div>• Refer friends (5 tickets)</div>
          <div>• Win spin wheel (5-20 tickets)</div>
        </div>
      </div>
    </div>
  );
} 