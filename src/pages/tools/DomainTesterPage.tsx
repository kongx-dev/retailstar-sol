import React, { useState } from 'react';
import SEOHead from '../../components/SEOHead';

const DomainTesterPage: React.FC = () => {
  const [domainInput, setDomainInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In the future, this would call a real domain testing API
    }, 2000);
  };

  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="tool"
        customTitle="Domain Tester | Test .sol Domain Availability & Value"
        customDescription="Free tool to test Solana domain availability, pricing, and potential. Get instant feedback on any .sol domain before you buy."
        customKeywords="solana domain tester, domain availability checker, .sol domain tool, domain value estimator"
        canonicalUrl="https://retailstar.xyz/tools/domain-tester"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
              🔍 Domain Tester
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Test any .sol domain for availability, pricing, and potential. Get instant feedback on domain quality and market value.
            </p>
          </div>

          {/* Coming Soon Banner */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 mb-8 text-center">
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">🚧 Coming Soon</h2>
            <p className="text-gray-300">
              We're building the ultimate domain testing tool. Sign up to be notified when it launches!
            </p>
          </div>

          {/* Demo Form */}
          <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Try the Demo</h3>
            
            <form onSubmit={handleTest} className="space-y-6">
              <div>
                <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-2">
                  Enter a .sol domain to test
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="domain"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="yourdomain"
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                    disabled
                  />
                  <span className="bg-gray-700 border border-l-0 border-gray-600 rounded-r-lg px-4 py-3 text-gray-300">
                    .sol
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!domainInput || isLoading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isLoading ? 'Testing...' : 'Test Domain (Demo)'}
              </button>
            </form>

            {/* Demo Results Placeholder */}
            <div className="mt-8 space-y-4">
              <h4 className="text-lg font-bold text-white">What you'll get:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                  <h5 className="font-semibold text-cyan-400 mb-2">Availability Status</h5>
                  <p className="text-gray-300 text-sm">Check if the domain is available for registration</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                  <h5 className="font-semibold text-green-400 mb-2">Market Value</h5>
                  <p className="text-gray-300 text-sm">Estimated price based on similar domains</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-400 mb-2">Archetype Match</h5>
                  <p className="text-gray-300 text-sm">Which domain personality fits best</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                  <h5 className="font-semibold text-pink-400 mb-2">SEO Potential</h5>
                  <p className="text-gray-300 text-sm">Search engine optimization score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Signup */}
          <div className="mt-12 bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Get Notified When It Launches</h3>
            <p className="text-gray-300 mb-6">
              Be the first to know when our domain testing tool goes live. We'll also send you exclusive domain insights.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-r-lg font-semibold transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DomainTesterPage;
