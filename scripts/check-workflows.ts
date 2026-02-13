/**
 * Check what workflows are in the database
 */

import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';

const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error('❌ CONVEX_URL not set!');
  process.exit(1);
}

async function checkWorkflows() {
  const client = new ConvexHttpClient(CONVEX_URL!);

  const adminSecret = process.env.CONVEX_DEPLOY_KEY || process.env.CONVEX_TEST_SECRET;
  if (!adminSecret) {
    console.error('❌ CONVEX_DEPLOY_KEY or CONVEX_TEST_SECRET required!');
    process.exit(1);
  }

  client.setAdminAuth(adminSecret);

  try {
    console.log('📋 Fetching all workflows...\n');
    const workflows = await client.query(api.workflows.list, {});

    console.log(`Total workflows: ${workflows.length}\n`);

    // Group by userId
    const byUser: Record<string, number> = {};
    const byTemplate: { template: number; nonTemplate: number } = { template: 0, nonTemplate: 0 };

    workflows.forEach(w => {
      const userId = w.userId || 'NO_USER_ID';
      byUser[userId] = (byUser[userId] || 0) + 1;

      if (w.isTemplate) {
        byTemplate.template++;
      } else {
        byTemplate.nonTemplate++;
      }
    });

    console.log('By User:');
    Object.entries(byUser)
      .sort((a, b) => b[1] - a[1])
      .forEach(([userId, count]) => {
        console.log(`  ${userId}: ${count} workflows`);
      });

    console.log(`\nBy Type:`);
    console.log(`  Templates: ${byTemplate.template}`);
    console.log(`  Non-templates: ${byTemplate.nonTemplate}`);

    // Sample first 5 workflows
    console.log(`\nSample workflows (first 5):`);
    workflows.slice(0, 5).forEach(w => {
      console.log(`  - ID: ${w._id}`);
      console.log(`    Name: ${w.name}`);
      console.log(`    UserId: ${w.userId || 'NONE'}`);
      console.log(`    IsTemplate: ${w.isTemplate || false}`);
      console.log(`    CreatedAt: ${w._creationTime ? new Date(w._creationTime).toISOString() : 'UNKNOWN'}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkWorkflows();
