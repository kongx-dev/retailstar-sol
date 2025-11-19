import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DomainPage from './pages/DomainPage';
import VaultPage from './pages/VaultPage';
import WikiPage from './pages/WikiPage';
import WikiDirectoryPage from './pages/WikiDirectoryPage';
import MallDirectoryPage from './pages/MallDirectoryPage';
import DirectoryDepartmentPage from './pages/DirectoryDepartmentPage';
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
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactPage from './pages/ContactPage';
import RetailTickets from './pages/RetailTickets';
import OuterRingPage from './pages/OuterRingPage';
import MerchWaitlist from './pages/MerchWaitlist';
import RetailTicketsBadge from './components/RetailTicketsBadge';
import InsightsPage from './pages/InsightsPage';
import InsightArticlePage from './pages/InsightArticlePage';
import MemeDomainBlog from './pages/MemeDomainBlog';
import ToolsIndexPage from './pages/tools/ToolsIndexPage';
import DomainTesterPage from './pages/tools/DomainTesterPage';
import ArchetypeQuizPage from './pages/tools/ArchetypeQuizPage';
import LeaderboardPage from './pages/tools/LeaderboardPage';
import MemeGeneratorPage from './pages/tools/MemeGeneratorPage';
import AppraisalTool from './pages/tools/AppraisalTool';
import { StatusLight } from './components/StatusLight';
import { checkForEasterEggs } from './utils/retailrunnerPersonality';
import MallLayout from './components/MallLayout';
import TiersPage from './pages/TiersPage';
import SalesToastStream from './components/SalesToastStream';
// Floor Pages
import BasementPage from './pages/floors/BasementPage';
import MainFloorPage from './pages/floors/MainFloorPage';
import BlueprintSuitesPage from './pages/floors/BlueprintSuitesPage';
import RooftopLoungePage from './pages/floors/RooftopLoungePage';
// Collection Pages
import MemeSolPage from './pages/collections/MemeSolPage';
import CyberpunkSolPage from './pages/collections/CyberpunkSolPage';
import BrandReadySolPage from './pages/collections/BrandReadySolPage';
import PremiumVaultPage from './pages/collections/PremiumVaultPage';
import ShortSolPage from './pages/collections/ShortSolPage';
import EmojiSolPage from './pages/collections/EmojiSolPage';
import AiTechPage from './pages/collections/AiTechPage';
import DefiPage from './pages/collections/DefiPage';
import GamingPage from './pages/collections/GamingPage';
import DegenPage from './pages/collections/DegenPage';
import DaoPage from './pages/collections/DaoPage';
import CreatorPage from './pages/collections/CreatorPage';
import AestheticPage from './pages/collections/AestheticPage';
import LoreCollectionPage from './pages/collections/LorePage';
import ScavDropPage from './pages/collections/ScavDropPage';
// import AudioZone from './components/AudioZone';
// import AudioToggle from './components/AudioToggle';

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
        
        {/* Floating Retail Tickets Badge - Shows on all pages */}
        <RetailTicketsBadge />
        
        {/* Zone Audio System - Disabled */}
        {/* <AudioZone />
        <AudioToggle /> */}
        
        <Routes>
          {/* SEO redirect: /catalog to /domains */}
          <Route path="/catalog" element={<Navigate to="/domains" replace />} />
          
          {/* Home page outside mall layout */}
          <Route path="/" element={<HomePage />} />
          <Route path="/app" element={<RetailstarAppHome />} />
          <Route path="/outerring" element={<OuterRingPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Floor Pages - Outside MallLayout for custom styling */}
          <Route path="/basement" element={<BasementPage />} />
          <Route path="/main-floor" element={<MainFloorPage />} />
          <Route path="/blueprint-suites" element={<BlueprintSuitesPage />} />
          <Route path="/rooftop-lounge" element={<RooftopLoungePage />} />
          
          {/* Mall layout routes - redistributed across floors */}
          <Route element={<MallLayout />}>
            {/* Basement routes - accessible to all */}
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/scavrack" element={<ScavRack />} />
            <Route path="/domains/:slug" element={<DomainPage />} />
            <Route path="/checkout/:slug" element={<Checkout />} />
            
            {/* Main Floor routes - require domain purchase */}
            <Route path="/domains" element={<ScavRack />} />
            <Route path="/directory" element={<MallDirectoryPage />} />
            <Route path="/directory/dept/:deptSlug" element={<DirectoryDepartmentPage />} />
            <Route path="/wiki-directory" element={<WikiDirectoryPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/wiki/:slug" element={<WikiPage />} />
            <Route path="/vault" element={<VaultPage />} />
            <Route path="/upgrade" element={<UpgradePage />} />
            <Route path="/vote" element={<VotePage />} />
            <Route path="/airtable-domains" element={<DomainList />} />
            <Route path="/lore" element={<LorePage />} />
            <Route path="/retailpass" element={<RetailpassPage />} />
            <Route path="/tiers" element={<TiersPage />} />
            <Route path="/retail-tickets" element={<RetailTickets />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightArticlePage />} />
            <Route path="/tools" element={<ToolsIndexPage />} />
            <Route path="/tools/domain-tester" element={<DomainTesterPage />} />
            <Route path="/tools/archetype-quiz" element={<ArchetypeQuizPage />} />
            <Route path="/tools/leaderboard" element={<LeaderboardPage />} />
            <Route path="/tools/meme-gen" element={<MemeGeneratorPage />} />
            <Route path="/tools/appraisal" element={<AppraisalTool />} />
            
            {/* Blueprint Suites routes - require WifHoodie NFT */}
            <Route path="/merch-waitlist" element={<MerchWaitlist />} />
            
            {/* Collection Pages */}
            <Route path="/meme-sol-domains" element={<MemeSolPage />} />
            <Route path="/cyberpunk-sol-domains" element={<CyberpunkSolPage />} />
            <Route path="/brand-ready-sol-domains" element={<BrandReadySolPage />} />
            <Route path="/premium-vault" element={<PremiumVaultPage />} />
            <Route path="/short-sol-domains" element={<ShortSolPage />} />
            <Route path="/emoji-sol-domains" element={<EmojiSolPage />} />
            <Route path="/ai-tech-domains" element={<AiTechPage />} />
            <Route path="/defi-domains" element={<DefiPage />} />
            <Route path="/gaming-domains" element={<GamingPage />} />
            <Route path="/degen-domains" element={<DegenPage />} />
            <Route path="/dao-domains" element={<DaoPage />} />
            <Route path="/creator-domains" element={<CreatorPage />} />
            <Route path="/aesthetic-domains" element={<AestheticPage />} />
            <Route path="/lore-domains" element={<LoreCollectionPage />} />
            <Route path="/scav-drop" element={<ScavDropPage />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
