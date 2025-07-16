// retailstar-sync-check.ts
// Run this in Cursor or Node.js environment

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY; // Add to .env or insert directly if local
const BASE_ID = 'your_base_id_here';
const TABLE_NAME = 'Retailstar Domains';

const headers = {
  Authorization: `Bearer ${AIRTABLE_API_KEY}`,
};

// Fetch all domain records from Airtable
async function fetchDomains() {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;
  const result = await axios.get(url, { headers });
  return result.data.records;
}

// Check if a URL returns HTTP 200
async function checkURLStatus(url) {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    return response.status;
  } catch (err) {
    return null;
  }
}

// Generate the sync report and write as Markdown
async function generateSyncReport() {
  const records = await fetchDomains();
  const report = {
    liveAndLinked: [],
    linkedButUnreachable: [],
    flaggedMismatch: [],
  };

  for (const record of records) {
    const fields = record.fields;
    const domain = fields['Domain Name'];
    const liveURL = fields['Live URL'];
    const appearsOnSite = fields['Appears on Site?'];
    const storefront = fields['Storefront Type'];
    const siteLinked = fields['Site Linked?'];

    let urlStatus = null;
    if (siteLinked && liveURL) {
      urlStatus = await checkURLStatus(liveURL);
    }

    // Status logic
    if (siteLinked && urlStatus === 200) {
      report.liveAndLinked.push(domain);
    } else if (siteLinked && urlStatus !== 200) {
      report.linkedButUnreachable.push({ domain, liveURL, urlStatus });
    }

    if (["Main Catalog", "Quick Snag", "Flash Rack"].includes(storefront) && !appearsOnSite) {
      report.flaggedMismatch.push(domain);
    }
  }

  // Markdown output
  const md = [
    `# 🧾 Retailstar Sync Report`,
    '',
    `## ✅ Live and Linked`,
    report.liveAndLinked.length ? report.liveAndLinked.map(d => `- ${d}`).join('\n') : '_None_',
    '',
    `## ❌ Linked but Unreachable`,
    report.linkedButUnreachable.length
      ? report.linkedButUnreachable.map(r => `- ${r.domain} (${r.liveURL}) [Status: ${r.urlStatus}]`).join('\n')
      : '_None_',
    '',
    `## ⚠️ Appears on Site Mismatch`,
    report.flaggedMismatch.length ? report.flaggedMismatch.map(d => `- ${d}`).join('\n') : '_None_',
    '',
  ].join('\n');

  const outPath = path.resolve(process.cwd(), 'retailstar-sync-report.md');
  fs.writeFileSync(outPath, md, 'utf-8');

  console.log("🧾 Retailstar Sync Report written to retailstar-sync-report.md");
  console.log("✅ Live and Linked:", report.liveAndLinked);
  console.log("❌ Linked but Unreachable:", report.linkedButUnreachable);
  console.log("⚠️ Appears on Site Mismatch:", report.flaggedMismatch);
}

generateSyncReport(); 