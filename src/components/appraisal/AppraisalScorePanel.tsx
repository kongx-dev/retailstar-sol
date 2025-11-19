import React from 'react';
import { motion } from 'framer-motion';
import { ScoreMeter } from './ScoreMeter';
import { RetailrunnerCommentary } from './RetailrunnerCommentary';
import { AppraisalBreakdown } from '../../lib/appraisalEngine';

interface AppraisalScorePanelProps {
  breakdown: AppraisalBreakdown;
}

export const AppraisalScorePanel: React.FC<AppraisalScorePanelProps> = ({ breakdown }) => {
  const getTierColor = () => {
    if (breakdown.finalScore >= 80) return 'text-blue-400 border-blue-400/40';
    if (breakdown.finalScore >= 60) return 'text-purple-400 border-purple-400/40';
    if (breakdown.finalScore >= 30) return 'text-amber-400 border-amber-400/40';
    return 'text-red-400 border-red-400/40';
  };

  const getTierLabel = () => {
    if (breakdown.finalScore >= 80) return 'Mythic';
    if (breakdown.finalScore >= 60) return 'Premium';
    if (breakdown.finalScore >= 30) return 'Mid';
    return 'Scav';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Main Score Display */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 bg-black/40 rounded-xl border border-amber-300/20">
        <ScoreMeter
          score={breakdown.finalScore}
          brandability={breakdown.brandability}
          meme={breakdown.meme}
          value={breakdown.value}
          size={200}
        />

        <div className="flex-1 space-y-4">
          {/* Tier Label */}
          <div className={`text-center md:text-left border-b pb-3 ${getTierColor()}`}>
            <div className="text-2xl font-bold">{getTierLabel()}</div>
            <div className="text-sm text-gray-400 mt-1">Tier Classification</div>
          </div>

          {/* SOL Value Range */}
          <div className="text-center md:text-left">
            <div className="text-sm text-gray-400 mb-1">Estimated Value</div>
            <div className="text-3xl font-bold text-amber-300">
              {breakdown.solEstimateLow}–{breakdown.solEstimateHigh} <span className="text-lg">SOL</span>
            </div>
          </div>

          {/* Category Badges */}
          {breakdown.categories.length > 0 && (
            <div>
              <div className="text-sm text-gray-400 mb-2">Categories</div>
              <div className="flex flex-wrap gap-2">
                {breakdown.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 rounded-full bg-amber-900/30 border border-amber-300/40 text-amber-200 text-xs font-semibold"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Score Breakdown Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Brandability */}
        <div className="bg-black/40 rounded-lg p-4 border border-amber-300/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-amber-300 font-semibold">Brandability</span>
            <span className="text-xs text-gray-400">{Math.round(breakdown.brandability)}/30</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(breakdown.brandability / 30) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-amber-400 h-2 rounded-full"
              style={{ boxShadow: '0 0 8px rgba(251, 191, 36, 0.5)' }}
            />
          </div>
        </div>

        {/* Meme Score */}
        <div className="bg-black/40 rounded-lg p-4 border border-purple-300/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-purple-300 font-semibold">Meme Score</span>
            <span className="text-xs text-gray-400">{Math.round(breakdown.meme)}/30</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(breakdown.meme / 30) * 100}%` }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bg-purple-400 h-2 rounded-full"
              style={{ boxShadow: '0 0 8px rgba(168, 85, 247, 0.5)' }}
            />
          </div>
        </div>

        {/* Value Score */}
        <div className="bg-black/40 rounded-lg p-4 border border-cyan-300/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-cyan-300 font-semibold">Value Score</span>
            <span className="text-xs text-gray-400">{Math.round(breakdown.value)}/40</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(breakdown.value / 40) * 100}%` }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bg-cyan-400 h-2 rounded-full"
              style={{ boxShadow: '0 0 8px rgba(96, 165, 250, 0.5)' }}
            />
          </div>
        </div>
      </div>

      {/* Retailrunner Commentary */}
      <RetailrunnerCommentary quip={breakdown.quip} />
    </motion.div>
  );
};


