# Migration Guide: Moving API Keys to Convex Environment

**Last Updated:** December 3, 2025

## Overview

This guide explains how to migrate API keys from `.env.local` to Convex environment variables, where they belong according to the project's two-tier API key architecture.

## Why Migrate?

### ❌ Current Problem (Keys in .env.local)

If you've been storing API keys in `.env.local`, you face these issues:

1. **Production Deployment Fails**: Vercel/production won't have your `.env.local` file
2. **Team Sync Headaches**: Each developer needs to manually copy the file
3. **Inconsistent Architecture**: Some keys in Convex, some in `.env.local` (confusing)
4. **Security Risk**: Easy to accidentally commit `.env.local` to git

### ✅ Solution (Keys in Convex Environment)

Moving keys to Convex environment gives you:

1. **Production Ready**: Works seamlessly in all deployment environments
2. **Team Friendly**: All developers automatically get the same system config
3. **Secure**: Keys stored server-side, never exposed to client
4. **Deployment-Specific**: Different keys for dev vs. prod
5. **Centralized**: One place for all system configuration

## Understanding the Two-Tier Architecture

### Tier 1: System-Level Keys (Convex Environment)
```
Users without personal keys → Use system keys
```
- Stored via: `npx convex env set KEY_NAME value`
- Available to: ALL users as fallback
- Used when: User hasn't provided their own key

### Tier 2: User-Specific Keys (Convex Database)
```
Users with personal keys → Use their own keys
```
- Stored in: `convex/userLLMKeys` table (encrypted)
- Available to: Individual users only
- Priority: Takes precedence over system keys

### How It Works

```typescript
// From app/api/workflows/[workflowId]/execute-stream/route.ts
const apiKeys = {
  anthropic: (await getLLMApiKey('anthropic', userId))  // 1. Try user's key
             ?? process.env.ANTHROPIC_API_KEY,          // 2. Fall back to system
};
```

## Migration Steps

### Step 1: Preview the Migration (Dry Run)

First, see what would be migrated without making any changes:

```bash
node scripts/migrate-keys-to-convex.js --dry-run
```

**Expected Output:**
```
🚀 Convex Environment Migration Tool
====================================
Deployment: DEVELOPMENT
Mode: DRY RUN (no changes will be made)

📊 Migration Summary:
  • Keys to migrate: 12
  • Keys already in Convex: 1
  • Keys not found in .env.local: 0

🔄 Migrating keys to Convex...
  [DRY RUN] Would execute: npx convex env set ANTHROPIC_API_KEY "sk-ant-..."
  ...
```

### Step 2: Migrate to Development

Apply the migration to your development deployment:

```bash
node scripts/migrate-keys-to-convex.js
```

**Expected Output:**
```
✅ MIGRATION SUMMARY:
  • Successfully migrated: 12 keys
  • Already in Convex: 1 keys

📝 Next Steps:
  1. Verify keys are set: npx convex env list
  2. Update your .env.local to remove migrated keys
  3. Test your application: npm run dev:all
```

### Step 3: Verify Migration

Check that keys are now in Convex:

```bash
npx convex env list
```

**Expected Output:**
```
ENCRYPTION_KEY=biWlzS4i...
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-proj-...
GROQ_API_KEY=gsk_...
FIRECRAWL_API_KEY=fc-...
E2B_API_KEY=e2b_...
TAVILY_API_KEY=tvly-...
CLERK_JWT_ISSUER_DOMAIN=https://...
LANGCHAIN_API_KEY=lsv2_pt_...
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=open-agent-builder
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
```

### Step 4: Clean Up .env.local

Remove the migrated keys from `.env.local`. Your file should now only contain:

```bash
# Convex Database Connection (REQUIRED)
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOYMENT=dev:your-deployment
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://your-deployment.convex.site/http/uploadFile

# Clerk Authentication (REQUIRED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://your-domain.clerk.accounts.dev

# Optional: LangSmith (only if you want Next.js-level tracing)
# LANGCHAIN_TRACING_V2=true
# LANGCHAIN_API_KEY=lsv2_pt_...
# LANGCHAIN_PROJECT=open-agent-builder
# LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
```

**What to Remove:**
- ❌ `ANTHROPIC_API_KEY` - Now in Convex
- ❌ `OPENAI_API_KEY` - Now in Convex
- ❌ `GROQ_API_KEY` - Now in Convex
- ❌ `GOOGLE_API_KEY` - Now in Convex
- ❌ `FIRECRAWL_API_KEY` - Now in Convex
- ❌ `E2B_API_KEY` - Now in Convex
- ❌ `TAVILY_API_KEY` - Now in Convex
- ❌ `ENCRYPTION_KEY` - Now in Convex (was already there)

**What to Keep:**
- ✅ `NEXT_PUBLIC_*` - Client-side config (can't be in Convex)
- ✅ `CLERK_SECRET_KEY` - Needed by Next.js proxy.ts
- ✅ `CLERK_JWT_ISSUER_DOMAIN` - Needed by both Next.js and Convex
- ✅ `CONVEX_DEPLOYMENT` - Development config

### Step 5: Test Your Application

Restart your dev server and verify everything works:

```bash
# Stop any running servers (Ctrl+C)

# Start fresh
npm run dev:all

# Test workflow execution
# Your workflows should work exactly as before
```

### Step 6: Migrate Production (When Ready)

When you're ready to deploy to production:

```bash
# Preview production migration
node scripts/migrate-keys-to-convex.js --prod --dry-run

# Apply to production
node scripts/migrate-keys-to-convex.js --prod

# Verify
npx convex env list --prod
```

## Manual Migration (Alternative)

If you prefer to set keys manually:

```bash
# Development
npx convex env set ANTHROPIC_API_KEY "sk-ant-..."
npx convex env set OPENAI_API_KEY "sk-proj-..."
npx convex env set GROQ_API_KEY "gsk_..."
npx convex env set GOOGLE_API_KEY "AIzaSy..."
npx convex env set FIRECRAWL_API_KEY "fc-..."
npx convex env set E2B_API_KEY "e2b_..."
npx convex env set TAVILY_API_KEY "tvly-..."
npx convex env set ENCRYPTION_KEY "$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")"
npx convex env set CLERK_JWT_ISSUER_DOMAIN "https://your-domain.clerk.accounts.dev"

# Production (add --prod flag)
npx convex env set --prod ANTHROPIC_API_KEY "sk-ant-..."
# ... repeat for all keys
```

## Troubleshooting

### Issue: "Error: unknown command 'ls'"

**Solution:** Use `npx convex env list` (not `ls`)

### Issue: Keys not being used after migration

**Possible causes:**
1. Convex dev server not restarted
2. Old .env.local keys still present (remove them)
3. Wrong deployment selected

**Solution:**
```bash
# Restart Convex
npx convex dev

# In another terminal
npm run dev

# Verify keys are loaded
npx convex env list
```

### Issue: "ENCRYPTION_KEY must be exactly 32 bytes"

**Solution:** Generate a new key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Issue: Production deployment not using new keys

**Solution:** Make sure you migrated with `--prod` flag:
```bash
node scripts/migrate-keys-to-convex.js --prod
npx convex env list --prod  # Verify
```

## Security Best Practices

### ✅ Do:
- Store all API keys in Convex environment
- Use different keys for dev vs. prod
- Rotate keys regularly
- Add `.env.local` to `.gitignore` (already done)

### ❌ Don't:
- Commit `.env.local` to git
- Share API keys in Slack/email
- Use production keys in development
- Hardcode keys in source code

## Rollback (If Needed)

If you need to rollback:

1. **Keys are still in .env.local** - Just keep using them
2. **Removed from .env.local** - Restore from backup or copy from Convex:

```bash
# Get key from Convex
npx convex env list

# Add back to .env.local if needed
echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env.local
```

## For New Team Members

New developers joining the project should:

1. Clone the repository
2. Copy `.env.local.example` to `.env.local`
3. Fill in Clerk and Convex connection details
4. **Do NOT add API keys** - they're already in Convex!
5. Run `npm run dev:all`

The system API keys in Convex will automatically be available.

## Support

If you encounter issues:

1. Check [CLAUDE.md](../CLAUDE.md) for architecture details
2. Review [.env.local.example](.env.local.example) for correct format
3. Run migration with `--dry-run` to preview changes
4. Check Convex dashboard for environment variables

---

**Next Steps:**
- Read [CLAUDE.md](../CLAUDE.md) for full architecture documentation
- See [.env.local.example](.env.local.example) for required keys
- Review [README.md](../README.md) for setup instructions
