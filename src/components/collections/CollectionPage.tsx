import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CollectionPageConfig } from '../../types/collections';
import { DomainRecord } from '../../types/domain';
import { filterDomainsForCollection } from '../../lib/filterDomainsForCollection';
import { DomainGrid } from './DomainGrid';
import { CollectionFilterBar } from './CollectionFilterBar';
import { RarityLegend } from './RarityLegend';
import { LoreSection } from './LoreSection';
import { CollectionFAQ } from './CollectionFAQ';
import SEOHead from '../SEOHead';

interface CollectionPageProps {
  config: CollectionPageConfig;
  allDomains: DomainRecord[];
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  config,
  allDomains,
}) => {
  // Filter domains based on collection config
  const filteredDomains = useMemo(
    () => filterDomainsForCollection(allDomains, config),
    [allDomains, config]
  );

  // State for filter bar (if enabled)
  const [displayedDomains, setDisplayedDomains] = useState<DomainRecord[]>(filteredDomains);

  // Update displayed domains when filtered domains change
  useEffect(() => {
    setDisplayedDomains(filteredDomains);
  }, [filteredDomains]);

  // Memoize the callback to prevent infinite loops in CollectionFilterBar
  const handleFilteredChange = useCallback((filtered: DomainRecord[]) => {
    setDisplayedDomains(filtered);
  }, []);

  // Background variant rendering
  const renderBackground = () => {
    switch (config.backgroundVariant) {
      case 'grid':
        return (
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </div>
        );
      case 'smoke':
        return (
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
          </div>
        );
      case 'scanlines':
        return (
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
              }}
            />
          </div>
        );
      case 'gradient':
        return (
          <div className="absolute inset-0 opacity-40">
            <div className="h-full w-full bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead
        customTitle={config.seo.title}
        customDescription={config.seo.description}
        canonicalUrl={`https://retailstar.xyz${config.seo.canonicalPath}`}
      />

      <main className="min-h-screen bg-black text-zinc-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-zinc-800">
          {/* Background layer */}
          {renderBackground()}

          <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              {config.hero.eyebrow && (
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">
                  {config.hero.eyebrow}
                </p>
              )}
              <h1 className="text-3xl font-semibold md:text-4xl text-zinc-50">
                {config.hero.h1}
              </h1>
              {config.hero.subheading && (
                <p className="text-sm text-zinc-400">
                  {config.hero.subheading}
                </p>
              )}
              {config.hero.tagline && (
                <p className="text-xs text-zinc-500">
                  {config.hero.tagline}
                </p>
              )}
            </div>

            {config.primaryCtaLabel && config.primaryCtaHref && (
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={config.primaryCtaHref}
                className={`mt-4 inline-flex items-center rounded-full border border-amber-300/70 px-4 py-2 text-sm font-medium text-amber-100 transition-all ${
                  config.neonGlowClass ?? ''
                }`}
              >
                {config.primaryCtaLabel}
              </motion.a>
            )}
          </div>
        </section>

        {/* Filters */}
        {config.showFilters && (
          <CollectionFilterBar
            allDomains={filteredDomains}
            onFilteredChange={handleFilteredChange}
          />
        )}

        {/* Domain grid */}
        <section className="mx-auto max-w-6xl px-4 py-8">
          <DomainGrid domains={displayedDomains} theme={config.theme} />
        </section>

        {/* Optional: Rarity legend */}
        {config.showRarityLegend && (
          <section className="mx-auto max-w-6xl px-4 pb-8">
            <RarityLegend />
          </section>
        )}

        {/* Optional: Lore section */}
        {config.showLoreSection && config.loreSectionTitle && (
          <section className="mx-auto max-w-4xl px-4 pb-8">
            <LoreSection
              title={config.loreSectionTitle}
              body={config.loreSectionBody ?? ''}
            />
          </section>
        )}

        {/* Optional: FAQ */}
        {config.showFAQ && config.faqItems && (
          <section className="mx-auto max-w-4xl px-4 pb-12">
            <CollectionFAQ items={config.faqItems} />
          </section>
        )}
      </main>
    </>
  );
};

