import React from 'react';

type ScavDomain = {
  name: string;
  pngUrl?: string;
  tags: string[];
  buyLink: string;
  social?: string;
};

const fallbackPng = '/assets/rs-logo.png';

function ScavDomainCard({ domain }: { domain: ScavDomain }) {
  return (
    <div className="bg-black neon-border rounded-2xl p-4 flex flex-col items-center shadow-lg transition-all hover:drop-shadow-neon">
      <img
        src={domain.pngUrl || fallbackPng}
        alt={domain.name}
        className="w-32 h-32 object-contain rounded-xl mb-4 bg-zinc-900 border border-zinc-800"
        onError={e => (e.currentTarget.src = fallbackPng)}
      />
      <div className="font-bold text-lg text-white mb-2 text-center">{domain.name}</div>
      <div className="flex flex-wrap gap-2 mb-3 justify-center">
        {domain.tags.map((tag, i) => (
          <span key={i} className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded-full opacity-80">{tag}</span>
        ))}
      </div>
      <a
        href={domain.buyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-glow w-full text-center block mb-2 animate-pulse"
      >
        Buy Now
      </a>
      {domain.social && (
        <a
          href={domain.social}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-green-400 underline mb-2 hover:text-neon-green"
        >
          {domain.social.replace('https://', '').replace('x.com/', '@')}
        </a>
      )}
      <a href="/upgrade" className="text-xs text-cyan-400 mt-2 hover:underline">Upgrade to Full Site →</a>
    </div>
  );
}

export default ScavDomainCard; 