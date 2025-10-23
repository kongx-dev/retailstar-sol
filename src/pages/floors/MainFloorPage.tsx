import React from 'react';
import { Link } from 'react-router-dom';
import FloorIndicator from '../../components/FloorIndicator';
import Terminal from '../../components/Terminal';
import SEOHead from '../../components/SEOHead';

// Mock wallet for demo
const MOCK_WALLET = "7vswd...fE9s";

export default function MainFloorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <SEOHead 
          target="main-floor.retailstar.sol"
          pageType="floor"
          customTitle="Main Floor - Mallcore Market | Retailstar Mall"
          customDescription="Welcome to the Main Floor of Retailstar Mall. Clean shops, organized layout, and premium domain access. Unlocked after domain purchase."
          customKeywords="main floor, mallcore, domain access, premium shops, organized layout"
        />

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4K')] opacity-30 pointer-events-none" />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="p-6 border-b border-blue-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">🏬</span>
                <div>
                  <h1 className="text-3xl font-bold text-blue-400">
                    Mallcore Market
                  </h1>
                  <p className="text-gray-400 text-sm">Main Floor - Level 2</p>
                </div>
              </div>
              <FloorIndicator wallet={MOCK_WALLET} />
            </div>
          </header>

          {/* Navigation */}
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-8">
              <Link 
                to="/domains"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <span className="mr-2">📋</span>
                Domain Catalog
              </Link>
              <Link 
                to="/directory"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <span className="mr-2">🗺️</span>
                Mall Directory
              </Link>
              <Link 
                to="/wiki-directory"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <span className="mr-2">📚</span>
                Wiki Directory
              </Link>
              <Link 
                to="/guide"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
              >
                <span className="mr-2">📖</span>
                Guide
              </Link>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Sidebar - Terminal */}
              <div className="lg:col-span-1">
                <div className="bg-black/90 border border-blue-500/50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
                    <span className="mr-2">💻</span>
                    Terminal Access
                  </h3>
                  <Terminal wallet={MOCK_WALLET} />
                </div>

                {/* Quick Stats */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-300 mb-4">Floor Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Access Level:</span>
                      <span className="text-blue-400 font-semibold">Main Floor</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shops Available:</span>
                      <span className="text-green-400">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Unlock:</span>
                      <span className="text-yellow-400">WifHoodie NFT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Featured Shops */}
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                      <span className="mr-2">⭐</span>
                      Featured Shops
                    </h3>
                    <div className="space-y-4">
                      <Link to="/domains/commandhub" className="block bg-gray-800/50 border border-gray-600 rounded-lg p-4 hover:border-blue-400 transition-colors">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">⚡</span>
                          <div>
                            <div className="font-semibold">commandhub.sol</div>
                            <div className="text-sm text-gray-400">AI Dashboard & Infrastructure</div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link to="/domains/jumpsetradio" className="block bg-gray-800/50 border border-gray-600 rounded-lg p-4 hover:border-blue-400 transition-colors">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🎮</span>
                          <div>
                            <div className="font-semibold">jumpsetradio.sol</div>
                            <div className="text-sm text-gray-400">Gamer x Streetwear Aesthetic</div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link to="/domains/lurkerlife" className="block bg-gray-800/50 border border-gray-600 rounded-lg p-4 hover:border-blue-400 transition-colors">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">👁️</span>
                          <div>
                            <div className="font-semibold">lurkerlife.sol</div>
                            <div className="text-sm text-gray-400">Lurk & Learn Community</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Mall Directory Preview */}
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                      <span className="mr-2">🗺️</span>
                      Mall Directory
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Total Shops:</span>
                        <span className="text-green-400 font-semibold">47</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Active Today:</span>
                        <span className="text-blue-400 font-semibold">23</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">New This Week:</span>
                        <span className="text-yellow-400 font-semibold">5</span>
                      </div>
                      <div className="border-t border-gray-700 pt-3 mt-4">
                        <Link 
                          to="/directory"
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                        >
                          View Full Directory
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ascend Button */}
                <div className="mt-8 text-center">
                  <Link
                    to="/blueprint-suites"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    🪜 Ascend to Blueprint Suites
                  </Link>
                  <p className="text-sm text-gray-400 mt-2">
                    Requires WifHoodie NFT for access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


