#!/usr/bin/env node
/**
 * Security Setup Verification Script
 * Verifies all critical security configurations are in place
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Security Setup...\n');

let hasErrors = false;
let hasWarnings = false;

// Load .env.local
function loadEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found');
    console.log('   Copy .env.example to .env.local and configure it\n');
    return {};
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};

  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  return env;
}

const env = loadEnv();

// 1. Check ENCRYPTION_KEY
console.log('1️⃣  Checking ENCRYPTION_KEY...');
if (!env.ENCRYPTION_KEY || env.ENCRYPTION_KEY === '') {
  console.log('   ❌ ENCRYPTION_KEY not set');
  console.log('   Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64\'))"\n');
  hasErrors = true;
} else {
  try {
    const keyBuffer = Buffer.from(env.ENCRYPTION_KEY, 'base64');
    if (keyBuffer.length !== 32) {
      console.log(`   ❌ ENCRYPTION_KEY must be 32 bytes (256 bits), got ${keyBuffer.length} bytes`);
      console.log('   Generate a new one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64\'))"\n');
      hasErrors = true;
    } else {
      console.log('   ✅ ENCRYPTION_KEY is valid (32 bytes)\n');
    }
  } catch (error) {
    console.log('   ❌ ENCRYPTION_KEY is not valid base64');
    console.log('   Generate a new one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64\'))"\n');
    hasErrors = true;
  }
}

// 2. Check E2B_API_KEY
console.log('2️⃣  Checking E2B_API_KEY...');
if (!env.E2B_API_KEY || env.E2B_API_KEY === '') {
  console.log('   ❌ E2B_API_KEY not set');
  console.log('   Get your key at: https://e2b.dev');
  console.log('   Transform nodes will fail without this!\n');
  hasErrors = true;
} else {
  console.log('   ✅ E2B_API_KEY is set\n');
}

// 3. Check required files exist
console.log('3️⃣  Checking security files...');
const requiredFiles = [
  'convex/lib/encryption.ts',
  'lib/workflow/safe-expression-evaluator.ts',
  'lib/workflow/ssrf-protection.ts',
  'lib/api/rate-limiter.ts',
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.log(`   ❌ Missing: ${file}`);
    allFilesExist = false;
    hasErrors = true;
  }
});

if (allFilesExist) {
  console.log('   ✅ All security files present\n');
}

// 4. Check dependencies
console.log('4️⃣  Checking dependencies...');
const packageJson = require(path.join(process.cwd(), 'package.json'));
if (!packageJson.dependencies['expr-eval']) {
  console.log('   ❌ expr-eval not installed');
  console.log('   Run: npm install expr-eval\n');
  hasErrors = true;
} else {
  console.log('   ✅ expr-eval installed\n');
}

// 5. Check optional configurations
console.log('5️⃣  Checking optional configurations...');
if (env.ALLOWED_HTTP_DOMAINS) {
  console.log(`   ℹ️  HTTP domain whitelist enabled: ${env.ALLOWED_HTTP_DOMAINS}\n`);
} else {
  console.log('   ℹ️  No HTTP domain whitelist (all external domains allowed)\n');
  hasWarnings = true;
}

// 6. Check Convex and Clerk
console.log('6️⃣  Checking Convex & Clerk...');
const hasConvex = env.NEXT_PUBLIC_CONVEX_URL && env.NEXT_PUBLIC_CONVEX_URL !== '';
const hasClerk = env.CLERK_SECRET_KEY && env.CLERK_SECRET_KEY !== '';

if (!hasConvex) {
  console.log('   ⚠️  NEXT_PUBLIC_CONVEX_URL not set\n');
  hasWarnings = true;
} else {
  console.log('   ✅ Convex configured');
}

if (!hasClerk) {
  console.log('   ⚠️  CLERK_SECRET_KEY not set\n');
  hasWarnings = true;
} else {
  console.log('   ✅ Clerk configured\n');
}

// 7. Check Firecrawl
console.log('7️⃣  Checking Firecrawl...');
if (!env.FIRECRAWL_API_KEY || env.FIRECRAWL_API_KEY === '') {
  console.log('   ❌ FIRECRAWL_API_KEY not set (REQUIRED)');
  console.log('   Get your key at: https://firecrawl.dev\n');
  hasErrors = true;
} else {
  console.log('   ✅ Firecrawl configured\n');
}

// Summary
console.log('═'.repeat(60));
if (!hasErrors && !hasWarnings) {
  console.log('✅ All security configurations are correct!');
  console.log('   Your application is ready for production.\n');
  process.exit(0);
} else if (!hasErrors && hasWarnings) {
  console.log('⚠️  Security setup complete with warnings.');
  console.log('   Review the warnings above.\n');
  process.exit(0);
} else {
  console.log('❌ Security setup incomplete.');
  console.log('   Fix the errors above before deploying.\n');
  process.exit(1);
}
