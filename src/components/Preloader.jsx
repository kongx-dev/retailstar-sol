import { useEffect, useState } from "react";

const loadingSteps = [
  "Initializing Retailverse Node…",
  "Verifying Solana Assets...",
  "Authenticating Buyer Wallet..."
];

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState(0);
  const [bar, setBar] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Animate steps
  useEffect(() => {
    if (loaded) return;
    const stepTimer = setInterval(() => {
      setStep((s) => (s + 1) % loadingSteps.length);
    }, 1100);
    return () => clearInterval(stepTimer);
  }, [loaded]);

  // Animate loading bar
  useEffect(() => {
    if (loaded) return;
    const barTimer = setInterval(() => {
      setBar((b) => (b + 1) % 6);
    }, 220);
    return () => clearInterval(barTimer);
  }, [loaded]);

  if (loaded) return null;

  // Loading bar blocks
  const blocks = Array.from({ length: 5 }, (_, i) =>
    <span key={i} className={
      i <= bar ? "text-cyan-400" : "text-neutral-700"
    }>
      {i <= bar ? "█" : "░"}
    </span>
  );

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50 font-mono relative overflow-hidden">
      {/* SCANLINES OVERLAY */}
      <div className="scanlines absolute inset-0" />

      <div className="text-5xl mb-4 font-black tracking-widest cyberpunk-glitch animate-pulse z-10">
        RS<span className="text-cyan-400 drop-shadow-[0_0_10px_#0ff] neon-pulse">⭐</span>
      </div>
      <div className="text-sm text-neutral-400 mb-2 animate-flicker z-10">
        {loadingSteps[step]}
      </div>
      <div className="text-xs text-neutral-600 flex gap-1 mb-2 animate-flicker z-10">
        {blocks}
      </div>
      <div className="text-[10px] text-neutral-800 tracking-widest opacity-60 z-10">nginx</div>
    </div>
  );
} 