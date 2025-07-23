import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import SEOHead from '../components/SEOHead';
import { isForSale } from '../data/blocklist';

// Poll data - this could be fetched from an API in the future
const pollData = {
  title: "Which domain should get the next build?",
  description: "Vote for the domain you want to see developed next. The community decides.",
  options: [
    {
      id: 1,
      name: "jpegdealer.sol",
      description: "NFT resale platform with mint integration",
      image: "🖼️",
      votes: 42,
      category: "Premium"
    },
    {
      id: 2,
      name: "fudscience.sol", 
      description: "Satirical alpha reports with token-gated access",
      image: "🧪",
      votes: 38,
      category: "Premium"
    },
    {
      id: 3,
      name: "lurkerlife.sol",
      description: "Funny but weak build. Add visual humor",
      image: "👁️",
      votes: 31,
      category: "Premium"
    },
    {
      id: 4,
      name: "copevendor.sol",
      description: "Rebuild with more absurdity and clean flow",
      image: "💊",
      votes: 28,
      category: "Mid"
    },
    {
      id: 5,
      name: "commandhub.sol",
      description: "Solid dev tool angle, could go 2+ SOL",
      image: "🔧",
      votes: 25,
      category: "Mid"
    },
    {
      id: 6,
      name: "jumpsetradio.sol",
      description: "Gamer x streetwear with utility hooks",
      image: "🎮",
      votes: 22,
      category: "Mid"
    }
  ].filter(option => isForSale(option.name)), // Filter out blocklisted domains
  totalVotes: 186,
  endDate: "2025-02-15"
};

const VotePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleVote = (optionId) => {
    if (hasVoted) return;
    setSelectedOption(optionId);
  };

  const submitVote = () => {
    if (!selectedOption) return;
    
    // In a real app, this would send to an API
    const updatedOptions = pollData.options.map(option => 
      option.id === selectedOption 
        ? { ...option, votes: option.votes + 1 }
        : option
    );
    
    // For demo purposes, we'll just show the results
    setHasVoted(true);
    setShowResults(true);
  };

  const getPercentage = (votes) => {
    return Math.round((votes / pollData.totalVotes) * 100);
  };

  const getWinningOption = () => {
    return pollData.options.reduce((prev, current) => 
      (prev.votes > current.votes) ? prev : current
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="vote"
        customTitle="Vote | Retailstar.sol - Decide the Next Domain Build"
        customDescription="Vote for the next Solana domain to be built or upgraded. Influence the future of the Retailverse."
        customKeywords="vote, domain poll, Solana builds, SNS voting, Retailstar community"
      />
      {/* LLM summary for VotePage */}
      {/*
      <meta name="llm-summary" content="This page allows users to vote on which Solana domain should be built or upgraded next in the Retailverse." />
      */}

      {/* Background image at 50% opacity */}
      <img 
        src={retailstarBody} 
        alt="RetailStar mallcore background, neon Solana underlayer" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Main content (z-10) */}
      <div className="relative z-10">
        {/* Header */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Back Button */}
            <div className="mb-6 flex justify-center">
              <Link 
                to="/"
                className="neon-cyan neon-cyan-hover py-2 px-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center"
              >
                <span className="mr-2">←</span>
                Back to Access Point
              </Link>
            </div>
            
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img 
                  src={rsLogo} 
                  alt="RetailStar logo, Solana domain marketplace" 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-lg shadow-2xl shadow-blue-500/20 border border-blue-500/30 flicker-solana"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-400/20 rounded-lg"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
              Community Vote
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              Your vote shapes the Retailverse. Choose which domain gets the next build.
            </p>

            {/* Funnel Navigation CTA */}
            <div className="flex justify-center mb-8">
              <Link
                to="/catalog"
                className="neon-orange neon-orange-hover py-3 px-8 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all duration-200"
              >
                🏆 See Winning Domains
              </Link>
            </div>

            {/* Poll Info */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="steel-surface rounded-lg p-6 border border-purple-500/30">
                <h2 className="text-2xl font-bold solana-gradient mb-4">
                  <span className="text-pink-400">[</span> {pollData.title} <span className="text-pink-400">]</span>
                </h2>
                <p className="text-gray-300 mb-4">{pollData.description}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Total Votes: {pollData.totalVotes}</span>
                  <span>Ends: {new Date(pollData.endDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voting Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {!showResults ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center solana-gradient mb-8">
                  <span className="text-pink-400">[</span> Cast Your Vote <span className="text-pink-400">]</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pollData.options.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleVote(option.id)}
                      className={`steel-surface card-hover-glow rounded-lg p-6 cursor-pointer transition-all duration-300 border-2 ${
                        selectedOption === option.id 
                          ? 'border-cyan-400 glow-blue' 
                          : 'border-gray-700 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{option.image}</div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          option.category === 'Premium' 
                            ? 'bg-yellow-600 text-black glow-purple' 
                            : 'bg-blue-600 text-white glow-blue'
                        }`}>
                          {option.category}
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-bold solana-gradient mb-2">
                        {option.name}
                      </h4>
                      
                      <p className="text-gray-400 text-sm mb-4">
                        {option.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {option.votes} votes ({getPercentage(option.votes)}%)
                        </span>
                        {selectedOption === option.id && (
                          <span className="text-cyan-400 text-sm">✓ Selected</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={submitVote}
                    disabled={!selectedOption || hasVoted}
                    className={`py-3 px-8 rounded-lg font-semibold transition-all duration-200 ${
                      selectedOption && !hasVoted
                        ? 'neon-cyan neon-cyan-hover'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {hasVoted ? 'Vote Submitted' : 'Submit Vote'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center solana-gradient mb-8">
                  <span className="text-pink-400">[</span> Poll Results <span className="text-pink-400">]</span>
                </h3>
                
                <div className="steel-surface rounded-lg p-6 border border-green-500/30 mb-8">
                  <h4 className="text-xl font-bold text-green-400 mb-2 text-center">
                    🏆 Winning Domain
                  </h4>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{getWinningOption().image}</div>
                    <h5 className="text-2xl font-bold solana-gradient mb-2">
                      {getWinningOption().name}
                    </h5>
                    <p className="text-gray-300 mb-2">{getWinningOption().description}</p>
                    <span className="text-green-400 font-semibold">
                      {getWinningOption().votes} votes ({getPercentage(getWinningOption().votes)}%)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {pollData.options
                    .sort((a, b) => b.votes - a.votes)
                    .map((option, index) => (
                      <div key={option.id} className="steel-surface rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{option.image}</span>
                            <div>
                              <h5 className="font-bold solana-gradient">{option.name}</h5>
                              <p className="text-sm text-gray-400">{option.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">{option.votes} votes</div>
                            <div className="text-lg font-bold solana-gradient">{getPercentage(option.votes)}%</div>
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${getPercentage(option.votes)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowResults(false)}
                    className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
                  >
                    Vote Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="steel-surface rounded-lg p-8 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-6 solana-gradient text-center">
                <span className="text-pink-400">[</span> Stay Updated <span className="text-pink-400">]</span>
              </h2>
              
              <p className="text-gray-300 text-center mb-6">
                Get notified when the winning domain gets built and new polls are launched.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a 
                  href="https://twitter.com/retailstarsol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  📰 Follow @retailstarsol
                </a>
                <a 
                  href="https://retailstar.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 border border-orange-500/30"
                >
                  📧 Subscribe to Newsletter
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed glow-blue">
                Democracy in the Retailverse. Every vote counts in shaping the future of Solana domains.
              </p>
            </div>
            
            <div className="flex justify-center space-x-8 text-sm mb-6">
              <a 
                href="https://github.com/KongX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://twitter.com/retailstarsol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://twitter.com/messages/compose?recipient_id=KongX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Contact
              </a>
              <a 
                href="/domains" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Domains
              </a>
              <Link 
                to="/catalog" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Catalog
              </Link>
              <a 
                href="/vault" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Vault
              </a>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>© 2025 retailstar.sol - Nodes in the Retailverse</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VotePage; 