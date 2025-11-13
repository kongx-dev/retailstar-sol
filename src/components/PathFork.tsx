import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PathFork: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          What Kind of Shopper Are You?
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Choose your path and discover domains that match your vibe
        </p>
      </div>

      {/* Split Path Panels */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Builder Mode Panel */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group cursor-pointer"
        >
          <Link to="/marketplace">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-8 h-full hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="text-center">
                <div className="text-6xl mb-4">🛠️</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  Builder Mode
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Ready to build? Find premium, brandable .sol domains for tools, DAOs, and storefronts.
                </p>
                <div className="bg-blue-600/20 text-blue-300 px-4 py-2 rounded-lg font-semibold inline-block group-hover:bg-blue-600/30 transition-colors">
                  Explore Brand-Ready Domains
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Degen Mode Panel */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="group cursor-pointer"
        >
          <Link to="/scavrack">
            <div className="bg-gradient-to-br from-green-900/30 to-yellow-900/30 border border-green-500/30 rounded-xl p-8 h-full hover:border-green-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="text-center">
                <div className="text-6xl mb-4">🧃</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                  Degen Mode
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Looking to shitpost? Explore our meme vault of chaotic domains under 20 USDC.
                </p>
                <div className="bg-green-600/20 text-green-300 px-4 py-2 rounded-lg font-semibold inline-block group-hover:bg-green-600/30 transition-colors">
                  Dive Into Meme Chaos
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Not sure? You can always <Link to="/directory" className="text-cyan-400 hover:text-cyan-300 underline">browse all domains</Link> and find your vibe naturally.
        </p>
      </div>
    </div>
  );
};

export default PathFork;
