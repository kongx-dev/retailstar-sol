import React from 'react';

interface SpendActionCardProps {
  title: string;
  cost: number;
  icon: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function SpendActionCard({
  title,
  cost,
  icon,
  description,
  onClick,
  disabled = false,
  loading = false
}: SpendActionCardProps) {
  return (
    <div 
      className={`
        relative p-6 rounded-lg border-2 transition-all duration-300
        bg-zinc-900/50 border-zinc-700/50
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-105 hover:border-cyan-400 cursor-pointer hover:shadow-lg hover:shadow-cyan-400/20'
        }
        ${loading ? 'animate-pulse' : ''}
      `}
      onClick={disabled || loading ? undefined : onClick}
    >
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-zinc-800/50 rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
        </div>
      )}

      {/* Icon and title */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-cyan-300 font-semibold">{cost} RT</span>
            <span className="text-zinc-400 text-sm">cost</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-300 mb-4">{description}</p>

      {/* Action button */}
      <button
        disabled={disabled || loading}
        className={`
          w-full py-2 px-4 rounded font-semibold transition-colors
          ${disabled || loading
            ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
            : 'bg-cyan-600 hover:bg-cyan-500 text-white'
          }
        `}
      >
        {loading ? 'Processing...' : disabled ? 'Insufficient Tickets' : 'Spend Tickets'}
      </button>

      {/* Cost indicator */}
      <div className="absolute top-2 right-2">
        <div className="bg-cyan-600 text-white text-xs px-2 py-1 rounded">
          {cost} RT
        </div>
      </div>
    </div>
  );
}













