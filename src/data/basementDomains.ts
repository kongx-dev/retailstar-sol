// DEPRECATED: This file is kept for reference only
// Supabase is now the single source of truth for basement domain data
// Use useDomains hook or domainQueries for fetching basement domains

export interface BasementDomain {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  color: 'cyan' | 'green' | 'purple' | 'red' | 'yellow';
  description: string;
}

// DEPRECATED: Local basement domains array removed - use Supabase queries instead
// export const basementDomains: BasementDomain[] = ... (removed)

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




