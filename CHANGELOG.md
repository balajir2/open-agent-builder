# Changelog

All notable changes to Open Agent Builder will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation reorganization with `/docs` directory structure
- Installation guide, quick-start tutorial, and configuration guide
- Distributed rate limiting using Convex for multi-instance deployments
- Tool result normalization and error handling utilities
- Security verification script

### Changed
- Moved ARCHITECTURE.md to `/docs/architecture/README.md`
- Moved SECURITY.md to `/docs/security/README.md`
- Moved ADDING-NEW-TOOLS.md to `/docs/development/adding-tools.md`
- Improved documentation navigation with central index

### Fixed
- Tavily tool integration (property name mismatch between UI and backend)
- Rate limiting now works across serverless instances

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

### Upgrading to Latest Version

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
   - Review new optional variables in [Configuration Guide](./docs/getting-started/configuration.md)

---

## Support

- **Documentation**: [docs/README.md](./docs/README.md)
- **Issues**: [GitHub Issues](https://github.com/firecrawl/open-agent-builder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/firecrawl/open-agent-builder/discussions)
