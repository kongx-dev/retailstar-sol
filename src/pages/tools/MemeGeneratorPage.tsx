import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { generateDomains, GeneratedDomain } from '../../utils/generateDomains';
import { useManualSNSAvailability, SNSAvailabilityResult, SNSAvailabilityStatus } from '../../hooks/useCheckSNSAvailability';

const MemeGeneratorPage: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedDomains, setGeneratedDomains] = useState<GeneratedDomain[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);
  const [availabilityResults, setAvailabilityResults] = useState<Record<string, SNSAvailabilityResult>>({});

  // Manual availability checking hook
  const { checkDomain, isChecking } = useManualSNSAvailability();

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

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Track generation event
    const inputUsed = userInput.trim();
    console.log('🎭 Meme Generator: Starting generation', {
      inputUsed: inputUsed || 'random',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const domains = generateDomains({ 
      userInput: inputUsed, 
      count: 5 
    });
    
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
    
    setGeneratedDomains(domains);
    setIsGenerating(false);
    
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
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        
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
