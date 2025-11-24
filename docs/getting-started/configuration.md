# Configuration Guide

Complete reference for environment variables and configuration options.

## Environment Variables

### Required Variables

#### Convex Database
```bash
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```
Generated automatically when you run `npx convex dev`

#### Clerk Authentication
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://your-domain.clerk.accounts.dev
```

#### Firecrawl (Required)
```bash
FIRECRAWL_API_KEY=fc-...
```
Get your key at [firecrawl.dev](https://firecrawl.dev)

#### Security (Production)
```bash
# AES-256-GCM encryption for user API keys
ENCRYPTION_KEY=<32-byte-base64-string>

# E2B sandbox for Transform nodes
E2B_API_KEY=e2b_...
```

### Optional Variables

#### LLM Providers
Users can add these via UI, but you can set defaults:

```bash
# Anthropic Claude (Recommended for MCP)
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI GPT-4o
OPENAI_API_KEY=sk-...

# Groq
GROQ_API_KEY=gsk_...
```

#### Additional Tool APIs
```bash
# Search APIs
TAVILY_API_KEY=tvly-...
SERPER_API_KEY=...
SERPAPI_API_KEY=...

# Scraping APIs
SCRAPERAPI_KEY=...
BROWSERLESS_API_KEY=...

# Other Integrations
ARCADE_API_KEY=...
```

#### Security Options
```bash
# Whitelist allowed domains for HTTP requests
ALLOWED_HTTP_DOMAINS=api.example.com,*.trusted.com
```

## Configuration Files

### convex/auth.config.ts

Configure Clerk authentication for Convex:

```typescript
export default {
  providers: [
    {
      domain: "https://your-clerk-domain.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};
```

### .env.local

Create this file in the project root. **Never commit it to git!**

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=https://...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://...

# Firecrawl (Required)
FIRECRAWL_API_KEY=fc-...

# Security (Required for production)
ENCRYPTION_KEY=...
E2B_API_KEY=e2b_...

# Optional: Default LLM provider
ANTHROPIC_API_KEY=sk-ant-...
```

### .env.example

Template for environment variables (committed to git):

```bash
# Copy this file to .env.local and fill in your values

# Convex Database
NEXT_PUBLIC_CONVEX_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=

# Firecrawl API (REQUIRED)
FIRECRAWL_API_KEY=

# Security (REQUIRED for production)
ENCRYPTION_KEY=
E2B_API_KEY=

# Optional: LLM Providers
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
GROQ_API_KEY=
```

## User Configuration (UI)

### LLM API Keys

Users can add their own API keys via **Settings → API Keys → LLM Providers**:

- Anthropic Claude
- OpenAI GPT-4o
- Groq

These are encrypted and stored in Convex, taking priority over environment variables.

### Tool API Keys

Configure tool-specific keys via **Settings → API Keys → Tool Keys**:

- Firecrawl (optional, falls back to env)
- Tavily Search
- Serper Search
- SerpAPI
- ScraperAPI
- Browserless

### MCP Server Registry

Add custom MCP servers via **Settings → MCP Registry**:

1. Click "Add MCP Server"
2. Enter server URL
3. Add authentication token
4. Test connection
5. Use in Agent nodes

## Generating Secure Keys

### Encryption Key (32 bytes)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### API Key Format

User API keys follow the format: `sk_live_<random>` or `sk_test_<random>`

## Verification

### Check Configuration

```bash
node scripts/verify-security-setup.js
```

Expected output:
```
✅ ENCRYPTION_KEY is valid (32 bytes)
✅ E2B_API_KEY is set
✅ All security files present
✅ expr-eval installed
```

### Test Database Connection

```bash
npx convex dev
```

Should show: `✔ Convex functions ready!`

### Test Authentication

1. Start the app: `npm run dev:all`
2. Navigate to `http://localhost:3000`
3. Sign up/login should work

## Troubleshooting

### "Missing ENCRYPTION_KEY"

Generate a new key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add to `.env.local`:
```bash
ENCRYPTION_KEY=<generated-key>
```

### "Convex functions not ready"

1. Check `NEXT_PUBLIC_CONVEX_URL` is set
2. Run `npx convex dev` in a separate terminal
3. Verify `convex/auth.config.ts` has correct Clerk domain

### "Transform node failed"

E2B API key is required:
1. Get key from [e2b.dev](https://e2b.dev)
2. Add to `.env.local`: `E2B_API_KEY=e2b_...`
3. Restart the server

## Production Deployment

See [Security Checklist](../security/security-checklist.md) for production configuration requirements.

---

**Next Steps:**
- [Quick Start Tutorial](./quick-start.md)
- [User Manual](../../USER-MANUAL.md)
- [Security Guide](../security/README.md)
