import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import LoreModal from '../components/LoreModal';

export default function LorePage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    // Redirect to directory page when modal is closed
    window.history.back();
  };

  return (
    <>
      <SEOHead
        target="retailstar.sol"
        pageType="lore"
        customTitle="Retailstar Lore | The Complete Origin Story"
        customDescription="Discover the complete Retailstar origin story - from Scav Rack chaos to mall evolution. Read all 8 chapters of the Retailverse lore."
        customKeywords="Retailstar lore, origin story, Scav Rack, mall evolution, Retailverse history"
        imageUrl="https://retailstar.xyz/assets/rs-og-card.png"
        canonicalUrl="https://retailstar.xyz/lore"
        ogImage="https://retailstar.xyz/assets/rs-og-card.png"
        twitterImage="https://retailstar.xyz/assets/rs-og-card.png"
      />
      
      {/* Show modal immediately */}
      <LoreModal 
        isOpen={isModalOpen} 
        onClose={handleClose} 
      />
    </>
  );
} 