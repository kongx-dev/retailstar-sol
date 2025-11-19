import React, { useState, useEffect, useRef } from 'react';
import { getRandomGlitchSignal } from '../utils/glitchSignals';

/**
 * GlitchSignal component - displays intercepted transmission widget
 * Performance-optimized with React.memo and IntersectionObserver for lazy loading
 * @param {Object} props
 * @param {string} props.departmentSlug - Department slug to check for signals
 */
const GlitchSignal = React.memo(function GlitchSignal({ departmentSlug }) {
  const [signal, setSignal] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!departmentSlug || !containerRef.current) return;

    // Use IntersectionObserver to lazy-load when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Load signal only when visible
            const glitchSignal = getRandomGlitchSignal(departmentSlug);
            if (glitchSignal) {
              setSignal(glitchSignal);
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [departmentSlug]);

  if (!departmentSlug || !isVisible || !signal) {
    return <div ref={containerRef} className="mt-4 h-20" />; // Placeholder to trigger observer
  }

  return (
    <div className="mt-4 p-4 bg-black/80 border border-red-500/30 rounded-lg font-mono text-xs relative overflow-hidden">
      {/* Glitch effect overlay - simple pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent animate-pulse"></div>
      
      {/* Signal content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-400 animate-pulse">⚠</span>
          <span className="text-red-400 font-bold uppercase tracking-wider">Intercepted Transmission</span>
        </div>
        <div className="h-px bg-red-500/30 mb-2"></div>
        <p className="text-red-300/80 leading-relaxed">
          {signal.text}
        </p>
        <div className="mt-2 text-red-500/50 text-[10px]">
          [SOURCE: UNKNOWN] [TIMESTAMP: --:--:--]
        </div>
      </div>
    </div>
  );
});

export default GlitchSignal;

