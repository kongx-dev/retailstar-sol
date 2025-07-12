import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { domainLore } from '../data/domains';
import domainsData from '../data/domains.json';
import DomainTemplate from '../components/DomainTemplate';

const DomainPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find domain in the new domains.json data
  const domain = domainsData.domains.find(d => d.slug === slug);
  
  // Get lore from existing domains.js if available
  const lore = domainLore[slug];

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

  return <DomainTemplate domain={domain} lore={lore} />;
};

export default DomainPage; 