# Open Agent Builder - Technical Documentation

**Version:** 1.0
**Last Updated:** December 2025

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Workflow Execution Engine](#workflow-execution-engine)
5. [Node Types Reference](#node-types-reference)
6. [Tools & Integrations](#tools--integrations)
7. [Database Schema](#database-schema)
8. [API Reference](#api-reference)
9. [Authentication & Security](#authentication--security)
10. [MCP Integration](#mcp-integration)
11. [Development Guide](#development-guide)
12. [Deployment](#deployment)

---

## Architecture Overview

Open Agent Builder is a visual workflow orchestration platform that converts drag-and-drop workflows into executable LangGraph state machines.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │  React Flow     │  │  UI Builder     │  │  Execution Panel    │  │
│  │  Canvas         │  │  Canvas         │  │  (SSE Consumer)     │  │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘  │
└───────────┼────────────────────┼─────────────────────┼──────────────┘
            │                    │                     │
            ▼                    ▼                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS API ROUTES                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │  /api/workflows │  │  /api/execute-* │  │  /api/approval      │  │
│  │  CRUD           │  │  Node Executors │  │  Human-in-Loop      │  │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬──────────┘  │
└───────────┼────────────────────┼─────────────────────┼──────────────┘
            │                    │                     │
            ▼                    ▼                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    LANGGRAPH EXECUTOR                                │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  StateGraph with MemorySaver Checkpointing                   │    │
│  │  ┌──────┐ ┌───────┐ ┌─────┐ ┌───────┐ ┌─────────┐ ┌─────┐  │    │
│  │  │start │→│ agent │→│ mcp │→│extract│→│transform│→│ end │  │    │
│  │  └──────┘ └───────┘ └─────┘ └───────┘ └─────────┘ └─────┘  │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
            │                    │                     │
            ▼                    ▼                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │ Convex  │  │ Claude  │  │Firecrawl│  │   E2B   │  │ Arcade  │   │
│  │   DB    │  │ GPT-4o  │  │   MCP   │  │ Sandbox │  │  Tools  │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Execution Flow

1. **Workflow Definition** - User creates workflow via React Flow visual editor
2. **Persistence** - Workflow saved to Convex `workflows` table (auto-save with 500ms debounce)
3. **Execution Request** - API receives execution request with input variables
4. **LangGraph Conversion** - `LangGraphExecutor` converts workflow nodes/edges to StateGraph
5. **Node Execution** - Each node type routes to dedicated executor in `lib/workflow/executors/`
6. **State Management** - LangGraph manages state transitions with MemorySaver checkpointing
7. **Streaming** - Server-Sent Events (SSE) stream real-time progress to client
8. **Completion** - Final state saved to Convex `executions` table

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 16 (canary) | React framework with App Router |
| **UI Library** | React 19 | Component rendering |
| **Type Safety** | TypeScript | Static typing across stack |
| **Workflow Canvas** | React Flow | Visual node-based editor |
| **UI Builder** | @dnd-kit | Drag-and-drop UI components |
| **Database** | Convex | Real-time database with reactivity |
| **Authentication** | Azure AD + NextAuth.js | Enterprise SSO authentication |
| **Orchestration** | LangGraph | State machine workflow engine |
| **LLM Providers** | Anthropic, OpenAI, Google, Groq | AI model inference |
| **Web Scraping** | Firecrawl | Website-to-markdown conversion |
| **Code Execution** | E2B Code Interpreter | Sandboxed JavaScript execution |
| **Tool Protocol** | MCP (Model Context Protocol) | Standardized tool integration |

---

## Project Structure

```
open-agent-builder/
├── app/                              # Next.js App Router
│   ├── api/                          # API Routes (40+)
│   │   ├── workflows/                # Workflow CRUD & execution
│   │   │   └── [workflowId]/
│   │   │       ├── execute-stream/   # SSE streaming execution
│   │   │       ├── execute/          # Standard execution
│   │   │       ├── resume/           # Resume after interrupt
│   │   │       ├── metadata/         # Workflow metadata
│   │   │       └── variables/        # Input variables
│   │   ├── execute-agent/            # Direct agent execution
│   │   ├── execute-extract/          # Direct extraction
│   │   ├── execute-mcp/              # Direct MCP execution
│   │   ├── approval/                 # Human-in-loop
│   │   └── mcp/                      # MCP registry
│   ├── ui-builder/                   # UI Builder pages
│   ├── workflows/                    # Workflow pages
│   └── page.tsx                      # Home page
│
├── components/
│   ├── app/(home)/sections/
│   │   └── workflow-builder/         # Workflow Builder UI
│   │       ├── WorkflowBuilder.tsx   # Main orchestrator
│   │       ├── NodePanel.tsx         # Node configuration
│   │       ├── ExecutionPanel.tsx    # Execution viewer
│   │       └── *NodePanel.tsx        # Type-specific panels
│   ├── ui-builder/                   # UI Builder components
│   │   ├── UIBuilderCanvas.tsx       # Main canvas
│   │   ├── ComponentPalette.tsx      # Draggable components
│   │   ├── DroppedComponent.tsx      # Rendered components
│   │   └── ResponseDisplay.tsx       # SSE event viewer
│   └── ui/                           # Shared UI components
│
├── lib/
│   ├── workflow/
│   │   ├── langgraph.ts              # LangGraph executor (1400+ lines)
│   │   ├── types.ts                  # TypeScript definitions
│   │   ├── templates.ts              # Workflow templates
│   │   ├── variable-substitution.ts  # {{variable}} handling
│   │   ├── safe-expression-evaluator.ts # MathJS-based evaluation
│   │   └── executors/                # Node type executors
│   │       ├── agent.ts              # AI agent execution
│   │       ├── mcp.ts                # MCP tool execution
│   │       ├── extract.ts            # LLM extraction
│   │       ├── arcade.ts             # Arcade.dev integration
│   │       ├── data.ts               # Transform/set-state
│   │       ├── logic.ts              # Conditionals/loops
│   │       ├── http.ts               # HTTP requests
│   │       ├── tool-factory.ts       # Tool instantiation
│   │       └── tool-utils.ts         # Result normalization
│   ├── tools/
│   │   ├── registry.ts               # Tool definitions
│   │   └── types.ts                  # Tool type definitions
│   ├── mcp/
│   │   ├── resolver.ts               # MCP server resolution
│   │   └── registry.ts               # MCP server registry
│   └── api/
│       ├── config.ts                 # API key management
│       ├── llm-keys.ts               # User LLM key retrieval
│       └── validation-schemas.ts     # Zod validation
│
├── convex/                           # Convex Backend
│   ├── schema.ts                     # Database schema (13 tables)
│   ├── auth.config.ts                # NextAuth configuration
│   ├── workflows.ts                  # Workflow operations
│   ├── executions.ts                 # Execution tracking
│   ├── mcpServers.ts                 # MCP registry
│   ├── userLLMKeys.ts                # Encrypted user keys
│   ├── userToolKeys.ts               # Tool API keys
│   ├── systemApiKeys.ts              # System key retrieval
│   └── lib/encryption.ts             # AES-256-GCM encryption
│
├── hooks/
│   ├── useWorkflow.ts                # Workflow state management
│   └── useWorkflowExecution.ts       # Execution monitoring
│
└── middleware.ts                     # Route protection
```

---

## Workflow Execution Engine

### LangGraph StateGraph

The core executor (`lib/workflow/langgraph.ts`) converts visual workflows into LangGraph state machines.

#### State Annotation

```typescript
const WorkflowStateAnnotation = Annotation.Root({
  variables: Annotation<Record<string, any>>({
    reducer: (prev, next) => ({ ...prev, ...next }),
    default: () => ({}),
  }),
  chatHistory: Annotation<Array<{ role: string; content: string }>>({
    reducer: (prev, next) => [...prev, ...next],
    default: () => [],
  }),
  currentNodeId: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
  nodeResults: Annotation<Record<string, any>>({
    reducer: (prev, next) => ({ ...prev, ...next }),
    default: () => ({}),
  }),
  pendingAuth: Annotation<{ type: string; data: any } | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  loopResults: Annotation<any[]>({
    reducer: (prev, next) => [...prev, ...next],
    default: () => [],
  }),
});
```

#### Node Function Factory

```typescript
function createNodeFunction(node: WorkflowNode, workflow: Workflow) {
  return async (state: typeof WorkflowStateAnnotation.State) => {
    switch (node.type) {
      case 'agent':
        return await executeAgentNode(node, state, apiKeys);
      case 'mcp':
        return await executeMCPNode(node, state, apiKeys);
      case 'extract':
        return await executeExtractNode(node, state, apiKeys);
      case 'transform':
        return await executeTransformNode(node, state, apiKeys);
      case 'if-else':
        return await executeIfElseNode(node, state);
      case 'while':
        return await executeWhileNode(node, state);
      case 'user-approval':
        return await executeApprovalNode(node, state);
      // ... other node types
    }
  };
}
```

#### Routing Logic

```typescript
function createRoutingFunction(node: WorkflowNode, edges: WorkflowEdge[]) {
  return (state: typeof WorkflowStateAnnotation.State) => {
    // If-else routing based on condition result
    if (node.type === 'if-else') {
      const conditionResult = state.nodeResults[node.id]?.conditionResult;
      return conditionResult ? 'true_branch' : 'false_branch';
    }

    // While loop routing
    if (node.type === 'while') {
      const shouldContinue = state.nodeResults[node.id]?.shouldContinue;
      return shouldContinue ? 'loop_body' : 'exit';
    }

    // Default: follow first outgoing edge
    const outgoingEdge = edges.find(e => e.source === node.id);
    return outgoingEdge?.target || END;
  };
}
```

### Checkpointing & Human-in-Loop

LangGraph's MemorySaver enables pause/resume for human approval:

```typescript
const checkpointer = new MemorySaver();
const graph = new StateGraph(WorkflowStateAnnotation)
  .addNode('approval', async (state) => {
    // Interrupt execution for human review
    interrupt({ type: 'approval', nodeId: state.currentNodeId });
    return state;
  })
  .compile({ checkpointer });

// Resume after approval
const resumedState = await graph.invoke(null, {
  configurable: { thread_id: executionId },
});
```

---

## Node Types Reference

### Core Nodes

| Node | Executor | Description |
|------|----------|-------------|
| `start` | Built-in | Entry point, defines input variables |
| `end` | Built-in | Terminal node, collects output |
| `agent` | `agent.ts` | LLM reasoning with tool calling |
| `mcp` | `mcp.ts` | MCP tool execution (Firecrawl, etc.) |
| `extract` | `extract.ts` | LLM-powered JSON extraction |
| `http` | `http.ts` | HTTP API requests |
| `transform` | `data.ts` | E2B sandboxed JavaScript |
| `set-state` | `data.ts` | Direct variable assignment |

### Control Flow Nodes

| Node | Executor | Description |
|------|----------|-------------|
| `if-else` | `logic.ts` | Conditional branching |
| `while` | `logic.ts` | Loop iteration (max 100) |
| `user-approval` | `logic.ts` | Human-in-loop pause |

### Integration Nodes

| Node | Executor | Description |
|------|----------|-------------|
| `arcade` | `arcade.ts` | Arcade.dev third-party tools |
| `guardrails` | `tools.ts` | Content moderation |
| `gamma-ai` | `gamma.ts` | Presentation generation |

### Agent Node Configuration

```typescript
interface AgentNodeData {
  label: string;
  instructions: string;           // System prompt (supports {{variables}})
  provider: 'anthropic' | 'openai' | 'groq' | 'google';
  model: string;                  // e.g., 'claude-sonnet-4-5-20250514'
  temperature?: number;           // 0-1
  maxTokens?: number;
  tools?: ToolConfig[];           // Standard tools
  mcpServers?: MCPServerConfig[]; // MCP tool sources
  outputFormat?: 'text' | 'json';
  outputSchema?: object;          // JSON schema for structured output
}
```

### MCP Node Configuration

```typescript
interface MCPNodeData {
  label: string;
  mcpTool: 'firecrawl_scrape' | 'firecrawl_search' | 'firecrawl_crawl' | 'firecrawl_map';
  scrapeUrl?: string;             // For scrape action
  searchQuery?: string;           // For search action
  mapUrl?: string;                // For map action
  searchLimit?: number;
  mapLimit?: number;
  outputVariable?: string;        // Variable to store result
}
```

---

## Tools & Integrations

### Standard Tools (via Tool Factory)

| Tool ID | Provider | Description |
|---------|----------|-------------|
| `tavily-search` | Tavily | LLM-optimized web search |
| `serper-search` | Serper | Google Search API |
| `serpapi-search` | SerpAPI | Multi-engine search |
| `firecrawl` | Firecrawl | Web scraping to markdown |
| `scraperapi` | ScraperAPI | Proxy-based scraping |
| `browserless` | Browserless | Headless Chrome |
| `content-extractor` | Built-in | HTML content extraction |

### MCP Servers

```typescript
// Built-in Firecrawl MCP
{
  name: "Firecrawl",
  url: "https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp",
  tools: [
    "firecrawl_scrape",
    "firecrawl_search",
    "firecrawl_crawl",
    "firecrawl_map",
    "firecrawl_batch_scrape",
    "firecrawl_extract"
  ]
}
```

### LLM Provider Support

| Provider | Models | MCP Support |
|----------|--------|-------------|
| **Anthropic** | Claude Haiku 4.5, Sonnet 4.5, Opus 4.5 | Native |
| **OpenAI** | GPT-4o, GPT-4o-mini | Via Responses API |
| **Google** | Gemini 2.0 Flash, Flash-Lite | Experimental |
| **Groq** | Llama 3.3 70B, Llama 3.1 8B | Via tool conversion |

---

## Database Schema

### Core Tables

```typescript
// convex/schema.ts
export default defineSchema({
  workflows: defineTable({
    userId: v.optional(v.string()),
    customId: v.optional(v.string()),
    name: v.string(),
    description: v.optional(v.string()),
    nodes: v.array(v.any()),
    edges: v.array(v.any()),
    isTemplate: v.optional(v.boolean()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    version: v.optional(v.number()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_userId", ["userId"])
    .index("by_customId", ["customId"]),

  executions: defineTable({
    workflowId: v.id("workflows"),
    userId: v.optional(v.string()),
    status: v.string(),  // 'pending' | 'running' | 'completed' | 'failed'
    inputs: v.optional(v.any()),
    outputs: v.optional(v.any()),
    nodeResults: v.optional(v.any()),
    error: v.optional(v.string()),
    startedAt: v.string(),
    completedAt: v.optional(v.string()),
  }).index("by_workflowId", ["workflowId"]),

  mcpServers: defineTable({
    userId: v.string(),
    name: v.string(),
    url: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    authType: v.string(),
    accessToken: v.optional(v.string()),
    tools: v.optional(v.array(v.string())),
    connectionStatus: v.string(),
    enabled: v.boolean(),
    isOfficial: v.boolean(),
    headers: v.optional(v.any()),
    lastTested: v.optional(v.string()),
    lastError: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_userId", ["userId"]),

  userLLMKeys: defineTable({
    userId: v.string(),
    provider: v.string(),
    encryptedKey: v.string(),
    keyPrefix: v.string(),
    label: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_userId_provider", ["userId", "provider"]),

  approvals: defineTable({
    executionId: v.string(),
    nodeId: v.string(),
    status: v.string(),  // 'pending' | 'approved' | 'rejected'
    requestedAt: v.string(),
    respondedAt: v.optional(v.string()),
    response: v.optional(v.any()),
  }).index("by_executionId", ["executionId"]),
});
```

---

## API Reference

### Workflow Execution

#### Execute with Streaming (Recommended)

```
POST /api/workflows/{workflowId}/execute-stream
Content-Type: application/json

{
  "inputs": {
    "company_name": "Anthropic",
    "analysis_type": "comprehensive"
  }
}

Response: text/event-stream

event: workflow_started
data: {"workflowId":"abc123","executionId":"exec456"}

event: node_started
data: {"nodeId":"agent-1","nodeType":"agent","label":"Research Agent"}

event: node_completed
data: {"nodeId":"agent-1","result":{"output":"..."},"duration":2345}

event: workflow_completed
data: {"outputs":{"report":"..."},"totalDuration":15234}
```

#### Resume After Interrupt

```
POST /api/workflows/{workflowId}/resume
Content-Type: application/json

{
  "executionId": "exec456",
  "resumeData": {
    "approved": true,
    "comment": "Looks good, proceed"
  }
}
```

### Direct Node Execution

```
POST /api/execute-agent
Content-Type: application/json

{
  "instructions": "Analyze the following data...",
  "provider": "anthropic",
  "model": "claude-sonnet-4-5-20250514",
  "context": "...",
  "tools": [{"id": "firecrawl", "config": {...}}]
}
```

### MCP Registry

```
GET /api/mcp/registry

Response:
{
  "servers": [
    {
      "id": "abc123",
      "name": "Firecrawl",
      "url": "https://mcp.firecrawl.dev/...",
      "tools": ["firecrawl_scrape", "firecrawl_search", ...],
      "enabled": true
    }
  ]
}
```

---

## Authentication & Security

### Authentication Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│  Azure AD   │────▶│  NextAuth   │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   Session   │
                                        │   Cookie    │
                                        └─────────────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    ▼                          ▼                          ▼
             ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
             │  Protected  │           │    API      │           │   Convex    │
             │   Routes    │           │   Routes    │           │   Queries   │
             └─────────────┘           └─────────────┘           └─────────────┘
```

### Security Measures

| Measure | Implementation |
|---------|----------------|
| **Code Injection Prevention** | E2B sandbox for transforms, MathJS for expressions |
| **Input Validation** | Zod schemas on all API inputs |
| **XSS Protection** | DOMPurify sanitization |
| **API Key Encryption** | AES-256-GCM in Convex |
| **Rate Limiting** | Distributed Convex-based limiter |
| **SSRF Protection** | Domain whitelist for HTTP nodes |
| **Ownership Checks** | User can only access own resources |

### API Key Architecture

```typescript
// Two-tier key system
// 1. User keys (highest priority) - stored encrypted in Convex DB
// 2. System keys (fallback) - stored in Convex environment variables

const apiKey =
  await getUserLLMKey(userId, 'anthropic')  // User's own key
  ?? await getSystemApiKey('ANTHROPIC_API_KEY');  // System fallback
```

---

## MCP Integration

### How MCP Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Agent     │────▶│ MCP Client  │────▶│ MCP Server  │
│   Node      │     │ (resolver)  │     │ (Firecrawl) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │ Tool Request      │ JSON-RPC          │ Execute
       └───────────────────┴───────────────────┘
```

### Adding Custom MCP Servers

```typescript
// Via Convex mutation
await ctx.runMutation(api.mcpServers.addMCPServer, {
  userId: "user123",
  name: "Custom Server",
  url: "https://my-mcp-server.com/mcp",
  category: "custom",
  authType: "api-key",
  accessToken: "sk-...",
  tools: ["tool1", "tool2"],
});
```

### Tool Resolution

```typescript
// lib/mcp/resolver.ts
export async function resolveMCPTools(
  serverConfig: MCPServerConfig,
  apiKeys: APIKeys
): Promise<Tool[]> {
  const client = new MCPClient(serverConfig.url, {
    headers: { Authorization: `Bearer ${apiKeys.firecrawl}` }
  });

  const tools = await client.listTools();
  return tools.map(tool => convertToLangChainTool(tool));
}
```

---

## Development Guide

### Environment Setup

```bash
# Required in .env.local
CONVEX_DEPLOYMENT=dev:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Azure AD Authentication
AUTH_MICROSOFT_ID=your-client-id
AUTH_MICROSOFT_SECRET=your-client-secret
AUTH_MICROSOFT_TENANT_ID=your-tenant-id
AUTH_SECRET=your-nextauth-secret

# Set in Convex environment (not .env.local)
npx convex env set ENCRYPTION_KEY "$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")"
npx convex env set ANTHROPIC_API_KEY "sk-ant-..."
npx convex env set FIRECRAWL_API_KEY "fc-..."
npx convex env set E2B_API_KEY "e2b_..."
```

### Running Locally

```bash
# Install dependencies
npm install

# Start Convex + Next.js (recommended)
npm run dev:all

# Or separately:
npx convex dev      # Terminal 1
npm run dev         # Terminal 2
```

### Adding a New Node Type

1. **Define type** in `lib/workflow/types.ts`:
```typescript
export type NodeType =
  | 'start' | 'end' | 'agent' | 'mcp'
  | 'your-new-type';  // Add here
```

2. **Create executor** in `lib/workflow/executors/your-type.ts`:
```typescript
export async function executeYourNode(
  node: WorkflowNode,
  state: WorkflowState,
  apiKeys: APIKeys
): Promise<NodeExecutionResult> {
  // Implementation
  return {
    output: result,
    __variableUpdates: { lastOutput: result }
  };
}
```

3. **Register in LangGraph** (`lib/workflow/langgraph.ts`):
```typescript
case 'your-new-type':
  return await executeYourNode(node, state, apiKeys);
```

4. **Create UI panel** in `components/app/(home)/sections/workflow-builder/YourNodePanel.tsx`

### Testing

```bash
# Run all Playwright tests
npm run test

# Run with visible browser
npm run test:headed

# Run specific test
npm run test:simple
```

---

## Deployment

### Vercel + Convex

```bash
# Deploy Convex to production
npx convex deploy --prod

# Set production environment variables
npx convex env set ANTHROPIC_API_KEY "sk-ant-..." --prod
npx convex env set FIRECRAWL_API_KEY "fc-..." --prod

# Deploy to Vercel
vercel --prod
```

### Environment Variables for Production

| Variable | Location | Required |
|----------|----------|----------|
| `CONVEX_DEPLOYMENT` | Vercel | Yes |
| `NEXT_PUBLIC_CONVEX_URL` | Vercel | Yes |
| `AUTH_MICROSOFT_*` | Vercel | Yes |
| `AUTH_SECRET` | Vercel | Yes |
| `ENCRYPTION_KEY` | Convex env | Yes |
| `ANTHROPIC_API_KEY` | Convex env | Recommended |
| `FIRECRAWL_API_KEY` | Convex env | Recommended |
| `E2B_API_KEY` | Convex env | For transforms |

### Performance Considerations

- **Max loop iterations**: 100 (configurable per node)
- **LangGraph recursion limit**: 100 steps
- **Extract node context**: Truncated at 10K characters
- **SSE timeout**: Configured per deployment
- **Rate limiting**: Distributed via Convex

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "Module not found: @langchain/community" | Run `npm install @langchain/community` |
| TypeScript circular reference errors | Add explicit return type annotations to Convex actions |
| Convex lock file error | Delete `.next/dev/lock` and restart |
| MCP tool not found | Check MCP server is enabled and API key is set |
| Agent returns empty response | Verify LLM API key is configured |

### Debug Logging

```typescript
// Enable in lib/workflow/langgraph.ts
console.log(`[LangGraph] Executing node: ${nodeId}`);
console.log(`[LangGraph] State:`, JSON.stringify(state, null, 2));
```

### LangSmith Tracing

```bash
# Enable workflow tracing
npx convex env set LANGCHAIN_TRACING_V2 "true"
npx convex env set LANGCHAIN_API_KEY "lsv2_pt_..."
npx convex env set LANGCHAIN_PROJECT "open-agent-builder"
```

---

## Appendix

### Supported LLM Models

| Provider | Model | Context | Notes |
|----------|-------|---------|-------|
| Anthropic | claude-sonnet-4-5-20250514 | 200K | Recommended |
| Anthropic | claude-haiku-4-5-20250514 | 200K | Fast/cheap |
| OpenAI | gpt-4o | 128K | Good all-rounder |
| OpenAI | gpt-4o-mini | 128K | Budget option |
| Google | gemini-2.0-flash-exp | 1M | Experimental |
| Groq | llama-3.3-70b-versatile | 128K | Fast inference |

### Variable Substitution Syntax

```
{{input.company_name}}     - Access input variable
{{lastOutput}}             - Previous node's output
{{nodeResults.agent-1}}    - Specific node's result
{{variables.custom_var}}   - Custom variable
```

### SSE Event Types

| Event | Data | When |
|-------|------|------|
| `workflow_started` | workflowId, executionId | Execution begins |
| `node_started` | nodeId, nodeType, label | Node begins |
| `node_completed` | nodeId, result, duration | Node succeeds |
| `node_failed` | nodeId, error | Node fails |
| `workflow_completed` | outputs, totalDuration | All nodes done |
| `error` | message, stack | Fatal error |
