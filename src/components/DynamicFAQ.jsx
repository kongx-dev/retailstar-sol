import React, { useState } from 'react';
import { getKeywordsByTarget } from '../data/seo-keywords';

const DynamicFAQ = ({ target, maxItems = 5 }) => {
  const [openItems, setOpenItems] = useState(new Set());
  const keywords = getKeywordsByTarget(target);
  
  // Filter keywords that are suitable for FAQ (learn intent)
  const faqKeywords = keywords
    .filter(item => item.intent === 'learn' && item.use_case.includes('FAQ'))
    .slice(0, maxItems);

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  if (faqKeywords.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqKeywords.map((item, index) => (
          <div 
            key={index}
            className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden neon-glow"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors"
            >
              <span className="text-lg font-medium text-gray-200">
                {item.keyword.charAt(0).toUpperCase() + item.keyword.slice(1)}?
              </span>
              <span className={`text-cyan-400 transition-transform ${
                openItems.has(index) ? 'rotate-180' : ''
              }`}>
                ▼
              </span>
            </button>
            
            {openItems.has(index) && (
              <div className="px-6 pb-4">
                <div className="text-gray-300 leading-relaxed">
                  <p className="mb-3">
                    {generateFAQAnswer(item.keyword, item.persona, target)}
                  </p>
                  
                  <div className="mt-4 p-3 bg-gray-800/30 rounded border-l-4 border-cyan-400">
                    <p className="text-sm text-cyan-300 font-medium mb-1">
                      💡 Pro Tip for {item.persona}:
                    </p>
                    <p className="text-sm text-gray-300">
                      {generateProTip(item.keyword, item.persona)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to generate contextual FAQ answers
const generateFAQAnswer = (keyword, persona, target) => {
  const domainName = target.replace('.sol', '');
  
  const answers = {
    'how to find rare solana nfts': 
      `Finding rare Solana NFTs requires a strategic approach. Start by exploring established marketplaces like Magic Eden and Tensor, where you can filter by rarity scores and traits. Use rarity tools like Solana NFT Rarity to analyze collection statistics. Join Discord communities for early access to minting events, and follow top collectors on Twitter for insider tips. Remember, rarity isn't just about traits - it's also about timing and community engagement.`,
    
    'how to deploy a solana program': 
      `Deploying a Solana program involves several key steps. First, ensure you have the Solana CLI installed and your development environment configured. Write your program in Rust using the Solana SDK, then compile it to BPF bytecode. Use the Solana CLI to deploy to devnet for testing, then to mainnet-beta for production. Always test thoroughly on devnet first, and consider using Anchor framework for easier development.`,
    
    'how to create your own solana meme nft': 
      `Creating your own Solana meme NFT is easier than you think! Start by designing your meme using tools like Canva or Photoshop. Convert it to a PNG format with transparent background. Use platforms like Candy Machine or Metaplex to mint your NFT. Set up a Solana wallet, fund it with SOL for gas fees, and follow the minting process. Don't forget to add metadata like name, description, and attributes.`,
    
    'how to start a solana dao': 
      `Starting a Solana DAO requires careful planning and the right tools. Begin by defining your DAO's purpose and governance structure. Choose a DAO framework like Realms or Squads for Solana. Set up your treasury wallet and governance token. Create proposals for initial funding and member onboarding. Use tools like Helius for RPC and Jupiter for token swaps. Remember, successful DAOs are built on strong community engagement.`,
    
    'how to store and display solana nfts': 
      `Storing and displaying Solana NFTs requires both security and accessibility. Use hardware wallets like Ledger for long-term storage of valuable NFTs. For display, consider digital frames or dedicated NFT gallery apps. Many collectors use platforms like Solflare or Phantom for easy access and display. Create backups of your wallet seed phrases and store them securely. Consider using multiple wallets for different purposes.`,
    
    'how to earn money playing solana games': 
      `Earning money through Solana games involves understanding the play-to-earn (P2E) model. Start by researching games with sustainable tokenomics and active communities. Focus on games that reward skill and time investment rather than just initial capital. Diversify across multiple games to reduce risk. Join Discord communities to learn strategies from experienced players. Remember, P2E success requires both gaming skill and market timing.`,
    
    'how to evaluate solana startup investments': 
      `Evaluating Solana startup investments requires thorough due diligence. Research the team's background and previous projects. Analyze the tokenomics, including token distribution and vesting schedules. Check the project's GitHub activity and community engagement. Assess the competitive landscape and market timing. Look for projects with strong partnerships and clear roadmaps. Always invest only what you can afford to lose.`
  };
  
  return answers[keyword] || 
    `This is a comprehensive guide for ${persona} looking to explore ${keyword} on ${domainName}. Our platform provides the tools, resources, and community you need to succeed in the Solana ecosystem. Join thousands of users who are already building, trading, and innovating on ${domainName}.`;
};

// Helper function to generate pro tips
const generateProTip = (keyword, persona) => {
  const tips = {
    'how to find rare solana nfts': 
      'Use rarity tools before minting and join alpha groups for early access to promising collections.',
    
    'how to deploy a solana program': 
      'Start with Anchor framework for easier development and use devnet extensively before mainnet deployment.',
    
    'how to create your own solana meme nft': 
      'Focus on unique, culturally relevant content and build a community around your meme before minting.',
    
    'how to start a solana dao': 
      'Begin with a small, focused community and gradually expand governance as your DAO grows.',
    
    'how to store and display solana nfts': 
      'Use hardware wallets for high-value NFTs and create a dedicated display wallet for showcasing.',
    
    'how to earn money playing solana games': 
      'Focus on games with sustainable tokenomics and diversify across multiple P2E projects.',
    
    'how to evaluate solana startup investments': 
      'Always DYOR (Do Your Own Research) and never invest more than you can afford to lose.'
  };
  
  return tips[keyword] || 
    `Stay connected with the ${persona} community and always DYOR (Do Your Own Research) before making decisions.`;
};

export default DynamicFAQ; 