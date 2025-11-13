export interface LinkSuggestion {
  type: 'link';
  title: string;
  description: string;
  emoji: string;
  url: string;
  sarcasm: string; // Retailrunner's sarcastic intro
}

// Keyword-to-route mapping with sarcastic responses
const keywordMappings: Array<{
  keywords: string[];
  suggestion: LinkSuggestion;
}> = [
  {
    keywords: ['cheap', 'budget', 'low cost', 'affordable', 'bargain', 'inexpensive'],
    suggestion: {
      type: 'link',
      title: 'Scav Rack',
      description: 'Low-barrier .sol domains with PNG-only artwork',
      emoji: '🎒',
      url: '/scavrack',
      sarcasm: "*rolls eyes* Oh, broke again? Fine, here's the bargain bin."
    }
  },
  {
    keywords: ['meme', 'funny', 'joke', 'humor', 'comedy', 'silly'],
    suggestion: {
      type: 'link',
      title: 'Meme Domains',
      description: '50 meme domains under 20 SOL',
      emoji: '🤡',
      url: '/insights/50-meme-domains-under-20-sol',
      sarcasm: "*sighs* Of course you want meme domains... Here's some 'quality' content."
    }
  },
  {
    keywords: ['premium', 'expensive', 'vault', 'exclusive', 'high-end', 'luxury'],
    suggestion: {
      type: 'link',
      title: 'Premium Vault',
      description: 'Exclusive high-value domains',
      emoji: '🔒',
      url: '/vault',
      sarcasm: "Finally, someone with taste. Welcome to the vault."
    }
  },
  {
    keywords: ['submit', 'sell my domain', 'list domain', 'add domain', 'register domain'],
    suggestion: {
      type: 'link',
      title: 'Upgrade Page',
      description: 'Submit your domain for listing',
      emoji: '🚀',
      url: '/upgrade',
      sarcasm: "You want to sell? Interesting. Here's how."
    }
  },
  {
    keywords: ['guide', 'help', 'tutorial', 'how to', 'instructions', 'learn'],
    suggestion: {
      type: 'link',
      title: 'Guide',
      description: 'Complete mall navigation guide',
      emoji: '📖',
      url: '/guide',
      sarcasm: "Another person who doesn't read. Classic."
    }
  },
  {
    keywords: ['tools', 'generator', 'quiz', 'test', 'create', 'build'],
    suggestion: {
      type: 'link',
      title: 'Tools',
      description: 'Domain tools and generators',
      emoji: '🛠️',
      url: '/tools',
      sarcasm: "Let the AI do your thinking? Sure, why not."
    }
  },
  {
    keywords: ['tickets', 'rewards', 'rt', 'retail tickets', 'earn', 'points'],
    suggestion: {
      type: 'link',
      title: 'Retail Tickets',
      description: 'Check your RT balance and rewards',
      emoji: '🎟️',
      url: '/retail-tickets',
      sarcasm: "Fine, let me look up your pitiful balance..."
    }
  },
  {
    keywords: ['tiers', 'access', 'pass', 'membership', 'level', 'status'],
    suggestion: {
      type: 'link',
      title: 'Tiers',
      description: 'Mall access tiers and benefits',
      emoji: '🧱',
      url: '/tiers',
      sarcasm: "Checking your mall status... *sighs*"
    }
  },
  {
    keywords: ['map', 'directory', 'browse', 'explore', 'navigate', 'find'],
    suggestion: {
      type: 'link',
      title: 'Mall Directory',
      description: 'Interactive mall map and directory',
      emoji: '🗺️',
      url: '/directory',
      sarcasm: "Lost again? Here's the map."
    }
  },
  {
    keywords: ['merch', 'hoodie', 'clothing', 'apparel', 'swag', 'gear'],
    suggestion: {
      type: 'link',
      title: 'Merch Waitlist',
      description: 'Join the merch waitlist',
      emoji: '🧥',
      url: '/merch-waitlist',
      sarcasm: "Oh, you want the good stuff? Join the waitlist."
    }
  },
  {
    keywords: ['marketplace', 'shop', 'buy', 'purchase', 'store', 'catalog'],
    suggestion: {
      type: 'link',
      title: 'Marketplace',
      description: 'Browse available domains',
      emoji: '🛍️',
      url: '/marketplace',
      sarcasm: "Shopping time? Here's the marketplace."
    }
  },
  {
    keywords: ['wiki', 'info', 'learn about', 'information', 'details', 'facts'],
    suggestion: {
      type: 'link',
      title: 'Wiki Directory',
      description: 'Domain lore and information',
      emoji: '📚',
      url: '/wiki-directory',
      sarcasm: "Finally, someone who wants to learn. Here's the wiki."
    }
  },
  {
    keywords: ['meme generator', 'create meme', 'meme maker', 'generator'],
    suggestion: {
      type: 'link',
      title: 'Meme Generator',
      description: 'Create custom domain memes',
      emoji: '🎨',
      url: '/tools/meme-gen',
      sarcasm: "Let the AI do your thinking? Sure, why not."
    }
  },
  {
    keywords: ['quiz', 'test', 'archetype', 'personality'],
    suggestion: {
      type: 'link',
      title: 'Archetype Quiz',
      description: 'Discover your domain archetype',
      emoji: '🧠',
      url: '/tools/archetype-quiz',
      sarcasm: "A quiz? How... educational. *sighs*"
    }
  }
];

// Main function to detect keywords and return link suggestions
export const getLinkSuggestion = (message: string): LinkSuggestion | null => {
  const lowerMessage = message.toLowerCase();
  
  // Find the best matching keyword set
  for (const mapping of keywordMappings) {
    for (const keyword of mapping.keywords) {
      if (lowerMessage.includes(keyword)) {
        return mapping.suggestion;
      }
    }
  }
  
  return null;
};

// Helper function to get all available suggestions (for debugging)
export const getAllSuggestions = (): LinkSuggestion[] => {
  return keywordMappings.map(mapping => mapping.suggestion);
};

// Helper function to check if a message might benefit from a link suggestion
export const hasLinkPotential = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  const linkKeywords = [
    'show me', 'where is', 'how do i', 'i want', 'i need', 'can i', 'help me',
    'find', 'get', 'buy', 'sell', 'submit', 'create', 'generate'
  ];
  
  return linkKeywords.some(keyword => lowerMessage.includes(keyword));
};
