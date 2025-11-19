import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface CollectionFAQProps {
  items: FAQItem[];
}

export const CollectionFAQ: React.FC<CollectionFAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Frequently Asked Questions</h2>
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-zinc-800 bg-zinc-950/50 overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-zinc-900/50 transition-colors"
          >
            <span className="font-medium text-zinc-100">{item.question}</span>
            <span className="text-zinc-400 text-xl">
              {openIndex === index ? '−' : '+'}
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 border-t border-zinc-800">
              <p className="text-zinc-300 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

