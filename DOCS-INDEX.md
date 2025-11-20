# Documentation Index

**Last Updated:** November 19, 2025

Welcome to the Open Agent Builder documentation! This index will help you find the right document for your needs.

---

## 📚 Quick Navigation

| I want to... | Read this document |
|--------------|-------------------|
| **Get started quickly** | [README.md](README.md) |
| **Learn how to use the app** | [USER-MANUAL.md](USER-MANUAL.md) |
| **Understand security features** | [SECURITY.md](SECURITY.md) |
| **Develop or contribute** | [CLAUDE.md](CLAUDE.md) |
| **Deploy to production** | [README.md](README.md#deployment) + [SECURITY.md](SECURITY.md) |
| **Troubleshoot issues** | [USER-MANUAL.md](USER-MANUAL.md#troubleshooting) |
| **Verify my setup** | Run `node scripts/verify-security-setup.js` |
| **Understand recent security fixes** | [SECURITY-FIXES-2025-11-19.md](SECURITY-FIXES-2025-11-19.md) |

---

## 📖 Documentation by Audience

### 👤 End Users

**Start Here:**
1. **[README.md](README.md)** - Overview, installation, quick start
2. **[USER-MANUAL.md](USER-MANUAL.md)** - Complete guide with tutorials

**Reference:**
- [Node Types](USER-MANUAL.md#node-types-reference) - All 11 node types explained
- [Templates](USER-MANUAL.md#templates) - Pre-built workflow examples
- [FAQ](USER-MANUAL.md#faq) - Common questions answered
- [Troubleshooting](USER-MANUAL.md#troubleshooting) - Error solutions

**Security:**
- [Security Overview](README.md#security) - Security features overview
- [API Key Management](USER-MANUAL.md#managing-api-keys) - How to add and manage keys

---

### 👨‍💻 Developers

**Start Here:**
1. **[CLAUDE.md](CLAUDE.md)** - Architecture and development guide
2. **[README.md](README.md)** - Setup and tech stack

**Technical:**
- [Project Structure](CLAUDE.md#project-structure) - File organization
- [Adding Node Types](CLAUDE.md#adding-a-new-node-type) - Extend functionality
- [LangGraph Integration](CLAUDE.md#workflow-execution-architecture) - Execution engine
- [Security Implementation](SECURITY-FIXES-2025-11-19.md) - Technical security details

**Code Quality:**
- [VERIFICATION-REPORT.md](VERIFICATION-REPORT.md) - TypeScript compilation status
- [TypeScript Guidelines](CLAUDE.md#typescript-strict-mode) - Code standards

---

### 🔒 Security Engineers

**Start Here:**
1. **[SECURITY.md](SECURITY.md)** - Comprehensive security guide
2. **[SECURITY-FIXES-2025-11-19.md](SECURITY-FIXES-2025-11-19.md)** - Recent security updates

**Deep Dive:**
- [Security Features](SECURITY.md#security-features) - All 8 security measures
- [Encryption Implementation](convex/lib/encryption.ts) - AES-256-GCM code
- [SSRF Protection](lib/workflow/ssrf-protection.ts) - HTTP security
- [Rate Limiting](lib/api/rate-limiter.ts) - API protection

**Verification:**
- [VERIFICATION-REPORT.md](VERIFICATION-REPORT.md) - Security verification details
- [Verification Script](scripts/verify-security-setup.js) - Automated checks

---

### ⚙️ DevOps Engineers

**Start Here:**
1. **[README.md](README.md#deployment)** - Deployment guide
2. **[SECURITY.md](SECURITY.md#production-deployment-checklist)** - Security checklist

**Configuration:**
- [.env.example](.env.example) - Environment variable template
- [Environment Variables](README.md#environment-variables-checklist) - Required vars
- [Verification Script](scripts/verify-security-setup.js) - Pre-deployment checks

**Monitoring:**
- [Security Monitoring](SECURITY.md#monitoring) - What to track
- [Incident Response](SECURITY.md#security-incident-response) - Procedures

---

## 📄 Document Descriptions

### Core Documentation

#### [README.md](README.md)
- **Purpose:** Project overview and quick start
- **Audience:** Everyone
- **Contents:**
  - What is Open Agent Builder
  - Key features
  - Installation instructions
  - Quick start guide
  - Security overview
  - Deployment guide
  - API usage
- **Length:** ~500 lines
- **When to read:** First time setup

---

#### [USER-MANUAL.md](USER-MANUAL.md)
- **Purpose:** Comprehensive user guide
- **Audience:** End users (all levels)
- **Contents:**
  - Getting started tutorial
  - Interface walkthrough
  - Step-by-step workflow creation
  - All 11 node types (detailed)
  - Advanced features
  - Best practices
  - Troubleshooting guide
  - FAQ (40+ questions)
  - Quick reference card
- **Length:** ~2000 lines
- **When to read:** After installation, as reference

---

#### [CLAUDE.md](CLAUDE.md)
- **Purpose:** Developer and architecture documentation
- **Audience:** Developers, contributors
- **Contents:**
  - Architecture overview
  - Project structure
  - Core technology explanations
  - Development patterns
  - Adding new features
  - Configuration details
  - Testing guidance
- **Length:** ~400 lines
- **When to read:** When developing or contributing

---

### Security Documentation

#### [SECURITY.md](SECURITY.md)
- **Purpose:** Complete security guide
- **Audience:** Everyone (security-conscious)
- **Contents:**
  - Security features (detailed)
  - Production deployment checklist
  - Configuration instructions
  - Monitoring and alerts
  - Incident response procedures
  - OWASP Top 10 coverage
  - Compliance notes
- **Length:** ~500 lines
- **When to read:** Before production deployment

---

#### [SECURITY-FIXES-2025-11-19.md](SECURITY-FIXES-2025-11-19.md)
- **Purpose:** Technical security fix details
- **Audience:** Developers, security engineers
- **Contents:**
  - All 34 security issues fixed
  - Before/after code examples
  - Implementation details
  - Configuration requirements
  - Testing recommendations
- **Length:** ~800 lines
- **When to read:** Understanding security implementation

---

#### [VERIFICATION-REPORT.md](VERIFICATION-REPORT.md)
- **Purpose:** Security and code verification status
- **Audience:** Developers, DevOps, auditors
- **Contents:**
  - TypeScript compilation status
  - Security feature verification
  - Dependency checks
  - Deployment checklist
- **Length:** ~400 lines
- **When to read:** Pre-deployment verification

---

### Configuration

#### [.env.example](.env.example)
- **Purpose:** Environment variable template
- **Audience:** Everyone setting up
- **Contents:**
  - All environment variables
  - Required vs optional marked
  - Security notes
  - Setup instructions
- **Length:** ~80 lines
- **When to read:** During initial setup

---

#### [scripts/verify-security-setup.js](scripts/verify-security-setup.js)
- **Purpose:** Automated security verification
- **Audience:** Everyone deploying
- **Contents:**
  - Encryption key validation
  - E2B API key check
  - File presence verification
  - Dependency checks
- **Length:** ~200 lines
- **When to use:** Before running app, before deployment

---

### Meta Documentation

#### [DOCUMENTATION-UPDATE-SUMMARY.md](DOCUMENTATION-UPDATE-SUMMARY.md)
- **Purpose:** Summary of documentation changes
- **Audience:** Maintainers
- **Contents:**
  - All documentation updates
  - New files created
  - Coverage metrics
  - Maintenance guidelines
- **Length:** ~600 lines
- **When to read:** Understanding documentation structure

---

#### [DOCS-INDEX.md](DOCS-INDEX.md) (This File)
- **Purpose:** Documentation navigation guide
- **Audience:** Everyone
- **Contents:**
  - Quick navigation
  - Document descriptions
  - Reading paths
  - Search guide
- **When to read:** Finding the right document

---

## 🗺️ Reading Paths

### Path 1: New User Setup
1. **[README.md](README.md)** - Understand what the app does (5 min)
2. **[README.md](README.md#installation--setup)** - Follow installation steps (20 min)
3. **Run** `node scripts/verify-security-setup.js` - Verify setup (1 min)
4. **[USER-MANUAL.md](USER-MANUAL.md#building-your-first-workflow)** - Build first workflow (15 min)
5. **[USER-MANUAL.md](USER-MANUAL.md#node-types-reference)** - Learn node types (as needed)

**Total Time:** ~45 minutes to productive

---

### Path 2: Production Deployment
1. **[README.md](README.md#installation--setup)** - Basic setup (20 min)
2. **[SECURITY.md](SECURITY.md#production-deployment-checklist)** - Security checklist (15 min)
3. **[.env.example](.env.example)** - Configure environment (10 min)
4. **Run** `node scripts/verify-security-setup.js` - Verify configuration (1 min)
5. **[README.md](README.md#deployment)** - Deploy to Vercel (15 min)
6. **[SECURITY.md](SECURITY.md#monitoring)** - Set up monitoring (20 min)

**Total Time:** ~1.5 hours to production

---

### Path 3: Security Audit
1. **[SECURITY.md](SECURITY.md)** - Security features and architecture (30 min)
2. **[SECURITY-FIXES-2025-11-19.md](SECURITY-FIXES-2025-11-19.md)** - Recent fixes (30 min)
3. **[VERIFICATION-REPORT.md](VERIFICATION-REPORT.md)** - Verification status (15 min)
4. **Review code:**
   - [convex/lib/encryption.ts](convex/lib/encryption.ts) - Encryption
   - [lib/workflow/ssrf-protection.ts](lib/workflow/ssrf-protection.ts) - SSRF
   - [lib/api/rate-limiter.ts](lib/api/rate-limiter.ts) - Rate limiting
5. **Run** `node scripts/verify-security-setup.js` - Verify setup (1 min)

**Total Time:** ~2 hours for thorough audit

---

### Path 4: Development Contribution
1. **[README.md](README.md)** - Project overview (10 min)
2. **[CLAUDE.md](CLAUDE.md)** - Architecture and patterns (45 min)
3. **[CLAUDE.md](CLAUDE.md#adding-a-new-node-type)** - Development guide (30 min)
4. **[SECURITY.md](SECURITY.md#development-best-practices)** - Security standards (15 min)
5. **[VERIFICATION-REPORT.md](VERIFICATION-REPORT.md)** - Code quality standards (10 min)

**Total Time:** ~2 hours to start contributing

---

## 🔍 Search Guide

### Common Topics

**"How do I set up the app?"**
→ [README.md](README.md#installation--setup)

**"How do I create a workflow?"**
→ [USER-MANUAL.md](USER-MANUAL.md#building-your-first-workflow)

**"What node types are available?"**
→ [USER-MANUAL.md](USER-MANUAL.md#node-types-reference)

**"How do I add API keys?"**
→ [USER-MANUAL.md](USER-MANUAL.md#managing-api-keys)

**"What are the security features?"**
→ [SECURITY.md](SECURITY.md#security-features)

**"How do I deploy to production?"**
→ [README.md](README.md#deployment) + [SECURITY.md](SECURITY.md#production-deployment-checklist)

**"I'm getting error X"**
→ [USER-MANUAL.md](USER-MANUAL.md#troubleshooting)

**"How do I contribute code?"**
→ [CLAUDE.md](CLAUDE.md)

**"What's the architecture?"**
→ [CLAUDE.md](CLAUDE.md#architecture)

**"How do I add a custom node?"**
→ [CLAUDE.md](CLAUDE.md#adding-a-new-node-type)

---

## 📊 Documentation Statistics

### Coverage by Topic
- **Installation & Setup:** ✅ 100% (README, USER-MANUAL)
- **User Features:** ✅ 100% (USER-MANUAL)
- **Security:** ✅ 100% (SECURITY, fixes, verification)
- **Development:** ✅ 100% (CLAUDE)
- **Deployment:** ✅ 100% (README, SECURITY)
- **Troubleshooting:** ✅ 100% (USER-MANUAL)
- **API:** ⚠️ 70% (README has basics, could expand)

### Documentation Metrics
- **Total Documents:** 11
- **Total Lines:** ~6000+
- **Code Examples:** 100+
- **Tutorials:** 5
- **FAQ Entries:** 40+
- **Troubleshooting Entries:** 10+

---

## 🔄 Keeping Documentation Updated

### When to Update Documents

**After feature changes:**
- Update USER-MANUAL.md (user-facing)
- Update CLAUDE.md (architecture)
- Update README.md if major feature

**After security changes:**
- Update SECURITY.md
- Add to security fixes document
- Update VERIFICATION-REPORT.md

**After configuration changes:**
- Update .env.example
- Update README.md setup section
- Update CLAUDE.md config section

### Update Checklist
- [ ] Update "Last Updated" date
- [ ] Test all code examples
- [ ] Verify all links work
- [ ] Cross-reference related sections
- [ ] Update version numbers
- [ ] Get peer review

---

## 💡 Tips for Reading Documentation

1. **Start with README.md** - Always begin here
2. **Use the index** - This document helps you navigate
3. **Follow the reading paths** - Structured learning
4. **Use search** - Ctrl+F to find specific topics
5. **Check examples** - Learn by doing
6. **Run verification** - Test your understanding
7. **Refer to troubleshooting** - Common issues solved
8. **Keep docs open** - Reference while working

---

## 📞 Getting Help

**Can't find what you need?**

1. **Search all docs** - Use GitHub search across all .md files
2. **Check FAQ** - [USER-MANUAL.md](USER-MANUAL.md#faq)
3. **Run verification** - `node scripts/verify-security-setup.js`
4. **Check issues** - GitHub Issues may have answers
5. **Ask community** - Discord/Slack support
6. **Contact support** - support@your-domain.com

**Found a documentation issue?**
- Open a GitHub Issue with label "documentation"
- Include: which doc, what's unclear, suggested fix

---

## 🎯 Documentation Goals

Our documentation aims to:
- ✅ Help new users get started in <15 minutes
- ✅ Provide comprehensive reference for all features
- ✅ Enable secure production deployment
- ✅ Support developer contributions
- ✅ Answer common questions proactively
- ✅ Maintain high quality and accuracy

**Your feedback helps us improve! Let us know what's helpful and what's missing.**

---

**Documentation Index Last Updated:** November 19, 2025
