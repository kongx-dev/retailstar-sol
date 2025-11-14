import React from 'react';

interface CommandPillProps {
  command: string;
  onClick?: (command: string) => void;
}

export default function CommandPill({ command, onClick }: CommandPillProps) {
  return (
    <button
      onClick={() => onClick?.(command)}
      className="bg-zinc-800 hover:bg-zinc-700 text-cyan-300 font-mono px-2 py-1 rounded-md text-sm transition-colors cursor-pointer inline-block mr-2"
    >
      {command}
    </button>
  );
}
