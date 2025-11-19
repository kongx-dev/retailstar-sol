import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';

// Lazy load components
const ToneBadge = lazy(() => import('./ToneBadge'));
const FlavoredTooltip = lazy(() => import('./FlavoredTooltip'));
const LoreModal = lazy(() => import('./LoreModal'));

/**
 * DepartmentTile component for displaying department in directory
 * Performance-optimized with React.memo, lazy imports, and minimal props
 * @param {Object} props
 * @param {string} props.icon - Department icon
 * @param {string} props.name - Department name
 * @param {string} [props.short_bio] - Short bio text
 * @param {string} props.slug - Department slug
 * @param {string} [props.toneCategory] - Tone category
 * @param {string} [props.flavor_text] - Flavor text for tooltip
 * @param {string} [props.long_bio] - Long bio for modal
 * @param {string} [props.toneVibe] - Tone vibe
 * @param {string} [props.toneEnergy] - Tone energy
 * @param {string} [props.toneHumor] - Tone humor
 * @param {string} [props.size] - Size variant: 'default' or 'mini'
 */
const DepartmentTile = React.memo(function DepartmentTile({ 
  icon,
  name,
  short_bio,
  slug,
  toneCategory,
  flavor_text,
  long_bio,
  toneVibe,
  toneEnergy,
  toneHumor,
  size = 'default' 
}) {
  const [showModal, setShowModal] = useState(false);

  // Close modal if slug becomes undefined
  useEffect(() => {
    if (!slug && showModal) {
      setShowModal(false);
    }
  }, [slug, showModal]);

  // Get glow styling based on tone category
  const getGlowStyle = () => {
    if (!toneCategory) return 'border-cyan-500/30 hover:border-cyan-400/50';
    
    switch (toneCategory) {
      case 'premium':
        return 'border-yellow-500/30 hover:border-yellow-400/50';
      case 'meme':
        return 'border-pink-500/30 hover:border-pink-400/50';
      case 'hybrid':
        return 'border-blue-500/30 hover:border-blue-400/50';
      default:
        return 'border-cyan-500/30 hover:border-cyan-400/50';
    }
  };

  const isMini = size === 'mini';
  const tileClasses = `bg-black/40 ${getGlowStyle()} rounded-lg p-${isMini ? '3' : '4'} hover:bg-black/60 transition-opacity duration-200 group relative`;

  const handleClick = (e) => {
    e.preventDefault();
    if (slug) {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className={tileClasses}>
        <Suspense fallback={null}>
          <FlavoredTooltip text={flavor_text}>
            <div 
              onClick={handleClick}
              className="cursor-pointer"
            >
              {/* Icon */}
              <div className={`text-${isMini ? '2xl' : '3xl'} mb-2`}>
                {icon || '🏪'}
              </div>

              {/* Name */}
              <h3 className={`font-bold text-white mb-1 group-hover:text-cyan-300 ${isMini ? 'text-sm' : 'text-base'}`}>
                {name}
              </h3>

              {/* Short bio as subtitle */}
              {short_bio && (
                <p className={`text-gray-400 mb-2 ${isMini ? 'text-xs' : 'text-xs'} line-clamp-2`}>
                  {short_bio}
                </p>
              )}

              {/* Tone category badge */}
              {toneCategory && (
                <div className="mt-2">
                  <Suspense fallback={<div className="text-xs text-neutral-500 animate-pulse">Loading…</div>}>
                    <ToneBadge category={toneCategory} showAll={false} />
                  </Suspense>
                </div>
              )}
            </div>
          </FlavoredTooltip>
        </Suspense>

        {/* Enter button */}
        {slug && (
          <Link
            to={`/directory/dept/${slug}`}
            className={`mt-3 block text-center ${isMini ? 'text-xs' : 'text-sm'} text-cyan-300 hover:text-cyan-200 font-medium transition-opacity duration-200`}
            onClick={(e) => e.stopPropagation()}
          >
            Enter →
          </Link>
        )}
      </div>

      {/* Lore Preview Modal - only load when opened and slug exists */}
      {showModal && slug && (
        <Suspense fallback={null}>
          <LoreModal
            name={name}
            icon={icon}
            long_bio={long_bio}
            flavor_text={flavor_text}
            toneCategory={toneCategory}
            toneVibe={toneVibe}
            toneEnergy={toneEnergy}
            toneHumor={toneHumor}
            slug={slug}
            onClose={() => setShowModal(false)}
          />
        </Suspense>
      )}
    </>
  );
});

export default DepartmentTile;

