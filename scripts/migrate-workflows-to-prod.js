#!/usr/bin/env node
/**
 * Script to migrate workflows from development to production
 *
 * Usage:
 *   node scripts/migrate-workflows-to-prod.js
 *   node scripts/migrate-workflows-to-prod.js --workflow-id=<id>  # migrate specific workflow
 *   node scripts/migrate-workflows-to-prod.js --dry-run           # preview without applying
 */

const { ConvexHttpClient } = require("convex/browser");
require('dotenv').config({ path: '.env.local' });

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const specificWorkflowId = args.find(arg => arg.startsWith('--workflow-id='))?.split('=')[1];

// Convex deployment URLs
const DEV_URL = 'https://disciplined-quail-9.convex.cloud';
const PROD_URL = 'https://sensible-ermine-579.convex.cloud';

async function migrateWorkflows() {
  console.log('🚀 Workflow Migration Script\n');
  console.log(`Mode: ${isDryRun ? '🔍 DRY RUN (no changes will be made)' : '✅ LIVE (changes will be applied)'}\n`);

  // Create clients for both environments
  const devClient = new ConvexHttpClient(DEV_URL);
  const prodClient = new ConvexHttpClient(PROD_URL);

  try {
    // Fetch workflows from development
    console.log('📥 Fetching workflows from development...');
    const devWorkflows = await devClient.query('workflows:listAll') || [];

    console.log(`Found ${devWorkflows.length} workflows in development\n`);

    if (devWorkflows.length === 0) {
      console.log('❌ No workflows found in development');
      return;
    }

    // Filter if specific workflow requested
    let workflowsToMigrate = devWorkflows;
    if (specificWorkflowId) {
      workflowsToMigrate = devWorkflows.filter(w =>
        w._id === specificWorkflowId || w.customId === specificWorkflowId
      );

      if (workflowsToMigrate.length === 0) {
        console.log(`❌ Workflow with ID "${specificWorkflowId}" not found`);
        return;
      }
      console.log(`🎯 Migrating specific workflow: ${workflowsToMigrate[0].name}\n`);
    }

    // Get existing workflows in production to check for duplicates
    console.log('📥 Fetching existing workflows from production...');
    const prodWorkflows = await prodClient.query('workflows:listAll') || [];
    const prodWorkflowIds = new Set(prodWorkflows.map(w => w.customId || w._id));

    console.log(`Found ${prodWorkflows.length} workflows in production\n`);
    console.log('─'.repeat(80));

    // Migrate each workflow
    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const workflow of workflowsToMigrate) {
      const workflowId = workflow.customId || workflow._id;
      const workflowName = workflow.name || 'Unnamed';

      // Check if workflow already exists in production
      const alreadyExists = prodWorkflowIds.has(workflowId);

      console.log(`\n📋 Workflow: ${workflowName}`);
      console.log(`   ID: ${workflowId}`);
      console.log(`   Nodes: ${workflow.nodes?.length || 0}`);
      console.log(`   Edges: ${workflow.edges?.length || 0}`);

      if (alreadyExists) {
        console.log(`   ⚠️  SKIPPED - Already exists in production`);
        skippedCount++;
        continue;
      }

      if (isDryRun) {
        console.log(`   ✓ Would migrate to production`);
        migratedCount++;
      } else {
        try {
          // Create workflow in production
          await prodClient.mutation('workflows:saveWorkflow', {
            name: workflow.name,
            description: workflow.description,
            category: workflow.category,
            tags: workflow.tags,
            difficulty: workflow.difficulty,
            estimatedTime: workflow.estimatedTime,
            nodes: workflow.nodes,
            edges: workflow.edges,
            version: workflow.version,
            isTemplate: workflow.isTemplate,
          });

          console.log(`   ✅ Migrated successfully`);
          migratedCount++;
        } catch (error) {
          console.log(`   ❌ Error: ${error.message}`);
          errorCount++;
        }
      }
    }

    // Summary
    console.log('\n' + '─'.repeat(80));
    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Migrated: ${migratedCount}`);
    console.log(`   ⚠️  Skipped: ${skippedCount}`);
    if (errorCount > 0) console.log(`   ❌ Errors: ${errorCount}`);

    if (isDryRun) {
      console.log('\n💡 This was a dry run. Run without --dry-run to apply changes.');
    } else {
      console.log('\n✨ Migration complete!');
    }

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    devClient.close();
    prodClient.close();
  }
}

// Run the migration
migrateWorkflows().catch(console.error);
