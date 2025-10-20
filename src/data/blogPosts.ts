export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    url: string;
  };
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  featured: boolean;
  image?: string;
  canonicalUrl: string;
  keywords: string[];
  schema: {
    articleType: 'Article' | 'TechArticle' | 'BlogPosting';
    mainEntity?: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-retailstar',
    title: 'Retailstar.sol: A Cyberpunk Domain Mall for Digital Degens',
    description: 'Solana isn\'t just a blockchain — it\'s a neon-lit city of opportunity. Retailstar is the mall at the center of that city, where every .sol domain is a storefront, a universe, a vibe.',
    content: `# Retailstar.sol: A Cyberpunk Domain Mall for Digital Degens

Solana isn't just a blockchain — it's a neon-lit city of opportunity.  
Retailstar is the mall at the center of that city.

Built in the shadows of the memecoin casino and the rise of experimental brands, Retailstar is more than a domain listing site — it's a **story-driven mall simulation** where every \`.sol\` domain is a storefront, a universe, a vibe.

---

## The Origin Story

Retailstar was born out of a **deep dive into the world of Cyberpunk 2077**.

I spent hours exploring its aesthetic, searching for specific environmental details, dialogue, and storefront energy that could translate to the **gritty, chaotic spirit of Solana**. Along the way, I created a music playlist to match — a custom soundtrack to fuel the late-night builds of what would become **Retailstar.sol**:  
> 🎧 Think Gorillaz *"DARE"*, Aesop Rock, No Doubt's *"Hella Good"*, Nujabes, and dark groovepunk beats.

The goal?  
**To incarnate the ethos of Solana** — fast, wild, culture-fueled — into a digital mall where meme domains get the treatment they deserve.

---

## What Is Retailstar?

Retailstar is a **modular Web3 ecosystem** where every \`.sol\` domain is:

- A department store
- A meme shrine
- A startup front
- Or an inside joke with its own window display

Some stores are minimal shells. Others? Full lore-driven websites with secret easter eggs, interactive portals, and references that only real degens and nostalgic internet kids will catch.

---

## Why Meme Domains Deserve Mansions, Not Motels

Most meme domains get parked, forgotten, or sold off in threads.

At Retailstar:
- You can **preview** each domain as a site
- You can **browse the directory** like walking past glass displays
- You can **dive in** to explore a full brand built on satire, symbolism, or tech

If you've ever wondered what a **tuxedo-clad AI chatbot** living inside \`hoodierepublic.sol\` looks like… this is your place.

---

## Explore the Ecosystem

Domains are split across a stylized three-tier structure:

### 🧃 Scav Rack
- Cheap, available domains
- Good for starter packs and remix projects
- Inspired by thrift stores, auctions, and fast builds

### 💎 Featured Marketplace
- Polished domains with clean design + lore
- Valorant-style **popup rotator** UI
- Hand-picked for brand potential and meme value

### 🕳 Glitch Militia (Basement)
- Tactical domains with encrypted vibes
- Home to archetypes like \`commandhub.sol\`
- Accessed via \`/vault\` or the **Mini Terminal**

---

## Domain Archetypes (Examples)

| Domain | Archetype | Vibe |
|--------|-----------|------|
| \`jpegdealer.sol\` | Black Market Salesman | NFT flipping with spice |
| \`fudscience.sol\` | Satirical Authority | Meme science meets fake news |
| \`commandhub.sol\` | Glitch Militia | Tactical, encrypted, aggressive |

→ [Browse the Full Directory](/directory)

---

## A Place to Build or Be Inspired

Retailstar isn't just a marketplace — it's a **creative playground**.

You can:
- Get inspired by already-built domains like \`copevendor.sol\`
- Order a **custom build** for a \`.sol\` you already own
- Submit your own project to be listed in the mall
- Or… just stroll the mall and vibe with the lore

---

## Upcoming Features

We're building more ways to explore the mall:

- 🧿 **Mini Terminal**: Command-style navigation + hidden unlocks
- 🤖 **Retailrunner Bot**: A sarcastic concierge across web + Discord
- 💸 **XP System**: Reward regular visitors + buyers with ticket-based perks

---

## Why It Matters

In a space where everything moves fast, meme energy disappears, and attention spans shift daily — **Retailstar offers permanence**.

A \`.sol\` domain deserves to be more than metadata.

**It should be a storefront, a vibe, a whole damn aesthetic.**

---

## Join the Movement

If you're sitting on a fire \`.sol\` and want help building it out…

Or if you're looking to **acquire, customize, or flip a high-potential domain**,  
**Retailstar is your launchpad.**

> 🔗 [Browse Domains](/directory)  
> 🧠 [Submit Your Domain](/submit)  
> ⚙️ [Request a Custom Build](/services)

---

> **Retailstar.sol** — because your meme deserves a mansion, not a motel.`,
    author: {
      name: 'Retailstar Team',
      url: 'https://retailstar.xyz'
    },
    publishedAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    tags: ['solana', 'domains', 'web3', 'cyberpunk', 'marketplace', 'retailstar'],
    category: 'Company',
    featured: true,
    image: 'https://retailstar.xyz/assets/rs-og-card.png',
    canonicalUrl: 'https://retailstar.xyz/insights/why-retailstar',
    keywords: 'retailstar solana domain mall, cyberpunk domain marketplace, solana domain ecosystem, web3 domain storefront, meme domain development',
    schema: {
      articleType: 'Article',
      mainEntity: 'Retailstar.sol'
    }
  }
];

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};
