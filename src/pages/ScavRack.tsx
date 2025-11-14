import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useScavDomains } from '../hooks/useDomains';
import ScavDomainCard from '../components/ScavDomainCard';
import FilterControls from '../components/FilterControls';
import { Link } from 'react-router-dom';
// @ts-ignore: PNG import for Vite
import vendingBg from '../assets/rsvendingmachine.png';
import SEOHead from '../components/SEOHead';
import DomainLoadingSkeleton from '../components/DomainLoadingSkeleton';
import ScavRackErrorFallback from '../components/DomainErrorFallback';
import SoftSignInBanner from '../components/SoftSignInBanner';
// Import domain images
import lowballkingImg from '../assets/lowballking.png';
import missedpricedafImg from '../assets/missedpricedaf.png';
import copthisbroImg from '../assets/copthisbro.png';
import thisaintitImg from '../assets/thisaintit.png';
import urnotthatguyImg from '../assets/urnotthatguy.png';

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

// Static Scav Rack domains
const staticScavDomains = [
  {
    name: 'lowballking',
    slug: 'lowballking',
    pngUrl: lowballkingImg,
    buyLink: '/checkout/lowballking',
    listed: true,
    tier: 'quick-snag',
  },
  {
    name: 'missedpricedaf',
    slug: 'missedpricedaf',
    pngUrl: missedpricedafImg,
    buyLink: '/checkout/missedpricedaf',
    listed: true,
    tier: 'quick-snag',
  },
  {
    name: 'copthisbro',
    slug: 'copthisbro',
    pngUrl: copthisbroImg,
    buyLink: '/checkout/copthisbro',
    listed: true,
    tier: 'quick-snag',
  },
  {
    name: 'thisaintit',
    slug: 'thisaintit',
    pngUrl: thisaintitImg,
    buyLink: '/checkout/thisaintit',
    listed: true,
    tier: 'quick-snag',
  },
  {
    name: 'urnotthatguy',
    slug: 'urnotthatguy',
    pngUrl: urnotthatguyImg,
    buyLink: '/checkout/urnotthatguy',
    listed: true,
    tier: 'quick-snag',
  },
];

function ScavRack() {
  const gridRef = useRef(null);
  const [filters, setFilters] = useState({ 
    has_pfp: false, 
    listed: true, 
    vaulted: false,
    featured: false,
    has_build: false
  });
  const { domains: scavDomains, loading, error, refetch } = useScavDomains(filters);
  const [shuffledDomains, setShuffledDomains] = useState([...staticScavDomains].sort(() => Math.random() - 0.5));
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

  // Update shuffled domains when scavDomains change
  useEffect(() => {
    const filtered = scavDomains.filter(domain => 
      domain.name?.toLowerCase() !== 'retailstar' && 
      domain.name?.toLowerCase() !== 'retailstar.sol'
    );
    // Merge static domains with dynamic domains
    const allDomains = [...staticScavDomains, ...filtered];
    setShuffledDomains([...allDomains].sort(() => Math.random() - 0.5));
  }, [scavDomains]);

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
      <Helmet>
        <title>Explore Solana Domains • Retailstar Mall</title>
        <meta
          name="description"
          content="Discover curated .sol domains for builders and degens inside the cyberpunk Retailstar Mall."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://retailstar.xyz/domains" />
      </Helmet>
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
      
      {/* Soft Sign-in Banner */}
      <div className="relative z-10 px-4 pt-4">
        <SoftSignInBanner 
          title="Connect to earn Retail Tickets"
          message="Sign in to earn RT rewards when you purchase domains and participate in mall activities"
          ctaText="Connect Wallet"
        />
      </div>
      
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
        
        <section className="static-seo-content px-4 max-w-4xl mx-auto mb-6">
          <p>
            The Scav Rack page displays Retailstar Mall's collection of Solana domains available for purchase. This page serves as the main domain marketplace where users can browse and filter through various .sol domain listings. The page organizes domains by different attributes including listing status, featured properties, and build completion. Users can explore domains that range from basic PNG artwork to fully developed Web3 storefronts.
              </p>
              <p>
                The Scav Rack represents the entry point for acquiring Solana domains within the Retailverse ecosystem. Visitors can filter domains based on specific criteria such as profile picture availability, vault status, and featured designations. The page provides tools for discovering domains that match different use cases, whether for meme projects, developer tools, or brand identities. This marketplace connects buyers with curated Solana domains that fit various needs in the Web3 space.
              </p>
            </section>
        
        <p className="text-lg md:text-2xl text-gray-300 mb-2 max-w-2xl mx-auto">
          Low-barrier .sol domains with PNG-only artwork. Upgrade anytime to a full site build.
        </p>
        <p className="text-sm italic text-zinc-400 mb-8">
          You probably won&apos;t make it… but if you do, it started here.
        </p>
        
        <section className="prose prose-invert mb-10 px-4 max-w-4xl mx-auto">
          <p>
            The Scav Rack represents Retailstar Mall's curated collection of Solana domains, each handpicked to serve builders and degens across the Web3 landscape. These .sol domains aren't just digital assets—they're entry points into the cyberpunk marketplace that defines the Retailverse. Builders use them to establish their presence in the Solana ecosystem, while degens discover hidden gems that reflect the chaotic energy of the crypto space.
          </p>
          <p>
            Retailstar Mall curates these domains because we understand that every .sol domain tells a story. Whether you're launching a meme project, building developer tools, or creating a brand identity, the right domain becomes your storefront in the Web3 world. Our marketplace bridges the gap between the underground energy of Solana's underlayer and the polished storefronts that define successful Web3 projects. Each domain here has been selected for its potential to become something greater in the Solana ecosystem.
          </p>
        </section>
        
        {/* Filter Controls */}
        <FilterControls 
          filters={filters} 
          setFilters={setFilters}
          availableFilters={['has_pfp', 'listed', 'vaulted', 'featured', 'has_build']}
        />
        
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
        {loading ? (
          <DomainLoadingSkeleton count={8} />
        ) : error ? (
          <ScavRackErrorFallback error={error} onRetry={refetch} />
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {shuffledDomains.filter(domain => domain.name?.toLowerCase() !== 'retailstar' && domain.name?.toLowerCase() !== 'retailstar.sol').map((domain, idx) => (
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
        )}
      </section>

      {/* See Also Section */}
      <section className="mt-16 border-t pt-8 text-sm opacity-80 px-4">
        <h3 className="font-medium mb-3">Explore More</h3>
        <ul className="space-y-1">
          <li><a href="/directory" className="text-sky-400 hover:underline">Directory</a></li>
          <li><a href="/lore" className="text-sky-400 hover:underline">Lore</a></li>
          <li><a href="/retail-tickets" className="text-sky-400 hover:underline">Retail Tickets</a></li>
        </ul>
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