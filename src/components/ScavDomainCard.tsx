import React from 'react';

type ScavDomain = {
  name: string;
  pngUrl?: string;
  tags: string[];
  buyLink: string;
  social?: string;
  fixerQueue?: boolean;
  fixerActive?: boolean;
  queueExpires?: string | null;
  status?: string;
};

const fallbackPng = '/assets/rs-logo.png';

function shouldRevealFixerQueue(domain: ScavDomain) {
  if (!domain.fixerQueue || domain.status === 'promoted') return false;
  if (domain.fixerActive) return true;
  return Math.random() < 0.12;
}

function ScavDomainCard({ domain }: { domain: ScavDomain }) {
  if (shouldRevealFixerQueue(domain)) {
    // Calculate countdown if queueExpires is set
    let countdown = '';
    if (domain.queueExpires) {
      const expires = new Date(domain.queueExpires).getTime();
      const now = Date.now();
      const diff = expires - now;
      if (diff > 0) {
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        countdown = `${hours}h ${mins}m`;
      } else {
        countdown = 'Upgrading soon!';
      }
    }
    return (
      <div className="bg-black neon-border rounded-2xl p-4 flex flex-col items-center shadow-lg animate-pulse border-2 border-orange-400 relative">
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full animate-glow">🔧 Fixer Upgrade Incoming</div>
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
        {domain.queueExpires && (
          <div className="text-sm text-orange-300 mb-2 font-mono">⏳ {countdown}</div>
        )}
        <a
          href={domain.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow w-full text-center block mb-2 animate-pulse bg-orange-500 hover:bg-orange-600 text-white"
        >
          Claim Before Build
        </a>
        <a href="/marketplace" className="text-xs text-cyan-400 mt-2 hover:underline">Go to Marketplace →</a>
      </div>
    );
  }
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