import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  generateMetaKeywords, 
  generateMetaDescription, 
  generatePageTitle, 
  generateJSONLD 
} from '../data/seo-keywords';

const defaultOGImage = "https://retailstar.xyz/assets/rs-og-card.png";
const SEOHead = ({ 
  target, 
  pageType = 'main', 
  customTitle, 
  customDescription, 
  customKeywords,
  imageUrl,
  canonicalUrl,
  ogImage,
  twitterImage,
  customSchema,
  additionalSchema
}) => {
  const title = customTitle || generatePageTitle(target, pageType);
  const description = customDescription || generateMetaDescription(target);
  const keywords = customKeywords || generateMetaKeywords(target);
  const jsonLd = customSchema || generateJSONLD(target);
  const domainName = target?.replace('.sol', '') || 'retailstar';
  const defaultImage = imageUrl || defaultOGImage;
  const ogImageUrl = ogImage || defaultImage;
  const twitterImageUrl = twitterImage || defaultImage;
  const defaultCanonical = canonicalUrl || `https://${target || 'retailstar.xyz'}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={defaultCanonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={defaultCanonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="Retailstar.sol" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImageUrl} />
      <meta name="twitter:site" content="@retailstarsol" />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Retailstar.sol" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Persona and Intent Signals for LLMs */}
      {target && (
        <>
          <meta name="audience" content="Solana NFT traders, web3 degens, builder bros, meme lords, dao dreamers, collector crew, game gurus, investor insiders" />
          <meta name="domain" content={target} />
          <meta name="ecosystem" content="Solana" />
          <meta name="category" content="Web3, NFT, Blockchain, DeFi" />
        </>
      )}
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {/* Additional Schema Objects */}
      {additionalSchema && additionalSchema.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      
      {/* Default Article Schema for non-main pages */}
      {pageType !== 'main' && !customSchema && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "author": {
              "@type": "Organization",
              "name": "Retailstar.sol"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Retailstar.sol",
              "url": "https://retailstar.sol"
            },
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": defaultCanonical
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead; 