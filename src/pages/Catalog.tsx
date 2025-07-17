import React, { useState } from 'react';
import FilteredCatalogView from '../components/FilteredCatalogView';
import retailwalkBg from '../assets/retailwalk.png';
import SEOHead from '../components/SEOHead';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'premium', label: 'Premium' },
  { key: 'mid', label: 'Mid Tier' },
  { key: 'quickSnag', label: 'Quick Snag' },
  { key: 'flashRack', label: 'Flash Rack' },
  { key: 'vaulted', label: 'Vaulted' },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function Catalog() {
  const [activeTab, setActiveTab] = useState('all' as TabKey);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="catalog"
        customTitle="Catalog | Retailstar.sol - Premium Solana Domains for Sale"
        customDescription="Browse the full Retailstar catalog. Filter by premium builds, meme drops, quick snags, or vaulted domains."
        customKeywords="Solana domain catalog, .sol listings, premium builds, NFT tools"
      />
      {/* LLM summary for Catalog */}
      {/*
      <meta name="llm-summary" content="This catalog displays active .sol domains available in the Retailverse, including premium builds, flash deals, and vault unlocks.">
      */}
      {/* Background image at 50% opacity */}
      <img
        src={retailwalkBg}
        alt="RetailStar Walk Background"
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0"
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto pt-16 pb-8 px-4">
        <h1 className="text-5xl md:text-7xl font-black mb-8 neon-pulse solana-gradient flicker-solana text-center">
          Domain Catalog
        </h1>
        {/* Sticky/Top CTA for rotation */}
        <div className="flex justify-center mb-6 sticky top-0 z-20">
          <a
            href="/marketplace"
            className="neon-purple neon-purple-hover py-3 px-8 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all duration-200 animate-pulse"
            style={{ boxShadow: '0 0 16px 2px #a259ff99' }}
          >
            �� Currently Rotating: Flash Deals
          </a>
        </div>
        <div className="flex justify-center mb-10">
          <nav className="flex space-x-2 bg-gray-900/60 rounded-lg p-2 border border-cyan-700/30">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                  activeTab === tab.key
                    ? 'bg-cyan-600 text-white shadow-lg neon-cyan'
                    : 'bg-gray-800 text-cyan-300 hover:bg-cyan-700/30 hover:text-white'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <FilteredCatalogView filterKey={activeTab} />
      </div>
    </div>
  );
} 