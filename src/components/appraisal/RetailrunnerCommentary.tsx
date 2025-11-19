import React from 'react';
import { motion } from 'framer-motion';
import { RetailrunnerQuip } from '../../lib/retailrunnerQuips';

interface RetailrunnerCommentaryProps {
  quip: RetailrunnerQuip;
}

export const RetailrunnerCommentary: React.FC<RetailrunnerCommentaryProps> = ({ quip }) => {
  const getToneStyles = () => {
    switch (quip.tone) {
      case 'mythic':
        return 'border-blue-400/40 bg-blue-900/20 text-blue-200';
      case 'premium':
        return 'border-purple-400/40 bg-purple-900/20 text-purple-200';
      case 'mid':
        return 'border-amber-400/40 bg-amber-900/20 text-amber-200';
      case 'scav':
        return 'border-red-400/40 bg-red-900/20 text-red-200';
      default:
        return 'border-gray-400/40 bg-gray-900/20 text-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className={`rounded-lg border p-4 ${getToneStyles()}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <img
            src="/src/assets/Wifhoodie 631.png"
            alt="Retailrunner"
            className="w-10 h-10 rounded-full border-2 border-amber-300/40"
          />
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-amber-300/80 mb-1">
            Retailrunner says:
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-sm italic"
          >
            "{quip.text}"
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};


