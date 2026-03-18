# Highspot MCP Integration Plan

**Last Updated:** March 17, 2026
**Status:** In Progress (OAuth infrastructure complete)
**Author:** AI-Assisted Planning

## Overview

This document outlines the plan to integrate **Highspot** (sales enablement platform) with Open Agent Builder via a custom **MCP (Model Context Protocol) server**. Since Highspot does not offer a native MCP server, we will build a lightweight MCP wrapper around Highspot's REST API v0.5.

Once integrated, agents in Open Agent Builder will be able to autonomously search, retrieve, and analyze Highspot content (pitches, spots, items, analytics) within workflows.

## Prerequisites

### Access Requirements

| Requirement | Details |
|---|---|
| **Highspot Plan** | Enterprise Platform+ Package (required for API access) |
| **OAuth 2.0 Credentials** | Client Key + Client Secret from Highspot (User Settings > Developer) |
| **API Base URL** | `https://api.highspot.com/v0.5/` (may vary: `https://api-su2.highspot.com/v0.5/`) |
| **Open Agent Builder** | Running instance with MCP support |

### Current State

- **Highspot API**: REST v0.5, OAuth 2.0 authentication, JSON responses
- **Official MCP Server**: Highspot now provides `https://mcp.highspot.com/mcp` with 7 tools
- **OAuth Infrastructure**: Open Agent Builder now has native MCP OAuth 2.0 support (Authorization Code with PKCE, Client Credentials, encrypted token storage, auto-refresh)
- **Community MCP Server**: [dmiyamasu/mcp-highspot.com](https://github.com/dmiyamasu/mcp-highspot.com) - early-stage, 6 commits, minimal documentation, not production-ready
- **Python SDK (Unofficial)**: [jeffshurtliff/highspot](https://github.com/jeffshurtliff/highspot) - available for reference

### What's Already Built

With the MCP OAuth 2.0 infrastructure now in place, Highspot integration no longer requires a custom MCP wrapper. Users can connect directly to Highspot's official MCP server:

1. **Settings > MCP Servers > Add MCP Server**
2. Auth Type: **OAuth 2.0**
3. Server URL: `https://mcp.highspot.com/mcp`
4. Auth URL: `https://app.highspot.com/oauth2/v1/authorize`
5. Token URL: `https://app.highspot.com/auth/oauth2/v1/token`
6. Client ID / Secret from Highspot Developer Settings
7. Click **Connect** to authorize

Available tools: `search_content`, `get_item_content`, `get_content_answer`, `get_content_recommendations`, `generate_pitch`, `get_deal_answer`, `lookup_deal`

## Architecture

### Integration Approach

**Update (March 2026):** With native MCP OAuth 2.0 support and Highspot's official MCP server, a custom wrapper is no longer required for the primary integration. Users connect directly to `https://mcp.highspot.com/mcp` using OAuth 2.0 credentials. The custom wrapper approach below remains valid for advanced use cases (custom tools, caching, aggregation).

**Original Plan:** Build a custom MCP server that wraps Highspot's REST API and deploy it as a standalone service.

```
┌──────────────────────────────────────────────────────────────┐
│                    Open Agent Builder                         │
│                                                              │
│  ┌──────────┐    ┌───────────┐    ┌──────────────────────┐  │
│  │  Agent    │───>│ MCP Node  │───>│ MCP Resolution       │  │
│  │  Node     │    │           │    │ (lib/mcp/resolver.ts)│  │
│  └──────────┘    └───────────┘    └──────────┬───────────┘  │
│                                               │              │
└───────────────────────────────────────────────┼──────────────┘
                                                │
                                    JSON-RPC 2.0 (tools/list, tools/call)
                                                │
                                                ▼
                               ┌────────────────────────────┐
                               │   Highspot MCP Server       │
                               │   (Custom Wrapper)          │
                               │                            │
                               │  - tools/list              │
                               │  - tools/call              │
                               │  - OAuth 2.0 token mgmt   │
                               └──────────┬─────────────────┘
                                          │
                                   REST API v0.5
                                          │
                                          ▼
                               ┌────────────────────────────┐
                               │   Highspot Platform         │
                               │   api.highspot.com/v0.5/   │
                               └────────────────────────────┘
```

### Why MCP Wrapper (Not HTTP Nodes)

| Approach | Pros | Cons |
|---|---|---|
| **MCP Wrapper** | Agent autonomy, reusable across workflows, discoverable tools, fits existing architecture | Requires building + hosting a service |
| **HTTP Nodes** | No middleware needed, quick to set up | Manual config per workflow, no agent autonomy, not reusable |

**Decision: MCP Wrapper** - better long-term value and fits the platform's architecture.

## MCP Tools to Implement

### Phase 1: Core Content Access

| MCP Tool Name | Highspot API Endpoint | Description |
|---|---|---|
| `highspot_search` | `GET /items?search=` | Search for content items by keyword |
| `highspot_get_item` | `GET /items/{id}` | Retrieve a specific content item with metadata |
| `highspot_get_item_content` | `GET /items/{id}/content` | Download/extract content from an item |
| `highspot_list_spots` | `GET /spots` | List available spots (content collections) |
| `highspot_get_spot` | `GET /spots/{id}` | Get details of a specific spot |

### Phase 2: Sales Enablement

| MCP Tool Name | Highspot API Endpoint | Description |
|---|---|---|
| `highspot_get_pitches` | `GET /pitches` | Retrieve sales pitches |
| `highspot_get_item_analytics` | `GET /items/{id}/report` | Get usage analytics for content |
| `highspot_list_users` | `GET /users` | List users in the organization |
| `highspot_get_user` | `GET /users/{id}` | Get specific user details |

### Phase 3: Advanced Operations

| MCP Tool Name | Highspot API Endpoint | Description |
|---|---|---|
| `highspot_list_groups` | `GET /groups` | List user groups |
| `highspot_get_bookmarks` | `GET /items/{id}/bookmarks` | Get item bookmarks |
| `highspot_get_cms_metadata` | `GET /items/{id}/cms-metadata` | Get CMS metadata |
| `highspot_create_activity` | `POST /activities` | Create an activity record |

## Implementation Plan

### Step 1: Create the Highspot MCP Server

**Location**: New standalone repository or `/mcp-servers/highspot/` directory

**Tech Stack**:
- **Runtime**: Node.js (TypeScript)
- **Framework**: Express.js or Hono
- **Protocol**: JSON-RPC 2.0 (MCP standard)
- **Auth**: OAuth 2.0 client credentials flow

**File Structure**:
```
mcp-server-highspot/
├── src/
│   ├── index.ts                 # Express server entry point
│   ├── mcp-handler.ts           # JSON-RPC request router
│   ├── tools/
│   │   ├── registry.ts          # Tool definitions (name, description, schema)
│   │   ├── search.ts            # highspot_search implementation
│   │   ├── items.ts             # highspot_get_item, get_item_content
│   │   ├── spots.ts             # highspot_list_spots, get_spot
│   │   ├── pitches.ts           # highspot_get_pitches
│   │   └── analytics.ts         # highspot_get_item_analytics
│   ├── highspot-client.ts       # Highspot REST API client wrapper
│   ├── auth.ts                  # OAuth 2.0 token management & refresh
│   └── types.ts                 # TypeScript interfaces
├── package.json
├── tsconfig.json
├── Dockerfile                   # For containerized deployment
├── .env.template                # Required environment variables
└── README.md
```

**MCP Protocol Implementation**:

```typescript
// mcp-handler.ts - Core JSON-RPC handler

// POST / (JSON-RPC 2.0)
// Method: tools/list
// Response: { result: { tools: [...] } }

// Method: tools/call
// Params: { name: "highspot_search", arguments: { query: "..." } }
// Response: { result: { content: [{ type: "text", text: "..." }] } }
```

**Tool Definition Example**:

```typescript
// tools/registry.ts
{
  name: "highspot_search",
  description: "Search for content items in Highspot by keyword. Returns matching items with titles, descriptions, and metadata.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search query to find content items"
      },
      limit: {
        type: "number",
        description: "Maximum number of results (default: 10, max: 100)",
        default: 10
      },
      spot_id: {
        type: "string",
        description: "Optional: Filter results to a specific spot/collection"
      }
    },
    required: ["query"]
  }
}
```

**OAuth 2.0 Token Management**:

```typescript
// auth.ts
// - Obtain token using client_key + client_secret
// - Cache token in memory with TTL
// - Auto-refresh before expiration
// - Thread-safe token refresh
```

### Step 2: Deploy the MCP Server

**Deployment Options** (in order of recommendation):

| Option | Pros | Cons |
|---|---|---|
| **Vercel Serverless** | Same infra as main app, easy deploy | Cold starts, 10s timeout on free plan |
| **AWS Lambda + API Gateway** | Scalable, low cost | More setup required |
| **Azure Container Apps** | Fits enterprise Azure ecosystem | Requires Azure subscription |
| **Railway / Render** | Simple deployment, always-on | Monthly cost |

**Recommended**: Deploy alongside Open Agent Builder on **Vercel** as a separate project, or use **Railway/Render** for an always-on endpoint.

**Environment Variables for MCP Server**:
```bash
HIGHSPOT_CLIENT_KEY=your-client-key
HIGHSPOT_CLIENT_SECRET=your-client-secret
HIGHSPOT_API_BASE_URL=https://api.highspot.com/v0.5
MCP_AUTH_TOKEN=shared-secret-for-mcp-auth  # Optional: protect MCP endpoint
```

### Step 3: Register in Open Agent Builder

Once the MCP server is deployed and accessible, register it via the **Settings UI**:

1. Navigate to **Settings** > **MCP Servers**
2. Click **Add MCP Server**
3. Configure:
   - **Name**: `Highspot`
   - **URL**: `https://your-highspot-mcp.vercel.app` (or deployed URL)
   - **Auth Type**: `bearer` or `api-key`
   - **Access Token**: MCP auth token (if endpoint is protected)
   - **Category**: `custom`
4. Click **Test Connection** to verify tool discovery
5. Save

**Alternatively**, register via Convex directly:
```bash
# If adding as an official MCP in the registry
# Update lib/mcp/mcp-registry.ts to include Highspot
```

### Step 4: API Key Management

**Native OAuth (Recommended):** Open Agent Builder now handles Highspot OAuth natively:
- OAuth credentials (Client ID, Client Secret) configured per-user in Settings UI
- Tokens encrypted (AES-256-GCM) and stored in Convex `mcpOAuthTokens` table
- Auto-refresh during workflow execution with 5-minute buffer
- No external token management required

**Custom Wrapper (Legacy):**
- Option A: MCP server manages Highspot auth via env vars
- Option B: Pass-through credentials from Open Agent Builder

### Step 5: Use in Workflows

**Example 1: Content Discovery Workflow**
```
Start (search query)
  → Agent (with Highspot MCP tools)
    → "Search Highspot for {{input.query}}"
    → Agent autonomously calls highspot_search
    → Agent calls highspot_get_item_content for top results
  → Agent (summarize findings)
  → End (output: content summary)
```

**Example 2: Sales Pitch Analysis**
```
Start (pitch criteria)
  → Agent (with Highspot + Tavily tools)
    → Fetch pitches from Highspot
    → Research competitor info via Tavily
    → Analyze and compare
  → Gamma AI (generate presentation)
  → End (output: presentation URL)
```

**Example 3: Content Analytics Dashboard**
```
Start (spot ID)
  → MCP Node (highspot_list_spots)
  → Agent (analyze content usage)
    → highspot_get_item_analytics for each item
  → Transform (aggregate data)
  → End (output: analytics report)
```

## Testing Plan

### Unit Tests
- [ ] OAuth 2.0 token acquisition and refresh
- [ ] Each MCP tool maps correctly to Highspot API endpoints
- [ ] JSON-RPC request/response format validation
- [ ] Error handling (401, 403, 404, 500, timeout)

### Integration Tests
- [ ] `tools/list` returns all registered Highspot tools
- [ ] `tools/call` for each tool with valid parameters
- [ ] Token expiry and auto-refresh during long workflows
- [ ] Rate limiting behavior

### E2E Tests in Open Agent Builder
- [ ] Add Highspot MCP server via Settings UI
- [ ] Test Connection discovers all tools
- [ ] Agent node can invoke Highspot tools
- [ ] MCP node can execute Highspot actions
- [ ] Workflow with Highspot tools executes end-to-end

## Security Considerations

| Concern | Mitigation |
|---|---|
| **Highspot credentials exposure** | Store in MCP server env vars, never in client |
| **MCP endpoint access** | Protect with Bearer token or IP whitelist |
| **Data leakage** | MCP server should not log sensitive content |
| **Token theft** | Use short-lived OAuth tokens, auto-refresh |
| **SSRF** | MCP server only calls Highspot API domain |

## Timeline Estimate

| Phase | Scope | Effort |
|---|---|---|
| **Phase 1** | MCP server + core tools (search, items, spots) | Medium |
| **Phase 2** | Sales tools (pitches, analytics, users) | Medium |
| **Phase 3** | Advanced tools + production hardening | Medium |
| **Registration** | Add to Open Agent Builder + test | Small |

## Open Questions

1. **Which Highspot deployment region?** The API base URL varies (`api.highspot.com` vs `api-su2.highspot.com`)
2. **Which content types are priority?** Items, Pitches, Spots - what does the team use most?
3. **Multi-tenant?** Should the MCP server support multiple Highspot accounts (different OAuth creds per user)?
4. **Hosting decision**: Same Vercel account or separate infrastructure?
5. **Community repo**: Should we fork/build upon [dmiyamasu/mcp-highspot.com](https://github.com/dmiyamasu/mcp-highspot.com) or start fresh?

## References

- [Highspot REST API Documentation](https://developer.highspot.com/)
- [MCP Protocol Specification](https://spec.modelcontextprotocol.io/)
- [Open Agent Builder MCP Guide](docs/guides/mcp-tools.md)
- [Adding New Tools Guide](docs/development/adding-tools.md)
- [Community Highspot MCP Repo](https://github.com/dmiyamasu/mcp-highspot.com)
- [Unofficial Highspot Python SDK](https://github.com/jeffshurtliff/highspot)
