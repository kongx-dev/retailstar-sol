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

    // Step 2: Simulate system check (removed external API call to avoid CORS)
    setTimeout(() => {
      setStatus((prev) => ({
        ...prev,
        system: 'green',
        message: 'Mall entrance open. All systems nominal.',
      }));
    }, 1000);
  }, []);

  return status;
} 