import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { retailrunnerMoodEngine } from '../utils/retailrunnerMoodEngine';
import { parseCommand, executeCommand, checkForLinkSuggestion } from '../utils/retailrunnerCommands';
import { getLinkSuggestion, LinkSuggestion } from '../utils/retailrunnerLinkSuggestions';
import CommandPill from './CommandPill';

interface RetailrunnerProps {
  wallet?: string | null;
}

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
  link?: LinkSuggestion; // Optional link data
}

export default function Retailrunner({ wallet }: RetailrunnerProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [botResponse, setBotResponse] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([
    { type: 'bot', text: 'Yes… it\'s me again.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Handle link button clicks
  const handleLinkClick = (url: string) => {
    navigate(url);
    // Optionally close widget after navigation
    // setIsOpen(false);
  };

  // Handle command pill clicks to autofill input
  const handleCommandClick = (command: string) => {
    if (inputRef.current) {
      inputRef.current.value = command;
      inputRef.current.focus();
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, botResponse]);

  const simulateStreamingResponse = async (fullText: string) => {
    const words = fullText.split(' ');
    setBotResponse('');
    setIsTyping(true);

    for (let i = 0; i < words.length; i++) {
      setBotResponse((prev) => prev + words[i] + ' ');
      // Random delay between 55-80ms per word for natural feel
      await new Promise((r) => setTimeout(r, 55 + Math.random() * 25));
    }

    setIsTyping(false);
    setBotResponse(''); // Clear the streaming response
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = inputRef.current?.value.trim();
    if (!input) return;

    // Add user message immediately
    setHistory((prev) => [...prev, { type: 'user', text: input }]);
    
    // Clear input
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    // Initial thinking pause (1-1.5 seconds)
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

    // Check if input is a slash command
    const command = parseCommand(input);
    let fullResponse: string;
    let linkSuggestion: LinkSuggestion | null = null;

    if (command) {
      // Execute command with wallet context
      fullResponse = await executeCommand(command, wallet || null);
    } else {
      // Check for link suggestions first
      linkSuggestion = checkForLinkSuggestion(input);
      
      if (linkSuggestion) {
        fullResponse = linkSuggestion.sarcasm;
      } else {
        // Fallback to mood engine for regular chat
        fullResponse = retailrunnerMoodEngine(input);
      }
    }
    
    // Stream the response word by word
    await simulateStreamingResponse(fullResponse);
    
    // Add to history with link data if present
    setHistory((prev) => [...prev, { 
      type: 'bot', 
      text: fullResponse, 
      link: linkSuggestion || undefined 
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bubble */}
      <button
        onClick={toggleOpen}
        className="w-14 h-14 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center shadow-lg hover:shadow-xl overflow-hidden transition-all duration-200 hover:scale-105"
      >
        <img
          src="/src/assets/Wifhoodie 631.png"
          alt="Retailrunner Avatar"
          className="w-full h-full object-cover rounded-full animate-pulse"
        />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="w-80 bg-black border border-zinc-700 mt-2 rounded-lg shadow-xl p-4 text-sm relative overflow-hidden">
          {/* Background Logo */}
          <img
            src="/assets/rs-logo.png"
            alt="Retailstar Logo"
            className="absolute inset-0 w-full h-full object-cover opacity-5 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="font-bold mb-2 text-cyan-400">Retailrunner Terminal</div>
          {history.length === 1 && (
            <div className="text-xs text-gray-400 mb-2 italic">
              💡 Type <span className="text-cyan-400">/help</span> for commands
            </div>
          )}
          <div className="max-h-60 overflow-y-auto space-y-2 mb-3">
            {history.map((entry, idx) => (
              <div key={idx} className="space-y-2">
                {/* Help Command UI */}
                {entry.text === '__HELP_COMMAND__' ? (
                  <div className="space-y-3">
                    <p className="text-cyan-300">*sighs* Fine, I'll explain what I can do...</p>
                    
                    <div className="space-y-2">
                      <p className="text-cyan-400 font-semibold">🤖 Available Commands:</p>
                      <div className="space-y-1 pl-2">
                        <p className="text-sm">
                          <CommandPill command="/tickets" onClick={handleCommandClick} />
                          Check your RT balance and activity
                        </p>
                        <p className="text-sm">
                          <CommandPill command="/access" onClick={handleCommandClick} />
                          Check your mall access status
                        </p>
                        <p className="text-sm">
                          <CommandPill command="/earn" onClick={handleCommandClick} />
                          Learn how to earn Retail Tickets
                        </p>
                        <p className="text-sm">
                          <CommandPill command="/spend" onClick={handleCommandClick} />
                          See ways to spend your tickets
                        </p>
                        <p className="text-sm">
                          <CommandPill command="/vault" onClick={handleCommandClick} />
                          Access premium domains (3+ RT required)
                        </p>
                        <p className="text-sm">
                          <CommandPill command="/dashboard" onClick={handleCommandClick} />
                          Complete user overview
                        </p>
                        <p className="text-sm">
                          <CommandPill command="/help" onClick={handleCommandClick} />
                          Show this help message
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-cyan-400 font-semibold">🪄 Easter Eggs:</p>
                      <div className="space-y-1 pl-2">
                        <p className="text-sm">
                          <CommandPill command="/mood" onClick={handleCommandClick} />
                          Check Retailrunner's current mood
                        </p>
                        <p className="text-sm">
                          <CommandPill command="/ritual" onClick={handleCommandClick} />
                          Perform a sacred retail ritual
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 text-xs italic">*Retailrunner mutters* "Now you know what I'm capable of."</p>
                  </div>
                ) : (
                  <div
                    className={
                      entry.type === 'bot' ? 'text-cyan-300' : 'text-yellow-200 text-right'
                    }
                  >
                    {entry.text}
                  </div>
                )}
                
                {/* Link button if present */}
                {entry.link && (
                  <div className="mt-2">
                    <button
                      onClick={() => handleLinkClick(entry.link!.url)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-white text-sm"
                    >
                      <span className="text-lg">{entry.link.emoji}</span>
                      <span>{entry.link.title}</span>
                      <span className="text-xs opacity-80">→</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {/* Streaming Response */}
            {botResponse && (
              <div className="text-cyan-300 whitespace-pre-wrap">
                {botResponse}
                {isTyping && <span className="animate-pulse text-cyan-400">▍</span>}
              </div>
            )}
            
            {/* Enhanced Typing Indicator */}
            {isTyping && !botResponse && (
              <div className="flex items-center gap-2 text-teal-400 text-sm font-mono">
                <span className="text-purple-400 animate-pulse">🤖</span> 
                <span className="animate-pulse">Processing nonsense...</span>
                <div className="flex gap-1 ml-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
                <div className="flex gap-1 ml-1">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
                  <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}
            
            {/* Auto-scroll anchor */}
            <div ref={chatEndRef} />
          </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 relative z-10">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask, provoke, or try /help..."
              className="flex-1 rounded bg-zinc-800 px-3 py-1 text-white border border-zinc-600 focus:border-cyan-500 focus:outline-none"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className={`px-3 py-1 rounded text-white transition-colors duration-200 ${
                isTyping 
                  ? 'bg-zinc-600 cursor-not-allowed' 
                  : 'bg-cyan-700 hover:bg-cyan-500'
              }`}
              disabled={isTyping}
            >
              →
            </button>
          </form>
        </div>
      )}
    </div>
  );
} 