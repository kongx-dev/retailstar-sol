import React from "react";
import "./domain-card.css";

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
  lockBadge = false
}) {
  const rarityClass = `rarity-${rarity}`;
  // Label tag mapping based on main tag
  const tagMap = {
    "Premium": "tag-premium",
    "Mid Tier": "tag-mid",
    "Quick Snag": "tag-base"
  };

  return (
    <div className={`domain-card ${rarityClass} ${className}`} style={{position: 'relative'}}>
      {/* Tag label (top left corner) */}
      <div className={`tag ${tagMap[tag] || "tag-base"}`} style={{position: 'absolute', top: 10, left: 10}}>
        {tag}
      </div>
      {/* Vaulted/Unvaulted tag (top right corner) */}
      <div className={`tag ${vaulted ? "tag-vaulted" : "tag-unvaulted"}`} style={{position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: '2px'}}>
        {lockBadge && <span style={{marginRight: 2}}>🔒</span>}
        {vaulted ? 'Vaulted' : 'Unvaulted'}
      </div>
      {/* Domain name */}
      <h3 style={{ fontWeight: 600, fontSize: "16px", marginTop: "32px" }}>
        {domain}
      </h3>
      {/* Rarity Tags / Meta Grid (no vaulted/unvaulted here) */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "4px",
        marginTop: "6px"
      }}>
        <span className={`tag ${hasSite ? "tag-website" : "tag-nowebsite"}`}>
          {hasSite ? "Website" : "No Website"}
        </span>
        <span className={`tag ${forSale ? "tag-sale" : "tag-unavailable"}`}>
          {forSale ? "For Sale" : "Unavailable"}
        </span>
        {flashRack && <span className="tag tag-flash">⚡ Flash Rack</span>}
        {lore && <span className="tag tag-lore">✨ Lore Domain</span>}
      </div>
      {/* Price & CTA */}
      {forSale && (
        <>
          <div className="price" style={{ marginTop: "10px" }}>
            {vaulted ? '? SOL' : price.replace(/\s*SOL\s*$/i, '') + ' SOL'}
          </div>
          <a
            href={`https://x.com/messages/compose?recipient_id=1689270192859781120`}
            className="buy-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            {vaulted ? 'DM to Inquire' : 'DM to Buy'}
          </a>
        </>
      )}
    </div>
  );
}

export default DomainCard; 