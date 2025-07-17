import React, { useEffect, useState } from "react";
import DomainCard from "../components/marketplace/DomainCard";
import VaultedList from "../components/marketplace/VaultedList";
import { domains as allDomains } from '../data/domains';
import bgImage from "../assets/chowdown.png";
import chevronUp from "../assets/chevron.png";
import SEOHead from '../components/SEOHead';

function getDailyRotation() {
  const now = new Date();
  const filtered = allDomains.filter(
    (d) => d.escrow === true && d.listed === true && d.vaulted === false
  );
  return filtered
    .sort(() => 0.5 - Math.random())
    .slice(0, 6)
    .map((d) => ({
      ...d,
      rotationGroup: "daily",
      rotationExpires: new Date(now.getTime() + 86400000).toISOString(),
    }));
}

export default function MarketplacePage() {
  const [domains, setDomains] = useState([]);
  const [fadingOut, setFadingOut] = useState([]);
  const [vaulted, setVaulted] = useState([]);
  const [showVaulted, setShowVaulted] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setDomains(getDailyRotation());
      setLoading(false);
    }, 500);
  }, []);

  const handleExpire = (idxToRemove) => {
    setFadingOut((prev) => [...prev, idxToRemove]);
    setTimeout(() => {
      setDomains((prev) => {
        const removed = prev[idxToRemove];
        setVaulted((v) => [...v, { ...removed, vaulted: true }]);
        return prev.filter((_, i) => i !== idxToRemove);
      });
      setFadingOut((prev) => prev.filter((i) => i !== idxToRemove));
    }, 700);
  };

  const handlePurchase = (domainName) => {
    alert(`Successfully purchased ${domainName}`);
    setVaulted((prev) => prev.filter((d) => d.name !== domainName));
  };

  const handleView = (domainName) => {
    alert(`Viewing ${domainName}`); // Replace with modal or navigation
  };

  // List of slugs for the 6 featured domains
  const featuredSlugs = [
    'jpegdealer',
    'fudscience',
    'lurkerlife',
    'commandhub',
    'deploydeck',
    'bidgremlin',
    'copevendor',
    'rigbuilder',
    'jumpsetradio',
  ];

  // Dynamically import all PNGs from assets
  const images = import.meta.glob('../assets/*.png', { eager: true, import: 'default' });

  // Add blinking animation for chevrons
  const chevronBlink = {
    animation: 'chevron-blink 1.2s infinite',
  };
  // Add keyframes to the page (if not in global CSS)
  const style = `@keyframes chevron-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }`;

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="marketplace"
        customTitle="Marketplace | Retailstar.sol - Buy Solana Domains & NFT Builds"
        customDescription="Browse and buy Solana domains, NFT builds, and premium .sol names. Secure your spot in the Retailverse."
        customKeywords="marketplace, buy .sol, Solana domains, NFT builds, SNS escrow"
      />
      {/* LLM summary for MarketplacePage */}
      {/*
      <meta name="llm-summary" content="This is the main marketplace for buying and selling Solana domains, NFT builds, and premium .sol names in the Retailverse." />
      */}
      {/* Premium background image */}
      <img
        src={bgImage}
        alt="Retailstar Marketplace Background"
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-80 z-0"
        style={{ filter: "brightness(0.7)" }}
        aria-hidden="true"
      />
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-black/60 z-0" aria-hidden="true"></div>
      {/* Dynamic message for final conversion */}
      <div className="flex justify-center mb-8">
        <div className="neon-orange neon-orange-hover py-3 px-8 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all duration-200 text-center animate-pulse">
          🛒 This is where deals close.
        </div>
      </div>
      {/* Top 6 Domains with Websites */}
      <div className="relative z-10 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Featured Domains with Live Sites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredSlugs.map((slug) => {
            const d = allDomains.find(dom => dom.slug === slug);
            if (!d) return null;
            return (
              <div key={d.slug} className="bg-zinc-900 rounded-2xl p-6 flex flex-col items-center shadow-lg">
                {d.image && d.image.endsWith('.png') && images[`../assets/${d.image}`] ? (
                  <img
                    src={images[`../assets/${d.image}`]}
                    alt={d.name}
                    className="w-24 h-24 object-contain rounded-xl mb-3 bg-zinc-800 border border-zinc-700"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center rounded-xl mb-3 bg-zinc-800 border border-zinc-700 text-4xl">
                    {d.image && !d.image.endsWith('.png') ? d.image : '💎'}
                  </div>
                )}
                <div className="font-bold text-lg text-white mb-1 text-center">{d.name}.sol</div>
                <div className="text-sm text-gray-300 mb-2">{d.price}</div>
                <div className="flex gap-2 mt-2">
                  <a
                    href={d.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-cyan neon-cyan-hover py-2 px-4 rounded font-semibold text-sm"
                  >
                    Visit Site
                  </a>
                  {/* Buy button: same effects as Visit Site, but green */}
                  <a
                    href="https://twitter.com/messages/compose?recipient_id=retailstarsol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neon-green neon-green-hover py-2 px-4 rounded font-semibold text-sm transition-all duration-200 shadow-lg animate-pulse focus:outline-none focus:ring-2 focus:ring-green-400/50 hover:bg-green-600 hover:text-white"
                  >
                    Buy
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Main content (z-10) */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-4">Retailstar Marketplace</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-48 bg-zinc-800 rounded-2xl animate-pulse border border-zinc-700"
                ></div>
              ))
            : domains.map((domain, idx) => (
                <DomainCard
                  key={domain.name + idx}
                  domain={domain}
                  faded={fadingOut.includes(idx)}
                  isVaulted={false}
                  onExpire={() => handleExpire(idx)}
                  onPurchase={handlePurchase}
                  onView={handleView}
                />
              ))}
        </div>
        <VaultedList
          vaulted={vaulted}
          showVaulted={showVaulted}
          toggleShowVaulted={() => setShowVaulted((prev) => !prev)}
          onPurchase={handlePurchase}
        />
      </div>
      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 flex items-center justify-center gap-6">
            <img src={chevronUp} alt="Chevron Left" className="w-10 h-10" style={{ ...chevronBlink, transform: 'rotate(-90deg)' }} />
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed glow-blue">
              RetailStar is a broadcast from Solana's underlayer — every domain is a node waiting to go live.
            </p>
            <img src={chevronUp} alt="Chevron Right" className="w-10 h-10" style={{ ...chevronBlink, transform: 'rotate(90deg)' }} />
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
            <a 
              href="/marketplace" 
              className="solana-gradient flicker-solana hover:glow-blue transition-colors"
            >
              Marketplace
            </a>
            <a 
              href="/" 
              className="solana-gradient flicker-solana hover:glow-blue transition-colors"
            >
              Home
            </a>
          </div>
          <div className="text-xs text-gray-500">
            <p>© 2025 retailstar.sol - Nodes in the Retailverse</p>
          </div>
        </div>
      </footer>
      <style>{style}</style>
    </div>
  );
} 