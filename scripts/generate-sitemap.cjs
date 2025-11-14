const fs = require("fs");
const path = require("path");

// Import your domain data (assumes default export)
const domainModule = require("../src/data/domains");
const domains = domainModule.default || domainModule.domains || domainModule;

// Import blog posts data - handle TypeScript module using dynamic import
let blogPosts = [];

async function loadBlogPosts() {
  try {
    // Use tsx to load TypeScript file - requires tsx to be available
    const { execSync } = require("child_process");
    const blogPostsPath = path.resolve(__dirname, "../src/data/blogPosts.ts");
    
    // Read the file and extract blogPosts array using a simple approach
    const fileContent = fs.readFileSync(blogPostsPath, "utf-8");
    
    // Use a regex to find the blogPosts array export
    // This is a simple parser that works for the current structure
    const exportMatch = fileContent.match(/export\s+const\s+blogPosts[^=]*=\s*\[([\s\S]*?)\];/);
    
    if (exportMatch) {
      // Count the number of slug entries to determine post count
      const slugMatches = fileContent.match(/slug:\s*['"]([^'"]+)['"]/g);
      if (slugMatches) {
        blogPosts = slugMatches.map(match => {
          const slug = match.match(/['"]([^'"]+)['"]/)[1];
          // Extract publishedAt for lastmod
          const postSection = fileContent.split(`slug: '${slug}'`)[1]?.split(/},\s*{/)[0] || "";
          const publishedMatch = postSection.match(/publishedAt:\s*['"]([^'"]+)['"]/);
          const updatedMatch = postSection.match(/updatedAt:\s*['"]([^'"]+)['"]/);
          
          return {
            slug: slug,
            publishedAt: publishedMatch ? publishedMatch[1] : null,
            updatedAt: updatedMatch ? updatedMatch[1] : null,
          };
        });
        console.log(`✅ Loaded ${blogPosts.length} blog posts from file`);
      }
    }
  } catch (error) {
    console.log("⚠️  Blog posts module not found, using empty array");
    console.log("Error:", error.message);
    blogPosts = [];
  }
}

// Run the async function and then continue
loadBlogPosts().then(() => {
  runSitemapGeneration();
}).catch(err => {
  console.error("Error loading blog posts:", err);
  runSitemapGeneration();
});

function runSitemapGeneration() {
  // Validate the import:
  if (!Array.isArray(domains)) {
    console.error("❌ 'domains' is not an array. Value:", domains);
    process.exit(1);
  }

  const baseUrl = "https://retailstar.xyz";

  const staticRoutes = [
    "/",
    "/app",
    "/catalog",
    "/marketplace",
    "/scavrack",
    "/vault",
    "/directory",
    "/wiki-directory",
    "/guide",
    "/insights",
    "/tools",
    "/tools/domain-tester",
    "/tools/archetype-quiz",
    "/tools/leaderboard",
    "/tools/meme-gen",
    "/outerring",
    "/terms",
    "/privacy",
    "/contact",
    "/basement",
    "/main-floor",
    "/blueprint-suites",
    "/rooftop-lounge",
    "/lore",
    "/retailpass",
    "/tiers",
    "/retail-tickets",
    "/upgrade",
    "/vote",
    "/merch-waitlist",
  ];

  function buildXml(routes, withDates = false) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    if (typeof route === "string") {
      return `  <url>
    <loc>${baseUrl}${route}</loc>
  </url>`;
    } else {
      // Route object with url and lastmod
      return `  <url>
    <loc>${baseUrl}${route.url}</loc>${route.lastmod ? `
    <lastmod>${route.lastmod}</lastmod>` : ""}
  </url>`;
    }
  })
  .join("\n")}
</urlset>`;
  }

  function writeFile(filename, content) {
    const fullPath = path.resolve(__dirname, `../public/${filename}`);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Wrote ${filename}`);
  }

  // Create static page sitemap
  writeFile("sitemap-static.xml", buildXml(staticRoutes));
  console.log(`✅ Generated static sitemap with ${staticRoutes.length} routes`);

  // Create all wiki pages
  const wikiRoutes = domains.map((d) => `/wiki/${d.slug}`);
  writeFile("sitemap-wiki.xml", buildXml(wikiRoutes));

  // Create vaulted-only pages
  const vaultedRoutes = domains.filter((d) => d.vaulted).map((d) => `/wiki/${d.slug}`);
  writeFile("sitemap-vaulted.xml", buildXml(vaultedRoutes));

  // Create blog posts sitemap with lastmod dates
  const blogRoutes = blogPosts.map((post) => ({
    url: `/insights/${post.slug}`,
    lastmod: post.updatedAt || post.publishedAt || new Date().toISOString().split("T")[0],
  }));
  writeFile("sitemap-blog.xml", buildXml(blogRoutes));
  console.log(`✅ Generated sitemap with ${blogPosts.length} blog posts`);

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
} 