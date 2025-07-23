import React from 'react';
import { useTicketSystem } from '../../hooks/useTicketSystem';

const CampaignBanner = () => {
  const { campaignInfo } = useTicketSystem();

  if (!campaignInfo.isActive) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-to-r from-purple-800/80 to-cyan-600/80 p-4 rounded-xl shadow-lg border border-purple-500/30 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-mono">
            🔥 Current Campaign: <span className="font-bold text-cyan-300">{campaignInfo.name}</span>
          </p>
          <p className="text-cyan-100 text-xs mt-1">
            {campaignInfo.description} – <em>Ends {formatDate(campaignInfo.endDate)}</em>
          </p>
          <p className="text-cyan-200 text-xs mt-2 opacity-80">
            {campaignInfo.bonusMultiplier}x bonus on eligible purchases
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-cyan-200">Active</div>
          <div className="text-xs text-cyan-400">🔥</div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBanner; 