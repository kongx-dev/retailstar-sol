import React from 'react';

interface FilterControlsProps {
  filters: Record<string, boolean>;
  setFilters: (filters: Record<string, boolean>) => void;
  availableFilters?: string[];
}

const filterLabels = {
  featured: 'Featured',
  available: 'Available', 
  vaulted: 'Vaulted',
  has_build: 'Build',
  has_pfp: 'PFP',
  listed: 'Listed'
};

const filterIcons = {
  featured: '⭐',
  available: '🟢',
  vaulted: '🔒',
  has_build: '🛠',
  has_pfp: '🧢',
  listed: '📋'
};

export default function FilterControls({ 
  filters, 
  setFilters, 
  availableFilters = ['featured', 'available', 'vaulted', 'has_build', 'has_pfp'] 
}: FilterControlsProps) {
  const toggleFilter = (filterKey: string) => {
    setFilters({
      ...filters,
      [filterKey]: !filters[filterKey]
    });
  };

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-6">
      {availableFilters.map((filterKey) => {
        const isActive = filters[filterKey];
        const label = filterLabels[filterKey as keyof typeof filterLabels] || filterKey;
        const icon = filterIcons[filterKey as keyof typeof filterIcons] || '🔘';
        
        return (
          <button
            key={filterKey}
            onClick={() => toggleFilter(filterKey)}
            className={`
              px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200
              flex items-center gap-2 border-2
              ${isActive 
                ? 'bg-cyan-600 text-cyan-100 border-cyan-500 shadow-lg shadow-cyan-500/25' 
                : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
              }
              hover:scale-105
            `}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
            {isActive && <span className="text-xs">✓</span>}
          </button>
        );
      })}
    </div>
  );
}




