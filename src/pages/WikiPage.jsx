import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import domainsData from '../data/domains.json';
import rsLogo from '../assets/rs-logo.png';
import retailstarBody from '../assets/retailstar-body.png';
import jpegdealerImage from '../assets/jpegdealer.png';
import bidgremlinImage from '../assets/bidgremlin.png';
import fudscientistImage from '../assets/fudscientist.png';
import jumpsetradioImage from '../assets/jumpsetradio.png';
import SEOHead from '../components/SEOHead';

const WikiPage = () => {
  const { slug } = useParams();
  const [domain, setDomain] = useState(null);

  useEffect(() => {
    const foundDomain = domainsData.domains.find(d => d.slug === slug);
    setDomain(foundDomain);
  }, [slug]);

  if (!domain) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden">
        <SEOHead 
          target="retailstar.sol"
          pageType="wiki"
          customTitle="Domain Not Found | Retailstar.sol"
          customDescription="This domain doesn't exist in the Retailverse. Browse our collection of Solana domains."
          customKeywords="domain not found, retailstar domains, solana domains"
          canonicalUrl="https://retailstar.sol/wiki/not-found"
        />
        <img 
          src={retailstarBody} 
          alt="RetailStar Background" 
          className="pointer-events-none select-none fixed inset-0 w-full h-full object-cover opacity-50 z-0" 
          aria-hidden="true"
        />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 solana-gradient">Domain Not Found</h1>
            <p className="text-gray-300 mb-8">This domain doesn&apos;t exist in the Retailverse.</p>
            <Link 
              to="/domains" 
              className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              Browse Domains
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getLoreContent = (domainName) => {
    const loreData = {
      jpegdealer: {
        title: "The JPEG Dealer's Code",
        content: `🧃 **Backstory:**
Once a lowkey plug, now a full-blown middleman of JPEG euphoria. This shop emerged during peak mint season when liquidity was loose and everyone knew a guy. The JPEG Dealer always has "just one more" rare in stock.

In the neon-lit corridors of Solana's underlayer, the JPEG Dealer operates from a terminal that never sleeps. This domain was forged in the fires of the NFT boom, when every pixel held promise and every transaction was a gamble on the future of digital art.

The Dealer's terminal is more than a marketplace—it's a node in the great network of digital commerce, where flippers become collectors and collectors become legends. The interface hums with the energy of a thousand transactions, each one a story waiting to be told.

🧠 **Inspiration:**
A fusion of meme economy and real NFT flipper hustle. The name slaps, the resale potential is instant, and the branding writes itself. Some say the JPEG Dealer can spot a rug pull from a mile away, while others claim they can predict the next blue chip before it even mints.

🛠️ **Function:**
Perfect for a meme NFT page, resale hub, or trader identity site. Has viral merch and sticker potential. The truth is simpler: in the Retailverse, every JPEG tells a story, and every story has a price.`
      },
      jumpsetradio: {
        title: "The Sonic Kiosk Manifesto",
        content: `📻 **Backstory:**
Broadcasting from the neon alleys of Retailstar Mall, Jumpset Radio is a relic of 90s underground rhythm, wrapped in Solana static. It's your local kiosk for gamer nostalgia, lo-fi graffiti, and kinetic design.

In the depths of the Retailverse, where every pixel has a pulse and every transaction has a beat, Jumpset Radio emerged from the intersection of gaming culture and streetwear aesthetics. This sonic kiosk pulses with the energy of late-night gaming sessions and early-morning streetwear drops.

The Radio doesn't just play music—it broadcasts the culture, the vibe, the energy that flows through the digital streets. From lo-fi beats to high-energy gaming soundtracks, every track is carefully curated to match the aesthetic of the moment.

🧠 **Inspiration:**
Pulled from the DNA of Jet Set Radio, Streetwear, and Pirate Radio culture. Equal parts visual chaos and curated flow. Gamers and fashion enthusiasts alike gather here, sharing the latest drops, discussing the hottest games, and vibing to the soundtrack of the Retailverse.

🛠️ **Function:**
Use it for a retro-cyber sound station, playlist brand, merch line, or motion-design portfolio. The Radio is more than entertainment—it's a community hub where culture meets commerce in perfect harmony.`
      },
      biggestofbrains: {
        title: "The Galaxy Brain Protocol",
        content: `Biggest of Brains is not just a domain—it's a state of mind, a protocol for those who think beyond the obvious, who see patterns where others see chaos. This is where the galaxy brain plays are born, where 4D chess moves are planned in 3D space.

The domain operates on a higher frequency, processing information at speeds that would make regular brains short-circuit. Here, alpha leaks are not just found—they're engineered, crafted, and deployed with surgical precision.

The Biggest of Brains collective doesn't follow trends—they create them. Every decision is calculated, every move is strategic, and every play is designed to maximize returns while minimizing risk. This is where the smart money goes to get smarter.`
      },
      retailverse: {
        title: "The Retailverse Chronicles",
        content: `The Retailverse is not just a collection of domains—it's an entire universe of possibilities, a digital ecosystem where every .sol domain is a node in a vast network of commerce, culture, and community.

From the neon-lit corridors of the main retail districts to the shadowy back alleys of the underlayer, the Retailverse spans dimensions of digital space that most users never even glimpse. It's a place where memes become money, where culture becomes commerce, and where every transaction tells a story.

The Retailverse is alive, breathing, evolving. It adapts to market conditions, responds to cultural shifts, and grows stronger with every new node that comes online. This is not just a marketplace—it's a living, breathing digital organism that thrives on the energy of its participants.`
      },
      fudscience: {
        title: "The FUD Science Manifesto",
        content: `🔬 **Backstory:**
Born in the FOMO labs of Crypto Twitter, fudscience.sol is the satirical alpha report you read ironically—until it hits. It collects the chaos of the market and distills it into fake research, fake graphs, and dangerously real truths.

In the depths of the Retailverse, where every chart is a story and every prediction is a gamble, FUD Science operates as the ultimate irony machine. It takes the over-serious alpha threads, the paid group hysteria, and the endless stream of "trust me bro" advice, and turns them into art.

🧠 **Inspiration:**
A mockery of over-serious alpha threads and paid group hysteria. Think "Bloomberg meets 4chan" energy. The domain exists in the sweet spot between genuine market analysis and pure chaos—where the line between satire and prophecy becomes dangerously thin.

🛠️ **Function:**
Great for an alpha satire blog, parody newsletter, or ironic Telegram channel. Perfect for anyone who wants to build a brand around the beautiful absurdity of crypto culture while actually providing value through the chaos.`
      },
      copevendor: {
        title: "The Cope Vendor's Pharmacy",
        content: `💊 **Backstory:**
In the ruins of high-entry bags, copevendor.sol set up shop. Stocked with hopium pills, Hopeless Opium™ candles, and "GM will fix it" posters, this booth sells false hope like hotcakes.

Deep in the Retailverse's shadow economy, where every loss is a lesson and every dip is temporary, the Cope Vendor operates a pharmacy of psychological band-aids. This domain emerged from the collective need to process the emotional rollercoaster of crypto trading—where sometimes the best medicine is a good laugh at yourself.

The Vendor's inventory is carefully curated: from "This Time Is Different" t-shirts to "Diamond Hands" stress balls, every product is designed to help traders cope with the harsh realities of the market while maintaining their sanity.

🧠 **Inspiration:**
A satire of Degen psychology and bagholder cope, but with room to remix into a serious brand. The domain captures the universal human need to find meaning in chaos, to create order from disorder, and to laugh in the face of financial adversity.

🛠️ **Function:**
Can become a humor site, sticker brand, or rebuilt into a high-concept self-help parody. Perfect for anyone who wants to build a community around the shared experience of financial ups and downs, or create products that help people cope with the emotional side of trading.`
      },
      commandhub: {
        title: "The Command Hub Protocol",
        content: `🧠 **Backstory:**
Deep inside the Retailstar grid, a terminal flickers. The devs who know, know. commandhub.sol isn't just a site—it's the mainframe for deployment, control, and cold precision.

In the depths of the Retailverse's infrastructure layer, where every line of code is a command and every deployment is a mission, Command Hub operates as the central nervous system for digital operations. This domain emerged from the need for a clean, efficient interface that speaks the language of developers and system administrators.

The Hub's interface is minimal by design: no flashy graphics, no unnecessary animations—just pure functionality wrapped in terminal aesthetics. It's where the real work happens, where the magic of deployment meets the cold logic of infrastructure.

🧠 **Inspiration:**
Built on dev/infra world energy. Terminal aesthetics, strong utility vibe, and clean resale potential. The domain captures the essence of what developers actually need: reliability, speed, and a clean interface that doesn't get in the way of the work.

🛠️ **Function:**
Ideal for dev dashboards, bot control centers, or backend status pages. Perfect for anyone building developer tools, infrastructure monitoring platforms, or automation systems that need a professional, technical aesthetic.`
      }
    };

    return loreData[domainName] || {
      title: `${domainName.charAt(0).toUpperCase() + domainName.slice(1)} Domain`,
      content: `This domain exists in the Retailverse, waiting for its story to unfold. Every .sol domain is a node in the network, a potential for something greater.

In the depths of Solana's underlayer, where every transaction tells a story and every domain holds promise, ${domainName}.sol awaits its destiny. Whether it becomes a marketplace, a community hub, or something entirely new, the possibilities are endless.

The Retailverse is alive with potential—every domain is a blank canvas waiting for its owner to paint their vision.`
    };
  };

  const lore = getLoreContent(domain.slug);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <SEOHead 
        target={`${domain.slug}.sol`}
        pageType="wiki"
        customTitle={`${domain.slug}.sol | ${lore.title} - Retailstar Domain Wiki`}
        customDescription={`Explore ${domain.slug}.sol in the Retailverse. ${lore.content.substring(0, 150)}...`}
        customKeywords={`${domain.slug}.sol, retailstar domain, solana domain, domain wiki, ${domain.slug}, retailverse`}
        canonicalUrl={`https://retailstar.sol/wiki/${domain.slug}`}
      />
      
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
        <header className="border-b border-gray-800 bg-black/40 backdrop-blur-sm py-4 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img src={rsLogo} alt="RetailStar" className="w-8 h-8" />
              <span className="text-xl font-bold solana-gradient">RetailStar</span>
            </Link>
            <nav className="flex space-x-6">
              <Link to="/guide" className="text-cyan-300 hover:text-white font-semibold transition-colors">
                📖 How to Navigate
              </Link>
              <Link to="/domains" className="text-gray-300 hover:text-white transition-colors">
                Domains
              </Link>
              <Link to="/vault" className="text-gray-300 hover:text-white transition-colors">
                Vault
              </Link>
            </nav>
          </div>
        </header>

        {/* Domain Wiki Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Domain Header */}
          <div className="text-center mb-12">
            {domain.slug === 'jpegdealer' ? (
              <div className="mb-6">
                <img 
                  src={jpegdealerImage} 
                  alt="JPEG Dealer" 
                  className="w-32 h-32 mx-auto rounded-lg border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/25"
                />
              </div>
            ) : domain.slug === 'bidgremlin' ? (
              <div className="mb-6">
                <img 
                  src={bidgremlinImage} 
                  alt="Bid Gremlin" 
                  className="w-32 h-32 mx-auto rounded-lg border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/25"
                />
              </div>
            ) : domain.slug === 'fudscience' ? (
              <div className="mb-6">
                <img 
                  src={fudscientistImage} 
                  alt="FUD Science" 
                  className="w-32 h-32 mx-auto rounded-lg border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/25"
                />
              </div>
            ) : domain.slug === 'jumpsetradio' ? (
              <div className="mb-6">
                <img 
                  src={jumpsetradioImage} 
                  alt="Jumpset Radio" 
                  className="w-32 h-32 mx-auto rounded-lg border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/25"
                />
              </div>
            ) : null}
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 solana-gradient">
              {domain.slug}.sol
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {domain.description || `A domain in the Retailverse waiting for its story to unfold.`}
            </p>
          </div>

          {/* Lore Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">{lore.title}</h2>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {lore.content}
              </div>
            </div>
          </div>

          {/* Domain Details */}
          {domain.category && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Domain Details</h3>
              <div className="grid gap-4">
                <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Category</h4>
                  <p className="text-gray-300">{domain.category}</p>
                </div>
                {domain.tags && domain.tags.length > 0 && (
                  <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-white mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {domain.tags.map((tag, index) => (
                        <span key={index} className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {domain.status && (
                  <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-white mb-2">Status</h4>
                    <p className="text-gray-300">{domain.status}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/wiki-directory"
                className="neon-cyan neon-cyan-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
              >
                📚 View All Lore
              </Link>
              <Link
                to="/directory"
                className="neon-green neon-green-hover py-3 px-6 rounded-lg font-semibold transition-all duration-200"
              >
                View Mall Directory
              </Link>
            </div>
          </div>
          
          {/* Back to Wiki Directory */}
          <div className="text-center mt-6">
            <Link
              to="/wiki-directory"
              className="text-gray-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
            >
              ← Back to Wiki Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiPage; 