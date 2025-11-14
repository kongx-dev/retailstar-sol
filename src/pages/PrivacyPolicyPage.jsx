import React from 'react';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead 
        target="retailstar.sol"
        pageType="privacy"
        customTitle="Privacy Policy | Retailstar"
        customDescription="Privacy Policy for Retailstar - how we collect, use, and protect your data in the Solana-powered multiverse."
        customKeywords="privacy policy, retailstar, data protection, privacy rights"
        canonicalUrl="https://retailstar.xyz/privacy"
      />
      
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-gray-900 rounded-lg p-8 shadow-2xl">
            <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
            <p className="text-gray-400 text-center mb-8 italic">Last updated: October 23, 2025</p>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">
                We care about your privacy. This Privacy Policy outlines what data we collect, how we use it, and your rights when interacting with <strong>Retailstar</strong>.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect the following data:</p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>Wallet address (if you connect your crypto wallet)</li>
                <li>Social login data (e.g., Google, X/Twitter username, avatar)</li>
                <li>Email address (optional, if authorized)</li>
                <li>On-site interactions (e.g., meme generator usage, chat inputs)</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>To personalize your experience (e.g., wallet-linked features, dashboard content)</li>
                <li>To power bot interactions (e.g., Retailrunner suggestions)</li>
                <li>To send occasional updates if you opt in to email</li>
                <li>For analytics and site improvement</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing</h2>
              <p className="mb-6">
                We do <strong>not</strong> sell your data. Data may be shared with infrastructure providers (e.g., Supabase, Google) strictly to deliver core features.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Security</h2>
              <p className="mb-6">
                We use secure systems like Supabase Auth and JWT sessions. You are responsible for safeguarding your wallet and connected accounts.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
              <p className="mb-6">
                You may disconnect your wallet or unlink social logins at any time. You can request data deletion by emailing{' '}
                <a 
                  href="mailto:privacy@retailstar.xyz" 
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  privacy@retailstar.xyz
                </a>
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Updates</h2>
              <p className="mb-6">
                We may revise this Privacy Policy. Changes will be posted here with the date of last update.
              </p>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-center text-gray-400">
                  © 2025 Retailstar. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}
