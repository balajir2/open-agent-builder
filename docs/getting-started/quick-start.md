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
4. Select your provider (Anthropic recommended for MCP support)
5. Paste your API key and save

> [!TIP]
> For MCP tool support, use Anthropic Claude (Haiku 4.5 or Sonnet 4.5)

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

1. Click the **Run** button (▶️) in the top right
2. Enter a URL when prompted (e.g., `https://firecrawl.dev`)
3. Watch the real-time execution:
   - See each node light up as it executes
   - View streaming output from the agent
   - Check the execution logs

## Step 6: Review the Results

The workflow will:
1. Accept your URL input
2. Agent scrapes the website using Firecrawl
3. Agent analyzes and summarizes the content
4. Return the summary as the final output

## What's Next?

### Learn More Features

- **[User Manual](../../USER-MANUAL.md)** - All 10 node types explained
- **[Workflow Examples](../guides/workflow-examples.md)** - More complex workflows
- **[MCP Tools Guide](../guides/mcp-tools.md)** - Advanced tool usage

### Try These Workflows

1. **Multi-Page Research**
   - Search web → Loop through results → Synthesize findings

2. **Data Extraction**
   - Scrape page → Extract structured JSON → Export to CSV

3. **Competitive Analysis**
   - Research companies → Compare features → Generate report

### Advanced Topics

- **[Conditional Logic](../../USER-MANUAL.md#if-else-node)** - If/Else nodes
- **[Loops](../../USER-MANUAL.md#while-loop-node)** - Iterate over data
- **[Human Approval](../../USER-MANUAL.md#user-approval-node)** - Review before posting
- **[API Integration](../api/rest-api.md)** - Programmatic execution

---

**Questions?** Join our [GitHub Discussions](https://github.com/firecrawl/open-agent-builder/discussions)
