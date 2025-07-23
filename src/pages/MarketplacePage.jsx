import React, { useEffect, useState } from "react";
import { domains as allDomains, getAvailableForSale } from '../data/domains';
import { mythicDomains } from '../data/mythicDomains';
import bgImage from "../assets/chowdown.png";
import chevronUp from "../assets/chevron.png";
import SEOHead from '../components/SEOHead';
import SNSRedirectModal from '../components/SNSRedirectModal';
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
function isMythicDomain(domain) {
  return mythicDomains.some(mythic => mythic.name === domain.name);
}

// Helper to check if domain is Featured
function isFeaturedDomain(domain) {
  return domain.category === 'premium' || domain.category === 'mid';
}

// Get Mythic domains
function getMythicDomains() {
  return getAvailableDomains().filter(isMythicDomain);
}

// Get Featured domains
function getFeaturedDomains() {
  return getAvailableDomains().filter(isFeaturedDomain).slice(0, 6);
}

// Get Flash offers
function getFlashOffers() {
  return getAvailableDomains().filter(domain => domain.category === 'flash').slice(0, 12);
}

// Timer component
function Timer({ expiresAt, onExpire }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!expiresAt) return;

    const calculateTimeLeft = () => {
      const difference = new Date(expiresAt).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onExpire?.();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

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
  const [showSNSModal, setShowSNSModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);

  // Refresh inventory when domains are purchased
  const handleDomainPurchase = (domainSlug) => {
    setSelectedDomain(domainSlug);
    setShowSNSModal(true);
  };

  const handleSNSModalClose = () => {
    setShowSNSModal(false);
    setSelectedDomain(null);
  };

  // Load domains on mount
  useEffect(() => {
    const loadDomains = () => {
      const newMythic = getMythicDomains();
      const newFeatured = getFeaturedDomains();
      const newFlash = getFlashOffers();
      
      setMythicDomains(newMythic);
      setFeaturedDomains(newFeatured);
      setFlashOffers(newFlash);
      setLoading(false);
    };

    loadDomains();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-cyan-400">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="marketplace"
        customTitle="Marketplace | Retailstar.sol - Premium Domain Collection"
        customDescription="Browse our curated collection of premium .sol domains. From mythic artifacts to quick snags, find your perfect digital real estate."
        customKeywords="solana domains, marketplace, premium domains, mythic domains, retailstar"
        imageUrl="https://retailstar.sol/src/assets/rs-logo.png"
        canonicalUrl="https://retailstar.sol/marketplace"
        ogImage="https://retailstar.sol/src/assets/rs-logo.png"
        twitterImage="https://retailstar.sol/src/assets/rs-logo.png"
      />

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImage} 
          alt="Marketplace Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <section className="py-20 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 neon-cyan drop-shadow-neon">
            Marketplace
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Premium .sol domains curated by Retailstar Mall
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/scavrack"
              className="neon-green neon-green-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
            >
              🟢 Scav Rack
            </Link>
            <Link
              to="/vault"
              className="neon-purple neon-purple-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-lg"
            >
              🔒 Vaulted Domains
            </Link>
          </div>
        </section>

        {/* Mythic Section */}
        {mythicDomains.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 neon-purple">
                🧿 Mythic Artifacts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mythicDomains.map((domain) => (
                  <MythicDomainCard 
                    key={domain.slug} 
                    domain={domain} 
                    onPurchase={handleDomainPurchase}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Featured Section */}
        {featuredDomains.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 neon-cyan">
                ⭐ Featured Domains
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredDomains.map((domain) => (
                  <FeaturedDomainCard 
                    key={domain.slug} 
                    domain={domain} 
                    onPurchase={handleDomainPurchase}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Flash Offers Section */}
        {flashOffers.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 neon-orange">
                ⚡ Flash Offers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {flashOffers.map((domain) => (
                  <OfferTile 
                    key={domain.slug} 
                    domain={domain} 
                    onPurchase={handleDomainPurchase}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer CTA */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 neon-green">
              Ready to claim your domain?
            </h3>
            <p className="text-gray-300 mb-8">
              All purchases are processed through SNS for security and transparency.
            </p>
            <Link
              to="/scavrack"
              className="neon-green neon-green-hover py-4 px-8 rounded-lg font-semibold transition-all duration-200 text-lg inline-block"
            >
              🟢 Browse Scav Rack
            </Link>
          </div>
        </section>
      </div>

      {/* SNS Redirect Modal */}
      <SNSRedirectModal
        isOpen={showSNSModal}
        onClose={handleSNSModalClose}
        domainName={selectedDomain}
      />
    </div>
  );
} 