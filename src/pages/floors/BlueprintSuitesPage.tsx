import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import FloorBadge from '../../components/FloorBadge';
import PremiumCard from '../../components/PremiumCard';
import blueprintBg from '../../assets/blueprint.png';

// Mock wallet for demo
const MOCK_WALLET = "7vswd...fE9s";

// Premium shops data
const premiumShops = [
  {
    name: 'HoodieRepublic.sol',
    description: 'Exclusive WifHoodie Merch'
  },
  {
    name: 'DesignStudio.sol',
    description: 'Custom Brand Design'
  },
  {
    name: 'DiamondHands.sol',
    description: 'Exclusive Investment Tools'
  }
];

// Perks data
const perks = [
  { title: 'Early Access' },
  { title: 'VIP Support' },
  { title: 'Exclusive Events' },
  { title: 'Alpha Insights' }
];

export default function BlueprintSuitesPage() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${blueprintBg})` }}
    >
      <div className="backdrop-blur-md bg-black/40 min-h-screen p-10">
        <SEOHead 
          target="blueprint-suites.retailstar.sol"
          pageType="floor"
          customTitle="Blueprint Suites - Premium NFT Tier | Retailstar Mall"
          customDescription="Exclusive Blueprint Suites for WifHoodie NFT holders. Clean, strategic, curated premium shops with exclusive perks and benefits."
          customKeywords="blueprint suites, wifhoodie nft, premium tier, exclusive access, curated shops"
        />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
            Blueprint Suites
          </h1>
          <FloorBadge level={2} />
        </div>

        {/* Executive Summary Card */}
        <div className="mb-10 bg-black/30 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur">
          <h2 className="text-2xl font-semibold mb-2">Premium Tier Access</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Welcome to Level 2 of Retailstar Mall — the <strong>Blueprint Suites</strong>.
            This tier is designed for verified WifHoodie holders who want professional,
            brand-ready domains, premium storefront templates, and early access to new tools.
          </p>
        </div>

        {/* Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Premium Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Domain Tester */}
            <Link
              to="/tools"
              className="bg-black/30 border border-white/10 rounded-xl p-5 hover:bg-black/40 transition-all shadow-lg"
            >
              <div className="text-3xl mb-3">🧪</div>
              <h3 className="font-semibold text-lg">Domain Tester</h3>
              <p className="text-white/60 text-sm mt-1">
                Instantly test availability, pricing, and value for any .sol domain.
              </p>
            </Link>

            {/* Archetype Quiz */}
            <Link
              to="/tools"
              className="bg-black/30 border border-white/10 rounded-xl p-5 hover:bg-black/40 transition-all shadow-lg"
            >
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="font-semibold text-lg">Archetype Quiz</h3>
              <p className="text-white/60 text-sm mt-1">
                Discover your project's identity and get tailored domain suggestions.
              </p>
            </Link>

            {/* Meme Generator */}
            <Link
              to="/tools/meme-gen"
              className="bg-black/30 border border-white/10 rounded-xl p-5 hover:bg-black/40 transition-all shadow-lg"
            >
              <div className="text-3xl mb-3">🎰</div>
              <h3 className="font-semibold text-lg">Meme Domain Generator</h3>
              <p className="text-white/60 text-sm mt-1">
                Spin up chaotic .sol names on demand with AI-powered combinations.
              </p>
            </Link>

          </div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Premium Shops */}
          <PremiumCard
            title="Premium Shops"
            icon="🏪"
            description="Exclusive premium storefronts available only to verified WifHoodie holders."
          >
            <ul className="text-sm text-white/70 space-y-2">
              {premiumShops.map((shop) => (
                <li key={shop.name} className="border-b border-white/10 pb-1">
                  <span className="font-semibold text-white/90">{shop.name}</span>
                  <p className="text-xs text-white/50">{shop.description}</p>
                </li>
              ))}
            </ul>
          </PremiumCard>

          {/* Premium Perks */}
          <PremiumCard
            title="Exclusive Perks"
            icon="🎁"
            description="Your membership grants access to high-tier benefits and exclusive features."
          >
            <ul className="text-sm text-white/70 space-y-2">
              {perks.map((perk) => (
                <li key={perk.title} className="flex justify-between">
                  <span>{perk.title}</span>
                  <span className="text-green-300">✔ Active</span>
                </li>
              ))}
            </ul>
          </PremiumCard>

        </div>

        {/* CTA Footer */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/rooftop-lounge"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            ✨ Ascend to Rooftop Lounge
          </Link>
        </div>
        <p className="text-center text-sm text-white/60 mt-2">
          Requires DAO membership for access
        </p>
      </div>
    </div>
  );
}


