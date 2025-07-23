// Utility functions for managing Mall Map pulse notifications

export const triggerMallMapPulse = () => {
  try {
    // Clear the last visit timestamps to trigger pulse
    localStorage.removeItem('retailstar_last_lore_visit');
    localStorage.removeItem('retailstar_last_domain_check');
    
    // Force a page reload to trigger the pulse
    window.location.reload();
  } catch (error) {
    console.error('Error triggering mall map pulse:', error);
  }
};

export const markContentAsSeen = () => {
  try {
    localStorage.setItem('retailstar_last_lore_visit', new Date().toISOString());
    localStorage.setItem('retailstar_last_domain_check', new Date().toISOString());
  } catch (error) {
    console.error('Error marking content as seen:', error);
  }
};

export const resetPulseState = () => {
  try {
    localStorage.removeItem('retailstar_last_lore_visit');
    localStorage.removeItem('retailstar_last_domain_check');
  } catch (error) {
    console.error('Error resetting pulse state:', error);
  }
};

// For testing purposes
export const simulateNewContent = () => {
  try {
    // Set timestamps to old dates to simulate new content
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 7); // 7 days ago
    
    localStorage.setItem('retailstar_last_lore_visit', oldDate.toISOString());
    localStorage.setItem('retailstar_last_domain_check', oldDate.toISOString());
    
    console.log('Simulated new content - pulse should appear on next page load');
  } catch (error) {
    console.error('Error simulating new content:', error);
  }
};

// Check if pulse should be shown
export const shouldShowPulse = (): boolean => {
  try {
    const lastLoreVisit = localStorage.getItem('retailstar_last_lore_visit');
    const lastDomainCheck = localStorage.getItem('retailstar_last_domain_check');
    
    if (!lastLoreVisit || !lastDomainCheck) {
      return true; // Show pulse if no timestamps exist
    }
    
    const lastVisit = new Date(lastLoreVisit);
    const lastCheck = new Date(lastDomainCheck);
    const now = new Date();
    
    const daysSinceLoreVisit = (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24);
    const daysSinceDomainCheck = (now.getTime() - lastCheck.getTime()) / (1000 * 60 * 60 * 24);
    
    return daysSinceLoreVisit > 3 || daysSinceDomainCheck > 1;
  } catch (error) {
    console.error('Error checking pulse state:', error);
    return false;
  }
}; 