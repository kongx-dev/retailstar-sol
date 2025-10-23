import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDomainByName } from '../lib/domainQueries';
import DomainTemplate from '../components/DomainTemplate';
import SEOHead from '../components/SEOHead';
import DomainLoadingSkeleton from '../components/DomainLoadingSkeleton';
import DomainErrorFallback from '../components/DomainErrorFallback';

const DomainPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDomain = async () => {
      try {
        setLoading(true);
        setError(null);
        const foundDomain = await getDomainByName(slug);
        setDomain(foundDomain);
      } catch (err) {
        console.error('Error loading domain:', err);
        setError('Failed to load domain data');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadDomain();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden">
        <SEOHead 
          target="retailstar.sol"
          pageType="domain"
          customTitle="Loading Domain | Retailstar.sol"
          customDescription="Loading domain information from the Retailverse."
        />
        <DomainLoadingSkeleton count={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden">
        <SEOHead 
          target="retailstar.sol"
          pageType="domain"
          customTitle="Error Loading Domain | Retailstar.sol"
          customDescription="Unable to load domain information."
        />
        <DomainErrorFallback error={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }
  
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

  // Generate Product/Offer schema for domain pages
  const productSchema = domain ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${domain.name}.sol`,
    "description": domain.description,
    "category": domain.category,
    "brand": {
      "@type": "Brand",
      "name": "Retailstar.sol"
    },
    "offers": {
      "@type": "Offer",
      "price": domain.price,
      "priceCurrency": "SOL",
      "availability": domain.status === 'available' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Retailstar.sol",
        "url": "https://retailstar.xyz"
      },
      "url": `https://retailstar.xyz/domains/${domain.slug}`
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Status",
        "value": domain.status
      },
      {
        "@type": "PropertyValue", 
        "name": "Category",
        "value": domain.category
      },
      ...(domain.vaulted ? [{
        "@type": "PropertyValue",
        "name": "Vaulted",
        "value": "true"
      }] : []),
      ...(domain.hasWebsite ? [{
        "@type": "PropertyValue",
        "name": "Has Website",
        "value": "true"
      }] : [])
    ]
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://retailstar.xyz"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Domains",
        "item": "https://retailstar.xyz/domains"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": domain?.name || "Domain",
        "item": `https://retailstar.xyz/domains/${domain?.slug || 'not-found'}`
      }
    ]
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="domain"
        customTitle={domainTitle}
        customDescription={domainDescription}
        customKeywords={domainKeywords}
        customSchema={productSchema}
        additionalSchema={[breadcrumbSchema]}
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