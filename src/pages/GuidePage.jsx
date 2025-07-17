import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <SEOHead
        target="retailstar.sol"
        pageType="guide"
        customTitle="How to Navigate Retailstar | Guide"
        customDescription="Orientation, glossary, and navigation map for the Retailstar Solana domain mall."
        customKeywords="retailstar guide, how it works, scav rack, vault, solana domain mall"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-6 neon-cyan drop-shadow-neon text-center">🧠 How to Navigate Retailstar</h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Retailstar is the Solana mall of misfit domains — an immersive marketplace where lore, memes, and collectibles collide. Each domain is a storefront, a story, and sometimes… a mystery.<br/>
          Whether you’re here to build, bid, flip, or just vibe — this is your starting point.
        </p>
        <div className="border-t border-cyan-800/30 my-8"></div>
        {/* Glossary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">💸 Understanding Pricing & Listings</h2>
            <table className="w-full text-sm mb-4">
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">Scav Rack</td>
                  <td className="py-2">⚠️ Meme zone. Low-effort domains with upgraded PFPs or graphics. Often no live website. Priced cheap. Great for flippers and collectors.</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">Flash Rack</td>
                  <td className="py-2">💥 Temporary listings. Time-sensitive or undercut deals. Think “flash sales” for domains.</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">Fixer Catalog</td>
                  <td className="py-2">🔧 Premium and mid-tier domains with builds or strong brand potential. Ideal for serious creators and collectors.</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">Marketplace</td>
                  <td className="py-2">🛒 Central checkout. All domains listed for sale eventually point here. Includes SNS links and DM unlocks.</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">Vault</td>
                  <td className="py-2">🔒 Hidden gems. Not for sale, redacted, or tied to future drops. Often have the deepest lore.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-cyan-300">Wiki</td>
                  <td className="py-2">📘 Each domain has a /wiki/[slug] page — it’s the storefront’s profile, including backstory, category, tags, and any linked projects or art.</td>
                </tr>
              </tbody>
            </table>
            <div className="text-xs text-gray-400">Some pages will have <span className="font-bold">+0.5 SOL Build Add-on</span> — use this to get a site built on top of your domain.</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">🗺️ How to Navigate the Mall</h2>
            <table className="w-full text-sm mb-4">
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">/catalog</td>
                  <td className="py-2">All domains. Filter by tag: Premium, Quick Snag, Flash Rack, Vaulted</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">/marketplace</td>
                  <td className="py-2">Final listings & pricing links (SNS or DM)</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">/vault</td>
                  <td className="py-2">Hidden or redacted domains with lore, not always listed</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">/scavrack</td>
                  <td className="py-2">The meme aisle. Lowest cost, no builds</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 pr-4 font-semibold text-cyan-300">/directory</td>
                  <td className="py-2">Full map. The Retailverse index of every domain and wiki page</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-semibold text-cyan-300">/wiki/[slug]</td>
                  <td className="py-2">Individual storefronts — lore, art, tags, links, status</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4">
              <Link to="/wiki/lowballking" className="text-cyan-400 hover:underline font-semibold">Sample Wiki: lowballking.sol →</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-cyan-800/30 my-8"></div>
        {/* Tips & Alpha */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">🧩 Tips & Alpha</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>🔍 Use the <Link to="/directory" className="text-cyan-400 hover:underline">Explore tab</Link> if you’re just browsing or looking for hidden gems</li>
            <li>📘 Wiki pages hold the most context — especially for vaulted domains</li>
            <li>🛍️ If a domain has an upgraded image but no website, it’s probably in the Scav Rack — easy to flip or memeify</li>
            <li>💬 DM if you're unsure — Retailstar is just getting started</li>
          </ul>
        </div>
        {/* Final CTA */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
          <Link to="/catalog" className="neon-cyan neon-cyan-hover py-4 px-8 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all duration-200">
            🗂️ Explore Catalog
          </Link>
          <Link to="/directory" className="neon-purple neon-purple-hover py-4 px-8 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg transition-all duration-200">
            🗺️ Visit Mall Map
          </Link>
        </div>
      </div>
    </div>
  );
} 