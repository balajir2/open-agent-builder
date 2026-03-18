# Changelog

All notable changes to Open Agent Builder will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### MCP OAuth 2.0 Support - March 17, 2026

#### Added
- **MCP OAuth 2.0 Authentication** - New `oauth` auth type for MCP servers supporting OAuth 2.0 Authorization Code (with PKCE) and Client Credentials flows
  - `convex/mcpOAuthTokens.ts` - Encrypted token storage (AES-256-GCM) with queries/mutations
  - `convex/mcpOAuthTokensActions.ts` - Token exchange, refresh, and validation actions (Node.js runtime)
  - `convex/mcpOAuthStates.ts` - CSRF/PKCE state management with 10-minute TTL and single-use enforcement
  - `app/api/mcp/oauth/authorize/route.ts` - OAuth initiation endpoint
  - `app/api/mcp/oauth/callback/route.ts` - OAuth callback handler
- **Highspot MCP Server** - First OAuth-authenticated MCP integration
  - Server URL: `https://mcp.highspot.com/mcp`
  - 7 tools: `search_content`, `get_item_content`, `get_content_answer`, `get_content_recommendations`, `generate_pitch`, `get_deal_answer`, `lookup_deal`
- **OAuth UI Flow** - Settings panel supports OAuth 2.0 configuration with popup-based authorization
  - Configure Auth URL, Token URL, Client ID, Client Secret
  - "Connect" button opens popup for user login
  - Status indicator shows connection state (green = connected)

#### Changed
- `convex/schema.ts` - Added `mcpOAuthTokens` and `mcpOAuthStates` tables, `oauthConfig` field on `mcpServers`
- `convex/mcpServers.ts` - Accepts `oauthConfig` in add/update, redacts secrets in responses
- `lib/mcp/resolver.ts` - Injects fresh OAuth tokens during MCP server resolution
- `lib/workflow/executors/agent.ts` - Passes `userId` for OAuth token resolution
- `lib/api/execution-service.ts` - Includes `userId` in resolved API keys
- `SettingsPanelSimple.tsx` - OAuth UI form with Connect button and popup flow

#### Security
- PKCE (S256) enforced on all authorization code flows
- State parameter for CSRF protection (10-minute TTL, single-use)
- All OAuth tokens encrypted with AES-256-GCM before storage
- Client secrets encrypted before storage in Convex
- No tokens exposed to browser — only status metadata returned
- Token auto-refresh with 5-minute buffer before expiry

### Security & Auth Hardening - March 16, 2026

#### Security (from prior agent)
- **Convex Authentication Enforcement** - All Convex queries/mutations now use `requireAuth()` instead of lenient `getUserId()`
  - `convex/workflows.ts` - Complete rewrite with `requireAuth()`, `checkWorkflowAccess()`, `checkWorkflowWriteAccess()`
  - `convex/userLLMKeys.ts` - All queries/mutations enforce authentication
  - `convex/userToolKeys.ts` - All queries/mutations enforce authentication
  - `convex/mcpServers.ts` - All queries/mutations enforce authentication with ownership checks
  - `convex/userLLMKeysActions.ts` - Actions enforce authentication
  - `convex/userToolKeysActions.ts` - Actions enforce authentication
  - `convex/admin.ts` - Admin functions enforce authentication
- **Workflow Ownership Model** - `checkWorkflowAccess()` grants read to owner, assignee, admin, or template; `checkWorkflowWriteAccess()` grants write to owner or admin only
- **Internal Queries** - Added `getWorkflowInternal` and `getWorkflowByCustomIdInternal` for server-side execution engine (not publicly callable)

#### Fixed
- **Convex Auth Race Condition** - Frontend components called Convex queries before auth token was delivered
  - Added `useConvexAuth()` guard to `NodePanel.tsx`, `SettingsPanelSimple.tsx`, `MCPPanel.tsx`, `ToolKeysSettings.tsx`
  - Queries now skip (`"skip"`) until both NextAuth session AND Convex auth are ready
  - `UserMenu.tsx` - `storeUser` mutation waits for `isConvexAuthenticated` before firing
- **ConvexProviderWithAuth Session Loop** - Unauthenticated users caused infinite `/api/auth/session` polling
  - `ConvexClientProvider.tsx` - Uses `ConvexProvider` (no auth) when unauthenticated, `ConvexProviderWithAuth` only when authenticated
  - `SessionManager.tsx` - Guards against acting on empty sessions (no user)
- **GET /api/workflows Auth Fallback** - Returns empty list (200) instead of 500 when unauthenticated
  - Catches both missing auth tokens and expired/invalid Convex tokens
  - `proxy.ts` - Added `/api/workflows` and `/api/vector-db` as public routes (route handler manages auth gracefully)
- **POST /api/workflows Auth Gate** - Returns 401 when unauthenticated (instead of 500)
- **Test Auth Helper** - `setTestAuth()` now passes `actingAsIdentity` to `setAdminAuth()` so `ctx.auth.getUserIdentity()` returns valid identity in tests
- **TypeScript NodeData Type** - Added missing fields: `httpUrl`, `httpMethod`, `httpHeaders`, `httpBody`, `prompt`, `format`, `textMode`, `numCards`, `textAmount`, `imageSource`, `language`, `exportAs`
- **Authentication Tests** - Fixed ownership isolation tests to switch identity between user1/user2 workflow creation
- **Rate Limiter Tests** - Updated to test POST (requires auth) instead of GET (now returns 200 gracefully)
- **UX Regression Tests** - Updated POST test to expect 401 (auth required) instead of 200

#### Added
- **Vector DB Node** - New node type for querying vector databases (Pinecone, Qdrant, Weaviate, Chroma, Milvus)
  - `lib/workflow/executors/vector-db.ts` - Executor supporting 5 providers
  - `components/app/(home)/sections/workflow-builder/VectorDbPanel.tsx` - Configuration UI
  - `app/api/vector-db/test/route.ts` - Test query endpoint
  - `tests/vector-db.spec.ts` - Unit tests
  - `tests/vector-db-e2e.spec.ts` - End-to-end tests

### Fixed - February 15, 2026

- **Safe Expression Evaluator Production Bug** - Fixed `Object.create(null)` causing "Cannot read properties of null (reading 'isComplex')" error
  - mathjs `typed-function` calls `Object.getPrototypeOf(scope)` which fails on null-prototype objects
  - Changed to `{}` with dangerous property filtering (`__proto__`, `constructor`, `prototype`)
  - Affects if-else conditions, while loops, and set-state expressions in production workflows

- **Test Suite Parallel Execution Fixes** - Eliminated all cross-worker interference in Playwright tests
  - Changed `afterEach` → `afterAll` in 4 test files to prevent parallel workers from deleting shared data
  - Added `safeDeleteWorkflow` helpers with try/catch for resilient cleanup
  - Used `Promise.allSettled` for concurrent cleanup operations
  - Fixed admin auth assertions in authentication tests (admin `list` returns all workflows)
  - Files: `comprehensive-regression.spec.ts`, `edge-cases.spec.ts`, `authentication.spec.ts`, `database-operations.spec.ts`

- **Workflow Execution Test Corrections** - Fixed incorrect test assertions and URLs
  - Fixed SSRF test using `http://10.0.0.1` (valid URL) instead of `http://169.254.169.254` (metadata endpoint)
  - Fixed conditional routing assertions to match actual if-else node output format
  - Fixed model regression control test to use `claude-sonnet-4-5-20250929` (valid model)
  - Fixed TypeScript errors across 8 regression test files

### Added - February 13, 2026

- **Build Verification Tests** - Catch TypeScript errors before deployment
  - Added TypeScript compilation check (`tsc --noEmit`) to regression suite
  - Added Next.js build verification to validate full build pipeline
  - Catches type mismatches, missing imports, and build configuration errors
  - Prevents Vercel deployment failures from TypeScript errors
  - Integrated into model regression test suite with detailed reporting

- **Tool API Key Passing Tests** - Comprehensive tool integration verification (665 lines)
  - Tests all 9 tools: Serper Search, Tavily Search, SerpAPI, Firecrawl, ScraperAPI, Browserless, E2B, Arcade, Gamma AI
  - Verifies API keys pass correctly through execution chain: Route → Executor → Tool Factory
  - Prevents regression of TypeScript type definition bugs that cause keys to be dropped
  - All 9 tests passing, integrated into regression suite

- **Reasoning Model Parameter Tests** - OpenAI reasoning model validation
  - Tests o1, o1-mini, o3, o3-mini, GPT-5, GPT-5.2 use correct parameter (`max_completion_tokens`)
  - Tests standard models (GPT-4o) use correct parameter (`max_tokens`)
  - Prevents "Unsupported parameter" errors from OpenAI API
  - Documentation: `docs/REASONING-MODELS-GUIDE.md`

- **Model Regression Test Suite** - Comprehensive testing framework for all LLM providers and models
  - Added `tests/model-regression.spec.ts` with automated testing for all provider/model combinations
  - Tests basic execution, tool usage, and JSON mode for each model
  - Generates detailed JSON and HTML reports in `test-reports/` directory
  - New npm scripts: `test:regression`, `test:regression:headed`, `test:regression:report`
  - Reports include pass/fail rates, test duration, error details, and per-provider statistics
  - **Total Regression Suite**: ~158+ tests (140+ model tests, 7 reasoning tests, 2 build tests, 9 tool tests)

- **Updated LLM Model Support** - All providers updated with latest models (Feb 2026)
  - **Anthropic Claude**: Added Opus 4.6 with 1M token context window
  - **OpenAI**: Added GPT-5.2, o3, GPT-4.5 (replaced deprecated GPT-4o)
  - **Google Gemini**: Added Gemini 3 Pro Preview, Gemini 3 Flash, Gemini 2.5 Pro/Flash
  - **Groq**: Added Llama 4 Maverick and Scout models
  - Updated `lib/config/llm-config.ts` with all current models
  - Updated `lib/api/models.ts` for model validation

- **Comprehensive Test Coverage (85%+)** - Enterprise-grade test suite across all functionality
  - **Phase 1 (Critical)**: 4 test suites covering workflow execution, node executors, API endpoints, security
  - **Phase 2 (High Priority)**: 4 test suites for file processing, tool integrations, templates, database operations
  - **Phase 3 (Important)**: 3 test suites for authentication, edge cases, comprehensive regression
  - **Total**: 11 new test files, 343+ tests, ~5,583 lines of test code
  - **Coverage Improvement**: 35% → 85% (+50 percentage points)
  - HTML report generation with performance metrics and category breakdowns
  - New npm scripts for running test phases and generating reports

- **Documentation Rationalization** - Streamlined documentation from 37 to 28 files (-24%)
  - Deleted entire `archive/` directory (6 obsolete files, 2,293 lines)
  - Consolidated 4 UI Builder docs into single comprehensive guide
  - Renamed files to consistent lowercase-with-hyphens format
  - Created new `docs/guides/regression-testing.md` and `docs/guides/ui-builder.md`
  - Updated all cross-references and navigation

### Changed - February 13, 2026

- **Model Deprecations Addressed**
  - Removed deprecated `claude-opus-4-5-20251101` (replaced with `claude-opus-4-6`)
  - Removed deprecated `gpt-4o` (replaced with `gpt-5.2` as default)
  - Removed deprecated Gemini 2.0 models (retiring March 31, 2026)
  - Updated default models:
    - OpenAI: `gpt-4o` → `gpt-5.2`
    - Google: `gemini-2.0-flash-exp` → `gemini-3-pro-preview`

- **Git Workflow Policy Update** ([CLAUDE.md](CLAUDE.md:7-31))
  - Added requirement to ask user before committing changes
  - Prevents accumulation of unreviewed commits
  - Maintains existing push policy (no push without explicit approval)
  - Updated with clear exceptions for user commands like "commit this" or "deploy now"

- **README Branding Enhancement** ([README.md](README.md:11-14))
  - Added "Built with Love by Bounteous" badge
  - Displayed alongside MIT License, Next.js, and LangGraph badges
  - Links to https://www.bounteous.com

- **Documentation Updates**
  - Updated CLAUDE.md with latest model information
  - Added model regression testing section to documentation
  - Added reasoning models guide: `docs/REASONING-MODELS-GUIDE.md`
  - Updated model lists across all documentation files
  - Added deprecation warnings for outdated models

### Technical Details - February 13, 2026

**Model Updates:**
```typescript
// Anthropic - Updated Opus to 4.6
{
  id: 'claude-opus-4-6',
  name: 'Claude Opus 4.6',
  contextWindow: 1000000,  // 1M tokens!
  description: 'Most capable model - 1M token context, strongest reasoning (Feb 2026)',
}

// OpenAI - New flagship models
{
  id: 'gpt-5.2',
  name: 'GPT-5.2',
  description: 'Default flagship model for ChatGPT (Feb 2026)',
}

// Google - Gemini 3 series
{
  id: 'gemini-3-pro-preview',
  name: 'Gemini 3 Pro (Preview)',
  contextWindow: 2000000,  // 2M tokens!
  description: 'State-of-the-art reasoning and multimodal understanding (Feb 2026)',
}

// Groq - Llama 4 preview models
{
  id: 'meta-llama/llama-4-maverick-17b-128e-instruct',
  name: 'Llama 4 Maverick 17B',
  description: 'Latest Llama 4 preview - enhanced reasoning (2026)',
}
```

**Test Suite Features:**
- Automated testing across 4 providers × multiple models × 3 test types = comprehensive coverage
- Global fetch mocking for consistent test environments
- Detailed error reporting with stack traces
- HTML reports with visual pass/fail indicators
- JSON reports for programmatic analysis
- Test duration tracking and performance metrics

**Files Modified:**
- `lib/config/llm-config.ts` - Updated all model configurations (4 providers)
- `lib/api/models.ts` - Updated model validation and defaults
- `tests/model-regression.spec.ts` - New comprehensive test suite (500+ lines)
- `package.json` - Added test:regression scripts
- `CLAUDE.md` - Updated model information and test documentation
- `CHANGELOG.md` - This changelog entry

### Added
- **Gamma AI PPTX/PDF Export** - Gamma node now supports exporting presentations as PPTX or PDF files
  - Added `exportAs` parameter with options: 'web' (default), 'pptx', 'pdf'
  - Export URLs automatically stored in `lastOutput` variable for downstream nodes
  - Updated UI panel with export format selector
  - Download URLs returned in node output for PPTX/PDF exports

- **Automatic Token Refresh** - Azure AD tokens now refresh automatically before expiration
  - Implemented `refreshAccessToken()` function for seamless token renewal
  - Extended session duration from 1 hour to 24 hours
  - Added `offline_access` scope to Azure AD provider configuration
  - Prevents auto-logout during long-running workflow executions
  - Users remain authenticated throughout multi-hour sessions

### Fixed

- **Serper Search Tool Not Accessible to Agents** ([langgraph.ts](lib/workflow/langgraph.ts:93-131), [agent.ts](lib/workflow/executors/agent.ts:21-38))
  - **Problem**: Agent reported "I don't have access to the Serper Search tool" despite tool being attached and configured
  - **Root Cause**: TypeScript type definitions for `apiKeys` parameter were incomplete, missing tool keys (`tavily`, `serper`, `serpapi`, `e2b`, `scraperapi`, `browserless`)
  - **Solution**: Updated `apiKeys` type in `LangGraphExecutor` and `executeAgentNode` to include all tool API keys
  - Even though execute-stream route passed these keys, TypeScript dropped them due to incomplete type definition
  - **Impact**: All 6 missing tool keys now properly pass through execution chain
  - **Prevention**: Added comprehensive tool API key passing tests (9 tests covering all tools)

- **OpenAI Reasoning Model Parameter Error** ([agent.ts](lib/workflow/executors/agent.ts:355-370))
  - **Problem**: Using o3, o3-mini, or GPT-5 models returned error: "Unsupported parameter: 'max_tokens' is not supported with this model"
  - **Root Cause**: Reasoning models (o1, o3, GPT-5 series) require `max_completion_tokens` instead of `max_tokens`
  - **Solution**: Added `isReasoningModel()` helper to detect reasoning models and use correct parameter
  - Conditional logic: reasoning models use `max_completion_tokens`, standard models use `max_tokens`
  - **Affected Models**: o1, o1-mini, o3, o3-mini, gpt-5, gpt-5.2
  - **Prevention**: Added 7 reasoning model parameter tests to regression suite

- **TypeScript Build Errors Reaching Vercel**
  - **Problem**: TypeScript compilation errors (like MCPPanel.tsx line 169) only caught during Vercel deployment
  - **Root Cause**: No TypeScript compilation verification in test suite
  - **Solution**: Added build verification tests to regression suite
  - Tests run `tsc --noEmit` (TypeScript check) and `npm run build` (full Next.js build)
  - **Impact**: Catches type errors, missing imports, build configuration issues before deployment

- **Auto-Logout During Workflow Execution** ([auth.ts](auth.ts:7-48))
  - **Problem**: Users were automatically logged out after 1 hour during long-running workflows
  - **Root Cause**: Azure AD tokens expired after 1 hour without automatic refresh
  - **Solution**: Implemented automatic token refresh using refresh tokens before expiration
  - JWT callback now checks token expiration and refreshes proactively
  - Session callback passes refresh errors to client for graceful handling
  - **Fix Applied**: Added missing `scope` parameter to refresh token request (fixes AADSTS9002313 error)

- **Workflow Name Reset Issue** ([WorkflowNameEditor.tsx](components/app/(home)/sections/workflow-builder/WorkflowNameEditor.tsx:21))
  - **Problem**: Newly created workflow names were being overwritten back to "New Workflow"
  - **Root Cause**: `useEffect` dependency `[workflow]` triggered on ANY workflow property change
  - **Solution**: Changed dependency to `[workflow?.name]` to only trigger on name changes
  - Prevents name reset when nodes, edges, or other properties update

- **Duplicate Workflows on Markdown Import** ([import-markdown/route.ts](app/api/workflows/import-markdown/route.ts:45))
  - **Problem**: Importing markdown files created duplicate workflows
  - **Root Cause**: Imported workflows lacked `customId`, causing auto-save to create new workflow
  - **Solution**: Generate unique `customId` during import: `imported_${Date.now()}`
  - Prevents duplicate creation on subsequent saves

- **Document Content Not Available to Agents** ([variable-substitution.ts](lib/workflow/variable-substitution.ts:36-44))
  - **Problem**: Agents received file metadata instead of extracted document text
  - **Root Cause**: Variable references pointed to wrong state variables (e.g., `lastOutput` instead of `input.RFP_Document`)
  - **Solution**: Enhanced logging and documentation for proper variable reference patterns
  - Variable substitution now prioritizes `content` and `text` properties over metadata

### Changed
- **Session Management Configuration** ([auth.ts](auth.ts:67-70))
  - Session strategy set to `jwt` with 24-hour max age
  - Access tokens, refresh tokens, and expiration times now tracked in JWT
  - Session errors propagated to client for better user experience

- **TypeScript Type Definitions** ([types/next-auth.d.ts](types/next-auth.d.ts:16-23))
  - Extended `JWT` interface with `accessToken`, `refreshToken`, `accessTokenExpires`, `error`
  - Extended `Session` interface with `accessToken`, `error`
  - Ensures type safety for new authentication fields

- **Workflow Auto-Save Timing** ([CLAUDE.md](CLAUDE.md:391))
  - Updated documentation: Auto-save debounce changed from 500ms to 1000ms
  - Reduces unnecessary saves during rapid workflow editing

- **Documentation Updates** ([CLAUDE.md](CLAUDE.md:221-242))
  - Added comprehensive "Authentication Flow" section with session management details
  - Added "Document Upload and Processing" section explaining file extraction
  - Documented token refresh behavior and offline access requirements
  - Added variable reference best practices for document inputs

### Technical Details

**Authentication Architecture Changes:**
```typescript
// Before: No token refresh
callbacks: {
  async jwt({ token, account }) {
    if (account) token.idToken = account.id_token;
    return token;
  }
}

// After: Automatic refresh
callbacks: {
  async jwt({ token, account, user }) {
    if (account && user) {
      return { ...token, accessToken, refreshToken, accessTokenExpires };
    }
    if (Date.now() < token.accessTokenExpires) return token;
    return refreshAccessToken(token);  // Auto-refresh!
  }
}
```

**Files Modified:**
- `auth.ts` - Token refresh implementation (48 lines added)
- `types/next-auth.d.ts` - Type definitions extended (6 lines added)
- `lib/workflow/variable-substitution.ts` - File content logging optimized (9 lines changed)
- `components/app/(home)/sections/workflow-builder/WorkflowNameEditor.tsx` - Dependency fix (1 line changed)
- `app/api/workflows/import-markdown/route.ts` - CustomId generation (3 lines added)
- `CLAUDE.md` - Documentation updates (60 lines added)
- `CHANGELOG.md` - This changelog entry

**Migration Notes:**
- No breaking changes
- Existing users will need to sign out and sign back in once to receive refresh tokens
- After re-login, sessions will automatically refresh for up to 24 hours

### Changed
- **BREAKING:** Migrated authentication from Clerk to Azure AD (Microsoft Entra ID)
  - Replaced Clerk authentication with NextAuth.js Microsoft provider
  - Updated authentication flow to use session-based authentication
  - Replaced `proxy.ts` with `middleware.ts` for route protection
  - All user authentication now requires Azure AD tenant credentials
- Updated all documentation to reflect Azure AD authentication flow
- Environment configuration system now uses templates (`.env.local.dev`, `.env.local.prod`)
- Production deployment now uses separate Convex deployment (`sensible-ermine-579`)
- Development and production environments now fully separated with distinct configurations

### Added
- Azure AD (Microsoft Entra ID) authentication via NextAuth.js
- Environment configuration templates for development and production
- Comprehensive production deployment guide (`DEPLOYMENT.md`)
- Quality improvements documentation (`QUALITY-IMPROVEMENTS.md`)
- Two-tier API key architecture fully documented
- Production Convex deployment (`sensible-ermine-579`)
- Development Convex deployment (`disciplined-quail-9`)
- Session management with encrypted NextAuth sessions
- Support for both session auth and API key auth in API routes
- Environment switching system between dev and prod
- Comprehensive documentation reorganization with `/docs` directory structure
- Installation guide, quick-start tutorial, and configuration guide
- Distributed rate limiting using Convex for multi-instance deployments
- Distributed caching system with automatic expiration
- Tool result normalization and error handling utilities
- Security verification script
- Google Gemini LLM support (Gemini 2.0 Flash models - migrated from deprecated 1.5 series)
- Tool attachment capabilities for agent nodes (MCP + Standard tools)
- End-user workflow execution UIs (Workflow Runner + UI User Workflows)
- **Enhanced Browserless/Playwright tool with advanced automation features**
  - Added `waitForSelector` - Wait for CSS selector before scraping (handles dynamic content)
  - Added `executeScript` - Execute custom JavaScript on the page (automation, data extraction)
  - Added `screenshot` - Capture full-page screenshots as base64-encoded PNG
  - Added `pdf` - Generate PDFs with print backgrounds as base64-encoded files
  - Added `timeout` - Configurable timeout for page operations (default: 30 seconds)
  - Returns structured results with content, screenshot data, PDF data, and sizes
  - Uses Browserless API endpoints: `/content`, `/screenshot`, `/pdf`

### Changed
- Moved ARCHITECTURE.md to `/docs/architecture/README.md`
- Moved SECURITY.md to `/docs/security/README.md`
- Moved ADDING-NEW-TOOLS.md to `/docs/development/adding-tools.md`
- Improved documentation navigation with central index
- Updated README.md to reflect Google Gemini support, tool attachment, and end-user UIs
- **Documentation cleanup and consistency**:
  - Reduced from 30 files to 24 files (20% reduction, eliminated all redundancy)
  - Removed temporary files: `DOCUMENTATION-FINAL.md`, `PRE-LAUNCH-CHECKLIST.md`
  - Removed redundant `docs/getting-started/` directory (content duplicated README.md)
  - Fixed all model references across 8 documentation files to match `lib/config/llm-config.ts`
- **Repository cleanup**:
  - Removed temporary debugging files: `FINNHUB-MCP-ISSUE.md`, `test-adarsh-mcp.js`, `verify-rate-limit.js`
  - Removed build/test log files: `tsc_output*.log`, `test_output*.log`
  - Updated `.gitignore` to prevent future accumulation of temporary files
  - Cleaned documentation structure remains: README, CHANGELOG, CLAUDE, CONTRIBUTING, USER-MANUAL + `/docs` directory
- **Fixed model version inconsistencies**: Corrected all model references to match `lib/config/llm-config.ts` (single source of truth)
  - Claude: "Haiku 4.5" → "3.5 Haiku", "Sonnet 4.5" → "Sonnet 3.5"
  - OpenAI: "GPT-5" → "GPT-4o", "GPT-5 Mini" → "GPT-4o Mini"
  - Google: Migrated from deprecated Gemini 1.5 models to Gemini 2.0 models (Google retired 1.5 series in 2025)
  - Updated example JSON configurations in workflow guides with correct model IDs

### Fixed
- **CRITICAL:** Fixed TypeScript compilation errors preventing production build
  - Fixed missing `use-toast.ts` hook implementation
  - Corrected import paths for flame effect components
  - Fixed workflow timestamp handling for API routes compatibility
  - Fixed tool type filtering for OpenAI/Groq models with proper type guards
  - Fixed data node executor function name mismatch (`executeDataNode`)
- **CRITICAL:** Fixed agent executor syntax error causing all agent executions to fail (`lib/workflow/executors/agent.ts`)
- **CRITICAL:** Fixed Azure AD authentication import error
  - Changed from `next-auth/providers/microsoft-entra-id` to `next-auth/providers/azure-ad`
  - Simplified AzureAD provider configuration to use tenantId parameter
  - Installed next-auth package (was missing from dependencies)
- **CRITICAL:** Fixed MCP authentication issues preventing Adarsh MCP and other MCP servers from executing
  - Fixed authentication token property inconsistency: MCP resolver provides `accessToken` but MCP utils expected `authToken`
  - Now supports both `authToken` and `accessToken` for backward compatibility
  - Fixed Anthropic 500 error: Don't send `authorization_token` field for MCP servers without authentication
  - Allows MCP servers to work with or without authentication tokens
- **Fixed Google provider missing from Configuration Status UI**
  - Added `googleConfigured` field to `/api/config` endpoint
  - Added 'google' to provider list in SettingsPanelSimple.tsx
  - Updated AddLLMKeyModal to support Google provider with API key help link
  - Updated schema comment to reflect Google as supported provider
- **Fixed workflow duplication bug**: Templates were automatically saved as new workflows every time they were viewed, creating unwanted copies
  - Removed automatic workflow save when loading templates in WorkflowBuilder
  - Templates now only create workflows when user explicitly clicks "Save" or makes changes
  - Prevents duplicate workflows from appearing in workflow list
- **Improved MCP server validation and error handling in agent executor**
  - Added validation to skip MCP servers with missing URLs or names
  - Don't send empty `mcp_servers` array or `betas` to Anthropic API
  - Enhanced error logging with detailed MCP server information for debugging
  - Provide helpful error messages when MCP execution fails (server URL, authentication, accessibility)
- **Fixed Google Gemini 404 "model not found" error**
  - Google retired Gemini 1.5 series models (gemini-1.5-pro, gemini-1.5-flash) in 2025
  - Migrated to current Gemini 2.0 models: `gemini-2.0-flash-exp` (free experimental) and `gemini-2-flash` (stable)
  - Updated default model from deprecated `gemini-1.5-pro` to `gemini-2.0-flash-exp`
  - All Google workflows will now use the latest Gemini 2.0 Flash models
- **CRITICAL: Fixed MCP tools being called with empty arguments**
  - `convertMcpToOpenAiTool` was only checking `mcp.schema` but AdarshMCP uses `input_schema`
  - Added fallback to check both `schema` and `input_schema` properties
  - This was causing tools to be called with `{}` instead of required parameters like `{symbol: "TSLA"}`
  - Now MCP tools receive proper parameters and can return actual data
  - Added detailed logging to track MCP tool arguments and responses for debugging
- **Fixed Google Gemini rejecting MCP tool schemas with non-standard fields**
  - AdarshMCP includes `examples`, `default`, and `arguments` fields in tool schemas
  - Google's Gemini API only accepts standard JSON Schema fields (type, description, enum, items, properties, required)
  - Added `cleanProperties()` function to strip unsupported fields from tool schemas
  - Prevents 400 Bad Request errors: "Unknown name 'examples' at 'tools[0].function_declarations[0].parameters'"
  - Google Gemini now works with all MCP servers regardless of their schema format
- Tavily tool integration (property name mismatch between UI and backend)
- Rate limiting now works across serverless instances
- Fixed incorrect Convex API path in distributed rate limiter causing rate limits to be bypassed
- Updated default Anthropic model to `claude-3-5-sonnet-20241022` to fix 500 Internal Server Error

### Security
- Separated encryption keys for development and production environments
- Removed all secrets from git-tracked files
- Implemented placeholder values in environment templates
- Added GitHub secret scanning protection compliance
- Production-grade encryption key generation for user API keys
- Secure session management with `AUTH_SECRET` encryption

### Removed
- Clerk authentication dependencies
- `proxy.ts` authentication file (replaced with `middleware.ts`)
- Development API keys from environment templates
- Hardcoded production secrets from repository

### Migration Required
- **Azure AD Setup**: Users must configure Azure AD app registration (see [DEPLOYMENT.md](DEPLOYMENT.md))
- **Environment Variables**: Update `.env.local` with Azure AD credentials (see migration guide below)
- **Convex Configuration**: Set `AUTH_MICROSOFT_ID` in Convex environment
- **Session Secret**: Generate new `AUTH_SECRET` for production

## [1.0.0] - 2025-11-21

### Added
- Visual workflow builder with drag-and-drop interface
- 10 core node types (Start, Agent, MCP, Transform, Extract, HTTP, If/Else, While, Approval, End)
- LangGraph execution engine for workflow orchestration
- Real-time streaming execution with Server-Sent Events (SSE)
- Clerk authentication with JWT integration
- Convex real-time database
- Firecrawl integration for web scraping
- MCP (Model Context Protocol) support for all LLM providers
- User API key management with AES-256-GCM encryption
- E2B sandboxed code execution for Transform nodes
- SSRF protection for HTTP nodes
- Template library with pre-built workflows
- API endpoints for programmatic execution
- Human-in-the-loop approval system

### Security
- AES-256-GCM encryption for user API keys
- E2B sandboxing for code execution
- SSRF protection (blocks private IPs and metadata endpoints)
- Distributed rate limiting (10 executions/min per user)
- Authorization checks on all operations
- Safe expression evaluation (no eval/Function)
- Prototype pollution protection
- Cryptographically secure random generation

## [0.1.0] - 2025-10-15

### Added
- Initial project setup
- Basic workflow builder UI
- Simple workflow execution

---

## Migration Guide

### Migrating from Clerk to Azure AD (Unreleased → v2.0.0)

This is a **breaking change** that requires manual migration steps.

#### Prerequisites
- Azure AD tenant (Microsoft 365 or Azure subscription)
- Admin access to create app registrations
- Existing Clerk-based installation

#### Migration Steps

1. **Create Azure AD App Registration**

   Follow the Azure Portal setup:
   - Navigate to Azure Active Directory → App registrations
   - Create new registration named "Open Agent Builder"
   - Note: Application (client) ID, Directory (tenant) ID
   - Create client secret, note the secret value
   - Add redirect URIs:
     - `http://localhost:3000/api/auth/callback/azure-ad` (development)
     - `https://your-domain.com/api/auth/callback/azure-ad` (production)

2. **Update Environment Variables**

   Replace Clerk variables with Azure AD:

   ```bash
   # Remove these (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   CLERK_JWT_ISSUER_DOMAIN=...

   # Add these (Azure AD)
   AUTH_MICROSOFT_ID=your-application-client-id
   AUTH_MICROSOFT_SECRET=your-client-secret-value
   AUTH_MICROSOFT_TENANT_ID=your-directory-tenant-id
   AUTH_SECRET=$(openssl rand -base64 32)  # Generate new
   ```

3. **Update Convex Environment**

   ```bash
   # Development
   npx convex env set AUTH_MICROSOFT_ID "your-application-client-id"

   # Production
   npx convex env set AUTH_MICROSOFT_ID "your-application-client-id" --prod
   ```

4. **Remove Clerk Dependencies**

   ```bash
   npm uninstall @clerk/nextjs
   npm install next-auth@latest
   ```

5. **Deploy Updated Code**

   ```bash
   # Deploy Convex changes
   npx convex deploy --prod

   # Deploy Next.js app
   vercel --prod  # or your deployment method
   ```

6. **Verify Migration**
   - Test sign-in with Azure AD credentials
   - Verify workflows execute correctly
   - Check user sessions are maintained
   - Test API key authentication still works

#### Breaking Changes
- All users must re-authenticate with Azure AD
- Clerk-based session data is not migrated
- User IDs may change (use email for continuity if needed)
- Authentication UI has changed to Microsoft sign-in

#### Rollback Plan
If migration fails, you can rollback:
1. Restore previous environment variables
2. Redeploy previous code version
3. Users can authenticate with Clerk again

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

### Upgrading to Latest Version (General)

If you're upgrading from an earlier version:

1. **Update Dependencies**
   ```bash
   npm install
   ```

2. **Deploy Convex Schema**
   ```bash
   npx convex dev  # or: npx convex deploy --prod
   ```

3. **Verify Security Setup**
   ```bash
   node scripts/verify-security-setup.js
   ```

4. **Check Environment Variables**
   - Ensure `ENCRYPTION_KEY` is set (32-byte base64)
   - Ensure `E2B_API_KEY` is set for Transform nodes
   - Ensure `AUTH_SECRET` is set for session encryption
   - Review new optional variables in [Configuration Guide](./docs/getting-started/configuration.md)

---

## Support

- **Documentation**: [docs/README.md](./docs/README.md)
- **Issues**: [GitHub Issues](https://github.com/balajir2/open-agent-builder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/balajir2/open-agent-builder/discussions)
