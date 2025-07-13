import React, { useState } from 'react';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';

// Fixer's Catalog data with gritty, insider tone
const fixerTiers = {
  premium: {
    title: "🧠 Tier: Premium",
    cost: "💰 Cost: 9+ SOL",
    specs: "🔧 Specs: 2–3 layered pages, lore, utility hooks",
    addons: "🪄 Add-ons: mint widget, token gate, database",
    description: "The real deal. Multi-layered builds with actual utility. Not your grandma's landing page.",
    examples: [
      { name: "jpegdealer.sol", status: "Available", price: "12 SOL", image: "🖼️", description: "NFT resale platform with mint integration" },
      { name: "fudscience.sol", status: "Available", price: "10 SOL", image: "🧪", description: "Satirical alpha reports with token-gated access" },
      { name: "lurkerlife.sol", status: "Available", price: "12 SOL", image: "👁️", description: "Funny but weak build. Add visual humor" }
    ]
  },
  mid: {
    title: "📦 Tier: Mid",
    cost: "💰 4–8.5 SOL",
    specs: "🧱 Solid build or killer concept, not both",
    addons: "🪟 1 page + 1 feature: modal, echo CLI, etc.",
    description: "Pick your poison: solid execution or viral potential. Rarely both.",
    examples: [
      { name: "copevendor.sol", status: "Available", price: "5.5 SOL", image: "💊", description: "Rebuild with more absurdity and clean flow" },
      { name: "commandhub.sol", status: "Available", price: "8.5 SOL", image: "🔧", description: "Solid dev tool angle, could go 2+ SOL" },
      { name: "jumpsetradio.sol", status: "Available", price: "5.5 SOL", image: "🎮", description: "Gamer x streetwear with utility hooks" },
      { name: "rigbuilder.sol", status: "Available", price: "5.5 SOL", image: "⚡", description: "Fastest to sell for SOL rotation" }
    ]
  },
  quickSnag: {
    title: "🧹 Tier: Quick Snag",
    cost: "💰 0.8–3.5 SOL",
    specs: "🧾 One-scroll showcase or visual punch",
    addons: "⚡ Fast deployment, minimal overhead",
    description: "One-scroll wonders. Visual impact over complexity. Perfect for SOL rotation.",
    examples: [
      { name: "bidgremlin.sol", status: "Available", price: "0.89 SOL", image: "👹", description: "Fastest to sell for SOL rotation" },
      { name: "deploydeck.sol", status: "Available", price: "2 SOL", image: "🚀", description: "Solid dev tool angle" }
    ]
  },

  flashRack: {
    title: "🔥 Tier: Flash Rack",
    cost: "💰 0.2–0.5 SOL",
    specs: "📉 Meme-level domains, ASCII splashes, troll quotes",
    addons: "🎭 Pure chaos, no promises",
    description: "Meme-tier domains. ASCII art. Troll quotes. Pure chaos. No promises.",
    examples: [
      { name: "bagcultist.sol", status: "Available", price: "0.3 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises" },
      { name: "itspremiumbro.sol", status: "Available", price: "0.4 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises" },
      { name: "420noscopegg.sol", status: "Available", price: "0.5 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises" }
    ]
  },
  blacklistFriday: {
    title: "💀 Monthly: Blacklist Friday",
    cost: "💰 0.1 SOL or GTFO",
    specs: "🪓 Firesale of meme-tier domains",
    addons: "⚡ Flash deals, no holds barred",
    description: "Monthly firesale. Meme-tier domains. 0.1 SOL or GTFO. No holds barred.",
    examples: [
      { name: "flash.sol", status: "Coming Soon", price: "0.1 SOL", image: "⚡", description: "Flash deal - no promises" },
      { name: "meme.sol", status: "Coming Soon", price: "0.1 SOL", image: "🎭", description: "Flash deal - no promises" },
      { name: "troll.sol", status: "Coming Soon", price: "0.1 SOL", image: "💀", description: "Flash deal - no promises" }
    ]
  }
};

const snsUpgrade = {
  title: "🪪 Tier: SNS Upgrade",
  cost: "💰 Starts at 0.5 SOL",
  specs: "🧬 Profile-level flex (pfp, banner, link)",
  addons: "🎨 Custom branding, social integration",
  description: "Profile-level flex. PFP, banner, link tree. Basic but effective.",
  examples: [
    { name: "urnotthatguy.sol", status: "Sold", price: "0.3 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises" },
    { name: "yournotthatguy.sol", status: "Sold", price: "0.4 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises" },
    { name: "inpregneable.sol", status: "Sold", price: "0.5 SOL", image: "💀", description: "Unfiltered and unhinged. No site, no promises" }
  ]
};

const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "bg-green-600 text-white glow-blue";
    case "Sold":
      return "bg-red-600 text-white";
    case "Coming Soon":
      return "bg-yellow-600 text-black glow-purple";
    default:
      return "bg-gray-600 text-white";
  }
};

const TierCard = ({ tier, data }) => (
  <div className="steel-surface card-hover-glow rounded-lg p-6 transition-all duration-300 group w-full max-w-4xl mx-auto border border-gray-700">
    <div className="mb-6">
      <h3 className="text-2xl font-bold solana-gradient mb-2 group-hover:glow-blue transition-colors">
        {data.title}
      </h3>
      <div className="space-y-2 text-sm text-gray-300">
        <p className="font-semibold text-cyan-400">{data.cost}</p>
        <p className="text-yellow-400">{data.specs}</p>
        <p className="text-purple-400">{data.addons}</p>
      </div>
      <p className="text-gray-400 mt-4 italic">"{data.description}"</p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.examples.map((example, index) => (
        <div key={index} className="bg-black/40 rounded-lg p-4 border border-gray-600">
          <div className="text-2xl text-center mb-2">{example.image}</div>
          <h4 className="text-sm font-bold solana-gradient mb-2 text-center">
            {example.name}
          </h4>
          <div className="flex justify-center mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(example.status)}`}>
              {example.status}
            </span>
          </div>
          <div className="text-center mb-2">
            {example.status === "Available" ? (
              <span className="text-sm font-bold flicker-solana solana-gradient">
                {example.price}
              </span>
            ) : (
              <span className="text-sm font-bold text-gray-500">
                {example.status === "Vaulted" ? "Vaulted" : example.status}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 text-center">
            {example.description}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const FixersCatalogPage = () => {
  const [selectedTier, setSelectedTier] = useState(null);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background image at 50% opacity */}
      <img 
        src={retailstarBody} 
        alt="RetailStar Background" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Main content (z-10) */}
      <div className="relative z-10">
        {/* Header */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img 
                  src={rsLogo} 
                  alt="RetailStar Logo" 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-lg shadow-2xl shadow-blue-500/20 border border-blue-500/30 flicker-solana"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-400/20 rounded-lg"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
              Fixer's Catalog
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              Classified access to the domain + site tier system. Not a price list — this is the black market vendor section.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="/domains"
                className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                ← Active Listings
              </a>
            </div>
          </div>
        </section>

        {/* Tier Navigation */}
        <section className="px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(fixerTiers).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTier(selectedTier === key ? null : key)}
                  className={`steel-surface card-hover-glow rounded-lg p-4 transition-all duration-300 text-center ${
                    selectedTier === key ? 'border-2 border-cyan-400 glow-blue' : 'border border-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-2">{data.title.split(' ')[1]}</div>
                  <div className="text-xs text-gray-400">{data.cost.split(' ')[1]}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Tier Details */}
        {selectedTier && (
          <section className="px-4 pb-8">
            <div className="max-w-6xl mx-auto">
              <TierCard tier={selectedTier} data={fixerTiers[selectedTier]} />
              {selectedTier === 'flashRack' && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold solana-gradient mb-2 group-hover:glow-blue transition-colors">
                    {snsUpgrade.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p className="font-semibold text-cyan-400">{snsUpgrade.cost}</p>
                    <p className="text-yellow-400">{snsUpgrade.specs}</p>
                    <p className="text-purple-400">{snsUpgrade.addons}</p>
                  </div>
                  <p className="text-gray-400 mt-4 italic">"{snsUpgrade.description}"</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {snsUpgrade.examples.map((example, index) => (
                      <div key={index} className="bg-black/40 rounded-lg p-4 border border-gray-600">
                        <div className="text-2xl text-center mb-2">{example.image}</div>
                        <h4 className="text-sm font-bold solana-gradient mb-2 text-center">
                          {example.name}
                        </h4>
                        <div className="flex justify-center mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(example.status)}`}>
                            {example.status}
                          </span>
                        </div>
                        <div className="text-center mb-2">
                          <span className="text-sm font-bold flicker-solana solana-gradient">
                            {example.price}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 text-center">
                          {example.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* All Tiers Overview */}
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center solana-gradient flicker-solana mb-8">
              <span className="text-pink-400">[</span> Complete Catalog <span className="text-pink-400">]</span>
            </h2>
            
            {Object.entries(fixerTiers).map(([key, data]) => (
              <React.Fragment key={key}>
                <TierCard tier={key} data={data} />
                {key === 'flashRack' && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold solana-gradient mb-2 group-hover:glow-blue transition-colors">
                      {snsUpgrade.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p className="font-semibold text-cyan-400">{snsUpgrade.cost}</p>
                      <p className="text-yellow-400">{snsUpgrade.specs}</p>
                      <p className="text-purple-400">{snsUpgrade.addons}</p>
                    </div>
                    <p className="text-gray-400 mt-4 italic">"{snsUpgrade.description}"</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {snsUpgrade.examples.map((example, index) => (
                        <div key={index} className="bg-black/40 rounded-lg p-4 border border-gray-600">
                          <div className="text-2xl text-center mb-2">{example.image}</div>
                          <h4 className="text-sm font-bold solana-gradient mb-2 text-center">
                            {example.name}
                          </h4>
                          <div className="flex justify-center mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(example.status)}`}>
                              {example.status}
                            </span>
                          </div>
                          <div className="text-center mb-2">
                            <span className="text-sm font-bold flicker-solana solana-gradient">
                              {example.price}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 text-center">
                            {example.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed glow-blue">
                "This ain't your grandma's domain marketplace. This is the underlayer where real deals happen."
              </p>
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
                href="https://twitter.com/KongX" 
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
                href="/vault" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Vault
              </a>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>© 2025 retailstar.sol - Nodes in the Retailverse</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FixersCatalogPage; 