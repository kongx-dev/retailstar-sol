import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGOATAgent } from '../hooks/useGOATAgent';
import SEOHead from '../components/SEOHead';
// @ts-ignore: PNG import for Vite
import threeStoryView from '../assets/3storyview.png';

// TODO: Replace with real domain data fetching
const mockDomainData = {
  name: 'lowballking.sol',
  priceSol: 0.5,
  metadata: {
    description: 'The official lowballking.sol domain NFT',
    // ...other metadata fields
  },
};

const CheckoutOptions = ({ onRecipientSelected }: { onRecipientSelected: (recipient: string) => void }) => {
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const handleEmailSubmit = () => {
    if (!email.includes('@')) return alert('Enter a valid email');
    setSelected('email');
    onRecipientSelected(email);
  };

  return (
    <div className="flex flex-col gap-3 mt-6">
      <p className="text-lg font-medium">Choose checkout method:</p>

      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleEmailSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Use Email Wallet
        </button>
      </div>

      {selected && (
        <p className="text-green-600">
          Checkout via: <strong>{email}</strong>
        </p>
      )}
    </div>
  );
};

function CheckoutPage() {
  const { slug } = useParams<{ slug: string }>();
  const [recipient, setRecipient] = useState<string | null>(null);
  const [receiptEmail, setReceiptEmail] = useState('');
  const [receiptSent, setReceiptSent] = useState(false);
  const {
    loading,
    error,
    success,
    mintAndTransferNFT,
  } = useGOATAgent();

  // TODO: Fetch domain data by slug
  const domain = mockDomainData;

  const submitReceiptEmail = async () => {
    if (!receiptEmail.includes('@')) return alert('Enter a valid email');

    await fetch('https://hook.us1.make.com/YOUR_SECONDARY_RECEIPT_WEBHOOK', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: slug,
        recipient,
        email: receiptEmail,
        timestamp: new Date().toISOString(),
      }),
    });

    setReceiptSent(true);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SEOHead 
        target="retailstar.sol"
        pageType="checkout"
        customTitle={`Checkout ${slug}.sol | Retailstar Domain Purchase`}
        customDescription={`Complete your purchase of ${slug}.sol domain. Secure checkout with Phantom wallet or email.`}
        customKeywords={`${slug}.sol, domain purchase, checkout, solana domain, retailstar`}
        imageUrl="https://retailstar.xyz/assets/rs-og-card.png"
        canonicalUrl={`https://retailstar.sol/checkout/${slug}`}
        ogImage="https://retailstar.xyz/assets/rs-og-card.png"
        twitterImage="https://retailstar.xyz/assets/rs-og-card.png"
      />
      
      {/* Background image */}
      <img 
        src={threeStoryView} 
        alt="3 Story View Background" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />
      
      {/* Main content */}
      <div className="relative z-10">
        <div style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
          <h1>Checkout</h1>
          <h2>{domain.name}</h2>
          
          {/* Domain Preview Placeholder */}
          <div 
            style={{ 
              width: '100%', 
              height: 200, 
              borderRadius: 12, 
              marginBottom: 16,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '24px',
              fontWeight: 'bold',
              border: '2px solid #475569'
            }}
          >
            {domain.name}
          </div>
          
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
            Price: {domain.priceSol} SOL
          </div>
          {/* TODO: Show upgraded PNG preview if available */}

          {/* Checkout Options Panel */}
          <div 
            style={{
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(71, 85, 105, 0.5)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <CheckoutOptions onRecipientSelected={setRecipient} />
          </div>

          <button
            disabled={!recipient}
            onClick={() =>
              mintAndTransferNFT({
                domainSlug: slug!,
                recipientEmailOrWallet: recipient!,
              })
            }
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Buy & Mint'}
          </button>

          {success && <p className="text-green-500 mt-2">Success! NFT sent to {recipient}</p>}
          {error && <p className="text-red-500 mt-2">Error: {error}</p>}

          {success && (
            <div className="mt-6">
              <p className="text-lg font-medium mb-2">Want a receipt or future updates?</p>
              <input
                type="email"
                placeholder="Enter your email"
                value={receiptEmail}
                onChange={(e) => setReceiptEmail(e.target.value)}
                className="border p-2 rounded w-full max-w-md"
              />
              <button
                onClick={submitReceiptEmail}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Get Receipt
              </button>
              {receiptSent && <p className="text-green-500 mt-2">✅ Receipt will be sent!</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage; 