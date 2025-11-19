import { DomainRecord } from '../types/domain';
import { CollectionPageConfig } from '../types/collections';

/**
 * Filters domains based on collection configuration
 */
export function filterDomainsForCollection(
  allDomains: DomainRecord[],
  config: CollectionPageConfig
): DomainRecord[] {
  return allDomains
    .filter((d) => {
      // Required tags: domain must have ALL required tags
      if (config.requiredTags?.length) {
        const hasAll = config.requiredTags.every((tag) =>
          d.tags.includes(tag)
        );
        if (!hasAll) return false;
      }

      // Excluded tags: domain must not have ANY excluded tags
      if (config.excludedTags?.length) {
        if (d.tags.some((tag) => config.excludedTags!.includes(tag))) {
          return false;
        }
      }

      // Minimum rarity score
      if (config.minRarityScore !== undefined) {
        const score = d.rarityScore ?? 0;
        if (score < config.minRarityScore) return false;
      }

      // Tier whitelist: domain must be in allowed tiers
      if (config.tierWhitelist?.length) {
        if (!config.tierWhitelist.includes(d.tier)) return false;
      }

      return true;
    })
    // Sort: featured first, then by rarity score (descending), then by price (descending)
    .sort((a, b) => {
      // Featured domains first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;

      // Then by rarity score (higher is better)
      const rarityA = a.rarityScore ?? 0;
      const rarityB = b.rarityScore ?? 0;
      if (rarityB !== rarityA) return rarityB - rarityA;

      // Then by price (higher is better)
      const priceA = a.priceSol ?? 0;
      const priceB = b.priceSol ?? 0;
      return priceB - priceA;
    });
}

