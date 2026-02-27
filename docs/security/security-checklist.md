# Security Checklist

Complete security checklist for Open Agent Builder deployment.

## Pre-Deployment Checklist

### Environment Variables

- [ ] `ENCRYPTION_KEY` - Generate 32-byte random key
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```
- [ ] `AUTH_MICROSOFT_SECRET` - Never commit to Git
- [ ] `AUTH_SECRET` - NextAuth.js session encryption key
- [ ] `FIRECRAWL_API_KEY` - Kept secure
- [ ] All API keys rotated from default values

### Authentication

- [ ] Azure AD app registration configured correctly
- [ ] `AUTH_MICROSOFT_ID` matches your Azure app registration client ID
- [ ] API key authentication working
- [ ] Rate limiting enabled

### Authorization

- [ ] All Convex functions check `getUserId()`
- [ ] Workflows owned by users (userId check)
- [ ] API keys scoped to users
- [ ] No public write access

### Encryption

- [ ] User LLM keys encrypted (AES-256-GCM)
- [ ] User tool keys encrypted
- [ ] Encryption key not committed to repo
- [ ] Backup encryption key stored securely

### Code Execution

- [ ] Transform nodes use E2B sandbox (required)
- [ ] E2B API key configured
- [ ] No direct `eval()` calls
- [ ] Safe expression evaluator for if-else nodes

### SSRF Protection

- [ ] HTTP node validates URLs
- [ ] Domain whitelist configured (optional)
- [ ] No localhost/private IP access
- [ ] URL validation in place

### Rate Limiting

- [ ] Distributed rate limiter deployed
- [ ] Convex rateLimits table created
- [ ] Rate limits configured per endpoint
- [ ] 429 responses working

### Secrets Management

- [ ] All secrets in environment variables
- [ ] `.env.local` in `.gitignore`
- [ ] No secrets in code or logs
- [ ] Secrets rotated regularly

## Runtime Monitoring

### Logging

- [ ] Error logging configured
- [ ] No sensitive data in logs
- [ ] Log aggregation set up
- [ ] Alerts for errors configured

### Monitoring

- [ ] LangSmith tracing enabled (optional)
- [ ] Convex dashboard monitoring
- [ ] API performance monitoring
- [ ] Rate limit monitoring

## Incident Response

### Compromised API Key

1. **Immediately revoke** key in provider dashboard
2. **Generate new key** and update `.env.local`
3. **Deploy** changes
4. **Audit** recent usage for anomalies

### Data Breach

1. **Identify** affected users
2. **Notify** users per GDPR/regulations
3. **Rotate** all encryption keys
4. **Audit** access logs
5. **Patch** vulnerability

## Security Features Verification

Run security verification script:

```bash
node scripts/verify-security-setup.js
```

Expected output:
```
✅ AES-256-GCM Encryption
✅ E2B Sandbox for Code Execution
✅ SSRF Protection
✅ Distributed Rate Limiting
✅ Authorization Checks
✅ Safe Expression Evaluation
✅ Prototype Pollution Protection
✅ Secure Random Generation
```

## Related Documentation

- [SECURITY.md](./README.md) - Security overview
- [verification-report.md](./verification-report.md) - Detailed verification
