import React from 'react';
import { Helmet } from 'react-helmet-async';
import RetailTicketsDashboard from '../components/RetailTicketsDashboard';
import SEOHead from '../components/SEOHead';

const RetailTickets = () => {
  // Mock wallet - replace with actual connected wallet later
  const wallet = "7vswd...kzS9";

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Helmet>
        <title>Retail Tickets • Rewards & Mall Upgrades • Retailstar Mall</title>
        <meta
          name="description"
          content="Learn how Retail Tickets enhance your Retailstar Mall experience with perks and upgrades."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://retailstar.xyz/retail-tickets" />
      </Helmet>
      <SEOHead
        target="retailstar.sol"
        pageType="tickets"
        customTitle="Retail Tickets | Retailstar.sol - Gamified Rewards Dashboard"
        customDescription="Earn tickets, spin the wheel, and claim exclusive rewards. Your gateway to Retailstar merch, discounts, and mystery drops."
        customKeywords="retail tickets, rewards, spin wheel, gamification, retailstar merch, discounts"
        imageUrl="https://retailstar.sol/assets/rs-logo.png"
        canonicalUrl="https://retailstar.sol/retail-tickets"
        ogImage="https://retailstar.sol/assets/rs-logo.png"
        twitterImage="https://retailstar.sol/assets/rs-logo.png"
      />
      
      <main className="min-h-screen bg-zinc-950 text-white relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-cyan-400">Retail Tickets</h1>
          
          <section className="static-seo-content px-4 mb-6">
            <p>
              The Retail Tickets page explains the gamified reward system used throughout Retailstar Mall. This page describes how users earn tickets through various activities within the marketplace, such as purchasing Solana domains, exploring the directory, or participating in community events. The system tracks user engagement and rewards participation with tickets that can be redeemed for exclusive benefits. This gamification approach encourages continued interaction with the cyberpunk marketplace.
            </p>
            <p>
              The page outlines how Retail Tickets function as a loyalty program for the Web3 marketplace. Users can accumulate tickets through different actions and redeem them for merchandise, discounts, or special rewards. The system creates additional value for users who actively engage with Retailstar Mall's domain marketplace and community features. This reward mechanism enhances the overall experience of navigating the Solana ecosystem through the Retailverse platform.
            </p>
          </section>
          
          <section className="prose prose-invert mb-10 px-4">
            <p>
              Retail Tickets are the gamified reward system that powers engagement across Retailstar Mall, transforming how builders and degens interact with our cyberpunk marketplace. These tickets unlock exclusive rewards, discounts, and experiences within the Solana ecosystem, creating a Web3-native loyalty program that rewards participation in the Retailverse. Whether you're purchasing .sol domains, exploring the directory, or contributing to the community, Retail Tickets recognize your journey through the marketplace.
            </p>
            <p>
              The system works by tracking your activity across Retailstar Mall—every domain purchase, directory exploration, and community interaction earns tickets that can be redeemed for merch, discounts, and mystery drops. This gamification layer enhances the mall experience by creating tangible value for engagement, making the cyberpunk marketplace more rewarding for both casual browsers and dedicated builders. Retail Tickets represent Retailstar Mall's commitment to building a thriving Solana ecosystem where participation is recognized and rewarded.
            </p>
          </section>
        </div>
        
        <RetailTicketsDashboard wallet={wallet} />
        
        {/* See Also Section */}
        <section className="mt-16 border-t pt-8 text-sm opacity-80 px-4 max-w-4xl mx-auto pb-8">
          <h3 className="font-medium mb-3">Explore More</h3>
          <ul className="space-y-1">
            <li><a href="/domains" className="text-sky-400 hover:underline">Domains</a></li>
            <li><a href="/directory" className="text-sky-400 hover:underline">Directory</a></li>
            <li><a href="/lore" className="text-sky-400 hover:underline">Lore</a></li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default RetailTickets; 