import React from 'react';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';

export default function TermsOfServicePage() {
  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="terms"
        customTitle="Terms of Service | Retailstar"
        customDescription="Terms of Service for Retailstar - the Solana-powered multiverse of domains, marketplace, and tools."
        customKeywords="terms of service, retailstar, solana domains, legal terms"
        canonicalUrl="https://retailstar.xyz/terms"
      />
      
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-gray-900 rounded-lg p-8 shadow-2xl">
            <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>
            <p className="text-gray-400 text-center mb-8 italic">Last updated: October 23, 2025</p>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">
                Welcome to <strong>Retailstar</strong>. By accessing or using our website (https://retailstar.xyz) and related services ("Services"), you agree to be bound by these Terms of Service.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-6">
                By using our Services, you confirm that you are at least 13 years old and legally permitted to use our platform. If you do not agree to these terms, please do not use the Services.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Services</h2>
              <p className="mb-4">You may access our marketplace, tools, and bots for personal or business use. You agree not to:</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Use our site for harmful or malicious purposes</li>
                <li>Attempt to reverse engineer or disrupt our systems</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Accounts and Wallets</h2>
              <p className="mb-6">
                Some features may require wallet authentication or third-party social login (e.g., Google, X/Twitter). You are responsible for maintaining control of your connected wallet and account.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
              <p className="mb-6">
                All content, including branding, tools, bots (e.g., Retailrunner), and design elements, are owned or licensed by Retailstar. You may not copy or reuse them without permission.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Third-Party Services</h2>
              <p className="mb-6">
                We may integrate with third-party services (e.g., Supabase, Google, X/Twitter). Their terms and privacy policies apply in those cases.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
              <p className="mb-6">
                We may suspend or terminate your access if you violate these terms, abuse the system, or act in bad faith.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes</h2>
              <p className="mb-6">
                We reserve the right to update these Terms. Any changes will be posted here with an updated revision date.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact</h2>
              <p className="mb-6">
                If you have questions about these Terms, contact us at{' '}
                <a 
                  href="mailto:contact@retailstar.xyz" 
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  contact@retailstar.xyz
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
