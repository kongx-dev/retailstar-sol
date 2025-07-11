import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { domainLore } from '../data/domains';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import jpegdealerImage from '../assets/jpegdealer.png';

const DomainPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', discord: '', message: '' });

  const domain = domainLore[slug];

  // Check if domain is in active rotation
  const activeDomains = [
    "jpegdealer.sol", "fudscience.sol", "jumpsetradio.sol", // Vaulted Drops
    "copevendor.sol", "lurkerlife.sol", "commandhub.sol", // Shelf Stocked  
    "rigbuilder.sol", "bidgremlin.sol", "deploydeck.sol" // Quick Snags
  ];
  
  const isInActiveRotation = activeDomains.includes(domain?.name);

  if (!domain) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden">
        <img 
          src={retailstarBody} 
          alt="RetailStar Background" 
          className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
          aria-hidden="true"
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Domain Not Found</h1>
            <p className="text-gray-300 mb-8">This domain doesn't exist in our vault.</p>
            <button 
              onClick={() => navigate('/domains')}
              className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              Back to Domains
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ domain: domain.name, ...formData });
    setModalOpen(false);
    alert('Thanks! We\'ll reach out via Discord.');
  };

  const getDomainEmoji = (name) => {
    if (name.includes('jpeg')) return '🖼️';
    if (name.includes('fud')) return '🧪';
    if (name.includes('yape')) return '💬';
    if (name.includes('jump')) return '🎮';
    if (name.includes('pistola')) return '🔫';
    return '💎';
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background image */}
      <img 
        src={retailstarBody} 
        alt="RetailStar Background" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Back Button */}
            <div className="flex justify-start mb-8">
              <button 
                onClick={() => navigate('/')}
                className="neon-cyan neon-cyan-hover py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                ← Back to Home
              </button>
            </div>
            
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img 
                  src={rsLogo} 
                  alt="RetailStar Logo" 
                  className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg shadow-2xl shadow-blue-500/20 border border-blue-500/30 flicker-solana"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-400/20 rounded-lg"></div>
              </div>
            </div>
            
            <div className="text-6xl mb-6">
              {domain.name === "jpegdealer.sol" ? (
                <img 
                  src={jpegdealerImage} 
                  alt="jpegdealer.sol" 
                  className="w-24 h-24 mx-auto rounded-lg object-cover border border-blue-500/30"
                />
              ) : (
                getDomainEmoji(domain.name)
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 neon-pulse solana-gradient flicker-solana">
              {domain.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              {domain.slogan}
            </p>
            
            {!isInActiveRotation && (
              <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
                <p className="text-yellow-400 text-center font-semibold">
                  🔒 This domain is currently not in the active Vault rotation. Request access to unlock.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <div className="bg-black/90 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold solana-gradient mb-4">Request to Buy: {domain.name}</h3>
                  
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none" 
                    required 
                  />
                  
                  <input 
                    type="text" 
                    name="discord" 
                    placeholder="Discord (e.g., user#0000)" 
                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })} 
                    className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none" 
                    required 
                  />
                  
                  <textarea 
                    name="message" 
                    placeholder="Your message" 
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                    className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none" 
                    rows={3} 
                    required 
                  />
                  
                  <button 
                    type="submit" 
                    className="w-full neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-4 pb-20">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Section 1: The Meta */}
            <section className="steel-surface rounded-lg p-8 border border-blue-500/30">
              <h2 className="text-3xl font-bold mb-6 solana-gradient">
                <span className="text-pink-400">[</span> The Meta <span className="text-pink-400">]</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Summary</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {domain.meta}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Inspiration</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {domain.inspiration}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Tone</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {domain.tone}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Meme Readiness:</span>
                      <span className="text-green-400 font-bold">{domain.stats.memeReadiness}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Usage:</span>
                      <span className="text-blue-400">{domain.stats.marketUsage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Built With:</span>
                      <span className="text-purple-400">{domain.stats.builtWith}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">SNS Indexed:</span>
                      <span className={domain.stats.snsIndexed ? "text-green-400" : "text-red-400"}>
                        {domain.stats.snsIndexed ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Wallet Connect:</span>
                      <span className={domain.stats.walletConnect ? "text-green-400" : "text-red-400"}>
                        {domain.stats.walletConnect ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Editable in Cursor:</span>
                      <span className={domain.stats.editableInCursor ? "text-green-400" : "text-red-400"}>
                        {domain.stats.editableInCursor ? "✓" : "✗"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Lore */}
            <section className="steel-surface rounded-lg p-8 border border-blue-500/30">
              <h2 className="text-3xl font-bold mb-6 solana-gradient">
                <span className="text-pink-400">[</span> Lore <span className="text-pink-400">]</span>
              </h2>
              
              <div className="bg-black/40 rounded-lg p-6 border border-gray-700">
                <p className="text-lg text-gray-300 leading-relaxed glow-blue">
                  {domain.desc}
                </p>
              </div>
            </section>

            {/* Section 3: Template Preview */}
            <section className="steel-surface rounded-lg p-8 border border-blue-500/30">
              <h2 className="text-3xl font-bold mb-6 solana-gradient">
                <span className="text-pink-400">[</span> Template Preview <span className="text-pink-400">]</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                    <div className="w-full h-64 bg-gray-700 rounded flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p>Preview Image</p>
                        <p className="text-sm text-gray-400">Screenshot mockup</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <a 
                      href={domain.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 inline-block w-full text-center"
                    >
                      🚀 Launch Live Site →
                    </a>
                    
                    <button 
                      onClick={() => setModalOpen(true)}
                      className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 w-full"
                    >
                      💬 Request to Buy
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {domain.stack.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm text-blue-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="bg-black/40 rounded-lg p-4 border border-gray-700">
                    <h4 className="font-semibold mb-2 text-green-400">Price: {domain.price}</h4>
                    <p className="text-sm text-gray-400">Status: {domain.status}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center space-x-8 text-sm mb-6">
              <button 
                onClick={() => navigate('/domains')}
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                ← Back to Domains
              </button>
              <a 
                href="/" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Home
              </a>
              <a 
                href="/merch" 
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Merch
              </a>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>© 2024 retailstar.sol - Nodes in the Retailverse</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DomainPage; 