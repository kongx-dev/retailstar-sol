import React, { useState } from 'react';
import SNSRedirectModal from './SNSRedirectModal';

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
  tier?: 'vaulted-premium' | 'blueprint-tier' | 'quick-snag' | 'flash-rack';
};

const fallbackPng = '/assets/rs-logo.png';

const tierStyles = {
  'vaulted-premium': 'border-purple-500 shadow-purple-500/20',
  'blueprint-tier': 'border-blue-500 shadow-blue-500/20',
  'quick-snag': 'border-green-500 shadow-green-500/20',
  'flash-rack': 'border-yellow-500 shadow-yellow-500/20'
};

const tierLabels = {
  'vaulted-premium': '🔒 Vaulted Premium',
  'blueprint-tier': '📋 Blueprint Tier',
  'quick-snag': '⚡ Quick Snag',
  'flash-rack': '🎰 Flash Rack'
};

const tierDescriptions = {
  'vaulted-premium': 'Full website + lore integration',
  'blueprint-tier': 'Domain only - upgradeable later',
  'quick-snag': 'Loot only - no build included',
  'flash-rack': 'Limited time - chaos pricing'
};

function shouldRevealFixerQueue(domain: ScavDomain): boolean {
  return Boolean(domain.fixerQueue && !domain.fixerActive);
}

function ScavDomainCard({ domain }: { domain: ScavDomain }) {
  const [showSNSModal, setShowSNSModal] = useState(false);
  const tier = domain.tier || 'quick-snag';

  const handleBuyClick = () => {
    setShowSNSModal(true);
  };

  const handleSNSModalClose = () => {
    setShowSNSModal(false);
  };

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
      <div className={`bg-black neon-border rounded-2xl p-4 flex flex-col items-center shadow-lg animate-pulse border-2 border-orange-400 relative hover:rotate-1 transition-all duration-200 ${tierStyles[tier]}`}>
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full animate-glow font-bold">
          🔧 Fixer Upgrade Incoming
        </div>
        <div className="text-sm font-bold tracking-wide mb-2">
          {tierLabels[tier]}
        </div>
        <img
          src={domain.pngUrl || fallbackPng}
          alt={domain.name}
          className="w-32 h-32 object-contain rounded-xl mb-4 bg-zinc-900 border border-zinc-800 hover:scale-105 transition-transform"
          onError={e => (e.currentTarget.src = fallbackPng)}
        />
        <div className="font-bold text-lg text-white mb-2 text-center">{domain.name}</div>
        <p className={`text-xs italic mb-2 ${tier === 'vaulted-premium' ? 'text-purple-300' : 
          tier === 'blueprint-tier' ? 'text-blue-200' : 
          tier === 'quick-snag' ? 'text-green-300' : 'text-yellow-300'}`}>
          {tierDescriptions[tier]}
        </p>
        {domain.queueExpires && (
          <div className="text-sm text-orange-300 mb-2 font-mono">⏳ {countdown}</div>
        )}
        <a
          href={domain.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow w-full text-center block mb-2 animate-pulse bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-all"
        >
          Claim Before Build
        </a>
        <a href="/marketplace" className="text-xs text-cyan-400 mt-2 hover:underline hover:text-cyan-300 transition-colors">
          Go to Marketplace →
        </a>
      </div>
    );
  }
  
  return (
    <>
      <div className={`bg-black neon-border rounded-2xl p-4 flex flex-col items-center shadow-lg transition-all hover:drop-shadow-neon hover:rotate-1 hover:scale-105 duration-200 group ${tierStyles[tier]}`}>
        <div className="text-sm font-bold tracking-wide mb-2">
          {tierLabels[tier]}
        </div>
        <img
          src={domain.pngUrl || fallbackPng}
          alt={domain.name}
          className="w-32 h-32 object-contain rounded-xl mb-4 bg-zinc-900 border border-zinc-800 hover:scale-110 transition-transform duration-200"
          onError={e => (e.currentTarget.src = fallbackPng)}
        />
        <div className="font-bold text-lg text-white mb-2 text-center group-hover:text-neon-green transition-colors">
          {domain.name}
        </div>
        <p className={`text-xs italic mb-3 ${tier === 'vaulted-premium' ? 'text-purple-300' : 
          tier === 'blueprint-tier' ? 'text-blue-200' : 
          tier === 'quick-snag' ? 'text-green-300' : 'text-yellow-300'}`}>
          {tierDescriptions[tier]}
        </p>
        <button
          onClick={handleBuyClick}
          className="btn-glow w-full text-center block mb-2 animate-pulse bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
        >
          🛒 Buy Now
        </button>
        {domain.social && (
          <a
            href={domain.social}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-green-400 underline mb-2 hover:text-neon-green transition-colors"
          >
            {domain.social.replace('https://', '').replace('x.com/', '@')}
          </a>
        )}
        <a href="/upgrade" className="text-xs text-cyan-400 mt-2 hover:underline hover:text-cyan-300 transition-colors">
          Upgrade to Full Site →
        </a>
      </div>
      
      {/* SNS Redirect Modal */}
      <SNSRedirectModal
        isOpen={showSNSModal}
        onClose={handleSNSModalClose}
        domainName={domain.name}
      />
    </>
  );
}

export default ScavDomainCard; 