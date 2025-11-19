import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import DomainCard from '../components/DomainCard';
import DomainLoadingSkeleton from '../components/DomainLoadingSkeleton';
import DomainErrorFallback from '../components/DomainErrorFallback';
import { getDepartment, getDomainsForDepartment, getAllDepartments } from '../lib/useDepartmentQuery';
import retailstarBody from '../assets/retailstar-body.png';

// Lazy load components
const LorePanel = lazy(() => import('../components/LorePanel'));
const ToneBadge = lazy(() => import('../components/ToneBadge'));
const ToneChips = lazy(() => import('../components/ToneChips'));
const DepartmentTile = lazy(() => import('../components/DepartmentTile'));
const GlitchSignal = lazy(() => import('../components/GlitchSignal'));

const DirectoryDepartmentPage = () => {
  const { deptSlug } = useParams();
  const [department, setDepartment] = useState(null);
  const [domains, setDomains] = useState([]);
  const [relatedDepartments, setRelatedDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lorePanelRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!deptSlug) {
        setError('Invalid department slug');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch department metadata
        const deptData = await getDepartment(deptSlug);
        
        if (!deptData) {
          setError('Department not found');
          setLoading(false);
          return;
        }

        setDepartment(deptData);

        // Fetch domains for this department
        const domainData = await getDomainsForDepartment(deptSlug);
        setDomains(domainData || []);

        // Fetch related departments based on tone.category
        if (deptData.tone) {
          const tone = typeof deptData.tone === 'string' 
            ? JSON.parse(deptData.tone) 
            : deptData.tone;
          
          if (tone?.category) {
            const allDepts = await getAllDepartments();
            const related = allDepts.filter(dept => {
              if (dept.slug === deptSlug) return false; // Exclude current department
              const deptTone = typeof dept.tone === 'string' 
                ? JSON.parse(dept.tone) 
                : dept.tone;
              
              if (tone.category === 'meme') {
                return deptTone?.category === 'meme';
              } else if (tone.category === 'premium') {
                return deptTone?.category === 'premium';
              } else if (tone.category === 'hybrid') {
                return deptTone?.category === 'hybrid' || deptTone?.category === 'meme' || deptTone?.category === 'premium';
              }
              return false;
            }).slice(0, 4); // Limit to 4 related departments
            setRelatedDepartments(related);
          }
        }
      } catch (err) {
        console.error('Error fetching department data:', err);
        setError('Failed to load department data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deptSlug]);

  // Department not found state
  if (!loading && error === 'Department not found') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <img 
          src={retailstarBody} 
          alt="RetailStar Background" 
          className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-5"></div>
        
        <div className="relative z-10 min-h-screen p-6 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-red-400 mb-6">
              Department Not Found
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The department you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/directory"
              className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              ← Back to Mall Directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <img 
          src={retailstarBody} 
          alt="RetailStar Background" 
          className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-5"></div>
        
        <div className="relative z-10 min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            <DomainLoadingSkeleton count={6} />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && error !== 'Department not found') {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <img 
          src={retailstarBody} 
          alt="RetailStar Background" 
          className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-5"></div>
        
        <div className="relative z-10 min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            <DomainErrorFallback error={error} onRetry={() => window.location.reload()} />
          </div>
        </div>
      </div>
    );
  }

  if (!department) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Helmet>
        <title>{department.name} — {department.description} | Retailstar Mall</title>
        <meta
          name="description"
          content={department.description || `Explore ${department.name} domains in the Retailverse`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://retailstar.xyz/directory/dept/${deptSlug}`} />
      </Helmet>
      
      <SEOHead
        target="retailstar.sol"
        pageType="directory"
        customTitle={`${department.name} — ${department.short_bio || department.description} | Retailstar Mall`}
        customDescription={department.short_bio || department.description || `Explore ${department.name} domains in the Retailverse`}
        customKeywords={`${department.name}, ${deptSlug}, solana domains, ${(() => {
          const tone = typeof department.tone === 'string' ? JSON.parse(department.tone) : department.tone;
          return tone?.category ? `${tone.category}, ` : '';
        })()}${department.name} category`}
        canonicalUrl={`https://retailstar.xyz/directory/dept/${deptSlug}`}
      />

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
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Directory', href: '/directory' },
              { label: department.name, href: `/directory/dept/${deptSlug}` }
            ]}
          />

          {/* Header - Neon Banner */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-cyan-900/30 border-2 border-cyan-500/50 rounded-xl p-8 shadow-2xl shadow-cyan-500/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-7xl">{department.icon || '🏪'}</div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-6xl font-black mb-3 neon-pulse solana-gradient">
                    {department.name}
                  </h1>
                  {department.short_bio && (
                    <p className="text-xl text-cyan-300 mb-4">
                      {department.short_bio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <Link
                to="/directory"
                className="bg-black/40 border border-cyan-500/30 rounded-lg px-6 py-3 text-cyan-300 hover:text-cyan-200 hover:border-cyan-400/50 transition-all duration-200"
              >
                ← Back to Mall Map
              </Link>
              <Link
                to={`/wiki-directory?dept=${deptSlug}`}
                className="bg-black/40 border border-purple-500/30 rounded-lg px-6 py-3 text-purple-300 hover:text-purple-200 hover:border-purple-400/50 transition-all duration-200"
              >
                Explore Lore →
              </Link>
            </div>
          </div>

          {/* Lore Panel - Lazy loaded */}
          {(department.long_bio || department.flavor_text || department.tone) && (() => {
            const tone = typeof department.tone === 'string' ? JSON.parse(department.tone) : department.tone;
            
            return (
              <div className="mb-12" ref={lorePanelRef}>
                <Suspense fallback={<div className="text-xs text-neutral-500 animate-pulse p-6">Loading lore…</div>}>
                  <LorePanel
                    long_bio={department.long_bio || department.description}
                    flavor_text={department.flavor_text}
                    toneCategory={tone?.category}
                    toneVibe={tone?.vibe}
                    toneEnergy={tone?.energy}
                    toneHumor={tone?.humor}
                    collapsible={true}
                  />
                </Suspense>
                
                {/* Glitch Militia Intercept - Lazy loaded with IntersectionObserver */}
                <Suspense fallback={null}>
                  <GlitchSignal departmentSlug={deptSlug} />
                </Suspense>
              </div>
            );
          })()}

          {/* Featured Domains Section */}
          {domains.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-cyan-300 mb-6 pb-3 border-b border-cyan-500/30">
                Featured Domains in This Department
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {domains.slice(0, 8).map((domain) => (
                  <DomainCard
                    key={domain.id || domain.name}
                    domain={domain.name}
                    price={domain.price || 'N/A'}
                    rarity={domain.rarity || 'base'}
                    tag={
                      domain.category === 'premium'
                        ? 'Premium'
                        : domain.category === 'mid'
                        ? 'Mid Tier'
                        : domain.category === 'quickSnag'
                        ? 'Quick Snag'
                        : ''
                    }
                    hasSite={domain.hasWebsite || domain.has_build}
                    vaulted={domain.vaulted || false}
                    forSale={domain.status === 'available' || domain.available}
                    flashRack={domain.flashRack || false}
                    lore={domain.hasLore || false}
                    featured={domain.featured || false}
                    has_build={domain.has_build || false}
                    has_pfp={domain.has_pfp || false}
                    listed={domain.listed || false}
                    className={domain.redacted ? 'glitch blur-sm' : ''}
                    lockBadge={domain.vaulted || false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Explore Related Departments */}
          {relatedDepartments.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-cyan-300 mb-6 pb-3 border-b border-cyan-500/30">
                Explore Related Departments
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedDepartments.map((dept) => (
                  <DepartmentTile key={dept.slug} department={dept} size="mini" />
                ))}
              </div>
            </div>
          )}

          {/* All Domains Grid */}
          {domains.length > 8 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-cyan-300 mb-6 pb-3 border-b border-cyan-500/30">
                All Domains
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {domains.map((domain) => (
                  <DomainCard
                    key={domain.id || domain.name}
                    domain={domain.name}
                    price={domain.price || 'N/A'}
                    rarity={domain.rarity || 'base'}
                    tag={
                      domain.category === 'premium'
                        ? 'Premium'
                        : domain.category === 'mid'
                        ? 'Mid Tier'
                        : domain.category === 'quickSnag'
                        ? 'Quick Snag'
                        : ''
                    }
                    hasSite={domain.hasWebsite || domain.has_build}
                    vaulted={domain.vaulted || false}
                    forSale={domain.status === 'available' || domain.available}
                    flashRack={domain.flashRack || false}
                    lore={domain.hasLore || false}
                    featured={domain.featured || false}
                    has_build={domain.has_build || false}
                    has_pfp={domain.has_pfp || false}
                    listed={domain.listed || false}
                    className={domain.redacted ? 'glitch blur-sm' : ''}
                    lockBadge={domain.vaulted || false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {domains.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">
                No domains found in this department yet.
              </p>
              <p className="text-gray-500 text-sm">
                Check back soon for new additions!
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .neon-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .solana-gradient {
          background: linear-gradient(to right, #00ff00, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
};

export default DirectoryDepartmentPage;

