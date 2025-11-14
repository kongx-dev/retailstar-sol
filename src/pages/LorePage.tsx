import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Retailstar Lore • Cyberpunk Mall Universe • Retailstar Mall</title>
        <meta
          name="description"
          content="Learn the backstory and evolving universe behind the Retailstar cyberpunk Solana mall."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://retailstar.xyz/lore" />
      </Helmet>
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
      
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-cyan-400">Retailstar Lore</h1>
          
          <section className="static-seo-content px-4 mb-6">
            <p>
              The Retailstar Lore page presents the complete origin story and background narrative of the Retailverse marketplace. This page contains the foundational story that explains how Retailstar Mall evolved from its initial concept into a thriving cyberpunk marketplace for Solana domains. The lore provides context for the marketplace's structure, domain categories, and overall aesthetic. Readers can explore multiple chapters that detail different aspects of the Retailverse universe.
            </p>
            <p>
              The lore section helps users understand the thematic foundation behind Retailstar Mall's organization and design. It explains the cyberpunk marketplace concept and how it relates to the Solana ecosystem. The stories provide background on why certain domains are categorized in specific ways and how the marketplace economy functions. This narrative content enriches the user experience by providing deeper context about the Web3 marketplace and its place in the Solana domain ecosystem.
            </p>
          </section>
          
          <section className="prose prose-invert mb-10 px-4">
            <p>
              The Retailstar universe emerged from the chaotic energy of Solana's underlayer, where every .sol domain tells a story in our cyberpunk marketplace. This lore isn't just background narrative—it's the foundation that shapes how domains are categorized, how the mall operates, and why builders and degens choose to make Retailstar Mall their home in the Web3 ecosystem. The cyberpunk-mall aesthetic reflects the raw, unfiltered energy of the Solana ecosystem, where innovation meets underground culture.
            </p>
            <p>
              From the Scav Rack's humble beginnings to the gated floors of the Retailverse, each chapter reveals how the marketplace evolved into a thriving hub for Solana domains. The lore explains why certain domains belong in specific categories, how the mall's economy functions, and what makes Retailstar Mall unique in the Web3 landscape. Understanding this story helps you navigate the cyberpunk marketplace with purpose, whether you're building your first .sol storefront or exploring the deeper connections between domains in the Solana ecosystem.
            </p>
          </section>
        </div>
      </div>
      
      {/* Show modal immediately */}
      <LoreModal 
        isOpen={isModalOpen} 
        onClose={handleClose} 
      />

      {/* See Also Section */}
      <section className="mt-16 border-t pt-8 text-sm opacity-80 px-4 max-w-4xl mx-auto">
        <h3 className="font-medium mb-3">Explore More</h3>
        <ul className="space-y-1">
          <li><a href="/directory" className="text-sky-400 hover:underline">Directory</a></li>
          <li><a href="/retail-tickets" className="text-sky-400 hover:underline">Retail Tickets</a></li>
          <li><a href="/domains" className="text-sky-400 hover:underline">Domains</a></li>
        </ul>
      </section>
    </>
  );
} 