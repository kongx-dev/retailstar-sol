import React from 'react';

/**
 * ToneBadge component for displaying department tone metadata
 * Performance-optimized with React.memo and minimal props
 * @param {Object} props
 * @param {string} props.category - Tone category (premium, meme, hybrid)
 * @param {string} [props.vibe] - Tone vibe
 * @param {string} [props.energy] - Energy level
 * @param {string} [props.humor] - Humor level
 * @param {boolean} [props.showAll] - Show all badges or just category
 */
const ToneBadge = React.memo(function ToneBadge({ category, vibe, energy, humor, showAll = false }) {
  // Category badge styling based on type - simplified, no heavy shadows
  const getCategoryStyle = () => {
    switch (category) {
      case 'premium':
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50 text-yellow-300';
      case 'meme':
        return 'bg-gradient-to-r from-pink-500/20 to-green-500/20 border-pink-500/50 text-pink-300';
      case 'hybrid':
        return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 text-blue-300';
      default:
        return 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300';
    }
  };

  // Small chip styling for vibe, energy, humor - simple borders
  const chipStyle = 'px-2 py-1 rounded-full text-xs font-medium bg-black/40 border border-cyan-500/30 text-cyan-300';

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Large category badge */}
      {category && (
        <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getCategoryStyle()}`}>
          {category.toUpperCase()}
        </span>
      )}

      {/* Small holographic chips */}
      {showAll && (
        <>
          {vibe && (
            <span className={chipStyle} title="Vibe">
              {vibe}
            </span>
          )}
          {energy && (
            <span className={chipStyle} title="Energy">
              {energy}
            </span>
          )}
          {humor && (
            <span className={chipStyle} title="Humor">
              {humor}
            </span>
          )}
        </>
      )}
    </div>
  );
});

export default ToneBadge;

