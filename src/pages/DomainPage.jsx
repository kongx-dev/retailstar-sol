import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import domainsData from '../data/domains.json';
import DomainTemplate from '../components/DomainTemplate';

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
      <a
        href="/marketplace"
        className="neon-orange neon-orange-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
      >
        🛒 Buy on Marketplace
      </a>
      {domain.vaulted && (
        <a
          href="/upgrade"
          className="neon-purple neon-purple-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
        >
          🔓 Unlock Vault
        </a>
      )}
    </div>
  );

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
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