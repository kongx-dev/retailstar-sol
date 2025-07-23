import { useState, useEffect } from 'react';

export function useMallMapPulse() {
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    // Check for new content indicators
    const checkForNewContent = () => {
      try {
        // Check if user has seen recent lore updates
        const lastLoreVisit = localStorage.getItem('retailstar_last_lore_visit');
        const lastVisit = lastLoreVisit ? new Date(lastLoreVisit) : new Date(0);
        const now = new Date();
        const daysSinceVisit = (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24);

        // Show pulse if user hasn't visited lore in 3+ days
        if (daysSinceVisit > 3) {
          setShowPulse(true);
        }

        // Check for new domain additions (example logic)
        const lastDomainCheck = localStorage.getItem('retailstar_last_domain_check');
        const lastCheck = lastDomainCheck ? new Date(lastDomainCheck) : new Date(0);
        const daysSinceDomainCheck = (now.getTime() - lastCheck.getTime()) / (1000 * 60 * 60 * 24);

        // Show pulse if new domains might be available
        if (daysSinceDomainCheck > 1) {
          setShowPulse(true);
        }
      } catch (error) {
        console.error('Error checking for new content:', error);
      }
    };

    // Check immediately
    checkForNewContent();

    // Check every hour
    const interval = setInterval(checkForNewContent, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const markAsSeen = () => {
    setShowPulse(false);
    try {
      localStorage.setItem('retailstar_last_lore_visit', new Date().toISOString());
      localStorage.setItem('retailstar_last_domain_check', new Date().toISOString());
    } catch (error) {
      console.error('Error marking content as seen:', error);
    }
  };

  return { showPulse, markAsSeen };
} 