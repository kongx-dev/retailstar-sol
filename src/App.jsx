import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DomainsPage from './pages/DomainsPage';
import DomainPage from './pages/DomainPage';
import VaultPage from './pages/VaultPage';
import WikiPage from './pages/WikiPage';
import MallDirectoryPage from './pages/MallDirectoryPage';
import FixersCatalogPage from './pages/FixersCatalogPage';
import HomePage from './pages/HomePage';
import AcquisitionLevelsPage from './pages/AcquisitionLevelsPage';
import UpgradePage from './pages/UpgradePage';
import VotePage from './pages/VotePage';
import RetailstarAppHome from './components/RetailstarAppHome';
import MarketplacePage from './pages/MarketplacePage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<RetailstarAppHome />} />
          <Route path="/acquisition-levels" element={<AcquisitionLevelsPage />} />
          <Route path="/domains" element={<DomainsPage />} />
          <Route path="/domains/:slug" element={<WikiPage />} />
          <Route path="/wiki/:slug" element={<WikiPage />} />
          <Route path="/directory" element={<MallDirectoryPage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/catalog" element={<FixersCatalogPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
