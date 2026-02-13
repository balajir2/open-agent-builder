/**
 * Manual cleanup script to remove all test workflows from the database
 *
 * Run this to clean up accumulated test data:
 * npx tsx scripts/cleanup-test-data.ts
 */

import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';

const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error('❌ CONVEX_URL not set!');
  process.exit(1);
}

const TEST_USER_IDS = [
  'test-user',
  'test-user-db-operations',
  'test-user-workflow-execution',
  'test-user-regression',
  'test-user-api-endpoints',
  'test-user-auth',
  'test-user-edge-cases',
];

async function cleanupTestData() {
  console.log('🧹 Starting test data cleanup...\n');

  const client = new ConvexHttpClient(CONVEX_URL!);

  // Use admin auth to bypass permissions
  const adminSecret = process.env.CONVEX_DEPLOY_KEY || process.env.CONVEX_TEST_SECRET;
  if (!adminSecret) {
    console.error('❌ CONVEX_DEPLOY_KEY or CONVEX_TEST_SECRET required!');
    process.exit(1);
  }

  client.setAdminAuth(adminSecret);

  let totalDeleted = 0;

  try {
    // Get all workflows
    console.log('📋 Fetching all workflows...');
    const workflows = await client.query(api.workflows.list, {});
    console.log(`   Found ${workflows.length} total workflows\n`);

    // Filter out template workflows - only delete test workflows
    // ONLY delete workflows with known test user IDs (be conservative)
    // Do NOT delete workflows with null userId - those might be from real users
    const testWorkflows = workflows.filter(w =>
      !w.isTemplate && w.userId && TEST_USER_IDS.includes(w.userId)
    );

    if (testWorkflows.length === 0) {
      console.log('✓ No test workflows to clean');
    } else {
      console.log(`🗑️  Deleting ${testWorkflows.length} non-template workflows...`);

      for (const workflow of testWorkflows) {
        try {
          await client.mutation(api.workflows.deleteWorkflow, { id: workflow._id });
          totalDeleted++;
          process.stdout.write('.');
        } catch (e) {
          console.error(`\n   ⚠️  Failed to delete ${workflow._id}:`, e);
        }
      }
      console.log(` ✓ Done\n`);
    }

    // Also clean up by test user IDs (backward compatibility)
    for (const testUserId of TEST_USER_IDS) {
      const userWorkflows = workflows.filter(w => w.userId === testUserId && !testWorkflows.includes(w));
      if (userWorkflows.length > 0) {
        console.log(`🗑️  ${testUserId}: Deleting ${userWorkflows.length} additional workflows...`);
        for (const workflow of userWorkflows) {
          try {
            await client.mutation(api.workflows.deleteWorkflow, { id: workflow._id });
            totalDeleted++;
            process.stdout.write('.');
          } catch (e) {
            console.error(`\n   ⚠️  Failed to delete ${workflow._id}:`, e);
          }
        }
        console.log(` ✓ Done\n`);
      }
    }

    // Clean up MCP servers
    console.log('🔧 Cleaning MCP servers...');
    for (const testUserId of TEST_USER_IDS) {
      try {
        const servers = await client.query(api.mcpServers.listUserMCPs, { userId: testUserId });
        for (const server of servers) {
          await client.mutation(api.mcpServers.deleteMCPServer, { id: server._id });
        }
        if (servers.length > 0) {
          console.log(`   ✓ Deleted ${servers.length} MCP servers for ${testUserId}`);
        }
      } catch (e) {
        console.error(`   ⚠️  Error cleaning MCP servers for ${testUserId}:`, e);
      }
    }

    // Clean up API keys
    console.log('\n🔑 Cleaning API keys...');
    for (const testUserId of TEST_USER_IDS) {
      try {
        const keys = await client.query(api.userLLMKeys.getUserLLMKeys, { userId: testUserId });
        for (const key of keys) {
          await client.mutation(api.userLLMKeys.deleteLLMKey, { id: key._id, userId: testUserId });
        }
        if (keys.length > 0) {
          console.log(`   ✓ Deleted ${keys.length} API keys for ${testUserId}`);
        }
      } catch (e) {
        console.error(`   ⚠️  Error cleaning API keys for ${testUserId}:`, e);
      }
    }

    // Clean up test approvals
    console.log('\n✅ Cleaning test approvals...');
    const approvalIds = [
      'test-approval-001', 'test-approval-002', 'test-approval-003',
      'test-approval-004', 'pending-1', 'pending-2',
    ];
    let approvalCount = 0;
    for (const approvalId of approvalIds) {
      try {
        const result = await client.mutation(api.approvals.deleteByApprovalId, { approvalId });
        if (result.success) approvalCount++;
      } catch (e) {
        // Ignore - approval might not exist
      }
    }
    if (approvalCount > 0) {
      console.log(`   ✓ Deleted ${approvalCount} test approvals`);
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Cleanup complete!`);
    console.log(`📊 Total workflows deleted: ${totalDeleted}`);
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('\n❌ Cleanup failed:', error);
    process.exit(1);
  }

  // ConvexHttpClient doesn't have a close() method - just exit
}

cleanupTestData();
