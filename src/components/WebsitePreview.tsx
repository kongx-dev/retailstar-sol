import React, { useState } from 'react';

interface WebsitePreviewProps {
  websiteUrl: string;
  domainName: string;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ websiteUrl, domainName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="mt-12 border-t border-gray-700 pt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-cyan-400">
          🌐 Live Website Preview
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
        >
          {isExpanded ? '🔼 Collapse' : '🔽 Expand'}
        </button>
      </div>
      
      <p className="text-gray-300 mb-4">
        Experience the live website for <strong>{domainName}.sol</strong> - click to interact with the full site.
      </p>

      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-[80vh]' : 'max-h-[400px]'
      }`}>
        <div className="relative bg-black border border-gray-600 rounded-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
                <p className="text-gray-300">Loading {domainName}.sol...</p>
              </div>
            </div>
          )}
          
          <iframe
            src={websiteUrl}
            className="w-full h-[400px] border-0"
            title={`${domainName}.sol website preview`}
            onLoad={handleIframeLoad}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
          />
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
          >
            🔗 Open in New Tab
          </a>
          <span className="text-sm text-gray-400">
            Powered by {websiteUrl}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WebsitePreview;
