import React from 'react';

const DomainCard = ({ domain, tier }) => {
  const { name, price, desc, sns } = domain;

  const handleRequestToBuy = () => {
    alert(`Request to buy ${name} for ${price}\n\nContact: https://twitter.com/messages/compose?recipient_id=KongX`);
  };

  const handleBuyNow = () => {
    if (sns) {
      window.open(sns, '_blank');
    } else {
      alert(`Buy ${name} on SNS Marketplace`);
    }
  };

  const getTierStyles = () => {
    switch (tier) {
      case 'premium':
        return {
          border: 'border-purple-500/50',
          glow: 'hover:shadow-purple-500/30',
          badge: 'bg-purple-600 text-white',
          button: 'bg-purple-600 hover:bg-purple-500 text-white'
        };
      case 'mid':
        return {
          border: 'border-blue-500/50',
          glow: 'hover:shadow-blue-500/30',
          badge: 'bg-blue-600 text-white',
          button: 'bg-blue-600 hover:bg-blue-500 text-white'
        };
      case 'quick':
        return {
          border: 'border-orange-500/50',
          glow: 'hover:shadow-orange-500/30',
          badge: 'bg-orange-600 text-white',
          button: 'bg-orange-600 hover:bg-orange-500 text-white'
        };
      default:
        return {
          border: 'border-gray-500/50',
          glow: 'hover:shadow-gray-500/30',
          badge: 'bg-gray-600 text-white',
          button: 'bg-gray-600 hover:bg-gray-500 text-white'
        };
    }
  };

  const styles = getTierStyles();

  return (
    <div className={`steel-surface card-hover-glow rounded-lg p-6 transition-all duration-300 group border ${styles.border} ${styles.glow}`}>
      {/* Domain Name */}
      <h3 className="text-xl font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
        {name}
      </h3>
      
      {/* Description */}
      <p className="text-gray-400 text-sm text-center mb-4 leading-relaxed">
        {desc}
      </p>
      
      {/* Price */}
      <div className="text-center mb-4">
        <span className="text-2xl font-bold flicker-solana solana-gradient">
          {price}
        </span>
      </div>
      
      {/* Action Button */}
      <div className="flex justify-center">
        {sns ? (
          <button
            onClick={handleBuyNow}
            className={`${styles.button} text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200`}
          >
            🔗 Buy Now
          </button>
        ) : (
          <button
            onClick={handleRequestToBuy}
            className={`${styles.button} text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200`}
          >
            💬 Request to Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default DomainCard; 