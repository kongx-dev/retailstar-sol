export default function FloorBadge({ level }: { level: number }) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-900/40 border border-cyan-500/40 text-cyan-300 text-xs tracking-wide shadow-lg shadow-cyan-500/10 backdrop-blur-md">
      <span className="mr-1">🟦</span>
      Level {level} • Premium Suites
    </div>
  );
}

