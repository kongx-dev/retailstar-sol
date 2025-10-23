import React, { useMemo } from 'react';
import { useDomains } from '../hooks/useDomains';
import { filterDomains, Domain } from '../data/domains.ts';
import DomainCard from './DomainCard';
import DomainLoadingSkeleton from './DomainLoadingSkeleton';
import DomainErrorFallback from './DomainErrorFallback';

interface FilteredCatalogViewProps {
  filterKey: keyof typeof filterDomains;
}

// Remove React.FC typing and use a plain function component
export default function FilteredCatalogView({ filterKey }: FilteredCatalogViewProps) {
  const { domains, loading, error } = useDomains({ listed: true });
  
  const filtered = useMemo(() => {
    if (!domains.length) return [];
    const list = filterDomains[filterKey](domains);
    // Sort: featured first, then by price descending (if available)
    return list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Sort by price (parseFloat, fallback to 0)
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;
      return priceB - priceA;
    });
  }, [filterKey, domains]);

  if (loading) {
    return <DomainLoadingSkeleton count={6} />;
  }

  if (error) {
    return <DomainErrorFallback error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {filtered.map((domain) => (
        <DomainCard
          key={domain.slug}
          domain={domain.name}
          price={domain.price}
          rarity={domain.rarity}
          tag={
            domain.category === 'premium'
              ? 'Premium'
              : domain.category === 'mid'
              ? 'Mid Tier'
              : domain.category === 'quickSnag'
              ? 'Quick Snag'
              : ''
          }
          hasSite={domain.hasWebsite}
          vaulted={domain.vaulted}
          forSale={domain.status === 'available'}
          flashRack={domain.flashRack}
          lore={domain.hasLore}
          className={
            (domain.redacted ? 'glitch blur-sm ' : '') +
            (domain.vaulted ? 'border-2 border-yellow-400 ' : '')
          }
          lockBadge={domain.vaulted}
        />
      ))}
    </div>
  );
} 