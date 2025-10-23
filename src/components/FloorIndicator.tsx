import React from 'react';
import { useFloorAccess } from '../hooks/useFloorAccess';

interface FloorIndicatorProps {
  wallet?: string | null;
  className?: string;
}

export default function FloorIndicator({ wallet, className = '' }: FloorIndicatorProps) {
  const access = useFloorAccess(wallet);

  const getCurrentFloor = () => {
    if (access.rooftop) return { name: 'Rooftop Lounge', level: 4, icon: '✨' };
    if (access.blueprint) return { name: 'Blueprint Suites', level: 3, icon: '🪜' };
    if (access.mainFloor) return { name: 'Main Floor', level: 2, icon: '🏬' };
    return { name: 'Basement', level: 1, icon: '🕳️' };
  };

  const currentFloor = getCurrentFloor();

  return (
    <div className={`bg-gray-900/80 border border-cyan-500/50 rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{currentFloor.icon}</span>
          <div>
            <div className="text-sm font-bold text-cyan-400">{currentFloor.name}</div>
            <div className="text-xs text-gray-400">Level {currentFloor.level}</div>
          </div>
        </div>
        
        {/* Floor Progress */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full ${
                level <= currentFloor.level
                  ? 'bg-cyan-400'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Access Status */}
      <div className="mt-3 text-xs text-gray-400">
        <div className="flex justify-between">
          <span>Basement:</span>
          <span className={access.basement ? 'text-green-400' : 'text-red-400'}>
            {access.basement ? '✅' : '❌'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Main Floor:</span>
          <span className={access.mainFloor ? 'text-green-400' : 'text-red-400'}>
            {access.mainFloor ? '✅' : '❌'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Blueprint:</span>
          <span className={access.blueprint ? 'text-green-400' : 'text-red-400'}>
            {access.blueprint ? '✅' : '❌'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Rooftop:</span>
          <span className={access.rooftop ? 'text-green-400' : 'text-red-400'}>
            {access.rooftop ? '✅' : '❌'}
          </span>
        </div>
      </div>
    </div>
  );
}



