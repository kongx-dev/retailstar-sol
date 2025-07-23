import React from 'react';
import { useTicketSystem } from '../../hooks/useTicketSystem';

const TicketHistory = () => {
  const { userData } = useTicketSystem();

  const getEventIcon = (source: string) => {
    switch (source) {
      case 'scav-rack':
      case 'premium-purchase':
      case 'liquid-tags':
      case 'blueprint-ready':
        return '🛍️';
      case 'feedback':
        return '💬';
      case 'wheel-win':
        return '🎰';
      case 'referral':
        return '👥';
      default:
        return '🎟️';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 14) return 'Last week';
    if (diffDays <= 21) return '2 weeks ago';
    return '3+ weeks ago';
  };

  return (
    <div className="mt-8">
      <h3 className="text-cyan-200 text-lg font-bold mb-4 flex items-center gap-2">
        🕒 Ticket Activity
        <span className="text-xs text-cyan-400 font-normal">(Last 30 days)</span>
      </h3>
      
      <div className="space-y-3">
        {userData.history.map((h, i) => (
          <div 
            key={i}
            className="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-cyan-600/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{getEventIcon(h.source)}</span>
                <div>
                  <div className="text-sm text-cyan-200 font-medium">
                    +{h.amount} 🎟️ — {h.event}
                  </div>
                  <div className="text-xs text-cyan-400 mt-1">
                    {h.source.replace('-', ' ')} • {formatDate(h.timestamp)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-cyan-300 italic">
                {formatDate(h.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-lg">
        <div className="text-xs text-cyan-300 mb-2">
          💡 <strong>Pro Tip:</strong> Complete more actions to earn tickets faster!
        </div>
        <div className="text-xs text-cyan-200 space-y-1">
          <div>• Buy domains (1-3 tickets each)</div>
          <div>• Submit feedback (3 tickets)</div>
          <div>• Refer friends (5 tickets)</div>
          <div>• Win spin wheel (5-20 tickets)</div>
        </div>
      </div>
    </div>
  );
};

export default TicketHistory; 