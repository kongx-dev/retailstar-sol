import { CollectionPageConfig } from '../types/collections';

export const collectionConfigs: CollectionPageConfig[] = [
  {
    id: 'meme-sol',
    theme: 'meme',
    slug: 'meme-sol-domains',
    path: '/meme-sol-domains',
    seo: {
      title: 'Meme .sol Domains • Funniest Solana Names (Curated 2025)',
      description:
        'Discover hand-picked meme .sol domains inspired by Solana culture, WIF, Popkins, and degen humor. Updated frequently from the Retailstar Mall.',
      canonicalPath: '/meme-sol-domains',
    },
    hero: {
      eyebrow: 'Scav Rack • Meme Wing',
      h1: 'Funniest Meme .sol Domains on Solana',
      subheading:
        'Curated names for shitcoins, inside jokes, and unhinged timelines.',
      tagline: 'Built for degens who type faster than they think.',
    },
    requiredTags: ['meme'],
    showFilters: true,
    showRarityLegend: true,
    showLoreSection: true,
    showFAQ: true,
    backgroundVariant: 'scanlines',
    primaryCtaLabel: 'Spin the Meme Generator',
    primaryCtaHref: '/tools/meme-generator',
    loreSectionTitle: 'Built in the Basement of Retailstar Mall',
    loreSectionBody:
      'These meme .sol domains are pulled from the loudest corners of Solana. Each one passes the "would I retweet this if it rugged?" test.',
    faqItems: [
      {
        question: 'Are these domains actually available?',
        answer:
          'We sync availability from the marketplace regularly, but always click through to confirm before you ape.',
      },
      {
        question: 'Can I flip a meme .sol domain?',
        answer:
          'Maybe. Meme value is vibes-based, but short, iconic or meta names tend to age best.',
      },
    ],
  },

  {
    id: 'cyberpunk-sol',
    theme: 'cyberpunk',
    slug: 'cyberpunk-sol-domains',
    path: '/cyberpunk-sol-domains',
    seo: {
      title: 'Cyberpunk .sol Domains • Neon, Tech & Dystopian Names',
      description:
        'Explore neon-lit, dystopian, cyberpunk-themed .sol domains curated for Solana builders, artists, and lore enjoyers.',
      canonicalPath: '/cyberpunk-sol-domains',
    },
    hero: {
      eyebrow: 'Upper Deck • Neon Row',
      h1: 'Cyberpunk .sol Domain Vault',
      subheading:
        'Names that sound like they live under flickering street lamps and bad decisions.',
    },
    requiredTags: ['cyberpunk'],
    showFilters: true,
    showLoreSection: true,
    showFAQ: false,
    backgroundVariant: 'gradient',
    primaryCtaLabel: 'Browse the Neon Vault',
    primaryCtaHref: '/cyberpunk-sol-domains#grid',
    loreSectionTitle: 'Why Cyberpunk Identity Hits Different on Solana',
    loreSectionBody:
      'Cyberpunk .sol domains signal you build in the messy, glowing parts of the chain. These names are picked for cinematic energy and long-term lore.',
  },

  {
    id: 'brand-ready-sol',
    theme: 'brand',
    slug: 'brand-ready-sol-domains',
    path: '/brand-ready-sol-domains',
    seo: {
      title: 'Brand-Ready .sol Domains • Premium Solana Names for Builders',
      description:
        'Professional, clean, brand-ready .sol domains curated for tools, DAOs and Solana startups.',
      canonicalPath: '/brand-ready-sol-domains',
    },
    hero: {
      eyebrow: 'Founders Row',
      h1: 'Brand-Ready .sol Domains',
      subheading:
        'Names you can confidently put on a pitch deck, docs site, or investor email.',
    },
    requiredTags: ['brand'],
    tierWhitelist: ['mid', 'premium', 'mythic'],
    showFilters: true,
    showRarityLegend: true,
    showLoreSection: true,
    backgroundVariant: 'grid',
    primaryCtaLabel: 'Explore Founders Row',
    primaryCtaHref: '/brand-ready-sol-domains#grid',
    loreSectionTitle: 'Built for Serious Builders',
    loreSectionBody:
      'These domains pass the "can I put this on LinkedIn?" test. Clean, professional, and ready for your next Web3 venture.',
  },

  {
    id: 'premium-vault',
    theme: 'premium_vault',
    slug: 'premium-vault',
    path: '/premium-vault',
    seo: {
      title: 'Premium .sol Domain Vault • Rare Short & Ultra-Brandable Names',
      description:
        'Short, rare, and ultra-brandable .sol domains stored deep in the Retailstar Vault.',
      canonicalPath: '/premium-vault',
    },
    hero: {
      eyebrow: 'Vaulted Tier',
      h1: 'The Premium .sol Vault',
      subheading: 'These don\'t live on the Scav Rack. They live behind blast doors.',
    },
    tierWhitelist: ['premium', 'mythic'],
    minRarityScore: 80,
    showFilters: false,
    showRarityLegend: true,
    showLoreSection: true,
    backgroundVariant: 'smoke',
    primaryCtaLabel: 'Request a Private Tour',
    primaryCtaHref: '/contact',
    loreSectionTitle: 'The Vault',
    loreSectionBody:
      'These domains are hand-selected for maximum brandability, rarity, and long-term value. Not for the faint of wallet.',
  },

  {
    id: 'short-sol',
    theme: 'short',
    slug: 'short-sol-domains',
    path: '/short-sol-domains',
    seo: {
      title: 'Short .sol Domains • 3-5 Character Solana Names',
      description:
        'Ultra-rare short .sol domains (3-5 characters) perfect for brands, tools, and premium projects.',
      canonicalPath: '/short-sol-domains',
    },
    hero: {
      eyebrow: 'Premium Collection',
      h1: 'Short .sol Domains',
      subheading: 'When every character counts. 3-5 letter domains that command attention.',
    },
    requiredTags: ['short'],
    showFilters: true,
    showRarityLegend: true,
    backgroundVariant: 'grid',
    primaryCtaLabel: 'Browse Short Domains',
    primaryCtaHref: '/short-sol-domains#grid',
  },

  {
    id: 'emoji-sol',
    theme: 'emoji',
    slug: 'emoji-sol-domains',
    path: '/emoji-sol-domains',
    seo: {
      title: 'Emoji .sol Domains • Fun & Expressive Solana Names',
      description:
        'Playful .sol domains featuring emojis and expressive names perfect for meme projects and creative brands.',
      canonicalPath: '/emoji-sol-domains',
    },
    hero: {
      eyebrow: 'Creative Wing',
      h1: 'Emoji .sol Domains',
        subheading: 'Because sometimes words aren\'t enough. Express yourself with emoji-powered domains.',
    },
    requiredTags: ['emoji'],
    showFilters: true,
    backgroundVariant: 'gradient',
    primaryCtaLabel: 'Explore Emoji Domains',
    primaryCtaHref: '/emoji-sol-domains#grid',
  },

  {
    id: 'ai-tech',
    theme: 'ai_tech',
    slug: 'ai-tech-domains',
    path: '/ai-tech-domains',
    seo: {
      title: 'AI & Tech .sol Domains • Solana AI Project Names',
      description:
        'Cutting-edge .sol domains for AI projects, tech tools, and innovation-focused Solana builders.',
      canonicalPath: '/ai-tech-domains',
    },
    hero: {
      eyebrow: 'Tech Sector',
      h1: 'AI & Tech .sol Domains',
      subheading: 'For builders pushing the boundaries of what\'s possible on Solana.',
    },
    requiredTags: ['ai', 'tech'],
    showFilters: true,
    showLoreSection: true,
    backgroundVariant: 'grid',
    primaryCtaLabel: 'Browse Tech Domains',
    primaryCtaHref: '/ai-tech-domains#grid',
    loreSectionTitle: 'Built for the Future',
    loreSectionBody:
      'These domains are curated for AI projects, developer tools, and next-generation Solana applications.',
  },

  {
    id: 'defi',
    theme: 'defi',
    slug: 'defi-domains',
    path: '/defi-domains',
    seo: {
      title: 'DeFi .sol Domains • Solana DeFi Project Names',
      description:
        'Professional DeFi-focused .sol domains for protocols, DEXs, and financial applications on Solana.',
      canonicalPath: '/defi-domains',
    },
    hero: {
      eyebrow: 'Finance Wing',
      h1: 'DeFi .sol Domains',
      subheading: 'Domains built for protocols, DEXs, and the future of decentralized finance.',
    },
    requiredTags: ['defi'],
    showFilters: true,
    showRarityLegend: true,
    backgroundVariant: 'grid',
    primaryCtaLabel: 'Explore DeFi Domains',
    primaryCtaHref: '/defi-domains#grid',
  },

  {
    id: 'gaming',
    theme: 'gaming',
    slug: 'gaming-domains',
    path: '/gaming-domains',
    seo: {
      title: 'Gaming .sol Domains • Solana GameFi Project Names',
      description:
        'Epic .sol domains for gaming projects, GameFi protocols, and Web3 gaming communities on Solana.',
      canonicalPath: '/gaming-domains',
    },
    hero: {
      eyebrow: 'Game Zone',
      h1: 'Gaming .sol Domains',
      subheading: 'Level up your Web3 gaming project with a domain that hits different.',
    },
    requiredTags: ['gaming', 'gamefi'],
    showFilters: true,
    backgroundVariant: 'gradient',
    primaryCtaLabel: 'Browse Gaming Domains',
    primaryCtaHref: '/gaming-domains#grid',
  },

  {
    id: 'degen',
    theme: 'degen',
    slug: 'degen-domains',
    path: '/degen-domains',
    seo: {
      title: 'Degen .sol Domains • High-Risk, High-Reward Solana Names',
      description:
        'Unhinged .sol domains for the most degenerate corners of Solana. Not financial advice.',
      canonicalPath: '/degen-domains',
    },
    hero: {
      eyebrow: 'The Underbelly',
      h1: 'Degen .sol Domains',
      subheading: 'For those who send it first and ask questions never.',
    },
    requiredTags: ['degen'],
    showFilters: true,
    showLoreSection: true,
    backgroundVariant: 'scanlines',
    primaryCtaLabel: 'Enter the Underbelly',
    primaryCtaHref: '/degen-domains#grid',
    loreSectionTitle: 'Welcome to the Chaos',
    loreSectionBody:
      'These domains are for the real degens. The ones who understand that sometimes the best move is to send it.',
  },

  {
    id: 'dao',
    theme: 'dao',
    slug: 'dao-domains',
    path: '/dao-domains',
    seo: {
      title: 'DAO .sol Domains • Solana DAO Project Names',
      description:
        'Governance-focused .sol domains for DAOs, collectives, and decentralized organizations on Solana.',
      canonicalPath: '/dao-domains',
    },
    hero: {
      eyebrow: 'Governance Wing',
      h1: 'DAO .sol Domains',
      subheading: 'Build the future of decentralized governance with a domain that means business.',
    },
    requiredTags: ['dao'],
    showFilters: true,
    backgroundVariant: 'grid',
    primaryCtaLabel: 'Explore DAO Domains',
    primaryCtaHref: '/dao-domains#grid',
  },

  {
    id: 'creator',
    theme: 'creator',
    slug: 'creator-domains',
    path: '/creator-domains',
    seo: {
      title: 'Creator .sol Domains • Solana Creator Economy Names',
      description:
        'Creative .sol domains for content creators, artists, and builders in the Solana creator economy.',
      canonicalPath: '/creator-domains',
    },
    hero: {
      eyebrow: 'Creator Economy',
      h1: 'Creator .sol Domains',
      subheading: 'Your digital identity in the Solana creator economy starts here.',
    },
    requiredTags: ['creator'],
    showFilters: true,
    backgroundVariant: 'gradient',
    primaryCtaLabel: 'Browse Creator Domains',
    primaryCtaHref: '/creator-domains#grid',
  },

  {
    id: 'aesthetic',
    theme: 'aesthetic',
    slug: 'aesthetic-domains',
    path: '/aesthetic-domains',
    seo: {
      title: 'Aesthetic .sol Domains • Visually Stunning Solana Names',
      description:
        'Beautiful, aesthetic .sol domains curated for projects that value visual identity and design.',
      canonicalPath: '/aesthetic-domains',
    },
    hero: {
      eyebrow: 'Design Wing',
      h1: 'Aesthetic .sol Domains',
      subheading: 'Because your project deserves a domain that looks as good as it works.',
    },
    requiredTags: ['aesthetic'],
    showFilters: true,
    backgroundVariant: 'gradient',
    primaryCtaLabel: 'Explore Aesthetic Domains',
    primaryCtaHref: '/aesthetic-domains#grid',
  },

  {
    id: 'lore',
    theme: 'lore',
    slug: 'lore-domains',
    path: '/lore-domains',
    seo: {
      title: 'Lore .sol Domains • Story-Rich Solana Names',
      description:
        'Domains with rich backstories, lore, and narrative depth. Perfect for projects that value storytelling.',
      canonicalPath: '/lore-domains',
    },
    hero: {
      eyebrow: 'Lore Wing',
      h1: 'Lore .sol Domains',
      subheading: 'Every domain tells a story. These ones have the best ones.',
    },
    requiredTags: ['lore'],
    showFilters: true,
    showLoreSection: true,
    backgroundVariant: 'smoke',
    primaryCtaLabel: 'Explore Lore Domains',
    primaryCtaHref: '/lore-domains#grid',
    loreSectionTitle: 'Stories That Matter',
    loreSectionBody:
      'These domains come with rich backstories, deep lore, and narrative depth. Perfect for projects that understand the power of storytelling in Web3.',
  },

  {
    id: 'scav-drop',
    theme: 'scav',
    slug: 'scav-drop',
    path: '/scav-drop',
    seo: {
      title: 'Scav Drop .sol Domains • Budget-Friendly Solana Names',
      description:
        'Affordable, entry-level .sol domains perfect for testing ideas, meme projects, and budget-conscious builders.',
      canonicalPath: '/scav-drop',
    },
    hero: {
      eyebrow: 'Scav Rack',
      h1: 'Scav Drop .sol Domains',
      subheading: 'Low-barrier entry into the Solana domain ecosystem. No regrets, just sends.',
    },
    tierWhitelist: ['scav'],
    showFilters: true,
    backgroundVariant: 'scanlines',
    primaryCtaLabel: 'Browse Scav Drop',
    primaryCtaHref: '/scav-drop#grid',
  },
];

// Export lookup helper
export const collectionConfigByPath: Record<string, CollectionPageConfig> =
  Object.fromEntries(collectionConfigs.map((c) => [c.path, c]));

// Export lookup by ID
export const collectionConfigById: Record<string, CollectionPageConfig> =
  Object.fromEntries(collectionConfigs.map((c) => [c.id, c]));

