# Deployment Guide

**Last Updated:** December 13, 2025

This guide covers deploying Open Agent Builder to production with Azure AD authentication and Convex backend.

---

## Overview

Open Agent Builder uses a two-tier architecture:
- **Frontend/API**: Next.js 16 deployed to Vercel (or any Node.js host)
- **Backend/Database**: Convex (serverless with built-in hosting)

---

## Prerequisites

Before deploying, ensure you have:

1. ✅ Completed local development setup
2. ✅ Azure AD app registration configured
3. ✅ Convex account with production deployment
4. ✅ All API keys ready (Anthropic, OpenAI, Firecrawl, etc.)
5. ✅ Domain name (optional, for production URLs)

---

## Step 1: Deploy Convex to Production

### 1.1 Deploy Convex Functions

```bash
# Deploy to production Convex deployment
npx convex deploy
```

This creates your production Convex deployment (e.g., `sensible-ermine-579`).

### 1.2 Set Production Environment Variables

**IMPORTANT:** All API keys must be stored in Convex environment, NOT in `.env.local`.

```bash
# Required: Encryption key for user API keys
npx convex env set ENCRYPTION_KEY "$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")" --prod

# Required: Azure AD configuration
npx convex env set AUTH_MICROSOFT_ID "your-azure-app-id" --prod
npx convex env set CONVEX_TEST_SECRET "$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")" --prod

# LLM Provider Keys (system fallback for all users)
npx convex env set ANTHROPIC_API_KEY "sk-ant-..." --prod
npx convex env set OPENAI_API_KEY "sk-..." --prod
npx convex env set GROQ_API_KEY "gsk_..." --prod
npx convex env set GOOGLE_API_KEY "AIzaSy..." --prod

# Tool & Service Keys
npx convex env set FIRECRAWL_API_KEY "fc-..." --prod
npx convex env set E2B_API_KEY "e2b_..." --prod
npx convex env set TAVILY_API_KEY "tvly-..." --prod

# Optional: LangSmith tracing
npx convex env set LANGCHAIN_TRACING_V2 "true" --prod
npx convex env set LANGCHAIN_API_KEY "lsv2_pt_..." --prod
npx convex env set LANGCHAIN_PROJECT "open-agent-builder-prod" --prod
npx convex env set LANGCHAIN_ENDPOINT "https://api.smith.langchain.com" --prod
```

### 1.3 Verify Production Environment

```bash
# List all production environment variables
npx convex env list --prod

# Open production dashboard
npx convex dashboard --prod
```

---

## Step 2: Configure Azure AD for Production

### 2.1 Update Redirect URIs

In your Azure AD app registration:

1. Go to **Authentication**
2. Add production redirect URI:
   ```
   https://your-domain.com/api/auth/callback/azure-ad
   ```
3. Save changes

### 2.2 Verify Application Settings

- ✅ Application (client) ID is correct
- ✅ Client secret is not expired
- ✅ Tenant ID is correct
- ✅ Both dev and prod redirect URIs are registered

---

## Step 3: Deploy to Vercel

### 3.1 Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select "Next.js" framework preset

### 3.2 Configure Environment Variables

In Vercel project settings, add these environment variables:

```bash
# Convex Production
CONVEX_DEPLOYMENT=prod:sensible-ermine-579
NEXT_PUBLIC_CONVEX_URL=https://sensible-ermine-579.convex.cloud
NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL=https://sensible-ermine-579.convex.site/http/uploadFile

# Azure Authentication (PRODUCTION KEYS)
AUTH_MICROSOFT_ID=your-azure-app-id
AUTH_MICROSOFT_SECRET=your-azure-client-secret
AUTH_MICROSOFT_TENANT_ID=your-azure-tenant-id
AUTH_SECRET=your-nextauth-secret-production

# Optional: LangSmith (if tracing from Next.js API routes)
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_...
LANGCHAIN_PROJECT=open-agent-builder-prod
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
```

### 3.3 Deploy

```bash
# Deploy from CLI
vercel --prod

# Or push to main branch for automatic deployment
git push origin main
```

---

## Step 4: Post-Deployment Verification

### 4.1 Test Authentication

1. Visit your production URL
2. Click "Sign In"
3. Authenticate with Azure AD
4. Verify you're redirected back to the app

### 4.2 Test Workflow Execution

1. Create a simple workflow
2. Execute it
3. Verify:
   - ✅ Real-time streaming works
   - ✅ API keys are retrieved from Convex
   - ✅ Results are saved to database

### 4.3 Monitor Logs

```bash
# Vercel logs
vercel logs --follow

# Convex logs
npx convex logs --prod
```

---

## Environment Management

### Switching Between Dev and Production

Use the environment-specific `.env.local` files:

```bash
# Development
cp .env.local.dev .env.local
npx convex dev

# Production (local testing)
cp .env.local.prod .env.local
npm run build
npm start
```

### Environment File Structure

```
.env.local.dev   → Development configuration
.env.local.prod  → Production configuration
.env.local       → Active configuration (git-ignored)
```

---

## Security Checklist

Before going live, verify:

- [ ] All API keys are in Convex environment (not in `.env.local`)
- [ ] `ENCRYPTION_KEY` is unique per environment
- [ ] `AUTH_SECRET` is securely generated for production
- [ ] Azure AD client secret is production-grade (not test)
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] SSL/HTTPS is enforced
- [ ] Environment variables are set in Vercel (not in code)

---

## Troubleshooting

### Issue: "Authentication failed"

**Solution:**
- Verify Azure AD redirect URI matches production URL exactly
- Check `AUTH_MICROSOFT_ID`, `AUTH_SECRET`, and `AUTH_MICROSOFT_TENANT_ID` are correct
- Ensure `AUTH_SECRET` is set in production environment

### Issue: "Cannot decrypt user keys"

**Solution:**
- Verify `ENCRYPTION_KEY` is set in Convex production environment
- Check that the key hasn't changed (would invalidate existing encrypted data)

### Issue: "API key not found"

**Solution:**
- Verify system API keys are set in Convex: `npx convex env list --prod`
- Check that `systemApiKeys.ts` action is deployed to production

### Issue: "Convex connection failed"

**Solution:**
- Verify `NEXT_PUBLIC_CONVEX_URL` matches production deployment
- Check `CONVEX_DEPLOYMENT` is set to `prod:sensible-ermine-579`
- Ensure Convex functions are deployed: `npx convex deploy`

---

## Rollback Procedure

If you need to roll back:

### 1. Revert Next.js Deployment

```bash
# Vercel: redeploy previous version from dashboard
# Or: git revert and push
```

### 2. Revert Convex Functions

```bash
# Convex doesn't support rollback, but you can redeploy a previous version
git checkout <previous-commit>
npx convex deploy --prod
git checkout main
```

### 3. Restore Environment Variables

```bash
# If you backed up your env vars
npx convex env set KEY_NAME "previous-value" --prod
```

---

## Production URLs

After deployment, you'll have:

- **Application**: `https://your-domain.vercel.app`
- **Convex Dashboard**: `https://dashboard.convex.dev/t/your-team/your-project/sensible-ermine-579`
- **API Endpoint**: `https://your-domain.vercel.app/api/workflows`

---

## Monitoring & Maintenance

### Daily Monitoring

- Check Vercel deployment status
- Monitor Convex database usage
- Review error logs for issues

### Weekly Maintenance

- Review API key usage and costs
- Check for security updates
- Monitor user-reported issues

### Monthly Maintenance

- Rotate Azure AD client secrets (before expiry)
- Review and optimize Convex database queries
- Update dependencies (`npm audit fix`)

---

## Support

For deployment issues:

1. Check Convex logs: `npx convex logs --prod`
2. Check Vercel logs: `vercel logs`
3. Review this deployment guide
4. Open an issue on GitHub

---

## Additional Resources

- [Convex Deployment Docs](https://docs.convex.dev/production)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Azure AD App Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
- [NextAuth.js Production](https://next-auth.js.org/deployment)
