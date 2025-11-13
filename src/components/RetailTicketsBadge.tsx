import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSession } from '@supabase/auth-helpers-react';
import { useRetailTickets } from '../hooks/useRetailTickets';
import { useRetailAccess } from '../hooks/useRetailAccess';

export default function RetailTicketsBadge() {
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  const session = useSession();
  const wallet = publicKey?.toString() || null;
  const { balance: rtBalance, loading: ticketsLoading } = useRetailTickets(wallet);
  const { tier, loading: accessLoading } = useRetailAccess(wallet);

  const isAuthenticated = !!publicKey || !!session;
  const isLoading = ticketsLoading || accessLoading;

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/retail-tickets');
    } else {
      navigate('/outerring');
    }
  };

  return (
    <div
      onClick={handleClick}
      className="fixed top-4 right-4 z-50 cursor-pointer transition-all duration-200 hover:scale-105"
    >
      <div className="bg-gradient-to-r from-cyan-600/90 to-purple-600/90 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-4 py-2 shadow-lg">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-white text-sm font-semibold">Loading...</span>
          </div>
        ) : isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-white text-sm font-bold">RT: {rtBalance}</div>
              <div className="text-cyan-200 text-xs">{tier || 'Retailpunk'}</div>
            </div>
          </div>
        ) : (
          <div className="text-white text-sm font-semibold whitespace-nowrap">
            Connect to earn RT
          </div>
        )}
      </div>
    </div>
  );
}

