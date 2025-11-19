import React from 'react';
import { Link } from 'react-router-dom';

interface SNSHeaderProps {
  activeTab?: 'domains' | 'activity' | 'settings';
  domainCount?: number;
  onTabChange?: (tab: 'domains' | 'activity' | 'settings') => void;
}

const SNSHeader: React.FC<SNSHeaderProps> = ({ 
  activeTab = 'domains', 
  domainCount = 182,
  onTabChange 
}) => {
  const walletAddress = "E3cwMaukbBs9PDxwziqL9DWXVLbF35y9y5x3hE21EebU";

  return (
    <div className="bg-gradient-to-r from-blue-900/90 to-purple-900/90 backdrop-blur-sm border-b border-blue-500/30">
      {/* Top Section */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Branding */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">RS</span>
              </div>
              <div>
                <div className="text-white font-semibold text-lg">retailstar.sol</div>
                <div className="text-blue-300 text-xs font-mono">{walletAddress}</div>
              </div>
            </div>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🎵</span>
            </div>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xs">𝕏</span>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">💬</span>
            </div>
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">📷</span>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">⊞</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 border-t border-blue-500/20">
        <div className="flex space-x-8">
          <button
            onClick={() => onTabChange?.('domains')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'domains'
                ? 'border-blue-400 text-blue-300'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Domains
          </button>
          <button
            onClick={() => onTabChange?.('activity')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'activity'
                ? 'border-blue-400 text-blue-300'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => onTabChange?.('settings')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'settings'
                ? 'border-blue-400 text-blue-300'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Domain Management Section */}
      <div className="px-6 py-4 border-t border-blue-500/20 bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Filter Dropdown */}
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white">
              <option>All ({domainCount})</option>
              <option>Available</option>
              <option>Sold</option>
              <option>Featured</option>
            </select>

            {/* Sort Dropdown */}
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white">
              <option>Sorted by: Domain (A-Z)</option>
              <option>Sorted by: Price (Low-High)</option>
              <option>Sorted by: Date Added</option>
              <option>Sorted by: Popularity</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-800 border border-gray-600 rounded pl-10 pr-4 py-2 text-sm text-white w-64"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>

            {/* View Toggle Icons */}
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">●</span>
              </button>
              <button className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-white text-xs">⊞</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="bg-red-900/50 border-t border-red-500/30 px-6 py-2">
        <div className="flex items-center space-x-2 text-red-300 text-sm">
          <span>🔥</span>
          <span>Listings unavailable. System degraded.</span>
        </div>
      </div>
    </div>
  );
};

export default SNSHeader;

















