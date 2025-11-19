/**
 * Category detection for .sol domains
 * Detects meme, brand, short, tech, degen, lore, defiance categories
 */

export type DomainCategory = 
  | 'meme' 
  | 'brand' 
  | 'short' 
  | 'tech' 
  | 'degen' 
  | 'lore' 
  | 'defiance'
  | 'finance'
  | 'gaming'
  | 'dao'
  | 'creator'
  | 'aesthetic';

/**
 * Dictionary words for brand detection
 */
const BRAND_WORDS = new Set([
  'flux', 'mint', 'drift', 'byte', 'code', 'bolt', 'astro', 'nova', 'zen',
  'apex', 'nexus', 'vortex', 'quantum', 'pixel', 'vector', 'matrix', 'neon',
  'crypto', 'block', 'chain', 'token', 'coin', 'swap', 'trade', 'market',
  'vault', 'safe', 'secure', 'trust', 'prime', 'elite', 'pro', 'max'
]);

/**
 * Tech/AI keywords
 */
const TECH_KEYWORDS = new Set([
  'ai', 'ml', 'bot', 'api', 'app', 'dev', 'tech', 'code', 'data', 'cloud',
  'web3', 'defi', 'nft', 'dao', 'dapp', 'protocol', 'network', 'node',
  'quantum', 'neural', 'algorithm', 'blockchain', 'crypto', 'token'
]);

/**
 * Meme/cultural keywords
 */
const MEME_KEYWORDS = new Set([
  'wif', 'bonk', 'popkin', 'pepe', 'doge', 'shib', 'chad', 'giga', 'moon',
  'diamond', 'hands', 'hodl', 'lambo', 'wen', 'gm', 'gn', 'wagmi', 'ngmi',
  'fomo', 'fud', 'rekt', 'pump', 'dump', 'ape', 'degen', 'ser', 'anon'
]);

/**
 * Degen slang
 */
const DEGEN_KEYWORDS = new Set([
  'degen', 'ape', 'wagmi', 'ngmi', 'ser', 'anon', 'gm', 'gn', 'wen', 'moon',
  'rekt', 'pump', 'dump', 'fomo', 'fud', 'diamond', 'hands', 'hodl', 'lambo',
  'zaza', 'fwog', 'drip', 'yeet', 'sus', 'based', 'cringe', 'noob', 'pro'
]);

/**
 * Finance keywords
 */
const FINANCE_KEYWORDS = new Set([
  'bank', 'vault', 'safe', 'trade', 'swap', 'exchange', 'market', 'fund',
  'capital', 'asset', 'token', 'coin', 'crypto', 'defi', 'yield', 'stake',
  'lend', 'borrow', 'pool', 'farm', 'treasury', 'reserve'
]);

/**
 * Gaming keywords
 */
const GAMING_KEYWORDS = new Set([
  'game', 'play', 'quest', 'level', 'boss', 'hero', 'warrior', 'mage',
  'rpg', 'mmo', 'pvp', 'pve', 'nft', 'metaverse', 'virtual', 'arena'
]);

/**
 * DAO keywords
 */
const DAO_KEYWORDS = new Set([
  'dao', 'governance', 'vote', 'proposal', 'treasury', 'member', 'community',
  'collective', 'syndicate', 'guild', 'alliance', 'council'
]);

/**
 * Creator keywords
 */
const CREATOR_KEYWORDS = new Set([
  'studio', 'creative', 'art', 'design', 'media', 'content', 'creator',
  'artist', 'maker', 'build', 'craft', 'workshop', 'lab'
]);

/**
 * Aesthetic keywords
 */
const AESTHETIC_KEYWORDS = new Set([
  'aesthetic', 'vibe', 'mood', 'style', 'zen', 'chill', 'vibe', 'aesthetic',
  'cyber', 'neon', 'retro', 'futuristic', 'minimal', 'maximal'
]);

/**
 * Checks if a word is in a dictionary (simplified check)
 */
function isDictionaryWord(word: string): boolean {
  // Simple heuristic: common English words
  const commonWords = new Set([
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her',
    'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how',
    'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy',
    'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'man', 'new',
    'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let'
  ]);
  
  return commonWords.has(word.toLowerCase()) || BRAND_WORDS.has(word.toLowerCase());
}

/**
 * Counts syllables in a word (approximation)
 */
function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

/**
 * Detects categories for a domain name
 */
export function detectCategories(name: string): DomainCategory[] {
  const categories: DomainCategory[] = [];
  const lowerName = name.toLowerCase();
  const words = lowerName.split(/[\s\-_]+/).filter(w => w.length > 0);
  
  // Short domain detection (3-5 characters)
  if (name.length >= 3 && name.length <= 5) {
    categories.push('short');
  }
  
  // Check for dictionary words (brand potential)
  const hasDictionaryWord = words.some(w => isDictionaryWord(w));
  if (hasDictionaryWord && name.length <= 12) {
    categories.push('brand');
  }
  
  // Tech detection
  const hasTechKeyword = Array.from(TECH_KEYWORDS).some(keyword => 
    lowerName.includes(keyword)
  );
  if (hasTechKeyword) {
    categories.push('tech');
  }
  
  // Meme detection
  const hasMemeKeyword = Array.from(MEME_KEYWORDS).some(keyword => 
    lowerName.includes(keyword)
  );
  if (hasMemeKeyword) {
    categories.push('meme');
  }
  
  // Degen detection
  const hasDegenKeyword = Array.from(DEGEN_KEYWORDS).some(keyword => 
    lowerName.includes(keyword)
  );
  if (hasDegenKeyword) {
    categories.push('degen');
  }
  
  // Finance detection
  const hasFinanceKeyword = Array.from(FINANCE_KEYWORDS).some(keyword => 
    lowerName.includes(keyword)
  );
  if (hasFinanceKeyword) {
    categories.push('finance');
  }
  
  // Gaming detection
  const hasGamingKeyword = Array.from(GAMING_KEYWORDS).some(keyword => 
    lowerName.includes(keyword)
  );
  if (hasGamingKeyword) {
    categories.push('gaming');
  }
  
  // DAO detection
  const hasDaoKeyword = Array.from(DAO_KEYWORDS).some(keyword => 
    lowerName.includes(keyword)
  );
  if (hasDaoKeyword) {
    categories.push('dao');
  }
  
  // Creator detection
  const hasCreatorKeyword = Array.from(CREATOR_KEYWORDS).some(keyword => 
    lowerName.includes(keyword)
  );
  if (hasCreatorKeyword) {
    categories.push('creator');
  }
  
  // Aesthetic detection
  const hasAestheticKeyword = Array.from(AESTHETIC_KEYWORDS).some(keyword => 
    lowerName.includes(keyword)
  );
  if (hasAestheticKeyword) {
    categories.push('aesthetic');
  }
  
  // Defiance detection (contains "not", "anti", "un", etc.)
  if (lowerName.match(/\b(not|anti|un|non|no)\w*/)) {
    categories.push('defiance');
  }
  
  // If no categories detected, default to brand if it's clean
  if (categories.length === 0 && name.length <= 15 && !/\d/.test(name) && !/-/.test(name)) {
    categories.push('brand');
  }
  
  return [...new Set(categories)]; // Remove duplicates
}

/**
 * Analyzes word structure
 */
export interface WordStructure {
  length: number;
  wordCount: number;
  containsNumber: boolean;
  containsHyphen: boolean;
  isWord: boolean;
  syllables: number;
}

export function analyzeWordStructure(name: string): WordStructure {
  const words = name.split(/[\s\-_]+/).filter(w => w.length > 0);
  const firstWord = words[0] || '';
  
  return {
    length: name.length,
    wordCount: words.length,
    containsNumber: /\d/.test(name),
    containsHyphen: /-/.test(name),
    isWord: isDictionaryWord(firstWord),
    syllables: words.reduce((sum, w) => sum + countSyllables(w), 0)
  };
}

