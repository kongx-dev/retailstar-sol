import React, { useRef } from 'react';
import { scavDomains } from '../data/scavDomains';
import ScavDomainCard from '../components/ScavDomainCard';
import { Link } from 'react-router-dom';
// @ts-ignore: PNG import for Vite
import vendingBg from '../assets/rsvendingmachine.png';
import SEOHead from '../components/SEOHead';

function ScavRack() {
  const gridRef = useRef(null);

  const handleScrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="scavrack"
        customTitle="Scav Rack | Retailstar.sol - Meme Tier Domains & PNG Drops"
        customDescription="Discover low-effort, high-vibe .sol domains with upgraded PNGs. Ideal for profile flex or future upgrades."
        customKeywords="meme domains, scav rack, .sol NFTs, profile PNG, SNS upgrade"
      />
      {/* LLM summary for ScavRack */}
      {/*
      <meta name="llm-summary" content="The Scav Rack contains meme-worthy .sol domains with only PNG visuals. Users can collect, flex, or upgrade to full builds.">
      */}
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
        <h1 className="text-4xl md:text-6xl font-black mb-4 neon-green drop-shadow-neon">Scav Rack</h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Low-barrier .sol domains with PNG-only artwork. Upgrade anytime to a full site build.
        </p>
        {/* CTA Buttons for funnel navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/catalog"
            className="neon-green neon-green-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
          >
            🟢 Upgrade to Full Build
          </Link>
          <Link
            to="/catalog"
            className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
          >
            🔧 View Premium Catalog
          </Link>
        </div>
      </section>
      {/* PNG Domain Grid */}
      <section ref={gridRef} className="flex-1 px-4 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {scavDomains.map((domain, idx) => (
            <div key={domain.name + idx}>
              <ScavDomainCard domain={domain} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ScavRack; 