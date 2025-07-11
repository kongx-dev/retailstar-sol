import { useState, useEffect } from 'react';

const Timer = ({ label, time }) => {
  const [seconds, setSeconds] = useState(time);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (s) => {
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${d}d ${h}h ${m}m ${sec}s`;
  };
  
  return (
    <div className="text-sm text-gray-400 mb-4 text-center">
      {label}: {formatTime(seconds)}
    </div>
  );
};

export default Timer; 