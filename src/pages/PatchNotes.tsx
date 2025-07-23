import React, { useEffect, useState } from 'react';
import { AnimatedPatch, PatchNote } from '../components/AnimatedPatch';
import { StatusLight } from '../components/StatusLight';

export default function PatchNotes() {
  const [notes, setNotes] = useState<PatchNote[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    import('../data/patchNotes.json')
      .then((data) => {
        setNotes(data.default);
        setLoaded(true);
      });
  }, []);

  // Example: Replace with real user tier logic
  const userTier = 'Hoodieguard';
  const visibleNotes = notes.filter((n: PatchNote) => !n.restricted || userTier === 'Hoodieguard');

  if (!loaded) return <div className="font-mono p-6 text-green-400">Booting terminal...</div>;

  return (
    <div className="relative min-h-screen bg-black font-mono text-green-400 p-6">
      <StatusLight status="green" />
      <h1 className="mb-4 text-2xl text-white">Retailstar Terminal Log — Patch Notes</h1>
      {visibleNotes.map((note, i) => (
        <AnimatedPatch key={i} note={note} delay={i * 250} />
      ))}
    </div>
  );
} 