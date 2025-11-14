import React from 'react';

interface DomainLoadingSkeletonProps {
  count?: number;
  className?: string;
}

export default function DomainLoadingSkeleton({ 
  count = 6, 
  className = '' 
}: DomainLoadingSkeletonProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border border-pink-600 rounded-md relative overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-full h-32 bg-gray-700"></div>
          
          {/* Content skeleton */}
          <div className="p-4 space-y-2">
            {/* Domain name skeleton */}
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            
            {/* Category skeleton */}
            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
            
            {/* Tags skeleton */}
            <div className="flex gap-1 mt-2">
              <div className="h-5 bg-gray-600 rounded w-16"></div>
              <div className="h-5 bg-gray-600 rounded w-20"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="mt-3 h-8 bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Specialized skeleton for marketplace cards
export function MarketplaceCardSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-48 bg-slate-800/50 rounded-xl animate-pulse border border-slate-700"
        >
          <div className="p-6 space-y-4">
            <div className="w-16 h-16 bg-gray-600 rounded-lg mx-auto"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-600 rounded w-3/4 mx-auto"></div>
              <div className="h-3 bg-gray-600 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="h-8 bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Specialized skeleton for offer tiles
export function OfferTileSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-32 bg-slate-800/50 rounded-lg animate-pulse border border-slate-700"
        >
          <div className="p-4 space-y-2">
            <div className="w-12 h-12 bg-gray-600 rounded-lg mx-auto"></div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-600 rounded w-3/4 mx-auto"></div>
              <div className="h-2 bg-gray-600 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="h-6 bg-gray-600 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}







