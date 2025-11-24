# Adding New Tools to Open Agent Builder

This guide explains how to add new tools to the framework in a future-proof way. The architecture is designed to handle any tool response format automatically.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Tool Architecture](#tool-architecture)
3. [Step-by-Step Guide](#step-by-step-guide)
4. [Best Practices](#best-practices)
5. [Examples](#examples)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

Adding a new tool requires just **3 simple steps**:

1. **Define the tool** in `lib/tools/registry.ts`
2. **Implement the tool** in `lib/workflow/executors/tool-factory.ts`
3. **Test the tool** in a workflow

That's it! The framework handles all response formats automatically.

---

## Tool Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────┐
│                    Tool Architecture                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Tool Registry (lib/tools/registry.ts)              │
│     └─> Defines tool metadata, fields, and UI config   │
│                                                         │
│  2. Tool Factory (lib/workflow/executors/tool-factory.ts) │
│     └─> Creates tool instances with wrapToolFunction()  │
│                                                         │
│  3. Tool Utils (lib/workflow/executors/tool-utils.ts)  │
│     └─> Automatic result normalization & error handling │
│                                                         │
│  4. Agent Executor (lib/workflow/executors/agent.ts)   │
│     └─> Invokes tools and processes results            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Automatic Result Handling

The framework **automatically handles**:
- ✅ Plain text responses (e.g., "Search results...")
- ✅ JSON responses (e.g., `{"results": [...]}`)
- ✅ Mixed content types
- ✅ Error messages
- ✅ Null/undefined values
- ✅ Arrays and objects
- ✅ Numbers and booleans

**You don't need to worry about JSON parsing!** Just return any data type from your tool function.

---

## Step-by-Step Guide

### Step 1: Define the Tool in Registry

Add your tool definition to `lib/tools/registry.ts`:

```typescript
{
    id: "my-new-tool",
    name: "my_tool",
    label: "My New Tool",
    description: "What this tool does",
    category: "web-search", // or "scraping", "extraction", etc.
    icon: Search, // Import from lucide-react
    fields: [
        {
            name: "apiKey",
            label: "API Key",
            type: "secret",
            required: true,
            placeholder: "Enter your API key",
            description: "Get it from example.com",
            global: true // Store in settings
        },
        {
            name: "maxResults",
            label: "Max Results",
            type: "number",
            defaultValue: 10,
            required: false
        }
    ]
}
```

### Step 2: Implement the Tool in Factory

Add your tool implementation to `lib/workflow/executors/tool-factory.ts`:

```typescript
case "my-new-tool":
    if (!apiKeys.myNewTool) return null;
    return new DynamicTool({
        name: "my_new_tool",
        description: "Detailed description for the LLM. Be specific about input format and expected output.",
        func: wrapToolFunction(async (input: string) => {
            // Your tool logic here
            const result = await fetchFromAPI(input, apiKeys.myNewTool);

            // Return ANY format - string, object, array, etc.
            // The framework handles it automatically!
            return result;
        }, { name: "my_new_tool" }),
    });
```

### Step 3: Add API Key Support

#### 3.1 Update TypeScript Types

Add to `lib/api/config.ts`:

```typescript
export interface APIKeys {
  // ... existing keys
  myNewTool?: string;
}

export function getServerAPIKeys(): APIKeys {
  return {
    // ... existing keys
    myNewTool: process.env.MY_NEW_TOOL_API_KEY,
  };
}
```

#### 3.2 Add to Environment Variables

Add to `.env.local`:

```bash
MY_NEW_TOOL_API_KEY=your_api_key_here
```

#### 3.3 Update Execution Routes

Add your key to all three execution routes:
- `app/api/workflows/[workflowId]/execute-stream/route.ts`
- `app/api/workflows/[workflowId]/execute/route.ts`
- `app/api/workflows/[workflowId]/execute-langgraph/route.ts`

```typescript
const apiKeys = {
  // ... existing keys
  myNewTool: process.env.MY_NEW_TOOL_API_KEY,
};
```

---

## Best Practices

### 1. Use `wrapToolFunction()` for All Custom Tools

**Always** wrap your tool function with `wrapToolFunction()`:

```typescript
// ✅ GOOD - Automatic error handling and result normalization
func: wrapToolFunction(async (input: string) => {
    return await myAPI.call(input);
}, { name: "my_tool" })

// ❌ BAD - Manual error handling required
func: async (input: string) => {
    try {
        const result = await myAPI.call(input);
        return typeof result === 'string' ? result : JSON.stringify(result);
    } catch (e) {
        return `Error: ${e.message}`;
    }
}
```

### 2. Return Natural Data Types

Don't worry about converting to strings or JSON - just return the natural data type:

```typescript
// ✅ GOOD - Return plain text
return "Here are the search results: ...";

// ✅ GOOD - Return objects
return { results: [...], count: 10 };

// ✅ GOOD - Return arrays
return ["result1", "result2", "result3"];

// ❌ BAD - Manual JSON stringification (unnecessary!)
return JSON.stringify({ results: [...] });
```

### 3. Write Clear Tool Descriptions

The LLM uses your description to decide when to use the tool:

```typescript
// ✅ GOOD - Clear, specific description
description: "Search the web using Google. Input should be a search query string. Returns a list of relevant web pages with titles, URLs, and snippets."

// ❌ BAD - Vague description
description: "Search tool"
```

### 4. Handle Authentication Properly

Store API keys in environment variables and check for their presence:

```typescript
case "my-tool":
    // Always check if API key is available
    if (!apiKeys.myTool) {
        console.warn('[ToolFactory] Missing API key for my-tool');
        return null;
    }
    // ... rest of implementation
```

### 5. Use Appropriate Field Types

Choose the right field type for your tool configuration:

- `secret` - API keys, tokens (hidden in UI)
- `text` - Short text inputs
- `number` - Numeric values (max results, timeout, etc.)
- `boolean` - Toggle options
- `select` - Dropdown choices

---

## Examples

### Example 1: Simple Text Tool

```typescript
// Registry
{
    id: "joke-generator",
    name: "joke",
    label: "Joke Generator",
    description: "Generate random jokes",
    category: "fun",
    icon: Smile,
    fields: [] // No configuration needed
}

// Factory
case "joke-generator":
    return new DynamicTool({
        name: "joke_generator",
        description: "Generate a random programming joke. No input required.",
        func: wrapToolFunction(async () => {
            const jokes = [
                "Why do programmers prefer dark mode? Because light attracts bugs!",
                "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }, { name: "joke_generator" }),
    });
```

### Example 2: API-Based Tool

```typescript
// Registry
{
    id: "weather-api",
    name: "weather",
    label: "Weather API",
    description: "Get current weather information",
    category: "data",
    icon: Cloud,
    fields: [
        {
            name: "apiKey",
            label: "API Key",
            type: "secret",
            required: true,
            placeholder: "Enter OpenWeatherMap API key",
            description: "Get it from openweathermap.org",
            global: true
        }
    ]
}

// Factory
case "weather-api":
    if (!apiKeys.weather) return null;
    return new DynamicTool({
        name: "weather_lookup",
        description: "Get current weather for a city. Input should be a city name (e.g., 'London' or 'New York'). Returns temperature, conditions, humidity, and wind speed.",
        func: wrapToolFunction(async (city: string) => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys.weather}&units=metric`;
            const response = await fetch(url);
            const data = await response.json();

            // Return structured data - framework handles it automatically
            return {
                city: data.name,
                temperature: data.main.temp,
                conditions: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed
            };
        }, { name: "weather_lookup" }),
    });
```

### Example 3: Tool with Configuration

```typescript
// Registry
{
    id: "news-search",
    name: "news",
    label: "News Search",
    description: "Search recent news articles",
    category: "web-search",
    icon: Newspaper,
    fields: [
        {
            name: "apiKey",
            label: "API Key",
            type: "secret",
            required: true,
            global: true
        },
        {
            name: "maxResults",
            label: "Max Results",
            type: "number",
            defaultValue: 10,
            required: false
        },
        {
            name: "language",
            label: "Language",
            type: "select",
            defaultValue: "en",
            options: [
                { label: "English", value: "en" },
                { label: "Spanish", value: "es" },
                { label: "French", value: "fr" }
            ]
        }
    ]
}

// Factory
case "news-search":
    if (!apiKeys.news) return null;
    return new DynamicTool({
        name: "news_search",
        description: "Search recent news articles. Input should be a search query string.",
        func: wrapToolFunction(async (query: string) => {
            const maxResults = toolConfig.maxResults || 10;
            const language = toolConfig.language || 'en';

            const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=${maxResults}&language=${language}&apiKey=${apiKeys.news}`;
            const response = await fetch(url);
            const data = await response.json();

            // Return array of articles
            return data.articles.map((article: any) => ({
                title: article.title,
                description: article.description,
                url: article.url,
                publishedAt: article.publishedAt
            }));
        }, { name: "news_search" }),
    });
```

---

## Troubleshooting

### Tool Not Appearing in UI

**Problem**: Tool doesn't show up in the tool selector.

**Solution**: Make sure you added it to `lib/tools/registry.ts` and the tool ID matches between registry and factory.

### "Tool returned invalid response" Error

**Problem**: Tool returns data that can't be processed.

**Solution**: This shouldn't happen with `wrapToolFunction()`, but if it does:
1. Check that your tool function returns something (not undefined)
2. Ensure any API calls are awaited properly
3. Check the console logs for the actual error

### API Key Not Found

**Problem**: `apiKeys.myTool` is undefined.

**Solution**:
1. Check `.env.local` has the correct key name
2. Restart the dev server (environment variables need reload)
3. Verify the key is added to all three execution routes
4. Check `lib/api/config.ts` exports the key

### Tool Works but LLM Doesn't Use It

**Problem**: Tool is available but agent doesn't call it.

**Solution**:
1. Improve the tool description - be more specific about when to use it
2. Make sure the tool name is descriptive
3. Test with explicit instructions: "Use the X tool to do Y"

### Response Format Issues

**Problem**: Tool returns data in unexpected format.

**Solution**: With `wrapToolFunction()`, this is handled automatically. But you can customize:

```typescript
func: wrapToolFunction(async (input: string) => {
    const result = await fetchData(input);

    // Return any format - it's normalized automatically
    return result;
}, {
    name: "my_tool",
    normalize: true // default - enables automatic normalization
})
```

---

## Advanced: Custom Result Handling

If you need fine-grained control over result formatting:

```typescript
import { normalizeToolResult, formatToolResultForLLM } from './tool-utils';

func: async (input: string) => {
    const result = await fetchData(input);

    // Manually normalize
    const normalized = normalizeToolResult(result, {
        preferJson: true,
        includeRaw: false
    });

    // Format for LLM
    return formatToolResultForLLM(normalized);
}
```

---

## Summary

Adding a new tool is now **simple and foolproof**:

1. ✅ Define in registry with metadata and fields
2. ✅ Implement with `wrapToolFunction()` wrapper
3. ✅ Add API key support if needed
4. ✅ Test in a workflow

**The framework automatically handles**:
- JSON vs plain text responses
- Error messages
- Type conversions
- Result formatting

**You just focus on**:
- Writing clear tool descriptions
- Implementing the core tool logic
- Returning natural data types

---

## Questions?

If you encounter issues not covered here:
1. Check the existing tools in `tool-factory.ts` for examples
2. Look at `tool-utils.ts` for available utilities
3. Review the debug logs in the console
4. File an issue on GitHub

Happy tool building! 🛠️
