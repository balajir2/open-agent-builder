#!/usr/bin/env node

/**
 * Migration Script: Move API Keys from .env.local to Convex Environment
 *
 * This script reads API keys from .env.local and sets them in Convex
 * environment variables where they belong.
 *
 * Usage:
 *   node scripts/migrate-keys-to-convex.js          # Migrate to dev deployment
 *   node scripts/migrate-keys-to-convex.js --prod   # Migrate to production
 *   node scripts/migrate-keys-to-convex.js --dry-run # Preview without making changes
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(message) {
  log('\n' + '='.repeat(60), 'cyan');
  log(message, 'bright');
  log('='.repeat(60), 'cyan');
}

// Parse command line arguments
const args = process.argv.slice(2);
const isProd = args.includes('--prod');
const isDryRun = args.includes('--dry-run');

// Keys that should be migrated to Convex environment
const KEYS_TO_MIGRATE = [
  'ANTHROPIC_API_KEY',
  'OPENAI_API_KEY',
  'GROQ_API_KEY',
  'GOOGLE_API_KEY',
  'FIRECRAWL_API_KEY',
  'E2B_API_KEY',
  'TAVILY_API_KEY',
  'ENCRYPTION_KEY',
  'CLERK_JWT_ISSUER_DOMAIN',
  'LANGCHAIN_API_KEY',
  'LANGCHAIN_TRACING_V2',
  'LANGCHAIN_PROJECT',
  'LANGCHAIN_ENDPOINT',
];

// Keys that MUST stay in .env.local (Next.js needs them)
const KEYS_TO_KEEP = [
  'NEXT_PUBLIC_CONVEX_URL',
  'CONVEX_DEPLOYMENT',
  'NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'CLERK_JWT_ISSUER_DOMAIN', // Needed by both Next.js and Convex
];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    log(`❌ File not found: ${filePath}`, 'red');
    return {};
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  const lines = content.split('\n');

  for (const line of lines) {
    // Skip comments and empty lines
    if (!line.trim() || line.trim().startsWith('#')) {
      continue;
    }

    // Parse KEY=VALUE
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      env[key] = value;
    }
  }

  return env;
}

function maskKey(key) {
  if (!key || key.length < 10) return '***';
  return key.slice(0, 8) + '...' + key.slice(-4);
}

function setConvexEnv(key, value, isProd, isDryRun) {
  const prodFlag = isProd ? '--prod' : '';
  const command = `npx convex env set ${prodFlag} ${key} "${value}"`;

  if (isDryRun) {
    log(`  [DRY RUN] Would execute: npx convex env set ${prodFlag} ${key} "${maskKey(value)}"`, 'yellow');
    return true;
  }

  try {
    execSync(command, { stdio: 'pipe' });
    return true;
  } catch (error) {
    log(`  ❌ Failed to set ${key}: ${error.message}`, 'red');
    return false;
  }
}

function getCurrentConvexEnv(isProd) {
  const prodFlag = isProd ? '--prod' : '';
  try {
    const output = execSync(`npx convex env list ${prodFlag}`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });

    const env = {};
    const lines = output.split('\n');
    for (const line of lines) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        env[match[1].trim()] = match[2].trim();
      }
    }
    return env;
  } catch (error) {
    return {};
  }
}

async function main() {
  header('🚀 Convex Environment Migration Tool');

  log(`\nDeployment: ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'}`, 'bright');
  log(`Mode: ${isDryRun ? 'DRY RUN (no changes will be made)' : 'LIVE'}`, isDryRun ? 'yellow' : 'green');

  // Step 1: Read .env.local
  log('\n📖 Step 1: Reading .env.local...', 'cyan');
  const envLocalPath = path.join(process.cwd(), '.env.local');
  const envLocal = parseEnvFile(envLocalPath);

  if (Object.keys(envLocal).length === 0) {
    log('❌ No keys found in .env.local', 'red');
    process.exit(1);
  }

  log(`✅ Found ${Object.keys(envLocal).length} keys in .env.local`, 'green');

  // Step 2: Get current Convex environment
  log('\n📋 Step 2: Checking current Convex environment...', 'cyan');
  const currentConvexEnv = getCurrentConvexEnv(isProd);
  log(`✅ Current Convex has ${Object.keys(currentConvexEnv).length} keys`, 'green');

  // Step 3: Identify keys to migrate
  log('\n🔍 Step 3: Identifying keys to migrate...', 'cyan');
  const keysToMigrate = {};
  const keysAlreadySet = [];
  const keysMissing = [];

  for (const key of KEYS_TO_MIGRATE) {
    if (envLocal[key]) {
      if (currentConvexEnv[key]) {
        keysAlreadySet.push(key);
      } else {
        keysToMigrate[key] = envLocal[key];
      }
    } else {
      keysMissing.push(key);
    }
  }

  log(`\n📊 Migration Summary:`, 'bright');
  log(`  • Keys to migrate: ${Object.keys(keysToMigrate).length}`, 'green');
  log(`  • Keys already in Convex: ${keysAlreadySet.length}`, 'yellow');
  log(`  • Keys not found in .env.local: ${keysMissing.length}`, 'blue');

  if (keysAlreadySet.length > 0) {
    log('\n⚠️  Keys already in Convex (will be skipped):', 'yellow');
    keysAlreadySet.forEach(key => {
      log(`  • ${key}: ${maskKey(currentConvexEnv[key])}`, 'yellow');
    });
  }

  if (keysMissing.length > 0) {
    log('\n💡 Keys not found in .env.local:', 'blue');
    keysMissing.forEach(key => log(`  • ${key}`, 'blue'));
  }

  if (Object.keys(keysToMigrate).length === 0) {
    log('\n✅ All keys are already in Convex! Nothing to migrate.', 'green');
    process.exit(0);
  }

  // Step 4: Migrate keys
  log('\n🔄 Step 4: Migrating keys to Convex...', 'cyan');
  let successCount = 0;
  let failCount = 0;

  for (const [key, value] of Object.entries(keysToMigrate)) {
    log(`\n  Migrating ${key}...`, 'blue');
    log(`    Value: ${maskKey(value)}`, 'blue');

    if (setConvexEnv(key, value, isProd, isDryRun)) {
      successCount++;
      if (!isDryRun) {
        log(`  ✅ Successfully set ${key}`, 'green');
      }
    } else {
      failCount++;
    }
  }

  // Step 5: Summary
  header('📊 Migration Complete');

  if (isDryRun) {
    log('\n🔍 DRY RUN SUMMARY:', 'yellow');
    log(`  • Would migrate: ${successCount} keys`, 'yellow');
    log(`  • Already set: ${keysAlreadySet.length} keys`, 'yellow');
    log('\n💡 Run without --dry-run to apply changes', 'cyan');
  } else {
    log('\n✅ MIGRATION SUMMARY:', 'green');
    log(`  • Successfully migrated: ${successCount} keys`, 'green');
    log(`  • Already in Convex: ${keysAlreadySet.length} keys`, 'green');
    if (failCount > 0) {
      log(`  • Failed: ${failCount} keys`, 'red');
    }
  }

  // Step 6: Next steps
  log('\n📝 Next Steps:', 'cyan');
  if (!isDryRun && successCount > 0) {
    log('  1. Verify keys are set:', 'cyan');
    log(`     npx convex env list ${isProd ? '--prod' : ''}`, 'blue');
    log('  2. Update your .env.local to remove migrated keys', 'cyan');
    log('     (Keep only Next.js-specific keys)', 'blue');
    log('  3. Test your application:', 'cyan');
    log('     npm run dev:all', 'blue');

    if (!isProd) {
      log('  4. Migrate production deployment:', 'cyan');
      log('     node scripts/migrate-keys-to-convex.js --prod', 'blue');
    }
  }

  log('\n🎉 Done!\n', 'green');
}

// Run migration
main().catch(error => {
  log(`\n❌ Migration failed: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
