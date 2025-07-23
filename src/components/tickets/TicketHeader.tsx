import React from 'react';
import { useTicketSystem } from '../../hooks/useTicketSystem';

const TicketHeader = () => {
  const { userData, campaignInfo } = useTicketSystem();
  const ticketBalance = userData.ticketBalance;
  const nextMilestone = 50; // Next reward tier
  const progressPercentage = Math.min((ticketBalance / nextMilestone) * 100, 100);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-cyan-300">🎟️ Retail Tickets</h1>
        <div className="text-right">
          <div className="text-2xl font-bold text-cyan-400">{ticketBalance}</div>
          <div className="text-xs text-cyan-200">Tickets Available</div>
        </div>
      </div>
      <p className="text-sm text-cyan-100">
        Earn. Spin. Win. Every domain you buy could unlock merch, discounts, or mystery rewards.
      </p>
      <div className="mt-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-lg p-3">
        <div className="text-xs text-cyan-300 mb-1">Progress to Next Milestone</div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-cyan-200 mt-1">
          {ticketBalance}/{nextMilestone} tickets to next reward tier
        </div>
      </div>
    </div>
  );
};

export default TicketHeader; 