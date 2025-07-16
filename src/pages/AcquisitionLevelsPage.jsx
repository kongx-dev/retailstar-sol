import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import TipJar from '../components/TipJar';
import FlashSaleRotator from '../components/FlashSaleRotator';
import RotationStatus from '../components/RotationStatus';
import domainsData from '../data/domains.json';
import DomainCard from "../components/DomainCard";
import "../components/domain-card.css";

const VaultFeatureBlock = ({ onRequest }) => (
  <div className="max-w-2xl mx-auto mb-12">
    <div className="bg-black/90 border-2 border-cyan-400 rounded-lg p-6 font-mono text-sm shadow-lg">
      <div className="text-cyan-300 mb-2 font-bold flex items-center gap-2">
        <span className="text-lg">💎</span> VAULT FEATURE <span className="text-xs bg-cyan-700/40 px-2 py-1 rounded ml-2">// CLASSIFIED</span>
      </div>
      <div className="space-y-1 text-cyan-100">
        <div><span className="text-cyan-400">{'>'}</span> <span className="text-pink-400">domain:</span> <span className="text-white">clicktopump.sol</span></div>
        <div><span className="text-cyan-400">{'>'}</span> <span className="text-pink-400">current price:</span> <span className="text-white">4.2 SOL (no site)</span></div>
        <div><span className="text-cyan-400">{'>'}</span> <span className="text-pink-400">build status:</span> <span className="text-white">dormant (redirect to pump.fun locked)</span></div>
        <div><span className="text-cyan-400">{'>'}</span> <span className="text-pink-400">fixer note:</span> <span className="text-white">"Don't wait for the meta to catch up."</span></div>
        <div><span className="text-cyan-400">{'>'}</span> <span className="text-pink-400">projected build tier:</span> <span className="text-white">Mid-to-Premo Meme Drop Portal</span></div>
        <div><span className="text-cyan-400">{'>'}</span> <span className="text-pink-400">future price:</span> <span className="text-white">8–10+ SOL after build</span></div>
        <div><span className="text-cyan-400">{'>'}</span> <span className="text-pink-400">action:</span> <span className="text-white">engage before deployment</span></div>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={onRequest}
          className="neon-cyan neon-cyan-hover py-2 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-base mt-2"
        >
          <span role="img" aria-label="Request Intercept">📡</span> Request Intercept
        </button>
      </div>
    </div>
  </div>
);

const ContactModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full border-2 border-cyan-400 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-cyan-400 text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 solana-gradient text-center">Request Intercept</h2>
        <p className="text-gray-300 mb-4 text-center">Ping the Fixer for classified access or to engage on clicktopump.sol. Drop your Discord, email, or message below:</p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Discord or Email"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-400 text-white focus:outline-none"
          />
          <textarea
            placeholder="Your message (optional)"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-cyan-400 text-white focus:outline-none"
            rows={3}
          />
          <button
            type="submit"
            className="w-full neon-cyan neon-cyan-hover py-2 px-4 rounded-lg font-semibold transition-all duration-200"
            disabled
            title="Contact form coming soon. For now, DM @retailstarsol on Twitter."
          >
            Send (Coming Soon)
          </button>
        </form>
        <div className="text-xs text-gray-500 mt-4 text-center">
          Or DM <a href="https://twitter.com/retailstarsol" target="_blank" rel="noopener noreferrer" className="underline text-cyan-400">@retailstarsol</a> on Twitter.
        </div>
      </div>
    </div>
  );
};

const AcquisitionLevelsPage = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('coveted');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  // Filter domains for Flash Rack (domains without websites)
  const flashRackDomains = domainsData.domains.filter(domain => 
    domain.status === "available" && 
    !domain.hasWebsite && 
    domain.category === "flash"
  );

  // Filter domains for Mid Tier (jumpsetradio, commandhub, rigbuilder, copevendor)
  const midTierDomains = domainsData.domains.filter(domain =>
    ["jumpsetradio", "commandhub", "rigbuilder", "copevendor"].includes(domain.name)
  );

  // Filter domains for Quick Snags (bidgremlin, deploydeck)
  const quickSnagDomains = domainsData.domains.filter(domain =>
    ["bidgremlin", "deploydeck"].includes(domain.name)
  );

  // Filter domains for Vaulted Drops (vaulted premium domains)
  const vaultedDomains = domainsData.domains.filter(domain => 
    domain.status === "vaulted" && 
    domain.category === "premium"
  ).slice(0, 4);

  // Process flash rack domains with filtering and sorting
  const processFlashRackDomains = () => {
    let filtered = flashRackDomains.map(domain => ({
      name: `${domain.name}.sol`,
      status: "For Sale",
      price: domain.price,
      image: domain.image,
      category: domain.category,
      originalDomain: domain
    }));

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(domain => 
        domain.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(domain => {
        const price = parseFloat(domain.price.replace(' SOL', ''));
        switch (priceFilter) {
          case 'under-1':
            return price < 1;
          case '1-5':
            return price >= 1 && price <= 5;
          case 'over-5':
            return price > 5;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const priceA = parseFloat(a.price.replace(' SOL', ''));
      const priceB = parseFloat(b.price.replace(' SOL', ''));
      
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      } else if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

    return filtered;
  };

  const processedFlashRackDomains = processFlashRackDomains();

  const domainCategories = [
    {
      name: "Flash Rack",
      description: "24h rotation cycle - Domains without websites",
      domains: quickSnagDomains.map(domain => ({
        name: `${domain.name}.sol`,
        status: "Quick Snag",
        price: domain.quickSnagPrice,
        originalPrice: domain.price,
        image: domain.image,
        category: domain.category
      }))
    },
    {
      name: "Quick Snags",
      description: "Featured domains with built-out websites",
      domains: quickSnagDomains.map(domain => ({
        name: `${domain.name}.sol`,
        status: "Quick Snag",
        price: domain.quickSnagPrice,
        originalPrice: domain.price,
        image: domain.image,
        category: domain.category
      }))
    },
    {
      name: "Vaulted Drops",
      description: "Premium domains in the vault",
      domains: vaultedDomains.map(domain => ({
        name: `${domain.name}.sol`,
        status: "Vaulted",
        price: domain.price,
        image: domain.image,
        category: domain.category
      }))
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "For Sale":
        return "bg-green-600 text-white glow-blue";
      case "Quick Snag":
        return "bg-orange-500 text-white glow-orange";
      case "Sold":
        return "bg-red-600 text-white";
      case "Coming Soon":
        return "bg-yellow-600 text-black glow-purple";
      case "Vaulted":
        return "bg-purple-600 text-white glow-purple";
      default:
        return "bg-gray-600 text-white";
    }
  };

  // Helper to render domain image (emoji or png)
  const getDomainImage = (domain) => {
    if (domain.image && domain.image.endsWith('.png')) {
      try {
        return <img src={require(`../assets/${domain.image}`)} alt={domain.name} className="w-12 h-12 mx-auto rounded shadow" />;
      } catch {
        return <span className="text-4xl">❓</span>;
      }
    }
    return <span className="text-4xl">{domain.image}</span>;
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background image at 50% opacity */}
      <img 
        src={retailstarBody} 
        alt="RetailStar Background" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Main content (z-10) */}
      <div className="relative z-10">
        {/* Header */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Back Button */}
            <div className="mb-6 flex justify-center">
              <Link 
                to="/"
                className="neon-cyan neon-cyan-hover py-2 px-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center"
              >
                <span className="mr-2">←</span>
                Back to Access Point
              </Link>
            </div>
            
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img 
                  src={rsLogo} 
                  alt="RetailStar Logo" 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-lg shadow-2xl shadow-blue-500/20 border border-blue-500/30 flicker-solana"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-400/20 rounded-lg"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana font-mono">
              Fixer's Catalog
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue font-mono">
              This information is classified. Proceed with discretion.
            </p>

            {/* Terminal-style tier breakdown */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 font-mono text-sm">
                <div className="text-green-400 mb-4">
                  <span className="text-green-500">$</span> cat acquisition-levels.txt
                </div>
                
                <div className="space-y-3 text-gray-300">
                  <div>
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Tier:</span> <span className="text-yellow-400">PREMIUM</span>
                  </div>
                  <div>
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Price:</span> <span className="text-yellow-400">9+ SOL</span>
                  </div>
                  <div>
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Build:</span> <span className="text-yellow-400">2–3 pages, lore integration, animations, mint tie-ins</span>
                  </div>
                  <div>
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Add-ons:</span> <span className="text-yellow-400">Token gating, lore DB, etc.</span>
                  </div>
                  
                  <div className="mt-6">
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Tier:</span> <span className="text-blue-400">MID</span>
                  </div>
                  <div>
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Price:</span> <span className="text-blue-400">4–8.5 SOL</span>
                  </div>
                  <div>
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Build:</span> <span className="text-blue-400">Solid build or killer concept, not both</span>
                  </div>
                  
                  <div className="mt-6">
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Tier:</span> <span className="text-green-400">FLASH</span>
                  </div>
                  <div>
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Price:</span> <span className="text-green-400">0.2–0.5 SOL</span>
                  </div>
                  <div>
                    <span className="text-green-500">{'>'}</span> <span className="text-cyan-400">Build:</span> <span className="text-green-400">Meme-level domains, ASCII splashes, troll quotes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vault Feature Block */}
            <VaultFeatureBlock onRequest={() => setContactOpen(true)} />
            <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab('coveted')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'coveted'
                    ? 'bg-purple-600/20 border-2 border-purple-400 text-purple-300'
                    : 'bg-gray-800/50 border-2 border-gray-600 hover:border-purple-400/50'
                }`}
              >
                💎 Coveted Drops
              </button>
              <button
                onClick={() => setActiveTab('mid-tier')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'mid-tier'
                    ? 'bg-blue-600/20 border-2 border-blue-400 text-blue-300'
                    : 'bg-gray-800/50 border-2 border-gray-600 hover:border-blue-400/50'
                }`}
              >
                📦 Mid Tier
              </button>
              <button
                onClick={() => setActiveTab('quick-snags')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'quick-snags'
                    ? 'bg-orange-600/20 border-2 border-orange-400 text-orange-300'
                    : 'bg-gray-800/50 border-2 border-gray-600 hover:border-orange-400/50'
                }`}
              >
                ⚡ Quick Snags
              </button>
              <button
                onClick={() => setActiveTab('flash-rack')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'flash-rack'
                    ? 'neon-cyan bg-cyan-600/20 border-2 border-cyan-400'
                    : 'bg-gray-800/50 border-2 border-gray-600 hover:border-cyan-400/50'
                }`}
              >
                🎯 Flash Rack
              </button>
            </div>

            {/* Flash Rack Controls */}
            {activeTab === 'flash-rack' && (
              <div className="bg-black/60 border border-cyan-400/30 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-semibold text-cyan-300 mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Search domains..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-cyan-300 mb-2">Price Range</label>
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="all">All Prices</option>
                      <option value="under-1">Under 1 SOL</option>
                      <option value="1-5">1-5 SOL</option>
                      <option value="over-5">Over 5 SOL</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-semibold text-cyan-300 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="price">Price</option>
                      <option value="name">Name</option>
                    </select>
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-sm font-semibold text-cyan-300 mb-2">Order</label>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="asc">Low to High</option>
                      <option value="desc">High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Rotation Status Widget */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <RotationStatus compact={true} />
          </div>
        </section>

        {/* Flash Sale Rotator */}
        <section className="py-16 px-4">
          <FlashSaleRotator />
        </section>

        {/* Domain Categories */}
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'coveted' ? (
              <div className="mb-16">
                {/* Coveted Drops Title */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold solana-gradient flicker-solana mb-2 font-mono">
                    <span className="text-pink-400">[</span> Coveted Drops <span className="text-pink-400">]</span>
                  </h2>
                  <p className="text-sm text-gray-400 font-mono">
                    💎 Premium domains for sale (not vaulted)
                  </p>
                </div>
                {/* Coveted Drops Domain Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {vaultedDomains.map((domain, domainIndex) => (
                    <DomainCard
                      key={domainIndex}
                      domain={`${domain.name}.sol`}
                      price={domain.price.replace(' SOL', '')}
                      rarity="epic"
                      tag="Premium"
                      hasSite={!!domain.hasWebsite}
                      vaulted={true}
                      forSale={false}
                      flashRack={false}
                      lore={!!domain.lore}
                    />
                  ))}
                </div>
              </div>
            ) : activeTab === 'mid-tier' ? (
              <div className="mb-16">
                {/* Mid Tier Title */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold solana-gradient flicker-solana mb-2 font-mono">
                    <span className="text-pink-400">[</span> Mid Tier <span className="text-pink-400">]</span>
                  </h2>
                  <p className="text-sm text-gray-400 font-mono">
                    📦 Solid builds with websites included
                  </p>
                </div>
                {/* Mid Tier Domain Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {midTierDomains.map((domain, domainIndex) => (
                    <DomainCard
                      key={domainIndex}
                      domain={`${domain.name}.sol`}
                      price={domain.price.replace(' SOL', '')}
                      rarity="rare"
                      tag="Mid Tier"
                      hasSite={!!domain.hasWebsite}
                      vaulted={false}
                      forSale={true}
                      flashRack={false}
                      lore={!!domain.lore}
                    />
                  ))}
                </div>
              </div>
            ) : activeTab === 'quick-snags' ? (
              <div className="mb-16">
                {/* Quick Snags Title */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold solana-gradient flicker-solana mb-2 font-mono">
                    <span className="text-pink-400">[</span> Quick Snags <span className="text-pink-400">]</span>
                  </h2>
                  <p className="text-sm text-gray-400 font-mono">
                    ⚡ Featured domains with built-out websites
                  </p>
                </div>
                {/* Quick Snags Domain Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickSnagDomains.map((domain, domainIndex) => (
                    <DomainCard
                      key={domainIndex}
                      domain={`${domain.name}.sol`}
                      price={(domain.quickSnagPrice || domain.price).replace(' SOL', '')}
                      rarity="base"
                      tag="Quick Snag"
                      hasSite={!!domain.hasWebsite}
                      vaulted={false}
                      forSale={true}
                      flashRack={false}
                      lore={!!domain.lore}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-16">
                {/* Flash Rack Title */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold solana-gradient flicker-solana mb-2 font-mono">
                    <span className="text-pink-400">[</span> Flash Rack <span className="text-pink-400">]</span>
                  </h2>
                  <p className="text-sm text-gray-400 font-mono">
                    ⏰ 24h rotation cycle - Domains without websites ({processedFlashRackDomains.length} available)
                  </p>
                </div>
                {/* Flash Rack Domain Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {processedFlashRackDomains.map((domain, domainIndex) => (
                    <DomainCard
                      key={domainIndex}
                      domain={domain.name}
                      price={domain.price.replace(' SOL', '')}
                      rarity="base"
                      tag="Quick Snag"
                      hasSite={!!domain.originalDomain?.hasWebsite}
                      vaulted={false}
                      forSale={true}
                      flashRack={true}
                      lore={!!domain.originalDomain?.lore}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Tip Jar Section */}
        <TipJar />

        {/* Newsletter Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="steel-surface rounded-lg p-8 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-6 solana-gradient text-center font-mono">
                <span className="text-pink-400">[</span> Get Classified Intel <span className="text-pink-400">]</span>
              </h2>
              
              <p className="text-gray-300 text-center mb-6 font-mono">
                Subscribe for exclusive domain drops, vault notifications, and underlayer alpha.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a 
                  href="https://twitter.com/retailstarsol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  📰 Follow @retailstarsol
                </a>
                <a 
                  href="https://retailstar.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 border border-orange-500/30"
                >
                  📧 Subscribe to Newsletter
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed glow-blue font-mono">
                "This ain't your grandma's domain marketplace. This is the underlayer where real deals happen."
              </p>
            </div>
            
            <div className="flex justify-center space-x-8 text-sm mb-6">
              <a 
                href="https://github.com/KongX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://twitter.com/retailstarsol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://twitter.com/messages/compose?recipient_id=KongX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Contact
              </a>
              <a 
                href="/domains" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Domains
              </a>
              <Link 
                to="/catalog" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Catalog
              </Link>
              <a 
                href="/vault" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Vault
              </a>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>© 2025 retailstar.sol - Nodes in the Retailverse</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AcquisitionLevelsPage; 