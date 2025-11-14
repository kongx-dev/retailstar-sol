import React, { useState } from 'react';
import { claimDayPass, getRetailpassTiers } from '../lib/supabase';
import { useRetailAccess } from '../hooks/useRetailAccess';
import { useRetailTickets } from '../hooks/useRetailTickets';
import { useRetailpassClaims } from '../hooks/useRetailpassClaims';
import SEOHead from '../components/SEOHead';
import DayPassCountdown from '../components/DayPassCountdown';
import TierCard from '../components/TierCard';
import SpendActionCard from '../components/SpendActionCard';
import TicketHistoryTable from '../components/TicketHistoryTable';
import SoftSignInBanner from '../components/SoftSignInBanner';

export default function RetailpassPage() {
  // For demo purposes, use a mock wallet address
  const walletAddress = "7vswd...fE9s"; // Mock wallet - replace with actual wallet connection later
  const access = useRetailAccess(walletAddress);
  const { balance: ticketBalance, logs: ticketLogs, loading: ticketsLoading } = useRetailTickets(walletAddress);
  const { claims, activeClaim, loading: claimsLoading, createClaim } = useRetailpassClaims(walletAddress);
  const [tiers, setTiers] = useState<any[]>([]);
  const [tiersLoading, setTiersLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimResult, setClaimResult] = useState<{ success: boolean; message: string } | null>(null);
  const [spendLoading, setSpendLoading] = useState<string | null>(null);

  // Load tiers on component mount
  React.useEffect(() => {
    const loadTiers = async () => {
      try {
        const tiersData = await getRetailpassTiers();
        setTiers(tiersData);
      } catch (error) {
        console.error('Error loading tiers:', error);
      } finally {
        setTiersLoading(false);
      }
    };
    loadTiers();
  }, []);

  const handleClaimDayPass = async () => {
    if (!walletAddress) return;
    
    setIsClaiming(true);
    setClaimResult(null);
    
    try {
      const result = await claimDayPass(walletAddress);
      if (result.success) {
        setClaimResult({ success: true, message: 'Day pass claimed successfully! 🎫' });
        // Refresh access data
        window.location.reload();
      } else {
        setClaimResult({ success: false, message: result.error || 'Failed to claim day pass' });
      }
    } catch (error) {
      setClaimResult({ success: false, message: 'Error claiming day pass' });
    } finally {
      setIsClaiming(false);
    }
  };

  const handleSpendTickets = async (action: string, cost: number, description: string) => {
    if (!walletAddress || ticketBalance < cost) return;
    
    setSpendLoading(action);
    
    try {
      // Simulate spending tickets
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would call the actual spend function
      setClaimResult({ 
        success: true, 
        message: `${description} activated! Spent ${cost} RT` 
      });
    } catch (error) {
      setClaimResult({ 
        success: false, 
        message: `Failed to activate ${description}` 
      });
    } finally {
      setSpendLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="retailpass"
        customTitle="Retailpass | Retailstar.sol - Mall Access & Benefits"
        customDescription="Get your Retailpass for exclusive mall access. Earn Retail Tickets, claim day passes, and unlock premium features."
        customKeywords="Retailpass, mall access, Retail Tickets, day pass, exclusive benefits"
        imageUrl="https://retailstar.xyz/assets/rs-og-card.png"
        canonicalUrl="https://retailstar.xyz/retailpass"
        ogImage="https://retailstar.xyz/assets/rs-og-card.png"
        twitterImage="https://retailstar.xyz/assets/rs-og-card.png"
      />
      
      {/* Soft Sign-in Banner */}
      <div className="max-w-6xl mx-auto pt-4 px-4">
        <SoftSignInBanner 
          title="Connect to manage your Retailpass"
          message="Sign in to view your access status, claim day passes, and manage your mall benefits"
          ctaText="Connect Wallet"
        />
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 pb-8 px-4">
        <h1 className="text-5xl md:text-7xl font-black mb-8 neon-pulse solana-gradient flicker-solana text-center">
          🎫 Retailpass
        </h1>
        
        {/* Section A: Access Status Card */}
        <div className="mb-8">
          <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-cyan-300 mb-6">🎫 Your Access Status</h2>
            
            {access.loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-zinc-700 rounded w-1/3"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-300">{access.tier}</div>
                  <div className="text-zinc-400 text-sm">Current Tier</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-300">{ticketBalance}</div>
                  <div className="text-zinc-400 text-sm">Retail Tickets</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${access.hasAccess ? 'text-green-400' : 'text-red-400'}`}>
                    {access.hasAccess ? '✅' : '❌'}
                  </div>
                  <div className="text-zinc-400 text-sm">Access Status</div>
                </div>
              </div>
            )}
            
            {activeClaim && (
              <div className="mt-6 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-semibold">Active Pass: {activeClaim.tier_name}</span>
                  <DayPassCountdown expiresAt={activeClaim.expires_at} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section B: Ticket Balance & History */}
        <div className="mb-8">
          <TicketHistoryTable 
            logs={ticketLogs} 
            loading={ticketsLoading}
            error={null}
          />
        </div>

        {/* Section C: Spend Options Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-300 mb-6">💳 Spend Your Tickets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SpendActionCard
              title="Mall Pass"
              cost={1}
              icon="🎫"
              description="24-hour mall access"
              onClick={() => handleSpendTickets('mall-pass', 1, 'Mall Pass')}
              disabled={ticketBalance < 1}
              loading={spendLoading === 'mall-pass'}
            />
            <SpendActionCard
              title="Re-Spin"
              cost={1}
              icon="🎰"
              description="Slot machine credit"
              onClick={() => handleSpendTickets('re-spin', 1, 'Re-Spin')}
              disabled={ticketBalance < 1}
              loading={spendLoading === 're-spin'}
            />
            <SpendActionCard
              title="Vault Access"
              cost={3}
              icon="🔒"
              description="Unlock vaulted domains"
              onClick={() => handleSpendTickets('vault-access', 3, 'Vault Access')}
              disabled={ticketBalance < 3}
              loading={spendLoading === 'vault-access'}
            />
            <SpendActionCard
              title="Rank Upgrade"
              cost={5}
              icon="⬆️"
              description="Temporary tier boost"
              onClick={() => handleSpendTickets('rank-upgrade', 5, 'Rank Upgrade')}
              disabled={ticketBalance < 5}
              loading={spendLoading === 'rank-upgrade'}
            />
          </div>
        </div>

        {/* Section D: Tier Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-300 mb-6">🏆 Available Tiers</h2>
          {tiersLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-zinc-800 rounded-lg h-64"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tiers.map((tier) => (
                <TierCard
                  key={tier.tier_name}
                  tier={tier}
                  isActive={tier.tier_name === access.tier}
                  isUpgradeable={ticketBalance >= 5 && tier.tier_name !== access.tier}
                  onUpgrade={() => handleSpendTickets('tier-upgrade', 5, `${tier.tier_name} Upgrade`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Section E: My Claims Log */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-300 mb-6">📋 My Claims</h2>
          {claimsLoading ? (
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6">
              <div className="animate-pulse space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-zinc-800 rounded"></div>
                ))}
              </div>
            </div>
          ) : claims.length === 0 ? (
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6 text-center">
              <p className="text-zinc-400 mb-2">No claims yet</p>
              <p className="text-zinc-500 text-sm">Your claim history will appear here</p>
            </div>
          ) : (
            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-800">
                    <tr>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Tier</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Issued</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Expires</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Method</th>
                      <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((claim) => {
                      const isExpired = new Date(claim.expires_at) < new Date();
                      return (
                        <tr key={claim.id} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                          <td className="py-3 px-4 text-white font-medium">{claim.tier_name}</td>
                          <td className="py-3 px-4 text-zinc-300">
                            {new Date(claim.issued_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-zinc-300">
                            {new Date(claim.expires_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-zinc-300">{claim.claim_method}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              isExpired 
                                ? 'bg-red-900/20 text-red-300' 
                                : 'bg-green-900/20 text-green-300'
                            }`}>
                              {isExpired ? 'Expired' : 'Active'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {claimResult && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg border z-50 ${
            claimResult.success 
              ? 'bg-green-900/20 border-green-500/30 text-green-300' 
              : 'bg-red-900/20 border-red-500/30 text-red-300'
          }`}>
            {claimResult.message}
          </div>
        )}
      </div>
    </div>
  );
} 