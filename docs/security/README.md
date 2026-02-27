# Security Documentation

**Last Updated:** February 27, 2026

This document outlines the security measures implemented in Open Agent Builder and guidelines for secure deployment.

---

## Security Improvements Implemented

### ✅ 1. Encryption & Key Management

#### User LLM API Keys
- **Implementation:** AES-256-GCM encryption with authenticated encryption
- **Location:** `convex/lib/encryption.ts`
- **Key Storage:** Environment variable `ENCRYPTION_KEY` (32-byte base64)
- **Features:**
  - Random IV per encryption
  - Authentication tags prevent tampering
  - Cryptographically secure random generation

**Action Required:**
```bash
# Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Add to .env.local
ENCRYPTION_KEY=<generated-key>
```

#### API Key Generation
- **Implementation:** `crypto.randomBytes()` with base64url encoding
- **Location:** `convex/lib/encryption.ts`
- **Hash Algorithm:** SHA-256 for API key verification
- **Features:**
  - Cryptographically secure random tokens
  - One-time display (never shown again)
  - Secure hashing for database storage

---

### ✅ 2. Code Injection Prevention

#### Transform Nodes (User Code Execution)
- **Status:** E2B sandbox REQUIRED
- **Location:** `lib/workflow/executors/data.ts`
- **Changes:**
  - Removed unsafe `Function()` constructor fallback
  - All user code runs in E2B cloud sandboxes
  - 5-minute execution timeout
  - Isolated environment per execution

**Action Required:**
```bash
# Get E2B API key from https://e2b.dev
E2B_API_KEY=<your-key>
```

**Error if not set:**
```
E2B_API_KEY is required for secure code execution.
Transform nodes execute user-provided code and must run in a secure sandbox.
```

#### If-Else & Set-State Expression Evaluation
- **Implementation:** Safe expression evaluator using `expr-eval`
- **Location:** `lib/workflow/safe-expression-evaluator.ts`
- **Features:**
  - No `eval()` or `Function()` constructor
  - Whitelisted operations only
  - No access to global objects or dangerous functions
  - Expression length limits (1000 chars)

**Allowed Operations:**
- Mathematical: `+, -, *, /, %, ^, abs, ceil, floor, round, sqrt, pow`
- Logical: `&&, ||, !, ==, ===, !=, !==, <, >, <=, >=`
- String: `toLowerCase, toUpperCase, trim, includes, startsWith, endsWith`
- Object access: `input.price, state.variables.node_1.data`

**Blocked:**
- `require()`, `import`, `eval()`, `Function()`
- `process`, `global`, `window`, `document`
- `setTimeout`, `setInterval`, `fetch`
- File system, child processes, network access

---

### ✅ 3. SSRF Protection (HTTP Nodes)

#### Implementation
- **Location:** `lib/workflow/ssrf-protection.ts`
- **Protection Against:**
  - Private IP addresses (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
  - Localhost (127.0.0.1, ::1)
  - Cloud metadata endpoints (169.254.169.254, metadata.google.internal)
  - Link-local addresses (169.254.0.0/16)
  - Dangerous ports (SSH, MySQL, Redis, etc.)

#### DNS Rebinding Protection
- URL validation before request
- DNS lookup to resolve hostname
- IP validation after resolution
- Blocks if hostname resolves to private IP

#### Optional Domain Whitelist
```bash
# .env.local
ALLOWED_HTTP_DOMAINS=api.example.com,*.trusted.com
```

If set, HTTP nodes can ONLY make requests to whitelisted domains.

---

### ✅ 4. Authorization Checks

#### Workflow Operations
- **Location:** `convex/workflows.ts`
- **Helper:** `checkWorkflowAccess(ctx, workflow)` — verifies caller is owner, assignee, or admin
- **Protected Operations:**
  - `getWorkflow`: Ownership check (owner, assignee, admin, or template)
  - `getWorkflowByCustomId`: Ownership check
  - `getWorkflowsByCategory`: Filtered by userId
  - `getWorkflowDetails`: Ownership check
  - `saveWorkflow`: Ownership verified on update
  - `deleteWorkflow`: Must own workflow or be admin
  - Public templates accessible to all authenticated users

#### Execution Operations
- **Location:** `convex/executions.ts`
- **Helper:** `checkExecutionAccess(ctx, execution)` — verifies caller owns execution or is admin
- **Protected Operations:**
  - `getExecution`: Returns null if user lacks access
  - `getWorkflowExecutions`: Filtered through ownership check
  - `createExecution`: Records userId for ownership tracking

#### API Route Authentication
- **Location:** `app/api/workflows/route.ts`, `app/api/workflows/[workflowId]/route.ts`
- **All CRUD endpoints require authentication** (GET, POST, DELETE)
- Uses `validateApiKey()` for dual session + API key auth

#### Mutations
All Convex mutations now verify:
1. User authentication (`ctx.auth.getUserIdentity()`)
2. Resource ownership (userId match via `checkWorkflowAccess` / `checkExecutionAccess`)
3. Prevent cross-user data access

---

### ✅ 5. Prototype Pollution Prevention

#### Variable Substitution
- **Location:** `lib/workflow/variable-substitution.ts`
- **Protection:**
  - Blocks `__proto__`, `constructor`, `prototype` access
  - Uses `Object.hasOwnProperty()` checks
  - Validates property names before access

**Blocked patterns:**
```javascript
{{__proto__.polluted}}
{{constructor.prototype.malicious}}
{{state.variables.__proto__.injected}}
```

---

### ✅ 6. Rate Limiting

#### Implementation
- **Location:** `src/lib/api/distributed-rate-limiter.ts`
- **Type:** Distributed via Convex (replaces in-memory rate limiting)
- **Cleanup:** Automatic expired entry removal every 5 minutes

#### Rate Limit Tiers

| Endpoint | Window | Max Requests | Identifier |
|----------|--------|--------------|------------|
| Workflow Execution | 1 minute | 10 | user:id or ip:address |
| Workflow CRUD | 1 minute | 60 | user:id |
| API Key Generation | 1 hour | 5 | user:id |
| General API | 1 minute | 100 | user:id or ip:address |
| Unauthenticated | 1 minute | 10 | ip:address |

#### Response Format (429 Too Many Requests)
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again in 45 seconds.",
  "retryAfter": 45
}
```

**Headers:**
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1700000000
Retry-After: 45
```

---

## Production Deployment Checklist

### 🔒 Critical Requirements

- [ ] Generate and set `ENCRYPTION_KEY` (32 bytes, base64)
- [ ] Set `E2B_API_KEY` for secure code execution
- [ ] Use proper secrets manager (AWS Secrets Manager, Vault, etc.)
- [ ] Enable HTTPS only (no HTTP)
- [ ] Configure CORS properly
- [ ] Set up Redis for rate limiting (multi-server)
- [ ] Enable audit logging
- [ ] Set up monitoring and alerts

### 🔐 Environment Variables

```bash
# Critical Security
ENCRYPTION_KEY=<32-byte-base64>
E2B_API_KEY=<e2b-key>

# Optional: HTTP Domain Whitelist
ALLOWED_HTTP_DOMAINS=api.example.com,*.trusted.com

# Database & Auth (required)
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
AUTH_MICROSOFT_ID=<azure-app-client-id>
AUTH_MICROSOFT_SECRET=<azure-app-client-secret>
AUTH_MICROSOFT_TENANT_ID=<azure-tenant-id>
AUTH_SECRET=<nextauth-secret>
```

### 🚨 Security Headers

Add these to your Next.js config:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};
```

### 📊 Monitoring

**Track these metrics:**
- Rate limit violations per user
- Failed authentication attempts
- SSRF protection blocks
- Prototype pollution attempts
- E2B sandbox failures
- Workflow execution times
- API error rates

**Set up alerts for:**
- Repeated rate limit violations (potential abuse)
- High error rates (potential attack)
- Unusual traffic patterns
- Failed authentication spikes

---

## Known Limitations

### 1. Distributed Rate Limiting
**Current:** Uses Convex-backed distributed rate limiting (works across serverless instances)
**Behavior:** Fail-closed for workflow execution endpoints (returns 503 on backend failure), fail-open for non-critical endpoints
**Location:** `src/lib/api/distributed-rate-limiter.ts`

### 2. Expression Evaluator Limitations
**Current:** `expr-eval` supports mathematical and logical operations
**Limitation:** No complex JavaScript (array methods, async/await)
**Workaround:** Use Transform nodes with E2B for complex operations

### 3. SSRF Protection Edge Cases
**IPv6:** Full IPv6 private range detection
**DNS Rebinding:** Time-of-check vs time-of-use gap
**Mitigation:** Use HTTP proxy service for production

---

## Security Incident Response

### If User API Keys Are Compromised

1. **Immediate Actions:**
   ```bash
   # Rotate ENCRYPTION_KEY
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

   # Update environment variable
   npx convex env set ENCRYPTION_KEY "<new-key>"
   ```

2. **Notify affected users** to regenerate their API keys

3. **Audit logs** to identify scope of compromise

4. **Re-encrypt all keys** with new encryption key (requires migration script)

### If Rate Limit Bypass Detected

1. **Identify attack pattern** (IP, user, API key)
2. **Block at proxy/firewall level** (Cloudflare, AWS WAF)
3. **Adjust rate limits** if legitimate traffic affected
4. **Review logs** for other suspicious activity

### If Code Injection Attempted

1. **Review logs** for patterns in transform node scripts
2. **Check E2B sandbox logs** for attempted breakouts
3. **Audit all workflows** created by suspicious users
4. **Consider temporary disable** of transform nodes if severe

---

## Vulnerability Reporting

If you discover a security vulnerability, please email:
**security@example.com** (replace with your security contact)

**Do NOT** open a public GitHub issue for security vulnerabilities.

**Expected response time:** 48 hours

---

## Security Audit History

| Date | Audit Type | Findings | Status |
|------|-----------|----------|--------|
| 2025-11-19 | Comprehensive Code Review | 34 issues (8 critical) | ✅ Fixed |
| 2025-11-19 | Encryption Implementation | Weak Caesar cipher | ✅ Replaced with AES-256-GCM |
| 2025-11-19 | Code Injection Review | Unsafe Function() use | ✅ Replaced with E2B sandbox |
| 2025-11-19 | SSRF Testing | No protection | ✅ Implemented validation |
| 2025-11-19 | Authorization Audit | Missing ownership checks | ✅ Added to all mutations |
| 2025-11-19 | Rate Limiting | No limits | ✅ Implemented for all routes |
| 2026-02-27 | Codex Security Review | P0-P3 findings | ✅ Fixed (ownership, auth, rate limiter, error sanitization) |

---

## Compliance Notes

### GDPR (EU)
- User API keys are encrypted at rest
- Users can delete their data (workflow deletion)
- Audit logs available (implement if needed)

### SOC 2
- Access controls on workflows (user ownership)
- Encryption in transit (HTTPS) and at rest (AES-256-GCM)
- Audit logging (implement CloudWatch/Datadog)
- Incident response procedures documented

### OWASP Top 10 Coverage

| Risk | Mitigation |
|------|------------|
| A01: Broken Access Control | ✅ User ownership checks on all mutations |
| A02: Cryptographic Failures | ✅ AES-256-GCM encryption, secure key generation |
| A03: Injection | ✅ E2B sandboxes, safe expression evaluator |
| A04: Insecure Design | ✅ SSRF protection, rate limiting |
| A05: Security Misconfiguration | ✅ Security headers, proper CORS |
| A06: Vulnerable Components | ⚠️ Run `npm audit` regularly |
| A07: Authentication Failures | ✅ Azure AD authentication, rate limiting |
| A08: Software and Data Integrity | ✅ Immutable state, validation |
| A09: Security Logging Failures | ⚠️ Implement structured logging |
| A10: Server-Side Request Forgery | ✅ SSRF protection in HTTP nodes |

---

## Development Best Practices

### Code Review Checklist
- [ ] No `eval()` or `Function()` constructor
- [ ] All user input validated and sanitized
- [ ] Authentication checks on protected routes
- [ ] Rate limiting on API endpoints
- [ ] Error messages don't leak sensitive info
- [ ] Secrets not hardcoded (use env vars)
- [ ] Dependencies up to date (`npm audit`)

### Testing Security
```bash
# Run security audit
npm audit

# Fix vulnerabilities
npm audit fix

# Test SSRF protection
# Try accessing: http://169.254.169.254/latest/meta-data/
# Should be blocked

# Test rate limiting
# Send 11 requests in 1 minute - 11th should fail with 429

# Test code injection
# Try transform script with: require('fs')
# Should fail with E2B sandbox error
```

---

## Additional Resources

- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [E2B Security Documentation](https://e2b.dev/docs/security)
- [Convex Security Best Practices](https://docs.convex.dev/production/best-practices/security)
- [Next.js Security Headers](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)

---

**For questions or security concerns, contact the development team.**
