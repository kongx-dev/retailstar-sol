import React, { useEffect, useState } from "react";
import DomainCard from "../components/marketplace/DomainCard";
import VaultedList from "../components/marketplace/VaultedList";

export default function MarketplacePage() {
  const [domains, setDomains] = useState([]);
  const [fadingOut, setFadingOut] = useState([]);
  const [vaulted, setVaulted] = useState([]);
  const [showVaulted, setShowVaulted] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRotation() {
      setLoading(true);
      try {
        const res = await fetch("/api/rotation/daily");
        const data = await res.json();
        setDomains(data);
      } catch (err) {
        console.error("Failed to fetch daily rotation:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRotation();
  }, []);

  const handleExpire = (idxToRemove) => {
    setFadingOut((prev) => [...prev, idxToRemove]);
    setTimeout(() => {
      setDomains((prev) => {
        const removed = prev[idxToRemove];
        setVaulted((v) => [...v, { ...removed, vaulted: true }]);
        return prev.filter((_, i) => i !== idxToRemove);
      });
      setFadingOut((prev) => prev.filter((i) => i !== idxToRemove));
    }, 700);
  };

  const handlePurchase = (domainName) => {
    alert(`Successfully purchased ${domainName}`);
    setVaulted((prev) => prev.filter((d) => d.name !== domainName));
  };

  const handleView = (domainName) => {
    alert(`Viewing ${domainName}`); // Replace with modal or navigation
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Retailstar Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-48 bg-zinc-800 rounded-2xl animate-pulse border border-zinc-700"
              ></div>
            ))
          : domains.map((domain, idx) => (
              <DomainCard
                key={domain.name + idx}
                domain={domain}
                faded={fadingOut.includes(idx)}
                isVaulted={false}
                onExpire={() => handleExpire(idx)}
                onPurchase={handlePurchase}
                onView={handleView}
              />
            ))}
      </div>
      <VaultedList
        vaulted={vaulted}
        showVaulted={showVaulted}
        toggleShowVaulted={() => setShowVaulted((prev) => !prev)}
        onPurchase={handlePurchase}
      />
    </div>
  );
} 