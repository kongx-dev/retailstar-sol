import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import rsLogo from './assets/rs-logo.png';
import retailstarBody from './assets/retailstar-body.png';
import jpegdealerImage from './assets/jpegdealer.png';
import fudscientistImage from './assets/fudscientist.png';
import DomainsPage from './pages/DomainsPage';
import DomainPage from './pages/DomainPage';
import VaultPage from './pages/VaultPage';
import WikiPage from './pages/WikiPage';
import MallDirectoryPage from './pages/MallDirectoryPage';

function App() {
  const domainCategories = [
    {
      name: "Vaulted Drops",
      domains: [
        { name: "jpegdealer.sol", status: "For Sale", price: "12 SOL", image: "🖼️", description: "The Meta: Instantly clear NFT resale theme, clean layout, viral meme potential" },
        { name: "fudscience.sol", status: "For Sale", price: "10 SOL", image: "🧪", description: "The Meta: Satirical alpha reports / mockery of FOMO culture" },
        { name: "jumpsetradio.sol", status: "For Sale", price: "9 SOL", image: "🎮", description: "The Meta: Gamer x streetwear aesthetic, tons of creative upside" }
      ]
    },
    {
      name: "Shelf Stocked",
      domains: [
        { name: "copevendor.sol", status: "For Sale", price: "3.5 SOL", image: "💊", description: "Rebuild it into something with more absurdity and clean flow" },
        { name: "lurkerlife.sol", status: "For Sale", price: "3 SOL", image: "👁️", description: "Funny but weak build. Add visual humor + better framing" },
        { name: "commandhub.sol", status: "For Sale", price: "5.5 SOL", image: "🔧", description: "Solid dev tool angle, could go 2+ SOL" }
      ]
    },
    {
      name: "Quick Snags",
      domains: [
        { name: "rigbuilder.sol", status: "For Sale", price: "1 SOL", image: "⚡", description: "Fastest to sell for SOL rotation" },
        { name: "bidgremlin.sol", status: "For Sale", price: "0.89 SOL", image: "👹", description: "Fastest to sell for SOL rotation" },
        { name: "deploydeck.sol", status: "For Sale", price: "2 SOL", image: "🚀", description: "Solid dev tool angle, could go 2+ SOL" }
      ]
    },
    {
      name: "Flash Rack",
      domains: [
        { name: "urnotthatguy.sol", status: "For Sale", price: "0.3 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises — just vibes" },
        { name: "yournotthatguy.sol", status: "For Sale", price: "0.4 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises — just vibes" },
        { name: "inpregneable.sol", status: "For Sale", price: "0.5 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises — just vibes" }
      ]
    },
    {
      name: "Coming Soon",
      domains: [
        { name: "deploydock.sol", status: "Coming Soon", price: "TBA", image: "⚓" },
        { name: "controlcenter.sol", status: "Coming Soon", price: "TBA", image: "🎮" },
        { name: "kombat.sol", status: "Coming Soon", price: "TBA", image: "🥊" },
        { name: "urnotthatguy.sol", status: "Coming Soon", price: "TBA", image: "😎" },
        { name: "gg2ez.sol", status: "Coming Soon", price: "TBA", image: "🏆" },
        { name: "trackalpha.sol", status: "Coming Soon", price: "TBA", image: "📊" },
        { name: "alphastalker.sol", status: "Coming Soon", price: "TBA", image: "🕵️" },
        { name: "mindflow.sol", status: "Coming Soon", price: "TBA", image: "🧠" },
        { name: "marksmanhub.sol", status: "Coming Soon", price: "TBA", image: "🎯" },
        { name: "maidenless.sol", status: "Coming Soon", price: "TBA", image: "💔" },
        { name: "ghostrunner.sol", status: "Coming Soon", price: "TBA", image: "👻" },
        { name: "dojoquest.sol", status: "Coming Soon", price: "TBA", image: "🏯" }
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

  // Helper function to render domain image
  const renderDomainImage = (domainName, fallbackEmoji) => {
    if (domainName === "jpegdealer.sol") {
      return (
        <img 
          src={jpegdealerImage} 
          alt="jpegdealer.sol" 
          className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30"
        />
      );
    } else if (domainName === "fudscience.sol") {
      return (
        <img 
          src={fudscientistImage} 
          alt="fudscience.sol" 
          className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30"
        />
      );
    } else {
      return <span className="text-4xl">{fallbackEmoji}</span>;
    }
  };

  const HomePage = () => (
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
            
            {/* Legend/Disclaimer */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded flex items-center justify-center">
                      <img 
                        src={jpegdealerImage} 
                        alt="jpegdealer.sol" 
                        className="w-6 h-6 rounded object-cover"
                      />
                    </div>
                    <span className="text-gray-300">Tiles with pictures = Have websites</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-500/20 border border-gray-500/30 rounded flex items-center justify-center">
                      <span className="text-xs">🎯</span>
                    </div>
                    <span className="text-gray-300">Emoji tiles = Domain only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Domain Categories */}
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Vaulted Drops */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 💎 Vaulted Drops <span className="text-pink-400">]</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {domainCategories[0].domains.map((domain, domainIndex) => (
                  <div 
                    key={domainIndex}
                    className="steel-surface card-hover-glow rounded-lg p-4 sm:p-6 transition-all duration-300 group w-full max-w-sm mx-auto"
                  >
                    {/* Domain Image */}
                    <div className="text-3xl sm:text-4xl text-center mb-4">
                      {renderDomainImage(domain.name, domain.image)}
                    </div>
                    
                    {/* Domain Name */}
                    <h3 className="text-lg font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
                      <a 
                        href={`/domains/${domain.name.replace('.sol', '')}`}
                        className="hover:underline"
                      >
                        {domain.name}
                      </a>
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

                    {/* Description */}
                    {domain.description && (
                      <div className="text-center mb-4">
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {domain.description}
                        </p>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="flex justify-center space-x-2 flex-wrap">
                      {domain.status === "For Sale" ? (
                        <a 
                          href="https://twitter.com/messages/compose?recipient_id=KongX"
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
                      {domain.name === "jpegdealer.sol" && (
                        <a 
                          href="https://jpegdealer.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                        >
                          🌐 Website
                        </a>
                      )}
                      {domain.name === "fudscience.sol" && (
                        <a 
                          href="https://fudscience.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                        >
                          🌐 Website
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shelf Stocked */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 🧱 Shelf Stocked <span className="text-pink-400">]</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {domainCategories[1].domains.map((domain, domainIndex) => (
                  <div 
                    key={domainIndex}
                    className="steel-surface card-hover-glow rounded-lg p-4 sm:p-6 transition-all duration-300 group w-full max-w-sm mx-auto"
                  >
                    {/* Domain Image */}
                    <div className="text-3xl sm:text-4xl text-center mb-4">
                      {renderDomainImage(domain.name, domain.image)}
                    </div>
                    
                    {/* Domain Name */}
                    <h3 className="text-lg font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
                      <a 
                        href={`/domains/${domain.name.replace('.sol', '')}`}
                        className="hover:underline"
                      >
                        {domain.name}
                      </a>
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

                    {/* Description */}
                    {domain.description && (
                      <div className="text-center mb-4">
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {domain.description}
                        </p>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="flex justify-center space-x-2 flex-wrap">
                      {domain.status === "For Sale" ? (
                        <a 
                          href="https://twitter.com/messages/compose?recipient_id=KongX"
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
                      {domain.name === "jpegdealer.sol" && (
                        <a 
                          href="https://jpegdealer.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                        >
                          🌐 Website
                        </a>
                      )}
                      {domain.name === "fudscience.sol" && (
                        <a 
                          href="https://fudscience.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                        >
                          🌐 Website
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Snags */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> ⚡ Quick Snags <span className="text-pink-400">]</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {domainCategories[2].domains.map((domain, domainIndex) => (
                  <div 
                    key={domainIndex}
                    className="steel-surface card-hover-glow rounded-lg p-4 sm:p-6 transition-all duration-300 group w-full max-w-sm mx-auto"
                  >
                    {/* Domain Image */}
                    <div className="text-3xl sm:text-4xl text-center mb-4">
                      {renderDomainImage(domain.name, domain.image)}
                    </div>
                    
                    {/* Domain Name */}
                    <h3 className="text-lg font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
                      <a 
                        href={`/domains/${domain.name.replace('.sol', '')}`}
                        className="hover:underline"
                      >
                        {domain.name}
                      </a>
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

                    {/* Description */}
                    {domain.description && (
                      <div className="text-center mb-4">
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {domain.description}
                        </p>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="flex justify-center space-x-2 flex-wrap">
                      {domain.status === "For Sale" ? (
                        domain.name === "rigbuilder.sol" ? (
                          <a 
                            href="https://www.sns.id/search/single?search=rigbuilder"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neon-cyan neon-cyan-hover text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                          >
                            🛒 Buy Now
                          </a>
                        ) : (
                          <a 
                            href={`https://app.sns.id/domain/${domain.name.replace('.sol', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neon-cyan neon-cyan-hover text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                          >
                            🛒 Buy Now
                          </a>
                        )
                      ) : domain.status === "Sold" ? (
                        <span className="bg-gray-600 text-white text-center py-2 px-4 rounded text-sm font-semibold">
                          Sold
                        </span>
                      ) : (
                        <span className="bg-yellow-600 text-black text-center py-2 px-4 rounded text-sm font-semibold glow-purple">
                          Coming Soon
                        </span>
                      )}
                      {domain.name === "jpegdealer.sol" && (
                        <a 
                          href="https://jpegdealer.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                        >
                          🌐 Website
                        </a>
                      )}
                      {domain.name === "fudscience.sol" && (
                        <a 
                          href="https://fudscience.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                        >
                          🌐 Website
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flash Rack */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 💀 Flash Rack <span className="text-pink-400">]</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {domainCategories[3].domains.map((domain, domainIndex) => (
                  <div 
                    key={domainIndex}
                    className="steel-surface card-hover-glow rounded-lg p-4 sm:p-6 transition-all duration-300 group w-full max-w-sm mx-auto"
                  >
                    {/* Domain Image */}
                    <div className="text-3xl sm:text-4xl text-center mb-4">
                      {renderDomainImage(domain.name, domain.image)}
                    </div>
                    
                    {/* Domain Name */}
                    <h3 className="text-lg font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
                      <a 
                        href={`/domains/${domain.name.replace('.sol', '')}`}
                        className="hover:underline"
                      >
                        {domain.name}
                      </a>
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

                    {/* Description */}
                    {domain.description && (
                      <div className="text-center mb-4">
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {domain.description}
                        </p>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="flex justify-center space-x-2 flex-wrap">
                      {domain.status === "For Sale" ? (
                        <a 
                          href={`https://app.sns.id/domain/${domain.name.replace('.sol', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neon-cyan neon-cyan-hover text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                        >
                          🛒 Buy Now
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
                      {domain.name === "jpegdealer.sol" && (
                        <a 
                          href="https://jpegdealer.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                        >
                          🌐 Website
                        </a>
                      )}
                      {domain.name === "fudscience.sol" && (
                        <a 
                          href="https://fudscience.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
                        >
                          🌐 Website
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 🔮 Coming Soon <span className="text-pink-400">]</span>
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {domainCategories[4].domains.map((domain, domainIndex) => (
                  <div 
                    key={domainIndex}
                    className="steel-surface card-hover-glow rounded-lg p-3 sm:p-4 transition-all duration-300 group w-full max-w-xs mx-auto"
                  >
                    {/* Domain Image */}
                    <div className="text-2xl sm:text-3xl text-center mb-3">
                      {renderDomainImage(domain.name, domain.image)}
                    </div>
                    
                    {/* Domain Name */}
                    <h3 className="text-sm font-bold solana-gradient mb-2 group-hover:glow-blue transition-colors text-center">
                      <a 
                        href={`/domains/${domain.name.replace('.sol', '')}`}
                        className="hover:underline"
                      >
                        {domain.name}
                      </a>
                    </h3>
                    
                    {/* Status Badge */}
                    <div className="flex justify-center mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(domain.status)}`}>
                        {domain.status}
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="text-center">
                      <span className="text-sm font-bold flicker-solana solana-gradient">
                        {domain.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tip Jar Section */}
        <section className="px-4 py-16 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-center solana-gradient flicker-solana">
              <span className="text-pink-400">[</span> Tip the Mall Rats 🛒 <span className="text-pink-400">]</span>
            </h2>

            <div className="steel-surface rounded-lg p-8 border border-blue-500/30">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 solana-gradient">
                  Solana Domain Address
                </h3>
                
                <div className="bg-black/40 rounded-lg p-6 mb-6 border border-gray-700 max-w-md mx-auto">
                  <p className="text-2xl font-mono text-cyan-400 mb-3">
                    paymyinterns.sol
                  </p>
                  <p className="text-sm text-gray-400">
                    Send SOL to support the Retailverse
                  </p>
                </div>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('paymyinterns.sol');
                  }}
                  className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center mx-auto"
                >
                  <span className="mr-2">📋</span>
                  Copy Address
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-center text-lg text-gray-300 leading-relaxed glow-blue">
                  "Every tip keeps the Retailverse alive. From the neon-lit corridors of Solana's underlayer, 
                  we salute you, fellow mall rat. Your SOL fuels the next deployment. 🚀"
                </p>
                <p className="text-center text-sm text-gray-500 mt-4">
                  — The RetailStar Collective
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed glow-blue">
                RetailStar is a broadcast from Solana's underlayer — every domain is a node waiting to go live.
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
                href="https://twitter.com/KongX" 
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
                href="/merch" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Merch
              </a>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>© 2024 retailstar.sol - Nodes in the Retailverse</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/domains" element={<DomainsPage />} />
        <Route path="/domains/:slug" element={<WikiPage />} />
        <Route path="/wiki/:slug" element={<WikiPage />} />
        <Route path="/directory" element={<MallDirectoryPage />} />
        <Route path="/vault" element={<VaultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
