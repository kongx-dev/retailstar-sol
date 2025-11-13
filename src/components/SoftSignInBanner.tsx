import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SoftSignInBannerProps {
  title?: string;
  message?: string;
  ctaText?: string;
  onDismiss?: () => void;
  className?: string;
}

export default function SoftSignInBanner({ 
  title = "Sign in to earn rewards",
  message = "Connect your wallet to earn Retail Tickets and access exclusive features",
  ctaText = "Connect Wallet",
  onDismiss,
  className = ""
}: SoftSignInBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const handleConnect = () => {
    // For now, redirect to outerring for wallet connection
    // In the future, this would trigger actual wallet connection
    navigate('/outerring');
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-lg p-4 mb-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-cyan-300 mb-2">{title}</h3>
          <p className="text-zinc-300 text-sm mb-3">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={handleConnect}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm"
            >
              {ctaText}
            </button>
            <button
              onClick={handleDismiss}
              className="text-zinc-400 hover:text-zinc-300 text-sm transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-zinc-400 hover:text-zinc-300 ml-4 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
