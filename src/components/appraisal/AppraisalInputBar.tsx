import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AppraisalInputBarProps {
  domain: string;
  setDomain: (domain: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export const AppraisalInputBar: React.FC<AppraisalInputBarProps> = ({
  domain,
  setDomain,
  onSubmit,
  isLoading = false
}) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim() && !isLoading) {
      onSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase();
    // Auto-append .sol if not present and user types space or enters
    if (!value.includes('.sol')) {
      value = value.replace(/\s+/g, '');
    }
    setDomain(value);
  };

  const normalizedDomain = domain.replace(/\.sol$/i, '');

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center rounded-xl border border-amber-300/40 bg-black/40 px-4 py-3 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
    >
      <span className="mr-3 text-amber-300/80 text-xs font-mono">SCAN:</span>

      <div className="flex-1 flex items-center">
        <input
          type="text"
          value={normalizedDomain}
          onChange={handleChange}
          placeholder="enter domain…"
          disabled={isLoading}
          className="flex-1 bg-transparent text-amber-100 placeholder-amber-300/30 focus:outline-none font-mono text-sm"
        />
        <span className="text-amber-300/60 text-sm mr-2">.sol</span>
        {showCursor && !isLoading && (
          <span className="text-amber-300 animate-cursor-blink">|</span>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={!normalizedDomain.trim() || isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="ml-3 rounded-lg border border-amber-300/60 px-3 py-1 text-xs text-amber-200 hover:bg-amber-300/10 disabled:opacity-50 disabled:cursor-not-allowed font-mono transition-colors"
      >
        {isLoading ? 'Scanning...' : 'Evaluate →'}
      </motion.button>
    </motion.form>
  );
};


