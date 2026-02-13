# Open Agent Builder - System Administration Guide

**Version 1.0** | Last Updated: December 2024

---

## Table of Contents

1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Initial Setup](#initial-setup)
4. [Azure AD Configuration](#azure-ad-configuration)
5. [Convex Backend Setup](#convex-backend-setup)
6. [Environment Configuration](#environment-configuration)
7. [API Key Management](#api-key-management)
8. [Deployment](#deployment)
9. [Monitoring & Logging](#monitoring--logging)
10. [Backup & Recovery](#backup--recovery)
11. [Security Best Practices](#security-best-practices)
12. [Troubleshooting](#troubleshooting)
13. [Migrating Workflows Between Environments](#migrating-workflows-between-environments)
14. [Maintenance Tasks](#maintenance-tasks)
15. [Performance Tuning](#performance-tuning)

---

## Overview

This guide provides comprehensive instructions for system administrators to install, configure, deploy, and maintain Open Agent Builder. It covers both development and production environments.

### Administrator Responsibilities

- **Installation**: Set up development and production environments
- **Configuration**: Configure authentication, database, and external services
- **Security**: Manage API keys, user access, and security policies
- **Monitoring**: Track system health, performance, and errors
- **Maintenance**: Perform updates, backups, and troubleshooting
- **Support**: Assist end users with access and configuration issues

---

## System Requirements

### Development Environment

**Hardware**:
- CPU: 2+ cores recommended
- RAM: 8GB minimum, 16GB recommended
- Disk: 10GB free space
- Network: Broadband internet connection

**Software**:
- **Node.js**: 18.x or later (20.x recommended)
- **npm**: 9.x or later
- **Git**: Latest version
- **Code Editor**: VS Code recommended
- **Browser**: Chrome, Firefox, or Edge (latest version)

### Production Environment

**Hosting Platform**:
- **Vercel**: Recommended for Next.js deployment
- **AWS/Azure/GCP**: Alternative with containerization

**Services**:
- **Convex**: Managed backend and database
- **Azure AD**: Authentication provider
- **LLM APIs**: Anthropic, OpenAI, Google, Groq (optional)
- **Tool APIs**: Firecrawl, Tavily, E2B (optional)

---

## Initial Setup

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/your-org/open-agent-builder.git
cd open-agent-builder

# Install dependencies
npm install
```

### 2. Install Convex CLI

```bash
# Install Convex globally
npm install -g convex

# Verify installation
convex --version
```

### 3. Create Convex Project

```bash
# Login to Convex
convex login

# Create new project (if not exists)
convex init

# This creates:
# - convex/ directory with backend code
# - .convex/ directory (git-ignored)
```

**Important**: Choose a team and project name during init.

### 4. Set Up Development Environment

```bash
# Start Convex development server
npx convex dev

# In another terminal, start Next.js
npm run dev

# Or start both together
npm run dev:all
```

**Verification**:
- Convex dashboard: https://dashboard.convex.dev
- Next.js app: http://localhost:3000
- Check console for errors

---

## Azure AD Configuration

### 1. Register Application in Azure Portal

1. **Go to Azure Portal**: https://portal.azure.com
2. **Navigate to**: Azure Active Directory → App registrations
3. **Click**: "New registration"
4. **Configure**:
   - **Name**: Open Agent Builder
   - **Supported account types**: Single tenant (your organization)
   - **Redirect URI**: Web → `http://localhost:3000/api/auth/callback/azure-ad`
5. **Click**: Register

### 2. Configure Application

**Certificates & Secrets**:
1. Go to "Certificates & secrets"
2. Click "New client secret"
3. **Description**: Open Agent Builder Secret
4. **Expires**: 24 months (or as per policy)
5. Click "Add"
6. **Copy the secret value** immediately (shown only once)

**API Permissions** (Optional):
1. Go to "API permissions"
2. Click "Add a permission"
3. Select "Microsoft Graph"
4. Choose "Delegated permissions"
5. Add: `User.Read`, `profile`, `email`, `openid`
6. Click "Add permissions"
7. (Optional) Click "Grant admin consent"

**Authentication**:
1. Go to "Authentication"
2. Under "Implicit grant and hybrid flows":
   - ✅ ID tokens
3. Under "Redirect URIs":
   - Development: `http://localhost:3000/api/auth/callback/azure-ad`
   - Production: `https://your-domain.com/api/auth/callback/azure-ad`
4. Click "Save"

### 3. Collect Configuration Values

From the Azure AD app overview page, note down:

- **Application (client) ID**: `ae523d36-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Directory (tenant) ID**: `9d343c00-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Client secret**: `CbJ8Q~Ko2_HEoq3Y4Ndm0jHXr6HRAq...` (from previous step)

### 4. JWT Issuer Domain

The JWT issuer domain format is:
```
https://<tenant-name>.b2clogin.com/<tenant-id>/v2.0

OR (for work accounts):

https://login.microsoftonline.com/<tenant-id>/v2.0
```

To find your tenant name:
1. Go to Azure AD overview
2. Look for "Primary domain" (e.g., `yourcompany.onmicrosoft.com`)
3. Issuer: `https://login.microsoftonline.com/<tenant-id>/v2.0`

---

## Convex Backend Setup

### 1. Initialize Convex Deployment

```bash
# Development deployment
npx convex dev

# This creates a development deployment (e.g., dev:disciplined-quail-9)
```

### 2. Create Production Deployment

```bash
# Deploy to production
npx convex deploy --prod

# This creates a production deployment (e.g., prod:sensible-ermine-579)
```

### 3. Configure Convex Authentication

Update `convex/auth.config.ts`:

```typescript
export default {
  providers: [
    {
      domain: "https://login.microsoftonline.com/<your-tenant-id>/v2.0",
      applicationID: "convex",
    },
  ],
};
```

**Deploy the configuration**:
```bash
# Development
npx convex dev

# Production
npx convex deploy --prod
```

### 4. Set Convex Environment Variables

**Development**:
```bash
# Required: Encryption key for user API keys
npx convex env set ENCRYPTION_KEY "<32-byte-base64-key>"

# Required: JWT issuer domain
npx convex env set CLERK_JWT_ISSUER_DOMAIN "https://login.microsoftonline.com/<tenant-id>/v2.0"
```

**Production**:
```bash
npx convex env set --prod ENCRYPTION_KEY "<32-byte-base64-key>"
npx convex env set --prod CLERK_JWT_ISSUER_DOMAIN "https://login.microsoftonline.com/<tenant-id>/v2.0"
```

**Generate Encryption Key**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Important**: Use different encryption keys for dev and prod!

---

## Environment Configuration

### 1. Create `.env.local` File

```bash
# Copy template
cp .env.local.example .env.local

# Or create manually
touch .env.local
```

### 2. Configure Development Environment

Edit `.env.local`:

```bash
# ============================================
# Convex Database Connection (REQUIRED)
# ============================================
# Development deployment
CONVEX_DEPLOYMENT=dev:your-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-id.convex.cloud
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://your-deployment-id.convex.site/http/uploadFile

# ============================================
# Azure Authentication (REQUIRED)
# ============================================
NEXTAUTH_URL=http://localhost:3000
AUTH_MICROSOFT_ID=ae523d36-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AUTH_MICROSOFT_SECRET=CbJ8Q~Ko2_HEoq3Y4Ndm0jHXr6HRAq...
AUTH_MICROSOFT_TENANT_ID=9d343c00-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AUTH_SECRET=<generate-with-openssl>

# ============================================
# LangSmith Tracing (Optional)
# ============================================
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_xxxxxxxxxxxxxxxxxxxx
LANGCHAIN_PROJECT=open-agent-builder
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
```

**Generate AUTH_SECRET**:
```bash
openssl rand -base64 32
```

### 3. Configure Production Environment

For Vercel deployment, set environment variables in the Vercel dashboard:

**Required Variables**:
- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL`
- `NEXTAUTH_URL` (your production domain)
- `AUTH_MICROSOFT_ID`
- `AUTH_MICROSOFT_SECRET`
- `AUTH_MICROSOFT_TENANT_ID`
- `AUTH_SECRET`

**Optional Variables**:
- `LANGCHAIN_TRACING_V2`
- `LANGCHAIN_API_KEY`
- `LANGCHAIN_PROJECT`
- `LANGCHAIN_ENDPOINT`

---

## API Key Management

### Two-Tier API Key System

Open Agent Builder uses a two-tier API key system that provides convenience for end users while offering flexibility for power users:

1. **Tier 1: System Keys** (Convex environment) - Administrator configures once, available to ALL users automatically
2. **Tier 2: User Keys** (Convex database) - Optional user-provided keys that override system defaults

**Key Benefit**: End users can start using the application immediately without procuring any API keys. The administrator configures system-level keys once, and all users benefit.

### 1. System-Level API Keys (Required Administrator Setup)

**These keys enable ALL users to use the application without individual setup.**

Store in Convex environment:

**Development**:
```bash
# LLM Providers (REQUIRED - at least one)
npx convex env set ANTHROPIC_API_KEY "sk-ant-api03-xxx"
npx convex env set OPENAI_API_KEY "sk-xxx"
npx convex env set GROQ_API_KEY "gsk_xxx"
npx convex env set GOOGLE_API_KEY "AIzaSyxxx"

# Tools & Services (REQUIRED for corresponding workflows)
npx convex env set FIRECRAWL_API_KEY "fc-xxx"      # Web scraping
npx convex env set E2B_API_KEY "e2b_xxx"           # Code execution (Transform nodes)
npx convex env set TAVILY_API_KEY "tvly-xxx"       # Web search
npx convex env set ARCADE_API_KEY "arcade_xxx"     # Browser automation
npx convex env set GAMMA_API_KEY "sk-gamma_xxx"    # Presentation generation
```

**Production**:
```bash
# Add --prod flag for production
npx convex env set --prod ANTHROPIC_API_KEY "sk-ant-api03-xxx"
npx convex env set --prod OPENAI_API_KEY "sk-xxx"
# ... etc
```

**View Current Keys**:
```bash
# Development
npx convex env list

# Production
npx convex env list --prod
```

**Delete Keys**:
```bash
# Development
npx convex env unset KEY_NAME

# Production
npx convex env unset --prod KEY_NAME
```

### 2. User-Specific API Keys (Optional User Override)

**Important**: User keys are **completely optional**. Users can use the application indefinitely with system keys alone.

**When users might add their own keys:**
- Want to use their own API quotas instead of shared system quotas
- Need to use a specific account or organization
- Want to track their individual API usage
- Testing or development purposes

**How it works:**
- Users navigate to Settings → API Keys in the application
- Add their own keys for specific providers
- These keys are stored encrypted in Convex database (`userLLMKeys` table) with AES-256-GCM encryption
- User keys take precedence over system keys when provided
- User-scoped (only accessible to the owner)

**As an admin, you cannot directly access user keys** (they're encrypted). Users manage their own keys through the UI.

**User Experience**: The Settings page clearly indicates that adding keys is optional, and the system keys are available as fallback.

### 3. API Key Security Best Practices

**DO**:
- ✅ Store all system keys in Convex environment variables
- ✅ Use different keys for development and production
- ✅ Rotate keys periodically (every 90 days recommended)
- ✅ Use API key restrictions when available (IP whitelist, referrer restrictions)
- ✅ Monitor API usage for anomalies
- ✅ Document which services have keys configured

**DON'T**:
- ❌ Never commit API keys to Git (.env.local is git-ignored)
- ❌ Never share keys in chat, email, or tickets
- ❌ Never use production keys in development
- ❌ Never store keys in code files
- ❌ Never grant keys to untrusted users

### 4. Obtaining API Keys

**Anthropic (Claude)**:
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Navigate to "API Keys"
4. Create new key
5. Copy key (starts with `sk-ant-`)
**Available Models**: Haiku 4.5, Sonnet 4.5, Opus 4.6 (1M context)

**OpenAI**:
1. Go to https://platform.openai.com
2. Sign up or log in
3. Navigate to "API Keys"
4. Create new secret key
5. Copy key (starts with `sk-`)
**Available Models**: GPT-5.2, GPT-4.5, o3 (advanced reasoning)

**Groq (Fast Inference)**:
1. Go to https://console.groq.com
2. Sign up or log in
3. Navigate to "API Keys"
4. Create new key
5. Copy key (starts with `gsk_`)
**Available Models**: Llama 4 Maverick, Llama 4 Scout, Llama 3.3 70B, Llama 3.1 8B

**Google (Gemini)**:
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Create API key
4. Copy key (starts with `AIzaSy`)
**Available Models**: Gemini 3 Pro Preview, Gemini 3 Flash, Gemini 2.5 Pro/Flash

**Firecrawl (Web Scraping)**:
1. Go to https://firecrawl.dev
2. Sign up for account
3. Navigate to dashboard
4. Copy API key (starts with `fc-`)

**Tavily (Web Search)**:
1. Go to https://tavily.com
2. Sign up for account
3. Get API key from dashboard
4. Copy key (starts with `tvly-`)

**E2B (Code Interpreter)**:
1. Go to https://e2b.dev
2. Sign up for account
3. Navigate to API keys
4. Create new key
5. Copy key (starts with `e2b_`)

---

## Deployment

### Development Deployment

```bash
# Terminal 1: Start Convex dev server
npx convex dev

# Terminal 2: Start Next.js dev server
npm run dev

# Or combined (recommended)
npm run dev:all
```

**Access**:
- Application: http://localhost:3000
- Convex Dashboard: https://dashboard.convex.dev

### Production Deployment (Vercel)

#### Option 1: GitHub Integration (Recommended)

**Initial Setup**:
1. **Push code to GitHub**:
   ```bash
   git remote add origin https://github.com/your-org/open-agent-builder.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure project settings
   - Add environment variables (see section 3)
   - Deploy

3. **Set Environment Variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add all required variables from [Environment Configuration](#environment-configuration)
   - Redeploy if needed

4. **Configure Custom Domain** (optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed
   - Update `NEXTAUTH_URL` to your domain

**Automatic Deployments**:
- Every push to `main` branch triggers production deployment
- Pull requests create preview deployments
- View deployments at https://vercel.com/your-org/open-agent-builder

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts to configure project
```

### Production Convex Setup

```bash
# Deploy Convex backend to production
npx convex deploy --prod

# Set production environment variables
npx convex env set --prod ENCRYPTION_KEY "<production-key>"
npx convex env set --prod CLERK_JWT_ISSUER_DOMAIN "https://login.microsoftonline.com/<tenant-id>/v2.0"

# Set production system API keys
npx convex env set --prod ANTHROPIC_API_KEY "sk-ant-xxx"
npx convex env set --prod OPENAI_API_KEY "sk-xxx"
# ... etc
```

### Post-Deployment Checklist

- [ ] Verify application loads at production URL
- [ ] Test Azure AD authentication flow
- [ ] Create a test workflow and execute it
- [ ] Verify LLM API calls work (check system keys)
- [ ] Test user API key addition (if users will provide keys)
- [ ] Check Convex dashboard for successful deployments
- [ ] Monitor error logs for first 24 hours
- [ ] Set up monitoring and alerting
- [ ] Document production URLs for team

---

## API Keys Quick Reference

**TL;DR:** Most API keys go in Convex, not `.env.local`

### Quick Commands

```bash
# Preview migration without making changes
npm run migrate:dry-run

# Migrate keys to Convex (development)
npm run migrate:dev

# Check what's in Convex
npm run convex:env

# Migrate to production
npm run migrate:prod

# Check production environment
npm run convex:env:prod
```

### Where Do Keys Go?

#### ✅ In Convex Environment (`npx convex env set`)

**Why:** Available to all users, works in production, secure

```bash
ENCRYPTION_KEY                 # 32-byte base64 key
ANTHROPIC_API_KEY              # sk-ant-...
OPENAI_API_KEY                 # sk-proj-...
GROQ_API_KEY                   # gsk_...
GOOGLE_API_KEY                 # AIzaSy...
FIRECRAWL_API_KEY              # fc-...
E2B_API_KEY                    # e2b_...
TAVILY_API_KEY                 # tvly-...
AUTH_MICROSOFT_ID              # Azure App ID
CONVEX_TEST_SECRET             # Test secret key
LANGCHAIN_API_KEY              # lsv2_pt_... (optional)
LANGCHAIN_TRACING_V2           # true (optional)
LANGCHAIN_PROJECT              # open-agent-builder (optional)
LANGCHAIN_ENDPOINT             # https://api.smith.langchain.com (optional)
```

#### ✅ In `.env.local`

**Why:** Next.js client needs these before Convex is available

```bash
# Convex connection
NEXT_PUBLIC_CONVEX_URL
CONVEX_DEPLOYMENT
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL

# Azure AD authentication
AUTH_MICROSOFT_ID
AUTH_MICROSOFT_SECRET
AUTH_MICROSOFT_TENANT_ID
AUTH_SECRET

# Optional: LangSmith (if you want Next.js-level tracing)
LANGCHAIN_TRACING_V2
LANGCHAIN_API_KEY
LANGCHAIN_PROJECT
LANGCHAIN_ENDPOINT
```

### Common Key Management Tasks

#### Set a Key in Convex

```bash
# Development
npx convex env set KEY_NAME "value"

# Production
npx convex env set --prod KEY_NAME "value"
```

#### Generate ENCRYPTION_KEY

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### List All Keys

```bash
# Development
npx convex env list

# Production
npx convex env list --prod
```

#### Remove a Key

```bash
npx convex env remove KEY_NAME
npx convex env remove --prod KEY_NAME
```

### Two-Tier System Explained

```
┌─────────────────────────────────────────┐
│         User Executes Workflow          │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│  Does user have their own API key?      │
│  (Check convex/userLLMKeys table)       │
└──────────────┬──────────┬───────────────┘
               │          │
          YES  │          │  NO
               ▼          ▼
        ┌──────────┐  ┌─────────────────┐
        │ Use User │  │ Use System Key  │
        │   Key    │  │ (process.env)   │
        └──────────┘  └─────────────────┘
                           ▲
                           │
                   From Convex Environment
```

### Architecture Benefits

| Aspect | .env.local | Convex Environment |
|--------|------------|-------------------|
| Production Ready | ❌ Not deployed | ✅ Always available |
| Team Sync | ❌ Manual copy | ✅ Automatic |
| Security | ⚠️ Can be committed | ✅ Server-side only |
| Per-Environment | ❌ Same for all | ✅ Dev vs. Prod |
| User Override | ❌ Not possible | ✅ Users can add own keys |

### API Keys Troubleshooting

**Keys not working after migration?**

1. Restart Convex: `npx convex dev`
2. Check keys are set: `npm run convex:env`
3. Remove old keys from `.env.local`
4. Clear browser cache

**Migration shows "Already set"?**

That's good! It means the key is already in Convex.

**Need to rollback?**

Keys are still in your `.env.local` until you remove them. Just keep using them if needed.

### For New Developers

When joining the project:

1. Clone repo
2. Copy `.env.local.example` → `.env.local`
3. Fill in Azure AD & Convex connection details
4. **Don't add API keys** - they're already in Convex!
5. Run `npm run dev:all`

### Security Checklist

- [ ] ENCRYPTION_KEY is 32 bytes
- [ ] Different keys for dev vs. prod
- [ ] `.env.local` in `.gitignore`
- [ ] Production keys set with `--prod` flag
- [ ] No API keys hardcoded in source
- [ ] Users can add their own keys via Settings UI

---

## Monitoring & Logging

### Convex Dashboard

**Access**: https://dashboard.convex.dev

**Monitor**:
- **Functions**: Query/mutation execution counts and latency
- **Tables**: Record counts and storage size
- **Logs**: Real-time server logs
- **Errors**: Failed function calls with stack traces

**Set Up Alerts**:
1. Go to project settings
2. Configure notifications
3. Add webhook for critical errors
4. Set up email alerts

### LangSmith Monitoring (Optional)

**Setup**:
1. Sign up at https://smith.langchain.com
2. Get API key from dashboard
3. Set environment variables:
   ```bash
   npx convex env set LANGCHAIN_TRACING_V2 "true"
   npx convex env set LANGCHAIN_API_KEY "lsv2_pt_xxx"
   npx convex env set LANGCHAIN_PROJECT "open-agent-builder-prod"
   ```
4. Redeploy application

**What You'll See**:
- Full workflow execution traces
- LLM prompts and responses
- Token usage per execution
- Execution timing breakdown
- Error traces with context

### Application Logs

**Development**:
- Console logs in browser DevTools (F12)
- Server logs in terminal running `npm run dev`
- Convex logs in terminal running `npx convex dev`

**Production**:
- Vercel logs: Project → Deployments → Select deployment → Logs
- Convex logs: Dashboard → Logs tab
- Real-time log streaming: `vercel logs --follow`

### Key Metrics to Monitor

**Performance**:
- Workflow execution time (should be < 30s for simple workflows)
- Node execution time (should be < 10s per node)
- API response time (should be < 1s)
- Database query time (should be < 100ms)

**Usage**:
- Daily active users
- Workflows created per day
- Executions per day
- LLM token usage (cost tracking)
- Storage usage in Convex

**Errors**:
- Error rate (should be < 1%)
- Failed executions
- Authentication failures
- API timeouts
- Database errors

**Alerts to Set Up**:
- Error rate > 5% in 5 minutes
- API response time > 5s
- Failed deployments
- Database storage > 80% capacity
- Unusual token usage (potential abuse)

---

## Backup & Recovery

### Convex Backup

**Automatic Backups**:
- Convex automatically backs up all data
- Point-in-time recovery available
- No manual backup needed for data

**Manual Export** (for compliance/auditing):
```bash
# Export workflows
npx convex export workflows > workflows_backup.json

# Export all tables
npx convex export > full_backup.json
```

### Code Backup

**Git Repository**:
- All code is version controlled in Git
- Push to GitHub regularly
- Tag releases: `git tag v1.0.0 && git push --tags`

**Configuration Backup**:
```bash
# Document Convex environment variables
npx convex env list > convex_env_dev.txt
npx convex env list --prod > convex_env_prod.txt

# Store securely (not in Git!)
```

### Disaster Recovery Plan

**Scenario 1: Vercel Deployment Failure**
1. Check Vercel deployment logs
2. Identify failed step
3. Rollback to previous deployment: Vercel Dashboard → Deployments → Select previous → Promote to Production
4. Fix issue in code
5. Redeploy

**Scenario 2: Convex Backend Issue**
1. Check Convex dashboard logs
2. Identify error in functions
3. Roll back Convex deployment:
   ```bash
   npx convex deploy --prod --from <previous-version>
   ```
4. Fix issue in code
5. Redeploy

**Scenario 3: Database Corruption**
1. Contact Convex support immediately
2. Request point-in-time recovery
3. Verify data integrity after recovery
4. Identify root cause

**Scenario 4: Complete Rebuild**
1. Clone repository from GitHub
2. Install dependencies: `npm install`
3. Restore Convex environment variables
4. Deploy Convex: `npx convex deploy --prod`
5. Deploy Vercel: `vercel --prod`
6. Test thoroughly

**Recovery Time Objectives (RTO)**:
- Vercel deployment issue: < 30 minutes
- Convex backend issue: < 1 hour
- Complete rebuild: < 4 hours

**Recovery Point Objectives (RPO)**:
- Data loss: 0 (Convex continuous backup)
- Code loss: Last commit (Git)

---

## Security Best Practices

### Access Control

**Principle of Least Privilege**:
- Grant minimum necessary permissions
- Separate dev and prod access
- Regular access reviews

**Azure AD**:
- Enable MFA for all users
- Use Conditional Access policies
- Monitor sign-in logs

**Convex**:
- Separate dev and prod deployments
- Limit production access to admins only
- Use API keys for programmatic access

### Network Security

**HTTPS Only**:
- Enforce HTTPS in production (Vercel default)
- Set up HSTS headers
- Use secure cookies

**CORS Configuration**:
- Whitelist specific origins only
- No wildcard origins in production
- Review CORS policy regularly

### Data Protection

**Encryption**:
- User API keys encrypted at rest (AES-256-GCM)
- Session data encrypted in transit (HTTPS)
- Database connections encrypted (Convex default)

**Data Retention**:
- Define retention policy for executions
- Regularly clean up old data
- Comply with GDPR/privacy regulations

### Vulnerability Management

**Regular Updates**:
```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

**Security Scanning**:
- Enable Dependabot on GitHub
- Review security advisories
- Apply patches promptly

### Incident Response

**Security Incident Procedure**:
1. **Detect**: Monitor logs for suspicious activity
2. **Contain**: Revoke compromised keys immediately
3. **Investigate**: Identify scope of breach
4. **Remediate**: Fix vulnerability
5. **Notify**: Inform affected users if needed
6. **Document**: Record incident and response

**Emergency Contacts**:
- Convex support: support@convex.dev
- Vercel support: https://vercel.com/support
- Azure support: https://azure.microsoft.com/support

---

## Troubleshooting

### Common Issues

#### 1. Authentication Not Working

**Symptoms**:
- Users can't sign in
- Redirect loop after login
- 401 Unauthorized errors

**Diagnosis**:
```bash
# Check Azure AD configuration
# Verify redirect URI matches exactly

# Check environment variables
cat .env.local | grep AUTH_

# Check Convex auth config
cat convex/auth.config.ts
```

**Solutions**:
- Verify `AUTH_MICROSOFT_ID`, `AUTH_MICROSOFT_SECRET`, `AUTH_MICROSOFT_TENANT_ID` are correct
- Check Azure AD redirect URI matches your domain exactly
- Ensure `CLERK_JWT_ISSUER_DOMAIN` is set in both `.env.local` AND Convex environment
- Clear browser cookies and try again
- Check middleware.ts for route protection issues

#### 2. Workflows Not Saving

**Symptoms**:
- Changes don't persist after page refresh
- No error messages
- Console shows 401 or 500 errors

**Diagnosis**:
```bash
# Check browser console (F12)
# Look for API errors

# Check server logs
npm run dev:all
# Watch for POST /api/workflows logs

# Check Convex dashboard
# Verify workflows table has records
```

**Solutions**:
- Verify user is authenticated (check session cookie)
- Ensure `/api/workflows` is in public routes in middleware.ts
- Check Convex deployment is running: `npx convex dev`
- Verify network connectivity to Convex
- Check for Convex function errors in dashboard

#### 3. Workflow Execution Fails

**Symptoms**:
- Workflow doesn't start
- Nodes fail with errors
- "API key not found" errors

**Diagnosis**:
```bash
# Check Convex environment variables
npx convex env list

# Check user's API keys (if they added their own)
# View in Convex dashboard → Data → userLLMKeys table

# Check execution logs in Convex dashboard
```

**Solutions**:
- Verify system API keys are set in Convex environment
- Ensure API keys are valid and not expired
- Check API rate limits (may be exceeded)
- Verify network access to LLM APIs
- Check for syntax errors in node configurations

#### 4. MCP Tools Not Working

**Symptoms**:
- MCP nodes fail to execute
- "Tool not found" errors
- Connection timeouts

**Diagnosis**:
```bash
# Check MCP server configuration
# Convex Dashboard → Data → mcpServers table

# Test MCP server connection
# POST /api/mcp/[id]/tools

# Check logs for connection errors
```

**Solutions**:
- Verify MCP server URL is correct
- Check MCP server is running and accessible
- Verify API keys for MCP services (Firecrawl, etc.)
- Check network firewall rules
- Test MCP server independently

#### 5. Performance Issues

**Symptoms**:
- Slow workflow execution
- Timeouts
- High latency

**Diagnosis**:
```bash
# Check LangSmith traces (if enabled)
# Identify slow nodes

# Check Convex dashboard
# Look for slow queries

# Check Vercel analytics
# Identify slow API routes
```

**Solutions**:
- Optimize node configurations (reduce token limits)
- Use faster models (Haiku instead of Opus)
- Add caching where appropriate
- Scale Convex plan if needed
- Review and optimize complex logic

### Debug Mode

**Enable Verbose Logging**:

In `lib/workflow/langgraph.ts`, set:
```typescript
const DEBUG = true; // Change from false to true
```

Restart the development server to see detailed execution logs.

### Getting Help

**Convex Support**:
- Docs: https://docs.convex.dev
- Discord: https://convex.dev/community
- Email: support@convex.dev

**Vercel Support**:
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Community**:
- GitHub Issues: https://github.com/your-org/open-agent-builder/issues
- Internal chat/Slack channel

---

## Migrating Workflows Between Environments

Moving workflows from development to production is a common administrative task. Open Agent Builder provides multiple methods to safely migrate workflows.

### Method 1: Automated Migration Script (Recommended)

The fastest way to migrate workflows is using the built-in migration script.

**Step 1: Preview Migration (Dry Run)**
```bash
node scripts/migrate-workflows-to-prod.js --dry-run
```

This will show you:
- ✅ Which workflows will be migrated
- ⚠️ Which workflows already exist in production (will be skipped)
- 📊 Total count and summary

**Step 2: Run Migration**
```bash
# Migrate all workflows
node scripts/migrate-workflows-to-prod.js

# OR migrate a specific workflow
node scripts/migrate-workflows-to-prod.js --workflow-id=your-workflow-id
```

**What the script does:**
- Connects to both dev and prod Convex instances
- Copies workflow definitions (nodes, edges, metadata)
- Skips workflows that already exist in production
- Preserves all configuration and settings
- Shows detailed progress and summary

### Method 2: Manual Export/Import via UI

For individual workflows or when you need more control:

**On Development Environment:**

1. **Configure `.env.local` for development**:
   ```bash
   CONVEX_DEPLOYMENT=dev:disciplined-quail-9
   NEXT_PUBLIC_CONVEX_URL=https://disciplined-quail-9.convex.cloud
   NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://disciplined-quail-9.convex.site/http/uploadFile
   ```

2. **Restart server**: `npm run dev`

3. **Export workflows**:
   - Navigate to http://localhost:3000/?view=workflows
   - Click on "Import from Markdown" button area
   - Look for export option or download workflow as `.md` file
   - Save the file (e.g., `my-workflow.md`)

**On Production Environment:**

1. **Configure `.env.local` for production**:
   ```bash
   CONVEX_DEPLOYMENT=prod:sensible-ermine-579
   NEXT_PUBLIC_CONVEX_URL=https://sensible-ermine-579.convex.cloud
   NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://sensible-ermine-579.convex.site/http/uploadFile
   ```

2. **Restart server**: `npm run dev`

3. **Import workflow**:
   - Navigate to http://localhost:3000/?view=workflows
   - Click "Import from Markdown" button
   - Upload the `.md` file you exported
   - Workflow will be created in production

### Method 3: API-Based Migration

For automation or CI/CD pipelines:

**Export from Development:**
```bash
# Make sure .env.local points to development
curl http://localhost:3000/api/workflows/{workflowId}/export-markdown \
  -o workflow.md
```

**Import to Production:**
```bash
# Switch .env.local to production and restart server
curl -X POST http://localhost:3000/api/workflows/import-markdown \
  -F "file=@workflow.md"
```

### Method 4: Direct Convex Database Operations

For advanced users who need fine-grained control:

```bash
# Export from development
npx convex export --table workflows --format json > workflows_dev.json

# Review and edit workflows_dev.json if needed
# Remove _id and _creationTime fields for new imports

# Import to production
npx convex import --prod workflows_dev.json
```

### Best Practices for Migration

1. **Always test in development first**
   - Create and test workflows in dev
   - Verify all nodes execute correctly
   - Check that all tools and API keys are available

2. **Use dry-run before production migration**
   - Preview what will change
   - Verify workflow names and IDs
   - Check for potential conflicts

3. **Version control your workflows**
   - Export workflows as `.md` files
   - Commit to git repository
   - Track changes over time

4. **Verify after migration**
   - Test workflows in production environment
   - Confirm all nodes and connections are intact
   - Run execution tests with sample data

5. **Document custom workflows**
   - Add descriptions to workflows
   - Document input requirements
   - Note any environment-specific configurations

### Troubleshooting Migration Issues

**Issue: "Workflow already exists"**
- Solution: The workflow ID already exists in production. Either delete the existing workflow or use a different ID.

**Issue: "Missing tools or MCP servers"**
- Solution: Ensure all tools and MCP servers used in the workflow are configured in production environment.

**Issue: "API keys not working"**
- Solution: Verify that production environment has the necessary API keys set in Convex:
  ```bash
  npx convex env list --prod
  npx convex env set TOOL_API_KEY "value" --prod
  ```

**Issue: "Migration script connection errors"**
- Solution: Check your internet connection and verify Convex deployment URLs are correct in the script.

### Rollback Procedures

If you need to rollback a migration:

1. **Identify the problematic workflow**
2. **Delete from production**:
   - Use Convex dashboard → workflows table → delete record
   - Or use API to delete the workflow
3. **Re-import previous version**:
   - Use the backed-up `.md` file
   - Import via UI or API

---

## Maintenance Tasks

### Daily

- [ ] Check error logs in Convex dashboard
- [ ] Monitor workflow execution success rate
- [ ] Review LangSmith traces (if enabled)

### Weekly

- [ ] Review user-reported issues
- [ ] Check API key usage and costs
- [ ] Verify backup integrity
- [ ] Update documentation if needed

### Monthly

- [ ] Update dependencies: `npm update`
- [ ] Security audit: `npm audit`
- [ ] Review and optimize database queries
- [ ] Clean up old execution records
- [ ] Review access logs and permissions
- [ ] Test disaster recovery procedures

### Quarterly

- [ ] Rotate API keys
- [ ] Review and update security policies
- [ ] Performance testing and optimization
- [ ] User access review
- [ ] Update system documentation
- [ ] Plan for major version upgrades

### Annually

- [ ] Comprehensive security audit
- [ ] Disaster recovery drill
- [ ] Capacity planning review
- [ ] Technology stack review
- [ ] Compliance audit (if required)

---

## Performance Tuning

### Database Optimization

**Index Optimization**:
- Convex automatically indexes tables
- Monitor slow queries in dashboard
- Add custom indexes if needed

**Data Cleanup**:
```typescript
// In Convex functions, clean up old executions
// Example: Delete executions older than 30 days
const oldExecutions = await ctx.db
  .query("executions")
  .filter((q) => q.lt(q.field("createdAt"), Date.now() - 30 * 24 * 60 * 60 * 1000))
  .collect();

for (const execution of oldExecutions) {
  await ctx.db.delete(execution._id);
}
```

### API Route Optimization

**Caching**:
- Cache workflow templates in memory
- Cache MCP server configurations
- Use Redis for distributed caching (if needed)

**Response Streaming**:
- Use SSE for long-running executions
- Stream results as they become available
- Don't wait for entire workflow to complete

### Frontend Optimization

**Code Splitting**:
- Lazy load heavy components
- Use dynamic imports for workflow builder
- Split vendor bundles

**Asset Optimization**:
- Optimize images with Next.js Image
- Minimize JavaScript bundles
- Use CDN for static assets (Vercel default)

### LLM Optimization

**Model Selection**:
- Use Haiku for simple tasks (fast, cheap)
- Use Sonnet for balanced performance
- Use Opus only when necessary (slow, expensive)

**Token Limits**:
- Set appropriate token limits per node
- Reduce limits for structured extraction
- Monitor token usage and costs

**Prompt Optimization**:
- Keep instructions concise
- Use few-shot examples when helpful
- Avoid unnecessary context

---

## Appendix

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `CONVEX_DEPLOYMENT` | Yes | Convex deployment ID |
| `NEXT_PUBLIC_CONVEX_URL` | Yes | Convex backend URL |
| `NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL` | Yes | File upload endpoint |
| `NEXTAUTH_URL` | Yes | Application URL |
| `AUTH_MICROSOFT_ID` | Yes | Azure AD client ID |
| `AUTH_MICROSOFT_SECRET` | Yes | Azure AD client secret |
| `AUTH_MICROSOFT_TENANT_ID` | Yes | Azure AD tenant ID |
| `AUTH_SECRET` | Yes | NextAuth session secret |
| `LANGCHAIN_TRACING_V2` | No | Enable LangSmith tracing |
| `LANGCHAIN_API_KEY` | No | LangSmith API key |
| `LANGCHAIN_PROJECT` | No | LangSmith project name |
| `LANGCHAIN_ENDPOINT` | No | LangSmith API endpoint |

### Convex Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `ENCRYPTION_KEY` | Yes | 32-byte base64 key for encrypting user API keys |
| `CLERK_JWT_ISSUER_DOMAIN` | Yes | Azure AD JWT issuer URL |
| `ANTHROPIC_API_KEY` | No | System Anthropic API key (fallback) |
| `OPENAI_API_KEY` | No | System OpenAI API key (fallback) |
| `GROQ_API_KEY` | No | System Groq API key (fallback) |
| `GOOGLE_API_KEY` | No | System Google API key (fallback) |
| `FIRECRAWL_API_KEY` | No | System Firecrawl API key (fallback) |
| `E2B_API_KEY` | No | System E2B API key (fallback) |
| `TAVILY_API_KEY` | No | System Tavily API key (fallback) |
| `ARCADE_API_KEY` | No | System Arcade API key (fallback) |
| `LANGCHAIN_TRACING_V2` | No | Enable LangSmith in Convex actions |
| `LANGCHAIN_API_KEY` | No | LangSmith API key for backend |
| `LANGCHAIN_PROJECT` | No | LangSmith project name |

### Useful Commands Reference

```bash
# Development
npm run dev              # Start Next.js only
npx convex dev          # Start Convex only
npm run dev:all         # Start both

# Deployment
npx convex deploy --prod  # Deploy Convex to production
vercel --prod            # Deploy Next.js to Vercel

# Environment
npx convex env list           # List dev environment variables
npx convex env list --prod    # List prod environment variables
npx convex env set KEY value  # Set dev environment variable
npx convex env set --prod KEY value  # Set prod environment variable

# Maintenance
npm audit                # Security audit
npm update              # Update dependencies
npm test                # Run tests
npm run lint            # Lint code

# Debugging
npm run dev:all         # Watch logs
npx convex logs         # View Convex logs
vercel logs --follow    # View Vercel logs (production)
```

---

**For More Information**:
- [User Guide](./USER-GUIDE.md)
- [Architecture Documentation](./ARCHITECTURE.md)
- [GitHub Repository](https://github.com/your-org/open-agent-builder)
