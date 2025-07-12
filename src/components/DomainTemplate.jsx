import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import BuyDomain from './BuyDomain';

const DomainTemplate = ({ domain, lore = null }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  // Default lore if none provided
  const defaultLore = {
    slogan: "A node in the Retailverse waiting to be deployed.",
    meta: "Ready for your vision and creativity.",
    desc: "This domain is part of the Retailstar ecosystem, ready to be transformed into something amazing.",
    inspiration: "The possibilities are endless in the digital frontier.",
    tone: "cyberpunk-meets-utility",
    stack: ["React", "Vite", "Tailwind", "Solana"],
    stats: {
      memeReadiness: "8/10",
      marketUsage: "Custom deployment",
      builtWith: "React + Vite",
      snsIndexed: true,
      walletConnect: true,
      editableInCursor: true
    }
  };

  const domainLore = lore || defaultLore;

  const getDomainEmoji = (name) => {
    if (name.includes('jpeg')) return '🖼️';
    if (name.includes('fud')) return '🧪';
    if (name.includes('jump')) return '🎮';
    if (name.includes('pistola')) return '🔫';
    if (name.includes('ghost')) return '👻';
    if (name.includes('ninja')) return '🥷';
    if (name.includes('sniper')) return '🎯';
    if (name.includes('battle')) return '⚔️';
    if (name.includes('raid')) return '⚔️';
    if (name.includes('command')) return '🔧';
    if (name.includes('deploy')) return '🚀';
    if (name.includes('control')) return '🎮';
    if (name.includes('config')) return '⚙️';
    if (name.includes('node')) return '🔗';
    if (name.includes('signal')) return '📡';
    if (name.includes('ping')) return '📡';
    if (name.includes('upload')) return '📤';
    if (name.includes('scroll')) return '📜';
    if (name.includes('mind')) return '🧠';
    if (name.includes('brain')) return '🧠';
    if (name.includes('alpha')) return '📊';
    if (name.includes('track')) return '📊';
    if (name.includes('stalker')) return '🕵️';
    if (name.includes('marksman')) return '🎯';
    if (name.includes('aim')) return '🎯';
    if (name.includes('hoodie')) return '🧥';
    if (name.includes('drip')) return '💧';
    if (name.includes('clout')) return '🌾';
    if (name.includes('bag')) return '💼';
    if (name.includes('cope')) return '💊';
    if (name.includes('lurker')) return '👁️';
    if (name.includes('lounge')) return '🛋️';
    if (name.includes('night')) return '🌙';
    if (name.includes('midnight')) return '🌃';
    if (name.includes('late')) return '🌙';
    if (name.includes('after')) return '🌙';
    if (name.includes('nocturnal')) return '🌙';
    if (name.includes('dojo')) return '🏯';
    if (name.includes('maiden')) return '💔';
    if (name.includes('mall')) return '🏬';
    if (name.includes('retail')) return '🏢';
    if (name.includes('kombat')) return '🥊';
    if (name.includes('battle')) return '⚔️';
    if (name.includes('raid')) return '⚔️';
    if (name.includes('dread')) return '😱';
    if (name.includes('exit')) return '🚪';
    if (name.includes('grind')) return '⚙️';
    if (name.includes('hustle')) return '💪';
    if (name.includes('unrelenting')) return '💪';
    if (name.includes('hold')) return '🛡️';
    if (name.includes('inpregneable')) return '🛡️';
    if (name.includes('noaura')) return '✨';
    if (name.includes('remixed')) return '🎵';
    if (name.includes('sk8')) return '🛹';
    if (name.includes('image')) return '🎨';
    if (name.includes('imaginacion')) return '💭';
    if (name.includes('scroll')) return '📜';
    if (name.includes('pay')) return '💰';
    if (name.includes('karma')) return '☯️';
    if (name.includes('gone')) return '💨';
    if (name.includes('johnny')) return '🤘';
    if (name.includes('silver')) return '🤘';
    if (name.includes('loot')) return '💀';
    if (name.includes('sauce')) return '🍝';
    if (name.includes('skill')) return '🤷';
    if (name.includes('notalpha')) return '🚫';
    if (name.includes('fud')) return '😰';
    if (name.includes('rekt')) return '💥';
    if (name.includes('truth')) return '⚡';
    if (name.includes('smooth')) return '🧠';
    if (name.includes('biggest')) return '🧠';
    if (name.includes('click')) return '🚀';
    if (name.includes('pump')) return '🚀';
    if (name.includes('code')) return '💻';
    if (name.includes('dev')) return '💻';
    if (name.includes('coder')) return '💻';
    if (name.includes('terminal')) return '💻';
    if (name.includes('portal')) return '🚪';
    if (name.includes('vault')) return '🗄️';
    if (name.includes('center')) return '🏢';
    if (name.includes('hub')) return '🏢';
    if (name.includes('station')) return '📡';
    if (name.includes('dock')) return '⚓';
    if (name.includes('quest')) return '🏯';
    if (name.includes('protocol')) return '⚙️';
    if (name.includes('finder')) return '🔍';
    if (name.includes('hunter')) return '🏹';
    if (name.includes('vendor')) return '💊';
    if (name.includes('dealer')) return '🖼️';
    if (name.includes('provider')) return '💧';
    if (name.includes('runner')) return '🏃';
    if (name.includes('builder')) return '⚡';
    if (name.includes('gremlin')) return '👹';
    if (name.includes('guru')) return '🎯';
    if (name.includes('cultist')) return '💼';
    if (name.includes('fund')) return '💎';
    if (name.includes('gorilla')) return '🦍';
    if (name.includes('flow')) return '🧠';
    if (name.includes('empty')) return '🤯';
    if (name.includes('line')) return '🛡️';
    if (name.includes('verse')) return '🌌';
    if (name.includes('craft')) return '🎨';
    if (name.includes('culture')) return '🛹';
    if (name.includes('control')) return '🎛️';
    if (name.includes('mage')) return '📜';
    if (name.includes('locked')) return '🔒';
    if (name.includes('node')) return '🔗';
    if (name.includes('uplink')) return '🔗';
    if (name.includes('upload')) return '📤';
    if (name.includes('guy')) return '😎';
    if (name.includes('kid')) return '📈';
    if (name.includes('ez')) return '🏆';
    if (name.includes('gg')) return '🏆';
    if (name.includes('shift')) return '👻';
    if (name.includes('chain')) return '🥷';
    if (name.includes('never')) return '👤';
    if (name.includes('moment')) return '⚡';
    if (name.includes('stay')) return '😰';
    if (name.includes('td')) return '💼';
    if (name.includes('aint')) return '❌';
    if (name.includes('ur')) return '😎';
    if (name.includes('not')) return '😎';
    return '💎';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-600 text-white glow-blue";
      case "sold":
        return "bg-red-600 text-white";
      case "coming-soon":
        return "bg-yellow-600 text-black glow-purple";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "premium":
        return "text-purple-400";
      case "mid":
        return "text-blue-400";
      case "quick":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
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
                onClick={() => navigate('/domains')}
                className="neon-cyan neon-cyan-hover py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                ← Back to Domains
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
            
            {/* Featured Banner */}
            {domain.featured && (
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
                <p className="text-purple-400 text-center font-semibold">
                  ⭐ FEATURED DOMAIN ⭐
                </p>
              </div>
            )}
            
            <div className="text-6xl mb-6">
              {getDomainEmoji(domain.name)}
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 neon-pulse solana-gradient flicker-solana">
              {domain.name}.sol
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              {domainLore.slogan}
            </p>
            
            {/* Status Badge */}
            <div className="flex justify-center mb-8">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(domain.status)}`}>
                {domain.status.toUpperCase()}
              </span>
            </div>

            {/* Price and Category */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <span className="text-2xl font-bold text-green-400">
                {domain.price}
              </span>
              <span className={`text-sm font-semibold ${getCategoryColor(domain.category)}`}>
                {domain.category.toUpperCase()}
              </span>
            </div>
          </div>
        </section>

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
                    {domainLore.meta}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Inspiration</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {domainLore.inspiration}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Tone</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {domainLore.tone}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Description</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {domainLore.desc}
                  </p>
                  
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {domainLore.stack.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-sm text-blue-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Stats */}
            <section className="steel-surface rounded-lg p-8 border border-blue-500/30">
              <h2 className="text-3xl font-bold mb-6 solana-gradient">
                <span className="text-pink-400">[</span> Stats <span className="text-pink-400">]</span>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {Object.entries(domainLore.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-lg font-bold text-cyan-400">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: CTA */}
            <section className="steel-surface rounded-lg p-8 border border-blue-500/30 text-center">
              <h2 className="text-3xl font-bold mb-6 solana-gradient">
                <span className="text-pink-400">[</span> Ready to Deploy? <span className="text-pink-400">]</span>
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                This domain is ready for your vision. Deploy your own node in the Retailverse.
              </p>
              
              <button 
                onClick={() => setModalOpen(true)}
                className="neon-cyan neon-cyan-hover py-4 px-8 rounded-lg font-semibold transition-all duration-200 text-lg"
              >
                Buy {domain.name}.sol
              </button>
            </section>
          </div>
        </div>

        {/* Buy Domain Modal */}
        {modalOpen && (
          <BuyDomain 
            domain={domain} 
            onClose={() => setModalOpen(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default DomainTemplate; 