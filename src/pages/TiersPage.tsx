import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const tiers = [
  {
    id: 'mythic',
    title: '🧿 Mythic',
    price: '15+ SOL',
    tagline: 'The apex tier.',
    description:
      'For clients who want full systems, dashboards, marketplace components, or portal-style environments.',
    includes: [
      'Full custom build',
      'Cyberpunk world-building (lore, visuals, animations)',
      'Token-gated areas (if needed)',
      'Logic-heavy components: dashboards, marketplace flows, databases',
      'Final optimization across UI/UX, load performance, and polish',
      'Dev Cycle Planning included',
    ],
    milestones: [
      {
        title: 'Milestone 1 — Foundation',
        items: [
          'Homepage',
          'About page',
          'Services page',
          'Contact page',
          'Brand shell + theming',
        ],
      },
      {
        title: 'Milestone 2 — Expansion Modules',
        items: [
          'Blog / News feed',
          'Static collections',
          'Feature cards',
          'CTA pathways',
        ],
      },
      {
        title: 'Milestone 3 — Complex Logic',
        items: [
          'Dashboards',
          'Marketplace components',
          'Token-gated sections',
          'API integrations',
          'Dynamic data logic & state machines',
        ],
      },
      {
        title: 'Milestone 4 — Polish & Animation',
        items: [
          'Scroll animations',
          'Micro-interactions',
          'Lore-based enhancements',
          'Performance optimization',
        ],
      },
    ],
  },
  {
    id: 'premium',
    title: '💎 Premium',
    price: '9+ SOL',
    tagline: 'This isn\'t a site — it\'s a world.',
    description: '',
    includes: [
      '2–3 full custom pages',
      'Scroll-based animations',
      'Lore-driven layout and copy',
      'Optional: token-gating, analytics widgets',
      'High placement in Retailstar rotation',
      'Dev Cycle Planning (Lite)',
    ],
    milestones: [
      {
        title: 'Foundation Pages',
        items: ['Home / About / Services / Contact'],
      },
      {
        title: 'Animated Scenes + Lore Sections',
        items: [],
      },
      {
        title: 'Optional Feature Blocks',
        items: [],
      },
    ],
  },
  {
    id: 'mid-grade',
    title: '🧱 Mid-Grade',
    price: '3–5 SOL',
    tagline: 'Not basic. Not maxed. Just right.',
    description: '',
    includes: [
      'Up to 2 pages',
      'Styled layout + light animations',
      'Custom CTAs',
      'Optional: collection previews, embeds, 1–2 live stat modules',
      'Displayed in mid-tier mall showcase',
    ],
    milestones: [
      {
        title: 'Home Page',
        items: [],
      },
      {
        title: 'Secondary Page',
        items: [],
      },
    ],
  },
  {
    id: 'quick-snag',
    title: '⭐ Quick Snag',
    price: '0.5–1.5 SOL',
    tagline: 'Snag it. Ship it. Stun \'em.',
    description: '',
    includes: [
      '1-page starter site',
      'Custom hero/banner',
      'Snappy microcopy',
      'Social/mint/CTA links',
      '48–72 hour turnaround',
      'Scav Rack placement',
    ],
    milestones: [
      {
        title: 'Single Page Build',
        items: [],
      },
    ],
  },
  {
    id: 'blueprint-tier',
    title: '🔵 Blueprint Tier',
    price: '0.5–0.75 SOL',
    tagline: 'You\'re the architect.',
    description: '',
    includes: [
      'Domain + transfer',
      'Optional "Coming Soon" shell',
      'Listed in Pending Activation',
      'Upgradable to any higher tier',
    ],
    milestones: [
      {
        title: 'Domain Delivery',
        items: [],
      },
      {
        title: 'Optional Shell',
        items: [],
      },
    ],
  },
  {
    id: 'raw-scav-rack',
    title: '🟢 Raw / Scav Rack',
    price: '0.1 SOL',
    tagline: 'Pure digital chaos.',
    description: '',
    includes: [
      'Raw domain transfer',
      'No lore, no build, no support',
      'Surprise loot chance',
      'Scav Rack placement',
    ],
    milestones: [
      {
        title: 'Instant Transfer',
        items: [],
      },
    ],
  },
];

const retainerAddOn = {
  title: '🔧 Retainer Add-On',
  price: '0.5–1 SOL/mo',
  tagline: 'Treat your domain like a storefront, not a graveyard.',
  description: '',
  includes: [
    'Monthly content updates',
    'UI tweaks & seasonal refreshes',
    'Feature/module swaps',
    'Optional lore additions',
  ],
  worksWith: ['Quick Snag', 'Mid-Grade', 'Premium', 'Mythic'],
};

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
          <h1 className="text-3xl font-bold mb-2">💼 Retailstar Domain Tier List (2025)</h1>
          <p className="text-sm text-zinc-400 mb-8">
            Every domain has a tier. Your tier determines how far we take the build — from raw degeneracy to full lore-infused worlds.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-xl border border-zinc-700 p-5 bg-zinc-900 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-1">{tier.title}</h2>
                <p className="text-xs text-zinc-400 mb-2">{tier.price}</p>
                {tier.tagline && (
                  <p className="text-sm font-medium mb-2 text-zinc-200">{tier.tagline}</p>
                )}
                {tier.description && (
                  <p className="text-sm mb-3">{tier.description}</p>
                )}
                {tier.includes && tier.includes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-zinc-300 mb-2">Includes:</p>
                    <ul className="list-disc pl-5 text-sm text-zinc-300 space-y-1">
                      {tier.includes.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tier.milestones && tier.milestones.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-zinc-700">
                    <p className="text-xs font-semibold text-zinc-300 mb-3">Dev Cycle Milestones</p>
                    <div className="space-y-3">
                      {tier.milestones.map((milestone, idx) => (
                        <div key={idx}>
                          <p className="text-xs font-medium text-zinc-200 mb-1">{milestone.title}</p>
                          {milestone.items && milestone.items.length > 0 && (
                            <ul className="list-disc pl-5 text-xs text-zinc-400 space-y-0.5">
                              {milestone.items.map((item, itemIdx) => (
                                <li key={itemIdx}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-zinc-700 p-5 bg-zinc-900">
            <h2 className="text-xl font-semibold mb-1">{retainerAddOn.title}</h2>
            <p className="text-xs text-zinc-400 mb-2">{retainerAddOn.price}</p>
            {retainerAddOn.tagline && (
              <p className="text-sm font-medium mb-2 text-zinc-200">{retainerAddOn.tagline}</p>
            )}
            {retainerAddOn.includes && retainerAddOn.includes.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-zinc-300 mb-2">Includes:</p>
                <ul className="list-disc pl-5 text-sm text-zinc-300 space-y-1">
                  {retainerAddOn.includes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {retainerAddOn.worksWith && retainerAddOn.worksWith.length > 0 && (
              <div className="mt-4 pt-4 border-t border-zinc-700">
                <p className="text-xs font-semibold text-zinc-300 mb-2">Works with:</p>
                <p className="text-sm text-zinc-300">
                  {retainerAddOn.worksWith.join(' • ')}
                </p>
              </div>
            )}
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