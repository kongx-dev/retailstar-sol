import React, { useState, useEffect } from 'react';

interface AudioToggleProps {
  onToggle?: (enabled: boolean) => void;
  className?: string;
}

const AudioToggle: React.FC<AudioToggleProps> = ({ onToggle, className = '' }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('retailstar_audio_enabled');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }
  }, []);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('retailstar_audio_enabled', newState.toString());
    onToggle?.(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed bottom-4 left-4 z-50 bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-cyan-300 hover:text-cyan-200 transition-all duration-300 hover:opacity-100 opacity-0 hover:opacity-100 ${className}`}
      title="Toggle Zone Audio"
    >
      {isEnabled ? '🔊' : '🔇'} Audio
    </button>
  );
};

export default AudioToggle; 