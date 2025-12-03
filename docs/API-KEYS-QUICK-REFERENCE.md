# API Keys Quick Reference

**TL;DR:** Most API keys go in Convex, not `.env.local`

## Quick Commands

```bash
# Preview migration without making changes
npm run migrate:dry-run

# Migrate keys to Convex (development)
npm run migrate:dev

# Check what's in Convex
npm run convex:env

# Migrate to production
npm run migrate:prod

# Check production environment
npm run convex:env:prod
```

## Where Do Keys Go?

### ✅ In Convex Environment (`npx convex env set`)

**Why:** Available to all users, works in production, secure

```bash
ENCRYPTION_KEY                 # 32-byte base64 key
ANTHROPIC_API_KEY              # sk-ant-...
OPENAI_API_KEY                 # sk-proj-...
GROQ_API_KEY                   # gsk_...
GOOGLE_API_KEY                 # AIzaSy...
FIRECRAWL_API_KEY              # fc-...
E2B_API_KEY                    # e2b_...
TAVILY_API_KEY                 # tvly-...
CLERK_JWT_ISSUER_DOMAIN        # https://...clerk.accounts.dev
LANGCHAIN_API_KEY              # lsv2_pt_... (optional)
LANGCHAIN_TRACING_V2           # true (optional)
LANGCHAIN_PROJECT              # open-agent-builder (optional)
LANGCHAIN_ENDPOINT             # https://api.smith.langchain.com (optional)
```

### ✅ In `.env.local`

**Why:** Next.js client needs these before Convex is available

```bash
# Convex connection
NEXT_PUBLIC_CONVEX_URL
CONVEX_DEPLOYMENT
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL

# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_JWT_ISSUER_DOMAIN  # Also in Convex!

# Optional: LangSmith (if you want Next.js-level tracing)
LANGCHAIN_TRACING_V2
LANGCHAIN_API_KEY
LANGCHAIN_PROJECT
LANGCHAIN_ENDPOINT
```

## Common Tasks

### Set a Key in Convex

```bash
# Development
npx convex env set KEY_NAME "value"

# Production
npx convex env set --prod KEY_NAME "value"
```

### Generate ENCRYPTION_KEY

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### List All Keys

```bash
# Development
npx convex env list

# Production
npx convex env list --prod
```

### Remove a Key

```bash
npx convex env remove KEY_NAME
npx convex env remove --prod KEY_NAME
```

## Two-Tier System Explained

```
┌─────────────────────────────────────────┐
│         User Executes Workflow          │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│  Does user have their own API key?      │
│  (Check convex/userLLMKeys table)       │
└──────────────┬──────────┬───────────────┘
               │          │
          YES  │          │  NO
               ▼          ▼
        ┌──────────┐  ┌─────────────────┐
        │ Use User │  │ Use System Key  │
        │   Key    │  │ (process.env)   │
        └──────────┘  └─────────────────┘
                           ▲
                           │
                   From Convex Environment
```

## Architecture Benefits

| Aspect | .env.local | Convex Environment |
|--------|------------|-------------------|
| Production Ready | ❌ Not deployed | ✅ Always available |
| Team Sync | ❌ Manual copy | ✅ Automatic |
| Security | ⚠️ Can be committed | ✅ Server-side only |
| Per-Environment | ❌ Same for all | ✅ Dev vs. Prod |
| User Override | ❌ Not possible | ✅ Users can add own keys |

## Troubleshooting

### Keys not working after migration?

1. Restart Convex: `npx convex dev`
2. Check keys are set: `npm run convex:env`
3. Remove old keys from `.env.local`
4. Clear browser cache

### Migration shows "Already set"?

That's good! It means the key is already in Convex.

### Need to rollback?

Keys are still in your `.env.local` until you remove them. Just keep using them if needed.

## For New Developers

When joining the project:

1. Clone repo
2. Copy `.env.local.example` → `.env.local`
3. Fill in Clerk & Convex connection details
4. **Don't add API keys** - they're already in Convex!
5. Run `npm run dev:all`

## Security Checklist

- [ ] ENCRYPTION_KEY is 32 bytes
- [ ] Different keys for dev vs. prod
- [ ] `.env.local` in `.gitignore`
- [ ] Production keys set with `--prod` flag
- [ ] No API keys hardcoded in source
- [ ] Users can add their own keys via Settings UI

## Files Reference

- [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md) - Full migration instructions
- [CLAUDE.md](../CLAUDE.md) - Complete architecture documentation
- [.env.local.example](../.env.local.example) - Template for local config
- [scripts/migrate-keys-to-convex.js](../scripts/migrate-keys-to-convex.js) - Migration script

## Support

Having issues? Check:

1. Run `npm run migrate:dry-run` to preview
2. Check `npx convex env list` to verify
3. Review [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md)
4. Read [CLAUDE.md](../CLAUDE.md) architecture section

---

**Remember:** System keys in Convex = Convenience for users. User keys in database = Cost control for power users. Both = Flexibility! 🚀
