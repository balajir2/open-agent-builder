# Configuration Guide

Detailed reference for environment variables and configuration options.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex project URL | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `CLERK_JWT_ISSUER_DOMAIN` | Clerk JWT issuer | Yes |
| `FIRECRAWL_API_KEY` | Firecrawl API key | Yes |
| `ENCRYPTION_KEY` | 32-byte base64 key | Yes (Prod) |
| `E2B_API_KEY` | E2B Sandbox key | Yes (Transform) |
| `ANTHROPIC_API_KEY` | Default Anthropic key | No |
| `OPENAI_API_KEY` | Default OpenAI key | No |
| `GROQ_API_KEY` | Default Groq key | No |
| `GOOGLE_API_KEY` | Default Google key | No |

## Feature Flags

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable usage tracking | false |
| `NEXT_PUBLIC_DEBUG_MODE` | Show debug info in UI | false |

## Rate Limiting

Rate limits are configured in `convex/rateLimits.ts`.

- **Global Limit:** 100 requests / minute
- **LLM Limit:** 50 requests / minute
- **Tool Limit:** 20 requests / minute

## Security

- **API Keys:** Encrypted at rest using AES-256-GCM
- **Sandboxing:** Code execution runs in isolated E2B sandboxes
- **Authentication:** Handled by Clerk + Convex Auth
