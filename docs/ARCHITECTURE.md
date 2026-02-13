# Open Agent Builder - Architecture Documentation

**Version 1.0** | Last Updated: December 2024

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Layers](#architecture-layers)
4. [Component Architecture](#component-architecture)
5. [Data Flow](#data-flow)
6. [Authentication & Authorization](#authentication--authorization)
7. [Workflow Execution Engine](#workflow-execution-engine)
8. [Database Schema](#database-schema)
9. [API Design](#api-design)
10. [Security Architecture](#security-architecture)
11. [Deployment Architecture](#deployment-architecture)
12. [Scalability & Performance](#scalability--performance)

---

## System Overview

Open Agent Builder is a visual workflow automation platform that enables users to create AI-powered workflows without writing code. The system follows a modern, cloud-native architecture with clear separation of concerns between frontend, backend, database, and execution layers.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                          │
│  ┌─────────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Workflow Builder│  │  UI Builder  │  │ Workflow List │  │
│  │   (React Flow)  │  │  (Drag-Drop) │  │   (User UI)   │  │
│  └─────────────────┘  └──────────────┘  └───────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Pages     │  │  API Routes  │  │   Middleware     │   │
│  │  (UI/SSR)   │  │  (REST API)  │  │  (Auth Guard)    │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
┌──────────────┐  ┌───────────────┐  ┌──────────────┐
│   Convex DB  │  │   NextAuth    │  │  LangGraph   │
│  (Real-time) │  │  (Azure AD)   │  │  (Executor)  │
└──────────────┘  └───────────────┘  └──────────────┘
          │                                  │
          │                                  ▼
          │                        ┌──────────────────┐
          │                        │  External APIs   │
          │                        │ - Anthropic      │
          │                        │ - OpenAI         │
          └───────────────────────▶│ - Firecrawl      │
                                   │ - Tavily         │
                                   │ - E2B            │
                                   └──────────────────┘
```

### Design Principles

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data layers
2. **Real-time First**: Live updates using Convex reactive queries
3. **Security by Default**: Authentication required, encrypted API keys, input validation
4. **Extensible**: Plugin architecture for new node types and tools
5. **Cloud-Native**: Stateless execution, horizontal scalability
6. **Developer Experience**: TypeScript everywhere, type-safe APIs

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16 (canary) | React framework with App Router |
| **React** | 19 | UI component library |
| **TypeScript** | 5.x | Type safety |
| **React Flow** | 11.x | Visual workflow builder |
| **TailwindCSS** | 3.x | Styling framework |
| **Shadcn/ui** | Latest | Component library |
| **Lucide React** | Latest | Icon library |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js API Routes** | 16 | REST API endpoints |
| **NextAuth.js** | 4.x | Authentication |
| **LangGraph** | 0.2.x | Workflow orchestration |
| **LangChain** | 0.3.x | LLM integration |
| **Zod** | 3.x | Input validation |

### Database & Storage

| Technology | Purpose |
|------------|---------|
| **Convex** | Real-time database and backend |
| **Convex File Storage** | File upload and storage |

### AI & Tools

| Provider | Models/Services |
|----------|----------------|
| **Anthropic** | Claude Sonnet 4.5, Opus 4.6 (1M context), Haiku 4.5 |
| **OpenAI** | GPT-5.2, o3, GPT-4.5, GPT-4o Mini |
| **Google** | Gemini 3 Pro Preview, Gemini 3 Flash, Gemini 2.5 Pro/Flash |
| **Groq** | Llama 4 Maverick/Scout, Llama 3.3 70B, Llama 3.1 8B, GPT OSS 120B/20B |
| **Firecrawl** | Web scraping |
| **Tavily** | Web search |
| **E2B** | Code interpreter sandbox |
| **Arcade** | Tool integration |

### Development Tools

| Tool | Purpose |
|------|---------|
| **npm** | Package management |
| **ESLint** | Code linting |
| **Playwright** | E2E testing |
| **Git** | Version control |

---

## Architecture Layers

### 1. Presentation Layer

**Components**:
- React 19 functional components with hooks
- Server Components for static content
- Client Components (`use client`) for interactivity

**Key Features**:
- **Workflow Builder**: Visual canvas for creating workflows
- **Node Configuration Panels**: Type-specific configuration UIs
- **Execution Panel**: Real-time execution monitoring
- **UI Builder**: Drag-drop interface creator
- **User Menu**: Profile and authentication UI

**State Management**:
- React hooks (`useState`, `useEffect`, `useCallback`)
- Custom hooks (`useWorkflow`, `useWorkflowExecution`)
- Convex reactive queries for real-time data

### 2. Application Layer

**Next.js API Routes** (`app/api/`):
- Stateless request handlers
- Authentication verification
- Business logic orchestration
- Error handling and logging

**Key Endpoints**:
- `/api/workflows` - CRUD operations
- `/api/workflows/[id]/execute` - Standard execution
- `/api/workflows/[id]/execute-stream` - SSE streaming execution
- `/api/workflows/[id]/resume` - Resume after approval
- `/api/approval/[id]` - Human-in-the-loop approvals
- `/api/mcp/*` - MCP server management
- `/api/config` - System configuration

### 3. Business Logic Layer

**Workflow Executors** (`lib/workflow/executors/`):
- `agent.ts` - AI agent execution with LLM calls
- `mcp.ts` - MCP tool execution
- `extract.ts` - Structured data extraction
- `http.ts` - HTTP API requests
- `logic.ts` - Conditional branching and loops
- `data.ts` - Data transformations
- `tools.ts` - Firecrawl integration

**Core Services**:
- `langgraph.ts` - Workflow orchestration engine
- `validation.ts` - Workflow validation
- `edge-cleanup.ts` - Edge validation and cleanup
- `templates.ts` - Pre-built workflow templates

### 4. Data Layer

**Convex Backend** (`convex/`):
- Real-time reactive queries
- Mutations for data changes
- Actions for Node.js runtime operations
- File storage for uploads

**Key Tables**:
- `workflows` - Workflow definitions
- `executions` - Execution history and results
- `userLLMKeys` - Encrypted user API keys
- `mcpServers` - MCP server registry
- `approvals` - Human approval records
- `apiKeys` - Programmatic access keys

### 5. Integration Layer

**External Services**:
- **LLM APIs**: Anthropic, OpenAI, Google, Groq
- **Tool APIs**: Firecrawl, Tavily, E2B, Arcade
- **Authentication**: Azure AD (Microsoft OAuth)
- **Monitoring**: LangSmith (optional)

---

## Component Architecture

### Workflow Builder Architecture

```
WorkflowBuilder.tsx (Orchestrator)
    │
    ├─> ReactFlow (Visual Canvas)
    │   ├─> CustomNodes (Start, Agent, MCP, etc.)
    │   ├─> CustomEdges (Connections)
    │   └─> Controls (Zoom, Pan, Fit)
    │
    ├─> NodePanel.tsx (Configuration)
    │   ├─> StartNodePanel
    │   ├─> AgentNodePanel
    │   ├─> MCPNodePanel
    │   ├─> ExtractNodePanel
    │   ├─> HTTPNodePanel
    │   ├─> TransformNodePanel
    │   ├─> IfElseNodePanel
    │   ├─> WhileNodePanel
    │   ├─> UserApprovalNodePanel
    │   └─> EndNodePanel
    │
    └─> ExecutionPanel.tsx (Monitoring)
        ├─> InputForm (Execution parameters)
        ├─> NodeStatusList (Real-time status)
        └─> OutputDisplay (Results)
```

### UI Builder Architecture

```
UIBuilderCanvas.tsx (Orchestrator)
    │
    ├─> ComponentPalette.tsx (Draggables)
    │   ├─> Button, Input, Card, etc.
    │   └─> 15 UI components
    │
    ├─> DroppedComponent.tsx (Renderer)
    │   ├─> Component-specific rendering
    │   ├─> Click-to-edit configuration
    │   └─> Property management
    │
    ├─> WorkflowSelector.tsx
    │   └─> Link UI to workflow
    │
    └─> ResponseDisplay.tsx
        └─> SSE event stream viewer
```

### Authentication Architecture

```
Browser
    │
    ├─> Sign In Button
    │       ↓
    ├─> NextAuth.js
    │   ├─> Azure AD Provider
    │   ├─> OAuth Flow
    │   └─> JWT Token Generation
    │       ↓
    ├─> Session Cookie
    │   └─> authjs.session-token
    │       ↓
    ├─> Middleware.ts
    │   ├─> Public Routes (bypass)
    │   └─> Protected Routes (verify)
    │       ↓
    ├─> API Routes
    │   ├─> Extract JWT from cookie
    │   └─> Convex Client with auth
    │       ↓
    └─> Convex Backend
        └─> User-scoped queries
```

---

## Data Flow

### Workflow Creation Flow

```
1. User drags nodes onto canvas
   ↓
2. React Flow updates local state
   ↓
3. User configures node properties
   ↓
4. useWorkflow hook detects changes
   ↓
5. Debounced save (1000ms delay)
   ↓
6. POST /api/workflows
   ↓
7. Convex mutation (upsertWorkflow)
   ↓
8. Workflow saved to database
   ↓
9. Success response with workflow ID
   ↓
10. Local state updated with ID
```

### Workflow Execution Flow

```
1. User clicks "Run" button
   ↓
2. ExecutionPanel opens with input form
   ↓
3. User enters input variables
   ↓
4. POST /api/workflows/[id]/execute-stream
   ↓
5. API route validates authentication
   ↓
6. Retrieve workflow from Convex
   ↓
7. Retrieve user API keys (or system fallback)
   ↓
8. LangGraphExecutor.execute()
   │
   ├─> Convert workflow to StateGraph
   ├─> Add nodes to graph
   ├─> Add edges (routing logic)
   ├─> Compile graph
   └─> Stream execution
       │
       ├─> For each node:
       │   ├─> Execute node function
       │   ├─> Update state
       │   ├─> Send SSE event
       │   └─> Handle errors
       │
       └─> Return final state
           ↓
9. Save execution to Convex
   ↓
10. Send completion event
   ↓
11. Frontend displays results
```

### Agent Node Execution Flow

```
Agent Node Execution
    │
    ├─> Read node configuration
    │   ├─> Instructions
    │   ├─> Model selection
    │   ├─> Temperature
    │   ├─> Token limit
    │   └─> Enabled tools
    │
    ├─> Resolve variables in instructions
    │   └─> Replace {{variable}} placeholders
    │
    ├─> Initialize LLM client
    │   ├─> Anthropic (Claude)
    │   ├─> OpenAI (GPT-5.2)
    │   ├─> Google (Gemini)
    │   └─> Groq (Llama)
    │
    ├─> Attach tools if enabled
    │   ├─> Firecrawl (web scraping)
    │   ├─> Tavily (web search)
    │   ├─> E2B (code interpreter)
    │   └─> Custom MCP tools
    │
    ├─> Execute LLM call
    │   ├─> Send prompt
    │   ├─> Handle tool calls
    │   ├─> Process response
    │   └─> Track token usage
    │
    └─> Return result
        ├─> output (text response)
        ├─> usage (token counts)
        └─> toolCalls (if any)
```

### MCP Tool Execution Flow

```
MCP Node Execution
    │
    ├─> Read MCP server configuration
    │   ├─> Server type (SSE, HTTP, stdio)
    │   ├─> Connection details
    │   └─> Tool selection
    │
    ├─> Resolve MCP server
    │   └─> Query Convex for server config
    │
    ├─> Build tool arguments
    │   └─> Resolve variables in arguments
    │
    ├─> Execute tool call
    │   ├─> Connect to MCP server
    │   ├─> Send tool request
    │   └─> Receive response
    │
    └─> Return result
        └─> Tool output data
```

### Human-in-the-Loop Approval Flow

```
1. Workflow reaches UserApproval node
   ↓
2. Create approval record in Convex
   ↓
3. Pause workflow execution
   ↓
4. Send SSE event (workflow_paused)
   ↓
5. Frontend shows approval UI
   ↓
6. User reviews data and decides
   ↓
7. POST /api/approval/[id]
   ├─> Approve: status = "approved"
   └─> Reject: status = "rejected"
   ↓
8. POST /api/workflows/[id]/resume
   ↓
9. Retrieve approval decision
   ↓
10. Continue workflow execution
    ├─> If approved: proceed to next node
    └─> If rejected: terminate workflow
```

---

## Authentication & Authorization

### Azure AD Integration

**OAuth 2.0 Flow**:
1. User clicks "Continue with Microsoft"
2. Redirect to Azure AD login page
3. User authenticates with Microsoft credentials
4. Azure AD redirects back with authorization code
5. NextAuth exchanges code for access token
6. NextAuth creates session with JWT token
7. Session cookie set in browser

**Configuration**:
- **Tenant ID**: Organization-specific Azure AD tenant
- **Client ID**: Application ID from Azure AD app registration
- **Client Secret**: Secret key for authentication
- **Redirect URI**: `http://localhost:3000/api/auth/callback/azure-ad`

**Session Management**:
- JWT tokens stored in secure HTTP-only cookies
- Session includes: `userId`, `name`, `email`, `image`
- Token expiration monitored by `SessionManager.tsx`
- Auto sign-out when token expires

### Middleware Authentication

**Route Protection** (`middleware.ts`):

```typescript
Public Routes (no auth required):
- /
- /sign-in
- /sign-up
- /ui-user-workflows (client-side auth)
- /ui-builder (client-side auth)
- /workflow-runner (client-side auth)
- /api/auth/*
- /api/workflows/* (Convex auth)
- /api/team-workflows/* (Convex auth)
- /api/mcp/*
- /api/templates

Protected Routes (auth required):
- All other routes require session cookie
```

**Authentication Verification**:
1. Check for session cookie (`authjs.session-token`)
2. If missing on API route → 401 Unauthorized
3. If missing on page route → Redirect to `/sign-in`

### API Key Authentication

**Two-Tier System**:

**Tier 1: User-Specific Keys**
- Users can add their own API keys in Settings
- Stored encrypted in Convex `userLLMKeys` table
- AES-256-GCM encryption with unique IV per key
- Takes precedence over system keys

**Tier 2: System Keys**
- Stored in Convex environment variables
- Set via `npx convex env set KEY_NAME value`
- Used as fallback when user hasn't provided key
- Available to all users

**Key Retrieval Flow**:
```typescript
1. Check user's encrypted keys in Convex DB
   ↓
2. If found, decrypt and return
   ↓
3. If not found, check Convex environment
   ↓
4. Return system key as fallback
```

### Programmatic API Access

Users can generate API keys for programmatic access:
- API keys stored in Convex `apiKeys` table
- Used for `/api/workflows/[id]/execute*` endpoints
- Bypasses NextAuth authentication
- Useful for integrations and automation

---

## Workflow Execution Engine

### LangGraph Architecture

Open Agent Builder uses LangGraph as its workflow orchestration engine. LangGraph provides a state machine model for complex, multi-step workflows.

**Key Concepts**:
- **StateGraph**: Directed graph where nodes are functions
- **State**: Immutable state object passed between nodes
- **Channels**: State variables with reducers for updates
- **Conditional Edges**: Dynamic routing based on state
- **Human-in-the-Loop**: Pause/resume capability

### State Management

**WorkflowState Definition**:
```typescript
const WorkflowStateAnnotation = Annotation.Root({
  // Execution tracking
  currentNodeId: Annotation<string>,
  previousNodeId: Annotation<string | null>,
  visitedNodes: Annotation<Set<string>>,

  // Data storage
  variables: Annotation<Record<string, any>>,
  outputs: Annotation<Record<string, NodeExecutionResult>>,

  // Control flow
  isApprovalPending: Annotation<boolean>,
  approvalNodeId: Annotation<string | null>,

  // Error handling
  errors: Annotation<Array<{ nodeId: string; error: string }>>,
});
```

**State Updates**:
- All updates are immutable
- Reducers merge new values into state
- Previous state always preserved
- Supports nested object updates

### Node Execution

Each node type has a dedicated executor:

**Node Executor Interface**:
```typescript
async function executeNode(
  node: WorkflowNode,
  state: WorkflowState,
  apiKeys: ApiKeys
): Promise<NodeExecutionResult> {
  // 1. Read node configuration
  // 2. Resolve variables from state
  // 3. Execute node-specific logic
  // 4. Return result with output and metadata
}
```

**Error Handling**:
- Try-catch around all node execution
- Errors captured and stored in state
- Execution continues or stops based on error type
- Detailed error messages for debugging

### Conditional Routing

**If/Else Nodes**:
```typescript
1. Read condition expression (e.g., "price < 100")
2. Resolve variables in expression
3. Evaluate using safe expression evaluator (mathjs)
4. Return "true" or "false" branch
5. LangGraph routes to appropriate next node
```

**While Loop Nodes**:
```typescript
1. Check loop condition
2. If true, execute loop body
3. Update loop counter
4. Check max iterations (safety limit)
5. Repeat or exit loop
```

**Agent Tool Routing**:
- Agent can call multiple tools
- LangGraph automatically routes back to agent after tool calls
- Agent processes tool results and continues reasoning

### Streaming Execution

**Server-Sent Events (SSE)**:
- Real-time progress updates to frontend
- Event stream stays open during execution
- Heartbeat every 30 seconds to keep connection alive

**Event Types**:
- `workflow_started` - Execution begins
- `node_started` - Node begins execution
- `node_completed` - Node finishes successfully
- `node_failed` - Node encounters error
- `tool_call` - Agent calls a tool
- `workflow_paused` - Awaiting human approval
- `workflow_completed` - Execution finished
- `error` - Fatal error occurred

**SSE Message Format**:
```
event: node_completed
data: {"nodeId": "agent-1", "output": {...}, "usage": {...}}

```

---

## Database Schema

### Convex Tables

#### workflows
```typescript
{
  _id: Id<"workflows">,
  _creationTime: number,
  userId: string,              // Owner user ID
  name: string,                // Workflow name
  description?: string,        // Optional description
  nodes: WorkflowNode[],       // Array of node definitions
  edges: WorkflowEdge[],       // Array of connections
  isTemplate: boolean,         // Is this a template?
  updatedAt: number,           // Last update timestamp
}
```

#### executions
```typescript
{
  _id: Id<"executions">,
  _creationTime: number,
  workflowId: Id<"workflows">,  // Reference to workflow
  userId: string,               // User who executed
  status: "running" | "completed" | "failed" | "paused",
  startedAt: number,
  completedAt?: number,
  inputs: Record<string, any>,  // Execution inputs
  outputs: Record<string, any>, // Node outputs
  errors?: Array<{              // Execution errors
    nodeId: string,
    error: string,
  }>,
  tokenUsage?: {                // LLM token usage
    input: number,
    output: number,
    total: number,
  },
}
```

#### userLLMKeys
```typescript
{
  _id: Id<"userLLMKeys">,
  _creationTime: number,
  userId: string,               // Key owner
  provider: "anthropic" | "openai" | "groq" | "google" | "firecrawl" | "tavily" | "e2b",
  encryptedKey: string,         // AES-256-GCM encrypted
  iv: string,                   // Initialization vector
  updatedAt: number,
}
```

#### mcpServers
```typescript
{
  _id: Id<"mcpServers">,
  _creationTime: number,
  userId: string,               // Server owner
  name: string,                 // Server display name
  type: "sse" | "http" | "stdio",
  url?: string,                 // For SSE/HTTP
  command?: string,             // For stdio
  args?: string[],              // Command arguments
  env?: Record<string, string>, // Environment variables
  isActive: boolean,
}
```

#### approvals
```typescript
{
  _id: Id<"approvals">,
  _creationTime: number,
  workflowId: Id<"workflows">,
  executionId: Id<"executions">,
  nodeId: string,               // UserApproval node ID
  userId: string,               // Approver
  status: "pending" | "approved" | "rejected",
  message?: string,             // Approval message
  data: any,                    // Data for review
  decidedAt?: number,
}
```

#### apiKeys
```typescript
{
  _id: Id<"apiKeys">,
  _creationTime: number,
  userId: string,               // Key owner
  name: string,                 // Key name/description
  keyHash: string,              // Hashed API key
  lastUsed?: number,
  createdAt: number,
}
```

### Data Relationships

```
User (Azure AD)
    │
    ├─> workflows (1:many)
    │       │
    │       └─> executions (1:many)
    │               │
    │               └─> approvals (1:many)
    │
    ├─> userLLMKeys (1:many)
    ├─> mcpServers (1:many)
    └─> apiKeys (1:many)
```

---

## API Design

### REST API Endpoints

#### Workflow Management

**GET /api/workflows**
- List all workflows for authenticated user
- Response: `{ workflows: Workflow[] }`

**GET /api/workflows/[id]**
- Get specific workflow by ID
- Response: `{ workflow: Workflow }`

**POST /api/workflows**
- Create or update workflow
- Body: `{ name, description, nodes, edges }`
- Response: `{ success: true, workflowId: string }`

**DELETE /api/workflows/[id]**
- Delete workflow
- Response: `{ success: true }`

#### Workflow Execution

**POST /api/workflows/[id]/execute**
- Execute workflow (standard response)
- Body: `{ inputs: Record<string, any> }`
- Response: `{ executionId, outputs, status }`

**POST /api/workflows/[id]/execute-stream**
- Execute workflow (SSE streaming)
- Body: `{ inputs: Record<string, any> }`
- Response: SSE event stream

**POST /api/workflows/[id]/resume**
- Resume workflow after approval
- Body: `{ executionId, approvalId }`
- Response: SSE event stream

#### Human Approvals

**POST /api/approval/[id]**
- Approve or reject workflow
- Body: `{ decision: "approved" | "rejected", message? }`
- Response: `{ success: true }`

**GET /api/approval/[id]**
- Get approval status
- Response: `{ status, data, message }`

#### MCP Management

**GET /api/mcp**
- List MCP servers for user
- Response: `{ servers: MCPServer[] }`

**POST /api/mcp**
- Create MCP server
- Body: `{ name, type, url, ... }`
- Response: `{ success: true, serverId }`

**POST /api/mcp/[id]/tools**
- List tools from MCP server
- Response: `{ tools: Tool[] }`

#### Configuration

**GET /api/config**
- Get system configuration
- Response: `{ models, tools, features }`

**GET /api/templates**
- Get workflow templates
- Response: `{ templates: Template[] }`

### Authentication Methods

**1. Session Cookie (NextAuth)**
- Used for browser-based requests
- Automatic with `credentials: 'include'`
- Cookie name: `authjs.session-token`

**2. API Key (Header)**
- Used for programmatic access
- Header: `X-API-Key: <api-key>`
- Only for execution endpoints

**3. Convex Auth (Internal)**
- Used by API routes to query Convex
- JWT token extracted from session
- `client.setAuth(token)`

---

## Security Architecture

### Input Validation

**Zod Schemas** (`lib/api/validation-schemas.ts`):
- All API inputs validated with Zod
- Type coercion and sanitization
- Length limits to prevent DoS
- Format validation (URLs, IDs, etc.)

**Example**:
```typescript
const executeWorkflowSchema = z.object({
  inputs: z.record(z.any()).default({}),
  userId: z.string().optional(),
  resumeFromApproval: z.boolean().default(false),
});
```

### Code Execution Safety

**Transform Node Security**:
- ❌ No `eval()` or `Function()` constructor
- ✅ E2B Code Interpreter sandbox
- ✅ Isolated execution environment
- ✅ Resource limits (CPU, memory, time)

**Condition Evaluation**:
- ❌ No `eval()` for conditions
- ✅ mathjs safe evaluator
- ✅ Whitelist of allowed operations
- ✅ No access to global objects

### XSS Protection

**DOMPurify Sanitization**:
- HTML sanitization in workflow results
- Tag whitelist (only safe tags)
- Attribute filtering (no script handlers)
- Applied before rendering user content

### SSRF Protection

**HTTP Node Validation**:
- Private IP addresses blocked (10.x, 192.168.x, 127.x)
- Localhost blocked
- URL format validation
- Timeout limits

### API Key Encryption

**AES-256-GCM**:
- User API keys encrypted before storage
- Unique initialization vector (IV) per key
- Encryption key stored in Convex environment
- Decryption only when needed for execution

**Encryption Flow**:
```typescript
1. User submits API key
2. Generate random IV (12 bytes)
3. Encrypt key with AES-256-GCM
4. Store encrypted key + IV in Convex
5. Clear plaintext key from memory
```

### CORS Configuration

**Allowed Origins**:
- Environment-specific whitelist
- No wildcard origins
- Convex subdomains allowed
- Credentials supported

### Rate Limiting

**Distributed Rate Limiter**:
- Per-user execution limits
- Prevents abuse and DoS
- Configurable thresholds
- Stored in Convex for distributed enforcement

---

## Deployment Architecture

### Local Development

```
Developer Machine
    │
    ├─> Terminal 1: npm run dev (Next.js on :3000)
    ├─> Terminal 2: npx convex dev (Convex sync)
    │
    └─> Browser: http://localhost:3000
        │
        ├─> Next.js Dev Server (:3000)
        │   ├─> Hot Module Replacement
        │   └─> API Routes
        │
        └─> Convex Development Backend
            ├─> Real-time sync with local code
            └─> Separate dev deployment
```

**Environment**:
- **Convex Deployment**: `dev:disciplined-quail-9`
- **Next.js**: Local dev server on port 3000
- **Authentication**: Azure AD with localhost redirect

### Production Deployment (Vercel)

```
                  ┌─────────────┐
                  │  Vercel CDN │
                  └──────┬──────┘
                         │
                  ┌──────▼──────┐
                  │ Next.js App │
                  │ (Serverless)│
                  └──────┬──────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
    ┌─────▼──────┐ ┌────▼─────┐ ┌─────▼──────┐
    │   Convex   │ │ NextAuth │ │  External  │
    │ Production │ │ Sessions │ │    APIs    │
    └────────────┘ └──────────┘ └────────────┘
```

**Deployment Steps**:

1. **Convex Production Setup**:
   ```bash
   npx convex deploy --prod
   npx convex env set --prod KEY_NAME value
   ```

2. **Vercel Configuration**:
   - Connect GitHub repository
   - Set environment variables:
     - `NEXT_PUBLIC_CONVEX_URL`
     - `CONVEX_DEPLOYMENT`
     - `AUTH_MICROSOFT_*`
     - `AUTH_SECRET`
     - `NEXTAUTH_URL`

3. **Azure AD Configuration**:
   - Add production redirect URI
   - Update allowed origins

4. **Deploy**:
   ```bash
   git push origin main
   # Vercel auto-deploys
   ```

**Environment**:
- **Convex Deployment**: `prod:sensible-ermine-579`
- **Next.js**: Vercel serverless functions
- **Domain**: Custom domain or Vercel subdomain
- **Authentication**: Azure AD with production redirect

### Infrastructure Components

**Vercel**:
- Edge network for static assets
- Serverless functions for API routes
- Automatic HTTPS
- Environment variable management

**Convex**:
- Managed database and backend
- Real-time sync infrastructure
- File storage CDN
- Built-in authentication support

**Azure AD**:
- OAuth 2.0 identity provider
- Single Sign-On (SSO)
- Multi-factor authentication
- Enterprise security features

---

## Scalability & Performance

### Horizontal Scalability

**Stateless Architecture**:
- No server-side session storage
- All state in database or JWT tokens
- API routes are stateless functions
- Can scale to unlimited instances

**Convex Scaling**:
- Automatic horizontal scaling
- Handles millions of operations
- Built-in caching and optimization
- No manual scaling configuration

### Performance Optimizations

**Frontend**:
- React Server Components for static content
- Code splitting with Next.js dynamic imports
- Image optimization with Next.js Image
- Lazy loading for heavy components

**API Routes**:
- Streaming responses (SSE) for long operations
- Early return for fast paths
- Minimal dependencies per route
- Edge runtime where possible

**Database**:
- Indexed queries in Convex
- Reactive queries (only fetch changes)
- Pagination for large lists
- Efficient data modeling

**Caching Strategy**:
- Static assets cached at CDN edge
- Convex query results cached client-side
- Template definitions cached in memory
- LLM responses not cached (privacy)

### Monitoring & Observability

**LangSmith Integration** (optional):
- Full workflow execution traces
- LLM call monitoring
- Token usage tracking
- Performance metrics
- Error tracking

**Console Logging**:
- Structured logging with prefixes
- Debug logs in development
- Error logs in production
- Request/response logging

**Metrics to Monitor**:
- Workflow execution time
- Node execution time
- LLM token usage
- API error rates
- Database query performance

---

## Future Enhancements

### Planned Features

1. **Workflow Versioning**
   - Track workflow changes over time
   - Rollback to previous versions
   - Compare versions

2. **Team Collaboration**
   - Share workflows with team members
   - Permission levels (view, execute, edit)
   - Comments and annotations

3. **Scheduled Executions**
   - Cron-style workflow scheduling
   - Recurring executions
   - Time-based triggers

4. **Webhooks**
   - Trigger workflows via HTTP webhooks
   - Send notifications on completion
   - Integration with external systems

5. **Advanced Debugging**
   - Step-through execution
   - Breakpoints in workflows
   - Variable inspection
   - Execution replay

6. **Custom Node Types**
   - Plugin system for new nodes
   - Community-contributed nodes
   - Private node libraries

---

## Appendix

### Key Design Decisions

**Why LangGraph?**
- Mature workflow orchestration
- Built-in state management
- Conditional routing support
- Human-in-the-loop capability
- Strong TypeScript support

**Why Convex?**
- Real-time reactive queries
- No API layer needed
- Built-in authentication
- Generous free tier
- Excellent DX

**Why Next.js 16?**
- React 19 support
- App Router stability
- Middleware authentication
- API routes for backend
- Vercel deployment integration

**Why Azure AD?**
- Enterprise SSO requirement
- Microsoft 365 integration
- Strong security features
- Easy setup with NextAuth

### Glossary

- **Node**: Single step in a workflow
- **Edge**: Connection between nodes
- **StateGraph**: LangGraph's workflow representation
- **SSE**: Server-Sent Events for streaming
- **MCP**: Model Context Protocol for tools
- **JWT**: JSON Web Token for authentication
- **Reducer**: Function that merges state updates
- **Hot Module Replacement**: Live code updates in dev

---

**For More Information**:
- [User Guide](./USER-GUIDE.md)
- [System Administration Guide](./ADMIN-GUIDE.md)
- [GitHub Repository](https://github.com/your-org/open-agent-builder)
