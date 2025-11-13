export interface TierLoreData {
  tierName: string;
  tierNumber: number | 'prestige';
  shortDescription: string;
  fullLore: string;
  color: string;
  borderColor: string;
  bgColor: string;
  icon: string;
  emoji: string;
}

export const tierLoreData: Record<string, TierLoreData> = {
  'Retailpunk': {
    tierName: 'Retailpunk',
    tierNumber: 0,
    shortDescription: 'Welcome to the mall. Try not to get lost or mugged.',
    fullLore: `Welcome to the mall. Try not to get lost or mugged.

Retailpunks are the newest bodies wandering the neon walkways of Retailstar Mall — wide-eyed, broke, and clutching their first Retail Ticket like it's a golden visa into the undercity. They don't know where anything is yet, and the mall can smell their confusion.

Floor 3 security ignores them, Floor 2 hustlers overcharge them, and Glitch Militia in the basement debates whether to recruit them or vaporize them.

Still, they're here.

And in a mall this brutal, simply showing up is the first achievement.

Retailpunks represent the spark — the moment someone decides to step inside the machine.`,
    color: 'text-blue-400',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-900/20',
    icon: '👤',
    emoji: '🟦',
  },
  'Mallrat': {
    tierName: 'Mallrat',
    tierNumber: 1,
    shortDescription: 'You don\'t live here… but you might as well.',
    fullLore: `You don't live here… but you might as well.

Mallrats have survived enough loops through the fluorescent corridors to know where the busted vending machines still drop free snacks and which stairwells don't smell like battery acid. They've learned the shortcuts, the back alleys between storefronts, and the exact spots where expired domains still respawn at 3:17 AM.

Mallrats move differently — confident, nosy, always listening for the soft clunk of a new drop.

They don't have authority, but they have situational awareness, which is often more valuable.

They're not respected…

…but they're definitely not ignored anymore.`,
    color: 'text-green-400',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-900/20',
    icon: '🐭',
    emoji: '🟩',
  },
  'SolDealer': {
    tierName: 'SolDealer',
    tierNumber: 2,
    shortDescription: 'If the mall has a black market, this is who runs it.',
    fullLore: `If the mall has a black market, this is who runs it.

SolDealers are operators — trench-coat-wearing negotiators of questionable legality who always "know a guy." They move inventory through shadowy corridors, storage closets, and the radioactive glow of the Scav Racks.

The mall whispers about them.

Not because they're dangerous…

…but because they always seem to get domains right before everyone else knew they existed.

SolDealers are the middlemen of the undercity economy.

Respect them.

Or don't — they'll make Sol either way.`,
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500',
    bgColor: 'bg-yellow-900/20',
    icon: '💼',
    emoji: '🟨',
  },
  'Retailrunner': {
    tierName: 'Retailrunner',
    tierNumber: 3,
    shortDescription: 'Part human, part legend, part system error.',
    fullLore: `Part human, part legend, part system error.

Retailrunners have been in the mall so long the architecture recognizes them. Sensors glitch when they walk by. Doors unlock a frame earlier. Retailrunner — the bot — pretends not to like them but always slips them intel, gossip, or sarcastic commentary.

Retailrunners operate half inside the mall and half inside the network that powers it. They get the real information:

which domains are spiking, which racks are heating up, which vendors are acting suspicious.

They are the mall's unofficial sysadmins —

a rare class of elite users the bot grudgingly respects.

When a Retailrunner arrives, the mall adjusts.`,
    color: 'text-orange-400',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-900/20',
    icon: '🏃',
    emoji: '🟧',
  },
  'Ghostrunner': {
    tierName: 'Ghostrunner',
    tierNumber: 'prestige',
    shortDescription: 'If you see one… no you didn\'t.',
    fullLore: `If you see one… no you didn't.

Ghostrunners are the mythic shadows of Retailstar Mall. They move between firewalls, crawlspaces, server racks, and dreamlike voids between the floors. Their loyalty tier isn't earned — it's inflicted by fate, legacy, or unimaginable grind.

Retailrunner refuses to roast them.

The mall refuses to track them.

The system logs refuse to acknowledge them.

Ghostrunners have access to places even developers don't fully map.

Their presence is a glitch, a rumor, a warning.

If the Retailrunner bot ever lowers its voice…

…it's because a Ghostrunner walked by.`,
    color: 'text-red-400',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-900/20',
    icon: '👻',
    emoji: '🟥',
  },
};

// Helper function to get tier lore by tier name (case-insensitive)
export function getTierLore(tierName: string | null | undefined): TierLoreData | null {
  if (!tierName) return null;
  
  // Handle various tier name formats
  const normalized = tierName.trim();
  
  // Direct match
  if (tierLoreData[normalized]) {
    return tierLoreData[normalized];
  }
  
  // Case-insensitive match
  const lower = normalized.toLowerCase();
  for (const [key, value] of Object.entries(tierLoreData)) {
    if (key.toLowerCase() === lower) {
      return value;
    }
  }
  
  // Handle "Tier 0" -> "Retailpunk" mapping
  if (lower === 'tier 0' || lower === 'tier0') {
    return tierLoreData['Retailpunk'];
  }
  
  return null;
}

// Get all tier lore entries in order
export function getAllTierLore(): TierLoreData[] {
  return [
    tierLoreData['Retailpunk'],
    tierLoreData['Mallrat'],
    tierLoreData['SolDealer'],
    tierLoreData['Retailrunner'],
    tierLoreData['Ghostrunner'],
  ];
}

// Check if a tier name is valid
export function isValidTier(tierName: string | null | undefined): boolean {
  return getTierLore(tierName) !== null;
}

