import React, { useEffect, useState } from 'react';

interface DayPassCountdownProps {
  expiresAt: string;
}

export default function DayPassCountdown({ expiresAt }: DayPassCountdownProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const expire = new Date(expiresAt);
      const diff = Math.max(0, expire.getTime() - now.getTime());
      
      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }
      
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hrs}h ${mins}m ${secs}s remaining`);
    };

    // Update immediately
    updateTimeLeft();
    
    // Update every second
    const interval = setInterval(updateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="text-center">
      <div className="text-sm text-yellow-300 mb-1">Mall Day Pass Active</div>
      <div className="text-lg font-bold text-yellow-400">{timeLeft}</div>
    </div>
  );
} 