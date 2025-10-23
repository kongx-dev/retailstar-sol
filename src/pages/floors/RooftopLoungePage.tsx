import React from 'react';
import { Link } from 'react-router-dom';
import FloorIndicator from '../../components/FloorIndicator';
import Terminal from '../../components/Terminal';
import SEOHead from '../../components/SEOHead';

// Mock wallet for demo
const MOCK_WALLET = "7vswd...fE9s";

export default function RooftopLoungePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white relative overflow-hidden">
        <SEOHead 
          target="rooftop-lounge.retailstar.sol"
          pageType="floor"
          customTitle="Rooftop Lounge - DAO Elite Tier | Retailstar Mall"
          customDescription="Exclusive Rooftop Lounge for DAO members and VIP holders. Live auctions, DAO conversations, and founder lore in an ethereal jazz club atmosphere."
          customKeywords="rooftop lounge, dao membership, vip access, live auctions, founder lore, elite tier"
        />

        {/* Starfield Background */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            />
          ))}
        </div>

        {/* Ethereal Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="p-6 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">✨</span>
                <div>
                  <h1 className="text-3xl font-bold text-purple-400">
                    Rooftop Lounge
                  </h1>
                  <p className="text-gray-400 text-sm">DAO Elite Tier - Level 4</p>
                </div>
              </div>
              <FloorIndicator wallet={MOCK_WALLET} />
            </div>
          </header>

          {/* Navigation */}
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
                <span className="mr-2">🎤</span>
                Live Auctions
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
                <span className="mr-2">💬</span>
                DAO Conversations
              </button>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
                <span className="mr-2">📜</span>
                Founder Lore
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Sidebar - Terminal */}
              <div className="lg:col-span-1">
                <div className="bg-black/90 border border-purple-500/50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center">
                    <span className="mr-2">💻</span>
                    Elite Terminal
                  </h3>
                  <Terminal wallet={MOCK_WALLET} />
                </div>

                {/* DAO Status */}
                <div className="bg-gray-900/80 border border-purple-500/50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center">
                    <span className="mr-2">🏛️</span>
                    DAO Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Membership:</span>
                      <span className="text-green-400 font-semibold">✅ Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Tier:</span>
                      <span className="text-purple-400 font-semibold">Elite</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Voting Power:</span>
                      <span className="text-cyan-400 font-semibold">High</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3 mt-3">
                      <div className="text-xs text-gray-500">
                        Access to exclusive DAO governance, live auctions, and founder conversations.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Live Auction Terminal */}
                  <div className="bg-gray-900/80 border border-purple-500/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                      <span className="mr-2">🎤</span>
                      Live Auction Terminal
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-400/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-purple-300">Current Auction</span>
                          <span className="text-xs text-gray-400">Live</span>
                        </div>
                        <div className="text-lg font-bold text-white">retailstar.sol</div>
                        <div className="text-sm text-gray-300">Current Bid: 150 SOL</div>
                        <div className="text-xs text-gray-400">Time Left: 2h 34m</div>
                      </div>
                      
                      <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-300">Upcoming</span>
                          <span className="text-xs text-gray-400">Scheduled</span>
                        </div>
                        <div className="text-sm text-gray-300">founder.retailstar.sol</div>
                        <div className="text-xs text-gray-400">Starts in 4h 12m</div>
                      </div>
                    </div>
                  </div>

                  {/* DAO Conversations */}
                  <div className="bg-gray-900/80 border border-purple-500/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
                      <span className="mr-2">💬</span>
                      DAO Conversations
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                            F
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-purple-300">Founder</div>
                            <div className="text-xs text-gray-400">2 minutes ago</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-300">
                          "The future of retail is decentralized. We're building the infrastructure for the next generation of digital commerce."
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-xs font-bold">
                            D
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-cyan-300">DAO Member</div>
                            <div className="text-xs text-gray-400">5 minutes ago</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-300">
                          "The governance proposal for the new floor structure is looking solid. Excited to see the implementation."
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founder Lore Section */}
                <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-400/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                    <span className="mr-2">📜</span>
                    Founder Lore
                  </h3>
                  <div className="text-sm text-gray-300 leading-relaxed">
                    "In the early days of Solana, when the network was still finding its footing, 
                    a group of visionaries saw the potential for a decentralized retail ecosystem. 
                    They built Retailstar not just as a marketplace, but as a digital fortress where 
                    only the worthy could ascend. Each floor represents a different level of commitment 
                    to the vision of decentralized commerce. The basement welcomes all, but the rooftop 
                    is reserved for those who have proven their dedication to the cause."
                  </div>
                  <div className="mt-4 text-xs text-gray-400 italic">
                    - The Founders, 2024
                  </div>
                </div>

                {/* Jazz Bar Atmosphere */}
                <div className="mt-8 text-center">
                  <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-6">
                    <div className="text-4xl mb-4">🎷</div>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">Jazz Bar Atmosphere</h3>
                    <p className="text-sm text-gray-300">
                      The ethereal sounds of digital jazz fill the air as DAO members 
                      discuss the future of decentralized retail. This is where legends are made.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


