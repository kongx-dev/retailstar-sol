/**
 * Hype and meme keyword matching for .sol domains
 * Detects cultural relevance, slang, and virality potential
 */

export interface HypeScore {
  memeBoost: number; // 0-30
  hypeBoost: number; // 0-10
  culturalRelevance: string[];
  slangMatches: string[];
}

/**
 * High-value cultural references
 */
const CULTURAL_REFERENCES: Record<string, number> = {
  'wif': 10, // dogwifhat
  'bonk': 8,
  'popkin': 8,
  'pepe': 7,
  'doge': 7,
  'shib': 6,
  'chad': 5,
  'giga': 5,
  'moon': 4,
  'diamond': 4,
  'hands': 3,
  'lambo': 3
};

/**
 * Meme slang with virality scores
 */
const MEME_SLANG: Record<string, number> = {
  'degen': 6,
  'giga': 5,
  'ape': 5,
  'wagmi': 4,
  'zaza': 4,
  'fwog': 4,
  'drip': 3,
  'yeet': 3,
  'hodl': 3,
  'ngmi': 2,
  'ser': 2,
  'anon': 2,
  'gm': 2,
  'gn': 2,
  'wen': 2,
  'moon': 3,
  'rekt': 2,
  'pump': 2,
  'dump': 2,
  'fomo': 2,
  'fud': 2,
  'sus': 2,
  'based': 3,
  'cringe': 1,
  'noob': 1,
  'pro': 2
};

/**
 * Trending patterns (combinations that are hot)
 */
const TRENDING_PATTERNS: Record<string, number> = {
  'wif': 8,
  'bonk': 7,
  'popkin': 7,
  'giga': 5,
  'chad': 5,
  'ape': 4,
  'degen': 4
};

/**
 * Calculates hype score for a domain name
 */
export function hypeKeywords(name: string): HypeScore {
  const lowerName = name.toLowerCase();
  const culturalRelevance: string[] = [];
  const slangMatches: string[] = [];
  let memeBoost = 0;
  let hypeBoost = 0;
  
  // Check cultural references
  for (const [keyword, score] of Object.entries(CULTURAL_REFERENCES)) {
    if (lowerName.includes(keyword)) {
      culturalRelevance.push(keyword);
      memeBoost += score;
    }
  }
  
  // Check meme slang
  for (const [keyword, score] of Object.entries(MEME_SLANG)) {
    if (lowerName.includes(keyword)) {
      slangMatches.push(keyword);
      memeBoost += score;
    }
  }
  
  // Check trending patterns (bonus for exact matches)
  for (const [pattern, score] of Object.entries(TRENDING_PATTERNS)) {
    if (lowerName === pattern || lowerName.startsWith(pattern) || lowerName.endsWith(pattern)) {
      hypeBoost += score;
    }
  }
  
  // Cap meme boost at 30
  memeBoost = Math.min(30, memeBoost);
  
  // Additional hype boost for short meme names
  if (name.length <= 5 && (culturalRelevance.length > 0 || slangMatches.length > 0)) {
    hypeBoost += 3;
  }
  
  // Cap hype boost at 10
  hypeBoost = Math.min(10, hypeBoost);
  
  return {
    memeBoost,
    hypeBoost,
    culturalRelevance,
    slangMatches
  };
}

