import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFloorAccess, canAccessFloor } from '../hooks/useFloorAccess';

interface FloorAccessGuardProps {
  children: React.ReactNode;
  requiredFloor: 'basement' | 'mainFloor' | 'blueprint' | 'rooftop';
  wallet?: string | null;
}

export default function FloorAccessGuard({ 
  children, 
  requiredFloor, 
  wallet 
}: FloorAccessGuardProps) {
  const navigate = useNavigate();
  const access = useFloorAccess(wallet);

  // Always allow basement access
  if (requiredFloor === 'basement') {
    return <>{children}</>;
  }

  // Check if user has access to required floor
  const hasAccess = canAccessFloor(requiredFloor, access);

  // If no access, show denial overlay
  if (!hasAccess) {
    const getDenialMessage = () => {
      switch (requiredFloor) {
        case 'mainFloor':
          return {
            title: 'Access Denied',
            message: 'Purchase a domain to unlock Main Floor',
            action: 'Buy Domain',
            redirect: '/basement'
          };
        case 'blueprint':
          return {
            title: 'NFT Required',
            message: 'WifHoodie NFT required for Blueprint Suites',
            action: 'Check Wallet',
            redirect: '/main-floor'
          };
        case 'rooftop':
          return {
            title: 'DAO Access Only',
            message: 'DAO membership required for Rooftop Lounge',
            action: 'Join DAO',
            redirect: '/blueprint-suites'
          };
        default:
          return {
            title: 'Access Denied',
            message: 'Insufficient permissions',
            action: 'Go Back',
            redirect: '/basement'
          };
      }
    };

    const denial = getDenialMessage();

    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Glitch Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-cyan-900/20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJub2lzZSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIj4KICAgICAgPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDAwIi8+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSIyIiB5PSIxIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iNCIgeT0iMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgICAgIDxyZWN0IHg9IjEiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSI3IiB5PSI0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iMyIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgICAgIDxyZWN0IHg9IjgiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSI2IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iOSIgeT0iNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNub2lzZSkiLz4KPC9zdmc+Cg==')] opacity-10 pointer-events-none mix-blend-overlay" />
        </div>

        {/* Glitch Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`absolute left-0 h-[1px] w-full opacity-30 animate-pulse ${
                i % 3 === 0 ? 'bg-red-500' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-yellow-400'
              }`}
              style={{ top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        {/* Access Denied Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-2xl">
            {/* Glitchy Title */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 text-red-500 animate-pulse">
              {denial.title}
            </h1>
            
            {/* Error Code */}
            <div className="text-2xl font-mono text-cyan-400 mb-8">
              ERROR: 0x{Math.random().toString(16).substr(2, 8).toUpperCase()}
            </div>

            {/* Denial Message */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {denial.message}
            </p>

            {/* Access Requirements */}
            <div className="bg-gray-900/50 border border-red-500/50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-red-400 mb-4">Access Requirements:</h3>
              <div className="text-left space-y-2 text-sm">
                {requiredFloor === 'mainFloor' && (
                  <>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span>
                      <span>Basement access (current)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-400 mr-2">❌</span>
                      <span>Domain purchase required</span>
                    </div>
                  </>
                )}
                {requiredFloor === 'blueprint' && (
                  <>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span>
                      <span>Main Floor access</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-400 mr-2">❌</span>
                      <span>WifHoodie NFT required</span>
                    </div>
                  </>
                )}
                {requiredFloor === 'rooftop' && (
                  <>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span>
                      <span>Blueprint Suites access</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-400 mr-2">❌</span>
                      <span>DAO membership required</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(denial.redirect)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {denial.action}
              </button>
              <button
                onClick={() => navigate('/basement')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Return to Basement
              </button>
            </div>

            {/* System Status */}
            <div className="mt-8 text-xs text-gray-500 font-mono">
              <div>System: Retailstar Mall Access Control</div>
              <div>Status: Access Denied</div>
              <div>Timestamp: {new Date().toISOString()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User has access - render children
  return <>{children}</>;
}



