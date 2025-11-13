import React from 'react';
import Badge from './badge';

// Status Badge Components
export function AvailableBadge() {
  return (
    <Badge className="bg-green-600 text-green-100 border-green-500">
      🟢 Available
    </Badge>
  );
}

export function VaultedBadge() {
  return (
    <Badge className="bg-gray-600 text-gray-100 border-gray-500">
      🔒 Vaulted
    </Badge>
  );
}

export function FeaturedBadge() {
  return (
    <Badge className="bg-yellow-600 text-yellow-100 border-yellow-500 animate-pulse">
      ⭐ Featured
    </Badge>
  );
}

export function BuildBadge() {
  return (
    <Badge className="bg-indigo-600 text-indigo-100 border-indigo-500">
      🛠 Build
    </Badge>
  );
}

export function PFPBadge() {
  return (
    <Badge className="bg-purple-600 text-purple-100 border-purple-500">
      🧢 PFP
    </Badge>
  );
}

export function ScavRackBadge() {
  return (
    <Badge className="bg-teal-600 text-teal-100 border-teal-500">
      🎭 Scav Rack
    </Badge>
  );
}

export function MarketplaceBadge() {
  return (
    <Badge className="bg-cyan-600 text-cyan-100 border-cyan-500">
      🛍 Marketplace
    </Badge>
  );
}

// Main Status Badges Component
interface StatusBadgesProps {
  domain: {
    featured?: boolean;
    vaulted?: boolean;
    listed?: boolean;
    has_build?: boolean;
    has_pfp?: boolean;
    category?: string;
  };
  showCategory?: boolean;
}

export default function StatusBadges({ domain, showCategory = false }: StatusBadgesProps) {
  const badges = [];

  // Status badges
  if (domain.featured) badges.push(<FeaturedBadge key="featured" />);
  if (domain.vaulted) badges.push(<VaultedBadge key="vaulted" />);
  if (domain.listed) badges.push(<AvailableBadge key="available" />);
  if (domain.has_build) badges.push(<BuildBadge key="build" />);
  if (domain.has_pfp) badges.push(<PFPBadge key="pfp" />);

  // Category badges (optional)
  if (showCategory) {
    if (domain.category === 'scavrack' || domain.category === 'scav') {
      badges.push(<ScavRackBadge key="scavrack" />);
    } else if (domain.category === 'marketplace') {
      badges.push(<MarketplaceBadge key="marketplace" />);
    }
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mb-2">
      {badges}
    </div>
  );
}




