import React from 'react';
import RetailTicketsDashboard from '../components/RetailTicketsDashboard';
import SEOHead from '../components/SEOHead';

const RetailTickets = () => {
  // Mock wallet - replace with actual connected wallet later
  const wallet = "7vswd...kzS9";

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SEOHead
        target="retailstar.sol"
        pageType="tickets"
        customTitle="Retail Tickets | Retailstar.sol - Gamified Rewards Dashboard"
        customDescription="Earn tickets, spin the wheel, and claim exclusive rewards. Your gateway to Retailstar merch, discounts, and mystery drops."
        customKeywords="retail tickets, rewards, spin wheel, gamification, retailstar merch, discounts"
        imageUrl="https://retailstar.sol/src/assets/rs-logo.png"
        canonicalUrl="https://retailstar.sol/retail-tickets"
        ogImage="https://retailstar.sol/src/assets/rs-logo.png"
        twitterImage="https://retailstar.sol/src/assets/rs-logo.png"
      />
      
      <main className="min-h-screen bg-zinc-950 text-white relative z-10">
        <RetailTicketsDashboard wallet={wallet} />
      </main>
    </div>
  );
};

export default RetailTickets; 