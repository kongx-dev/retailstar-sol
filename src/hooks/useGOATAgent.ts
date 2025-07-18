import { useState } from 'react';

// Vite env typing workaround for TS: use import.meta.env directly in Vite projects
// If you get TS errors, you can use (import.meta as any).env or (window as any).importMeta.env

interface MintAndTransferParams {
  domainSlug: string;
  recipientEmailOrWallet: string;
}

export const useGOATAgent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const mintAndTransferNFT = async ({
    domainSlug,
    recipientEmailOrWallet,
  }: MintAndTransferParams) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const metadata = {
      name: `${domainSlug}.sol`,
      image: `https://retailstar.xyz/assets/domains/${domainSlug}.png`,
      description: `Retailstar collectible for ${domainSlug}.sol.`,
      attributes: [
        { trait_type: 'Rack', value: domainSlug.includes('low') ? 'Scav Rack' : 'Fixer Catalog' },
        { trait_type: 'Type', value: 'Sol Domain' },
      ],
    };

    try {
      const res = await fetch('https://www.crossmint.io/api/2022-06-09/collections/default/nfts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-secret': (import.meta as any).env.VITE_CROSSMINT_API_KEY,
          'x-project-id': (import.meta as any).env.VITE_CROSSMINT_PROJECT_ID,
        },
        body: JSON.stringify({
          recipient: `solana:${recipientEmailOrWallet}`,
          metadata,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Minting failed');
      }

      setSuccess(true);
    } catch (err: any) {
      console.error('Minting error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    mintAndTransferNFT,
    loading,
    error,
    success,
  };
}; 