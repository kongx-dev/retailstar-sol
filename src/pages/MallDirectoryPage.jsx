import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import departmentsData from '../data/departments.json';
import RotationStatus from '../components/RotationStatus';
import SEOHead from '../components/SEOHead';
import LoreButton from '../components/LoreButton';
import { filterBlocklisted } from '../data/blocklist';
import { useDomains } from '../hooks/useDomains';
import DomainLoadingSkeleton from '../components/DomainLoadingSkeleton';
import DomainErrorFallback from '../components/DomainErrorFallback';

const MallDirectoryPage = () => {
  const [flicker, setFlicker] = useState(false);
  const [booting, setBooting] = useState(true);
  const [searchParams] = useSearchParams();
  const archetypeFilter = searchParams.get('archetype');
  const { domains: supabaseDomains, loading, error } = useDomains({ listed: true });

  // Helper function to filter blocklisted domains from department data
  const filterDepartmentDomains = (domains) => {
    return filterBlocklisted(domains);
  };

  // Helper function to filter domains by archetype
  const filterDomainsByArchetype = (domainList) => {
    if (!archetypeFilter) return domainList;
    
    return domainList.filter(domain => {
      const domainObj = supabaseDomains.find(d => d.name === domain.replace('.sol', ''));
      if (!domainObj) return true; // Keep if not found in domains data
      
      return domainObj.archetype === archetypeFilter || domainObj.archetype === 'both';
    });
  };

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlicker((prev) => !prev);
    }, 150);
    
    const bootTimeout = setTimeout(() => {
      setBooting(false);
    }, 3000);
    
    return () => {
      clearInterval(flickerInterval);
      clearTimeout(bootTimeout);
    };
  }, []);

  // Generate comprehensive schema for directory page
  const getAllDomains = () => {
    const allDomains = [];
    Object.values(departmentsData).forEach(floor => {
      if (floor.domains) {
        allDomains.push(...filterDepartmentDomains(floor.domains));
      }
      if (floor.wings) {
        Object.values(floor.wings).forEach(wing => {
          allDomains.push(...filterDepartmentDomains(wing.domains));
        });
      }
    });
    return allDomains;
  };

  const allDomains = getAllDomains();
  const domainObjects = allDomains.map(domainName => {
    const domain = supabaseDomains.find(d => d.name === domainName.replace('.sol', ''));
    return {
      "@type": "ListItem",
      "position": allDomains.indexOf(domainName) + 1,
      "name": domainName,
      "url": `https://retailstar.xyz/wiki/${domainName.replace('.sol', '')}`,
      "description": domain?.description || `Explore ${domainName} in the Retailverse`
    };
  });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Retailstar Domain Directory",
    "description": "Complete directory of Solana domains in the Retailverse ecosystem",
    "numberOfItems": allDomains.length,
    "itemListElement": domainObjects
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Retailstar.sol",
    "url": "https://retailstar.xyz",
    "description": "A cyberpunk domain mall for digital degens - where every .sol domain is a storefront",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://retailstar.xyz/directory?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Retailstar.sol",
      "url": "https://retailstar.xyz"
    }
  };

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
        "name": "Directory",
        "item": "https://retailstar.xyz/directory"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Helmet>
        <title>Retailstar Mall Directory • All .sol Stores & Categories • Retailstar Mall</title>
        <meta
          name="description"
          content="Browse the full cyberpunk mall directory to explore .sol domain storefronts and categories."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://retailstar.xyz/directory" />
      </Helmet>
      <SEOHead
        target="retailstar.sol"
        pageType="directory"
        customTitle="Retailverse Map | Retailstar.sol - Explore Domain Wings and Lore Floors"
        customDescription="View the Retailverse map. Explore domain wings, lore floors, and meta-mall connections."
        customKeywords="Retailverse, domain map, lore floors, Solana mall, SNS directory"
        canonicalUrl="https://retailstar.xyz/directory"
        customSchema={itemListSchema}
        additionalSchema={[webSiteSchema, breadcrumbSchema]}
      />
      {/* LLM summary for MallDirectoryPage */}
      {/*
      <meta name="llm-summary" content="This directory provides a map of the Retailverse, showing domain wings, lore floors, and connections between .sol projects." />
      */}
      {/* Background image */}
      <img 
        src={retailstarBody} 
        alt="RetailStar Background" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Terminal overlay effect */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-5"></div>

      {/* Main content */}
      <div className={`relative z-10 min-h-screen p-6 transition duration-150 ease-in-out ${
        flicker ? "opacity-90" : "opacity-100"
      }`}>
        
        {/* Home Button */}
        <Link 
          to="/" 
          className="absolute top-4 right-4 z-50 text-cyan-300 hover:text-cyan-200 transition-colors duration-200 bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          🏠 Home
        </Link>
        
        {booting && (
          <div className="absolute inset-0 bg-black/90 text-green-400 flex items-center justify-center text-2xl animate-pulse z-50">
            <span className="glitch-text">[BOOTING TERMINAL...]</span>
          </div>
        )}

        {!booting && (
          <>
            {loading ? (
              <div className="text-center py-12">
                <DomainLoadingSkeleton count={6} />
              </div>
            ) : error ? (
              <DomainErrorFallback error={error} onRetry={() => window.location.reload()} />
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-12">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <img 
                    src={rsLogo} 
                    alt="RetailStar Logo" 
                    className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg shadow-2xl shadow-green-500/20 border border-green-500/30 flicker-solana"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-lime-500/20 to-cyan-400/20 rounded-lg"></div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
                Retailstar Mall Directory
              </h1>
              
              <section className="static-seo-content max-w-4xl mx-auto mb-6">
                <p>
                  The Retailstar Mall Directory provides a comprehensive map of all domains organized within the marketplace. This directory categorizes Solana domains by different sections and departments, making it easier for users to navigate the extensive collection. The page displays domains grouped by their function, theme, or location within the cyberpunk marketplace structure. Users can explore domains by category to find specific types of projects or services.
                </p>
                <p>
                  The directory serves as a navigation tool for understanding how domains are organized across the Retailverse. Each category represents a different area of the marketplace, from meme domains to developer tools. The page helps users discover domains they might not find through direct search, revealing the full scope of what Retailstar Mall offers. This organizational system makes the Solana domain marketplace more accessible and easier to explore.
                </p>
              </section>
              
              <p className="text-xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-green">
                Navigate the digital corridors of the Retailverse
              </p>
              
              <section className="prose prose-invert mb-10 max-w-4xl mx-auto">
                <p>
                  The Retailstar Mall Directory is your complete guide to exploring .sol domains across our cyberpunk marketplace. This comprehensive map organizes every domain in the Retailverse by category, making it easy to discover meme shops, developer tools, and hidden vaults scattered throughout the Solana ecosystem. Whether you're a builder searching for the perfect domain name or a degen hunting for the next alpha, the directory reveals the full scope of what Retailstar Mall offers.
                </p>
                <p>
                  Each category in the directory represents a different wing of our Web3 marketplace, from the neon-lit corridors of meme domains to the shadowy back alleys where developer tools hide. The Solana domains listed here aren't just addresses—they're nodes in a larger network that connects builders, degens, and creators across the Retailverse. Click any domain to learn its story, explore its storefront, or understand its place in the cyberpunk marketplace that defines Retailstar Mall.
                </p>
              </section>

              {/* Archetype Filter Indicator */}
              {archetypeFilter && (
                <div className="max-w-4xl mx-auto mb-8 p-4 bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-cyan-400 font-semibold">
                      Filtering by: {archetypeFilter === 'builder' ? '🛠️ Builder Mode' : '🧃 Degen Mode'}
                    </span>
                    <Link 
                      to="/directory"
                      className="text-gray-400 hover:text-white text-sm underline"
                    >
                      Clear Filter
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Lore Button */}
            <div className="flex justify-center mb-8">
              <LoreButton />
            </div>

            {/* Funnel Navigation CTA */}
            <div className="flex justify-center gap-4 mb-8">
              <Link
                to="/marketplace"
                className="neon-cyan neon-cyan-hover py-3 px-8 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all duration-200"
              >
                🛍️ Browse Marketplace
              </Link>
              <Link
                to="/wiki-directory"
                className="neon-purple neon-purple-hover py-3 px-8 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all duration-200"
              >
                📚 Wiki Directory
              </Link>
            </div>

            {/* Rotation Status Widget */}
            <div className="mb-12">
              <RotationStatus />
            </div>

            {/* Mall Directory Grid */}
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-8">
                {Object.entries(departmentsData).map(([floorKey, floorData]) => (
                  <div
                    key={floorKey}
                    className="steel-surface border border-green-500/30 p-6 rounded-xl shadow-lg glitch-box"
                  >
                    {/* Floor Header */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2 text-green-400 glitch-text">
                        {floorKey.replace('_', ' ')} - {floorData.name}
                      </h2>
                      <p className="text-lg text-gray-300 mb-4">
                        {floorData.description}
                      </p>
                    </div>

                    {/* Wings or Direct Domains */}
                    {floorData.wings ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(floorData.wings).map(([wingKey, wingData]) => (
                          <div key={wingKey} className="bg-black/40 border border-green-500/20 p-4 rounded-lg">
                            <h3 className="font-bold text-lg text-green-300 mb-2">
                              {wingData.name}
                            </h3>
                            <p className="text-sm text-gray-400 mb-2">
                              {wingData.description}
                            </p>
                            {wingData.name.includes('Flash') && (
                              <p className="text-xs text-green-400 mb-4">⏰ 24h rotation</p>
                            )}
                            {wingData.name.includes('Mid') && (
                              <p className="text-xs text-blue-400 mb-4">⏰ 72h rotation</p>
                            )}
                            {wingData.name.includes('Premium') && (
                              <p className="text-xs text-purple-400 mb-4">⏰ 7d rotation</p>
                            )}
                            <div className="space-y-2">
                              {filterDomainsByArchetype(filterDepartmentDomains(wingData.domains)).map((domain) => (
                                <div key={domain} className="flex items-center justify-between">
                                  <Link 
                                    to={`/wiki/${domain.replace('.sol', '')}`}
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
                                  >
                                    {domain}
                                  </Link>
                                  <span className="text-xs text-gray-500">→</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filterDomainsByArchetype(filterDepartmentDomains(floorData.domains)).map((domain) => (
                          <div key={domain} className="flex items-center justify-between bg-black/20 p-3 rounded border border-green-500/10">
                            <Link 
                              to={`/wiki/${domain.replace('.sol', '')}`}
                              className="text-cyan-300 transition-colors hover:underline"
                            >
                              {domain}
                            </Link>
                            <span className="text-xs text-gray-500">→</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="text-center mt-12">
              <Link
                to="/domains"
                className="neon-green neon-green-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 inline-block"
              >
                Browse All Domains
              </Link>
            </div>

            {/* See Also Section */}
            <section className="mt-16 border-t pt-8 text-sm opacity-80 max-w-4xl mx-auto">
              <h3 className="font-medium mb-3">Explore More</h3>
              <ul className="space-y-1">
                <li><a href="/domains" className="text-sky-400 hover:underline">Domains</a></li>
                <li><a href="/lore" className="text-sky-400 hover:underline">Lore</a></li>
                <li><a href="/wiki/fudscience" className="text-sky-400 hover:underline">FUD Science</a></li>
              </ul>
            </section>
              </>
            )}
          </>
        )}
      </div>

      <style>{`
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          color: #0f0;
          clip: rect(0, 900px, 0, 0);
        }
        .glitch-box {
          animation: flicker 3s infinite;
        }
        @keyframes flicker {
          0% { opacity: 0.98; }
          20% { opacity: 1; }
          40% { opacity: 0.97; }
          60% { opacity: 1; }
          80% { opacity: 0.95; }
          100% { opacity: 1; }
        }
        .neon-green {
          color: #00ff00;
          text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00;
        }
        .neon-green-hover:hover {
          color: #00ff00;
          text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00;
        }
        .glow-green {
          text-shadow: 0 0 10px #00ff00;
        }
      `}</style>
    </div>
  );
};

export default MallDirectoryPage; 