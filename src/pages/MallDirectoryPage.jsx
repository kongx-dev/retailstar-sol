import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import departmentsData from '../data/departments.json';
import RotationStatus from '../components/RotationStatus';
import SEOHead from '../components/SEOHead';
import LoreButton from '../components/LoreButton';
import { filterBlocklisted } from '../data/blocklist';

const MallDirectoryPage = () => {
  const [flicker, setFlicker] = useState(false);
  const [booting, setBooting] = useState(true);

  // Helper function to filter blocklisted domains from department data
  const filterDepartmentDomains = (domains) => {
    return filterBlocklisted(domains);
  };

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlicker((prev) => !prev);
    }, 150);
    
    const bootTimeout = setTimeout(() => {
      setBooting(false);
    }, 3000);
    
    return () => {
      clearInterval(flickerInterval);
      clearTimeout(bootTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="directory"
        customTitle="Retailverse Map | Retailstar.sol - Explore Domain Wings and Lore Floors"
        customDescription="View the Retailverse map. Explore domain wings, lore floors, and meta-mall connections."
        customKeywords="Retailverse, domain map, lore floors, Solana mall, SNS directory"
      />
      {/* LLM summary for MallDirectoryPage */}
      {/*
      <meta name="llm-summary" content="This directory provides a map of the Retailverse, showing domain wings, lore floors, and connections between .sol projects." />
      */}
      {/* Background image */}
      <img 
        src={retailstarBody} 
        alt="RetailStar Background" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Terminal overlay effect */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-5"></div>

      {/* Main content */}
      <div className={`relative z-10 min-h-screen p-6 transition duration-150 ease-in-out ${
        flicker ? "opacity-90" : "opacity-100"
      }`}>
        
        {/* Home Button */}
        <Link 
          to="/" 
          className="absolute top-4 right-4 z-50 text-cyan-300 hover:text-cyan-200 transition-colors duration-200 bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          🏠 Home
        </Link>
        
        {booting && (
          <div className="absolute inset-0 bg-black/90 text-green-400 flex items-center justify-center text-2xl animate-pulse z-50">
            <span className="glitch-text">[BOOTING TERMINAL...]</span>
          </div>
        )}

        {!booting && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <img 
                    src={rsLogo} 
                    alt="RetailStar Logo" 
                    className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg shadow-2xl shadow-green-500/20 border border-green-500/30 flicker-solana"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-cyan-400/20 rounded-lg"></div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
                Retailstar Mall Directory
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-green">
                Navigate the digital corridors of the Retailverse
              </p>
            </div>

            {/* Lore Button */}
            <div className="flex justify-center mb-8">
              <LoreButton />
            </div>

            {/* Funnel Navigation CTA */}
            <div className="flex justify-center gap-4 mb-8">
              <Link
                to="/marketplace"
                className="neon-cyan neon-cyan-hover py-3 px-8 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all duration-200"
              >
                🛍️ Browse Marketplace
              </Link>
              <Link
                to="/wiki-directory"
                className="neon-purple neon-purple-hover py-3 px-8 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all duration-200"
              >
                📚 Wiki Directory
              </Link>
            </div>

            {/* Rotation Status Widget */}
            <div className="mb-12">
              <RotationStatus />
            </div>

            {/* Mall Directory Grid */}
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-8">
                {Object.entries(departmentsData).map(([floorKey, floorData]) => (
                  <div
                    key={floorKey}
                    className="steel-surface border border-green-500/30 p-6 rounded-xl shadow-lg glitch-box"
                  >
                    {/* Floor Header */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2 text-green-400 glitch-text">
                        {floorKey.replace('_', ' ')} - {floorData.name}
                      </h2>
                      <p className="text-lg text-gray-300 mb-4">
                        {floorData.description}
                      </p>
                    </div>

                    {/* Wings or Direct Domains */}
                    {floorData.wings ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(floorData.wings).map(([wingKey, wingData]) => (
                          <div key={wingKey} className="bg-black/40 border border-green-500/20 p-4 rounded-lg">
                            <h3 className="font-bold text-lg text-green-300 mb-2">
                              {wingData.name}
                            </h3>
                            <p className="text-sm text-gray-400 mb-2">
                              {wingData.description}
                            </p>
                            {wingData.name.includes('Flash') && (
                              <p className="text-xs text-green-400 mb-4">⏰ 24h rotation</p>
                            )}
                            {wingData.name.includes('Mid') && (
                              <p className="text-xs text-blue-400 mb-4">⏰ 72h rotation</p>
                            )}
                            {wingData.name.includes('Premium') && (
                              <p className="text-xs text-purple-400 mb-4">⏰ 7d rotation</p>
                            )}
                            <div className="space-y-2">
                              {filterDepartmentDomains(wingData.domains).map((domain) => (
                                <div key={domain} className="flex items-center justify-between">
                                  <Link 
                                    to={`/wiki/${domain.replace('.sol', '')}`}
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
                                  >
                                    {domain}
                                  </Link>
                                  <span className="text-xs text-gray-500">→</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterDepartmentDomains(floorData.domains).map((domain) => (
                          <div key={domain} className="flex items-center justify-between bg-black/20 p-3 rounded border border-green-500/10">
                            <Link 
                              to={`/wiki/${domain.replace('.sol', '')}`}
                              className="text-cyan-300 transition-colors hover:underline"
                            >
                              {domain}
                            </Link>
                            <span className="text-xs text-gray-500">→</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="text-center mt-12">
              <Link
                to="/domains"
                className="neon-green neon-green-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 inline-block"
              >
                Browse All Domains
              </Link>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          color: #0f0;
          clip: rect(0, 900px, 0, 0);
        }
        .glitch-box {
          animation: flicker 3s infinite;
        }
        @keyframes flicker {
          0% { opacity: 0.98; }
          20% { opacity: 1; }
          40% { opacity: 0.97; }
          60% { opacity: 1; }
          80% { opacity: 0.95; }
          100% { opacity: 1; }
        }
        .neon-green {
          color: #00ff00;
          text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00;
        }
        .neon-green-hover:hover {
          color: #00ff00;
          text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
        }
        .glow-green {
          text-shadow: 0 0 10px #00ff00;
        }
      `}</style>
    </div>
  );
};

export default MallDirectoryPage; 