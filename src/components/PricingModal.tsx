import React from 'react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-gray-900 border border-teal-600 rounded-xl p-6 w-[90%] max-w-2xl shadow-xl text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-teal-300 hover:text-red-400 text-lg transition-colors z-10"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-teal-300">💸 Retailstar 2025 Pricing</h2>
        <p className="text-sm text-neutral-300 mb-6">
          Choose your entry point into the Retailstar universe. Every tier represents a different level of immersion, complexity, and cyberpunk world-building.
        </p>

        {/* Pricing Content */}
        <div className="space-y-4 text-sm leading-relaxed">
          {/* Quick Snag */}
          <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
            <p className="font-bold text-green-400">🟢 Quick Snag — <span className="text-white">0.5–1.5 SOL</span></p>
            <p className="text-neutral-200 text-xs mt-1 mb-2 italic">Snag it. Ship it. Stun 'em.</p>
            <div className="mt-2">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Includes:</p>
              <ul className="list-disc list-inside text-xs text-neutral-300 space-y-0.5 ml-2">
                <li>1-page site</li>
                <li>Custom hero/banner</li>
                <li>Snappy microcopy</li>
                <li>Link to socials or mint page</li>
                <li>48–72 hour turnaround</li>
                <li>Scav Rack placement</li>
              </ul>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Best for:</p>
              <p className="text-xs text-neutral-400">Meme sites • promo landers • quick flips • identity flexes</p>
            </div>
          </div>

          {/* Mid-Grade */}
          <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
            <p className="font-bold text-yellow-400">🧱 Mid-Grade — <span className="text-white">3–5 SOL</span></p>
            <p className="text-neutral-200 text-xs mt-1 mb-2 italic">Not basic. Not maxed. Just right.</p>
            <div className="mt-2">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Includes:</p>
              <ul className="list-disc list-inside text-xs text-neutral-300 space-y-0.5 ml-2">
                <li>Up to 2 pages</li>
                <li>Styled layout + light animation</li>
                <li>Custom CTAs</li>
                <li>Optional: collection widgets, embeds, 1–2 stat modules</li>
                <li>Showcase placement in the mall</li>
              </ul>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Best for:</p>
              <p className="text-xs text-neutral-400">Pre-launch sites • concept reveals • small brands</p>
            </div>
          </div>

          {/* Premium */}
          <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
            <p className="font-bold text-blue-400">💎 Premium — <span className="text-white">9+ SOL</span></p>
            <p className="text-neutral-200 text-xs mt-1 mb-2 italic">This isn't a site — it's a world.</p>
            <div className="mt-2">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Includes:</p>
              <ul className="list-disc list-inside text-xs text-neutral-300 space-y-0.5 ml-2">
                <li>2–3 full custom pages</li>
                <li>Scroll-based animations</li>
                <li>Lore-driven copy + narrative design</li>
                <li>Optional: token-gating, analytics dashboards</li>
                <li>Priority placement in Premium Rotation</li>
                <li>Dev Cycle Planning (Lite)</li>
              </ul>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Best for:</p>
              <p className="text-xs text-neutral-400">Flagship projects • serious brands • lore-first concepts</p>
            </div>
          </div>

          {/* Mythic */}
          <div className="relative group">
            <div className="bg-gradient-to-br from-purple-800 to-violet-900 border border-violet-600 rounded-lg p-4 shadow-xl">
              <p className="font-bold text-violet-200">🧿 Mythic — <span className="text-white">15+ SOL</span></p>
              <p className="text-violet-300 text-xs mt-1 mb-2 italic">The apex tier. Full system builds, logic, and dashboards.</p>
              <div className="mt-2">
                <p className="text-xs font-semibold text-violet-200 mb-1">Includes:</p>
                <ul className="list-disc list-inside text-xs text-violet-100 space-y-0.5 ml-2">
                  <li>Full custom build</li>
                  <li>Cyberpunk environment + world-building</li>
                  <li>Token-gated areas (optional)</li>
                  <li>Marketplace components, dashboards, or complex logic</li>
                  <li>Deep optimization + polish</li>
                  <li>Full Dev Cycle Planning</li>
                </ul>
              </div>
              <div className="mt-3 pt-3 border-t border-violet-500/50">
                <p className="text-xs font-semibold text-violet-200 mb-2">Dev Cycle Milestones</p>
                <div className="space-y-2 text-xs">
                  <div>
                    <p className="text-violet-200 font-medium">Milestone 1 — Foundation Pages</p>
                    <p className="text-violet-100 ml-2">Home • About • Services • Contact • Branding shell</p>
                  </div>
                  <div>
                    <p className="text-violet-200 font-medium">Milestone 2 — Expansion Modules</p>
                    <p className="text-violet-100 ml-2">Blog • Collections • Feature blocks • CTA flows</p>
                  </div>
                  <div>
                    <p className="text-violet-200 font-medium">Milestone 3 — Complex Logic</p>
                    <p className="text-violet-100 ml-2">Dashboards • APIs • Marketplaces • Dynamic data • State machines</p>
                  </div>
                  <div>
                    <p className="text-violet-200 font-medium">Milestone 4 — Polish Phase</p>
                    <p className="text-violet-100 ml-2">Animations • micro-interactions • lore enhancements • performance</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-violet-500/50">
                <p className="text-xs font-semibold text-violet-200 mb-1">Best for:</p>
                <p className="text-xs text-violet-100">DAOs • dashboards • game portals • ecosystem hubs</p>
              </div>
            </div>
          </div>

          {/* Blueprint Tier */}
          <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
            <p className="font-bold text-cyan-400">🔵 Blueprint Tier — <span className="text-white">0.5–0.75 SOL</span></p>
            <p className="text-neutral-200 text-xs mt-1 mb-2 italic">You're the architect.</p>
            <div className="mt-2">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Includes:</p>
              <ul className="list-disc list-inside text-xs text-neutral-300 space-y-0.5 ml-2">
                <li>Domain + transfer</li>
                <li>Optional "Coming Soon" shell</li>
                <li>Listed in Pending Activation</li>
                <li>Fully upgradeable to any higher tier</li>
              </ul>
            </div>
          </div>

          {/* Raw / Scav Rack */}
          <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/50">
            <p className="font-bold text-green-400">🟢 Raw / Scav Rack — <span className="text-white">0.1 SOL</span></p>
            <p className="text-neutral-200 text-xs mt-1 mb-2 italic">Pure digital chaos.</p>
            <div className="mt-2">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Includes:</p>
              <ul className="list-disc list-inside text-xs text-neutral-300 space-y-0.5 ml-2">
                <li>Raw domain transfer</li>
                <li>No build, no lore, no support</li>
                <li>Surprise loot chance</li>
                <li>Scav Rack listing</li>
              </ul>
            </div>
          </div>

          {/* Retainer Add-On */}
          <div className="border border-orange-500/50 rounded-lg p-4 bg-orange-900/20">
            <p className="font-bold text-orange-400">🔧 Retainer Add-On — <span className="text-white">0.5–1 SOL/month</span></p>
            <p className="text-neutral-200 text-xs mt-1 mb-2 italic">Treat your domain like a storefront, not a graveyard.</p>
            <div className="mt-2">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Includes:</p>
              <ul className="list-disc list-inside text-xs text-neutral-300 space-y-0.5 ml-2">
                <li>Monthly updates</li>
                <li>Seasonal refreshes</li>
                <li>UI tweaks</li>
                <li>Feature/module swaps</li>
                <li>Optional lore additions</li>
              </ul>
            </div>
            <div className="mt-2 pt-2 border-t border-orange-500/30">
              <p className="text-xs font-semibold text-neutral-300 mb-1">Available for:</p>
              <p className="text-xs text-neutral-400">Quick Snag • Mid-Grade • Premium • Mythic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal; 