import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const tiers = [
  {
    id: 'vaulted-premium',
    title: '💎 Vaulted Premium',
    price: '3+ SOL',
    description:
      'The full Retailstar experience. Complete site builds with lore, animations, and premium placement. For serious collectors.',
    perks: [
      'Full site included',
      'Lore + animation support',
      'High-end domain showcase',
      'Eligible for premium rotation',
    ],
  },
  {
    id: 'blueprint-tier',
    title: '🔵 Blueprint Tier',
    price: '0.5–0.75 SOL',
    description:
      'Domain ownership with upgrade path. Delivered with a basic "coming soon" shell or raw. You\'re the architect.',
    perks: [
      'Domain included',
      'Listed in "Pending Activation" section',
      'Upgradeable to Vaulted Premium',
      'Eligible for future promos',
    ],
  },
  {
    id: 'quick-snag',
    title: '🟢 Quick Snag',
    price: '0.1 SOL',
    description:
      'Pure digital chaos. Raw domain transfers. No lore, no build, no support. For scavengers and degens only.',
    perks: [
      'Immediate transfer',
      'No frills, just vibes',
      'May trigger bonus loot',
      'Scav Rack placement',
    ],
  },
];

export default function TiersPage() {
  return (
    <>
      <SEOHead
        target="retailstar.sol"
        pageType="tiers"
        customTitle="Retailstar Domain Tiers | Build Tiers & Pricing Guide"
        customDescription="Explore Retailstar's tier system - from Quick Snag loot to Vaulted Premium builds. Understand pricing, features, and upgrade paths for your .sol domain."
        customKeywords="Retailstar tiers, domain pricing, vaulted premium, blueprint tier, quick snag, solana domains"
        imageUrl="https://retailstar.xyz/assets/rs-og-card.png"
        canonicalUrl="https://retailstar.sol/tiers"
        ogImage="https://retailstar.xyz/assets/rs-og-card.png"
        twitterImage="https://retailstar.xyz/assets/rs-og-card.png"
      />

      <main className="min-h-screen bg-zinc-950 text-white px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">💼 Retailstar Domain Tiers</h1>
          <p className="text-sm text-zinc-400 mb-8">
            Every domain has a tier. Choose your entry point into the Retailstar universe.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-xl border border-zinc-700 p-5 bg-zinc-900 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-1">{tier.title}</h2>
                <p className="text-xs text-zinc-400 mb-2">{tier.price}</p>
                <p className="text-sm mb-3">{tier.description}</p>
                <ul className="list-disc pl-5 text-sm text-zinc-300">
                  {tier.perks.map((perk, idx) => (
                    <li key={idx}>{perk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 text-sm text-center text-zinc-500">
            Want to upgrade a domain?{' '}
            <Link to="/contact" className="underline text-white">
              Contact Retailstar support
            </Link>{' '}
            or talk to <code>Retailrunner</code>.
          </div>
        </div>
      </main>
    </>
  );
} 