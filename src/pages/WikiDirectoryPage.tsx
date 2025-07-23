import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { retailstarLore } from '../data/loreContent';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';

const WikiDirectoryPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % retailstarLore.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + retailstarLore.length) % retailstarLore.length);
  };

  const currentLore = retailstarLore[currentIndex];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="wiki-directory"
        customTitle="Retailstar Wiki Directory | Lore & Story Chapters"
        customDescription="Explore the Retailstar lore through interactive story chapters. Discover the history of the Scav Rack, Retail Tickets, and the rise of factions."
        customKeywords="Retailstar lore, Scav Rack, Retail Tickets, Solana lore, digital mall story"
        imageUrl="https://retailstar.xyz/assets/rs-og-card.png"
        canonicalUrl="https://retailstar.sol/wiki-directory"
        ogImage="https://retailstar.xyz/assets/rs-og-card.png"
        twitterImage="https://retailstar.xyz/assets/rs-og-card.png"
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-6 neon-pulse solana-gradient">
            📚 Wiki Directory
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore the lore and history of the Retailverse
          </p>
          
          {/* Navigation Links */}
          <div className="flex justify-center gap-4 mb-8">
            <Link
              to="/directory"
              className="text-cyan-300 hover:text-cyan-200 transition-colors duration-200 bg-black/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              🗺️ Mall Directory
            </Link>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Progress indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-2">
                {retailstarLore.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Chapter counter */}
            <div className="text-center mb-6 text-gray-400">
              Chapter {currentIndex + 1} of {retailstarLore.length}
            </div>

            {/* Lore Card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8 shadow-2xl shadow-cyan-500/20"
                >
                  {/* Chapter header */}
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{currentLore.emoji}</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-2">
                      {currentLore.title}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
                  </div>

                  {/* Chapter content */}
                  <div className="prose prose-invert max-w-none">
                    <div 
                      className="text-gray-200 leading-relaxed text-lg"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {currentLore.content}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prev}
                className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg text-cyan-300 hover:text-cyan-200 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                ⬅️ Previous
              </button>

              <div className="text-gray-400 text-sm">
                {currentIndex + 1} / {retailstarLore.length}
              </div>

              <button
                onClick={next}
                className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg text-cyan-300 hover:text-cyan-200 hover:border-cyan-400/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Next ➡️
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="text-sm">
            Explore the complete Retailstar lore and discover the hidden stories behind the mall
          </p>
        </div>
      </div>
    </div>
  );
};

export default WikiDirectoryPage; 