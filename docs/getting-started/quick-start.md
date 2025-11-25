# Quick Start Tutorial

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
