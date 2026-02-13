/**
 * Diagnostic script to see what's really in the workflows table
 */

import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';

const CONVEX_URL = 'https://sensible-ermine-579.convex.cloud';

async function diagnoseWorkflows() {
  console.log('🔍 Diagnosing workflows in production...\n');

  const client = new ConvexHttpClient(CONVEX_URL);
  const adminSecret = process.env.CONVEX_DEPLOY_KEY;

  if (!adminSecret) {
    console.error('❌ CONVEX_DEPLOY_KEY required!');
    process.exit(1);
  }

  client.setAdminAuth(adminSecret);

  try {
    console.log('Attempting to query workflows with api.workflows.list...');
    const workflows = await client.query(api.workflows.list, {});
    console.log(`Result: ${workflows.length} workflows\n`);

    if (workflows.length > 0) {
      console.log('Sample workflow:');
      const sample = workflows[0];
      console.log(JSON.stringify(sample, null, 2));
    } else {
      console.log('No workflows returned by api.workflows.list');
      console.log('\nPossible reasons:');
      console.log('1. The list query might be filtering them out');
      console.log('2. The admin auth might not be working correctly');
      console.log('3. The workflows might be in a different table or deployment');
      console.log('\nTry running: npx convex deploy');
      console.log('This will ensure the latest code is deployed to production.');
    }

  } catch (error) {
    console.error('\n❌ Error:', error);
  }
}

diagnoseWorkflows();
