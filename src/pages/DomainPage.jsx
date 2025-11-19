import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getDomainByName } from '../lib/domainQueries';
import { getDepartmentForDomain } from '../lib/useDepartmentQuery';
import { getAllPosts } from '../data/blogPosts';
import DomainTemplate from '../components/DomainTemplate';
import SEOHead from '../components/SEOHead';
import DomainLoadingSkeleton from '../components/DomainLoadingSkeleton';
import DomainErrorFallback from '../components/DomainErrorFallback';

// Lazy load components
const LorePanel = lazy(() => import('../components/LorePanel'));
const ToneBadge = lazy(() => import('../components/ToneBadge'));

const DomainPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [domain, setDomain] = useState(null);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeepLore, setShowDeepLore] = useState(false);

  useEffect(() => {
    const loadDomain = async () => {
      try {
        setLoading(true);
        setError(null);
        const foundDomain = await getDomainByName(slug);
        setDomain(foundDomain);

        // Fetch department for this domain
        if (foundDomain?.slug) {
          const deptData = await getDepartmentForDomain(foundDomain.slug);
          setDepartment(deptData);
        }
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

  // Filter related insights based on domain
  const keyword = domain?.name?.toLowerCase() || "";
  const dept = department?.slug || "";
  const category = domain?.category || "";

  const relatedInsights = getAllPosts()
    .filter((post) => {
      const tags = post.tags || [];
      return (
        tags.includes(dept) ||
        tags.includes(category) ||
        tags.some((t) => keyword.includes(t)) ||
        post.title.toLowerCase().includes(keyword)
      );
    })
    .slice(0, 3);

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
        
        {/* Tone-based highlight wrapper */}
        {(() => {
          if (!department?.tone) {
            return <DomainTemplate domain={domain} />;
          }
          
          const tone = typeof department.tone === 'string' ? JSON.parse(department.tone) : department.tone;
          const category = tone?.category;
          
          if (category === 'premium') {
            return (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 rounded-xl blur-xl -z-10"></div>
                <div className="relative">
                  <div className="absolute top-4 right-4 z-20 bg-yellow-500/20 border border-yellow-500/50 px-4 py-2 rounded-lg">
                    <span className="text-yellow-300 font-bold text-sm">Premium Sector</span>
                  </div>
                  <DomainTemplate domain={domain} />
                </div>
              </div>
            );
          } else if (category === 'meme') {
            return (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-green-500/10 to-pink-500/10 rounded-xl blur-xl -z-10" style={{
                  filter: 'blur(8px)',
                  transform: 'translate(1px, 1px)'
                }}></div>
                <div className="relative" style={{
                  filter: 'drop-shadow(2px 0 0 rgba(255, 0, 255, 0.2)) drop-shadow(-2px 0 0 rgba(0, 255, 0, 0.2))'
                }}>
                  <div className="absolute top-4 right-4 z-20 bg-pink-500/20 border border-pink-500/50 px-4 py-2 rounded-lg">
                    <span className="text-pink-300 font-bold text-sm">Degen Sector</span>
                  </div>
                  <DomainTemplate domain={domain} />
                </div>
              </div>
            );
          } else if (category === 'hybrid') {
            return (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-xl blur-xl -z-10"></div>
                <div className="relative ring-2 ring-blue-500/30 ring-offset-2 ring-offset-black rounded-xl">
                  <DomainTemplate domain={domain} />
                </div>
              </div>
            );
          }
          return <DomainTemplate domain={domain} />;
        })()}

        {/* From the Department Of... Section */}
        {department && (
          <div className="px-4 pb-8">
            <div className="max-w-4xl mx-auto">
              <section className="steel-surface rounded-lg p-8 border border-cyan-500/30 mt-12">
                <h2 className="text-3xl font-bold mb-6 solana-gradient flex items-center gap-3">
                  <span className="text-cyan-400">[</span>
                  From the Department Of...
                  <span className="text-cyan-400">]</span>
                </h2>
                
                <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                  <div className="text-5xl">{department.icon || '🏪'}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-cyan-300 mb-2">
                      {department.name}
                    </h3>
                    {department.short_bio && (
                      <p className="text-gray-300 text-lg mb-3">
                        {department.short_bio}
                      </p>
                    )}
                    {department.flavor_text && (
                      <p className="text-cyan-400 italic text-base mb-4 border-l-2 border-cyan-500/50 pl-4">
                        "{department.flavor_text}"
                      </p>
                    )}
                    
                    {/* Tone metadata badges - Lazy loaded */}
                    {department.tone && (() => {
                      const tone = typeof department.tone === 'string' ? JSON.parse(department.tone) : department.tone;
                      return (
                        <div className="mb-4">
                          <Suspense fallback={<div className="text-xs text-neutral-500 animate-pulse">Loading…</div>}>
                            <ToneBadge
                              category={tone.category}
                              vibe={tone.vibe}
                              energy={tone.energy}
                              humor={tone.humor}
                              showAll={true}
                            />
                          </Suspense>
                        </div>
                      );
                    })()}

                    <Link
                      to={`/directory/dept/${department.slug}`}
                      className="inline-block px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
                    >
                      Visit Department Page →
                    </Link>
                  </div>
                </div>

                {/* Deep Lore (Collapsible) */}
                {department.long_bio && (
                  <div className="mt-6 pt-6 border-t border-cyan-500/20">
                    <button
                      onClick={() => setShowDeepLore(!showDeepLore)}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-3 flex items-center gap-2"
                    >
                      <span>{showDeepLore ? '▼' : '▶'}</span>
                      Deep Lore
                    </button>
                    {showDeepLore && (
                      <div className="mt-3 p-4 bg-black/40 border border-cyan-500/20 rounded-lg">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {department.long_bio}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

        {/* Related Insights */}
        {relatedInsights.length > 0 && (
          <div className="px-4 pb-8">
            <div className="max-w-6xl mx-auto mt-20">
              <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                Related Insights
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {relatedInsights.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/insights/${post.slug}`}
                    className="block bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:bg-black/50 transition-all shadow-lg"
                  >
                    {post.image && (
                      <div
                        className="w-full h-36 bg-cover bg-center"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white/90 mb-1">
                        {post.title}
                      </h3>
                      <p className="text-white/60 text-sm line-clamp-3">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                ))}

              </div>

              <div className="flex justify-end mt-4">
                <Link
                  to="/insights"
                  className="text-cyan-300 hover:text-cyan-200 text-sm"
                >
                  View All Insights →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainPage; 