import React, { useState } from 'react';
import { getTierLore, TierLoreData } from '../data/tierLore';

export interface TierData {
  tier_name: string;
  requirements: string;
  duration: number;
  benefits: string[];
  areas: string[];
  visual_asset: string;
}

interface TierCardProps {
  tier: TierData;
  isActive: boolean;
  isUpgradeable?: boolean;
  onUpgrade?: () => void;
}

export default function TierCard({ 
  tier, 
  isActive, 
  isUpgradeable = false, 
  onUpgrade 
}: TierCardProps) {
  const [isLoreExpanded, setIsLoreExpanded] = useState(false);
  const tierLore = getTierLore(tier.tier_name);

  const getTierColor = (tierName: string) => {
    if (tierLore) {
      return `${tierLore.borderColor} ${tierLore.bgColor}`;
    }
    // Fallback for unknown tiers
    switch (tierName.toLowerCase()) {
      case 'tier 0':
        return 'border-blue-500 bg-blue-900/20';
      default:
        return 'border-cyan-400 bg-cyan-900/20';
    }
  };

  const getTierIcon = (tierName: string) => {
    if (tierLore) {
      return tierLore.icon;
    }
    // Fallback for unknown tiers
    return '⭐';
  };

  return (
    <div className={`
      relative p-6 rounded-lg border-2 transition-all duration-300
      ${getTierColor(tier.tier_name)}
      ${isActive ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-400/20' : ''}
      ${isUpgradeable ? 'hover:scale-105 cursor-pointer' : ''}
    `}>
      {/* Active badge */}
      {isActive && (
        <div className="absolute -top-2 -right-2 bg-cyan-400 text-black px-2 py-1 rounded-full text-xs font-bold">
          ACTIVE
        </div>
      )}

      {/* Tier header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{getTierIcon(tier.tier_name)}</span>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{tier.tier_name}</h3>
          {tierLore && (
            <p className="text-sm text-zinc-300 italic mt-1">{tierLore.shortDescription}</p>
          )}
          {!tierLore && (
            <p className="text-sm text-zinc-400">{tier.requirements}</p>
          )}
        </div>
      </div>

      {/* Lore Section */}
      {tierLore && (
        <div className="mb-4">
          <button
            onClick={() => setIsLoreExpanded(!isLoreExpanded)}
            className="w-full text-left p-3 bg-zinc-800/50 rounded border border-zinc-700 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-cyan-300">
                {isLoreExpanded ? '📖 Hide Lore' : '📖 Read Lore'}
              </span>
              <span className="text-zinc-400 text-xs">
                {isLoreExpanded ? '▲' : '▼'}
              </span>
            </div>
          </button>
          {isLoreExpanded && (
            <div className="mt-3 p-4 bg-zinc-900/50 rounded border border-zinc-700/50">
              <p className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed">
                {tierLore.fullLore}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Requirements (if no lore) */}
      {!tierLore && tier.requirements && (
        <div className="mb-4">
          <p className="text-sm text-zinc-400">{tier.requirements}</p>
        </div>
      )}

      {/* Duration */}
      {tier.duration > 0 && (
        <div className="mb-4 p-2 bg-zinc-800/50 rounded text-sm">
          <span className="text-zinc-400">Duration: </span>
          <span className="text-cyan-300">{tier.duration} days</span>
        </div>
      )}

      {/* Benefits */}
      {tier.benefits && tier.benefits.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-cyan-300 mb-2">Benefits</h4>
          <ul className="space-y-1">
            {tier.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-zinc-300">
                <span className="text-green-400">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Areas */}
      {tier.areas && tier.areas.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-cyan-300 mb-2">Access Areas</h4>
          <div className="flex flex-wrap gap-1">
            {tier.areas.map((area, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-zinc-700 text-xs rounded text-zinc-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Visual asset */}
      {tier.visual_asset && (
        <div className="mb-4">
          <div className="w-full h-16 bg-zinc-800 rounded flex items-center justify-center text-2xl">
            {tier.visual_asset}
          </div>
        </div>
      )}

      {/* Upgrade button */}
      {isUpgradeable && onUpgrade && (
        <button
          onClick={onUpgrade}
          className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Upgrade to {tier.tier_name}
        </button>
      )}
    </div>
  );
}





