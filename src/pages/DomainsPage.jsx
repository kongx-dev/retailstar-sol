import React, { useState, useEffect } from 'react';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import Timer from '../components/Timer';
import { rotateListings } from '../utils/rotation';
import domainData from '../data/domains.json';

// Import domain images
import jpegdealerImage from '../assets/jpegdealer.png';
import fudscientistImage from '../assets/fudscientist.png';
import jumpsetradioImage from '../assets/jumpsetradio.png';
import copevendorImage from '../assets/copevendor.png';
import lurkerlifeImage from '../assets/lurkerlife.png';
import commandhubImage from '../assets/commandhub.png';
import deploydeckImage from '../assets/deploydeck.png';
import rigbuilderImage from '../assets/rigbuilder.png';
import bidgremlinImage from '../assets/bidgremlin.png';

const PremiumInquiryForm = ({ domain, closeModal }) => {
  const [formData, setFormData] = useState({ name: '', discord: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ domain, ...formData });
    closeModal();
    alert('Thanks! We\'ll reach out via Discord.');
  };

  return (
    <div className="bg-black/90 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-xl font-bold solana-gradient mb-4">Request to Buy: {domain}</h3>
        
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          onChange={handleChange} 
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none" 
          required 
        />
        
        <input 
          type="text" 
          name="discord" 
          placeholder="Discord (e.g., user#0000)" 
          onChange={handleChange} 
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none" 
          required 
        />
        
        <textarea 
          name="message" 
          placeholder="Your message" 
          onChange={handleChange} 
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
  );
};

const DomainCard = ({ domain, openModal }) => {
  const getDomainImage = (domainName) => {
    switch (domainName) {
      case "jpegdealer.sol":
        return <img src={jpegdealerImage} alt="jpegdealer.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "fudscience.sol":
        return <img src={fudscientistImage} alt="fudscience.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "jumpsetradio.sol":
        return <img src={jumpsetradioImage} alt="jumpsetradio.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "copevendor.sol":
        return <img src={copevendorImage} alt="copevendor.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "lurkerlife.sol":
        return <img src={lurkerlifeImage} alt="lurkerlife.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "commandhub.sol":
        return <img src={commandhubImage} alt="commandhub.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "deploydeck.sol":
        return <img src={deploydeckImage} alt="deploydeck.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "rigbuilder.sol":
        return <img src={rigbuilderImage} alt="rigbuilder.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "bidgremlin.sol":
        return <img src={bidgremlinImage} alt="bidgremlin.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      default:
        return <div className="text-3xl sm:text-4xl text-center">{domain.image || "🌐"}</div>;
    }
  };

  return (
    <div className="steel-surface card-hover-glow rounded-lg p-4 sm:p-6 transition-all duration-300 group w-full max-w-sm mx-auto">
      <div className="text-center mb-4">
        {getDomainImage(domain.name)}
      </div>
      
      <h3 className="text-base sm:text-lg font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
        <a 
          href={`/domains/${domain.name.replace('.sol', '')}`}
          className="hover:underline"
        >
          {domain.name}
        </a>
      </h3>
      
      <div className="flex justify-center mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white glow-blue">
          For Sale
        </span>
      </div>
      
      <div className="text-center mb-4">
        <span className="text-base sm:text-lg font-bold flicker-solana solana-gradient">
          {domain.price}
        </span>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-xs text-gray-400 leading-relaxed">
          {domain.description}
        </p>
      </div>
      
      <div className="flex justify-center">
        {domain.sns ? (
          <a 
            href={domain.sns}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-cyan neon-cyan-hover text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
          >
            🛒 Buy Now
          </a>
        ) : (
          <button 
            onClick={() => openModal(domain.name)} 
            className="neon-cyan neon-cyan-hover text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
          >
            DM to Buy
          </button>
        )}
      </div>
    </div>
  );
};

const DomainsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  
  const openModal = (name) => { 
    setSelectedDomain(name); 
    setModalOpen(true); 
  };
  
  const closeModal = () => setModalOpen(false);

  // Rotate listings for fresh content
  const premium = rotateListings(domainData.premium);
  const mid = rotateListings(domainData.mid);
  const quickSnags = rotateListings(domainData.quickSnags);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Background image at 50% opacity */}
      <img 
        src={retailstarBody} 
        alt="RetailStar Background" 
        className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Main content (z-10) */}
      <div className="relative z-10">
        {/* Header */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img 
                  src={rsLogo} 
                  alt="RetailStar Logo" 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-lg shadow-2xl shadow-blue-500/20 border border-blue-500/30 flicker-solana"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-400/20 rounded-lg"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
              Domain Inventory
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              Every .sol is a node in the Retailverse. Take one. Deploy your own.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="/vault"
                className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
              >
                Browse Full Vault →
              </a>
            </div>
          </div>
        </section>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
              <PremiumInquiryForm domain={selectedDomain} closeModal={closeModal} />
            </div>
          </div>
        )}

        {/* Flash Sales Banner */}
        <div className="px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-400 to-pink-500 p-6 rounded-lg text-black text-center shadow-lg border-2 border-yellow-300">
              <p className="text-lg font-bold mb-2">🔥 Looking for today's time-sensitive Flash Sales?</p>
              <a 
                href="/" 
                className="underline hover:text-white transition-colors duration-200 font-semibold text-lg"
              >
                Return to Mall Homepage →
              </a>
            </div>
          </div>
        </div>

        {/* Domain Sections */}
        <div className="px-4 pb-20">
          <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
            
            {/* Vaulted Drops */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 💎 Vaulted Drops <span className="text-pink-400">]</span>
              </h2>
              <Timer label="Rotation ends in" time={7 * 86400} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {premium.map((domain, domainIndex) => (
                  <DomainCard key={domainIndex} domain={domain} openModal={openModal} />
                ))}
              </div>
            </section>

            {/* Shelf Stocked */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> 🧱 Shelf Stocked <span className="text-pink-400">]</span>
              </h2>
              <Timer label="Rotation ends in" time={7 * 86400} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {mid.map((domain, domainIndex) => (
                  <DomainCard key={domainIndex} domain={domain} openModal={openModal} />
                ))}
              </div>
            </section>

            {/* Quick Snags */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center solana-gradient flicker-solana">
                <span className="text-pink-400">[</span> ⚡ Quick Snags <span className="text-pink-400">]</span>
              </h2>
              <Timer label="24h Deal ends in" time={24 * 3600} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center max-w-6xl mx-auto">
                {quickSnags.map((domain, domainIndex) => (
                  <DomainCard key={domainIndex} domain={domain} openModal={openModal} />
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed glow-blue">
                RetailStar is a broadcast from Solana's underlayer — every domain is a node waiting to go live.
              </p>
            </div>
            
            <div className="flex justify-center space-x-8 text-sm mb-6">
              <a 
                href="https://github.com/KongX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://twitter.com/KongX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://twitter.com/messages/compose?recipient_id=KongX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="solana-gradient flicker-solana hover:glow-blue transition-colors"
              >
                Contact
              </a>
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

export default DomainsPage; 