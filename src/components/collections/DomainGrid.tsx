import React from 'react';
import { DomainRecord } from '../../types/domain';
import { CollectionTheme } from '../../types/collections';
import { DomainCard } from './DomainCard';

interface DomainGridProps {
  domains: DomainRecord[];
  theme: CollectionTheme;
}

export const DomainGrid: React.FC<DomainGridProps> = ({ domains, theme }) => {
  if (!domains.length) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-zinc-500">
          No domains in this collection yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {domains.map((domain) => (
        <DomainCard key={domain.id} domain={domain} theme={theme} />
      ))}
    </div>
  );
};

