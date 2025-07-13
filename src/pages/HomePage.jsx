import React from 'react';
import { Link } from 'react-router-dom';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';

const HomePage = () => {
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
              Access Point
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              Welcome to Retailstar. Mallcore begins here.
            </p>
            
            {/* Subtext */}
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Not everything's for sale. But if you know what to ask for… you might find it.
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <Link 
                to="/acquisition-levels"
                className="neon-cyan neon-cyan-hover py-4 px-8 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center mx-auto text-lg"
              >
                🪙 Curious what it costs to play?
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Domains Section */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center solana-gradient flicker-solana mb-8">
              <span className="text-pink-400">[</span> Featured Nodes <span className="text-pink-400">]</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="steel-surface card-hover-glow rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🖼️</div>
                <h3 className="text-xl font-bold solana-gradient mb-2">jpegdealer.sol</h3>
                <p className="text-gray-400 mb-4">The Meta: Instantly clear NFT resale theme</p>
                <span className="text-cyan-400 font-semibold">12 SOL</span>
              </div>
              
              <div className="steel-surface card-hover-glow rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🧪</div>
                <h3 className="text-xl font-bold solana-gradient mb-2">fudscience.sol</h3>
                <p className="text-gray-400 mb-4">Satirical alpha reports / mockery of FOMO culture</p>
                <span className="text-cyan-400 font-semibold">10 SOL</span>
              </div>
              
              <div className="steel-surface card-hover-glow rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-bold solana-gradient mb-2">jumpsetradio.sol</h3>
                <p className="text-gray-400 mb-4">Gamer x streetwear aesthetic, tons of creative upside</p>
                <span className="text-cyan-400 font-semibold">5.5 SOL</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lore Tease Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="steel-surface rounded-lg p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold mb-6 solana-gradient text-center">
                <span className="text-pink-400">[</span> The Retailverse <span className="text-pink-400">]</span>
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-4">
                  In the neon-lit corridors of Solana's underlayer, RetailStar.sol stands as the premier domain marketplace. 
                  Every .sol domain is a node in our network — a gateway to the Retailverse.
                </p>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  We're not your typical domain registrar. This is where the mall rats, the fixers, and the digital nomads 
                  converge. Each domain comes with lore, utility, and the potential to become something legendary.
                </p>
                
                <p className="text-gray-300 leading-relaxed">
                  The Retailverse is expanding. New nodes are being deployed daily. 
                  <span className="text-cyan-400 font-semibold"> Are you ready to claim your piece of it?</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="steel-surface rounded-lg p-8 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-6 solana-gradient text-center">
                <span className="text-pink-400">[</span> Stay Connected <span className="text-pink-400">]</span>
              </h2>
              
              <p className="text-gray-300 text-center mb-6">
                Get updates on new domains, lore drops, and exclusive access to the Retailverse.
              </p>
              
              <div className="flex justify-center">
                <a 
                  href="https://twitter.com/retailstarsol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  📰 Follow @retailstarsol
                </a>
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

export default HomePage; 