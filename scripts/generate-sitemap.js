const fs = require("fs");
const path = require("path");

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

const wikiRoutes = domains.map((domain) => `/wiki/${domain.slug}`);

const allRoutes = [...staticRoutes, ...wikiRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync(path.resolve(__dirname, "../public/sitemap.xml"), xml);
console.log("✅ Sitemap updated at public/sitemap.xml");
