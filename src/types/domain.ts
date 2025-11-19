import { Domain } from '../lib/supabase';

export type DomainTier = 'scav' | 'mid' | 'premium' | 'mythic';

export interface DomainRecord {
  id: string;
  name: string;              // 'jpegdealer.sol'
  slug: string;              // 'jpegdealer-sol'
  priceSol: number;
  tier: DomainTier;
  isVaulted?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;

  // tags connect domains to collections
  tags: string[];           
  
  shortDescription?: string;
  loreBlurb?: string;

  // for UI
  imageUrl?: string;
  thumbnailUrl?: string;
  rarityScore?: number;      // 0–100 or 0–10
  hypeScore?: number;        // optional metric

  // marketplace links
  marketplaceUrl?: string;
  status?: 'available' | 'pending' | 'sold';

  // Additional fields from Domain interface
  description?: string;
  hasWebsite?: boolean;
  website?: string;
  hasLore?: boolean;
  rarity?: 'epic' | 'rare' | 'base';
  flashRack?: boolean;
  redacted?: boolean;
  archetype?: 'builder' | 'degen' | 'both';
  listed?: boolean;
  available?: boolean;
  has_build?: boolean;
  has_pfp?: boolean;
  meta_json?: any;
}

