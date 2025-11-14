import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { supabase } from './lib/supabase';
import { createFallbackSupabaseClient } from './lib/supabase-fallback';

// Configure wallet adapters
const network = WalletAdapterNetwork.Mainnet;
const endpoint = clusterApiUrl(network);

// Initialize wallet adapters
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          {supabase ? (
            <SessionContextProvider supabaseClient={supabase}>
              <App />
            </SessionContextProvider>
          ) : (
            <SessionContextProvider supabaseClient={createFallbackSupabaseClient()}>
              <App />
            </SessionContextProvider>
          )}
        </WalletProvider>
      </ConnectionProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
