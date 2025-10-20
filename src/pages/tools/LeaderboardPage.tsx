import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

const LeaderboardPage: React.FC = () => {
  // Mock leaderboard data - in the future this would come from an API
  const leaderboardData = [
    { rank: 1, domain: "copevendor.sol", votes: 127, category: "Meme", trend: "🔥" },
    { rank: 2, domain: "jpegdealer.sol", votes: 98, category: "Trading", trend: "📈" },
    { rank: 3, domain: "commandhub.sol", votes: 89, category: "Tech", trend: "⚡" },
    { rank: 4, domain: "fudscience.sol", votes: 76, category: "Meme", trend: "🧪" },
    { rank: 5, domain: "lurkerlife.sol", votes: 65, category: "Lifestyle", trend: "👁️" },
    { rank: 6, domain: "jumpsetradio.sol", votes: 54, category: "Media", trend: "📻" },
    { rank: 7, domain: "bidgremlin.sol", votes: 43, category: "Trading", trend: "💰" },
    { rank: 8, domain: "rigbuilder.sol", votes: 38, category: "Tech", trend: "🔧" },
    { rank: 9, domain: "deploydeck.sol", votes: 32, category: "Tech", trend: "🚀" },
    { rank: 10, domain: "chowdown.sol", votes: 28, category: "Lifestyle", trend: "🍜" }
  ];

  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="tool"
        customTitle="Domain Leaderboard | Top .sol Domains by Community Votes"
        customDescription="See the most popular Solana domains voted by the community. Discover trending domains, top picks, and community favorites."
        customKeywords="solana domain leaderboard, popular domains, trending .sol domains, community votes, domain rankings"
        canonicalUrl="https://retailstar.xyz/tools/leaderboard"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
              🏆 Domain Leaderboard
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See which domains are trending in the community. Vote for your favorites and discover the most popular .sol domains.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">127</div>
              <div className="text-gray-300">Total Votes</div>
            </div>
            <div className="bg-black/40 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">10</div>
              <div className="text-gray-300">Domains Ranked</div>
            </div>
            <div className="bg-black/40 border border-pink-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">5</div>
              <div className="text-gray-300">Categories</div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-cyan-400">Top Domains</h2>
              <Link 
                to="/vote"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Vote Now
              </Link>
            </div>

            <div className="space-y-4">
              {leaderboardData.map((item) => (
                <div 
                  key={item.rank}
                  className="flex items-center justify-between bg-gray-800/50 border border-gray-600 rounded-lg p-4 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full text-black font-bold">
                      {item.rank}
                    </div>
                    <div>
                      <div className="font-mono text-lg text-white">{item.domain}</div>
                      <div className="text-sm text-gray-400">{item.category}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">{item.votes}</div>
                      <div className="text-sm text-gray-400">votes</div>
                    </div>
                    <div className="text-2xl">{item.trend}</div>
                    <Link 
                      to={`/wiki/${item.domain.replace('.sol', '')}`}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Top Categories</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/40 border border-purple-500/30 rounded-lg p-6">
                <h4 className="text-lg font-bold text-purple-400 mb-2">Meme Domains</h4>
                <p className="text-gray-300 text-sm mb-4">Viral, culture-driven domains that capture the zeitgeist</p>
                <div className="text-2xl font-bold text-purple-400">203 votes</div>
              </div>
              
              <div className="bg-black/40 border border-green-500/30 rounded-lg p-6">
                <h4 className="text-lg font-bold text-green-400 mb-2">Tech Domains</h4>
                <p className="text-gray-300 text-sm mb-4">Developer tools and infrastructure domains</p>
                <div className="text-2xl font-bold text-green-400">159 votes</div>
              </div>
              
              <div className="bg-black/40 border border-pink-500/30 rounded-lg p-6">
                <h4 className="text-lg font-bold text-pink-400 mb-2">Trading Domains</h4>
                <p className="text-gray-300 text-sm mb-4">Marketplace and trading-focused domains</p>
                <div className="text-2xl font-bold text-pink-400">141 votes</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Want to Vote?</h3>
            <p className="text-gray-300 mb-6">
              Help shape the leaderboard by voting for your favorite domains. Your vote matters!
            </p>
            <Link 
              to="/vote"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Go Vote Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
