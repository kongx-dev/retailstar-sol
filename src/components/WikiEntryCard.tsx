import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import DomainCard from './DomainCard';

// Lazy load components
const ToneBadge = lazy(() => import('./ToneBadge'));
const FlavoredTooltip = lazy(() => import('./FlavoredTooltip'));

interface DepartmentInfo {
  name?: string;
  icon?: string;
  flavor_text?: string;
  toneCategory?: string;
}

interface WikiEntryCardProps {
  domain: {
    id?: number;
    name: string;
    slug: string;
    description: string;
    image_url?: string;
    price?: string;
    rarity?: 'epic' | 'rare' | 'base';
    category?: string;
    hasWebsite?: boolean;
    has_build?: boolean;
    vaulted?: boolean;
    forSale?: boolean;
    available?: boolean;
    listed?: boolean;
    featured?: boolean;
    has_pfp?: boolean;
    flashRack?: boolean;
    hasLore?: boolean;
    departmentSlugs?: string[];
    [key: string]: any;
  };
  departmentsMap?: Record<string, DepartmentInfo>; // Map of slug -> minimal department data
}

const WikiEntryCard: React.FC<WikiEntryCardProps> = React.memo(function WikiEntryCard({ domain, departmentsMap = {} }) {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  // Determine tier based on category
  const getTier = () => {
    if (domain.vaulted) return 'vaulted-premium';
    if (domain.category === 'premium') return 'vaulted-premium';
    if (domain.category === 'mid') return 'blueprint-tier';
    if (domain.category === 'quickSnag' || domain.category === 'scav') return 'quick-snag';
    if (domain.flashRack) return 'flash-rack';
    return 'quick-snag';
  };

  const getTag = () => {
    if (domain.category === 'premium') return 'Premium';
    if (domain.category === 'mid') return 'Mid Tier';
    if (domain.category === 'quickSnag' || domain.category === 'scav') return 'Quick Snag';
    return '';
  };

  // Get primary department tone category
  const getPrimaryToneCategory = () => {
    if (!domain.departmentSlugs || domain.departmentSlugs.length === 0) return null;
    const firstDept = departmentsMap[domain.departmentSlugs[0]];
    return firstDept?.toneCategory || null;
  };

  const primaryToneCategory = getPrimaryToneCategory();

  return (
    <div className="relative group">
      {/* Department Badges with Icons and Tooltips */}
      {domain.departmentSlugs && domain.departmentSlugs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 relative">
          {domain.departmentSlugs.map((deptSlug) => {
            const dept = departmentsMap[deptSlug];
            const deptName = dept?.name || deptSlug.replace(/-/g, ' ');
            const deptIcon = dept?.icon || '🏪';
            const flavorText = dept?.flavor_text;

            return (
              <Suspense key={deptSlug} fallback={null}>
                <FlavoredTooltip text={flavorText}>
                  <Link
                    to={`/directory/dept/${deptSlug}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                               bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 
                               hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-cyan-200
                               transition-opacity duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{deptIcon}</span>
                    <span>{deptName}</span>
                  </Link>
                </FlavoredTooltip>
              </Suspense>
            );
          })}
        </div>
      )}

      {/* Tone Category Badge */}
      {primaryToneCategory && (
        <div className="mb-2">
          <Suspense fallback={<div className="text-xs text-neutral-500 animate-pulse">Loading…</div>}>
            <ToneBadge category={primaryToneCategory} showAll={false} />
          </Suspense>
        </div>
      )}

      {/* Domain Card - wrapped in link to wiki page */}
      <Link to={`/wiki/${domain.slug}`} className="block">
        <DomainCard
          domain={domain.name}
          price={domain.price || 'N/A'}
          rarity={domain.rarity || 'base'}
          tag={getTag()}
          hasSite={domain.hasWebsite || domain.has_build || false}
          vaulted={domain.vaulted || false}
          forSale={domain.available || domain.listed || false}
          flashRack={domain.flashRack || false}
          lore={domain.hasLore || false}
          tier={getTier()}
          featured={domain.featured || false}
          has_build={domain.has_build || false}
          has_pfp={domain.has_pfp || false}
          listed={domain.listed || false}
          className="hover:scale-105 transition-transform duration-200"
        />
      </Link>
    </div>
  );
});

export default WikiEntryCard;

