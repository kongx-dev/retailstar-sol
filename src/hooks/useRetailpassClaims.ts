import { useState, useEffect } from 'react';
import { getUserClaims, createRetailpassClaim } from '../lib/supabase';

export interface TierData {
  tier_name: string;
  requirements: string;
  duration: number;
  benefits: string[];
  areas: string[];
  visual_asset: string;
}

export interface ClaimData {
  id: string;
  wallet: string;
  tier_name: string;
  issued_at: string;
  expires_at: string;
  claim_method: string;
  retailpass_tiers?: TierData;
}

export interface RetailpassClaimsData {
  claims: ClaimData[];
  activeClaim: ClaimData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createClaim: (tierName: string, method: string) => Promise<boolean>;
}

export function useRetailpassClaims(wallet: string | null): RetailpassClaimsData {
  const [claims, setClaims] = useState<ClaimData[]>([]);
  const [activeClaim, setActiveClaim] = useState<ClaimData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!wallet) {
      setClaims([]);
      setActiveClaim(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userClaims = await getUserClaims(wallet);
      setClaims(userClaims);

      // Find active (non-expired) claim
      const now = new Date();
      const active = userClaims.find(claim => {
        const expiresAt = new Date(claim.expires_at);
        return expiresAt > now;
      });

      setActiveClaim(active || null);
    } catch (err) {
      console.error('Error fetching claims:', err);
      setError('Failed to fetch claims');
      setClaims([]);
      setActiveClaim(null);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  const createClaim = async (tierName: string, method: string): Promise<boolean> => {
    if (!wallet) return false;

    try {
      const result = await createRetailpassClaim(wallet, tierName, method);
      if (result.success) {
        // Refresh data after creating claim
        await fetchData();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error creating claim:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, [wallet]);

  return {
    claims,
    activeClaim,
    loading,
    error,
    refetch,
    createClaim
  };
}

// Helper function to check if a claim is active
export function isClaimActive(claim: ClaimData): boolean {
  const now = new Date();
  const expiresAt = new Date(claim.expires_at);
  return expiresAt > now;
}

// Helper function to get time remaining for active claim
export function getTimeRemaining(claim: ClaimData): string {
  const now = new Date();
  const expiresAt = new Date(claim.expires_at);
  const diff = expiresAt.getTime() - now.getTime();

  if (diff <= 0) return 'Expired';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  } else {
    return `${minutes}m remaining`;
  }
}






