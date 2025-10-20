export interface BasementDomain {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  color: 'cyan' | 'green' | 'purple' | 'red' | 'yellow';
  description: string;
}

export const basementDomains: BasementDomain[] = [
  {
    slug: 'copevendor',
    name: 'copevendor.sol',
    tagline: 'Cope & Vend Since 2024',
    icon: '😤',
    color: 'cyan',
    description: 'Your one-stop shop for premium copium and hopium. We vend the finest copes in the game.'
  },
  {
    slug: 'jpegdealer',
    name: 'jpegdealer.sol',
    tagline: 'Your NFT Plug',
    icon: '🖼️',
    color: 'purple',
    description: 'The JPEG game runs deep. We deal in pixels, vibes, and generational wealth (maybe).'
  },
  {
    slug: 'dripdealer',
    name: 'dripdealer.sol',
    tagline: 'Streetwear x Web3',
    icon: '💧',
    color: 'green',
    description: 'Drip so hard they call it a flood. Streetwear meets blockchain aesthetics.'
  },
  {
    slug: 'lurkerlife',
    name: 'lurkerlife.sol',
    tagline: 'For the Silent Observers',
    icon: '👁️',
    color: 'yellow',
    description: 'Lurking is a lifestyle. Watch, learn, never speak. Maximum efficiency, minimal exposure.'
  },
  {
    slug: 'commandhub',
    name: 'commandhub.sol',
    tagline: 'AI Dashboard & Infra',
    icon: '⚡',
    color: 'red',
    description: 'Command center for builders. AI-powered infrastructure ready to deploy.'
  }
];

export const npcDialogues = [
  "Yo, check out copevendor.sol if you need that hopium fix 😤",
  "JPEG Dealer just restocked. Don't sleep on it. 🖼️",
  "Heard they're launching something big upstairs... but down here? We already got it.",
  "Lurkerlife.sol is for real ones. No cap. 👁️",
  "CommandHub running that AI setup. Builders know what's up. ⚡",
  "Dripdealer got that limited edition drop. Act fast or regret it forever. 💧",
  "This basement? This is where legends are born, fam.",
  "No gates, no passes, just pure chaos and opportunity.",
  "You new here? Terminal's your friend. Type /help to get started.",
  "Mall's got floors above us, but the real ones start down here."
];

export const basementLore = {
  title: "Welcome to the Basement - Where Legends Are Born",
  story: `The Glitch Militia operates from the depths of Retailstar Mall. 
This is where raw talent meets opportunity, where memes become 
movements, and where every .sol domain tells a story.

No passes. No gates. Just pure chaos and potential.

The basement has always been the entry point for those who hustle. 
While others wait for invites and whitelist spots, we're down here 
building empires from scratch. Every domain you see? Started right here.

The flickering lights? That's not a bug. That's the energy.
The graffiti on the walls? That's our history.
The NPCs standing around? Those are your future business partners.

Welcome to the foundation. Welcome to the Glitch Militia HQ.`,
  motto: "From the Basement to the Moon 🚀"
};

