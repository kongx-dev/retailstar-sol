import React from 'react';

interface LoreSectionProps {
  title: string;
  body: string;
}

export const LoreSection: React.FC<LoreSectionProps> = ({ title, body }) => {
  return (
    <section className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-6">
      <h2 className="text-2xl font-semibold text-zinc-100 mb-4">{title}</h2>
      <div className="prose prose-invert max-w-none">
        <p className="text-zinc-300 leading-relaxed whitespace-pre-line">{body}</p>
      </div>
    </section>
  );
};

