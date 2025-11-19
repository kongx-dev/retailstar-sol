import React from 'react';
import { AppraisalBreakdown } from '../../lib/appraisalEngine';

interface AppraisalCardProps {
  domain: string;
  breakdown: AppraisalBreakdown;
  className?: string;
}

export const AppraisalCard: React.FC<AppraisalCardProps> = ({
  domain,
  breakdown,
  className = ''
}) => {
  const getTierColor = () => {
    if (breakdown.finalScore >= 80) return 'border-blue-400';
    if (breakdown.finalScore >= 60) return 'border-purple-400';
    if (breakdown.finalScore >= 30) return 'border-amber-400';
    return 'border-red-400';
  };

  const getTierLabel = () => {
    if (breakdown.finalScore >= 80) return 'Mythic';
    if (breakdown.finalScore >= 60) return 'Premium';
    if (breakdown.finalScore >= 30) return 'Mid';
    return 'Scav';
  };

  return (
    <div
      id="appraisal-card"
      className={`bg-black border-2 ${getTierColor()} rounded-lg p-8 relative ${className}`}
      style={{ width: '1200px', height: '630px' }}
    >
      <div className="h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-amber-300 text-sm font-mono mb-2">APPRAISED BY</div>
            <div className="text-2xl font-bold text-white">RETAILRUNNER</div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-white mb-1">{domain.toUpperCase()}.SOL</div>
            <div className="text-gray-400 text-sm">Domain Appraisal</div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-8xl font-bold mb-4 ${getTierColor().replace('border-', 'text-')}`}>
              {Math.round(breakdown.finalScore)}
            </div>
            <div className="text-2xl text-gray-300 mb-2">/ 100</div>
            <div className={`text-3xl font-bold ${getTierColor().replace('border-', 'text-')}`}>
              {getTierLabel()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end">
          <div>
            <div className="text-gray-400 text-sm mb-1">Estimated Value</div>
            <div className="text-3xl font-bold text-amber-300">
              {breakdown.solEstimateLow}–{breakdown.solEstimateHigh} <span className="text-xl">SOL</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm mb-2">Categories</div>
            <div className="flex gap-2 flex-wrap justify-end">
              {breakdown.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full bg-amber-900/30 border border-amber-300/40 text-amber-200 text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Retailstar branding */}
        <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
          retailstar.xyz
        </div>
      </div>
    </div>
  );
};

