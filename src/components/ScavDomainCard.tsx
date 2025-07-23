import React, { useState, useEffect } from 'react';
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

// Retail Ticket System
const TICKET_KEY = 'retailstar_tickets';
const SPINS_KEY = 'retailstar_spins';

function getRetailTickets() {
  try {
    const tickets = localStorage.getItem(TICKET_KEY);
    return tickets ? parseInt(tickets) : 0;
  } catch {
    return 0;
  }
}

function setRetailTickets(count: number) {
  try {
    localStorage.setItem(TICKET_KEY, Math.min(count, 5).toString());
  } catch (error) {
    console.error('Error setting tickets:', error);
  }
}

function getSpinsUsed(domainName: string): number {
  try {
    const spins = localStorage.getItem(SPINS_KEY);
    if (!spins) return 0;
    const data = JSON.parse(spins);
    return data[domainName] || 0;
  } catch {
    return 0;
  }
}

function saveSpinsUsed(domainName: string, count: number) {
  try {
    const spins = localStorage.getItem(SPINS_KEY);
    const data = spins ? JSON.parse(spins) : {};
    data[domainName] = count;
    localStorage.setItem(SPINS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving spins:', error);
  }
}

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

// Slot Machine Component
function SlotMachine({ isOpen, onClose, onPurchase, domain }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onPurchase: (price: string) => void;
  domain: ScavDomain;
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string>('');
  const [showRespin, setShowRespin] = useState(false);
  const [tickets, setTickets] = useState(getRetailTickets());
  const [spinsUsed, setSpinsUsed] = useState(getSpinsUsed(domain.name));
  const [reelSymbols, setReelSymbols] = useState(['🎰', '🎰', '🎰']);
  const [isInitialized, setIsInitialized] = useState(false);

  const symbols = ['🔤', '💰', '🧃', '🎰', '💎', '🔥', '⭐', '🎯'];
  
  const spinReels = () => {
    setIsSpinning(true);
    setResult('');
    setShowRespin(false);
    setIsInitialized(true);

    // Update reel symbols during spin - faster updates
    const spinInterval = setInterval(() => {
      setReelSymbols([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 80); // Faster updates

    // Simulate spinning animation - shorter duration
    setTimeout(() => {
      clearInterval(spinInterval);
      const random = Math.random();
      let price: string;
      
      if (random < 0.01) {
        // Jackpot: 1% chance
        price = 'FREE';
        setRetailTickets(Math.min(tickets + 5, 5));
        setTickets(Math.min(tickets + 5, 5));
      } else if (random < 0.11) {
        // Rare discount: 10% chance
        price = '0.19 SOL';
      } else {
        // Standard price: 89% chance
        price = '0.25 SOL';
      }
      
      setResult(price);
      setIsSpinning(false);
      setShowRespin(true);
      setReelSymbols(['🎰', '🎰', '🎰']);
    }, 1500); // Shorter spin duration
  };

  const handleRespin = () => {
    if (tickets > 0 && spinsUsed < 3) {
      setTickets(tickets - 1);
      setRetailTickets(tickets - 1);
      const newSpinsUsed = spinsUsed + 1;
      saveSpinsUsed(domain.name, newSpinsUsed);
      setSpinsUsed(newSpinsUsed);
      spinReels();
    }
  };

  const handlePurchase = () => {
    if (result === 'FREE') {
      // Award tickets for free purchase
      const newTickets = Math.min(tickets + 1, 5);
      setTickets(newTickets);
      setRetailTickets(newTickets);
    } else if (result.includes('SOL')) {
      // Award tickets for SOL purchase (1 ticket per 0.2 SOL)
      const solAmount = parseFloat(result.split(' ')[0]);
      const ticketsEarned = Math.floor(solAmount / 0.2);
      const newTickets = Math.min(tickets + ticketsEarned, 5);
      setTickets(newTickets);
      setRetailTickets(newTickets);
    }
    
    onPurchase(result);
    onClose();
  };

  // Cleanup on close
  const handleClose = () => {
    setIsSpinning(false);
    setResult('');
    setShowRespin(false);
    setIsInitialized(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure smooth opening
      const timer = setTimeout(() => {
        spinReels();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-cyan-500/30 rounded-xl p-6 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-2">🎰 Slot Machine</h3>
          <p className="text-sm text-gray-400">Spin for a discount on {domain.name}</p>
        </div>
        
        {/* Reels */}
        <div className="flex justify-center gap-2 mb-6">
          {reelSymbols.map((symbol, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-zinc-800 border border-cyan-500/30 rounded-lg flex items-center justify-center text-2xl font-bold"
            >
              {symbol}
            </div>
          ))}
        </div>
        
        {/* Result */}
        {result && (
          <div className="text-center mb-6">
            <div className={`text-3xl font-bold mb-2 transition-all duration-500 ${
              result === 'FREE' ? 'text-yellow-400' : 'text-cyan-400'
            }`}>
              {result}
            </div>
            {result === 'FREE' && (
              <div className="text-sm text-yellow-300 mb-2">
                🎉 JACKPOT! +5 Retail Tickets
              </div>
            )}
          </div>
        )}
        
        {/* Purchase button */}
        {result && !isSpinning && (
          <button
            onClick={handlePurchase}
            className="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 mb-4 shadow-lg hover:shadow-green-500/25"
          >
            🛒 Purchase for {result}
          </button>
        )}
        
        {/* Respin option */}
        {showRespin && tickets > 0 && spinsUsed < 3 && (
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">
              Use 1 Retail Ticket to Respin? (You have {tickets})
            </div>
            <button
              onClick={handleRespin}
              className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
            >
              🔄 Respin ({3 - spinsUsed} left)
            </button>
          </div>
        )}
        
        {/* Ticket count */}
        <div className="absolute top-4 left-4 bg-slate-800 px-3 py-1 rounded-full text-sm border border-cyan-500/30">
          🎫 {tickets} Tickets
        </div>
      </div>
    </div>
  );
}

function ScavDomainCard({ domain, onSlotMachineToggle }: { 
  domain: ScavDomain; 
  onSlotMachineToggle?: (isOpen: boolean) => void;
}) {
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const [showSNSModal, setShowSNSModal] = useState(false);
  const [tickets, setTickets] = useState(getRetailTickets());
  const tier = domain.tier || 'quick-snag';

  const handleBuyClick = () => {
    setShowSNSModal(true);
    onSlotMachineToggle?.(true);
  };

  const handleSlotMachineClose = () => {
    setShowSlotMachine(false);
    onSlotMachineToggle?.(false);
  };

  const handleSNSModalClose = () => {
    setShowSNSModal(false);
    onSlotMachineToggle?.(false);
  };

  const handlePurchase = (price: string) => {
    console.log(`🎉 Purchased ${domain.name} for ${price}!`);
    // Here you would integrate with actual payment system
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
      
      {/* Slot Machine (kept for potential future use) */}
      <SlotMachine
        isOpen={showSlotMachine}
        onClose={handleSlotMachineClose}
        onPurchase={handlePurchase}
        domain={domain}
      />
    </>
  );
}

export default ScavDomainCard; 