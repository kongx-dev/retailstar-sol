import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

const ToolsIndexPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="tools"
        customTitle="Retailstar Tools | Web3 Domain Utilities & Analytics"
        customDescription="Free tools for Solana domain analysis, archetype testing, and marketplace insights. Discover your perfect .sol domain with our utility suite."
        customKeywords="solana domain tools, domain tester, archetype quiz, domain analytics, web3 utilities, solana domain checker"
        canonicalUrl="https://retailstar.xyz/tools"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
              🛠️ Retailstar Tools
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Free utilities for Solana domain analysis, archetype testing, and marketplace insights. 
              Discover your perfect .sol domain with our growing suite of tools.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Appraisal Tool */}
            <div className="bg-black/40 border border-amber-500/30 rounded-lg p-6 hover:border-amber-400/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Domain Appraisal</h3>
                  <span className="text-sm text-green-400 bg-green-900/20 px-2 py-1 rounded-full">
                    Live
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Get instant rarity breakdown, value estimates, and meme scores for any .sol domain. Appraised by Retailrunner.
              </p>
              <Link 
                to="/tools/appraisal"
                className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Appraise Domain →
              </Link>
            </div>

            {/* Domain Tester */}
            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Domain Tester</h3>
                  <span className="text-sm text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Test any .sol domain for availability, pricing, and potential. Get instant feedback on domain quality and market value.
              </p>
              <Link 
                to="/tools/domain-tester"
                className="inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Try Domain Tester →
              </Link>
            </div>

            {/* Archetype Quiz */}
            <div className="bg-black/40 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🎭</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Archetype Quiz</h3>
                  <span className="text-sm text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Discover your domain personality. Find out which archetype matches your vibe and get personalized domain recommendations.
              </p>
              <Link 
                to="/tools/archetype-quiz"
                className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Take Quiz →
              </Link>
            </div>

            {/* Meme Generator */}
            <div className="bg-black/40 border border-pink-500/30 rounded-lg p-6 hover:border-pink-400/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Meme Domain Generator</h3>
                  <span className="text-sm text-green-400 bg-green-900/20 px-2 py-1 rounded-full">
                    Live
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Spin up a viral .sol on demand. Generate creative meme domain names with AI-powered combinations and rarity tags.
              </p>
              <Link 
                to="/tools/meme-gen"
                className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Generate Domains →
              </Link>
            </div>

            {/* Leaderboard */}
            <div className="bg-black/40 border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Domain Leaderboard</h3>
                  <span className="text-sm text-green-400 bg-green-900/20 px-2 py-1 rounded-full">
                    Live
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                See the most popular domains, trending picks, and community favorites. Vote for your top domains.
              </p>
              <Link 
                to="/tools/leaderboard"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                View Leaderboard →
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Need a Custom Tool?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Have an idea for a domain utility? We're always building new tools for the community. 
              Let us know what would help you most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Suggest a Tool
              </Link>
              <Link 
                to="/contact"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolsIndexPage;
