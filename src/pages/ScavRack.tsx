import React, { useRef, useState, useEffect } from 'react';
import { scavDomains } from '../data/scavDomains';
import ScavDomainCard from '../components/ScavDomainCard';
import SpinToWin from '../components/SpinToWin';
import { Link } from 'react-router-dom';
// @ts-ignore: PNG import for Vite
import vendingBg from '../assets/rsvendingmachine.png';
// @ts-ignore: PNG import for Vite
import rsLogo from '../assets/rs-logo.png';
import SEOHead from '../components/SEOHead';

// Retail Ticket System
const TICKET_KEY = 'retailstar_tickets';

function getRetailTickets() {
  try {
    const tickets = localStorage.getItem(TICKET_KEY);
    return tickets ? parseInt(tickets) : 0;
  } catch {
    return 0;
  }
}

function ScavRack() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [shuffledDomains, setShuffledDomains] = useState(
    [...scavDomains].sort(() => Math.random() - 0.5)
  );
  const [tickets, setTickets] = useState(getRetailTickets());

  const handleScrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case '💀 Cursed':
        return 'bg-red-700';
      case '🧃 Overstocked':
        return 'bg-green-700';
      case '🎲 RNG':
        return 'bg-yellow-600';
      case '🗑️ Trash Drop':
        return 'bg-zinc-700';
      case '🌈 Undervalued':
        return 'bg-blue-700';
      default:
        return 'bg-pink-700';
    }
  };

  const getTagPosition = (index: number) => {
    const positions = ['top-2', 'top-8', 'top-14', 'top-20'];
    return positions[index] || 'top-2';
  };

  // Update ticket count when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setTickets(getRetailTickets());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="scavrack"
        customTitle="Scav Rack | Retailstar.sol - Low-Barrier Domain Collection"
        customDescription="PNG-only domains with upgrade potential. Start your journey here with affordable .sol domains."
        customKeywords="scav rack, affordable domains, png domains, upgradeable domains, retailstar"
        imageUrl="https://retailstar.sol/src/assets/rsvendingmachine.png"
        canonicalUrl="https://retailstar.sol/scavrack"
        ogImage="https://retailstar.sol/src/assets/rsvendingmachine.png"
        twitterImage="https://retailstar.sol/src/assets/rsvendingmachine.png"
      />

      {/* SNS Profile Banner */}
      <div className="relative z-20 bg-gradient-to-b from-blue-900/90 to-blue-800/80 border-b border-blue-600/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            {/* RS Logo */}
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center relative overflow-hidden">
              <img 
                src={rsLogo} 
                alt="Retailstar Logo" 
                className="w-16 h-16 object-cover rounded-full"
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">retailstar.sol</h1>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <span className="font-mono">E3cwMaukbBs9PDxwziqL9DWXVLbF35y9y5x3hE21EebU</span>
                <button className="text-gray-400 hover:text-white transition-colors">
                  📋
                </button>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🌐</span>
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm">𝕏</span>
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💬</span>
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📧</span>
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📱</span>
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🐙</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="mt-6 border-b border-blue-600/30">
            <div className="flex space-x-8">
              <div className="pb-2 border-b-2 border-green-500 text-white font-medium">
                Domains
              </div>
              <div className="pb-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                Activity
              </div>
              <div className="pb-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                Settings
              </div>
            </div>
          </div>
          
          {/* Domain Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select className="bg-blue-800/50 border border-blue-600/30 rounded px-3 py-1 text-white text-sm">
                <option>All (182)</option>
              </select>
              <select className="bg-blue-800/50 border border-blue-600/30 rounded px-3 py-1 text-white text-sm">
                <option>Sorted by: Domain (A-Z)</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-blue-800/50 border border-blue-600/30 rounded px-3 py-1 text-white text-sm pl-8"
                />
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              </div>
              <div className="flex border border-blue-600/30 rounded overflow-hidden">
                <button className="bg-green-600 px-3 py-1 text-white text-sm">📋</button>
                <button className="bg-blue-800/50 px-3 py-1 text-gray-400 text-sm">⊞</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={vendingBg} 
          alt="Scav Rack Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <section className="py-20 px-4 text-center bg-black/60 relative z-10">
          {/* Ticket Counter */}
          <div className="absolute top-4 right-4 bg-slate-800 px-4 py-2 rounded-full text-sm border border-cyan-500/30">
            🎫 {tickets} Retail Tickets
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-4 neon-green drop-shadow-neon">
            Scav Rack
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-2 max-w-2xl mx-auto">
            Low-barrier .sol domains with PNG-only artwork. Upgrade anytime to a full site build.
          </p>
          <p className="text-sm italic text-zinc-400 mb-8">
            You probably won&apos;t make it… but if you do, it started here.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/upgrade"
              className="neon-green neon-green-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
            >
              🟢 Upgrade to Full Build
            </Link>
            <Link
              to="/vault"
              className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
            >
              🔧 View Premium Catalog
            </Link>
          </div>
          
          <button
            onClick={() => setShuffledDomains(prev => [...prev].sort(() => Math.random() - 0.5))}
            className="bg-zinc-800 text-sm px-5 py-2 rounded shadow hover:bg-zinc-700 text-white"
          >
            🔀 Shuffle Rack
          </button>
        </section>

        {/* SNS Instructions */}
        <section className="py-8 px-4 bg-zinc-900/50 border-y border-zinc-700">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-3">🛍️ How to Purchase</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">📋 Instructions:</h4>
                  <ol className="space-y-1">
                    <li>1. Click any "Buy Now" button</li>
                    <li>2. You'll be redirected to SNS</li>
                    <li>3. Use the search bar to find your domain</li>
                    <li>4. Look for domains with the <strong className="text-white">RS icon</strong></li>
                    <li>5. Domains with matching icons are for sale</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">💡 Pro Tips:</h4>
                  <ul className="space-y-1">
                    <li>• Scav Rack domains are often the best deals</li>
                    <li>• Check for domains with Retailstar profile icons</li>
                    <li>• These are managed by our team</li>
                    <li>• Upgrade to full builds anytime</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PNG Domain Grid */}
        <section ref={gridRef} className="py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {shuffledDomains.map((domain, idx) => (
              <div
                key={domain.name + idx}
                className="border border-pink-600 transition-all duration-300 rounded-md relative overflow-hidden group hover:rotate-1 hover:scale-105"
              >
                {domain.tags?.map((tag, i) => (
                  <span
                    key={tag + i}
                    className={`absolute ${getTagPosition(i)} left-2 text-xs px-2 py-1 rounded text-white shadow ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
                <div className="transition-transform duration-300 group-hover:scale-105">
                  <ScavDomainCard domain={domain} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SPIN 2 WIN Component */}
        <SpinToWin />

        {/* CSS for animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes flicker {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.9; }
            }
          `
        }} />
      </div>
    </div>
  );
}

export default ScavRack; 