import React, { useState, useEffect, useRef } from 'react';
import { retailrunnerMoodEngine } from '../utils/retailrunnerMoodEngine';
// @ts-ignore: PNG import for Vite
import wifhoodieImage from '../assets/Wifhoodie 631.png';

export default function Retailrunner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [botResponse, setBotResponse] = useState('');
  const [history, setHistory] = useState([
    { type: 'bot', text: 'Yes… it\'s me again.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

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
    // Add the complete response to history
    setHistory((prev) => [...prev, { type: 'bot', text: fullText }]);
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

    // Get full response
    const fullResponse = retailrunnerMoodEngine(input);
    
    // Stream the response word by word
    await simulateStreamingResponse(fullResponse);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bubble */}
      <button
        onClick={toggleOpen}
        className="w-14 h-14 rounded-full bg-zinc-800 border border-white/20 flex items-center justify-center shadow-lg hover:shadow-xl overflow-hidden transition-all duration-200 hover:scale-105"
      >
        <img
          src={wifhoodieImage}
          alt="Retailrunner Avatar"
          className="w-full h-full object-cover rounded-full animate-pulse"
        />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="w-80 bg-black border border-zinc-700 mt-2 rounded-lg shadow-xl p-4 text-sm">
          <div className="font-bold mb-2 text-cyan-400">Retailrunner Terminal</div>
          <div className="max-h-60 overflow-y-auto space-y-2 mb-3">
            {history.map((entry, idx) => (
              <div
                key={idx}
                className={
                  entry.type === 'bot' ? 'text-cyan-300' : 'text-yellow-200 text-right'
                }
              >
                {entry.text}
              </div>
            ))}
            
            {/* Streaming Response */}
            {botResponse && (
              <div className="text-cyan-300 whitespace-pre-wrap">
                {botResponse}
                {isTyping && <span className="animate-pulse text-cyan-400">▍</span>}
              </div>
            )}
            
            {/* Typing Indicator */}
            {isTyping && !botResponse && (
              <div className="flex items-center gap-2 text-teal-400 text-sm font-mono animate-pulse">
                <span className="text-purple-400">🤖</span> 
                <span>Processing nonsense...</span>
                <div className="flex gap-1 ml-2">
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}
            
            {/* Auto-scroll anchor */}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask or provoke..."
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