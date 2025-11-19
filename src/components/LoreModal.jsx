import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';

// Lazy load tone components
const ToneBadge = lazy(() => import('./ToneBadge'));

/**
 * LoreModal component for showing department lore preview
 * Performance-optimized: removed framer-motion, uses CSS transitions
 * @param {Object} props
 * @param {string} props.name - Department name
 * @param {string} props.icon - Department icon
 * @param {string} [props.long_bio] - Long bio text
 * @param {string} [props.flavor_text] - Flavor text
 * @param {string} [props.toneCategory] - Tone category
 * @param {string} [props.toneVibe] - Tone vibe
 * @param {string} [props.toneEnergy] - Tone energy
 * @param {string} [props.toneHumor] - Tone humor
 * @param {string} props.slug - Department slug
 * @param {Function} props.onClose - Close handler
 */
const LoreModal = React.memo(function LoreModal({ 
  name,
  icon,
  long_bio,
  flavor_text,
  toneCategory,
  toneVibe,
  toneEnergy,
  toneHumor,
  slug,
  onClose 
}) {
  // Don't render modal if slug is missing
  if (!slug) {
    return null;
  }

  const hasTone = toneCategory || toneVibe || toneEnergy || toneHumor;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop - simple CSS transition */}
      <div 
        className="absolute inset-0 bg-black/80 transition-opacity duration-200"
        style={{ opacity: 1 }}
      />

      {/* Modal - simple CSS transition */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-black/95 border-2 border-cyan-500/50 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-200"
        style={{ 
          opacity: 1,
          transform: 'scale(1) translateY(0)'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-opacity duration-200 text-2xl"
        >
          ×
        </button>

        {/* Icon */}
        <div className="text-6xl mb-4 text-center">
          {icon || '🏪'}
        </div>

        {/* Name */}
        <h2 className="text-3xl font-bold text-cyan-300 mb-4 text-center">
          {name}
        </h2>

        {/* Long bio */}
        {long_bio && (
          <div className="mb-6">
            <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
              {long_bio}
            </p>
          </div>
        )}

        {/* Flavor text */}
        {flavor_text && (
          <div className="mb-6 pb-6 border-b border-cyan-500/20">
            <p className="text-cyan-400 italic text-lg text-center">
              "{flavor_text}"
            </p>
          </div>
        )}

        {/* Tone metadata */}
        {hasTone && (
          <div className="mb-6 flex justify-center">
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

        {/* CTA Button */}
        {slug && (
          <div className="flex justify-center">
            <Link
              to={`/directory/dept/${slug}`}
              onClick={onClose}
              className="px-6 py-3 bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-500/30 hover:border-cyan-400 transition-opacity duration-200"
            >
              Enter Department →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});

export default LoreModal;

