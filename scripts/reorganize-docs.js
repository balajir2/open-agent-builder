/**
 * Documentation Reorganization Script
 * Automates the creation of new documentation files and cleanup
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

console.log('📚 Starting documentation reorganization...\n');

// Helper function to write file
function writeFile(filePath, content) {
  const fullPath = path.join(rootDir, filePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✅ Created: ${filePath}`);
}

// 1. Create Installation Guide
const installationContent = `# Installation Guide

> [!NOTE]
> This guide will walk you through setting up Open Agent Builder on your local machine.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Git** for cloning the repository

## Step 1: Clone the Repository

\`\`\`bash
git clone https://github.com/firecrawl/open-agent-builder.git
cd open-agent-builder
npm install
\`\`\`

## Step 2: Set Up Convex (Database)

Convex handles all workflow and execution data persistence.

\`\`\`bash
# Install Convex CLI globally
npm install -g convex

# Initialize Convex project
npx convex dev
\`\`\`

This will:
- Open your browser to create/link a Convex project
- Generate a \`NEXT_PUBLIC_CONVEX_URL\` in your \`.env.local\`
- Start the Convex development server

Keep the Convex dev server running in a separate terminal.

## Step 3: Set Up Clerk (Authentication)

1. Go to [clerk.com](https://clerk.com) and create a new application
2. In your Clerk dashboard:
   - Go to **API Keys** and copy your keys
   - Go to **JWT Templates** → **Convex**:
     - Click "Apply"
     - Copy the issuer URL

3. Add to your \`.env.local\`:

\`\`\`bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk + Convex Integration
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev
\`\`\`

## Step 4: Configure Convex Authentication

Edit \`convex/auth.config.ts\`:

\`\`\`typescript
export default {
  providers: [
    {
      domain: "https://your-clerk-domain.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};
\`\`\`

Then push the auth config:

\`\`\`bash
npx convex dev
\`\`\`

## Step 5: Set Up Firecrawl (Required)

Firecrawl is the core web scraping engine.

1. Get your API key at [firecrawl.dev](https://firecrawl.dev)
2. Add to \`.env.local\`:

\`\`\`bash
FIRECRAWL_API_KEY=fc-...
\`\`\`

## Step 6: Security Configuration (Required for Production)

\`\`\`bash
# Generate encryption key (32 bytes for AES-256-GCM)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Add to .env.local
ENCRYPTION_KEY=<generated-key>

# E2B Sandbox (REQUIRED for Transform nodes)
E2B_API_KEY=e2b_...
\`\`\`

Get your E2B key at [e2b.dev](https://e2b.dev)

> [!WARNING]
> Transform nodes execute user-provided code and **require** E2B sandbox for security.

## Step 7: Optional LLM Provider

While users can add LLM API keys through the UI, you can set a default:

\`\`\`bash
# Anthropic Claude (Recommended - Native MCP support)
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI GPT-4o
OPENAI_API_KEY=sk-...

# Groq
GROQ_API_KEY=gsk_...

# Google Gemini
GOOGLE_API_KEY=AIza...
\`\`\`

## Running the Application

### Development Mode

\`\`\`bash
# Terminal 1: Convex dev server
npx convex dev

# Terminal 2: Next.js dev server
npm run dev
\`\`\`

Or run both with one command:

\`\`\`bash
npm run dev:all
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## Next Steps

- **[Quick Start Tutorial](./quick-start.md)** - Build your first workflow
- **[Configuration Guide](./configuration.md)** - Detailed environment setup
- **[User Manual](../../USER-MANUAL.md)** - Complete feature guide

---

**Need help?** Check the [troubleshooting section](../../USER-MANUAL.md#troubleshooting) or [open an issue](https://github.com/firecrawl/open-agent-builder/issues).
`;

writeFile('docs/getting-started/installation.md', installationContent);

// 2. Create Quick Start Guide
const quickStartContent = `# Quick Start Tutorial

Build your first AI agent workflow in 5 minutes!

## Prerequisites

- Open Agent Builder installed and running ([Installation Guide](./installation.md))
- At least one LLM API key configured

## Step 1: Sign Up / Login

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Sign up with your email or use a social provider
3. Complete the onboarding flow

## Step 2: Add Your API Key

1. Click the **Settings** icon in the top right
2. Go to **API Keys** → **LLM Providers**
3. Click **Add API Key**
4. Select your provider (Anthropic, OpenAI, Groq, or Google)
5. Paste your API key and save

> [!TIP]
> MCP tools are supported on all major providers (Anthropic, OpenAI, Groq, Google).

## Step 3: Create Your First Workflow

### Option A: Use a Template

1. Click **New Workflow** → **From Template**
2. Select **"Simple Web Scraper"**
3. Click **Use Template**

### Option B: Build from Scratch

1. Click **New Workflow** → **Blank Workflow**
2. Drag nodes from the left panel:
   - **Start** node (already added)
   - **Agent** node
   - **End** node
3. Connect them: Start → Agent → End

## Step 4: Configure the Agent Node

1. Click on the **Agent** node
2. In the right panel:
   - **Instructions**: "Summarize the content of the provided URL"
   - **Model**: Select your configured LLM
   - **Tools**: Check "Firecrawl" under MCP Tools
3. The agent can now scrape and analyze websites!

## Step 5: Run Your Workflow

1. Click the **Run** button in the top right
2. Enter a URL in the input field (e.g., "https://example.com")
3. Watch the agent execute the workflow!

## Next Steps

- Explore **[Workflow Examples](../guides/workflow-examples.md)**
- Learn about **[MCP Tools](../guides/mcp-tools.md)**
`;

writeFile('docs/getting-started/quick-start.md', quickStartContent);

// 3. Create Configuration Guide
const configContent = `# Configuration Guide

Detailed reference for environment variables and configuration options.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| \`NEXT_PUBLIC_CONVEX_URL\` | Convex project URL | Yes |
| \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\` | Clerk public key | Yes |
| \`CLERK_SECRET_KEY\` | Clerk secret key | Yes |
| \`CLERK_JWT_ISSUER_DOMAIN\` | Clerk JWT issuer | Yes |
| \`FIRECRAWL_API_KEY\` | Firecrawl API key | Yes |
| \`ENCRYPTION_KEY\` | 32-byte base64 key | Yes (Prod) |
| \`E2B_API_KEY\` | E2B Sandbox key | Yes (Transform) |
| \`ANTHROPIC_API_KEY\` | Default Anthropic key | No |
| \`OPENAI_API_KEY\` | Default OpenAI key | No |
| \`GROQ_API_KEY\` | Default Groq key | No |
| \`GOOGLE_API_KEY\` | Default Google key | No |

## Feature Flags

| Variable | Description | Default |
|----------|-------------|---------|
| \`NEXT_PUBLIC_ENABLE_ANALYTICS\` | Enable usage tracking | false |
| \`NEXT_PUBLIC_DEBUG_MODE\` | Show debug info in UI | false |

## Rate Limiting

Rate limits are configured in \`convex/rateLimits.ts\`.

- **Global Limit:** 100 requests / minute
- **LLM Limit:** 50 requests / minute
- **Tool Limit:** 20 requests / minute

## Security

- **API Keys:** Encrypted at rest using AES-256-GCM
- **Sandboxing:** Code execution runs in isolated E2B sandboxes
- **Authentication:** Handled by Clerk + Convex Auth
`;

writeFile('docs/getting-started/configuration.md', configContent);

console.log('\n✨ Documentation reorganization complete!');
