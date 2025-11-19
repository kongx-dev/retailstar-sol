import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
const MythicRotator = lazy(() => import('../components/MythicRotator'));
import PathFork from '../components/PathFork';
import Footer from '../components/Footer';
import SeoContentBlock from '../components/SeoContentBlock';
import { getAllPosts } from '../data/blogPosts';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import jpegdealerImage from '../assets/jpegdealer.png';
import fudscientistImage from '../assets/fudscientist.png';
import jumpsetradioImage from '../assets/jumpsetradio.png';
import commandhubImage from '../assets/commandhub.png';

const siteUrl = 'https://retailstar.sol';

// Get latest 3 insights
const latestInsights = getAllPosts()
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  .slice(0, 3);

const featuredNodes = [
  {
    name: 'commandhub.sol',
    image: commandhubImage,
    alt: 'commandhub.sol AI dashboard logo',
    price: '8.5 SOL',
    description: 'AI dashboard + infrastructure ready',
    persona: 'Builder Bros, Developers',
    url: '/wiki/commandhub',
  },
  {
    name: 'fudscience.sol',
    image: fudscientistImage,
    alt: 'fudscience.sol satirical alpha reports logo',
    price: '10 SOL',
    description: 'Satirical alpha reports / mockery of FOMO culture',
    persona: 'Web3 Degens, Lore Seekers',
    url: '/wiki/fudscience',
  },
  {
    name: 'jumpsetradio.sol',
    image: jumpsetradioImage,
    alt: 'jumpsetradio.sol gamer x streetwear logo',
    price: '5.5 SOL',
    description: 'Gamer x streetwear aesthetic, tons of creative upside',
    persona: 'Builder Bros, NFT Traders',
    url: '/wiki/jumpsetradio',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SEOHead 
        target="retailstar.sol"
        pageType="main"
        customTitle="Retailstar – Meme Luxury Domain Outlet | Buy .SOL Meme Domains"
        customDescription="Retailstar Mall is a cyberpunk Solana domain marketplace offering meme sites, dev tools, and ready-to-use .sol builds."
        customKeywords="meme domains, luxury domains, .sol names, NFT websites, domain lore, Solana domains, SNS"
        imageUrl={siteUrl + '/assets/rs-logo.png'}
        canonicalUrl="https://retailstar.xyz/"
      />
      {/* LLM summary for HomePage */}
      {/*
      <meta name="llm-summary" content="Retailstar is a decentralized Solana domain marketplace styled like a digital mall. Users can explore, bid, or unlock domain names with custom builds, memes, and lore.">
      */}
      {/* Background image at 50% opacity */}
      <img 
        src={retailstarBody} 
        alt="RetailStar mallcore background, neon Solana underlayer" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Main content (z-10) */}
      <div className="relative z-10">
        {/* SEO H1 - Hidden but accessible */}
        <h1 className="sr-only">Retailstar Mall — Solana Domain Marketplace</h1>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4" data-persona="all" data-meta="hero">
          <div className="max-w-6xl mx-auto text-center">
            {/* Hero Image */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img 
                  src={rsLogo} 
                  alt="RetailStar logo, Solana domain marketplace" 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-lg shadow-2xl shadow-blue-500/20 border border-blue-500/30 flicker-solana"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-400/20 rounded-lg"></div>
              </div>
            </div>
            
            {/* Title */}
            <h2 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana" data-persona="all" data-meta="site-title">
              Retailstar: Your Meme-Luxury Domain Outlet
            </h2>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue" data-persona="all" data-meta="tagline">
              Because your meme deserves a mansion, not a motel.
            </p>
            
            {/* Path Fork Component */}
            <div className="mb-12">
              <PathFork />
            </div>

            {/* Pricing Guide Button */}
            <div className="mb-8">
              <Link
                to="/guide"
                className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/30"
              >
                💰 Curious what it costs to play?
              </Link>
            </div>

            {/* Subtext */}
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed" data-persona="Lore Seekers, Info Farmers" data-meta="subtext">
              Not everything&apos;s for sale. But if you know what to ask for… you might find it.
            </p>
          </div>
        </section>

        {/* Featured Domains Section */}
        <section className="px-4 py-16" data-persona="Collectors, NFT Traders, Builder Bros" data-meta="featured-nodes">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center solana-gradient flicker-solana mb-8" data-meta="featured-title">
              <span className="text-pink-400">[</span> Featured Nodes <span className="text-pink-400">]</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNodes.map((node, idx) => (
                <Link 
                  key={node.name} 
                  to={node.url}
                  className="steel-surface card-hover-glow rounded-lg p-6 text-center block transition-all duration-200 hover:scale-105" 
                  data-persona={node.persona} 
                  data-meta="featured-domain"
                >
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={node.image} 
                      alt={node.alt} 
                      className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg shadow-xl shadow-blue-500/20 border border-blue-500/30 flicker-solana"
                    />
                  </div>
                  <h3 className="text-2xl font-bold solana-gradient flicker-solana mb-2">{node.name}</h3>
                  <p className="text-lg text-gray-300 mb-4">{node.description}</p>
                  {/* <p className="text-sm text-gray-400">Price: {node.price}</p> */}
                  <p className="text-sm text-gray-400">Persona: {node.persona}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Mythic Domains Section */}
        <section className="px-4 py-16" data-persona="High Rollers, Collectors" data-meta="mythic-nodes">
          <div className="max-w-6xl mx-auto">
            <Suspense fallback={null}>
              <MythicRotator />
            </Suspense>
          </div>
        </section>

        {/* SEO Reinforcement Section */}
        <section className="px-4 py-12" data-persona="all" data-meta="seo-reinforcement">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Solana Domains for Builders & Degens
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Retailstar Mall is a cyberpunk marketplace for .sol domains. Browse brand-ready names, meme identities,
              and launch templates for Solana creators, founders, and degens.
            </p>
          </div>
        </section>

        {/* SEO Content Block */}
        <SeoContentBlock />

        {/* Latest Insights Section */}
        <div className="mt-20 mb-24 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
            Latest Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {latestInsights.map((post) => (
              <Link
                key={post.slug}
                to={`/insights/${post.slug}`}
                className="block bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:bg-black/50 transition-all shadow-lg"
              >
                {/* Cover Image */}
                {post.image && (
                  <div
                    className="w-full h-40 bg-cover bg-center"
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
                  <p className="text-white/40 text-xs mt-3">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}

          </div>

          {/* View All Button */}
          <div className="flex justify-end mt-8">
            <Link
              to="/insights"
              className="text-cyan-300 hover:text-cyan-200 text-sm font-medium"
            >
              View All Insights →
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
