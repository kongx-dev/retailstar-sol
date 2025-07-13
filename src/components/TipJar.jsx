import React, { useState } from 'react';

const TipJar = () => {
  const [copied, setCopied] = useState(false);
  const solanaAddress = 'paymyinterns.sol';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(solanaAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section className="px-4 py-16 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-black mb-8 text-center solana-gradient flicker-solana">
          <span className="text-pink-400">[</span> Tip the Mall Rats 🛒 <span className="text-pink-400">]</span>
        </h2>

        <div className="steel-surface rounded-lg p-8 border border-blue-500/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 solana-gradient">
              Solana Domain Address
            </h3>
            
            <div className="bg-black/40 rounded-lg p-6 mb-6 border border-gray-700 max-w-md mx-auto">
              <p className="text-2xl font-mono text-cyan-400 mb-3">
                {solanaAddress}
              </p>
              <p className="text-sm text-gray-400">
                Send SOL to support the Retailverse
              </p>
            </div>

            <button 
              onClick={handleCopy}
              className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center mx-auto"
            >
              {copied ? (
                <>
                  <span className="mr-2">✓</span>
                  Copied!
                </>
              ) : (
                <>
                  <span className="mr-2">📋</span>
                  Copy Address
                </>
              )}
            </button>
          </div>

          {/* Thank you message */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-center text-lg text-gray-300 leading-relaxed glow-blue">
              "Every tip keeps the Retailverse alive. From the neon-lit corridors of Solana's underlayer, 
              we salute you, fellow mall rat. Your SOL fuels the next deployment. 🚀"
            </p>
            <p className="text-center text-sm text-gray-500 mt-4">
              — The RetailStar Collective
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipJar; 