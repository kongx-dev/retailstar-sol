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
  const gridRef = useRef<HTMLDivElement>(null);
  const [shuffledDomains, setShuffledDomains] = useState(
    [...scavDomains].sort(() => Math.random() - 0.5)
  );
  const [tickets, setTickets] = useState(getRetailTickets());
  const [slotMachineOpen, setSlotMachineOpen] = useState(false);

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
    </div>
  );
}

export default ScavRack; 