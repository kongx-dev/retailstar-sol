import React from 'react';
import { Link } from 'react-router-dom';
import rsLogo from '../assets/rs-logo.png';

const MerchPage = () => {
  const merchItems = [
    {
      id: 1,
      name: "RetailStar™ Glitch Hoodie",
      price: "0.5 SOL",
      image: "👕",
      description: "Neon-accented hoodie with embedded LED strips",
      status: "Coming Soon"
    },
    {
      id: 2,
      name: "Mall Rat Tee",
      price: "0.3 SOL",
      image: "🛒",
      description: "Classic tee with RetailStar branding",
      status: "Coming Soon"
    },
    {
      id: 3,
      name: "Deploy Deck Playing Cards",
      price: "0.2 SOL",
      image: "🃏",
      description: "Limited edition cyberpunk playing cards",
      status: "Coming Soon"
    },
    {
      id: 4,
      name: "Retailverse Keychain",
      price: "0.1 SOL",
      image: "🔑",
      description: "Glowing keychain with your favorite domain",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background with reduced opacity */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 z-0"></div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Banner Header */}
        <section className="pt-20 pb-16 px-4 bg-black/60 backdrop-blur-sm border-b border-blue-500/30">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <img 
                src={rsLogo} 
                alt="RetailStar Logo" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg shadow-2xl shadow-blue-500/20 border border-blue-500/30 flicker-solana"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
              RetailStar™ Merch Drop Zone
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              Gear up for the Retailverse. Every piece is a node in the network.
            </p>
          </div>
        </section>

        {/* Merch Grid */}
        <section className="px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {merchItems.map((item) => (
                <div 
                  key={item.id}
                  className="steel-surface card-hover-glow rounded-lg p-6 transition-all duration-300 group"
                >
                  {/* Item Image */}
                  <div className="text-6xl text-center mb-6">
                    {item.image}
                  </div>
                  
                  {/* Item Name */}
                  <h3 className="text-xl font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
                    {item.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm text-center mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Price */}
                  <div className="text-center mb-6">
                    <span className="text-2xl font-bold flicker-solana solana-gradient">
                      {item.price}
                    </span>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex justify-center">
                    <button className="bg-yellow-600 text-black text-center py-3 px-6 rounded-lg text-sm font-semibold glow-purple hover:bg-yellow-500 transition-colors duration-200">
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed glow-blue mb-6">
              Merch drops are limited edition. Once they're gone, they're gone forever in the Retailverse.
            </p>
            
            <div className="flex justify-center space-x-8 text-sm">
              <Link 
                to="/" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                ← Back to Domains
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MerchPage; 