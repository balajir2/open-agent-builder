# CLAUDE.md

**Last Updated:** November 19, 2025

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

**Currently Supported:**
- **Anthropic Claude** - Full native MCP support (Haiku 4.5, Sonnet 4.5)
- **OpenAI, Groq** - MCP support in development

## Configuration

### Environment Variables

Required in `.env.local`:

```bash
# Convex Database
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://your-domain.clerk.accounts.dev

# Firecrawl (REQUIRED)
FIRECRAWL_API_KEY=fc-...

# Security (REQUIRED for Production)
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
ENCRYPTION_KEY=<32-byte-base64-key>

# E2B Sandbox (REQUIRED for Transform Nodes)
E2B_API_KEY=e2b_...

# Optional: Default LLM providers (users can add their own in UI)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...

# Optional: HTTP Domain Whitelist (security)
# ALLOWED_HTTP_DOMAINS=api.example.com,*.trusted.com
```

### Clerk + Convex Setup

1. Update `convex/auth.config.ts` with your Clerk domain
2. Run: `npx convex env set CLERK_JWT_ISSUER_DOMAIN "https://your-domain.clerk.accounts.dev"`
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
