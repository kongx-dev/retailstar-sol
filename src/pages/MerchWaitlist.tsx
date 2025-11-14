import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';

const MerchWaitlist = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔧 Replace with your actual form handling logic or API hook
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono px-6 py-12 relative">
      <SEOHead
        target="retailstar.sol"
        pageType="merch-waitlist"
        customTitle="CONFIDENTIAL: OPERATION THREADCOUNT | Retailstar.sol"
        customDescription="Declassified merch drop dossier. Only the first 25 are guaranteed. First 50 enter the archive."
        customKeywords="merch waitlist, hoodie drop, retailstar merch, confidential, threadcount ops"
        imageUrl="https://retailstar.sol/assets/rs-logo.png"
        canonicalUrl="https://retailstar.sol/merch-waitlist"
        ogImage="https://retailstar.sol/assets/rs-logo.png"
        twitterImage="https://retailstar.sol/assets/rs-logo.png"
      />
      
      {/* Header */}
      <div className="max-w-2xl mx-auto border-2 border-dashed border-green-500 p-8 rounded-lg bg-zinc-900 shadow-lg relative overflow-hidden">
        <div className="absolute top-4 left-4 text-xs text-green-400 uppercase tracking-widest opacity-70">
          RETAILSTAR ARCHIVES // MEMO 404-A
        </div>

        <h1 className="text-3xl font-bold text-green-400 mt-8 mb-2">[MERCH DROP DOSSIER] 🧥</h1>
        <h2 className="text-lg text-zinc-300 mb-6 italic">
          CLASSIFIED: THREADCOUNT OPS
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            <div>
              <label className="block mb-1 text-green-300">Solana Wallet Address</label>
              <input
                type="text"
                required
                className="w-full bg-zinc-800 border border-green-500 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-green-300">Email</label>
              <input
                type="email"
                required
                className="w-full bg-zinc-800 border border-green-500 px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-green-300">Preferred Size</label>
              <select className="w-full bg-zinc-800 border border-green-500 px-3 py-2 rounded">
                <option value="">Select</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>XXL</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-green-300">Meme you'd print on a hoodie (Optional)</label>
              <textarea
                className="w-full bg-zinc-800 border border-green-500 px-3 py-2 rounded"
                rows={2}
              />
            </div>
            <div>
              <label className="block mb-1 text-green-300">Are you a current domain holder?</label>
              <select className="w-full bg-zinc-800 border border-green-500 px-3 py-2 rounded">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-black px-5 py-2 rounded transition-all duration-200 mt-4"
            >
              🚀 Submit & Seal File
            </button>
          </form>
        ) : (
          <div className="text-green-400 text-lg">
            ✅ Classified file sealed. You're on the Threadcount Ops list.
            <p className="text-sm text-zinc-400 mt-2 italic">Expect… a secure ping. 🧥</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-zinc-700 text-sm text-zinc-500">
          🎟️ <span className="text-green-300">First 25:</span> Meme discount applied<br />
          🛡️ <span className="text-green-300">First 50:</span> Guaranteed WL<br />
          ⏳ <span className="text-green-300">50+:</span> Reviewed based on demand
        </div>

        <div className="text-xs text-zinc-600 italic mt-4">
          "Those who collect Solana domains… tend to look better in hoodies."
        </div>
      </div>
    </div>
  );
};

export default MerchWaitlist; 