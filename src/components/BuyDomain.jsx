import React, { useState, useEffect } from 'react';

const BuyDomain = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSent, setPaymentSent] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [usdPrice, setUsdPrice] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [transactionSignature, setTransactionSignature] = useState('');
  const [error, setError] = useState('');

  // Domain details
  const domainName = 'nodehunter.sol';
  const priceInSOL = 1.25;

  // Fetch SOL price in USD
  useEffect(() => {
    const fetchSOLPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        setUsdPrice(data.solana.usd);
      } catch (error) {
        console.error('Error fetching SOL price:', error);
        // Fallback price
        setUsdPrice(100);
      }
    };

    fetchSOLPrice();
  }, []);

  const handleConnectWallet = () => {
    setWalletConnected(true);
    setError('');
  };

  const handleBuyNow = async () => {
    if (!walletConnected) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock transaction signature
      const mockSignature = '5J7X' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setTransactionSignature(mockSignature);
      
      setPaymentSent(true);
      
      // Simulate payment confirmation delay
      setTimeout(() => {
        setPaymentConfirmed(true);
        setLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Transaction error:', error);
      setError('Transaction failed. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmitRecipient = () => {
    if (!recipientAddress.trim()) {
      setError('Please enter a recipient address');
      return;
    }
    
    // Here you would typically send this data to your backend
    console.log('Recipient Address:', recipientAddress);
    console.log('Contact Info:', contactInfo);
    
    // Show success message
    setPaymentConfirmed(false);
    setPaymentSent(false);
    setRecipientAddress('');
    setContactInfo('');
    setTransactionSignature('');
    setError('');
    
    alert('Payment received. We\'ll transfer the domain shortly.');
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
            <span className="text-pink-400">[</span> Domain Purchase <span className="text-pink-400">]</span>
          </h1>
          <p className="text-xl text-gray-300 flicker max-w-2xl mx-auto leading-relaxed glow-blue">
            Secure your node in the Retailverse. Connect wallet. Pay SOL. Claim domain.
          </p>
        </div>

        {/* Product Card */}
        <div className="steel-surface rounded-lg p-8 border border-blue-500/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Domain Info */}
            <div>
              <div className="text-6xl text-center mb-6">🎯</div>
              <h2 className="text-3xl font-bold solana-gradient mb-4 text-center">
                {domainName}
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Premium domain in the Retailverse network
              </p>
              
              {/* Price Display */}
              <div className="text-center">
                <div className="text-4xl font-bold flicker-solana solana-gradient mb-2">
                  {priceInSOL} SOL
                </div>
                {usdPrice && (
                  <div className="text-lg text-gray-400">
                    ≈ ${(priceInSOL * usdPrice).toFixed(2)} USD
                  </div>
                )}
              </div>
            </div>

            {/* Purchase Flow */}
            <div className="space-y-6">
              {/* Wallet Connection */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 solana-gradient">Connect Wallet</h3>
                {!walletConnected ? (
                  <button
                    onClick={handleConnectWallet}
                    className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
                  >
                    🔗 Connect Wallet (Demo)
                  </button>
                ) : (
                  <div>
                    <p className="text-cyan-400 font-semibold mb-2">✅ Wallet Connected</p>
                    <p className="text-sm text-gray-400">
                      Demo Mode: Phantom Wallet
                    </p>
                  </div>
                )}
              </div>

              {/* Buy Button */}
              {walletConnected && !paymentSent && (
                <div className="text-center">
                  <button
                    onClick={handleBuyNow}
                    disabled={loading}
                    className="neon-cyan neon-cyan-hover py-4 px-8 rounded-lg font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2">⚡</span>
                        Processing...
                      </span>
                    ) : (
                      'Buy Now (Demo)'
                    )}
                  </button>
                </div>
              )}

              {/* Payment Status */}
              {paymentSent && !paymentConfirmed && (
                <div className="text-center">
                  <div className="text-2xl mb-2">⏳</div>
                  <p className="text-cyan-400 font-semibold">Payment Processing...</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Transaction: {transactionSignature.slice(0, 8)}...{transactionSignature.slice(-8)}
                  </p>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="text-center">
                  <p className="text-red-400 font-semibold">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recipient Form */}
        {paymentConfirmed && (
          <div className="steel-surface rounded-lg p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold solana-gradient mb-6 text-center">
              🎉 Payment Confirmed!
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-cyan-400">
                  Recipient Wallet Address
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter the wallet address to receive the domain"
                  className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-cyan-400">
                  Contact Info (Optional)
                </label>
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Email or Telegram for follow-up"
                  className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmitRecipient}
                  className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
                >
                  Submit & Complete Purchase
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Demo Mode - This is a simulation of the purchase flow
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Real implementation would connect to Phantom, Solflare, or Backpack wallets
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyDomain; 