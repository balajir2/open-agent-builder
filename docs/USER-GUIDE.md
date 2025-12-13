# Open Agent Builder - User Guide

**Version 1.0** | Last Updated: December 2024

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Signing In](#signing-in)
3. [Creating Your First Workflow](#creating-your-first-workflow)
4. [Understanding Node Types](#understanding-node-types)
5. [Running Workflows](#running-workflows)
6. [Using Templates](#using-templates)
7. [Sharing Workflows](#sharing-workflows)
8. [Advanced Features](#advanced-features)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

Open Agent Builder is a visual workflow builder that lets you create AI-powered automation workflows without writing code. You can build workflows that scrape websites, process data, make AI-powered decisions, and integrate with external services.

### What You Can Do

- **Build Visual Workflows**: Drag and drop nodes to create complex automation
- **AI-Powered Agents**: Use Claude, GPT-4, Gemini, or Groq models
- **Web Scraping**: Extract data from any website using Firecrawl
- **Data Processing**: Transform and manipulate data with built-in tools
- **Conditional Logic**: Add if/else conditions and loops
- **Human Approval**: Add checkpoints for manual review
- **API Integration**: Connect to external services via HTTP requests

---

## Signing In

### First Time Login

1. Navigate to the application URL provided by your administrator
2. Click **"Continue with Microsoft"** button
3. Sign in with your Microsoft/Azure AD credentials
4. Grant permissions when prompted
5. You'll be redirected to the home page

![Sign In Screen](./images/sign-in.png)

### Your Profile

Once signed in, you'll see your profile in the top-right corner showing:
- Your name
- Your email address
- Profile avatar with your initials

Click on your profile to:
- View your account details
- Access profile settings
- Sign out

---

## Creating Your First Workflow

### Starting from Scratch

1. **Click "Create Workflow"** on the home page
2. You'll see a canvas with a **Start** node
3. Click the **"+ Add Node"** button or drag from an existing node
4. Select a node type from the menu
5. Configure the node by clicking on it
6. Connect nodes by dragging from one node's output to another's input
7. Click **"Save"** to save your workflow

### Workflow Canvas Controls

- **Zoom In/Out**: Use mouse wheel or zoom controls
- **Pan**: Click and drag on empty space
- **Select Node**: Click on any node
- **Delete Node**: Select node and press Delete key
- **Connect Nodes**: Drag from a node's connector to another node

---

## Understanding Node Types

### Core Nodes

#### 1. **Start Node**
- **Purpose**: Entry point for every workflow
- **Configuration**: Define input variables
- **Example**: `url`, `topic`, `query`

#### 2. **Agent Node**
- **Purpose**: AI-powered reasoning and decision making
- **Models Available**:
  - Claude (Haiku 4.5, Sonnet 4.5, Opus 4.5)
  - GPT-4o, GPT-4o-mini
  - Gemini 2.0 Flash
  - Groq (Llama 3.3 70B)
- **Configuration**:
  - **Instructions**: Tell the AI what to do
  - **Model**: Choose your AI model
  - **Temperature**: Control randomness (0-1)
  - **Token Limit**: Maximum response length
  - **Tools**: Enable web search, code execution, etc.

**Example Use Cases**:
- Analyze scraped content
- Generate summaries
- Make decisions based on data
- Extract structured information

#### 3. **MCP (Tool) Node**
- **Purpose**: Execute specific tools like web scraping
- **Available Tools**:
  - **Firecrawl Scrape**: Extract content from a URL
  - **Firecrawl Map**: Discover all pages on a website
  - **Tavily Search**: Web search with AI
  - **E2B Code Interpreter**: Run Python code safely

**Example Configuration**:
```
Tool: Firecrawl Scrape
URL: {{url}} (variable from previous node)
Format: Markdown
```

#### 4. **Extract Node**
- **Purpose**: Pull structured data from unstructured content
- **Configuration**:
  - **Content**: Input text to extract from
  - **Schema**: Define what fields to extract (JSON)
  - **Model**: Choose extraction model

**Example Schema**:
```json
{
  "title": "Article title",
  "author": "Author name",
  "date": "Publication date",
  "summary": "Brief summary"
}
```

#### 5. **HTTP Node**
- **Purpose**: Make API calls to external services
- **Methods**: GET, POST, PUT, DELETE, PATCH
- **Configuration**:
  - **URL**: API endpoint
  - **Headers**: Authorization, Content-Type, etc.
  - **Body**: Request payload (for POST/PUT)

#### 6. **Transform Node**
- **Purpose**: Manipulate data with JavaScript
- **Features**:
  - Full JavaScript support
  - Access to input variables
  - Safe execution environment

**Example**:
```javascript
// Access input variables
const text = input.content;

// Transform data
const words = text.split(' ').length;
const uppercase = text.toUpperCase();

// Return results
return {
  wordCount: words,
  transformed: uppercase
};
```

#### 7. **If/Else Node**
- **Purpose**: Branch workflow based on conditions
- **Condition Examples**:
  - `price < 100`
  - `status === "success"`
  - `items.length > 0`

#### 8. **While Loop Node**
- **Purpose**: Repeat actions until a condition is met
- **Configuration**:
  - **Condition**: When to continue looping
  - **Max Iterations**: Safety limit (default: 10)

#### 9. **User Approval Node**
- **Purpose**: Pause workflow for human review
- **Use Cases**:
  - Review AI-generated content before publishing
  - Approve expensive operations
  - Verify extracted data accuracy

#### 10. **End Node**
- **Purpose**: Mark workflow completion
- **Optional**: Add final output message

---

## Running Workflows

### Execution Panel

1. Click **"Run"** button in the top-right
2. The Execution Panel opens on the right side
3. Enter values for any input variables
4. Click **"Execute Workflow"**
5. Watch real-time execution progress

### Understanding Execution

**Node States**:
- 🔵 **Pending**: Not yet executed
- 🟡 **Running**: Currently executing
- 🟢 **Completed**: Successfully finished
- 🔴 **Failed**: Encountered an error

**Viewing Results**:
- Click on any completed node to see its output
- View execution time and token usage
- Check logs in the browser console for detailed information

### Handling Approvals

When a workflow reaches a **User Approval** node:
1. Workflow pauses automatically
2. You receive a notification (if configured)
3. Review the data presented
4. Click **"Approve"** or **"Reject"**
5. Workflow continues or stops based on your decision

---

## Using Templates

### Pre-built Templates

Access ready-made workflows from the home page:

1. **Simple Web Scraper**
   - Scrapes a single URL
   - Extracts content with AI
   - Returns structured data

2. **Web Search & Analysis**
   - Searches the web with Tavily
   - Analyzes results with AI
   - Generates summary report

3. **Price Tracker**
   - Monitors product prices
   - Compares against threshold
   - Sends alerts when conditions met

4. **Content Research**
   - Discovers pages on a website
   - Scrapes multiple URLs
   - Aggregates and summarizes content

### Using a Template

1. Click on a template from the home page
2. Template loads in the workflow builder
3. Customize nodes as needed
4. Save with a new name
5. Run your customized workflow

---

## Sharing Workflows

### Team Workflows

Make your workflows available to your team:

1. Open a workflow you own
2. Click **"Share"** button (coming soon)
3. Set permissions:
   - **View Only**: Team can see but not edit
   - **Can Execute**: Team can run the workflow
   - **Can Edit**: Team can modify the workflow

### Workflow Library

Access workflows shared by your team:

1. Go to home page
2. Click **"Team Workflows"** tab
3. Browse available workflows
4. Click to open and use

---

## Advanced Features

### Using Variables

Variables pass data between nodes:

**Syntax**: `{{variableName}}`

**Examples**:
```
URL: {{scrapeResult.url}}
Content: {{agent.output}}
Price: {{extract.price}}
```

**Special Variables**:
- `{{input}}`: All input variables
- `{{lastOutput}}`: Output from previous node
- `{{state.variableName}}`: Global workflow state

### Tool Integration

#### Adding Tools to Agents

1. Open Agent node configuration
2. Scroll to **"Tools"** section
3. Select tools to enable:
   - **Web Search**: Tavily or Serper search
   - **Code Interpreter**: Execute Python code
   - **Firecrawl**: Web scraping

#### MCP Server Configuration

Add custom MCP servers (admin feature):

1. Go to Settings → MCP Servers
2. Click **"Add Server"**
3. Configure:
   - **Name**: Server identifier
   - **Type**: SSE, HTTP, or stdio
   - **URL/Command**: Connection details
4. Available tools appear in Tool nodes

### Token Limits

Control AI response length:

1. Open Agent/Extract node
2. Go to **"Advanced"** section
3. Set **Token Limit** (e.g., 200, 500, 4096)
4. Note: This controls **output tokens only**

**Understanding Token Usage**:
- **Input Tokens**: Your prompt + context
- **Output Tokens**: AI's response (limited by setting)
- **Total Tokens**: Input + Output (billed amount)

---

## Troubleshooting

### Common Issues

#### Workflow Won't Save
**Symptoms**: Changes don't persist, error message on save

**Solutions**:
1. Check browser console for errors
2. Verify you're signed in (check top-right profile)
3. Refresh page and try again
4. Contact administrator if issue persists

#### Node Execution Fails
**Symptoms**: Red error state, "Failed" message

**Solutions**:
1. Click on failed node to see error details
2. Common issues:
   - Invalid URL format
   - Missing required variables
   - API key not configured (contact admin)
   - Timeout (increase in node settings)

#### Variables Not Working
**Symptoms**: `{{variable}}` appears as literal text

**Solutions**:
1. Check variable name spelling
2. Ensure previous node completed successfully
3. Verify variable exists in previous node output
4. Use correct syntax: `{{nodeName.fieldName}}`

#### Workflow Runs But No Output
**Symptoms**: Workflow completes but results are empty

**Solutions**:
1. Check each node's output by clicking on it
2. Verify input variables have values
3. Review agent instructions for clarity
4. Check if conditions in if/else nodes are correct

### Getting Help

1. **Documentation**: Review this guide and architecture docs
2. **Console Logs**: Open browser developer tools (F12) → Console
3. **Administrator**: Contact your system administrator
4. **Issue Report**: Provide:
   - Workflow ID
   - Node that failed
   - Error message
   - Screenshot if possible

---

## Best Practices

### Workflow Design

1. **Start Simple**: Build and test incrementally
2. **Use Descriptive Names**: Name nodes clearly (e.g., "Scrape Product Page")
3. **Add Notes**: Use Note nodes to document complex logic
4. **Test Often**: Run workflow after adding each major node
5. **Handle Errors**: Add error checking in Transform nodes

### Performance Tips

1. **Minimize API Calls**: Combine operations where possible
2. **Set Token Limits**: Control costs by limiting AI response length
3. **Use Efficient Models**:
   - Development: Haiku 4.5 (fast, cheap)
   - Production: Sonnet 4.5 (balanced)
   - Complex tasks: Opus 4.5 (powerful)

### Security

1. **Never Share Credentials**: Don't hardcode API keys in workflows
2. **Review Approvals Carefully**: Always verify data at approval nodes
3. **Limit Shared Workflows**: Only share with trusted team members
4. **Report Suspicious Activity**: Contact administrator immediately

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save Workflow | `Ctrl/Cmd + S` |
| Delete Node | `Delete` or `Backspace` |
| Undo | `Ctrl/Cmd + Z` |
| Redo | `Ctrl/Cmd + Shift + Z` |
| Zoom In | `Ctrl/Cmd + +` |
| Zoom Out | `Ctrl/Cmd + -` |
| Fit to Screen | `Ctrl/Cmd + 0` |

---

## Glossary

- **Agent**: An AI-powered node that can reason and make decisions
- **MCP**: Model Context Protocol - standard for tool integration
- **Node**: A single step or operation in a workflow
- **Token**: Unit of text processed by AI models (~4 characters)
- **Variable**: Data passed between nodes in a workflow
- **Workflow**: A sequence of connected nodes that automate a task

---

## Appendix: Example Workflows

### A. Daily News Summary

```
Start (topic: "AI Technology")
  → Web Search (query: {{topic}})
  → Agent (summarize search results)
  → End (output: {{agent.summary}})
```

### B. Competitive Price Monitor

```
Start (productUrl: "...")
  → Scrape Product Page
  → Extract Price & Title
  → If price < targetPrice
      → Send Alert Email (HTTP Node)
  → End
```

### C. Content Research Pipeline

```
Start (website: "example.com")
  → Firecrawl Map (discover all pages)
  → While hasMorePages
      → Scrape Next Page
      → Extract Key Info
      → Store in results
  → Agent (analyze all content)
  → User Approval (review summary)
  → End
```

---

**Need More Help?**

Contact your system administrator or refer to:
- [Architecture Documentation](./ARCHITECTURE.md)
- [System Administration Guide](./ADMIN-GUIDE.md)
- [GitHub Repository](https://github.com/your-org/open-agent-builder)
