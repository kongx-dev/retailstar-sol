import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import LoreButton from '../components/LoreButton';
import rsguide from '../assets/rsguide.png';
import { getAllDepartments } from '../lib/useDepartmentQuery';
import ToneBadge from '../components/ToneBadge';

export default function GuidePage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      const depts = await getAllDepartments();
      setDepartments(depts);
    };
    fetchDepartments();
  }, []);

  const handleSectorChoice = (choice) => {
    setSelectedSector(choice);
    
    // Map choices to departments
    const routing = {
      'meme': '/directory/dept/meme-arcade',
      'building': '/directory/dept/ai-agents',
      'identity': '/directory/dept/social-identity',
      'tactical': '/directory/dept/security-wing'
    };

    const route = routing[choice];
    if (route) {
      setTimeout(() => navigate(route), 500);
    }
  };

  // Helper to get department by slug
  const getDeptBySlug = (slug) => {
    return departments.find(d => d.slug === slug);
  };

  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="guide"
        customTitle="Retailstar Orientation Guide | How to Navigate the Retailverse"
        customDescription="Complete guide to navigating Retailstar Mall - the Solana-powered multiverse of domains, lore, and marketplace chaos. Learn about pricing, navigation, and buying domains."
        customKeywords="retailstar guide, how to navigate, solana domains, domain marketplace, scav rack, flash rack, fixer catalog, vault, wiki pages"
        canonicalUrl="https://retailstar.sol/guide"
      />
      
      {/* Background image at 50% opacity */}
      <img 
        src={rsguide} 
        alt="RetailStar parking lot background" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Main content (z-10) */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
              🅿️ WELCOME TO THE LOT
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Before you head inside, here's the lay of the land.<br />
              <strong>Retailstar</strong> is more than a marketplace—it's a full mall system for domain hunting, meme flexing, and builder branding.<br />
              Here's where to park your curiosity:
            </p>
          </div>

          {/* Lore Integration */}
          <div className="bg-black/30 border border-cyan-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-cyan-400">🏬 What is Retailstar?</h2>
              <LoreButton />
            </div>
            <p className="text-gray-300 mb-4">
              <strong>Retailstar</strong> is the Solana mall of misfit domains — an immersive marketplace where lore, memes, and collectibles collide. 
              Each domain is a storefront, a story, and sometimes… a mystery.
            </p>
            <p className="text-gray-300 mb-4">
              Whether you&#39;re here to build, bid, flip, or just vibe — this is your starting point.
            </p>
            <blockquote className="border-l-4 border-pink-500 pl-4 italic text-pink-300">
              &quot;Retailstar never promised luxury. It promised lore.&quot;
              <br />
              <Link to="/directory" className="text-cyan-400 hover:text-cyan-300 underline">
                — Read the Full Lore
              </Link>
            </blockquote>
          </div>

          {/* Floor Legend */}
          <div className="mb-8">
            <div className="bg-black/40 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-3 text-center">🏢 Floor Guide</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="bg-red-600/20 text-red-300 px-2 py-1 rounded font-bold">P1</span>
                  <span className="text-gray-300">Parking Garage (Scav Rack + Glitch Militia)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-teal-600/20 text-teal-300 px-2 py-1 rounded font-bold">1F</span>
                  <span className="text-gray-300">Directory & Marketplace</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-orange-600/20 text-orange-300 px-2 py-1 rounded font-bold">2F</span>
                  <span className="text-gray-300">Blueprint Suites</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded font-bold">3F</span>
                  <span className="text-gray-300">Rooftop Lounge</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tour Buttons */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">🗺️ Explore the Mall</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* P1 - Parking Garage */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link to="/scav-rack">
                  <div className="bg-gradient-to-br from-red-900/30 to-cyan-900/30 border border-red-500/30 rounded-xl p-6 h-full hover:border-red-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🅿️</div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">
                        P1 - Parking Garage
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Scav Rack, Parking Garage Directory, meme domains, chaos energy, degen central
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* 1F - Main Floor */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link to="/directory">
                  <div className="bg-gradient-to-br from-teal-900/30 to-green-900/30 border border-teal-500/30 rounded-xl p-6 h-full hover:border-teal-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🏬</div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                        1F - Main Floor
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Directory, marketplace, brandable domains, featured drops
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* 2F - Blueprint Suites */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link to="/blueprint-suites">
                  <div className="bg-gradient-to-br from-orange-900/30 to-blue-900/30 border border-orange-500/30 rounded-xl p-6 h-full hover:border-orange-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🧪</div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                        2F - Blueprint Suites
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Meme generator, domain appraiser, builder tools
                      </p>
                      <div className="mt-2 bg-orange-600/20 text-orange-300 px-2 py-1 rounded text-xs font-semibold">
                        Coming Soon
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* 3F - Rooftop Lounge */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link to="/rooftop-lounge">
                  <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-xl p-6 h-full hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🌆</div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        3F - Rooftop Lounge
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Holder lore & Culture hub
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Insights */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
              >
                <Link to="/insights">
                  <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-6 h-full hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                    <div className="text-center">
                      <div className="text-4xl mb-3">📝</div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        Insights
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Web3 guides, Solana domain strategy, ecosystem deep dives
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Start Exploring From Your Sector */}
          <div className="mb-8">
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">🧠 Start Exploring From Your Sector</h2>
              
              {!selectedSector ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={() => handleSectorChoice('meme')}
                    className="bg-pink-500/20 border border-pink-500/30 rounded-lg p-4 hover:bg-pink-500/30 hover:border-pink-400/50 transition-all duration-200 text-left"
                  >
                    <div className="text-2xl mb-2">🕹️</div>
                    <h3 className="font-bold text-white mb-1">Meme</h3>
                    <p className="text-gray-300 text-sm">Viral domains & meme culture</p>
                  </button>
                  
                  <button
                    onClick={() => handleSectorChoice('building')}
                    className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-200 text-left"
                  >
                    <div className="text-2xl mb-2">🤖</div>
                    <h3 className="font-bold text-white mb-1">Building</h3>
                    <p className="text-gray-300 text-sm">AI agents & infrastructure</p>
                  </button>
                  
                  <button
                    onClick={() => handleSectorChoice('identity')}
                    className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-200 text-left"
                  >
                    <div className="text-2xl mb-2">🪪</div>
                    <h3 className="font-bold text-white mb-1">Identity</h3>
                    <p className="text-gray-300 text-sm">Social identity & creator tools</p>
                  </button>
                  
                  <button
                    onClick={() => handleSectorChoice('tactical')}
                    className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 hover:bg-red-500/30 hover:border-red-400/50 transition-all duration-200 text-left"
                  >
                    <div className="text-2xl mb-2">🛡️</div>
                    <h3 className="font-bold text-white mb-1">Tactical</h3>
                    <p className="text-gray-300 text-sm">Security & alpha labs</p>
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-cyan-300 mb-2">Redirecting to your sector...</p>
                  <button
                    onClick={() => setSelectedSector(null)}
                    className="text-gray-400 hover:text-white text-sm underline"
                  >
                    Choose different sector
                  </button>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-cyan-500/20">
                <p className="text-gray-300 text-sm text-center">
                  Or explore all departments → <Link to="/directory" className="text-cyan-400 hover:text-cyan-300 underline">Mall Directory</Link>
                </p>
              </div>
            </div>
          </div>

          {/* First Time Here? */}
          <div className="mb-8">
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">🧠 First Time Here?</h2>
              <div className="space-y-3 text-gray-300">
                <p>• Start in the <strong>Parking Garage <span className="bg-red-600/20 text-red-300 px-2 py-0.5 rounded text-xs font-bold">P1</span></strong> to browse memes → <Link to="/scav-rack" className="text-cyan-400 hover:text-cyan-300 underline">/scav-rack</Link></p>
                <p>• Ready to build? <strong>Head to Main Floor <span className="bg-teal-600/20 text-teal-300 px-2 py-0.5 rounded text-xs font-bold">1F</span></strong> for the directory → <Link to="/directory" className="text-cyan-400 hover:text-cyan-300 underline">/directory</Link></p>
                <p>• Need tools? <strong>Blueprint Suites <span className="bg-orange-600/20 text-orange-300 px-2 py-0.5 rounded text-xs font-bold">2F</span></strong> has generators & appraisers → <Link to="/blueprint-suites" className="text-cyan-400 hover:text-cyan-300 underline">/blueprint-suites</Link> <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">Soon</span></p>
                <p>• Just vibing? <strong>Rooftop Lounge <span className="bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded text-xs font-bold">3F</span></strong> for insights & lore → <Link to="/rooftop-lounge" className="text-cyan-400 hover:text-cyan-300 underline">/rooftop-lounge</Link></p>
                <p className="text-cyan-300 font-semibold">Builder? Degenerate? Either way… <strong>We got a spot for you.</strong></p>
              </div>
            </div>
          </div>

          {/* Navigation Guide */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">🗺️ How to Navigate the Mall</h2>
            <div className="grid gap-4">
              <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">
                  <code className="bg-gray-800 px-2 py-1 rounded">/parking-garage</code>
                  <span className="ml-2 bg-red-600/20 text-red-300 px-2 py-0.5 rounded text-xs">P1</span>
                </h3>
                <p className="text-gray-300">Parking Garage Directory, Scav Rack → <Link to="/scav-rack" className="text-cyan-400 hover:text-cyan-300 underline">/scav-rack</Link>, meme domains, chaos energy, degen central</p>
              </div>
              <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">
                  <code className="bg-gray-800 px-2 py-1 rounded">/directory</code>
                  <span className="ml-2 bg-teal-600/20 text-teal-300 px-2 py-0.5 rounded text-xs">1F</span>
                </h3>
                <p className="text-gray-300">Directory, marketplace, brandable domains, featured drops</p>
              </div>
              <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">
                  <code className="bg-gray-800 px-2 py-1 rounded">/blueprint-suites</code>
                  <span className="ml-2 bg-orange-600/20 text-orange-300 px-2 py-0.5 rounded text-xs">2F</span>
                </h3>
                <p className="text-gray-300">Meme generator, domain appraiser, builder tools <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">Coming Soon</span></p>
              </div>
              <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-white mb-2">
                  <code className="bg-gray-800 px-2 py-1 rounded">/rooftop-lounge</code>
                  <span className="ml-2 bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded text-xs">3F</span>
                </h3>
                <p className="text-gray-300">Holder lore & Culture hub</p>
              </div>
            </div>
            
            <div className="mt-6 bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-cyan-300">
                📍 Looking for something specific or lost in the sauce? Use the <Link to="/directory" className="text-cyan-400 hover:text-cyan-300 underline font-bold">Mall Map</Link> to return to base.
              </p>
            </div>
          </div>

        {/* How to Buy */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">🚪 How to Buy</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-green-400 text-xl">•</span>
              <p className="text-gray-300">If a domain is <strong>listed on SNS</strong> → Click <code className="bg-green-900/50 px-2 py-1 rounded">Buy on SNS</code></p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 text-xl">•</span>
              <p className="text-gray-300">If a domain is <strong>vaulted</strong> or private → Click <code className="bg-blue-900/50 px-2 py-1 rounded">DM to Unlock</code></p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 text-xl">•</span>
              <p className="text-gray-300">Some pages will have <code className="bg-yellow-900/50 px-2 py-1 rounded">+0.5 SOL Build Add-on</code> — use this to get a site built on top of your domain</p>
            </div>
          </div>
        </div>

        {/* Tips & Alpha */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">💡 Tips & Alpha</h2>
          <div className="grid gap-4">
            <div className="bg-black/20 border border-red-500/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2 flex items-center">
                <span className="bg-red-600/20 text-red-300 px-2 py-1 rounded text-xs font-bold mr-2">P1</span>
                Parking Garage Tips
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <Link to="/scav-rack" className="text-cyan-400 hover:text-cyan-300 underline">Scav Rack</Link> (P1) has the best deals — check back often</li>
                <li>• Meme domains under 20 USDC live in the Parking Garage</li>
                <li>• Chaos energy = highest meme potential</li>
              </ul>
            </div>
            <div className="bg-black/20 border border-teal-500/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2 flex items-center">
                <span className="bg-teal-600/20 text-teal-300 px-2 py-1 rounded text-xs font-bold mr-2">1F</span>
                Main Floor Tips
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Directory shows all brandable domains with pricing</li>
                <li>• Marketplace has final listings & build add-ons</li>
                <li>• Featured drops get priority placement</li>
              </ul>
            </div>
            <div className="bg-black/20 border border-orange-500/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2 flex items-center">
                <span className="bg-orange-600/20 text-orange-300 px-2 py-1 rounded text-xs font-bold mr-2">2F</span>
                Blueprint Suites Tips
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Use the Meme Generator to find viral domain ideas <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">Coming Soon</span></li>
                <li>• Domain Appraiser shows market value estimates <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">Coming Soon</span></li>
                <li>• Builder tools will streamline your workflow</li>
              </ul>
            </div>
            <div className="bg-black/20 border border-purple-500/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2 flex items-center">
                <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs font-bold mr-2">3F</span>
                Rooftop Lounge Tips
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Insights has strategy guides for flipping & branding</li>
                <li>• Check lore for backstory on featured domains</li>
                <li>• Community stories reveal hidden gems</li>
                <li>• Follow <a href="https://twitter.com/retailstarsol" className="text-cyan-400 hover:text-cyan-300 underline">@retailstarsol</a> for updates</li>
              </ul>
            </div>
          </div>
        </div>

          {/* Floor Navigation CTAs */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
              🏢 Ready to Explore?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              {/* P1 Button */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link to="/scav-rack" className="block">
                  <div className="bg-gradient-to-r from-red-600 to-cyan-600 hover:from-red-500 hover:to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200">
                    🅿️ P1 - Parking Garage
                  </div>
                </Link>
              </motion.div>

              {/* 1F Button */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link to="/directory" className="block">
                  <div className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200">
                    🏬 1F - Main Floor
                  </div>
                </Link>
              </motion.div>

              {/* 2F Button */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link to="/blueprint-suites" className="block">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-500 hover:to-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 relative">
                    🧪 2F - Blueprint Suites
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-2 py-0.5 rounded-full">Soon</span>
                  </div>
                </Link>
              </motion.div>

              {/* 3F Button */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link to="/rooftop-lounge" className="block">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200">
                    🌆 3F - Rooftop
                  </div>
                </Link>
              </motion.div>

              {/* Insights Button */}
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link to="/insights" className="block">
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200">
                    📝 Insights
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 