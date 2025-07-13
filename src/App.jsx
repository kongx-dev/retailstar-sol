import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DomainsPage from './pages/DomainsPage';
import DomainPage from './pages/DomainPage';
import VaultPage from './pages/VaultPage';
import WikiPage from './pages/WikiPage';
import MallDirectoryPage from './pages/MallDirectoryPage';
import FixersCatalogPage from './pages/FixersCatalogPage';
import HomePage from './pages/HomePage';
import AcquisitionLevelsPage from './pages/AcquisitionLevelsPage';

function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/acquisition-levels" element={<AcquisitionLevelsPage />} />
        <Route path="/domains" element={<DomainsPage />} />
        <Route path="/domains/:slug" element={<WikiPage />} />
        <Route path="/wiki/:slug" element={<WikiPage />} />
        <Route path="/directory" element={<MallDirectoryPage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/catalog" element={<FixersCatalogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
