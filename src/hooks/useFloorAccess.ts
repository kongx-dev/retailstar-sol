import { useState, useEffect } from 'react';
import { useRetailAccess } from './useRetailAccess';

export interface FloorAccess {
  basement: boolean;
  mainFloor: boolean;
  blueprint: boolean;
  rooftop: boolean;
  loading: boolean;
}

export function useFloorAccess(wallet: string | null): FloorAccess {
  const [access, setAccess] = useState<FloorAccess>({
    basement: true, // Always accessible
    mainFloor: false,
    blueprint: false,
    rooftop: false,
    loading: true
  });

  // Get retail access data for NFT/tier checks
  const retailAccess = useRetailAccess(wallet);

  useEffect(() => {
    if (!wallet) {
      // No wallet connected - only basement access
      setAccess({
        basement: true,
        mainFloor: false,
        blueprint: false,
        rooftop: false,
        loading: false
      });
      return;
    }

    // Check localStorage for domain purchase flag
    const hasDomain = typeof window !== 'undefined' && 
      localStorage.getItem('hasDomain') === 'true';

    // Check for WifHoodie NFT
    const hasWifHoodie = retailAccess.wifhoodie;

    // Check for DAO/whitelist access (hardcoded for now)
    const daoWhitelist = [
      '7vswd...fE9s', // Mock wallet for demo
      'admin.retailstar.sol',
      'founder.retailstar.sol'
    ];
    const hasDaoAccess = daoWhitelist.includes(wallet) || 
      retailAccess.tier === 'Mallcore' || 
      retailAccess.tier === 'Ghostrunner';

    setAccess({
      basement: true,
      mainFloor: hasDomain,
      blueprint: hasWifHoodie,
      rooftop: hasDaoAccess,
      loading: retailAccess.loading
    });
  }, [wallet, retailAccess]);

  return access;
}

// Helper function to unlock main floor after domain purchase
export function unlockMainFloor(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hasDomain', 'true');
  }
}

// Helper function to check if user can access a specific floor
export function canAccessFloor(floor: 'basement' | 'mainFloor' | 'blueprint' | 'rooftop', access: FloorAccess): boolean {
  switch (floor) {
    case 'basement':
      return access.basement;
    case 'mainFloor':
      return access.mainFloor;
    case 'blueprint':
      return access.blueprint;
    case 'rooftop':
      return access.rooftop;
    default:
      return false;
  }
}





