import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import TipJar from '../components/TipJar';
import FlashSaleRotator from '../components/FlashSaleRotator';
import RotationStatus from '../components/RotationStatus';
import domainsData from '../data/domains.json';

const AcquisitionLevelsPage = () => {
  // Filter domains for Flash Rack (domains without websites)
  const flashRackDomains = domainsData.domains.filter(domain => 
    domain.status === "available" && 
    !domain.hasWebsite && 
    domain.category === "flash"
  ).slice(0, 4);

  // Filter domains for Quick Snags (only specific 3 domains, mid-tier only)
  const quickSnagDomains = domainsData.domains.filter(domain => 
    domain.status === "available" && 
    domain.hasWebsite && 
    domain.quickSnagPrice &&
    domain.category === "mid" &&
    ["rigbuilder", "bidgremlin", "deploydeck"].includes(domain.name)
  ).slice(0, 3);

  // Filter domains for Vaulted Drops (vaulted premium domains)
  const vaultedDomains = domainsData.domains.filter(domain => 
    domain.status === "vaulted" && 
    domain.category === "premium"
  ).slice(0, 4);

  const domainCategories = [
    {
      name: "Flash Rack",
      description: "24h rotation cycle - Domains without websites",
      domains: flashRackDomains.map(domain => ({
        name: `${domain.name}.sol`,
        status: "For Sale",
        price: domain.price,
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
            {domainCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                {/* Category Title */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold solana-gradient flicker-solana mb-2 font-mono">
                  <span className="text-pink-400">[</span> {category.name} <span className="text-pink-400">]</span>
                </h2>
                  {category.description && (
                    <p className="text-sm text-gray-400 font-mono">
                      ⏰ {category.description}
                    </p>
                  )}
                </div>
                
                {/* Domain Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.domains.map((domain, domainIndex) => (
                    <div 
                      key={domainIndex}
                      className="steel-surface card-hover-glow rounded-lg p-6 transition-all duration-300 group border border-gray-700"
                    >
                      {/* Domain Image */}
                      <div className="text-4xl text-center mb-4">
                        {domain.image}
                      </div>
                      
                      {/* Domain Name */}
                      <h3 className="text-lg font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center font-mono">
                        <Link 
                          to={`/wiki/${domain.name.replace('.sol', '')}`}
                          className="hover:underline cursor-pointer"
                        >
                        {domain.name}
                        </Link>
                      </h3>
                      
                      {/* Status Badge */}
                      <div className="flex justify-center mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(domain.status)}`}>
                          {domain.status}
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="text-center mb-4">
                        {domain.status === "Quick Snag" ? (
                          <div>
                            <span className="text-lg font-bold flicker-solana solana-gradient">
                              {domain.price}
                            </span>
                            <div className="text-xs text-gray-400 line-through">
                              {domain.originalPrice}
                            </div>
                          </div>
                        ) : (
                        <span className="text-lg font-bold flicker-solana solana-gradient">
                          {domain.price}
                        </span>
                        )}
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex justify-center">
                        {domain.status === "For Sale" ? (
                          <a 
                            href="https://twitter.com/messages/compose?recipient_id=retailstarsol"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neon-cyan neon-cyan-hover text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                          >
                            DM to Buy
                          </a>
                        ) : domain.status === "Quick Snag" ? (
                          <a 
                            href="https://twitter.com/messages/compose?recipient_id=retailstarsol"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                          >
                            Quick Snag
                          </a>
                        ) : domain.status === "Vaulted" ? (
                          <span className="bg-purple-600 text-white text-center py-2 px-4 rounded text-sm font-semibold glow-purple">
                            Vaulted
                          </span>
                        ) : domain.status === "Sold" ? (
                          <span className="bg-gray-600 text-white text-center py-2 px-4 rounded text-sm font-semibold">
                            Sold
                          </span>
                        ) : (
                          <span className="bg-yellow-600 text-black text-center py-2 px-4 rounded text-sm font-semibold glow-purple">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tip Jar Section */}
        <TipJar />

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
              <a 
                href="/catalog" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Catalog
              </a>
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