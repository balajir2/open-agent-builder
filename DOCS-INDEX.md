# Documentation Index

**Last Updated:** November 21, 2025

Welcome to the Open Agent Builder documentation! This index will help you find the right document for your needs.

---

## 📚 Quick Navigation

| I want to... | Read this document |
|--------------|-------------------|
| **Get started quickly** | [README.md](README.md) |
| **Learn how to use the app** | [USER-MANUAL.md](USER-MANUAL.md) |
| **Understand the architecture** | [ARCHITECTURE.md](ARCHITECTURE.md) ⭐ NEW |
| **Understand security features** | [SECURITY.md](SECURITY.md) |
| **Develop or contribute** | [CLAUDE.md](CLAUDE.md) |
| **Deploy to production** | [README.md#deployment](README.md#deployment) + [SECURITY.md](SECURITY.md) |
| **Troubleshoot issues** | [USER-MANUAL.md#troubleshooting](USER-MANUAL.md#troubleshooting) |
| **Verify my setup** | Run `node scripts/verify-security-setup.js` |

---

## 📖 Documentation by Audience

### 👤 End Users

**Start Here:**
1. **[README.md](README.md)** - Overview, installation, quick start
2. **[USER-MANUAL.md](USER-MANUAL.md)** - Complete guide with tutorials (2000+ lines)

**Reference:**
- [Node Types](USER-MANUAL.md#node-types-reference) - All 14 node types explained
- [Templates](USER-MANUAL.md#templates) - Pre-built workflow examples
- [FAQ](USER-MANUAL.md#faq) - 40+ common questions answered
- [Troubleshooting](USER-MANUAL.md#troubleshooting) - Error solutions

**Security:**
- [Security Overview](README.md#security) - Security features overview
- [API Key Management](USER-MANUAL.md#managing-api-keys) - How to add and manage keys

---

### 👨‍💻 Developers

**Start Here:**
1. **[CLAUDE.md](CLAUDE.md)** - Development guide
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** ⭐ - Complete architecture guide
3. **[README.md](README.md)** - Setup and tech stack

**Technical:**
- [Project Structure](ARCHITECTURE.md#project-structure) - Directory organization
- [Architecture Patterns](ARCHITECTURE.md#architecture-patterns) - Design principles
- [Core Systems](ARCHITECTURE.md#core-systems) - Execution engine, rate limiting, security
- [API Design](ARCHITECTURE.md#api-design) - REST API patterns
- [Database Schema](ARCHITECTURE.md#database-schema) - Convex tables

**Development:**
- [Adding Node Types](CLAUDE.md#adding-a-new-node-type) - Creating new nodes
- [Testing](CLAUDE.md#testing) - Running tests
- [Debugging](CLAUDE.md#debugging) - LangSmith monitoring
- [Configuration](CLAUDE.md#configuration) - Environment variables

---

### 🔒 Security Teams

**Start Here:**
1. **[SECURITY.md](SECURITY.md)** - Complete security guide
2. **[ARCHITECTURE.md#security-system](ARCHITECTURE.md#security-system)** - Security architecture

**Verification:**
- [Security Features](SECURITY.md#security-features) - All 8 features explained
- [Verification Report](VERIFICATION-REPORT.md) - Security verification status
- [Production Checklist](SECURITY.md#production-checklist) - Deployment security

**Implementation:**
- [Encryption](SECURITY.md#aes-256-gcm-encryption) - AES-256-GCM details
- [Rate Limiting](ARCHITECTURE.md#distributed-rate-limiting) - Distributed implementation
- [Sandboxing](SECURITY.md#e2b-sandboxing) - E2B code isolation
- [SSRF Protection](SECURITY.md#ssrf-protection) - HTTP security

---

## 🎯 Reading Paths

### New User Path
1. [README.md](README.md) - Overview
2. [USER-MANUAL.md#getting-started](USER-MANUAL.md#getting-started) - Tutorial
3. [USER-MANUAL.md#building-your-first-workflow](USER-MANUAL.md#building-your-first-workflow) - First workflow
4. [USER-MANUAL.md#node-types-reference](USER-MANUAL.md#node-types-reference) - Learn nodes
5. [USER-MANUAL.md#troubleshooting](USER-MANUAL.md#troubleshooting) - Solve issues

### New Developer Path
1. [README.md](README.md) - Overview
2. [CLAUDE.md#installation--setup](CLAUDE.md#installation--setup) - Setup
3. [ARCHITECTURE.md](ARCHITECTURE.md) - Architecture
4. [CLAUDE.md#project-structure](CLAUDE.md#project-structure) - Codebase
5. [CLAUDE.md#common-development-tasks](CLAUDE.md#common-development-tasks) - Tasks

### Security Audit Path
1. [SECURITY.md](SECURITY.md) - Security overview
2. [ARCHITECTURE.md#security-system](ARCHITECTURE.md#security-system) - Implementation
3. [VERIFICATION-REPORT.md](VERIFICATION-REPORT.md) - Verification
4. [SECURITY.md#production-checklist](SECURITY.md#production-checklist) - Checklist

### Production Deployment Path
1. [README.md#prerequisites](README.md#prerequisites) - Requirements
2. [README.md#installation--setup](README.md#installation--setup) - Setup
3. [SECURITY.md#production-deployment](SECURITY.md#production-deployment) - Security
4. [README.md#deployment](README.md#deployment) - Deploy
5. [ARCHITECTURE.md#monitoring--observability](ARCHITECTURE.md#monitoring--observability) - Monitor

---

## 🔍 Search Guide

### Common Topics

**"How do I..."**
- Set up the project? → [README.md#installation--setup](README.md#installation--setup)
- Create a workflow? → [USER-MANUAL.md#building-your-first-workflow](USER-MANUAL.md#building-your-first-workflow)
- Add an Agent node? → [USER-MANUAL.md#agent-node](USER-MANUAL.md#agent-node)
- Deploy to production? → [README.md#deployment](README.md#deployment)
- Secure the application? → [SECURITY.md](SECURITY.md)
- Debug execution? → [ARCHITECTURE.md#monitoring--observability](ARCHITECTURE.md#monitoring--observability)

**"What is..."**
- LangGraph? → [ARCHITECTURE.md#workflow-execution-engine](ARCHITECTURE.md#workflow-execution-engine)
- Convex? → [ARCHITECTURE.md#tech-stack](ARCHITECTURE.md#tech-stack)
- MCP? → [USER-MANUAL.md#mcp-nodes](USER-MANUAL.md#mcp-nodes)
- Rate limiting? → [ARCHITECTURE.md#distributed-rate-limiting](ARCHITECTURE.md#distributed-rate-limiting)
- E2B? → [SECURITY.md#e2b-sandboxing](SECURITY.md#e2b-sandboxing)

**"Why..."**
- Feature-based folders? → [ARCHITECTURE.md#feature-based-organization](ARCHITECTURE.md#feature-based-organization)
- Convex for rate limiting? → [ARCHITECTURE.md#distributed-state-management](ARCHITECTURE.md#distributed-state-management)
- E2B sandbox required? → [SECURITY.md#e2b-sandboxing](SECURITY.md#e2b-sandboxing)

---

## 📋 Documentation Status

| Document | Purpose | Lines | Status |
|----------|---------|-------|--------|
| [README.md](README.md) | Project overview | 600+ | ✅ Current |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design | 800+ | ✅ Current |
| [CLAUDE.md](CLAUDE.md) | Developer guide | 500+ | ✅ Current |
| [USER-MANUAL.md](USER-MANUAL.md) | User guide | 2000+ | ✅ Current |
| [SECURITY.md](SECURITY.md) | Security guide | 500+ | ✅ Current |
| [VERIFICATION-REPORT.md](VERIFICATION-REPORT.md) | Security verification | 400+ | ✅ Current |
| [DOCS-INDEX.md](DOCS-INDEX.md) | This file | 250+ | ✅ Current |

**Total:** ~5,000 lines of documentation

---

## 🆘 Getting Help

**For Users:**
1. Check [USER-MANUAL.md#faq](USER-MANUAL.md#faq) - 40+ questions
2. Review [USER-MANUAL.md#troubleshooting](USER-MANUAL.md#troubleshooting)
3. Search this documentation index

**For Developers:**
1. Check [CLAUDE.md](CLAUDE.md) - Development guide
2. Review [ARCHITECTURE.md](ARCHITECTURE.md) - System design
3. Check GitHub issues

**For Security:**
1. Check [SECURITY.md](SECURITY.md) - Security documentation
2. Review [VERIFICATION-REPORT.md](VERIFICATION-REPORT.md) - Verification status
3. Contact: security@your-domain.com

---

## 🔄 Recent Updates

**November 21, 2025:**
- ✅ Added [ARCHITECTURE.md](ARCHITECTURE.md) - Comprehensive architecture guide
- ✅ Consolidated 7 redundant documents into 1
- ✅ Improved documentation structure
- ✅ Updated navigation and search

**November 19, 2025:**
- ✅ Added [USER-MANUAL.md](USER-MANUAL.md) - 2000+ line user guide
- ✅ Updated [SECURITY.md](SECURITY.md) - Complete security documentation
- ✅ Added [VERIFICATION-REPORT.md](VERIFICATION-REPORT.md) - Security verification
- ✅ Added security fixes documentation

---

**Total Documentation:** 7 core files, ~5,000 lines
**Last Updated:** November 21, 2025
