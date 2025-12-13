# Convex Backend

This directory contains the Convex backend functions, schema definitions, and authentication configuration for Open Agent Builder.

## Overview

Convex provides the real-time database and serverless backend for the application. All data storage, retrieval, and real-time updates are handled through Convex functions.

## Directory Structure

```
convex/
├── _generated/          # Auto-generated Convex types (do not edit)
├── auth.config.ts       # NextAuth.js + Azure AD authentication config
├── schema.ts            # Database schema definitions
├── workflows.ts         # Workflow CRUD operations
├── executions.ts        # Execution tracking and history
├── userLLMKeys.ts       # Encrypted user API key storage
├── mcpServers.ts        # MCP server registry
├── approvals.ts         # Human-in-the-loop approval records
├── apiKeys.ts           # Programmatic API keys
├── systemApiKeys.ts     # System-level API key retrieval
├── lib/
│   └── encryption.ts    # AES-256-GCM encryption utilities
└── http.ts              # HTTP actions (file uploads, etc.)
```

## Key Concepts

### Queries
Read data from the database. Automatically reactive - components re-render when data changes.

```typescript
// Example query
export const getWorkflow = query({
  args: { id: v.id("workflows") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
```

### Mutations
Write data to the database. Transactions are automatically handled.

```typescript
// Example mutation
export const upsertWorkflow = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    nodes: v.array(v.any()),
    edges: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const existingWorkflow = await ctx.db
      .query("workflows")
      .withIndex("by_user_and_name", (q) =>
        q.eq("userId", args.userId).eq("name", args.name)
      )
      .first();

    if (existingWorkflow) {
      await ctx.db.patch(existingWorkflow._id, {
        nodes: args.nodes,
        edges: args.edges,
        updatedAt: Date.now(),
      });
      return existingWorkflow._id;
    }

    return await ctx.db.insert("workflows", {
      ...args,
      updatedAt: Date.now(),
    });
  },
});
```

### Actions
Run Node.js code with access to external APIs. Can call queries and mutations.

```typescript
// Example action (used for accessing environment variables)
export const getAllSystemApiKeys = action({
  args: {},
  handler: async (ctx) => {
    return {
      anthropic: process.env.ANTHROPIC_API_KEY,
      openai: process.env.OPENAI_API_KEY,
      groq: process.env.GROQ_API_KEY,
      google: process.env.GOOGLE_API_KEY,
      firecrawl: process.env.FIRECRAWL_API_KEY,
      e2b: process.env.E2B_API_KEY,
      tavily: process.env.TAVILY_API_KEY,
      arcade: process.env.ARCADE_API_KEY,
    };
  },
});
```

## Database Schema

See [schema.ts](./schema.ts) for complete schema definitions.

**Main Tables:**
- `workflows` - Workflow definitions (nodes + edges)
- `executions` - Execution history and results
- `userLLMKeys` - Encrypted user API keys
- `mcpServers` - MCP server configurations
- `approvals` - Human approval records
- `apiKeys` - Programmatic access keys

## Authentication

Authentication is handled via NextAuth.js with Azure AD (Microsoft Entra ID). The configuration is in [auth.config.ts](./auth.config.ts).

**JWT Validation:**
```typescript
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
};
```

**Important:** Set `CLERK_JWT_ISSUER_DOMAIN` in Convex environment:
```bash
npx convex env set CLERK_JWT_ISSUER_DOMAIN "https://login.microsoftonline.com/<tenant-id>/v2.0"
```

## Environment Variables

Set environment variables using the Convex CLI:

```bash
# Development
npx convex env set ENCRYPTION_KEY "<32-byte-base64-key>"
npx convex env set CLERK_JWT_ISSUER_DOMAIN "https://login.microsoftonline.com/<tenant-id>/v2.0"

# Production
npx convex env set --prod ENCRYPTION_KEY "<32-byte-base64-key>"
npx convex env set --prod CLERK_JWT_ISSUER_DOMAIN "https://login.microsoftonline.com/<tenant-id>/v2.0"

# Optional: System-level API keys (fallback for all users)
npx convex env set ANTHROPIC_API_KEY "sk-ant-..."
npx convex env set OPENAI_API_KEY "sk-..."
npx convex env set FIRECRAWL_API_KEY "fc-..."
npx convex env set E2B_API_KEY "e2b_..."
```

**List current environment variables:**
```bash
npx convex env list           # Development
npx convex env list --prod    # Production
```

## Development

### Starting Convex Dev Server

```bash
# Start dev server (syncs code to Convex)
npx convex dev

# Deploy to production
npx convex deploy --prod
```

### Accessing Convex Dashboard

Visit [https://dashboard.convex.dev](https://dashboard.convex.dev) to:
- View database tables and records
- Monitor function execution
- Check logs and errors
- Manage deployments

### Testing Queries and Mutations

Use the Convex dashboard to test functions directly:
1. Go to Functions tab
2. Select a function
3. Provide arguments in JSON format
4. Click "Run"

## Security

### User API Keys
User API keys are encrypted using AES-256-GCM before storage:
- Encryption key stored in Convex environment (`ENCRYPTION_KEY`)
- Unique initialization vector (IV) per key
- Keys only decrypted when needed for execution

See [lib/encryption.ts](./lib/encryption.ts) for implementation.

### Authentication
- All queries/mutations validate user identity via JWT
- User-scoped data access enforced at database level
- No cross-user data leakage possible

### System API Keys
System-level keys stored in Convex environment variables:
- Not accessible from client-side code
- Retrieved via server-side actions only
- Used as fallback when user hasn't provided their own key

## Common Patterns

### User-Scoped Queries
Always filter by userId for user-specific data:

```typescript
export const listWorkflows = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workflows")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});
```

### Pagination
Use cursor-based pagination for large datasets:

```typescript
export const listExecutions = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("executions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
```

### Encryption/Decryption
Encrypt sensitive data before storage:

```typescript
import { encrypt, decrypt } from "./lib/encryption";

export const saveApiKey = mutation({
  args: { userId: v.string(), provider: v.string(), apiKey: v.string() },
  handler: async (ctx, args) => {
    const encryptionKey = process.env.ENCRYPTION_KEY!;
    const { encrypted, iv } = encrypt(args.apiKey, encryptionKey);

    await ctx.db.insert("userLLMKeys", {
      userId: args.userId,
      provider: args.provider,
      encryptedKey: encrypted,
      iv: iv,
      updatedAt: Date.now(),
    });
  },
});
```

## Troubleshooting

### "Function not found" error
- Run `npx convex dev` to sync functions to Convex
- Check that the function is exported and has correct signature

### "Invalid authentication" error
- Verify `CLERK_JWT_ISSUER_DOMAIN` is set correctly
- Check that JWT token is being passed from Next.js

### "Cannot read environment variable" error
- Set missing environment variables with `npx convex env set`
- Verify you're checking the correct environment (dev vs prod)

### Slow queries
- Add indexes to frequently queried fields in schema.ts
- Use pagination for large result sets
- Check query complexity in Convex dashboard

## Documentation

- **Main Documentation**: [docs/ADMIN-GUIDE.md](../docs/ADMIN-GUIDE.md#convex-backend-setup)
- **Architecture**: [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md#database-schema)
- **Official Convex Docs**: https://docs.convex.dev

## Support

- **Convex Discord**: https://convex.dev/community
- **Convex Support**: support@convex.dev
- **Project Issues**: [GitHub Issues](https://github.com/your-org/open-agent-builder/issues)
