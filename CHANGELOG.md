# Changelog

All notable changes to Open Agent Builder will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
- MCP (Model Context Protocol) support for Anthropic Claude
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
- **Issues**: [GitHub Issues](https://github.com/firecrawl/open-agent-builder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/firecrawl/open-agent-builder/discussions)
