import { retailrunnerMood } from './retailrunnerPersonality';
import { getAvailableForSale, isDomainForSale } from '../data/domains';

// Domain lore data - simplified version
const getDomainLoreCard = (domainName: string) => {
  const cleanName = domainName.toLowerCase().replace('.sol', '');
  
  // Check if domain is blocklisted
  if (!isDomainForSale(domainName)) {
    return {
      available: false,
      message: `"${domainName}" is not for sale. Some things are meant to stay in the vault.`,
      lore: "This domain exists in the Retailverse but is protected from sale."
    };
  }

  // Check if domain exists in available domains
  const availableDomains = getAvailableForSale();
  const domain = availableDomains.find(d => d.name.toLowerCase() === cleanName);
  
  if (domain) {
    return {
      available: true,
      message: `"${domainName}" is available for ${domain.price}.`,
      lore: domain.description || "A domain in the Retailverse waiting for its story.",
      price: domain.price,
      category: domain.category
    };
  }

  return {
    available: false,
    message: `"${domainName}" doesn't exist in the Retailverse. Try something else.`,
    lore: "This domain is not part of our collection."
  };
};

// Enhanced mood engine with domain detection
export const retailrunnerMoodEngine = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  // Check for .sol domain mentions
  if (lowerInput.includes('.sol') || lowerInput.match(/\b\w+\.sol\b/)) {
    const domainMatch = lowerInput.match(/\b\w+\.sol\b/);
    if (domainMatch) {
      const domainName = domainMatch[0];
      const loreCard = getDomainLoreCard(domainName);
      
      if (loreCard.available) {
        return `${loreCard.message} ${loreCard.lore} ${loreCard.price ? `Price: ${loreCard.price}` : ''}`;
      } else {
        return loreCard.message;
      }
    }
  }

  // Easter egg chance (7%)
  if (Math.random() < 0.07) {
    const easterEggs = [
      "🛍️ You found an old voucher: `RETAILOGIC-25` (25% off Quick Snag builds)",
      "🎫 Hidden code activated: `MALLRAT-10` (10% off Mid Tier)",
      "💎 Secret discount: `PREMIUM-15` (15% off Premium builds)",
      "🎰 Lucky spin result: `FLASH-20` (20% off Flash Rack domains)"
    ];
    return easterEggs[Math.floor(Math.random() * easterEggs.length)];
  }

  // Compliment chance (5%)
  if (Math.random() < 0.05) {
    const compliments = [
      "You know what? You're not completely terrible at this.",
      "Hmm. You might actually have potential. Don't let it go to your head.",
      "That's... actually not bad. I'm impressed. Reluctantly.",
      "You're doing better than most. Keep it up, I guess."
    ];
    return compliments[Math.floor(Math.random() * compliments.length)];
  }

  // Use existing mood detection
  return retailrunnerMood(input);
}; 