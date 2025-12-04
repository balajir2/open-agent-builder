module.exports = [
"[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NodePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$VariableReferencePicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/VariableReferencePicker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/react/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/react/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/convex/_generated/api.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$react$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/runtime/react/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tools/registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/llm-config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/models.ts [app-ssr] (ecmascript)");
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
function NodePanel({ nodeData, nodes, onClose, onAddMCP, onDelete, onUpdate, onOpenSettings }) {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$runtime$2f$react$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    // MCP states - now store only server IDs, not full configs
    const [showMCPSelector, setShowMCPSelector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expandedMcpId, setExpandedMcpId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentMCPServerIds, setCurrentMCPServerIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showModelsDropdown, setShowModelsDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Fetch enabled MCP servers from central registry
    const mcpServers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].mcpServers.getEnabledMCPs, user?.id ? {
        userId: user.id
    } : "skip");
    // Fetch user's LLM API keys to determine available models
    const userLLMKeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].userLLMKeys.getUserLLMKeys, user?.id ? {
        userId: user.id
    } : "skip");
    // Fetch configured tool keys
    const configuredToolKeys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].userToolKeys.getUserToolKeys, user?.id ? {
        userId: user.id
    } : "skip");
    // Get available models - show all providers, with indicators for configured keys
    const getAvailableModels = ()=>{
        const activeKeys = userLLMKeys?.filter((key)=>key.isActive) || [];
        const hasProvider = (provider)=>activeKeys.some((key)=>key.provider === provider);
        // Always show all providers - they work with environment variables as fallback
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$llm$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["llmProviders"].map((provider)=>({
                provider: provider.name,
                hasKey: hasProvider(provider.id),
                models: provider.models.map((model)=>({
                        id: `${provider.id}/${model.id}`,
                        name: model.name
                    }))
            }));
    };
    // Initialize from nodeData if available
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(nodeData?.label || "My agent");
    const [instructions, setInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(nodeData?.instructions || "");
    const [includeChatHistory, setIncludeChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [model, setModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(`anthropic/${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].anthropic}`);
    const [outputFormat, setOutputFormat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Text");
    const [customModel, setCustomModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tokenLimit, setTokenLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [showAdvanced, setShowAdvanced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSearchSources, setShowSearchSources] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [jsonOutputSchema, setJsonOutputSchema] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(`{
  "type": "object",
  "properties": {
    "result": { "type": "string" }
  }
}`);
    const [schemaFields, setSchemaFields] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            name: "result",
            type: "string",
            required: false
        }
    ]);
    const [selectedTools, setSelectedTools] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showStandardTools, setShowStandardTools] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const lastLoadedNodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastSyncedInstructionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastSavedSelectedToolsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    // Helper to update JSON schema from fields array
    const updateSchemaFromFields = (fields)=>{
        const properties = {};
        const required = [];
        fields.forEach((field)=>{
            if (field.name) {
                properties[field.name] = {
                    type: field.type
                };
                if (field.required) {
                    required.push(field.name);
                }
            }
        });
        const schema = {
            type: "object",
            properties
        };
        if (required.length > 0) {
            schema.required = required;
        }
        setJsonOutputSchema(JSON.stringify(schema, null, 2));
    };
    // Track current node's MCP server IDs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (nodeData && nodes) {
            const actualNode = nodes.find((n)=>n.id === nodeData.id);
            if (actualNode) {
                const data = actualNode.data;
                // If we already have server IDs, use them
                if (data.mcpServerIds && Array.isArray(data.mcpServerIds) && data.mcpServerIds.length > 0) {
                    setCurrentMCPServerIds(data.mcpServerIds);
                } else if (data.mcpTools && Array.isArray(data.mcpTools) && mcpServers && mcpServers.length > 0) {
                    console.log('🔄 Re-matching mcpTools after servers loaded');
                    const mcpIds = data.mcpTools.map((tool)=>{
                        const normalizeUrl = (url)=>url?.replace(/\{[^}]+\}/g, '').replace(/\/+$/, '').toLowerCase();
                        const matchingServer = mcpServers.find((server)=>{
                            const toolUrlNormalized = normalizeUrl(tool.url || '');
                            const serverUrlNormalized = normalizeUrl(server.url || '');
                            const urlMatch = toolUrlNormalized === serverUrlNormalized || toolUrlNormalized && serverUrlNormalized && (toolUrlNormalized.includes(serverUrlNormalized) || serverUrlNormalized.includes(toolUrlNormalized));
                            const nameMatch = server.name?.toLowerCase() === tool.name?.toLowerCase() || server.label?.toLowerCase() === tool.label?.toLowerCase();
                            return urlMatch || nameMatch;
                        });
                        return matchingServer?._id;
                    }).filter(Boolean);
                    if (mcpIds.length > 0) {
                        console.log('✅ Matched server IDs:', mcpIds);
                        setCurrentMCPServerIds(mcpIds);
                    }
                }
            }
        }
    }, [
        nodeData?.id,
        nodes,
        mcpServers
    ]);
    // Load actual node data when panel opens
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!nodeData || !nodes) return;
        const actualNode = nodes.find((n)=>n.id === nodeData.id);
        if (!actualNode) return;
        const data = actualNode.data;
        const isNewNode = lastLoadedNodeId.current !== nodeData.id;
        const incomingInstructions = typeof data.instructions === "string" ? data.instructions : "";
        if (isNewNode) {
            lastLoadedNodeId.current = nodeData.id;
            setName(data.name || data.nodeName || nodeData.label);
            setInstructions(incomingInstructions);
            setIncludeChatHistory(data.includeChatHistory ?? true);
            setModel(data.model || `anthropic/${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_MODELS"].anthropic}`);
            setTokenLimit(data.tokenLimit);
            setOutputFormat(data.outputFormat || "Text");
            setShowSearchSources(data.showSearchSources ?? false);
            // Load selectedTools - use empty array only if undefined AND it's truly a new node
            const toolsToLoad = Array.isArray(data.selectedTools) ? data.selectedTools : [];
            setSelectedTools(toolsToLoad);
            // Update the ref so we know what was loaded
            lastSavedSelectedToolsRef.current = toolsToLoad.length > 0 ? toolsToLoad : undefined;
            lastSyncedInstructionsRef.current = incomingInstructions;
            // Initialize MCP servers from node data
            if (data.mcpServerIds && Array.isArray(data.mcpServerIds)) {
                // If node already has server IDs, use them directly
                setCurrentMCPServerIds(data.mcpServerIds);
            } else if (data.mcpTools && Array.isArray(data.mcpTools)) {
                // Convert mcpTools to server IDs by matching against available MCP servers
                if (mcpServers && mcpServers.length > 0) {
                    const mcpIds = data.mcpTools.map((tool)=>{
                        // Try to find matching MCP server by URL or name
                        const matchingServer = mcpServers.find((server)=>{
                            // Normalize URLs by removing placeholders for comparison
                            const normalizeUrl = (url)=>url?.replace(/\{[^}]+\}/g, '').replace(/\/+$/, '').toLowerCase();
                            const toolUrlNormalized = normalizeUrl(tool.url || '');
                            const serverUrlNormalized = normalizeUrl(server.url || '');
                            // Match by URL (exact match after normalization)
                            const urlMatch = toolUrlNormalized === serverUrlNormalized || toolUrlNormalized && serverUrlNormalized && toolUrlNormalized.includes(serverUrlNormalized.split('/')[0]) || serverUrlNormalized.includes(toolUrlNormalized.split('/')[0]);
                            // Match by name (case-insensitive)
                            const nameMatch = server.name?.toLowerCase() === tool.name?.toLowerCase() || server.label?.toLowerCase() === tool.label?.toLowerCase() || server.name?.toLowerCase() === tool.label?.toLowerCase();
                            if (urlMatch || nameMatch) {
                                console.log('✅ Matched tool', tool.name, 'to server', server.name);
                            }
                            return urlMatch || nameMatch;
                        });
                        return matchingServer?._id;
                    }).filter(Boolean);
                    console.log('🎯 Matched MCP server IDs:', mcpIds);
                    if (mcpIds.length > 0) {
                        setCurrentMCPServerIds(mcpIds);
                    }
                }
            }
            if (data.jsonOutputSchema) {
                setJsonOutputSchema(data.jsonOutputSchema);
                try {
                    const parsed = JSON.parse(data.jsonOutputSchema);
                    if (parsed.properties) {
                        const fields = Object.entries(parsed.properties).map(([propName, prop])=>({
                                name: propName,
                                type: prop.type || "string",
                                required: parsed.required?.includes(propName) || false
                            }));
                        setSchemaFields(fields);
                    }
                } catch (e) {
                // ignore parse errors
                }
            }
            return;
        }
        if (isNewNode) {
            lastLoadedNodeId.current = nodeData.id;
        }
        if (incomingInstructions !== lastSyncedInstructionsRef.current) {
            lastSyncedInstructionsRef.current = incomingInstructions;
            if (incomingInstructions !== instructions) {
                setInstructions(incomingInstructions);
            }
        } else if (incomingInstructions === instructions && incomingInstructions !== lastSyncedInstructionsRef.current) {
            lastSyncedInstructionsRef.current = incomingInstructions;
        }
    }, [
        nodeData,
        nodes,
        instructions,
        mcpServers
    ]);
    // Auto-save changes with proper dependency tracking
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!nodeData?.id) return;
        const timeoutId = setTimeout(()=>{
            try {
                // Build mcpTools from currentMCPServerIds
                const mcpTools = currentMCPServerIds.map((serverId)=>{
                    const server = mcpServers?.find((s)=>s._id === serverId);
                    if (server) {
                        return {
                            id: server._id,
                            name: server.name,
                            url: server.url,
                            label: server.name,
                            authType: server.authType
                        };
                    }
                    return null;
                }).filter(Boolean);
                const selectedToolsToSave = selectedTools.length > 0 ? selectedTools : undefined;
                onUpdate(nodeData.id, {
                    name,
                    nodeName: name,
                    instructions,
                    includeChatHistory,
                    model,
                    outputFormat,
                    jsonOutputSchema: outputFormat === "JSON" ? jsonOutputSchema : undefined,
                    showSearchSources,
                    mcpTools: mcpTools.length > 0 ? mcpTools : undefined,
                    mcpServerIds: currentMCPServerIds.length > 0 ? currentMCPServerIds : undefined,
                    selectedTools: selectedToolsToSave,
                    tokenLimit: tokenLimit
                });
            } catch (error) {
                console.error("Error updating node:", error);
            }
        }, 500);
        return ()=>clearTimeout(timeoutId);
    }, [
        name,
        instructions,
        includeChatHistory,
        model,
        outputFormat,
        jsonOutputSchema,
        showSearchSources,
        currentMCPServerIds,
        mcpServers,
        selectedTools,
        tokenLimit
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: nodeData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].aside, {
            initial: {
                x: 400,
                opacity: 0
            },
            animate: {
                x: 0,
                opacity: 1
            },
            exit: {
                x: 400,
                opacity: 0
            },
            transition: {
                duration: 0.3
            },
            className: "fixed right-20 top-80 h-[calc(100vh-100px)] w-[calc(100vw-240px)] max-w-480 bg-accent-white border border-border-faint shadow-lg overflow-y-auto z-50 rounded-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-20 border-b border-border-faint",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    className: "text-label-large font-medium text-accent-black bg-transparent border-none outline-none focus:outline-none hover:bg-black-alpha-4 px-2 -ml-2 rounded-4 transition-colors",
                                    placeholder: "Enter node name..."
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 368,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-18 h-18 text-black-alpha-48",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 377,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 376,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onDelete(nodeData?.id || ""),
                                            className: "w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center group",
                                            title: "Delete node",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-18 h-18 text-black-alpha-48 group-hover:text-black-alpha-64",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 396,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 391,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onClose,
                                            className: "w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-18 h-18 text-black-alpha-48",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M6 18L18 6M6 6l12 12"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 414,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 410,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 375,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-black-alpha-48",
                            children: "Call the model with your instructions and tools"
                        }, void 0, false, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 430,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                    lineNumber: 366,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-20 space-y-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-black-alpha-48",
                                            children: "Instructions"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 441,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-8",
                                            children: nodes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$VariableReferencePicker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                nodes: nodes,
                                                currentNodeId: nodeData?.id || "",
                                                onSelect: (ref)=>setInstructions(instructions + ` {{${ref}}}`)
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 446,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 444,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 440,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: instructions,
                                    onChange: (e)=>setInstructions(e.target.value),
                                    placeholder: "Enter agent instructions...",
                                    rows: 8,
                                    className: "w-full px-14 py-10 bg-background-base border border-border-faint rounded-10 text-sm text-accent-black placeholder-black-alpha-32 focus:outline-none focus:border-heat-100 transition-colors resize-y"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 456,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-black-alpha-48 mt-6",
                                    children: [
                                        "Use ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            className: "px-4 py-1 bg-background-base rounded text-heat-100 font-mono text-xs",
                                            children: `{{variable}}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 464,
                                            columnNumber: 21
                                        }, this),
                                        " syntax to reference data"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 439,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between py-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium text-accent-black",
                                    children: "Include chat history"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 470,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIncludeChatHistory(!includeChatHistory),
                                    className: `w-48 h-28 rounded-full transition-colors relative ${includeChatHistory ? "bg-heat-100" : "bg-black-alpha-12"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "w-24 h-24 bg-white rounded-full absolute top-2 shadow-sm",
                                        animate: {
                                            left: includeChatHistory ? "22px" : "2px"
                                        },
                                        transition: {
                                            duration: 0.2
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                        lineNumber: 478,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 473,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 469,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-black-alpha-48 mb-8",
                                    children: "Model"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 488,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowModelsDropdown(!showModelsDropdown),
                                    className: "w-full px-14 py-10 bg-background-base border border-border-faint rounded-10 text-sm text-accent-black focus:outline-none focus:border-heat-100 transition-colors flex items-center justify-between hover:bg-black-alpha-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate",
                                            children: model && model !== "custom" ? // Find the display name for the selected model
                                            getAvailableModels().flatMap((p)=>p.models).find((m)=>m.id === model)?.name || model.split('/').pop() || model : model === "custom" ? customModel || "Custom Model" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-black-alpha-32",
                                                children: "Select a model..."
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 503,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 495,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: `w-16 h-16 text-black-alpha-48 transition-transform ${showModelsDropdown ? 'rotate-180' : ''}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 506,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 491,
                                    columnNumber: 15
                                }, this),
                                showModelsDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8 p-8 bg-background-base border border-border-faint rounded-10 space-y-8 max-h-[300px] overflow-y-auto",
                                    children: [
                                        getAvailableModels().map((provider)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-medium text-black-alpha-48 mb-4 flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: provider.provider
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 517,
                                                                columnNumber: 25
                                                            }, this),
                                                            provider.hasKey ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs px-6 py-2 bg-green-100 text-green-700 rounded-4",
                                                                children: "✓ Key set"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 519,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs px-6 py-2 bg-yellow-50 text-yellow-700 rounded-4",
                                                                children: "Using env"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 523,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 516,
                                                        columnNumber: 23
                                                    }, this),
                                                    provider.models.map((modelOption)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setModel(modelOption.id);
                                                                // Set default token limit based on model
                                                                const modelId = modelOption.id;
                                                                let limit = 4096; // Default fallback
                                                                if (modelId.includes('gpt-4o-mini')) limit = 16384;
                                                                else if (modelId.includes('gpt-4o')) limit = 4096;
                                                                else if (modelId.includes('claude-3-5-sonnet')) limit = 8192;
                                                                else if (modelId.includes('claude-3-opus')) limit = 4096;
                                                                else if (modelId.includes('gemini')) limit = 8192;
                                                                else if (modelId.includes('gpt-oss-120b')) limit = 32768;
                                                                setTokenLimit(limit);
                                                                setShowModelsDropdown(false);
                                                            },
                                                            className: `w-full text-left px-8 py-6 rounded-6 text-sm transition-colors ${model === modelOption.id ? 'bg-heat-100 text-white' : 'hover:bg-black-alpha-4 text-accent-black'}`,
                                                            children: modelOption.name
                                                        }, modelOption.id, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 529,
                                                            columnNumber: 25
                                                        }, this))
                                                ]
                                            }, provider.provider, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 515,
                                                columnNumber: 21
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-8 mt-8 border-t border-border-faint",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-black-alpha-48 mb-8 px-8",
                                                    children: 'Models with "Using env" use environment variables. Add your own keys in Settings for better control.'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 561,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setShowModelsDropdown(false);
                                                        onOpenSettings?.();
                                                    },
                                                    className: "w-full text-left px-8 py-6 rounded-6 text-sm transition-colors hover:bg-black-alpha-4 text-heat-100 font-medium",
                                                    children: "⚙️ Configure API Keys"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 564,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 560,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-8 border-t border-border-faint",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setModel("custom");
                                                    setShowModelsDropdown(false);
                                                },
                                                className: `w-full text-left px-8 py-6 rounded-6 text-sm transition-colors ${model === "custom" ? 'bg-heat-100 text-white' : 'hover:bg-black-alpha-4 text-accent-black'}`,
                                                children: "Custom Model..."
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 576,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 575,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 513,
                                    columnNumber: 17
                                }, this),
                                model === "custom" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: customModel,
                                    onChange: (e)=>{
                                        setCustomModel(e.target.value);
                                        setModel(e.target.value);
                                    },
                                    placeholder: "provider/model-name",
                                    className: "w-full px-14 py-10 bg-background-base border border-border-faint rounded-10 text-sm text-accent-black placeholder-black-alpha-32 font-mono focus:outline-none focus:border-heat-100 transition-colors mt-8"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 593,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 487,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-black-alpha-48",
                                            children: "Tools"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 609,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setShowMCPSelector((prev)=>{
                                                            const next = !prev;
                                                            if (next) {
                                                                // Expand first server if available
                                                                if (mcpServers && mcpServers.length > 0) {
                                                                    setExpandedMcpId(mcpServers[0]._id);
                                                                } else {
                                                                    setExpandedMcpId("custom");
                                                                }
                                                            } else {
                                                                setExpandedMcpId(null);
                                                            }
                                                            return next;
                                                        });
                                                    },
                                                    className: "w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center",
                                                    title: "Add tools",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-18 h-18 text-black-alpha-48",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M12 4v16m8-8H4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 639,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 633,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 613,
                                                    columnNumber: 19
                                                }, this),
                                                onOpenSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onOpenSettings,
                                                    className: "w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center",
                                                    title: "Configure MCPs in Settings",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-18 h-18 text-black-alpha-48",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 659,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 648,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 612,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 608,
                                    columnNumber: 15
                                }, this),
                                showMCPSelector && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    animate: {
                                        opacity: 1,
                                        height: "auto"
                                    },
                                    exit: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    className: "mb-12 p-16 bg-[#f4f4f5] rounded-12 border border-border-faint",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-12",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-semibold text-accent-black",
                                                    children: "MCP Registry"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setShowMCPSelector(false);
                                                        setExpandedMcpId(null);
                                                    },
                                                    className: "w-20 h-20 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-14 h-14 text-black-alpha-48",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M6 18L18 6M6 6l12 12"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 696,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 690,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 683,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 679,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-12",
                                            children: [
                                                !mcpServers || mcpServers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center py-16",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-black-alpha-48 mb-8",
                                                            children: "No MCP servers configured in your registry."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 708,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setShowMCPSelector(false);
                                                                onOpenSettings?.();
                                                            },
                                                            className: "text-xs text-heat-100 hover:text-heat-200 font-medium",
                                                            children: "Go to Settings to add MCP servers"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 711,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 707,
                                                    columnNumber: 23
                                                }, this) : mcpServers.map((server)=>{
                                                    const isConnected = currentMCPServerIds.includes(server._id);
                                                    const isExpanded = expandedMcpId === server._id;
                                                    const isFirecrawl = server.name === 'Firecrawl' && server.isOfficial;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "rounded-12 border border-border-faint overflow-hidden bg-accent-white",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setExpandedMcpId(isExpanded ? null : server._id),
                                                                className: "w-full px-16 py-12 flex items-center justify-between text-left hover:bg-black-alpha-4 transition-colors",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-8",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-medium text-accent-black",
                                                                                children: server.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                lineNumber: 734,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            isFirecrawl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "px-6 py-2 bg-heat-4 text-heat-100 rounded-6 text-xs border border-heat-100 font-medium",
                                                                                children: "API Key Required"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                lineNumber: 736,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            server.connectionStatus === 'connected' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "px-6 py-2 bg-heat-4 text-heat-100 rounded-6 text-xs border border-heat-100",
                                                                                children: "Connected"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                lineNumber: 741,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            server.tools && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "px-6 py-2 bg-background-base text-black-alpha-48 rounded-6 text-xs border border-border-faint",
                                                                                children: [
                                                                                    server.tools.length,
                                                                                    " tools"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                lineNumber: 746,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                        lineNumber: 733,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: `w-16 h-16 text-black-alpha-32 transition-transform ${isExpanded ? 'rotate-180' : ''}`,
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M19 9l-7 7-7-7"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 757,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                        lineNumber: 751,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 729,
                                                                columnNumber: 29
                                                            }, this),
                                                            isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "px-16 pb-16 space-y-10 bg-accent-white border-t border-border-faint",
                                                                children: [
                                                                    server.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "pt-12 text-xs text-black-alpha-64",
                                                                        children: server.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                        lineNumber: 763,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    isFirecrawl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: "https://www.firecrawl.dev/app/api-keys",
                                                                        target: "_blank",
                                                                        rel: "noopener noreferrer",
                                                                        className: "text-xs text-heat-100 hover:text-heat-200 underline block -mt-6",
                                                                        children: "Get API key here →"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                        lineNumber: 766,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    server.tools && server.tools.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-6",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-black-alpha-64 font-medium",
                                                                                children: "Available Tools:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                lineNumber: 777,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex flex-wrap gap-4",
                                                                                children: server.tools.map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "px-6 py-2 bg-background-base text-black-alpha-64 rounded-4 text-xs border border-border-faint",
                                                                                        children: tool
                                                                                    }, tool, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                        lineNumber: 780,
                                                                                        columnNumber: 41
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                lineNumber: 778,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                        lineNumber: 776,
                                                                        columnNumber: 35
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-end pt-8",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                if (isConnected) {
                                                                                    const newServerIds = currentMCPServerIds.filter((id)=>id !== server._id);
                                                                                    onUpdate(nodeData?.id || '', {
                                                                                        mcpServerIds: newServerIds
                                                                                    });
                                                                                    setCurrentMCPServerIds(newServerIds);
                                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Removed ${server.name}`);
                                                                                } else {
                                                                                    const newServerIds = [
                                                                                        ...currentMCPServerIds,
                                                                                        server._id
                                                                                    ];
                                                                                    onUpdate(nodeData?.id || '', {
                                                                                        mcpServerIds: newServerIds
                                                                                    });
                                                                                    setCurrentMCPServerIds(newServerIds);
                                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Added ${server.name} to this agent`);
                                                                                }
                                                                            },
                                                                            className: `px-12 py-8 rounded-8 text-xs font-medium transition-colors ${isConnected ? 'bg-accent-white border border-border-faint text-accent-black hover:bg-black-alpha-4' : 'bg-heat-100 text-white hover:bg-heat-200'}`,
                                                                            children: isConnected ? 'Remove' : 'Add'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 788,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                        lineNumber: 787,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 761,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, server._id, true, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 728,
                                                        columnNumber: 27
                                                    }, this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-12 border border-border-faint overflow-hidden bg-accent-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setExpandedMcpId(expandedMcpId === 'custom' ? null : 'custom'),
                                                            className: "w-full px-16 py-12 flex items-center justify-between text-left hover:bg-black-alpha-4 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-8",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-medium text-accent-black",
                                                                            children: "Add New MCP Server"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 822,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "px-6 py-2 bg-heat-4 text-heat-100 rounded-6 text-xs border border-heat-100",
                                                                            children: "Settings"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 823,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 821,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: `w-16 h-16 text-black-alpha-32 transition-transform ${expandedMcpId === 'custom' ? 'rotate-180' : ''}`,
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M19 9l-7 7-7-7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                        lineNumber: 833,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 827,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 817,
                                                            columnNumber: 23
                                                        }, this),
                                                        expandedMcpId === 'custom' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "px-16 pb-16 space-y-10 bg-[#f4f4f5]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-black-alpha-48",
                                                                    children: "Add new MCP servers to your registry in Settings. Once added, they'll appear here for all your agents to use."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 838,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        setShowMCPSelector(false);
                                                                        setExpandedMcpId(null);
                                                                        onOpenSettings?.();
                                                                    },
                                                                    className: "px-16 py-10 bg-heat-100 hover:bg-heat-200 text-white rounded-8 text-xs font-medium transition-colors",
                                                                    children: "Go to Settings"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 841,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 837,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 816,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 705,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 673,
                                    columnNumber: 17
                                }, this),
                                currentMCPServerIds && currentMCPServerIds.length > 0 && mcpServers ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8",
                                    children: currentMCPServerIds.map((serverId)=>{
                                        const server = mcpServers.find((s)=>s._id === serverId);
                                        if (!server) return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-14 py-10 bg-background-base rounded-10 border border-border-faint flex items-center justify-between group hover:border-heat-100 transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-accent-black font-mono",
                                                            children: server.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 870,
                                                            columnNumber: 27
                                                        }, this),
                                                        server.tools && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-black-alpha-48",
                                                            children: [
                                                                server.tools.length,
                                                                " tools"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 874,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 869,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        const newServerIds = currentMCPServerIds.filter((id)=>id !== serverId);
                                                        onUpdate(nodeData?.id || "", {
                                                            mcpServerIds: newServerIds
                                                        });
                                                        setCurrentMCPServerIds(newServerIds);
                                                    },
                                                    className: "w-20 h-20 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-14 h-14 text-black-alpha-48 hover:text-black-alpha-64",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M6 18L18 6M6 6l12 12"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 893,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 887,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 879,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, serverId, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 865,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 860,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-16 bg-background-base rounded-10 border border-border-faint text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-black-alpha-48",
                                        children: "No MCP servers connected"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                        lineNumber: 907,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 906,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 607,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-black-alpha-48",
                                            children: "Standard Tools"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 915,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowStandardTools(!showStandardTools),
                                            className: "w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center",
                                            title: "Add standard tools",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: `w-18 h-18 text-black-alpha-48 transition-transform ${showStandardTools ? 'rotate-180' : ''}`,
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 9l-7 7-7-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 929,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 923,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 918,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 914,
                                    columnNumber: 15
                                }, this),
                                selectedTools.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8 mb-12",
                                    children: selectedTools.map((toolConfig)=>{
                                        const toolDef = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toolRegistry"].find((t)=>t.id === toolConfig.toolId);
                                        if (!toolDef) return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-background-base rounded-10 border border-border-faint overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-14 py-10 flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-8",
                                                            children: [
                                                                toolDef.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(toolDef.icon, {
                                                                    className: "w-14 h-14 text-black-alpha-64"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 950,
                                                                    columnNumber: 46
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-accent-black font-medium",
                                                                    children: toolDef.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 951,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 949,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setSelectedTools((prev)=>prev.filter((t)=>t.toolId !== toolConfig.toolId));
                                                            },
                                                            className: "text-xs text-red-500 hover:text-red-600 font-medium",
                                                            children: "Remove"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 953,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 948,
                                                    columnNumber: 25
                                                }, this),
                                                toolDef.fields.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-14 pb-14 space-y-8 border-t border-border-faint pt-8",
                                                    children: toolDef.fields.map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "block text-xs text-black-alpha-48 mb-4",
                                                                    children: [
                                                                        field.label,
                                                                        " ",
                                                                        field.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-red-500",
                                                                            children: "*"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 969,
                                                                            columnNumber: 68
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 968,
                                                                    columnNumber: 33
                                                                }, this),
                                                                field.type === 'select' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: toolConfig.config[field.name] || field.defaultValue || '',
                                                                    onChange: (e)=>{
                                                                        const newConfig = {
                                                                            ...toolConfig.config,
                                                                            [field.name]: e.target.value
                                                                        };
                                                                        setSelectedTools((prev)=>prev.map((t)=>t.toolId === toolConfig.toolId ? {
                                                                                    ...t,
                                                                                    config: newConfig
                                                                                } : t));
                                                                    },
                                                                    className: "w-full px-10 py-6 bg-accent-white border border-border-faint rounded-6 text-xs text-accent-black focus:outline-none focus:border-heat-100",
                                                                    children: field.options?.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: opt.value,
                                                                            children: opt.label
                                                                        }, opt.value, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 983,
                                                                            columnNumber: 39
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 972,
                                                                    columnNumber: 35
                                                                }, this) : field.type === 'boolean' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-8",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                const newVal = !toolConfig.config[field.name];
                                                                                const newConfig = {
                                                                                    ...toolConfig.config,
                                                                                    [field.name]: newVal
                                                                                };
                                                                                setSelectedTools((prev)=>prev.map((t)=>t.toolId === toolConfig.toolId ? {
                                                                                            ...t,
                                                                                            config: newConfig
                                                                                        } : t));
                                                                            },
                                                                            className: `w-36 h-20 rounded-full transition-colors relative ${toolConfig.config[field.name] ? "bg-heat-100" : "bg-black-alpha-12"}`,
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                className: "w-16 h-16 bg-white rounded-full absolute top-2 shadow-sm",
                                                                                animate: {
                                                                                    left: toolConfig.config[field.name] ? "18px" : "2px"
                                                                                },
                                                                                transition: {
                                                                                    duration: 0.2
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                lineNumber: 999,
                                                                                columnNumber: 39
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 988,
                                                                            columnNumber: 37
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-black-alpha-64",
                                                                            children: toolConfig.config[field.name] ? 'Enabled' : 'Disabled'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 1005,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 987,
                                                                    columnNumber: 35
                                                                }, this) : field.global ? // Global Field (API Key) - Show status instead of input
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between bg-accent-white border border-border-faint rounded-6 px-10 py-6",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-6",
                                                                            children: configuredToolKeys?.some((k)=>k.toolId === toolConfig.toolId && k.isActive) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-6 h-6 rounded-full bg-green-500"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                        lineNumber: 1015,
                                                                                        columnNumber: 43
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-xs text-accent-black font-medium",
                                                                                        children: "Ready to use"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                        lineNumber: 1016,
                                                                                        columnNumber: 43
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-6 h-6 rounded-full bg-orange-500"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                        lineNumber: 1020,
                                                                                        columnNumber: 43
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-xs text-orange-600 font-medium",
                                                                                        children: "API Key required"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                                        lineNumber: 1021,
                                                                                        columnNumber: 43
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 1012,
                                                                            columnNumber: 37
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>onOpenSettings?.(),
                                                                            className: "text-[10px] font-medium text-heat-100 hover:text-heat-200 hover:underline",
                                                                            children: "Configure in Settings"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 1025,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 1011,
                                                                    columnNumber: 35
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: field.type === 'secret' ? 'password' : 'text',
                                                                    value: toolConfig.config[field.name] || '',
                                                                    onChange: (e)=>{
                                                                        const newConfig = {
                                                                            ...toolConfig.config,
                                                                            [field.name]: e.target.value
                                                                        };
                                                                        setSelectedTools((prev)=>prev.map((t)=>t.toolId === toolConfig.toolId ? {
                                                                                    ...t,
                                                                                    config: newConfig
                                                                                } : t));
                                                                    },
                                                                    placeholder: field.placeholder,
                                                                    className: "w-full px-10 py-6 bg-accent-white border border-border-faint rounded-6 text-xs text-accent-black placeholder-black-alpha-32 focus:outline-none focus:border-heat-100"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 1033,
                                                                    columnNumber: 35
                                                                }, this),
                                                                field.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] text-black-alpha-32 mt-2",
                                                                    children: field.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 1047,
                                                                    columnNumber: 35
                                                                }, this)
                                                            ]
                                                        }, field.name, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 967,
                                                            columnNumber: 31
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 965,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, toolConfig.toolId, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 947,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 941,
                                    columnNumber: 17
                                }, this),
                                showStandardTools && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    animate: {
                                        opacity: 1,
                                        height: "auto"
                                    },
                                    exit: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    className: "mb-12 p-12 bg-[#f4f4f5] rounded-12 border border-border-faint",
                                    children: [
                                        'web-search',
                                        'scraping',
                                        'extraction'
                                    ].map((category)=>{
                                        const tools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tools$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToolsByCategory"])(category);
                                        if (tools.length === 0) return null;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-12 last:mb-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                    className: "text-xs font-semibold text-black-alpha-48 uppercase tracking-wider mb-6",
                                                    children: category.replace('-', ' ')
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 1073,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: tools.map((tool)=>{
                                                        const isSelected = selectedTools.some((t)=>t.toolId === tool.id);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                if (!isSelected) {
                                                                    // Initialize with defaults
                                                                    const initialConfig = {};
                                                                    tool.fields.forEach((f)=>{
                                                                        if (f.defaultValue !== undefined) initialConfig[f.name] = f.defaultValue;
                                                                    });
                                                                    setSelectedTools((prev)=>[
                                                                            ...prev,
                                                                            {
                                                                                toolId: tool.id,
                                                                                enabled: true,
                                                                                config: initialConfig
                                                                            }
                                                                        ]);
                                                                    setShowStandardTools(false);
                                                                }
                                                            },
                                                            disabled: isSelected,
                                                            className: `w-full text-left px-10 py-8 rounded-8 flex items-center gap-8 transition-colors ${isSelected ? 'opacity-50 cursor-not-allowed bg-black-alpha-4' : 'hover:bg-white hover:shadow-sm'}`,
                                                            children: [
                                                                tool.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(tool.icon, {
                                                                    className: "w-14 h-14 text-black-alpha-64"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 1104,
                                                                    columnNumber: 47
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm font-medium text-accent-black",
                                                                            children: tool.label
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 1106,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-black-alpha-48",
                                                                            children: tool.description
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                            lineNumber: 1107,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                    lineNumber: 1105,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, tool.id, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 1080,
                                                            columnNumber: 31
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 1076,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, category, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 1072,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 1061,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 913,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-medium text-black-alpha-48 mb-8",
                                    children: "Output format"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 1122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: outputFormat,
                                    onChange: (e)=>setOutputFormat(e.target.value),
                                    className: "w-full px-14 py-10 bg-background-base border border-border-faint rounded-10 text-sm text-accent-black focus:outline-none focus:border-heat-100 transition-colors appearance-none cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Text",
                                            children: "Text"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 1130,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "JSON",
                                            children: "JSON"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 1125,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 1121,
                            columnNumber: 13
                        }, this),
                        outputFormat === "JSON" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-black-alpha-48",
                                            children: "Output Schema Builder"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 1139,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                const newField = {
                                                    name: "",
                                                    type: "string",
                                                    required: false
                                                };
                                                const updated = [
                                                    ...schemaFields,
                                                    newField
                                                ];
                                                setSchemaFields(updated);
                                            },
                                            className: "px-10 py-6 bg-heat-100 hover:bg-heat-200 text-white rounded-8 text-xs font-medium transition-colors flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-12 h-12",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M12 4v16m8-8H4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 1160,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 1154,
                                                    columnNumber: 21
                                                }, this),
                                                "Add Field"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 1142,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 1138,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8 mb-12",
                                    children: schemaFields.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-16 bg-background-base rounded-10 border border-border-faint text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-black-alpha-48",
                                                children: "No fields added yet"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 1175,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-black-alpha-32 mt-4",
                                                children: 'Click "Add Field" to start building your schema'
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 1178,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                        lineNumber: 1174,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-12 bg-background-base rounded-10 border border-border-faint space-y-10",
                                        children: schemaFields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: field.name,
                                                        onChange: (e)=>{
                                                            const updated = [
                                                                ...schemaFields
                                                            ];
                                                            updated[index].name = e.target.value;
                                                            setSchemaFields(updated);
                                                            updateSchemaFromFields(updated);
                                                        },
                                                        placeholder: "Field name",
                                                        className: "flex-1 px-10 py-6 bg-accent-white border border-border-faint rounded-6 text-sm text-accent-black placeholder-black-alpha-32 focus:outline-none focus:border-heat-100"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 1189,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: field.type,
                                                        onChange: (e)=>{
                                                            const updated = [
                                                                ...schemaFields
                                                            ];
                                                            updated[index].type = e.target.value;
                                                            setSchemaFields(updated);
                                                            updateSchemaFromFields(updated);
                                                        },
                                                        className: "px-10 py-6 bg-accent-white border border-border-faint rounded-6 text-sm text-accent-black focus:outline-none focus:border-heat-100",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "string",
                                                                children: "string"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 1211,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "number",
                                                                children: "number"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 1212,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "boolean",
                                                                children: "boolean"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 1213,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "array",
                                                                children: "array"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 1214,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "object",
                                                                children: "object"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 1215,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 1201,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            const updated = schemaFields.filter((_, i)=>i !== index);
                                                            setSchemaFields(updated);
                                                            updateSchemaFromFields(updated);
                                                        },
                                                        className: "w-24 h-24 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-14 h-14 text-black-alpha-48",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M6 18L18 6M6 6l12 12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                                lineNumber: 1233,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                            lineNumber: 1227,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 1217,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, `field-${index}-${field.name}`, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 1185,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                        lineNumber: 1183,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 1172,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                    className: "group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                            className: "cursor-pointer text-xs text-heat-100 hover:text-heat-200 transition-colors flex items-center gap-4 mb-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "View Raw JSON"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 1250,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-12 h-12 transition-transform group-open:rotate-180",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M19 9l-7 7-7-7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                        lineNumber: 1257,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                    lineNumber: 1251,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 1249,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: jsonOutputSchema,
                                            onChange: (e)=>setJsonOutputSchema(e.target.value),
                                            rows: 6,
                                            placeholder: '{"type": "object", "properties": {...}}',
                                            className: "w-full px-14 py-10 bg-gray-900 text-heat-100 border border-border-faint rounded-10 text-xs font-mono focus:outline-none focus:border-heat-100 transition-colors resize-y"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 1265,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 1248,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 1137,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            className: "group",
                            open: showAdvanced,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    onClick: (e)=>{
                                        e.preventDefault();
                                        setShowAdvanced(!showAdvanced);
                                    },
                                    className: "flex items-center justify-between cursor-pointer list-none text-sm font-medium text-black-alpha-48 hover:text-accent-black transition-colors py-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Advanced"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 1285,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: `w-16 h-16 transition-transform ${showAdvanced ? "rotate-180" : ""}`,
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M19 9l-7 7-7-7"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 1292,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                            lineNumber: 1286,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 1278,
                                    columnNumber: 15
                                }, this),
                                showAdvanced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-16 pt-16 border-t border-border-faint",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium text-black-alpha-48 mb-8",
                                                children: "Token Limit"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 1305,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: tokenLimit || "",
                                                onChange: (e)=>{
                                                    const val = parseInt(e.target.value);
                                                    setTokenLimit(isNaN(val) ? undefined : val);
                                                },
                                                placeholder: "e.g. 4096 (Leave empty for default)",
                                                className: "w-full px-14 py-10 bg-background-base border border-border-faint rounded-10 text-sm text-accent-black placeholder-black-alpha-32 focus:outline-none focus:border-heat-100 transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 1308,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-black-alpha-48 mt-4",
                                                children: "Maximum number of tokens to generate. Leave empty to use the model's default."
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                                lineNumber: 1318,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                        lineNumber: 1304,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                                    lineNumber: 1302,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                            lineNumber: 1277,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
                    lineNumber: 436,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
            lineNumber: 358,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx",
        lineNumber: 356,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_app_%28home%29_sections_workflow-builder_NodePanel_tsx_4bb85a86._.js.map