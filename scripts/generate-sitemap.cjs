const fs = require("fs");
const path = require("path");

// Import your domain data (assumes default export)
const domainModule = require("../src/data/domains");
const domains = domainModule.default || domainModule.domains || domainModule;

// Import blog posts data - handle TypeScript module
let blogPosts = [];
try {
  const blogPostsModule = require("../src/data/blogPosts");
  blogPosts = blogPostsModule.blogPosts || [];
} catch (error) {
  console.log("⚠️  Blog posts module not found, using empty array");
  blogPosts = [];
}

// Validate the import:
if (!Array.isArray(domains)) {
  console.error("❌ 'domains' is not an array. Value:", domains);
  process.exit(1);
}

const baseUrl = "https://retailstar.xyz";

const staticRoutes = [
  "/",
  "/catalog",
  "/marketplace",
  "/scavrack",
  "/vault",
  "/directory",
  "/guide",
  "/insights",
  "/tools",
  "/tools/domain-tester",
  "/tools/archetype-quiz",
  "/tools/leaderboard",
];

function buildXml(routes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
  </url>`
  )
  .join("")}
</urlset>`;
}

function writeFile(filename, content) {
  const fullPath = path.resolve(__dirname, `../public/${filename}`);
  fs.writeFileSync(fullPath, content);
  console.log(`✅ Wrote ${filename}`);
}

// Create static page sitemap
writeFile("sitemap-static.xml", buildXml(staticRoutes));

// Create all wiki pages
const wikiRoutes = domains.map((d) => `/wiki/${d.slug}`);
writeFile("sitemap-wiki.xml", buildXml(wikiRoutes));

// Create vaulted-only pages
const vaultedRoutes = domains.filter((d) => d.vaulted).map((d) => `/wiki/${d.slug}`);
writeFile("sitemap-vaulted.xml", buildXml(vaultedRoutes));

// Create blog posts sitemap
const blogRoutes = blogPosts.map((post) => `/insights/${post.slug}`);
writeFile("sitemap-blog.xml", buildXml(blogRoutes));

// Create domain pages sitemap
const domainRoutes = domains.map((d) => `/domains/${d.slug}`);
writeFile("sitemap-domains.xml", buildXml(domainRoutes));

// Create sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${baseUrl}/sitemap-static.xml</loc></sitemap>
  <sitemap><loc>${baseUrl}/sitemap-wiki.xml</loc></sitemap>
  <sitemap><loc>${baseUrl}/sitemap-vaulted.xml</loc></sitemap>
  <sitemap><loc>${baseUrl}/sitemap-blog.xml</loc></sitemap>
  <sitemap><loc>${baseUrl}/sitemap-domains.xml</loc></sitemap>
</sitemapindex>`;

writeFile("sitemap-index.xml", sitemapIndex); 