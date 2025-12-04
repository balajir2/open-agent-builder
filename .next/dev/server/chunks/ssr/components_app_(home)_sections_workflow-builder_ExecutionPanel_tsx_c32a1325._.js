module.exports = [
"[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/ExecutionPanel.tsx
__turbopack_context__.s([
    "default",
    ()=>ExecutionPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-ssr] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/repeat.js [app-ssr] (ecmascript) <export default as Repeat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/braces.js [app-ssr] (ecmascript) <export default as Braces>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plug.js [app-ssr] (ecmascript) <export default as Plug>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-stop.js [app-ssr] (ecmascript) <export default as StopCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$button$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/button/Button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const getNodeIcon = (nodeType)=>{
    const iconMap = {
        'agent': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"],
        'mcp': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__["Plug"],
        'firecrawl': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        'if-else': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"],
        'while': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__["Repeat"],
        'user-approval': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
        'transform': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__["Braces"],
        'file-search': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
        'extract': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        'end': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__["StopCircle"],
        'start': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"]
    };
    return iconMap[nodeType] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__["Plug"];
};
const getNodeColor = (nodeType)=>{
    const colorMap = {
        'agent': 'bg-heat-40',
        'mcp': 'bg-teal-500',
        'firecrawl': 'bg-black-alpha-12',
        'if-else': 'bg-amber-500',
        'while': 'bg-cyan-500',
        'user-approval': 'bg-gray-400',
        'transform': 'bg-violet-500',
        'file-search': 'bg-indigo-500',
        'extract': 'bg-purple-500',
        'end': 'bg-gray-500',
        'start': 'bg-gray-600'
    };
    return colorMap[nodeType] || 'bg-gray-500';
};
function ExecutionPanel({ workflow, execution, nodeResults, isRunning, currentNodeId, onRun, onResumePendingAuth, onClose, environment, pendingAuth }) {
    // Track Google Doc creation for toast notifications
    const [notifiedDocs, setNotifiedDocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [isResumingAuth, setIsResumingAuth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copiedAuthLink, setCopiedAuthLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCopyAuthLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!pendingAuth?.authUrl) return;
        navigator.clipboard.writeText(pendingAuth.authUrl);
        setCopiedAuthLink(true);
        setTimeout(()=>setCopiedAuthLink(false), 2000);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Authorization link copied');
    }, [
        pendingAuth?.authUrl
    ]);
    const handleResumeAuthorization = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (isResumingAuth) return;
        setIsResumingAuth(true);
        try {
            await onResumePendingAuth();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Resuming workflow...');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to resume workflow';
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(message);
        } finally{
            setIsResumingAuth(false);
        }
    }, [
        isResumingAuth,
        onResumePendingAuth
    ]);
    // Check for Google Doc creation and show toast
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        Object.entries(nodeResults).forEach(([nodeId, result])=>{
            if (result.status === 'completed' && result.output && !notifiedDocs.has(nodeId)) {
                const output = result.output;
                const outputStr = typeof output === 'string' ? output : JSON.stringify(output, null, 2);
                const outputObj = typeof output === 'object' ? output : null;
                // Check if this is a Google Docs creation result
                const isGoogleDocResult = outputObj?.result?.output?.value?.documentUrl || outputStr.includes('documentUrl') || outputStr.includes('Executive Summary');
                if (isGoogleDocResult) {
                    let docUrl = null;
                    let docTitle = null;
                    // Extract document URL and title from the result
                    if (outputObj?.result?.output?.value?.documentUrl) {
                        docUrl = outputObj.result.output.value.documentUrl;
                        docTitle = outputObj.result.output.value.title || 'Executive Summary';
                    } else if (outputStr.includes('documentUrl')) {
                        try {
                            const parsed = JSON.parse(outputStr);
                            docUrl = parsed.result?.output?.value?.documentUrl || parsed.documentUrl;
                            docTitle = parsed.result?.output?.value?.title || parsed.documentTitle || 'Executive Summary';
                        } catch (e) {
                            // Fallback: try to extract URL from string
                            const urlMatch = outputStr.match(/https:\/\/docs\.google\.com\/document\/d\/[^\/\s]+/);
                            if (urlMatch) {
                                docUrl = urlMatch[0];
                                docTitle = 'Executive Summary';
                            }
                        }
                    }
                    if (docUrl) {
                        // Show success toast
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Document Updated', {
                            description: `Your executive summary "${docTitle}" has been created in Google Docs.`,
                            action: {
                                label: 'Open Document',
                                onClick: ()=>window.open(docUrl, '_blank')
                            },
                            duration: 8000
                        });
                        // Mark this node as notified
                        setNotifiedDocs((prev)=>new Set(prev).add(nodeId));
                    }
                }
            }
        });
    }, [
        nodeResults,
        notifiedDocs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCopiedAuthLink(false);
    }, [
        pendingAuth?.authId
    ]);
    // Get input variables from Start node
    const startNode = workflow?.nodes.find((n)=>n.data?.nodeType === 'start');
    const inputVariables = startNode?.data?.inputVariables || [];
    console.log('ExecutionPanel - Start node:', startNode);
    console.log('ExecutionPanel - Input variables:', inputVariables);
    // Initialize input state from variables
    const [inputValues, setInputValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // Upload-related state & refs
    const [uploadingFiles, setUploadingFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [uploadProgress, setUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [uploadErrors, setUploadErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const uploadXhrs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({});
    // Update inputValues when inputVariables change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (inputVariables.length > 0) {
            const defaults = inputVariables.reduce((acc, v)=>{
                acc[v.name] = v.defaultValue || (v.type === 'url' ? 'https://firecrawl.dev' : '');
                return acc;
            }, {});
            setInputValues(defaults);
            console.log('Set input values from variables:', defaults);
        } else {
            setInputValues({
                input: 'https://firecrawl.dev'
            });
            console.log('Set default input value');
        }
    }, [
        workflow?.id,
        inputVariables.length
    ]); // Re-initialize when workflow or variables change
    const [showInput, setShowInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [copiedError, setCopiedError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedAll, setCopiedAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expandedSchemas, setExpandedSchemas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const handleCopyAllResults = ()=>{
        // Collect all results from the workflow with data flow information
        const results = {
            environment,
            workflowId: workflow?.id,
            executionId: execution?.id,
            status: execution?.status,
            inputs: inputValues,
            dataFlow: {
                nodes: Object.entries(nodeResults).map(([nodeId, result])=>{
                    const node = workflow?.nodes.find((n)=>n.id === nodeId);
                    const nodeName = node?.data?.nodeName || (typeof node?.data?.label === 'string' ? node.data.label : nodeId);
                    // Find incoming connections (edges where this node is the target)
                    const incomingEdges = workflow?.edges.filter((e)=>e.target === nodeId) || [];
                    const incomingConnections = incomingEdges.map((edge)=>{
                        const sourceNode = workflow?.nodes.find((n)=>n.id === edge.source);
                        const sourceNodeName = sourceNode?.data?.nodeName || edge.source;
                        return {
                            fromNodeId: edge.source,
                            fromNodeName: sourceNodeName,
                            edgeLabel: edge.label || null,
                            sourceOutput: nodeResults[edge.source]?.output || null
                        };
                    });
                    // Find outgoing connections (edges where this node is the source)
                    const outgoingEdges = workflow?.edges.filter((e)=>e.source === nodeId) || [];
                    const outgoingConnections = outgoingEdges.map((edge)=>{
                        const targetNode = workflow?.nodes.find((n)=>n.id === edge.target);
                        const targetNodeName = targetNode?.data?.nodeName || edge.target;
                        return {
                            toNodeId: edge.target,
                            toNodeName: targetNodeName,
                            edgeLabel: edge.label || null,
                            receivedInput: result.output || null
                        };
                    });
                    return {
                        nodeId,
                        nodeName,
                        nodeType: node?.data?.nodeType || node?.type,
                        status: result.status,
                        incomingConnections,
                        output: result.output,
                        toolCalls: result.toolCalls || [],
                        outgoingConnections,
                        error: result.error,
                        arguments: node?.data?.arguments || null,
                        duration: result.completedAt && result.startedAt ? Math.round((new Date(result.completedAt).getTime() - new Date(result.startedAt).getTime()) / 1000) : null
                    };
                }),
                connections: workflow?.edges.map((edge)=>({
                        from: edge.source,
                        to: edge.target,
                        label: edge.label || null,
                        fromNodeName: workflow.nodes.find((n)=>n.id === edge.source)?.data?.nodeName || edge.source,
                        toNodeName: workflow.nodes.find((n)=>n.id === edge.target)?.data?.nodeName || edge.target
                    })) || []
            },
            totalDuration: execution?.completedAt && execution?.startedAt ? Math.round((new Date(execution.completedAt).getTime() - new Date(execution.startedAt).getTime()) / 1000) : null
        };
        navigator.clipboard.writeText(JSON.stringify(results, null, 2));
        setCopiedAll(true);
        setTimeout(()=>setCopiedAll(false), 2000);
    };
    const handleRun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const input = inputVariables.length > 0 ? JSON.stringify(inputValues) : inputValues.input || '';
        console.log('🚀 Running workflow with input:', input);
        setShowInput(false);
        onRun(input);
    }, [
        inputVariables,
        inputValues,
        onRun
    ]);
    const hasMissingRequiredInputs = inputVariables.length > 0 ? inputVariables.some((variable)=>variable.required && (inputValues[variable.name] === undefined || inputValues[variable.name] === '' || inputValues[variable.name] === null)) : false;
    const canTriggerShortcut = showInput && !isRunning && !hasMissingRequiredInputs;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!canTriggerShortcut) return;
        const handleKeyDown = (event)=>{
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                event.preventDefault();
                handleRun();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    }, [
        canTriggerShortcut,
        handleRun
    ]);
    const handleReset = ()=>{
        setShowInput(true);
        setInputValues(inputVariables.length > 0 ? inputVariables.reduce((acc, v)=>{
            acc[v.name] = v.defaultValue || '';
            return acc;
        }, {}) : {
            input: ''
        });
    };
    const handleCopyError = (error, nodeId)=>{
        navigator.clipboard.writeText(error);
        setCopiedError(nodeId);
        setTimeout(()=>setCopiedError(null), 2000);
    };
    // ---------- Upload helpers ----------
    const formatBytes = (b = 0)=>{
        if (b === 0) return "0 B";
        const k = 1024;
        const sizes = [
            "B",
            "KB",
            "MB",
            "GB"
        ];
        const i = Math.floor(Math.log(b) / Math.log(k));
        return parseFloat((b / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };
    /**
   * Upload file for a named variable.
   * Expects server response JSON: { fileUrl?, storageId?, originalFilename?, size? }
   */ const uploadFileForVariable = (variableName, file)=>{
        if (!file) return;
        // client-side validation example (max 20MB)
        const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE_BYTES) {
            setUploadErrors((prev)=>({
                    ...prev,
                    [variableName]: `File too large (max ${formatBytes(MAX_FILE_SIZE_BYTES)})`
                }));
            return;
        }
        setUploadErrors((prev)=>({
                ...prev,
                [variableName]: null
            }));
        setUploadingFiles((prev)=>({
                ...prev,
                [variableName]: true
            }));
        setUploadProgress((prev)=>({
                ...prev,
                [variableName]: 0
            }));
        const xhr = new XMLHttpRequest();
        uploadXhrs.current[variableName] = xhr;
        // If you proxy via /api/upload in your Next.js app, use that. Otherwise use convex direct HTTP action URL.
        // Example: xhr.open("POST", "/api/upload");
        // If you use direct convex action endpoint (and CORS enabled): xhr.open("POST", "https://your-dev.convex.site/http/uploadFile");
        xhr.open("POST", "/api/upload");
        xhr.upload.onprogress = (ev)=>{
            if (ev.lengthComputable) {
                const percent = Math.round(ev.loaded / ev.total * 100);
                setUploadProgress((prev)=>({
                        ...prev,
                        [variableName]: percent
                    }));
            } else {
                setUploadProgress((prev)=>({
                        ...prev,
                        [variableName]: 50
                    }));
            }
        };
        xhr.onerror = ()=>{
            setUploadingFiles((prev)=>({
                    ...prev,
                    [variableName]: false
                }));
            setUploadErrors((prev)=>({
                    ...prev,
                    [variableName]: "Upload failed — network error"
                }));
            setUploadProgress((prev)=>({
                    ...prev,
                    [variableName]: 0
                }));
            uploadXhrs.current[variableName] = null;
        };
        xhr.onload = ()=>{
            setUploadingFiles((prev)=>({
                    ...prev,
                    [variableName]: false
                }));
            uploadXhrs.current[variableName] = null;
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    const fileMeta = {
                        fileUrl: data.fileUrl ?? data.storageId ?? null,
                        storageId: data.storageId ?? null,
                        originalFilename: data.originalFilename ?? file.name,
                        size: data.size ?? file.size,
                        contentType: data.contentType ?? file.type
                    };
                    console.log(`[ExecutionPanel] ✅ File uploaded for variable '${variableName}':`, {
                        storageId: fileMeta.storageId,
                        filename: fileMeta.originalFilename,
                        size: fileMeta.size
                    });
                    setInputValues((prev)=>({
                            ...prev,
                            [variableName]: fileMeta
                        }));
                    setUploadProgress((prev)=>({
                            ...prev,
                            [variableName]: 100
                        }));
                    setTimeout(()=>setUploadProgress((prev)=>({
                                ...prev,
                                [variableName]: 0
                            })), 700);
                } catch (e) {
                    setUploadErrors((prev)=>({
                            ...prev,
                            [variableName]: "Upload succeeded but response invalid"
                        }));
                }
            } else {
                let message = `Upload failed: ${xhr.status}`;
                try {
                    const parsed = JSON.parse(xhr.responseText);
                    if (parsed?.error) message = parsed.error;
                } catch  {}
                setUploadErrors((prev)=>({
                        ...prev,
                        [variableName]: message
                    }));
            }
        };
        const form = new FormData();
        form.append("file", file);
        form.append("variableName", variableName);
        // append any metadata server expects:
        // form.append("workflowId", workflow?.id ?? '');
        xhr.send(form);
    };
    const cancelUploadForVariable = (variableName)=>{
        const xhr = uploadXhrs.current[variableName];
        if (xhr) {
            try {
                xhr.abort();
            } catch  {}
            uploadXhrs.current[variableName] = null;
        }
        setUploadingFiles((prev)=>({
                ...prev,
                [variableName]: false
            }));
        setUploadProgress((prev)=>({
                ...prev,
                [variableName]: 0
            }));
        setUploadErrors((prev)=>({
                ...prev,
                [variableName]: "Upload cancelled"
            }));
    };
    const removeUploadedFileForVariable = (variableName)=>{
        // If upload in progress, cancel
        cancelUploadForVariable(variableName);
        // Remove metadata from inputs
        setInputValues((prev)=>({
                ...prev,
                [variableName]: null
            }));
        setUploadErrors((prev)=>({
                ...prev,
                [variableName]: null
            }));
        setUploadProgress((prev)=>({
                ...prev,
                [variableName]: 0
            }));
    };
    // ---------- end upload helpers ----------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].aside, {
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
            className: "fixed right-20 top-80 h-[calc(100vh-100px)] w-[calc(100vw-240px)] max-w-480 bg-accent-white border border-border-faint shadow-lg overflow-hidden z-50 rounded-16 flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-20 border-b border-border-faint flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-label-large text-accent-black",
                                            children: "Preview Workflow"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 461,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-body-small text-black-alpha-48",
                                            children: [
                                                "Environment: ",
                                                environment === 'production' ? 'Production' : 'Draft'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 462,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                    lineNumber: 460,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-8",
                                    children: [
                                        !showInput && Object.keys(nodeResults).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$button$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    onClick: handleCopyAllResults,
                                                    variant: "secondary",
                                                    className: "gap-6 px-10 py-6",
                                                    title: "Copy all workflow results",
                                                    children: copiedAll ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-16 h-16",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M5 13l4 4L19 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 479,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 478,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Copied"
                                                        ]
                                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-16 h-16",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 486,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 485,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Copy All"
                                                        ]
                                                    }, void 0, true)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        const results = {
                                                            environment,
                                                            workflowId: workflow?.id,
                                                            executionId: execution?.id,
                                                            status: execution?.status,
                                                            inputs: inputValues,
                                                            dataFlow: {
                                                                nodes: Object.entries(nodeResults).map(([nodeId, result])=>{
                                                                    const node = workflow?.nodes.find((n)=>n.id === nodeId);
                                                                    const nodeName = node?.data?.nodeName || (typeof node?.data?.label === 'string' ? node.data.label : nodeId);
                                                                    const incomingEdges = workflow?.edges.filter((e)=>e.target === nodeId) || [];
                                                                    const outgoingEdges = workflow?.edges.filter((e)=>e.source === nodeId) || [];
                                                                    return {
                                                                        nodeId,
                                                                        nodeName,
                                                                        nodeType: node?.data?.nodeType || node?.type,
                                                                        status: result.status,
                                                                        incomingConnections: incomingEdges.map((edge)=>({
                                                                                fromNodeId: edge.source,
                                                                                fromNodeName: workflow?.nodes.find((n)=>n.id === edge.source)?.data?.nodeName || edge.source,
                                                                                edgeLabel: edge.label || null
                                                                            })),
                                                                        output: result.output,
                                                                        toolCalls: result.toolCalls || [],
                                                                        outgoingConnections: outgoingEdges.map((edge)=>({
                                                                                toNodeId: edge.target,
                                                                                toNodeName: workflow?.nodes.find((n)=>n.id === edge.target)?.data?.nodeName || edge.target,
                                                                                edgeLabel: edge.label || null
                                                                            })),
                                                                        error: result.error,
                                                                        duration: result.completedAt && result.startedAt ? Math.round((new Date(result.completedAt).getTime() - new Date(result.startedAt).getTime()) / 1000) : null
                                                                    };
                                                                })
                                                            },
                                                            totalDuration: execution?.completedAt && execution?.startedAt ? Math.round((new Date(execution.completedAt).getTime() - new Date(execution.startedAt).getTime()) / 1000) : null
                                                        };
                                                        const blob = new Blob([
                                                            JSON.stringify(results, null, 2)
                                                        ], {
                                                            type: 'application/json'
                                                        });
                                                        const url = URL.createObjectURL(blob);
                                                        const a = document.createElement('a');
                                                        a.href = url;
                                                        a.download = `workflow-results-${workflow?.id || 'unknown'}-${Date.now()}.json`;
                                                        document.body.appendChild(a);
                                                        a.click();
                                                        document.body.removeChild(a);
                                                        URL.revokeObjectURL(url);
                                                    },
                                                    className: "px-12 py-6 bg-accent-black hover:bg-black-alpha-80 text-white rounded-6 text-body-small font-medium transition-colors flex items-center gap-6",
                                                    title: "Download workflow results as JSON",
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
                                                                d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 550,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 549,
                                                            columnNumber: 21
                                                        }, this),
                                                        "Download"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onClose,
                                            className: "w-32 h-32 rounded-6 hover:bg-black-alpha-4 transition-colors flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-16 h-16 text-black-alpha-48",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M6 18L18 6M6 6l12 12"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 561,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 560,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 556,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                    lineNumber: 466,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                            lineNumber: 459,
                            columnNumber: 11
                        }, this),
                        execution?.status === 'waiting-auth' && pendingAuth && pendingAuth.toolName === 'user-approval' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-16 p-16 bg-accent-white border border-border-faint rounded-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-12 mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-32 h-32 rounded-full bg-heat-100 flex items-center justify-center flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-16 h-16 text-white",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 571,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 570,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 569,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-label-medium font-medium text-accent-black mb-4",
                                                    children: "Workflow Paused"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-body-small text-black-alpha-48 mb-8",
                                                    children: "Approval Required"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 578,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-12 bg-background-base border border-border-faint rounded-6",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-body-small text-accent-black whitespace-pre-wrap",
                                                        children: pendingAuth.message || 'This workflow requires your approval to continue.'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 582,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 574,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                    lineNumber: 568,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: async ()=>{
                                                setIsResumingAuth(true);
                                                try {
                                                    await onResumePendingAuth();
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Approved');
                                                } catch (error) {
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to resume workflow');
                                                } finally{
                                                    setIsResumingAuth(false);
                                                }
                                            },
                                            disabled: isResumingAuth,
                                            className: "flex-1 px-14 py-8 bg-heat-100 hover:bg-heat-200 text-white rounded-6 text-body-small font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: isResumingAuth ? 'Approving...' : 'Approve'
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 589,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Rejected');
                                                onClose();
                                            },
                                            className: "flex-1 px-14 py-8 bg-background-base hover:bg-black-alpha-4 text-accent-black border border-border-faint rounded-6 text-body-small font-medium transition-all active:scale-[0.98]",
                                            children: "Reject"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 607,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                    lineNumber: 588,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                            lineNumber: 567,
                            columnNumber: 13
                        }, this),
                        execution?.status === 'waiting-auth' && pendingAuth && pendingAuth.toolName !== 'user-approval' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "m-20 mt-0 mb-16 p-16 bg-heat-4 border border-heat-100 rounded-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-label-medium font-medium text-accent-black",
                                                children: [
                                                    "Authorization required for ",
                                                    pendingAuth.toolName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 625,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-body-small text-black-alpha-64 mt-4",
                                                children: pendingAuth.message || 'Open the authorization link in a new tab, approve access, then resume the workflow.'
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 628,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 624,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-10 items-center",
                                        children: [
                                            pendingAuth.authUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: pendingAuth.authUrl,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "inline-flex items-center gap-6 px-14 py-8 bg-accent-black hover:bg-black-alpha-88 text-white rounded-8 text-body-small font-medium transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-14 h-14",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 641,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Open authorization"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 634,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-14 py-8 bg-accent-white border border-border-faint rounded-8 text-body-small text-black-alpha-64",
                                                children: "Waiting for authorization link..."
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 646,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleCopyAuthLink,
                                                disabled: !pendingAuth.authUrl,
                                                className: "inline-flex items-center gap-6 px-14 py-8 bg-accent-white border border-border-faint rounded-8 text-body-small text-accent-black hover:bg-black-alpha-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-14 h-14",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 657,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 656,
                                                        columnNumber: 21
                                                    }, this),
                                                    copiedAuthLink ? 'Copied link' : 'Copy link'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 650,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleResumeAuthorization,
                                                disabled: isResumingAuth,
                                                className: "inline-flex items-center gap-6 px-14 py-8 bg-heat-100 hover:bg-heat-200 text-white rounded-8 text-body-small font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                children: [
                                                    isResumingAuth ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-14 h-14 animate-spin",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                className: "opacity-25",
                                                                cx: "12",
                                                                cy: "12",
                                                                r: "10",
                                                                strokeWidth: "4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 669,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                className: "opacity-75",
                                                                fill: "currentColor",
                                                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 670,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-14 h-14",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M13 10V3L4 14h7v7l9-11h-7z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 674,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 673,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: isResumingAuth ? 'Resuming…' : 'Resume workflow'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 677,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 661,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 632,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                lineNumber: 623,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                            lineNumber: 622,
                            columnNumber: 13
                        }, this),
                        isRunning && currentNodeId && (()=>{
                            const node = workflow?.nodes.find((n)=>n.id === currentNodeId);
                            const nodeData = node?.data;
                            const nodeName = nodeData?.nodeName || nodeData?.label || 'Node';
                            const nodeType = nodeData?.nodeType || node?.type || 'agent';
                            const NodeIcon = getNodeIcon(nodeType);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-8 px-12 py-6 rounded-8 text-body-small bg-black-alpha-4 border border-border-faint",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-14 h-14 text-black-alpha-48 animate-spin",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                className: "opacity-25",
                                                cx: "12",
                                                cy: "12",
                                                r: "10",
                                                stroke: "currentColor",
                                                strokeWidth: "4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 695,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                className: "opacity-75",
                                                fill: "currentColor",
                                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 696,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 694,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NodeIcon, {
                                                className: "w-12 h-12 text-black-alpha-64",
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 699,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-accent-black font-medium",
                                                children: typeof nodeName === 'string' ? nodeName : 'Running...'
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 700,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 698,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                lineNumber: 693,
                                columnNumber: 15
                            }, this);
                        })()
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                    lineNumber: 458,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto",
                    children: showInput ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-20",
                        children: [
                            inputVariables.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-24 space-y-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-label-medium text-accent-black",
                                        children: "Workflow Inputs"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 714,
                                        columnNumber: 19
                                    }, this),
                                    inputVariables.map((variable, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-label-small text-black-alpha-48 mb-8",
                                                    children: [
                                                        variable.name,
                                                        variable.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500 ml-4",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 719,
                                                            columnNumber: 47
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 717,
                                                    columnNumber: 23
                                                }, this),
                                                variable.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-body-small text-black-alpha-48 mb-8",
                                                    children: variable.description
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 25
                                                }, this),
                                                variable.type === 'boolean' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: inputValues[variable.name] || 'false',
                                                    onChange: (e)=>setInputValues({
                                                            ...inputValues,
                                                            [variable.name]: e.target.value === 'true'
                                                        }),
                                                    className: "w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-accent-black transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "true",
                                                            children: "True"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 733,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "false",
                                                            children: "False"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 734,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 728,
                                                    columnNumber: 25
                                                }, this) : variable.type === 'number' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: inputValues[variable.name] || '',
                                                    onChange: (e)=>setInputValues({
                                                            ...inputValues,
                                                            [variable.name]: parseFloat(e.target.value)
                                                        }),
                                                    placeholder: variable.defaultValue || '0',
                                                    className: "w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-accent-black transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 737,
                                                    columnNumber: 25
                                                }, this) : variable.type === 'document' ? // Document upload UI
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `relative border-2 rounded-lg p-4 transition-colors duration-150 ${uploadingFiles[variable.name] ? "border-indigo-400 bg-indigo-50/20" : "border-dashed border-gray-200 bg-white"}`,
                                                        onDragOver: (e)=>{
                                                            e.preventDefault();
                                                            e.currentTarget.classList.add("border-indigo-400");
                                                        },
                                                        onDragLeave: (e)=>{
                                                            e.currentTarget.classList.remove("border-indigo-400");
                                                        },
                                                        onDrop: (e)=>{
                                                            e.preventDefault();
                                                            e.currentTarget.classList.remove("border-indigo-400");
                                                            const file = e.dataTransfer.files[0];
                                                            if (file) uploadFileForVariable(variable.name, file);
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-10 h-10 rounded bg-indigo-600 flex items-center justify-center text-white",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                                        className: "w-5 h-5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 762,
                                                                                        columnNumber: 37
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 761,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-sm font-medium",
                                                                                            children: variable.description || `Upload file for ${variable.name}`
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                            lineNumber: 765,
                                                                                            columnNumber: 37
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-xs text-gray-500",
                                                                                            children: "Drag & drop a file, or click to choose"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                            lineNumber: 766,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 764,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 760,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 759,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded shadow cursor-pointer hover:brightness-110",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "file",
                                                                                    accept: "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                                                                    className: "hidden",
                                                                                    onChange: (e)=>{
                                                                                        const f = e.target.files?.[0] ?? null;
                                                                                        if (!f) return;
                                                                                        uploadFileForVariable(variable.name, f);
                                                                                        e.target.value = "";
                                                                                    }
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 773,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                uploadingFiles[variable.name] ? "Uploading…" : "Choose file"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 772,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 771,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 758,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-4",
                                                                children: [
                                                                    inputValues[variable.name] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between gap-4 p-3 bg-gray-50 rounded",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-3",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "w-12 h-12 flex items-center justify-center bg-white rounded border",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                            className: "w-6 h-6 text-indigo-600",
                                                                                            xmlns: "http://www.w3.org/2000/svg",
                                                                                            viewBox: "0 0 24 24",
                                                                                            fill: "none",
                                                                                            stroke: "currentColor",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                    strokeLinecap: "round",
                                                                                                    strokeLinejoin: "round",
                                                                                                    strokeWidth: 1.5,
                                                                                                    d: "M7 2h6l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 796,
                                                                                                    columnNumber: 41
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                    strokeLinecap: "round",
                                                                                                    strokeLinejoin: "round",
                                                                                                    strokeWidth: 1.5,
                                                                                                    d: "M13 2v6h6"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 797,
                                                                                                    columnNumber: 41
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                            lineNumber: 795,
                                                                                            columnNumber: 39
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 794,
                                                                                        columnNumber: 37
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-sm font-medium",
                                                                                                children: inputValues[variable.name].originalFilename ?? inputValues[variable.name].fileUrl ?? 'Uploaded file'
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                lineNumber: 801,
                                                                                                columnNumber: 39
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "text-xs text-gray-500",
                                                                                                children: formatBytes(inputValues[variable.name].size ?? 0)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                lineNumber: 802,
                                                                                                columnNumber: 39
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 800,
                                                                                        columnNumber: 37
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 793,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-3",
                                                                                children: [
                                                                                    inputValues[variable.name]?.fileUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                        href: inputValues[variable.name].fileUrl,
                                                                                        target: "_blank",
                                                                                        rel: "noreferrer",
                                                                                        className: "text-sm underline",
                                                                                        children: "View"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 809,
                                                                                        columnNumber: 39
                                                                                    }, this) : null,
                                                                                    uploadingFiles[variable.name] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>cancelUploadForVariable(variable.name),
                                                                                        className: "text-sm px-3 py-1 border rounded",
                                                                                        children: "Cancel"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 813,
                                                                                        columnNumber: 39
                                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>removeUploadedFileForVariable(variable.name),
                                                                                        className: "text-sm px-3 py-1 border rounded",
                                                                                        children: "Remove"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 815,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 806,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 792,
                                                                        columnNumber: 33
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-xs text-gray-500",
                                                                        children: "No file uploaded yet"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 820,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    uploadingFiles[variable.name] || uploadProgress[variable.name] && uploadProgress[variable.name] > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-2 w-full bg-gray-200 rounded overflow-hidden",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    style: {
                                                                                        width: `${uploadProgress[variable.name] ?? 0}%`
                                                                                    },
                                                                                    className: "h-2 bg-indigo-600 transition-all duration-200"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 827,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 826,
                                                                                columnNumber: 35
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-xs text-gray-500 mt-1",
                                                                                children: uploadProgress[variable.name] ? `${uploadProgress[variable.name]}%` : "Uploading…"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 832,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 825,
                                                                        columnNumber: 33
                                                                    }, this) : null,
                                                                    uploadErrors[variable.name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-2 text-xs text-red-500",
                                                                        children: uploadErrors[variable.name]
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 839,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 790,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 747,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 746,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: inputValues[variable.name] ?? "",
                                                    onChange: (e)=>setInputValues({
                                                            ...inputValues,
                                                            [variable.name]: e.target.value
                                                        }),
                                                    placeholder: variable.defaultValue || `Enter ${variable.name}...`,
                                                    className: "w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-accent-black transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 847,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, index, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 716,
                                            columnNumber: 21
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                lineNumber: 713,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-24",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-label-small text-black-alpha-48 mb-8",
                                        children: "Input Message"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 860,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: inputValues.input || '',
                                        onChange: (e)=>setInputValues({
                                                input: e.target.value
                                            }),
                                        placeholder: "Enter your message or prompt...",
                                        rows: 6,
                                        className: "w-full px-12 py-10 bg-background-base border border-border-faint rounded-8 text-body-medium text-accent-black focus:outline-none focus:border-accent-black transition-colors resize-none"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 863,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                lineNumber: 859,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRun,
                                disabled: hasMissingRequiredInputs,
                                className: "w-full px-20 py-12 bg-accent-black hover:bg-black-alpha-80 text-white rounded-8 text-body-medium font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-16 h-16",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 879,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 880,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 878,
                                        columnNumber: 17
                                    }, this),
                                    "Preview Workflow"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                lineNumber: 873,
                                columnNumber: 15
                            }, this),
                            workflow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-24 p-16 bg-accent-white rounded-12 border border-border-faint",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-label-medium text-accent-black mb-12",
                                        children: "Workflow Summary"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 888,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-8 text-body-small text-black-alpha-48",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Nodes:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 891,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-accent-black font-medium",
                                                        children: workflow.nodes.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 892,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 890,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Connections:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 895,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-accent-black font-medium",
                                                        children: workflow.edges.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 896,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 894,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 889,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                lineNumber: 887,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                        lineNumber: 710,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-24 p-16 bg-accent-white rounded-12 border border-border-faint",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-small text-accent-black mb-4 font-medium",
                                        children: "Inputs:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 906,
                                        columnNumber: 17
                                    }, this),
                                    inputVariables.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6 text-body-small",
                                        children: Object.entries(inputValues).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-black-alpha-48",
                                                        children: [
                                                            key,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 911,
                                                        columnNumber: 25
                                                    }, this),
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-accent-black",
                                                        children: JSON.stringify(value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 912,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, key, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 910,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 908,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-medium text-accent-black",
                                        children: inputValues.input
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 917,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                lineNumber: 905,
                                columnNumber: 15
                            }, this),
                            isRunning && Object.keys(nodeResults).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-32",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-48 h-48 mx-auto mb-16 bg-black-alpha-4 border border-border-faint rounded-full flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-24 h-24 text-black-alpha-48 animate-spin",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 926,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 925,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 924,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-body-medium text-black-alpha-48",
                                        children: "Starting workflow..."
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 929,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                lineNumber: 923,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-16",
                                children: [
                                    Object.entries(nodeResults).map(([nodeId, result])=>{
                                        const node = workflow?.nodes.find((n)=>n.id === nodeId);
                                        const nodeData = node?.data;
                                        const nodeName = nodeData?.nodeName || nodeData?.label || 'Node';
                                        const nodeType = nodeData?.nodeType || node?.type || 'agent';
                                        const NodeIcon = getNodeIcon(nodeType);
                                        const nodeColor = getNodeColor(nodeType);
                                        const isActive = currentNodeId === nodeId && result.status === 'running';
                                        const statusLabel = result.status === 'pending-authorization' ? 'Awaiting authorization' : result.status;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 10
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            className: `rounded-12 p-16 border transition-all ${isActive ? 'border-border-faint bg-accent-white shadow-sm' : result.status === 'completed' ? 'border-heat-100 bg-accent-white' : result.status === 'failed' ? 'border-border-faint bg-accent-white' : 'border-border-faint bg-accent-white'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-12",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-8",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-20 h-20 rounded-3 ${nodeColor} flex items-center justify-center flex-shrink-0`,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NodeIcon, {
                                                                        className: "w-12 h-12 text-white",
                                                                        strokeWidth: 2.5
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 962,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 961,
                                                                    columnNumber: 29
                                                                }, this),
                                                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-16 h-16 bg-black-alpha-4 border border-border-faint rounded-full flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: "w-10 h-10 text-black-alpha-48 animate-spin",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 969,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 968,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 967,
                                                                    columnNumber: 31
                                                                }, this),
                                                                result.status === 'completed' && !isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-16 h-16 bg-black-alpha-12 rounded-full flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: "w-10 h-10 text-black-alpha-64",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M5 13l4 4L19 7"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 976,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 975,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 974,
                                                                    columnNumber: 31
                                                                }, this),
                                                                result.status === 'failed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-16 h-16 bg-black-alpha-40 rounded-full flex items-center justify-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: "w-10 h-10 text-white",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M6 18L18 6M6 6l12 12"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 983,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 982,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 981,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-label-medium font-medium text-accent-black",
                                                                    children: typeof nodeName === 'string' ? nodeName : 'Node'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 987,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 959,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-8",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        const newExpanded = new Set(expandedSchemas);
                                                                        if (newExpanded.has(nodeId)) {
                                                                            newExpanded.delete(nodeId);
                                                                        } else {
                                                                            newExpanded.add(nodeId);
                                                                        }
                                                                        setExpandedSchemas(newExpanded);
                                                                    },
                                                                    className: "px-8 py-4 bg-background-base hover:bg-black-alpha-4 border border-border-faint rounded-6 text-body-small text-accent-black transition-colors flex items-center gap-4",
                                                                    title: "View data flow schema",
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
                                                                                d: "M4 6h16M4 12h16m-7 6h7"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1007,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1006,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        "Schema"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 993,
                                                                    columnNumber: 29
                                                                }, this),
                                                                result.status !== 'completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `text-body-small px-8 py-4 rounded-6 border ${result.status === 'running' ? 'bg-accent-white text-black-alpha-64 border-border-faint' : result.status === 'failed' ? 'bg-accent-white text-accent-black border-border-faint' : 'bg-accent-white text-gray-600 border-gray-200'}`,
                                                                    children: statusLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1012,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 991,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 958,
                                                    columnNumber: 25
                                                }, this),
                                                expandedSchemas.has(nodeId) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        height: 0
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        height: 'auto'
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        height: 0
                                                    },
                                                    className: "mt-12 p-12 bg-accent-white rounded-8 border border-border-faint",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-8",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "text-label-small text-accent-black font-medium",
                                                                    children: "Data Flow Schema"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1031,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>{
                                                                        const schema = {
                                                                            nodeId,
                                                                            nodeName,
                                                                            nodeType,
                                                                            incomingConnections: (workflow?.edges.filter((e)=>e.target === nodeId) || []).map((edge)=>{
                                                                                const sourceNode = workflow?.nodes.find((n)=>n.id === edge.source);
                                                                                return {
                                                                                    from: sourceNode?.data?.nodeName || edge.source,
                                                                                    label: edge.label,
                                                                                    data: nodeResults[edge.source]?.output
                                                                                };
                                                                            }),
                                                                            output: result.output,
                                                                            toolCalls: result.toolCalls || [],
                                                                            outgoingConnections: (workflow?.edges.filter((e)=>e.source === nodeId) || []).map((edge)=>{
                                                                                const targetNode = workflow?.nodes.find((n)=>n.id === edge.target);
                                                                                return {
                                                                                    to: targetNode?.data?.nodeName || edge.target,
                                                                                    label: edge.label
                                                                                };
                                                                            }),
                                                                            arguments: node?.data?.arguments
                                                                        };
                                                                        navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
                                                                    },
                                                                    className: "text-body-small text-black-alpha-64 hover:text-accent-black transition-colors flex items-center gap-4",
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
                                                                                d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1062,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1061,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        "Copy Schema"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1032,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1030,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-12",
                                                            children: [
                                                                (()=>{
                                                                    const incomingEdges = workflow?.edges.filter((e)=>e.target === nodeId) || [];
                                                                    if (incomingEdges.length > 0) {
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-body-small text-black-alpha-48 mb-6 font-medium",
                                                                                    children: "Incoming Data:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1074,
                                                                                    columnNumber: 39
                                                                                }, this),
                                                                                incomingEdges.map((edge)=>{
                                                                                    const sourceNode = workflow?.nodes.find((n)=>n.id === edge.source);
                                                                                    const sourceName = sourceNode?.data?.nodeName || edge.source;
                                                                                    const sourceOutput = nodeResults[edge.source]?.output;
                                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "mb-8 last:mb-0",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex items-center gap-4 mb-4",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-body-small text-black-alpha-64",
                                                                                                        children: [
                                                                                                            "← ",
                                                                                                            sourceName
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                        lineNumber: 1082,
                                                                                                        columnNumber: 47
                                                                                                    }, this),
                                                                                                    edge.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "text-body-small text-black-alpha-48 bg-background-base px-6 py-2 rounded-4",
                                                                                                        children: edge.label
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                        lineNumber: 1084,
                                                                                                        columnNumber: 49
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                lineNumber: 1081,
                                                                                                columnNumber: 45
                                                                                            }, this),
                                                                                            sourceOutput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "bg-background-base rounded-6 p-8 border border-border-faint ml-16",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                                                    className: "text-[10px] text-accent-black font-mono whitespace-pre-wrap overflow-auto max-h-100",
                                                                                                    children: typeof sourceOutput === 'string' ? sourceOutput : JSON.stringify(sourceOutput, null, 2)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1091,
                                                                                                    columnNumber: 49
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                lineNumber: 1090,
                                                                                                columnNumber: 47
                                                                                            }, this)
                                                                                        ]
                                                                                    }, edge.id, true, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 1080,
                                                                                        columnNumber: 43
                                                                                    }, this);
                                                                                })
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1073,
                                                                            columnNumber: 37
                                                                        }, this);
                                                                    }
                                                                })(),
                                                                node?.data?.arguments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-body-small text-black-alpha-48 mb-6 font-medium",
                                                                            children: "Node Arguments:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1107,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "bg-background-base rounded-6 p-8 border border-border-faint",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                                className: "text-[10px] text-accent-black font-mono whitespace-pre-wrap",
                                                                                children: JSON.stringify(node?.data?.arguments, null, 2)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1109,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1108,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1106,
                                                                    columnNumber: 33
                                                                }, this),
                                                                result.output && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-body-small text-black-alpha-48 mb-6 font-medium",
                                                                            children: "Output Data:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1119,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "bg-background-base rounded-6 p-8 border border-border-faint",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                                className: "text-[10px] text-accent-black font-mono whitespace-pre-wrap overflow-auto max-h-150",
                                                                                children: typeof result.output === 'string' ? result.output : JSON.stringify(result.output, null, 2)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1121,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1120,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1118,
                                                                    columnNumber: 33
                                                                }, this),
                                                                result.toolCalls && result.toolCalls.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-8 mb-8",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-20 h-20 rounded-4 bg-[#FFEFA4] dark:bg-[#FFDD40] flex items-center justify-center flex-shrink-0",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__["Plug"], {
                                                                                        className: "w-12 h-12 text-white",
                                                                                        strokeWidth: 2.5
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 1133,
                                                                                        columnNumber: 39
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1132,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-label-medium font-medium text-accent-black",
                                                                                    children: "MCP Tool Calls:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1135,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1131,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-8",
                                                                            children: result.toolCalls.map((call, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "bg-background-base rounded-6 p-8 border border-border-faint",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex items-center justify-between mb-6",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-body-small font-medium text-accent-black",
                                                                                                    children: call.name || `Tool ${index + 1}`
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1141,
                                                                                                    columnNumber: 43
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-xs text-black-alpha-32",
                                                                                                    children: [
                                                                                                        "#",
                                                                                                        index + 1
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1144,
                                                                                                    columnNumber: 43
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                            lineNumber: 1140,
                                                                                            columnNumber: 41
                                                                                        }, this),
                                                                                        call.arguments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "mb-6",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-[10px] text-black-alpha-48 mb-2 uppercase tracking-wide",
                                                                                                    children: "Arguments"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1148,
                                                                                                    columnNumber: 45
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                                                    className: "text-[10px] text-accent-black font-mono whitespace-pre-wrap bg-accent-white border border-border-faint rounded-4 p-6 overflow-auto max-h-120",
                                                                                                    children: typeof call.arguments === 'string' ? call.arguments : JSON.stringify(call.arguments, null, 2)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1149,
                                                                                                    columnNumber: 45
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                            lineNumber: 1147,
                                                                                            columnNumber: 43
                                                                                        }, this),
                                                                                        call.output && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-[10px] text-black-alpha-48 mb-2 uppercase tracking-wide",
                                                                                                    children: "Output"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1158,
                                                                                                    columnNumber: 45
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                                                    className: "text-[10px] text-accent-black font-mono whitespace-pre-wrap bg-accent-white border border-border-faint rounded-4 p-6 overflow-auto max-h-150",
                                                                                                    children: typeof call.output === 'string' ? call.output : JSON.stringify(call.output, null, 2)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1159,
                                                                                                    columnNumber: 45
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                            lineNumber: 1157,
                                                                                            columnNumber: 43
                                                                                        }, this)
                                                                                    ]
                                                                                }, index, true, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1139,
                                                                                    columnNumber: 39
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1137,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1130,
                                                                    columnNumber: 33
                                                                }, this),
                                                                (()=>{
                                                                    const outgoingEdges = workflow?.edges.filter((e)=>e.source === nodeId) || [];
                                                                    if (outgoingEdges.length > 0) {
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-body-small text-black-alpha-48 mb-6 font-medium",
                                                                                    children: "Sent To:"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1178,
                                                                                    columnNumber: 39
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "space-y-4",
                                                                                    children: outgoingEdges.map((edge)=>{
                                                                                        const targetNode = workflow?.nodes.find((n)=>n.id === edge.target);
                                                                                        const targetName = targetNode?.data?.nodeName || edge.target;
                                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex items-center gap-4",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-body-small text-black-alpha-64",
                                                                                                    children: [
                                                                                                        "→ ",
                                                                                                        targetName
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1185,
                                                                                                    columnNumber: 47
                                                                                                }, this),
                                                                                                edge.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-body-small text-black-alpha-48 bg-background-base px-6 py-2 rounded-4",
                                                                                                    children: edge.label
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1187,
                                                                                                    columnNumber: 49
                                                                                                }, this)
                                                                                            ]
                                                                                        }, edge.id, true, {
                                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                            lineNumber: 1184,
                                                                                            columnNumber: 45
                                                                                        }, this);
                                                                                    })
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1179,
                                                                                    columnNumber: 39
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1177,
                                                                            columnNumber: 37
                                                                        }, this);
                                                                    }
                                                                })()
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1067,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 1024,
                                                    columnNumber: 27
                                                }, this),
                                                result.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-12",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-6",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-body-small text-accent-black font-medium",
                                                                    children: "Error:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1207,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleCopyError(result.error, nodeId),
                                                                    className: "text-body-small text-accent-black hover:text-accent-black transition-colors flex items-center gap-4 px-8 py-4 rounded-6 hover:bg-black-alpha-4",
                                                                    children: copiedError === nodeId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
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
                                                                                    d: "M5 13l4 4L19 7"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1215,
                                                                                    columnNumber: 39
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1214,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            "Copied"
                                                                        ]
                                                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
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
                                                                                    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1222,
                                                                                    columnNumber: 39
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1221,
                                                                                columnNumber: 37
                                                                            }, this),
                                                                            "Copy"
                                                                        ]
                                                                    }, void 0, true)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1208,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1206,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-black-alpha-4 rounded-8 p-12 border border-border-faint",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                className: "text-body-small text-accent-black whitespace-pre-wrap overflow-auto max-h-200 font-mono",
                                                                children: result.error
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 1230,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1229,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 1205,
                                                    columnNumber: 27
                                                }, this),
                                                result.pendingAuth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-12 p-12 bg-heat-4 border border-heat-100 rounded-8",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-body-small font-medium text-accent-black",
                                                            children: [
                                                                "Authorization required for ",
                                                                result.pendingAuth.toolName
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1239,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-body-small text-black-alpha-64 mt-4",
                                                            children: result.pendingAuth.message || 'Complete authorization to allow the workflow to continue from this node.'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1242,
                                                            columnNumber: 29
                                                        }, this),
                                                        result.pendingAuth.authUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: result.pendingAuth.authUrl,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-flex items-center gap-6 mt-10 px-12 py-6 bg-accent-black hover:bg-black-alpha-88 text-white rounded-6 text-body-small font-medium transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-14 h-14",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 1253,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1252,
                                                                    columnNumber: 33
                                                                }, this),
                                                                "Open authorization"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1246,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 1238,
                                                    columnNumber: 27
                                                }, this),
                                                result.output && !result.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-12",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-body-small text-black-alpha-48 mb-6",
                                                            children: "Output:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1264,
                                                            columnNumber: 29
                                                        }, this),
                                                        (()=>{
                                                            const output = result.output;
                                                            const outputStr = typeof output === 'string' ? output : JSON.stringify(output, null, 2);
                                                            const outputObj = typeof output === 'object' ? output : null;
                                                            // Check if this is a Google Docs creation result
                                                            const isGoogleDocResult = outputObj?.result?.output?.value?.documentUrl || outputStr.includes('documentUrl') || outputStr.includes('Executive Summary');
                                                            if (isGoogleDocResult) {
                                                                let docUrl = null;
                                                                let docTitle = null;
                                                                // Extract document URL and title from the result
                                                                if (outputObj?.result?.output?.value?.documentUrl) {
                                                                    docUrl = outputObj.result.output.value.documentUrl;
                                                                    docTitle = outputObj.result.output.value.title || 'Executive Summary';
                                                                } else if (outputStr.includes('documentUrl')) {
                                                                    try {
                                                                        const parsed = JSON.parse(outputStr);
                                                                        docUrl = parsed.result?.output?.value?.documentUrl || parsed.documentUrl;
                                                                        docTitle = parsed.result?.output?.value?.title || parsed.documentTitle || 'Executive Summary';
                                                                    } catch (e) {
                                                                        // Fallback: try to extract URL from string
                                                                        const urlMatch = outputStr.match(/https:\/\/docs\.google\.com\/document\/d\/[^\/\s]+/);
                                                                        if (urlMatch) {
                                                                            docUrl = urlMatch[0];
                                                                            docTitle = 'Executive Summary';
                                                                        }
                                                                    }
                                                                }
                                                                if (docUrl) {
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-12",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "bg-background-base border border-border-faint rounded-8 p-12",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-8 mb-8",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "w-16 h-16 bg-accent-black rounded-full flex items-center justify-center",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                                    className: "w-10 h-10 text-accent-white",
                                                                                                    fill: "none",
                                                                                                    stroke: "currentColor",
                                                                                                    viewBox: "0 0 24 24",
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                        strokeLinecap: "round",
                                                                                                        strokeLinejoin: "round",
                                                                                                        strokeWidth: 2,
                                                                                                        d: "M5 13l4 4L19 7"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                        lineNumber: 1308,
                                                                                                        columnNumber: 47
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1307,
                                                                                                    columnNumber: 45
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                lineNumber: 1306,
                                                                                                columnNumber: 43
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-body-small font-medium text-accent-black",
                                                                                                children: "Document Updated"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                lineNumber: 1311,
                                                                                                columnNumber: 43
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 1305,
                                                                                        columnNumber: 41
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-body-small text-black-alpha-48 mb-12",
                                                                                        children: "Your executive summary has been created in Google Docs."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 1315,
                                                                                        columnNumber: 41
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                        href: docUrl,
                                                                                        target: "_blank",
                                                                                        rel: "noopener noreferrer",
                                                                                        className: "inline-flex items-center gap-8 px-16 py-10 bg-accent-black hover:bg-black-alpha-88 text-accent-white rounded-8 text-body-small font-medium transition-colors",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                                className: "w-14 h-14",
                                                                                                fill: "none",
                                                                                                stroke: "currentColor",
                                                                                                viewBox: "0 0 24 24",
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                    strokeLinecap: "round",
                                                                                                    strokeLinejoin: "round",
                                                                                                    strokeWidth: 2,
                                                                                                    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1327,
                                                                                                    columnNumber: 45
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                lineNumber: 1326,
                                                                                                columnNumber: 43
                                                                                            }, this),
                                                                                            "Open ",
                                                                                            docTitle
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 1320,
                                                                                        columnNumber: 41
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1304,
                                                                                columnNumber: 39
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                                                                className: "group",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                                                                        className: "cursor-pointer text-body-small text-black-alpha-48 hover:text-accent-black transition-colors flex items-center gap-4",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                children: "View Raw Output"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                lineNumber: 1336,
                                                                                                columnNumber: 43
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
                                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                    lineNumber: 1338,
                                                                                                    columnNumber: 45
                                                                                                }, this)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                                lineNumber: 1337,
                                                                                                columnNumber: 43
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 1335,
                                                                                        columnNumber: 41
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "mt-8 bg-background-base rounded-8 p-12 border border-border-faint",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                                            className: "text-[11px] leading-relaxed text-accent-black whitespace-pre-wrap overflow-auto max-h-200 font-mono",
                                                                                            children: outputStr
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                            lineNumber: 1342,
                                                                                            columnNumber: 43
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                        lineNumber: 1341,
                                                                                        columnNumber: 41
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1334,
                                                                                columnNumber: 39
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 1302,
                                                                        columnNumber: 37
                                                                    }, this);
                                                                }
                                                            }
                                                            // Default output display
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-background-base rounded-8 p-12 border border-border-faint",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                    className: "text-[11px] leading-relaxed text-accent-black whitespace-pre-wrap overflow-auto max-h-200 font-mono",
                                                                    children: outputStr
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1355,
                                                                    columnNumber: 35
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 1354,
                                                                columnNumber: 33
                                                            }, this);
                                                        })()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 1263,
                                                    columnNumber: 27
                                                }, this),
                                                result.toolCalls && result.toolCalls.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-12",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-8 mb-8",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-20 h-20 rounded-4 bg-[#FFEFA4] dark:bg-[#FFDD40] flex items-center justify-center flex-shrink-0",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__["Plug"], {
                                                                        className: "w-12 h-12 text-white",
                                                                        strokeWidth: 2.5
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 1368,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1367,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-label-medium font-medium text-accent-black",
                                                                    children: "MCP Tool Calls:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1370,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1366,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-8",
                                                            children: result.toolCalls.map((call, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-background-base rounded-8 p-12 border border-border-faint",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center justify-between mb-8",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-body-small font-medium text-accent-black",
                                                                                    children: call.name || `Tool ${index + 1}`
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1376,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-body-small text-black-alpha-32",
                                                                                    children: [
                                                                                        "#",
                                                                                        index + 1
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1379,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1375,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        call.arguments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mb-8",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-[11px] text-black-alpha-48 mb-2 uppercase tracking-wide",
                                                                                    children: "Arguments"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1383,
                                                                                    columnNumber: 39
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                                    className: "text-[10px] text-accent-black font-mono whitespace-pre-wrap bg-accent-white border border-border-faint rounded-6 p-8 overflow-auto max-h-120",
                                                                                    children: typeof call.arguments === 'string' ? call.arguments : JSON.stringify(call.arguments, null, 2)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1384,
                                                                                    columnNumber: 39
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1382,
                                                                            columnNumber: 37
                                                                        }, this),
                                                                        call.output && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-[11px] text-black-alpha-48 mb-2 uppercase tracking-wide",
                                                                                    children: "Output"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1393,
                                                                                    columnNumber: 39
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                                                    className: "text-[10px] text-accent-black font-mono whitespace-pre-wrap bg-accent-white border border-border-faint rounded-6 p-8 overflow-auto max-h-150",
                                                                                    children: typeof call.output === 'string' ? call.output : JSON.stringify(call.output, null, 2)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                    lineNumber: 1394,
                                                                                    columnNumber: 39
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1392,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    ]
                                                                }, index, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1374,
                                                                    columnNumber: 33
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1372,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 1365,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-12 mt-12",
                                                    children: [
                                                        result.startedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-8 text-body-small text-black-alpha-48",
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
                                                                        d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                        lineNumber: 1411,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1410,
                                                                    columnNumber: 31
                                                                }, this),
                                                                result.completedAt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        Math.round((new Date(result.completedAt).getTime() - new Date(result.startedAt).getTime()) / 1000),
                                                                        "s"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1414,
                                                                    columnNumber: 33
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "animate-pulse",
                                                                    children: "Running..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1418,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1409,
                                                            columnNumber: 29
                                                        }, this),
                                                        result.usage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-8 text-body-small text-black-alpha-48 border-l border-border-faint pl-12",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    title: "Input Tokens",
                                                                    children: [
                                                                        "In: ",
                                                                        result.usage.input_tokens
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1426,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    title: "Output Tokens",
                                                                    children: [
                                                                        "Out: ",
                                                                        result.usage.output_tokens
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1427,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    title: "Total Tokens",
                                                                    className: "font-medium text-accent-black",
                                                                    children: [
                                                                        "Token Usage: ",
                                                                        result.usage.total_tokens
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                    lineNumber: 1428,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1425,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                    lineNumber: 1407,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, nodeId, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                            lineNumber: 944,
                                            columnNumber: 23
                                        }, this);
                                    }),
                                    execution?.status === 'failed' && execution?.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            scale: 0.95
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        className: "mt-24 p-20 bg-black-alpha-4 rounded-12 border border-border-faint",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-12 mb-12",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-32 h-32 bg-black-alpha-40 rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-18 h-18 text-white",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M6 18L18 6M6 6l12 12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 1446,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1445,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 1444,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-label-large text-accent-black font-medium",
                                                        children: "Workflow Failed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 1449,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 1443,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-12",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-body-small text-accent-black font-medium",
                                                                children: "Error Details:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 1453,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleCopyError(execution.error, 'workflow'),
                                                                className: "text-body-small text-accent-black hover:text-accent-black transition-colors flex items-center gap-4 px-8 py-4 rounded-6 hover:bg-black-alpha-8",
                                                                children: copiedError === 'workflow' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
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
                                                                                d: "M5 13l4 4L19 7"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1461,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1460,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        "Copied"
                                                                    ]
                                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
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
                                                                                d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                                lineNumber: 1468,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                            lineNumber: 1467,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        "Copy Error"
                                                                    ]
                                                                }, void 0, true)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 1454,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 1452,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-black-alpha-8 rounded-8 p-12 border border-border-faint",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                            className: "text-body-small text-accent-black whitespace-pre-wrap overflow-auto max-h-200 font-mono",
                                                            children: execution.error
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1476,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 1475,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 1451,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleReset,
                                                className: "mt-8 w-full px-16 py-10 bg-accent-black hover:bg-black-alpha-80 text-white rounded-8 text-body-small font-medium transition-colors",
                                                children: "Try Again"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 1481,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 1438,
                                        columnNumber: 21
                                    }, this),
                                    execution?.status === 'completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            scale: 0.95
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        className: "mt-24 p-20 bg-accent-white rounded-12 border border-border-faint",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-12 mb-12",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-32 h-32 bg-black-alpha-12 rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-18 h-18 text-black-alpha-64",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M5 13l4 4L19 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                                lineNumber: 1500,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                            lineNumber: 1499,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 1498,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-label-large text-accent-black font-medium",
                                                        children: "Workflow Completed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                        lineNumber: 1503,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 1497,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-body-small text-black-alpha-64",
                                                children: "All nodes executed successfully"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 1505,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleReset,
                                                className: "mt-16 w-full px-16 py-10 bg-accent-black hover:bg-black-alpha-80 text-white rounded-8 text-body-small font-medium transition-colors",
                                                children: "Run Again"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                                lineNumber: 1508,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                        lineNumber: 1492,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                                lineNumber: 932,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                        lineNumber: 903,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
                    lineNumber: 708,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
            lineNumber: 450,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx",
        lineNumber: 449,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_app_%28home%29_sections_workflow-builder_ExecutionPanel_tsx_c32a1325._.js.map