import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { getAllDepartments } from '../lib/useDepartmentQuery';

// Lazy load components
const DepartmentTile = lazy(() => import('../components/DepartmentTile'));

const MallDirectoryPage = () => {
  const [flicker, setFlicker] = useState(false);
  const [booting, setBooting] = useState(true);
  const [searchParams] = useSearchParams();
  const archetypeFilter = searchParams.get('archetype');
  const { domains: supabaseDomains, loading, error } = useDomains({ listed: true });
  const [departments, setDepartments] = useState([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);

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

  // Fetch departments from Supabase
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setDepartmentsLoading(true);
        const depts = await getAllDepartments();
        setDepartments(depts);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setDepartments([]);
      } finally {
        setDepartmentsLoading(false);
      }
    };

    fetchDepartments();
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
          <div className="fixed inset-0 bg-black/90 text-green-400 flex items-center justify-center text-2xl animate-pulse z-[9999]">
            <span className="glitch-text">[BOOTING TERMINAL...]</span>
          </div>
        )}

        {!booting && (
          <>
            {loading ? (
              <div className="text-center py-12">
                <DomainLoadingSkeleton count={6} />
              </div>
            ) : error && !error.includes('Supabase not configured') ? (
              <DomainErrorFallback error={error} onRetry={() => window.location.reload()} />
            ) : (
              <>
                {/* Header */}
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-6xl font-black mb-4 neon-pulse solana-gradient flicker-solana">
                    🏬 Main Floor — Retailstar Mall Directory
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Choose a department to start shopping.
                  </p>
                  
                  {/* Archetype Filter Indicator - Simplified */}
                  {archetypeFilter && (
                    <div className="max-w-4xl mx-auto mb-6 p-3 bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg">
                      <div className="flex items-center justify-center space-x-4">
                        <span className="text-cyan-400 font-semibold text-sm">
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
                  
                  {/* Supabase unavailable notice (subtle) */}
                  {error && error.includes('Supabase not configured') && (
                    <div className="max-w-4xl mx-auto mb-6 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg text-center">
                      <p className="text-yellow-400 text-sm">
                        ⚠️ Database features unavailable. Showing directory from static data.
                      </p>
                    </div>
                  )}
                </div>

                {/* Mini-Floor Map Visualization */}
                <div className="max-w-md mx-auto mb-12">
                  <div className="bg-black/40 border border-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-400 mb-3 text-center">📍 You Are Here</h3>
                    <div className="flex flex-col gap-2">
                      <Link 
                        to="/parking-garage"
                        className="flex items-center justify-between p-3 bg-black/40 border border-gray-600 rounded hover:border-red-500/50 transition-colors"
                      >
                        <span className="text-gray-400">🅿️ P1</span>
                        <span className="text-gray-300 text-sm">Parking Garage</span>
                      </Link>
                      <div className="flex items-center justify-between p-3 bg-teal-900/30 border-2 border-teal-500 rounded shadow-lg shadow-teal-500/20">
                        <span className="text-teal-300 font-bold">🏬 1F</span>
                        <span className="text-teal-300 font-semibold">Main Floor</span>
                        <span className="text-xs text-teal-400">← You Are Here</span>
                      </div>
                      <Link 
                        to="/blueprint-suites"
                        className="flex items-center justify-between p-3 bg-black/40 border border-gray-600 rounded hover:border-orange-500/50 transition-colors"
                      >
                        <span className="text-gray-400">🧪 2F</span>
                        <span className="text-gray-300 text-sm">Blueprint Suites</span>
                      </Link>
                      <Link 
                        to="/rooftop-lounge"
                        className="flex items-center justify-between p-3 bg-black/40 border border-gray-600 rounded hover:border-purple-500/50 transition-colors"
                      >
                        <span className="text-gray-400">🌆 3F</span>
                        <span className="text-gray-300 text-sm">Rooftop Lounge</span>
                      </Link>
                    </div>
                  </div>
                </div>

            {/* Lore Button */}
            <div className="flex justify-center mb-8">
              <LoreButton />
            </div>

                {/* Department Tiles Grid - 5x3 */}
                <div className="max-w-7xl mx-auto mb-12">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">🏪 Departments</h2>
                  {departmentsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {[...Array(15)].map((_, i) => (
                        <div key={i} className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 animate-pulse">
                          <div className="h-8 bg-gray-700 rounded mb-2"></div>
                          <div className="h-4 bg-gray-700 rounded mb-1"></div>
                          <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  ) : departments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {departments.map((dept) => {
                        // Extract minimal props from department object
                        const tone = typeof dept.tone === 'string' ? JSON.parse(dept.tone) : dept.tone;
                        return (
                          <Suspense 
                            key={dept.slug} 
                            fallback={
                              <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 animate-pulse">
                                <div className="h-8 bg-gray-700 rounded mb-2"></div>
                                <div className="h-4 bg-gray-700 rounded mb-1"></div>
                                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                              </div>
                            }
                          >
                            <DepartmentTile
                              icon={dept.icon}
                              name={dept.name}
                              short_bio={dept.short_bio}
                              slug={dept.slug}
                              toneCategory={tone?.category}
                              flavor_text={dept.flavor_text}
                              long_bio={dept.long_bio}
                              toneVibe={tone?.vibe}
                              toneEnergy={tone?.energy}
                              toneHumor={tone?.humor}
                            />
                          </Suspense>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <p>No departments found. Using fallback display.</p>
                      {/* Fallback to hardcoded tiles if Supabase unavailable */}
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                        <Link 
                          to="/directory/dept/meme-arcade"
                          className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                        >
                          <div className="text-3xl mb-2">🕹️</div>
                          <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Meme Arcade</h3>
                          <p className="text-xs text-gray-400">Viral domains & meme culture</p>
                        </Link>

                    {/* AI Agents & Automations */}
                    <Link 
                      to="/directory/dept/ai-agents"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">🤖</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">AI Agents & Automations</h3>
                      <p className="text-xs text-gray-400">AI-powered domain tools</p>
                    </Link>

                    {/* Gamer Zone */}
                    <Link 
                      to="/directory/dept/gamer-zone"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">🎯</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Gamer Zone</h3>
                      <p className="text-xs text-gray-400">Gaming & GameFi domains</p>
                    </Link>

                    {/* Founder's Row */}
                    <Link 
                      to="/directory/dept/founders-row"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">👔</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Founder's Row</h3>
                      <p className="text-xs text-gray-400">Startup & founder domains</p>
                    </Link>

                    {/* Creator Tools */}
                    <Link 
                      to="/directory/dept/creator-tools"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">🛠️</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Creator Tools</h3>
                      <p className="text-xs text-gray-400">Content creator resources</p>
                    </Link>

                    {/* Lore & Worldbuilding */}
                    <Link 
                      to="/directory/dept/lore-worldbuilding"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">📜</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Lore & Worldbuilding</h3>
                      <p className="text-xs text-gray-400">Storytelling & narrative</p>
                    </Link>

                    {/* Security Wing */}
                    <Link 
                      to="/directory/dept/security-wing"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">🔒</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Security Wing</h3>
                      <p className="text-xs text-gray-400">Security & privacy tools</p>
                    </Link>

                    {/* Tech Infrastructure */}
                    <Link 
                      to="/directory/dept/tech-infrastructure"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">⚡</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Tech Infrastructure</h3>
                      <p className="text-xs text-gray-400">Dev tools & infrastructure</p>
                    </Link>

                    {/* Audio & Media */}
                    <Link 
                      to="/directory/dept/audio-media"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">🎵</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Audio & Media</h3>
                      <p className="text-xs text-gray-400">Music & media platforms</p>
                    </Link>

                    {/* Alpha Labs */}
                    <Link 
                      to="/directory/dept/alpha-labs"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">🧪</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Alpha Labs</h3>
                      <p className="text-xs text-gray-400">Experimental & cutting-edge</p>
                    </Link>

                    {/* Artifacts Gallery */}
                    <Link 
                      to="/directory/dept/artifacts-gallery"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">💎</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Artifacts Gallery</h3>
                      <p className="text-xs text-gray-400">Rare & collectible domains</p>
                    </Link>

                    {/* Social Identity */}
                    <Link 
                      to="/directory/dept/social-identity"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">👤</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Social Identity</h3>
                      <p className="text-xs text-gray-400">Personal branding domains</p>
                    </Link>

                    {/* Marketing & Growth */}
                    <Link 
                      to="/directory/dept/marketing-growth"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">📈</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Marketing & Growth</h3>
                      <p className="text-xs text-gray-400">Growth & marketing tools</p>
                    </Link>

                    {/* Cyber Markets */}
                    <Link 
                      to="/directory/dept/cyber-markets"
                      className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2">💹</div>
                      <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Cyber Markets</h3>
                      <p className="text-xs text-gray-400">Trading & DeFi domains</p>
                    </Link>

                        {/* Wildcard Deals */}
                        <Link 
                          to="/directory/dept/wildcard-deals"
                          className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-200 group"
                        >
                          <div className="text-3xl mb-2">🎲</div>
                          <h3 className="font-bold text-white mb-1 group-hover:text-cyan-300">Wildcard Deals</h3>
                          <p className="text-xs text-gray-400">Unexpected finds & deals</p>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Featured Shops Section */}
                <div className="max-w-7xl mx-auto mb-12">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">⭐ Featured Shops</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link 
                      to="/wiki/jpegdealer"
                      className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
                    >
                      <div className="text-4xl mb-3">🖼️</div>
                      <h3 className="text-xl font-bold text-white mb-2">jpegdealer.sol</h3>
                      <p className="text-gray-300 text-sm">Your NFT Plug - The JPEG game runs deep</p>
                    </Link>

                    <Link 
                      to="/wiki/jumpsetradio"
                      className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-200"
                    >
                      <div className="text-4xl mb-3">📻</div>
                      <h3 className="text-xl font-bold text-white mb-2">jumpsetradio.sol</h3>
                      <p className="text-gray-300 text-sm">Music & media platform</p>
                    </Link>

                    <Link 
                      to="/wiki/commandhub"
                      className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border border-orange-500/30 rounded-lg p-6 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200"
                    >
                      <div className="text-4xl mb-3">⚡</div>
                      <h3 className="text-xl font-bold text-white mb-2">commandhub.sol</h3>
                      <p className="text-gray-300 text-sm">AI dashboard + infrastructure ready</p>
                    </Link>
                  </div>
                </div>

                {/* Quick Navigation Zone */}
                <div className="max-w-4xl mx-auto mb-12">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">🗺️ Quick Navigation</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Link
                      to="/parking-garage"
                      className="bg-black/40 border border-gray-600 rounded-lg p-4 text-center hover:border-red-500/50 hover:bg-black/60 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">🅿️</div>
                      <div className="text-sm font-semibold text-white">Parking Garage</div>
                    </Link>
                    <Link
                      to="/scav-rack"
                      className="bg-black/40 border border-gray-600 rounded-lg p-4 text-center hover:border-red-500/50 hover:bg-black/60 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">🎒</div>
                      <div className="text-sm font-semibold text-white">Scav Rack</div>
                    </Link>
                    <Link
                      to="/blueprint-suites"
                      className="bg-black/40 border border-gray-600 rounded-lg p-4 text-center hover:border-orange-500/50 hover:bg-black/60 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">🧪</div>
                      <div className="text-sm font-semibold text-white">Blueprint Suites</div>
                    </Link>
                    <Link
                      to="/rooftop-lounge"
                      className="bg-black/40 border border-gray-600 rounded-lg p-4 text-center hover:border-purple-500/50 hover:bg-black/60 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">🌆</div>
                      <div className="text-sm font-semibold text-white">Rooftop Lounge</div>
                    </Link>
                    <Link
                      to="/wiki-directory"
                      className="bg-black/40 border border-gray-600 rounded-lg p-4 text-center hover:border-cyan-500/50 hover:bg-black/60 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">📚</div>
                      <div className="text-sm font-semibold text-white">Wiki Directory</div>
                    </Link>
                    <Link
                      to="/insights"
                      className="bg-black/40 border border-gray-600 rounded-lg p-4 text-center hover:border-cyan-500/50 hover:bg-black/60 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">📝</div>
                      <div className="text-sm font-semibold text-white">Insights</div>
                    </Link>
                  </div>
                </div>

                {/* Mall Stats */}
                <div className="max-w-4xl mx-auto mb-12 text-center">
                  <div className="bg-black/40 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-cyan-400 mb-4">📊 Mall Stats</h3>
                    <p className="text-gray-300">
                      78 active domains, 32 wiki entries, 4 mythics, 12 new arrivals
                    </p>
                  </div>
                </div>
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