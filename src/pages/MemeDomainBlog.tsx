import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import BlogLayout from '../components/BlogLayout';
import SocialShareButtons from '../components/SocialShareButtons';
import { scavDomains } from '../data/scavDomains';

const MemeDomainBlog: React.FC = () => {
  // Filter for meme domains only
  const memeDomains = scavDomains.filter(domain => domain.isMeme);

  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="article"
        customTitle="50 Meme .sol Domains Under 20 USDC That Might Just Go Viral"
        customDescription="Need a cheap, hilarious Solana domain? Here are 50+ meme-worthy .sol names under 20 USDC with degen commentary and buy links."
        customKeywords="funny solana domain names, cheap solana domain, meme .sol ideas, solana scav rack, degen domains"
        canonicalUrl="https://retailstar.xyz/insights/50-meme-domains-under-20-sol"
        imageUrl="https://retailstar.xyz/assets/rs-og-card.png"
      />
      
      <BlogLayout>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
            50 Meme .sol Domains Under 20 USDC That Might Just Go Viral
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Need a cheap, hilarious Solana domain? Here are 50+ meme-worthy .sol names under 20 USDC with degen commentary and buy links.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <span className="bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-full text-sm">meme domains</span>
            <span className="bg-pink-600/20 text-pink-300 px-3 py-1 rounded-full text-sm">solana</span>
            <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm">cheap domains</span>
            <span className="bg-yellow-600/20 text-yellow-300 px-3 py-1 rounded-full text-sm">degen</span>
            <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">scav rack</span>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg p-6 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              Meme domains are like meme coins — cheap, dumb, and potentially legendary. Here's our curated scav rack of .sol names that'll make you the hero (or clown) of CT.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-bold text-cyan-400 mb-3">Why These Domains Matter</h3>
              <p className="text-gray-300 text-sm">
                In the wild west of Web3, your domain is your digital identity. But who says that identity can't be absolutely ridiculous?
              </p>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-bold text-pink-400 mb-3">Selection Criteria</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Under 20 USDC (because we're not made of money)</li>
                <li>• Meme-worthy (obviously)</li>
                <li>• Actually available (no point in teasing you)</li>
                <li>• CT-approved (if it doesn't make you laugh, it's not worth it)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Meme Domains List */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            The Meme Domain Hall of Fame
          </h2>
          
          <div className="grid gap-6">
            {memeDomains.map((domain, index) => (
              <div key={domain.name} className="bg-black/20 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/30 transition-colors">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img 
                        src={domain.pngUrl} 
                        alt={`${domain.name} domain`}
                        className="w-full h-full object-contain rounded-lg border border-gray-600"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {domain.name}
                      </h3>
                      <p className="text-gray-300 mb-2 italic">
                        "{domain.tagline}"
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {domain.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-400">
                        Status: <span className="text-green-400 capitalize">{domain.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-3">
                    <SocialShareButtons 
                      domainName={domain.name}
                      domainUrl={`https://retailstar.xyz/domains/${domain.name.replace('.sol', '')}`}
                    />
                    
                    <div className="flex space-x-2">
                      <a
                        href={domain.buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors text-sm"
                      >
                        Buy Now
                      </a>
                      <Link
                        to={`/domains/${domain.name.replace('.sol', '')}`}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded font-semibold transition-colors text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outro CTA */}
        <div className="text-center bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Found Something Funny?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Screenshot it. Tag us @RetailstarMall and flex your new domain.
            <br />
            These aren't just domains — they're <strong>cultural artifacts</strong> waiting to be claimed by the right degen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/domains"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Full Collection
            </Link>
            <Link 
              to="/submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Submit Your Domain
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>This list is updated regularly as new meme domains enter the ecosystem. Check back for fresh chaos.</p>
        </div>
      </BlogLayout>
    </>
  );
};

export default MemeDomainBlog;

















