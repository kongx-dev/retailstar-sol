import React, { useState } from 'react';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';

// Full inventory with status tags
const fullInventory = {
  premium: [
    { name: "jpegdealer.sol", status: "Listed Now", price: "12 SOL", image: "🖼️", description: "The Meta: Instantly clear NFT resale theme, clean layout, viral meme potential" },
    { name: "fudscience.sol", status: "Listed Now", price: "10 SOL", image: "🧪", description: "The Meta: Satirical alpha reports / mockery of FOMO culture" },
    { name: "jumpsetradio.sol", status: "Listed Now", price: "9 SOL", image: "🎮", description: "The Meta: Gamer x streetwear aesthetic, tons of creative upside" },
    { name: "yapenomics.sol", status: "Vaulted", price: "8 SOL", image: "💬", description: "The Meta: Inside Web3 culture humor — mimics degen Twitter perfectly" },
    { name: "pistola.sol", status: "Vaulted", price: "8 SOL", image: "🔫", description: "The Meta: Spanish word + SNS boost + unique aesthetic" }
  ],
  mid: [
    { name: "copevendor.sol", status: "Listed Now", price: "3.5 SOL", image: "💊", description: "Rebuild it into something with more absurdity and clean flow" },
    { name: "lurkerlife.sol", status: "Listed Now", price: "3 SOL", image: "👁️", description: "Funny but weak build. Add visual humor + better framing" },
    { name: "commandhub.sol", status: "Listed Now", price: "3.5 SOL", image: "🔧", description: "Solid dev tool angle, could go 2+ SOL" },
    { name: "deploydeck.sol", status: "Vaulted", price: "2 SOL", image: "🚀", description: "Solid dev tool angle, could go 2+ SOL" },
    { name: "grindprotocol.sol", status: "Vaulted", price: "2.5 SOL", image: "💪", description: "Over-the-top hustle meme" }
  ],
  memeables: [
    { name: "rigbuilder.sol", status: "Listed Now", price: "1 SOL", image: "⚡", description: "Fastest to sell for SOL rotation" },
    { name: "bidgremlin.sol", status: "Listed Now", price: "0.89 SOL", image: "👹", description: "Fastest to sell for SOL rotation" },
    { name: "exitprotocol.sol", status: "Vaulted", price: "0.99 SOL", image: "🚪", description: "Fallback memescape" },
            { name: "urnotthatguy.sol", status: "Sold", price: "0.3 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises — just vibes" },
    { name: "yournotthatguy.sol", status: "Sold", price: "0.4 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises — just vibes" },
    { name: "inpregneable.sol", status: "Sold", price: "0.5 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises — just vibes" }
  ],
  experimental: [
    { name: "deploydock.sol", status: "Vaulted", price: "TBA", image: "⚓", description: "Experimental deployment platform" },
    { name: "controlcenter.sol", status: "Vaulted", price: "TBA", image: "🎮", description: "Experimental control interface" },
    { name: "kombat.sol", status: "Vaulted", price: "TBA", image: "🥊", description: "Experimental combat system" },
    { name: "gg2ez.sol", status: "Vaulted", price: "TBA", image: "🏆", description: "Experimental gaming platform" },
    { name: "trackalpha.sol", status: "Vaulted", price: "TBA", image: "📊", description: "Experimental alpha tracking" },
    { name: "alphastalker.sol", status: "Vaulted", price: "TBA", image: "🕵️", description: "Experimental alpha detection" },
    { name: "mindflow.sol", status: "Vaulted", price: "TBA", image: "🧠", description: "Experimental mind mapping" },
    { name: "marksmanhub.sol", status: "Vaulted", price: "TBA", image: "🎯", description: "Experimental precision platform" },
    { name: "maidenless.sol", status: "Vaulted", price: "TBA", image: "💔", description: "Experimental relationship platform" },
    { name: "ghostrunner.sol", status: "Vaulted", price: "TBA", image: "👻", description: "Experimental stealth platform" },
    { name: "dojoquest.sol", status: "Vaulted", price: "TBA", image: "🏯", description: "Experimental martial arts platform" }
  ]
};

const getStatusColor = (status) => {
  switch (status) {
    case "Listed Now":
      return "bg-green-600 text-white glow-blue";
    case "Vaulted":
      return "bg-yellow-600 text-black glow-purple";
    case "Sold":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Listed Now":
      return "🟢";
    case "Vaulted":
      return "🔒";
    case "Sold":
      return "🔴";
    default:
      return "⚪";
  }
};

const DomainCard = ({ domain }) => (
  <div className="steel-surface card-hover-glow rounded-lg p-4 sm:p-6 transition-all duration-300 group w-full max-w-sm mx-auto">
    <div className="text-3xl sm:text-4xl text-center mb-4">
      {domain.image}
    </div>
    
    <h3 className="text-base sm:text-lg font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
      <a 
        href={`/domains/${domain.name.replace('.sol', '')}`}
        className="hover:underline"
      >
        {domain.name}
      </a>
    </h3>
    
    <div className="flex justify-center mb-4">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(domain.status)}`}>
        {getStatusIcon(domain.status)} {domain.status}
      </span>
    </div>
    
    <div className="text-center mb-4">
      <span className="text-base sm:text-lg font-bold flicker-solana solana-gradient">
        {domain.price}
      </span>
    </div>
    
    <div className="text-center mb-4">
      <p className="text-xs text-gray-400 leading-relaxed">
        {domain.description}
      </p>
    </div>
  </div>
);

const VaultPage = () => {
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
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
              Full Vault Inventory
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              Complete domain collection. Every node in the Retailverse.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="/domains"
                className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                ← Active Listings
              </a>
            </div>
          </div>
        </section>

        {/* Domain Sections */}
        <div className="px-4 pb-20">
          <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
            
            {/* Premium */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 💎 Premium <span className="text-pink-400">]</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {fullInventory.premium.map((domain, domainIndex) => (
                  <DomainCard key={domainIndex} domain={domain} />
                ))}
              </div>
            </section>

            {/* Mid */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 🧱 Mid <span className="text-pink-400">]</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {fullInventory.mid.map((domain, domainIndex) => (
                  <DomainCard key={domainIndex} domain={domain} />
                ))}
              </div>
            </section>

            {/* Memeables */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 🎭 Memeables <span className="text-pink-400">]</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {fullInventory.memeables.map((domain, domainIndex) => (
                  <DomainCard key={domainIndex} domain={domain} />
                ))}
              </div>
            </section>

            {/* Experimental */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 🧪 Experimental <span className="text-pink-400">]</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {fullInventory.experimental.map((domain, domainIndex) => (
                  <DomainCard key={domainIndex} domain={domain} />
                ))}
              </div>
            </section>
          </div>
        </div>

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
                href="/" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Home
              </a>
              <a 
                href="/domains" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Active Listings
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
};

export default VaultPage; 