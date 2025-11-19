import React, { useState } from 'react';

/**
 * FlavoredTooltip component for displaying flavor_text tooltips
 * Performance-optimized with React.memo and minimal props
 */
const FlavoredTooltip = React.memo(function FlavoredTooltip({ 
  text, 
  children 
}: { 
  text?: string; 
  children: React.ReactElement;
}) {
  const [isVisible, setIsVisible] = useState(false);

  if (!text) {
    return <>{children}</>;
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/95 border border-cyan-500/50 rounded-lg shadow-xl max-w-xs">
          <p className="text-cyan-400 italic text-xs">
            {text}
          </p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-cyan-500/50"></div>
          </div>
        </div>
      )}
    </div>
  );
});

export default FlavoredTooltip;

