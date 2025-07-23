import { useEffect, useState } from 'react';

type SystemState = 'green' | 'yellow' | 'red';

export function useMallStatus() {
  const [status, setStatus] = useState<{
    system: SystemState;
    message: string;
    uptime: string;
    lastDeployed: string;
  }>({
    system: 'yellow',
    message: 'Checking systems...',
    uptime: '--',
    lastDeployed: 'Loading...',
  });

  useEffect(() => {
    // Step 1: Load static fallback
    fetch('/api/status.json')
      .then((res) => res.json())
      .then((data) => {
        setStatus((prev) => ({ ...prev, ...data }));
      });

    // Step 2: Ping a critical endpoint (like domain listings)
    fetch('https://retailstar.xyz/api/listings') // replace with real endpoint
      .then((res) => {
        if (!res.ok) throw new Error('Listings down');
        return res.json();
      })
      .then(() => {
        setStatus((prev) => ({
          ...prev,
          system: 'green',
          message: 'Mall entrance open. All systems nominal.',
        }));
      })
      .catch(() => {
        setStatus((prev) => ({
          ...prev,
          system: 'red',
          message: '🔥 Listings unavailable. System degraded.',
        }));
      });
  }, []);

  return status;
} 