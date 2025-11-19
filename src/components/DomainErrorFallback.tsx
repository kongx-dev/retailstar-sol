import React from 'react';

interface DomainErrorFallbackProps {
  error: string;
  onRetry?: () => void;
  className?: string;
}

export default function DomainErrorFallback({ 
  error, 
  onRetry, 
  className = '' 
}: DomainErrorFallbackProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-2xl font-bold text-red-500 mb-4">
        ⚠️ Failed to Load Domains
      </div>
      <div className="text-gray-400 mb-6 max-w-md mx-auto">
        {error || 'Unable to fetch domain data. Please check your connection and try again.'}
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-200"
        >
          🔄 Retry
        </button>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        If this problem persists, please contact support.
      </div>
    </div>
  );
}

// Specialized error fallback for marketplace
export function MarketplaceErrorFallback({ 
  error, 
  onRetry 
}: { 
  error: string; 
  onRetry?: () => void; 
}) {
  return (
    <div className="text-center py-12">
      <div className="text-2xl font-bold text-red-500 mb-4">
        🛍️ Marketplace Unavailable
      </div>
      <div className="text-gray-400 mb-6 max-w-md mx-auto">
        {error || 'Unable to load marketplace data. The mall is temporarily closed for maintenance.'}
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-200"
        >
          🔄 Refresh Marketplace
        </button>
      )}
    </div>
  );
}

// Specialized error fallback for scav rack
export function ScavRackErrorFallback({ 
  error, 
  onRetry 
}: { 
  error: string; 
  onRetry?: () => void; 
}) {
  return (
    <div className="text-center py-12">
      <div className="text-2xl font-bold text-red-500 mb-4">
        🟢 Scav Rack Offline
      </div>
      <div className="text-gray-400 mb-6 max-w-md mx-auto">
        {error || 'The scav rack is temporarily unavailable. Check back later for fresh drops.'}
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded-lg font-semibold transition-colors duration-200"
        >
          🔄 Reload Rack
        </button>
      )}
    </div>
  );
}

// Generic error boundary component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class DomainErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Domain Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <DomainErrorFallback 
          error={this.state.error?.message || 'An unexpected error occurred'}
          onRetry={() => this.setState({ hasError: false, error: undefined })}
        />
      );
    }

    return this.props.children;
  }
}














