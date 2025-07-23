import React, { useState } from 'react';
import { useMallStatus } from '../hooks/useMallStatus';

export function StatusLight() {
  const status = useMallStatus();
  const [hovered, setHovered] = useState(false);

  if (!status) return null;

  const colors = {
    green: 'bg-green-400',
    yellow: 'bg-yellow-300',
    red: 'bg-red-500',
  };

  return (
    <div
      className="fixed top-4 right-4 z-50 text-xs font-mono text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center space-x-2 transition-all duration-200">
        <div
          className={`w-3 h-3 rounded-full animate-pulse ${colors[status.system]}`}
        />
        <span>{status.message}</span>
      </div>

      <div
        className={`absolute right-0 mt-2 w-72 bg-zinc-900 rounded p-3 border border-transparent shadow-xl backdrop-blur-sm transition-all duration-300 ease-out
        ${hovered ? 'opacity-100 translate-y-0 pointer-events-auto cyber-border-glow' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <div className="text-green-400 font-bold mb-1 tracking-wider">
          ⚡ SYSTEM DIAGNOSTICS
        </div>
        <div><span className="text-pink-400">Status:</span> {status.system.toUpperCase()}</div>
        <div><span className="text-blue-400">Uptime:</span> {status.uptime}</div>
        <div><span className="text-yellow-300">Last Deploy:</span> {new Date(status.lastDeployed).toLocaleString()}</div>
      </div>
    </div>
  );
} 