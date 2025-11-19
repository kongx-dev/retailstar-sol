import React, { useState, useEffect } from 'react';
import { DomainRecord } from '../../types/domain';

type SortOption = 'rarity' | 'price' | 'newest';
type FilterOption = 'all' | 'vaulted' | 'available';

interface CollectionFilterBarProps {
  allDomains: DomainRecord[];
  onFilteredChange: (filtered: DomainRecord[]) => void;
}

export const CollectionFilterBar: React.FC<CollectionFilterBarProps> = ({
  allDomains,
  onFilteredChange,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('rarity');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  useEffect(() => {
    let filtered = [...allDomains];

    // Apply filter
    if (filterBy === 'vaulted') {
      filtered = filtered.filter((d) => d.isVaulted);
    } else if (filterBy === 'available') {
      filtered = filtered.filter((d) => d.status === 'available');
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rarity':
          const rarityA = a.rarityScore ?? 0;
          const rarityB = b.rarityScore ?? 0;
          return rarityB - rarityA;
        case 'price':
          return b.priceSol - a.priceSol;
        case 'newest':
          // Assuming newer domains have higher IDs or isNew flag
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        default:
          return 0;
      }
    });

    onFilteredChange(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, filterBy, allDomains]);

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center py-4 border-b border-zinc-800 bg-zinc-950/30">
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-400">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="rarity">Rarity</option>
          <option value="price">Price</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-400">Filter:</span>
        <div className="flex gap-2">
          {(['all', 'vaulted', 'available'] as FilterOption[]).map((option) => (
            <button
              key={option}
              onClick={() => setFilterBy(option)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterBy === option
                  ? 'bg-amber-600 text-amber-100 border border-amber-500'
                  : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

