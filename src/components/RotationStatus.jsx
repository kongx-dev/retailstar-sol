import React, { useState, useEffect } from 'react';

const RotationStatus = ({ compact = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const rotationData = [
    {
      name: "Flash Rack",
      interval: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      color: "green",
      domains: ["jpegdealer", "copevendor", "deploydeck", "bidgremlin"],
      description: "High-turnover domains"
    },
    {
      name: "Mid Tier", 
      interval: 72 * 60 * 60 * 1000, // 72 hours in milliseconds
      color: "blue",
      domains: ["jumpsetradio", "lurkerlife", "commandhub", "rigbuilder"],
      description: "Balanced movement"
    },
    {
      name: "Premium Wing",
      interval: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      color: "purple", 
      domains: ["fudscience", "biggestofbrains", "retailverse", "retailrunner"],
      description: "Long-term holdings"
    }
  ];

  const getTimeUntilNextRotation = (lastRotation, interval) => {
    const nextRotation = new Date(lastRotation.getTime() + interval);
    const timeLeft = nextRotation.getTime() - currentTime.getTime();
    return Math.max(0, timeLeft);
  };

  const formatTimeLeft = (milliseconds) => {
    if (milliseconds === 0) return "DUE NOW";
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}d ${remainingHours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getStatusColor = (color) => {
    switch (color) {
      case "green": return "text-green-400";
      case "blue": return "text-blue-400";
      case "purple": return "text-purple-400";
      default: return "text-gray-400";
    }
  };

  const getStatusBgColor = (color) => {
    switch (color) {
      case "green": return "bg-green-500/20 border-green-500/30";
      case "blue": return "bg-blue-500/20 border-blue-500/30";
      case "purple": return "bg-purple-500/20 border-purple-500/30";
      default: return "bg-gray-500/20 border-gray-500/30";
    }
  };

  const getStatusGlow = (color) => {
    switch (color) {
      case "green": return "shadow-green-500/25";
      case "blue": return "shadow-blue-500/25";
      case "purple": return "shadow-purple-500/25";
      default: return "shadow-gray-500/25";
    }
  };

  if (compact) {
    return (
      <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-4">
        <h3 className="text-sm font-semibold mb-3 text-cyan-400">🔄 Rotation Status</h3>
        <div className="grid grid-cols-3 gap-3">
          {rotationData.map((tier, index) => {
            // Simulate last rotation time (in real app, this would come from domains.json)
            const lastRotation = new Date(currentTime.getTime() - (tier.interval * 0.3)); // 30% through cycle
            const timeLeft = getTimeUntilNextRotation(lastRotation, tier.interval);
            const isDue = timeLeft === 0;
            
            return (
              <div 
                key={index}
                className={`p-2 rounded border ${getStatusBgColor(tier.color)} ${getStatusGlow(tier.color)}`}
              >
                <div className="text-center">
                  <div className={`text-xs font-bold ${getStatusColor(tier.color)}`}>
                    {tier.name}
                  </div>
                  <div className={`text-xs ${isDue ? 'text-red-400 font-bold' : 'text-gray-300'}`}>
                    {isDue ? 'DUE' : formatTimeLeft(timeLeft)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 rounded-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold mb-4 text-cyan-400">🔄 Rotation Status</h3>
      <div className="space-y-4">
        {rotationData.map((tier, index) => {
          // Simulate last rotation time (in real app, this would come from domains.json)
          const lastRotation = new Date(currentTime.getTime() - (tier.interval * 0.3)); // 30% through cycle
          const timeLeft = getTimeUntilNextRotation(lastRotation, tier.interval);
          const isDue = timeLeft === 0;
          const progress = ((tier.interval - timeLeft) / tier.interval) * 100;
          
          return (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${getStatusBgColor(tier.color)} ${getStatusGlow(tier.color)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className={`font-bold ${getStatusColor(tier.color)}`}>
                    {tier.name}
                  </h4>
                  <p className="text-xs text-gray-400">{tier.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${isDue ? 'text-red-400' : 'text-gray-300'}`}>
                    {isDue ? 'DUE NOW' : formatTimeLeft(timeLeft)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {tier.domains.length} domains
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    tier.color === 'green' ? 'bg-green-500' :
                    tier.color === 'blue' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              {/* Domain list */}
              <div className="flex flex-wrap gap-1">
                {tier.domains.slice(0, 3).map((domain, domainIndex) => (
                  <span 
                    key={domainIndex}
                    className={`text-xs px-2 py-1 rounded ${getStatusBgColor(tier.color)} border ${getStatusColor(tier.color)}`}
                  >
                    {domain}.sol
                  </span>
                ))}
                {tier.domains.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{tier.domains.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Next rotation check: {currentTime.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default RotationStatus; 