import React, { useEffect } from 'react';
import { useRetailAccess } from '../hooks/useRetailAccess';
import { useNavigate } from 'react-router-dom';

interface MallAccessGuardProps {
  children: any;
}

export default function MallAccessGuard({ children }: MallAccessGuardProps) {
  // For demo purposes, use a mock wallet address
  const walletAddress = "7vswd...fE9s"; // Mock wallet - replace with actual wallet connection later
  const access = useRetailAccess(walletAddress);
  const navigate = useNavigate();

  useEffect(() => {
    if (!access.loading) {
      if (!walletAddress) {
        // No wallet connected - redirect to outer ring
        navigate('/outerring');
        return;
      }

      if (!access.hasAccess) {
        // No access - redirect to retailpass page
        navigate('/retailpass');
        return;
      }
    }
  }, [access, walletAddress, navigate]);

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
  if (!walletAddress || !access.hasAccess) {
    return null;
  }

  // User has access - render children
  return <>{children}</>;
} 