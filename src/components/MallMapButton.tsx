import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMallMapPulse } from '../hooks/useMallMapPulse';

interface MallMapButtonProps {
  showPulse?: boolean;
  className?: string;
  autoPulse?: boolean;
}

export default function MallMapButton({ 
  showPulse = false, 
  className = '', 
  autoPulse = true 
}: MallMapButtonProps) {
  const location = useLocation();
  const { showPulse: autoShowPulse, markAsSeen } = useMallMapPulse();
  const [isPulsing, setIsPulsing] = useState(showPulse);

  // Use auto pulse detection if enabled, otherwise use manual prop
  const shouldPulse = autoPulse ? autoShowPulse : showPulse;

  // Auto-hide pulse after 5 seconds
  useEffect(() => {
    if (shouldPulse) {
      const timer = setTimeout(() => {
        setIsPulsing(false);
        if (autoPulse) {
          markAsSeen();
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [shouldPulse, autoPulse, markAsSeen]);

  // Update pulsing state when shouldPulse changes
  useEffect(() => {
    setIsPulsing(shouldPulse);
  }, [shouldPulse]);

  // Don't show button if we're already on directory page
  if (location.pathname === '/directory') {
    return null;
  }

  const handleClick = () => {
    if (autoPulse) {
      markAsSeen();
    }
  };

  return (
    <div className={`fixed top-4 left-4 z-40 ${className}`}>
      <div className="relative">
        <Link 
          to="/directory" 
          onClick={handleClick}
          className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 border border-cyan-500/50 text-cyan-400 hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 backdrop-blur-sm"
          title="Navigate to Mall Directory"
        >
          📍 Mall Map
        </Link>
        {isPulsing && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-pink-500 rounded-full animate-ping"></span>
        )}
      </div>
    </div>
  );
} 