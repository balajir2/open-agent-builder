# Installation Guide

> [!NOTE]
> This guide will walk you through setting up Open Agent Builder on your local machine.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Git** for cloning the repository

## Step 1: Clone the Repository

```bash
git clone https://github.com/firecrawl/open-agent-builder.git
cd open-agent-builder
npm install
```

## Step 2: Set Up Convex (Database)

Convex handles all workflow and execution data persistence.

```bash
# Install Convex CLI globally
npm install -g convex

# Initialize Convex project
npx convex dev
```

This will:
- Open your browser to create/link a Convex project
- Generate a `NEXT_PUBLIC_CONVEX_URL` in your `.env.local`
- Start the Convex development server

Keep the Convex dev server running in a separate terminal.

## Step 3: Set Up Clerk (Authentication)

1. Go to [clerk.com](https://clerk.com) and create a new application
2. In your Clerk dashboard:
   - Go to **API Keys** and copy your keys
   - Go to **JWT Templates** → **Convex**:
     - Click "Apply"
     - Copy the issuer URL

3. Add to your `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk + Convex Integration
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev
```

## Step 4: Configure Convex Authentication

Edit `convex/auth.config.ts`:

```typescript
export default {
  providers: [
    {
      domain: "https://your-clerk-domain.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};
```

Then push the auth config:

```bash
npx convex dev
```

## Step 5: Set Up Firecrawl (Required)

Firecrawl is the core web scraping engine.

1. Get your API key at [firecrawl.dev](https://firecrawl.dev)
2. Add to `.env.local`:

```bash
FIRECRAWL_API_KEY=fc-...
```

## Step 6: Security Configuration (Required for Production)

```bash
# Generate encryption key (32 bytes for AES-256-GCM)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Add to .env.local
ENCRYPTION_KEY=<generated-key>

# E2B Sandbox (REQUIRED for Transform nodes)
E2B_API_KEY=e2b_...
```

Get your E2B key at [e2b.dev](https://e2b.dev)

> [!WARNING]
> Transform nodes execute user-provided code and **require** E2B sandbox for security.

## Step 7: Optional LLM Provider

While users can add LLM API keys through the UI, you can set a default:

```bash
# Anthropic Claude (Recommended - Native MCP support)
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI GPT-4o
OPENAI_API_KEY=sk-...

# Groq
GROQ_API_KEY=gsk_...

# Google Gemini
GOOGLE_API_KEY=AIza...
```

## Running the Application

### Development Mode

```bash
# Terminal 1: Convex dev server
npx convex dev

# Terminal 2: Next.js dev server
npm run dev
```

Or run both with one command:

```bash
npm run dev:all
```

Visit [http://localhost:3000](http://localhost:3000)

## Next Steps

- **[Quick Start Tutorial](./quick-start.md)** - Build your first workflow
- **[Configuration Guide](./configuration.md)** - Detailed environment setup
- **[User Manual](../../USER-MANUAL.md)** - Complete feature guide

---

**Need help?** Check the [troubleshooting section](../../USER-MANUAL.md#troubleshooting) or [open an issue](https://github.com/firecrawl/open-agent-builder/issues).
