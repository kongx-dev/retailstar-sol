import React, { useState } from 'react';

interface LoreTooltipProps {
  children: any;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function LoreTooltip({ children, content, position = 'top' }: LoreTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg border border-cyan-500/50 shadow-lg max-w-xs">
            {content}
            <div className={`absolute w-2 h-2 bg-black/90 border border-cyan-500/50 transform rotate-45 ${
              position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1' :
              position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1' :
              position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -translate-x-1' :
              'right-full top-1/2 -translate-y-1/2 translate-x-1'
            }`} />
          </div>
        </div>
      )}
    </div>
  );
} 