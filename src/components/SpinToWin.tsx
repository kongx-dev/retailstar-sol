import React, { useState, useEffect } from 'react';

// Retail Ticket System
const TICKET_KEY = 'retailstar_tickets';
const SPINS_KEY = 'retailstar_spins';

function getRetailTickets() {
  try {
    const tickets = localStorage.getItem(TICKET_KEY);
    return tickets ? parseInt(tickets) : 0;
  } catch {
    return 0;
  }
}

function setRetailTickets(count: number) {
  try {
    localStorage.setItem(TICKET_KEY, Math.min(count, 5).toString());
  } catch (error) {
    console.error('Error setting tickets:', error);
  }
}

function getSpinsUsed(): number {
  try {
    const spins = localStorage.getItem(SPINS_KEY);
    if (!spins) return 0;
    const data = JSON.parse(spins);
    return data['spin_to_win'] || 0;
  } catch {
    return 0;
  }
}

function saveSpinsUsed(count: number) {
  try {
    const spins = localStorage.getItem(SPINS_KEY);
    const data = spins ? JSON.parse(spins) : {};
    data['spin_to_win'] = count;
    localStorage.setItem(SPINS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving spins:', error);
  }
}

function SpinToWin() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string>('');
  const [showRespin, setShowRespin] = useState(false);
  const [tickets, setTickets] = useState(getRetailTickets());
  const [spinsUsed, setSpinsUsed] = useState(getSpinsUsed());
  const [reelSymbols, setReelSymbols] = useState(['🎰', '🎰', '🎰']);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const symbols = ['🔤', '💰', '🧃', '🎰', '💎', '🔥', '⭐', '🎯'];
  
  const spinReels = () => {
    setIsSpinning(true);
    setResult('');
    setShowRespin(false);

    // Update reel symbols during spin - faster updates
    const spinInterval = setInterval(() => {
      setReelSymbols([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 80); // Faster updates

    // Simulate spinning animation - shorter duration
    setTimeout(() => {
      clearInterval(spinInterval);
      const random = Math.random();
      let prize: string;
      
      if (random < 0.01) {
        // Jackpot: 1% chance
        prize = '🎉 JACKPOT! +5 Tickets';
        setRetailTickets(Math.min(tickets + 5, 5));
        setTickets(Math.min(tickets + 5, 5));
      } else if (random < 0.05) {
        // Big Win: 4% chance
        prize = '🎊 +3 Tickets';
        setRetailTickets(Math.min(tickets + 3, 5));
        setTickets(Math.min(tickets + 3, 5));
      } else if (random < 0.15) {
        // Medium Win: 10% chance
        prize = '🎯 +2 Tickets';
        setRetailTickets(Math.min(tickets + 2, 5));
        setTickets(Math.min(tickets + 2, 5));
      } else if (random < 0.35) {
        // Small Win: 20% chance
        prize = '✨ +1 Ticket';
        setRetailTickets(Math.min(tickets + 1, 5));
        setTickets(Math.min(tickets + 1, 5));
      } else {
        // No Win: 65% chance
        prize = '💔 Try Again';
      }
      
      setResult(prize);
      setIsSpinning(false);
      setShowRespin(true);
      setReelSymbols(['🎰', '🎰', '🎰']);
    }, 1500); // Shorter spin duration
  };

  const handleRespin = () => {
    if (tickets > 0 && spinsUsed < 5) {
      setTickets(tickets - 1);
      setRetailTickets(tickets - 1);
      const newSpinsUsed = spinsUsed + 1;
      saveSpinsUsed(newSpinsUsed);
      setSpinsUsed(newSpinsUsed);
      spinReels();
    }
  };

  const handleSpin = () => {
    if (spinsUsed < 5) {
      const newSpinsUsed = spinsUsed + 1;
      saveSpinsUsed(newSpinsUsed);
      setSpinsUsed(newSpinsUsed);
      spinReels();
    }
  };

  // Update ticket count when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setTickets(getRetailTickets());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      {/* Collapsible Side Panel */}
      <div className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-16'
      }`}>
        <div className="bg-zinc-900 border-l border-purple-500/30 h-96 rounded-l-xl shadow-2xl relative">
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
          >
            {isExpanded ? '→' : '←'}
          </button>

          {/* Collapsed State */}
          {!isExpanded && (
            <div className="h-full flex flex-col items-center justify-center p-2">
              <div className="text-center">
                <div className="text-2xl mb-2">🎰</div>
                <div className="text-xs font-bold text-purple-400" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                  SPIN 2 WIN
                </div>
              </div>
            </div>
          )}

          {/* Expanded State */}
          {isExpanded && (
            <div className="h-full p-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-purple-400 mb-1">🎰 SPIN 2 WIN</h3>
                <p className="text-xs text-gray-400">Win Retail Tickets!</p>
                <div className="text-xs text-gray-500 mt-1">
                  Spins: {spinsUsed}/5 | Tickets: {tickets}
                </div>
              </div>
              
              {/* Reels */}
              <div className="flex justify-center gap-1 mb-4">
                {reelSymbols.map((symbol, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-zinc-800 border border-purple-500/30 rounded flex items-center justify-center text-lg font-bold"
                  >
                    {symbol}
                  </div>
                ))}
              </div>
              
              {/* Result */}
              {result && (
                <div className="text-center mb-4">
                  <div className={`text-lg font-bold mb-1 transition-all duration-500 ${
                    result.includes('JACKPOT') ? 'text-yellow-400' : 
                    result.includes('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result}
                  </div>
                </div>
              )}
              
              {/* Spin button */}
              {!result && !isSpinning && spinsUsed < 5 && (
                <button
                  onClick={handleSpin}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 px-3 rounded text-sm font-bold transition-all duration-200 mb-3 shadow-lg hover:shadow-purple-500/25"
                >
                  🎰 SPIN ({5 - spinsUsed} left)
                </button>
              )}
              
              {/* Respin option */}
              {showRespin && tickets > 0 && spinsUsed < 5 && (
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-2">
                    Use 1 Ticket to Respin? ({tickets} available)
                  </div>
                  <button
                    onClick={handleRespin}
                    className="bg-orange-600 hover:bg-orange-500 text-white py-1 px-2 rounded text-xs font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                  >
                    🔄 Respin ({5 - spinsUsed} left)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Slot Machine Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-purple-500/30 rounded-xl p-6 max-w-sm w-full shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-purple-400 mb-2">🎰 SPIN 2 WIN</h3>
              <p className="text-sm text-gray-400">Win Retail Tickets!</p>
              <div className="text-xs text-gray-500 mt-2">
                Spins used: {spinsUsed}/5 | Tickets: {tickets}
              </div>
            </div>
            
            {/* Reels */}
            <div className="flex justify-center gap-2 mb-6">
              {reelSymbols.map((symbol, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-zinc-800 border border-purple-500/30 rounded-lg flex items-center justify-center text-2xl font-bold"
                >
                  {symbol}
                </div>
              ))}
            </div>
            
            {/* Result */}
            {result && (
              <div className="text-center mb-6">
                <div className={`text-2xl font-bold mb-2 transition-all duration-500 ${
                  result.includes('JACKPOT') ? 'text-yellow-400' : 
                  result.includes('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {result}
                </div>
              </div>
            )}
            
            {/* Spin button */}
            {!result && !isSpinning && spinsUsed < 5 && (
              <button
                onClick={handleSpin}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 mb-4 shadow-lg hover:shadow-purple-500/25"
              >
                🎰 SPIN ({5 - spinsUsed} left)
              </button>
            )}
            
            {/* Respin option */}
            {showRespin && tickets > 0 && spinsUsed < 5 && (
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">
                  Use 1 Retail Ticket to Respin? (You have {tickets})
                </div>
                <button
                  onClick={handleRespin}
                  className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                >
                  🔄 Respin ({5 - spinsUsed} left)
                </button>
              </div>
            )}
            
            {/* Ticket count */}
            <div className="absolute top-4 left-4 bg-slate-800 px-3 py-1 rounded-full text-sm border border-purple-500/30">
              🎫 {tickets} Tickets
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SpinToWin; 