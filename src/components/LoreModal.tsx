import React, { useState, useEffect } from 'react';
import { retailstarLore, getLoreProgress, markChapterAsRead, isChapterRead } from '../data/loreContent';

interface LoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapter?: number;
}

export default function LoreModal({ isOpen, onClose, initialChapter = 0 }: LoreModalProps) {
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [progress, setProgress] = useState(0);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const currentProgress = getLoreProgress();
      setProgress(currentProgress);
      
      // Check if this is the first visit
      const hasVisited = localStorage.getItem('retailstar_lore_visited');
      if (!hasVisited) {
        setIsFirstVisit(true);
        localStorage.setItem('retailstar_lore_visited', 'true');
      }
    }
  }, [isOpen]);

  const handleChapterChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentChapter < retailstarLore.length - 1) {
      const nextChapter = currentChapter + 1;
      setCurrentChapter(nextChapter);
      markChapterAsRead(retailstarLore[currentChapter].id);
      updateProgress();
    } else if (direction === 'prev' && currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const updateProgress = () => {
    const newProgress = getLoreProgress();
    setProgress(newProgress);
  };

  const handleChapterClick = (index: number) => {
    setCurrentChapter(index);
    markChapterAsRead(retailstarLore[index].id);
    updateProgress();
  };

  const currentLore = retailstarLore[currentChapter];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-cyan-400">📖 Retailstar Lore</h2>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-400">{progress}%</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* First Visit Welcome */}
        {isFirstVisit && (
          <div className="p-6 bg-gradient-to-r from-cyan-900/30 to-pink-900/30 border-b border-cyan-500/20">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">🎉 Welcome to the Retailverse!</h3>
            <p className="text-gray-300">
              You're about to dive into the story of how Retailstar evolved from a chaotic Scav Rack to a gated mall of misfit domains. 
              Each chapter reveals more about the factions, the economy, and the lore that makes this place special.
            </p>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">{currentLore.emoji}</span>
              <h3 className="text-xl font-bold text-white">{currentLore.title}</h3>
              {isChapterRead(currentLore.id) && (
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">✓ Read</span>
              )}
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {currentLore.content}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-cyan-500/20">
          <button
            onClick={() => handleChapterChange('prev')}
            disabled={currentChapter === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <span>←</span>
            <span>Previous</span>
          </button>

          {/* Chapter Navigation */}
          <div className="flex space-x-2">
            {retailstarLore.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => handleChapterClick(index)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                  index === currentChapter
                    ? 'bg-cyan-500 text-white'
                    : isChapterRead(chapter.id)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={chapter.title}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleChapterChange('next')}
            disabled={currentChapter === retailstarLore.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <span>Next</span>
            <span>→</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="p-4 bg-gray-800/50 border-t border-cyan-500/20 sm:hidden">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">
              {currentChapter + 1} of {retailstarLore.length}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleChapterChange('prev')}
                disabled={currentChapter === 0}
                className="p-2 bg-gray-700 rounded disabled:opacity-50"
              >
                ←
              </button>
              <button
                onClick={() => handleChapterChange('next')}
                disabled={currentChapter === retailstarLore.length - 1}
                className="p-2 bg-gray-700 rounded disabled:opacity-50"
              >
                →
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 