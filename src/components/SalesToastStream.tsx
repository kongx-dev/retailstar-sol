import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { generateSolanaLikeWallet } from '../utils/fakeWallet';

const sampleSales = [
  { domain: 'commandhub.sol', price: '8.5 SOL', flair: '🎯 A buyer just leveled up with' },
  { domain: 'dripdealer.sol', price: '1.2 SOL', flair: '🧃 Picked up some fresh drip from' },
  { domain: 'bidgremlin.sol', price: '2.1 SOL', flair: '👹 Summoned the gremlin:' },
  { domain: 'missedpricedaf.sol', price: '0.42 SOL', flair: '🎲 Rolled the dice on' },
  { domain: 'lowballking.sol', price: '1.8 SOL', flair: '👑 Crowned the lowball king:' },
  { domain: 'thisaintit.sol', price: '2.5 SOL', flair: '🤔 Finally found it with' },
  { domain: 'urnotthatguy.sol', price: '3.2 SOL', flair: '😎 Became that guy with' },
  { domain: 'copthisbro.sol', price: '1.1 SOL', flair: '🤝 Copped this bro:' },
];

export default function SalesToastStream() {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(generateSolanaLikeWallet());

  // Don't show sales toast on upgrade page
  if (location.pathname === '/upgrade') {
    return null;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % sampleSales.length);
        setCurrentWallet(generateSolanaLikeWallet()); // Generate new wallet for each notification
        setVisible(true);
        setIsAnimating(false);
        
        // Show confetti for high-value sales
        const currentSale = sampleSales[(currentIndex + 1) % sampleSales.length];
        const price = parseFloat(currentSale.price);
        if (price >= 10) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 2000);
        }
      }, 500); // fade out duration
    }, 12000); // every 12s

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Auto-dismiss banner after 8 seconds on mobile
  useEffect(() => {
    if (visible) {
      const dismissTimer = setTimeout(() => {
        setVisible(false);
      }, 8000);
      
      return () => clearTimeout(dismissTimer);
    }
  }, [visible, currentIndex]);

  const { domain, price, flair } = sampleSales[currentIndex];
  const priceValue = parseFloat(price);

  return (
    <>
      <div
        className={`fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-700 to-purple-800 border border-violet-600 shadow-2xl transition-all duration-500 z-[9999] max-w-sm sm:max-w-md mx-auto ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-2'
        } ${isAnimating ? 'animate-pulse' : ''}`}
        style={{
          boxShadow: visible ? '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)' : 'none'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className={`text-yellow-300 ${priceValue >= 10 ? 'animate-bounce' : 'animate-pulse'}`}>
              {priceValue >= 10 ? '💎' : '💰'}
            </span>
            <span className="text-cyan-300 font-mono text-xs truncate">{currentWallet}</span>
          </div>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-center sm:text-left">
            <span className="text-xs">{flair}</span>
            <span className="text-cyan-300 font-bold text-xs">{domain}</span>
            <span className="text-xs">for</span>
            <span className={`font-bold text-xs ${priceValue >= 10 ? 'text-yellow-300' : 'text-green-400'}`}>
              {price}
            </span>
            <span className="text-yellow-300">🤑</span>
          </div>
        </div>
      </div>

      {/* Solana-themed firefly particles for high-value sales */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[10000]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-firefly"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                background: `radial-gradient(circle, ${['#00ffff', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 3)]} 0%, transparent 70%)`,
                boxShadow: `0 0 8px ${['#00ffff', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 3)]}`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
} 