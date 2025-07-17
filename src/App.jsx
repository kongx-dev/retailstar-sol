import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DomainPage from './pages/DomainPage';
import VaultPage from './pages/VaultPage';
import WikiPage from './pages/WikiPage';
import MallDirectoryPage from './pages/MallDirectoryPage';
import Catalog from './pages/Catalog';
import HomePage from './pages/HomePage';
import UpgradePage from './pages/UpgradePage';
import VotePage from './pages/VotePage';
import RetailstarAppHome from './components/RetailstarAppHome';
import MarketplacePage from './pages/MarketplacePage';
import ScavRack from './pages/ScavRack';
import DomainList from './components/DomainList';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<RetailstarAppHome />} />
          <Route path="/domains" element={<Catalog />} />
          <Route path="/domains/:slug" element={<DomainPage />} />
          <Route path="/wiki/:slug" element={<WikiPage />} />
          <Route path="/directory" element={<MallDirectoryPage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/scavrack" element={<ScavRack />} />
          <Route path="/airtable-domains" element={<DomainList />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
