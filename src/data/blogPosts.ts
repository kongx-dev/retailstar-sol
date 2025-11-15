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
- Home to archetypes like [commandhub.sol](https://commandhub.netlify.app)
- Accessed via \`/vault\` or the **Mini Terminal**

---

## Domain Archetypes (Examples)

| Domain | Archetype | Vibe |
|--------|-----------|------|
| [jpegdealer.sol](https://jpegdealer.netlify.app) | Black Market Salesman | NFT flipping with spice |
| [fudscience.sol](https://fudscience.netlify.app) | Satirical Authority | Meme science meets fake news |
| [commandhub.sol](https://commandhub.netlify.app) | Glitch Militia | Tactical, encrypted, aggressive |

→ [Browse the Full Directory](/directory)

---

## A Place to Build or Be Inspired

Retailstar isn't just a marketplace — it's a **creative playground**.

You can:
- Get inspired by already-built domains like [copevendor.sol](https://copevendor.netlify.app)
- Explore the [wiki directory](/wiki-directory) to dive deep into domain lore and stories
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
    publishedAt: '2025-11-14T08:26:00Z',
    updatedAt: '2025-11-14T08:26:00Z',
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
  },
  {
    slug: 'what-are-sol-domains',
    title: 'What Are .sol Domains? A Beginner\'s Guide for Web3 Builders',
    description: 'Learn what .sol domains are, how they work, and why Solana builders use them for identity, apps, and branding. A simple guide for Web3 beginners.',
    content: `# What Are .sol Domains? A Beginner's Guide for Web3 Builders

If you're building on Solana or exploring Web3, you've probably heard about \`.sol\` domains. But what exactly are they, and why should you care?

In this guide, we'll break down everything you need to know about Solana Name Service (SNS) domains — from the basics to how builders are using them to create memorable Web3 experiences.

---

## What Are .sol Domains?

A \`.sol\` domain is a human-readable name on the Solana blockchain that maps to a Solana wallet address. Instead of sending crypto to a long, confusing address like \`7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU\`, you can use something simple like \`yourname.sol\`.

Think of it like the difference between an IP address and a website domain. \`.sol\` domains make Solana addresses as easy to remember as \`google.com\`.

---

## How Do .sol Domains Work?

Solana Name Service (SNS) is the decentralized naming system that powers \`.sol\` domains. Here's how it works:

1. **Registration**: You register a \`.sol\` domain name on the Solana blockchain
2. **Ownership**: The domain is stored as an NFT in your wallet — you truly own it
3. **Resolution**: Wallets and dApps can resolve your \`.sol\` name to your wallet address
4. **Transfer**: You can transfer, sell, or trade your domain like any other NFT

Unlike traditional domains, \`.sol\` domains are:
- **Decentralized**: No central authority controls them
- **Censorship-resistant**: Once you own it, it's yours
- **Blockchain-native**: Built directly on Solana, not a separate system

---

## Why Do Solana Builders Use .sol Domains?

### 1. **Human-Readable Identity**

Your \`.sol\` domain becomes your Web3 identity. Instead of sharing a long wallet address, you can share \`yourname.sol\` — much more memorable and professional.

### 2. **Branding for Projects**

Many Solana projects use \`.sol\` domains as their primary branding. A domain like \`yourproject.sol\` is:
- Easy to remember
- Instantly recognizable
- Perfect for marketing and community building

### 3. **Integration with dApps**

Solana dApps are increasingly supporting \`.sol\` domains for:
- User profiles
- Payment addresses
- Project identification
- Social features

### 4. **Future-Proof Investment**

As Solana grows, \`.sol\` domains become more valuable. Early adopters often see their domains appreciate in value, especially short or memorable names.

---

## How to Choose a .sol Domain

When selecting a \`.sol\` domain, consider:

- **Length**: Shorter domains are more valuable and memorable
- **Brandability**: Does it match your project or personal brand?
- **Memorability**: Can people easily remember and type it?
- **Availability**: Check if your desired name is available

Explore meme, builder-ready, and brandable names in the [Retailstar Mall directory](/directory).

---

## Where to Find .sol Domains

You can find \`.sol\` domains in several places:

### Primary Marketplaces
- Official SNS registrars
- Domain marketplaces
- NFT marketplaces that support SNS

### Secondary Markets
- [Retailstar Mall directory](/directory) — curated collection of brandable domains
- [Scav Rack](/scavrack) — check the Scav Rack for cheap or funny .sol domains
- Other domain resale platforms

---

## What Can You Do With a .sol Domain?

Once you own a \`.sol\` domain, you can:

1. **Use it as your wallet address** — send and receive crypto using your domain
2. **Build a website** — host content at your domain
3. **Create a brand** — use it as your project's identity
4. **Trade it** — sell or transfer your domain
5. **Integrate with dApps** — use it across the Solana ecosystem

---

## .sol vs .com: What's the Difference?

| Feature | .sol Domains | .com Domains |
|---------|--------------|--------------|
| **Ownership** | You own it as an NFT | You lease it from a registrar |
| **Decentralization** | Fully decentralized | Centralized (ICANN) |
| **Censorship** | Censorship-resistant | Can be seized or suspended |
| **Integration** | Native to Solana blockchain | Requires traditional DNS |
| **Transfer** | Instant, trustless transfer | Requires registrar approval |

---

## Getting Started with .sol Domains

Ready to get your own \`.sol\` domain? Here's how to start:

1. **Browse available domains** — Check out the [Retailstar Mall directory](/directory) for curated options
2. **Register or purchase** — Buy from a marketplace or register a new name
3. **Set up your wallet** — Make sure you have a Solana wallet ready
4. **Start building** — Use your domain for your project or personal brand

Need a branded site for your .sol domain? Visit our [Get Started page](/insights) to learn more about building on Solana.

---

## The Future of .sol Domains

As Solana continues to grow, \`.sol\` domains are becoming essential infrastructure for:
- Web3 identity systems
- Decentralized applications
- NFT projects and communities
- DeFi protocols
- Gaming and metaverse projects

Early adoption of a good \`.sol\` domain can position you or your project at the forefront of Solana's ecosystem.

---

## Conclusion

\`.sol\` domains are more than just wallet addresses — they're your identity, your brand, and your gateway to the Solana ecosystem. Whether you're a builder, a degen, or just exploring Web3, understanding \`.sol\` domains is essential.

Ready to explore the world of Solana domains? [Explore the Retailstar Mall](https://retailstar.xyz) to find your perfect \`.sol\` domain today.

---

*Want to learn more about Solana and Web3? Check out our other [insights](/insights) for guides, tips, and deep dives into the Solana ecosystem.*`,
    author: {
      name: 'Kongnificent',
      url: 'https://twitter.com/kongnficent_'
    },
    publishedAt: '2025-11-13T03:43:00Z', // November 12, 2025 10:43 PM EST (UTC-5)
    updatedAt: '2025-11-13T03:43:00Z', // November 12, 2025 10:43 PM EST (UTC-5)
    tags: ['Solana', 'Domains', 'Web3', 'Beginner Guides'],
    category: 'Guide',
    featured: true,
    image: 'https://retailstar.xyz/assets/RS-sns-cover.png',
    canonicalUrl: 'https://retailstar.xyz/insights/what-are-sol-domains',
    keywords: [
      'what are .sol domains',
      'solana domain guide',
      'solana name service beginner',
      'solana domains for builders',
      'how .sol domains work',
      'decentralized identity solana',
      'Web3 identity on Solana',
      'solana builder tools',
      'solana domain naming',
      'solana domains for dapps',
      '.sol vs .com',
      'solana domain marketplace',
      'buy .sol domain',
      'solana project branding',
      'how to choose a .sol domain',
      'beginner guide solana domains',
      'solana domain for web3 project',
      'what can you do with .sol domains',
      'decentralized domains solana'
    ],
    schema: {
      articleType: 'Article',
      mainEntity: '.sol Domains'
    }
  },
  {
    slug: '25-meme-domains',
    title: '25 Meme .sol Domains That Might Go Viral (Plus the Full Retailstar Build Ladder)',
    description: 'Web3 is split into builders and degens. Whether you want a brandable .sol domain or a stupidly funny one to flex on the timeline, this guide breaks down the Retailstar build ladder and 25 meme-worthy domains that might actually go viral.',
    content: `# 25 Meme .sol Domains That Might Go Viral (Plus the Full Retailstar Build Ladder)

Web3 is split into two types of people:

**Builders** — who want a clean, brandable .sol domain to launch something real

**Degens** — who want a stupidly funny .sol domain to flex on the timeline

Retailstar is built for both.

Whether you're trying to spin up a meme coin, launch a micro-project, or finally give your PFP an identity crisis, this guide breaks down:

- The full Retailstar build ladder (so you know what each tier gets you)
- 25 meme-worthy .sol domains that might actually go viral
- Where to upgrade your domain once you snag it

Let's get into it.

---

## ⚡ The Retailstar Build Ladder (What You Actually Get)

Every buyer gets a different build depending on their goals, budget, or level of degenerate behavior.

### ⭐ 1. QUICK SNAG — 0.5–1.5 SOL

"Snag it, ship it, stun 'em."

Perfect for fast flips, meme sites, shitcoin promos, or your next identity flex.

**What you get:**

- 1 clean landing page
- Custom hero/banner
- Snappy degen copy
- Social/mint links
- Delivered in 48–72 hours

**Best for:**

\`urnotthatguy.sol\` • \`lowballking.sol\` • \`wastakenbro.sol\`

### 🧱 2. MID-GRADE — 3–5 SOL

"Not basic. Not maxed. Just right."

For people who want real presence without a huge build.

**What you get:**

- Up to 2 fully styled pages
- Clean layouts + light animations
- Styled CTAs
- Optional: collections, widgets, 1–2 data modules

**Best for:**

Concept pages, meme coin pre-launches, project previews.

### 🔮 3. PREMIUM — 9+ SOL

"This ain't a build. It's a world."

This is where your domain stops being a joke and becomes lore.

**What you get:**

- 2–3 full custom pages
- Scroll-based animations & transitions
- Lore-infused storytelling
- Optional token-gating
- Optional dashboard & analytics

**Examples:**

[jpegdealer.sol](https://jpegdealer.netlify.app)

[fudscience.sol](https://fudscience.netlify.app)

(Both fully built, both mythic-level sites.)

### 🔧 4. RETAINER PLAN — 0.5–1 SOL/mo

Your domain is a storefront, not a graveyard.

**Includes:**

- Ongoing updates
- UI tweaks
- Seasonal refreshes
- Module swaps

Perfect for people who plan to evolve their site over time.

### 🧠 5. CUSTOM QUOTE — 15+ SOL

For the insane ideas that deserve an insane build.

**Use cases:**

- Marketplace builds
- DAO access zones
- Mini-game portals
- Fully gated platforms

**Includes:**

Discovery call • Figma mockups • Dev cycle planning

**Examples to preview:**

[lurkerlife.netlify.app](https://lurkerlife.netlify.app)

[jumpsetradio.netlify.app](https://jumpsetradio.netlify.app)

---

## 🔥 25 Meme .sol Domains That Might Just Go Viral

Yes — these are real .sol domains.

Yes — they're absolutely ridiculous.

No — we don't judge.

Below are grouped collections for your browsing pleasure.

### 🔥 Identity Flex Names

The ones you buy because your personality depends on it.

- \`urnotthatguy.sol\`
- \`yournotthatguy.sol\`
- \`maidenless.sol\`
- \`headempty.sol\`
- \`smoothestbrain.sol\`
- \`logoffking.sol\`
- \`wastakenbro.sol\`

### 🧪 Meme & Joke Names

Perfect for shitposting, promo pages, meme coins, or embarrassing your friends.

- \`copevendor.sol\`
- \`bongwaterking.sol\`
- \`whatabum.sol\`
- \`whyumad.sol\`
- \`noaura.sol\`
- \`nosauce.sol\`
- \`notalpha.sol\`

### ⚔️ Degen / Trading Names

The ones you buy at 4AM because you "felt something."

- \`lordofliquidity.sol\`
- \`sniperguru.sol\`
- \`rektworthy.sol\`
- \`tdbagchaser.sol\`
- \`verifiedsoon.sol\`
- \`scamdetected.sol\`
- \`summonscam.sol\`

### 📡 Tech / Router-Style Meme Names

Names that make you look like you run a datacenter in your mom's basement (in a good way).

- \`memeengine.sol\`
- \`memerouter.sol\`
- \`memepipeline.sol\`
- \`memestation.sol\`
- \`memesupplier.sol\`
- \`memeprovider.sol\`
- \`ninjachain.sol\`

### 💀 Extra Chaotic Energy Names

Too cursed to ignore.

- \`artthoumad.sol\`
- \`whogaveyouthat.sol\`
- \`whisperingeye.sol\`
- \`influencerdump.sol\`
- \`yapenomics.sol\`

---

## 🧠 Why Meme Domains Actually Matter

People think meme domains are dumb.

They're right. But also — they're powerful.

Here's why:

**They become identity.**

Your .sol name is your PFP's lore.

**They go viral.**

CT loves stupid branding.

**They launch meme coins.**

A funny domain can become the entire narrative.

**They're culture.**

Memes are half the Solana economy.

**They flip.**

Degens really will pay 5+ SOL for the right name.

If ENS domains are LinkedIn…

.sol meme domains are whatever the opposite of LinkedIn is.`,
    author: {
      name: 'Retailstar Team',
      url: 'https://retailstar.xyz'
    },
    publishedAt: '2025-11-11T00:00:00Z',
    updatedAt: '2025-11-14T00:00:00Z',
    tags: ['meme domains', 'solana', 'guide', 'retailstar', 'build ladder'],
    category: 'Guide',
    featured: true,
    image: '/assets/25-sol-domains.png',
    canonicalUrl: 'https://retailstar.xyz/insights/25-meme-domains',
    keywords: [
      'meme solana domains',
      'funny .sol domain names',
      'retailstar build ladder',
      'solana domain guide',
      'meme coin domains',
      'degen domains',
      'viral .sol domains',
      'solana domain marketplace',
      'buy meme domains',
      'solana domain pricing',
      'custom .sol domain builds',
      'solana domain development',
      'meme domain ideas',
      'solana CT domains',
      'viral domain names'
    ],
    schema: {
      articleType: 'Article',
      mainEntity: 'Meme Domains'
    }
  },
  {
    slug: 'hoodie-academy-guide',
    title: 'Inside Hoodie Academy — The Web3 Classroom Built for Creators, Traders, and Builders',
    description: 'A full breakdown of Hoodie Academy: squads, cipher gates, courses, and how this gamified Web3 education system works from the inside.',
    content: `# Inside Hoodie Academy — The Web3 Classroom Built for Creators, Traders, and Builders

Most Web3 education feels the same:

Threads that repeat the same ideas

Courses that cost too much

"Alpha" that updates once a month

Overcomplicated tutorials that assume you're a senior dev

Hoodie Academy was built to fix all of that.

It's a gamified Web3 learning system created for people who want to learn crypto, trading, automation, and AI—in a way that actually feels fun, structured, and community-driven.

And since Retailstar.xyz has started sending traffic back to Hoodie Academy (and vice-versa), it's time to break down exactly what the Academy actually is, how it works, and why it's designed the way it is.

## 1. What Is Hoodie Academy?

Hoodie Academy is a squad-based learning ecosystem built around the WifHoodie community.

Think of it as:

A Web3 boot camp + gaming progression system + creative studio + trading dojo… all in one place.

Every student (Hoodie holder) unlocks:

Core courses on AI, trading, Web3 tools, automation, and security

Squad-specific tracks for creators, analysts, editors, and researchers

Weekly assignments to keep the community aligned

Cipher-gated content, meaning only holders with the weekly PIN can access the next module

A unified dashboard that tracks progress and unlocks new paths

Nothing is passive.

Everything is earned.

## 2. How Hoodie Academy Works (Simple Breakdown)

🎓 The Squads

Every member falls into one of the following squads:

Creators — content makers, storytellers, editors

Decoders — researchers, analysts, technical problem solvers

Speakers — hosts, narrators, community voices, X Spaces

Raiders — hunters, scouts, airdrop chasers, opportunity finders

Rangers — long-term strategists and special-ops roles

Each squad gets its own coursework, tasks, and assignments that tie into the entire Academy ecosystem.

🔐 The Cipher Gate

Every week, the site generates a new rotating 4-digit cipher code.

You can't open the next course without it.

Why?

Because it forces:

Community participation

Weekly momentum

Accountability

Shared energy

When the squad leaders post the weekly cipher → class begins.

📚 The Course System

Every course is built modularly:

100-level → beginner (open to everyone)

200-level → squad-specific

300-level → advanced strategies

Final lessons → special "Cinema Alpha" modules

Point Break

White Men Can't Jump

Moneyball

Uncut Gems

The courses mix education with narrative and entertainment—making the Academy feel more like a universe than a curriculum.

## 3. Why Hoodie Academy Works

✔ It's built for busy people

No hour-long videos.

No bloated lessons.

Everything is short, actionable, and practical.

✔ It rewards consistency

Your progress unlocks new squads, new lessons, new tools, and eventually… Kimono DAO access.

✔ It merges learning with culture

Every lesson uses stories, films, memes, and Web3 moments to teach concepts from both sides of the brain.

✔ It creates an identity

Most Web3 courses feel corporate.

Hoodie Academy feels like a guild.

## 4. The Relationship Between Hoodie Academy and Retailstar.xyz

If Hoodie Academy is the school, then Retailstar is the city it lives inside.

You'll notice the loop:

Hoodie Academy links students into key Retailstar pages

Retailstar backlinks form a path back into Hoodie Academy

The two sites strengthen each other's SEO signals

Both live inside the same broader universe

As Retailstar grows, Hoodie Academy benefits from the traffic.

As Hoodie Academy grows, Retailstar gains domain awareness and culture.

This is intentional.

You're building a cross-site Web3 ecosystem that looks and feels like a fictional world—but functions like a real inbound funnel.

## 5. What's Coming Next

Based on the current roadmap inside the Academy:

More 100-level courses (AI tools, airdrop hunting, Notion systems)

Weekly squad tasks posted publicly

Collaborative courses (Galactic Gecko series, community co-authored modules)

A unified dashboard with announcements, homework, and progress

The eventual Kimono DAO bridge

And eventually, the Academy becomes more than a school:

It becomes the onboarding portal for the entire WifHoodie ecosystem.

## 6. How to Join Hoodie Academy

Anyone can read the public previews.

But to unlock the full platform:

Own a Hoodie NFT

Get the weekly cipher code

Log in → start your squad track

Complete assignments to unlock more paths

The doors open every week.

The cipher resets.

Class begins.

## A Final Whisper from the Mall

Retailstar Mall is evolving fast.

If you're a WifHoodie holder, you might notice certain locked doors, dim hallways, and unused terminals scattered around the mall. Those aren't just decoration.

A new wing is coming: HoodieHQ — a dedicated space for the Hoodies inside the Retailstar universe.

Hoodie Academy students will discover the doorway first.

And yes… perks are involved.

That's all that can be said (for now).

## Final Thoughts

Hoodie Academy isn't trying to be another Web3 course.

It's trying to be the first real Web3 classroom:

Built with lore

Built with community

Built with progression

Built with gamified learning

Built with culture

And now that the backlink network between LopezProductions.ai ↔ Hoodie Academy ↔ Retailstar.xyz is complete…

This is the perfect moment to publicly highlight what you've built.

## CTA Block

Want to see Hoodie Academy for yourself?

Visit: [Hoodie Academy](https://hoodieacademy.com)

Curious how the ecosystem connects?

Explore [Retailstar](https://retailstar.xyz)

Learn the workflows behind the build:

[Lopez Productions Playbook](https://lopezproductions.ai/playbook)`,
    author: {
      name: 'Retailstar Team',
      url: 'https://retailstar.xyz'
    },
    publishedAt: '2025-11-15T12:00:00Z',
    updatedAt: '2025-11-15T12:00:00Z',
    tags: ['Web3 Education', 'Crypto', 'Hoodie Academy', 'NFT Communities'],
    category: 'Guide',
    featured: true,
    image: 'https://retailstar.xyz/assets/hoodie%20academy%20logo%201.png',
    canonicalUrl: 'https://retailstar.xyz/insights/hoodie-academy-guide',
    keywords: [
      'Hoodie Academy',
      'Hoodie Academy course',
      'Hoodie Academy Web3',
      'Web3 education',
      'gamified learning Web3',
      'crypto education',
      'NFT community learning',
      'WifHoodie Academy',
      'Web3 boot camp',
      'crypto trading courses',
      'Web3 automation courses',
      'Hoodie Academy squads',
      'cipher gate Web3',
      'Web3 classroom',
      'Hoodie Academy guide',
      'Web3 learning platform',
      'NFT holder education',
      'Solana education',
      'Web3 community courses',
      'Hoodie Academy review'
    ],
    schema: {
      articleType: 'Article',
      mainEntity: 'Hoodie Academy'
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
