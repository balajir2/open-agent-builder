# Open Agent Builder - Documentation Index

**Last Updated:** February 13, 2026

This document provides a centralized index to all documentation in the project. Documentation is organized by audience and purpose.

---

## 📚 Core Documentation (Start Here)

### For All Users

| Document | Purpose | Audience |
|----------|---------|----------|
| **[README.md](./README.md)** | Project overview, quick start, installation guide | Everyone (first stop) |
| **[CHANGELOG.md](./CHANGELOG.md)** | Version history, feature additions, breaking changes | All users tracking updates |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | How to contribute code, report bugs, submit PRs | Contributors |

### For End Users

| Document | Purpose | Location |
|----------|---------|----------|
| **[User Guide](./docs/USER-GUIDE.md)** 📖 | Complete guide to using the application (500+ lines) | `docs/USER-GUIDE.md` |
| **[Workflow Runner Guide](./docs/guides/WORKFLOW-RUNNER-README.md)** | End-user workflow execution interface | `docs/guides/` |
| **[Human Approval Guide](./docs/HUMAN_APPROVAL_GUIDE.md)** | Guide for approvers and builders on approval flows | `docs/HUMAN_APPROVAL_GUIDE.md` |

### For Administrators

| Document | Purpose | Location |
|----------|---------|----------|
| **[Admin Guide](./docs/ADMIN-GUIDE.md)** 🔧 | Installation, configuration, deployment (900+ lines) | `docs/ADMIN-GUIDE.md` |
| **[Deployment Guide](./DEPLOYMENT.md)** | Production deployment instructions | Root directory |
| **[Environment Switching](./ENVIRONMENT-SWITCHING.md)** | Switch between dev/prod environments | Root directory |

### For Developers

| Document | Purpose | Location |
|----------|---------|----------|
| **[Developer Guide (CLAUDE.md)](./CLAUDE.md)** | Development setup, architecture, patterns (500+ lines) | Root directory |
| **[Architecture Guide](./docs/ARCHITECTURE.md)** ⭐ | System architecture deep dive (1200+ lines) | `docs/ARCHITECTURE.md` |
| **[Adding New Tools](./ADDING-NEW-TOOLS.md)** | How to integrate new tools | Root directory |

---

## 🔐 Security & Operations

| Document | Purpose | Location |
|----------|---------|----------|
| **[Security Guide](./SECURITY.md)** | Security features, OWASP compliance, best practices | Root directory |
| **[Security Fixes Report](./docs/SECURITY-FIXES-REPORT.md)** | Security audit and fixes report | `docs/` |

---

## 🎨 Specialized Guides

### UI Builder Documentation (4 guides)

Located in `docs/guides/`:
- `UI-BUILDER-README.md` - Complete UI Builder documentation
- `UI-BUILDER-QUICKSTART.md` - 5-minute tutorial
- `UI-BUILDER-ARCHITECTURE.md` - Architecture diagrams
- `UI-BUILDER-EXAMPLES.md` - Example implementations

### Workflow Features

- **[Workflow Runner](./docs/guides/WORKFLOW-RUNNER-README.md)** - End-user execution interface
- **[Vercel Deployment](./docs/guides/VERCEL_DEPLOYMENT_GUIDE.md)** - Production deployment to Vercel

---

## 📝 Historical & Reference Documents

These documents provide historical context and are kept for reference:

| Document | Purpose | Status |
|----------|---------|--------|
| `SESSION-FIXES-SUMMARY.md` | Session fixes summary | 📦 Archive |
| `DOCUMENTATION-UPDATE-SUMMARY.md` | Documentation restructure summary | ✅ Current |
| `CLEANUP-AND-SECURITY-SUMMARY-DEC-2025.md` | Cleanup & security summary | 📦 Archive |
| `CLEANUP-SUMMARY.md` | API key migration summary | 📦 Archive |
| `QUALITY-IMPROVEMENTS.md` | Code quality improvements | 📦 Archive |
| `GAMMA-NODE-CHANGELOG.md` | Gamma node development log | 📦 Archive |
| `USER-MANUAL.md` | Legacy user manual | ⚠️ Deprecated (use USER-GUIDE.md) |

**Note:** Documents marked 📦 Archive can be moved to `docs/archive/` for historical reference.

---

## 🗂️ Recommended Documentation Structure

```
open-agent-builder/
├── README.md                          ⭐ Start here
├── CHANGELOG.md                       📋 Version history
├── CONTRIBUTING.md                    🤝 How to contribute
├── CLAUDE.md                          💻 Developer guide
├── DEPLOYMENT.md                      🚀 Production deployment
├── ENVIRONMENT-SWITCHING.md           🔄 Dev/prod switching
├── ADDING-NEW-TOOLS.md               🔧 Tool integration guide
├── SECURITY.md                        🔐 Security documentation
├── DOCUMENTATION-INDEX.md            📚 This file
│
├── docs/
│   ├── USER-GUIDE.md                 📖 End user documentation (primary)
│   ├── ADMIN-GUIDE.md                🔧 System administration
│   ├── ARCHITECTURE.md               ⭐ Technical architecture
│   ├── SECURITY-FIXES-REPORT.md      🛡️ Security audit report
│   │
│   ├── guides/                       📚 Specialized guides
│   │   ├── UI-BUILDER-*.md          (4 files)
│   │   ├── WORKFLOW-RUNNER-README.md
│   │   └── VERCEL_DEPLOYMENT_GUIDE.md
│   │
│   ├── architecture/                 🏗️ Architecture docs
│   │   ├── README.md
│   │   ├── database-schema.md
│   │   └── execution-engine.md
│   │
│   └── archive/                      📦 Historical documents
│       ├── CLEANUP-AND-SECURITY-SUMMARY-DEC-2025.md
│       ├── CLEANUP-SUMMARY.md
│       ├── QUALITY-IMPROVEMENTS.md
│       ├── GAMMA-NODE-CHANGELOG.md
│       └── USER-MANUAL.md
```

---

## 🎯 Quick Navigation by Task

### I want to...

| Task | Document to Read |
|------|------------------|
| **Get started quickly** | [README.md](./README.md) |
| **Learn how to use the app** | [docs/USER-GUIDE.md](./docs/USER-GUIDE.md) |
| **Install and configure** | [docs/ADMIN-GUIDE.md](./docs/ADMIN-GUIDE.md) |
| **Understand the architecture** | [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) |
| **Develop or contribute** | [CLAUDE.md](./CLAUDE.md) |
| **Deploy to production** | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| **Add a new tool** | [ADDING-NEW-TOOLS.md](./ADDING-NEW-TOOLS.md) |
| **Understand security** | [SECURITY.md](./SECURITY.md) |
| **Build a custom UI** | [docs/guides/UI-BUILDER-README.md](./docs/guides/UI-BUILDER-README.md) |
| **Execute workflows as end-user** | [docs/guides/WORKFLOW-RUNNER-README.md](./docs/guides/WORKFLOW-RUNNER-README.md) |

---

## 📊 Documentation Statistics

- **Total Documents**: 13 active + 6 archived
- **Core Docs**: 9 files (README, guides, technical docs)
- **User Guides**: 1 comprehensive + 6 specialized
- **Developer Docs**: 3 (CLAUDE.md, ARCHITECTURE.md, ADDING-NEW-TOOLS.md)
- **Total Lines**: ~5,000+ lines of documentation

---

## 🔄 Maintenance

**Active Documents** (regularly updated):
- README.md
- CHANGELOG.md
- docs/USER-GUIDE.md
- docs/ADMIN-GUIDE.md
- docs/ARCHITECTURE.md
- CLAUDE.md

**Reviewed Quarterly**:
- All guides in `docs/guides/`
- SECURITY.md
- DEPLOYMENT.md

**Archive Policy**:
- Documents older than 6 months with historical-only value → `docs/archive/`
- Session summaries and fix logs → Keep for 3 months, then archive
- Deprecated guides → Mark with warning, archive after 1 version

---

## 📞 Getting Help

- **Questions about usage**: Read [USER-GUIDE.md](./docs/USER-GUIDE.md)
- **Installation issues**: See [ADMIN-GUIDE.md](./docs/ADMIN-GUIDE.md)
- **Development questions**: Check [CLAUDE.md](./CLAUDE.md)
- **Bug reports**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Security concerns**: Review [SECURITY.md](./SECURITY.md)

---

**Maintained by**: Bounteous Team
**Last Review**: February 13, 2026
**Next Review**: March 2026
