import { Domain } from './supabase';
import { DomainRecord, DomainTier } from '../types/domain';

/**
 * Maps existing Domain category to DomainTier
 */
function mapCategoryToTier(category: string): DomainTier {
  switch (category.toLowerCase()) {
    case 'premium':
    case 'vaulted':
      return 'premium';
    case 'mid':
      return 'mid';
    case 'scav':
    case 'basement':
    case 'flashrack':
    case 'quicksnag':
      return 'scav';
    default:
      // Try to infer from other fields
      return 'mid';
  }
}

/**
 * Parses price string (e.g., "5 SOL", "10.5 SOL") to number
 */
function parsePriceSol(price: string): number {
  if (!price) return 0;
  const match = price.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Calculates rarity score from rarity enum
 */
function calculateRarityScore(rarity?: string): number | undefined {
  if (!rarity) return undefined;
  switch (rarity.toLowerCase()) {
    case 'epic':
      return 90;
    case 'rare':
      return 60;
    case 'base':
      return 30;
    default:
      return undefined;
  }
}

/**
 * Converts a Domain from Supabase to DomainRecord for collection pages
 */
export function adaptDomainToRecord(domain: Domain): DomainRecord {
  const priceSol = parsePriceSol(domain.price || '0');
  const tier = mapCategoryToTier(domain.category || 'mid');
  const rarityScore = calculateRarityScore(domain.rarity);

  // Generate marketplace URL (assuming pattern: /domains/{slug})
  const marketplaceUrl = `/domains/${domain.slug}`;

  // Map status
  let status: 'available' | 'pending' | 'sold' | undefined;
  if (domain.status === 'available') {
    status = 'available';
  } else if (domain.status === 'vaulted' || domain.status === 'not_for_sale') {
    status = 'pending';
  } else if (domain.status === 'sold') {
    status = 'sold';
  }

  return {
    id: domain.id?.toString() || domain.slug,
    name: domain.name.endsWith('.sol') ? domain.name : `${domain.name}.sol`,
    slug: domain.slug,
    priceSol,
    tier,
    isVaulted: domain.vaulted || domain.status === 'vaulted',
    isNew: false, // Could be determined by created_at if available
    isFeatured: domain.featured || false,
    tags: Array.isArray(domain.tags) ? domain.tags : [],
    shortDescription: domain.description,
    loreBlurb: domain.hasLore ? domain.description : undefined,
    imageUrl: domain.image_url,
    thumbnailUrl: domain.image_url,
    rarityScore,
    marketplaceUrl,
    status,
    description: domain.description,
    hasWebsite: domain.hasWebsite,
    website: domain.website,
    hasLore: domain.hasLore,
    rarity: domain.rarity,
    flashRack: domain.flashRack,
    redacted: domain.redacted,
    archetype: domain.archetype,
    listed: domain.listed,
    available: domain.available,
    has_build: domain.has_build,
    has_pfp: domain.has_pfp,
    meta_json: domain.meta_json,
  };
}

/**
 * Converts an array of Domain objects to DomainRecord[]
 */
export function adaptDomainsToRecords(domains: Domain[]): DomainRecord[] {
  return domains.map(adaptDomainToRecord);
}

