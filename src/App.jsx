import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DomainPage from './pages/DomainPage';
import VaultPage from './pages/VaultPage';
import WikiPage from './pages/WikiPage';
import WikiDirectoryPage from './pages/WikiDirectoryPage';
import MallDirectoryPage from './pages/MallDirectoryPage';
import HomePage from './pages/HomePage';
import UpgradePage from './pages/UpgradePage';
import VotePage from './pages/VotePage';
import RetailstarAppHome from './components/RetailstarAppHome';
import MarketplacePage from './pages/MarketplacePage';
import ScavRack from './pages/ScavRack';
import DomainList from './components/DomainList';
import Checkout from './pages/Checkout';
import GuidePage from './pages/GuidePage';
import LorePage from './pages/LorePage';
import RetailpassPage from './pages/RetailpassPage';
import RetailTickets from './pages/RetailTickets';
import MerchWaitlist from './pages/MerchWaitlist';
import { StatusLight } from './components/StatusLight';
import { checkForEasterEggs } from './utils/retailrunnerPersonality';
import MallLayout from './components/MallLayout';
import TiersPage from './pages/TiersPage';
import SalesToastStream from './components/SalesToastStream';

function App() {
  // Global easter egg listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check for easter egg phrases in typed text
      const target = event.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const input = target;
        const value = input.value;
        const easterEgg = checkForEasterEggs(value);
        if (easterEgg) {
          // console.log('🎉 Easter egg detected:', easterEgg);
          // Could show a toast notification here
        }
      }
    };

    // Listen for input events
    document.addEventListener('input', handleKeyPress);
    
    return () => {
      document.removeEventListener('input', handleKeyPress);
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        {/* Status Light System */}
        <StatusLight />
        
        {/* Sales Toast Stream */}
        <SalesToastStream />
        
        <Routes>
          {/* Home page outside mall layout */}
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<RetailstarAppHome />} />
          
          {/* Mall layout routes */}
          <Route element={<MallLayout />}>
            <Route path="/domains" element={<ScavRack />} />
            <Route path="/domains/:slug" element={<DomainPage />} />
            <Route path="/wiki/:slug" element={<WikiPage />} />
            <Route path="/wiki-directory" element={<WikiDirectoryPage />} />
            <Route path="/directory" element={<MallDirectoryPage />} />
            <Route path="/vault" element={<VaultPage />} />
            <Route path="/upgrade" element={<UpgradePage />} />
            <Route path="/vote" element={<VotePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/scavrack" element={<ScavRack />} />
            <Route path="/airtable-domains" element={<DomainList />} />
            <Route path="/checkout/:slug" element={<Checkout />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/lore" element={<LorePage />} />
            <Route path="/retailpass" element={<RetailpassPage />} />
            <Route path="/tiers" element={<TiersPage />} />
            <Route path="/retail-tickets" element={<RetailTickets />} />
            <Route path="/merch-waitlist" element={<MerchWaitlist />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
