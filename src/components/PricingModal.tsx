import React from 'react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-gray-900 border border-teal-600 rounded-xl p-6 w-[90%] max-w-xl shadow-xl text-white">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-teal-300 hover:text-red-400 text-lg transition-colors"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-teal-300">🪙 Retailstar Pricing Tiers</h2>

        {/* Pricing Content */}
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="border border-gray-700 rounded-lg p-3 bg-gray-800/50">
            <p className="font-bold text-pink-400">🧃 Liquid Tags: <span className="text-white">0.15–0.35 SOL</span></p>
            <p className="text-neutral-300 text-xs mt-1">Fast-moving domains for fast-clicking buyers.</p>
          </div>
          
          <div className="border border-gray-700 rounded-lg p-3 bg-gray-800/50">
            <p className="font-bold text-yellow-400">📐 Blueprint Ready: <span className="text-white">0.5–2 SOL</span></p>
            <p className="text-neutral-300 text-xs mt-1">Off-the-rack domains. Brandable, functional, and one step from greatness.</p>
          </div>
          
          <div className="border border-gray-700 rounded-lg p-3 bg-gray-800/50">
            <p className="font-bold text-blue-400">💎 Premium: <span className="text-white">3+ SOL</span></p>
            <p className="text-neutral-300 text-xs mt-1">Built sites, meme-capable. For those who want the good stuff.</p>
          </div>
          
          <div className="border border-cyan-400 rounded-lg p-3 bg-cyan-900/20">
            <p className="font-bold text-cyan-300">🕳 Vaulted Premium: <span className="text-white">Not listed</span></p>
            <p className="text-neutral-300 text-xs mt-1">Private sales only. You ask, we judge. Don't waste our time.</p>
          </div>

          <div className="relative group cursor-pointer">
            <div className="bg-gradient-to-br from-purple-800 to-violet-900 border border-violet-600 rounded-2xl p-4 shadow-xl hover:animate-glow transition-all">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                🧿 Mythic
              </h3>
              <p className="text-violet-300 text-sm mt-1 italic">Artifacts of unmatched power.</p>
              <p className="text-white font-semibold mt-2">10+ SOL</p>
              <div className="text-orange-400 text-xs font-bold mt-2">🔥 Featured</div>
            </div>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-violet-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg z-10">
              🔥 Mythic Artifact — not for the faint of heart
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-xs text-yellow-200">
          <p>💡 Pro tip: Liquid Tags flip fast. Click first, think later.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal; 