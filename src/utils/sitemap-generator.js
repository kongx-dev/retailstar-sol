// 🚀 RETAILSTAR.SOL — SITEMAP GENERATOR
//
// This utility generates XML sitemaps for SEO optimization
// Based on the keyword dataset and domain structure

import { keywordMap } from '../data/seo-keywords';

export const generateSitemapXML = () => {
  const baseUrl = 'https://retailstar.sol';
  const currentDate = new Date().toISOString();
  
  // Get unique targets from keyword map
  const uniqueTargets = [...new Set(keywordMap.map(item => item.target))];
  
  // Generate sitemap entries
  const sitemapEntries = [
    // Main pages
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/domains`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/directory`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/vault`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/catalog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: `${baseUrl}/upgrade`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/vote`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: `${baseUrl}/acquisition-levels`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    }
  ];
  
  // Add domain-specific pages based on keywords
  uniqueTargets.forEach(target => {
    const domainKeywords = keywordMap.filter(item => item.target === target);
    
    // Add main domain page
    sitemapEntries.push({
      url: `${baseUrl}/domains/${target.replace('.sol', '')}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    });
    
    // Add keyword-specific pages
    domainKeywords.forEach(keyword => {
      if (keyword.use_case.includes('page') || keyword.use_case.includes('blog')) {
        const pageSlug = keyword.keyword
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-');
        
        sitemapEntries.push({
          url: `${baseUrl}/domains/${target.replace('.sol', '')}/${pageSlug}`,
          lastmod: currentDate,
          changefreq: 'monthly',
          priority: '0.6'
        });
      }
    });
  });
  
  // Generate XML
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';
  
  const urlEntries = sitemapEntries.map(entry => {
    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  }).join('\n');
  
  return `${xmlHeader}
${urlsetOpen}
${urlEntries}
${urlsetClose}`;
};

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://retailstar.sol/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /private/

# Allow all other content
Allow: /domains/
Allow: /directory/
Allow: /vault/
Allow: /catalog/
Allow: /upgrade/
Allow: /vote/
Allow: /acquisition-levels/`;
};

export const generateKeywordSitemap = () => {
  const baseUrl = 'https://retailstar.sol';
  const currentDate = new Date().toISOString();
  
  // Group keywords by target
  const keywordsByTarget = {};
  keywordMap.forEach(item => {
    if (!keywordsByTarget[item.target]) {
      keywordsByTarget[item.target] = [];
    }
    keywordsByTarget[item.target].push(item);
  });
  
  // Generate keyword-specific sitemap entries
  const keywordEntries = [];
  
  Object.entries(keywordsByTarget).forEach(([target, keywords]) => {
    const domainSlug = target.replace('.sol', '');
    
    keywords.forEach(keyword => {
      const pageSlug = keyword.keyword
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      
      keywordEntries.push({
        url: `${baseUrl}/domains/${domainSlug}/${pageSlug}`,
        lastmod: currentDate,
        changefreq: 'monthly',
        priority: '0.6',
        keyword: keyword.keyword,
        persona: keyword.persona,
        intent: keyword.intent
      });
    });
  });
  
  return keywordEntries;
};

// Export for use in build process
export const generateAllSitemaps = () => {
  return {
    mainSitemap: generateSitemapXML(),
    robotsTxt: generateRobotsTxt(),
    keywordSitemap: generateKeywordSitemap()
  };
}; 