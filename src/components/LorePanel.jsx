import React, { useState, Suspense, lazy } from 'react';

// Lazy load tone components
const ToneBadge = lazy(() => import('./ToneBadge'));
const ToneChips = lazy(() => import('./ToneChips'));

/**
 * LorePanel component for displaying department lore information
 * Performance-optimized with React.memo, lazy imports, and minimal props
 * @param {Object} props
 * @param {string} props.long_bio - Long bio text
 * @param {string} [props.flavor_text] - Flavor text inscription
 * @param {string} [props.toneCategory] - Tone category
 * @param {string} [props.toneVibe] - Tone vibe
 * @param {string} [props.toneEnergy] - Tone energy
 * @param {string} [props.toneHumor] - Tone humor
 * @param {boolean} [props.collapsible] - Make long_bio collapsible
 */
const LorePanel = React.memo(function LorePanel({ 
  long_bio, 
  flavor_text, 
  toneCategory,
  toneVibe,
  toneEnergy,
  toneHumor,
  collapsible = false 
}) {
  const [showFull, setShowFull] = useState(false);

  // Determine if we should show "Read More" (if text is long)
  const shouldTruncate = collapsible && long_bio && long_bio.length > 300;
  const displayBio = shouldTruncate && !showFull 
    ? long_bio.substring(0, 300) + '...' 
    : long_bio;

  const hasTone = toneCategory || toneVibe || toneEnergy || toneHumor;

  return (
    <div className="bg-black/40 border border-cyan-500/30 rounded-xl p-6">
      {/* Flavor text as italic inscription */}
      {flavor_text && (
        <div className="mb-4 pb-4 border-b border-cyan-500/20">
          <p className="text-cyan-400 italic text-lg font-light">
            "{flavor_text}"
          </p>
        </div>
      )}

      {/* Long bio */}
      {long_bio && (
        <div className="mb-4">
          <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
            {displayBio}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium underline transition-opacity duration-200"
            >
              {showFull ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      )}

      {/* Tone metadata */}
      {hasTone && (
        <div className="mt-4 pt-4 border-t border-cyan-500/20">
          <Suspense fallback={<div className="text-xs text-neutral-500 animate-pulse">Loading…</div>}>
            <ToneBadge
              category={toneCategory}
              vibe={toneVibe}
              energy={toneEnergy}
              humor={toneHumor}
              showAll={true}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
});

export default LorePanel;

