import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import domainsData from '../data/domains.json';

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

const DomainCard = ({ domain }) => {
  const getDomainImage = (domainName) => {
    switch (domainName) {
      case "jpegdealer":
        return <img src={jpegdealerImage} alt="jpegdealer.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "fudscience":
        return <img src={fudscientistImage} alt="fudscience.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "jumpsetradio":
        return <img src={jumpsetradioImage} alt="jumpsetradio.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "copevendor":
        return <img src={copevendorImage} alt="copevendor.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "lurkerlife":
        return <img src={lurkerlifeImage} alt="lurkerlife.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "commandhub":
        return <img src={commandhubImage} alt="commandhub.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "deploydeck":
        return <img src={deploydeckImage} alt="deploydeck.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "rigbuilder":
        return <img src={rigbuilderImage} alt="rigbuilder.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      case "bidgremlin":
        return <img src={bidgremlinImage} alt="bidgremlin.sol" className="w-16 h-16 mx-auto rounded-lg object-cover border border-blue-500/30" />;
      default:
        return <div className="text-3xl sm:text-4xl text-center">{domain.image}</div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-600 text-white glow-blue";
      case "sold":
        return "bg-red-600 text-white";
      case "coming-soon":
        return "bg-yellow-600 text-black glow-purple";
      case "not_for_sale":
        return "bg-gray-600 text-white";
      case "vaulted":
        return "bg-purple-600 text-white glow-purple";
      case "quick_snag":
        return "bg-orange-500 text-white glow-orange";
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
      case "flash":
        return "text-green-400";
      case "lore":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "premium":
        return "Premium Wing";
      case "mid":
        return "Mid Tier";
      case "flash":
        return "Flash Rack";
      case "lore":
        return "Lore Only";
      default:
        return category.toUpperCase();
    }
  };

  const getRotationInfo = (category) => {
    switch (category) {
      case "flash":
        return { interval: "24h", color: "text-green-400" };
      case "mid":
        return { interval: "72h", color: "text-blue-400" };
      case "premium":
        return { interval: "7d", color: "text-purple-400" };
      default:
        return { interval: "N/A", color: "text-gray-400" };
    }
  };

  const rotationInfo = getRotationInfo(domain.category);
  const isQuickSnag = domain.hasWebsite && domain.quickSnagPrice && domain.category === "mid" && ["rigbuilder", "bidgremlin", "deploydeck"].includes(domain.name);
  const displayStatus = isQuickSnag ? "quick_snag" : (domain.hasWebsite ? domain.status : "vaulted");
  const displayPrice = isQuickSnag ? domain.quickSnagPrice : (domain.hasWebsite ? domain.price : "N/A");

  return (
    <div className="steel-surface card-hover-glow rounded-lg p-4 sm:p-6 transition-all duration-300 group w-full max-w-sm mx-auto">
      <div className="text-center mb-4">
        {getDomainImage(domain.name)}
      </div>
      
      <h3 className="text-base sm:text-lg font-bold solana-gradient mb-3 group-hover:glow-blue transition-colors text-center">
        <Link 
          to={`/wiki/${domain.slug}`}
          className="hover:underline"
        >
          {domain.name}.sol
        </Link>
      </h3>
      
      <div className="flex justify-center mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(displayStatus)}`}>
          {displayStatus.toUpperCase()}
        </span>
      </div>
      
      <div className="text-center mb-4">
        {displayStatus === 'not_for_sale' || displayStatus === 'vaulted' ? (
          <span className="text-base sm:text-lg font-bold text-gray-500">
            {displayStatus === 'vaulted' ? 'Vaulted' : 'Not For Sale'}
          </span>
        ) : displayStatus === 'quick_snag' ? (
          <div>
            <span className="text-base sm:text-lg font-bold flicker-solana solana-gradient">
              {displayPrice}
            </span>
            <div className="text-xs text-gray-400 line-through">
              {domain.price}
            </div>
          </div>
        ) : (
          <span className="text-base sm:text-lg font-bold flicker-solana solana-gradient">
            {displayPrice}
          </span>
        )}
        <div className="flex items-center justify-center mt-2">
          <span className={`text-xs ${getCategoryColor(domain.category)}`}>
            {displayStatus === 'quick_snag' ? 'Quick Snag' : getCategoryLabel(domain.category)}
          </span>
          {domain.category !== 'lore' && (
            <span className={`text-xs ml-2 ${rotationInfo.color}`}>
              ⏰ {rotationInfo.interval}
            </span>
          )}
        </div>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-xs text-gray-400 leading-relaxed">
          {domain.description}
        </p>
      </div>
      
      {domain.featured && (
        <div className="text-center mb-4">
          <span className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded text-xs text-purple-400">
            ⭐ FEATURED
          </span>
        </div>
      )}
      
      <div className="flex justify-center space-x-2">
        <Link 
          to={`/wiki/${domain.slug}`}
          className="neon-cyan neon-cyan-hover text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
        >
          {domain.hasLore ? '📖 Wiki' : 'View Details'}
        </Link>
        {displayStatus === 'quick_snag' && (
          <a 
            href="https://twitter.com/messages/compose?recipient_id=retailstarsol"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white text-center py-2 px-4 rounded text-sm font-semibold transition-colors duration-200"
          >
            Quick Snag
          </a>
        )}
        {displayStatus === 'not_for_sale' && (
          <span className="bg-gray-600 text-white text-center py-2 px-4 rounded text-sm font-semibold">
            Lore Only
          </span>
        )}
        {displayStatus === 'vaulted' && (
          <span className="bg-purple-600 text-white text-center py-2 px-4 rounded text-sm font-semibold">
            Vaulted
          </span>
        )}
      </div>
    </div>
  );
};

const DomainsPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get Quick Snags (only specific 3 domains, mid-tier only)
  const quickSnagDomains = domainsData.domains.filter(d => 
    d.status === "available" && 
    d.hasWebsite && 
    d.quickSnagPrice &&
    d.category === "mid" &&
    ["rigbuilder", "bidgremlin", "deploydeck"].includes(d.name)
  );
  const nonQuickSnagDomains = domainsData.domains.filter(d => 
    !quickSnagDomains.some(qs => qs.name === d.name)
  );

  const filteredDomains = domainsData.domains.filter(domain => {
    let matchesFilter = true;
    
    if (filter === 'with_websites') {
      matchesFilter = quickSnagDomains.some(qs => qs.name === domain.name);
    } else if (filter === 'without_websites') {
      matchesFilter = !quickSnagDomains.some(qs => qs.name === domain.name);
    } else if (filter === 'for_sale') {
      matchesFilter = domain.status === 'available';
    } else if (filter !== 'all') {
      matchesFilter = domain.category === filter;
    }
    
    const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         domain.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { key: 'all', label: 'All Domains', count: domainsData.domains.length },
    { key: 'with_websites', label: 'Quick Snags', count: quickSnagDomains.length },
    { key: 'without_websites', label: 'Without Websites', count: nonQuickSnagDomains.length },
    { key: 'for_sale', label: 'For Sale', count: domainsData.domains.filter(d => d.status === 'available').length },
    { key: 'premium', label: 'Premium Wing', count: domainsData.domains.filter(d => d.category === 'premium').length },
    { key: 'mid', label: 'Mid Tier', count: domainsData.domains.filter(d => d.category === 'mid').length },
    { key: 'flash', label: 'Flash Rack', count: domainsData.domains.filter(d => d.category === 'flash').length },
    { key: 'lore', label: 'Lore Only', count: domainsData.domains.filter(d => d.category === 'lore').length }
  ];

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
            {/* Back Button */}
            <div className="mb-6 flex justify-center">
              <Link 
                to="/"
                className="neon-cyan neon-cyan-hover py-2 px-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center"
              >
                <span className="mr-2">←</span>
                Back to Home
              </Link>
            </div>
            
            <div className="mb-8 flex justify-center">
              <Link to="/" className="relative hover:scale-105 transition-transform duration-200">
                <img 
                  src={rsLogo} 
                  alt="RetailStar Logo" 
                  className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-lg shadow-2xl shadow-blue-500/20 border border-blue-500/30 flicker-solana cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-400/20 rounded-lg"></div>
              </Link>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 neon-pulse solana-gradient flicker-solana">
              Domain Inventory
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 flicker max-w-3xl mx-auto leading-relaxed glow-blue">
              {domainsData.domains.length} nodes in the Retailverse. Find your perfect .sol domain.
            </p>

            {/* Rotation Info */}
            <div className="mb-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">🔄 Rotation Schedule</h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                  <span>Flash Rack: 24h</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                  <span>Mid Tier: 72h</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                  <span>Premium Wing: 7d</span>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search domains..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 p-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <div className="flex gap-2 flex-wrap justify-center">
                  {categories.map(category => (
                    <button
                      key={category.key}
                      onClick={() => setFilter(category.key)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        filter === category.key
                          ? 'neon-cyan bg-blue-600/20 border border-blue-500/30'
                          : 'bg-gray-800/50 border border-gray-700 hover:border-blue-500/30'
                      }`}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Domain Grid */}
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredDomains.map((domain, index) => (
                <DomainCard key={index} domain={domain} />
              ))}
            </div>
            
            {filteredDomains.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No domains found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DomainsPage; 