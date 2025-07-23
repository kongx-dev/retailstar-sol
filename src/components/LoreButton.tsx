import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoreModal from './LoreModal';
import { hasSeenLore } from '../data/loreContent';

interface LoreButtonProps {
  useModal?: boolean;
  className?: string;
}

export default function LoreButton({ useModal = true, className = '' }: LoreButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    // Check if user has seen lore before
    setIsFirstTime(!hasSeenLore());
  }, []);

  const buttonContent = (
    <span className={`text-sm italic text-zinc-400 hover:text-white underline transition-all duration-200 ${className}`}>
      📖 What is Retailstar?
      {isFirstTime && (
        <span className="ml-2 text-cyan-400">🌟</span>
      )}
    </span>
  );

  if (useModal) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`text-sm italic text-zinc-400 hover:text-white underline transition-all duration-200 ${
            isFirstTime ? 'animate-pulse' : ''
          } ${className}`}
          title={isFirstTime ? "🌟 Start here to learn about Retailstar!" : "📖 Learn about Retailstar"}
        >
          📖 What is Retailstar?
          {isFirstTime && (
            <span className="ml-2 text-cyan-400">🌟</span>
          )}
        </button>

        <LoreModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </>
    );
  }

  // Use direct link instead of modal
  return (
    <Link 
      to="/lore" 
      className={`text-sm italic text-zinc-400 hover:text-white underline transition-all duration-200 ${
        isFirstTime ? 'animate-pulse' : ''
      } ${className}`}
      title={isFirstTime ? "🌟 Start here to learn about Retailstar!" : "📖 Learn about Retailstar"}
    >
      📖 What is Retailstar?
      {isFirstTime && (
        <span className="ml-2 text-cyan-400">🌟</span>
      )}
    </Link>
  );
} 