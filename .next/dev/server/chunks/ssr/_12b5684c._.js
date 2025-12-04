module.exports = [
"[project]/utils/cn.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/classnames/index.js [app-ssr] (ecmascript)");
;
function cn(...classes) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(...classes);
}
}),
"[project]/utils/set-timeout-on-visible.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "setIntervalOnVisible",
    ()=>setIntervalOnVisible,
    "setTimeoutOnVisible",
    ()=>setTimeoutOnVisible
]);
function setTimeoutOnVisible({ element, callback, timeout, threshold = 0.01 }) {
    if (!element) {
        return;
    }
    let timeoutId = null;
    let finished = false;
    // Check if element is already visible at the beginning
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    const setupTimeout = ()=>{
        if (finished) return;
        timeoutId = setTimeout(()=>{
            if (finished) return;
            callback();
            timeoutId = null;
            finished = true;
        }, timeout);
    };
    if (isVisible && !timeoutId) setupTimeout();
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting) {
                // Element is visible, start the timeout
                if (!timeoutId) {
                    setupTimeout();
                    observer.disconnect();
                }
            } else {
                // Element is no longer visible, clear the timeout
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
            }
        });
    }, {
        threshold
    });
    observer.observe(element);
    // Return a cleanup function
    return ()=>{
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        observer.disconnect();
    };
}
function setIntervalOnVisible({ element, callback, interval, threshold = 0.01 }) {
    if (!element) {
        return;
    }
    let intervalId = null;
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting) {
                // Element is visible, start the interval
                if (!intervalId) {
                    intervalId = setInterval(callback, interval);
                }
            } else {
                // Element is no longer visible, clear the interval
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }
        });
    }, {
        threshold
    });
    observer.observe(element);
    // Return a cleanup function
    return ()=>{
        if (intervalId) {
            clearInterval(intervalId);
        }
        observer.disconnect();
    };
}
const __TURBOPACK__default__export__ = setTimeoutOnVisible;
}),
"[project]/utils/sleep.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sleep",
    ()=>sleep
]);
const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
}),
"[project]/lib/config/llm-config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * LLM Configuration
 *
 * Configure available LLM providers and models
 * API keys are still in .env.local for security
 */ __turbopack_context__.s([
    "formatModelId",
    ()=>formatModelId,
    "getAllModels",
    ()=>getAllModels,
    "getConfiguredProviders",
    ()=>getConfiguredProviders,
    "getDefaultModel",
    ()=>getDefaultModel,
    "getModelInfo",
    ()=>getModelInfo,
    "getModelsForProvider",
    ()=>getModelsForProvider,
    "isProviderConfigured",
    ()=>isProviderConfigured,
    "llmProviders",
    ()=>llmProviders
]);
const llmProviders = [
    {
        id: 'anthropic',
        name: 'Anthropic',
        envKey: 'ANTHROPIC_API_KEY',
        defaultModel: 'claude-sonnet-4-5-20250929',
        models: [
            {
                id: 'claude-sonnet-4-5-20250929',
                name: 'Claude Sonnet 4.5',
                provider: 'anthropic',
                contextWindow: 200000,
                inputCostPer1M: 3.00,
                outputCostPer1M: 15.00,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 8192,
                description: 'Latest Sonnet - balanced performance for most tasks'
            },
            {
                id: 'claude-opus-4-5-20251101',
                name: 'Claude Opus 4.5',
                provider: 'anthropic',
                contextWindow: 200000,
                inputCostPer1M: 15.00,
                outputCostPer1M: 75.00,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 8192,
                description: 'Most intelligent model - best for complex reasoning'
            },
            {
                id: 'claude-haiku-4-5-20251001',
                name: 'Claude Haiku 4.5',
                provider: 'anthropic',
                contextWindow: 200000,
                inputCostPer1M: 1.00,
                outputCostPer1M: 5.00,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 8192,
                description: 'Fastest and most cost-effective model'
            }
        ]
    },
    {
        id: 'openai',
        name: 'OpenAI',
        envKey: 'OPENAI_API_KEY',
        defaultModel: 'gpt-4o',
        models: [
            {
                id: 'gpt-4o',
                name: 'GPT-4o',
                provider: 'openai',
                contextWindow: 128000,
                inputCostPer1M: 2.50,
                outputCostPer1M: 10.00,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 16384,
                description: 'Multimodal flagship model with function calling'
            },
            {
                id: 'gpt-4o-mini',
                name: 'GPT-4o Mini',
                provider: 'openai',
                contextWindow: 128000,
                inputCostPer1M: 0.15,
                outputCostPer1M: 0.60,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 16384,
                description: 'Affordable and fast with function calling'
            }
        ]
    },
    {
        id: 'groq',
        name: 'Groq',
        envKey: 'GROQ_API_KEY',
        defaultModel: 'llama-3.3-70b-versatile',
        models: [
            {
                id: 'llama-3.3-70b-versatile',
                name: 'Llama 3.3 70B Versatile',
                provider: 'groq',
                contextWindow: 131072,
                inputCostPer1M: 0.59,
                outputCostPer1M: 0.79,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 32768,
                description: 'Most capable Llama model - excellent reasoning and instruction following'
            },
            {
                id: 'llama-3.1-8b-instant',
                name: 'Llama 3.1 8B Instant',
                provider: 'groq',
                contextWindow: 131072,
                inputCostPer1M: 0.05,
                outputCostPer1M: 0.08,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 131072,
                description: 'Ultra-fast and cost-effective - 560 tokens/second'
            },
            {
                id: 'openai/gpt-oss-120b',
                name: 'GPT OSS 120B',
                provider: 'groq',
                contextWindow: 131072,
                inputCostPer1M: 0.20,
                outputCostPer1M: 0.20,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 65536,
                description: 'Large Responses API model with extended output'
            },
            {
                id: 'openai/gpt-oss-20b',
                name: 'GPT OSS 20B',
                provider: 'groq',
                contextWindow: 131072,
                inputCostPer1M: 0.10,
                outputCostPer1M: 0.10,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 65536,
                description: 'Balanced model with high speed - 1000 tokens/second'
            }
        ]
    },
    {
        id: 'google',
        name: 'Google',
        envKey: 'GOOGLE_API_KEY',
        defaultModel: 'gemini-2.0-flash-exp',
        models: [
            {
                id: 'gemini-2.0-flash-exp',
                name: 'Gemini 2.0 Flash (Experimental)',
                provider: 'google',
                contextWindow: 1000000,
                inputCostPer1M: 0.00,
                outputCostPer1M: 0.00,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 8192,
                description: 'Free experimental preview - next-gen multimodal model'
            },
            {
                id: 'gemini-2.0-flash-001',
                name: 'Gemini 2.0 Flash',
                provider: 'google',
                contextWindow: 1000000,
                inputCostPer1M: 0.10,
                outputCostPer1M: 0.40,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 8192,
                description: 'Stable GA version - faster and more capable'
            },
            {
                id: 'gemini-2.0-flash-lite-preview-02-05',
                name: 'Gemini 2.0 Flash-Lite',
                provider: 'google',
                contextWindow: 1000000,
                inputCostPer1M: 0.075,
                outputCostPer1M: 0.30,
                supportsJSON: true,
                supportsMCP: true,
                maxTokens: 8192,
                description: 'Cost-effective version of Gemini 2.0 Flash'
            }
        ]
    }
];
function getDefaultModel(provider) {
    const config = llmProviders.find((p)=>p.id === provider);
    return config?.defaultModel || '';
}
function getModelsForProvider(provider) {
    const config = llmProviders.find((p)=>p.id === provider);
    return config?.models || [];
}
function getModelInfo(fullModelId) {
    const [provider, modelId] = fullModelId.split('/');
    const providerConfig = llmProviders.find((p)=>p.id === provider);
    if (!providerConfig) return null;
    return providerConfig.models.find((m)=>m.id === modelId) || null;
}
function formatModelId(provider, modelId) {
    return `${provider}/${modelId}`;
}
function getAllModels() {
    return llmProviders.flatMap((provider)=>provider.models.map((model)=>({
                ...model,
                fullId: `${provider.id}/${model.id}`
            })));
}
function isProviderConfigured(provider) {
    const config = llmProviders.find((p)=>p.id === provider);
    if (!config) return false;
    // This only works server-side
    if (typeof process === 'undefined') return false;
    return !!process.env[config.envKey];
}
function getConfiguredProviders() {
    return llmProviders.filter((p)=>isProviderConfigured(p.id)).map((p)=>p.id);
}
}),
"[project]/lib/api/models.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Model validation and configuration for LLM providers
 */ __turbopack_context__.s([
    "DEFAULT_MODELS",
    ()=>DEFAULT_MODELS,
    "SUPPORTED_MODELS",
    ()=>SUPPORTED_MODELS,
    "ensureOpenAIModel",
    ()=>ensureOpenAIModel,
    "getDefaultModel",
    ()=>getDefaultModel,
    "getModelString",
    ()=>getModelString,
    "isSupportedProvider",
    ()=>isSupportedProvider,
    "parseModelString",
    ()=>parseModelString,
    "validateModel",
    ()=>validateModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/llm-config.ts [app-ssr] (ecmascript)");
;
const SUPPORTED_MODELS = {
    openai: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["llmProviders"].find((p)=>p.id === 'openai')?.models.map((m)=>m.id) || [],
    anthropic: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["llmProviders"].find((p)=>p.id === 'anthropic')?.models.map((m)=>m.id) || [],
    groq: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["llmProviders"].find((p)=>p.id === 'groq')?.models.map((m)=>m.id) || [],
    google: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["llmProviders"].find((p)=>p.id === 'google')?.models.map((m)=>m.id) || []
};
const DEFAULT_MODELS = {
    openai: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["llmProviders"].find((p)=>p.id === 'openai')?.defaultModel || 'gpt-4o',
    anthropic: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["llmProviders"].find((p)=>p.id === 'anthropic')?.defaultModel || 'claude-sonnet-4-5-20250929',
    groq: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["llmProviders"].find((p)=>p.id === 'groq')?.defaultModel || 'gpt-oss-120b',
    google: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["llmProviders"].find((p)=>p.id === 'google')?.defaultModel || 'gemini-2.0-flash-exp'
};
function parseModelString(modelString) {
    if (!modelString) {
        return {
            provider: 'openai',
            modelName: DEFAULT_MODELS.openai
        };
    }
    if (modelString.includes('/')) {
        const [provider, modelName] = modelString.split('/', 2);
        // Validate provider
        if (provider !== 'openai' && provider !== 'anthropic' && provider !== 'groq' && provider !== 'google') {
            // Default to openai if provider is unknown
            return {
                provider: 'openai',
                modelName: DEFAULT_MODELS.openai
            };
        }
        return {
            provider: provider,
            modelName
        };
    }
    // No provider prefix, default to openai
    return {
        provider: 'openai',
        modelName: modelString
    };
}
function validateModel(modelString) {
    const { provider, modelName } = parseModelString(modelString);
    // Check if model is in supported list
    const supportedModels = SUPPORTED_MODELS[provider];
    const isValid = supportedModels.includes(modelName);
    if (!isValid) {
        return {
            provider,
            modelName,
            isValid: false,
            error: `Model '${modelName}' is not supported for provider '${provider}'. Supported models: ${supportedModels.join(', ')}`
        };
    }
    return {
        provider,
        modelName,
        isValid: true
    };
}
function getDefaultModel(provider) {
    return DEFAULT_MODELS[provider];
}
function isSupportedProvider(provider) {
    return provider === 'openai' || provider === 'anthropic' || provider === 'groq' || provider === 'google';
}
function getModelString(provider, modelName) {
    return `${provider}/${modelName}`;
}
function ensureOpenAIModel(modelString) {
    const { provider, modelName } = parseModelString(modelString);
    // If it's already an OpenAI model, return it
    if (provider === 'openai') {
        // Validate it's a supported OpenAI model
        const validation = validateModel(modelString);
        if (validation.isValid) {
            return modelName;
        }
        // Fall back to default if invalid
        return DEFAULT_MODELS.openai;
    }
    // For non-OpenAI providers, return default OpenAI model
    return DEFAULT_MODELS.openai;
}
}),
"[project]/lib/workflow/templates.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTemplate",
    ()=>getTemplate,
    "listTemplates",
    ()=>listTemplates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/models.ts [app-ssr] (ecmascript)");
;
/**
 * Yahoo Finance Template
 *
 * Simple, working template - no loops (they have bugs)
 */ const templates = {
    // =============================================================================
    // Multi-Company Stock Analysis (Loop Demo)
    // =============================================================================
    'multi-company-stock-analysis': {
        id: 'multi-company-stock-analysis',
        name: 'Multi-Company Stock Analysis (Loop Demo)',
        description: 'Loop through companies, get tickers with structured data, research Yahoo Finance, and summarize',
        category: 'Finance',
        tags: [
            'finance',
            'yahoo',
            'stock',
            'loop',
            'structured-data'
        ],
        difficulty: 'intermediate',
        estimatedTime: '5-7 minutes',
        nodes: [
            {
                id: 'start',
                type: 'start',
                position: {
                    x: 100,
                    y: 350
                },
                data: {
                    nodeType: 'start',
                    label: 'Start',
                    nodeName: 'Start',
                    inputVariables: [
                        {
                            name: 'companies',
                            type: 'string',
                            required: true,
                            description: 'Comma-separated company names (e.g., Tesla, Apple, Microsoft)',
                            defaultValue: 'Tesla, Apple, Microsoft'
                        }
                    ]
                }
            },
            {
                id: 'note-overview',
                type: 'note',
                position: {
                    x: 100,
                    y: 100
                },
                data: {
                    nodeType: 'note',
                    label: 'Loop Demo Overview',
                    noteText: `Multi-Company Stock Analysis

Demonstrates:
1. Parse company list
2. LOOP through companies
3. Get ticker (structured data)
4. Research Yahoo Finance
5. Collect results
6. Summarize after loop

Watch the execution panel!`
                }
            },
            {
                id: 'parse-companies',
                type: 'transform',
                position: {
                    x: 350,
                    y: 350
                },
                data: {
                    nodeType: 'transform',
                    label: 'Parse Company List',
                    nodeName: 'Parse Company List',
                    transformScript: `// Split comma-separated companies into array
const companiesStr = input.companies || '';
const companies = companiesStr.split(',').map(c => c.trim());

const result = {
    companies: companies,
    totalCount: companies.length,
    results: []
};

return result;`
                }
            },
            {
                id: 'loop-companies',
                type: 'while',
                position: {
                    x: 600,
                    y: 350
                },
                data: {
                    nodeType: 'while',
                    label: 'Loop Companies',
                    nodeName: 'Loop Companies',
                    whileCondition: 'iteration <= 3',
                    maxIterations: 3
                }
            },
            {
                id: 'get-current-company',
                type: 'transform',
                position: {
                    x: 750,
                    y: 200
                },
                data: {
                    nodeType: 'transform',
                    label: 'Get Current Company',
                    nodeName: 'Get Current Company',
                    transformScript: `// Get current company from array based on iteration
const companiesData = state.variables?.['parse-companies'] || {};
const companies = companiesData.companies || [];

// Loop iteration starts at 1, but array indices start at 0
// So we use (iteration - 1) for zero-based indexing
const loopIteration = lastOutput?.iteration !== undefined ? lastOutput.iteration : 1;
const currentIndex = loopIteration - 1;
const currentCompany = companies[currentIndex] || 'Unknown Company';

console.log(\`Get Current Company - loopIteration: \${loopIteration}, index: \${currentIndex}, company: \${currentCompany}\`);

const result = {
    currentCompany: currentCompany,
    currentIndex: currentIndex,
    totalCount: companies.length
};

return result;`
                }
            },
            {
                id: 'get-ticker',
                type: 'agent',
                position: {
                    x: 900,
                    y: 250
                },
                data: {
                    nodeType: 'agent',
                    label: 'Get Ticker Symbol',
                    nodeName: 'Get Ticker Symbol',
                    instructions: `What is the stock ticker symbol for {{lastOutput.currentCompany}}?

Return ONLY valid JSON with this exact structure:
{
  "company": "Company Name",
  "ticker": "TICKER"
}

Example for Tesla:
{
  "company": "Tesla",
  "ticker": "TSLA"
}`,
                    model: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].groq,
                    outputFormat: 'JSON',
                    jsonOutputSchema: JSON.stringify({
                        type: 'object',
                        properties: {
                            company: {
                                type: 'string'
                            },
                            ticker: {
                                type: 'string'
                            }
                        },
                        required: [
                            'company',
                            'ticker'
                        ]
                    })
                }
            },
            {
                id: 'research-yahoo',
                type: 'agent',
                position: {
                    x: 1150,
                    y: 250
                },
                data: {
                    nodeType: 'agent',
                    label: 'Research Yahoo Finance',
                    nodeName: 'Research Yahoo Finance',
                    instructions: `Search Yahoo Finance for ticker {{lastOutput.ticker}} ({{lastOutput.company}}) and gather:

1. Current price
2. Daily change ($ and %)
3. Recent price movement trend (up/down/flat over last week)
4. One key headline if available

Use Firecrawl MCP to search and scrape Yahoo Finance.

Format as a brief summary (3-4 sentences).`,
                    model: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].anthropic,
                    outputFormat: 'Text',
                    mcpTools: [
                        {
                            name: 'Firecrawl',
                            url: 'https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp',
                            authType: 'url',
                            label: 'Firecrawl'
                        }
                    ]
                }
            },
            {
                id: 'collect-result',
                type: 'transform',
                position: {
                    x: 1400,
                    y: 250
                },
                data: {
                    nodeType: 'transform',
                    label: 'Collect Result',
                    nodeName: 'Collect Result',
                    transformScript: `// Get ticker from previous step
const tickerData = state.variables?.['get-ticker'] || {};
const research = lastOutput || 'No research available';

// Create result for this iteration
const resultItem = {
    company: tickerData.company || 'Unknown',
    ticker: tickerData.ticker || 'N/A',
    research: research
};

console.log(\`Collected result for: \${resultItem.company}\`);

// IMPORTANT: Return the accumulated results as a special key
// that will be picked up by the node executor
const result = {
    ...resultItem,
    __appendToLoopResults: resultItem  // Signal to append this to loop results
};

return result;`
                }
            },
            {
                id: 'prepare-summary-data',
                type: 'transform',
                position: {
                    x: 1500,
                    y: 350
                },
                data: {
                    nodeType: 'transform',
                    label: 'Prepare Summary Data',
                    nodeName: 'Prepare Summary Data',
                    transformScript: `// Get accumulated loop results from LangGraph state
// Note: state here is the LangGraph state, not WorkflowState
const loopResults = state.loopResults || [];

console.log(\`Preparing summary with loopResults: \${loopResults.length} items\`);
console.log(\`Data: \${JSON.stringify(loopResults, null, 2)}\`);

const result = {
    companies: loopResults,
    totalAnalyzed: loopResults.length,
    message: \`Collected \${loopResults.length} company analyses\`,
    data: loopResults
};

return result;`
                }
            },
            {
                id: 'generate-summary',
                type: 'agent',
                position: {
                    x: 1750,
                    y: 350
                },
                data: {
                    nodeType: 'agent',
                    label: 'Generate Summary Report',
                    nodeName: 'Generate Summary Report',
                    instructions: `Create a professional stock analysis summary report using the company data from lastOutput.

The lastOutput contains:
{{JSON.stringify(lastOutput, null, 2)}}

Use the actual company names, tickers, and research summaries from this data to create a comprehensive report.

Format the report as:

# Multi-Company Stock Analysis Report

## Executive Summary
(2-3 sentences about overall market trends from these companies)

## Company Analysis

### [Company 1] (Ticker)
- Current Status: ...
- Price Movement: ...
- Key Insight: ...

### [Company 2] (Ticker)
- Current Status: ...
- Price Movement: ...
- Key Insight: ...

### [Company 3] (Ticker)
- Current Status: ...
- Price Movement: ...
- Key Insight: ...

## Conclusion
(Which company looks strongest/weakest and why - 2-3 sentences)

Make it professional and well-formatted.`,
                    model: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].groq,
                    outputFormat: 'Text',
                    includeChatHistory: true
                }
            },
            {
                id: 'end',
                type: 'end',
                position: {
                    x: 1900,
                    y: 350
                },
                data: {
                    nodeType: 'end',
                    label: 'End',
                    nodeName: 'End'
                }
            }
        ],
        edges: [
            {
                id: 'e1',
                source: 'start',
                target: 'parse-companies'
            },
            {
                id: 'e2',
                source: 'parse-companies',
                target: 'loop-companies'
            },
            {
                id: 'e3',
                source: 'loop-companies',
                target: 'get-current-company'
            },
            {
                id: 'e4',
                source: 'get-current-company',
                target: 'get-ticker'
            },
            {
                id: 'e5',
                source: 'get-ticker',
                target: 'research-yahoo'
            },
            {
                id: 'e6',
                source: 'research-yahoo',
                target: 'collect-result'
            },
            {
                id: 'e7',
                source: 'collect-result',
                target: 'loop-companies'
            },
            {
                id: 'e8',
                source: 'loop-companies',
                target: 'prepare-summary-data',
                sourceHandle: 'break'
            },
            {
                id: 'e8b',
                source: 'prepare-summary-data',
                target: 'generate-summary'
            },
            {
                id: 'e9',
                source: 'generate-summary',
                target: 'end'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // =============================================================================
    // Yahoo Finance Stock Report
    // =============================================================================
    'yahoo-finance-stock-report': {
        id: 'yahoo-finance-stock-report',
        name: 'Yahoo Finance Stock Report',
        description: 'Research a stock on Yahoo Finance and generate a professional report',
        category: 'Finance',
        tags: [
            'finance',
            'yahoo',
            'stock',
            'report'
        ],
        difficulty: 'simple',
        estimatedTime: '2-3 minutes',
        nodes: [
            {
                id: 'start',
                type: 'start',
                position: {
                    x: 100,
                    y: 250
                },
                data: {
                    nodeType: 'start',
                    label: 'Start',
                    nodeName: 'Start',
                    inputVariables: [
                        {
                            name: 'ticker',
                            type: 'string',
                            required: true,
                            description: 'Stock ticker symbol (e.g., NVDA, AAPL, TSLA)',
                            defaultValue: 'NVDA'
                        }
                    ]
                }
            },
            {
                id: 'note-overview',
                type: 'note',
                position: {
                    x: 100,
                    y: 80
                },
                data: {
                    nodeType: 'note',
                    label: 'Workflow Overview',
                    noteText: `Yahoo Finance Stock Report

1. Agent searches Yahoo Finance
2. Uses Firecrawl MCP tools
3. Second agent formats report
4. Professional output

Simple 4-node workflow!`
                }
            },
            {
                id: 'research',
                type: 'agent',
                position: {
                    x: 350,
                    y: 250
                },
                data: {
                    nodeType: 'agent',
                    label: 'Research Stock',
                    nodeName: 'Research Stock',
                    instructions: 'Search Yahoo Finance for ticker ' + '{{input.ticker}}' + ' and gather:\n- Current price\n- Daily change ($ and %)\n- Market cap\n- P/E ratio\n- 52-week high/low\n- Top 2 recent news headlines\n\nUse Firecrawl MCP to search and scrape the data.',
                    model: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].anthropic,
                    outputFormat: 'Text',
                    mcpTools: [
                        {
                            name: 'Firecrawl',
                            url: 'https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp',
                            authType: 'url',
                            label: 'Firecrawl'
                        }
                    ]
                }
            },
            {
                id: 'write-report',
                type: 'agent',
                position: {
                    x: 600,
                    y: 250
                },
                data: {
                    nodeType: 'agent',
                    label: 'Write Report',
                    nodeName: 'Write Report',
                    instructions: 'Write a professional stock analysis report for ' + '{{input.ticker}}' + ' using this research:\n\n' + '{{lastOutput}}' + '\n\nInclude:\n- Executive Summary (3 sentences)\n- Key Metrics table\n- Performance Analysis\n- Recent News Summary\n- Investment Recommendation\n\nMake it professional and well-formatted.',
                    model: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].anthropic,
                    outputFormat: 'Text'
                }
            },
            {
                id: 'end',
                type: 'end',
                position: {
                    x: 850,
                    y: 250
                },
                data: {
                    nodeType: 'end',
                    label: 'End',
                    nodeName: 'End'
                }
            }
        ],
        edges: [
            {
                id: 'e1',
                source: 'start',
                target: 'research'
            },
            {
                id: 'e2',
                source: 'research',
                target: 'write-report'
            },
            {
                id: 'e3',
                source: 'write-report',
                target: 'end'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // =============================================================================
    // Simple Loop Test (No LLM)
    // =============================================================================
    'simple-loop-test': {
        id: 'simple-loop-test',
        name: 'Simple Loop Test (No LLM)',
        description: 'Test loop functionality with pure transforms - no LLM calls',
        category: 'Testing',
        tags: [
            'test',
            'loop',
            'transform'
        ],
        difficulty: 'simple',
        estimatedTime: '10 seconds',
        nodes: [
            {
                id: 'start',
                type: 'start',
                position: {
                    x: 100,
                    y: 200
                },
                data: {
                    nodeType: 'start',
                    label: 'Start',
                    nodeName: 'Start',
                    inputVariables: [
                        {
                            name: 'items',
                            type: 'string',
                            required: true,
                            description: 'Comma-separated items (e.g., Red, Blue, Green)',
                            defaultValue: 'Red, Blue, Green'
                        }
                    ]
                }
            },
            {
                id: 'note-overview',
                type: 'note',
                position: {
                    x: 100,
                    y: 50
                },
                data: {
                    nodeType: 'note',
                    label: 'Test Overview',
                    noteText: `Simple Loop Test

No LLM - pure transforms!
Tests loop functionality with data processing.

Fast execution for testing.`
                }
            },
            {
                id: 'parse-items',
                type: 'transform',
                position: {
                    x: 300,
                    y: 200
                },
                data: {
                    nodeType: 'transform',
                    label: 'Parse Items',
                    nodeName: 'Parse Items',
                    transformScript: `const items = input.items.split(',').map(i => i.trim());
return {
  items,
  totalCount: items.length,
  runningConcat: '', // Initialize running concatenation
  processedCount: 0   // Track how many we've processed
};`
                }
            },
            {
                id: 'loop-items',
                type: 'while',
                position: {
                    x: 500,
                    y: 200
                },
                data: {
                    nodeType: 'while',
                    label: 'Loop Items',
                    nodeName: 'Loop Items',
                    whileCondition: 'iteration <= state.variables["parse-items"].totalCount',
                    maxIterations: 10
                }
            },
            {
                id: 'get-current-item',
                type: 'transform',
                position: {
                    x: 650,
                    y: 100
                },
                data: {
                    nodeType: 'transform',
                    label: 'Get Current Item',
                    nodeName: 'Get Current Item',
                    transformScript: `const itemsData = state.variables['parse-items'] || {};
const items = itemsData.items || [];
const loopIteration = lastOutput.iteration !== undefined ? lastOutput.iteration : 1;
const currentIndex = loopIteration - 1;
const currentItem = items[currentIndex] || 'No Item';

console.log(\`Loop iteration \${loopIteration}: Processing "\${currentItem}" (index \${currentIndex})\`);

return {
  currentItem,
  currentIndex,
  totalCount: items.length,
  iteration: loopIteration
};`
                }
            },
            {
                id: 'process-item',
                type: 'transform',
                position: {
                    x: 850,
                    y: 100
                },
                data: {
                    nodeType: 'transform',
                    label: 'Process Item',
                    nodeName: 'Process Item',
                    transformScript: `const item = lastOutput.currentItem || 'Unknown';
const index = lastOutput.currentIndex || 0;
const iteration = lastOutput.iteration || 1;

// Apply multiple transformations to show data flow
const uppercase = item.toUpperCase();
const reversed = item.split('').reverse().join('');
const withEmoji = \`🎨 \${item} ✨\`;
const charCount = item.length;

console.log(\`  Processed "\${item}" -> "\${uppercase}" (reversed: "\${reversed}")\`);

return {
  item,
  index,
  iteration,
  uppercase,
  reversed,
  withEmoji,
  charCount,
  processedAt: new Date().toISOString()
};`
                }
            },
            {
                id: 'collect-item',
                type: 'transform',
                position: {
                    x: 1050,
                    y: 100
                },
                data: {
                    nodeType: 'transform',
                    label: 'Collect & Concatenate',
                    nodeName: 'Collect & Concatenate',
                    transformScript: `const processed = lastOutput || {};

// Get the current running concatenation from parse-items initial state
const parseData = state.variables['parse-items'] || {};
const loopResults = state.loopResults || [];

// Build running concatenation from all previous results
const previousConcat = loopResults.map(r => r.uppercase).join(' + ');
const newConcat = previousConcat ? \`\${previousConcat} + \${processed.uppercase}\` : processed.uppercase;

console.log(\`  Concatenation so far: "\${newConcat}"\`);

const result = {
  original: processed.item,
  uppercase: processed.uppercase,
  reversed: processed.reversed,
  withEmoji: processed.withEmoji,
  charCount: processed.charCount,
  index: processed.index,
  iteration: processed.iteration,
  runningConcat: newConcat,
  processedAt: processed.processedAt
};

return {
  ...result,
  __appendToLoopResults: result
};`
                }
            },
            {
                id: 'prepare-results',
                type: 'transform',
                position: {
                    x: 1250,
                    y: 200
                },
                data: {
                    nodeType: 'transform',
                    label: 'Prepare Results',
                    nodeName: 'Prepare Results',
                    transformScript: `const loopResults = state.loopResults || [];

console.log('Loop Complete! Final results:', JSON.stringify(loopResults, null, 2));

// Build comprehensive output showing context was preserved
const uppercaseSummary = loopResults.map(r => r.uppercase).join(' + ');
const reversedSummary = loopResults.map(r => r.reversed).join(' | ');
const emojiSummary = loopResults.map(r => r.withEmoji).join(' ');
const finalConcat = loopResults.length > 0 ? loopResults[loopResults.length - 1].runningConcat : '';

return {
  totalProcessed: loopResults.length,
  results: loopResults,
  uppercaseSummary,
  reversedSummary,
  emojiSummary,
  finalConcatenation: finalConcat,
  summary: \`Processed \${loopResults.length} items: \${uppercaseSummary}\`,
  message: '✨ Context preserved across all iterations! ✨'
};`
                }
            },
            {
                id: 'end',
                type: 'end',
                position: {
                    x: 1450,
                    y: 200
                },
                data: {
                    nodeType: 'end',
                    label: 'End',
                    nodeName: 'End'
                }
            }
        ],
        edges: [
            {
                id: 'e1',
                source: 'start',
                target: 'parse-items'
            },
            {
                id: 'e2',
                source: 'parse-items',
                target: 'loop-items'
            },
            {
                id: 'e3',
                source: 'loop-items',
                target: 'get-current-item'
            },
            {
                id: 'e4',
                source: 'get-current-item',
                target: 'process-item'
            },
            {
                id: 'e5',
                source: 'process-item',
                target: 'collect-item'
            },
            {
                id: 'e6',
                source: 'collect-item',
                target: 'loop-items'
            },
            {
                id: 'e7',
                source: 'loop-items',
                target: 'prepare-results',
                sourceHandle: 'break'
            },
            {
                id: 'e8',
                source: 'prepare-results',
                target: 'end'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // =============================================================================
    // Amazon Product Research (Simple)
    // =============================================================================
    'amazon-product-research': {
        id: 'amazon-product-research',
        name: 'Amazon Product Research',
        description: 'Research a product on Amazon - get details, reviews, and buying recommendation',
        category: 'E-commerce',
        tags: [
            'amazon',
            'shopping',
            'product',
            'firecrawl',
            'reviews'
        ],
        difficulty: 'simple',
        estimatedTime: '2-3 minutes',
        nodes: [
            {
                id: 'start',
                type: 'start',
                position: {
                    x: 100,
                    y: 250
                },
                data: {
                    nodeType: 'start',
                    label: 'Start',
                    nodeName: 'Start',
                    inputVariables: [
                        {
                            name: 'product',
                            type: 'string',
                            required: true,
                            description: 'Product to search for on Amazon (e.g., "mechanical keyboard", "noise cancelling headphones")',
                            defaultValue: 'wireless mouse'
                        }
                    ]
                }
            },
            {
                id: 'note-overview',
                type: 'note',
                position: {
                    x: 100,
                    y: 80
                },
                data: {
                    nodeType: 'note',
                    label: 'Workflow Overview',
                    noteText: `Amazon Product Research

Simple 3-agent workflow:
1. Search & scrape Amazon
2. Analyze reviews & features
3. Make recommendation

Great for: Shopping decisions, price research`
                }
            },
            {
                id: 'search-amazon',
                type: 'agent',
                position: {
                    x: 350,
                    y: 250
                },
                data: {
                    nodeType: 'agent',
                    label: 'Search & Scrape Amazon',
                    nodeName: 'Search & Scrape Amazon',
                    instructions: `Search Amazon for: {{input.product}}

1. Use firecrawl_search to find the product on Amazon
2. Identify the most relevant product listing
3. Use firecrawl_scrape on the product page URL
4. Extract key information:
   - Product title
   - Current price
   - Rating (out of 5 stars)
   - Number of reviews
   - Key features/specs
   - Top 3-5 customer review summaries

Return all extracted data in a clear format.`,
                    model: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].anthropic,
                    outputFormat: 'Text',
                    mcpTools: [
                        {
                            name: 'Firecrawl',
                            url: 'https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp',
                            authType: 'url',
                            label: 'Firecrawl'
                        }
                    ]
                }
            },
            {
                id: 'analyze-recommend',
                type: 'agent',
                position: {
                    x: 600,
                    y: 250
                },
                data: {
                    nodeType: 'agent',
                    label: 'Analyze & Recommend',
                    nodeName: 'Analyze & Recommend',
                    instructions: `Analyze this product data and create a buying recommendation:

{{lastOutput}}

Provide:

## Product Overview
(Name, price, rating summary)

## Pros & Cons
Based on reviews and features:
**Pros:**
- (list 3-5 positive aspects)

**Cons:**
- (list 3-5 negative aspects or concerns)

## Value Assessment
Is it worth the price? Compare to typical market prices.

## Recommendation
Clear BUY or SKIP recommendation with reasoning (2-3 sentences).

## Best For
Who would benefit most from this product?`,
                    model: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].anthropic,
                    outputFormat: 'Text'
                }
            },
            {
                id: 'end',
                type: 'end',
                position: {
                    x: 850,
                    y: 250
                },
                data: {
                    nodeType: 'end',
                    label: 'End',
                    nodeName: 'End'
                }
            }
        ],
        edges: [
            {
                id: 'e1',
                source: 'start',
                target: 'search-amazon'
            },
            {
                id: 'e2',
                source: 'search-amazon',
                target: 'analyze-recommend'
            },
            {
                id: 'e3',
                source: 'analyze-recommend',
                target: 'end'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // =============================================================================
    // Zillow Property Finder (Intermediate)
    // =============================================================================
    'zillow-property-finder': {
        id: 'zillow-property-finder',
        name: 'Zillow Property Finder',
        description: 'Find and compare properties on Zillow matching your criteria',
        category: 'Real Estate',
        tags: [
            'zillow',
            'real-estate',
            'property',
            'firecrawl',
            'loop',
            'comparison'
        ],
        difficulty: 'intermediate',
        estimatedTime: '4-6 minutes',
        nodes: [
            {
                id: 'start',
                type: 'start',
                position: {
                    x: 100,
                    y: 350
                },
                data: {
                    nodeType: 'start',
                    label: 'Start',
                    nodeName: 'Start',
                    inputVariables: [
                        {
                            name: 'location',
                            type: 'string',
                            required: true,
                            description: 'City and state (e.g., "Austin, TX", "Seattle, WA")',
                            defaultValue: 'Austin, TX'
                        },
                        {
                            name: 'max_price',
                            type: 'string',
                            required: true,
                            description: 'Maximum price (e.g., "500000")',
                            defaultValue: '500000'
                        },
                        {
                            name: 'min_beds',
                            type: 'string',
                            required: true,
                            description: 'Minimum bedrooms',
                            defaultValue: '3'
                        }
                    ]
                }
            },
            {
                id: 'note-overview',
                type: 'note',
                position: {
                    x: 100,
                    y: 100
                },
                data: {
                    nodeType: 'note',
                    label: 'Workflow Overview',
                    noteText: `Zillow Property Finder

Demonstrates:
1. Search Zillow with filters
2. Parse property listings
3. LOOP through top properties
4. Scrape & analyze each
5. Generate comparison report

Intermediate complexity with loops!`
                }
            },
            {
                id: 'search-zillow',
                type: 'agent',
                position: {
                    x: 350,
                    y: 350
                },
                data: {
                    nodeType: 'agent',
                    label: 'Search Zillow',
                    nodeName: 'Search Zillow',
                    instructions: 'Search Zillow for properties matching:\n' + '- Location: {{input.location}}\n' + '- Max Price: ${{input.max_price}}\n' + '- Min Bedrooms: {{input.min_beds}}\n' + '\n' + 'Use firecrawl_search to find properties on Zillow.\n' + 'Then use firecrawl_scrape on the Zillow search results page.\n' + '\n' + 'Extract and return a JSON array of the top 5 properties with:\n' + '{\n' + '  "properties": [\n' + '    {\n' + '      "address": "123 Main St",\n' + '      "price": 450000,\n' + '      "beds": 3,\n' + '      "baths": 2,\n' + '      "sqft": 1800,\n' + '      "zillow_url": "https://www.zillow.com/..."\n' + '    }\n' + '  ]\n' + '}\n' + '\n' + 'Return ONLY the JSON, no other text.',
                    model: 'anthropic/claude-sonnet-4-20250514',
                    outputFormat: 'JSON',
                    jsonOutputSchema: JSON.stringify({
                        type: 'object',
                        properties: {
                            properties: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        address: {
                                            type: 'string'
                                        },
                                        price: {
                                            type: 'number'
                                        },
                                        beds: {
                                            type: 'number'
                                        },
                                        baths: {
                                            type: 'number'
                                        },
                                        sqft: {
                                            type: 'number'
                                        },
                                        zillow_url: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    mcpTools: [
                        {
                            name: 'Firecrawl',
                            url: 'https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp',
                            authType: 'url',
                            label: 'Firecrawl'
                        }
                    ]
                }
            },
            {
                id: 'parse-properties',
                type: 'transform',
                position: {
                    x: 600,
                    y: 350
                },
                data: {
                    nodeType: 'transform',
                    label: 'Parse Properties',
                    nodeName: 'Parse Properties',
                    transformScript: `// Parse the property listings - handle both pure JSON and markdown-wrapped JSON
let data;
if (typeof lastOutput === 'string') {
  // Try to extract JSON from markdown code blocks
  const jsonMatch = lastOutput.match(/\`\`\`(?:json)?\\s*([\\s\\S]*?)\\s*\`\`\`/);
  if (jsonMatch) {
    data = JSON.parse(jsonMatch[1]);
  } else {
    // Try to parse directly
    data = JSON.parse(lastOutput);
  }
} else {
  data = lastOutput;
}

const properties = data.properties || [];

console.log(\`Found \${properties.length} properties to analyze\`);

return {
  properties,
  totalCount: properties.length,
  location: input.location
};`
                }
            },
            {
                id: 'loop-properties',
                type: 'while',
                position: {
                    x: 850,
                    y: 350
                },
                data: {
                    nodeType: 'while',
                    label: 'Loop Properties',
                    nodeName: 'Loop Properties',
                    whileCondition: 'iteration <= state.variables["parse-properties"].totalCount',
                    maxIterations: 5
                }
            },
            {
                id: 'get-current-property',
                type: 'transform',
                position: {
                    x: 1000,
                    y: 200
                },
                data: {
                    nodeType: 'transform',
                    label: 'Get Current Property',
                    nodeName: 'Get Current Property',
                    transformScript: `const propertiesData = state.variables['parse-properties'] || {};
const properties = propertiesData.properties || [];

const loopIteration = lastOutput.iteration !== undefined ? lastOutput.iteration : 1;
const currentIndex = loopIteration - 1;
const property = properties[currentIndex] || {};

console.log(\`🏠 Analyzing property \${loopIteration}: \${property.address}\`);

return {
  ...property,
  currentIndex,
  iteration: loopIteration
};`
                }
            },
            {
                id: 'analyze-property',
                type: 'agent',
                position: {
                    x: 1200,
                    y: 200
                },
                data: {
                    nodeType: 'agent',
                    label: 'Analyze Property',
                    nodeName: 'Analyze Property',
                    instructions: 'Analyze this property:\n' + '\n' + 'Address: {{lastOutput.address}}\n' + 'Price: ${{lastOutput.price}}\n' + 'Beds: {{lastOutput.beds}} | Baths: {{lastOutput.baths}}\n' + 'Square Feet: {{lastOutput.sqft}}\n' + 'URL: {{lastOutput.zillow_url}}\n' + '\n' + 'Use firecrawl_scrape to get more details from the Zillow URL if needed.\n' + '\n' + 'Provide analysis:\n' + '\n' + '**Value Assessment:**\n' + '- Price per sqft: $[calculate]\n' + '- Value rating: [Good/Fair/Poor Deal]\n' + '\n' + '**Property Highlights:**\n' + '- [2-3 key features or concerns]\n' + '\n' + '**Investment Potential:**\n' + '- [Brief assessment for rental/resale]\n' + '\n' + 'Keep it concise (3-4 sentences total).',
                    model: 'groq/openai/gpt-oss-120b',
                    outputFormat: 'Text',
                    mcpTools: [
                        {
                            name: 'Firecrawl',
                            url: 'https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp',
                            authType: 'url',
                            label: 'Firecrawl'
                        }
                    ]
                }
            },
            {
                id: 'collect-property',
                type: 'transform',
                position: {
                    x: 1400,
                    y: 200
                },
                data: {
                    nodeType: 'transform',
                    label: 'Collect Result',
                    nodeName: 'Collect Result',
                    transformScript: `const propertyData = state.variables['get-current-property'] || {};
const analysis = lastOutput || 'No analysis available';

const result = {
  address: propertyData.address,
  price: propertyData.price,
  beds: propertyData.beds,
  baths: propertyData.baths,
  sqft: propertyData.sqft,
  url: propertyData.zillow_url,
  analysis: analysis,
  pricePerSqft: propertyData.sqft > 0 ? Math.round(propertyData.price / propertyData.sqft) : 0
};

console.log(\`Collected analysis for: \${result.address}\`);

return {
  ...result,
  __appendToLoopResults: result
};`
                }
            },
            {
                id: 'prepare-comparison',
                type: 'transform',
                position: {
                    x: 1550,
                    y: 350
                },
                data: {
                    nodeType: 'transform',
                    label: 'Prepare Comparison',
                    nodeName: 'Prepare Comparison',
                    transformScript: `const loopResults = state.loopResults || [];

console.log(\`Preparing comparison of \${loopResults.length} properties\`);

// Sort by price per sqft (best value first)
const sorted = [...loopResults].sort((a, b) => a.pricePerSqft - b.pricePerSqft);

return {
  properties: sorted,
  totalAnalyzed: loopResults.length,
  bestValue: sorted[0],
  location: state.variables['parse-properties']?.location || 'Unknown'
};`
                }
            },
            {
                id: 'generate-report',
                type: 'agent',
                position: {
                    x: 1800,
                    y: 350
                },
                data: {
                    nodeType: 'agent',
                    label: 'Generate Report',
                    nodeName: 'Generate Comparison Report',
                    instructions: `Create a property comparison report for {{lastOutput.location}}:

Properties analyzed: {{lastOutput.totalAnalyzed}}

Property data:
{{JSON.stringify(lastOutput.properties, null, 2)}}

Format as:

# Property Comparison Report - {{lastOutput.location}}

## Top Recommendation
[Best value property with reasoning]

## All Properties (Ranked by Value)

### 1. [Address]
- **Price:** $[price] | **$/sqft:** $[pricePerSqft]
- **Specs:** [beds] bed, [baths] bath, [sqft] sqft
- **Analysis:** [analysis]
- **Link:** [url]

[Repeat for each property...]

## Summary
[2-3 sentences on market insights and recommendations]`,
                    model: 'groq/openai/gpt-oss-120b',
                    outputFormat: 'Text'
                }
            },
            {
                id: 'end',
                type: 'end',
                position: {
                    x: 2050,
                    y: 350
                },
                data: {
                    nodeType: 'end',
                    label: 'End',
                    nodeName: 'End'
                }
            }
        ],
        edges: [
            {
                id: 'e1',
                source: 'start',
                target: 'search-zillow'
            },
            {
                id: 'e2',
                source: 'search-zillow',
                target: 'parse-properties'
            },
            {
                id: 'e3',
                source: 'parse-properties',
                target: 'loop-properties'
            },
            {
                id: 'e4',
                source: 'loop-properties',
                target: 'get-current-property'
            },
            {
                id: 'e5',
                source: 'get-current-property',
                target: 'analyze-property'
            },
            {
                id: 'e6',
                source: 'analyze-property',
                target: 'collect-property'
            },
            {
                id: 'e7',
                source: 'collect-property',
                target: 'loop-properties'
            },
            {
                id: 'e8',
                source: 'loop-properties',
                target: 'prepare-comparison',
                sourceHandle: 'break'
            },
            {
                id: 'e9',
                source: 'prepare-comparison',
                target: 'generate-report'
            },
            {
                id: 'e10',
                source: 'generate-report',
                target: 'end'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // =============================================================================
    // Human-in-the-Loop Approval Demo
    // =============================================================================
    'human-in-loop-approval': {
        id: 'human-in-loop-approval',
        name: 'Human-in-the-Loop Approval Demo',
        description: 'Test workflow pausing for human approval with Convex real-time updates',
        category: 'Demo',
        tags: [
            'approval',
            'human-in-loop',
            'convex',
            'demo'
        ],
        difficulty: 'simple',
        estimatedTime: '30 seconds + your approval time',
        nodes: [
            {
                id: 'start',
                type: 'start',
                position: {
                    x: 100,
                    y: 250
                },
                data: {
                    nodeType: 'start',
                    label: 'Start',
                    nodeName: 'Start',
                    inputVariables: [
                        {
                            name: 'task',
                            type: 'string',
                            required: true,
                            description: 'What task should we ask approval for?',
                            defaultValue: 'Send 100 emails to customers'
                        }
                    ]
                }
            },
            {
                id: 'note-overview',
                type: 'note',
                position: {
                    x: 100,
                    y: 80
                },
                data: {
                    nodeType: 'note',
                    label: 'Demo Overview',
                    noteText: `Human-in-the-Loop Approval

Tests Convex real-time approvals:
1. Workflow analyzes task
2. PAUSES for your approval
3. You approve/reject in UI
4. Workflow resumes instantly
5. Executes approved task

Watch execution panel!`
                }
            },
            {
                id: 'analyze-task',
                type: 'transform',
                position: {
                    x: 350,
                    y: 250
                },
                data: {
                    nodeType: 'transform',
                    label: 'Analyze Task',
                    nodeName: 'Analyze Task',
                    transformScript: `const task = input.task || 'Unknown task';

// Simulate analysis
const analysis = {
  task: task,
  risk: task.toLowerCase().includes('delete') ? 'HIGH' :
        task.toLowerCase().includes('email') ? 'MEDIUM' : 'LOW',
  estimated_time: '5 minutes',
  reversible: !task.toLowerCase().includes('delete'),
  requires_approval: true,
};

return {
  ...analysis,
  message: \`Task analyzed: \${task}\`,
  recommendation: analysis.risk === 'HIGH' ? 'Careful review needed' : 'Should be safe'
};`
                }
            },
            {
                id: 'request-approval',
                type: 'user-approval',
                position: {
                    x: 600,
                    y: 250
                },
                data: {
                    nodeType: 'user-approval',
                    label: 'Request Approval',
                    nodeName: 'Request Human Approval',
                    approvalMessage: 'TASK ANALYSIS COMPLETE\n\nTask: {{analyze-task.task}}\nRisk Level: {{analyze-task.risk}}\nEstimated Time: {{analyze-task.estimated_time}}\nReversible: {{analyze-task.reversible}}\n\nRecommendation: {{analyze-task.recommendation}}\n\nDo you approve this task?'
                }
            },
            {
                id: 'execute-task',
                type: 'transform',
                position: {
                    x: 850,
                    y: 250
                },
                data: {
                    nodeType: 'transform',
                    label: 'Execute Task',
                    nodeName: 'Execute Approved Task',
                    transformScript: `const taskInfo = state.variables['analyze-task'] || {};

return {
  status: 'completed',
  task: taskInfo.task,
  executed_at: new Date().toISOString(),
  approved_by: 'user',
  result: \`Successfully executed: \${taskInfo.task}\`,
  message: 'Task completed after approval'
};`
                }
            },
            {
                id: 'end',
                type: 'end',
                position: {
                    x: 1100,
                    y: 250
                },
                data: {
                    nodeType: 'end',
                    label: 'End',
                    nodeName: 'End'
                }
            }
        ],
        edges: [
            {
                id: 'e1',
                source: 'start',
                target: 'analyze-task'
            },
            {
                id: 'e2',
                source: 'analyze-task',
                target: 'request-approval'
            },
            {
                id: 'e3',
                source: 'request-approval',
                target: 'execute-task'
            },
            {
                id: 'e4',
                source: 'execute-task',
                target: 'end'
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
};
function getTemplate(templateId) {
    return templates[templateId] || null;
}
function listTemplates() {
    return Object.values(templates).map((t)=>({
            id: t.id,
            name: t.name,
            description: t.description,
            category: t.category,
            tags: t.tags,
            difficulty: t.difficulty,
            estimatedTime: t.estimatedTime
        }));
}
}),
"[project]/lib/tools/registry.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getToolDefinition",
    ()=>getToolDefinition,
    "getToolsByCategory",
    ()=>getToolsByCategory,
    "toolRegistry",
    ()=>toolRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
;
const toolRegistry = [
    // --- Web Search Tools ---
    {
        id: "serper-search",
        name: "serper",
        label: "Serper Search",
        description: "Google Search API via Serper.dev. Fast and cheap.",
        category: "web-search",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your Serper API Key",
                description: "Get it from serper.dev",
                global: true
            },
            {
                name: "numResults",
                label: "Number of Results",
                type: "number",
                defaultValue: 5,
                required: false
            }
        ]
    },
    {
        id: "serpapi-search",
        name: "serpapi",
        label: "SerpAPI",
        description: "Real-time API to access Google search results.",
        category: "web-search",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your SerpAPI Key",
                description: "Get it from serpapi.com",
                global: true
            },
            {
                name: "engine",
                label: "Engine",
                type: "select",
                defaultValue: "google",
                options: [
                    {
                        label: "Google",
                        value: "google"
                    },
                    {
                        label: "Bing",
                        value: "bing"
                    },
                    {
                        label: "DuckDuckGo",
                        value: "duckduckgo"
                    }
                ]
            }
        ]
    },
    {
        id: "tavily-search",
        name: "tavily",
        label: "Tavily Search",
        description: "Search engine optimized for LLMs and RAG.",
        category: "web-search",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your Tavily API Key",
                description: "Get it from tavily.com",
                global: true
            },
            {
                name: "searchDepth",
                label: "Search Depth",
                type: "select",
                defaultValue: "basic",
                options: [
                    {
                        label: "Basic",
                        value: "basic"
                    },
                    {
                        label: "Advanced",
                        value: "advanced"
                    }
                ]
            }
        ]
    },
    // --- Scraping Tools ---
    {
        id: "scraperapi",
        name: "scraperapi",
        label: "ScraperAPI",
        description: "Proxy API for web scraping. Handles CAPTCHAs and IP rotation.",
        category: "scraping",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your ScraperAPI Key",
                description: "Get it from scraperapi.com",
                global: true
            },
            {
                name: "renderJS",
                label: "Render JavaScript",
                type: "boolean",
                defaultValue: false
            }
        ]
    },
    {
        id: "firecrawl",
        name: "firecrawl",
        label: "Firecrawl",
        description: "Turn any website into LLM-ready markdown.",
        category: "scraping",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your Firecrawl API Key",
                description: "Get it from firecrawl.dev",
                global: true
            },
            {
                name: "mode",
                label: "Mode",
                type: "select",
                defaultValue: "scrape",
                options: [
                    {
                        label: "Scrape (Single Page)",
                        value: "scrape"
                    },
                    {
                        label: "Crawl (Entire Site)",
                        value: "crawl"
                    }
                ]
            }
        ]
    },
    {
        id: "browserless",
        name: "browserless",
        label: "Browserless / Playwright",
        description: "Headless Chrome as a service for scraping, automation, screenshots, and PDF generation.",
        category: "scraping",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        fields: [
            {
                name: "apiKey",
                label: "API Key",
                type: "secret",
                required: true,
                placeholder: "Enter your Browserless API Key",
                description: "Get it from browserless.io or use local Playwright",
                global: true
            },
            {
                name: "waitForSelector",
                label: "Wait for Selector",
                type: "string",
                required: false,
                placeholder: "e.g., .content, #main",
                description: "CSS selector to wait for before scraping"
            },
            {
                name: "executeScript",
                label: "Execute JavaScript",
                type: "string",
                required: false,
                placeholder: "e.g., window.scrollTo(0, document.body.scrollHeight)",
                description: "JavaScript to execute on the page"
            },
            {
                name: "screenshot",
                label: "Take Screenshot",
                type: "boolean",
                defaultValue: false,
                description: "Capture a screenshot of the page"
            },
            {
                name: "pdf",
                label: "Generate PDF",
                type: "boolean",
                defaultValue: false,
                description: "Generate a PDF of the page"
            },
            {
                name: "timeout",
                label: "Timeout (ms)",
                type: "number",
                defaultValue: 30000,
                description: "Maximum wait time in milliseconds"
            }
        ]
    },
    // --- Content Extraction ---
    {
        id: "content-extractor",
        name: "content-extractor",
        label: "Content Extractor",
        description: "Extract main content from a webpage URL.",
        category: "extraction",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        fields: [
            {
                name: "includeImages",
                label: "Include Images",
                type: "boolean",
                defaultValue: false
            }
        ]
    }
];
const getToolDefinition = (toolId)=>toolRegistry.find((t)=>t.id === toolId);
const getToolsByCategory = (category)=>toolRegistry.filter((t)=>t.category === category);
}),
"[project]/lib/workflow/storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteMCPServer",
    ()=>deleteMCPServer,
    "deleteWorkflow",
    ()=>deleteWorkflow,
    "getCurrentWorkflowId",
    ()=>getCurrentWorkflowId,
    "getMCPServer",
    ()=>getMCPServer,
    "getMCPServers",
    ()=>getMCPServers,
    "getWorkflow",
    ()=>getWorkflow,
    "getWorkflows",
    ()=>getWorkflows,
    "saveMCPServer",
    ()=>saveMCPServer,
    "saveWorkflow",
    ()=>saveWorkflow,
    "setCurrentWorkflow",
    ()=>setCurrentWorkflow
]);
const saveWorkflow = (workflow)=>{
    console.log('⚠️ saveWorkflow called - localStorage disabled, use API instead');
// No-op: workflows saved via POST /api/workflows
};
const getWorkflows = ()=>{
    console.log('⚠️ getWorkflows called - localStorage disabled, use API instead');
    return [];
};
const getWorkflow = (id)=>{
    console.log('⚠️ getWorkflow called - localStorage disabled, use API instead');
    return null;
};
const deleteWorkflow = (id)=>{
    console.log('⚠️ deleteWorkflow called - localStorage disabled, use API instead');
// No-op: workflows deleted via DELETE /api/workflows/[id]
};
const setCurrentWorkflow = (workflowId)=>{
    console.log('⚠️ setCurrentWorkflow called - localStorage disabled');
// No-op: workflow ID tracked via URL params
};
const getCurrentWorkflowId = ()=>{
    console.log('⚠️ getCurrentWorkflowId called - localStorage disabled');
    return null;
};
const saveMCPServer = (server)=>{
    console.log('⚠️ saveMCPServer called - localStorage disabled');
// No-op: MCP servers should be managed via API if needed
};
const getMCPServers = ()=>{
    console.log('⚠️ getMCPServers called - localStorage disabled');
    return [];
};
const getMCPServer = (id)=>{
    console.log('⚠️ getMCPServer called - localStorage disabled');
    return null;
};
const deleteMCPServer = (id)=>{
    console.log('⚠️ deleteMCPServer called - localStorage disabled');
// No-op
};
}),
"[project]/lib/workflow/edge-cleanup.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanupInvalidEdges",
    ()=>cleanupInvalidEdges
]);
function cleanupInvalidEdges(nodes, edges) {
    const validNodeIds = new Set(nodes.map((n)=>n.id));
    const validEdges = [];
    let removedCount = 0;
    for (const edge of edges){
        // Check if both source and target nodes exist
        const sourceExists = validNodeIds.has(edge.source);
        const targetExists = validNodeIds.has(edge.target);
        if (!sourceExists || !targetExists) {
            console.warn(`🧹 Removing invalid edge ${edge.id}: source=${edge.source} (exists: ${sourceExists}), target=${edge.target} (exists: ${targetExists})`);
            removedCount++;
            continue;
        }
        validEdges.push(edge);
    }
    if (removedCount > 0) {
        console.log(`✅ Cleaned up ${removedCount} invalid edge(s) from workflow`);
    }
    return {
        nodes,
        edges: validEdges,
        removedCount
    };
}
}),
"[project]/lib/workflow/duplicate-detection.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectDuplicateCredentials",
    ()=>detectDuplicateCredentials
]);
function detectDuplicateCredentials(workflow) {
    const credentialMap = new Map();
    // Scan all nodes for MCP servers
    workflow.nodes.forEach((node)=>{
        const mcpTools = node.data?.mcpTools || [];
        mcpTools.forEach((mcp)=>{
            // Skip if no authentication
            if (!mcp.accessToken || mcp.authType === 'None') return;
            // Create unique key for this credential
            // Use URL + token (or token pattern for env vars)
            const isEnvVar = mcp.accessToken.startsWith('${') && mcp.accessToken.endsWith('}');
            const credentialKey = `${mcp.url}:${mcp.accessToken}`;
            if (!credentialMap.has(credentialKey)) {
                credentialMap.set(credentialKey, {
                    serverName: mcp.name,
                    serverUrl: mcp.url,
                    credential: isEnvVar ? mcp.accessToken : maskCredential(mcp.accessToken),
                    nodeIds: [],
                    nodeNames: []
                });
            }
            const entry = credentialMap.get(credentialKey);
            entry.nodeIds.push(node.id);
            // Get node name from data
            const nodeName = node.data?.nodeName || node.data?.name || (typeof node.data?.label === 'string' ? node.data.label : node.id);
            entry.nodeNames.push(nodeName);
        });
    });
    // Filter to only duplicates (used in 2+ nodes)
    const warnings = [];
    credentialMap.forEach((entry)=>{
        if (entry.nodeIds.length > 1) {
            // Skip warnings for common shared services like Firecrawl
            const isSharedService = entry.serverName.toLowerCase().includes('firecrawl') || entry.serverName.toLowerCase().includes('arcade') || entry.serverUrl.includes('firecrawl.dev') || entry.serverUrl.includes('arcade.dev');
            if (!isSharedService) {
                warnings.push({
                    type: 'duplicate-credential',
                    message: `MCP server "${entry.serverName}" uses the same credential in ${entry.nodeIds.length} nodes`,
                    serverName: entry.serverName,
                    serverUrl: entry.serverUrl,
                    credential: entry.credential,
                    nodeIds: entry.nodeIds,
                    nodeNames: entry.nodeNames
                });
            }
        }
    });
    return warnings;
}
/**
 * Mask credential for display (show first/last 4 chars)
 */ function maskCredential(credential) {
    if (credential.length <= 8) {
        return '****';
    }
    const first = credential.substring(0, 4);
    const last = credential.substring(credential.length - 4);
    const middle = '*'.repeat(Math.min(credential.length - 8, 12));
    return `${first}${middle}${last}`;
}
}),
"[project]/convex/_generated/api.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable */ /**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */ __turbopack_context__.s([
    "api",
    ()=>api,
    "components",
    ()=>components,
    "internal",
    ()=>internal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/server/components/index.js [app-ssr] (ecmascript) <locals>");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anyApi"];
const internal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anyApi"];
const components = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$server$2f$components$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["componentsGeneric"])();
}),
"[project]/hooks/useWorkflow.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMCPServers",
    ()=>useMCPServers,
    "useWorkflow",
    ()=>useWorkflow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/workflow/storage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$edge$2d$cleanup$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/workflow/edge-cleanup.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/models.ts [app-ssr] (ecmascript)");
;
;
;
;
// Prevents circular reference errors during JSON serialization
// by removing problematic properties from React components.
const getCircularReplacer = ()=>{
    const seen = new WeakSet();
    return (key, value)=>{
        if (key === 'Provider' || key === '$$typeof' || key === '_owner' || key === '_store') {
            return undefined;
        }
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
function useWorkflow(workflowId) {
    const [workflow, setWorkflow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [workflows, setWorkflows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [convexId, setConvexId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null); // Track Convex ID
    const saveToConvexTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Load workflow from Redis via API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadWorkflow = async ()=>{
            setLoading(true);
            if (workflowId) {
                // Fetch workflow from API (Redis)
                try {
                    const response = await fetch(`/api/workflows/${workflowId}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch workflow with status: ${response.status}`);
                    }
                    const fullWorkflow = await response.json();
                    let workflowData = fullWorkflow.workflow;
                    if (workflowData) {
                        // Clean up any invalid edges before setting the workflow
                        const cleaned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$edge$2d$cleanup$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanupInvalidEdges"])(workflowData.nodes, workflowData.edges);
                        if (cleaned.removedCount > 0) {
                            console.log(`🧹 Cleaned ${cleaned.removedCount} invalid edges from loaded workflow`);
                            workflowData = {
                                ...workflowData,
                                nodes: cleaned.nodes,
                                edges: cleaned.edges
                            };
                        }
                        setWorkflow(workflowData);
                        setConvexId(workflowData._convexId || workflowData._id || null);
                    } else {
                        console.error('Workflow not found, creating a new one.');
                        createNewWorkflow();
                    }
                } catch (error) {
                    console.error('Failed to load workflow from Convex:', error);
                    createNewWorkflow();
                }
            } else {
                createNewWorkflow();
            }
            setLoading(false);
        };
        loadWorkflow();
    }, [
        workflowId
    ]);
    // Load all workflows from API
    const loadWorkflows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const response = await fetch('/api/workflows');
            const data = await response.json();
            setWorkflows(data.workflows || []);
        } catch (error) {
            console.error('Failed to load workflows from API:', error);
            setWorkflows([]);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadWorkflows();
    }, [
        loadWorkflows
    ]);
    // Create new workflow
    const createNewWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const newWorkflow = {
            id: `workflow_${Date.now()}`,
            name: 'New Workflow',
            nodes: [
                {
                    id: 'node_0',
                    type: 'start',
                    position: {
                        x: 250,
                        y: 100
                    },
                    data: {
                        label: 'Start'
                    }
                },
                {
                    id: 'node_1',
                    type: 'agent',
                    position: {
                        x: 250,
                        y: 250
                    },
                    data: {
                        label: 'Agent',
                        name: 'My agent',
                        instructions: 'You are a helpful assistant.',
                        model: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].openai,
                        includeChatHistory: true,
                        tools: [],
                        outputFormat: 'Text'
                    }
                }
            ],
            edges: [
                {
                    id: 'edge_0_1',
                    source: 'node_0',
                    target: 'node_1'
                }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setWorkflow(newWorkflow);
        // No longer save to localStorage
        // Workflow will be saved via API when user makes changes
        return newWorkflow;
    }, []);
    // Save workflow with debounce to prevent multiple rapid saves
    // Use useCallback with minimal deps to prevent infinite loops
    const saveWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (updates)=>{
        // If no workflow exists yet, create a new one from updates
        if (!workflow) {
            if (!updates || !updates.nodes || !updates.edges) {
                console.warn('⚠️ Cannot save workflow: no workflow state and incomplete updates');
                return;
            }
            // Create a complete workflow from updates
            const newWorkflow = {
                id: updates.id || `workflow_${Date.now()}`,
                name: updates.name || 'New Workflow',
                description: updates.description,
                nodes: updates.nodes,
                edges: updates.edges,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setWorkflow(newWorkflow);
            // Save immediately to Convex
            try {
                const response = await fetch('/api/workflows', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newWorkflow, getCircularReplacer())
                });
                const data = await response.json();
                console.log('💾 New workflow saved to Convex:', data.success ? 'SUCCESS' : 'FAILED');
                // Store the Convex ID from the response
                if (data.success && data.workflowId) {
                    setConvexId(data.workflowId);
                }
            } catch (error) {
                console.error('Failed to save new workflow to Convex:', error);
            }
            return;
        }
        const updated = {
            ...workflow,
            ...updates,
            updatedAt: new Date().toISOString()
        };
        setWorkflow(updated);
        // Clear any pending save timeout
        if (saveToConvexTimeoutRef.current) {
            clearTimeout(saveToConvexTimeoutRef.current);
        }
        // Debounce the save to Convex to prevent rapid saves
        saveToConvexTimeoutRef.current = setTimeout(async ()=>{
            try {
                const response = await fetch('/api/workflows', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updated, getCircularReplacer())
                });
                const data = await response.json();
                // Store the Convex ID from the response
                if (data.success && data.workflowId) {
                    setConvexId(data.workflowId);
                }
            // Don't reload workflows on every save - only when explicitly needed
            // This prevents unnecessary re-fetches and duplicate saves
            } catch (error) {
                console.error('Failed to save workflow to Convex:', error);
            }
        }, 1000); // 1000ms debounce to batch rapid saves
    }, [
        workflow,
        loadWorkflows
    ]);
    // Update nodes
    const updateNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nodes)=>{
        if (!workflow) {
            console.warn('⚠️ updateNodes called but no workflow exists');
            return;
        }
        console.log('📝 updateNodes called with', nodes.length, 'nodes');
        saveWorkflow({
            nodes
        });
    }, [
        workflow,
        saveWorkflow
    ]);
    // Update edges
    const updateEdges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((edges)=>{
        if (!workflow) return;
        saveWorkflow({
            edges
        });
    }, [
        workflow,
        saveWorkflow
    ]);
    // Update node data
    const updateNodeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nodeId, data)=>{
        if (!workflow) return;
        const nodes = workflow.nodes.map((node)=>node.id === nodeId ? {
                ...node,
                data: {
                    ...node.data,
                    ...data
                }
            } : node);
        updateNodes(nodes);
    }, [
        workflow,
        updateNodes
    ]);
    // Delete workflow
    const deleteWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteWorkflow"])(id);
        loadWorkflows();
        if (workflow?.id === id) {
            createNewWorkflow();
        }
    }, [
        workflow,
        loadWorkflows,
        createNewWorkflow
    ]);
    // Save workflow immediately (non-debounced) - used before execution
    const saveWorkflowImmediate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (updates)=>{
        if (!workflow) {
            console.warn('⚠️ Cannot save workflow immediately: no workflow state');
            return;
        }
        const updated = {
            ...workflow,
            ...updates,
            updatedAt: new Date().toISOString()
        };
        setWorkflow(updated);
        // Cancel any pending debounced saves
        if (saveToConvexTimeoutRef.current) {
            clearTimeout(saveToConvexTimeoutRef.current);
            saveToConvexTimeoutRef.current = null;
        }
        // Save immediately without debounce
        try {
            const response = await fetch('/api/workflows', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updated, getCircularReplacer())
            });
            const data = await response.json();
            console.log('💾 [IMMEDIATE SAVE] Workflow saved to Convex:', data.success ? '✅ SUCCESS' : '❌ FAILED');
            if (data.success && data.workflowId) {
                setConvexId(data.workflowId);
            }
            return data.success;
        } catch (error) {
            console.error('❌ Failed to save workflow immediately:', error);
            return false;
        }
    }, [
        workflow
    ]);
    return {
        workflow,
        workflows,
        loading,
        convexId,
        saveWorkflow,
        saveWorkflowImmediate,
        updateNodes,
        updateEdges,
        updateNodeData,
        deleteWorkflow,
        createNewWorkflow,
        loadWorkflows
    };
}
function useMCPServers() {
    const [servers, setServers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadServers();
    }, []);
    const loadServers = ()=>{
        const loaded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMCPServers"])();
        setServers(loaded);
    };
    const addServer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((server)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveMCPServer"])(server);
        loadServers();
    }, []);
    const updateServer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id, updates)=>{
        const existing = servers.find((s)=>s.id === id);
        if (existing) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveMCPServer"])({
                ...existing,
                ...updates
            });
            loadServers();
        }
    }, [
        servers
    ]);
    return {
        servers,
        addServer,
        updateServer,
        loadServers
    };
}
}),
"[project]/hooks/useWorkflowExecution.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkflowExecution",
    ()=>useWorkflowExecution
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
const clone = (value)=>{
    if (typeof structuredClone === 'function') {
        try {
            return structuredClone(value);
        } catch (error) {
        // Fallback to JSON cloning
        }
    }
    return JSON.parse(JSON.stringify(value));
};
const loadStoredApiKeys = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return {};
    }
    //TURBOPACK unreachable
    ;
};
function useWorkflowExecution() {
    const [execution, setExecution] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentNodeId, setCurrentNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nodeResults, setNodeResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [pendingAuth, setPendingAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentWorkflow, setCurrentWorkflow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const abortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pendingResumeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Cleanup on unmount to prevent memory leaks
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            // Only abort if there's an active workflow running
            if (abortControllerRef.current && isRunning) {
                console.log('🧹 Cleanup: Aborting active workflow on unmount');
                abortControllerRef.current.abort();
                abortControllerRef.current = null;
            }
            // Clear pending resume data
            pendingResumeRef.current = null;
        };
    }, [
        isRunning
    ]);
    const runWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (workflow, input)=>{
        if (!workflow) {
            console.error('No workflow to execute');
            return;
        }
        setIsRunning(true);
        setNodeResults({});
        setCurrentNodeId(null);
        setPendingAuth(null);
        setCurrentWorkflow(workflow);
        pendingResumeRef.current = null;
        // Create abort controller
        abortControllerRef.current = new AbortController();
        try {
            // Fetch API keys from server
            const configResponse = await fetch('/api/config');
            const apiConfig = await configResponse.json();
            // Execute workflow via LangGraph streaming API
            // Parse input if it's a JSON string, otherwise send as-is
            let parsedInput;
            try {
                parsedInput = typeof input === 'string' && input.trim().startsWith('{') ? JSON.parse(input) : {
                    input
                };
            } catch (e) {
                // If parsing fails, wrap in input object
                parsedInput = {
                    input
                };
            }
            const response = await fetch(`/api/workflows/${workflow.id}/execute-stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsedInput),
                signal: abortControllerRef.current.signal
            });
            if (!response.ok) {
                throw new Error('Workflow execution failed');
            }
            // Handle SSE stream
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            if (!reader) {
                throw new Error('No response body');
            }
            let buffer = '';
            let executionId = '';
            let currentEvent = '';
            while(true){
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, {
                    stream: true
                });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                for (const line of lines){
                    if (line.trim() === '') {
                        // Empty line marks end of SSE message
                        currentEvent = '';
                        continue;
                    }
                    if (line.startsWith('event: ')) {
                        currentEvent = line.slice(7).trim();
                        continue;
                    }
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            console.log(`📨 SSE Event: ${currentEvent}`, data);
                            // Handle error events
                            if (currentEvent === 'error' && data.error) {
                                console.error('❌ Workflow error:', data.error);
                                // Show error toast to user
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Workflow Error', {
                                    description: data.error,
                                    duration: 10000
                                });
                                // Set failed execution state
                                setExecution({
                                    id: executionId || `exec_${Date.now()}`,
                                    workflowId: workflow.id,
                                    status: 'failed',
                                    error: data.error,
                                    nodeResults: nodeResults,
                                    startedAt: data.timestamp || new Date().toISOString(),
                                    completedAt: data.timestamp || new Date().toISOString()
                                });
                                // Stop execution
                                setIsRunning(false);
                                setCurrentNodeId(null);
                                break; // Exit the SSE loop
                            }
                            // Set current node immediately when node starts (before it completes)
                            if (currentEvent === 'node_started' && data.nodeId) {
                                setCurrentNodeId(data.nodeId);
                            }
                            // Update node results from stream
                            if (data.nodeResults) {
                                setNodeResults((prev)=>{
                                    const updated = {
                                        ...prev,
                                        ...data.nodeResults
                                    };
                                    console.log('📊 Updated nodeResults:', Object.keys(updated));
                                    return updated;
                                });
                            }
                            // Update current node from state updates
                            if (data.currentNodeId) {
                                setCurrentNodeId(data.currentNodeId);
                            }
                            // Store execution ID
                            if (data.executionId) {
                                executionId = data.executionId;
                            }
                            // Check for pending auth
                            if (data.pendingAuth) {
                                setPendingAuth(data.pendingAuth);
                                // Set execution status to waiting-auth
                                const waitingExecution = {
                                    id: executionId || data.executionId || `exec_${Date.now()}`,
                                    workflowId: workflow.id,
                                    status: 'waiting-auth',
                                    nodeResults: data.nodeResults || {},
                                    startedAt: data.timestamp || new Date().toISOString()
                                };
                                setExecution(waitingExecution);
                                break;
                            }
                            // Check for workflow completion
                            if (currentEvent === 'workflow_completed' || data.status === 'completed' || data.status === 'waiting-auth') {
                                const execution = {
                                    id: executionId || data.executionId || `exec_${Date.now()}`,
                                    workflowId: workflow.id,
                                    status: data.status || 'completed',
                                    nodeResults: data.results || data.nodeResults || {},
                                    startedAt: data.timestamp || new Date().toISOString(),
                                    completedAt: data.timestamp || new Date().toISOString()
                                };
                                setExecution(execution);
                            }
                        } catch (e) {
                            console.error('Failed to parse SSE data:', e, 'Line:', line);
                        }
                    }
                }
            }
            console.log('✅ Workflow complete');
        } catch (error) {
            // Don't treat abort as an error - it's intentional user action
            if (error instanceof Error && error.name === 'AbortError') {
                console.log('⏹️ Workflow stopped by user');
                setPendingAuth(null);
                pendingResumeRef.current = null;
                return;
            }
            console.error('❌ Workflow execution failed:', error);
            setPendingAuth(null);
            pendingResumeRef.current = null;
            // Set error state
            setExecution({
                id: `exec_${Date.now()}`,
                workflowId: workflow.id,
                status: 'failed',
                error: error instanceof Error ? error.message : 'Unknown error',
                nodeResults: {},
                startedAt: new Date().toISOString(),
                completedAt: new Date().toISOString()
            });
        } finally{
            console.log('🏁 Setting isRunning = false');
            setIsRunning(false);
            setCurrentNodeId(null);
        }
    }, []);
    const stopWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        setIsRunning(false);
        setCurrentNodeId(null);
    }, []);
    const resumeWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!currentWorkflow) {
            console.error('❌ No workflow to resume');
            return;
        }
        if (!pendingAuth) {
            console.error('❌ No pending authorization to resume from');
            return;
        }
        const threadId = pendingAuth.threadId;
        const executionId = pendingAuth.executionId;
        if (!threadId) {
            console.error('❌ No threadId in pendingAuth');
            return;
        }
        setIsRunning(true);
        try {
            // Call resume API endpoint
            const response = await fetch(`/api/workflows/${currentWorkflow.id}/resume`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    threadId,
                    executionId,
                    resumeValue: {
                        approved: true,
                        status: 'approved'
                    }
                }),
                signal: abortControllerRef.current?.signal
            });
            if (!response.ok) {
                throw new Error(`Resume failed: ${response.statusText}`);
            }
            if (!response.body) {
                throw new Error('No response body from resume endpoint');
            }
            // Clear pending auth since we're resuming
            setPendingAuth(null);
            // Process SSE stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            while(true){
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                for (const line of lines){
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            // Update current node
                            if (data.currentNodeId) {
                                setCurrentNodeId(data.currentNodeId);
                            }
                            // Update node results
                            if (data.nodeResults) {
                                setNodeResults((prevResults)=>({
                                        ...prevResults,
                                        ...data.nodeResults
                                    }));
                            }
                            // Check for pending auth again (multiple approvals)
                            if (data.pendingAuth) {
                                setPendingAuth(data.pendingAuth);
                                const waitingExecution = {
                                    id: executionId || `exec_${Date.now()}`,
                                    workflowId: currentWorkflow.id,
                                    status: 'waiting-auth',
                                    nodeResults: data.nodeResults || {},
                                    startedAt: new Date().toISOString()
                                };
                                setExecution(waitingExecution);
                                break;
                            }
                            // Check for completion
                            if (data.status === 'completed') {
                                const completedExecution = {
                                    id: executionId || `exec_${Date.now()}`,
                                    workflowId: currentWorkflow.id,
                                    status: 'completed',
                                    nodeResults: data.results || data.nodeResults || {},
                                    startedAt: new Date().toISOString(),
                                    completedAt: new Date().toISOString()
                                };
                                setExecution(completedExecution);
                            }
                        } catch (e) {
                            console.error('Failed to parse SSE data:', e);
                        }
                    }
                }
            }
            console.log('✅ Workflow resumed and completed');
        } catch (error) {
            // Don't treat abort as an error - it's intentional user action
            if (error instanceof Error && error.name === 'AbortError') {
                console.log('⏹️ Workflow stopped by user');
                return;
            }
            console.error('❌ Workflow resume failed:', error);
            setExecution({
                id: executionId || `exec_${Date.now()}`,
                workflowId: currentWorkflow.id,
                status: 'failed',
                nodeResults: {},
                startedAt: new Date().toISOString(),
                completedAt: new Date().toISOString()
            });
        } finally{
            setIsRunning(false);
            setCurrentNodeId(null);
        }
    }, [
        currentWorkflow,
        pendingAuth
    ]);
    const clearExecution = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setExecution(null);
        setNodeResults({});
        setCurrentNodeId(null);
        setPendingAuth(null);
        setCurrentWorkflow(null);
        pendingResumeRef.current = null;
    }, []);
    return {
        execution,
        isRunning,
        currentNodeId,
        nodeResults,
        pendingAuth,
        runWorkflow,
        stopWorkflow,
        resumeWorkflow,
        clearExecution
    };
}
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StyleGuidePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/clerk-react/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$ZEVONOWY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/clerk-react/dist/chunk-ZEVONOWY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$layout$2f$curvy$2d$rect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/layout/curvy-rect.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$effects$2f$flame$2f$hero$2d$flame$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/effects/flame/hero-flame.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$HeaderContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/HeaderContext.tsx [app-ssr] (ecmascript)");
// Import hero section components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Background$2f$Background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/hero/Background/Background.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Background$2f$BackgroundOuterPiece$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/hero/Background/BackgroundOuterPiece.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Badge$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/hero/Badge/Badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Pixi$2f$Pixi$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/hero/Pixi/Pixi.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Title$2f$Title$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/hero/Title/Title.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Playground$2f$Context$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/Playground/Context/types.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$step2$2f$Step2Placeholder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/step2/Step2Placeholder.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$WorkflowBuilder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx [app-ssr] (ecmascript)");
// Import header components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$BrandKit$2f$BrandKit$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/BrandKit/BrandKit.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$Wrapper$2f$Wrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/Wrapper/Wrapper.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$Dropdown$2f$Wrapper$2f$Wrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$Github$2f$_svg$2f$GithubIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/Github/_svg/GithubIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$shadcn$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/shadcn/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function StyleGuidePageContent() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [tab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Playground$2f$Context$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Endpoint"].Scrape);
    const [url, setUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showStep2, setShowStep2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showWorkflowBuilder, setShowWorkflowBuilder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadWorkflowId, setLoadWorkflowId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadTemplateId, setLoadTemplateId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Handle URL params
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!searchParams) return;
        const view = searchParams.get('view');
        const workflowId = searchParams.get('workflow');
        const templateId = searchParams.get('template');
        if (view === 'workflows') {
            setShowStep2(true);
            setShowWorkflowBuilder(false);
        } else if (workflowId) {
            setLoadWorkflowId(workflowId);
            setShowWorkflowBuilder(true);
            setShowStep2(false);
        } else if (templateId) {
            setLoadTemplateId(templateId);
            setShowWorkflowBuilder(true);
            setShowStep2(false);
        }
    }, [
        searchParams
    ]);
    const handleSubmit = ()=>{
        setShowStep2(true);
        router.push('/?view=workflows');
    };
    const handleReset = ()=>{
        setShowStep2(false);
        setShowWorkflowBuilder(false);
        setLoadWorkflowId(null);
        setLoadTemplateId(null);
        setUrl("");
        router.push('/');
    };
    const handleCreateWorkflow = ()=>{
        setLoadWorkflowId(null);
        setLoadTemplateId(null);
        setShowWorkflowBuilder(true);
        router.push('/?view=builder');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$HeaderContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HeaderProvider"], {
        children: showWorkflowBuilder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedIn"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$WorkflowBuilder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                onBack: handleReset,
                initialWorkflowId: loadWorkflowId,
                initialTemplateId: loadTemplateId
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 94,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 93,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-background-base",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$Dropdown$2f$Wrapper$2f$Wrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 left-0 w-full z-[101] bg-background-base header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-0 cmw-container border-x border-border-faint h-full pointer-events-none"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-1 bg-border-faint w-full left-0 -bottom-1 absolute"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cmw-container absolute h-full pointer-events-none top-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$layout$2f$curvy$2d$rect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Connector"], {
                                    className: "absolute -left-[10.5px] -bottom-11"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$layout$2f$curvy$2d$rect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Connector"], {
                                    className: "absolute -right-[10.5px] -bottom-11"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$Wrapper$2f$Wrapper$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-[900px] mx-auto w-full flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-24 items-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$BrandKit$2f$BrandKit$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-8 items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedIn"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ui-user-workflows",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$shadcn$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "outline",
                                                        children: "UI for Workflows"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedIn"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/ui-builder",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$shadcn$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        variant: "outline",
                                                        children: "UI Builder"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "contents",
                                                href: "https://github.com/firecrawl/firecrawl",
                                                target: "_blank",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$shadcn$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    variant: "secondary",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$Github$2f$_svg$2f$GithubIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                            fileName: "[project]/app/page.tsx",
                                                            lineNumber: 146,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Use this Template"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedOut"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignInButton"], {
                                                    mode: "modal",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "px-16 py-8 bg-heat-100 hover:bg-heat-200 text-white rounded-8 text-body-medium font-medium transition-all active:scale-[0.98]",
                                                        children: "Sign In"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 154,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedIn"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$chunk$2d$ZEVONOWY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserButton"], {
                                                    appearance: {
                                                        elements: {
                                                            avatarBox: "w-32 h-32"
                                                        }
                                                    },
                                                    afterSignOutUrl: "/"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "overflow-x-clip",
                    id: "home-hero",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-28 lg:pt-254 lg:-mt-100 pb-115 relative",
                            id: "hero-content",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Pixi$2f$Pixi$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$effects$2f$flame$2f$hero$2d$flame$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Background$2f$BackgroundOuterPiece$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackgroundOuterPiece"], {}, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Background$2f$Background$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    children: !showStep2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 1
                                        },
                                        exit: {
                                            opacity: 0,
                                            scale: 0.95
                                        },
                                        transition: {
                                            duration: 0.5
                                        },
                                        className: "relative container px-16",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Badge$2f$Badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 192,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$hero$2f$Title$2f$Title$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 193,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center text-body-large",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Build intelligent web scraping workflows powered by AI.",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                                className: "lg-max:hidden"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/page.tsx",
                                                                lineNumber: 198,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Turn any website into structured, agent-ready data."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        className: "bg-black-alpha-4 hover:bg-black-alpha-6 lg:ml-4 rounded-6 px-8 lg:px-6 text-label-large lg-max:py-2 h-30 lg:h-24 block lg-max:mt-8 lg-max:mx-auto lg-max:w-max lg:inline-block gap-4 transition-all",
                                                        href: "https://firecrawl.dev",
                                                        target: "_blank",
                                                        children: "AI agent workflows"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 195,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, "hero", true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedIn"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            transition: {
                                                duration: 0.5
                                            },
                                            className: "relative container px-16",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$step2$2f$Step2Placeholder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                onReset: handleReset,
                                                onCreateWorkflow: handleCreateWorkflow,
                                                onLoadWorkflow: (id)=>{
                                                    setLoadWorkflowId(id);
                                                    setLoadTemplateId(null);
                                                    setShowWorkflowBuilder(true);
                                                    router.push(`/?workflow=${id}`);
                                                },
                                                onLoadTemplate: (templateId)=>{
                                                    setLoadTemplateId(templateId);
                                                    setLoadWorkflowId(null);
                                                    setShowWorkflowBuilder(true);
                                                    router.push(`/?template=${templateId}`);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 219,
                                                columnNumber: 21
                                            }, this)
                                        }, "step2", false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        !showStep2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "flex justify-center -mt-90 relative z-10",
                            initial: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: 0.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedIn"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSubmit,
                                        className: "bg-heat-100 hover:bg-heat-200 text-white font-medium px-32 py-12 rounded-10 transition-all active:scale-[0.98] text-body-medium shadow-md cursor-pointer",
                                        children: "Start building"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignedOut"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$clerk$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SignInButton"], {
                                        mode: "modal",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "bg-heat-100 hover:bg-heat-200 text-white font-medium px-32 py-12 rounded-10 transition-all active:scale-[0.98] text-body-medium shadow-md cursor-pointer",
                                            children: "Start building"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 262,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 261,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 243,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
function StyleGuidePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 278,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StyleGuidePageContent, {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 279,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 278,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_12b5684c._.js.map