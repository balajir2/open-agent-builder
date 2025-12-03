# Workflow Examples

This guide provides practical examples of workflows you can build with Open Agent Builder.

## Quick Navigation

| Workflow | Complexity | Use Case |
|----------|------------|----------|
| [Simple Web Scraper](#1-simple-web-scraper) | Beginner | Scrape a website |
| [Web Search & Summary](#2-web-search--summary) | Beginner | Search and summarize results |
| [Price Tracker](#3-price-tracker) | Intermediate | Monitor product prices |
| [Content Research](#4-content-research-agent) | Intermediate | Research with AI agent |
| [Data Processing Pipeline](#5-data-processing-pipeline) | Intermediate | Transform and save data |
| [Multi-Step Agent](#6-multi-step-agent) | Advanced | Complex agent reasoning |
| [Human-in-the-Loop](#7-human-in-the-loop-workflow) | Advanced | Approval workflows |

---

## 1. Simple Web Scraper

**Goal:** Scrape a website and extract markdown content.

### Workflow Structure

```
Start (url) → MCP (Firecrawl Scrape) → End
```

### Node Configuration

**1. Start Node**
```json
{
  "variables": ["url"]
}
```

**2. MCP Node - Firecrawl Scrape**
```json
{
  "toolName": "firecrawl_scrape",
  "arguments": {
    "url": "{{url}}",
    "formats": ["markdown", "html"]
  },
  "outputVariable": "scrapedData"
}
```

**3. End Node**
```json
{
  "outputVariable": "scrapedData"
}
```

### Usage

**API Call:**
```bash
curl -X POST http://localhost:3000/api/workflows/{workflowId}/execute \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "url": "https://example.com"
    }
  }'
```

**Output:**
```json
{
  "markdown": "# Example Domain\n\nThis domain is for use in illustrative examples...",
  "html": "<html>...</html>",
  "metadata": {
    "title": "Example Domain",
    "description": "..."
  }
}
```

---

## 2. Web Search & Summary

**Goal:** Search Google and summarize top results with AI.

### Workflow Structure

```
Start (query) → MCP (Firecrawl Search) → Agent (Summarize) → End
```

### Node Configuration

**1. Start Node**
```json
{
  "variables": ["query"]
}
```

**2. MCP Node - Firecrawl Search**
```json
{
  "toolName": "firecrawl_search",
  "arguments": {
    "query": "{{query}}",
    "limit": 5
  },
  "outputVariable": "searchResults"
}
```

**3. Agent Node - Summarize**
```json
{
  "model": "claude-3-5-sonnet-20240620",
  "provider": "anthropic",
  "systemPrompt": "You are a research assistant that summarizes web search results.",
  "userPrompt": "Summarize these search results about {{query}}:\n\n{{searchResults}}",
  "outputVariable": "summary"
}
```

**4. End Node**
```json
{
  "outputVariable": "summary"
}
```

### Usage

**Input:**
```json
{
  "query": "latest AI developments 2024"
}
```

**Output:**
```json
{
  "summary": "Based on the search results, here are the key AI developments in 2024:\n\n1. **Large Language Models**: GPT-4.5 and Claude 4 released...\n2. **Multimodal AI**: Significant improvements in image generation...\n3. **AI Regulation**: EU AI Act implementation begins..."
}
```

---

## 3. Price Tracker

**Goal:** Monitor product prices and alert if below threshold.

### Workflow Structure

```
Start (productUrl, threshold) →
MCP (Scrape) →
Extract (Price) →
Transform (Parse Price) →
If-Else (price < threshold) →
  True: Agent (Send Alert)
  False: End
```

### Node Configuration

**1. Start Node**
```json
{
  "variables": ["productUrl", "threshold"]
}
```

**2. MCP Node - Scrape Product**
```json
{
  "toolName": "firecrawl_scrape",
  "arguments": {
    "url": "{{productUrl}}",
    "formats": ["markdown"]
  },
  "outputVariable": "pageContent"
}
```

**3. Extract Node - Extract Price**
```json
{
  "model": "gpt-4o-mini",
  "inputVariable": "pageContent",
  "schema": {
    "type": "object",
    "properties": {
      "price": { "type": "number" },
      "currency": { "type": "string" },
      "availability": { "type": "boolean" }
    }
  },
  "outputVariable": "product"
}
```

**4. Transform Node - Parse Price**
```json
{
  "code": "const price = data.product.price; return { price };",
  "inputVariable": "product",
  "outputVariable": "price"
}
```

**5. If-Else Node - Check Threshold**
```json
{
  "condition": "price < threshold",
  "trueEdge": "send-alert",
  "falseEdge": "end"
}
```

**6. Agent Node - Send Alert**
```json
{
  "model": "claude-3-5-haiku-20241022",
  "provider": "anthropic",
  "systemPrompt": "You are a price alert assistant.",
  "userPrompt": "The product at {{productUrl}} is now ${{price}}, which is below your threshold of ${{threshold}}. Create a short alert message.",
  "outputVariable": "alert"
}
```

**7. End Node**
```json
{
  "outputVariable": "alert"
}
```

### Usage

**Input:**
```json
{
  "productUrl": "https://amazon.com/product/xyz",
  "threshold": 50
}
```

**Output (if price < threshold):**
```json
{
  "alert": "🎉 Price Alert! The product you're tracking is now $42.99, which is $7.01 below your threshold of $50.00. This is a great time to buy!"
}
```

---

## 4. Content Research Agent

**Goal:** AI agent that searches, scrapes, and synthesizes research.

### Workflow Structure

```
Start (topic) → Agent (Research with Tools) → End
```

### Node Configuration

**1. Start Node**
```json
{
  "variables": ["topic"]
}
```

**2. Agent Node - Research Agent**
```json
{
  "model": "claude-3-5-sonnet-20240620",
  "provider": "anthropic",
  "systemPrompt": "You are a research assistant. Use the available tools to search and scrape relevant information, then provide a comprehensive summary.",
  "userPrompt": "Research {{topic}} and provide a detailed summary with sources.",
  "tools": ["firecrawl_search", "firecrawl_scrape"],
  "maxIterations": 10,
  "outputVariable": "research"
}
```

**3. End Node**
```json
{
  "outputVariable": "research"
}
```

### Example Execution

**Input:**
```json
{
  "topic": "quantum computing breakthroughs"
}
```

**Agent Reasoning:**
```
Thought: I need to search for recent quantum computing breakthroughs.
Action: firecrawl_search("quantum computing breakthroughs 2024")
Observation: [5 search results found]

Thought: Let me scrape the top result for more details.
Action: firecrawl_scrape("https://nature.com/articles/quantum-2024")
Observation: [Article content scraped]

Thought: I'll scrape one more source for comparison.
Action: firecrawl_scrape("https://mit.edu/news/quantum-2024")
Observation: [Article content scraped]

Thought: I have enough information to provide a comprehensive summary.
Final Answer: [Detailed research summary with sources]
```

---

## 5. Data Processing Pipeline

**Goal:** Fetch data from API, transform, and save results.

### Workflow Structure

```
Start (apiUrl) →
HTTP (Fetch Data) →
Transform (Process) →
Set State (Save) →
End
```

### Node Configuration

**1. Start Node**
```json
{
  "variables": ["apiUrl", "apiKey"]
}
```

**2. HTTP Node - Fetch Data**
```json
{
  "method": "GET",
  "url": "{{apiUrl}}",
  "headers": {
    "Authorization": "Bearer {{apiKey}}"
  },
  "outputVariable": "rawData"
}
```

**3. Transform Node - Process Data**
```json
{
  "code": `
    const items = data.rawData.items;
    const processed = items.map(item => ({
      id: item.id,
      name: item.name.toUpperCase(),
      price: parseFloat(item.price),
      timestamp: Date.now()
    }));
    return { processed };
  `,
  "inputVariable": "rawData",
  "outputVariable": "processedData"
}
```

**4. Set State Node - Save Results**
```json
{
  "updates": {
    "finalResults": "{{processedData}}"
  }
}
```

**5. End Node**
```json
{
  "outputVariable": "finalResults"
}
```

---

## 6. Multi-Step Agent

**Goal:** Agent with conditional logic and loops.

### Workflow Structure

```
Start →
Agent (Analyze) →
If-Else (needs_more_data) →
  True: While Loop (Fetch More) → Agent (Re-analyze)
  False: End
```

### Node Configuration

**1. Start Node**
```json
{
  "variables": ["initialData"]
}
```

**2. Agent Node - Analyze**
```json
{
  "model": "claude-3-5-sonnet-20240620",
  "provider": "anthropic",
  "systemPrompt": "Analyze data and determine if more information is needed.",
  "userPrompt": "Analyze: {{initialData}}\n\nReturn JSON: {\"complete\": true/false, \"reasoning\": \"...\"}",
  "outputVariable": "analysis"
}
```

**3. If-Else Node - Check Completeness**
```json
{
  "condition": "analysis.complete === false",
  "trueEdge": "fetch-more",
  "falseEdge": "end"
}
```

**4. While Node - Fetch More Data**
```json
{
  "condition": "iterations < 3 && !analysis.complete",
  "body": "mcp-search",
  "outputVariable": "additionalData"
}
```

---

## 7. Human-in-the-Loop Workflow

**Goal:** Pause for human approval before proceeding.

### Workflow Structure

```
Start →
MCP (Scrape) →
Extract (Data) →
User Approval →
If-Else (approved) →
  True: HTTP (Save to Database)
  False: End
```

### Node Configuration

**1. Start Node**
```json
{
  "variables": ["url"]
}
```

**2. MCP Node - Scrape**
```json
{
  "toolName": "firecrawl_scrape",
  "arguments": {
    "url": "{{url}}"
  },
  "outputVariable": "scrapedData"
}
```

**3. Extract Node - Extract Structured Data**
```json
{
  "model": "gpt-4o-mini",
  "inputVariable": "scrapedData",
  "schema": {
    "type": "object",
    "properties": {
      "title": { "type": "string" },
      "author": { "type": "string" },
      "date": { "type": "string" }
    }
  },
  "outputVariable": "article"
}
```

**4. User Approval Node**
```json
{
  "message": "Review the extracted article data before saving to database.",
  "dataVariable": "article"
}
```

**5. If-Else Node - Check Approval**
```json
{
  "condition": "approvalStatus === 'approved'",
  "trueEdge": "save-to-db",
  "falseEdge": "end"
}
```

**6. HTTP Node - Save to Database**
```json
{
  "method": "POST",
  "url": "https://api.example.com/articles",
  "headers": {
    "Authorization": "Bearer {{apiKey}}"
  },
  "body": "{{article}}",
  "outputVariable": "saveResult"
}
```

**7. End Node**
```json
{
  "outputVariable": "saveResult"
}
```

### Approval Flow

1. Workflow executes until user-approval node
2. Execution pauses with status `pending_approval`
3. User reviews data in UI
4. User clicks Approve or Reject
5. Workflow resumes with decision

---

## Common Patterns

### Pattern 1: Error Handling

```
Node → If-Else (check for errors) →
  True: Agent (Generate Error Report) → End
  False: Continue Processing
```

### Pattern 2: Data Validation

```
HTTP (Fetch) →
Transform (Validate) →
If-Else (valid) →
  True: Continue
  False: Agent (Fix Data) → Retry
```

### Pattern 3: Batch Processing

```
Start (items[]) →
While (item in items) →
  MCP (Process Item) →
  Set State (Append Result)
End
```

### Pattern 4: Parallel Execution

```
Start → Branch to:
  - MCP (Scrape Source 1)
  - MCP (Scrape Source 2)
  - MCP (Scrape Source 3)
→ Agent (Combine Results) → End
```

---

## Tips & Best Practices

### 1. Variable Naming

**✅ Good:**
```json
{
  "productUrl": "https://...",
  "priceThreshold": 50,
  "userEmail": "user@example.com"
}
```

**❌ Bad:**
```json
{
  "var1": "https://...",
  "x": 50,
  "e": "user@example.com"
}
```

### 2. Error Handling

Always check for errors in nodes that can fail:

```javascript
// Transform node
if (!data.response || data.response.error) {
  return { error: "API call failed" };
}

const result = processData(data.response);
return { result };
```

### 3. Caching

Cache expensive operations:

```javascript
// Before expensive operation, check cache
const cacheKey = `scrape:${url}`;
const cached = await cacheGet(cacheKey);
if (cached) return cached;

// Perform operation and cache
const result = await scrape(url);
await cacheSet(cacheKey, result, 10 * 60 * 1000); // 10 min
return result;
```

### 4. Rate Limiting

Respect API rate limits:

```javascript
// Add delays in loops
for (const item of items) {
  await processItem(item);
  await sleep(1000); // 1 second delay
}
```

### 5. Testing

Test workflows incrementally:

1. Test each node individually
2. Test node pairs (e.g., scrape → extract)
3. Test full workflow
4. Test error cases

---

## Workflow Templates

Pre-built templates are available in the UI:

| Template | Description |
|----------|-------------|
| Simple Scraper | Basic web scraping |
| Web Search | Google search with summarization |
| Price Tracker | Product price monitoring |
| Content Research | AI-powered research agent |

To use a template:
1. Click "New Workflow" in dashboard
2. Select template from gallery
3. Customize nodes and configuration
4. Save and test

---

## Related Documentation

- [USER-MANUAL.md](../../USER-MANUAL.md) - Complete user guide
- [execution-engine.md](../architecture/execution-engine.md) - How workflows execute
- [mcp-tools.md](./mcp-tools.md) - Available MCP tools
- [CLAUDE.md](../../CLAUDE.md) - Developer guide
