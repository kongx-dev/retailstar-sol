#!/usr/bin/env node
/**
 * Generate runtime-config.js from environment variables
 * This allows injecting config at runtime without rebuilding
 */

const fs = require('fs');
const path = require('path');

const config = {
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://your-project.supabase.co',
  VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'your-anon-key',
  VITE_SOLANA_RPC_URL: process.env.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  VITE_SOLANA_NETWORK: process.env.VITE_SOLANA_NETWORK || 'mainnet-beta'
};

const configContent = `// Runtime configuration file
// This file is generated at runtime from environment variables
// DO NOT EDIT MANUALLY - it will be overwritten
window.__RUNTIME_CONFIG__ = ${JSON.stringify(config, null, 2)};
`;

// Try multiple output paths (for different contexts)
const possiblePaths = [
  path.resolve(__dirname, '../public/runtime-config.js'),
  path.resolve(__dirname, '../dist/runtime-config.js'),
  '/tmp/public/runtime-config.js',
  '/usr/share/nginx/html/runtime-config.js'
];

let outputPath = possiblePaths[0];
for (const testPath of possiblePaths) {
  const dir = path.dirname(testPath);
  try {
    if (fs.existsSync(dir) || dir === '/tmp/public' || dir === '/usr/share/nginx/html') {
      // Create directory if it doesn't exist (for /tmp/public)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      outputPath = testPath;
      break;
    }
  } catch (e) {
    // Continue to next path
  }
}
fs.writeFileSync(outputPath, configContent, 'utf8');

// Also write to nginx html directory if it exists (for Docker)
if (fs.existsSync('/usr/share/nginx/html')) {
  try {
    fs.writeFileSync('/usr/share/nginx/html/runtime-config.js', configContent, 'utf8');
    console.log('✅ Also wrote to /usr/share/nginx/html/runtime-config.js');
  } catch (e) {
    // Ignore if we can't write there (permissions, etc.)
  }
}

console.log('✅ Generated runtime-config.js at:', outputPath);
console.log('   VITE_SUPABASE_URL:', config.VITE_SUPABASE_URL.substring(0, 30) + '...');
console.log('   VITE_SUPABASE_ANON_KEY:', config.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing');

