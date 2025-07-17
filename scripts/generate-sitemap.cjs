const fs = require("fs");
const path = require("path");

// Import your domain data (assumes default export)
const domains = require("../src/data/domains").default;

const baseUrl = "https://retailstar.xyz";

const staticRoutes = [
  "/",
  "/catalog",
  "/marketplace",
  "/scavrack",
  "/vault",
  "/directory",
  "/guide",
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

// Create sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${baseUrl}/sitemap-static.xml</loc></sitemap>
  <sitemap><loc>${baseUrl}/sitemap-wiki.xml</loc></sitemap>
  <sitemap><loc>${baseUrl}/sitemap-vaulted.xml</loc></sitemap>
</sitemapindex>`;

writeFile("sitemap-index.xml", sitemapIndex); 