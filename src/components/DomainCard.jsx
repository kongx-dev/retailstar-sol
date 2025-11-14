import React, { useState } from "react";
import "./domain-card.css";
import TierInfoModal from './TierInfoModal';
import StatusBadges from './ui/StatusBadges';

/**
 * @typedef {Object} DomainCardProps
 * @property {string} domain
 * @property {string} price
 * @property {"epic"|"rare"|"base"} rarity
 * @property {string} tag
 * @property {boolean} [hasSite]
 * @property {boolean} [vaulted]
 * @property {boolean} [forSale]
 * @property {boolean} [flashRack]
 * @property {boolean} [lore]
 * @property {string} [className]
 * @property {boolean} [lockBadge]
 * @property {string} [tier] - New tier system: 'vaulted-premium', 'blueprint-tier', 'quick-snag', 'flash-rack'
 */

/**
 * @param {DomainCardProps} props
 */
function DomainCard({
  domain,
  price,
  rarity,         // 'epic' | 'rare' | 'base'
  tag,            // 'Premium' | 'Mid Tier' | 'Quick Snag'
  hasSite = false,
  vaulted = false,
  forSale = false,
  flashRack = false,
  lore = false,
  className = '',
  lockBadge = false,
  tier = 'quick-snag', // Default tier
  featured = false,
  has_build = false,
  has_pfp = false,
  listed = false
}) {
  const [showModal, setShowModal] = useState(false);

  // New tier system styling
  const tierStyles = {
    'vaulted-premium': 'border-purple-500 bg-purple-950/20 text-purple-100',
    'blueprint-tier': 'border-blue-400 bg-blue-950/20 text-blue-100',
    'quick-snag': 'border-green-400 bg-green-950/20 text-green-100',
    'flash-rack': 'border-yellow-400 bg-yellow-950/20 text-yellow-100 animate-pulse',
  };

  const tierLabels = {
    'vaulted-premium': '🟣 VAULTED PREMIUM',
    'blueprint-tier': '🔵 BLUEPRINT TIER',
    'quick-snag': '🟢 QUICK SNAG',
    'flash-rack': '⚡ FLASH RACK',
  };

  const tierDescriptions = {
    'vaulted-premium': 'Includes full Retailstar website, animated visuals, and deep lore integration.',
    'blueprint-tier': 'Domain only. Upgradeable to a full site later. Reserved listing with "coming soon" status.',
    'quick-snag': 'No build. No support. Loot only. You\'re on your own — and that\'s the thrill.',
    'flash-rack': 'Chaos drop. Limited time. May disappear at any moment.',
  };

  const rarityClass = `rarity-${rarity}`;
  // Label tag mapping based on main tag
  const tagMap = {
    "Premium": "tag-premium",
    "Mid Tier": "tag-mid",
    "Quick Snag": "tag-base"
  };

  return (
    <div className={`domain-card ${rarityClass} ${className} ${tierStyles[tier]} rounded-xl border-2 p-4 shadow-lg`} style={{position: 'relative'}}>
      {/* Status Badges */}
      <StatusBadges 
        domain={{ 
          featured, 
          vaulted, 
          listed, 
          has_build, 
          has_pfp,
          category: tier === 'quick-snag' ? 'scav' : 'marketplace'
        }} 
        showCategory={true} 
      />
      
      {/* Tier Label (clickable) */}
      <div 
        className="text-sm font-bold tracking-wide mb-2 cursor-pointer hover:underline transition-colors"
        onClick={() => setShowModal(true)}
      >
        {tierLabels[tier]}
      </div>
      
      {/* Domain name */}
      <h3 className="text-2xl font-semibold mb-2">
        {domain}
      </h3>
      
      {/* Price */}
      {forSale && (
        <p className="text-xs mt-1 opacity-80 mb-3">
          Price: {vaulted ? '? SOL' : price.replace(/\s*SOL\s*$/i, '') + ' SOL'}
        </p>
      )}
      
      {/* Tier-specific content */}
      {tier === 'blueprint-tier' && (
        <>
          <p className="mt-2 text-xs italic text-blue-200">Upgradeable to full Retailstar build</p>
          <button 
            className="mt-3 text-blue-300 underline text-sm hover:text-blue-200 transition-colors" 
            onClick={() => alert('Upgrade flow coming soon!')}
          >
            Upgrade to Vaulted Premium
          </button>
        </>
      )}

      {tier === 'quick-snag' && (
        <p className="mt-2 text-xs italic text-green-300">Loot only. No build. No support. No regrets.</p>
      )}

      {tier === 'vaulted-premium' && (
        <p className="mt-2 text-xs italic text-purple-300">Includes full website, visuals, and lore integration</p>
      )}

      {tier === 'flash-rack' && (
        <p className="mt-2 text-xs italic text-yellow-300">Flash deal. Limited time. Chaos pricing.</p>
      )}
      
      {/* Legacy Tags (bottom) */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "4px",
        marginTop: "12px"
      }}>
        <span className={`tag ${hasSite ? "tag-website" : "tag-nowebsite"}`}>
          {hasSite ? "Website" : "No Website"}
        </span>
        <span className={`tag ${forSale ? "tag-sale" : "tag-unavailable"}`}>
          {forSale ? "For Sale" : "Unavailable"}
        </span>
        {flashRack && <span className="tag tag-flash">⚡ Flash Rack</span>}
        {lore && <span className="tag tag-lore">✨ Lore Domain</span>}
        {vaulted && <span className="tag tag-vaulted">🔒 Vaulted</span>}
      </div>
      
      {/* CTA Button */}
      {forSale && (
        <a
          href={`https://x.com/messages/compose?recipient_id=1689270192859781120`}
          className="buy-button mt-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          {vaulted ? 'DM to Inquire' : 'DM to Buy'}
        </a>
      )}

      {/* Tier Info Modal */}
      {showModal && (
        <TierInfoModal
          tier={tier}
          title={tierLabels[tier]}
          description={tierDescriptions[tier]}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default DomainCard; 