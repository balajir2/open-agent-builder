#!/usr/bin/env node
/**
 * Bootstrap script for a new Convex deployment.
 *
 * Usage:
 *   1. Copy .convex-bootstrap.example.json to .convex-bootstrap.json
 *   2. Fill in all required values
 *   3. Point CONVEX_DEPLOYMENT at the target deployment in your .env.local
 *      (or pass --deployment-name <name>)
 *   4. Run:  node scripts/bootstrap-convex.cjs
 *
 *      Optional flags:
 *        --config <path>         Path to bootstrap JSON (default: .convex-bootstrap.json)
 *        --deployment-name <n>   Convex deployment name override
 *        --prod                  Target production deployment
 *        --skip-deploy           Skip schema/functions deploy (only set env vars)
 *        --skip-env              Skip env var configuration (only deploy)
 *        --dry-run               Print actions without executing
 *
 * This script will:
 *   1. Deploy the Convex schema and functions
 *   2. Set all required environment variables on the deployment
 *   3. Verify the deployment by listing env vars and schema tables
 *
 * It is idempotent — safe to re-run.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const args = process.argv.slice(2);
const hasFlag = (flag) => args.includes(flag);
const getFlag = (flag) => {
  const idx = args.indexOf(flag);
  return idx >= 0 && idx + 1 < args.length ? args[idx + 1] : null;
};

const CONFIG_PATH = getFlag('--config') || '.convex-bootstrap.json';
const DEPLOYMENT_NAME = getFlag('--deployment-name');
const USE_PROD = hasFlag('--prod');
const SKIP_DEPLOY = hasFlag('--skip-deploy');
const SKIP_ENV = hasFlag('--skip-env');
const DRY_RUN = hasFlag('--dry-run');

// ────────────────────────────────────────────────────────────
// Required, Recommended, and Optional env var definitions
// ────────────────────────────────────────────────────────────
const ENV_VARS = {
  required: [
    {
      key: 'ENCRYPTION_KEY',
      note: '32-byte base64 key for encrypting user secrets. Generate with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64\'))"',
      generateIfMissing: () => crypto.randomBytes(32).toString('base64'),
    },
    {
      key: 'AUTH_MICROSOFT_ID',
      note: 'Azure AD Application (client) ID for NextAuth validation',
    },
    {
      key: 'CONVEX_TEST_SECRET',
      note: 'Shared secret used by API-key-authenticated execute routes. Generate any random strong string.',
      generateIfMissing: () => crypto.randomBytes(32).toString('base64url'),
    },
  ],
  llmProviders: [
    { key: 'ANTHROPIC_API_KEY', note: 'Anthropic Claude (required for most workflows)' },
    { key: 'OPENAI_API_KEY', note: 'OpenAI GPT models' },
    { key: 'GROQ_API_KEY', note: 'Groq (Llama models)' },
    { key: 'GOOGLE_API_KEY', note: 'Google Gemini' },
  ],
  tools: [
    { key: 'FIRECRAWL_API_KEY', note: 'Firecrawl web scraping' },
    { key: 'E2B_API_KEY', note: 'E2B code sandbox (required for Transform node)' },
    { key: 'TAVILY_API_KEY', note: 'Tavily AI search' },
    { key: 'SERPER_API_KEY', note: 'Serper Google Search' },
    { key: 'SERPAPI_API_KEY', note: 'SerpAPI search' },
    { key: 'SCRAPERAPI_API_KEY', note: 'ScraperAPI' },
    { key: 'BROWSERLESS_API_KEY', note: 'Browserless browser automation' },
    { key: 'ARCADE_API_KEY', note: 'Arcade browser automation' },
    { key: 'GAMMA_API_KEY', note: 'Gamma AI presentation generation' },
  ],
  langsmith: [
    { key: 'LANGCHAIN_TRACING_V2', note: 'Set to "true" to enable LangSmith tracing' },
    { key: 'LANGCHAIN_API_KEY', note: 'LangSmith API key' },
    { key: 'LANGCHAIN_PROJECT', note: 'LangSmith project name' },
    { key: 'LANGCHAIN_ENDPOINT', note: 'LangSmith endpoint (default: https://api.smith.langchain.com)' },
  ],
};

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────
const log = {
  info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m  ${msg}`),
  ok: (msg) => console.log(`\x1b[32m[OK]\x1b[0m    ${msg}`),
  warn: (msg) => console.log(`\x1b[33m[WARN]\x1b[0m  ${msg}`),
  err: (msg) => console.error(`\x1b[31m[ERR]\x1b[0m   ${msg}`),
  step: (msg) => console.log(`\n\x1b[1m\x1b[35m▸ ${msg}\x1b[0m`),
};

function run(cmd, opts = {}) {
  if (DRY_RUN) {
    log.info(`[DRY-RUN] ${cmd}`);
    return '';
  }
  try {
    return execSync(cmd, { stdio: opts.silent ? 'pipe' : 'inherit', encoding: 'utf8' });
  } catch (e) {
    if (!opts.allowFail) throw e;
    return null;
  }
}

function runCapture(cmd) {
  if (DRY_RUN) {
    log.info(`[DRY-RUN] ${cmd}`);
    return '';
  }
  return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });
}

function buildConvexFlags() {
  const flags = [];
  if (USE_PROD) flags.push('--prod');
  if (DEPLOYMENT_NAME) flags.push(`--deployment-name ${DEPLOYMENT_NAME}`);
  return flags.join(' ');
}

// ────────────────────────────────────────────────────────────
// Step 1: Load config
// ────────────────────────────────────────────────────────────
function loadConfig() {
  log.step('Loading bootstrap config');
  const configPath = path.resolve(process.cwd(), CONFIG_PATH);
  if (!fs.existsSync(configPath)) {
    log.err(`Config file not found: ${configPath}`);
    log.info(`Copy .convex-bootstrap.example.json to ${CONFIG_PATH} and fill it in`);
    process.exit(1);
  }
  const raw = fs.readFileSync(configPath, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    log.ok(`Loaded ${configPath}`);
    return parsed;
  } catch (e) {
    log.err(`Invalid JSON in ${configPath}: ${e.message}`);
    process.exit(1);
  }
}

// ────────────────────────────────────────────────────────────
// Step 2: Deploy Convex schema and functions
// ────────────────────────────────────────────────────────────
function deployConvex() {
  if (SKIP_DEPLOY) {
    log.warn('Skipping convex deploy (--skip-deploy)');
    return;
  }
  log.step('Deploying Convex schema and functions');
  const flags = buildConvexFlags();
  run(`npx convex deploy ${flags}`);
  log.ok('Convex deployed');
}

// ────────────────────────────────────────────────────────────
// Step 3: Set environment variables
// ────────────────────────────────────────────────────────────
function resolveValue(entry, config) {
  const configured = config[entry.key];
  if (configured && configured !== '<generate>') return configured;
  if (configured === '<generate>' && entry.generateIfMissing) {
    const generated = entry.generateIfMissing();
    log.info(`Auto-generated ${entry.key}: ${generated.substring(0, 8)}... (save this — it cannot be recovered)`);
    return generated;
  }
  return null;
}

function setEnvVar(key, value) {
  const flags = buildConvexFlags();
  // Escape value for shell — use single quotes around, escape single quotes inside
  const escaped = `'${String(value).replace(/'/g, "'\\''")}'`;
  run(`npx convex env set ${flags} ${key} ${escaped}`, { silent: true });
}

function setEnvVars(config) {
  if (SKIP_ENV) {
    log.warn('Skipping env var setup (--skip-env)');
    return;
  }
  log.step('Setting Convex environment variables');

  const groups = [
    { name: 'Required', entries: ENV_VARS.required, strict: true },
    { name: 'LLM Providers', entries: ENV_VARS.llmProviders, strict: false },
    { name: 'Tools', entries: ENV_VARS.tools, strict: false },
    { name: 'LangSmith (optional)', entries: ENV_VARS.langsmith, strict: false },
  ];

  let setCount = 0;
  let skipCount = 0;
  const missing = [];

  for (const group of groups) {
    log.info(`\n── ${group.name} ──`);
    for (const entry of group.entries) {
      const value = resolveValue(entry, config);
      if (value) {
        setEnvVar(entry.key, value);
        log.ok(`Set ${entry.key}`);
        setCount++;
      } else if (group.strict) {
        log.err(`Missing required: ${entry.key} — ${entry.note}`);
        missing.push(entry.key);
      } else {
        log.warn(`Skipped ${entry.key} (not in config) — ${entry.note}`);
        skipCount++;
      }
    }
  }

  log.info(`\n${setCount} env vars set, ${skipCount} skipped`);
  if (missing.length > 0) {
    log.err(`Missing required vars: ${missing.join(', ')}`);
    log.err(`Add them to ${CONFIG_PATH} and re-run`);
    process.exit(1);
  }
}

// ────────────────────────────────────────────────────────────
// Step 4: Verify deployment
// ────────────────────────────────────────────────────────────
function verify() {
  log.step('Verifying deployment');
  const flags = buildConvexFlags();
  try {
    const envList = runCapture(`npx convex env list ${flags}`);
    const vars = envList.split('\n').filter(l => l.includes('=')).map(l => l.split('=')[0]);
    log.ok(`Deployment has ${vars.length} env vars set`);

    const required = ENV_VARS.required.map(e => e.key);
    const missing = required.filter(k => !vars.includes(k));
    if (missing.length > 0) {
      log.err(`Missing required: ${missing.join(', ')}`);
      process.exit(1);
    }
    log.ok('All required env vars present');
  } catch (e) {
    log.warn('Could not verify env vars (this is OK in dry-run mode)');
  }
}

// ────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────
function main() {
  console.log('\n\x1b[1mOpen Agent Builder — Convex Bootstrap\x1b[0m');
  console.log(`Config:      ${CONFIG_PATH}`);
  console.log(`Deployment:  ${DEPLOYMENT_NAME || '(from .env.local CONVEX_DEPLOYMENT)'}`);
  console.log(`Mode:        ${USE_PROD ? 'PRODUCTION' : 'DEV'}${DRY_RUN ? ' [DRY-RUN]' : ''}`);

  const config = loadConfig();
  deployConvex();
  setEnvVars(config);
  verify();

  log.step('Done');
  log.ok('Convex deployment bootstrapped successfully');
  log.info(`\nNext steps:`);
  log.info(`  1. Set NEXT_PUBLIC_CONVEX_URL in your .env.local to point at this deployment`);
  log.info(`  2. Set Azure AD credentials (AUTH_MICROSOFT_SECRET, AUTH_MICROSOFT_TENANT_ID, AUTH_SECRET) in .env.local`);
  log.info(`  3. Run "npm run dev:all" to start the app`);
  log.info(`  4. Log in and verify Firecrawl MCP appears (auto-seeded for every user)`);
}

main();
