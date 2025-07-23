import React, { useEffect, useState } from 'react';

export interface PatchNote {
  date: string;
  type: string;
  message: string;
  impact: string;
  lore: string;
  restricted?: boolean;
}

export function AnimatedPatch({ note, delay }: { note: PatchNote; delay: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="mb-6">
      <p className="text-gray-500 text-sm">
        {note.date} — <span className="text-yellow-300">{note.type}</span>
      </p>
      <p className="mt-1">{`> ${note.message}`}</p>
      <p className="mt-1 text-sm">{`> Impact: ${note.impact}`}</p>
      <p className="mt-1 italic text-green-500">{`> Lore: ${note.lore}`}</p>
    </div>
  );
} 