import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import domainsData from '../data/domains.json';
import DomainTemplate from '../components/DomainTemplate';
import SEOHead from '../components/SEOHead';

const DomainPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find domain in the new domains.json data
  const domain = domainsData.domains.find(d => d.slug === slug);
  
  if (!domain) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden">
        <img 
          src={require('../assets/retailstar-body.png')} 
          alt="RetailStar Background" 
          className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
          aria-hidden="true"
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Domain Not Found</h1>
            <p className="text-gray-300 mb-8">This domain doesn't exist in our vault.</p>
            <button 
              onClick={() => navigate('/domains')}
              className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              Back to Domains
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Funnel CTAs
  const handleStoreReferrer = () => {
    if (slug) sessionStorage.setItem('lastWikiSlug', slug);
  };
  const funnelCTAs = (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      {domain.website && (
        <a
          href={domain.website}
          target="_blank"
          rel="noopener noreferrer"
          className="neon-green neon-green-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
        >
          🌐 Visit Website
        </a>
      )}
      {/* Show green DM Buy button only for fudscience, else show original orange button */}
      {slug === 'fudscience' ? (
        <a
          href="https://twitter.com/messages/compose?recipient_id=retailstarsol"
          target="_blank"
          rel="noopener noreferrer"
          className="neon-green neon-green-hover py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg animate-pulse focus:outline-none focus:ring-2 focus:ring-green-400/50 hover:bg-green-600 hover:text-white flex items-center gap-2"
          onClick={handleStoreReferrer}
        >
          🛒 Buy
        </a>
      ) : (
        <a
          href="/marketplace"
          className="neon-orange neon-orange-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
          onClick={handleStoreReferrer}
        >
          🛒 Buy on Marketplace
        </a>
      )}
      {domain.vaulted && (
        <a
          href="/upgrade"
          className="neon-purple neon-purple-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
        >
          🔓 Unlock Vault
        </a>
      )}
      <a
        href="/catalog"
        className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
        onClick={handleStoreReferrer}
      >
        🗂️ Explore Catalog
      </a>
    </div>
  );

  const domainTitle = domain ? `${domain.name} | Retailstar.sol - Domain Lore & Purchase Info` : 'Domain Not Found | Retailstar.sol';
  const domainDescription = domain ? `Explore the story behind ${domain.name}. View pricing, meta, site link, and lore connections.` : 'This domain could not be found.';
  const domainKeywords = domain ? `${domain.name}, domain lore, Solana websites, SNS builds` : 'domain not found, Solana domains';
  const domainGeoSummary = domain ? `This page displays a detailed breakdown of ${domain.name}, including lore, rarity, purchase info, and build details.` : 'No domain data available.';

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="domain"
        customTitle={domainTitle}
        customDescription={domainDescription}
        customKeywords={domainKeywords}
      />
      {/* LLM summary for DomainPage */}
      {/*
      <meta name="llm-summary" content={domainGeoSummary} />
      */}
      <img 
        src={require('../assets/retailstar-body.png')} 
        alt="RetailStar Background" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />
      <div className="relative z-10">
        {funnelCTAs}
        <DomainTemplate domain={domain} />
      </div>
    </div>
  );
};

export default DomainPage; 