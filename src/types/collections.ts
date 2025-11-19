import { DomainTier } from './domain';

export type CollectionTheme =
  | 'meme'
  | 'cyberpunk'
  | 'brand'
  | 'premium_vault'
  | 'short'
  | 'emoji'
  | 'ai_tech'
  | 'defi'
  | 'gaming'
  | 'degen'
  | 'dao'
  | 'creator'
  | 'aesthetic'
  | 'lore'
  | 'scav';

export interface CollectionSEO {
  title: string;
  description: string;
  canonicalPath: string; // '/meme-sol-domains'
}

export interface CollectionHeroCopy {
  eyebrow?: string;    // 'Meme Rack'
  h1: string;
  subheading?: string;
  tagline?: string;
}

export interface CollectionPageConfig {
  id: string;                      // 'meme-sol'
  theme: CollectionTheme;
  slug: string;                    // 'meme-sol-domains'
  path: string;                    // '/meme-sol-domains'

  seo: CollectionSEO;
  hero: CollectionHeroCopy;

  // domain filtering
  requiredTags?: string[];         // e.g. ['meme']
  excludedTags?: string[];
  minRarityScore?: number;
  tierWhitelist?: DomainTier[];

  showFilters?: boolean;
  showRarityLegend?: boolean;
  showLoreSection?: boolean;
  showFAQ?: boolean;

  // visual customization
  accentColor?: string;            // Tailwind color token or hex
  neonGlowClass?: string;          // 'shadow-[0_0_30px_rgba(244,244,122,0.8)]'
  backgroundVariant?: 'grid' | 'smoke' | 'scanlines' | 'gradient';

  // CTAs
  primaryCtaLabel?: string;
  primaryCtaHref?: string;

  // optional: custom copy blocks for lower sections
  loreSectionTitle?: string;
  loreSectionBody?: string;
  faqItems?: { question: string; answer: string }[];
}

