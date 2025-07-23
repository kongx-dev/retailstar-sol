import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { claimDayPass } from '../lib/supabase';
import { useRetailAccess } from '../hooks/useRetailAccess';
import SEOHead from '../components/SEOHead';
import DayPassCountdown from '../components/DayPassCountdown';

export default function RetailpassPage() {
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toString() || null;
  const access = useRetailAccess(walletAddress);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimResult, setClaimResult] = useState<{ success: boolean; message: string } | null>(null);

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
      
      <div className="max-w-4xl mx-auto pt-16 pb-8 px-4">
        <h1 className="text-5xl md:text-7xl font-black mb-8 neon-pulse solana-gradient flicker-solana text-center">
          🎫 Retailpass
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Access Status */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Access Status</h2>
            
            {access.loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
                <p className="mt-2 text-gray-400">Checking access...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Tier:</span>
                  <span className={`font-bold ${
                    access.tier === 'Tier 0' ? 'text-red-400' : 'text-cyan-400'
                  }`}>
                    {access.tier}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Retail Tickets:</span>
                  <span className="font-bold text-yellow-400">🎫 {access.retailTickets}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">WifHoodie Holder:</span>
                  <span className={`font-bold ${access.wifhoodie ? 'text-green-400' : 'text-red-400'}`}>
                    {access.wifhoodie ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Mall Access:</span>
                  <span className={`font-bold ${access.hasAccess ? 'text-green-400' : 'text-red-400'}`}>
                    {access.hasAccess ? '✅ Granted' : '❌ Denied'}
                  </span>
                </div>
                
                {access.expiresAt && (
                  <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
                    <DayPassCountdown expiresAt={access.expiresAt} />
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Right Column - Benefits & Actions */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Mall Benefits</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛍️</span>
                <span>Exclusive vendor booths</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎰</span>
                <span>Slot machine discounts</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🧵</span>
                <span>Merch coupons & deals</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔓</span>
                <span>Vault + secret lounge access</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span>Scavenger hunt perks</span>
              </div>
            </div>
            
            {!walletAddress ? (
              <div className="text-center py-4">
                <p className="text-gray-400 mb-4">Connect your wallet to manage your Retailpass</p>
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  Connect Wallet
                </button>
              </div>
            ) : access.hasAccess ? (
              <div className="text-center py-4">
                <p className="text-green-400 font-bold mb-2">✅ You have mall access!</p>
                <a 
                  href="/mall" 
                  className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold transition-colors inline-block"
                >
                  Enter Mall
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Get mall access by claiming a day pass with 1 Retail Ticket
                </p>
                
                <button
                  onClick={handleClaimDayPass}
                  disabled={isClaiming || access.retailTickets < 1}
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-200 ${
                    access.retailTickets >= 1 && !isClaiming
                      ? 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg hover:shadow-yellow-500/25'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isClaiming ? 'Claiming...' : `Claim Day Pass (1 RT)`}
                </button>
                
                {claimResult && (
                  <div className={`p-3 rounded-lg text-center ${
                    claimResult.success 
                      ? 'bg-green-900/30 border border-green-500/50 text-green-400'
                      : 'bg-red-900/30 border border-red-500/50 text-red-400'
                  }`}>
                    {claimResult.message}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* How to Earn RTs */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">How to Earn Retail Tickets</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">🎰</span>
                <span>Slot machine jackpots</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">🛒</span>
                <span>Domain purchases (0.25 SOL+)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">🎯</span>
                <span>Scavenger hunt completion</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">🎁</span>
                <span>Special events & promotions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 