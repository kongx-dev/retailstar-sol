import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Terminal from '../../components/Terminal';
import SEOHead from '../../components/SEOHead';
import { npcDialogues, basementLore } from '../../data/basementDomains';
import { useBasementDomains } from '../../hooks/useDomains';
import DomainLoadingSkeleton from '../../components/DomainLoadingSkeleton';
import DomainErrorFallback from '../../components/DomainErrorFallback';
// @ts-ignore: PNG import for Vite
import rsbasement from '../../assets/rsbasement.png';

// Mock wallet for demo
const MOCK_WALLET = "7vswd...fE9s";

export default function BasementPage() {
  const [currentNpcDialogue, setCurrentNpcDialogue] = useState('');
  const { domains: basementDomains, loading, error } = useBasementDomains();

  // Glitch effect for background
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const elements = document.querySelectorAll('.glitch-effect');
      elements.forEach(el => {
        el.classList.add('animate-pulse');
        setTimeout(() => el.classList.remove('animate-pulse'), 100);
      });
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Random NPC dialogue rotation
  useEffect(() => {
    const showRandomDialogue = () => {
      const randomDialogue = npcDialogues[Math.floor(Math.random() * npcDialogues.length)];
      setCurrentNpcDialogue(randomDialogue);
    };

    // Show initial dialogue
    showRandomDialogue();

    // Rotate dialogues every 10 seconds
    const dialogueInterval = setInterval(showRandomDialogue, 10000);

    return () => clearInterval(dialogueInterval);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: 'border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10',
      green: 'border-green-500/50 hover:border-green-400 hover:bg-green-500/10',
      purple: 'border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10',
      red: 'border-red-500/50 hover:border-red-400 hover:bg-red-500/10',
      yellow: 'border-yellow-500/50 hover:border-yellow-400 hover:bg-yellow-500/10'
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead 
        target="basement.retailstar.sol"
        pageType="floor"
        customTitle="Basement - Glitch Militia HQ | Retailstar Mall"
        customDescription="Welcome to the Basement, the public entry point of Retailstar Mall. No passes, no gates - just pure chaos and potential. Explore featured .sol domains and join the Glitch Militia."
        customKeywords="basement, glitch militia, public access, sol domains, web3, nft marketplace, retailstar"
      />

      {/* Basement Background Image */}
      <img 
        src={rsbasement} 
        alt="Retailstar Basement - Glitch Militia HQ" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-60 z-0" 
        aria-hidden="true"
      />

      {/* Glitch Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black/40 to-cyan-900/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJub2lzZSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIj4KICAgICAgPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDAwIi8+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSIyIiB5PSIxIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iNCIgeT0iMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgICAgIDxyZWN0IHg9IjEiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSI3IiB5PSI0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iMyIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgICAgIDxyZWN0IHg9IjgiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSI2IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iOSIgeT0iNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNub2lzZSkiLz4KPC9zdmc+Cg==')] opacity-30 pointer-events-none mix-blend-overlay" />
      </div>

      {/* Flickering Lights / Barrel Fires */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              i % 4 === 0 ? 'bg-orange-500' : 
              i % 4 === 1 ? 'bg-cyan-400' : 
              i % 4 === 2 ? 'bg-yellow-400' : 'bg-red-500'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 1}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 border-b border-cyan-500/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">🕳️</span>
              <div>
                <h1 className="text-3xl font-bold text-red-400 glitch-effect">
                  Glitch Militia HQ
                </h1>
                <p className="text-gray-400 text-sm">Public Access - No Passes Required</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/marketplace"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                🛍️ Full Marketplace
              </Link>
              <Link 
                to="/"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                🏠 Home
              </Link>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {/* Lore Section */}
          <div className="mb-8 bg-gray-900/80 border border-red-500/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-4">{basementLore.title}</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-4">
              {basementLore.story.split('\n\n')[0]}
            </p>
            <p className="text-cyan-400 font-semibold text-lg">{basementLore.motto}</p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Terminal & NPC */}
            <div className="lg:col-span-1 space-y-6">
              {/* Terminal */}
              <div className="bg-black/90 border border-cyan-500/50 rounded-lg p-4">
                <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
                  <span className="mr-2">💻</span>
                  Terminal Access
                </h3>
                <Terminal wallet={MOCK_WALLET} />
              </div>

              {/* NPC Dialogue */}
              {currentNpcDialogue && (
                <div className="bg-gray-900/80 border border-yellow-500/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">🧑‍🤝‍🧑</div>
                    <div>
                      <div className="text-xs text-yellow-400 font-semibold mb-1">NPC CHATTER</div>
                      <p className="text-sm text-gray-300 italic">"{currentNpcDialogue}"</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-bold text-gray-300 mb-3">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <Link to="/scavrack" className="block text-green-400 hover:text-green-300">
                    🎒 Scav Rack
                  </Link>
                  <Link to="/guide" className="block text-blue-400 hover:text-blue-300">
                    📖 Guide
                  </Link>
                  <Link to="/lore" className="block text-purple-400 hover:text-purple-300">
                    📜 Full Lore
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Featured Domains */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center">
                <span className="mr-2">🏪</span>
                Featured Basement Shops
              </h3>
              
              {loading ? (
                <DomainLoadingSkeleton count={4} />
              ) : error ? (
                <DomainErrorFallback error={error} onRetry={() => window.location.reload()} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {basementDomains.map((domain) => (
                    <Link
                      key={domain.slug || domain.name}
                      to={`/domains/${domain.slug || domain.name}`}
                      className={`bg-gray-900/80 border-2 rounded-lg p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 ${getColorClasses(domain.color || 'cyan')}`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{domain.icon || '🏪'}</div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1">{domain.name}</h4>
                          <p className="text-sm text-cyan-400 font-semibold mb-2">{domain.tagline || domain.description}</p>
                          <p className="text-xs text-gray-400">{domain.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Call to Action */}
              <div className="mt-8 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-500/50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Ready to Build Your Empire?</h3>
                <p className="text-gray-300 mb-4">
                  Explore the full marketplace or check out our scavenger rack for hidden gems.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    to="/marketplace"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Browse All Domains
                  </Link>
                  <Link
                    to="/scavrack"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Hit the Scav Rack
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
