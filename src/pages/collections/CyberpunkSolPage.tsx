import React from 'react';
import { CollectionPage } from '../../components/collections/CollectionPage';
import { collectionConfigs } from '../../data/collectionConfigs';
import { useDomains } from '../../hooks/useDomains';
import { adaptDomainsToRecords } from '../../lib/adaptDomainToRecord';

export default function CyberpunkSolPage() {
  const { domains, loading } = useDomains({ listed: true });
  const cyberpunkConfig = collectionConfigs.find((c) => c.id === 'cyberpunk-sol')!;
  const domainRecords = adaptDomainsToRecords(domains);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 font-semibold">Loading domains...</p>
        </div>
      </div>
    );
  }

  return <CollectionPage config={cyberpunkConfig} allDomains={domainRecords} />;
}

