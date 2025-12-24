# Developer's Guide

**Open Agent Builder - Integration Development Guide**

This guide provides step-by-step instructions for common development tasks: adding new tools, MCP servers, LLM providers, and removing deprecated LLMs.

---

## Table of Contents

1. [Adding a New Tool](#adding-a-new-tool)
2. [Adding a New MCP Server](#adding-a-new-mcp-server)
3. [Adding a New LLM Provider](#adding-a-new-llm-provider)
4. [Adding a New Model to Existing Provider](#adding-a-new-model-to-existing-provider)
5. [Discarding an LLM Provider](#discarding-an-llm-provider)
6. [Discarding a Model from a Provider](#discarding-a-model-from-a-provider)

---

## Adding a New Tool

Tools are external APIs that agents can invoke during workflow execution (e.g., Firecrawl, Tavily, Serper).

> **For detailed examples and advanced patterns**, see [development/adding-tools.md](./development/adding-tools.md)

### Step 1: Define the Tool in Registry

**File:** `lib/tools/registry.ts`

Add your tool definition to the `toolDefinitions` array:

```typescript
import { WrenchIcon } from 'lucide-react'; // Choose appropriate icon

export const toolDefinitions: ToolDefinition[] = [
  // ... existing tools
  {
    id: "my-new-tool",
    name: "my-new-tool",
    label: "My New Tool",
    description: "Description of what this tool does",
    category: "web-search", // Options: 'web-search' | 'scraping' | 'extraction' | 'ai-generation' | 'other'
    icon: WrenchIcon,
    fields: [
      {
        name: "apiKey",
        label: "API Key",
        type: "secret",
        required: true,
        global: true,  // Stored in Settings, not per-node
        description: "Your API key from https://example.com"
      },
      {
        name: "maxResults",
        label: "Max Results",
        type: "number",
        required: false,
        defaultValue: 10,
        description: "Maximum number of results to return"
      },
      // Add more configuration fields as needed
    ],
    defaultConfig: {
      maxResults: 10
    }
  }
];
```

### Step 2: Implement the Tool in Factory

**File:** `lib/workflow/executors/tool-factory.ts`

Add a case for your tool in the `createTool` method:

```typescript
import { DynamicTool } from "@langchain/core/tools";
import { wrapToolFunction } from "./tool-utils";

// Inside ToolFactory.createTool() switch statement:
case "my-new-tool":
  if (!apiKeys.myNewTool) {
    console.warn('[ToolFactory] Missing API key for my-new-tool');
    return null;
  }

  return new DynamicTool({
    name: "my_new_tool",  // Underscore naming for LLM compatibility
    description: "Describe what this tool does for the LLM to understand when to use it",
    func: wrapToolFunction(
      async (input: string) => {
        // Parse input if JSON
        let params: any = {};
        try {
          params = JSON.parse(input);
        } catch {
          params = { query: input };
        }

        // Call your API
        const response = await fetch('https://api.example.com/endpoint', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKeys.myNewTool}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        return await response.text();
      },
      { name: "my_new_tool", maxTokens: 15000 }
    ),
  });
```

### Step 3: Update API Keys Interface

**File:** `lib/api/config.ts`

Add the new key to the `APIKeys` interface:

```typescript
export interface APIKeys {
  // ... existing keys
  myNewTool?: string;
}
```

### Step 4: Add System Key Support in Convex

**File:** `convex/systemApiKeys.ts`

Add the environment variable mapping:

```typescript
// In getSystemApiKey handler, add to envKeyMap:
const envKeyMap: Record<string, string> = {
  // ... existing mappings
  'my-new-tool': 'MY_NEW_TOOL_API_KEY',
};

// In getAllSystemApiKeys handler, add to return object:
return {
  // ... existing keys
  myNewTool: process.env.MY_NEW_TOOL_API_KEY || null,
};
```

### Step 5: Update Execute Stream Route

**File:** `app/api/workflows/[workflowId]/execute-stream/route.ts`

Add the key to the apiKeys object:

```typescript
const apiKeys = {
  // ... existing keys
  myNewTool: (userId ? await getToolApiKey('my-new-tool', userId) : undefined) ?? systemKeys.myNewTool,
};
```

### Step 6: Set Environment Variable

```bash
# Development
npx convex env set MY_NEW_TOOL_API_KEY "your-api-key-here"

# Production
npx convex env set MY_NEW_TOOL_API_KEY "your-api-key-here" --prod
```

### Step 7: Test the Tool

1. Create a workflow with an Agent node
2. Add your new tool to the agent's tools
3. Give instructions that will trigger the tool
4. Execute and verify the tool is called correctly

---

## Adding a New MCP Server

MCP (Model Context Protocol) servers provide tools that agents can invoke dynamically.

### Option A: User-Configured MCP Server (UI)

Users can add MCP servers via Settings > MCP Registry:

1. Click "Add MCP Server"
2. Fill in:
   - **Name**: Display name (e.g., "My Custom MCP")
   - **URL**: Full endpoint URL (e.g., `https://api.example.com/mcp`)
   - **Auth Type**: `bearer`, `api-key`, or `none`
   - **Access Token**: Authentication token (if required)
   - **Category**: `web`, `ai`, `data`, or `other`
3. Test connection
4. Enable the server

### Option B: Official/System MCP Server (Code)

For system-level MCP servers available to all users:

**File:** `convex/mcpServers.ts`

Add to the `seedOfficialMCPs` mutation:

```typescript
export const seedOfficialMCPs = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    // Check if already exists
    const existing = await ctx.db
      .query("mcpServers")
      .withIndex("by_user_and_name", (q) =>
        q.eq("userId", userId).eq("name", "My Official MCP")
      )
      .first();

    if (!existing) {
      await ctx.db.insert("mcpServers", {
        userId,
        name: "My Official MCP",
        url: "https://api.example.com/mcp",
        description: "Description of this MCP server",
        category: "web",
        authType: "bearer",
        accessToken: process.env.MY_MCP_ACCESS_TOKEN || "",
        tools: ["tool1", "tool2", "tool3"],  // List available tools
        connectionStatus: "untested",
        enabled: true,
        isOfficial: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  },
});
```

### MCP Server Schema

```typescript
{
  userId: string;           // Owner user ID
  name: string;             // Display name
  url: string;              // MCP endpoint URL
  description?: string;     // Human-readable description
  category: string;         // 'web' | 'ai' | 'data' | 'other'
  authType: string;         // 'bearer' | 'api-key' | 'none'
  accessToken?: string;     // Authentication token
  tools?: string[];         // Available tool names
  connectionStatus: string; // 'untested' | 'connected' | 'failed'
  enabled: boolean;         // Is server active
  isOfficial: boolean;      // System-provided server
}
```

### Testing MCP Server

1. Add the MCP server (via UI or code)
2. Create an Agent node in a workflow
3. Select the MCP server in the agent's MCP configuration
4. Give instructions that will use MCP tools
5. Execute and verify tool invocations in the logs

---

## Adding a New LLM Provider

LLM providers are the AI services (Anthropic, OpenAI, Groq, Google) that power agent nodes.

### Step 1: Define Provider Configuration

**File:** `lib/config/llm-config.ts`

Add the new provider to `llmProviders` array:

```typescript
export const llmProviders: LLMProvider[] = [
  // ... existing providers
  {
    id: 'new-provider',
    name: 'New Provider',
    envKey: 'NEW_PROVIDER_API_KEY',
    defaultModel: 'new-model-default',
    models: [
      {
        id: 'new-model-default',
        name: 'New Model Default',
        provider: 'new-provider',
        contextWindow: 128000,
        inputCostPer1M: 1.00,
        outputCostPer1M: 5.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 8192,
        description: 'Default model for New Provider'
      },
      {
        id: 'new-model-fast',
        name: 'New Model Fast',
        provider: 'new-provider',
        contextWindow: 32000,
        inputCostPer1M: 0.25,
        outputCostPer1M: 1.00,
        supportsJSON: true,
        supportsMCP: true,
        maxTokens: 4096,
        description: 'Faster, cheaper model'
      }
    ]
  }
];
```

### Step 2: Update Type Definitions

**File:** `lib/api/models.ts`

Update the `Provider` type and related constants:

```typescript
export type Provider = 'openai' | 'anthropic' | 'groq' | 'google' | 'new-provider';

export const SUPPORTED_MODELS = {
  // ... existing providers
  'new-provider': llmProviders.find(p => p.id === 'new-provider')?.models.map(m => m.id) || [],
};

export const DEFAULT_MODELS = {
  // ... existing providers
  'new-provider': 'new-model-default',
};
```

### Step 3: Update API Keys Interface

**File:** `lib/api/config.ts`

```typescript
export interface APIKeys {
  // ... existing keys
  newProvider?: string;
}
```

### Step 4: Add System Key Support

**File:** `convex/systemApiKeys.ts`

```typescript
// In getSystemApiKey:
const envKeyMap: Record<string, string> = {
  // ... existing
  'new-provider': 'NEW_PROVIDER_API_KEY',
};

// In getAllSystemApiKeys:
return {
  // ... existing
  newProvider: process.env.NEW_PROVIDER_API_KEY || null,
};
```

### Step 5: Implement Provider Execution

**File:** `lib/workflow/executors/agent.ts`

Add the provider execution logic. This is the most complex step:

```typescript
// After existing provider checks (around line 1200+)
} else if (provider === 'new-provider' && apiKeys?.newProvider) {
  console.log('[Agent] Using New Provider');

  // Import or initialize provider SDK
  const NewProviderSDK = require('new-provider-sdk');
  const client = new NewProviderSDK({ apiKey: apiKeys.newProvider });

  // Convert tools to provider format
  const providerTools = allTools.map(tool => ({
    // Convert to provider's expected format
    name: tool.name,
    description: tool.description,
    parameters: tool.schema || {}
  }));

  // Implement agentic loop
  let messages = [{ role: 'user', content: instructions }];
  let iterations = 0;
  const maxIterations = 10;

  while (iterations < maxIterations) {
    iterations++;

    const response = await client.chat({
      model: modelName,
      messages,
      tools: providerTools.length > 0 ? providerTools : undefined,
      max_tokens: maxTokens
    });

    // Check for tool calls
    if (response.tool_calls && response.tool_calls.length > 0) {
      // Execute tools
      for (const toolCall of response.tool_calls) {
        const tool = allTools.find(t => t.name === toolCall.name);
        if (tool) {
          const toolResult = await tool.invoke(toolCall.arguments);
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: toolResult
          });
        }
      }
    } else {
      // No more tool calls, extract final response
      return {
        status: 'completed',
        output: response.content,
        usage: {
          input_tokens: response.usage?.input_tokens || 0,
          output_tokens: response.usage?.output_tokens || 0,
          total_tokens: response.usage?.total_tokens || 0
        }
      };
    }
  }

  throw new Error('Max iterations reached');
}
```

### Step 6: Update Execute Stream Route

**File:** `app/api/workflows/[workflowId]/execute-stream/route.ts`

```typescript
const apiKeys = {
  // ... existing
  newProvider: (userId ? await getLLMApiKey('new-provider', userId) : undefined) ?? systemKeys.newProvider,
};
```

### Step 7: Set Environment Variable

```bash
npx convex env set NEW_PROVIDER_API_KEY "your-api-key"
```

### Step 8: Test the Provider

1. Create a workflow with an Agent node
2. Select the new provider/model
3. Add tools if testing tool support
4. Execute and verify responses

---

## Adding a New Model to Existing Provider

To add a new model to an existing provider (e.g., a new Claude or GPT model):

### Step 1: Add Model to Configuration

**File:** `lib/config/llm-config.ts`

Find the provider and add the model to its `models` array:

```typescript
// Example: Adding a new Anthropic model
{
  id: 'anthropic',
  name: 'Anthropic',
  // ...
  models: [
    // ... existing models
    {
      id: 'claude-4-20260115',  // Use exact model ID from provider
      name: 'Claude 4',
      provider: 'anthropic',
      contextWindow: 200000,
      inputCostPer1M: 3.00,
      outputCostPer1M: 15.00,
      supportsJSON: true,
      supportsMCP: true,
      maxTokens: 8192,
      description: 'Most capable Claude model'
    }
  ]
}
```

### Step 2: Update Default (Optional)

If the new model should be the default:

```typescript
// In the provider definition
defaultModel: 'claude-4-20260115',
```

That's it! The UI automatically picks up models from `llm-config.ts`.

---

## Discarding an LLM Provider

When removing an entire LLM provider from the system:

### Step 1: Remove from Configuration

**File:** `lib/config/llm-config.ts`

Remove the provider from the `llmProviders` array:

```typescript
export const llmProviders: LLMProvider[] = [
  // Remove the provider object entirely
  // {
  //   id: 'deprecated-provider',
  //   ...
  // }
];
```

### Step 2: Update Type Definitions

**File:** `lib/api/models.ts`

Remove from the `Provider` type:

```typescript
// Before
export type Provider = 'openai' | 'anthropic' | 'groq' | 'google' | 'deprecated-provider';

// After
export type Provider = 'openai' | 'anthropic' | 'groq' | 'google';
```

Remove from `SUPPORTED_MODELS` and `DEFAULT_MODELS`:

```typescript
export const SUPPORTED_MODELS = {
  // Remove deprecated-provider entry
};

export const DEFAULT_MODELS = {
  // Remove deprecated-provider entry
};
```

### Step 3: Remove from API Keys

**File:** `lib/api/config.ts`

```typescript
export interface APIKeys {
  // Remove: deprecatedProvider?: string;
}
```

### Step 4: Remove from System Keys

**File:** `convex/systemApiKeys.ts`

Remove from both `getSystemApiKey` envKeyMap and `getAllSystemApiKeys` return object.

### Step 5: Remove Execution Code

**File:** `lib/workflow/executors/agent.ts`

Remove the provider-specific execution block:

```typescript
// Remove this entire block:
// } else if (provider === 'deprecated-provider' && apiKeys?.deprecatedProvider) {
//   ...
// }
```

### Step 6: Remove from Execute Stream Route

**File:** `app/api/workflows/[workflowId]/execute-stream/route.ts`

Remove from the apiKeys object:

```typescript
const apiKeys = {
  // Remove: deprecatedProvider: ...
};
```

### Step 7: Clean Up Environment Variables

```bash
npx convex env unset DEPRECATED_PROVIDER_API_KEY
npx convex env unset DEPRECATED_PROVIDER_API_KEY --prod
```

### Step 8: Update Documentation

- Remove provider from README.md
- Remove from CLAUDE.md
- Update any other documentation referencing the provider

### Step 9: Handle Existing Workflows

Existing workflows using the removed provider will fail. Consider:

1. **Migration script**: Update workflows to use a different provider
2. **Graceful fallback**: Add code to fall back to default provider
3. **User notification**: Notify users about the deprecation

---

## Discarding a Model from a Provider

When removing a specific model (not the entire provider):

### Step 1: Remove from Configuration

**File:** `lib/config/llm-config.ts`

Remove the model from the provider's `models` array:

```typescript
{
  id: 'anthropic',
  models: [
    // Remove the deprecated model object
    // {
    //   id: 'claude-deprecated-model',
    //   ...
    // }
  ]
}
```

### Step 2: Update Default Model (If Needed)

If the removed model was the default, update to a different model:

```typescript
{
  id: 'anthropic',
  defaultModel: 'claude-sonnet-4-5-20250929',  // New default
  models: [...]
}
```

### Step 3: Handle Existing Workflows

Workflows using the deprecated model will need to be updated. Options:

1. **Manual update**: Users update their workflows
2. **Automatic fallback**: Add code to map old model to new one

**Optional fallback in agent.ts:**

```typescript
// Model migration mapping
const modelMigrations: Record<string, string> = {
  'claude-deprecated-model': 'claude-sonnet-4-5-20250929',
  'gpt-4-old': 'gpt-4o',
};

// Before provider detection
if (modelMigrations[modelName]) {
  console.warn(`[Agent] Model ${modelName} deprecated, using ${modelMigrations[modelName]}`);
  modelName = modelMigrations[modelName];
}
```

---

## Quick Reference: File Locations

| Component | Primary Files |
|-----------|---------------|
| **Tools** | `lib/tools/registry.ts`, `lib/workflow/executors/tool-factory.ts` |
| **MCP** | `convex/mcpServers.ts`, `lib/mcp/resolver.ts`, `lib/workflow/executors/mcp.ts` |
| **LLMs** | `lib/config/llm-config.ts`, `lib/api/models.ts`, `lib/workflow/executors/agent.ts` |
| **API Keys** | `convex/systemApiKeys.ts`, `lib/api/config.ts`, `lib/api/llm-keys.ts` |
| **Execution** | `app/api/workflows/[workflowId]/execute-stream/route.ts` |
| **UI** | `components/app/(home)/sections/workflow-builder/NodePanel.tsx` |

---

## Testing Checklist

After any integration change, verify:

- [ ] Development environment works (`npm run dev:all`)
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] New tool/provider appears in UI
- [ ] API key is retrieved correctly
- [ ] Basic execution works (create simple workflow, execute)
- [ ] Tool invocation works (if applicable)
- [ ] Error handling works (test with invalid inputs)
- [ ] Production deployment works (`npx convex deploy`)

---

## Troubleshooting

### Tool Not Appearing in UI

1. Check `lib/tools/registry.ts` - is the tool defined?
2. Verify the tool ID matches in all files
3. Check browser console for errors

### API Key Not Working

1. Verify environment variable is set: `npx convex env list`
2. Check key name mapping in `systemApiKeys.ts`
3. Look for typos in key names

### LLM Not Responding

1. Check API key is valid
2. Verify model ID matches provider's documentation
3. Check agent.ts for provider-specific execution code
4. Look at console logs for errors

### MCP Tools Not Loading

1. Test MCP server connection in Settings
2. Check server URL is accessible
3. Verify authentication token is valid
4. Check `executeMcpTool` logs for errors

---

*Last Updated: December 2024*
