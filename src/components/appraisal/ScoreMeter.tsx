import React from 'react';
import { motion } from 'framer-motion';

interface ScoreMeterProps {
  score: number; // 0-100
  brandability: number; // 0-30
  meme: number; // 0-30
  value: number; // 0-40
  size?: number;
}

export const ScoreMeter: React.FC<ScoreMeterProps> = ({
  score,
  brandability,
  meme,
  value,
  size = 200
}) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate colors based on score
  const getColor = (score: number) => {
    if (score >= 80) return '#60a5fa'; // Cyberblue
    if (score >= 60) return '#a855f7'; // Neon Purple
    if (score >= 30) return '#fbbf24'; // Gold
    return '#ef4444'; // Red
  };

  const getTierColor = () => {
    if (score >= 80) return 'text-blue-400';
    if (score >= 60) return 'text-purple-400';
    if (score >= 30) return 'text-amber-400';
    return 'text-red-400';
  };

  const getTierLabel = () => {
    if (score >= 80) return 'Mythic';
    if (score >= 60) return 'Premium';
    if (score >= 30) return 'Mid';
    return 'Scav';
  };

  const mainColor = getColor(score);
  const scorePercentage = score / 100;
  const offset = circumference * (1 - scorePercentage);

  // Sub-score percentages for segmented display
  const brandabilityPercent = (brandability / 30) * 100;
  const memePercent = (meme / 30) * 100;
  const valuePercent = (value / 40) * 100;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
        />
        
        {/* Main score ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={mainColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 8px ${mainColor})`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <div className={`text-4xl font-bold ${getTierColor()}`}>
            {Math.round(score)}
          </div>
          <div className="text-xs text-gray-400 mt-1">/ 100</div>
          <div className={`text-sm font-semibold mt-2 ${getTierColor()}`}>
            {getTierLabel()}
          </div>
        </motion.div>
      </div>

      {/* Sub-score indicators (smaller rings around main) */}
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-4">
        <div className="text-center">
          <div className="text-xs text-amber-300">Brand</div>
          <div className="text-xs text-gray-400">{Math.round(brandability)}/30</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-purple-300">Meme</div>
          <div className="text-xs text-gray-400">{Math.round(meme)}/30</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-cyan-300">Value</div>
          <div className="text-xs text-gray-400">{Math.round(value)}/40</div>
        </div>
      </div>
    </div>
  );
};


