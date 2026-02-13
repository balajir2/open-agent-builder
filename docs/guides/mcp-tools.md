# MCP Tools Reference

This guide documents all available Model Context Protocol (MCP) tools in Open Agent Builder.

## What is MCP?

[Model Context Protocol](https://modelcontextprotocol.io) is an open standard for connecting AI agents to external tools and data sources. MCP servers expose tools that agents can use to perform actions like web scraping, database queries, API calls, and more.

## Available MCP Servers

### 1. Firecrawl

Web scraping and search powered by [Firecrawl](https://firecrawl.dev).

**Connection Type:** SSE (Server-Sent Events)
**URL:** `https://mcp.firecrawl.dev/sse`
**Authentication:** Requires `FIRECRAWL_API_KEY`

#### Tools

##### `firecrawl_scrape`

Scrape a single website and extract content in multiple formats.

**Arguments:**
```json
{
  "url": "https://example.com",
  "formats": ["markdown", "html", "rawHtml", "links", "screenshot"]
}
```

**Returns:**
```json
{
  "markdown": "# Page Title\n\nContent...",
  "html": "<html>...</html>",
  "metadata": {
    "title": "Page Title",
    "description": "...",
    "language": "en",
    "ogImage": "https://..."
  },
  "links": ["https://example.com/page1", "..."]
}
```

**Use Cases:**
- Extract article content
- Download documentation
- Parse product pages
- Archive web pages

##### `firecrawl_search`

Search the web using Google and return formatted results.

**Arguments:**
```json
{
  "query": "latest AI developments",
  "limit": 5
}
```

**Returns:**
```json
{
  "results": [
    {
      "title": "Article Title",
      "url": "https://example.com/article",
      "description": "Brief summary...",
      "markdown": "# Article Title\n\nFull content..."
    }
  ]
}
```

**Use Cases:**
- Research automation
- Content aggregation
- Competitive analysis
- News monitoring

##### `firecrawl_crawl`

Recursively crawl a website (multiple pages).

**Arguments:**
```json
{
  "url": "https://example.com",
  "limit": 10,
  "scrapeOptions": {
    "formats": ["markdown"]
  }
}
```

**Returns:**
```json
{
  "pages": [
    { "url": "https://example.com", "markdown": "..." },
    { "url": "https://example.com/about", "markdown": "..." }
  ]
}
```

**Use Cases:**
- Documentation scraping
- Website archival
- Content migration
- SEO analysis

---

## Using MCP Tools in Workflows

### Method 1: MCP Node

Direct tool invocation in workflow.

**Configuration:**
```json
{
  "type": "mcp",
  "data": {
    "toolName": "firecrawl_scrape",
    "arguments": {
      "url": "{{websiteUrl}}",
      "formats": ["markdown"]
    },
    "outputVariable": "scrapedContent"
  }
}
```

### Method 2: Agent with Tools

AI agent that can autonomously use tools.

**Configuration:**
```json
{
  "type": "agent",
  "data": {
    "model": "claude-sonnet-4-5-20250929",
    "provider": "anthropic",
    "systemPrompt": "You are a research assistant.",
    "userPrompt": "Research {{topic}} using web search and scraping.",
    "tools": ["firecrawl_search", "firecrawl_scrape"],
    "maxIterations": 10
  }
}
```

**Agent Workflow:**
```
User: "Research quantum computing"
Agent: I'll search for quantum computing information.
  → Calls firecrawl_search("quantum computing")
Agent: Let me scrape the top result for details.
  → Calls firecrawl_scrape("https://nature.com/quantum")
Agent: Here's a comprehensive summary based on my research...
```

---

## MCP Server Configuration

### Global Registry

MCP servers are registered in Convex `mcpServers` table:

```typescript
{
  name: "firecrawl",
  description: "Web scraping and search",
  type: "sse",
  url: "https://mcp.firecrawl.dev/sse",
  createdAt: 1732419600000
}
```

### User Configuration

Users can add personal MCP servers in Settings:

1. Navigate to Settings → MCP Servers
2. Click "Add MCP Server"
3. Fill in:
   - Name: `my-custom-mcp`
   - Type: `sse` or `stdio`
   - URL: `https://my-mcp-server.com/sse`
   - API Key: `your-api-key`
4. Click "Test Connection"
5. Click "Save"

### Environment Variables

**Required:**
```bash
FIRECRAWL_API_KEY=fc-your-api-key
```

**Optional (user can provide in UI):**
```bash
E2B_API_KEY=e2b_your-api-key
```

---

## Tool Resolution

When an agent or MCP node uses a tool:

1. **Resolve MCP Server:** Find server that provides the tool
2. **Connect:** Establish SSE or stdio connection
3. **List Tools:** Get available tools from server
4. **Call Tool:** Invoke tool with arguments
5. **Return Result:** Stream result back to agent

**Example (Internal):**
```typescript
// 1. Resolve
const mcpServer = await mcpResolver.resolve("firecrawl");

// 2. Connect
await mcpServer.connect();

// 3. List tools
const tools = await mcpServer.listTools();
// [{ name: "firecrawl_scrape", ... }, { name: "firecrawl_search", ... }]

// 4. Call tool
const result = await mcpServer.callTool("firecrawl_scrape", {
  url: "https://example.com",
  formats: ["markdown"]
});

// 5. Return
});

server.tool("custom_tool", {
  description: "My custom tool",
  parameters: {
    type: "object",
    properties: {
      input: { type: "string" }
    }
  }
}, async (args) => {
  // Tool implementation
  return { result: `Processed: ${args.input}` };
});

server.listen(3001);
```

### Register in Open Agent Builder

```typescript
// Add to Convex mcpServers
await convex.insert("mcpServers", {
  name: "my-mcp-server",
  description: "My custom MCP server",
  type: "sse",
  url: "http://localhost:3001/sse",
  createdAt: Date.now(),
  updatedAt: Date.now()
});
```

---

## Best Practices

### 1. Error Handling

MCP tools can fail. Always check for errors:

```typescript
const result = await mcpServer.callTool("firecrawl_scrape", args);

if (result.error) {
  console.error("Tool failed:", result.error);
  return { success: false, error: result.error };
}

return { success: true, data: result };
```

### 2. Rate Limiting

Respect API rate limits:

```typescript
// Add delays between calls
for (const url of urls) {
  const result = await scrape(url);
  await sleep(1000); // 1 second delay
}
```

### 3. Caching

Cache expensive scrapes:

```typescript
const cacheKey = `scrape:${url}`;
const cached = await cacheGet(cacheKey);
if (cached) return cached;

const result = await mcpServer.callTool("firecrawl_scrape", { url });
await cacheSet(cacheKey, result, 10 * 60 * 1000); // 10 min TTL
return result;
```

### 4. Tool Selection

Choose the right tool for the job:

| Task | Tool | Why |
|------|------|-----|
| Single page scrape | `firecrawl_scrape` | Fast, simple |
| Multi-page scrape | `firecrawl_crawl` | Recursive crawling |
| Web research | `firecrawl_search` | Google search results |
| Agent research | Agent + tools | Autonomous reasoning |

### 5. Format Selection

Choose appropriate formats:

```json
{
  "formats": ["markdown"]  // ✅ Lightweight, LLM-friendly
}
```

```json
{
  "formats": ["markdown", "html", "rawHtml", "links", "screenshot"]  // ❌ Slow, expensive
}
```

---

## Troubleshooting

### Tool Not Found

**Error:** `Tool 'firecrawl_scrape' not found`

**Solution:**
1. Check MCP server is registered in Settings
2. Verify server URL is correct
3. Test connection in Settings → MCP Servers
4. Check Firecrawl API key is set

### Authentication Failed

**Error:** `Authentication failed`

**Solution:**
1. Verify `FIRECRAWL_API_KEY` environment variable
2. Or add API key in Settings → Tool API Keys
3. Check API key is valid at firecrawl.dev

### Rate Limited

**Error:** `Rate limit exceeded`

**Solution:**
1. Add delays between requests
2. Implement caching
3. Upgrade Firecrawl plan
4. Use different API key

### Connection Timeout

**Error:** `Connection timeout`

**Solution:**
1. Check network connectivity
2. Verify MCP server URL is accessible
3. Check firewall rules
4. Try increasing timeout in configuration

---

## API Reference

### MCP Node Type

```typescript
type MCPNode = {
  id: string;
  type: "mcp";
  data: {
    toolName: string;                    // Tool to call
    arguments: Record<string, any>;       // Tool arguments
    outputVariable: string;               // Where to store result
  };
};
```

### Agent Node with Tools

```typescript
type AgentNode = {
  id: string;
  type: "agent";
  data: {
    model: string;                        // LLM model
    provider: "anthropic" | "openai" | "groq";
    systemPrompt: string;
    userPrompt: string;
    tools: string[];                      // MCP tool names
    maxIterations: number;
    outputVariable: string;
  };
};
```

---

## Related Documentation

- [workflow-examples.md](./workflow-examples.md) - Example workflows using MCP
- [execution-engine.md](../architecture/execution-engine.md) - How MCP tools are executed
- [USER-MANUAL.md](../../USER-MANUAL.md) - User guide
- [Model Context Protocol Docs](https://modelcontextprotocol.io)
