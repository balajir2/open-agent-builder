# Open Agent Builder - User Manual

**Version:** 1.0
**Last Updated:** November 19, 2025

Welcome to Open Agent Builder! This comprehensive guide will help you create powerful AI agent workflows with our visual no-code interface.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Understanding the Interface](#understanding-the-interface)
3. [Building Your First Workflow](#building-your-first-workflow)
4. [Node Types Reference](#node-types-reference)
5. [Advanced Features](#advanced-features)
6. [Managing API Keys](#managing-api-keys)
7. [Templates](#templates)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [FAQ](#faq)

---

## Getting Started

### Creating an Account

1. Visit your Open Agent Builder instance (e.g., `https://your-domain.com`)
2. Click **Sign Up** in the top right
3. Enter your email address
4. Verify your email
5. Complete your profile

### Adding Your First API Key

Before you can run workflows, you need to add at least one LLM provider API key:

1. Click your profile icon → **Settings**
2. Navigate to **API Keys** tab
3. Click **Add API Key**
4. Choose a provider:
   - **Anthropic (Recommended)** - Best for workflows using MCP tools
   - **OpenAI** - Great for general AI tasks
   - **Groq** - Fastest inference for open models
5. Enter your API key
6. Click **Save**

> **Tip:** You can get free API keys from:
> - Anthropic: https://console.anthropic.com/
> - OpenAI: https://platform.openai.com/
> - Groq: https://console.groq.com/

---

## Understanding the Interface

### Main Dashboard

When you first log in, you'll see:

- **My Workflows** - Your saved workflows
- **Templates** - Pre-built workflows to get started quickly
- **New Workflow** button - Create a workflow from scratch
- **Profile** - Access settings, API keys, and logout

### Workflow Editor

The workflow editor consists of:

1. **Canvas** (center) - Drag and drop nodes here
2. **Node Palette** (left) - Available node types
3. **Properties Panel** (right) - Configure selected node
4. **Toolbar** (top):
   - **Save** - Save workflow
   - **Run** - Execute workflow
   - **Settings** - Workflow settings
   - **Export** - Download as JSON
5. **Execution Panel** (bottom) - View real-time execution logs

---

## Building Your First Workflow

Let's create a simple web scraper that summarizes any website.

### Step 1: Create a New Workflow

1. Click **New Workflow** on the dashboard
2. Give it a name: "Simple Web Scraper"
3. Add description: "Scrape any website and get an AI summary"

### Step 2: Add Start Node

Every workflow begins with a Start node:

1. The Start node is already on the canvas
2. Click on it to open properties
3. Add an input variable:
   - **Name:** `url`
   - **Type:** `text`
   - **Description:** "Website URL to scrape"
   - **Default:** `https://firecrawl.dev`

### Step 3: Add Firecrawl Scrape Node

1. Drag an **MCP Tool** node onto the canvas
2. Connect the Start node to it (drag from the Start node's output handle)
3. Configure the MCP Tool:
   - **Tool:** Firecrawl
   - **Action:** Scrape
   - **URL:** `{{input.url}}` (reference to start node input)
4. Click **Save**

### Step 4: Add Agent Node

1. Drag an **Agent** node onto the canvas
2. Connect the MCP Tool to the Agent
3. Configure the Agent:
   - **Provider:** Anthropic (or your preferred LLM)
   - **Model:** Claude Sonnet 4.5
   - **Instructions:** "Summarize the following website content in 3-5 bullet points"
   - **Input:** `{{lastOutput.markdown}}` (from Firecrawl scrape)

### Step 5: Add End Node

1. Drag an **End** node onto the canvas
2. Connect the Agent to the End node
3. Configure End:
   - **Output:** `{{lastOutput}}` (Agent's response)

### Step 6: Run Your Workflow

1. Click **Run** in the toolbar
2. In the popup, enter a URL: `https://example.com`
3. Click **Execute**
4. Watch real-time execution in the Execution Panel

**Expected Output:**
```
• Example Domain is a website for illustrative examples
• Used in documentation and examples
• Simple, clean design with minimal content
```

Congratulations! You've built your first workflow! 🎉

---

## Node Types Reference

### 1. Start Node

**Purpose:** Entry point for workflows. Defines input variables.

**Configuration:**
- **Input Variables:** Define what data the workflow needs
  - Name: Variable identifier
  - Type: text, number, json, boolean
  - Description: Help text for users
  - Required: Whether input is mandatory
  - Default Value: Pre-filled value

**Example:**
```
Name: query
Type: text
Description: Search query
Required: true
```

**Access in other nodes:** `{{input.query}}`

---

### 2. Agent Node

**Purpose:** AI reasoning with Large Language Models (Claude, GPT-4o, Groq)

**Configuration:**
- **Provider:** LLM provider (Anthropic, OpenAI, Groq)
- **Model:** Specific model (Claude Sonnet 4.5, GPT-4o, etc.)
- **Instructions:** What you want the AI to do
- **Input:** Data for the AI to process
- **Temperature:** Creativity (0.0 - 1.0)
- **Max Tokens:** Response length limit
- **MCP Tools:** Enable external tool access (Firecrawl)

**Variables:**
- `{{input}}` - Data from previous node
- `{{lastOutput}}` - Same as input
- `{{state.variables.node_id}}` - Output from specific node

**Example Use Cases:**
- Summarize content
- Extract information
- Make decisions
- Generate text
- Analyze data

**Tips:**
- Be specific in instructions
- Use examples in your prompt
- Start with temperature 0.7 for balanced output
- For MCP tools, Anthropic Claude works best

---

### 3. MCP Tool Node

**Purpose:** Call external tools and APIs (Firecrawl integration)

**Configuration:**
- **Tool:** Select MCP server (Firecrawl)
- **Action:** Choose tool action:
  - **Scrape:** Extract content from a single URL
  - **Search:** Search the web with a query
  - **Crawl:** Spider entire websites
- **Parameters:** Tool-specific inputs
  - URL for scrape
  - Query for search
  - Depth for crawl

**Firecrawl Actions:**

**Scrape:**
```
URL: {{input.url}}
Format: markdown
```
Output: `{ markdown: "...", html: "...", metadata: {...} }`

**Search:**
```
Query: {{input.query}}
Limit: 10
```
Output: `{ results: [{title, url, snippet}...] }`

**Crawl:**
```
URL: {{input.url}}
Max Pages: 50
```
Output: `{ pages: [{url, content}...] }`

**Accessing Output:**
- `{{lastOutput.markdown}}` - Scraped content
- `{{lastOutput.results}}` - Search results
- `{{lastOutput.pages}}` - Crawled pages

---

### 4. Transform Node

**Purpose:** Manipulate data with JavaScript

**Configuration:**
- **Script:** JavaScript code
- **Available Variables:**
  - `input` - Data from previous node
  - `lastOutput` - Same as input
  - `state` - Entire workflow state

**Security:** All code runs in E2B sandboxes (secure isolated environments)

**Example Scripts:**

**Parse JSON:**
```javascript
return JSON.parse(input.text);
```

**Filter Array:**
```javascript
return input.items.filter(item => item.price > 100);
```

**Transform Data:**
```javascript
return {
  products: input.results.map(r => ({
    name: r.title,
    url: r.link,
    price: parseFloat(r.price)
  }))
};
```

**Extract Values:**
```javascript
return {
  total: input.items.reduce((sum, item) => sum + item.price, 0),
  count: input.items.length
};
```

**Tips:**
- Always return a value
- Use `console.log()` for debugging
- Keep scripts under 5000 characters
- Avoid async operations (use Agent or HTTP nodes instead)

---

### 5. Extract Node

**Purpose:** LLM-powered structured data extraction

**Configuration:**
- **Provider:** LLM for extraction
- **Model:** Specific model
- **Input:** Text to extract from
- **Schema:** JSON schema defining structure
- **Instructions:** Extraction guidelines

**Example - Extract Product Data:**

**Schema:**
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "price": { "type": "number" },
    "description": { "type": "string" },
    "features": {
      "type": "array",
      "items": { "type": "string" }
    }
  }
}
```

**Instructions:**
```
Extract product information from the website content.
Include name, price, description, and key features.
```

**Input:**
```
{{lastOutput.markdown}}
```

**Output:**
```json
{
  "name": "iPhone 15 Pro",
  "price": 999,
  "description": "...",
  "features": ["A17 Pro chip", "Titanium design", "48MP camera"]
}
```

---

### 6. HTTP Node

**Purpose:** Make HTTP API requests

**Configuration:**
- **Method:** GET, POST, PUT, DELETE, PATCH
- **URL:** API endpoint
- **Headers:** Custom headers (authorization, content-type)
- **Body:** Request body (for POST/PUT/PATCH)
- **Authentication:** Bearer token, API key, Basic auth

**Security:** SSRF protection blocks private IPs and cloud metadata

**Example - REST API Call:**

**GET Request:**
```
Method: GET
URL: https://api.example.com/users/{{input.userId}}
Headers:
  Authorization: Bearer {{state.variables.api_token}}
  Content-Type: application/json
```

**POST Request:**
```
Method: POST
URL: https://api.example.com/data
Headers:
  Authorization: Bearer {{env.API_KEY}}
Body:
{
  "name": "{{input.name}}",
  "value": "{{lastOutput.result}}"
}
```

**Access Response:**
- `{{lastOutput.data}}` - Response body
- `{{lastOutput.status}}` - HTTP status code
- `{{lastOutput.headers}}` - Response headers

---

### 7. If/Else Node

**Purpose:** Conditional routing based on expressions

**Configuration:**
- **Condition:** Boolean expression to evaluate
- **True Branch:** Connect to node if condition is true
- **False Branch:** Connect to node if condition is false

**Expression Language:**
- Mathematical: `+`, `-`, `*`, `/`, `%`
- Comparison: `==`, `===`, `!=`, `!==`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`, `!`
- String functions: `toLowerCase()`, `includes()`, `startsWith()`

**Security:** Uses safe expression evaluator (no `eval()` or `Function()`)

**Examples:**

**Simple Comparison:**
```
input.price > 100
```

**String Check:**
```
input.category === "electronics"
```

**Multiple Conditions:**
```
input.price > 100 && input.stock > 0
```

**String Operations:**
```
toLowerCase(input.title).includes("sale")
```

**Check Array Length:**
```
length(input.items) > 5
```

**Type Checking:**
```
isNumber(input.value) && input.value > 0
```

---

### 8. While Loop Node

**Purpose:** Iterate until condition is false

**Configuration:**
- **Condition:** Loop continuation expression
- **Max Iterations:** Safety limit (default: 100)
- **Loop Body:** Nodes to execute each iteration

**Example - Paginate API:**

**Condition:**
```
state.variables.hasMorePages && state.variables.pageNum < 10
```

**Loop Body:**
1. HTTP node (fetch page)
2. Transform (extract hasMorePages, increment pageNum)
3. Continue loop

**Tips:**
- Always have an exit condition
- Use max iterations as safety net
- Track iteration count in state
- Be mindful of rate limits

---

### 9. User Approval Node

**Purpose:** Human-in-the-loop workflow pausing

**Configuration:**
- **Approval Message:** Question for user
- **Context:** Data to show for decision
- **Timeout:** Auto-reject after duration (optional)

**Example Use Cases:**
- Review before posting to social media
- Confirm before deleting data
- Verify extracted information
- Approve expense/transaction

**Workflow:**
1. Workflow reaches approval node
2. Execution pauses
3. User receives notification
4. User reviews and approves/rejects
5. Workflow continues based on decision

**Access Approval:**
```
{{lastOutput.approved}}  // true or false
{{lastOutput.comment}}   // User's comment
```

---

### 10. Set State Node

**Purpose:** Store values in workflow state

**Configuration:**
- **Key:** Variable name
- **Value:** Value to store
- **Type:** string, number, json, boolean, expression

**Examples:**

**Store String:**
```
Key: userId
Value: 12345
Type: string
```

**Store Number:**
```
Key: total
Value: 999.99
Type: number
```

**Store from Expression:**
```
Key: itemCount
Value: length(input.items)
Type: expression
```

**Store JSON:**
```
Key: config
Value: {"theme": "dark", "lang": "en"}
Type: json
```

**Access Later:**
```
{{state.variables.userId}}
{{state.variables.total}}
```

---

### 11. End Node

**Purpose:** Workflow completion and output

**Configuration:**
- **Output:** Final result to return
- **Success Status:** true/false
- **Metadata:** Additional information

**Example:**
```
Output: {{lastOutput.summary}}
Success: true
Metadata: {"processed": {{state.variables.count}}}
```

---

## Advanced Features

### Variable Substitution

Reference data from anywhere in your workflow:

**Syntax:**
```
{{expression}}
```

**Available Contexts:**
- `{{input}}` - Start node inputs
- `{{lastOutput}}` - Previous node output
- `{{state.variables.nodeId}}` - Specific node output
- `{{env.VAR_NAME}}` - Environment variables (admin only)

**Examples:**
```
{{input.url}}
{{lastOutput.markdown}}
{{state.variables.scrape_website.title}}
{{input.items[0].price}}
```

**Nested Access:**
```
{{lastOutput.results[0].title}}
{{state.variables.data.users[2].email}}
```

---

### MCP Server Registry

Add custom MCP servers for extended functionality:

1. Go to **Settings** → **MCP Registry**
2. Click **Add MCP Server**
3. Configure:
   - **Name:** Server identifier
   - **URL:** MCP server endpoint
   - **Authentication:** API key or token
4. **Test Connection** to verify
5. **Save**

**Using Custom MCP Server:**
1. Add Agent node
2. Enable MCP Tools
3. Select your custom server
4. Agent can now call your custom tools

---

### Workflow Templates

Save time with pre-built templates:

**Available Templates:**
1. **Simple Web Scraper** - Scrape and summarize websites
2. **Web Search & Research** - Search, scrape, synthesize findings
3. **Price Tracker** - Monitor product prices across sites
4. **Content Research** - Deep research with citations
5. **Competitive Analysis** - Multi-company research & comparison

**Using Templates:**
1. Click **Templates** on dashboard
2. Browse available templates
3. Click **Use Template**
4. Customize for your needs
5. Save as your own workflow

**Creating Template from Workflow:**
1. Open your workflow
2. Click **Settings** → **Save as Template**
3. Add description and category
4. Template appears in library

---

### API Key Management

#### User API Keys

Manage your own API keys:

1. **Settings** → **API Keys**
2. **Add Key:**
   - Choose provider (Anthropic, OpenAI, Groq)
   - Enter API key
   - Optional: Add label
3. **Edit/Delete:**
   - Click on key
   - Update or remove

**Security:**
- Keys encrypted with AES-256-GCM
- Never shown after initial save
- Prefix displayed for identification
- Can be rotated anytime

#### API Keys for Programmatic Access

Generate keys to call workflows from your app:

1. **Settings** → **API Keys** → **Generate API Key**
2. **Name:** Descriptive name
3. **Copy key** (shown only once!)
4. Use in API calls:

```bash
curl -X POST https://your-domain.com/api/workflows/workflow-id/execute \
  -H "Authorization: Bearer sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

---

### Real-Time Execution Streaming

Watch workflows execute in real-time:

**Execution Panel Events:**
- 🟢 **workflow_started** - Execution begins
- 🔵 **node_started** - Node begins processing
- ✅ **node_completed** - Node finishes successfully
- ❌ **node_failed** - Node encounters error
- ✅ **workflow_completed** - Workflow done
- ❌ **error** - Fatal error occurred

**Reading Logs:**
```
[12:34:56] workflow_started
[12:34:57] node_started: scrape_website
[12:35:02] node_completed: scrape_website (5.2s)
[12:35:02] node_started: ai_summary
[12:35:08] node_completed: ai_summary (6.1s)
[12:35:08] workflow_completed (11.3s total)
```

---

## Best Practices

### Workflow Design

1. **Start Simple** - Build incrementally, test often
2. **Use Descriptive Names** - Name nodes clearly (e.g., "scrape_homepage", not "node_1")
3. **Add Comments** - Use Note nodes to document complex logic
4. **Handle Errors** - Add error branches and fallbacks
5. **Test with Real Data** - Use actual inputs, not placeholder data

### Performance

1. **Minimize HTTP Requests** - Batch API calls when possible
2. **Cache Results** - Store frequently used data in state
3. **Limit Loop Iterations** - Set reasonable max iterations
4. **Use Appropriate Models** - Claude Haiku for speed, Sonnet for quality
5. **Optimize Prompts** - Shorter prompts = faster responses

### Security

1. **Never Hardcode Secrets** - Use environment variables or user API keys
2. **Validate Inputs** - Check data before processing
3. **Review Approvals** - Don't skip human-in-the-loop for critical operations
4. **Limit API Access** - Use API key rotation
5. **Monitor Usage** - Watch for unusual patterns

### Cost Optimization

1. **Choose Right Model** - Haiku ($0.25/MTok) vs Sonnet ($3/MTok)
2. **Minimize Token Usage** - Shorter prompts and responses
3. **Cache Common Results** - Store frequently used data
4. **Use Rate Limiting** - Prevent runaway executions
5. **Monitor Spend** - Track API usage in provider dashboards

---

## Troubleshooting

### Common Issues

#### "E2B_API_KEY is required"

**Problem:** Transform node fails with this error

**Solution:**
1. Get E2B API key at https://e2b.dev
2. Add to `.env.local`: `E2B_API_KEY=your_key`
3. Restart application
4. Verify: `node scripts/verify-security-setup.js`

---

#### "Rate limit exceeded"

**Problem:** Too many requests in short time

**Solution:**
- Wait 60 seconds and try again
- Check rate limits (10 executions/min per user)
- Consider upgrading if needs increase

---

#### "SSRF Protection: ..."

**Problem:** HTTP node blocked request

**Solution:**
- Blocked URL is private IP or cloud metadata
- Use only public URLs
- If needed, add to whitelist: `ALLOWED_HTTP_DOMAINS`

---

#### "Agent execution failed"

**Problem:** LLM agent encounters error

**Solutions:**
1. **Check API Key:** Verify in Settings → API Keys
2. **Check Model:** Ensure model is available (e.g., Claude Sonnet 4.5)
3. **Check Input:** Verify input data is valid
4. **Check Prompt:** Simplify instructions if too complex
5. **Check Token Limit:** Reduce max tokens if needed

---

#### "MCP server not available"

**Problem:** MCP tool call fails

**Solutions:**
1. **Use Anthropic:** Claude has native MCP support
2. **Check Firecrawl Key:** Verify FIRECRAWL_API_KEY is set
3. **Test Connection:** Settings → MCP Registry → Test
4. **Check URL:** Verify MCP server URL is correct

---

#### Workflow doesn't save

**Problem:** Changes not persisting

**Solutions:**
1. Check internet connection
2. Verify Convex is running (`npx convex dev`)
3. Check browser console for errors
4. Try refreshing page
5. Contact support if persists

---

### Getting Help

1. **Documentation** - Read this manual and SECURITY.md
2. **Examples** - Try template workflows
3. **Verification** - Run `node scripts/verify-security-setup.js`
4. **GitHub Issues** - Report bugs at repository
5. **Community** - Join Discord/Slack for support

---

## FAQ

### General

**Q: Is Open Agent Builder free?**
A: The platform is open source. You pay for:
- LLM API usage (Anthropic, OpenAI, Groq)
- Firecrawl API usage
- E2B sandbox usage
- Hosting costs

**Q: Can I use my own API keys?**
A: Yes! Add your keys in Settings → API Keys. This way you control costs and quotas.

**Q: What LLM providers are supported?**
A: Anthropic Claude, OpenAI GPT, and Groq models.

**Q: Which provider should I use?**
A: Anthropic Claude for MCP tools, OpenAI or Groq for other tasks.

---

### Workflows

**Q: How many nodes can a workflow have?**
A: No hard limit, but keep under 50 for performance.

**Q: Can I export/import workflows?**
A: Yes! Settings → Export as JSON, then Import on another account.

**Q: Can workflows call other workflows?**
A: Not yet, but it's on the roadmap.

**Q: How long can a workflow run?**
A: No time limit, but consider performance and costs.

---

### Security

**Q: Are my API keys secure?**
A: Yes! Encrypted with AES-256-GCM, never shown after save.

**Q: Is user code execution safe?**
A: Yes! All transform nodes run in E2B cloud sandboxes.

**Q: Can workflows access my local network?**
A: No! SSRF protection blocks private IPs.

**Q: How is rate limiting enforced?**
A: 10 workflow executions per minute per user.

---

### Pricing

**Q: What does Firecrawl cost?**
A: Check https://firecrawl.dev/pricing - free tier available.

**Q: What does Anthropic Claude cost?**
A: Haiku: $0.25/MTok, Sonnet: $3/MTok. See https://anthropic.com/pricing

**Q: What does E2B cost?**
A: Free tier available, paid plans from $10/mo. See https://e2b.dev/pricing

**Q: How can I reduce costs?**
A: Use Claude Haiku, optimize prompts, cache results, batch operations.

---

### Development

**Q: Can I contribute to the project?**
A: Yes! Open source contributions welcome on GitHub.

**Q: Can I self-host?**
A: Yes! Follow README.md setup instructions.

**Q: Can I white-label it?**
A: Yes! MIT licensed - modify as needed.

**Q: How do I add custom node types?**
A: See CLAUDE.md development guide.

---

## Quick Reference Card

### Keyboard Shortcuts
- **Ctrl/Cmd + S** - Save workflow
- **Ctrl/Cmd + R** - Run workflow
- **Delete** - Delete selected node
- **Ctrl/Cmd + Z** - Undo
- **Ctrl/Cmd + Y** - Redo

### Variable Syntax
- `{{input.field}}` - Start node input
- `{{lastOutput}}` - Previous node output
- `{{state.variables.nodeId}}` - Specific node output
- `{{lastOutput.data[0].value}}` - Nested access

### Node Connection Rules
- **Start** → Any node
- **Agent/Transform/Extract/HTTP** → Any node
- **If/Else** → Two branches (if/else)
- **While** → Loop body + exit
- **Any node** → End

### Common Patterns

**Scrape & Summarize:**
```
Start → MCP (Scrape) → Agent (Summarize) → End
```

**Search & Extract:**
```
Start → MCP (Search) → Loop (Scrape Each) → Agent (Synthesize) → End
```

**API Integration:**
```
Start → HTTP (Fetch) → Transform (Parse) → Agent (Process) → HTTP (Post) → End
```

**Conditional Processing:**
```
Start → If/Else (Check Condition) → [Branch 1 / Branch 2] → End
```

---

## Changelog

### Version 1.0 (November 2025)
- ✅ Enterprise security features (AES-256, E2B sandboxing, SSRF protection)
- ✅ Rate limiting (10 executions/min)
- ✅ Safe expression evaluation
- ✅ Prototype pollution protection
- ✅ Secure random generation
- ✅ Authorization checks
- ✅ Comprehensive documentation

---

## Support

**Need help?**
- 📖 Read documentation in `/docs`
- 🐛 Report bugs on GitHub
- 💬 Join community Discord/Slack
- 📧 Email support@your-domain.com

**Found a security issue?**
- 🚨 Email security@your-domain.com
- ❌ Do NOT open public GitHub issue

---

**Happy building! 🚀**
