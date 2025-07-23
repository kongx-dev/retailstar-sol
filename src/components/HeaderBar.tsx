import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBar = () => {
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur-sm text-white z-50 relative border-b border-cyan-800">
      
      {/* Left Side: Mall Map + Brand Title */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/directory" 
          className="text-sm px-3 py-1 bg-cyan-700 rounded-full hover:bg-cyan-600 transition-colors duration-200"
        >
          📍 Mall Map
        </Link>
        <Link to="/" className="text-xl font-bold tracking-wide hover:text-cyan-400 transition-colors">
          Retailstar Mall
        </Link>
      </div>

      {/* Right Side: Navigation */}
      <nav className="flex space-x-6 text-sm font-medium items-center">
        <Link to="/catalog" className="hover:text-cyan-400 transition-colors">Catalog</Link>
        <Link to="/marketplace" className="hover:text-purple-400 transition-colors">Marketplace</Link>
        <Link to="/directory" className="hover:text-green-400 transition-colors">Map</Link>
        <Link to="/guide" className="hover:text-yellow-400 transition-colors">Guide</Link>
        <Link to="/pricing" className="hover:text-pink-400 transition-colors">Pricing</Link>
        
        {/* Optional Dev-only Diagnostic */}
        {isDev && (
          <div className="text-xs opacity-50 italic ml-4">
            🧠 listings unavailable. system degraded.
          </div>
        )}
      </nav>
    </header>
  );
};

export default HeaderBar; 