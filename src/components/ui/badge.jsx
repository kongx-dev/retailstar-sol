export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-200 border border-zinc-600 ${className}`}
    >
      {children}
    </span>
  );
} 