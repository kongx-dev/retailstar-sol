/**
 * Rarity and linguistic scoring algorithm for .sol domains
 * Analyzes length, cleanliness, linguistic quality, and startup aesthetic
 */

import { analyzeWordStructure, WordStructure } from './detectors';

export interface RarityScore {
  brand: number; // 0-10 (brandability)
  linguistic: number; // 0-10 (dictionary words, syllables)
  cleanlinessScore: number; // 0-10 (no numbers, hyphens, cringe)
  lengthValue: number; // 0-15 (3L, 4L, 5L premium)
  semanticValue: number; // 0-10 (category value)
  useCaseScore: number; // 0-5 (potential use cases)
  memeScore: number; // 0-30 (for meme domains)
  alerts: string[]; // Warnings about cringe flags, etc.
}

/**
 * Startup aesthetic keywords
 */
const STARTUP_KEYWORDS = new Set([
  'flux', 'mint', 'drift', 'byte', 'code', 'bolt', 'astro', 'nova', 'zen',
  'apex', 'nexus', 'vortex', 'quantum', 'pixel', 'vector', 'matrix', 'neon',
  'prime', 'elite', 'pro', 'max', 'plus', 'ultra', 'super', 'mega'
]);

/**
 * AI/Tech prefixes and suffixes
 */
const TECH_PREFIXES = ['ai', 'ml', 'bot', 'api', 'app', 'dev', 'tech'];
const TECH_SUFFIXES = ['ai', 'bot', 'app', 'dev', 'tech', 'lab', 'io', 'xyz'];

/**
 * Cringe flags (420, 69, rekt, etc.)
 */
const CRINGE_FLAGS = ['420', '69', 'rekt', 'lol', 'lmao', 'rofl', 'wtf', 'omg'];

/**
 * Use case keywords
 */
const USE_CASE_KEYWORDS: Record<string, number> = {
  'store': 2,
  'shop': 2,
  'market': 2,
  'exchange': 3,
  'dao': 3,
  'tool': 2,
  'studio': 2,
  'lab': 2,
  'vault': 3,
  'bank': 3,
  'protocol': 4,
  'network': 3,
  'platform': 3
};

/**
 * Category value multipliers
 */
const CATEGORY_VALUES: Record<string, number> = {
  'finance': 10,
  'tech': 8,
  'brand': 7,
  'meme': 6,
  'gaming': 5,
  'dao': 6,
  'creator': 5,
  'aesthetic': 4,
  'degen': 3,
  'defiance': 2
};

/**
 * Calculates rarity score for a domain
 */
export function rarityAlgorithm(
  name: string,
  categories: string[] = []
): RarityScore {
  const structure = analyzeWordStructure(name);
  const alerts: string[] = [];
  
  // Brand score (0-10)
  let brand = 0;
  if (structure.isWord) brand += 3;
  if (structure.syllables <= 2) brand += 2;
  if (!structure.containsNumber && !structure.containsHyphen) brand += 3;
  if (STARTUP_KEYWORDS.has(name.toLowerCase())) brand += 2;
  
  // Check for tech prefixes/suffixes
  const lowerName = name.toLowerCase();
  if (TECH_PREFIXES.some(p => lowerName.startsWith(p))) brand += 1;
  if (TECH_SUFFIXES.some(s => lowerName.endsWith(s))) brand += 1;
  
  brand = Math.min(10, brand);
  
  // Linguistic score (0-10)
  let linguistic = 0;
  if (structure.isWord) linguistic += 4;
  if (structure.syllables <= 2) linguistic += 3;
  if (structure.wordCount === 1) linguistic += 2;
  if (structure.length <= 8) linguistic += 1;
  
  linguistic = Math.min(10, linguistic);
  
  // Cleanliness score (0-10)
  let cleanlinessScore = 10;
  if (structure.containsNumber) {
    cleanlinessScore -= 3;
    alerts.push('Contains numbers');
  }
  if (structure.containsHyphen) {
    cleanlinessScore -= 2;
    alerts.push('Contains hyphens');
  }
  
  // Check for cringe flags
  const hasCringe = CRINGE_FLAGS.some(flag => lowerName.includes(flag));
  if (hasCringe) {
    cleanlinessScore -= 5;
    alerts.push('Contains cringe flags (420, 69, rekt, etc.)');
  }
  
  cleanlinessScore = Math.max(0, cleanlinessScore);
  
  // Length value (0-15)
  let lengthValue = 0;
  if (structure.length === 3) {
    lengthValue = 15; // 3L premium
  } else if (structure.length === 4) {
    lengthValue = 12; // 4L premium
  } else if (structure.length === 5) {
    lengthValue = 10; // 5L premium
  } else if (structure.length <= 7) {
    lengthValue = 7;
  } else if (structure.length <= 10) {
    lengthValue = 5;
  } else if (structure.length <= 15) {
    lengthValue = 3;
  } else {
    lengthValue = 1;
  }
  
  // Semantic value (0-10) based on categories
  let semanticValue = 0;
  if (categories.length > 0) {
    const maxCategoryValue = Math.max(
      ...categories.map(cat => CATEGORY_VALUES[cat] || 0)
    );
    semanticValue = Math.min(10, maxCategoryValue);
  } else {
    semanticValue = 3; // Default for uncategorized
  }
  
  // Use case score (0-5)
  let useCaseScore = 0;
  for (const [keyword, score] of Object.entries(USE_CASE_KEYWORDS)) {
    if (lowerName.includes(keyword)) {
      useCaseScore = Math.max(useCaseScore, score);
    }
  }
  
  // Meme score (0-30) - will be calculated separately if meme category
  const memeScore = 0; // This is handled in the main engine
  
  return {
    brand,
    linguistic,
    cleanlinessScore,
    lengthValue,
    semanticValue,
    useCaseScore,
    memeScore,
    alerts
  };
}

