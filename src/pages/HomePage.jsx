import React from 'react';
import { Link } from 'react-router-dom';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import TipJar from '../components/TipJar';
import FlashSaleRotator from '../components/FlashSaleRotator';
import RotationStatus from '../components/RotationStatus';

const HomePage = () => {
  const domainCategories = [
    {
      name: "Flash Rack",
      description: "24h rotation cycle",
      domains: [
        { name: "jpegdealer.sol", status: "For Sale", price: "10 SOL", image: "🖼️", category: "flash" },
        { name: "copevendor.sol", status: "For Sale", price: "1.69 SOL", image: "💊", category: "flash" },
        { name: "deploydeck.sol", status: "For Sale", price: "2.00 SOL", image: "🚀", category: "flash" },
        { name: "bidgremlin.sol", status: "For Sale", price: "3.00 SOL", image: "👹", category: "flash" }
      ]
    },
    {
      name: "Mid Tier",
      description: "72h rotation cycle",
      domains: [
        { name: "jumpsetradio.sol", status: "For Sale", price: "8 SOL", image: "📻", category: "mid" },
        { name: "lurkerlife.sol", status: "For Sale", price: "6 SOL", image: "👁️", category: "mid" },
        { name: "commandhub.sol", status: "For Sale", price: "1.88 SOL", image: "🔧", category: "mid" },
        { name: "rigbuilder.sol", status: "For Sale", price: "2.00 SOL", image: "⚡", category: "mid" }
      ]
    },
    {
      name: "Premium Wing",
      description: "7d rotation cycle",
      domains: [
        { name: "fudscience.sol", status: "For Sale", price: "12 SOL", image: "🧪", category: "premium" },
        { name: "biggestofbrains.sol", status: "For Sale", price: "15 SOL", image: "🧠", category: "premium" },
        { name: "retailverse.sol", status: "Not For Sale", price: "N/A", image: "🌌", category: "lore" },
        { name: "retailrunner.sol", status: "Not For Sale", price: "N/A", image: "🏃", category: "lore" }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "For Sale":
        return "bg-green-600 text-white glow-blue";
      case "Sold":
        return "bg-red-600 text-white";
      case "Coming Soon":
        return "bg-yellow-600 text-black glow-purple";
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
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Hero Image */}
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
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
              Welcome to RetailStar.sol
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              Every .sol is a node in the Retailverse. Take one. Deploy your own.
            </p>
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
                  <h2 className="text-3xl font-bold solana-gradient flicker-solana mb-2">
                    <span className="text-pink-400">[</span> {category.name} <span className="text-pink-400">]</span>
                  </h2>
                  {category.description && (
                    <p className="text-sm text-gray-400">
                      ⏰ {category.description}
                    </p>
                  )}
                </div>
                
                {/* Domain Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.domains.map((domain, domainIndex) => (
                    <div 
                      key={domainIndex}
                      className="steel-surface card-hover-glow rounded-lg p-6 transition-all duration-300 group"
                    >
                      {/* Domain Image */}
                      <div className="text-4xl text-center mb-4">
                        {domain.image}
                      </div>
                      
                      {/* Domain Name */}
                      <h3 className="text-lg font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
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
                        <span className="text-lg font-bold flicker-solana solana-gradient">
                          {domain.price}
                        </span>
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
            {/* Lore */}
            <div className="mb-8">
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed glow-blue">
                RetailStar is a broadcast from Solana's underlayer — every domain is a node waiting to go live.
              </p>
            </div>
            
            {/* Links */}
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
                href="https://x.com/retailstarsol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://twitter.com/messages/compose?recipient_id=retailstarsol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Contact
              </a>
              <Link 
                to="/directory" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Directory
              </Link>

            </div>
            
            {/* Copyright */}
            <div className="text-xs text-gray-500">
              <p>© 2025 retailstar.sol - Nodes in the Retailverse</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage; 