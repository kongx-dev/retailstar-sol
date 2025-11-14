import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRetailAccess } from '../hooks/useRetailAccess';
import { useRetailTickets } from '../hooks/useRetailTickets';
import { useRetailpassClaims } from '../hooks/useRetailpassClaims';
import SEOHead from '../components/SEOHead';
import SpendActionCard from '../components/SpendActionCard';
import AuthSection from '../components/AuthSection';

export default function OuterRingPage() {
  const supabase = useSupabaseClient();
  const sessionData = useSession();
  const { session, loading: sessionLoading } = sessionData || { session: null, loading: false };
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  
  // Use actual wallet address if connected, otherwise fall back to mock for demo
  const walletAddress = publicKey?.toString() || "7vswd...fE9s";
  const access = useRetailAccess(walletAddress);
  const { balance: ticketBalance, loading: ticketsLoading } = useRetailTickets(walletAddress);
  const { claims, activeClaim, loading: claimsLoading } = useRetailpassClaims(walletAddress);
  
  const [isBurningTicket, setIsBurningTicket] = useState(false);
  const [burnResult, setBurnResult] = useState<{ success: boolean; message: string } | null>(null);
  const [timeUntilReentry, setTimeUntilReentry] = useState<string>('');

  // Check if user has expired access
  const hasExpiredAccess = activeClaim && new Date(activeClaim.expires_at) < new Date();
  const hasNeverClaimed = !activeClaim && !access.hasAccess;
  const canBurnTicket = ticketBalance >= 1 && (hasExpiredAccess || hasNeverClaimed);

  // Calculate time until re-entry is allowed (if expired)
  useEffect(() => {
    if (hasExpiredAccess && activeClaim) {
      const updateCountdown = () => {
        const now = new Date();
        const expiredAt = new Date(activeClaim.expires_at);
        const timeDiff = expiredAt.getTime() - now.getTime();
        
        if (timeDiff > 0) {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeUntilReentry(`${hours}h ${minutes}m`);
        } else {
          setTimeUntilReentry('Available now');
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [hasExpiredAccess, activeClaim]);

  const handleBurnTicket = async () => {
    if (!walletAddress || ticketBalance < 1) return;
    
    setIsBurningTicket(true);
    setBurnResult(null);
    
    try {
      // Simulate burning a ticket for mall access
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBurnResult({ 
        success: true, 
        message: 'Ticket burned! Mall access granted for 24 hours 🎫' 
      });
      
      // Redirect to mall after successful burn
      setTimeout(() => {
        navigate('/retailpass');
      }, 2000);
    } catch (error) {
      setBurnResult({ 
        success: false, 
        message: 'Failed to burn ticket. Please try again.' 
      });
    } finally {
      setIsBurningTicket(false);
    }
  };

  const getAccessStatusMessage = () => {
    if (access.loading || ticketsLoading || claimsLoading) {
      return 'Checking your access status...';
    }
    
    if (hasExpiredAccess) {
      return 'Your mall access has expired. Burn a ticket to re-enter!';
    }
    
    if (hasNeverClaimed) {
      return 'Welcome to the Outer Ring! Burn a ticket to enter the mall.';
    }
    
    if (access.hasAccess) {
      return 'You have active mall access!';
    }
    
    return 'No mall access detected.';
  };

  const getStatusColor = () => {
    if (access.loading || ticketsLoading || claimsLoading) {
      return 'text-cyan-400';
    }
    
    if (hasExpiredAccess) {
      return 'text-yellow-400';
    }
    
    if (hasNeverClaimed) {
      return 'text-zinc-400';
    }
    
    if (access.hasAccess) {
      return 'text-green-400';
    }
    
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="outerring"
        customTitle="Outer Ring | Retailstar.sol - Mall Access Gateway"
        customDescription="The Outer Ring - your gateway to Retailstar Mall. Check your access status, burn tickets for entry, and discover what awaits inside."
        customKeywords="outer ring, mall access, retail tickets, retailstar mall, entry gateway"
        imageUrl="https://retailstar.xyz/assets/rsopengraph.png"
        canonicalUrl="https://retailstar.xyz/outerring"
        ogImage="https://retailstar.xyz/assets/rsopengraph.png"
        twitterImage="https://retailstar.xyz/assets/rsopengraph.png"
      />
      
      <div className="max-w-4xl mx-auto pt-16 pb-8 px-4">
        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 hover:border-zinc-500 rounded-lg font-semibold transition-all duration-200 text-white"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-8 neon-pulse solana-gradient flicker-solana text-center">
          🚪 Restricted Zone Portal
        </h1>
        
        {/* Authentication Section - Now includes everything in one card */}
        <AuthSection />
        
        <div className="text-center mb-8">
          <p className="text-xl text-zinc-300 mb-4">
            Access to certain mall areas requires authentication
          </p>
          <p className="text-sm text-zinc-400">
            Connect your wallet and burn a Retail Ticket to enter restricted zones
          </p>
        </div>
        
        {/* Access Status Card */}
        <div className="mb-8">
          <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">🎫 Access Status</h2>
            
            {access.loading || ticketsLoading || claimsLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <p className={`text-lg font-semibold ${getStatusColor()}`}>
                    {getAccessStatusMessage()}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-cyan-300">{ticketBalance}</div>
                    <div className="text-zinc-400 text-sm">Retail Tickets</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${access.hasAccess ? 'text-green-400' : 'text-red-400'}`}>
                      {access.hasAccess ? '✅' : '❌'}
                    </div>
                    <div className="text-zinc-400 text-sm">Mall Access</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-300">{access.tier}</div>
                    <div className="text-zinc-400 text-sm">Current Tier</div>
                  </div>
                </div>

                {/* Expired Access Countdown */}
                {hasExpiredAccess && timeUntilReentry && (
                  <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded">
                    <div className="text-center">
                      <p className="text-yellow-300 font-semibold mb-2">Access Expired</p>
                      <p className="text-zinc-400 text-sm">
                        Your last pass expired. Burn a ticket to re-enter the mall.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Burn Ticket Section */}
        {canBurnTicket && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">🔥 Burn a Ticket</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <SpendActionCard
                title="Enter Mall"
                cost={1}
                icon="🎫"
                description="Burn 1 Retail Ticket for 24-hour mall access"
                onClick={handleBurnTicket}
                disabled={ticketBalance < 1}
                loading={isBurningTicket}
              />
              
              <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">What's Inside?</h3>
                <div className="space-y-2 text-sm text-zinc-300">
                  <div>• Exclusive domain marketplace</div>
                  <div>• Slot machine discounts</div>
                  <div>• Scavenger hunt perks</div>
                  <div>• Vault access</div>
                  <div>• Secret lounge areas</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Tickets Available */}
        {!canBurnTicket && ticketBalance < 1 && (
          <div className="mb-8">
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold text-red-400 mb-4">No Tickets Available</h2>
              <p className="text-zinc-400 mb-4">
                You need at least 1 Retail Ticket to enter the mall.
              </p>
              <div className="space-y-2 text-sm text-zinc-300">
                <p>Earn tickets by:</p>
                <div>• Buying domains (1-3 tickets each)</div>
                <div>• Completing scavenger hunts</div>
                <div>• Winning slot machine jackpots</div>
                <div>• Participating in special events</div>
              </div>
              <button
                onClick={() => navigate('/retailpass')}
                className="mt-4 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Check Your Tickets
              </button>
            </div>
          </div>
        )}

        {/* Already Has Access */}
        {access.hasAccess && !hasExpiredAccess && (
          <div className="mb-8">
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold text-green-400 mb-4">✅ You Have Access!</h2>
              <p className="text-zinc-400 mb-4">
                You already have active mall access. No need to burn a ticket!
              </p>
              <button
                onClick={() => navigate('/retailpass')}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors mr-4"
              >
                Manage Access
              </button>
              <button
                onClick={() => navigate('/marketplace')}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Enter Mall
              </button>
            </div>
          </div>
        )}

        {/* Success/Error Messages */}
        {burnResult && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg border z-50 ${
            burnResult.success 
              ? 'bg-green-900/20 border-green-500/30 text-green-300' 
              : 'bg-red-900/20 border-red-500/30 text-red-300'
          }`}>
            {burnResult.message}
          </div>
        )}
      </div>
    </div>
  );
}

