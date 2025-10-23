import React from 'react';
import { Link } from 'react-router-dom';
import FloorIndicator from '../../components/FloorIndicator';
import Terminal from '../../components/Terminal';
import SEOHead from '../../components/SEOHead';

// Mock wallet for demo
const MOCK_WALLET = "7vswd...fE9s";

export default function BlueprintSuitesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-100 text-gray-900 relative overflow-hidden">
        <SEOHead 
          target="blueprint-suites.retailstar.sol"
          pageType="floor"
          customTitle="Blueprint Suites - Premium NFT Tier | Retailstar Mall"
          customDescription="Exclusive Blueprint Suites for WifHoodie NFT holders. Clean, strategic, curated premium shops with exclusive perks and benefits."
          customKeywords="blueprint suites, wifhoodie nft, premium tier, exclusive access, curated shops"
        />

        {/* Architectural Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJhcmNoaXRlY3R1cmUiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gMCAwIEwgNjAgMCBMIDYwIDYwIEwgMCA2MCBaIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDEwMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICAgIDxwYXRoIGQ9Ik0gMzAgMCBMIDMwIDYwIE0gMCAzMCBMIDYwIDMwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwwLDEwMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYXJjaGl0ZWN0dXJlKSIvPgo8L3N2Zz4K')] opacity-20 pointer-events-none" />

        {/* Floating WifHoodie Sprites */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-20 animate-bounce"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              🧥
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="p-6 border-b border-cyan-300/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">🪜</span>
                <div>
                  <h1 className="text-3xl font-bold text-cyan-600">
                    Blueprint Suites
                  </h1>
                  <p className="text-gray-600 text-sm">Premium Tier - Level 3</p>
                </div>
              </div>
              <FloorIndicator wallet={MOCK_WALLET} />
            </div>
          </header>

          {/* Navigation */}
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-8">
              <Link 
                to="/merch-waitlist"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <span className="mr-2">🧥</span>
                Merch Waitlist
              </Link>
              <Link 
                to="/tools"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <span className="mr-2">🛠️</span>
                Premium Tools
              </Link>
              <Link 
                to="/insights"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <span className="mr-2">📝</span>
                Alpha Insights
              </Link>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Sidebar - Terminal */}
              <div className="lg:col-span-1">
                <div className="bg-white/90 border border-cyan-300/50 rounded-lg p-4 mb-6 shadow-lg">
                  <h3 className="text-lg font-bold text-cyan-600 mb-4 flex items-center">
                    <span className="mr-2">💻</span>
                    Premium Terminal
                  </h3>
                  <Terminal wallet={MOCK_WALLET} />
                </div>

                {/* WifHoodie Status */}
                <div className="bg-white/80 border border-cyan-300 rounded-lg p-4 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">🧥</span>
                    WifHoodie Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">NFT Holder:</span>
                      <span className="text-green-600 font-semibold">✅ Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tier:</span>
                      <span className="text-cyan-600 font-semibold">Premium</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Benefits:</span>
                      <span className="text-blue-600 font-semibold">Active</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <div className="text-xs text-gray-500">
                        Exclusive access to premium shops, early releases, and VIP perks.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Premium Shops */}
                  <div className="bg-white/80 border border-cyan-300 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-cyan-600 mb-4 flex items-center">
                      <span className="mr-2">⭐</span>
                      Premium Shops
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🧥</span>
                          <div>
                            <div className="font-semibold text-gray-800">HoodieRepublic.sol</div>
                            <div className="text-sm text-gray-600">Exclusive WifHoodie Merch</div>
                            <div className="text-xs text-cyan-600 font-semibold">Premium Only</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🎨</span>
                          <div>
                            <div className="font-semibold text-gray-800">DesignStudio.sol</div>
                            <div className="text-sm text-gray-600">Custom Brand Design</div>
                            <div className="text-xs text-purple-600 font-semibold">Premium Only</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">💎</span>
                          <div>
                            <div className="font-semibold text-gray-800">DiamondHands.sol</div>
                            <div className="text-sm text-gray-600">Exclusive Investment Tools</div>
                            <div className="text-xs text-green-600 font-semibold">Premium Only</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exclusive Perks */}
                  <div className="bg-white/80 border border-cyan-300 rounded-lg p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                      <span className="mr-2">🎁</span>
                      Exclusive Perks
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Early Access:</span>
                        <span className="text-green-600 font-semibold">✅ Active</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">VIP Support:</span>
                        <span className="text-blue-600 font-semibold">✅ Active</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Exclusive Events:</span>
                        <span className="text-purple-600 font-semibold">✅ Active</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Alpha Insights:</span>
                        <span className="text-cyan-600 font-semibold">✅ Active</span>
                      </div>
                      <div className="border-t border-gray-300 pt-3 mt-4">
                        <div className="text-xs text-gray-500">
                          As a WifHoodie holder, you have access to exclusive content, 
                          early releases, and premium community features.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ascend Button */}
                <div className="mt-8 text-center">
                  <Link
                    to="/rooftop-lounge"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    ✨ Ascend to Rooftop Lounge
                  </Link>
                  <p className="text-sm text-gray-600 mt-2">
                    Requires DAO membership for access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


