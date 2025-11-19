import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import FloorBadge from '../../components/FloorBadge';
import PremiumCard from '../../components/PremiumCard';
import RooftopConsole from '../../components/RooftopConsole';
import RooftopAccessPanel from '../../components/RooftopAccessPanel';
import rooftopBg from '../../assets/rooftop.png';

export default function RooftopLoungePage() {
  const navigate = useNavigate();
  
  // Mock value - this would come from hooks/state in a real implementation
  const daoMember = true;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${rooftopBg})` }}
    >
      <div className="backdrop-blur-sm bg-black/40 min-h-screen p-8">
        <SEOHead 
          target="rooftop-lounge.retailstar.sol"
          pageType="floor"
          customTitle="Rooftop Lounge - DAO Elite Tier | Retailstar Mall"
          customDescription="Velvet Nexus — a DAO-only rooftop nightclub above Retailstar Mall. Neon chrome bar, velvet booths, private DAO talks, and late-night founder lore."
          customKeywords="velvet nexus, rooftop nightclub, dao membership, vip access, cyberpunk lounge, solana mall, elite tier"
        />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-xl mb-1">
            Rooftop Lounge
          </h1>
          <p className="text-sm text-white/70 mb-2">
            The Velvet Nexus — DAO-only nightclub above the mall.
          </p>
          <FloorBadge level={3} />
        </div>

        {/* Rooftop Console */}
        <div className="mb-10">
          <RooftopConsole dao={daoMember} level="Elite Tier" />
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Lounge Info */}
          <PremiumCard
            title="Velvet Nexus Amenities"
            icon="🍸"
            description="A velvet-lit cyberpunk rooftop club reserved for DAO members and high-tier holders."
          >
            <ul className="text-sm text-white/70 space-y-2">
              <li>✔ Velvet VIP booths with skyline views</li>
              <li>✔ Private DAO huddles and late-night strategy talks</li>
              <li>✔ Curated founder lore sessions and alpha drops</li>
              <li>✔ Quiet corners for high-tier dealmaking</li>
            </ul>
          </PremiumCard>

          {/* Membership Status */}
          <RooftopAccessPanel dao={daoMember} />

        </div>

        {/* Footer CTA */}
        <div className="mt-12 flex justify-center">
          <button
            className="px-10 py-3 rounded-lg bg-purple-600 bg-opacity-80 hover:bg-purple-700 font-semibold text-white shadow-lg shadow-purple-600/40 transition-all"
            onClick={() => navigate('/directory')}
          >
            Descend to Mall Directory
          </button>
        </div>

      </div>
    </div>
  );
}


