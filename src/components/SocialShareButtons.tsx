import React, { useState } from 'react';

interface SocialShareButtonsProps {
  domainName: string;
  domainUrl: string;
  className?: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ 
  domainName, 
  domainUrl, 
  className = '' 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(domainUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleTwitterShare = () => {
    const text = `Just claimed ${domainName} from @RetailstarMall 🧃\n\n${domainUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={handleTwitterShare}
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold transition-colors flex items-center space-x-1"
      >
        <span>🐦</span>
        <span>Share on X</span>
      </button>
      
      <button
        onClick={handleCopyLink}
        className={`px-3 py-1 rounded text-sm font-semibold transition-colors flex items-center space-x-1 ${
          copied 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-600 hover:bg-gray-700 text-white'
        }`}
      >
        <span>{copied ? '✓' : '📋'}</span>
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  );
};

export default SocialShareButtons;










