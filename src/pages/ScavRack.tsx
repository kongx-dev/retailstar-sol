import React, { useRef, useState, useEffect } from 'react';
import { scavDomains } from '../data/scavDomains';
import ScavDomainCard from '../components/ScavDomainCard';
import { Link } from 'react-router-dom';
// @ts-ignore: PNG import for Vite
import vendingBg from '../assets/rsvendingmachine.png';
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
  const gridRef = useRef(null);
  const [shuffledDomains, setShuffledDomains] = useState(
    [...scavDomains].sort(() => Math.random() - 0.5)
  );
  const [tickets, setTickets] = useState(getRetailTickets());
  const [slotMachineOpen, setSlotMachineOpen] = useState(false);

  const handleScrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTagColor = (tag) => {
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

  const getTagPosition = (index) => {
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
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="scavrack"
        customTitle="Scav Rack | Retailstar.sol - Meme Tier Domains & PNG Drops"
        customDescription="Discover low-effort, high-vibe .sol domains with upgraded PNGs. Ideal for profile flex or future upgrades."
        customKeywords="meme domains, scav rack, .sol NFTs, profile PNG, SNS upgrade"
        imageUrl="https://retailstar.xyz/assets/rs-og-card.png"
        canonicalUrl="https://retailstar.xyz/domains"
        ogImage="https://retailstar.xyz/assets/rs-og-card.png"
        twitterImage="https://retailstar.xyz/assets/rs-og-card.png"
      />
      
      {/* Background image */}
      <img
        src={vendingBg}
        alt="Scav Rack Background"
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-60 z-0"
        style={{ filter: 'brightness(0.5) blur(2px)' }}
        aria-hidden="true"
      />

      {/* Hero Section */}
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

      {/* PNG Domain Grid */}
      <section ref={gridRef} className="flex-1 px-4 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {shuffledDomains.map((domain, idx) => (
            <div
              key={domain.name + idx}
              className={`border border-pink-600 transition-all duration-300 rounded-md relative overflow-hidden group ${
                slotMachineOpen 
                  ? 'pointer-events-none opacity-50' 
                  : 'hover:rotate-1 hover:scale-105'
              }`}
            >
              {domain.tags?.map((tag, i) => (
                <span
                  key={tag + i}
                  className={`absolute ${getTagPosition(i)} left-2 text-xs px-2 py-1 rounded text-white shadow ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
              <div className={`transition-transform duration-300 ${
                slotMachineOpen ? '' : 'group-hover:scale-105'
              }`}>
                <ScavDomainCard 
                  domain={domain} 
                  onSlotMachineToggle={setSlotMachineOpen}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

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
  );
}

export default ScavRack; 