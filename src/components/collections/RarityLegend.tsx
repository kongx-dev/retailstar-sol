import React from 'react';

export const RarityLegend: React.FC = () => {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-6">
      <h3 className="text-lg font-semibold text-zinc-100 mb-4">
        Rarity Scoring System
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full border border-amber-300/60 text-amber-200 text-xs font-medium">
            90-100
          </span>
          <span className="text-zinc-300">Epic - Ultra-rare domains with exceptional value</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full border border-amber-300/60 text-amber-200 text-xs font-medium">
            60-89
          </span>
          <span className="text-zinc-300">Rare - High-quality domains with strong potential</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full border border-amber-300/60 text-amber-200 text-xs font-medium">
            30-59
          </span>
          <span className="text-zinc-300">Base - Solid domains with standard value</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full border border-amber-300/60 text-amber-200 text-xs font-medium">
            0-29
          </span>
          <span className="text-zinc-300">Common - Entry-level domains</span>
        </div>
      </div>
      <p className="mt-4 text-xs text-zinc-500">
        Rarity scores are calculated based on domain length, brandability, market demand, and historical sales data.
      </p>
    </div>
  );
};

