#!/usr/bin/env node

/**
 * Start a production instance of the application on port 3001
 * This runs alongside the dev instance on port 3000
 */

const { spawn } = require('child_process');
const path = require('path');

// Set environment variables for production Convex
const env = {
  ...process.env,
  CONVEX_DEPLOYMENT: 'prod:sensible-ermine-579',
  NEXT_PUBLIC_CONVEX_URL: 'https://sensible-ermine-579.convex.cloud',
  NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL: 'https://sensible-ermine-579.convex.site/http/uploadFile',
  PORT: '3001',
  // Use a different build directory to avoid conflicts
  NEXT_BUILD_ID: 'prod-instance'
};

console.log('🚀 Starting production instance on port 3001...');
console.log('📦 Connected to: sensible-ermine-579 (PRODUCTION)');
console.log('');

// Start Next.js dev server
const next = spawn('npx', ['next', 'dev', '-p', '3001'], {
  env,
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit',
  shell: true
});

next.on('error', (error) => {
  console.error('❌ Failed to start production instance:', error);
  process.exit(1);
});

next.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Production instance exited with code ${code}`);
  }
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Stopping production instance...');
  next.kill('SIGINT');
});

process.on('SIGTERM', () => {
  next.kill('SIGTERM');
});
