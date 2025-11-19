import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../../components/SEOHead';
import { AppraisalInputBar } from '../../components/appraisal/AppraisalInputBar';
import { AppraisalScorePanel } from '../../components/appraisal/AppraisalScorePanel';
import { AppraisalBreakdownAccordion } from '../../components/appraisal/AppraisalBreakdownAccordion';
import { AppraisalCard } from '../../components/appraisal/AppraisalCard';
import { appraiseSolDomain, AppraisalBreakdown } from '../../lib/appraisalEngine';
import { exportAppraisalCard } from '../../utils/appraisalCardExport';

const AppraisalTool: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [breakdown, setBreakdown] = useState<AppraisalBreakdown | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleAppraise = async () => {
    if (!domain.trim()) return;

    setIsLoading(true);
    setError(null);
    setBreakdown(null);

    try {
      // Simulate scanning delay for effect
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = appraiseSolDomain(domain);
      setBreakdown(result);
      setShowAdvanced(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to appraise domain');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCard = async () => {
    if (!breakdown) return;

    try {
      await exportAppraisalCard('appraisal-card', `${domain.replace(/\.sol$/i, '')}-appraisal.png`);
    } catch (err) {
      console.error('Failed to export card:', err);
      alert('Failed to export appraisal card. Please try again.');
    }
  };

  return (
    <>
      <SEOHead
        target="retailstar.sol"
        pageType="tool"
        customTitle="Solana Domain Appraisal Tool | Retailrunner Kiosk"
        customDescription="Free .sol domain appraisal tool. Get instant rarity breakdown, value estimates, and meme scores for any Solana domain. Appraised by Retailrunner."
        customKeywords="solana domain appraisal, .sol value tool, .sol domain worth, meme domain value, domain valuation tool, solana domain checker"
        canonicalUrl="https://retailstar.xyz/tools/appraisal"
      />

      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-purple-900/10 to-cyan-900/10"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='60' fill='%23181b20'/%3E%3Crect x='1' y='1' width='58' height='58' stroke='%2323272f' stroke-width='2' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}
        ></div>

        <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-amber-300/40 overflow-hidden">
                <img
                  src="/src/assets/Wifhoodie 631.png"
                  alt="Retailrunner"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                Retailrunner Appraisal Kiosk
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Submit any .sol domain for a full rarity breakdown. Get instant scores for brandability, meme potential, and market value.
            </p>
          </motion.div>

          {/* Input Module */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <AppraisalInputBar
              domain={domain}
              setDomain={setDomain}
              onSubmit={handleAppraise}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-900/20 border border-red-400/40 rounded-lg text-red-200"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="inline-block">
                  <div className="w-16 h-16 border-4 border-amber-300/30 border-t-amber-300 rounded-full animate-spin mb-4"></div>
                  <p className="text-amber-300 font-mono">Scanning domain...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Module */}
          <AnimatePresence>
            {breakdown && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <AppraisalScorePanel breakdown={breakdown} />

                {/* Advanced Breakdown Toggle */}
                <div className="text-center">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-amber-300 hover:text-amber-200 text-sm font-mono transition-colors"
                  >
                    {showAdvanced ? '▲ Hide' : '▼ Show'} Advanced Breakdown
                  </button>
                </div>

                {/* Advanced Section */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AppraisalBreakdownAccordion breakdown={breakdown} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Social Export */}
                <div className="flex flex-col items-center gap-4 pt-6 border-t border-amber-300/20">
                  <p className="text-gray-400 text-sm">Share your appraisal</p>
                  <button
                    onClick={handleExportCard}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Generate Appraisal Card
                  </button>
                </div>

                {/* Hidden card for export */}
                <div className="fixed -left-[9999px] top-0">
                  <AppraisalCard domain={domain.replace(/\.sol$/i, '')} breakdown={breakdown} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Section */}
          {!breakdown && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              <div className="bg-black/40 border border-amber-300/20 rounded-lg p-6">
                <h3 className="text-amber-300 font-bold mb-2">Brandability Score</h3>
                <p className="text-gray-300 text-sm">
                  Measures clean spelling, dictionary words, startup aesthetic, and professional appeal.
                </p>
              </div>
              <div className="bg-black/40 border border-purple-300/20 rounded-lg p-6">
                <h3 className="text-purple-300 font-bold mb-2">Meme Score</h3>
                <p className="text-gray-300 text-sm">
                  Evaluates cultural relevance, slang usage, and virality potential in crypto culture.
                </p>
              </div>
              <div className="bg-black/40 border border-cyan-300/20 rounded-lg p-6">
                <h3 className="text-cyan-300 font-bold mb-2">Value Score</h3>
                <p className="text-gray-300 text-sm">
                  Considers length rarity, semantic category value, and potential use cases.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppraisalTool;

