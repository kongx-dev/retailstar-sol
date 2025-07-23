import { useState } from 'react';

export default function RetailSpinWheel({ wallet, ticketBalance, setTicketBalance }: {
  wallet: string;
  ticketBalance: number;
  setTicketBalance: (n: number) => void;
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState<any>(null);
  const [message, setMessage] = useState<string>('');

  const handleSpin = async () => {
    if (ticketBalance < 5) {
      setMessage("❌ You need at least 5 tickets to spin.");
      return;
    }

    setIsSpinning(true);
    setMessage('');
    try {
      const res = await fetch('/api/spin-wheel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet, tickets: ticketBalance }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Spin failed');

      setPrize(data.prize);
      setTicketBalance(data.newBalance);
      setMessage(`🎉 You won: ${data.prize.label}!`);
                        // console.log('Spin successful:', data);
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong');
      console.error('Spin failed:', err);
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-cyan-700/50 p-6 rounded-xl text-center shadow-md w-full max-w-md mx-auto backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-2 text-cyan-300">🎰 Retail Spin Wheel</h2>
      <p className="mb-4 text-zinc-300">Spend 5 tickets for a chance at rare rewards.</p>
      
      {/* Wheel visualization */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className={`w-full h-full rounded-full border-4 border-cyan-500 flex items-center justify-center transition-transform duration-2000 ${
          isSpinning ? 'animate-spin' : ''
        }`}>
          <div className="text-2xl">🎰</div>
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-400 text-lg">
          ▼
        </div>
      </div>
      
      <button
        onClick={handleSpin}
        disabled={isSpinning || ticketBalance < 5}
        className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-cyan-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
      >
        {isSpinning ? 'Spinning...' : 'Spin Now (5 Tickets)'}
      </button>

      {ticketBalance < 5 && (
        <p className="mt-2 text-sm text-red-400">
          Need {5 - ticketBalance} more tickets to spin
        </p>
      )}

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          message.includes('❌') 
            ? 'bg-red-900/20 border border-red-500/30 text-red-300'
            : 'bg-green-900/20 border border-green-500/30 text-green-300'
        }`}>
          {message}
        </div>
      )}

      {prize && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-cyan-900/20 border border-green-500/30 rounded-lg">
          <h3 className="font-bold text-lg text-green-300">🎉 You won:</h3>
          <p className="text-xl text-green-200">{prize.label}</p>
          <p className="text-sm text-zinc-400 mt-1">Rarity: {prize.rarity}</p>
        </div>
      )}
    </div>
  );
} 