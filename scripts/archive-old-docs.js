#!/usr/bin/env node

/**
 * Archive Old Documentation Script
 *
 * Moves historical and deprecated documentation to docs/archive/
 * for better organization while preserving history.
 *
 * Usage: node scripts/archive-old-docs.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');

// Documents to archive
const DOCS_TO_ARCHIVE = [
  'CLEANUP-AND-SECURITY-SUMMARY-DEC-2025.md',
  'CLEANUP-SUMMARY.md',
  'QUALITY-IMPROVEMENTS.md',
  'GAMMA-NODE-CHANGELOG.md',
  'USER-MANUAL.md', // Deprecated in favor of docs/USER-GUIDE.md
];

// Create archive directory
const archiveDir = path.join(__dirname, '..', 'docs', 'archive');

function archiveDocuments() {
  console.log('🗂️  Open Agent Builder - Documentation Archival\n');
  console.log(DRY_RUN ? '🔍 DRY RUN MODE (no files will be moved)\n' : '');

  // Create archive directory if it doesn't exist
  if (!fs.existsSync(archiveDir)) {
    console.log(`📁 Creating archive directory: ${archiveDir}`);
    if (!DRY_RUN) {
      fs.mkdirSync(archiveDir, { recursive: true });
    }
  }

  // Create archive README
  const archiveReadme = path.join(archiveDir, 'README.md');
  if (!fs.existsSync(archiveReadme)) {
    const readmeContent = `# Archived Documentation

This directory contains historical documentation that is no longer actively maintained but preserved for reference.

**Archive Date**: ${new Date().toISOString().split('T')[0]}

## Archived Documents

${DOCS_TO_ARCHIVE.map(doc => `- \`${doc}\` - Historical reference`).join('\n')}

## Why These Were Archived

These documents represent:
- Historical session summaries and fix logs
- Deprecated guides replaced by newer versions
- One-time migration and cleanup summaries

While no longer actively maintained, they provide valuable context for the project's evolution.

---

For current documentation, see:
- [README.md](../../README.md) - Project overview
- [docs/USER-GUIDE.md](../USER-GUIDE.md) - User documentation
- [docs/ADMIN-GUIDE.md](../ADMIN-GUIDE.md) - Administration guide
- [CLAUDE.md](../../CLAUDE.md) - Developer guide
`;

    console.log(`📄 Creating archive README: ${archiveReadme}`);
    if (!DRY_RUN) {
      fs.writeFileSync(archiveReadme, readmeContent);
    }
  }

  let movedCount = 0;
  let notFoundCount = 0;

  // Move documents to archive
  for (const doc of DOCS_TO_ARCHIVE) {
    const sourcePath = path.join(__dirname, '..', doc);
    const targetPath = path.join(archiveDir, doc);

    if (fs.existsSync(sourcePath)) {
      console.log(`📦 Archiving: ${doc}`);
      if (!DRY_RUN) {
        fs.renameSync(sourcePath, targetPath);
      }
      movedCount++;
    } else {
      console.log(`⚠️  Not found: ${doc} (already archived or deleted)`);
      notFoundCount++;
    }
  }

  console.log(`\n✅ Summary:`);
  console.log(`   - ${movedCount} documents archived`);
  console.log(`   - ${notFoundCount} documents not found`);

  if (DRY_RUN) {
    console.log('\n💡 Run without --dry-run to actually move files');
  } else {
    console.log('\n🎉 Documentation archive complete!');
    console.log(`\n📚 View archived docs at: ${archiveDir}`);
  }
}

try {
  archiveDocuments();
} catch (error) {
  console.error('❌ Error archiving documents:', error.message);
  process.exit(1);
}
