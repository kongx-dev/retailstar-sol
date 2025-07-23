import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { getAvailableForSale } from '../../data/domains';
import { isForSale } from '../../data/blocklist';
import { randomSarcasm } from '../../utils/retailrunnerPersonality';

// Pricing tier data with blocklist filtering
const pricingTiers = [
  {
    id: 'quick-snag',
    name: 'Quick Snag',
    price: '0.5-2 SOL',
    description: 'Fast builds for meme domains and quick flips',
    features: [
      'Custom landing page',
      'Basic SEO optimization',
      'Mobile responsive',
      'Social media integration',
      '24hr turnaround'
    ],
    domains: getAvailableForSale().filter(d => d.category === 'quickSnag' || d.quickSnagPrice),
    color: 'green'
  },
  {
    id: 'mid-tier',
    name: 'Mid Tier',
    price: '2-8 SOL',
    description: 'Balanced builds with utility and branding',
    features: [
      'Full website with multiple pages',
      'Advanced SEO & analytics',
      'Custom branding package',
      'Integration capabilities',
      '72hr turnaround'
    ],
    domains: getAvailableForSale().filter(d => d.category === 'mid'),
    color: 'blue'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '8+ SOL',
    description: 'Full brand experiences with advanced features',
    features: [
      'Complete brand ecosystem',
      'Custom web3 integrations',
      'Advanced analytics & tracking',
      'Priority support',
      '7-day turnaround'
    ],
    domains: getAvailableForSale().filter(d => d.category === 'premium'),
    color: 'purple'
  }
];

// Pricing Accordion Component
const RetailPricingAccordion = () => {
  const [openTier, setOpenTier] = React.useState('quick-snag');

  return (
    <div className="space-y-4">
      {pricingTiers.map((tier) => (
        <div key={tier.id} className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenTier(openTier === tier.id ? '' : tier.id)}
            className={`w-full p-6 text-left transition-all duration-200 ${
              openTier === tier.id 
                ? `bg-${tier.color}-500/20 border-${tier.color}-500/50` 
                : 'bg-gray-900/50 hover:bg-gray-800/50'
            }`}
            title={randomSarcasm()} // Add sarcasm tooltip
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-lg text-gray-300 mb-1">{tier.price}</p>
                <p className="text-sm text-gray-400">{tier.description}</p>
              </div>
              <div className="text-2xl">
                {openTier === tier.id ? '−' : '+'}
              </div>
            </div>
          </button>
          
          {openTier === tier.id && (
            <div className="p-6 bg-gray-900/30 border-t border-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Available Domains ({tier.domains.length})
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {tier.domains.length > 0 ? (
                      tier.domains.slice(0, 5).map((domain) => (
                        <div key={domain.slug} className="flex items-center justify-between text-sm">
                          <span className="text-cyan-400">{domain.name}.sol</span>
                          <span className="text-gray-400">{domain.price}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm italic">No domains available in this tier</p>
                    )}
                    {tier.domains.length > 5 && (
                      <p className="text-xs text-gray-500 mt-2">
                        +{tier.domains.length - 5} more domains...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function PricingPage() {
  const location = useLocation();
  const premiumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const referrer = document.referrer;
    const fromPremiumPage = referrer.includes('premium') || referrer.includes('vote');
    if (fromPremiumPage && premiumRef.current) {
      setTimeout(() => premiumRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    }
  }, []);

  return (
    <>
      <SEOHead
        target="retailstar.sol"
        pageType="pricing"
        customTitle="Pricing | Retailstar Mall - Build Tiers & Domain Upgrades"
        customDescription="View pricing tiers for Quick Snag, Mid, and Premium builds. Learn how to upgrade your .sol domain into a full brand experience."
        customKeywords="Retailstar pricing, Solana domain builds, tiered upgrades, premium solana sites"
        imageUrl="https://retailstar.xyz/assets/rs-og-card.png"
        canonicalUrl="https://retailstar.sol/pricing"
        ogImage="https://retailstar.xyz/assets/rs-og-card.png"
        twitterImage="https://retailstar.xyz/assets/rs-og-card.png"
      />

      {/* Header */}
      <section className="text-center py-20 px-4 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black mb-4 neon-pulse solana-gradient">
          🧱 Pricing Tiers
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto">
          Upgrade your domain into a build worthy of the Retailverse. Choose your path.
        </p>
        <p className="text-sm italic text-zinc-400">
          Every tier includes custom branding, dev optimization, and meme compatibility™.
        </p>
      </section>

      {/* Tier Accordion */}
      <section className="px-6 pb-24 max-w-3xl mx-auto relative z-10">
        <div ref={premiumRef}>
          <RetailPricingAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-20">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/upgrade"
            className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
          >
            🛠️ Reserve Build Slot
          </Link>
          <Link
            to="/marketplace"
            className="neon-purple neon-purple-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
          >
            🛒 Browse Available Domains
          </Link>
        </div>
      </section>
    </>
  );
} 