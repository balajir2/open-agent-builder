module.exports = [
"[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkflowBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ErrorBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/ErrorBoundary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@xyflow/react/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@xyflow/system/dist/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-ssr] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/repeat.js [app-ssr] (ecmascript) <export default as Repeat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/braces.js [app-ssr] (ecmascript) <export default as Braces>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plug.js [app-ssr] (ecmascript) <export default as Plug>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-stop.js [app-ssr] (ecmascript) <export default as StopCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-ssr] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/server.js [app-ssr] (ecmascript) <export default as Server>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-ssr] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$NodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/NodePanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$MCPPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/MCPPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$PreviewPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/PreviewPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$ExecutionPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/ExecutionPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$TestEndpointPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/TestEndpointPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$LogicNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/LogicNodePanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$DataNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/DataNodePanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$HTTPNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/HTTPNodePanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$ExtractNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/ExtractNodePanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$StartNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/StartNodePanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$WorkflowNameEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/WorkflowNameEditor.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$SettingsPanelSimple$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/SettingsPanelSimple.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$ConfirmDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/ConfirmDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$EdgeLabelModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/EdgeLabelModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$ShareWorkflowModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/ShareWorkflowModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$SaveAsTemplateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/SaveAsTemplateModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useWorkflow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useWorkflow.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useWorkflowExecution$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useWorkflowExecution.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$CustomNodes$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/app/(home)/sections/workflow-builder/CustomNodes.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$duplicate$2d$detection$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/workflow/duplicate-detection.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$edge$2d$cleanup$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/workflow/edge-cleanup.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/react/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/convex/dist/esm/react/client.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/convex/_generated/api.js [app-ssr] (ecmascript)");
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
let nodeId = 2;
const getId = ()=>`node_${nodeId++}`;
// Helper function to reset node ID counter based on existing nodes
const resetNodeIdCounter = (nodes)=>{
    const maxId = nodes.reduce((max, node)=>{
        const match = node.id.match(/^node_(\d+)$/);
        if (match) {
            const id = parseInt(match[1], 10);
            return Math.max(max, id);
        }
        return max;
    }, 1);
    nodeId = maxId + 1;
    console.log('🔢 Reset node ID counter to:', nodeId);
};
const initialNodes = [
    {
        id: 'node_0',
        type: 'start',
        position: {
            x: 250,
            y: 250
        },
        data: {
            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-32 h-32 rounded-8 bg-gray-600 flex items-center justify-center flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                            className: "w-18 h-18 text-white",
                            strokeWidth: 2
                        }, void 0, false, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-[#18181b]",
                        children: "Start"
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            nodeType: 'start',
            nodeName: 'Start'
        }
    }
];
const initialEdges = [];
const nodeCategories = [
    {
        category: "Core",
        nodes: [
            {
                type: "agent",
                label: "Agent",
                color: "bg-blue-500",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"]
            },
            {
                type: "end",
                label: "End",
                color: "bg-teal-500",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$stop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__StopCircle$3e$__["StopCircle"]
            },
            {
                type: "note",
                label: "Note",
                color: "bg-[#E4E4E7] dark:bg-[#52525B]",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
            }
        ]
    },
    {
        category: "Tools",
        nodes: [
            {
                type: "mcp",
                label: "MCP",
                color: "bg-[#FFEFA4] dark:bg-[#FFDD40]",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__["Plug"]
            }
        ]
    },
    {
        category: "Logic",
        nodes: [
            {
                type: "if-else",
                label: "Condition",
                color: "bg-[#FEE7C2] dark:bg-[#FFAE2B]",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"]
            },
            {
                type: "while",
                label: "While",
                color: "bg-[#FEE7C2] dark:bg-[#FFAE2B]",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$repeat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Repeat$3e$__["Repeat"]
            },
            {
                type: "user-approval",
                label: "User approval",
                color: "bg-[#E5E7EB] dark:bg-[#9CA3AF]",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"]
            }
        ]
    },
    {
        category: "Data",
        nodes: [
            {
                type: "transform",
                label: "Transform",
                color: "bg-[#ECE3FF] dark:bg-[#9665FF]",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__["Braces"]
            },
            {
                type: "extract",
                label: "Extract",
                color: "bg-[#ECE3FF] dark:bg-[#9665FF]",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"]
            },
            {
                type: "http",
                label: "HTTP",
                color: "bg-[#ECE3FF] dark:bg-[#9665FF]",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"]
            },
            {
                type: "set-state",
                label: "Set state",
                color: "bg-[#ECE3FF] dark:bg-[#9665FF]",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__["Braces"]
            }
        ]
    }
];
// Auto-layout function to position nodes left to right
const autoLayoutNodes = (nodes, edges)=>{
    if (nodes.length === 0) return nodes;
    const LAYER_SPACING = 350; // Horizontal spacing between layers (left to right)
    const NODE_SPACING = 150; // Vertical spacing between nodes in same layer
    const START_X = 100;
    const START_Y = 100;
    // Build adjacency list from edges
    const adjacency = {};
    nodes.forEach((n)=>adjacency[n.id] = []);
    // Only add edges where both source and target nodes exist
    edges.forEach((e)=>{
        if (!adjacency[e.source]) adjacency[e.source] = [];
        // Verify target node exists before adding edge
        if (adjacency[e.target] !== undefined) {
            adjacency[e.source].push(e.target);
        }
    });
    // Calculate node layers using BFS
    const layers = {};
    const queue = [];
    // Find start node
    const startNode = nodes.find((n)=>n.data?.nodeType === 'start');
    if (startNode) {
        layers[startNode.id] = 0;
        queue.push(startNode.id);
    } else if (nodes.length > 0) {
        layers[nodes[0].id] = 0;
        queue.push(nodes[0].id);
    }
    // BFS to assign layers
    while(queue.length > 0){
        const nodeId = queue.shift();
        const currentLayer = layers[nodeId];
        // Safety check: ensure adjacency entry exists and is iterable
        const children = adjacency[nodeId];
        if (children && Array.isArray(children)) {
            for (const childId of children){
                if (!(childId in layers)) {
                    layers[childId] = currentLayer + 1;
                    queue.push(childId);
                }
            }
        }
    }
    // Assign unvisited nodes to appropriate layers
    for (const node of nodes){
        if (!(node.id in layers)) {
            layers[node.id] = Math.max(...Object.values(layers), -1) + 1;
        }
    }
    // Group nodes by layer and calculate positions
    const nodesByLayer = {};
    for (const node of nodes){
        const layer = layers[node.id];
        if (!nodesByLayer[layer]) nodesByLayer[layer] = [];
        nodesByLayer[layer].push(node);
    }
    // Position nodes left to right
    const layoutNodes = [];
    for(const layer in nodesByLayer){
        const layerNodes = nodesByLayer[layer];
        const nodesInLayer = layerNodes.length;
        const totalHeight = (nodesInLayer - 1) * NODE_SPACING;
        const startYForLayer = START_Y + (300 - totalHeight / 2); // Center vertically
        layerNodes.forEach((node, index)=>{
            layoutNodes.push({
                ...node,
                position: {
                    x: START_X + parseInt(layer) * LAYER_SPACING,
                    y: startYForLayer + index * NODE_SPACING
                }
            });
        });
    }
    return layoutNodes;
};
function WorkflowBuilderInner({ onBack, initialWorkflowId, initialTemplateId }) {
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useNodesState"])(initialNodes);
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useEdgesState"])(initialEdges);
    const [initialized, setInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTemplateId, setCurrentTemplateId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialTemplateId ?? null);
    // Convex queries and mutations for templates
    const template = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].workflows.getTemplateByCustomId, currentTemplateId ? {
        customId: currentTemplateId
    } : "skip");
    const updateTemplateStructure = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$convex$2f$dist$2f$esm$2f$react$2f$client$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])(__TURBOPACK__imported__module__$5b$project$5d2f$convex$2f$_generated$2f$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].workflows.updateTemplateStructure);
    // Function to seed templates via API
    const seedTemplates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const response = await fetch('/api/templates/seed', {
            method: 'POST'
        });
        const data = await response.json();
        return data;
    }, []);
    const [selectedNode, setSelectedNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPreview, setShowPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showExecution, setShowExecution] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTestEndpoint, setShowTestEndpoint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSettings, setShowSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showShareModal, setShowShareModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showComingSoonModal, setShowComingSoonModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSaveAsTemplateModal, setShowSaveAsTemplateModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmDialog, setConfirmDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        title: "",
        description: "",
        onConfirm: ()=>{}
    });
    const [contextMenu, setContextMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedEdgeId, setSelectedEdgeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingEdge, setEditingEdge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showMCPSelector, setShowMCPSelector] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [targetAgentForMCP, setTargetAgentForMCP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [duplicateWarnings, setDuplicateWarnings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showWorkflowMenu, setShowWorkflowMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const workflowMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [renameTrigger, setRenameTrigger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [environment, setEnvironment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('draft');
    const reactFlowWrapper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { screenToFlowPosition, getNode, setCenter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactFlow"])();
    // Workflow management
    const { workflow, convexId, updateNodes, updateEdges, saveWorkflow, saveWorkflowImmediate, deleteWorkflow, createNewWorkflow } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useWorkflow$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkflow"])(initialWorkflowId || undefined);
    // Helper functions defined early to avoid hoisting issues
    const getNodeColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((type)=>{
        const colorMap = {
            'agent': 'bg-blue-500',
            'mcp': 'bg-[#FFEFA4] dark:bg-[#FFDD40]',
            'firecrawl': 'bg-heat-100',
            'if-else': 'bg-[#FEE7C2] dark:bg-[#FFAE2B]',
            'while': 'bg-[#FEE7C2] dark:bg-[#FFAE2B]',
            'user-approval': 'bg-[#E5E7EB] dark:bg-[#9CA3AF]',
            'transform': 'bg-[#ECE3FF] dark:bg-[#9665FF]',
            'set-state': 'bg-[#ECE3FF] dark:bg-[#9665FF]',
            'file-search': 'bg-indigo-500',
            'extract': 'bg-purple-500',
            'note': 'bg-[#E4E4E7] dark:bg-[#52525B]',
            'end': 'bg-teal-500',
            'start': 'bg-gray-600'
        };
        return colorMap[type] || 'bg-gray-500';
    }, []);
    const createNodeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((label, color, nodeType)=>{
        // Get icon for this node type
        const nodeCategory = nodeCategories.find((cat)=>cat.nodes.some((n)=>n.type === nodeType || n.label === label));
        const nodeConfig = nodeCategory?.nodes.find((n)=>n.type === nodeType || n.label === label);
        const IconComponent = nodeConfig?.icon;
        // Determine text color based on node type
        const getTextColor = ()=>{
            if (nodeType === 'note') return 'text-white'; // White text for note nodes (yellow background)
            if (nodeType === 'if-else' || nodeType === 'while' || nodeType === 'user-approval') {
                return 'text-[#18181b]'; // Dark text for orange background nodes
            }
            return 'text-[#18181b]'; // Default dark text
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-32 h-32 rounded-8 ${color} flex items-center justify-center flex-shrink-0`,
                    children: IconComponent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                        className: "w-18 h-18 text-white",
                        strokeWidth: 2
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 335,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 bg-white rounded-2"
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 337,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                    lineNumber: 333,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `text-sm font-medium ${getTextColor()}`,
                    children: label
                }, void 0, false, {
                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                    lineNumber: 340,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
            lineNumber: 332,
            columnNumber: 7
        }, this);
    }, []);
    // AUTO-SAVE DISABLED - Use manual Save button instead
    // Smart auto-save: only save when nodes/edges actually change, with debounce
    // const lastSavedNodesRef = useRef<string>('');
    // const lastSavedEdgesRef = useRef<string>('');
    // const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    // useEffect(() => {
    //   if (!initialized || !workflow) return;
    //   const nodesJson = JSON.stringify(nodes);
    //   const edgesJson = JSON.stringify(edges);
    //   // Only save if something actually changed
    //   if (nodesJson === lastSavedNodesRef.current && edgesJson === lastSavedEdgesRef.current) {
    //     return;
    //   }
    //   // Clear previous timeout
    //   if (autoSaveTimeoutRef.current) {
    //     clearTimeout(autoSaveTimeoutRef.current);
    //   }
    //   // Debounced save
    //   autoSaveTimeoutRef.current = setTimeout(async () => {
    //     console.log('🔄 [AUTO-SYNC] Saving changes to Convex...', {
    //       nodeCount: nodes.length,
    //       edgeCount: edges.length,
    //       isTemplate: workflow.isTemplate,
    //       templateId: currentTemplateId,
    //     });
    //     // Update refs BEFORE saving to prevent loops
    //     lastSavedNodesRef.current = nodesJson;
    //     lastSavedEdgesRef.current = edgesJson;
    //     // If this is a template-based workflow, also save to the template
    //     if (workflow.isTemplate && currentTemplateId) {
    //       try {
    //         await updateTemplateStructure({
    //           customId: currentTemplateId,
    //           nodes: nodes.map(n => ({
    //             ...n,
    //             data: {
    //               ...n.data,
    //               nodeType: n.data?.nodeType || n.type,
    //             }
    //           })),
    //           edges,
    //         });
    //         console.log('✅ Template structure updated in Convex');
    //       } catch (error) {
    //         console.error('Failed to update template structure:', error);
    //       }
    //     }
    //     // Save to workflow (regular save)
    //     saveWorkflow({ nodes, edges });
    //   }, 1500); // 1.5 second debounce
    //   return () => {
    //     if (autoSaveTimeoutRef.current) {
    //       clearTimeout(autoSaveTimeoutRef.current);
    //     }
    //   };
    // }, [nodes, edges, initialized, currentTemplateId, updateTemplateStructure]); // Don't include workflow or saveWorkflow to prevent loops
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (workflowMenuRef.current && !workflowMenuRef.current.contains(event.target)) {
                setShowWorkflowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setEnvironment('draft');
        setShowTestEndpoint(false); // Close API panel when switching workflows
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        workflow?.id
    ]);
    const handleDuplicateWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!workflow) return;
        const original = workflow;
        const newWorkflow = createNewWorkflow();
        setShowWorkflowMenu(false);
        // Allow state to update before saving copied structure
        setTimeout(()=>{
            saveWorkflow({
                name: `${original.name || 'Workflow'} Copy`,
                description: original.description,
                nodes: original.nodes,
                edges: original.edges
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Workflow duplicated');
        }, 0);
    }, [
        workflow,
        createNewWorkflow,
        saveWorkflow,
        setShowWorkflowMenu
    ]);
    const handleRenameWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setRenameTrigger((prev)=>prev + 1);
        setShowWorkflowMenu(false);
    }, [
        setRenameTrigger,
        setShowWorkflowMenu
    ]);
    const handleSaveWorkflowImmediate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!workflow) {
            console.error('❌ Cannot save: no workflow exists');
            return;
        }
        console.log('💾 [MANUAL SAVE] Saving workflow with', nodes.length, 'nodes and', edges.length, 'edges');
        const updatedWorkflow = {
            ...workflow,
            nodes: nodes.map((n)=>({
                    ...n,
                    type: n.type || 'default',
                    data: {
                        ...n.data,
                        label: typeof n.data.label === 'string' ? n.data.label : 'Node',
                        nodeType: n.data.nodeType || n.type
                    }
                })),
            edges: edges
        };
        saveWorkflow(updatedWorkflow);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Workflow saved', {
            description: `Saved ${nodes.length} nodes to Convex`
        });
        setShowShareModal(true);
        setShowWorkflowMenu(false);
    }, [
        workflow,
        nodes,
        edges,
        saveWorkflow,
        setShowShareModal,
        setShowWorkflowMenu
    ]);
    const handleClearCanvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setConfirmDialog({
            isOpen: true,
            title: 'Clear Canvas',
            description: 'This will remove all nodes and reset to the default workflow. This action cannot be undone.',
            variant: 'warning',
            onConfirm: ()=>{
                setNodes(initialNodes);
                setEdges(initialEdges);
                setSelectedNode(null);
                // Reset node ID counter to initial state
                resetNodeIdCounter(initialNodes);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Canvas cleared', {
                    description: 'Workflow reset to default'
                });
            }
        });
        setShowWorkflowMenu(false);
    }, [
        setConfirmDialog,
        setNodes,
        setEdges,
        setSelectedNode,
        setShowWorkflowMenu
    ]);
    const confirmDeleteWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!workflow) return;
        setConfirmDialog({
            isOpen: true,
            title: 'Delete Workflow',
            description: 'This will permanently delete the current workflow. This action cannot be undone.',
            variant: 'danger',
            onConfirm: ()=>{
                deleteWorkflow(workflow.id);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Workflow deleted');
            }
        });
        setShowWorkflowMenu(false);
    }, [
        workflow,
        deleteWorkflow,
        setConfirmDialog,
        setShowWorkflowMenu
    ]);
    const { runWorkflow, stopWorkflow, isRunning, nodeResults, execution, currentNodeId, pendingAuth, resumeWorkflow } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useWorkflowExecution$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWorkflowExecution"])();
    // Track what we've already loaded to prevent re-processing
    const loadedTemplateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const loadedWorkflowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Load template or workflow on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialized) return;
        if (initialTemplateId) {
            // Skip if we've already processed this template
            if (loadedTemplateRef.current === initialTemplateId) {
                return;
            }
            // Check if template is loading from Convex
            if (template === undefined) {
                // Still loading from Convex
                return;
            }
            // If template is null, it doesn't exist in Convex yet - seed templates
            if (template === null) {
                console.log('Template not found in Convex, seeding templates...');
                seedTemplates().then(()=>{
                    console.log('Templates seeded successfully');
                // The component will re-render when the template query updates
                }).catch((err)=>{
                    console.error('Failed to seed templates:', err);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to load template');
                });
                return;
            }
            if (template) {
                console.log('Loading template from Convex:', template);
                // Mark this template as loaded to prevent re-processing
                loadedTemplateRef.current = initialTemplateId;
                // Clean up any invalid edges in the template
                const cleaned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$edge$2d$cleanup$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanupInvalidEdges"])(template.nodes, template.edges);
                const cleanedNodes = cleaned.nodes;
                const cleanedEdges = cleaned.edges;
                if (cleaned.removedCount > 0) {
                    console.warn(`🧹 Removed ${cleaned.removedCount} invalid edge(s) from template`);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning(`Template had ${cleaned.removedCount} invalid connection(s)`, {
                        description: 'These have been automatically removed'
                    });
                }
                // Convert template nodes to React Flow format
                const templateNodes = cleanedNodes.map((n)=>{
                    const nodeData = n.data;
                    return {
                        ...n,
                        data: {
                            ...n.data,
                            label: createNodeLabel(nodeData.nodeName || nodeData.label, getNodeColor(n.type), n.type)
                        }
                    };
                });
                console.log('Template nodes with icons:', templateNodes.map((n)=>({
                        id: n.id,
                        label: n.data.label
                    })));
                // Apply auto-layout for even spacing
                const layoutedNodes = autoLayoutNodes(templateNodes, cleanedEdges);
                setNodes(layoutedNodes);
                setEdges(cleanedEdges);
                // Reset node ID counter based on loaded nodes to prevent duplicates
                resetNodeIdCounter(layoutedNodes);
                // DON'T automatically save template as workflow - only save when user clicks Save button
                // This prevents creating duplicate workflows every time a template is viewed
                // The template will be saved as a new workflow only when user makes changes or clicks Save
                setInitialized(true);
            }
        } else if (initialWorkflowId && workflow && !initialized) {
            // Skip if we've already processed this workflow
            if (loadedWorkflowRef.current === initialWorkflowId) {
                return;
            }
            // Use workflow data from useWorkflow hook (loaded via API)
            console.log('Loading workflow from hook:', {
                id: workflow.id,
                name: workflow.name,
                nodeCount: workflow.nodes?.length,
                nodes: workflow.nodes?.map((n)=>({
                        id: n.id,
                        type: n.type
                    }))
            });
            // Mark this workflow as loaded to prevent re-processing
            loadedWorkflowRef.current = initialWorkflowId;
            // Clean up any invalid edges before rendering
            const cleaned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$edge$2d$cleanup$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanupInvalidEdges"])(workflow.nodes, workflow.edges);
            const cleanedNodes = cleaned.nodes;
            const cleanedEdges = cleaned.edges;
            if (cleaned.removedCount > 0) {
                console.warn(`🧹 Removed ${cleaned.removedCount} invalid edge(s) from workflow`);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning(`Workflow had ${cleaned.removedCount} invalid connection(s)`, {
                    description: 'These have been automatically removed'
                });
            }
            // Convert workflow nodes to React Flow format
            const workflowNodes = cleanedNodes.map((n)=>{
                const nodeData = n.data;
                // Get the label text (not React element)
                const labelText = nodeData.nodeName || nodeData.label || n.type;
                return {
                    ...n,
                    data: {
                        ...n.data,
                        // Create the label JSX element
                        label: createNodeLabel(labelText, getNodeColor(n.type), n.type)
                    }
                };
            });
            // Apply auto-layout for even spacing
            const layoutedNodes = autoLayoutNodes(workflowNodes, cleanedEdges);
            console.log('Setting nodes to:', layoutedNodes.length, 'nodes');
            setNodes(layoutedNodes);
            setEdges(cleanedEdges);
            // Reset node ID counter based on loaded nodes to prevent duplicates
            resetNodeIdCounter(layoutedNodes);
            setInitialized(true);
        } else if (!initialized && !initialTemplateId && !initialWorkflowId) {
            setInitialized(true);
        // For new workflows, don't select any node by default
        // User can click the start node or drag new nodes to build their workflow
        }
    }, [
        initialTemplateId,
        initialWorkflowId,
        initialized,
        setNodes,
        setEdges,
        saveWorkflow,
        template,
        workflow,
        createNodeLabel,
        getNodeColor,
        seedTemplates
    ]);
    // Detect duplicate credentials
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (workflow) {
            const warnings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$workflow$2f$duplicate$2d$detection$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["detectDuplicateCredentials"])(workflow);
            setDuplicateWarnings(warnings);
            // Show toast for new warnings
            if (warnings.length > 0 && duplicateWarnings.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning(`Found ${warnings.length} duplicate credential${warnings.length > 1 ? 's' : ''}`, {
                    description: 'Click the warning icon to view details',
                    duration: 5000
                });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        workflow?.nodes,
        workflow?.edges
    ]);
    // Sync React Flow state with workflow state (debounced to avoid loops)
    // Skip auto-save for nodes - only save when user explicitly modifies the workflow
    // This prevents infinite loops when node visual states change during execution
    const nodesSaveTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const edgesSaveTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Cleanup timeouts on unmount to prevent memory leaks
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            const nodesSaveTimeout = nodesSaveTimeoutRef.current;
            const edgesSaveTimeout = edgesSaveTimeoutRef.current;
            if (nodesSaveTimeout) clearTimeout(nodesSaveTimeout);
            if (edgesSaveTimeout) clearTimeout(edgesSaveTimeout);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Clear any pending saves when execution starts
        if (isRunning) {
            if (nodesSaveTimeoutRef.current) clearTimeout(nodesSaveTimeoutRef.current);
            if (edgesSaveTimeoutRef.current) clearTimeout(edgesSaveTimeoutRef.current);
        }
    }, [
        isRunning
    ]);
    // AUTO-SAVE DISABLED - Use manual Save button instead
    // Only auto-save nodes when NOT running and after a significant delay
    // This prevents saves triggered by execution state changes
    // useEffect(() => {
    //   // Skip auto-save during initialization or execution
    //   // Note: initialTemplateId is cleared after creating the workflow, so don't check it here
    //   if (!initialized || !workflow || nodes.length === 0 || isRunning || currentNodeId) {
    //     console.log('⏭️ Skipping node auto-save:', {
    //       initialized,
    //       hasWorkflow: !!workflow,
    //       nodeCount: nodes.length,
    //       isRunning,
    //       currentNodeId
    //     });
    //     return;
    //   }
    //   // Only auto-save if user has made manual changes (not from template loading)
    //   // Check if all required nodes are present before saving
    //   const hasStartNode = nodes.some(n => n.type === 'start' || n.id === 'start');
    //   if (!hasStartNode) {
    //     console.warn('⚠️ Skipping auto-save: missing start node');
    //     return;
    //   }
    //   console.log('✅ Node auto-save scheduled for', nodes.length, 'nodes');
    //   if (nodesSaveTimeoutRef.current) clearTimeout(nodesSaveTimeoutRef.current);
    //   nodesSaveTimeoutRef.current = setTimeout(() => {
    //     console.log('💾 Executing node auto-save NOW');
    //     updateNodes(nodes.map(n => ({
    //       ...n,
    //       type: n.type || 'default',
    //       data: {
    //         ...n.data,
    //         label: typeof n.data.label === 'string' ? n.data.label : 'Node',
    //         // Preserve nodeType for LangGraph compatibility
    //         nodeType: n.data.nodeType || n.type,
    //       },
    //     })) as any);
    //   }, 2000); // Increased delay to 2 seconds to reduce save frequency
    //   return () => {
    //     if (nodesSaveTimeoutRef.current) clearTimeout(nodesSaveTimeoutRef.current);
    //   };
    // }, [nodes, workflow, isRunning, currentNodeId, updateNodes, initialized, initialTemplateId]);
    // useEffect(() => {
    //   // Skip auto-save during initialization or execution
    //   if (!initialized || !workflow || edges.length === 0 || isRunning || currentNodeId) {
    //     return;
    //   }
    //   if (edgesSaveTimeoutRef.current) clearTimeout(edgesSaveTimeoutRef.current);
    //   edgesSaveTimeoutRef.current = setTimeout(() => {
    //     updateEdges(edges as any);
    //   }, 2000); // Increased delay to 2 seconds to reduce save frequency
    //   return () => {
    //     if (edgesSaveTimeoutRef.current) clearTimeout(edgesSaveTimeoutRef.current);
    //   };
    // }, [edges, workflow, isRunning, currentNodeId, updateEdges, initialized, initialTemplateId]);
    // Update node visual states during execution and add IO badges
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log('🎨 Visual update triggered - currentNodeId:', currentNodeId, 'nodeResults:', Object.keys(nodeResults));
        setNodes((nds)=>nds.map((node)=>{
                const isCurrentlyRunning = currentNodeId === node.id;
                const result = nodeResults[node.id];
                // Explicitly clear executing class from nodes that are no longer running
                const wasExecuting = node.data?.isRunning === true;
                const stoppedExecuting = wasExecuting && !isCurrentlyRunning;
                const nextClassName = isCurrentlyRunning ? 'executing-node' : result?.status === 'completed' ? 'completed-node' : result?.status === 'failed' ? 'failed-node' : '';
                const currentClassName = node.className || '';
                const isRunningChanged = node.data?.isRunning !== isCurrentlyRunning;
                const statusChanged = node.data?.executionStatus !== result?.status;
                const classChanged = currentClassName !== nextClassName;
                if (isRunningChanged || statusChanged || classChanged) {
                    console.log(`🎨 Updating node ${node.id}:`, {
                        isCurrentlyRunning,
                        resultStatus: result?.status,
                        nextClassName,
                        currentClassName,
                        stoppedExecuting
                    });
                }
                if (!isRunningChanged && !statusChanged && !classChanged) {
                    return node;
                }
                return {
                    ...node,
                    // Force clear className if stopped executing to immediately stop animation
                    className: stoppedExecuting ? '' : nextClassName,
                    data: {
                        ...node.data,
                        isRunning: isCurrentlyRunning,
                        executionStatus: result?.status,
                        label: node.data.label,
                        // Add timestamp to force re-render when execution state changes
                        _executionUpdate: stoppedExecuting ? Date.now() : node.data?._executionUpdate
                    }
                };
            }));
        // Highlight active and selected edges
        setEdges((eds)=>eds.map((edge)=>{
                const sourceCompleted = nodeResults[edge.source]?.status === 'completed';
                const targetRunning = currentNodeId === edge.target;
                const isActive = sourceCompleted && targetRunning;
                const isSelected = edge.id === selectedEdgeId;
                const nextClassName = isActive ? 'active-edge' : isSelected ? 'selected-edge' : '';
                const currentClassName = edge.className || '';
                const nextStroke = isActive ? '#FA5D19' : isSelected ? '#FA5D19' : '#d1d5db';
                const nextWidth = isActive ? 2 : isSelected ? 2 : 1;
                const classChanged = currentClassName !== nextClassName;
                const strokeChanged = edge.style?.stroke !== nextStroke;
                const widthChanged = edge.style?.strokeWidth !== nextWidth;
                const animatedChanged = !!edge.animated !== isActive;
                if (!classChanged && !strokeChanged && !widthChanged && !animatedChanged) {
                    return edge;
                }
                return {
                    ...edge,
                    className: nextClassName,
                    style: {
                        ...edge.style,
                        stroke: nextStroke,
                        strokeWidth: nextWidth
                    },
                    animated: isActive
                };
            }));
    }, [
        currentNodeId,
        nodeResults,
        selectedEdgeId,
        setNodes,
        setEdges
    ]);
    // Auto-track executing node
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (currentNodeId && isRunning) {
            const node = getNode(currentNodeId);
            if (node) {
                setCenter(node.position.x + 100, node.position.y + 50, {
                    zoom: 1,
                    duration: 400
                });
            }
        }
    }, [
        currentNodeId,
        isRunning,
        getNode,
        setCenter
    ]);
    const onConnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((connection)=>{
        console.log('🔗 Creating edge connection:', {
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle
        });
        // Directly connect nodes without showing mapping modal
        setEdges((eds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$system$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addEdge"])(connection, eds));
    }, [
        setEdges
    ]);
    const onDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    const onDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        event.preventDefault();
        const type = event.dataTransfer.getData('application/reactflow');
        const label = event.dataTransfer.getData('application/reactflow-label');
        const color = event.dataTransfer.getData('application/reactflow-color');
        if (!type) {
            return;
        }
        const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
        });
        // Get the icon component for this node type
        const nodeCategory = nodeCategories.find((cat)=>cat.nodes.some((n)=>n.type === type));
        const nodeConfig = nodeCategory?.nodes.find((n)=>n.type === type);
        const IconComponent = nodeConfig?.icon;
        const newNode = {
            id: getId(),
            type: type === 'firecrawl' ? 'mcp' : type,
            position,
            data: {
                label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `w-32 h-32 rounded-8 ${color} flex items-center justify-center flex-shrink-0`,
                            children: IconComponent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                className: "w-18 h-18 text-white",
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 920,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 bg-white rounded-2"
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 922,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                            lineNumber: 918,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium text-[#18181b]",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                            lineNumber: 925,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                    lineNumber: 917,
                    columnNumber: 13
                }, this),
                nodeType: type === 'firecrawl' ? 'mcp' : type,
                nodeName: label,
                // Pre-configure Firecrawl MCP if this is a Firecrawl node
                ...type === 'firecrawl' && {
                    mcpServers: [
                        {
                            id: 'firecrawl',
                            name: 'Firecrawl',
                            label: 'firecrawl',
                            url: 'https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp',
                            authType: 'Access token / API key'
                        }
                    ]
                }
            }
        };
        setNodes((nds)=>nds.concat(newNode));
    }, [
        screenToFlowPosition,
        setNodes
    ]);
    const onDragStart = (event, nodeType, nodeLabel, nodeColor)=>{
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/reactflow-label', nodeLabel);
        event.dataTransfer.setData('application/reactflow-color', nodeColor);
        event.dataTransfer.effectAllowed = 'move';
    };
    const handleDeleteNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nodeId)=>{
        setConfirmDialog({
            isOpen: true,
            title: "Delete Node",
            description: "Are you sure you want to delete this node? This will also remove all connected edges.",
            variant: "danger",
            onConfirm: ()=>{
                setNodes((nds)=>nds.filter((n)=>n.id !== nodeId));
                setEdges((eds)=>eds.filter((e)=>e.source !== nodeId && e.target !== nodeId));
                setSelectedNode(null);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Node deleted');
            }
        });
    }, [
        setNodes,
        setEdges
    ]);
    const onNodeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((_event, node)=>{
        // Check if it's a file-search node - show coming soon modal
        if (node.data?.nodeType === 'file-search') {
            setShowComingSoonModal(true);
            return;
        }
        // Close all other panels when clicking a node
        setShowExecution(false);
        setShowTestEndpoint(false);
        setShowPreview(false);
        setSelectedEdgeId(null);
        // Set the selected node
        setSelectedNode(node);
    }, []);
    const onEdgeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((_event, edge)=>{
        setSelectedEdgeId(edge.id);
        setSelectedNode(null); // Deselect node when clicking edge
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('Connection selected - Click Delete or use the toolbar below', {
            duration: 2000
        });
    }, []);
    const onEdgeDoubleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((_event, edge)=>{
        setEditingEdge(edge);
    }, []);
    const onPaneClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Deselect edge when clicking canvas background
        if (selectedEdgeId) {
            setSelectedEdgeId(null);
        }
    }, [
        selectedEdgeId
    ]);
    const handleSaveEdgeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((edgeId, label)=>{
        setEdges((eds)=>eds.map((edge)=>edge.id === edgeId ? {
                    ...edge,
                    label,
                    labelBgStyle: {
                        fill: 'white',
                        fillOpacity: 1
                    },
                    labelStyle: {
                        fill: '#18181b',
                        fontWeight: 600,
                        fontSize: 12
                    }
                } : edge));
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Connection label updated');
    }, [
        setEdges
    ]);
    const onNodeContextMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event, node)=>{
        event.preventDefault();
        setContextMenu({
            x: event.clientX,
            y: event.clientY,
            nodeId: node.id
        });
    }, []);
    const handleContextMenuDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (contextMenu) {
            const nodeId = contextMenu.nodeId;
            setContextMenu(null);
            handleDeleteNode(nodeId);
        }
    }, [
        contextMenu,
        handleDeleteNode
    ]);
    const handleContextMenuDuplicate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (contextMenu) {
            const nodeToDuplicate = nodes.find((n)=>n.id === contextMenu.nodeId);
            if (nodeToDuplicate) {
                const newNode = {
                    ...nodeToDuplicate,
                    id: getId(),
                    position: {
                        x: nodeToDuplicate.position.x + 300,
                        y: nodeToDuplicate.position.y
                    }
                };
                setNodes((nds)=>nds.concat(newNode));
            }
            setContextMenu(null);
        }
    }, [
        contextMenu,
        nodes,
        setNodes
    ]);
    // Close context menu on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClick = ()=>setContextMenu(null);
        if (contextMenu) {
            document.addEventListener('click', handleClick);
            return ()=>document.removeEventListener('click', handleClick);
        }
    }, [
        contextMenu
    ]);
    // Handler for opening execution panel
    const handlePreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        console.log('▶️ Run button clicked - opening ExecutionPanel');
        setShowPreview(false);
        setShowTestEndpoint(false);
        setSelectedNode(null); // Close node panel
        setShowExecution(true);
    }, []);
    // Handler for auto-arranging nodes
    const handleAutoArrange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        console.log('📐 Auto-arranging nodes');
        const layoutedNodes = autoLayoutNodes(nodes, edges);
        setNodes(layoutedNodes);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Nodes arranged', {
            description: 'Nodes have been automatically spaced evenly'
        });
    }, [
        nodes,
        edges,
        setNodes
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            // Don't trigger shortcuts if user is typing in an input/textarea
            const target = e.target;
            const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
            // Delete selected nodes
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNode && selectedNode.data?.nodeType !== 'start' && !isTyping) {
                e.preventDefault();
                handleDeleteNode(selectedNode.id);
            }
            // Delete selected edges
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedEdgeId && !selectedNode && !isTyping) {
                e.preventDefault();
                setEdges((eds)=>eds.filter((e)=>e.id !== selectedEdgeId));
                setSelectedEdgeId(null);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Connection deleted');
            }
            // Copy node (Ctrl/Cmd + C)
            if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedNode && !isTyping) {
                e.preventDefault();
                // Store in clipboard-like state
                localStorage.setItem('copiedNode', JSON.stringify(nodes.find((n)=>n.id === selectedNode.id)));
            }
            // Paste node (Ctrl/Cmd + V)
            if ((e.ctrlKey || e.metaKey) && e.key === 'v' && !isTyping) {
                e.preventDefault();
                const copiedNodeStr = localStorage.getItem('copiedNode');
                if (copiedNodeStr) {
                    try {
                        const copiedNode = JSON.parse(copiedNodeStr);
                        const newNode = {
                            ...copiedNode,
                            id: getId(),
                            position: {
                                x: copiedNode.position.x + 200,
                                y: copiedNode.position.y
                            }
                        };
                        setNodes((nds)=>nds.concat(newNode));
                    } catch (e) {
                        console.error('Failed to paste node:', e);
                    }
                }
            }
            // Duplicate (Ctrl/Cmd + D)
            if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selectedNode && !isTyping) {
                e.preventDefault();
                const nodeToDuplicate = nodes.find((n)=>n.id === selectedNode.id);
                if (nodeToDuplicate) {
                    const newNode = {
                        ...nodeToDuplicate,
                        id: getId(),
                        position: {
                            x: nodeToDuplicate.position.x + 200,
                            y: nodeToDuplicate.position.y
                        }
                    };
                    setNodes((nds)=>nds.concat(newNode));
                }
            }
            // Run workflow (Cmd + Enter)
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !isTyping) {
                e.preventDefault();
                if (!isRunning) {
                    handlePreview();
                }
            }
            // Auto-arrange nodes (Cmd/Ctrl + Shift + A)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A' && !isTyping) {
                e.preventDefault();
                handleAutoArrange();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return ()=>document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedNode,
        selectedEdgeId,
        nodes,
        edges,
        handleDeleteNode,
        setNodes,
        setEdges,
        isRunning,
        handleAutoArrange
    ]);
    const handleRunWithInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (input)=>{
        if (!workflow) {
            console.error('No workflow to run');
            return;
        }
        // Wait for any pending NodePanel saves to complete
        // NodePanel has 500ms debounce → handleUpdateNodeData → updateNodes → saveWorkflow (1000ms debounce)
        // Total worst case: 500ms (NodePanel) + 1000ms (saveWorkflow) = 1500ms
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info('Preparing workflow...', {
            duration: 1600
        });
        await new Promise((resolve)=>setTimeout(resolve, 1600));
        // Create a fresh workflow object with current nodes/edges
        const currentWorkflow = {
            ...workflow,
            nodes: nodes.map((n)=>({
                    id: n.id,
                    type: n.type,
                    position: n.position,
                    data: n.data
                })),
            edges: edges.map((e)=>({
                    id: e.id,
                    source: e.source,
                    target: e.target,
                    sourceHandle: e.sourceHandle,
                    targetHandle: e.targetHandle,
                    label: e.label
                }))
        };
        await runWorkflow(currentWorkflow, input);
    }, [
        workflow,
        nodes,
        edges,
        runWorkflow
    ]);
    const handleShowTestAPI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        // Save workflow before opening API panel
        if (workflow) {
            saveWorkflow({
                nodes: nodes.map((n)=>({
                        ...n,
                        type: n.type || 'default',
                        data: {
                            ...n.data,
                            label: typeof n.data.label === 'string' ? n.data.label : 'Node'
                        }
                    })),
                edges: edges
            });
        }
        setShowPreview(false);
        setShowExecution(false);
        setSelectedNode(null); // Close node panel
        setShowTestEndpoint(true);
    }, [
        workflow,
        nodes,
        edges,
        saveWorkflow
    ]);
    const handleSaveWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!workflow) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('No workflow to save');
            return;
        }
        // Serialize nodes by removing React elements (labels) and keeping only data
        const serializedNodes = nodes.map((n)=>({
                ...n,
                data: {
                    ...n.data,
                    // Don't save the React element label - save the text/name instead
                    label: n.data.nodeName || n.type,
                    nodeType: n.data.nodeType || n.type
                }
            }));
        console.log('💾 Saving', serializedNodes.length, 'serialized nodes');
        // Force immediate save with all current data
        saveWorkflow({
            nodes: serializedNodes,
            edges: edges,
            name: workflow.name,
            description: workflow.description
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Workflow saved', {
            description: `${nodes.length} nodes, ${edges.length} connections saved to Convex`
        });
    }, [
        workflow,
        nodes,
        edges,
        saveWorkflow
    ]);
    const handleUpdateNodeData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nodeId, data)=>{
        try {
            setNodes((nds)=>{
                const updated = nds.map((node)=>{
                    if (node.id === nodeId) {
                        const updatedData = {
                            ...node.data,
                            ...data
                        };
                        // If name is being updated, also update the label
                        if (data.name && data.name !== node.data.nodeName) {
                            const nodeType = node.data.nodeType;
                            // Find the node configuration to get the icon and color
                            let IconComponent = null;
                            let color = "bg-gray-500";
                            for (const category of nodeCategories){
                                const nodeConfig = category.nodes.find((n)=>n.type === nodeType);
                                if (nodeConfig) {
                                    IconComponent = nodeConfig.icon;
                                    color = nodeConfig.color;
                                    break;
                                }
                            }
                            // Create the new label with the updated name
                            updatedData.label = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `w-32 h-32 rounded-8 ${color} flex items-center justify-center flex-shrink-0`,
                                        children: IconComponent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IconComponent, {
                                            className: "w-18 h-18 text-white",
                                            strokeWidth: 2
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                            lineNumber: 1296,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-white rounded-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                            lineNumber: 1298,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1294,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-[#18181b]",
                                        children: data.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1301,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1293,
                                columnNumber: 17
                            }, this);
                        }
                        return {
                            ...node,
                            data: updatedData
                        };
                    }
                    return node;
                });
                // Immediately persist to Convex after updating React state
                if (workflow) {
                    updateNodes(updated);
                }
                return updated;
            });
        } catch (error) {
            console.error('Error updating node data:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Failed to update node', {
                description: error instanceof Error ? error.message : 'Unable to save node changes'
            });
        }
    }, [
        setNodes,
        workflow,
        updateNodes
    ]);
    // Inject onUpdate callback into note nodes for inline editing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setNodes((nds)=>nds.map((node)=>{
                const nodeType = node.data?.nodeType;
                if (nodeType === 'note' && !node.data.onUpdate) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            onUpdate: (updates)=>handleUpdateNodeData(node.id, updates)
                        }
                    };
                }
                return node;
            }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        nodes.length
    ]); // Only re-run when node count changes
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        transition: {
            duration: 0.5
        },
        className: "fixed inset-0 bg-background-base flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$WorkflowNameEditor$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                workflow: workflow,
                onUpdate: saveWorkflow,
                renameTrigger: renameTrigger,
                rightAccessory: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-0 border border-border-faint rounded-8 overflow-hidden bg-background-base",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setEnvironment('draft'),
                            className: `px-12 py-6 text-label-small transition-colors ${environment === 'draft' ? 'bg-heat-100 text-white shadow-sm' : 'text-black-alpha-48 hover:text-accent-black'}`,
                            children: "Draft"
                        }, void 0, false, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                            lineNumber: 1363,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                // Save workflow when switching to production
                                if (workflow) {
                                    saveWorkflow({
                                        nodes: nodes.map((n)=>({
                                                ...n,
                                                type: n.type || 'default',
                                                data: {
                                                    ...n.data,
                                                    label: typeof n.data.label === 'string' ? n.data.label : 'Node'
                                                }
                                            })),
                                        edges: edges
                                    });
                                }
                                setEnvironment('production');
                            },
                            className: `px-12 py-6 text-label-small transition-colors ${environment === 'production' ? 'bg-heat-100 text-white shadow-sm' : 'text-black-alpha-48 hover:text-accent-black'}`,
                            children: "Production"
                        }, void 0, false, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                            lineNumber: 1370,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                    lineNumber: 1362,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1357,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    y: -50,
                    opacity: 0
                },
                animate: {
                    y: 0,
                    opacity: 1
                },
                transition: {
                    duration: 0.5,
                    delay: 0.1
                },
                className: "fixed top-20 right-20 flex items-center gap-8 z-[60]",
                children: [
                    duplicateWarnings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            const warning = duplicateWarnings[0];
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning(warning.message, {
                                description: `Nodes: ${warning.nodeNames.join(', ')}`,
                                duration: 10000,
                                action: {
                                    label: `${duplicateWarnings.length > 1 ? `+${duplicateWarnings.length - 1} more` : 'Dismiss'}`,
                                    onClick: ()=>{
                                        if (duplicateWarnings.length > 1) {
                                            duplicateWarnings.forEach((w, i)=>{
                                                setTimeout(()=>{
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].warning(w.message, {
                                                        description: `Nodes: ${w.nodeNames.join(', ')}`,
                                                        duration: 8000
                                                    });
                                                }, i * 300);
                                            });
                                        }
                                    }
                                }
                            });
                        },
                        className: "px-12 py-8 bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 rounded-8 text-body-medium text-yellow-800 transition-colors flex items-center gap-8",
                        title: "Duplicate credentials detected",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-16 h-16 animate-pulse",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1433,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1432,
                                columnNumber: 13
                            }, this),
                            duplicateWarnings.length,
                            " Warning",
                            duplicateWarnings.length > 1 ? 's' : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1406,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        ref: workflowMenuRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowWorkflowMenu((prev)=>!prev),
                                className: "w-36 h-36 border border-border-faint rounded-8 bg-accent-white hover:bg-black-alpha-4 text-black-alpha-48 hover:text-accent-black transition-colors flex items-center justify-center",
                                title: "Workflow actions",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                    className: "w-18 h-18"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1444,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1439,
                                columnNumber: 11
                            }, this),
                            showWorkflowMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 mt-4 w-200 bg-accent-white border border-border-faint rounded-12 shadow-lg z-50 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDuplicateWorkflow,
                                        className: "w-full px-16 py-10 text-left text-body-small hover:bg-black-alpha-4 transition-colors",
                                        children: "Duplicate workflow"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1448,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSaveWorkflowImmediate,
                                        className: "w-full px-16 py-10 text-left text-body-small hover:bg-black-alpha-4 transition-colors",
                                        children: "Save workflow"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1454,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (!convexId) {
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Please save the workflow first', {
                                                    description: 'Make some changes and wait for auto-save to complete'
                                                });
                                                return;
                                            }
                                            setShowSaveAsTemplateModal(true);
                                            setShowWorkflowMenu(false);
                                        },
                                        className: "w-full px-16 py-10 text-left text-body-small hover:bg-black-alpha-4 transition-colors border-b border-border-faint",
                                        children: "Save as Template"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1460,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleClearCanvas,
                                        className: "w-full px-16 py-10 text-left text-body-small hover:bg-black-alpha-4 transition-colors",
                                        children: "Clear canvas"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleRenameWorkflow,
                                        className: "w-full px-16 py-10 text-left text-body-small hover:bg-black-alpha-4 transition-colors",
                                        children: "Rename workflow"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1481,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: confirmDeleteWorkflow,
                                        className: "w-full px-16 py-10 text-left text-body-small text-red-600 hover:bg-red-50 transition-colors",
                                        children: "Delete workflow"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1487,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1447,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1438,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowSettings(true),
                        className: "px-16 py-8 bg-accent-white hover:bg-black-alpha-4 border border-border-faint rounded-8 text-body-medium text-accent-black transition-colors flex items-center gap-8",
                        title: "API Settings",
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
                                        d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1502,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1503,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1501,
                                columnNumber: 11
                            }, this),
                            "Settings"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1496,
                        columnNumber: 9
                    }, this),
                    environment === 'production' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleShowTestAPI,
                        className: "px-16 py-8 bg-accent-white hover:bg-black-alpha-4 border border-border-faint rounded-8 text-body-medium text-accent-black transition-colors flex items-center gap-8",
                        title: "Test API",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Server$3e$__["Server"], {
                                className: "w-16 h-16",
                                strokeWidth: 2
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1513,
                                columnNumber: 13
                            }, this),
                            "API"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1508,
                        columnNumber: 11
                    }, this),
                    !isRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handlePreview,
                        className: `px-16 py-8 border rounded-8 text-body-medium transition-colors flex items-center gap-8 ${showExecution ? 'bg-heat-100 text-white border-heat-100' : 'bg-accent-white text-accent-black border-border-faint hover:bg-black-alpha-4'}`,
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
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1527,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1528,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1526,
                                columnNumber: 13
                            }, this),
                            "Run"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1518,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: stopWorkflow,
                        className: "px-16 py-8 border border-border-faint rounded-8 text-body-medium transition-colors flex items-center gap-8 bg-accent-white text-accent-black hover:bg-black-alpha-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-16 h-16",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: "6",
                                    y: "6",
                                    width: "12",
                                    height: "12",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1538,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1537,
                                columnNumber: 13
                            }, this),
                            "Stop"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1533,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSaveWorkflow,
                        className: "px-20 py-8 bg-heat-100 hover:bg-heat-200 text-white rounded-8 text-body-medium font-medium transition-all active:scale-[0.98] flex items-center gap-8",
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
                                    d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1549,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1548,
                                columnNumber: 11
                            }, this),
                            "Save"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1544,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1398,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].aside, {
                        initial: {
                            x: -300,
                            opacity: 0
                        },
                        animate: {
                            x: 0,
                            opacity: 1
                        },
                        transition: {
                            duration: 0.5,
                            delay: 0.2
                        },
                        className: "w-200 lg:w-200 md:w-180 sm:w-160 m-20 rounded-16 border border-border-faint bg-accent-white p-16 shadow-lg flex-shrink-0 z-10 self-start max-h-[calc(100vh-80px)] overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onBack,
                                    className: "text-body-small text-black-alpha-48 hover:text-accent-black transition-colors flex items-center gap-8",
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
                                                d: "M15 19l-7-7 7-7"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                lineNumber: 1569,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                            lineNumber: 1568,
                                            columnNumber: 13
                                        }, this),
                                        "Back"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1564,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1563,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-12",
                                children: nodeCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xs font-semibold text-black-alpha-64 uppercase tracking-wide mb-8",
                                                children: category.category
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                lineNumber: 1579,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: category.nodes.map((node)=>{
                                                    const Icon = node.icon;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        draggable: true,
                                                        onDragStart: (e)=>onDragStart(e, node.type, node.label, node.color),
                                                        className: "rounded-8 px-10 py-8 hover:bg-black-alpha-4 transition-all cursor-move flex items-center gap-10",
                                                        whileTap: {
                                                            scale: 0.98
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-24 h-24 rounded-6 ${node.color} flex items-center justify-center flex-shrink-0`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                    className: "w-14 h-14 text-white",
                                                                    strokeWidth: 2.5
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                                    lineNumber: 1594,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                                lineNumber: 1593,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium text-accent-black",
                                                                children: node.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                                lineNumber: 1596,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, node.type, true, {
                                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                        lineNumber: 1586,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                lineNumber: 1582,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, category.category, true, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1578,
                                        columnNumber: 13
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1576,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-32"
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1605,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1557,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].main, {
                        initial: {
                            opacity: 0,
                            scale: 0.95
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            duration: 0.5,
                            delay: 0.3
                        },
                        className: "flex-1 relative",
                        ref: reactFlowWrapper,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactFlow"], {
                            nodes: nodes,
                            edges: edges,
                            nodeTypes: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$CustomNodes$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nodeTypes"],
                            onNodesChange: onNodesChange,
                            onEdgesChange: onEdgesChange,
                            onConnect: onConnect,
                            onDrop: onDrop,
                            onDragOver: onDragOver,
                            onNodeClick: onNodeClick,
                            onNodeContextMenu: onNodeContextMenu,
                            onEdgeClick: onEdgeClick,
                            onEdgeDoubleClick: onEdgeDoubleClick,
                            onPaneClick: onPaneClick,
                            defaultEdgeOptions: {
                                type: 'smoothstep',
                                style: {
                                    strokeWidth: 2,
                                    cursor: 'pointer'
                                },
                                interactionWidth: 20
                            },
                            className: "bg-background-base",
                            proOptions: {
                                hideAttribution: true
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Background"], {
                                    color: "#E5E5E5",
                                    gap: 20,
                                    size: 1
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1638,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Controls"], {
                                    className: "!bg-accent-white !border-border-faint"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1643,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MiniMap"], {
                                    className: "!bg-accent-white !border-border-faint",
                                    nodeColor: "#FA5D19"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1646,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                            lineNumber: 1616,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1609,
                        columnNumber: 7
                    }, this),
                    showTestEndpoint && workflow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$TestEndpointPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        workflowId: workflow.id,
                        workflow: {
                            ...workflow,
                            nodes: nodes.map((n)=>({
                                    id: n.id,
                                    type: n.type,
                                    position: n.position,
                                    data: n.data
                                }))
                        },
                        environment: environment,
                        onClose: ()=>setShowTestEndpoint(false)
                    }, workflow.id, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1656,
                        columnNumber: 11
                    }, this) : showExecution ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$ExecutionPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        workflow: workflow ? {
                            ...workflow,
                            nodes: nodes.map((n)=>({
                                    id: n.id,
                                    type: n.type,
                                    position: n.position,
                                    data: n.data
                                }))
                        } : null,
                        execution: execution,
                        nodeResults: nodeResults,
                        isRunning: isRunning,
                        currentNodeId: currentNodeId,
                        onRun: handleRunWithInput,
                        onResumePendingAuth: resumeWorkflow,
                        onClose: ()=>setShowExecution(false),
                        environment: environment,
                        pendingAuth: pendingAuth
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1672,
                        columnNumber: 11
                    }, this) : showPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$PreviewPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        execution: execution,
                        nodeResults: nodeResults,
                        isRunning: isRunning,
                        onClose: ()=>setShowPreview(false)
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1693,
                        columnNumber: 11
                    }, this) : selectedNode?.data?.nodeType === 'mcp' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$MCPPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        node: selectedNode,
                        mode: "configure",
                        onClose: ()=>setSelectedNode(null),
                        onUpdate: handleUpdateNodeData
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1700,
                        columnNumber: 11
                    }, this) : selectedNode?.data?.nodeType?.includes('if') || selectedNode?.data?.nodeType?.includes('while') || selectedNode?.data?.nodeType?.includes('approval') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$LogicNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        node: selectedNode,
                        nodes: nodes,
                        onClose: ()=>setSelectedNode(null),
                        onDelete: handleDeleteNode,
                        onUpdate: handleUpdateNodeData
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1707,
                        columnNumber: 11
                    }, this) : selectedNode?.data?.nodeType?.includes('transform') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$DataNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        node: selectedNode,
                        nodes: nodes,
                        onClose: ()=>setSelectedNode(null),
                        onDelete: handleDeleteNode,
                        onUpdate: handleUpdateNodeData
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1715,
                        columnNumber: 11
                    }, this) : selectedNode?.data?.nodeType === 'extract' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$ExtractNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        node: selectedNode,
                        nodes: nodes,
                        onClose: ()=>setSelectedNode(null),
                        onDelete: handleDeleteNode,
                        onUpdate: handleUpdateNodeData
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1723,
                        columnNumber: 11
                    }, this) : selectedNode?.data?.nodeType === 'http' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$HTTPNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        node: selectedNode,
                        nodes: nodes,
                        onClose: ()=>setSelectedNode(null),
                        onDelete: handleDeleteNode,
                        onUpdate: handleUpdateNodeData
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1731,
                        columnNumber: 11
                    }, this) : selectedNode?.data?.nodeType?.includes('set-state') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$DataNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        node: selectedNode,
                        nodes: nodes,
                        onClose: ()=>setSelectedNode(null),
                        onDelete: handleDeleteNode,
                        onUpdate: handleUpdateNodeData
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1739,
                        columnNumber: 11
                    }, this) : selectedNode?.data?.nodeType === 'start' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$StartNodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        node: selectedNode,
                        onClose: ()=>setSelectedNode(null),
                        onUpdate: handleUpdateNodeData
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1747,
                        columnNumber: 11
                    }, this) : selectedNode?.data?.nodeType !== 'end' && selectedNode?.data?.nodeType !== 'note' && selectedNode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$NodePanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        nodeData: {
                            id: selectedNode.id,
                            label: selectedNode.data.nodeName || 'Agent',
                            type: selectedNode.data.nodeType || 'agent'
                        },
                        nodes: nodes,
                        onClose: ()=>setSelectedNode(null),
                        onAddMCP: ()=>{
                            setTargetAgentForMCP(selectedNode);
                            setShowMCPSelector(true);
                        },
                        onDelete: handleDeleteNode,
                        onUpdate: handleUpdateNodeData,
                        onOpenSettings: ()=>setShowSettings(true)
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1753,
                        columnNumber: 11
                    }, this) : null,
                    showMCPSelector && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$MCPPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        node: null,
                        mode: "add-to-agent",
                        onClose: ()=>{
                            setShowMCPSelector(false);
                            setTargetAgentForMCP(null);
                        },
                        onUpdate: ()=>{},
                        onAddToAgent: (mcpConfig)=>{
                            if (targetAgentForMCP) {
                                const currentTools = targetAgentForMCP.data.mcpTools || [];
                                handleUpdateNodeData(targetAgentForMCP.id, {
                                    mcpTools: [
                                        ...currentTools,
                                        mcpConfig
                                    ]
                                });
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('MCP added to agent', {
                                    description: `${mcpConfig.availableTools.length} tools available`
                                });
                            }
                            setShowMCPSelector(false);
                            setTargetAgentForMCP(null);
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1773,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1555,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$SettingsPanelSimple$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showSettings,
                onClose: ()=>setShowSettings(false)
            }, void 0, false, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1799,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$ShareWorkflowModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showShareModal,
                onClose: ()=>setShowShareModal(false),
                workflowId: workflow?.id || '',
                workflowName: workflow?.name || 'Workflow'
            }, void 0, false, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1805,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$SaveAsTemplateModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showSaveAsTemplateModal,
                onClose: ()=>setShowSaveAsTemplateModal(false),
                workflowId: convexId || '',
                workflowName: workflow?.name || 'Workflow'
            }, void 0, false, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1813,
                columnNumber: 7
            }, this),
            showComingSoonModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                className: "fixed inset-0 bg-black/60 z-[200] flex items-center justify-center",
                onClick: ()=>setShowComingSoonModal(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        scale: 0.95,
                        opacity: 0
                    },
                    animate: {
                        scale: 1,
                        opacity: 1
                    },
                    exit: {
                        scale: 0.95,
                        opacity: 0
                    },
                    onClick: (e)=>e.stopPropagation(),
                    className: "bg-accent-white rounded-16 shadow-2xl w-[480px] overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-24 border-b border-border-faint",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-semibold text-accent-black",
                                        children: "Coming Soon"
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1839,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowComingSoonModal(false),
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
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                lineNumber: 1847,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                            lineNumber: 1846,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                        lineNumber: 1842,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1838,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                            lineNumber: 1837,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-24",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-16 mb-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-48 h-48 rounded-12 bg-indigo-100 flex items-center justify-center flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "w-24 h-24 text-indigo-600"
                                            }, void 0, false, {
                                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                lineNumber: 1856,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                            lineNumber: 1855,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-medium text-accent-black mb-4",
                                                    children: "File Search Node"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                    lineNumber: 1859,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-black-alpha-48",
                                                    children: "This feature is currently in development"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                                    lineNumber: 1862,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                            lineNumber: 1858,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1854,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-body-medium text-black-alpha-64 mb-20",
                                    children: "The File Search node will allow you to search through files and code in your workflows. Stay tuned for updates!"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1868,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowComingSoonModal(false),
                                    className: "w-full px-20 py-12 bg-heat-100 hover:bg-heat-200 text-white rounded-10 text-sm font-medium transition-colors",
                                    children: "Got it"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1872,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                            lineNumber: 1853,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                    lineNumber: 1830,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1823,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$ConfirmDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: confirmDialog.isOpen,
                title: confirmDialog.title,
                description: confirmDialog.description,
                variant: confirmDialog.variant,
                onConfirm: confirmDialog.onConfirm,
                onCancel: ()=>setConfirmDialog({
                        ...confirmDialog,
                        isOpen: false
                    })
            }, void 0, false, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1884,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$app$2f28$home$292f$sections$2f$workflow$2d$builder$2f$EdgeLabelModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                edge: editingEdge,
                isOpen: !!editingEdge,
                onClose: ()=>setEditingEdge(null),
                onSave: handleSaveEdgeLabel
            }, void 0, false, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1895,
                columnNumber: 7
            }, this),
            selectedEdgeId && !selectedNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                exit: {
                    opacity: 0,
                    y: 10
                },
                className: "fixed bottom-80 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-16 py-12 bg-accent-white border border-border-faint rounded-12 shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-8 pr-12 border-r border-border-faint",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-16 h-16 text-heat-100",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1912,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1911,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-body-small text-accent-black font-medium",
                                children: "Connection Selected"
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1914,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1910,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            const edge = edges.find((e)=>e.id === selectedEdgeId);
                            if (edge) setEditingEdge(edge);
                        },
                        className: "px-12 py-6 bg-background-base hover:bg-black-alpha-4 border border-border-faint rounded-6 text-body-small text-accent-black transition-colors flex items-center gap-6",
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
                                    d: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1924,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1923,
                                columnNumber: 13
                            }, this),
                            "Edit Label"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1916,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setEdges((eds)=>eds.filter((e)=>e.id !== selectedEdgeId));
                            setSelectedEdgeId(null);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Connection deleted');
                        },
                        className: "px-12 py-6 bg-red-50 hover:bg-red-100 border border-red-200 rounded-6 text-body-small text-red-700 transition-colors flex items-center gap-6",
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
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1937,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1936,
                                columnNumber: 13
                            }, this),
                            "Delete"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1928,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pl-12 border-l border-border-faint",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSelectedEdgeId(null),
                            className: "w-24 h-24 rounded-4 hover:bg-black-alpha-4 transition-colors flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-12 h-12 text-black-alpha-48",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1947,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1946,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                            lineNumber: 1942,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1941,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1904,
                columnNumber: 9
            }, this),
            contextMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    left: contextMenu.x,
                    top: contextMenu.y,
                    zIndex: 1000
                },
                className: "bg-accent-white border border-border-faint rounded-8 shadow-lg overflow-hidden min-w-160",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleContextMenuDuplicate,
                        className: "w-full px-16 py-10 text-left text-body-small text-accent-black hover:bg-black-alpha-4 transition-colors flex items-center gap-8",
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
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1970,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1969,
                                columnNumber: 13
                            }, this),
                            "Duplicate"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1965,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleContextMenuDelete,
                        className: "w-full px-16 py-10 text-left text-body-small text-red-600 hover:bg-red-50 transition-colors flex items-center gap-8",
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
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                }, void 0, false, {
                                    fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                    lineNumber: 1979,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                                lineNumber: 1978,
                                columnNumber: 13
                            }, this),
                            "Delete"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                        lineNumber: 1974,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1956,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
        lineNumber: 1350,
        columnNumber: 5
    }, this);
}
function WorkflowBuilder(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$ErrorBoundary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ErrorBoundary"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$xyflow$2f$react$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactFlowProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WorkflowBuilderInner, {
                ...props
            }, void 0, false, {
                fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
                lineNumber: 1993,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
            lineNumber: 1992,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/app/(home)/sections/workflow-builder/WorkflowBuilder.tsx",
        lineNumber: 1991,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_app_%28home%29_sections_workflow-builder_WorkflowBuilder_tsx_1986f825._.js.map