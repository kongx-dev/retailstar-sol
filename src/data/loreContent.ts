export interface LoreChapter {
  id: string;
  title: string;
  content: string;
  emoji: string;
}

export const retailstarLore: LoreChapter[] = [
  {
    id: "scav-rack-era",
    title: "The Scav Rack Era",
    content: `Before the mall had gates, before the vaults clicked shut, there was only the Scav Rack.

In a forgotten alley of the Solana subnet, the Rack flickered to life. It didn't ask questions. It didn't validate wallets. It simply *was* — a cracked vending machine stacked with meme-tier domains and corrupted PNGs. No metadata. No promises. Just vibes and terminal static.

Early adopters called themselves **bin snipers**. They bought for 0.1 SOL. Sometimes less. They didn't know why — they just *needed* that JPEG.

And then something changed.`,
    emoji: "📼"
  },
  {
    id: "retail-tickets",
    title: "The Emergence of Retail Tickets",
    content: `As the Rack drew crowds, chaos bred structure. A new currency emerged: **Retail Tickets (RTs)**.

Rumors spread that certain domains, when clicked or held, *gave tickets*. An Easter Egg behind the vending machine. A blinking LED in \`/boilerroom\`. RTs became the mall's underground currency.

1 RT could buy you a respin on the Slot Machine. 5 RTs could buy you access to the vault.

Every .2 SOL spent fed the machine.`,
    emoji: "🧰"
  },
  {
    id: "gating-mall",
    title: "The Gating of the Mall",
    content: `With demand rising and outsiders flooding in, the mall did what every good dystopian economy does:

It gated.

A chrome door appeared at the front of Retailstar Mall. It scanned wallets. Only those with RTs, vault domains, or valid tier access could enter.

Inside? Vault-only drops. Slot Machines. Flash sales. Hoodies-only dojo rooms. A place where knowledge of lore, not just SOL, gave you edge.`,
    emoji: "🛍️"
  },
  {
    id: "factions-rise",
    title: "Rise of the Factions",
    content: `From the ruins of the Scav Rack and the neon-lit vault emerged classes:

- **Retailpunks**: the newest bodies wandering the neon walkways — wide-eyed, broke, and clutching their first Retail Ticket
- **Mallrats**: survivors who've learned the shortcuts, the back alleys, and the exact spots where expired domains respawn
- **SolDealers**: operators who move inventory through shadowy corridors, always "knowing a guy"
- **Retailrunners**: part human, part legend, part system error — the mall's unofficial sysadmins
- **Ghostrunners**: mythic shadows that move between firewalls, crawlspaces, and dreamlike voids

Each with their perks. Each with secrets.`,
    emoji: "👥"
  },
  {
    id: "whats-next",
    title: "What's Next?",
    content: `Outside the mall walls, whispers of a **Flea Market** grow louder. A public square for misfits, where expired domains, janky builds, and AI-glitched sites get flipped for scrap or glory.

The mall remains gated.
But the story isn't over.

**Retailstar never promised luxury. It promised lore.**`,
    emoji: "🛣️"
  },
  {
    id: "scav-rack-origins",
    title: "The Scav Rack Origins",
    content: `The Scav Rack wasn't built — it was discovered. A glitch in the Solana subnet, a backdoor that led to a digital alley where domains were cheap and vibes were cheaper.

Early users called it the "meme zone" because that's exactly what it was. No fancy builds, no promises of utility. Just domains with upgraded PFPs, corrupted PNGs, and the occasional hidden gem.

The Rack operated on simple rules:
- Pay what you can afford
- No questions asked
- Everything is temporary
- Vibes over utility

It was chaos, but it was *their* chaos.`,
    emoji: "🎰"
  },
  {
    id: "retail-ticket-economy",
    title: "The Retail Ticket Economy",
    content: `Retail Tickets (RTs) didn't start as a currency — they started as an Easter Egg. Hidden behind certain domains, buried in the metadata, were these digital tokens that seemed to do nothing.

Until someone figured out they could be spent.

1 RT = One respin on the Slot Machine
5 RTs = Access to the vault
10 RTs = A chance at the hoodie-only dojo

The economy was simple: spend SOL to earn RTs, spend RTs to access better content. But the real genius was that RTs couldn't be bought directly — they had to be earned through engagement.

Every .2 SOL spent on domains fed the machine. Every click, every visit, every share generated RTs. It was the perfect engagement loop.`,
    emoji: "🎫"
  },
  {
    id: "mall-evolution",
    title: "From Rack to Mall",
    content: `The transformation from Scav Rack to Retailstar Mall wasn't planned — it was organic. As more users discovered the Rack, as more domains were listed, as more lore was written, the space evolved.

The chrome door appeared one day, and with it came structure:
- **Gating**: Only those with RTs or vault domains could enter
- **Tiers**: Different access levels based on engagement
- **Lore**: Stories that gave context to every domain
- **Community**: Factions that formed around different interests

The mall became more than a marketplace — it became a universe. Each domain was a storefront, each wiki page was a story, each faction had its own secrets.

The Rack was still there, but now it was just one part of something much bigger.`,
    emoji: "🏬"
  }
];

// Progress tracking functions
export const getLoreProgress = (): number => {
  try {
    const progress = localStorage.getItem('retailstar_lore_progress');
    return progress ? parseInt(progress) : 0;
  } catch (error) {
    console.error('Error getting lore progress:', error);
    return 0;
  }
};

export const setLoreProgress = (progress: number): void => {
  try {
    localStorage.setItem('retailstar_lore_progress', progress.toString());
  } catch (error) {
    console.error('Error setting lore progress:', error);
  }
};

export const markChapterAsRead = (chapterId: string): void => {
  try {
    const readChapters = getReadChapters();
    if (!readChapters.includes(chapterId)) {
      readChapters.push(chapterId);
      localStorage.setItem('retailstar_read_chapters', JSON.stringify(readChapters));
      
      // Update progress
      const progress = Math.round((readChapters.length / retailstarLore.length) * 100);
      setLoreProgress(progress);
    }
  } catch (error) {
    console.error('Error marking chapter as read:', error);
  }
};

export const getReadChapters = (): string[] => {
  try {
    const readChapters = localStorage.getItem('retailstar_read_chapters');
    return readChapters ? JSON.parse(readChapters) : [];
  } catch (error) {
    console.error('Error getting read chapters:', error);
    return [];
  }
};

export const isChapterRead = (chapterId: string): boolean => {
  try {
    const readChapters = getReadChapters();
    return readChapters.includes(chapterId);
  } catch (error) {
    console.error('Error checking if chapter is read:', error);
    return false;
  }
};

export const resetLoreProgress = (): void => {
  try {
    localStorage.removeItem('retailstar_lore_progress');
    localStorage.removeItem('retailstar_read_chapters');
  } catch (error) {
    console.error('Error resetting lore progress:', error);
  }
}; 

export function hasSeenLore(): boolean {
  return getReadChapters().length > 0;
} 