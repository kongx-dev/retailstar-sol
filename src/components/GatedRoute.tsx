import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRetailAccess } from '../hooks/useRetailAccess';

interface GatedRouteProps {
  children: React.ReactNode;
  wallet?: string | null;
  fallbackRoute?: string;
}

export default function GatedRoute({ 
  children, 
  wallet, 
  fallbackRoute = '/outerring' 
}: GatedRouteProps) {
  const navigate = useNavigate();
  const access = useRetailAccess(wallet);

  useEffect(() => {
    if (!access.loading) {
      if (!wallet) {
        // No wallet connected - redirect to fallback
        navigate(fallbackRoute);
        return;
      }

      if (!access.hasAccess) {
        // No access - redirect to fallback
        navigate(fallbackRoute);
        return;
      }
    }
  }, [access, wallet, navigate, fallbackRoute]);

  // Show loading while checking access
  if (access.loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 font-semibold">Checking mall access...</p>
        </div>
      </div>
    );
  }

  // If no access, don't render children (redirect will happen)
  if (!wallet || !access.hasAccess) {
    return null;
  }

  // User has access - render children
  return <>{children}</>;
}
