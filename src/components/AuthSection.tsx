import React, { useState, useEffect } from 'react';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { linkAuthToWallet } from '../lib/supabase';
import phantomIcon from '../assets/phantom-icon.png';
import googleLogo from '../assets/google-logo-icon.png';
import xIcon from '../assets/x-icon.png';
import discordIcon from '../assets/discord-icon-blue-discord-logo.jpg';

export default function AuthSection() {
  console.log('🟡 AuthSection component rendering...');
  const supabase = useSupabaseClient();
  const sessionData = useSession();
  const { session, loading: sessionLoading } = sessionData || { session: null, loading: false };
  const { publicKey, connect, disconnect, connecting, select, wallets, wallet } = useWallet();
  const [authLoading, setAuthLoading] = useState<string | null>(null);
  
  console.log('🟡 AuthSection state:', { 
    hasSupabase: !!supabase, 
    hasSession: !!session, 
    hasPublicKey: !!publicKey,
    walletsCount: wallets?.length || 0,
    connecting 
  });

  // Debug: Check if button exists in DOM after render
  useEffect(() => {
    const buttons = document.querySelectorAll('button');
    const connectButtons = Array.from(buttons).filter(btn => 
      btn.textContent?.includes('Connect') || btn.textContent?.includes('Phantom')
    );
    console.log('🔍 Found connect buttons in DOM:', connectButtons.length);
    connectButtons.forEach((btn, idx) => {
      const computedStyle = window.getComputedStyle(btn);
      console.log(`🔍 Button ${idx}:`, {
        text: btn.textContent?.trim(),
        disabled: btn.disabled,
        visible: btn.offsetParent !== null,
        zIndex: computedStyle.zIndex,
        pointerEvents: computedStyle.pointerEvents,
        position: computedStyle.position,
        hasOnClick: btn.onclick !== null,
        className: btn.className,
        id: btn.id,
        parentElement: btn.parentElement?.tagName
      });
      
      // Try to manually attach click listener for testing
      if (btn.textContent?.includes('Phantom') || (btn.textContent?.includes('Connect Wallet') && !btn.textContent?.includes('Connect Now'))) {
        const testClick = (e: Event) => {
          console.log('🧪 TEST CLICK HANDLER FIRED on button:', btn.textContent?.trim());
          console.log('🧪 Button element:', btn);
          // Try to trigger the React handler manually
          if (btn.id === 'wallet-connect-button') {
            console.log('🧪 This is the wallet connect button! Calling handleWalletConnect directly...');
            // Don't prevent default - let React handle it
            // But also call the handler directly as backup
            handleWalletConnect();
          }
        };
        // Use capture: false so React's handler fires first, then our test handler
        btn.addEventListener('click', testClick, { capture: false, once: false });
        console.log('🧪 Attached test click listener to button:', btn.textContent?.trim());
      }
      
      // Also check for button by ID
      const walletBtn = document.getElementById('wallet-connect-button');
      if (walletBtn) {
        console.log('✅ Found wallet-connect-button by ID!', {
          text: walletBtn.textContent?.trim(),
          hasOnClick: walletBtn.onclick !== null
        });
      } else {
        console.log('❌ wallet-connect-button NOT found by ID');
      }
    });
  });

  // Define handlers BEFORE early returns
  const handleWalletConnect = async () => {
    try {
      console.log('🔵 Button clicked! Available wallets:', wallets.map(w => ({ name: w.adapter.name, ready: w.readyState })));
      console.log('🔵 Current wallet:', wallet?.adapter.name);
      
      // If no wallet is selected, try to select Phantom first, then Solflare
      if (!wallet) {
        const phantomWallet = wallets.find(w => w.adapter.name === 'Phantom');
        const solflareWallet = wallets.find(w => w.adapter.name === 'Solflare');
        
        if (phantomWallet) {
          console.log('🔵 Selecting Phantom wallet...');
          select(phantomWallet.adapter.name);
        } else if (solflareWallet) {
          console.log('🔵 Selecting Solflare wallet...');
          select(solflareWallet.adapter.name);
        } else if (wallets.length > 0) {
          console.log('🔵 Selecting first available wallet:', wallets[0].adapter.name);
          select(wallets[0].adapter.name);
        } else {
          const message = 'No wallet extensions detected. Please install Phantom (https://phantom.app) or Solflare (https://solflare.com) wallet extension.';
          console.error('❌', message);
          alert(message);
          return;
        }
        
        // Wait for wallet to be ready
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      console.log('🔵 Attempting to connect wallet...');
      // Now connect
      await connect();
      console.log('✅ Wallet connected successfully!');
    } catch (error: any) {
      console.error('❌ Wallet connection error:', error);
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      console.error('❌ Error details:', { error, message: errorMessage });
      
      if (errorMessage.includes('User rejected') || errorMessage.includes('User cancelled')) {
        // User cancelled - don't show alert
        return;
      }
      
      alert(`Wallet connection failed: ${errorMessage}\n\nPlease make sure:\n1. You have Phantom or Solflare extension installed\n2. The extension is unlocked\n3. You approve the connection request`);
    }
  };

  const handleWalletDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Wallet disconnection error:', error);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'twitter' | 'discord') => {
    setAuthLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/outerring`,
          skipBrowserRedirect: false
        }
      });
      if (error) {
        console.error('Social login error:', error);
        alert(`Failed to sign in with ${provider}: ${error.message}`);
      }
    } catch (error: any) {
      console.error('Social login error:', error);
      alert(`Failed to sign in with ${provider}: ${error?.message || 'Unknown error'}`);
    } finally {
      setAuthLoading(null);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // If Supabase is not configured, only show wallet connection
  if (!supabase) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-cyan-300 mb-6">🔐 Authentication</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-zinc-300 mb-4">Solana Wallet</h3>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔴 BUTTON CLICKED - Direct onClick handler fired!');
                handleWalletConnect();
              }}
              disabled={connecting}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 w-full md:w-auto cursor-pointer"
              style={{ pointerEvents: 'auto', zIndex: 1000 }}
            >
              {connecting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <img src={phantomIcon} alt="Phantom" className="w-5 h-5" />
              )}
              Connect Wallet
            </button>
          </div>

          <div className="text-center">
            <p className="text-zinc-400 text-sm">
              Social login requires Supabase configuration
            </p>
          </div>
        </div>
      </div>
    );
  }


  // Show loading state - only if actually loading, not if sessionData is falsy
  if (sessionLoading) {
    console.log('🟠 AuthSection: Showing loading state');
    return (
      <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6 mb-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
          <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Link auth session to wallet when both are present
  useEffect(() => {
    if (session && publicKey) {
      const walletAddress = publicKey.toString();
      console.log('🔗 Linking auth session to wallet:', { provider: session.user.app_metadata?.provider, wallet: walletAddress });
      linkAuthToWallet(walletAddress, session);
    }
  }, [session, publicKey]);

  // Show session info if logged in
  if (session || publicKey) {
    console.log('🟢 AuthSection: Showing authenticated state', { hasSession: !!session, hasPublicKey: !!publicKey });
    return (
      <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-green-400 mb-4">✅ Authenticated</h2>
        
        <div className="space-y-4">
          {session && (
            <div className="bg-green-900/20 border border-green-500/30 rounded p-4">
              <h3 className="text-green-300 font-semibold mb-2">Social Login</h3>
              <p className="text-zinc-300 text-sm">
                Logged in as: {session.user.email}
              </p>
              <p className="text-zinc-400 text-xs">
                Provider: {session.user.app_metadata?.provider || 'Unknown'}
              </p>
            </div>
          )}
          
          {publicKey && (
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded p-4">
              <h3 className="text-cyan-300 font-semibold mb-2">Wallet Connected</h3>
              <p className="text-zinc-300 text-sm font-mono">
                {publicKey.toString().slice(0, 8)}...{publicKey.toString().slice(-8)}
              </p>
            </div>
          )}
          
          <div className="flex gap-3">
            {session && (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                Logout
              </button>
            )}
            {publicKey && (
              <button
                onClick={handleWalletDisconnect}
                className="bg-zinc-600 hover:bg-zinc-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
              >
                Disconnect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show login options if not authenticated
  console.log('🔵 AuthSection: Showing login options (not authenticated)');
  return (
    <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-cyan-300 mb-2">🧃 Sign in to earn Retail Tickets and unlock the mall</h2>
      <p className="text-zinc-400 text-sm mb-6">Wallet or socials accepted. Authentication is optional but recommended for earning rewards.</p>
      
      <div className="space-y-6">
        {/* Wallet Connection - First and Prominent */}
        <div id="wallet-connect-section">
          <button
            id="wallet-connect-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔴 BUTTON CLICKED - Direct onClick handler fired!');
              handleWalletConnect();
            }}
            disabled={connecting}
            className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 w-full cursor-pointer text-lg"
            style={{ pointerEvents: 'auto', zIndex: 1000, position: 'relative' }}
          >
            {connecting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <img src={phantomIcon} alt="Phantom" className="w-6 h-6" />
            )}
            Connect Wallet
          </button>
        </div>

        {/* Social Login Buttons - Below Wallet */}
        <div>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-zinc-900/50 text-zinc-400">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={authLoading === 'google'}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {authLoading === 'google' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <img src={googleLogo} alt="Google" className="w-5 h-5" />
              )}
              Google
            </button>
            
            <button
              onClick={() => handleSocialLogin('twitter')}
              disabled={authLoading === 'twitter'}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {authLoading === 'twitter' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <img src={xIcon} alt="X (Twitter)" className="w-5 h-5" />
              )}
              X (Twitter)
            </button>
            
            <button
              onClick={() => handleSocialLogin('discord')}
              disabled={authLoading === 'discord'}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {authLoading === 'discord' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <img src={discordIcon} alt="Discord" className="w-5 h-5 rounded" />
              )}
              Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
