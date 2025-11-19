import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { retailstarLore } from '../data/loreContent';
import SEOHead from '../components/SEOHead';
import { Link, useSearchParams } from 'react-router-dom';
import { getDepartment, getDomainsWithDepartments, getAllDepartments } from '../lib/useDepartmentQuery';
import { getAllPosts } from '../data/blogPosts';
import DomainLoadingSkeleton from '../components/DomainLoadingSkeleton';
import DomainErrorFallback from '../components/DomainErrorFallback';

// Lazy load components
const WikiEntryCard = lazy(() => import('../components/WikiEntryCard'));
const ToneBadge = lazy(() => import('../components/ToneBadge'));

const WikiDirectoryPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const deptFilter = searchParams.get('dept');
  
  // New state for wiki entries
  const [domains, setDomains] = useState([]);
  const [filteredDomains, setFilteredDomains] = useState([]);
  const [department, setDepartment] = useState(null);
  const [departmentsMap, setDepartmentsMap] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter related insights based on department
  const relatedInsights = department
    ? getAllPosts()
        .filter((post) => {
          const tags = post.tags || [];
          return (
            tags.includes(department.slug) ||
            tags.includes(department.name?.toLowerCase()) ||
            post.category === department.slug
          );
        })
        .slice(0, 3)
    : [];

  // Fetch domains and department data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all departments and create map
        const allDepts = await getAllDepartments();
        const deptMap: Record<string, any> = {};
        allDepts.forEach(dept => {
          deptMap[dept.slug] = dept;
        });
        setDepartmentsMap(deptMap);

        // Fetch all domains with departments
        const allDomains = await getDomainsWithDepartments();
        setDomains(allDomains);

        // If department filter exists, fetch department and filter domains
        if (deptFilter) {
          const deptData = await getDepartment(deptFilter);
          
          if (deptData) {
            setDepartment(deptData);
            // Filter domains that belong to this department
            const filtered = allDomains.filter(domain => 
              domain.departmentSlugs && domain.departmentSlugs.includes(deptFilter)
            );
            setFilteredDomains(filtered);
          } else {
            // Department not found - clear filter and show normal view
            setDepartment(null);
            setFilteredDomains([]);
          }
        } else {
          // No filter - clear department state
          setDepartment(null);
          setFilteredDomains([]);
        }
      } catch (err) {
        console.error('Error fetching wiki data:', err);
        setError('Failed to load wiki entries');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deptFilter]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % retailstarLore.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + retailstarLore.length) % retailstarLore.length);
  };

  const currentLore = retailstarLore[currentIndex];

  // Dynamic SEO metadata based on department filtering
  const seoTitle = department 
    ? `${department.name} Lore — Retailstar Mall Wiki`
    : "Retailstar Wiki Directory | Lore & Story Chapters";
  
  const seoDescription = department
    ? `Lore entries connected to the ${department.name} department in Retailstar Mall.`
    : "Explore the Retailstar lore through interactive story chapters. Discover the history of the Scav Rack, Retail Tickets, and the rise of factions.";
  
  const canonicalUrl = department
    ? `https://retailstar.xyz/wiki-directory?dept=${department.slug}`
    : "https://retailstar.xyz/wiki-directory";

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="wiki-directory"
        customTitle={seoTitle}
        customDescription={seoDescription}
        customKeywords={department ? `${department.name}, ${department.slug}, Retailstar lore, Solana domains` : "Retailstar lore, Scav Rack, Retail Tickets, Solana lore, digital mall story"}
        imageUrl="https://retailstar.xyz/assets/rs-og-card.png"
        canonicalUrl={canonicalUrl}
        ogImage="https://retailstar.xyz/assets/rs-og-card.png"
        twitterImage="https://retailstar.xyz/assets/rs-og-card.png"
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-6 neon-pulse solana-gradient">
            📚 Wiki Directory
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore the lore and history of the Retailverse
          </p>
          
          {/* Navigation Links */}
          <div className="flex justify-center gap-4 mb-8">
            <Link
              to="/directory"
              className="text-cyan-300 hover:text-cyan-200 transition-colors duration-200 bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              🗺️ Mall Directory
            </Link>
            {department && (
              <Link
                to="/wiki-directory"
                className="text-orange-300 hover:text-orange-200 transition-colors duration-200 bg-black/20 backdrop-blur-sm border border-orange-500/30 rounded-lg px-4 py-2 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/20"
              >
                Clear Filters
              </Link>
            )}
          </div>
        </div>

        {/* Department Bio Section */}
        {department && (() => {
          const tone = typeof department.tone === 'string' ? JSON.parse(department.tone) : department.tone;
          return (
            <div className="max-w-6xl mx-auto mb-12">
              <div className="p-6 bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 mb-4">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="text-6xl">{department.icon || '🏪'}</div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2">
                      {department.name} Lore
                    </h2>
                    {/* Use long_bio if available, fallback to description */}
                    <p className="text-gray-300 text-lg mb-3">
                      {department.long_bio || department.description}
                    </p>
                    {/* Display flavor_text if available */}
                    {department.flavor_text && (
                      <p className="text-cyan-400 italic text-base mb-4 border-l-2 border-cyan-500/50 pl-4">
                        {department.flavor_text}
                      </p>
                    )}
                    {/* Tone metadata chips - Lazy loaded */}
                    {tone && (
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
                    )}
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-500/20 border border-purple-500/30 text-purple-300">
                        Filtering by: {department.name}
                      </span>
                      <Link
                        to={`/directory/dept/${department.slug}`}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
                      >
                        Visit Department Page →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lore Origin Seal */}
              {tone && (
                <div className="p-4 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-lg text-center">
                  <p className="text-purple-300 text-sm font-mono">
                    Sourced from: {department.name} — {tone.vibe || 'retailpunk-chaos'}
                  </p>
                </div>
              )}

              {/* Department Traits Panel */}
              {tone && (
                <div className="mt-4 p-6 bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
                  <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Department Traits
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Category</div>
                      <div className="text-cyan-300 font-semibold">{tone.category || 'N/A'}</div>
                    </div>
                    <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Vibe</div>
                      <div className="text-cyan-300 font-semibold">{tone.vibe || 'N/A'}</div>
                    </div>
                    <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Energy</div>
                      <div className="text-cyan-300 font-semibold">{tone.energy || 'N/A'}</div>
                    </div>
                    <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Humor</div>
                      <div className="text-cyan-300 font-semibold">{tone.humor || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Related Insights Section */}
        {department && relatedInsights.length > 0 && (
          <div className="mt-12 mb-16">
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
            )}

        {/* Loading State */}
        {loading && (
          <div className="max-w-7xl mx-auto mb-12">
            <DomainLoadingSkeleton count={6} />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-7xl mx-auto mb-12">
            <DomainErrorFallback error={error} onRetry={() => window.location.reload()} />
          </div>
        )}

        {/* Section 1 - Lore in This Department (only when filtering) */}
        {!loading && !error && department && filteredDomains.length > 0 && (
          <div className="max-w-7xl mx-auto mb-16">
            <div className="mb-6 pb-3 border-b border-cyan-500/30">
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 flex items-center gap-3">
                <span>{department.icon || '🏪'}</span>
                <span>{department.name} — Lore Entries</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredDomains.map((domain) => (
                <WikiEntryCard 
                  key={domain.id || domain.slug || domain.name} 
                  domain={domain} 
                  departmentsMap={departmentsMap}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section 2 - All Lore (Mall Index) */}
        {!loading && !error && domains.length > 0 && (
          <div className="max-w-7xl mx-auto mb-16">
            <div className="mb-6 pb-3 border-b border-cyan-500/30">
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-300">
                All Lore (Full Mall Index)
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {domains.map((domain) => {
                // Extract minimal department info for departmentsMap
                const minimalDeptMap: Record<string, any> = {};
                if (domain.departmentSlugs && departmentsMap) {
                  domain.departmentSlugs.forEach(slug => {
                    const dept = departmentsMap[slug];
                    if (dept) {
                      const tone = typeof dept.tone === 'string' ? JSON.parse(dept.tone) : dept.tone;
                      minimalDeptMap[slug] = {
                        name: dept.name,
                        icon: dept.icon,
                        flavor_text: dept.flavor_text,
                        toneCategory: tone?.category
                      };
                    }
                  });
                }
                
                return (
                  <Suspense 
                    key={domain.id || domain.slug || domain.name}
                    fallback={
                      <div className="bg-black/40 border border-cyan-500/30 rounded-xl p-6 animate-pulse">
                        <div className="h-24 bg-gray-700 rounded mb-4"></div>
                        <div className="h-4 bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded"></div>
                      </div>
                    }
                  >
                    <WikiEntryCard 
                      domain={domain} 
                      departmentsMap={minimalDeptMap}
                    />
                  </Suspense>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && domains.length === 0 && (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-gray-400 text-lg mb-4">
              No wiki entries found yet.
            </p>
            <p className="text-gray-500 text-sm">
              Check back soon for new additions!
            </p>
          </div>
        )}

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Progress indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-2">
                {retailstarLore.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Chapter counter */}
            <div className="text-center mb-6 text-gray-400">
              Chapter {currentIndex + 1} of {retailstarLore.length}
            </div>

            {/* Lore Card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8 shadow-2xl shadow-cyan-500/20"
                >
                  {/* Chapter header */}
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{currentLore.emoji}</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-2">
                      {currentLore.title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                  </div>

                  {/* Chapter content */}
                  <div className="prose prose-invert max-w-none">
                    <div 
                      className="text-gray-200 leading-relaxed text-lg"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {currentLore.content}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prev}
                className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg text-cyan-300 hover:text-cyan-200 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                ⬅️ Previous
              </button>

              <div className="text-gray-400 text-sm">
                {currentIndex + 1} / {retailstarLore.length}
              </div>

              <button
                onClick={next}
                className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg text-cyan-300 hover:text-cyan-200 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Next ➡️
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="text-sm">
            Explore the complete Retailstar lore and discover the hidden stories behind the mall
          </p>
        </div>
      </div>
    </div>
  );
};

export default WikiDirectoryPage; 