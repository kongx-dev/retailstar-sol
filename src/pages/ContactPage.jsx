import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Retailstar • Support, Partnerships & Inquiries • Retailstar Mall</title>
        <meta
          name="description"
          content="Get support, request partnerships, or contact the Retailstar Mall team."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://retailstar.xyz/contact" />
      </Helmet>
      <SEOHead 
        target="retailstar.sol"
        pageType="contact"
        customTitle="Contact Us | Retailstar"
        customDescription="Get in touch with Retailstar. Contact us for support, partnerships, or general inquiries about the Retailverse."
        customKeywords="contact, retailstar, support, inquiry, retailverse"
        canonicalUrl="https://retailstar.xyz/contact"
      />
      
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-gray-900 rounded-lg p-8 shadow-2xl">
            <h1 className="text-4xl font-bold mb-6 text-center text-cyan-400">Contact Us</h1>
            
            <section className="static-seo-content">
              <p>
                The contact page provides information for users who need to reach Retailstar Mall for support, partnerships, or general inquiries. This page serves as the primary communication hub for the cyberpunk marketplace, connecting visitors with the team behind the Solana domain platform. Users can find contact information including email addresses and social media links to get assistance with domain purchases, technical questions, or business opportunities.
              </p>
              <p>
                The page explains how Retailstar Mall handles customer support for its marketplace of Solana domains. It outlines the types of inquiries the team can assist with, from account issues to domain-related questions. The contact page also details partnership opportunities for those interested in collaborating with the Retailverse ecosystem. This resource helps users navigate the Web3 marketplace and understand how to engage with the Retailstar Mall community.
              </p>
            </section>
            
            <section className="prose prose-invert mb-10">
              <p>
                Welcome to Retailstar Mall, the cyberpunk marketplace where Solana domains come alive. Whether you're a builder crafting the next Web3 innovation or a degen navigating the Solana ecosystem, we're here to help you thrive in the Retailverse. Our support team understands the unique challenges of working with .sol domains and the Web3 landscape, offering guidance on domain purchases, technical integrations, and marketplace navigation.
              </p>
              <p>
                Beyond support, we're always seeking partnerships that strengthen the Retailstar Mall community. If you're building tools, launching projects, or creating content that aligns with our cyberpunk marketplace vision, let's collaborate. From strategic partnerships to community initiatives, we believe in growing the Solana ecosystem together. Reach out to discuss how we can support your journey through the neon-lit corridors of the Retailverse.
              </p>
            </section>
            
            <div className="prose prose-invert max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Get in Touch</h2>
                <p className="mb-4">
                  For general inquiries, support, or partnerships, please reach out to us:
                </p>
                <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-6 mb-6">
                  <p className="mb-2">
                    <strong className="text-cyan-400">Email:</strong>{' '}
                    <a 
                      href="mailto:contact@retailstar.xyz" 
                      className="text-sky-400 hover:underline"
                    >
                      contact@retailstar.xyz
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong className="text-cyan-400">Twitter:</strong>{' '}
                    <a 
                      href="https://twitter.com/retailstarsol" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:underline"
                    >
                      @retailstarsol
                    </a>
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Support</h2>
                <p className="mb-4">
                  Need help with your domain purchase, account, or technical issues? Our support team is here to help.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Partnerships</h2>
                <p className="mb-4">
                  Interested in partnering with Retailstar? We're always looking for collaborations that benefit the Retailverse community.
                </p>
              </div>
            </div>

            {/* See Also Section */}
            <section className="mt-16 border-t pt-8 text-sm opacity-80">
              <h3 className="font-medium mb-3">Explore More</h3>
              <ul className="space-y-1">
                <li><a href="/lore" className="text-sky-400 hover:underline">Lore</a></li>
                <li><a href="/domains" className="text-sky-400 hover:underline">Domains</a></li>
                <li><a href="/retail-tickets" className="text-sky-400 hover:underline">Retail Tickets</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

