#!/usr/bin/env node

/**
 * Switch between dev and prod Convex environments
 * Usage: node scripts/switch-env.js [dev|prod]
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

const DEV_CONFIG = `# Production (ACTIVE):
CONVEX_DEPLOYMENT=dev:disciplined-quail-9 # team: bounteous, project: open-agent-builder-8ee92
NEXT_PUBLIC_CONVEX_URL=https://disciplined-quail-9.convex.cloud
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://disciplined-quail-9.convex.site/http/uploadFile`;

const PROD_CONFIG = `# Production (ACTIVE):
CONVEX_DEPLOYMENT=prod:sensible-ermine-579
NEXT_PUBLIC_CONVEX_URL=https://sensible-ermine-579.convex.cloud
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://sensible-ermine-579.convex.site/http/uploadFile`;

const target = process.argv[2];

if (!target || (target !== 'dev' && target !== 'prod')) {
  console.error('Usage: node scripts/switch-env.js [dev|prod]');
  process.exit(1);
}

try {
  // Read current .env.local
  let envContent = fs.readFileSync(envPath, 'utf8');

  // Replace the Convex configuration section
  const configRegex = /# Production \(ACTIVE\):[\s\S]*?NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https:\/\/[^\n]+/;

  const newConfig = target === 'dev' ? DEV_CONFIG : PROD_CONFIG;

  if (configRegex.test(envContent)) {
    envContent = envContent.replace(configRegex, newConfig);
  } else {
    console.error('Could not find Convex configuration section in .env.local');
    process.exit(1);
  }

  // Write back to file
  fs.writeFileSync(envPath, envContent, 'utf8');

  console.log('✅ Switched to', target.toUpperCase(), 'environment');
  console.log('');
  if (target === 'dev') {
    console.log('📦 Convex: disciplined-quail-9 (DEVELOPMENT)');
    console.log('🔗 URL: https://disciplined-quail-9.convex.cloud');
  } else {
    console.log('📦 Convex: sensible-ermine-579 (PRODUCTION)');
    console.log('🔗 URL: https://sensible-ermine-579.convex.cloud');
  }
  console.log('');
  console.log('⚠️  Please restart your dev server for changes to take effect:');
  console.log('   1. Stop the current server (Ctrl+C)');
  console.log('   2. Run: npm run dev');

} catch (error) {
  console.error('Error switching environment:', error.message);
  process.exit(1);
}
