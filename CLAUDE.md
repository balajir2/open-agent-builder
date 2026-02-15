# CLAUDE.md

**Last Updated:** February 13, 2026

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL: Git Commit & Push Policy

**ALWAYS ask user before committing changes. NEVER commit without explicit approval.**

**Commit Policy:**
- ❌ DO NOT run `git commit` without asking user first
- ✅ Ask: "Should I commit these changes?" or "Ready to commit?"
- 📝 After user approves, commit with descriptive message
- 🎯 Exception: Only commit without asking if user explicitly says "commit this" or "commit and push"

**Push Policy:**
- ❌ DO NOT push to git repositories until explicitly asked by the user
- 📦 Every push triggers a Vercel deployment - avoid repeated deployments
- ✅ Commit changes locally with `git commit`
- 🎯 Accumulate multiple fixes before pushing
- 📦 Wait for user to say "push" or "deploy" before running `git push origin main && git push vercel main`

**User Commands That Allow Immediate Action:**
- "commit this" → Commit without asking
- "push this" → Commit and push
- "deploy now" → Commit and push
- "push to repos" → Push to both remotes
- "commit and push" → Do both

Otherwise, ask before committing and inform user that changes are ready to push when they're ready.

## 🔑 CRITICAL: API Key Architecture Principle

**ALL API keys MUST be stored in Convex environment variables ONLY. NO keys in `.env.local`.**

### Design Principles:
1. **Single Source of Truth**: All system API keys are stored in Convex environment via `npx convex env set`
2. **Zero Keys in .env.local**: The `.env.local` file contains ONLY Next.js configuration (Azure Auth, Convex URL, etc.)
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

**Open Agent Builder** is an enterprise-grade visual workflow platform for building, deploying, and managing sophisticated AI agent workflows. Originally inspired by Firecrawl's workflow concepts, this project has evolved into a comprehensive agent orchestration platform featuring:

- **Multi-Tool Integration**: 6 integrated tools (Firecrawl, Tavily, Serper, E2B, Arcade, Gamma AI)
- **Multi-LLM Support**: Claude, GPT-4, Gemini, and Groq (all models support tools + MCP)
- **Enterprise Features**: Azure AD SSO, automatic token refresh, encrypted API keys, OWASP Top 10 compliance
- **Production Infrastructure**: Next.js 16, React 19, LangGraph orchestration, Convex real-time database
- **Visual Builder**: 15 node types, drag-and-drop interface, real-time SSE execution streaming
- **Extensible Architecture**: MCP protocol support, two-tier API key system, custom tool integration

This project is actively maintained and production-ready, with comprehensive documentation, security features, and enterprise-grade scalability.

**Attribution**: Originally inspired by **[Firecrawl](https://firecrawl.dev)** | Developed & maintained by **[Bounteous](https://www.bounteous.com)**

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

# Set Convex environment variables (development)
npx convex env set AUTH_MICROSOFT_ID "your-azure-app-id"

# Set Convex environment variables (production)
npx convex env set AUTH_MICROSOFT_ID "your-azure-app-id" --prod
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

# Run model regression tests (tests all providers and models)
npm run test:regression           # Run regression suite
npm run test:regression:headed    # Run with visible browser
npm run test:regression:report    # Run and open HTML report

# Run file upload/download tests
npm run test:files                # All file-related tests
npm run test:files:headed         # With visible browser
npm run test:upload-download      # Upload/download only
npm run test:file-integration     # Workflow integration only
```

**Model Regression Testing:**
The regression test suite (`tests/model-regression.spec.ts`) automatically tests all LLM providers and models to ensure compatibility. It generates detailed JSON and HTML reports in the `test-reports/` directory, showing:
- Test results for each provider/model combination
- Pass/fail rates by provider
- Detailed error messages for failed tests
- Test duration and performance metrics

**File Upload/Download Testing:**
The file test suite covers comprehensive file handling functionality across three test files (~1,070 lines total):
- `tests/file-processing.spec.ts` - Document extraction (PDF, DOCX, Markdown)
- `tests/file-upload-download.spec.ts` - HTTP upload/download endpoints
- `tests/file-workflow-integration.spec.ts` - Files in workflow execution
See [docs/guides/file-upload-download-testing.md](docs/guides/file-upload-download-testing.md) for complete documentation.

## Architecture

### Core Technology Stack

- **Next.js 16 (canary)** - React framework with App Router
- **React 19** - UI components
- **TypeScript** - Type safety across the stack
- **LangGraph** - Workflow orchestration engine with StateGraph
- **Convex** - Real-time database with automatic reactivity
- **Azure AD (Microsoft Entra ID)** - Enterprise authentication with NextAuth.js
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
│   ├── auth.config.ts            # NextAuth.js + Azure AD configuration
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
- `agent` - AI agent with LLM (Claude, GPT-5.2, Gemini, Groq)
- `mcp` - MCP tool calls (Firecrawl integration)
- `extract` - LLM-powered structured data extraction
- `http` - HTTP API requests
- `transform` - Data manipulation (JavaScript)
- `if-else` - Conditional routing
- `while` - Loop iteration
- `user-approval` - Human-in-the-loop pause
- `end` - Terminal node

**Additional Node Types (5):**
- `set-state` - Direct state variable manipulation
- `guardrails` - Content moderation and safety checks
- `arcade` - Arcade tool integration
- `gamma-ai` - Gamma AI presentation/document generation
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

1. **Azure AD (Microsoft Entra ID)** handles user authentication via NextAuth.js
2. **middleware.ts** protects routes and validates sessions
3. **auth.ts** configures Microsoft provider with tenant-specific authentication
4. **Automatic Token Refresh** - Tokens refresh automatically before expiration
5. **Convex** receives authenticated requests with `userId` from session
6. **API Routes** can use API key authentication for programmatic access

**Session Management:**
- **Token Lifetime**: Azure AD tokens expire after 1 hour
- **Auto-Refresh**: Tokens automatically refresh using refresh tokens
- **Session Duration**: Sessions remain active for up to 24 hours
- **Long-Running Workflows**: Token refresh prevents logout during execution
- **Offline Access**: `offline_access` scope enables refresh token support

**Important:**
- User-facing routes require Azure AD authentication
- `/api/workflows/{id}/execute*` routes support both session and API key auth
- MCP server configurations are user-scoped
- Sessions are encrypted using `AUTH_SECRET` environment variable
- Users must sign out/in once after token refresh implementation to get refresh tokens

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

### LLM Provider Response Formats

**CRITICAL PATTERN**: Each LLM provider returns responses in a unique format. Any code that handles LLM responses (executors, tests, parsers) MUST account for these provider-specific formats.

#### Response Format Reference

**1. Anthropic (Claude)**
```typescript
// Response structure
{
  id: 'msg_xxx',
  type: 'message',
  role: 'assistant',
  content: [
    { type: 'text', text: 'response text' }
  ],
  model: 'claude-sonnet-4-5-20250929',
  stop_reason: 'end_turn',
  usage: { input_tokens: 10, output_tokens: 5 }
}

// Accessing content
response.content[0].type === 'text' ? response.content[0].text : ''
```

**Tool Use Format:**
```typescript
{
  content: [{
    type: 'tool_use',
    id: 'toolu_xxx',
    name: 'tool_name',
    input: { param: 'value' }
  }],
  stop_reason: 'tool_use'
}
```

**2. Google Gemini**
```typescript
// Response structure
{
  candidates: [{
    content: {
      parts: [{ text: 'response text' }],
      role: 'model'
    },
    finishReason: 'STOP'
  }],
  usageMetadata: {
    promptTokenCount: 10,
    candidatesTokenCount: 5,
    totalTokenCount: 15
  }
}

// Accessing content (via ChatGoogleGenerativeAI)
response.content as string  // Library handles extraction
```

**Tool Use Format:**
```typescript
{
  candidates: [{
    content: {
      parts: [{
        functionCall: {
          name: 'tool_name',
          args: { param: 'value' }
        }
      }],
      role: 'model'
    }
  }]
}
```

**3. OpenAI & Groq**
```typescript
// Response structure
{
  id: 'chatcmpl-xxx',
  object: 'chat.completion',
  model: 'gpt-5.2',
  choices: [{
    index: 0,
    message: {
      role: 'assistant',
      content: 'response text'
    },
    finish_reason: 'stop'
  }],
  usage: {
    prompt_tokens: 10,
    completion_tokens: 5,
    total_tokens: 15
  }
}

// Accessing content
response.choices[0].message.content
```

**Tool Use Format:**
```typescript
{
  choices: [{
    message: {
      tool_calls: [{
        id: 'call_xxx',
        type: 'function',
        function: {
          name: 'tool_name',
          arguments: '{"param":"value"}'  // JSON string
        }
      }],
      content: null
    }
  }]
}
```

#### When This Pattern Matters

1. **Writing Tests**: Mock responses must match provider format
   ```typescript
   // ❌ WRONG - Using OpenAI format for Anthropic
   if (provider === 'anthropic') {
     return { choices: [{ message: { content: 'test' } }] };
   }

   // ✅ CORRECT - Provider-specific format
   if (provider === 'anthropic') {
     return { content: [{ type: 'text', text: 'test' }] };
   }
   ```

2. **Response Parsing**: Different extraction logic per provider
   ```typescript
   // In lib/workflow/executors/agent.ts
   if (provider === 'anthropic') {
     responseText = response.content[0].text;  // Anthropic
   } else if (provider === 'google') {
     responseText = response.content as string;  // Google (library handles)
   } else {
     responseText = response.choices[0].message.content;  // OpenAI/Groq
   }
   ```

3. **Tool Handling**: Different tool call structures
   - Anthropic: `content.type === 'tool_use'` with `name` and `input`
   - Google: `parts[].functionCall` with `name` and `args`
   - OpenAI/Groq: `tool_calls[]` array with `function.name` and `arguments` (JSON string)

4. **Error Debugging**: Error format varies by provider
   - Anthropic: `error.error.message`
   - Google: `error.message`
   - OpenAI: `error.error.message`

#### Model ID Patterns

Each provider also has unique model naming conventions:

- **Anthropic**: `claude-{model}-{version}` (e.g., `claude-sonnet-4-5-20250929`)
- **Google**: `gemini-{version}-{variant}-{status}` (e.g., `gemini-3-flash-preview`)
- **OpenAI**: `{model}-{version}` (e.g., `gpt-5.2`, `o3`)
- **Groq**: Uses provider prefixes for some models (e.g., `meta-llama/llama-4-maverick-17b-128e-instruct`)

**IMPORTANT**: Always verify model IDs against official provider documentation. Model names change frequently:
- Preview/experimental models require suffix: `-preview`, `-experimental`
- Stable models may not need version dates
- Check `https://ai.google.dev/gemini-api/docs/models` for Google models
- Check `https://docs.anthropic.com/en/docs/models-overview` for Anthropic models
- Check `https://platform.openai.com/docs/models` for OpenAI models

#### Testing Guidelines

When writing regression tests or integration tests:

1. **Use provider-specific mocks** - Don't use generic mocks for all providers
2. **Test all response types** - Basic, tool use, streaming, errors
3. **Verify actual API format** - Consult official docs, don't guess
4. **Handle edge cases** - Empty responses, malformed data, missing fields

**Example: Regression Test Pattern**
```typescript
// tests/model-regression.spec.ts
llmProviders.forEach(provider => {
  provider.models.forEach(model => {
    test(`${model.name} - Basic`, async () => {
      // Provider-specific mock
      if (provider.id === 'anthropic') {
        addFetchMock({ url: /api\.anthropic\.com/ }, {
          body: { content: [{ type: 'text', text: 'response' }] }
        });
      } else if (provider.id === 'google') {
        addFetchMock({ url: /generativelanguage\.googleapis\.com/ }, {
          body: { candidates: [{ content: { parts: [{ text: 'response' }] } }] }
        });
      } else {
        addFetchMock({ url: /(openai|groq)\.com/ }, {
          body: { choices: [{ message: { content: 'response' } }] }
        });
      }

      // Execute test...
    });
  });
});
```

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

### Document Upload and Processing

The system supports uploading and extracting content from PDF, Word (DOCX), and Markdown files:

**Upload Flow:**
1. User uploads document via Start node's document input variable
2. File stored in Convex storage, returns `storageId`
3. During execution, `prefetchFileContents()` extracts text from document
4. Extracted content injected into workflow state as `content` and `text` properties
5. Variable substitution uses extracted content instead of metadata

**Supported Formats:**
- **PDF** - Text extraction via pdf-parse
- **DOCX** - Text extraction via mammoth
- **Markdown** - Direct text content

**Usage in Workflows:**
```typescript
// In agent instructions, reference document input variables
{{input.RFP_Document}}  // Correct - uses extracted content
{{lastOutput}}          // Incorrect if lastOutput is just metadata

// The system automatically extracts and injects content
// File object: { storageId, originalFilename, content, text }
```

**Key Files:**
- `lib/workflow/file-utils.ts` - Document extraction logic
- `lib/workflow/variable-substitution.ts` - Content substitution
- `convex/http/uploadFile.ts` - File upload endpoint

### Edge Validation and Auto-Save

The system automatically validates and cleans up invalid workflow connections:

```typescript
import { cleanupInvalidEdges } from '@/lib/workflow/edge-cleanup';

const { edges: validEdges, removedCount } = cleanupInvalidEdges(nodes, edges);
```

Workflows auto-save after 1 second debounce using `useWorkflow` hook.

### MCP (Model Context Protocol) Integration

MCP servers provide tools to agents (e.g., Firecrawl for web scraping):

1. **Registry** - MCP servers stored in `convex/mcpServers`
2. **Resolution** - `lib/mcp/resolver.ts` fetches available tools
3. **Execution** - `lib/workflow/executors/mcp.ts` calls MCP tools
4. **Agent Integration** - Agents can use MCP tools via `tools` property

**All LLM Providers Support MCP & Tools:**
- **Anthropic Claude** - Haiku 4.5, Sonnet 4.5, Opus 4.6 (1M context, Feb 2026)
- **OpenAI** - GPT-5.2 (default), o3 (reasoning), GPT-4.5 (Pro), GPT-4o-mini
- **Google Gemini** - Gemini 3 Pro Preview, Gemini 3 Flash, Gemini 2.5 Pro, Gemini 2.5 Flash
- **Groq** - Llama 4 Maverick/Scout, Llama 3.3 70B, Llama 3.1 8B Instant, GPT OSS 120B, GPT OSS 20B

All models work with both standard tools (Firecrawl, Tavily, Serper, E2B, Arcade, Gamma AI) and MCP protocol.

**Recent Model Updates (Feb 2026):**
- ✅ **Anthropic**: Updated to Claude Opus 4.6 (1M context window)
- ✅ **OpenAI**: Added GPT-5.2, o3, GPT-4.5 (replaced deprecated GPT-4o)
- ✅ **Google**: Added Gemini 3 series and Gemini 2.5 series (replaced deprecated Gemini 2.0)
- ✅ **Groq**: Added Llama 4 Maverick and Scout models

### Gamma AI Integration

The Gamma AI node enables generation of professional presentations, documents, and webpages from workflow data.

**Key Features:**
- **Output Formats**: Presentations, documents, webpages
- **Variable Integration**: Full support for `{{variableName}}` syntax
- **Configurable Parameters**: Format, text mode, card count, text amount, image source, language, export format
- **Export Options**: Web-only (Gamma.app link), PPTX (PowerPoint), or PDF download
- **Automatic Export Waiting**: When PPTX/PDF export is requested, automatically waits up to 60 seconds for download URL
- **Real-time Generation**: Automatic polling with 1-minute initial wait + 10-second intervals
- **URL Output**: Shareable Gamma.app links or downloadable files stored in `lastOutput`

**Important Notes:**
- PPTX/PDF exports require a **paid Gamma plan** (Pro, Ultra, Team, or Business)
- Export URLs may take 10-60 seconds to become ready after generation completes
- Download URLs expire after a period of time - use them promptly if needed
- Falls back to web URL if export URL isn't ready within 60 seconds

**Configuration:**
```typescript
// Gamma node parameters
{
  prompt: 'Generate a presentation using data from {{lastOutput}}',
  format: 'presentation' | 'document' | 'webpage',
  textMode: 'generate' | 'paste',
  numCards: 10,                    // Number of slides/sections
  textAmount: 'brief' | 'medium' | 'detailed',
  imageSource: 'aiGenerated' | 'search' | 'none',
  language: 'en',                  // ISO 639-1 code
  exportAs: 'web' | 'pptx' | 'pdf' // Export format (default: 'web')
}
```

**API Key Setup:**
```bash
# System-level key (fallback for all users)
npx convex env set GAMMA_API_KEY "sk-gamma_..."

# Users can also add their own keys via Settings UI
```

**Implementation:**
- **Executor**: `lib/workflow/executors/gamma.ts`
- **UI Panel**: `components/app/(home)/sections/workflow-builder/GammaNodePanel.tsx`
- **LangGraph Integration**: Case handler in `lib/workflow/langgraph.ts`

**Output:**
The Gamma node returns a `__variableUpdates` object that updates `lastOutput` with the generated URL or download link. This enables downstream nodes to reference the presentation:
```typescript
// For web-only (exportAs: 'web' or not specified)
{
  success: true,
  generationId: 'abc123',
  url: 'https://gamma.app/docs/[id]',
  __variableUpdates: { lastOutput: 'https://gamma.app/docs/[id]' }
}

// For PPTX/PDF export (exportAs: 'pptx' or 'pdf')
{
  success: true,
  generationId: 'abc123',
  url: 'https://gamma.app/docs/[id]',          // Web preview
  downloadUrl: 'https://gamma.app/download/[id]', // Download link
  __variableUpdates: { lastOutput: 'https://gamma.app/download/[id]' }
}
```

For detailed implementation docs, see [docs/guides/gamma-node.md](docs/guides/gamma-node.md).

## Agent Tools Integration

The Open Agent Builder includes built-in integrations for powerful external tools that agents can use during workflow execution. These tools are automatically available to agent nodes and can be configured via the two-tier API key system.

### Available Tools

#### 1. Firecrawl - Web Scraping & Crawling

**Purpose**: Extract structured data from websites, crawl pages, scrape content, and convert web pages to clean markdown.

**Capabilities**:
- **Scrape URL** - Extract clean markdown content from a single URL
- **Crawl Website** - Recursively crawl a website following links
- **Map Website** - Get sitemap of all accessible URLs
- **Extract Structured Data** - Use AI to extract specific data fields from web pages

**API Key Setup**:
```bash
# System-level key (fallback for all users)
npx convex env set FIRECRAWL_API_KEY "fc-..."

# Users can add their own keys via Settings > API Keys
```

**Usage in Agents**:
Agents can reference Firecrawl tools automatically when configured with tool access. The tools are available via the MCP protocol and can be invoked by LLMs during reasoning.

**Example Workflow**:
```
Start Node → Agent (with Firecrawl tools) → Extract Node → End
```

The agent can scrape URLs provided in workflow input and extract specific information based on instructions.

**Key Files**:
- `lib/workflow/executors/mcp.ts` - MCP tool execution handler
- `convex/mcpServers.ts` - Firecrawl MCP server registry

**Available Firecrawl Tools**:
- `firecrawl_scrape` - Scrape single URL
- `firecrawl_crawl` - Crawl entire website
- `firecrawl_map` - Generate sitemap
- `firecrawl_extract` - AI-powered extraction

---

#### 2. Tavily - AI-Powered Web Search

**Purpose**: Perform intelligent web searches optimized for AI agents with real-time results and source citations.

**Capabilities**:
- Real-time web search with AI optimization
- Source citation and credibility scoring
- Content extraction from search results
- Domain filtering and advanced search parameters

**API Key Setup**:
```bash
# System-level key (fallback for all users)
npx convex env set TAVILY_API_KEY "tvly-..."

# Users can add their own keys via Settings > API Keys
```

**Usage in Agents**:
Agents can use Tavily for research tasks, fact-checking, and gathering current information from the web.

**Example Workflow**:
```
Start Node → Agent (research query) → Tavily Search → Agent (analyze results) → End
```

**Key Features**:
- Optimized for LLM consumption (clean, structured results)
- Real-time web data (not limited by training cutoff)
- Source URLs included for verification
- Supports search depth control (basic, advanced)

**Integration**:
- Available as tool in agent nodes via MCP protocol
- Results automatically formatted for LLM processing
- Supports variable substitution in search queries

---

#### 3. Serper - Google Search API

**Purpose**: Access Google Search results programmatically with support for web, news, images, and places.

**Capabilities**:
- Google web search results
- News search
- Image search
- Google Places search
- Shopping results
- Domain-specific search

**API Key Setup**:
```bash
# System-level key (fallback for all users)
npx convex env set SERPER_API_KEY "..."

# Users can add their own keys via Settings > API Keys
```

**Usage in Agents**:
Provides Google-quality search results to agents for information retrieval tasks.

**Example Workflow**:
```
Start Node → Agent (search query) → Serper Search → Agent (summarize) → End
```

**Key Features**:
- Google Search quality with API access
- Rich result types (organic, knowledge graph, featured snippets)
- Location-based search support
- Rate limits: Based on your Serper plan

**Integration**:
- Available as HTTP tool to agents
- Returns structured JSON results
- Supports pagination and result count limits

---

#### 4. E2B Code Interpreter - Sandboxed Code Execution

**Purpose**: Execute Python and JavaScript code in secure, isolated cloud sandboxes.

**Capabilities**:
- Run Python/JavaScript code safely
- Install packages dynamically (pip, npm)
- File system access within sandbox
- Network access for API calls
- Stateful execution environments

**API Key Setup**:
```bash
# System-level key (fallback for all users)
npx convex env set E2B_API_KEY "e2b_..."

# Users can add their own keys via Settings > API Keys
```

**Usage in Workflows**:
E2B powers the **Transform Node** for data manipulation and custom processing logic.

**Transform Node**:
```typescript
// Transform node executes JavaScript in E2B sandbox
{
  type: 'transform',
  data: {
    code: `
      // Access workflow variables
      const data = variables.lastOutput;

      // Transform data
      const processed = data.map(item => ({
        name: item.title,
        value: item.price * 1.1
      }));

      return processed;
    `
  }
}
```

**Security**:
- Isolated execution environment per sandbox
- No access to host system
- Resource limits (CPU, memory, timeout)
- Safe for user-provided code

**Key Files**:
- `lib/workflow/executors/data.ts` - Transform node executor using E2B
- `lib/workflow/executors/tool-factory.ts` - E2B tool integration

**Important Notes**:
- Each execution creates a new sandbox instance
- Sandboxes auto-terminate after 5 minutes of inactivity
- Supports common libraries (pandas, requests, etc.)

---

#### 5. Arcade - Browser Automation

**Purpose**: Automate browser interactions, fill forms, click buttons, and extract data from dynamic web applications.

**Capabilities**:
- Browser automation (clicks, typing, navigation)
- Form filling and submission
- Screenshot capture
- JavaScript execution in browser context
- Handle dynamic content and SPAs

**API Key Setup**:
```bash
# System-level key (fallback for all users)
npx convex env set ARCADE_API_KEY "arcade_..."

# Users can add their own keys via Settings > API Keys
```

**Usage in Workflows**:
Arcade powers the **Arcade Node** for browser-based automation tasks.

**Arcade Node Configuration**:
```typescript
{
  type: 'arcade',
  data: {
    toolId: 'tool_abc123',  // Arcade tool ID
    parameters: {
      url: '{{input.targetUrl}}',
      action: 'fill-form',
      fields: {
        email: '{{input.email}}',
        password: '{{input.password}}'
      }
    }
  }
}
```

**Use Cases**:
- Automate login flows
- Fill and submit forms programmatically
- Extract data from JavaScript-heavy sites
- Interact with web applications that require user actions

**Key Files**:
- `lib/workflow/executors/arcade.ts` - Arcade node executor
- `components/app/(home)/sections/workflow-builder/ArcadeNodePanel.tsx` - UI panel

**Integration**:
- Available as dedicated node type
- Supports Arcade API tool definitions
- Results passed to downstream nodes via `lastOutput`

---

#### 6. Gamma AI - Presentation Generation

**Purpose**: Generate professional presentations, documents, and webpages using AI.

**Capabilities**:
- AI-powered presentation generation
- Document creation (reports, proposals)
- Webpage generation
- PPTX/PDF export (requires paid plan)
- Customizable themes and layouts

**API Key Setup**:
```bash
# System-level key (fallback for all users)
npx convex env set GAMMA_API_KEY "sk-gamma_..."

# Users can add their own keys via Settings > API Keys
```

**Usage in Workflows**:
Gamma AI powers the **Gamma AI Node** for automated content generation.

**Configuration Options**:
- **Format**: Presentation, Document, Webpage
- **Text Mode**: Generate (AI-written) or Paste (use provided content)
- **Card Count**: Number of slides/sections (1-25)
- **Text Amount**: Brief, Medium, Detailed
- **Image Source**: AI Generated, Search, None
- **Language**: Any ISO 639-1 language code
- **Export Format**: Web (Gamma.app link), PPTX, PDF

**Example Workflow**:
```
Start Node → Agent (gather data) → Gamma AI (generate presentation) → End
```

The Gamma node receives data from previous nodes and generates a presentation, returning a shareable URL or download link in `lastOutput`.

**Key Files**:
- `lib/workflow/executors/gamma.ts` - Gamma node executor
- `components/app/(home)/sections/workflow-builder/GammaNodePanel.tsx` - UI panel

**Output**:
- Web URL: Shareable Gamma.app link
- Download URL: PPTX/PDF file (when export format specified)
- Both URLs accessible via `url` and `downloadUrl` properties
- `lastOutput` variable contains the primary output URL

See [Gamma AI Integration](#gamma-ai-integration) section above for detailed documentation.

---

### How Agents Access Tools

**Automatic Tool Access**:
When you add tools to an agent node, the agent automatically receives:
1. **Tool Definitions** - Function signatures with parameter descriptions
2. **Invocation Rights** - Permission to call tools during execution
3. **Result Handling** - Tool outputs integrated into agent context

**Tool Selection in Agent Node**:
```typescript
// In Agent Node configuration
{
  type: 'agent',
  data: {
    provider: 'anthropic',
    model: 'claude-sonnet-4',
    instructions: 'Research the company and summarize key facts',
    tools: ['firecrawl', 'tavily', 'serper'],  // Select tools
    mcpTools: ['firecrawl_scrape', 'firecrawl_map']  // MCP-specific tools
  }
}
```

**Execution Flow**:
1. Agent receives instructions and tool definitions
2. LLM decides which tools to use based on task
3. Tools execute with provided parameters
4. Results returned to agent for processing
5. Agent continues reasoning with tool outputs

**Tool Results in State**:
Tool outputs are automatically added to workflow state and accessible via:
- `{{lastOutput}}` - Most recent node output
- `{{toolResults.toolName}}` - Specific tool result
- Agent context - Results available for LLM reasoning

---

### API Key Management

**Two-Tier System**:
All tools support the two-tier API key architecture:

1. **System Keys** (Convex Environment)
   - Fallback for all users
   - Set via `npx convex env set TOOL_API_KEY "..."`
   - Available immediately without user configuration

2. **User Keys** (Convex Database)
   - User-specific keys override system keys
   - Set via Settings > API Keys UI
   - Encrypted with AES-256-GCM

**Key Retrieval in Code**:
```typescript
// From app/api/workflows/[workflowId]/execute-stream/route.ts
const apiKeys = {
  firecrawl: (await getLLMApiKey('firecrawl', userId)) ?? systemKeys.firecrawl,
  tavily: (await getLLMApiKey('tavily', userId)) ?? systemKeys.tavily,
  serper: (await getLLMApiKey('serper', userId)) ?? systemKeys.serper,
  e2b: (await getLLMApiKey('e2b', userId)) ?? systemKeys.e2b,
  arcade: (await getLLMApiKey('arcade', userId)) ?? systemKeys.arcade,
  gamma: (await getLLMApiKey('gamma', userId)) ?? systemKeys.gamma,
};
```

**User Settings UI**:
Users can manage their API keys at `/settings`:
- Add new keys
- Update existing keys
- Delete keys to fall back to system defaults
- Keys encrypted before storage

---

### Tool Debugging and Logging

**Execution Logs**:
All tool invocations are logged for debugging:

```typescript
console.log('[MCPNode] Executing tool:', toolName);
console.log('[MCPNode] Tool parameters:', parameters);
console.log('[MCPNode] Tool result:', result);
```

**Error Handling**:
Tools include comprehensive error handling:
- API errors logged with status codes
- Timeout errors caught and reported
- Invalid parameters validated before execution
- Results normalized to consistent format

**Monitoring**:
Enable LangSmith tracing to monitor tool usage:
```bash
npx convex env set LANGCHAIN_TRACING_V2 "true"
npx convex env set LANGCHAIN_API_KEY "lsv2_pt_..."
```

View tool calls, parameters, and results in LangSmith dashboard.

---

### Adding New Tools

To add a new tool integration:

1. **Add API Key Support**:
   - Add key name to `convex/systemApiKeys.ts`
   - Add to Settings UI for user-level keys

2. **Create Tool Executor**:
   - Add executor in `lib/workflow/executors/your-tool.ts`
   - Implement error handling and result normalization

3. **Register Tool**:
   - Add to `lib/tools/registry.ts` (if using tool factory)
   - Add to MCP registry in `convex/mcpServers.ts` (if MCP-compatible)

4. **Create UI Panel**:
   - Add configuration panel in `components/app/(home)/sections/workflow-builder/`
   - Add tool selection option in agent node

5. **Update Documentation**:
   - Add tool to this section
   - Document API key setup and usage examples

For complete details, see [Adding New Tools](#adding-new-tools) section.

---

### Tool Limitations and Best Practices

**Rate Limits**:
- Firecrawl: 500 requests/month (free), unlimited (paid)
- Tavily: 1000 searches/month (free)
- Serper: Based on your plan
- E2B: 100 sandbox hours/month (free)
- Arcade: Based on your plan
- Gamma: API calls vary by plan

**Best Practices**:
1. **Cache Results** - Avoid redundant tool calls by storing results in state
2. **Error Handling** - Always handle tool failures gracefully
3. **Rate Limiting** - Implement retry logic with exponential backoff
4. **Cost Awareness** - Monitor API usage to control costs
5. **Security** - Never expose API keys in client-side code
6. **Testing** - Test tool integrations with various inputs before production

**Performance Tips**:
- Use parallel tool calls when possible (not implemented yet - future enhancement)
- Limit tool outputs to necessary data only
- Implement timeouts for long-running tools
- Use streaming for large data transfers

## Security

### Security Architecture

The Open Agent Builder implements comprehensive security measures to protect against common web vulnerabilities and ensure safe workflow execution.

#### Key Security Features

**1. Code Injection Protection**
- ✅ **No Function() Constructor** - All dynamic code evaluation uses sandboxed environments
- ✅ **E2B Sandbox** - Transform nodes execute in isolated E2B Code Interpreter
- ✅ **mathjs Evaluator** - Safe expression evaluation for if-else and while conditions
- ✅ **Prototype Pollution Protection** - Clean scopes with dangerous property filtering (`__proto__`, `constructor`, `prototype`)

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
- ✅ **JWT Authentication** - Azure AD authentication via NextAuth.js for all protected routes
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

- **Comprehensive Security Report:** [docs/security/security-fixes.md](docs/security/security-fixes.md)
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
cat docs/security/security-fixes.md
```

## Configuration

### Two-Tier API Key Architecture

This project uses a **two-tier API key system** that provides both convenience and flexibility:

**Tier 1: System-Level Keys (Convex Environment) - Administrator Setup**
- Stored in Convex environment variables
- **Available to ALL users automatically** - no individual setup required
- Set once by administrator via: `npx convex env set KEY_NAME value`
- Works across all deployment environments (dev, staging, production)
- Users can start using workflows immediately after login

**Tier 2: User-Specific Keys (Convex Database) - Optional Override**
- Stored encrypted in Convex database
- User-provided keys via Settings → API Keys UI
- Takes precedence over system keys when provided
- **Completely optional** - users can rely on system keys indefinitely
- Useful for power users who want to use their own quotas or specific accounts

**User Experience:**
- ✅ **End Users**: No API keys required - application works out-of-the-box
- 🔧 **Power Users**: Can optionally add their own keys to override system defaults
- 👨‍💼 **Administrators**: Configure system keys once, all users benefit

### Environment Variables

#### Required in `.env.local` (Next.js Configuration)

These keys MUST stay in `.env.local` because Next.js needs them:

```bash
# Convex Database Connection (REQUIRED - Next.js client needs these)
CONVEX_DEPLOYMENT=dev:your-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://your-deployment.convex.site/http/uploadFile

# Azure Authentication (REQUIRED - NextAuth.js needs these)
AUTH_MICROSOFT_ID=your-azure-app-registration-client-id
AUTH_MICROSOFT_SECRET=your-azure-app-secret
AUTH_MICROSOFT_TENANT_ID=your-azure-tenant-id
AUTH_SECRET=your-nextauth-secret

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
npx convex env set AUTH_MICROSOFT_ID "your-azure-app-id"
npx convex env set CONVEX_TEST_SECRET "<test-secret-key>"

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

### Azure AD + NextAuth Setup

1. **Azure App Registration**: Create an app registration in Azure Portal
   - Note the Application (client) ID → `AUTH_MICROSOFT_ID`
   - Note the Directory (tenant) ID → `AUTH_MICROSOFT_TENANT_ID`
   - Create a client secret → `AUTH_MICROSOFT_SECRET`
   - Add redirect URI: `http://localhost:3000/api/auth/callback/azure-ad` (dev)
   - Add redirect URI: `https://your-domain.com/api/auth/callback/azure-ad` (prod)

2. **Configure Environment Variables**:
   ```bash
   # In .env.local (for NextAuth.js)
   AUTH_MICROSOFT_ID=your-client-id
   AUTH_MICROSOFT_SECRET=your-client-secret
   AUTH_MICROSOFT_TENANT_ID=your-tenant-id
   AUTH_SECRET=$(openssl rand -base64 32)  # Generate secure secret
   ```

3. **Set in Convex** (for backend validation):
   ```bash
   npx convex env set AUTH_MICROSOFT_ID "your-client-id"
   ```

4. **Update auth.ts**: Configure Microsoft provider with your tenant settings

### Next.js Middleware Authentication

This project uses `middleware.ts` for route protection:

- **Public routes** - Home, sign-in pages (no auth required)
- **Protected routes** - All authenticated pages use NextAuth session
- **API routes** - Support both session auth and API key auth
- **Session validation** - Automatic token refresh and session management

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
- **docs/guides/ui-builder.md** - UI Builder complete documentation
- **docs/guides/regression-testing.md** - Model regression testing guide
- **docs/guides/vercel-deployment.md** - Vercel deployment guide
- **docs/guides/human-approval.md** - Human-in-the-loop workflows
- **docs/guides/workflow-runner.md** - Workflow runner documentation
- **docs/guides/gamma-node.md** - Gamma AI node implementation

## Testing Guidance

When writing tests:
- Use Playwright for E2E tests
- Test workflow execution via API routes
- Verify SSE streaming events
- Check Convex database state after operations
- Test authentication flows (Azure AD + API keys)

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

