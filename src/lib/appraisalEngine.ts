/**
 * Main appraisal engine for .sol domains
 * Combines category detection, rarity scoring, and hype analysis
 */

import { detectCategories, analyzeWordStructure } from './detectors';
import { rarityAlgorithm } from './rarityAlgorithm';
import { hypeKeywords } from './hypeKeywords';
import { generateContextualQuip, RetailrunnerQuip } from './retailrunnerQuips';

export interface AppraisalBreakdown {
  brandability: number; // 0-30
  meme: number; // 0-30
  value: number; // 0-40
  finalScore: number; // 0-100
  solEstimateLow: number;
  solEstimateHigh: number;
  categories: string[];
  alerts: string[];
  quip: RetailrunnerQuip;
  structure: {
    length: number;
    wordCount: number;
    containsNumber: boolean;
    containsHyphen: boolean;
    isWord: boolean;
    syllables: number;
  };
  rarity: {
    brand: number;
    linguistic: number;
    cleanlinessScore: number;
    lengthValue: number;
    semanticValue: number;
    useCaseScore: number;
  };
  hype: {
    memeBoost: number;
    hypeBoost: number;
    culturalRelevance: string[];
    slangMatches: string[];
  };
}

/**
 * Maps final score to SOL price range
 */
function mapScoreToPriceRange(finalScore: number): { low: number; high: number } {
  if (finalScore >= 80) {
    return { low: 12, high: 50 };
  } else if (finalScore >= 60) {
    return { low: 5, high: 12 };
  } else if (finalScore >= 30) {
    return { low: 2, high: 5 };
  } else {
    return { low: 0.5, high: 2 };
  }
}

/**
 * Main appraisal function
 */
export function appraiseSolDomain(input: string): AppraisalBreakdown {
  // Parse domain name
  const name = input.replace(/\.sol$/i, '').toLowerCase().trim();
  
  if (!name || name.length === 0) {
    throw new Error('Invalid domain name');
  }
  
  // Analyze structure
  const structure = analyzeWordStructure(name);
  
  // Detect categories
  const categories = detectCategories(name);
  
  // Calculate rarity
  const rarity = rarityAlgorithm(name, categories);
  
  // Calculate hype
  const hype = hypeKeywords(name);
  
  // Calculate Brandability Score (0-30)
  const brandability = Math.min(30, 
    rarity.brand * 2 + 
    rarity.linguistic * 2 + 
    rarity.cleanlinessScore * 1
  );
  
  // Calculate Meme Score (0-30)
  let meme = 0;
  if (categories.includes('meme') || categories.includes('degen')) {
    meme = Math.min(30, hype.memeBoost + rarity.memeScore);
  } else {
    // Still give some meme points if it has hype keywords
    meme = Math.min(15, hype.memeBoost * 0.5);
  }
  
  // Calculate Value Score (0-40)
  const value = Math.min(40,
    rarity.lengthValue +
    rarity.semanticValue * 1.5 +
    rarity.useCaseScore * 2 +
    hype.hypeBoost * 2
  );
  
  // Calculate final score
  const finalScore = Math.min(100, brandability + meme + value);
  
  // Map to price range
  const priceRange = mapScoreToPriceRange(finalScore);
  
  // Generate Retailrunner quip
  const quip = generateContextualQuip(brandability, meme, value, categories);
  
  return {
    brandability: Math.round(brandability * 10) / 10,
    meme: Math.round(meme * 10) / 10,
    value: Math.round(value * 10) / 10,
    finalScore: Math.round(finalScore * 10) / 10,
    solEstimateLow: priceRange.low,
    solEstimateHigh: priceRange.high,
    categories,
    alerts: rarity.alerts,
    quip,
    structure,
    rarity: {
      brand: rarity.brand,
      linguistic: rarity.linguistic,
      cleanlinessScore: rarity.cleanlinessScore,
      lengthValue: rarity.lengthValue,
      semanticValue: rarity.semanticValue,
      useCaseScore: rarity.useCaseScore
    },
    hype: {
      memeBoost: hype.memeBoost,
      hypeBoost: hype.hypeBoost,
      culturalRelevance: hype.culturalRelevance,
      slangMatches: hype.slangMatches
    }
  };
}


