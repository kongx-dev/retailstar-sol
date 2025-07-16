import { useEffect, useState } from "react";

export default function CountdownTimer({ expires, onExpire }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(expires).getTime() - new Date().getTime();
      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        onExpire();
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [expires, onExpire]);

  return <span>{timeLeft}</span>;
} 