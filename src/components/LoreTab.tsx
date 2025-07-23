import React from 'react';
import { retailstarLore, getLoreProgress, getReadChapters } from '../data/loreContent';

export default function LoreTab() {
  const progress = getLoreProgress();
  const readChapters = getReadChapters();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">📖 Retailstar Lore</h2>
        <p className="text-gray-300 mb-6">
          The story of how Retailstar evolved from a chaotic Scav Rack to a gated mall of misfit domains.
        </p>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{progress}% complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {retailstarLore.map((chapter, index) => {
          const isRead = readChapters.includes(chapter.id);
          const isCurrent = index === Math.floor((readChapters.length / retailstarLore.length) * retailstarLore.length);
          
          return (
            <div 
              key={chapter.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                isRead 
                  ? 'bg-green-900/20 border-green-500/30' 
                  : isCurrent
                  ? 'bg-cyan-900/20 border-cyan-500/30'
                  : 'bg-gray-800/20 border-gray-600/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{chapter.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">{chapter.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    {isRead && (
                      <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">✓ Read</span>
                    )}
                    {isCurrent && !isRead && (
                      <span className="text-xs bg-cyan-600 text-white px-2 py-1 rounded">Current</span>
                    )}
                    <span className="text-xs text-gray-400">Chapter {index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {chapter.content.split('\n')[0]}...
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-black/30 border border-cyan-500/30 rounded-lg p-4">
        <h3 className="font-semibold text-cyan-400 mb-3">📊 Lore Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-400">Total Chapters</div>
            <div className="text-white font-semibold">{retailstarLore.length}</div>
          </div>
          <div>
            <div className="text-gray-400">Chapters Read</div>
            <div className="text-white font-semibold">{readChapters.length}</div>
          </div>
          <div>
            <div className="text-gray-400">Progress</div>
            <div className="text-white font-semibold">{progress}%</div>
          </div>
          <div>
            <div className="text-gray-400">Remaining</div>
            <div className="text-white font-semibold">{retailstarLore.length - readChapters.length}</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-cyan-900/30 to-pink-900/30 border border-cyan-500/30 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-2">Ready to dive deeper?</h3>
        <p className="text-gray-300 mb-4">
          Continue reading the lore to unlock the full story of the Retailverse.
        </p>
        <button className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25">
          📖 Continue Reading
        </button>
      </div>
    </div>
  );
} 