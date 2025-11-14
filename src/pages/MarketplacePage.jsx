import React, { useEffect, useState } from "react";
import { useDomains } from '../hooks/useDomains';
import { getMythicDomains, getFeaturedDomains, getFlashOffers } from '../lib/domainQueries';
import { getAvailableForSale } from '../data/domains';
import FilterControls from '../components/FilterControls';
import bgImage from "../assets/chowdown.png";
import chevronUp from "../assets/chevron.png";
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';
import { MarketplaceCardSkeleton, OfferTileSkeleton } from '../components/DomainLoadingSkeleton';
import { MarketplaceErrorFallback } from '../components/DomainErrorFallback';

// Import domain images
import jpegdealerImg from "../assets/jpegdealer.png";
import fudscientistImg from "../assets/fudscientist.png";
import lurkerlifeImg from "../assets/lurkerlife.png";
import commandhubImg from "../assets/commandhub.png";
import jumpsetradioImg from "../assets/jumpsetradio.png";
import deploydeckImg from "../assets/deploydeck.png";
import copevendorImg from "../assets/copevendor.png";
import rigbuilderImg from "../assets/rigbuilder.png";
import bidgremlinImg from "../assets/bidgremlin.png";

// Image mapping
const domainImages = {
  jpegdealer: jpegdealerImg,
  lurkerlife: lurkerlifeImg,
  commandhub: commandhubImg,
  jumpsetradio: jumpsetradioImg,
  deploydeck: deploydeckImg,
  copevendor: copevendorImg,
  rigbuilder: rigbuilderImg,
  bidgremlin: bidgremlinImg,
};

// Inventory management
const INVENTORY_KEY = 'retailstar_marketplace_inventory';

function getSoldDomains() {
  try {
    const sold = localStorage.getItem(INVENTORY_KEY);
    return sold ? JSON.parse(sold) : [];
  } catch {
    return [];
  }
}

function markDomainAsSold(domainSlug) {
  try {
    const sold = getSoldDomains();
    if (!sold.includes(domainSlug)) {
      sold.push(domainSlug);
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(sold));
    }
  } catch (error) {
    console.error('Error marking domain as sold:', error);
  }
}

function getAvailableDomains() {
  const soldDomains = getSoldDomains();
  // Use the new blocklist filtering
  return getAvailableForSale(allDomains.filter(domain => !soldDomains.includes(domain.slug)));
}

// Helper to check if domain is Mythic
function isMythic(domain) {
  return mythicDomains.some(mythic => mythic.name === domain.name);
}

// Helper to get available domains from Supabase
async function getAvailableDomainsFromSupabase() {
  const { domains } = useDomains({ listed: true, available: true });
  return domains;
}

// Helper to get Mythic domains from Supabase
async function getMythicDomainsFromSupabase() {
  const domains = await getMythicDomains();
  return domains.map(d => ({
    ...d,
    rotationGroup: "mythic",
    rotationExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
  }));
}

// Helper to get featured domains from Supabase
async function getFeaturedDomainsFromSupabase() {
  const domains = await getFeaturedDomains();
  return domains.slice(0, 2).map(d => ({
    ...d,
    rotationGroup: "featured",
    rotationExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
  }));
}

// Helper to get flash offers from Supabase
async function getFlashOffersFromSupabase() {
  const domains = await getFlashOffers();
  return domains.map(d => ({
    ...d,
    rotationGroup: "daily",
    rotationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  }));
}

// Timer component
function Timer({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(expiresAt).getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div className="text-xs text-gray-400">
      {timeLeft.days > 0 && `${timeLeft.days}d `}
      {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
    </div>
  );
}

// Mythic Domain Card Component
function MythicDomainCard({ domain, onPurchase }) {
  const handlePurchase = () => {
    markDomainAsSold(domain.slug);
    onPurchase(domain.slug);
  };

  const imageKey = domain.name.toLowerCase();
  const imageSrc = domain.image_url || domainImages[imageKey] || domainImages.jpegdealer;

  return (
    <div className="relative group cursor-pointer">
      <div className={`bg-gradient-to-br from-purple-800 to-violet-900 border border-violet-600 rounded-xl p-6 shadow-xl hover:animate-glow transition-all ${
        domain.featured ? 'ring-2 ring-yellow-400 ring-opacity-50 shadow-yellow-400/25' : ''
      }`}>
        {/* Domain image */}
        <div className="flex justify-center mb-4">
          <img 
            src={imageSrc} 
            alt={`${domain.name}.sol`}
            className="w-16 h-16 object-contain rounded-lg"
          />
        </div>
        
        {/* Domain name */}
        <div className="text-center">
          <div className="text-lg font-bold text-white mb-1">{domain.name}.sol</div>
          <div className="text-xs text-violet-300 mb-2">🧿 MYTHIC</div>
          {domain.featured && <div className="text-yellow-400 text-xs font-bold mb-2 animate-pulse">⭐ Featured</div>}
        </div>
        
        {/* Timer */}
        <div className="mt-3 text-center">
          <Timer expiresAt={domain.rotationExpires} />
        </div>
        
        {/* Buy button */}
        <button 
          onClick={handlePurchase}
          className="w-full mt-3 bg-violet-600 hover:bg-violet-500 text-white py-2 px-4 rounded font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
        >
          BUY
        </button>
      </div>
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-violet-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg z-10">
        🔥 Mythic Artifact — not for the faint of heart
      </div>
    </div>
  );
}

// Featured Domain Card Component
function FeaturedDomainCard({ domain, onPurchase }) {
  const handlePurchase = () => {
    markDomainAsSold(domain.slug);
    onPurchase(domain.slug);
  };

  const imageKey = domain.name.toLowerCase();
  const imageSrc = domain.image_url || domainImages[imageKey] || domainImages.jpegdealer;

  return (
    <div className={`bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 ${
      domain.featured ? 'ring-2 ring-yellow-400 ring-opacity-50 shadow-yellow-400/25' : ''
    }`}>
      {/* Domain image */}
      <div className="flex justify-center mb-4">
        <img 
          src={imageSrc} 
          alt={`${domain.name}.sol`}
          className="w-16 h-16 object-contain rounded-lg"
        />
      </div>
      
      {/* Domain name */}
      <div className="text-center">
        <div className="text-sm font-bold text-white mb-1">{domain.name}.sol</div>
        <div className="text-xs text-gray-400">{domain.category?.toUpperCase() || 'DOMAIN'}</div>
        {domain.featured && <div className="text-yellow-400 text-xs font-bold mt-1 animate-pulse">⭐ Featured</div>}
      </div>
      
      {/* Timer */}
      <div className="mt-3 text-center">
        <Timer expiresAt={domain.rotationExpires} />
      </div>
      
      {/* Buy button */}
      <button 
        onClick={handlePurchase}
        className="w-full mt-3 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-green-500/25"
      >
        BUY
      </button>
    </div>
  );
}

// Offer Tile Component
function OfferTile({ domain, onPurchase }) {
  const handlePurchase = () => {
    markDomainAsSold(domain.slug);
    onPurchase(domain.slug);
  };

  const imageKey = domain.name.toLowerCase();
  const imageSrc = domain.image_url || domainImages[imageKey] || domainImages.jpegdealer;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-orange-500/25 transition-all duration-200">
      {/* Domain image */}
      <div className="flex justify-center mb-3">
        <img 
          src={imageSrc} 
          alt={`${domain.name}.sol`}
          className="w-12 h-12 object-contain rounded-lg"
        />
      </div>
      
      {/* Domain name */}
      <div className="text-center">
        <div className="text-sm font-bold text-white mb-1">{domain.name}.sol</div>
        <div className="text-xs text-gray-400">{domain.category?.toUpperCase() || 'DOMAIN'}</div>
      </div>
      
      {/* Timer */}
      <div className="mt-3 text-center">
        <Timer expiresAt={domain.rotationExpires} />
      </div>
      
      {/* Buy button */}
      <button 
        onClick={handlePurchase}
        className="w-full mt-3 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-green-500/25"
      >
        BUY
      </button>
    </div>
  );
}

// Domain Card Component
function DomainCard({ 
  title, 
  tier, 
  price, 
  img, 
  href 
}) {
  return (
    <div className="group bg-[#0d0f14]/70 backdrop-blur-md border border-[#1f2230] rounded-xl p-4 shadow-lg hover:shadow-[#00f2ff]/40 transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[#1b1e2a]">
        <img 
          src={img}
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-xl font-bold text-white tracking-wide">
        {title}
      </h3>

      {/* Tier */}
      <p className="text-[#00f2ff] text-sm">{tier}</p>

      {/* Price */}
      <p className="text-gray-400 text-sm mb-3">{price}</p>

      {/* CTA */}
      <Link
        to={href}
        className="inline-block mt-2 px-4 py-2 rounded-md bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30 hover:bg-[#00f2ff]/20 transition-all"
      >
        View Site
      </Link>
    </div>
  );
}

export default function MarketplacePage() {
  const [filters, setFilters] = useState({
    featured: false,
    available: false,
    vaulted: false,
    has_build: false,
    has_pfp: false
  });

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="marketplace"
        customTitle="Marketplace | Retailstar.sol - Buy Solana Domains & NFT Builds"
        customDescription="Browse and buy Solana domains, NFT builds, and premium .sol names. Secure your spot in the Retailverse."
        customKeywords="marketplace, buy .sol, Solana domains, NFT builds, SNS escrow"
      />
      
      {/* Background image */}
      <img
        src={bgImage}
        alt="Retailstar Marketplace Background"
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-80 z-0"
        style={{ filter: "brightness(0.7)" }}
        aria-hidden="true"
      />
      
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-black/60 z-0" aria-hidden="true"></div>
      
      {/* Main content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-4 neon-pulse solana-gradient">
            RETAILSTAR MARKETPLACE
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Premium domains with live sites, lore, and high-conviction builds
          </p>
          {/* Inventory status */}
          <div className="mt-4 text-sm text-gray-400">
            4 domains available • First come, first served
          </div>
          
          {/* Filter Controls */}
          <FilterControls 
            filters={filters} 
            setFilters={setFilters}
            availableFilters={['featured', 'available', 'vaulted', 'has_build', 'has_pfp']}
          />
        </div>

        {/* Mythic Worlds Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-violet-400">🧿 Mythic Worlds (15+ SOL Apex Builds)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DomainCard
              title="jpegdealer.sol"
              tier="Mythic"
              price="15+ SOL"
              img={jpegdealerImg}
              href="/domains/jpegdealer"
            />
            <DomainCard
              title="fudscience.sol"
              tier="Mythic"
              price="15+ SOL"
              img={fudscientistImg}
              href="/domains/fudscience"
            />
          </div>
        </div>

        {/* Mid-Grade Builds Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-cyan-400">💎 Mid-Grade Builds (3–5 SOL)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DomainCard
              title="jumpsetradio.sol"
              tier="Mid-Grade"
              price="3–5 SOL"
              img={jumpsetradioImg}
              href="/domains/jumpsetradio"
            />
            <DomainCard
              title="lurkerlife.sol"
              tier="Mid-Grade"
              price="3–5 SOL"
              img={lurkerlifeImg}
              href="/domains/lurkerlife"
            />
          </div>
        </div>

        {/* Offers & Promos Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-green-400">🔮 Offers & Promos (Coming Soon)</h2>
          </div>
          
          <div className="text-center py-12">
            <div className="text-gray-300 text-lg">
              Retailstar ecosystem drops and featured promotions will appear here soon.
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-8 px-4 mt-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-6 flex items-center justify-center gap-6">
              <img src={chevronUp} alt="Chevron Left" className="w-8 h-8 opacity-60" style={{ transform: 'rotate(-90deg)' }} />
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                RetailStar is a broadcast from Solana&apos;s underlayer — every domain is a node waiting to go live.
              </p>
              <img src={chevronUp} alt="Chevron Right" className="w-8 h-8 opacity-60" style={{ transform: 'rotate(90deg)' }} />
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                to="/scavrack"
                className="neon-green neon-green-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
              >
                🟢 Scav Rack
              </Link>
              <Link
                to="/"
                className="neon-purple neon-purple-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
              >
                🏠 Home
              </Link>
            </div>
            
            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link to="/wiki/retailverse" className="hover:text-cyan-400 transition-colors">
                📚 Wiki
              </Link>
              <Link to="/guide" className="hover:text-cyan-400 transition-colors">
                📖 Guide
              </Link>
              <Link to="/merch" className="hover:text-cyan-400 transition-colors">
                👕 Merch
              </Link>
              <Link to="/vote" className="hover:text-cyan-400 transition-colors">
                🗳️ Vote
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 