import React, { useEffect, useState } from "react";
import { domains as allDomains, getAvailableForSale } from '../data/domains';
import { mythicDomains } from '../data/mythicDomains';
import bgImage from "../assets/chowdown.png";
import chevronUp from "../assets/chevron.png";
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom'; // Added Link import

// Import domain images
import jpegdealerImg from "../assets/jpegdealer.png";
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

// Helper to get Mythic domains
function getMythicDomains() {
  const available = getAvailableDomains();
  return available.filter(isMythic).map(d => ({
    ...d,
    rotationGroup: "mythic",
    rotationExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
  }));
}

// Helper to get featured domains (weekly rotation) - exclude Mythic
function getFeaturedDomains() {
  const available = getAvailableDomains();
  const featured = available.filter(d => d.featured === true && !isMythic(d));
  return featured.slice(0, 2).map(d => ({
    ...d,
    rotationGroup: "featured",
    rotationExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
  }));
}

// Helper to get flash offers (daily rotation) - exclude Mythic
function getFlashOffers() {
  const available = getAvailableDomains();
  const flash = available.filter(d => (d.flashOnly === true || d.category === 'flashRack') && !isMythic(d));
  return flash.slice(0, 6).map(d => ({
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
  const imageSrc = domainImages[imageKey] || domainImages.jpegdealer;

  return (
    <div className="relative group cursor-pointer">
      <div className="bg-gradient-to-br from-purple-800 to-violet-900 border border-violet-600 rounded-xl p-6 shadow-xl hover:animate-glow transition-all">
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
          <div className="text-orange-400 text-xs font-bold mb-2">🔥 Featured</div>
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
  const imageSrc = domainImages[imageKey] || domainImages.jpegdealer;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/25 transition-all duration-200">
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
  const imageSrc = domainImages[imageKey] || domainImages.jpegdealer;

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

export default function MarketplacePage() {
  const [mythicDomains, setMythicDomains] = useState([]);
  const [featuredDomains, setFeaturedDomains] = useState([]);
  const [flashOffers, setFlashOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refresh inventory when domains are purchased
  const handleDomainPurchase = (domainSlug) => {
    
    // Update the available domains
    const newMythic = getMythicDomains();
    const newFeatured = getFeaturedDomains();
    const newFlash = getFlashOffers();
    
    setMythicDomains(newMythic);
    setFeaturedDomains(newFeatured);
    setFlashOffers(newFlash);
    
    // Show purchase notification
            // console.log(`🎉 ${domainSlug}.sol has been purchased!`);
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setMythicDomains(getMythicDomains());
      setFeaturedDomains(getFeaturedDomains());
      setFlashOffers(getFlashOffers());
      setLoading(false);
    }, 500);
  }, []);

  // Listen for storage changes (in case another tab purchases)
  useEffect(() => {
    const handleStorageChange = () => {
      setMythicDomains(getMythicDomains());
      setFeaturedDomains(getFeaturedDomains());
      setFlashOffers(getFlashOffers());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
            {mythicDomains.length + featuredDomains.length + flashOffers.length} domains available • First come, first served
          </div>
        </div>

        {/* Mythic Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-violet-400">🧿 MYTHIC</h2>
            <div className="text-sm text-gray-400">
              {mythicDomains.length > 0 ? `${mythicDomains.length} available` : 'All sold out'}
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="h-48 bg-slate-800/50 rounded-xl animate-pulse border border-slate-700"></div>
              ))}
            </div>
          ) : mythicDomains.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mythicDomains.map((domain, idx) => (
                <MythicDomainCard 
                  key={`${domain.name}-${idx}`} 
                  domain={domain} 
                  onPurchase={handleDomainPurchase}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-2xl font-bold text-gray-500 mb-2">SOLD OUT</div>
              <div className="text-gray-400">All mythic domains have been claimed</div>
            </div>
          )}
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-400">FEATURED</h2>
            <div className="text-sm text-gray-400">
              {featuredDomains.length > 0 ? `${featuredDomains.length} available` : 'All sold out'}
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="h-48 bg-slate-800/50 rounded-xl animate-pulse border border-slate-700"></div>
              ))}
            </div>
          ) : featuredDomains.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredDomains.map((domain, idx) => (
                <FeaturedDomainCard 
                  key={`${domain.name}-${idx}`} 
                  domain={domain} 
                  onPurchase={handleDomainPurchase}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-2xl font-bold text-gray-500 mb-2">SOLD OUT</div>
              <div className="text-gray-400">All featured domains have been claimed</div>
            </div>
          )}
        </div>

        {/* Offers Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-400">OFFERS</h2>
            <div className="text-sm text-gray-400">
              {flashOffers.length > 0 ? `${flashOffers.length} available` : 'All sold out'}
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 bg-slate-800/50 rounded-lg animate-pulse border border-slate-700"></div>
              ))}
            </div>
          ) : flashOffers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {flashOffers.map((domain, idx) => (
                <OfferTile 
                  key={`${domain.name}-${idx}`} 
                  domain={domain} 
                  onPurchase={handleDomainPurchase}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-2xl font-bold text-gray-500 mb-2">SOLD OUT</div>
              <div className="text-gray-400">All offer domains have been claimed</div>
            </div>
          )}
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