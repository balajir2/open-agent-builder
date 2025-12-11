# CLAUDE.md
<<<<<<< HEAD

=======
>>>>>>> b37dccc822db82c67a74be329bb163b817499694
**Last Updated:** December 3, 2025

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🔑 CRITICAL: API Key Architecture Principle

**ALL API keys MUST be stored in Convex environment variables ONLY. NO keys in `.env.local`.**

### Design Principles:
1. **Single Source of Truth**: All system API keys are stored in Convex environment via `npx convex env set`
2. **Zero Keys in .env.local**: The `.env.local` file contains ONLY Next.js configuration (Clerk, Convex URL, etc.)
3. **Convex Retrieval**: Next.js API routes retrieve keys from Convex via `convex/systemApiKeys.ts` queries
4. **Two-Tier System**:
   - **Tier 1**: User-specific keys (stored in Convex DB `userLLMKeys` table) - highest priority
   - **Tier 2**: System keys (stored in Convex environment) - fallback for all users

### Implementation:
```typescript
// ❌ WRONG - Never use process.env in API routes
const apiKey = process.env.ANTHROPIC_API_KEY;

// ✅ CORRECT - Always retrieve from Convex
const systemKeys = await convexClient.action(api.systemApiKeys.getAllSystemApiKeys);
const apiKey = systemKeys.anthropic;
```

**Note:** System API keys are retrieved via Convex **actions** (not queries) because they use Node.js runtime to access `process.env`.

### Why This Matters:
- **Production Ready**: Keys work across all deployment environments (local, Vercel, etc.)
- **Team Sync**: All developers automatically get the same system configuration
- **Security**: Keys stored server-side, never exposed to client or git
- **Centralized**: One place to manage all API keys
- **Deployment-Specific**: Different keys for dev vs. prod

## Overview

Open Agent Builder is a visual workflow builder for creating AI agent pipelines powered by Firecrawl. It uses Next.js 16, React 19, LangGraph for workflow orchestration, Convex for real-time database, and Clerk for authentication. The project includes both a visual workflow builder and a UI Builder for creating custom interfaces.

## Essential Commands

### Development

```bash
# Run Next.js dev server only
npm run dev

# Run both Convex dev server AND Next.js (recommended)
npm run dev:all

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Convex Database

```bash
# Start Convex dev server (required for development)
npx convex dev

# Deploy Convex to production
npx convex deploy

# Set Convex environment variables
npx convex env set CLERK_JWT_ISSUER_DOMAIN "https://your-domain.clerk.accounts.dev"
```

### Testing

```bash
# Run all Playwright tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in headed mode (visible browser)
npm run test:headed

# Test specific workflow templates
npm run test:simple       # Simple scraper template
npm run test:search       # Web search template
npm run test:price        # Price tracker template
npm run test:research     # Content research template

# Run comprehensive test suite
npm run test:comprehensive
npm run test:templates
npm run test:all:comprehensive
```

## Architecture

### Core Technology Stack

- **Next.js 16 (canary)** - React framework with App Router
- **React 19** - UI components
- **TypeScript** - Type safety across the stack
- **LangGraph** - Workflow orchestration engine with StateGraph
- **Convex** - Real-time database with automatic reactivity
- **Clerk** - Authentication with JWT integration
- **Firecrawl** - Web scraping API

### Project Structure

```
open-agent-builder/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── workflows/            # Workflow execution endpoints
│   │   │   └── [workflowId]/
│   │   │       ├── execute-stream/  # SSE streaming execution
│   │   │       ├── execute/          # Standard execution
│   │   │       └── resume/           # Resume after approval
│   │   ├── approval/             # Human-in-the-loop approvals
│   │   ├── execute-*/            # Node-specific executors
│   │   └── config/               # Configuration endpoints
│   ├── ui-builder/               # UI Builder application
│   ├── workflows/                # Workflow pages
│   └── page.tsx                  # Home page
├── components/
│   ├── app/                      # Application components
│   │   └── (home)/sections/
│   │       └── workflow-builder/ # Workflow Builder UI
│   │           ├── WorkflowBuilder.tsx  # Main builder orchestrator
│   │           ├── NodePanel.tsx        # Node configuration panels
│   │           ├── ExecutionPanel.tsx   # Execution viewer
│   │           └── *NodePanel.tsx       # Type-specific panels
│   ├── ui-builder/               # UI Builder components
│   │   ├── UIBuilderCanvas.tsx   # Main canvas orchestrator
│   │   ├── ComponentPalette.tsx  # Draggable components
│   │   ├── DroppedComponent.tsx  # Rendered components
│   │   └── ResponseDisplay.tsx   # SSE event viewer
│   └── ui/                       # Reusable UI components
├── lib/
│   ├── workflow/
│   │   ├── langgraph.ts          # LangGraph executor (server-only)
│   │   ├── executors/            # Node type executors
│   │   │   ├── agent.ts          # AI agent execution
│   │   │   ├── mcp.ts            # MCP tool execution
│   │   │   ├── extract.ts        # LLM extraction
│   │   │   ├── http.ts           # HTTP requests
│   │   │   ├── logic.ts          # Conditional logic
│   │   │   ├── data.ts           # Data transforms
│   │   │   └── tools.ts          # Firecrawl tools
│   │   ├── types.ts              # Workflow type definitions
│   │   ├── validation.ts         # Workflow validation
│   │   ├── edge-cleanup.ts       # Edge validation & cleanup
│   │   └── templates.ts          # Workflow templates
│   ├── api/                      # API utilities
│   ├── mcp/                      # MCP registry & resolver
│   └── convex/                   # Convex client utilities
├── convex/                       # Convex backend
│   ├── schema.ts                 # Database schema
│   ├── auth.config.ts            # Clerk auth configuration
│   ├── workflows.ts              # Workflow CRUD operations
│   ├── executions.ts             # Execution tracking
│   ├── userLLMKeys.ts            # User API key management
│   ├── mcpServers.ts             # MCP server registry
│   └── approvals.ts              # Approval records
├── hooks/                        # React hooks
│   ├── useWorkflow.ts            # Workflow state management
│   └── useWorkflowExecution.ts   # Execution monitoring
├── proxy.ts                      # Next.js 16 authentication proxy
└── next.config.js                # Next.js configuration
```

### Workflow Execution Architecture

**Key Concept:** Workflows are converted to LangGraph StateGraphs for execution.

1. **Workflow Definition** - Users create workflows in React Flow visual builder
2. **Storage** - Workflows saved to Convex `workflows` table
3. **Execution Request** - API receives workflow execution request
4. **LangGraph Conversion** - `LangGraphExecutor` converts workflow to StateGraph
5. **Node Execution** - Each node type has dedicated executor in `lib/workflow/executors/`
6. **State Management** - LangGraph manages state transitions and routing
7. **Streaming** - Server-Sent Events (SSE) stream real-time updates
8. **Completion** - Final state saved to Convex `executions` table

**Core Node Types (10):**
- `start` - Entry point with input variables
- `agent` - AI agent with LLM (Claude, GPT-4o, Groq)
- `mcp` - MCP tool calls (Firecrawl integration)
- `extract` - LLM-powered structured data extraction
- `http` - HTTP API requests
- `transform` - Data manipulation (JavaScript)
- `if-else` - Conditional routing
- `while` - Loop iteration
- `user-approval` - Human-in-the-loop pause
- `end` - Terminal node

**Additional Node Types (4):**
- `set-state` - Direct state variable manipulation
- `guardrails` - Content moderation and safety checks
- `arcade` - Arcade tool integration
- `note` - Documentation and annotation nodes

### Database Schema (Convex)

**Key Tables:**
- `workflows` - Workflow definitions (nodes + edges)
- `executions` - Execution state and results
- `userLLMKeys` - User API keys (encrypted)
- `mcpServers` - MCP server registry
- `approvals` - Human-in-the-loop approval records
- `apiKeys` - User-generated API keys for programmatic access

### Authentication Flow

1. **Clerk** handles user authentication in browser
2. **proxy.ts** validates JWT tokens for protected routes
3. **Convex** receives authenticated requests with `userId`
4. **API Routes** can use API key authentication for programmatic access

**Important:**
- User-facing routes require Clerk authentication
- `/api/workflows/{id}/execute*` routes support both Clerk and API key auth
- MCP server configurations are user-scoped

### UI Builder Architecture

The UI Builder (`/ui-builder`) enables users to create custom interfaces that execute workflows:

1. **ComponentPalette** - 15 draggable UI components (Button, Input, Card, etc.)
2. **UIBuilderCanvas** - Main orchestrator managing drag-drop state
3. **DroppedComponent** - Renders components with click-to-edit configuration
4. **WorkflowSelector** - Links UI to specific workflow
5. **ResponseDisplay** - Real-time SSE event viewer

**Data Flow:**
```
User drags component → Drop on canvas → Configure props →
Select workflow → Fill inputs → Click button →
Execute workflow → Stream SSE events → Display results
```

## Key Development Patterns

### Adding a New Node Type

1. **Define Type** in `lib/workflow/types.ts`:
   ```typescript
   type: 'agent' | 'mcp' | ... | 'your-new-type'
   ```

2. **Create Executor** in `lib/workflow/executors/your-new-type.ts`:
   ```typescript
   export async function executeYourNode(
     node: WorkflowNode,
     state: typeof WorkflowStateAnnotation.State,
     apiKeys?: any
   ): Promise<NodeExecutionResult> {
     // Implementation
   }
   ```

3. **Integrate in LangGraph** in `lib/workflow/langgraph.ts`:
   - Add to `createNodeFunction()` switch statement
   - Add routing logic if needed

4. **Create UI Panel** in `components/app/(home)/sections/workflow-builder/YourNodePanel.tsx`

5. **Update WorkflowBuilder** to show panel when node is selected

### Server-Side Only Code

LangGraph and certain libraries must run server-side only:

```typescript
import 'server-only'; // Add this to files using LangGraph

// In next.config.js, add to serverExternalPackages:
serverExternalPackages: [
  '@langchain/langgraph',
  '@e2b/code-interpreter',
  // Add other server-only packages
]
```

### Working with User API Keys

Users can store their own LLM API keys encrypted in Convex:

```typescript
// In API routes, retrieve user's key:
import { getLLMApiKey } from '@/lib/api/llm-keys';

const apiKey = await getLLMApiKey(userId, 'anthropic');
// Falls back to environment variable if user hasn't set one
```

**Security:** Keys are encrypted in `convex/userLLMKeys.ts` with AES-256-GCM using `convex/lib/encryption.ts`.

### Real-Time Execution Updates (SSE)

Workflow execution streams events via Server-Sent Events:

```typescript
// In API route:
const encoder = new TextEncoder();
const stream = new ReadableStream({
  async start(controller) {
    controller.enqueue(
      encoder.encode(`event: node_started\ndata: ${JSON.stringify(data)}\n\n`)
    );
  }
});

return new Response(stream, {
  headers: {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  },
});
```

**Event Types:**
- `workflow_started` - Execution begins
- `node_started` - Node begins execution
- `node_completed` - Node finishes successfully
- `node_failed` - Node encounters error
- `workflow_completed` - Workflow finishes
- `error` - Fatal error

### Edge Validation and Auto-Save

The system automatically validates and cleans up invalid workflow connections:

```typescript
import { cleanupInvalidEdges } from '@/lib/workflow/edge-cleanup';

const { edges: validEdges, removedCount } = cleanupInvalidEdges(nodes, edges);
```

Workflows auto-save after 500ms debounce using `useWorkflow` hook.

### MCP (Model Context Protocol) Integration

MCP servers provide tools to agents (e.g., Firecrawl for web scraping):

1. **Registry** - MCP servers stored in `convex/mcpServers`
2. **Resolution** - `lib/mcp/resolver.ts` fetches available tools
3. **Execution** - `lib/workflow/executors/mcp.ts` calls MCP tools
4. **Agent Integration** - Agents can use MCP tools via `tools` property

**All LLM Providers Support MCP & Tools:**
- **Anthropic Claude** - Haiku 4.5, Sonnet 4.5, Opus 4.5
- **OpenAI** - GPT-4o, GPT-4o-mini
- **Google Gemini** - 2.0 Flash Experimental, 2.0 Flash, 2.0 Flash-Lite
- **Groq** - Llama 3.3 70B, Llama 3.1 8B Instant, GPT OSS 120B, GPT OSS 20B

All models work with both standard tools (Firecrawl, Tavily, Serper, E2B) and MCP protocol.

## Security

### Security Architecture

The Open Agent Builder implements comprehensive security measures to protect against common web vulnerabilities and ensure safe workflow execution.

#### Key Security Features

**1. Code Injection Protection**
- ✅ **No Function() Constructor** - All dynamic code evaluation uses sandboxed environments
- ✅ **E2B Sandbox** - Transform nodes execute in isolated E2B Code Interpreter
- ✅ **mathjs Evaluator** - Safe expression evaluation for if-else and while conditions
- ✅ **Prototype Pollution Protection** - Clean scopes with `Object.create(null)`

**2. Input Validation (Zod)**
- ✅ **Type Safety** - All API inputs validated with Zod schemas
- ✅ **Length Limits** - Maximum sizes to prevent DoS attacks
- ✅ **Format Validation** - Regex patterns for IDs, URLs, etc.
- ✅ **SSRF Protection** - Private IP addresses and localhost blocked in HTTP nodes

**3. XSS Protection**
- ✅ **DOMPurify** - HTML sanitization in workflow results display
- ✅ **Tag Whitelist** - Only safe HTML tags allowed
- ✅ **Attribute Filter** - Script handlers and dangerous attributes removed

**4. Authorization & Access Control**
- ✅ **Ownership Checks** - Users can only modify their own workflows/MCP servers
- ✅ **JWT Authentication** - Clerk-based authentication for all protected routes
- ✅ **API Key Authentication** - Optional API key auth for programmatic access

**5. CORS Configuration**
- ✅ **Origin Whitelist** - Environment-specific allowed origins
- ✅ **No Wildcards** - Explicit origin validation
- ✅ **Convex Subdomain Support** - *.convex.cloud and *.convex.site allowed

**6. Dependency Security**
- ✅ **Regular Audits** - Automated npm audit checks
- ✅ **Secure Libraries** - Vulnerable packages replaced (expr-eval → mathjs)
- ✅ **Up-to-date Dependencies** - Critical security patches applied

#### Security Best Practices for Developers

When working on this codebase:

1. **Never use `eval()` or `Function()` constructor** - Use `safeEvaluate()` from `lib/workflow/safe-expression-evaluator.ts`
2. **Always validate user input** - Use Zod schemas from `lib/api/validation-schemas.ts`
3. **Sanitize HTML output** - Use DOMPurify before rendering user-generated content
4. **Check ownership** - Always verify user owns resource before modification
5. **Use parameterized queries** - Convex queries are safe by default
6. **Add rate limiting** - Critical endpoints have rate limits via `distributed-rate-limiter.ts`

#### Security Documentation

- **Comprehensive Security Report:** [docs/SECURITY-FIXES-REPORT.md](docs/SECURITY-FIXES-REPORT.md)
- **API Key Migration:** [CLEANUP-SUMMARY.md](CLEANUP-SUMMARY.md)
- **Validation Schemas:** [lib/api/validation-schemas.ts](lib/api/validation-schemas.ts)

#### Known Security Considerations

**Low-Risk Known Issues:**
- `html-docx-js` has vulnerable dependencies (jszip, lodash.merge)
- Only affects Word document export feature
- Isolated to server-side, low attack surface
- Recommended: Replace with alternative library (docx, officegen)

**Security Testing:**
```bash
# Run security audit
npm audit

# Check for vulnerabilities
npm audit fix

# View security report
cat docs/SECURITY-FIXES-REPORT.md
```

## Configuration

### Two-Tier API Key Architecture

This project uses a **two-tier API key system** that provides both convenience and flexibility:

**Tier 1: System-Level Keys (Convex Environment)**
- Stored in Convex environment variables
- Available to ALL users as fallback
- Set via: `npx convex env set KEY_NAME value`
- Used when user hasn't provided their own key

**Tier 2: User-Specific Keys (Convex Database)**
- Stored encrypted in Convex database
- User-provided keys via Settings UI
- Takes precedence over system keys
- Optional - users can rely on system keys

### Environment Variables

#### Required in `.env.local` (Next.js Configuration)

These keys MUST stay in `.env.local` because Next.js needs them:

```bash
# Convex Database Connection (REQUIRED - Next.js client needs these)
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOYMENT=dev:your-deployment
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://your-deployment.convex.site/http/uploadFile

# Clerk Authentication (REQUIRED - Next.js proxy.ts needs these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://your-domain.clerk.accounts.dev

# Optional: LangSmith Tracing (Next.js API routes only)
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_...
LANGCHAIN_PROJECT=open-agent-builder
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
```

#### Required in Convex Environment (System API Keys)

These keys should be stored in **Convex environment variables**, NOT in `.env.local`:

```bash
# Set system-level API keys in Convex (available to all users as fallback)
npx convex env set ENCRYPTION_KEY "<32-byte-base64-key>"
npx convex env set CLERK_JWT_ISSUER_DOMAIN "https://your-domain.clerk.accounts.dev"

# LLM Providers (system fallback - users can add their own in UI)
npx convex env set ANTHROPIC_API_KEY "sk-ant-..."
npx convex env set OPENAI_API_KEY "sk-..."
npx convex env set GROQ_API_KEY "gsk_..."
npx convex env set GOOGLE_API_KEY "AIzaSy..."

# Tools & Services (system fallback - users can add their own in UI)
npx convex env set FIRECRAWL_API_KEY "fc-..."
npx convex env set E2B_API_KEY "e2b_..."
npx convex env set TAVILY_API_KEY "tvly-..."
npx convex env set ARCADE_API_KEY "arcade_..."

# Optional: LangSmith (if you want server-side tracing)
npx convex env set LANGCHAIN_API_KEY "lsv2_pt_..."
npx convex env set LANGCHAIN_TRACING_V2 "true"
npx convex env set LANGCHAIN_PROJECT "open-agent-builder"
npx convex env set LANGCHAIN_ENDPOINT "https://api.smith.langchain.com"
```

**Generate ENCRYPTION_KEY:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**List current Convex environment:**
```bash
npx convex env list              # Development
npx convex env list --prod       # Production
```

#### Migration from .env.local to Convex

If you have API keys in `.env.local` that should be in Convex:

```bash
# Automated migration (dry run first)
node scripts/migrate-keys-to-convex.js --dry-run

# Apply migration to development
node scripts/migrate-keys-to-convex.js

# Apply to production
node scripts/migrate-keys-to-convex.js --prod
```

### Why This Architecture?

**✅ Advantages:**
- **Convenience**: Users can start using workflows immediately with system keys
- **Flexibility**: Power users can provide their own keys for cost control
- **Security**: Keys encrypted in Convex, never exposed to client
- **Production Ready**: Works seamlessly in Vercel/production deployments
- **Team Friendly**: All developers share system config via Convex
- **Deployment-Specific**: Different keys for dev vs. prod environments

**How it works in code:**
```typescript
// From app/api/workflows/[workflowId]/execute-stream/route.ts
const apiKeys = {
  anthropic: (await getLLMApiKey('anthropic', userId))  // User key first
             ?? process.env.ANTHROPIC_API_KEY,           // Fall back to system
  // ... etc
};
```

### LangSmith Monitoring Setup

To monitor workflow execution in LangSmith:

1. **Sign up** for LangSmith at [https://smith.langchain.com/](https://smith.langchain.com/)
2. **Get your API key** from the LangSmith dashboard (Settings → API Keys)
3. **Set in Convex** (recommended) OR `.env.local`:
   ```bash
   # Option 1: Convex (recommended for production)
   npx convex env set LANGCHAIN_TRACING_V2 "true"
   npx convex env set LANGCHAIN_API_KEY "lsv2_pt_your_api_key_here"
   npx convex env set LANGCHAIN_PROJECT "open-agent-builder"
   npx convex env set LANGCHAIN_ENDPOINT "https://api.smith.langchain.com"

   # Option 2: .env.local (for local development only)
   LANGCHAIN_TRACING_V2=true
   LANGCHAIN_API_KEY=lsv2_pt_your_api_key_here
   LANGCHAIN_PROJECT=open-agent-builder
   LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
   ```
4. **Restart your dev server** with `npm run dev:all`
5. **Execute a workflow** - traces will appear in LangSmith dashboard

**What you'll see in LangSmith:**
- Full workflow execution traces with timing
- LLM calls with prompts and responses
- Agent reasoning steps and tool usage
- MCP server interactions
- State transitions between nodes
- Error details and stack traces

### Clerk + Convex Setup

1. Update `convex/auth.config.ts` with your Clerk domain
2. Set in **both** `.env.local` AND Convex:
   ```bash
   # In .env.local (for Next.js)
   CLERK_JWT_ISSUER_DOMAIN=https://your-domain.clerk.accounts.dev

   # In Convex (for backend)
   npx convex env set CLERK_JWT_ISSUER_DOMAIN "https://your-domain.clerk.accounts.dev"
   ```
3. Create Clerk JWT template for Convex in Clerk dashboard

### Next.js 16 Proxy Authentication

This project uses `proxy.ts` (not `middleware.ts`) for Next.js 16 compatibility:

- **Public routes** - No authentication required
- **Protected routes** - Require Clerk authentication
- **API key routes** - Support API key authentication (bypass Clerk)

## Common Development Tasks

### Creating a New Workflow Template

Add to `lib/workflow/templates.ts`:

```typescript
export const templates = [
  {
    id: 'your-template-id',
    name: 'Your Template Name',
    description: 'Description',
    category: 'web-scraping',
    nodes: [...],
    edges: [...],
  },
];
```

### Testing Workflow Execution

```bash
# Test a specific template
npm run test:simple

# Or create test in scripts/test-workflow.js
node scripts/test-workflow.js your-template-id
```

### Debugging LangGraph Execution

Enable debug logging in `lib/workflow/langgraph.ts`:

```typescript
// The executor logs node execution in console
console.log(`[LangGraph] Executing node: ${nodeId}`);
```

### Adding UI Components to UI Builder

1. Add to `ComponentPalette.tsx`:
   ```typescript
   const components = [
     { id: 'your-component', name: 'Your Component', icon: Icon },
   ];
   ```

2. Add renderer in `DroppedComponent.tsx`:
   ```typescript
   case 'your-component':
     return <YourComponent {...localProps} />;
   ```

3. Add default props in `UIBuilderCanvas.tsx`

## Important Notes

### Windows Path Handling

This project is developed on Windows. Be aware of path separators when running on Linux/Mac.

### Convex Development

Always keep `npx convex dev` running in a separate terminal during development. The frontend cannot function without it.

### TypeScript Strict Mode

The project uses strict TypeScript. All new code should:
- Define proper types (avoid `any` when possible)
- Use type-safe Convex queries/mutations
- Export interfaces for reusable types

### React 19 & Next.js 16

This project uses canary versions:
- Use `use client` directive for client components
- Server components by default in App Router
- Server Actions not currently used (API routes instead)

### Workflow State Immutability

LangGraph state uses reducers. Never mutate state directly:

```typescript
// ✅ Correct
return { variables: { ...state.variables, newKey: value } };

// ❌ Wrong
state.variables.newKey = value;
return state;
```

## Documentation Resources

- **README.md** - Setup instructions and features
- **UI-BUILDER-README.md** - UI Builder complete documentation
- **UI-BUILDER-QUICKSTART.md** - 5-minute tutorial
- **UI-BUILDER-ARCHITECTURE.md** - Architecture diagrams
- **IMPLEMENTATION-SUMMARY.md** - Recent implementation details

## Testing Guidance

When writing tests:
- Use Playwright for E2E tests
- Test workflow execution via API routes
- Verify SSE streaming events
- Check Convex database state after operations
- Test authentication flows (Clerk + API keys)

When debugging tests:
```bash
# Use headed mode to see browser
npm run test:headed

# Use UI mode for interactive debugging
npm run test:ui
```

---

## Adding New Tools

This section explains how to add new tools to the framework in a future-proof way.

### Quick Start

Adding a new tool requires just **3 steps**:

1. **Define the tool** in `lib/tools/registry.ts`
2. **Implement the tool** in `lib/workflow/executors/tool-factory.ts`
3. **Test the tool** in a workflow

The framework handles all response formats automatically.

### Tool Architecture

```
Tool Registry (lib/tools/registry.ts)
  └─> Defines tool metadata, fields, UI config

Tool Factory (lib/workflow/executors/tool-factory.ts)
  └─> Creates tool instances with wrapToolFunction()

Tool Utils (lib/workflow/executors/tool-utils.ts)
  └─> Automatic result normalization & error handling

Agent Executor (lib/workflow/executors/agent.ts)
  └─> Invokes tools and processes results
```

For complete details, see `ADDING-NEW-TOOLS.md`.

