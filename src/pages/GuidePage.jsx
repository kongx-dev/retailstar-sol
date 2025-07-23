import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import LoreButton from '../components/LoreButton';

export default function GuidePage() {
  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="guide"
        customTitle="Retailstar Orientation Guide | How to Navigate the Retailverse"
        customDescription="Complete guide to navigating Retailstar Mall - the Solana-powered multiverse of domains, lore, and marketplace chaos. Learn about pricing, navigation, and buying domains."
        customKeywords="retailstar guide, how to navigate, solana domains, domain marketplace, scav rack, flash rack, fixer catalog, vault, wiki pages"
        canonicalUrl="https://retailstar.sol/guide"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
            📖 Retailstar Orientation Guide
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Welcome to <strong>Retailstar Mall</strong> — the Solana-powered multiverse of domains, lore, and marketplace chaos. 
            This guide will help you navigate it like a pro.
          </p>
        </div>

        {/* Lore Integration */}
        <div className="bg-black/30 border border-cyan-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-cyan-400">🏬 What is Retailstar?</h2>
            <LoreButton />
          </div>
          <p className="text-gray-300 mb-4">
            <strong>Retailstar</strong> is the Solana mall of misfit domains — an immersive marketplace where lore, memes, and collectibles collide. 
            Each domain is a storefront, a story, and sometimes… a mystery.
          </p>
          <p className="text-gray-300 mb-4">
            Whether you&#39;re here to build, bid, flip, or just vibe — this is your starting point.
          </p>
          <blockquote className="border-l-4 border-pink-500 pl-4 italic text-pink-300">
            &quot;Retailstar never promised luxury. It promised lore.&quot;
            <br />
            <Link to="/directory?tab=lore" className="text-cyan-400 hover:text-cyan-300 underline">
              — Read the Full Lore
            </Link>
          </blockquote>
        </div>

        {/* Pricing & Listings */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">💰 Pricing & Listings</h2>
          <div className="grid gap-4">
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">🟢 Scav Rack</h3>
              <p className="text-gray-300">The meme aisle. Lowest cost, no builds. Pure chaos energy.</p>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">🛍️ Marketplace</h3>
              <p className="text-gray-300">Central checkout system. Final listings & pricing links.</p>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">🔓 Vault</h3>
              <p className="text-gray-300">Hidden gems with deep lore. Not always listed.</p>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">📚 Wiki</h3>
              <p className="text-gray-300">Individual storefront profiles. Lore, art, tags, links.</p>
            </div>
          </div>
        </div>

        {/* Navigation Guide */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">🗺️ How to Navigate the Mall</h2>
          <div className="grid gap-4">
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2"><code className="bg-gray-800 px-2 py-1 rounded">/marketplace</code></h3>
              <p className="text-gray-300">Final listings & pricing links (SNS or DM)</p>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2"><code className="bg-gray-800 px-2 py-1 rounded">/scavrack</code></h3>
              <p className="text-gray-300">The meme aisle. Lowest cost, no builds</p>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2"><code className="bg-gray-800 px-2 py-1 rounded">/vault</code></h3>
              <p className="text-gray-300">Hidden or redacted domains with lore, not always listed</p>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2"><code className="bg-gray-800 px-2 py-1 rounded">/directory</code></h3>
              <p className="text-gray-300">Full map. The Retailverse index of every domain and wiki page — <strong>📍 Return to Base</strong></p>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2"><code className="bg-gray-800 px-2 py-1 rounded">/wiki/[slug]</code></h3>
              <p className="text-gray-300">Individual storefronts — lore, art, tags, links, status</p>
            </div>
          </div>
          
          <div className="mt-6 bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
            <p className="text-cyan-300">
              📍 Looking for something specific or lost in the sauce? Use the <Link to="/directory" className="text-cyan-400 hover:text-cyan-300 underline font-bold">Mall Map</Link> to return to base.
            </p>
          </div>
        </div>

        {/* How to Buy */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">🚪 How to Buy</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-green-400 text-xl">•</span>
              <p className="text-gray-300">If a domain is <strong>listed on SNS</strong> → Click <code className="bg-green-900/50 px-2 py-1 rounded">Buy on SNS</code></p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 text-xl">•</span>
              <p className="text-gray-300">If a domain is <strong>vaulted</strong> or private → Click <code className="bg-blue-900/50 px-2 py-1 rounded">DM to Unlock</code></p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-yellow-400 text-xl">•</span>
              <p className="text-gray-300">Some pages will have <code className="bg-yellow-900/50 px-2 py-1 rounded">+0.5 SOL Build Add-on</code> — use this to get a site built on top of your domain</p>
            </div>
          </div>
        </div>

        {/* Tips & Alpha */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">💡 Tips & Alpha</h2>
          <div className="space-y-4">
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">🎯 Pro Tips</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Scav Rack has the best deals — check back often</li>
                <li>• Vaulted domains often have the deepest lore</li>
                <li>• Some domains have hidden features — explore the wiki pages</li>
                <li>• Build add-ons can transform a basic domain into a full site</li>
              </ul>
            </div>
            <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2">🔍 Hidden Gems</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Check the <Link to="/lore" className="text-cyan-400 hover:text-cyan-300 underline">lore</Link> for backstory on domains</li>
                <li>• Some domains have secret features — try clicking everything</li>
                <li>• The <Link to="/vote" className="text-cyan-400 hover:text-cyan-300 underline">vote page</Link> shows community favorites</li>
                <li>• Follow <a href="https://twitter.com/retailstarsol" className="text-cyan-400 hover:text-cyan-300 underline">@retailstarsol</a> for updates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              🗂️ Browse Catalog
            </Link>
            <Link
              to="/directory"
              className="neon-purple neon-purple-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              🗺️ Mall Directory
            </Link>
            <Link
              to="/lore"
              className="neon-green neon-green-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              📖 Read Lore
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 