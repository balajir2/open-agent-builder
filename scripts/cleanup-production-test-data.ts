/**
 * Production cleanup script to remove all test workflows
 *
 * IMPORTANT: This targets PRODUCTION environment!
 * Run this to clean up accumulated test data in production:
 * npx tsx scripts/cleanup-production-test-data.ts
 */

import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';

// PRODUCTION URL - explicitly targeting production
const CONVEX_URL = 'https://sensible-ermine-579.convex.cloud';

if (!CONVEX_URL) {
  console.error('❌ CONVEX_URL not set!');
  process.exit(1);
}

async function cleanupProductionTestData() {
  console.log('🧹 Starting PRODUCTION test data cleanup...');
  console.log('⚠️  WARNING: This will delete workflows from PRODUCTION!');
  console.log('');

  const client = new ConvexHttpClient(CONVEX_URL!);

  // Use production admin key
  const adminSecret = process.env.CONVEX_DEPLOY_KEY;
  if (!adminSecret) {
    console.error('❌ CONVEX_DEPLOY_KEY required for production cleanup!');
    console.error('   Set it in your environment or .env.local file.');
    process.exit(1);
  }

  client.setAdminAuth(adminSecret);

  let totalDeleted = 0;

  try {
    // Get all workflows
    console.log('📋 Fetching all workflows from production...');
    const workflows = await client.query(api.workflows.list, {});
    console.log(`   Found ${workflows.length} total workflows\n`);

    // Filter out template workflows - only delete test workflows
    // Test workflows typically have:
    // - No assignedTo
    // - No category
    // - userId = unset or test user IDs
    // - Names like "Test workflow", "Basic test workflow", etc.
    const testWorkflows = workflows.filter(w => {
      // Keep templates
      if (w.isTemplate) return false;

      // Delete if userId is unset or starts with 'test-'
      if (!w.userId || w.userId.startsWith('test-')) return true;

      // Delete if name suggests it's a test
      const testNamePatterns = [
        /^test/i,
        /test workflow/i,
        /basic test/i,
        /updated desc/i,
      ];
      if (w.name && testNamePatterns.some(pattern => pattern.test(w.name))) return true;

      return false;
    });

    if (testWorkflows.length === 0) {
      console.log('✓ No test workflows to clean');
    } else {
      console.log(`🗑️  Deleting ${testWorkflows.length} test workflows...`);
      console.log('   (Templates and user workflows will be preserved)\n');

      // Show sample of what will be deleted
      console.log('Sample workflows to be deleted:');
      testWorkflows.slice(0, 5).forEach(w => {
        console.log(`  - ${w.name} (userId: ${w.userId || 'unset'}, created: ${w.createdAt})`);
      });
      if (testWorkflows.length > 5) {
        console.log(`  ... and ${testWorkflows.length - 5} more\n`);
      }

      for (const workflow of testWorkflows) {
        try {
          await client.mutation(api.workflows.deleteWorkflow, { id: workflow._id });
          totalDeleted++;
          process.stdout.write('.');
          if (totalDeleted % 50 === 0) {
            process.stdout.write(` ${totalDeleted}\n`);
          }
        } catch (e) {
          console.error(`\n   ⚠️  Failed to delete ${workflow._id}:`, e);
        }
      }
      console.log(` ✓ Done\n`);
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Production cleanup complete!`);
    console.log(`📊 Total workflows deleted: ${totalDeleted}`);
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('\n❌ Cleanup failed:', error);
    process.exit(1);
  }
}

cleanupProductionTestData();
