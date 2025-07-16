import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import jpegdealerImage from '../assets/jpegdealer.png';
import fudscientistImage from '../assets/fudscientist.png';
import jumpsetradioImage from '../assets/jumpsetradio.png';

const siteUrl = 'https://retailstar.sol';
const featuredNodes = [
  {
    name: 'jpegdealer.sol',
    image: jpegdealerImage,
    alt: 'jpegdealer.sol NFT resale platform logo',
    price: '12 SOL',
    description: 'The Meta: Instantly clear NFT resale theme',
    persona: 'Collectors, NFT Traders',
    url: '/domains/jpegdealer',
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
    url: '/domains/jumpsetradio',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SEOHead 
        target="retailstar.sol"
        pageType="main"
        customTitle="Access Point | Retailstar.sol - Solana Domains, Lore, and Meta"
        customDescription="Mallcore begins here. Discover Solana domains with lore, rarity, and utility. For NFT traders, degens, builders, and lore seekers. Not everything's for sale, but if you know what to ask for… you might find it."
        customKeywords="solana domains, NFT, web3, lore, retailstar, meta, meme, builder, DAO, collectibles, flips, alpha, rarity, generative, mallcore"
        imageUrl={siteUrl + '/src/assets/rs-logo.png'}
      />
      {/* Background image at 50% opacity */}
      <img 
        src={retailstarBody} 
        alt="RetailStar mallcore background, neon Solana underlayer" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Main content (z-10) */}
      <div className="relative z-10">
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
            <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana" data-persona="all" data-meta="site-title">
              Access Point
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue" data-persona="all" data-meta="tagline">
              Welcome to Retailstar. Mallcore begins here.
            </p>
            
            {/* Subtext */}
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed" data-persona="Lore Seekers, Info Farmers" data-meta="subtext">
              Not everything's for sale. But if you know what to ask for… you might find it.
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <Link 
                to="/acquisition-levels"
                className="neon-cyan neon-cyan-hover py-4 px-8 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center mx-auto text-lg"
                data-persona="Collectors, NFT Traders, Builder Bros"
                data-meta="cta"
              >
                🪙 Curious what it costs to play?
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Domains Section */}
        <section className="px-4 py-16" data-persona="Collectors, NFT Traders, Builder Bros" data-meta="featured-nodes">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center solana-gradient flicker-solana mb-8" data-meta="featured-title">
              <span className="text-pink-400">[</span> Featured Nodes <span className="text-pink-400">]</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <p className="text-sm text-gray-400">Price: {node.price}</p>
                  <p className="text-sm text-gray-400">Persona: {node.persona}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
