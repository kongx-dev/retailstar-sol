import React, { useState, useEffect } from 'react';
import flashDomains from '../data/domains.json';

const FlashSaleRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  const flashSales = flashDomains.flash || [];

  // Calculate time left for each domain
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const timeLeftObj = {};
      
      flashSales.forEach((domain, index) => {
        const endTime = new Date(domain.endTime).getTime();
        const difference = endTime - now;
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          timeLeftObj[index] = { days, hours, minutes, seconds };
        } else {
          timeLeftObj[index] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
      
      setTimeLeft(timeLeftObj);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [flashSales]);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashSales.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [flashSales.length]);

  if (flashSales.length === 0) {
    return null;
  }

  const currentDomain = flashSales[currentIndex];
  const currentTimeLeft = timeLeft[currentIndex] || { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      {/* Flash Sale Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-black mb-4 neon-pulse solana-gradient flicker-solana">
          <span className="text-red-400">⚡</span> FLASH SALE <span className="text-red-400">⚡</span>
        </h2>
        <p className="text-lg text-gray-300 glow-red">
          Limited time offers - Don't miss out!
        </p>
      </div>

      {/* Main Flash Sale Card */}
      <div className="relative">
        {/* Card Container */}
        <div className="steel-surface card-hover-glow rounded-xl p-8 transition-all duration-500 transform hover:scale-105">
          {/* Flash Badge */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
            {currentDomain.discount}
          </div>

          {/* Domain Info */}
          <div className="text-center mb-6">
            <h3 className="text-3xl md:text-4xl font-bold solana-gradient mb-4 group-hover:glow-blue transition-colors">
              {currentDomain.name}
            </h3>
            <p className="text-lg text-gray-300 mb-4">
              {currentDomain.description}
            </p>
          </div>

          {/* Price Section */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="text-center">
              <span className="text-sm text-gray-400 line-through">
                {currentDomain.originalPrice}
              </span>
              <div className="text-2xl md:text-3xl font-bold flicker-solana solana-gradient">
                {currentDomain.price}
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-6">
            <div className="text-center mb-3">
              <span className="text-sm text-gray-400">Sale Ends In:</span>
            </div>
            <div className="flex justify-center gap-2 md:gap-4">
              <div className="bg-black/50 rounded-lg p-3 text-center min-w-[60px]">
                <div className="text-xl md:text-2xl font-bold text-red-400">
                  {formatTime(currentTimeLeft.days)}
                </div>
                <div className="text-xs text-gray-400">Days</div>
              </div>
              <div className="bg-black/50 rounded-lg p-3 text-center min-w-[60px]">
                <div className="text-xl md:text-2xl font-bold text-red-400">
                  {formatTime(currentTimeLeft.hours)}
                </div>
                <div className="text-xs text-gray-400">Hours</div>
              </div>
              <div className="bg-black/50 rounded-lg p-3 text-center min-w-[60px]">
                <div className="text-xl md:text-2xl font-bold text-red-400">
                  {formatTime(currentTimeLeft.minutes)}
                </div>
                <div className="text-xs text-gray-400">Mins</div>
              </div>
              <div className="bg-black/50 rounded-lg p-3 text-center min-w-[60px]">
                <div className="text-xl md:text-2xl font-bold text-red-400">
                  {formatTime(currentTimeLeft.seconds)}
                </div>
                <div className="text-xs text-gray-400">Secs</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <a 
              href="https://twitter.com/messages/compose?recipient_id=KongX"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-red neon-red-hover text-center py-3 px-8 rounded-lg text-lg font-bold transition-all duration-200 transform hover:scale-105"
            >
              🚨 BUY NOW 🚨
            </a>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {flashSales.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-red-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to flash sale ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ 
                width: `${((currentIndex + 1) / flashSales.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* All Flash Sales Preview */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-center mb-6 solana-gradient">
          All Flash Sales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashSales.map((domain, index) => {
            const domainTimeLeft = timeLeft[index] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
            const isActive = index === currentIndex;
            
            return (
              <div 
                key={index}
                className={`steel-surface rounded-lg p-4 transition-all duration-300 cursor-pointer ${
                  isActive ? 'ring-2 ring-red-500 scale-105' : 'hover:scale-105'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="text-center">
                  <h4 className="text-lg font-bold solana-gradient mb-2">
                    {domain.name}
                  </h4>
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400 line-through">
                      {domain.originalPrice}
                    </span>
                    <span className="text-lg font-bold text-red-400">
                      {domain.price}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    {domain.discount}
                  </div>
                  <div className="text-xs text-gray-500">
                    {domainTimeLeft.days}d {domainTimeLeft.hours}h {domainTimeLeft.minutes}m
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlashSaleRotator; 