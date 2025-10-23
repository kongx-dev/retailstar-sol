import { domainWordPools } from '../data/domainWordPools';

export type GeneratedDomain = {
  name: string; // e.g., "copecity.sol"
  category: 'degen' | 'meme' | 'iconic' | 'vibes';
  rarity: 'common' | 'rare' | 'vaulted';
  rarityEmoji: string;
};

export type DomainGenerationOptions = {
  userInput?: string;
  count?: number;
};

/**
 * Generate creative meme domain names by combining user input with curated word pools
 */
export const generateDomains = (options: DomainGenerationOptions = {}): GeneratedDomain[] => {
  const { userInput = '', count = 5 } = options;
  
  const domains: GeneratedDomain[] = [];
  const usedNames = new Set<string>();
  
  // Helper function to get random item from array
  const getRandomItem = <T>(array: readonly T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  // Helper function to get random rarity with weighted distribution
  const getRandomRarity = (): { rarity: GeneratedDomain['rarity']; emoji: string } => {
    const rand = Math.random();
    if (rand < 0.6) return { rarity: 'common', emoji: '🔥' };
    if (rand < 0.9) return { rarity: 'rare', emoji: '🔮' };
    return { rarity: 'vaulted', emoji: '🕳' };
  };
  
  // Helper function to get random category
  const getRandomCategory = (): GeneratedDomain['category'] => {
    const categories: GeneratedDomain['category'][] = ['degen', 'meme', 'iconic', 'vibes'];
    return getRandomItem(categories);
  };
  
  // Helper function to create domain name
  const createDomainName = (): string => {
    let domainName = '';
    
    if (userInput.trim()) {
      // Use user input as base
      const cleanInput = userInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanInput) {
        // 70% chance to use input as prefix, 30% as suffix
        if (Math.random() < 0.7) {
          domainName = cleanInput + getRandomItem(domainWordPools.suffixes);
        } else {
          domainName = getRandomItem(domainWordPools.prefixes) + cleanInput;
        }
      }
    }
    
    // If no user input or empty result, generate random
    if (!domainName) {
      const prefix = getRandomItem(domainWordPools.prefixes);
      const suffix = getRandomItem(domainWordPools.suffixes);
      domainName = prefix + suffix;
    }
    
    // Add .sol suffix
    return domainName + '.sol';
  };
  
  // Generate unique domains
  let attempts = 0;
  const maxAttempts = count * 3; // Prevent infinite loops
  
  while (domains.length < count && attempts < maxAttempts) {
    attempts++;
    
    const domainName = createDomainName();
    
    // Skip if already used
    if (usedNames.has(domainName)) {
      continue;
    }
    
    // Skip inappropriate combinations (basic filtering)
    if (isInappropriate(domainName)) {
      continue;
    }
    
    const { rarity, emoji } = getRandomRarity();
    const category = getRandomCategory();
    
    const domain: GeneratedDomain = {
      name: domainName,
      category,
      rarity,
      rarityEmoji: emoji
    };
    
    // Log individual domain generation
    console.log('🎭 Generated domain:', domain);
    
    domains.push(domain);
    usedNames.add(domainName);
  }
  
  return domains;
};

/**
 * Basic inappropriate content filtering
 */
const isInappropriate = (domainName: string): boolean => {
  const inappropriate = [
    'fuck', 'shit', 'damn', 'hell', 'bitch', 'ass', 'dick', 'pussy', 'cock', 'cunt',
    'nazi', 'hitler', 'killer', 'murder', 'death', 'suicide', 'rape', 'pedo', 'loli'
  ];
  
  const lowerDomain = domainName.toLowerCase();
  return inappropriate.some(word => lowerDomain.includes(word));
};

/**
 * Generate domains with specific category bias
 */
export const generateDomainsByCategory = (
  category: GeneratedDomain['category'],
  options: DomainGenerationOptions = {}
): GeneratedDomain[] => {
  const allDomains = generateDomains({ ...options, count: options.count || 20 });
  
  // Filter and prioritize by category
  const categoryWords = domainWordPools.categories[category] || [];
  const scoredDomains = allDomains.map(domain => {
    const domainBase = domain.name.replace('.sol', '').toLowerCase();
    let score = 0;
    
    // Check if domain contains category-specific words
    categoryWords.forEach((word: string) => {
      if (domainBase.includes(word.toLowerCase())) {
        score += 2;
      }
    });
    
    // Bonus for exact category match
    if (domain.category === category) {
      score += 1;
    }
    
    return { domain, score };
  });
  
  // Sort by score and return top results
  return scoredDomains
    .sort((a, b) => b.score - a.score)
    .slice(0, options.count || 5)
    .map(item => item.domain);
};

/**
 * Get random domain name for quick generation
 */
export const getRandomDomain = (): GeneratedDomain => {
  const domains = generateDomains({ count: 1 });
  return domains[0] || {
    name: 'example.sol',
    category: 'meme',
    rarity: 'common',
    rarityEmoji: '🔥'
  };
};
