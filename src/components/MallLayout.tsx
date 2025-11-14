import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MallSidebar from './MallSidebar';
import RetailrunnerWidget from './RetailrunnerWidget';

export default function MallLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // For demo purposes, use a mock wallet address
  const walletAddress = "7vswd...fE9s"; // Mock wallet - replace with actual wallet connection later

  return (
    <div className="flex min-h-screen bg-[#11151c] text-white font-sans">
      {/* Sidebar Navigation */}
      <MallSidebar 
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />
      
      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 px-4 py-8 ${
        sidebarCollapsed ? 'ml-12' : 'ml-0 md:ml-64'
      }`}>
        <Outlet />
      </main>

      {/* Floating Retailrunner Widget */}
      <RetailrunnerWidget wallet={walletAddress} />
    </div>
  );
} 