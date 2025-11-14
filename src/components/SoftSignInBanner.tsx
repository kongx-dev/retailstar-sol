import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

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
  const { connect, select, wallets, wallet, connecting } = useWallet();

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const handleConnect = async () => {
    try {
      // If no wallet is selected, try to select Phantom first
      if (!wallet) {
        const phantomWallet = wallets.find(w => w.adapter.name === 'Phantom');
        const solflareWallet = wallets.find(w => w.adapter.name === 'Solflare');
        
        if (phantomWallet) {
          select(phantomWallet.adapter.name);
        } else if (solflareWallet) {
          select(solflareWallet.adapter.name);
        } else if (wallets.length > 0) {
          select(wallets[0].adapter.name);
        } else {
          alert('No wallet extensions detected. Please install Phantom or Solflare wallet extension.');
          return;
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      await connect();
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      if (!error?.message?.includes('User rejected') && !error?.message?.includes('User cancelled')) {
        alert(`Failed to connect wallet: ${error?.message || 'Unknown error'}`);
      }
    }
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
