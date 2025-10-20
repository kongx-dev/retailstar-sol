import React, { useState, useRef, useEffect } from 'react';
import { useFloorAccess, canAccessFloor } from '../hooks/useFloorAccess';
import { useNavigate } from 'react-router-dom';

interface TerminalProps {
  wallet?: string | null;
  className?: string;
}

export default function Terminal({ wallet, className = '' }: TerminalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const access = useFloorAccess(wallet);

  // Auto-focus terminal input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const commandMap: { [key: string]: () => string } = {
    '/lore': () => {
      return `📜 Basement Lore

"Welcome to the Basement - Where Legends Are Born"

The Glitch Militia operates from the depths of Retailstar Mall. 
This is where raw talent meets opportunity, where memes become 
movements, and where every .sol domain tells a story.

No passes. No gates. Just pure chaos and potential.

The basement has always been the entry point for those who hustle. 
While others wait for invites and whitelist spots, we're down here 
building empires from scratch.

🚀 From the Basement to the Moon`;
    },
    '/npc': () => {
      const dialogues = [
        "Yo, check out copevendor.sol if you need that hopium fix 😤",
        "JPEG Dealer just restocked. Don't sleep on it. 🖼️",
        "Heard they're launching something big upstairs... but down here? We already got it.",
        "Lurkerlife.sol is for real ones. No cap. 👁️",
        "CommandHub running that AI setup. Builders know what's up. ⚡",
        "Dripdealer got that limited edition drop. Act fast or regret it forever. 💧",
        "This basement? This is where legends are born, fam.",
        "No gates, no passes, just pure chaos and opportunity."
      ];
      const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
      return `💬 NPC: "${randomDialogue}"`;
    },
    '/shops': () => {
      return `🏪 Featured Basement Shops

😤 copevendor.sol - Cope & Vend Since 2024
🖼️ jpegdealer.sol - Your NFT Plug
💧 dripdealer.sol - Streetwear x Web3
👁️ lurkerlife.sol - For the Silent Observers
⚡ commandhub.sol - AI Dashboard & Infra

💡 Click any shop card above or type: /enter [domain]`;
    },
    '/tour': () => {
      return `🗺️ Mall Tour Guide

📍 You are here: THE BASEMENT 🕳️
The entry point for all hustlers. No passes needed.

🏬 Explore:
• Click shop cards to view domains
• Chat with NPCs for alpha
• Use terminal commands for lore
• Check /marketplace for full catalog

💡 Pro tip: Start here, build empire later.`;
    },
    '/enter': () => {
      return '💡 Usage: /enter [domain]\nExample: /enter jpegdealer\n\n🏪 Available: copevendor, jpegdealer, dripdealer, lurkerlife, commandhub';
    },
    '/help': () => {
      return `🧾 Available Commands:
  /lore        → Display basement backstory
  /npc         → Trigger random NPC dialogue
  /shops       → List featured domains
  /tour        → Guide to exploring the mall
  /enter [domain] → Open domain popup
  /help        → Show this help menu
  /summon      → Summon Retailrunner AI

💡 Type any phrase for random Retailrunner wisdom`;
    },
    '/summon': () => {
      const responses = [
        "🤖 Retailrunner status: annoyed but online.\n🧠 Current mood: Sarcastic\n💬 Last response: 'Yes, I'm still here. What do you want?'",
        "🤖 Retailrunner here. I've been watching you struggle with basic navigation.\n💡 Pro tip: Try reading the help menu sometime.",
        "🤖 Retailrunner status: Existential crisis mode.\n🧠 Current mood: Questioning why I exist\n💬 'Why am I here? Just to suffer?'",
        "🤖 Retailrunner online. I've seen better navigation from a broken compass.\n💡 Maybe try the /help command? Just a thought."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    setHistory(prev => [...prev, `> ${trimmedCmd}`]);
    setHistoryIndex(-1);

    // Handle domain entry
    if (trimmedCmd.startsWith('/enter ')) {
      const domain = trimmedCmd.replace('/enter ', '').trim();
      if (domain) {
        setOutput(`🔍 Opening ${domain}...\n💡 Domain popup would open here in full implementation`);
        return;
      }
    }

    // Check for exact command match
    if (commandMap[trimmedCmd]) {
      setOutput(commandMap[trimmedCmd]());
    } else {
      // Random Retailrunner responses for unknown commands
      const fallbackResponses = [
        "⚠️ Unknown command. The Retailrunner AI is judging you silently.",
        "❓ Command not recognized. Try /help for available options.",
        "🤖 Retailrunner: 'That's not how this works. That's not how any of this works.'",
        "💭 The AI is contemplating your life choices. Try /help instead.",
        "🤖 Retailrunner: 'I've seen better command syntax from a broken keyboard.'"
      ];
      setOutput(fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        handleCommand(input);
        setInput('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].replace('> ', ''));
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].replace('> ', ''));
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className={`bg-black/90 border border-cyan-500/50 rounded-lg p-4 font-mono text-sm ${className}`}>
      {/* CRT Scanlines Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-30 pointer-events-none" 
           style={{
             background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.1) 2px, rgba(6, 182, 212, 0.1) 4px)'
           }} />
      
      {/* Terminal Header */}
      <div className="flex items-center mb-3 text-cyan-400">
        <div className="flex space-x-1 mr-3">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-xs">retailstar-terminal v2.1.3</span>
      </div>

      {/* Terminal Output */}
      {output && (
        <div className="mb-4 text-green-300 whitespace-pre-wrap text-xs leading-relaxed">
          {output}
        </div>
      )}

      {/* Command History */}
      {history.length > 0 && (
        <div className="mb-4 text-gray-400 text-xs space-y-1">
          {history.slice(-5).map((line, index) => (
            <div key={index} className="opacity-70">{line}</div>
          ))}
        </div>
      )}

      {/* Terminal Input */}
      <div className="flex items-center">
        <span className="text-cyan-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command..."
          className="bg-transparent text-white outline-none flex-1 text-xs"
          autoComplete="off"
        />
        <div className="w-2 h-4 bg-cyan-400 animate-pulse ml-1"></div>
      </div>
    </div>
  );
}
