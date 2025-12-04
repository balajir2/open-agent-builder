module.exports = [
"[project]/lib/api/llm-keys.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * LLM API Key Management
 *
 * Provides API keys for LLM providers with fallback logic:
 * 1. Check user-specific keys from database
 * 2. Fall back to environment variables if no user key exists
 */ __turbopack_context__.s([
    "getConfiguredProviders",
    ()=>getConfiguredProviders,
    "getLLMApiKey",
    ()=>getLLMApiKey,
    "getProvidersStatus",
    ()=>getProvidersStatus,
    "getToolApiKey",
    ()=>getToolApiKey,
    "initializeLLMClient",
    ()=>initializeLLMClient,
    "isProviderConfigured",
    ()=>isProviderConfigured
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$index$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/index-node.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$simple_client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/browser/simple_client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/convex/_generated/api.js [app-route] (ecmascript)");
;
;
// Initialize Convex client for server-side use
const getConvexClient = ()=>{
    const convexUrl = ("TURBOPACK compile-time value", "https://sensible-ermine-579.convex.cloud");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$browser$2f$simple_client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConvexClient"](convexUrl);
};
async function getLLMApiKey(provider, userId) {
    // First, try to get user-specific key if userId is provided
    if (userId) {
        try {
            const client = getConvexClient();
            // FIX: Call as action, not query, and use userLLMKeysActions
            const userKey = await client.action(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["api"].userLLMKeysActions.getActiveKey, {
                userId,
                provider
            });
            if (userKey?.apiKey) {
                // Update usage stats
                await client.mutation(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["api"].userLLMKeys.updateKeyUsage, {
                    userId,
                    provider
                }).catch(console.error); // Don't fail if usage update fails
                return userKey.apiKey;
            }
        } catch (error) {
            console.error(`Failed to get user key for ${provider}:`, error);
        // Continue to environment variable fallback
        }
    }
    // Fall back to environment variables
    const envKeyMap = {
        anthropic: 'ANTHROPIC_API_KEY',
        openai: 'OPENAI_API_KEY',
        groq: 'GROQ_API_KEY',
        google: 'GOOGLE_API_KEY'
    };
    const envKey = envKeyMap[provider];
    const apiKey = process.env[envKey];
    if (apiKey) {
        return apiKey;
    }
    return null;
}
async function getToolApiKey(toolId, userId) {
    // First, try to get user-specific key if userId is provided
    if (userId) {
        try {
            const client = getConvexClient();
            const userKey = await client.action(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["api"].userToolKeysActions.getActiveKey, {
                userId,
                toolId
            });
            if (userKey?.apiKey) {
                return userKey.apiKey;
            }
        } catch (error) {
            console.error(`Failed to get user key for tool ${toolId}:`, error);
        // Continue to environment variable fallback
        }
    }
    // Fall back to environment variables
    const envKeyMap = {
        'firecrawl': 'FIRECRAWL_API_KEY',
        'serper': 'SERPER_API_KEY',
        'serper-search': 'SERPER_API_KEY',
        'serpapi': 'SERPAPI_API_KEY',
        'serpapi-search': 'SERPAPI_API_KEY',
        'tavily': 'TAVILY_API_KEY',
        'tavily-search': 'TAVILY_API_KEY',
        'scraperapi': 'SCRAPERAPI_API_KEY',
        'browserless': 'BROWSERLESS_API_KEY',
        'arcade': 'ARCADE_API_KEY',
        'e2b': 'E2B_API_KEY'
    };
    const envKey = envKeyMap[toolId];
    if (envKey && process.env[envKey]) {
        return process.env[envKey] || null;
    }
    return null;
}
async function isProviderConfigured(provider, userId) {
    const apiKey = await getLLMApiKey(provider, userId);
    return !!apiKey;
}
async function getConfiguredProviders(userId) {
    const providers = [
        'anthropic',
        'openai',
        'groq',
        'google'
    ];
    const configured = [];
    for (const provider of providers){
        if (await isProviderConfigured(provider, userId)) {
            configured.push(provider);
        }
    }
    return configured;
}
async function initializeLLMClient(provider, userId) {
    const apiKey = await getLLMApiKey(provider, userId);
    if (!apiKey) {
        throw new Error(`No API key found for ${provider}. Please configure your API key in Settings or set the ${provider === 'anthropic' ? 'ANTHROPIC_API_KEY' : provider === 'openai' ? 'OPENAI_API_KEY' : provider === 'google' ? 'GOOGLE_API_KEY' : 'GROQ_API_KEY'} environment variable.`);
    }
    return {
        apiKey,
        provider
    };
}
async function getProvidersStatus(userId) {
    const status = {};
    for (const provider of [
        'anthropic',
        'openai',
        'groq',
        'google'
    ]){
        // Check user key first
        if (userId) {
            try {
                const client = getConvexClient();
                // FIX: Call as action, not query, and use userLLMKeysActions
                const userKey = await client.action(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["api"].userLLMKeysActions.getActiveKey, {
                    userId,
                    provider
                });
                if (userKey) {
                    status[provider] = {
                        configured: true,
                        source: 'user'
                    };
                    continue;
                }
            } catch (error) {
            // Continue to env check
            }
        }
        // Check environment variable
        const envKeyMap = {
            anthropic: 'ANTHROPIC_API_KEY',
            openai: 'OPENAI_API_KEY',
            groq: 'GROQ_API_KEY',
            google: 'GOOGLE_API_KEY'
        };
        const envKey = envKeyMap[provider];
        if (process.env[envKey]) {
            status[provider] = {
                configured: true,
                source: 'env'
            };
        } else {
            status[provider] = {
                configured: false,
                source: null
            };
        }
    }
    return status;
}
}),
];

//# sourceMappingURL=lib_api_llm-keys_ts_bbc1e628._.js.map