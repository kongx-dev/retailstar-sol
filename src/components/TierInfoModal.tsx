import React from 'react';

interface TierInfoModalProps {
  tier: string;
  title: string;
  description: string;
  onClose: () => void;
}

const borderColors: Record<string, string> = {
  'vaulted-premium': 'border-purple-500',
  'blueprint-tier': 'border-blue-400',
  'quick-snag': 'border-green-400',
  'flash-rack': 'border-yellow-400',
};

const TierInfoModal: React.FC<TierInfoModalProps> = ({
  tier,
  title,
  description,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className={`bg-zinc-900 text-white p-6 rounded-xl w-full max-w-sm border-2 ${borderColors[tier]} shadow-xl relative`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-lg hover:text-zinc-300"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-zinc-300">{description}</p>
      </div>
    </div>
  );
};

export default TierInfoModal; 