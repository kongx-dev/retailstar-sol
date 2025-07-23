import React from 'react';

interface SNSRedirectModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
}

function SNSRedirectModal({ isOpen, onClose, domainName }: SNSRedirectModalProps) {
  if (!isOpen) return null;

  const handleSNSRedirect = () => {
    window.open('https://www.sns.id/account/E3cwMaukbBs9PDxwziqL9DWXVLbF35y9y5x3hE21EebU', '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-cyan-500/30 rounded-xl p-6 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-2">🛍️ Purchase {domainName}</h3>
          <p className="text-sm text-gray-400">You'll be redirected to SNS to complete your purchase</p>
        </div>
        
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-400 mb-3">📋 How to Purchase:</h4>
          <ol className="text-sm text-gray-300 space-y-2">
            <li>1. Click "Go to SNS" below</li>
            <li>2. Use the search bar to find <strong className="text-white">{domainName}</strong></li>
            <li>3. Look for domains with the <strong className="text-white">RS icon</strong></li>
            <li>4. Domains with matching icons are for sale</li>
            <li>5. Complete your purchase on SNS</li>
          </ol>
        </div>
        
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-400 mb-2">💡 Pro Tips:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Scav Rack domains are often the best deals</li>
            <li>• Check for domains with Retailstar profile icons</li>
            <li>• These are managed by our team</li>
            <li>• Upgrade to full builds anytime</li>
          </ul>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleSNSRedirect}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25"
          >
            🛒 Go to SNS
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SNSRedirectModal; 