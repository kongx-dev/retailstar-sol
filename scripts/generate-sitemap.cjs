const fs = require("fs");
const path = require("path");

// Load domain data from JSON file (fallback local data, not Supabase)
let domains = [];
try {
  const domainsJsonPath = path.resolve(__dirname, "../src/data/domains.json");
  const domainsJson = JSON.parse(fs.readFileSync(domainsJsonPath, "utf-8"));
  domains = domainsJson.domains || [];
  console.log(`✅ Loaded ${domains.length} domains from domains.json`);
} catch (error) {
  console.error("❌ Error loading domains.json:", error.message);
  process.exit(1);
}

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
  // Validate domains array
  if (!Array.isArray(domains) || domains.length === 0) {
    console.error("❌ 'domains' is not a valid array or is empty");
    process.exit(1);
  }

  const baseUrl = "https://retailstar.xyz";
  const BLOG_BASE_PATH = "/insights";
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  // Only include real public SEO pages
  const staticRoutes = [
    "/",
    "/directory",
    "/domains",
    "/insights",
    "/contact",
    "/lore",
    "/terms",
    "/privacy",
    "/tools",
    "/tools/appraisal",
    "/tools/meme-gen",
    "/tools/leaderboard",
  ];

  function buildXml(routes) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    if (typeof route === "string") {
      // Simple string route - use current date
      return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    } else {
      // Route object with url, lastmod, and optional changefreq/priority
      const lastmod = route.lastmod || currentDate;
      const changefreq = route.changefreq || "weekly";
      const priority = route.priority || "0.8";
      return `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
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

  // Domains that have actual wiki content (from WikiPage.jsx getLoreContent function)
  const domainsWithWikiContent = [
    "jpegdealer",
    "jumpsetradio",
    "biggestofbrains",
    "retailverse",
    "fudscience",
    "copevendor",
    "commandhub",
  ];

  // Create static page sitemap
  const staticRoutesWithDates = staticRoutes.map((route) => ({
    url: route,
    lastmod: currentDate,
    changefreq: route === "/" ? "weekly" : route === "/lore" || route === "/terms" || route === "/privacy" ? "monthly" : "weekly",
    priority: route === "/" ? "1.0" : "0.8",
  }));
  writeFile("sitemap-static.xml", buildXml(staticRoutesWithDates));
  console.log(`✅ Generated static sitemap with ${staticRoutes.length} routes`);

  // Create all wiki pages (all domains from domains.json)
  const wikiRoutes = domains.map((d) => ({
    url: `/wiki/${d.slug}`,
    lastmod: currentDate,
    changefreq: "weekly",
    priority: "0.8",
  }));
  writeFile("sitemap-wiki.xml", buildXml(wikiRoutes));
  console.log(`✅ Generated wiki sitemap with ${wikiRoutes.length} pages`);

  // Create vaulted-only pages - only include vaulted domains that have wiki content
  const vaultedRoutes = domains
    .filter((d) => {
      // Must be vaulted
      if (!d.vaulted) return false;
      // Must have wiki content (either hasLore flag or in domainsWithWikiContent list)
      return d.hasLore === true || domainsWithWikiContent.includes(d.slug);
    })
    .map((d) => ({
      url: `/wiki/${d.slug}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.8",
    }));
  writeFile("sitemap-vaulted.xml", buildXml(vaultedRoutes));
  console.log(`✅ Generated vaulted sitemap with ${vaultedRoutes.length} pages (only with wiki content)`);

  // Create insights posts sitemap with lastmod dates
  const blogRoutes = blogPosts.map((post) => {
    // Format date properly (convert ISO to YYYY-MM-DD if needed)
    let lastmod = post.updatedAt || post.publishedAt || currentDate;
    if (lastmod.includes("T")) {
      lastmod = lastmod.split("T")[0];
    }
    return {
      url: `${BLOG_BASE_PATH}/${post.slug}`,
      lastmod: lastmod,
      changefreq: "weekly",
      priority: "0.8",
    };
  });
  writeFile("sitemap-insights.xml", buildXml(blogRoutes));
  console.log(`✅ Generated insights sitemap with ${blogPosts.length} posts`);

  // Create sitemap index (only 4 sitemaps, no sitemap-domains.xml)
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-static.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-insights.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-wiki.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-vaulted.xml</loc>
  </sitemap>
</sitemapindex>`;

  writeFile("sitemap-index.xml", sitemapIndex);
  console.log("✅ Generated sitemap-index.xml");
} 