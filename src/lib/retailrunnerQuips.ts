/**
 * Retailrunner personality-driven commentary generator
 * Provides contextual quips based on appraisal scores
 */

export interface RetailrunnerQuip {
  text: string;
  tone: 'scav' | 'mid' | 'premium' | 'mythic';
}

/**
 * Generates Retailrunner commentary based on final score
 */
export function generateRetailrunnerQuip(finalScore: number): RetailrunnerQuip {
  if (finalScore >= 80) {
    return {
      text: "Vault-tier flex. If you don't buy it, someone else will.",
      tone: 'mythic'
    };
  } else if (finalScore >= 60) {
    return {
      text: "If this were my rack, I'd mark it premium.",
      tone: 'premium'
    };
  } else if (finalScore >= 30) {
    return {
      text: "This one hums with potential… But I've seen better.",
      tone: 'mid'
    };
  } else {
    return {
      text: "This belongs in the Scav Rack, no offense.",
      tone: 'scav'
    };
  }
}

/**
 * Generates contextual quip based on specific score breakdown
 */
export function generateContextualQuip(
  brandability: number,
  meme: number,
  value: number,
  categories: string[]
): RetailrunnerQuip {
  // High meme, low brand = degen play
  if (meme > 20 && brandability < 15) {
    return {
      text: "Pure degen energy. Not for the faint of heart.",
      tone: 'mid'
    };
  }
  
  // High brand, low meme = professional
  if (brandability > 20 && meme < 10) {
    return {
      text: "Clean. Professional. The kind of domain that opens doors.",
      tone: 'premium'
    };
  }
  
  // Short domain premium
  if (value > 25 && categories.includes('short')) {
    return {
      text: "Short and sweet. These don't come cheap.",
      tone: 'premium'
    };
  }
  
  // High meme score
  if (meme > 25) {
    return {
      text: "This one's got meme potential written all over it.",
      tone: 'premium'
    };
  }
  
  // Low scores across the board
  if (brandability < 10 && meme < 10 && value < 15) {
    return {
      text: "This belongs in the Scav Rack, no offense.",
      tone: 'scav'
    };
  }
  
  // Default based on final score
  const finalScore = brandability + meme + value;
  return generateRetailrunnerQuip(finalScore);
}

