# Open Agent Builder - User Guide

**Your Visual AI Workflow Builder**

**Version 2.1** | Last Updated: February 2026

---

## Table of Contents

1. [What is Open Agent Builder?](#what-is-open-agent-builder)
2. [Getting Started](#getting-started)
3. [Building Your First Workflow](#building-your-first-workflow)
4. [Node Types Explained](#node-types-explained)
5. [Working with Variables](#working-with-variables)
6. [AI Agents & Tools](#ai-agents--tools)
7. [Web Scraping & Data Collection](#web-scraping--data-collection)
8. [Control Flow (Loops & Conditions)](#control-flow-loops--conditions)
9. [Human Approval Workflows](#human-approval-workflows)
10. [UI Builder](#ui-builder)
11. [Sharing & Exporting Workflows](#sharing--exporting-workflows)
12. [Templates & Examples](#templates--examples)
13. [Best Practices](#best-practices)
14. [Troubleshooting](#troubleshooting)
15. [FAQ](#faq)

---

## What is Open Agent Builder?

Open Agent Builder is a **visual drag-and-drop platform** for creating AI-powered automation workflows. Think of it as a flowchart where each box (node) performs a specific action, and you connect them to create powerful automations - **no coding required**.

### What Can You Build?

| Use Case | Example |
|----------|---------|
| **Research Automation** | Gather company information from multiple websites automatically |
| **Content Generation** | Create reports, summaries, or presentations from raw data |
| **Data Extraction** | Pull structured data from websites into spreadsheets |
| **Multi-Step Analysis** | Compare products, analyze competitors, or track prices |
| **Approval Workflows** | Automate processes that need human review before proceeding |
| **API Integrations** | Connect to external services and automate data flow |

### Key Benefits

| Benefit | Description |
|---------|-------------|
| **No Coding Required** | Build complex workflows visually with drag-and-drop |
| **AI-Powered** | Leverage Claude, GPT-4, Gemini, and Groq AI models |
| **Real-Time Execution** | Watch your workflow run step-by-step |
| **Web Scraping Built-In** | Extract data from any website with Firecrawl |
| **Human-in-the-Loop** | Add approval checkpoints where needed |
| **Reusable Templates** | Start from pre-built examples |
| **Custom UIs** | Build forms for your workflows with UI Builder |

---

## Getting Started

### Signing In

1. Navigate to the Open Agent Builder URL provided by your administrator
2. Click **"Continue with Microsoft"** button
3. Sign in with your Microsoft/Azure AD credentials
4. Grant permissions when prompted
5. You'll be redirected to the home page

### Dashboard Overview

```
+---------------------------------------------------------------+
|  Open Agent Builder                          [Settings] [?]   |
+---------------------------------------------------------------+
|                                                               |
|  My Workflows                          [+ New Workflow]       |
|  +-------------+  +-------------+  +-------------+            |
|  | Company     |  | Stock       |  | Product     |            |
|  | Research    |  | Analysis    |  | Comparison  |            |
|  |             |  |             |  |             |            |
|  | Last run:   |  | Last run:   |  | Last run:   |            |
|  | 2 hours ago |  | Yesterday   |  | 1 week ago  |            |
|  +-------------+  +-------------+  +-------------+            |
|                                                               |
|  Templates                                                    |
|  +-------------+  +-------------+  +-------------+            |
|  | Yahoo       |  | Multi-Stock |  | Amazon      |            |
|  | Finance     |  | Analysis    |  | Research    |            |
|  +-------------+  +-------------+  +-------------+            |
|                                                               |
+---------------------------------------------------------------+
```

### Your Profile

Click on your profile (top-right) to:
- View your account details
- Access Settings (API keys, preferences)
- Sign out

### Setting Up Your API Keys (Optional)

✅ **No API keys required!** Your administrator has configured system-wide keys that work for all users automatically.

🔧 **Want to use your own keys?** You can optionally add your own API keys:

1. Click **Settings** in the top navigation
2. Go to the **API Keys** section
3. Add keys for the services you want to use:
   - **Anthropic** - For Claude AI models
   - **OpenAI** - For GPT-4 models
   - **Google Gemini** - For Gemini models
   - **Groq** - For fast inference
   - **Firecrawl** - For web scraping
   - **E2B** - For code execution
   - **Tavily** - For web search
   - **Arcade** - For browser automation
   - **Gamma AI** - For presentation generation

**Benefits of adding your own keys:**
- Use your own API quotas instead of shared system quotas
- Track your individual API usage
- Use specific accounts or organizations

> **Note:** Personal keys take priority over system keys when provided. You can remove your keys anytime to fall back to system keys.

---

## Building Your First Workflow

### Step 1: Create a New Workflow

1. Click **+ New Workflow** on the dashboard
2. Give your workflow a name (e.g., "Company Research")
3. You'll see the workflow canvas with a **Start** node

### Step 2: Understanding the Canvas

```
+----------------------------------------------------------------+
| [Node Palette] |         Canvas              | [Properties]    |
|                |                             |                 |
|  o Agent       |    +-------+               |  Node: Start    |
|  o Web Scrape  |    | Start |               |                 |
|  o Extract     |    +---+---+               |  Inputs:        |
|  o Transform   |        |                   |  + Add Input    |
|  o HTTP        |        v                   |                 |
|  o Condition   |    +-------+               |                 |
|  o Loop        |    |  End  |               |                 |
|  o Approval    |    +-------+               |                 |
|                |                             |                 |
+----------------------------------------------------------------+
```

- **Left Panel**: Node types you can drag onto the canvas
- **Center**: Your workflow canvas where you build
- **Right Panel**: Properties for the selected node

### Step 3: Add Your First Agent

1. Drag an **Agent** node from the left panel onto the canvas
2. Connect **Start** to **Agent** (click and drag from bottom connector)
3. Click on the Agent node to configure:

```
Agent Configuration
-------------------
Label: Research Agent

Instructions:
+--------------------------------------------+
| You are a research assistant. Analyze the  |
| company {{input.company_name}} and provide |
| a summary of their business, products, and |
| recent news.                               |
+--------------------------------------------+

AI Model: Claude Sonnet 4.5  [dropdown]

Tools: [x] Firecrawl (Web Scraping)
```

### Step 4: Define Input Variables

1. Click on the **Start** node
2. Add an input variable:
   - **Name**: `company_name`
   - **Type**: Text
   - **Description**: "The company to research"

### Step 5: Connect to End

1. Drag a connection from Agent to **End** node
2. Workflow auto-saves (or click **Save**)

### Step 6: Run Your Workflow

1. Click the **Run** button (top-right)
2. Enter a value for `company_name` (e.g., "Anthropic")
3. Watch the execution in real-time!

---

## Node Types Explained

### Overview Table

| Category | Node | Purpose |
|----------|------|---------|
| **Input/Output** | Start | Define workflow inputs |
| | End | Mark workflow completion |
| **AI Processing** | Agent | AI reasoning with tools |
| | Extract | Pull structured data from text |
| **Data Collection** | MCP (Web Scrape) | Fetch website content |
| | HTTP Request | Call external APIs |
| **Data Processing** | Transform | Manipulate data with code |
| | Set Variable | Store values for later |
| **Control Flow** | If/Else | Branch based on conditions |
| | While Loop | Repeat actions |
| | User Approval | Pause for human review |
| **Integration** | Arcade | Third-party app tools |
| | Gamma AI | Generate presentations |
| **Utility** | Note | Add comments (not executed) |

---

### Input/Output Nodes

#### Start Node
- **Purpose**: Entry point - define your input variables here
- **Configuration**: Add variables with name, type, and description
- **Example Variables**: `company_name`, `url`, `topic`, `max_results`

#### End Node
- **Purpose**: Exit point - workflow completes here
- **Configuration**: Optional final output message

---

### AI Processing Nodes

#### Agent Node
The most powerful node - an AI assistant that can reason, search, and use tools.

**Configuration Options:**

| Setting | Description | Example |
|---------|-------------|---------|
| **Label** | Name shown in workflow | "Research Agent" |
| **Instructions** | What the AI should do | "Analyze the company..." |
| **AI Model** | Which AI to use | Claude Sonnet 4.5 |
| **Temperature** | Creativity (0-1) | 0.7 |
| **Max Tokens** | Response length limit | 4096 |
| **Tools** | Enabled capabilities | Firecrawl, Tavily |
| **Output Format** | Text or JSON | JSON |
| **Output Schema** | Structure for JSON | `{name, summary}` |

**Available AI Models:**

| Model | Best For | Speed | Cost |
|-------|----------|-------|------|
| **Claude Sonnet 4.5** | General tasks, analysis | Fast | Medium |
| **Claude Haiku 4.5** | Simple tasks | Very Fast | Low |
| **Claude Opus 4.6** | Complex reasoning, 1M context | Medium | High |
| **GPT-5.2** | Latest flagship model | Medium | High |
| **GPT-4.5** | General tasks | Medium | Medium |
| **o3** | Advanced reasoning | Medium | High |
| **Gemini 3 Pro Preview** | Latest Google model | Fast | Medium |
| **Gemini 3 Flash** | Fast responses | Very Fast | Low |
| **Gemini 2.5 Pro** | Stable production | Medium | Medium |
| **Llama 4 Maverick (Groq)** | Latest Llama flagship | Very Fast | Low |
| **Llama 4 Scout (Groq)** | Fast inference | Very Fast | Low |

**Example Instructions:**
```
You are a market research assistant.

Analyze {{input.company_name}} and provide:
1. Company overview (what they do)
2. Key products or services
3. Recent news or developments
4. Competitors

Use the web scraping tool to visit their website if needed.

Return your analysis in a clear, structured format.
```

#### Extract Node
Pull structured data from text using AI - faster and cheaper than a full Agent.

**Configuration:**
- **Content**: Text to extract from (use `{{lastOutput}}`)
- **Schema**: JSON structure defining what to extract
- **Model**: AI model for extraction

**Example Schema:**
```json
{
  "company_name": "string - The company's official name",
  "founded_year": "number - Year the company was founded",
  "headquarters": "string - City and country of headquarters",
  "products": "array - List of main products or services",
  "revenue": "string - Latest revenue figures if available"
}
```

---

### Data Collection Nodes

#### MCP (Web Scrape) Node
Connect to Firecrawl for website data extraction.

**Available Actions:**

| Action | Purpose | Use When |
|--------|---------|----------|
| **Scrape** | Get content from one URL | You know the exact page |
| **Search** | Search and get results | Looking for information |
| **Map** | Get all URLs on a site | Discovering page structure |
| **Crawl** | Scrape multiple pages | Need entire site content |

**Configuration Example (Scrape):**
```
Action: Scrape
URL: https://{{input.company_name}}.com/about
Output Format: Markdown
Output Variable: company_info
```

**Configuration Example (Search):**
```
Action: Search
Query: {{input.company_name}} latest news 2025
Limit: 5 results
Output Variable: news_results
```

#### HTTP Request Node
Call external APIs directly.

**Configuration:**
- **Method**: GET, POST, PUT, DELETE, PATCH
- **URL**: API endpoint (supports variables)
- **Headers**: Authentication, Content-Type, etc.
- **Body**: Request payload for POST/PUT

**Example:**
```
Method: POST
URL: https://api.example.com/data
Headers:
  Authorization: Bearer {{variables.api_key}}
  Content-Type: application/json
Body:
  {
    "query": "{{input.search_term}}"
  }
```

---

### Data Processing Nodes

#### Transform Node
Manipulate data using JavaScript - runs in a secure sandbox.

**Example:**
```javascript
// Access data from previous nodes
const data = input.lastOutput;

// Process the data
const companies = data.results.map(item => ({
  name: item.company_name,
  score: item.rating * 10,
  status: item.rating > 4 ? 'excellent' : 'good'
}));

// Sort by score
companies.sort((a, b) => b.score - a.score);

// Return results
return {
  topCompanies: companies.slice(0, 5),
  totalCount: companies.length,
  averageScore: companies.reduce((a, b) => a + b.score, 0) / companies.length
};
```

#### Set Variable Node
Store a value for use later in the workflow.

**Configuration:**
- **Variable Name**: What to call it
- **Value**: The value to store (supports variables)

**Example:**
```
Variable Name: iteration_count
Value: {{variables.iteration_count}} + 1
```

---

### Control Flow Nodes

#### If/Else Node
Branch your workflow based on conditions.

```
              +----------+
              |  Agent   |
              +----+-----+
                   |
                   v
              +----------+     True     +--------------+
              | If/Else  |------------->| Send Report  |
              +----+-----+              +--------------+
                   | False
                   v
              +----------+
              |   Skip   |
              +----------+
```

**Condition Syntax:**

| Condition | Meaning |
|-----------|---------|
| `{{lastOutput.score}} > 80` | Score greater than 80 |
| `{{variables.count}} < 10` | Count less than 10 |
| `{{input.type}} == "premium"` | Type equals "premium" |
| `{{lastOutput.items}}.length > 0` | Items array not empty |

**Supported Operators:**
- `==` Equal to
- `!=` Not equal to
- `>` Greater than
- `<` Less than
- `>=` Greater or equal
- `<=` Less or equal

#### While Loop Node
Repeat actions until a condition is met.

```
              +-------------+
              | While Loop  |<---------+
              | count < 5   |          |
              +------+------+          |
                     |                 |
                     v                 |
              +-------------+          |
              | Process     |----------+
              | Item        |
              +-------------+
```

**Configuration:**

| Setting | Description | Example |
|---------|-------------|---------|
| **Condition** | When to continue | `{{variables.i}} < {{input.count}}` |
| **Max Iterations** | Safety limit | 10 (max: 100) |

**Loop Results:** Results from each iteration are automatically collected in `{{loopResults}}`.

#### User Approval Node
Pause workflow for human review before continuing.

**Configuration:**
- **Message**: What to show the reviewer
- **Data to Review**: Variables to display

**How It Works:**
1. Workflow runs until Approval node
2. Workflow **pauses** and shows review interface
3. Reviewer sees data and clicks **Approve** or **Reject**
4. If approved, workflow continues
5. If rejected, workflow stops

---

### Integration Nodes

#### Arcade Node
Connect to third-party applications via Arcade.dev.

**Available Integrations:**
- Google Docs, Sheets, Drive
- Gmail
- Slack
- Calendar
- And more...

**Example:** Create a Google Doc with research results.

#### Gamma AI Node
Generate professional presentations and documents.

**Configuration:**
- **Prompt**: What to create
- **Format**: Presentation, Document, or Webpage
- **Cards/Slides**: Number of sections
- **Text Amount**: Brief, Medium, or Detailed

**Output:** A shareable Gamma.app URL.

---

## Working with Variables

Variables let you pass data between nodes and make workflows dynamic.

### Variable Syntax

Use double curly braces: `{{variable_name}}`

### Common Variable Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `{{input.name}}` | User-provided input | `{{input.company_name}}` |
| `{{lastOutput}}` | Previous node's output | Entire result of last node |
| `{{lastOutput.field}}` | Specific field from previous | `{{lastOutput.summary}}` |
| `{{variables.custom}}` | Custom workflow variable | `{{variables.total}}` |
| `{{loopResults}}` | All loop iteration results | Array of each iteration |
| `{{nodeResults.nodeId}}` | Specific node's result | `{{nodeResults.agent-1}}` |

### Example: Using Variables Throughout a Workflow

**Start Node Inputs:**
```
company_name: "Anthropic"
analysis_depth: "comprehensive"
```

**Agent Instructions:**
```
Research the company {{input.company_name}}.

Perform a {{input.analysis_depth}} analysis including:
1. Business overview
2. Product lineup
3. Recent developments

Previous research found: {{lastOutput}}
```

**If/Else Condition:**
```
{{lastOutput.confidence_score}} > 0.8
```

**Set Variable:**
```
Variable: report_ready
Value: true
```

---

## AI Agents & Tools

### Enabling Tools for Agents

Tools give agents the ability to take actions beyond just generating text.

**Available Tools:**

| Tool | Description | Use Case |
|------|-------------|----------|
| **Firecrawl** | Web scraping to markdown | Visit websites, extract content |
| **Tavily Search** | AI-optimized web search | Find current information |
| **Serper Search** | Google search results | Fast search queries |
| **E2B Code** | Run Python code | Data analysis, calculations |

**Enabling Tools:**
1. Click on Agent node
2. Scroll to **Tools** section
3. Check the tools you want to enable
4. The agent will decide when to use them

### Structured Output

Force the agent to return data in a specific format:

1. Set **Output Format** to "JSON"
2. Define your **Output Schema**:

```json
{
  "company_name": "string",
  "founded": "number",
  "description": "string",
  "products": ["string"],
  "competitors": [
    {
      "name": "string",
      "comparison": "string"
    }
  ]
}
```

The agent's response will always match this structure.

---

## Web Scraping & Data Collection

### Using the MCP Node for Web Scraping

#### Scrape a Single Page

```
Action: Scrape
URL: https://example.com/about
Output Format: Markdown
```

**Returns:** Clean, AI-ready text content from the page.

#### Search the Web

```
Action: Search
Query: {{input.topic}} latest news
Limit: 10
```

**Returns:** Search results with titles, URLs, and snippets.

#### Map a Website

```
Action: Map
URL: https://example.com
Limit: 50
```

**Returns:** List of all discoverable URLs on the site.

#### Crawl Multiple Pages

```
Action: Crawl
URL: https://example.com
Limit: 20
```

**Returns:** Content from multiple pages across the site.

### Best Practices for Web Scraping

| Do | Don't |
|-----|-------|
| Scrape specific pages you need | Crawl entire large websites |
| Use Search for finding content | Guess at URL structures |
| Set reasonable limits | Request thousands of pages |
| Handle failures gracefully | Assume scrapes always succeed |

---

## Control Flow (Loops & Conditions)

### Building a Loop Workflow

**Example: Analyze Multiple Companies**

```
Start (companies: ["Apple", "Google", "Microsoft"])
    |
    v
While Loop ({{variables.index}} < {{input.companies}}.length)
    |
    v
Set Variable (current_company = {{input.companies}}[{{variables.index}}])
    |
    v
Agent (Research {{variables.current_company}})
    |
    v
Set Variable (index = {{variables.index}} + 1)
    |
    +---> Loop back to While

After loop completes:
    |
    v
Agent (Compare all companies in {{loopResults}})
    |
    v
End
```

### Building a Conditional Workflow

**Example: Route Based on Score**

```
Start (input_data)
    |
    v
Agent (Analyze and score)
    |
    v
If/Else ({{lastOutput.score}} >= 80)
    |           |
    | True      | False
    v           v
Send Alert    Log Result
    |           |
    +-----------+
          |
          v
        End
```

---

## Human Approval Workflows

### When to Use Approvals

| Scenario | Why |
|----------|-----|
| Before publishing content | Ensure quality and accuracy |
| Before expensive operations | Control costs |
| Before external communications | Review messaging |
| Data validation | Verify extracted data is correct |
| Compliance requirements | Document human oversight |

### Setting Up an Approval Step

1. Add **User Approval** node where you want the pause
2. Configure the approval message
3. Specify what data to show reviewers

**Configuration Example:**
```
Message: Please review this report before sending to the client.

Data to Review:
- Report: {{lastOutput.report}}
- Confidence: {{lastOutput.confidence}}%
- Sources: {{lastOutput.sources}}

Actions: [Approve] [Reject]
```

### Approval Flow

1. Workflow executes until it reaches Approval node
2. Execution **pauses** (can take minutes to days)
3. Reviewer receives notification
4. Reviewer examines the data
5. Reviewer clicks **Approve** or **Reject**
6. If approved: workflow continues to next node
7. If rejected: workflow terminates (or follows rejection path)

---

## UI Builder

Create custom user interfaces for your workflows without coding.

### What is UI Builder?

UI Builder lets you create a **polished form interface** for running workflows. Instead of technical input fields, your team sees a professional UI.

### Available Components

| Component | Use For |
|-----------|---------|
| **Button** | Trigger workflow execution |
| **Text Input** | Single-line text entry |
| **Text Area** | Multi-line text entry |
| **Select** | Dropdown choices |
| **Checkbox** | Yes/No options |
| **Number Input** | Numeric values |
| **Slider** | Range selection |
| **Card** | Group related fields |
| **Container** | Layout organization |

### Building a Custom UI

1. Go to **UI Builder** from the navigation
2. Drag components onto the canvas
3. Configure each component:
   - Link to workflow input variables
   - Set labels and placeholders
   - Add validation rules
4. Select which workflow to execute
5. **Publish** your UI

### Example: Company Research Form

```
+------------------------------------------+
|        Company Research Tool             |
|                                          |
|  Company Name                            |
|  +------------------------------------+  |
|  | Enter company name...              |  |
|  +------------------------------------+  |
|                                          |
|  Analysis Type                           |
|  +------------------------------------+  |
|  | Comprehensive Analysis         [v] |  |
|  +------------------------------------+  |
|                                          |
|  Include Competitors?  [x] Yes           |
|                                          |
|  +------------------------------------+  |
|  |        Run Research                |  |
|  +------------------------------------+  |
|                                          |
|  Results:                                |
|  +------------------------------------+  |
|  | Results will appear here...        |  |
|  +------------------------------------+  |
+------------------------------------------+
```

---

## Sharing & Exporting Workflows

Share your workflows with teammates or move them between environments.

### Exporting a Workflow

Save any workflow as a markdown file for backup, sharing, or version control.

**Steps to Export:**

1. Open the workflow you want to export
2. Click the **Export** button in the toolbar (or use the menu)
3. The workflow is downloaded as a `.md` file
4. The file contains:
   - Workflow metadata (name, description)
   - All node configurations
   - Edge connections
   - Variable definitions

**What's Included:**
- ✅ All nodes and their settings
- ✅ Connection logic between nodes
- ✅ Input/output variable mappings
- ✅ Agent prompts and configurations
- ✅ HTTP request settings
- ✅ Conditional logic rules
- ❌ Execution history (not included)
- ❌ API keys (security - must be set separately)

### Importing a Workflow

Load a workflow from a markdown file shared by a teammate or exported previously.

**Steps to Import:**

1. Go to the **Workflows** page
2. Click **Import Workflow** button
3. Select the `.md` file from your computer
4. The workflow appears in your workflows list
5. Open it to review and test

**After Importing:**
- Check all node configurations
- Set required API keys (if using custom keys)
- Test the workflow with sample data
- Publish when ready

### Sharing with Your Team

**Method 1: Export/Import (Recommended)**
1. Export the workflow as `.md` file
2. Share the file via email, Slack, or shared drive
3. Teammate imports the file into their account
4. Each person maintains their own copy

**Method 2: Team Workflows Feature**
- Some workflows may be marked as "Team Workflows"
- These are visible to all authenticated users in your organization
- Check with your admin about team workflow access

### Version Control Best Practices

Treat workflow files like code for better collaboration:

**Recommended Workflow:**
```
1. Export workflow regularly (after major changes)
2. Save files with version numbers
   Example: "company-research-v1.md"
            "company-research-v2.md"
3. Store in version control (Git) if possible
4. Document changes in commit messages
5. Test before sharing with team
```

**File Naming Convention:**
```
[workflow-name]-[version]-[date].md

Examples:
- stock-analysis-v1-2024-12-18.md
- rfp-processor-v2-2024-12-18.md
- competitor-research-beta-2024-12-18.md
```

### Migrating Between Environments

If your organization has separate development and production environments, you can move workflows between them.

**For Regular Users:**
1. Export workflow from development environment
2. Sign in to production environment
3. Import the workflow file
4. Review and test before use

**For Administrators:**
Your system administrator has additional migration tools available. See the Admin Guide for automated migration scripts and bulk transfer options.

### Troubleshooting Import Issues

**Issue: "Invalid workflow format"**
- Ensure the file is a valid `.md` export from Open Agent Builder
- Don't manually edit the file structure
- Re-export if the file was corrupted

**Issue: "Missing required fields"**
- The workflow may be from an older version
- Contact support for migration assistance

**Issue: "Node type not recognized"**
- Your environment may not have all node types enabled
- Contact your administrator about enabling missing features

**Issue: Workflow imports but doesn't execute**
- Check that all required API keys are set (Settings > API Keys)
- Verify all nodes have valid configurations
- Look for error messages in the execution panel

---

## Templates & Examples

### Available Templates

| Template | Difficulty | Time | Description |
|----------|------------|------|-------------|
| **Yahoo Finance Stock Report** | Simple | ~30s | Basic stock research workflow |
| **Multi-Company Stock Analysis** | Intermediate | ~2min | Loop through companies, compare |
| **Amazon Product Research** | Intermediate | ~1min | Search products, analyze reviews |
| **Zillow Property Finder** | Intermediate | ~2min | Property search with comparison |
| **Human Approval Demo** | Simple | ~30s | Shows approval workflow pattern |
| **Simple Loop Test** | Simple | ~20s | Pure transforms, no AI |

### Using Templates

1. Click **Templates** on the dashboard
2. Preview the template
3. Click **Use Template**
4. Customize inputs and node configurations
5. Save with your own name
6. Run your customized workflow

### Example: Stock Research Template

```
Start (stock_symbol: "AAPL")
    |
    v
MCP - Scrape Yahoo Finance
    |
    v
Agent - Analyze Financial Data
    |
    v
Extract - Pull Key Metrics
    |
    v
End (output: structured report)
```

**What You Get:**
- Company overview
- Stock price and changes
- Key financial metrics
- Analyst recommendations

---

## Best Practices

### Workflow Design

| Do | Don't |
|-----|-------|
| Start simple, add complexity gradually | Build everything at once |
| Test each node before adding more | Wait until the end to test |
| Use descriptive node labels | Leave default names |
| Add Note nodes for documentation | Leave workflow undocumented |
| Handle edge cases | Assume everything works |

### Working with AI Agents

| Do | Don't |
|-----|-------|
| Be specific in instructions | Give vague prompts |
| Provide examples when helpful | Assume AI knows context |
| Define output format for consistency | Hope for structured output |
| Enable only needed tools | Enable all tools "just in case" |
| Set appropriate temperature | Use defaults without thought |

### Performance Tips

| Tip | Why |
|-----|-----|
| Use Claude Haiku for simple tasks | 10x faster, much cheaper |
| Keep loops under 10 iterations | Faster, lower cost |
| Scrape specific pages only | Avoid unnecessary data |
| Use Extract instead of Agent for data | Faster and cheaper |
| Set token limits appropriately | Control costs |

### Error Handling

| Issue | Solution |
|-------|----------|
| Website blocks scraping | Try Search instead of Scrape |
| Agent gives wrong format | Add JSON schema |
| Loop runs too long | Add max iteration limit |
| Variable not found | Check spelling and node order |
| Workflow fails midway | Check each node in execution panel |

---

## Troubleshooting

### Common Issues

#### Workflow Won't Save
- Check you're signed in (top-right profile)
- Refresh page and try again
- Check browser console (F12) for errors

#### Node Execution Fails
- Click failed node to see error details
- Common causes:
  - Invalid URL format
  - Missing required variables
  - System or personal API key not configured (rare - contact admin if this occurs)
  - Timeout exceeded

#### Variables Not Working
- Check variable name spelling
- Ensure source node completed successfully
- Use correct syntax: `{{nodeName.fieldName}}`
- Check node order (can't use future results)

#### Agent Returns Empty Response
- Check instructions are clear and specific
- Ensure tools are enabled if needed
- Try increasing max tokens
- If issue persists, contact admin to verify system API keys are configured

#### Loop Never Ends
- Check condition logic
- Verify iteration counter updates
- Add max iterations limit
- Test condition separately

### Getting Help

1. **This Guide**: Search for your issue
2. **Node Help**: Click any node for built-in documentation
3. **Execution Panel**: View detailed error messages
4. **Browser Console**: F12 for technical details
5. **Administrator**: Contact for API key or system issues

---

## FAQ

### General Questions

**Q: Do I need to know how to code?**
A: No! Everything is visual drag-and-drop. Transform nodes use JavaScript, but you can skip them or use templates.

**Q: How much does it cost to run workflows?**
A: Costs depend on AI model and complexity. Haiku is cheapest (~$0.001 per run), Opus is most expensive (~$0.05+ per run). Your admin provides shared system API keys, so costs are typically covered centrally. If you add your own API keys, you'll be billed directly by the provider.

**Q: Can I share workflows with my team?**
A: Yes, through templates or by granting access to specific workflows.

**Q: How long can workflows run?**
A: Most workflows complete in seconds to minutes. Long-running workflows may timeout after several minutes.

### Technical Questions

**Q: What's the difference between Agent and Extract?**
A:
- **Agent** = Full AI assistant, can reason, decide, use tools
- **Extract** = Specialized for pulling structured data from text (faster, cheaper)

**Q: Why isn't my agent using the tools I enabled?**
A: The agent decides when tools help. Be explicit: "Use Firecrawl to visit the company website."

**Q: Can I call my own APIs?**
A: Yes! Use the HTTP Request node with your API endpoint, headers, and authentication.

**Q: What happens if a website blocks my scrape?**
A: Try the Search action instead, or use a different URL. Some sites block automated access.

### Limits

| Limit | Value |
|-------|-------|
| Max loop iterations | 100 |
| Max workflow steps | 100 |
| Extract context | 10,000 characters |
| Concurrent workflows | Varies by plan |

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save Workflow | `Ctrl/Cmd + S` |
| Delete Node | `Delete` or `Backspace` |
| Undo | `Ctrl/Cmd + Z` |
| Redo | `Ctrl/Cmd + Shift + Z` |
| Duplicate Node | `Ctrl/Cmd + D` |
| Zoom In | `Ctrl/Cmd + +` |
| Zoom Out | `Ctrl/Cmd + -` |
| Fit to Screen | `Ctrl/Cmd + 0` |

---

## Quick Reference Card

### Variable Syntax
```
{{input.name}}        - User input
{{lastOutput}}        - Previous node result
{{lastOutput.field}}  - Specific field
{{variables.x}}       - Custom variable
{{loopResults}}       - All loop iterations
{{nodeResults.id}}    - Specific node result
```

### Condition Operators
```
==    Equal to
!=    Not equal to
>     Greater than
<     Less than
>=    Greater or equal
<=    Less or equal
```

### Node Quick Guide
```
Start       - Entry point, define inputs
End         - Exit point
Agent       - AI reasoning with tools
Extract     - Pull structured data
MCP         - Web scraping (Firecrawl)
HTTP        - API calls
Transform   - JavaScript processing
If/Else     - Conditional branching
While       - Looping
Approval    - Human review checkpoint
Set State   - Store variables
Note        - Documentation (not executed)
```

---

## Glossary

| Term | Definition |
|------|------------|
| **Agent** | AI-powered node that can reason and use tools |
| **MCP** | Model Context Protocol - standard for tool integration |
| **Node** | A single step in your workflow |
| **Token** | Unit of text for AI (~4 characters = 1 token) |
| **Variable** | Data passed between nodes |
| **Workflow** | Connected sequence of nodes that automate a task |
| **Template** | Pre-built workflow you can customize |
| **Edge** | Connection line between nodes |
| **Execution** | Single run of a workflow |

---

**Need More Help?**

- Architecture Documentation: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Architecture Guide: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Contact your system administrator

---

*Happy Building!*
