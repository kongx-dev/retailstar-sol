import React from 'react';
import { useTicketSystem } from '../../hooks/useTicketSystem';
import { getRewardsPool } from '../../lib/spinEngine';

const TicketClaim = () => {
  const { userData } = useTicketSystem();
  const ticketCount = userData.ticketBalance;
  
  const rewards = [
    {
      id: 'discount-15',
      name: '15% Off Coupon',
      cost: 25,
      available: ticketCount >= 25,
      description: '15% off any domain purchase',
      claimed: false
    },
    {
      id: 'landing-page',
      name: 'Free Landing Page',
      cost: 50,
      available: ticketCount >= 50,
      description: 'Custom landing page build',
      claimed: false
    },
    {
      id: 'mythic-hoodie',
      name: 'Mythic Hoodie Whitelist',
      cost: 100,
      available: ticketCount >= 100,
      description: 'Exclusive merch access',
      claimed: false
    },
    {
      id: 'mystery-box',
      name: 'Mystery Box',
      cost: 75,
      available: ticketCount >= 75,
      description: 'Random rare reward',
      claimed: false
    }
  ];

  const handleClaim = (rewardId: string) => {
    // TODO: Connect to backend for actual claim logic
            // console.log(`🎁 Claiming reward: ${rewardId}`);
  };

  return (
    <div className="p-6 bg-gray-900/80 rounded-lg border border-cyan-800/50 shadow-md backdrop-blur-sm">
      <h2 className="text-lg font-semibold text-cyan-300 mb-4">🎁 Redeem Rewards</h2>
      
      <div className="space-y-3 mb-4">
        {rewards.map((reward) => (
          <div 
            key={reward.id}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              reward.available 
                ? 'border-cyan-600/50 bg-cyan-900/20 hover:bg-cyan-900/30' 
                : 'border-gray-600/50 bg-gray-800/20 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-cyan-200">
                    {reward.name}
                  </span>
                  <span className="text-xs text-cyan-400">
                    ({reward.cost} 🎟️)
                  </span>
                </div>
                <div className="text-xs text-cyan-300 mt-1">
                  {reward.description}
                </div>
              </div>
              <button
                onClick={() => handleClaim(reward.id)}
                disabled={!reward.available || reward.claimed}
                className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
                  reward.available && !reward.claimed
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {reward.claimed ? 'Claimed' : 'Claim'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-lg">
        <p className="text-xs text-cyan-400 mb-1">
          You currently have <span className="font-bold text-cyan-300">{ticketCount}</span> tickets.
        </p>
        <div className="text-xs text-cyan-200">
          {ticketCount >= 25 ? '✅' : '🔒'} 25 tickets for first reward
        </div>
      </div>
    </div>
  );
};

export default TicketClaim; 