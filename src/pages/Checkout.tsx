import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGOATAgent } from '../hooks/useGOATAgent';
import { useWallet } from '@solana/wallet-adapter-react';

// TODO: Replace with real domain data fetching
const mockDomainData = {
  name: 'lowballking.sol',
  priceSol: 0.5,
  imageUrl: '/assets/lowballking.png', // TODO: dynamic path
  metadata: {
    description: 'The official lowballking.sol domain NFT',
    // ...other metadata fields
  },
};

const CheckoutOptions = ({ onRecipientSelected }: { onRecipientSelected: (recipient: string) => void }) => {
  const { publicKey, connect, connected } = useWallet();
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (connected && publicKey) {
      onRecipientSelected(publicKey.toBase58());
    }
  }, [connected, publicKey]);

  const handleEmailSubmit = () => {
    if (!email.includes('@')) return alert('Enter a valid email');
    setSelected('email');
    onRecipientSelected(email);
  };

  return (
    <div className="flex flex-col gap-3 mt-6">
      <p className="text-lg font-medium">Choose checkout method:</p>

      {!connected && (
        <button
          onClick={() => {
            setSelected('phantom');
            connect();
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Connect Phantom Wallet
        </button>
      )}

      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Or enter your email"
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
          Checkout via: <strong>{selected === 'phantom' ? 'Phantom Wallet' : email}</strong>
        </p>
      )}
    </div>
  );
};

function CheckoutPage() {
  const { slug } = useParams<{ slug: string }>();
  const [recipient, setRecipient] = useState(null);
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
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      <h1>Checkout</h1>
      <h2>{domain.name}</h2>
      <img
        src={domain.imageUrl}
        alt={domain.name}
        style={{ width: '100%', borderRadius: 12, marginBottom: 16 }}
      />
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
        Price: {domain.priceSol} SOL
      </div>
      {/* TODO: Show upgraded PNG preview if available */}

      <CheckoutOptions onRecipientSelected={setRecipient} />

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
  );
}

export default CheckoutPage; 