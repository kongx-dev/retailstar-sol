import React from 'react';

/**
 * ToneChips component for displaying vibe, energy, humor chips
 * Performance-optimized with React.memo and minimal props
 */
const ToneChips = React.memo(function ToneChips({ 
  vibe, 
  energy, 
  humor 
}: { 
  vibe?: string; 
  energy?: string; 
  humor?: string; 
}) {
  const chipStyle = 'px-2 py-1 rounded-full text-xs font-medium bg-black/40 border border-cyan-500/30 text-cyan-300';

  return (
    <div className="flex flex-wrap items-center gap-2">
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
    </div>
  );
});

export default ToneChips;


