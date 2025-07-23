import React from 'react';
import { mythicDomains } from '../data/mythicDomains';

export default function MythicRotator() {
  return (
    <div className="my-8 px-4">
      <h2 className="text-3xl font-bold text-violet-300 mb-3">🧿 Mythic Domains</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {mythicDomains.map((domain) => (
          <div key={domain.name} className="relative group cursor-pointer">
            <div className="min-w-[200px] bg-black/70 border border-violet-700 text-white px-4 py-3 rounded-xl shadow-md hover:scale-105 transform transition-all group-hover:animate-glow">
              <div className="text-lg font-semibold">{domain.name}</div>
              <div className="text-violet-400 mt-1">{domain.price}</div>
              <div className="text-orange-400 text-xs font-bold mt-2">🔥 Featured</div>
            </div>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-violet-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg z-10">
              🔥 Mythic Artifact — not for the faint of heart
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 