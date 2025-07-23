import React from 'react';

interface SNSRedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName?: string;
}

export default function SNSRedirectModal({ isOpen, onClose, domainName }: SNSRedirectModalProps) {
  const handleRedirect = () => {
    window.open('https://www.sns.id/account/E3cwMaukbBs9PDxwziqL9DWXVLbF35y9y5x3hE21EebU', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-cyan-500/30 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-2">🛍️ Domain Purchase</h3>
          <p className="text-gray-300 text-sm">
            Redirecting to SNS to complete your purchase...
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-green-400 mb-2">📋 Instructions:</h4>
            <ol className="text-sm text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Use the search bar to find <strong className="text-white">{domainName || 'your domain'}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>Look for domains with the <strong className="text-white">RS icon</strong> (Retailstar profile)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Domains with matching icons are likely <strong className="text-green-400">for sale</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">4.</span>
                <span>Especially check <strong className="text-yellow-400">Scav Rack</strong> domains for deals</span>
              </li>
            </ol>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
            <p className="text-sm text-blue-300">
              💡 <strong>Pro tip:</strong> Domains with the Retailstar profile icon are managed by our team and available for purchase.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRedirect}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200"
          >
            🚀 Go to SNS
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg font-semibold transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 