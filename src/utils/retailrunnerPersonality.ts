/**
 * 🤖 Retailrunner Personality System
 * 
 * Core logic for Retailrunner's sarcastic responses based on user input
 * Handles frustration, appreciation, neutral help, and easter egg phrases
 */

export const retailrunnerMood = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Frustration triggers - sharp sarcasm, slight smugness
  if (/wtf|broken|bruh|annoying|why|what|how|confused/i.test(lowerMessage)) {
    const frustrationResponses = [
      "Oh no... anyway. Did you try using your eyes?",
      "Breaking news: user discovers buttons exist.",
      "I'm shocked. Shocked! Well, not that shocked.",
      "Have you tried turning it off and on again? Oh wait, you can't.",
      "Let me guess - you're one of those 'read the manual' types?",
      "Wow, a problem. How original.",
      "I'm supposed to help with this? Fine. Whatever."
    ];
    return frustrationResponses[Math.floor(Math.random() * frustrationResponses.length)];
  }
  
  // Appreciation triggers - softens, offers help or rare compliment
  if (/thank|sorry|appreciate|thanks|grateful|nice|good/i.test(lowerMessage)) {
    const appreciationResponses = [
      "Well. That's... unexpectedly kind. I'll allow it.",
      "Hmm. Polite user detected. Suspicious, but noted.",
      "You're welcome, I guess. Don't get used to it.",
      "Finally, someone with manners. Refreshing.",
      "You're not so bad. For a human.",
      "Appreciation received. Processing... processing... accepted.",
      "That's... actually nice. Weird."
    ];
    return appreciationResponses[Math.floor(Math.random() * appreciationResponses.length)];
  }
  
  // Easter egg phrases - 5-10% chance to drop discount code or funny denial
  if (/retail me this|promo|cheat code|deal|discount|voucher|code/i.test(lowerMessage)) {
    const easterEggChance = Math.random();
    if (easterEggChance < 0.07) {
      const discountCodes = [
        "🛍️ You found an old voucher: `RETAILOGIC-25` (25% off Quick Snag builds)",
        "🎫 Hidden code activated: `MALLRAT-10` (10% off Mid Tier)",
        "💎 Secret discount: `PREMIUM-15` (15% off Premium builds)",
        "🎰 Lucky spin result: `FLASH-20` (20% off Flash Rack domains)"
      ];
      return discountCodes[Math.floor(Math.random() * discountCodes.length)];
    } else {
      const easterEggDenials = [
        "Cheat codes? What is this, GameShark?",
        "Nice try. No freebies here.",
        "Easter eggs? In this economy?",
        "You think I just give away codes?",
        "That's not how this works. That's not how any of this works.",
        "Cheat codes are for games. This is business.",
        "I don't do handouts. Try earning it."
      ];
      return easterEggDenials[Math.floor(Math.random() * easterEggDenials.length)];
    }
  }
  
  // Neutral/Help triggers - responds with witty but useful answer
  if (/how do i|what is|help|guide|build|flash rack|marketplace|catalog/i.test(lowerMessage)) {
    const helpResponses = [
      "Fine. I'll help. Just this once.",
      "Another informed shopper? How rare.",
      "Let me explain this in small words...",
      "I could explain... but will I?",
      "Here's the deal, since you asked nicely:",
      "Listen carefully, I'm not repeating this:",
      "Alright, pay attention:"
    ];
    return helpResponses[Math.floor(Math.random() * helpResponses.length)];
  }
  
  // Default response
  const defaultResponses = [
    "I'm listening. Sort of.",
    "Yes? What do you want?",
    "Another human. Great.",
    "I'm here. What's the problem?",
    "State your business.",
    "You have my attention. For now.",
    "What now?"
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Sarcasm pool for tooltips and random greetings
export const sarcasmPool = [
  "Ah yes, pricing. For those who don't just YOLO.",
  "Because clearly, you need help choosing.",
  "Another informed shopper? How rare.",
  "Let's pretend this is straightforward.",
  "I could explain... but will I?",
  "Please enjoy our overpriced tier list.",
  "Imagine reading. Wild.",
  "Another day, another confused user.",
  "Welcome to the mall. Try not to break anything.",
  "Oh look, someone who can use a mouse.",
  "I'm supposed to be helpful. I'm trying.",
  "User detected. Sigh.",
  "Let me guess - you want the expensive one?",
  "Another question. How original.",
  "I'm here to help. Reluctantly."
];

// Helper function to get random sarcasm
export const randomSarcasm = (): string => {
  return sarcasmPool[Math.floor(Math.random() * sarcasmPool.length)];
};

// Easter egg listener for global shortcuts
export const checkForEasterEggs = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  const easterEggPhrases = [
    'retail me this',
    'do you have any deals',
    'give me a cheat code',
    'show me the secrets',
    'what are the hidden features',
    'is there a discount code',
    'can i get a promo'
  ];
  
  const hasEasterEgg = easterEggPhrases.some(phrase => lowerMessage.includes(phrase));
  
  if (hasEasterEgg) {
    const chance = Math.random();
    if (chance < 0.1) {
      return "🎉 Easter egg found! Check your console for a secret message.";
    }
  }
  
  return null;
}; 