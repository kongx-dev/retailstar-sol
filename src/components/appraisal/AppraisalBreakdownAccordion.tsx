import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppraisalBreakdown } from '../../lib/appraisalEngine';

interface AppraisalBreakdownAccordionProps {
  breakdown: AppraisalBreakdown;
}

export const AppraisalBreakdownAccordion: React.FC<AppraisalBreakdownAccordionProps> = ({
  breakdown
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const sections = [
    {
      id: 'structure',
      title: 'Word Structure',
      content: (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Length:</span>
            <span className="text-amber-200">{breakdown.structure.length} characters</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Word Count:</span>
            <span className="text-amber-200">{breakdown.structure.wordCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Syllables:</span>
            <span className="text-amber-200">{breakdown.structure.syllables}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Dictionary Word:</span>
            <span className={breakdown.structure.isWord ? 'text-green-400' : 'text-red-400'}>
              {breakdown.structure.isWord ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Contains Numbers:</span>
            <span className={breakdown.structure.containsNumber ? 'text-red-400' : 'text-green-400'}>
              {breakdown.structure.containsNumber ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Contains Hyphens:</span>
            <span className={breakdown.structure.containsHyphen ? 'text-red-400' : 'text-green-400'}>
              {breakdown.structure.containsHyphen ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'rarity',
      title: 'Rarity Breakdown',
      content: (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Brand Score:</span>
            <span className="text-amber-200">{breakdown.rarity.brand}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Linguistic Score:</span>
            <span className="text-amber-200">{breakdown.rarity.linguistic}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Cleanliness:</span>
            <span className="text-amber-200">{breakdown.rarity.cleanlinessScore}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Length Value:</span>
            <span className="text-amber-200">{breakdown.rarity.lengthValue}/15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Semantic Value:</span>
            <span className="text-amber-200">{breakdown.rarity.semanticValue}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Use Case Score:</span>
            <span className="text-amber-200">{breakdown.rarity.useCaseScore}/5</span>
          </div>
        </div>
      )
    },
    {
      id: 'hype',
      title: 'Hype Indicators',
      content: (
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-400">Meme Boost:</span>
            <span className="text-purple-200 ml-2">{breakdown.hype.memeBoost}/30</span>
          </div>
          <div>
            <span className="text-gray-400">Hype Boost:</span>
            <span className="text-cyan-200 ml-2">{breakdown.hype.hypeBoost}/10</span>
          </div>
          {breakdown.hype.culturalRelevance.length > 0 && (
            <div>
              <span className="text-gray-400">Cultural References:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {breakdown.hype.culturalRelevance.map((ref) => (
                  <span
                    key={ref}
                    className="px-2 py-1 rounded bg-purple-900/30 border border-purple-400/40 text-purple-200 text-xs"
                  >
                    {ref}
                  </span>
                ))}
              </div>
            </div>
          )}
          {breakdown.hype.slangMatches.length > 0 && (
            <div>
              <span className="text-gray-400">Slang Matches:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {breakdown.hype.slangMatches.map((slang) => (
                  <span
                    key={slang}
                    className="px-2 py-1 rounded bg-cyan-900/30 border border-cyan-400/40 text-cyan-200 text-xs"
                  >
                    {slang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'alerts',
      title: 'Alerts & Warnings',
      content: breakdown.alerts.length > 0 ? (
        <div className="space-y-2">
          {breakdown.alerts.map((alert, index) => (
            <div
              key={index}
              className="text-sm text-yellow-400 bg-yellow-900/20 border border-yellow-400/40 rounded p-2"
            >
              ⚠️ {alert}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-green-400">No warnings detected</div>
      )
    }
  ];

  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        return (
          <div
            key={section.id}
            className="bg-black/40 border border-amber-300/20 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-amber-900/10 transition-colors"
            >
              <span className="text-amber-200 font-semibold">{section.title}</span>
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-5 text-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3 border-t border-amber-300/10">
                    {section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

