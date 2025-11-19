import React from 'react';
import { Link } from 'react-router-dom';
import { DomainRecord } from '../../types/domain';
import { CollectionTheme } from '../../types/collections';

interface DomainCardProps {
  domain: DomainRecord;
  theme: CollectionTheme;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, theme }) => {
  // Theme-specific styling
  const getThemeBorder = () => {
    switch (theme) {
      case 'meme':
        return 'border-pink-500/50 hover:border-pink-400';
      case 'cyberpunk':
        return 'border-cyan-500/50 hover:border-cyan-400';
      case 'brand':
        return 'border-blue-500/50 hover:border-blue-400';
      case 'premium_vault':
        return 'border-purple-500/50 hover:border-purple-400';
      case 'short':
        return 'border-amber-500/50 hover:border-amber-400';
      case 'emoji':
        return 'border-yellow-500/50 hover:border-yellow-400';
      case 'ai_tech':
        return 'border-green-500/50 hover:border-green-400';
      case 'defi':
        return 'border-indigo-500/50 hover:border-indigo-400';
      case 'gaming':
        return 'border-red-500/50 hover:border-red-400';
      case 'degen':
        return 'border-orange-500/50 hover:border-orange-400';
      case 'dao':
        return 'border-teal-500/50 hover:border-teal-400';
      case 'creator':
        return 'border-rose-500/50 hover:border-rose-400';
      case 'aesthetic':
        return 'border-violet-500/50 hover:border-violet-400';
      case 'lore':
        return 'border-slate-500/50 hover:border-slate-400';
      case 'scav':
        return 'border-zinc-500/50 hover:border-zinc-400';
      default:
        return 'border-zinc-800 hover:border-zinc-700';
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${getThemeBorder()} bg-zinc-950/70 p-4 transition-all duration-300 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-zinc-50 truncate">
            {domain.name}
          </h2>
          {domain.shortDescription && (
            <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
              {domain.shortDescription}
            </p>
          )}
        </div>
        {domain.rarityScore != null && (
          <span className="rounded-full border border-amber-300/60 px-2 py-0.5 text-[10px] text-amber-200 whitespace-nowrap">
            Rarity {domain.rarityScore}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
        <span className="font-medium">{domain.priceSol} SOL</span>
        {domain.status === 'available' ? (
          <Link
            to={domain.marketplaceUrl || `/domains/${domain.slug}`}
            className="text-[11px] font-medium text-amber-300 hover:text-amber-200 transition-colors"
          >
            View Listing →
          </Link>
        ) : (
          <span className="text-[11px] text-zinc-500">
            {domain.status === 'sold' ? 'Sold' : 'Pending'}
          </span>
        )}
      </div>

      {domain.isVaulted && (
        <div className="absolute top-2 right-2">
          <span className="text-xs px-2 py-0.5 bg-purple-900/50 text-purple-200 rounded border border-purple-700/50">
            Vaulted
          </span>
        </div>
      )}

      {domain.isFeatured && (
        <div className="absolute top-2 left-2">
          <span className="text-xs px-2 py-0.5 bg-amber-900/50 text-amber-200 rounded border border-amber-700/50">
            Featured
          </span>
        </div>
      )}
    </div>
  );
};

