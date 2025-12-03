# LangSmith Tracing Setup Guide

**LangSmith** provides monitoring, debugging, and observability for LLM applications. It automatically traces all LangChain and LangGraph calls, showing you:

- Full workflow execution traces with timing
- LLM calls with prompts and responses
- Agent reasoning steps and tool usage
- MCP server interactions
- State transitions between nodes
- Error details and stack traces

---

## Quick Setup (5 minutes)

### 1. Sign Up for LangSmith

1. Go to [https://smith.langchain.com/](https://smith.langchain.com/)
2. Sign up for a free account
3. Navigate to **Settings → API Keys**
4. Click **"Create API Key"**
5. Copy your API key (starts with `lsv2_pt_...`)

### 2. Add Environment Variables

Add these to your `.env.local` file:

```bash
# LangSmith Tracing (Optional - for monitoring workflows)
# Get your API key from: https://smith.langchain.com/
LANGCHAIN_TRACING_V2=true
LANGCHAIN_API_KEY=lsv2_pt_your_api_key_here
LANGCHAIN_PROJECT=open-agent-builder
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
```

### 3. Restart Your Dev Server

```bash
# Stop your current dev server (Ctrl+C)
npm run dev:all
```

### 4. Execute a Workflow

Run any workflow. You should see this in your terminal:

```
✅ LangSmith tracing enabled
   Project: open-agent-builder
   Endpoint: https://api.smith.langchain.com
```

### 5. View Traces in LangSmith

1. Go to [https://smith.langchain.com/](https://smith.langchain.com/)
2. Navigate to your **"open-agent-builder"** project
3. Click on **"Traces"** in the sidebar
4. You'll see all your workflow executions!

---

## Troubleshooting

### Issue: "LangSmith tracing disabled" message

**Check 1: Environment Variables Set**
```bash
# Make sure these are in your .env.local
echo $LANGCHAIN_TRACING_V2  # Should output: true
echo $LANGCHAIN_API_KEY     # Should output: lsv2_pt_...
```

**Check 2: Correct API Key Format**
- API key must start with `lsv2_pt_`
- No quotes around the value in `.env.local`
- No extra spaces

**Check 3: Server Restarted**
```bash
# Environment variables are only loaded on server start
# Stop server with Ctrl+C, then restart
npm run dev:all
```

### Issue: No traces appearing in LangSmith

**Check 1: Project Name**
- Default project is `open-agent-builder`
- Check your LangSmith dashboard for this project name
- Or change `LANGCHAIN_PROJECT` in `.env.local` to match an existing project

**Check 2: API Key Permissions**
- Make sure your API key has "Write" permissions
- Go to Settings → API Keys in LangSmith
- Check the permissions for your key

**Check 3: Network Issues**
- LangSmith requires outbound HTTPS to `api.smith.langchain.com`
- Check firewall/proxy settings if behind corporate network

**Check 4: Verify Tracing is Active**

Look for this log message when server starts:
```
✅ LangSmith tracing enabled
   Project: open-agent-builder
   Endpoint: https://api.smith.langchain.com
```

### Issue: Traces are delayed

- LangSmith may take 5-10 seconds to show traces
- Refresh the page if traces don't appear immediately
- Check the "Last 24 hours" filter in LangSmith

---

## Advanced Configuration

### Using Different Projects

You can organize traces by workflow type:

```bash
# In .env.local
LANGCHAIN_PROJECT=my-web-scraping-workflows
```

Or set it dynamically per workflow (requires code changes).

### Setting Variables in Convex Instead

For production deployments, you can set these in Convex:

```bash
npx convex env set LANGCHAIN_TRACING_V2 "true"
npx convex env set LANGCHAIN_API_KEY "lsv2_pt_your_api_key_here"
npx convex env set LANGCHAIN_PROJECT "open-agent-builder-prod"
```

### Disabling Tracing Temporarily

To disable tracing without removing the API key:

```bash
# In .env.local
LANGCHAIN_TRACING_V2=false
```

Or comment it out:
```bash
# LANGCHAIN_TRACING_V2=true
```

---

## What Gets Traced?

### LangGraph Workflows
- ✅ Node execution (start, completion, errors)
- ✅ State transitions
- ✅ Conditional routing decisions
- ✅ Loop iterations

### Agent Nodes
- ✅ LLM calls (prompt, response, tokens)
- ✅ Tool selection decisions
- ✅ Tool execution (input, output)
- ✅ Reasoning steps

### MCP Tools
- ✅ MCP server connections
- ✅ Tool invocations (e.g., Firecrawl scrapes)
- ✅ Response parsing

### Extract Nodes
- ✅ LLM extraction calls
- ✅ Schema validation
- ✅ Parsed results

### Transform Nodes
- ✅ E2B sandbox execution
- ✅ Code execution time
- ✅ Output values

---

## Benefits of LangSmith Tracing

### 1. Debugging
- See exactly what happened in a failed workflow
- Inspect LLM prompts and responses
- Identify which node caused an error

### 2. Performance Optimization
- See timing for each node
- Identify slow LLM calls
- Optimize token usage

### 3. Cost Tracking
- See token counts per execution
- Track API usage over time
- Identify expensive workflows

### 4. Quality Assurance
- Review LLM outputs for accuracy
- Test prompt variations
- Compare model performance

---

## Example: Viewing a Workflow Trace

When you execute a workflow like "Simple Web Scraper":

**In LangSmith, you'll see:**

```
workflow_execution
├── start_node (0.01s)
│   └── Output: { url: "https://example.com" }
├── scrape_node (2.3s)
│   ├── firecrawl_scrape_tool (2.2s)
│   │   ├── Input: { url: "https://example.com" }
│   │   └── Output: { markdown: "..." }
│   └── Output: { content: "..." }
├── extract_node (1.5s)
│   ├── anthropic_claude_call (1.4s)
│   │   ├── Prompt: "Extract title and summary from..."
│   │   └── Response: { title: "...", summary: "..." }
│   └── Output: { title: "...", summary: "..." }
└── end_node (0.01s)
    └── Final Output: { ... }
```

Click on any node to see:
- Full input/output
- Token counts
- Latency breakdown
- Error messages (if any)

---

## Pricing

LangSmith offers:
- **Free Tier**: 5,000 traces/month
- **Team Plan**: $39/month for 50,000 traces
- **Enterprise**: Custom pricing

For development and testing, the free tier is usually sufficient.

---

## Privacy & Security

- Traces contain your workflow data (prompts, responses, inputs)
- Data is sent to Anthropic's LangSmith servers
- Use Convex environment variables for API keys (not `.env.local` in production)
- Review LangSmith's privacy policy: https://www.langchain.com/privacy

**For sensitive data:**
- Consider self-hosted LangSmith (Enterprise only)
- Or disable tracing for production workflows with sensitive information

---

## Support

**LangSmith Issues:**
- [LangSmith Documentation](https://docs.smith.langchain.com/)
- [LangChain Discord](https://discord.gg/langchain)

**Open Agent Builder Issues:**
- [GitHub Issues](https://github.com/yourusername/open-agent-builder/issues)

---

## Summary

1. ✅ Sign up at https://smith.langchain.com/
2. ✅ Get API key from Settings → API Keys
3. ✅ Add to `.env.local`:
   ```bash
   LANGCHAIN_TRACING_V2=true
   LANGCHAIN_API_KEY=lsv2_pt_...
   ```
4. ✅ Restart dev server: `npm run dev:all`
5. ✅ Execute a workflow
6. ✅ View traces in LangSmith dashboard

That's it! You now have full observability into your AI workflows. 🎉
