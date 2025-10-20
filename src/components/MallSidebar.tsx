import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PricingModal from './PricingModal';
import { mythicDomains } from '../data/mythicDomains';
import { generateSolanaLikeWallet } from '../utils/fakeWallet';

const links = [
  { name: 'Mall Map', href: '/directory', icon: '🗺️' },
  { name: 'Marketplace', href: '/marketplace', icon: '🛍️' },
  { name: 'Scav Rack', href: '/scavrack', icon: '🎒' },
  { name: 'Vaulted Domains', href: '/vault', icon: '🔒' },
  { name: 'Guide', href: '/guide', icon: '📖' },
  { name: 'Wiki', href: '/wiki-directory', icon: '📚' },
  { name: 'Insights', href: '/insights', icon: '📝' },
  { name: 'Tools', href: '/tools', icon: '🛠️' },
  { name: 'Retail Tickets', href: '/retail-tickets', icon: '🎟️' },
  { name: 'Merch Waitlist', href: '/merch-waitlist', icon: '🧥' },
  { name: 'Pricing', href: '#pricing', icon: '💰', isModal: true },
  { name: 'Tiers', href: '/tiers', icon: '🧱' },
];

const triggerResponses = [
  "You typed 'HODL'? Wow, you still use that word unironically. Fine, take this: 5% off… maybe.",
  "You typed 'cyberpunk' — how original. Here's a dose of lore you didn't ask for.",
  "gm? cringe. but sure, I'll reward early risers with this fake alpha: nothing matters.",
  "You've unlocked... absolutely nothing. Congrats.",
  "404: Promo code not found. Just like your trading discipline.",
  "The mall AI has noted your curiosity. Surveillance level +2.",
];

const glitchColors = ['bg-teal-500', 'bg-pink-500', 'bg-cyan-400', 'bg-purple-500', 'bg-yellow-400'];

interface MallSidebarProps {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

const MallSidebar: React.FC<MallSidebarProps> = ({ 
  collapsed: externalCollapsed, 
  onCollapsedChange 
}) => {
  const [open, setOpen] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [glitchLines, setGlitchLines] = useState<Array<{id: number, top: number, color: string}>>([]);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showTiersModal, setShowTiersModal] = useState(false);

  // Use external collapsed state if provided, otherwise use internal
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;
  
  const handleCollapsedChange = (newCollapsed: boolean) => {
    if (onCollapsedChange) {
      onCollapsedChange(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
    }
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );

    // console.log("Active Filters:", activeFilters);
  };

  // Generate random glitch lines when sidebar opens
  React.useEffect(() => {
    if (open && !collapsed) {
      const newLines = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        top: Math.random() * 90,
        color: glitchColors[Math.floor(Math.random() * glitchColors.length)]
      }));
      setGlitchLines(newLines);
    }
  }, [open, collapsed]);

  // Command Map for Retailstar OS
  const commandMap: { [key: string]: () => string } = {
    '/pricing': () => {
      setShowPricingModal(true);
      return `🪙 Retailstar Pricing Tiers

🧃 Liquid Tags (0.15–0.35 SOL)
Fast-moving domains for fast-clicking buyers.

📐 Blueprint Ready (0.5–2 SOL)
Off-the-rack domains. Brandable, functional, and one step from greatness.

💎 Premium (3+ SOL)
Built sites, meme-capable. For those who want the good stuff.

🕳 Vaulted Premium (Not listed)
Private sales only. You ask, we judge. Don't waste our time.

🧿 Mythic (10+ SOL)
Artifacts of unmatched power.

💡 Pro tip: Liquid Tags flip fast. Click first, think later.`;
    },
    '/tiers': () => {
      setShowTiersModal(true);
      return '🎖️ Loading Access Tier Overview...\n🧠 AUTHORIZED ACCESS GRANTED';
    },
    '/mythic': () => {
      return `🧿 Mythic Domains
Artifacts of unmatched power. These sit at the top of the food chain.

${mythicDomains.map(domain => `• ${domain.name} — ${domain.price}`).join('\n')}

💎 These are the domains that legends are made of.`;
    },
    '/artifacts': () => {
      return `🧿 Mythic Artifacts
The rarest domains in the Retailverse.

${mythicDomains.map(domain => `• ${domain.name} — ${domain.price}`).join('\n')}

💎 These are the domains that legends are made of.`;
    },
    '/lore': () => {
      return `📜 Fetching hidden mall lore…
🧠 "Retailstar Mall was built atop a Solana subnet once rumored to host failed layer-1 experiments. The founders discovered something in the code that shouldn't exist - a recursive loop that seemed to generate infinite possibilities. They built the mall around it, and now we're all just living in the simulation."`;
    },
    '/vault': () => {
      return `🔐 Vaulted domains are off-market. Only insiders speak the correct phrase.
💎 These are the domains that got away - the ones that were too good for the public market.`;
    },
    '/retailrunner': () => {
      return `🤖 Retailrunner status: annoyed but online.
🧠 Current mood: Sarcastic
💬 Last response: "Yes, I'm still here. What do you want?"`;
    },
    '/help': () => {
      return `🧾 Available commands:
  /pricing      → View domain pricing tiers
  /tiers        → Explore access roles  
  /mythic       → View Mythic tier domains
  /artifacts    → View Mythic artifacts
  /lore         → Reveal hidden mall backstory
  /vault        → Learn about off-market domains
  /retailrunner → System status check
  /purchase     → Simulate a domain purchase
  /help         → Show this help menu

💡 Type any phrase for random Retailrunner wisdom`;
    },
    '/gm': () => {
      return `🌅 Good morning? In this economy?
☕️ Here's your daily dose of reality: nothing matters, everything is temporary, and your portfolio is probably down.`;
    },
    '/access': () => {
      return `🔐 Access control system active.
🔑 Enter cipher: [awaiting input]
💡 Hint: The code is hidden in plain sight.`;
    },
    '/cipher 0x147': () => {
      return `🎉 Cipher accepted! Welcome to the inner circle.
🔓 Unlocking advanced features...
🧠 You now have access to the restricted mall areas.`;
    },
    '/purchase': () => {
      const wallet = generateSolanaLikeWallet();
      const domains = ['commandhub.sol', 'lurkerlife.sol', 'jpegdealer.sol', 'copevendor.sol'];
      const randomDomain = domains[Math.floor(Math.random() * domains.length)];
      const prices = ['8.5 SOL', '12 SOL', '0.69 SOL', '3.2 SOL'];
      const randomPrice = prices[Math.floor(Math.random() * prices.length)];
      
      return `💰 Purchase Alert:
${wallet} just acquired ${randomDomain} for ${randomPrice}

🎯 Transaction confirmed on Solana network
💎 Domain transferred successfully`;
    },
  };

  const handleTerminalCommand = (input: string) => {
    const command = input.trim().toLowerCase();
    setTerminalInput('');

    if (commandMap[command]) {
      const response = commandMap[command]();
      setTerminalOutput(response);
    } else {
      const fallback = triggerResponses[Math.floor(Math.random() * triggerResponses.length)];
      setTerminalOutput(`⚠️ Unknown command: "${input}"\n${fallback}`);
    }
  };

  return (
    <>
      {/* Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-[10000] bg-cyan-700 text-white p-2 rounded hover:bg-cyan-600 transition md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full transition-all duration-300 z-[9999] bg-black/90 backdrop-blur-lg overflow-hidden border-r border-cyan-800 ${
          collapsed ? 'w-12' : 'w-64'
        } ${
          open ? 'translate-x-0 animate-glitch' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Static Background Texture - Only when not collapsed */}
        {!collapsed && (
          <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJub2lzZSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIj4KICAgICAgPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDAwIi8+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSIyIiB5PSIxIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iNCIgeT0iMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgICAgIDxyZWN0IHg9IjEiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSI3IiB5PSI0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iMyIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+CiAgICAgIDxyZWN0IHg9IjgiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8cmVjdCB4PSI2IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjEiLz4KICAgICAgPHJlY3QgeD0iOSIgeT0iNSIgd2lkdGg9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSIvPgogICAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjbm9pc2UpIi8+Cjwvc3ZnPgo=')] opacity-10 pointer-events-none mix-blend-overlay" />
        )}
        
        {/* Glitch Overlay Lines - Only when not collapsed */}
        {!collapsed && (
          <div className="absolute top-0 left-0 h-full w-full z-5 pointer-events-none">
            {glitchLines.map((line) => (
              <div
                key={line.id}
                className={`absolute left-0 h-[1px] w-full ${line.color} opacity-30 animate-pulse`}
                style={{ top: `${line.top}%` }}
              />
            ))}
          </div>
        )}

        {/* Collapse Button - Always visible */}
        <button
          className="absolute top-4 right-4 text-xs text-teal-400 hover:text-white transition-colors z-20"
          onClick={() => handleCollapsedChange(!collapsed)}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? '🡆' : '🡄'}
        </button>

        {/* Conditional Content */}
        {collapsed ? (
          <div className="flex flex-col items-center justify-center h-full py-4">
            <span className="text-xs text-teal-400 rotate-90 tracking-wider font-mono mt-8">retailstar</span>
          </div>
        ) : (
          <div className="relative z-10 p-6 space-y-4">
            <Link to="/" className="block">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4 hover:text-cyan-200 transition-colors animate-flash">
                Retailstar Mall
              </h2>
            </Link>

            <nav className="space-y-3">
              {links.map((link) => (
                link.isModal ? (
                  <button
                    key={link.name}
                    onClick={() => {
                      setShowPricingModal(true);
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 bg-gray-800/50 rounded hover:bg-cyan-700/50 transition-colors text-sm border border-gray-700 hover:border-cyan-600"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-4 py-2 bg-gray-800/50 rounded hover:bg-cyan-700/50 transition-colors text-sm border border-gray-700 hover:border-cyan-600"
                    onClick={() => setOpen(false)}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </Link>
                )
              ))}
            </nav>

            {/* Mini Terminal */}
            <div className="mt-6">
              <label className="block text-sm mb-1 text-gray-400">Mini Terminal</label>
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Enter command or phrase..."
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleTerminalCommand(terminalInput);
                    }
                  }}
                  className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:outline-none focus:border-cyan-500 text-sm"
                />
                {terminalOutput && (
                  <div className="text-xs font-mono text-green-300 whitespace-pre-wrap mt-2 bg-black/60 p-2 rounded border border-teal-600">
                    {terminalOutput}
                  </div>
                )}
              </div>
            </div>

            {/* Domain Filters */}
            <div className="mt-8">
              <h3 className="text-sm text-gray-400 mb-2">Domain Filters</h3>
              <div className="flex flex-wrap gap-2">
                {['Vaulted', 'Mid Tier', 'Flash Deals'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`px-3 py-1 rounded text-xs font-medium border transition ${
                      activeFilters.includes(filter)
                        ? 'bg-cyan-700 border-cyan-500 text-white'
                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-cyan-400'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 text-xs text-gray-400 border-t border-gray-700 pt-4">
              {process.env.NODE_ENV !== 'production' && (
                <p className="italic text-cyan-400">🧠 Dev Mode Active</p>
              )}
              <p className="mt-2 text-gray-500">
                Welcome to the Retailverse
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* Pricing Modal */}
      <PricingModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} />
      
      {/* Tiers Modal - Placeholder for now */}
      {showTiersModal && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-gray-900 border border-teal-600 rounded-xl p-6 w-[90%] max-w-xl shadow-xl text-white">
            <button
              className="absolute top-3 right-3 text-teal-300 hover:text-red-400 text-lg transition-colors"
              onClick={() => setShowTiersModal(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-teal-300">🧱 Retailstar Access Tiers</h2>
            <div className="space-y-4 text-sm leading-relaxed">
              <div className="border border-gray-700 rounded-lg p-3 bg-gray-800/50">
                <span className="font-bold text-white">🛡️ Retailpunk:</span>
                <p className="text-xs text-gray-400 mt-1">Basic access. You're here, that's something.</p>
              </div>
              <div className="border border-gray-700 rounded-lg p-3 bg-gray-800/50">
                <span className="font-bold text-white">⚡ Slotlord:</span>
                <p className="text-xs text-gray-400 mt-1">Mid-tier access. You've earned some respect.</p>
              </div>
              <div className="border border-teal-600 rounded-lg p-3 bg-teal-900/20">
                <span className="font-bold text-teal-300">👑 Mallcore:</span>
                <p className="text-xs text-gray-400 mt-1">VIP access. You're one of us now.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MallSidebar; 