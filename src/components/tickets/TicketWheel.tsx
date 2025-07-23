import React from 'react';
import { useTicketSystem } from '../../hooks/useTicketSystem';
import { getRewardsPool } from '../../lib/spinEngine';

const TicketWheel = () => {
  const { 
    userData, 
    isSpinning, 
    canSpin, 
    handleSpin, 
    lastSpinResult,
    spinCost 
  } = useTicketSystem();

  const rewards = getRewardsPool();

  const onSpinClick = async () => {
    if (!canSpin) return;
    
    const result = await handleSpin();
    if (result) {
      // Show result notification (could be a toast)
              // console.log('🎰 Spin result:', result.result.label);
    }
  };

  return (
    <div className="p-6 bg-gray-900/80 rounded-lg border border-cyan-800/50 shadow-md flex flex-col items-center backdrop-blur-sm">
      <h2 className="text-lg font-semibold text-cyan-300 mb-4">🎰 Spin to Win</h2>
      
      {/* Wheel visualization */}
      <div className="relative w-32 h-32 mb-4">
        <div className={`w-full h-full rounded-full border-4 border-cyan-500 flex items-center justify-center transition-transform duration-2000 ${
          isSpinning ? 'animate-spin' : ''
        }`}>
          <div className="text-2xl">🎰</div>
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-400 text-lg">
          ▼
        </div>
      </div>
      
      {/* Last spin result */}
      {lastSpinResult && (
        <div className="mb-4 p-3 bg-gradient-to-r from-green-900/20 to-cyan-900/20 border border-green-500/30 rounded-lg">
          <div className="text-sm text-green-300 font-medium">
            🎉 Last Win: {lastSpinResult.result.label}
          </div>
          <div className="text-xs text-green-200">
            {lastSpinResult.result.description}
          </div>
        </div>
      )}
      
      <button
        onClick={onSpinClick}
        disabled={!canSpin}
        className={`bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed ${
          isSpinning ? 'animate-pulse' : ''
        }`}
      >
        {isSpinning ? 'Spinning...' : `Spin (${spinCost} Tickets)`}
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-cyan-100 mb-2">
          Chance to win discounts, merch access, or rare ticket drops.
        </p>
        <div className="text-xs text-cyan-300 space-y-1">
          {rewards.map((reward, index) => (
            <div key={index}>
              🎁 {reward.weight}% - {reward.label}
            </div>
          ))}
        </div>
      </div>
      
      {!canSpin && userData.ticketBalance < spinCost && (
        <div className="mt-3 text-xs text-red-400">
          Need {spinCost - userData.ticketBalance} more tickets to spin
        </div>
      )}
    </div>
  );
};

export default TicketWheel; 