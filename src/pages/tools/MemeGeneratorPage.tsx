import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { GeneratedDomain } from '../../utils/generateDomains';
import { useManualSNSAvailability, SNSAvailabilityResult, SNSAvailabilityStatus, sanitizeDomainName, isValidDomainFormat } from '../../hooks/useCheckSNSAvailability';
import memeGeneratorBg from '../../assets/meme-generator.png';

const emotionWords = [
  "cope", "panic", "fear", "despair", "fomo", "downbad", "tilted",
  "overload", "shame", "fraud", "exhaustion", "mania", "stress",
  "crybaby", "rekt", "doom", "scarcity", "regret", "delusion",
  "euphoria", "ragequit", "loss", "pain"
];

const chaosNouns = [
  "terminal", "factory", "extractor", "device", "module", "cabinet",
  "engine", "matrix", "panel", "node", "conveyor", "gearbox",
  "chamber", "forge", "locker", "garage", "basement", "overflow",
  "filtration", "optimizer", "transmitter", "loop", "vault", 
  "unit", "switch", "console", "station"
];

const meltdownWords = [
  "crash", "hyper", "mega", "ultra", "super", "over", "nano", "giga",
  "chainbreak", "rug", "liquidation", "meltdown", "eviction",
  "migration", "wipeout", "drain", "exploit", "spiral"
];

const verbs = [
  "drain", "extract", "optimize", "amplify", "distort", "wipe", 
  "misprice", "farm", "flip", "detonate", "override", "inject",
  "disrupt", "scramble", "degen", "inflate", "dump"
];

const npcs = [
  "npc", "rookie", "intern", "scav", "mallrat", "normie", "tourist",
  "lurker", "whalelet"
];

const damageWords = [
  "bomb", "fuse", "blast", "strike", "spark", "shock", "grinder",
  "ram", "wrecker", "breaker"
];

const trendShots = [
  "solana congestion",
  "pumpfun meta",
  "jito airdrop",
  "memecoin launch season",
  "tensor whales",
  "ai agent boom",
  "market chop",
  "flywheel rotation",
  "airdrops farming"
];

const marketTerms = [
  "liquidity","slippage","spread","bidask","leverage","funding","premium",
  "discount","delta","gamma","vol","marketcap","ticker","onchain","sentiment",
  "supply","demand","imbalance","volatility","rfq","feeengine","yield","lp",
  "maker","taker","arb","swap","vault","oracle","router","index","matrix",
  "ledger","staking","halving","airdrop","gasless","solcycle","lamports",
  "orderbook","margin","lockup","proof","hashrate"
];

const cyberNouns = [
  "kernel","gateway","proxy","buffer","cipher","layer","shard","packet",
  "payload","vector","uplink","downlink","partition","datastream","inline",
  "backdoor","checksum","runtime","terminal","archive","portal","core",
  "backend","frontend","mesh","grid","stack","protocol","daemon","instance",
  "cache","segment","monitor","driver","adapter"
];

const mallObjects = [
  "stairwell","elevator","parkingdeck","mallmap","booth","kiosk","foodcourt",
  "hallway","storage","loadingdock","retailunit","backroom","janitorcloset",
  "securitypost","escalator","checkoutlane","cartreturn","register","mannequin",
  "display","lounge","rooftop","alley","cellblock","stalls","fountain",
  "chargingstation","gate","arch"
];

const prefixes = [
  "mega","hyper","ultra","super","nano","proto","meta","retro","shadow",
  "electric","neon","ghost","acid","static","holo","turbo","retro","void",
  "phase","quantum","optic","astro","chrono","tactical","fractal","delta",
  "flux","auto","crypto","xeno"
];

const bannedWords = [
  "slur1", "slur2", "slur3", 
  "offensive1", "offensive2", 
  "politics", "election", "violence"
];

function cleanString(str: string): string {
  if (!str) return "";
  const lower = str.toLowerCase();
  for (const bad of bannedWords) {
    if (lower.includes(bad)) return "";
  }
  return lower.replace(/[^a-z0-9-]/g, "");
}

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function scoreDomain(name: string): number {
  let score = 0;
  if (name.length <= 12) score += 20;
  if (name.length <= 8) score += 15;
  if (/mega|hyper|ultra/.test(name)) score += 10;
  if (/crash|cope|panic|rekt/.test(name)) score += 20;
  if (/npc|scav|mall/.test(name)) score += 10;
  if (/-/.test(name)) score += 5;
  return Math.min(score, 100);
}

function rarityForScore(score: number): GeneratedDomain['rarity'] {
  if (score >= 85) return "vaulted";
  if (score >= 70) return "rare";
  return "common";
}

function memeOfTheDay() {
  const seed = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const chaos = (hash % 10) + 1;
  const seedWord = emotionWords[(hash % emotionWords.length)];
  const core = buildChaosDomain(seedWord, chaos);
  const score = scoreDomain(core);
  const rarity = rarityForScore(score);

  return {
    domain: core + ".sol",
    chaos,
    score,
    rarity
  };
}

function buildChaosDomain(input: string | null, chaos: number): string {
  const useInput = input && input.length > 0 ? cleanString(input) : null;

  const baseTemplates = [
    () => `${pick(emotionWords)}${pick(chaosNouns)}`,
    () => `${pick(meltdownWords)}${pick(chaosNouns)}`,
    () => `${pick(npcs)}${pick(chaosNouns)}`,
    () => `${pick(emotionWords)}-${pick(chaosNouns)}`,
    () => useInput ? `${useInput}${pick(chaosNouns)}` : `${pick(emotionWords)}${pick(verbs)}`,
    () => useInput ? `${useInput}${pick(chaosNouns)}` : null,
    () => useInput ? `${pick(emotionWords)}${useInput}` : null,
    () => useInput ? `${useInput}-${pick(chaosNouns)}` : null
  ];

  const chaosTemplates = [
    () => `mega${pick(chaosNouns)}`,
    () => `hyper${pick(chaosNouns)}`,
    () => `${pick(meltdownWords)}${pick(damageWords)}`,
    () => `${pick(meltdownWords)}-${pick(chaosNouns)}`,
    () => `${pick(emotionWords)}${pick(chaosNouns)}${pick(damageWords)}`,
    () => useInput ? `mega${useInput}` : null,
    () => useInput ? `hyper${useInput}${pick(chaosNouns)}` : null,
    () => useInput ? `${pick(meltdownWords)}${useInput}${pick(damageWords)}` : null
  ];

  const meltdownTemplates = [
    () => `${pick(meltdownWords)}${pick(prefixes)}${pick(chaosNouns)}`,
    () => `${pick(prefixes)}${pick(prefixes)}${pick(chaosNouns)}`,
    () => `${pick(trendShots)}${pick(chaosNouns)}`.replace(/\s+/g,''),
    () => `${pick(emotionWords)}${pick(mallObjects)}`,
    () => `${pick(marketTerms)}${pick(chaosNouns)}`,
    () => useInput ? `${pick(meltdownWords)}${useInput}` : `${pick(meltdownWords)}${pick(emotionWords)}`,
    () => useInput ? `${pick(prefixes)}${useInput}${pick(chaosNouns)}` : null,
    () => useInput ? `${pick(prefixes)}${pick(prefixes)}${useInput}` : null,
    () => useInput ? `${pick(trendShots).replace(/\s+/g,'')}${useInput}` : null
  ];

  // Weighted section selection based on chaos level
  let templatePool = baseTemplates;

  if (chaos >= 3 && chaos <= 6) {
    templatePool = [...baseTemplates, ...chaosTemplates];
  } else if (chaos > 6) {
    templatePool = [...baseTemplates, ...chaosTemplates, ...meltdownTemplates];
  }

  // Reroll logic: keep trying until we get a valid result
  let chosen = null;
  let attempts = 0;
  const maxAttempts = 50; // Safety limit to prevent infinite loops

  while ((!chosen || chosen.trim() === '') && attempts < maxAttempts) {
    const chosenTemplate = templatePool[Math.floor(Math.random() * templatePool.length)];
    chosen = chosenTemplate();
    attempts++;
  }

  // Fallback if all attempts failed
  if (!chosen || chosen.trim() === '') {
    chosen = `${pick(emotionWords)}${pick(chaosNouns)}`;
  }

  return cleanString(chosen);
}

const MemeGeneratorPage: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [chaos, setChaos] = useState(5);
  const [generatedDomains, setGeneratedDomains] = useState<GeneratedDomain[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);
  const [availabilityResults, setAvailabilityResults] = useState<Record<string, SNSAvailabilityResult>>({});

  // Manual availability checking hook
  const { checkDomain, isChecking } = useManualSNSAvailability();

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
    return categories[Math.floor(Math.random() * categories.length)];
  };

  // Check SNS availability and format as GeneratedDomain[]
  const checkSNSThenAvailability = async (scoredDomains: Array<{ name: string; score: number; rarity: GeneratedDomain['rarity'] }>): Promise<GeneratedDomain[]> => {
    return scoredDomains.map(item => {
      const category = getRandomCategory();
      const rarityEmoji = item.rarity === 'vaulted' ? '🕳' : item.rarity === 'rare' ? '🔮' : '🔥';
      
      return {
        name: item.name,
        category,
        rarity: item.rarity,
        rarityEmoji
      };
    });
  };

  // Handle individual domain checking
  const handleCheckDomain = async (domainName: string) => {
    try {
      const result = await checkDomain(domainName);
      setAvailabilityResults(prev => ({
        ...prev,
        [domainName]: result
      }));
    } catch (error) {
      console.error('Failed to check domain:', error);
      setAvailabilityResults(prev => ({
        ...prev,
        [domainName]: {
          available: false,
          domain: domainName,
          status: 'error',
          error: 'Check failed'
        }
      }));
    }
  };

  // Track page load
  useEffect(() => {
    console.log('🎭 Meme Generator: Page loaded', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });
    
    // Track analytics page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Meme Domain Generator',
        page_location: window.location.href,
        event_category: 'tools'
      });
    }
  }, []);

  const generateDomains = async () => {
    setIsGenerating(true);

    let collected = [];

    // Keep generating until we have at least 5 VALID scored domains
    while (collected.length < 5) {
      const built = buildChaosDomain(userInput, chaos);
      if (!built) continue;

      const domain = built.toLowerCase() + ".sol";
      const base = built.toLowerCase();

      const score = scoreDomain(base);
      if (score < 40) continue;

      const rarity = rarityForScore(score);

      collected.push({ name: domain, score, rarity });
    }

    // Deduplicate
    const unique = [...new Set(collected.map(d => d.name))]
      .map(n => collected.find(o => o.name === n));

    // Pass domain list to existing availability checker
    const final = await checkSNSThenAvailability(unique);

    setGeneratedDomains(final);
    setIsGenerating(false);
    
    return final;
  };

  const handleGenerate = async () => {
    // Track generation event
    const inputUsed = userInput.trim();
    console.log('🎭 Meme Generator: Starting generation', {
      inputUsed: inputUsed || 'random',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    
    const domains = await generateDomains();
    
    // Log generated domains
    console.log('🎭 Meme Generator: Generated domains', {
      domains: domains.map(d => ({
        name: d.name,
        category: d.category,
        rarity: d.rarity
      })),
      inputUsed: inputUsed || 'random',
      timestamp: new Date().toISOString()
    });
    
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'meme_generator_generate', {
        event_category: 'tools',
        event_label: inputUsed || 'random',
        value: domains.length
      });
    }
    
    // Don't auto-trigger availability checking to prevent resource exhaustion
    // Users can manually trigger it by clicking the "Check Availability" button
  };

  const handleCopy = async (domainName: string) => {
    try {
      await navigator.clipboard.writeText(domainName);
      setCopiedDomain(domainName);
      
      // Track copy event
      console.log('🎭 Meme Generator: Domain copied', {
        copiedDomain: domainName,
        timestamp: new Date().toISOString()
      });
      
      // Track analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'meme_generator_copy', {
          event_category: 'tools',
          event_label: domainName,
          value: 1
        });
      }
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedDomain(null), 2000);
    } catch (err) {
      console.error('Failed to copy domain:', err);
      
      // Track copy failure
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'meme_generator_copy_failed', {
          event_category: 'tools',
          event_label: domainName,
          value: 0
        });
      }
    }
  };

  const getCategoryColor = (category: GeneratedDomain['category']) => {
    switch (category) {
      case 'degen': return 'border-red-500/30 bg-red-900/20 text-red-400';
      case 'meme': return 'border-purple-500/30 bg-purple-900/20 text-purple-400';
      case 'iconic': return 'border-yellow-500/30 bg-yellow-900/20 text-yellow-400';
      case 'vibes': return 'border-cyan-500/30 bg-cyan-900/20 text-cyan-400';
      default: return 'border-gray-500/30 bg-gray-900/20 text-gray-400';
    }
  };

  const getRarityColor = (rarity: GeneratedDomain['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-purple-400';
      case 'vaulted': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  // Availability Badge Component
  const AvailabilityBadge = ({ domainName }: { domainName: string }) => {
    const availabilityResult = availabilityResults[domainName];
    
    if (!availabilityResult) {
      return null;
    }

    const { status } = availabilityResult;

    switch (status) {
      case 'checking':
        return (
          <div className="text-center mb-2">
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-900/20 text-yellow-400 border border-yellow-500/30">
              ⏳ Checking...
            </span>
          </div>
        );
      case 'available':
        return (
          <div className="text-center mb-2">
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-900/20 text-green-400 border border-green-500/30">
              🟢 Available
            </span>
          </div>
        );
      case 'taken':
        return (
          <div className="text-center mb-2">
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-red-900/20 text-red-400 border border-red-500/30">
              🔴 Taken
            </span>
          </div>
        );
      case 'error':
        return (
          <div className="text-center mb-2">
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-900/20 text-gray-400 border border-gray-500/30">
              ⚠️ Error
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="tool"
        customTitle="Meme Domain Generator | Generate .sol Domain Names"
        customDescription="Generate creative meme .sol domain names with AI-powered combinations. Discover your perfect domain with our meme domain generator tool."
        customKeywords="meme domain generator, .sol names, domain ideas, web3 domains, solana domains, domain generator"
        canonicalUrl="https://retailstar.xyz/tools/meme-gen"
      />
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background Image */}
        <img 
          src={memeGeneratorBg} 
          alt="Meme Generator Background" 
          className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
          aria-hidden="true"
        />
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20 z-0"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4"
            >
              🎭 Meme Domain Generator
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Generate creative meme .sol domain names with AI-powered combinations. 
              Enter a word or leave blank for random generation.
            </motion.p>
          </div>

          {/* Input Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 border border-cyan-500/30 rounded-lg p-8 mb-8"
          >
            <div className="max-w-2xl mx-auto">
              <label htmlFor="domainInput" className="block text-sm font-medium text-gray-300 mb-4">
                Enter a word to inspire your domain (optional)
              </label>
              <div className="flex gap-4">
                <input
                  id="domainInput"
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="e.g., cope, moon, degen, vibe..."
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors min-w-[140px]"
                >
                  {isGenerating ? 'Generating...' : 'Generate Domains'}
                </button>
              </div>
              <div className="mt-4 p-3 border border-neutral-800 bg-neutral-900/50 rounded-lg text-xs text-neutral-300 font-mono">
                <div className="opacity-70 mb-1">Live Preview</div>
                <div className="text-cyan-400">
                  {buildChaosDomain(userInput, chaos) || "—"}
                </div>
              </div>
              {(() => {
                const motd = memeOfTheDay();
                return (
                  <>
                    <div className="mt-4 text-xs opacity-70">Meme of the Day</div>
                    <div className="text-pink-400 font-mono">{motd.domain}</div>
                    <div className="text-neutral-500 text-xxs">
                      {motd.rarity}, chaos {motd.chaos}
                    </div>
                  </>
                );
              })()}
              <div className="mt-4 mb-2">
                <label className="block text-xs opacity-70">Chaos Level</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={chaos}
                  onChange={(e) => setChaos(parseInt(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Leave blank for completely random meme domains
              </p>
            </div>
          </motion.div>

          {/* Results Section */}
          <AnimatePresence>
            {generatedDomains.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                    Generated Domains
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Click "Check Availability" on individual domains to check them one at a time
                  </p>
                  {isChecking && (
                    <p className="text-yellow-400 text-sm mt-2">
                      ⏳ Checking domain availability... (Please wait between checks)
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedDomains.map((domain, index) => (
                    <motion.div
                      key={domain.name}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="steel-surface card-hover-glow rounded-lg p-6 border border-gray-600/30 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      {/* Domain Name */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-white mb-2 break-all">
                          {domain.name}
                        </h3>
                        
                        {/* Category Badge */}
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(domain.category)}`}>
                          {domain.category}
                        </span>
                      </div>
                      
                      {/* Rarity Badge */}
                      <div className="text-center mb-4">
                        <span className={`text-lg font-semibold ${getRarityColor(domain.rarity)}`}>
                          {domain.rarityEmoji} {domain.rarity.charAt(0).toUpperCase() + domain.rarity.slice(1)}
                        </span>
                      </div>
                      
                      {/* Availability Badge */}
                      <AvailabilityBadge domainName={domain.name} />
                      
                      {/* Check Availability Button */}
                      {(() => {
                        const availabilityResult = availabilityResults[domain.name];
                        const hasResult = availabilityResult && availabilityResult.status !== 'checking';
                        
                        if (!hasResult) {
                          return (
                            <button
                              onClick={() => handleCheckDomain(domain.name)}
                              disabled={isChecking}
                              className="w-full py-2 px-4 rounded-lg font-semibold transition-colors bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white mb-2"
                            >
                              {isChecking ? 'Checking...' : 'Check Availability'}
                            </button>
                          );
                        }
                        
                        return null;
                      })()}
                      
                      {/* Copy Button */}
                      {(() => {
                        const availabilityResult = availabilityResults[domain.name];
                        const isTaken = availabilityResult?.status === 'taken';
                        const isAvailable = availabilityResult?.status === 'available';
                        
                        return (
                          <button
                            onClick={() => handleCopy(domain.name)}
                            disabled={!isAvailable}
                            className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                              copiedDomain === domain.name
                                ? 'bg-green-600 text-white'
                                : isTaken
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : isAvailable
                                ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {copiedDomain === domain.name 
                              ? '✓ Copied!' 
                              : isTaken 
                              ? 'Not Available' 
                              : isAvailable
                              ? 'Copy Domain'
                              : 'Check First'
                            }
                          </button>
                        );
                      })()}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate Again Button */}
          {generatedDomains.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                {isGenerating ? 'Generating...' : 'Generate More Domains'}
              </button>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-cyan-900/20 to-pink-900/20 border border-cyan-500/30 rounded-lg p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-black/40 border border-gray-600 rounded-lg p-4">
                <h4 className="font-semibold text-cyan-400 mb-2">🎯 Smart Pairing</h4>
                <p className="text-gray-300 text-sm">
                  Combines your input with curated meme/degen terminology from our word pools
                </p>
              </div>
              <div className="bg-black/40 border border-gray-600 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-2">🏷️ Category Tags</h4>
                <p className="text-gray-300 text-sm">
                  Each domain gets tagged as degen, meme, iconic, or vibes based on content
                </p>
              </div>
              <div className="bg-black/40 border border-gray-600 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-400 mb-2">⭐ Rarity System</h4>
                <p className="text-gray-300 text-sm">
                  Domains are assigned rarity levels: Common 🔥, Rare 🔮, or Vaulted 🕳
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MemeGeneratorPage;
