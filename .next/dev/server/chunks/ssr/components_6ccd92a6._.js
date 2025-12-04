module.exports = [
"[project]/components/shared/icons/curve.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Curve
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Curve({ fill = "var(--border-faint)", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "11",
        viewBox: "0 0 11 11",
        width: "11",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M11 1L11 11L10 11L10 7C10 3.68629 7.31371 1 4 1L-4.37114e-08 1L0 -4.80825e-07L11 4.37114e-07L11 1Z",
            fill: fill
        }, void 0, false, {
            fileName: "[project]/components/shared/icons/curve.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/shared/icons/curve.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shared/layout/curvy-rect.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Connector",
    ()=>Connector,
    "ConnectorToBottom",
    ()=>ConnectorToBottom,
    "ConnectorToLeft",
    ()=>ConnectorToLeft,
    "ConnectorToRight",
    ()=>ConnectorToRight,
    "ConnectorToTop",
    ()=>ConnectorToTop,
    "default",
    ()=>CurvyRect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cn.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$icons$2f$curve$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/icons/curve.tsx [app-ssr] (ecmascript)");
;
;
;
function CurvyRect({ className, allSides, x, y, left, right, top, bottom, topLeft, topRight, bottomLeft, bottomRight, ...props }) {
    const hasTopLeft = topLeft || top || left || x || allSides;
    const hasTopRight = topRight || top || right || x || allSides;
    const hasBottomLeft = bottomLeft || bottom || left || y || allSides;
    const hasBottomRight = bottomRight || bottom || right || y || allSides;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(className, "pointer-events-none contain-[layout,paint] curvy-rect"),
        ...props,
        children: [
            hasTopLeft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$icons$2f$curve$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                className: "-rotate-90 absolute top-0 left-0"
            }, void 0, false, {
                fileName: "[project]/components/shared/layout/curvy-rect.tsx",
                lineNumber: 50,
                columnNumber: 22
            }, this),
            hasTopRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$icons$2f$curve$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                className: "absolute top-0 right-0"
            }, void 0, false, {
                fileName: "[project]/components/shared/layout/curvy-rect.tsx",
                lineNumber: 51,
                columnNumber: 23
            }, this),
            hasBottomLeft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$icons$2f$curve$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                className: "rotate-180 absolute bottom-0 left-0"
            }, void 0, false, {
                fileName: "[project]/components/shared/layout/curvy-rect.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            hasBottomRight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$icons$2f$curve$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                className: "rotate-90 absolute bottom-0 right-0"
            }, void 0, false, {
                fileName: "[project]/components/shared/layout/curvy-rect.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/layout/curvy-rect.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
const Connector = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "21",
        viewBox: "0 0 22 21",
        width: "22",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none contain-[layout,paint] absolute", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M10.5 4C10.5 7.31371 7.81371 10 4.5 10H0.5V11H4.5C7.81371 11 10.5 13.6863 10.5 17V21H11.5V17C11.5 13.6863 14.1863 11 17.5 11H21.5V10H17.5C14.1863 10 11.5 7.31371 11.5 4V0H10.5V4Z",
            fill: "#EDEDED"
        }, void 0, false, {
            fileName: "[project]/components/shared/layout/curvy-rect.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/shared/layout/curvy-rect.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const ConnectorToRight = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "21",
        viewBox: "0 0 11 21",
        width: "11",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none contain-[layout,paint] absolute", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M1 4C1 7.31371 3.68629 10 7 10H11V11H7C3.68629 11 1 13.6863 1 17V21H0V0H1V4Z",
            fill: "#EDEDED"
        }, void 0, false, {
            fileName: "[project]/components/shared/layout/curvy-rect.tsx",
            lineNumber: 104,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/shared/layout/curvy-rect.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const ConnectorToLeft = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "21",
        viewBox: "0 0 11 21",
        width: "11",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none contain-[layout,paint] absolute", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M11 21H10V17C10 13.6863 7.31371 11 4 11H0V10H4C7.31371 10 10 7.31371 10 4V0H11V21Z",
            fill: "#EDEDED"
        }, void 0, false, {
            fileName: "[project]/components/shared/layout/curvy-rect.tsx",
            lineNumber: 129,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/shared/layout/curvy-rect.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const ConnectorToTop = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "11",
        viewBox: "0 0 21 11",
        width: "21",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none contain-[layout,paint] absolute", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M11 4C11 7.31371 13.6863 10 17 10H21V11H0V10H4C7.31371 10 10 7.31371 10 4V0H11V4Z",
            fill: "#EDEDED"
        }, void 0, false, {
            fileName: "[project]/components/shared/layout/curvy-rect.tsx",
            lineNumber: 154,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/shared/layout/curvy-rect.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const ConnectorToBottom = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "11",
        viewBox: "0 0 21 11",
        width: "21",
        xmlns: "http://www.w3.org/2000/svg",
        ...props,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none contain-[layout,paint] absolute", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M11 7C11 3.68629 13.6863 1 17 1H21V0H0V1H4C7.31371 1 10 3.68629 10 7V11H11V7Z",
            fill: "#EDEDED"
        }, void 0, false, {
            fileName: "[project]/components/shared/layout/curvy-rect.tsx",
            lineNumber: 179,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/shared/layout/curvy-rect.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/shared/effects/flame/hero-flame.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroFlame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function HeroFlame({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className
    }, void 0, false, {
        fileName: "[project]/components/shared/effects/flame/hero-flame.tsx",
        lineNumber: 2,
        columnNumber: 10
    }, this);
}
}),
"[project]/components/shared/pixi/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck -- TODO: fix this
__turbopack_context__.s([
    "createRenderWithFPS",
    ()=>createRenderWithFPS,
    "degreesToRadians",
    ()=>degreesToRadians,
    "generateTexture",
    ()=>generateTexture,
    "imageToSprite",
    ()=>imageToSprite,
    "isDestroyed",
    ()=>isDestroyed,
    "waitUntilPixiIsReady",
    ()=>waitUntilPixiIsReady
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$assets$2f$Assets$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/assets/Assets.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$scene$2f$sprite$2f$Sprite$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/scene/sprite/Sprite.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$shared$2f$texture$2f$Texture$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/rendering/renderers/shared/texture/Texture.mjs [app-ssr] (ecmascript)");
;
const isDestroyed = (app)=>{
    if (!app.ticker || !app.renderer || !app.stage || !app.renderer.gl) return true;
    return app.renderer.gl.isContextLost();
};
const generateTexture = (app, graphic)=>{
    const renderer = app.renderer;
    if (!isDestroyed(app)) {
        return renderer.generateTexture(graphic);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$shared$2f$texture$2f$Texture$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Texture"].WHITE;
};
const degreesToRadians = (degrees)=>{
    return degrees * (Math.PI / 180);
};
const imageToSprite = async (app, path)=>{
    let texture;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$assets$2f$Assets$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Assets"].cache.has(path)) {
        texture = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$assets$2f$Assets$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Assets"].cache.get(path);
    } else {
        texture = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$assets$2f$Assets$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Assets"].load(path);
    }
    const sprite = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$scene$2f$sprite$2f$Sprite$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sprite"].from(texture);
    return sprite;
};
const createRenderWithFPS = (app, fps)=>{
    let lastUpdateTime = 0;
    return ()=>{
        const currentTime = performance.now();
        const timeSinceLastUpdate = currentTime - lastUpdateTime;
        if (timeSinceLastUpdate >= 1000 / fps) {
            app.ticker.update();
            app.render();
            lastUpdateTime = currentTime;
        }
    };
};
const waitUntilPixiIsReady = (app)=>{
    return new Promise((resolve)=>{
        app.canvas.addEventListener("pixi-initialized", resolve);
    });
};
}),
"[project]/components/shared/Playground/Context/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgentModel",
    ()=>AgentModel,
    "Endpoint",
    ()=>Endpoint,
    "FormatType",
    ()=>FormatType,
    "SearchFormatType",
    ()=>SearchFormatType
]);
var Endpoint = /*#__PURE__*/ function(Endpoint) {
    Endpoint["Scrape"] = "scrape";
    Endpoint["Crawl"] = "crawl";
    Endpoint["Search"] = "search";
    Endpoint["Map"] = "map";
    Endpoint["Extract"] = "extract";
    return Endpoint;
}({});
var AgentModel = /*#__PURE__*/ function(AgentModel) {
    AgentModel["FIRE_1"] = "FIRE-1";
    return AgentModel;
}({});
var FormatType = /*#__PURE__*/ function(FormatType) {
    FormatType["Markdown"] = "markdown";
    FormatType["Summary"] = "summary";
    FormatType["Json"] = "json";
    FormatType["RawHtml"] = "rawHtml";
    FormatType["Html"] = "html";
    FormatType["Screenshot"] = "screenshot";
    FormatType["ScreenshotFullPage"] = "screenshot@fullPage";
    FormatType["Links"] = "links";
    return FormatType;
}({});
var SearchFormatType = /*#__PURE__*/ function(SearchFormatType) {
    SearchFormatType["Web"] = "web";
    SearchFormatType["Images"] = "images";
    SearchFormatType["News"] = "news";
    return SearchFormatType;
}({});
}),
"[project]/components/shared/ErrorBoundary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorBoundary",
    ()=>ErrorBoundary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
class ErrorBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }
    handleReset = ()=>{
        this.setState({
            hasError: false,
            error: undefined
        });
    };
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-24 bg-red-50 border border-red-200 rounded-12 m-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-semibold text-red-800 mb-8",
                        children: "Something went wrong"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/ErrorBoundary.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-600 mb-16",
                        children: this.state.error?.message || 'An unexpected error occurred'
                    }, void 0, false, {
                        fileName: "[project]/components/shared/ErrorBoundary.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: this.handleReset,
                        className: "px-16 py-8 bg-red-600 hover:bg-red-700 text-white rounded-8 text-sm font-medium transition-colors",
                        children: "Try Again"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/ErrorBoundary.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/ErrorBoundary.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this);
        }
        return this.props.children;
    }
}
}),
"[project]/components/shared/button/Button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cn.ts [app-ssr] (ecmascript)");
;
;
;
function Button({ variant = "primary", size = "default", disabled, ...attrs }) {
    const children = handleChildren(attrs.children);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ...attrs,
        type: attrs.type ?? "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(attrs.className, "[&>span]:px-6 flex items-center justify-center button relative [&>*]:relative", "text-label-medium lg-max:[&_svg]:size-24", `button-${variant} group/button`, {
            "rounded-8 p-6": size === "default",
            "rounded-10 p-8 gap-2": size === "large",
            "text-accent-white active:[scale:0.995]": variant === "primary",
            "text-accent-black active:[scale:0.99] active:bg-black-alpha-7": [
                "secondary",
                "tertiary",
                "playground"
            ].includes(variant),
            "bg-black-alpha-4 hover:bg-black-alpha-6": variant === "secondary",
            "hover:bg-black-alpha-4": variant === "tertiary"
        }, variant === "playground" && [
            "before:inside-border before:border-black-alpha-4",
            disabled ? "before:opacity-0 bg-black-alpha-4 text-black-alpha-24" : "hover:bg-black-alpha-4 hover:before:opacity-0 active:before:opacity-0"
        ]),
        disabled: disabled,
        children: [
            variant === "primary" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overlay button-background !absolute"
            }, void 0, false, {
                fileName: "[project]/components/shared/button/Button.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/button/Button.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
const handleChildren = (children)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Children"].toArray(children).map((child)=>{
        if (typeof child === "string") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: child
            }, child, false, {
                fileName: "[project]/components/shared/button/Button.tsx",
                lineNumber: 62,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        }
        return child;
    });
};
}),
"[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FirecrawlIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function FirecrawlIcon({ fill = "var(--heat-100)", innerFillColor = "var(--background-base)", ...attrs }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...attrs,
        preserveAspectRatio: "xMidYMid meet",
        viewBox: "0 0 150 400",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.155
                    },
                    fill: "#f2beea",
                    d: "M 63.5,40.5 C 76.9938,39.3395 90.6604,39.1728 104.5,40C 105.056,40.3826 105.389,40.8826 105.5,41.5C 105.167,41.5 104.833,41.5 104.5,41.5C 104.167,41.5 103.833,41.5 103.5,41.5C 90.3438,40.5044 77.0105,40.1711 63.5,40.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 19,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.646
                    },
                    fill: "#ca77c3",
                    d: "M 63.5,40.5 C 77.0105,40.1711 90.3438,40.5044 103.5,41.5C 90.1667,41.5 76.8333,41.5 63.5,41.5C 63.5,53.8333 63.5,66.1667 63.5,78.5C 63.5,90.5 63.5,102.5 63.5,114.5C 63.5,120.833 63.5,127.167 63.5,133.5C 63.5,144.167 63.5,154.833 63.5,165.5C 62.5014,124.337 62.168,83.0034 62.5,41.5C 62.5,40.8333 62.8333,40.5 63.5,40.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 28,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 27,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#b438a8",
                    d: "M 103.5,41.5 C 103.833,41.5 104.167,41.5 104.5,41.5C 104.5,60.8333 104.5,80.1667 104.5,99.5C 103.874,86.9575 103.208,75.6242 102.5,65.5C 100.745,67.8035 99.5782,70.4702 99,73.5C 98,71.5 97,69.5 96,67.5C 95.5172,68.448 95.3505,69.448 95.5,70.5C 93.0401,70.6985 90.7067,71.3652 88.5,72.5C 90.1667,74.1667 89.8333,75.1667 87.5,75.5C 80.4489,73.5715 79.7822,74.7382 85.5,79C 83.765,79.6514 82.0983,79.4847 80.5,78.5C 79.6143,79.325 79.281,80.325 79.5,81.5C 77.9397,81.4809 76.4397,81.1476 75,80.5C 72.0573,81.2403 71.8907,82.2403 74.5,83.5C 71.0702,84.2898 67.7368,85.2898 64.5,86.5C 64.8064,83.6146 64.4731,80.9479 63.5,78.5C 63.5,66.1667 63.5,53.8333 63.5,41.5C 76.8333,41.5 90.1667,41.5 103.5,41.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 37,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 36,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#c639b3",
                    d: "M 64.5,42.5 C 77.1667,42.5 89.8333,42.5 102.5,42.5C 102.5,46.1667 102.5,49.8333 102.5,53.5C 99.6246,54.6229 96.6246,55.4562 93.5,56C 93.8333,56.3333 94.1667,56.6667 94.5,57C 92.8333,58 91.1667,59 89.5,60C 91.1667,60.3333 92.8333,60.6667 94.5,61C 86.8435,63.3251 79.1768,65.3251 71.5,67C 70.4495,68.3848 69.1161,69.3848 67.5,70C 68.5,70.3333 69.5,70.6667 70.5,71C 68.5273,71.4955 66.5273,71.6621 64.5,71.5C 64.5,61.8333 64.5,52.1667 64.5,42.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 46,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 45,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.447
                    },
                    fill: "#d39ad3",
                    d: "M 104.5,41.5 C 104.833,41.5 105.167,41.5 105.5,41.5C 105.333,60.1696 105.5,78.8363 106,97.5C 106.333,97.8333 106.667,98.1667 107,98.5C 120.261,93.3356 133.428,93.3356 146.5,98.5C 140.587,97.1906 134.587,96.5239 128.5,96.5C 120.461,97.1761 112.461,98.1761 104.5,99.5C 104.5,80.1667 104.5,60.8333 104.5,41.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 55,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 54,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#aa31a4",
                    d: "M 102.5,65.5 C 102.5,70.5 102.5,75.5 102.5,80.5C 101.85,80.1961 101.183,79.8627 100.5,79.5C 99.5159,82.4281 99.1826,85.4281 99.5,88.5C 97.9054,86.8888 96.7388,84.8888 96,82.5C 95.2155,84.286 94.0488,85.786 92.5,87C 93.7112,87.8928 93.7112,88.7261 92.5,89.5C 90.8208,88.218 88.9874,87.218 87,86.5C 86.3828,87.4491 86.5494,88.2825 87.5,89C 83.642,88.6775 79.8087,87.8442 76,86.5C 75.5,86.6667 75,86.8333 74.5,87C 76.2603,87.9653 76.5937,89.132 75.5,90.5C 72.6807,89.0297 70.014,89.1964 67.5,91C 69.087,91.8624 70.7536,92.5291 72.5,93C 70.2379,96.1441 67.7379,96.3107 65,93.5C 64.5034,91.1902 64.3367,88.8568 64.5,86.5C 67.7368,85.2898 71.0702,84.2898 74.5,83.5C 71.8907,82.2403 72.0573,81.2403 75,80.5C 76.4397,81.1476 77.9397,81.4809 79.5,81.5C 79.281,80.325 79.6143,79.325 80.5,78.5C 82.0983,79.4847 83.765,79.6514 85.5,79C 79.7822,74.7382 80.4489,73.5715 87.5,75.5C 89.8333,75.1667 90.1667,74.1667 88.5,72.5C 90.7067,71.3652 93.0401,70.6985 95.5,70.5C 95.3505,69.448 95.5172,68.448 96,67.5C 97,69.5 98,71.5 99,73.5C 99.5782,70.4702 100.745,67.8035 102.5,65.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 64,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 63,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#9f2f9f",
                    d: "M 63.5,78.5 C 64.4731,80.9479 64.8064,83.6146 64.5,86.5C 64.3367,88.8568 64.5034,91.1902 65,93.5C 67.7379,96.3107 70.2379,96.1441 72.5,93C 70.7536,92.5291 69.087,91.8624 67.5,91C 70.014,89.1964 72.6807,89.0297 75.5,90.5C 76.5937,89.132 76.2603,87.9653 74.5,87C 75,86.8333 75.5,86.6667 76,86.5C 79.8087,87.8442 83.642,88.6775 87.5,89C 86.5494,88.2825 86.3828,87.4491 87,86.5C 88.9874,87.218 90.8208,88.218 92.5,89.5C 93.7112,88.7261 93.7112,87.8928 92.5,87C 94.0488,85.786 95.2155,84.286 96,82.5C 96.7388,84.8888 97.9054,86.8888 99.5,88.5C 99.6015,92.8954 98.4348,96.8954 96,100.5C 94.883,99.0506 94.2163,97.3839 94,95.5C 89.8884,98.713 85.555,101.38 81,103.5C 80.6667,103.167 80.3333,102.833 80,102.5C 77.5987,104.636 74.7653,105.803 71.5,106C 72.4506,106.718 72.6172,107.551 72,108.5C 69.5608,110.629 67.0608,112.629 64.5,114.5C 64.1667,114.5 63.8333,114.5 63.5,114.5C 63.5,102.5 63.5,90.5 63.5,78.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 73,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 72,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#9b2fa2",
                    d: "M 102.5,80.5 C 102.203,87.5581 102.536,94.5581 103.5,101.5C 101.96,104.882 99.7932,105.216 97,102.5C 96.3719,106.586 94.7053,107.586 92,105.5C 91.5,105.667 91,105.833 90.5,106C 87.4135,109.284 84.2468,112.451 81,115.5C 80.6667,114.833 80.3333,114.167 80,113.5C 75.0641,117.096 70.3974,121.096 66,125.5C 64.6632,121.974 64.1632,118.308 64.5,114.5C 67.0608,112.629 69.5608,110.629 72,108.5C 72.6172,107.551 72.4506,106.718 71.5,106C 74.7653,105.803 77.5987,104.636 80,102.5C 80.3333,102.833 80.6667,103.167 81,103.5C 85.555,101.38 89.8884,98.713 94,95.5C 94.2163,97.3839 94.883,99.0506 96,100.5C 98.4348,96.8954 99.6015,92.8954 99.5,88.5C 99.1826,85.4281 99.5159,82.4281 100.5,79.5C 101.183,79.8627 101.85,80.1961 102.5,80.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 82,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 81,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.596
                    },
                    fill: "#bb8ec5",
                    d: "M 146.5,98.5 C 149.241,98.7073 151.574,99.7073 153.5,101.5C 150.509,101.834 148.176,100.834 146.5,98.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 91,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 90,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.227
                    },
                    fill: "#c7a1cf",
                    d: "M 153.5,101.5 C 156.157,101.935 158.491,102.935 160.5,104.5C 158.5,104.167 156.5,103.833 154.5,103.5C 154.167,102.833 153.833,102.167 153.5,101.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 100,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 99,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#89509b",
                    d: "M 154.5,103.5 C 156.5,103.833 158.5,104.167 160.5,104.5C 162.23,105.026 163.564,106.026 164.5,107.5C 164.833,108.167 165.167,108.833 165.5,109.5C 163.255,108.904 161.255,107.904 159.5,106.5C 157.58,105.935 155.913,104.935 154.5,103.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 109,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 108,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.039
                    },
                    fill: "#c297cc",
                    d: "M 164.5,107.5 C 166.404,107.738 167.738,108.738 168.5,110.5C 167.391,110.443 166.391,110.11 165.5,109.5C 165.167,108.833 164.833,108.167 164.5,107.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 118,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 117,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#802b94",
                    d: "M 146.5,98.5 C 148.176,100.834 150.509,101.834 153.5,101.5C 153.833,102.167 154.167,102.833 154.5,103.5C 150.604,101.868 146.937,102.202 143.5,104.5C 145.011,106.838 144.677,107.504 142.5,106.5C 138.307,108.437 133.974,109.937 129.5,111C 130.167,111.667 130.833,112.333 131.5,113C 119.868,118.148 109.201,124.815 99.5,133C 98.2068,133.49 96.8734,133.657 95.5,133.5C 95.4386,135.592 94.4386,137.092 92.5,138C 90.2779,138.695 88.1113,139.528 86,140.5C 84.9433,139.373 83.7766,138.873 82.5,139C 82.9574,139.414 83.2907,139.914 83.5,140.5C 80.6028,142.237 77.6028,143.737 74.5,145C 75.6226,146.044 76.9559,146.71 78.5,147C 76.8333,147.333 75.1667,147.667 73.5,148C 72.2842,149.74 70.6175,150.74 68.5,151C 69.1667,151.333 69.8333,151.667 70.5,152C 68.5643,152.813 66.5643,153.313 64.5,153.5C 64.5,150.833 64.5,148.167 64.5,145.5C 66.1533,147.839 67.4866,147.339 68.5,144C 69.448,143.517 70.448,143.351 71.5,143.5C 71.5,142.5 71.5,141.5 71.5,140.5C 76.887,139.81 81.887,137.977 86.5,135C 98.6054,125.74 110.605,117.407 122.5,110C 120.315,110.188 118.315,110.354 116.5,110.5C 115.692,110.192 115.025,109.692 114.5,109C 120.725,107.749 127.058,107.083 133.5,107C 135.608,106.64 137.608,105.973 139.5,105C 138.833,104.333 138.167,103.667 137.5,103C 142.784,101.711 142.784,100.378 137.5,99C 129.477,98.3435 121.477,98.5101 113.5,99.5C 110.327,100.368 107.327,100.368 104.5,99.5C 112.461,98.1761 120.461,97.1761 128.5,96.5C 134.587,96.5239 140.587,97.1906 146.5,98.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 127,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 126,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#782792",
                    d: "M 154.5,103.5 C 155.913,104.935 157.58,105.935 159.5,106.5C 159.5,107.5 159.5,108.5 159.5,109.5C 156.423,109.347 153.589,110.014 151,111.5C 149.596,111.491 148.43,110.991 147.5,110C 155.5,108.676 155.5,108.009 147.5,108C 145.998,108.583 144.665,109.416 143.5,110.5C 144.145,111.732 144.311,113.065 144,114.5C 144.75,115.126 145.584,115.626 146.5,116C 136.846,118.827 127.513,122.327 118.5,126.5C 117.614,127.325 117.281,128.325 117.5,129.5C 115.801,129.34 114.134,129.506 112.5,130C 108.234,134.263 103.401,137.763 98,140.5C 97.8374,138.613 98.6707,137.113 100.5,136C 98.6332,135.289 97.1332,135.789 96,137.5C 95.5045,139.473 95.3379,141.473 95.5,143.5C 93.2993,145.084 90.966,146.584 88.5,148C 90.8473,148.334 93.1806,148.167 95.5,147.5C 95.5,148.5 95.5,149.5 95.5,150.5C 89.4426,151.196 84.1093,153.529 79.5,157.5C 80.376,158.251 81.376,158.751 82.5,159C 77.5972,159.071 73.2639,160.571 69.5,163.5C 70.8333,166.167 70.1667,166.833 67.5,165.5C 66.3044,165.846 66.3044,166.346 67.5,167C 66.552,167.483 65.552,167.649 64.5,167.5C 64.5,166.833 64.1667,166.5 63.5,166.5C 63.5,166.167 63.5,165.833 63.5,165.5C 63.5,154.833 63.5,144.167 63.5,133.5C 64.1667,133.5 64.5,133.833 64.5,134.5C 64.5,138.167 64.5,141.833 64.5,145.5C 64.5,148.167 64.5,150.833 64.5,153.5C 66.5643,153.313 68.5643,152.813 70.5,152C 69.8333,151.667 69.1667,151.333 68.5,151C 70.6175,150.74 72.2842,149.74 73.5,148C 75.1667,147.667 76.8333,147.333 78.5,147C 76.9559,146.71 75.6226,146.044 74.5,145C 77.6028,143.737 80.6028,142.237 83.5,140.5C 83.2907,139.914 82.9574,139.414 82.5,139C 83.7766,138.873 84.9433,139.373 86,140.5C 88.1113,139.528 90.2779,138.695 92.5,138C 94.4386,137.092 95.4386,135.592 95.5,133.5C 96.8734,133.657 98.2068,133.49 99.5,133C 109.201,124.815 119.868,118.148 131.5,113C 130.833,112.333 130.167,111.667 129.5,111C 133.974,109.937 138.307,108.437 142.5,106.5C 144.677,107.504 145.011,106.838 143.5,104.5C 146.937,102.202 150.604,101.868 154.5,103.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 136,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 135,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.443
                    },
                    fill: "#ac89c0",
                    d: "M 170.5,112.5 C 173.243,114.239 175.243,116.573 176.5,119.5C 174.833,118.167 173.167,116.833 171.5,115.5C 170.89,114.609 170.557,113.609 170.5,112.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 145,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 144,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#712790",
                    d: "M 159.5,106.5 C 161.255,107.904 163.255,108.904 165.5,109.5C 166.391,110.11 167.391,110.443 168.5,110.5C 169.5,110.833 170.167,111.5 170.5,112.5C 170.557,113.609 170.89,114.609 171.5,115.5C 171.509,117.308 171.009,118.975 170,120.5C 167.898,120.454 165.898,119.454 164,117.5C 160.453,119.617 156.62,121.117 152.5,122C 154.044,122.29 155.377,122.956 156.5,124C 151.979,126.087 147.479,127.254 143,127.5C 142.005,128.066 141.172,128.733 140.5,129.5C 136.114,129.617 132.447,131.283 129.5,134.5C 126.649,131.168 123.316,130.668 119.5,133C 120.551,134.385 121.884,135.385 123.5,136C 120.086,136.297 116.753,136.964 113.5,138C 113.833,138.333 114.167,138.667 114.5,139C 111.623,139.956 108.956,141.289 106.5,143C 107.849,144.635 107.682,146.135 106,147.5C 104.089,142.338 102.256,142.505 100.5,148C 99.552,148.483 98.552,148.649 97.5,148.5C 97.9227,146.219 97.256,144.552 95.5,143.5C 95.3379,141.473 95.5045,139.473 96,137.5C 97.1332,135.789 98.6332,135.289 100.5,136C 98.6707,137.113 97.8374,138.613 98,140.5C 103.401,137.763 108.234,134.263 112.5,130C 114.134,129.506 115.801,129.34 117.5,129.5C 117.281,128.325 117.614,127.325 118.5,126.5C 127.513,122.327 136.846,118.827 146.5,116C 145.584,115.626 144.75,115.126 144,114.5C 144.311,113.065 144.145,111.732 143.5,110.5C 144.665,109.416 145.998,108.583 147.5,108C 155.5,108.009 155.5,108.676 147.5,110C 148.43,110.991 149.596,111.491 151,111.5C 153.589,110.014 156.423,109.347 159.5,109.5C 159.5,108.5 159.5,107.5 159.5,106.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 154,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 153,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#8f2c9b",
                    d: "M 104.5,99.5 C 107.327,100.368 110.327,100.368 113.5,99.5C 119.808,101.174 126.475,102.34 133.5,103C 126.586,103.186 119.753,103.686 113,104.5C 111.484,101.994 109.318,101.16 106.5,102C 105.701,104.228 106.701,105.561 109.5,106C 108.5,106.833 107.5,107.667 106.5,108.5C 108.335,109.428 108.668,110.594 107.5,112C 104.772,111.798 102.105,111.964 99.5,112.5C 91.0686,120.427 81.9019,127.427 72,133.5C 71.6667,133.167 71.3333,132.833 71,132.5C 70.5439,133.744 71.0439,134.577 72.5,135C 70.1116,135.303 67.9449,136.137 66,137.5C 65.7679,136.263 65.2679,135.263 64.5,134.5C 64.5,133.833 64.1667,133.5 63.5,133.5C 63.5,127.167 63.5,120.833 63.5,114.5C 63.8333,114.5 64.1667,114.5 64.5,114.5C 64.1632,118.308 64.6632,121.974 66,125.5C 70.3974,121.096 75.0641,117.096 80,113.5C 80.3333,114.167 80.6667,114.833 81,115.5C 84.2468,112.451 87.4135,109.284 90.5,106C 91,105.833 91.5,105.667 92,105.5C 94.7053,107.586 96.3719,106.586 97,102.5C 99.7932,105.216 101.96,104.882 103.5,101.5C 102.536,94.5581 102.203,87.5581 102.5,80.5C 102.5,75.5 102.5,70.5 102.5,65.5C 103.208,75.6242 103.874,86.9575 104.5,99.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 163,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 162,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.6
                    },
                    fill: "#a37ebb",
                    d: "M 176.5,119.5 C 179.647,121.313 181.647,123.98 182.5,127.5C 181.061,125.64 179.395,123.973 177.5,122.5C 176.89,121.609 176.557,120.609 176.5,119.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 172,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 171,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#862a97",
                    d: "M 64.5,145.5 C 64.5,141.833 64.5,138.167 64.5,134.5C 65.2679,135.263 65.7679,136.263 66,137.5C 67.9449,136.137 70.1116,135.303 72.5,135C 71.0439,134.577 70.5439,133.744 71,132.5C 71.3333,132.833 71.6667,133.167 72,133.5C 81.9019,127.427 91.0686,120.427 99.5,112.5C 102.105,111.964 104.772,111.798 107.5,112C 108.668,110.594 108.335,109.428 106.5,108.5C 107.5,107.667 108.5,106.833 109.5,106C 106.701,105.561 105.701,104.228 106.5,102C 109.318,101.16 111.484,101.994 113,104.5C 119.753,103.686 126.586,103.186 133.5,103C 126.475,102.34 119.808,101.174 113.5,99.5C 121.477,98.5101 129.477,98.3435 137.5,99C 142.784,100.378 142.784,101.711 137.5,103C 138.167,103.667 138.833,104.333 139.5,105C 137.608,105.973 135.608,106.64 133.5,107C 127.058,107.083 120.725,107.749 114.5,109C 115.025,109.692 115.692,110.192 116.5,110.5C 118.315,110.354 120.315,110.188 122.5,110C 110.605,117.407 98.6054,125.74 86.5,135C 81.887,137.977 76.887,139.81 71.5,140.5C 71.5,141.5 71.5,142.5 71.5,143.5C 70.448,143.351 69.448,143.517 68.5,144C 67.4866,147.339 66.1533,147.839 64.5,145.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 181,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 180,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.168
                    },
                    fill: "#ddb0e0",
                    d: "M 62.5,41.5 C 62.168,83.0034 62.5014,124.337 63.5,165.5C 63.5,165.833 63.5,166.167 63.5,166.5C 63.5,168.833 63.5,171.167 63.5,173.5C 62.6909,171.708 62.1909,169.708 62,167.5C 61.1687,125.331 61.3353,83.3313 62.5,41.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 190,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 189,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#62248b",
                    d: "M 171.5,115.5 C 173.167,116.833 174.833,118.167 176.5,119.5C 176.557,120.609 176.89,121.609 177.5,122.5C 177.703,124.044 178.37,125.378 179.5,126.5C 179.291,127.086 178.957,127.586 178.5,128C 174.396,129.943 170.063,131.11 165.5,131.5C 163.109,132.191 163.109,133.191 165.5,134.5C 160.965,136.178 156.298,137.345 151.5,138C 148.97,138.891 146.637,140.058 144.5,141.5C 143.587,139.914 143.587,138.414 144.5,137C 143.975,136.308 143.308,135.808 142.5,135.5C 141.719,136.737 140.719,137.737 139.5,138.5C 136.823,137.926 134.157,137.259 131.5,136.5C 135.975,134.762 140.308,132.762 144.5,130.5C 143.311,129.571 141.978,129.238 140.5,129.5C 141.172,128.733 142.005,128.066 143,127.5C 147.479,127.254 151.979,126.087 156.5,124C 155.377,122.956 154.044,122.29 152.5,122C 156.62,121.117 160.453,119.617 164,117.5C 165.898,119.454 167.898,120.454 170,120.5C 171.009,118.975 171.509,117.308 171.5,115.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 199,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 198,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#562285",
                    d: "M 177.5,122.5 C 179.395,123.973 181.061,125.64 182.5,127.5C 183.167,127.5 183.5,127.833 183.5,128.5C 183.977,133.114 185.31,137.447 187.5,141.5C 186.244,141.904 185.077,142.571 184,143.5C 181.756,143.133 181.256,142.133 182.5,140.5C 181.277,139.386 179.944,139.219 178.5,140C 179.196,141.488 178.862,142.988 177.5,144.5C 175.786,143.391 175.119,144.058 175.5,146.5C 168.954,146.809 162.62,148.143 156.5,150.5C 155.77,152.341 155.103,154.175 154.5,156C 157.044,157.099 157.044,158.265 154.5,159.5C 153.915,157.135 152.748,155.135 151,153.5C 150.589,158.519 150.089,163.519 149.5,168.5C 148.288,170.907 146.788,173.24 145,175.5C 144.184,176.823 143.017,177.489 141.5,177.5C 142.925,176.078 143.925,174.411 144.5,172.5C 146.104,171.713 146.771,170.38 146.5,168.5C 147.117,168.389 147.617,168.056 148,167.5C 149.363,163.239 149.696,158.905 149,154.5C 148.623,153.058 147.79,152.058 146.5,151.5C 146.741,148.966 145.741,147.3 143.5,146.5C 143.443,145.391 143.11,144.391 142.5,143.5C 141.34,141.797 142.007,141.131 144.5,141.5C 146.637,140.058 148.97,138.891 151.5,138C 156.298,137.345 160.965,136.178 165.5,134.5C 163.109,133.191 163.109,132.191 165.5,131.5C 170.063,131.11 174.396,129.943 178.5,128C 178.957,127.586 179.291,127.086 179.5,126.5C 178.37,125.378 177.703,124.044 177.5,122.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 208,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 207,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.69
                    },
                    fill: "#8161a4",
                    d: "M 183.5,128.5 C 187.209,134.265 189.542,140.599 190.5,147.5C 190.5,155.833 190.5,164.167 190.5,172.5C 190.5,172.833 190.5,173.167 190.5,173.5C 190.167,173.5 189.833,173.5 189.5,173.5C 189.827,163.319 189.494,153.319 188.5,143.5C 188.672,142.508 188.338,141.842 187.5,141.5C 185.31,137.447 183.977,133.114 183.5,128.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 217,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 216,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.894
                    },
                    fill: "#976aab",
                    d: "M 118.5,140.5 C 115.574,142.084 112.908,144.084 110.5,146.5C 110.167,146.5 109.833,146.5 109.5,146.5C 110.853,142.306 113.853,140.306 118.5,140.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 226,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 225,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.514
                    },
                    fill: "#a38bba",
                    d: "M 140.5,143.5 C 141.167,143.5 141.833,143.5 142.5,143.5C 143.11,144.391 143.443,145.391 143.5,146.5C 142.167,145.833 141.167,144.833 140.5,143.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 235,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 234,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.694
                    },
                    fill: "#9f7db9",
                    d: "M 143.5,146.5 C 145.741,147.3 146.741,148.966 146.5,151.5C 145.263,150.035 144.263,148.368 143.5,146.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 244,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 243,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.416
                    },
                    fill: "#b995ca",
                    d: "M 109.5,146.5 C 109.833,146.5 110.167,146.5 110.5,146.5C 107.079,151.96 105.746,157.96 106.5,164.5C 105.523,161.713 105.19,158.713 105.5,155.5C 105.792,151.934 107.126,148.934 109.5,146.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 253,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 252,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#6a258d",
                    d: "M 140.5,129.5 C 141.978,129.238 143.311,129.571 144.5,130.5C 140.308,132.762 135.975,134.762 131.5,136.5C 134.157,137.259 136.823,137.926 139.5,138.5C 140.719,137.737 141.719,136.737 142.5,135.5C 143.308,135.808 143.975,136.308 144.5,137C 143.587,138.414 143.587,139.914 144.5,141.5C 142.007,141.131 141.34,141.797 142.5,143.5C 141.833,143.5 141.167,143.5 140.5,143.5C 138.522,140.988 135.855,139.488 132.5,139C 128.167,138.333 123.833,138.333 119.5,139C 118.944,139.383 118.611,139.883 118.5,140.5C 113.853,140.306 110.853,142.306 109.5,146.5C 107.126,148.934 105.792,151.934 105.5,155.5C 104.527,157.948 104.194,160.615 104.5,163.5C 103.834,159.647 103.167,155.647 102.5,151.5C 100.598,153.063 99.5984,155.063 99.5,157.5C 100.664,160.067 101.33,162.734 101.5,165.5C 96.4251,165.593 91.4251,166.259 86.5,167.5C 87.0402,168.748 87.7069,169.915 88.5,171C 79.7796,171.886 74.7796,176.719 73.5,185.5C 72.1779,185.67 71.0113,185.337 70,184.5C 68.4294,178.67 66.596,173.004 64.5,167.5C 65.552,167.649 66.552,167.483 67.5,167C 66.3044,166.346 66.3044,165.846 67.5,165.5C 70.1667,166.833 70.8333,166.167 69.5,163.5C 73.2639,160.571 77.5972,159.071 82.5,159C 81.376,158.751 80.376,158.251 79.5,157.5C 84.1093,153.529 89.4426,151.196 95.5,150.5C 95.5,149.5 95.5,148.5 95.5,147.5C 93.1806,148.167 90.8473,148.334 88.5,148C 90.966,146.584 93.2993,145.084 95.5,143.5C 97.256,144.552 97.9227,146.219 97.5,148.5C 98.552,148.649 99.552,148.483 100.5,148C 102.256,142.505 104.089,142.338 106,147.5C 107.682,146.135 107.849,144.635 106.5,143C 108.956,141.289 111.623,139.956 114.5,139C 114.167,138.667 113.833,138.333 113.5,138C 116.753,136.964 120.086,136.297 123.5,136C 121.884,135.385 120.551,134.385 119.5,133C 123.316,130.668 126.649,131.168 129.5,134.5C 132.447,131.283 136.114,129.617 140.5,129.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 262,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 261,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.224
                    },
                    fill: "#b18cc2",
                    d: "M 140.5,143.5 C 133.621,139.586 126.288,138.586 118.5,140.5C 118.611,139.883 118.944,139.383 119.5,139C 123.833,138.333 128.167,138.333 132.5,139C 135.855,139.488 138.522,140.988 140.5,143.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 271,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 270,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#4c1f83",
                    d: "M 187.5,141.5 C 188.338,141.842 188.672,142.508 188.5,143.5C 188.666,148.844 188.499,154.177 188,159.5C 186.742,157.236 185.575,154.902 184.5,152.5C 183.702,152.957 183.369,153.624 183.5,154.5C 182.292,155.234 180.959,155.567 179.5,155.5C 179.649,156.552 179.483,157.552 179,158.5C 177.582,156.637 175.749,156.137 173.5,157C 166.351,158.77 159.684,161.603 153.5,165.5C 153.167,166.167 152.833,166.833 152.5,167.5C 153.618,169.571 154.618,171.738 155.5,174C 155.37,175.059 154.87,175.892 154,176.5C 152.401,173.848 150.901,171.182 149.5,168.5C 150.089,163.519 150.589,158.519 151,153.5C 152.748,155.135 153.915,157.135 154.5,159.5C 157.044,158.265 157.044,157.099 154.5,156C 155.103,154.175 155.77,152.341 156.5,150.5C 162.62,148.143 168.954,146.809 175.5,146.5C 175.119,144.058 175.786,143.391 177.5,144.5C 178.862,142.988 179.196,141.488 178.5,140C 179.944,139.219 181.277,139.386 182.5,140.5C 181.256,142.133 181.756,143.133 184,143.5C 185.077,142.571 186.244,141.904 187.5,141.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 280,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 279,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.525
                    },
                    fill: "#9276af",
                    d: "M 146.5,151.5 C 147.79,152.058 148.623,153.058 149,154.5C 149.696,158.905 149.363,163.239 148,167.5C 147.617,168.056 147.117,168.389 146.5,168.5C 147.833,162.833 147.833,157.167 146.5,151.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 289,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 288,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.675
                    },
                    fill: "#855f9f",
                    d: "M 105.5,155.5 C 105.19,158.713 105.523,161.713 106.5,164.5C 107.363,166.421 108.029,168.421 108.5,170.5C 106.441,168.74 105.108,166.406 104.5,163.5C 104.194,160.615 104.527,157.948 105.5,155.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 298,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 297,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.239
                    },
                    fill: "#aa9ac5",
                    d: "M 190.5,147.5 C 193.167,155.833 193.167,164.167 190.5,172.5C 190.5,164.167 190.5,155.833 190.5,147.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 307,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 306,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.376
                    },
                    fill: "#b69fd5",
                    d: "M 108.5,170.5 C 109.906,170.973 110.573,171.973 110.5,173.5C 109.094,173.027 108.427,172.027 108.5,170.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 316,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 315,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.31
                    },
                    fill: "#a48bc4",
                    d: "M 146.5,168.5 C 146.771,170.38 146.104,171.713 144.5,172.5C 144.66,170.847 145.326,169.514 146.5,168.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 325,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 324,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#421e7f",
                    d: "M 183.5,154.5 C 183.5,159.5 183.5,164.5 183.5,169.5C 182.167,169.5 180.833,169.5 179.5,169.5C 179.179,167.952 178.179,167.285 176.5,167.5C 176.709,169.714 175.876,171.381 174,172.5C 172.018,172.99 170.351,173.99 169,175.5C 168.667,175.167 168.333,174.833 168,174.5C 166.167,175.667 164.667,177.167 163.5,179C 158.916,180.778 154.749,183.278 151,186.5C 151,185.167 151,183.833 151,182.5C 148.219,182.895 146.053,184.228 144.5,186.5C 142.775,187.015 141.108,187.682 139.5,188.5C 141.092,190.225 140.758,191.225 138.5,191.5C 137.448,191.649 136.448,191.483 135.5,191C 138.237,189.388 139.07,187.222 138,184.5C 139.403,182.802 141.236,182.302 143.5,183C 141.561,182.092 140.561,180.592 140.5,178.5C 140.5,177.833 140.833,177.5 141.5,177.5C 143.017,177.489 144.184,176.823 145,175.5C 146.788,173.24 148.288,170.907 149.5,168.5C 150.901,171.182 152.401,173.848 154,176.5C 154.87,175.892 155.37,175.059 155.5,174C 154.618,171.738 153.618,169.571 152.5,167.5C 152.833,166.833 153.167,166.167 153.5,165.5C 159.684,161.603 166.351,158.77 173.5,157C 175.749,156.137 177.582,156.637 179,158.5C 179.483,157.552 179.649,156.552 179.5,155.5C 180.959,155.567 182.292,155.234 183.5,154.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 334,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 333,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#3b1e7d",
                    d: "M 179.5,169.5 C 179.577,170.75 180.244,171.583 181.5,172C 181.216,173.956 181.216,176.123 181.5,178.5C 180.167,178.5 178.833,178.5 177.5,178.5C 177.743,184.837 176.576,185.504 174,180.5C 172.414,181.376 170.914,182.376 169.5,183.5C 168.232,182.572 166.899,182.405 165.5,183C 162.139,185.923 158.805,188.756 155.5,191.5C 153.391,192.391 151.391,193.558 149.5,195C 150.308,195.308 150.975,195.808 151.5,196.5C 147.692,198.474 144.692,201.308 142.5,205C 144.513,205.68 145.846,207.013 146.5,209C 145.044,210.797 143.544,212.631 142,214.5C 139.754,214.898 137.587,214.231 135.5,212.5C 136.522,211.646 137.355,210.646 138,209.5C 139.973,210.598 142.14,210.431 144.5,209C 141.953,205.956 139.119,205.789 136,208.5C 133.936,207.409 131.769,207.242 129.5,208C 125.363,209.902 121.363,212.069 117.5,214.5C 116.264,213.754 114.93,213.421 113.5,213.5C 113.649,214.552 113.483,215.552 113,216.5C 112.667,216.167 112.333,215.833 112,215.5C 109.997,217.801 108.163,217.801 106.5,215.5C 105.406,216.868 105.74,218.035 107.5,219C 112.864,219.829 118.198,219.663 123.5,218.5C 125.174,215.223 127.674,214.223 131,215.5C 131.494,217.134 131.66,218.801 131.5,220.5C 137.871,219.996 144.205,219.162 150.5,218C 151.973,217.29 152.64,216.124 152.5,214.5C 154.833,214.5 157.167,214.5 159.5,214.5C 155.146,216.868 150.813,219.202 146.5,221.5C 136.251,223.39 125.917,223.89 115.5,223C 108.024,220.754 100.691,218.254 93.5,215.5C 93.0269,214.094 92.0269,213.427 90.5,213.5C 89.7377,211.738 88.4044,210.738 86.5,210.5C 83.7852,207.118 80.7852,204.118 77.5,201.5C 77.6085,199.486 76.9418,197.82 75.5,196.5C 76.8471,197.171 78.0138,197.171 79,196.5C 80.02,197.891 80.8534,199.391 81.5,201C 82.448,201.483 83.448,201.649 84.5,201.5C 84.9485,206.615 87.6152,209.948 92.5,211.5C 94.3724,208.552 96.7057,208.052 99.5,210C 97.5614,210.908 96.5614,212.408 96.5,214.5C 98.8273,214.247 100.827,214.914 102.5,216.5C 102.76,215.095 103.093,213.762 103.5,212.5C 108.663,215.668 109.663,214.668 106.5,209.5C 106.833,209.167 107.167,208.833 107.5,208.5C 113.633,205.122 120.3,202.789 127.5,201.5C 127.917,198.921 127.25,196.754 125.5,195C 126.5,194.5 127.5,194 128.5,193.5C 129.854,195.184 131.521,195.684 133.5,195C 135.183,193.714 136.849,192.547 138.5,191.5C 140.758,191.225 141.092,190.225 139.5,188.5C 141.108,187.682 142.775,187.015 144.5,186.5C 146.053,184.228 148.219,182.895 151,182.5C 151,183.833 151,185.167 151,186.5C 154.749,183.278 158.916,180.778 163.5,179C 164.667,177.167 166.167,175.667 168,174.5C 168.333,174.833 168.667,175.167 169,175.5C 170.351,173.99 172.018,172.99 174,172.5C 175.876,171.381 176.709,169.714 176.5,167.5C 178.179,167.285 179.179,167.952 179.5,169.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 343,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 342,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.329
                    },
                    fill: "#b89ed0",
                    d: "M 63.5,174.5 C 65.0739,176.102 65.7406,178.102 65.5,180.5C 64.2616,178.786 63.595,176.786 63.5,174.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 352,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 351,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#5b2388",
                    d: "M 104.5,163.5 C 105.108,166.406 106.441,168.74 108.5,170.5C 108.427,172.027 109.094,173.027 110.5,173.5C 110.5,174.167 110.5,174.833 110.5,175.5C 111.171,176.847 111.171,178.014 110.5,179C 115.388,179.678 115.721,181.178 111.5,183.5C 105.861,184.66 100.195,185.66 94.5,186.5C 95.0522,188.331 95.0522,189.997 94.5,191.5C 89.1299,190.203 83.7965,190.203 78.5,191.5C 76.853,192.278 75.5196,193.444 74.5,195C 75.056,195.383 75.3893,195.883 75.5,196.5C 74.8333,196.5 74.1667,196.5 73.5,196.5C 72.6618,196.158 72.3284,195.492 72.5,194.5C 71.3944,191.946 70.561,189.279 70,186.5C 68.4059,184.474 66.9059,182.474 65.5,180.5C 65.7406,178.102 65.0739,176.102 63.5,174.5C 63.5,174.167 63.5,173.833 63.5,173.5C 63.5,171.167 63.5,168.833 63.5,166.5C 64.1667,166.5 64.5,166.833 64.5,167.5C 66.596,173.004 68.4294,178.67 70,184.5C 71.0113,185.337 72.1779,185.67 73.5,185.5C 74.7796,176.719 79.7796,171.886 88.5,171C 87.7069,169.915 87.0402,168.748 86.5,167.5C 91.4251,166.259 96.4251,165.593 101.5,165.5C 101.33,162.734 100.664,160.067 99.5,157.5C 99.5984,155.063 100.598,153.063 102.5,151.5C 103.167,155.647 103.834,159.647 104.5,163.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 361,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 360,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.357
                    },
                    fill: "#9c86bc",
                    d: "M 144.5,172.5 C 143.925,174.411 142.925,176.078 141.5,177.5C 140.833,177.5 140.5,177.833 140.5,178.5C 133.418,181.269 126.084,182.102 118.5,181C 115.631,179.404 112.964,177.57 110.5,175.5C 110.5,174.833 110.5,174.167 110.5,173.5C 122.082,183.011 133.415,182.677 144.5,172.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 370,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 369,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#371d7b",
                    d: "M 188.5,143.5 C 189.494,153.319 189.827,163.319 189.5,173.5C 187.883,179.397 185.716,185.063 183,190.5C 181.404,193.369 179.57,196.036 177.5,198.5C 176.041,198.433 174.708,198.766 173.5,199.5C 171.777,198.193 169.943,198.193 168,199.5C 167.667,198.833 167.333,198.167 167,197.5C 166.583,200.422 165.583,203.089 164,205.5C 162.221,204.521 160.555,204.854 159,206.5C 159,204.5 159,202.5 159,200.5C 157.316,202.351 155.483,204.018 153.5,205.5C 152.406,204.132 152.74,202.965 154.5,202C 160.834,198.5 166.834,194.5 172.5,190C 175.173,190.063 175.173,190.729 172.5,192C 173,192.5 173.5,193 174,193.5C 177.978,191.602 177.978,189.269 174,186.5C 168.636,189.344 163.636,192.678 159,196.5C 158.667,194.833 158.333,193.167 158,191.5C 157.023,192.774 156.189,192.774 155.5,191.5C 158.805,188.756 162.139,185.923 165.5,183C 166.899,182.405 168.232,182.572 169.5,183.5C 170.914,182.376 172.414,181.376 174,180.5C 176.576,185.504 177.743,184.837 177.5,178.5C 178.833,178.5 180.167,178.5 181.5,178.5C 181.216,176.123 181.216,173.956 181.5,172C 180.244,171.583 179.577,170.75 179.5,169.5C 180.833,169.5 182.167,169.5 183.5,169.5C 183.5,164.5 183.5,159.5 183.5,154.5C 183.369,153.624 183.702,152.957 184.5,152.5C 185.575,154.902 186.742,157.236 188,159.5C 188.499,154.177 188.666,148.844 188.5,143.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 379,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 378,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#361c7e",
                    d: "M 173.5,199.5 C 171.537,201.399 170.037,203.733 169,206.5C 165.464,207.577 163.298,209.91 162.5,213.5C 161.391,213.557 160.391,213.89 159.5,214.5C 157.167,214.5 154.833,214.5 152.5,214.5C 152.64,216.124 151.973,217.29 150.5,218C 144.205,219.162 137.871,219.996 131.5,220.5C 131.66,218.801 131.494,217.134 131,215.5C 127.674,214.223 125.174,215.223 123.5,218.5C 118.198,219.663 112.864,219.829 107.5,219C 105.74,218.035 105.406,216.868 106.5,215.5C 108.163,217.801 109.997,217.801 112,215.5C 112.333,215.833 112.667,216.167 113,216.5C 113.483,215.552 113.649,214.552 113.5,213.5C 114.93,213.421 116.264,213.754 117.5,214.5C 121.363,212.069 125.363,209.902 129.5,208C 131.769,207.242 133.936,207.409 136,208.5C 139.119,205.789 141.953,205.956 144.5,209C 142.14,210.431 139.973,210.598 138,209.5C 137.355,210.646 136.522,211.646 135.5,212.5C 137.587,214.231 139.754,214.898 142,214.5C 143.544,212.631 145.044,210.797 146.5,209C 145.846,207.013 144.513,205.68 142.5,205C 144.692,201.308 147.692,198.474 151.5,196.5C 150.975,195.808 150.308,195.308 149.5,195C 151.391,193.558 153.391,192.391 155.5,191.5C 156.189,192.774 157.023,192.774 158,191.5C 158.333,193.167 158.667,194.833 159,196.5C 163.636,192.678 168.636,189.344 174,186.5C 177.978,189.269 177.978,191.602 174,193.5C 173.5,193 173,192.5 172.5,192C 175.173,190.729 175.173,190.063 172.5,190C 166.834,194.5 160.834,198.5 154.5,202C 152.74,202.965 152.406,204.132 153.5,205.5C 155.483,204.018 157.316,202.351 159,200.5C 159,202.5 159,204.5 159,206.5C 160.555,204.854 162.221,204.521 164,205.5C 165.583,203.089 166.583,200.422 167,197.5C 167.333,198.167 167.667,198.833 168,199.5C 169.943,198.193 171.777,198.193 173.5,199.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 388,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 387,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#431e7f",
                    d: "M 110.5,175.5 C 112.964,177.57 115.631,179.404 118.5,181C 126.084,182.102 133.418,181.269 140.5,178.5C 140.561,180.592 141.561,182.092 143.5,183C 141.236,182.302 139.403,182.802 138,184.5C 139.07,187.222 138.237,189.388 135.5,191C 136.448,191.483 137.448,191.649 138.5,191.5C 136.849,192.547 135.183,193.714 133.5,195C 131.521,195.684 129.854,195.184 128.5,193.5C 127.5,194 126.5,194.5 125.5,195C 127.25,196.754 127.917,198.921 127.5,201.5C 120.3,202.789 113.633,205.122 107.5,208.5C 107.167,208.833 106.833,209.167 106.5,209.5C 109.663,214.668 108.663,215.668 103.5,212.5C 104.355,211.469 105.022,210.303 105.5,209C 103.532,207.342 101.532,205.675 99.5,204C 100.167,203.333 100.833,202.667 101.5,202C 97.5723,201.446 96.239,199.446 97.5,196C 96.09,195.632 95.09,194.799 94.5,193.5C 100.03,191.847 105.697,190.847 111.5,190.5C 110.918,188.002 110.918,185.669 111.5,183.5C 115.721,181.178 115.388,179.678 110.5,179C 111.171,178.014 111.171,176.847 110.5,175.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 397,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 396,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#4d2087",
                    d: "M 111.5,183.5 C 110.918,185.669 110.918,188.002 111.5,190.5C 105.697,190.847 100.03,191.847 94.5,193.5C 95.09,194.799 96.09,195.632 97.5,196C 96.239,199.446 97.5723,201.446 101.5,202C 100.833,202.667 100.167,203.333 99.5,204C 101.532,205.675 103.532,207.342 105.5,209C 105.022,210.303 104.355,211.469 103.5,212.5C 103.093,213.762 102.76,215.095 102.5,216.5C 100.827,214.914 98.8273,214.247 96.5,214.5C 96.5614,212.408 97.5614,210.908 99.5,210C 96.7057,208.052 94.3724,208.552 92.5,211.5C 87.6152,209.948 84.9485,206.615 84.5,201.5C 83.448,201.649 82.448,201.483 81.5,201C 80.8534,199.391 80.02,197.891 79,196.5C 78.0138,197.171 76.8471,197.171 75.5,196.5C 75.3893,195.883 75.056,195.383 74.5,195C 75.5196,193.444 76.853,192.278 78.5,191.5C 83.7965,190.203 89.1299,190.203 94.5,191.5C 95.0522,189.997 95.0522,188.331 94.5,186.5C 100.195,185.66 105.861,184.66 111.5,183.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 406,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 405,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.235
                    },
                    fill: "#a383be",
                    d: "M 65.5,180.5 C 66.9059,182.474 68.4059,184.474 70,186.5C 70.561,189.279 71.3944,191.946 72.5,194.5C 69.1263,190.419 66.793,185.753 65.5,180.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 415,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 414,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.271
                    },
                    fill: "#8879af",
                    d: "M 189.5,173.5 C 189.833,173.5 190.167,173.5 190.5,173.5C 188.796,183.574 184.463,192.241 177.5,199.5C 177.5,199.167 177.5,198.833 177.5,198.5C 179.57,196.036 181.404,193.369 183,190.5C 185.716,185.063 187.883,179.397 189.5,173.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 424,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 423,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.612
                    },
                    fill: "#a081bf",
                    d: "M 73.5,196.5 C 74.1667,196.5 74.8333,196.5 75.5,196.5C 76.9418,197.82 77.6085,199.486 77.5,201.5C 75.9373,200.055 74.604,198.389 73.5,196.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 433,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 432,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 1
                    },
                    fill: "#412c7a",
                    d: "M 177.5,198.5 C 177.5,198.833 177.5,199.167 177.5,199.5C 174.353,201.313 172.353,203.98 171.5,207.5C 169.368,207.554 168.035,208.554 167.5,210.5C 165.368,210.554 164.035,211.554 163.5,213.5C 163.167,213.5 162.833,213.5 162.5,213.5C 163.298,209.91 165.464,207.577 169,206.5C 170.037,203.733 171.537,201.399 173.5,199.5C 174.708,198.766 176.041,198.433 177.5,198.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 442,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 441,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.345
                    },
                    fill: "#ad94c8",
                    d: "M 77.5,201.5 C 80.7852,204.118 83.7852,207.118 86.5,210.5C 82.5216,208.522 79.5216,205.522 77.5,201.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 451,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 450,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.235
                    },
                    fill: "#a496c4",
                    d: "M 177.5,199.5 C 175.878,202.455 173.878,205.122 171.5,207.5C 172.353,203.98 174.353,201.313 177.5,199.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 460,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 459,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.059
                    },
                    fill: "#9f98c1",
                    d: "M 171.5,207.5 C 170.564,208.974 169.23,209.974 167.5,210.5C 168.035,208.554 169.368,207.554 171.5,207.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 469,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 468,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.486
                    },
                    fill: "#9e87be",
                    d: "M 86.5,210.5 C 88.4044,210.738 89.7377,211.738 90.5,213.5C 88.5956,213.262 87.2623,212.262 86.5,210.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 478,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 477,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.404
                    },
                    fill: "#9181b4",
                    d: "M 167.5,210.5 C 166.738,212.262 165.404,213.262 163.5,213.5C 164.035,211.554 165.368,210.554 167.5,210.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 487,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 486,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.239
                    },
                    fill: "#a491c3",
                    d: "M 90.5,213.5 C 92.0269,213.427 93.0269,214.094 93.5,215.5C 91.9731,215.573 90.9731,214.906 90.5,213.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 496,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 495,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.8
                    },
                    fill: "#998bbe",
                    d: "M 93.5,215.5 C 100.691,218.254 108.024,220.754 115.5,223C 125.917,223.89 136.251,223.39 146.5,221.5C 127.972,227.76 110.305,225.76 93.5,215.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 505,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 504,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    style: {
                        opacity: 0.176
                    },
                    fill: "#9487b8",
                    d: "M 162.5,213.5 C 162.833,213.5 163.167,213.5 163.5,213.5C 160.176,216.122 156.51,218.289 152.5,220C 150.564,220.813 148.564,221.313 146.5,221.5C 150.813,219.202 155.146,216.868 159.5,214.5C 160.391,213.89 161.391,213.557 162.5,213.5 Z"
                }, void 0, false, {
                    fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                    lineNumber: 514,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
                lineNumber: 513,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/shared/lockBody.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utility to lock/unlock the document body based on a set of keys.
 * Each key can "lock" the body (e.g., prevent scrolling), and the lock is only released when all keys are removed.
 *
 * @param {string} key - Unique identifier for the lock (e.g., component name or id)
 * @param {'lock'|'unlock'} action - Whether to lock or unlock
 * @param {(locked: boolean) => void} [onLockChange] - Optional callback when lock state changes
 */ __turbopack_context__.s([
    "lockBody",
    ()=>lockBody
]);
const activeLocks = new Set();
function lockBody(key, action, onLockChange) {
    if (action) {
        activeLocks.add(key);
    } else {
        activeLocks.delete(key);
    }
    const shouldLock = activeLocks.size > 0;
    document.body.classList.toggle("overflow-hidden", shouldLock);
    if (onLockChange) onLockChange(shouldLock);
}
}),
"[project]/components/shared/layout/animated-height.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnimatedHeight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cn.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AnimatedHeight({ children, ...attrs }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [height, setHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("auto");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const child = containerRef.current?.children[0];
        const updateHeight = ()=>{
            if (!child) return;
            setHeight(child.clientHeight);
        };
        updateHeight();
        const resizeObserver = new ResizeObserver(updateHeight);
        resizeObserver.observe(child);
        return ()=>resizeObserver.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        ...attrs,
        animate: {
            height,
            ...attrs.animate
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(attrs.className),
        initial: {
            height,
            ...attrs.initial
        },
        ref: containerRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-max",
            children: children
        }, void 0, false, {
            fileName: "[project]/components/shared/layout/animated-height.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/shared/layout/animated-height.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/header/HeaderContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeaderProvider",
    ()=>HeaderProvider,
    "useHeaderContext",
    ()=>useHeaderContext,
    "useHeaderHeight",
    ()=>useHeaderHeight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const HeaderContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const HeaderProvider = ({ children })=>{
    const [dropdownContent, setDropdownContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dropdownKey, setDropdownKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const headerHeight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const headerTop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const timeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const clearDropdown = (force)=>{
        if (force) {
            setDropdownContent(null);
            return;
        }
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = window.setTimeout(()=>{
            setDropdownContent(null);
        }, 500);
    };
    const resetDropdownTimeout = ()=>{
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const header = document.querySelector(".header");
        if (header) {
            const resizeObserver = new ResizeObserver((entries)=>{
                for (const entry of entries){
                    headerHeight.current = entry.contentRect.height;
                }
            });
            resizeObserver.observe(header);
            headerHeight.current = header.clientHeight;
            headerTop.current = header.getBoundingClientRect().top;
            const onScroll = ()=>{
                headerTop.current = header.getBoundingClientRect().top;
            };
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ()=>{
                resizeObserver.disconnect();
                window.removeEventListener("scroll", onScroll);
            };
        }
    }, [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HeaderContext.Provider, {
        value: {
            dropdownContent,
            setDropdownContent: (content)=>{
                resetDropdownTimeout();
                if (content === dropdownContent) return;
                setDropdownKey((prev)=>prev + 1);
                setDropdownContent(content);
            },
            clearDropdown,
            resetDropdownTimeout,
            dropdownKey,
            headerHeight,
            headerTop
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/layout/header/HeaderContext.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const useHeaderContext = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(HeaderContext);
    if (!context) {
        throw new Error("useHeaderContext must be used within a HeaderProvider");
    }
    return context;
};
const useHeaderHeight = ()=>{
    const [headerHeight, setHeaderHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const header = document.querySelector(".header");
        if (header) {
            const resizeObserver = new ResizeObserver((entries)=>{
                for (const entry of entries){
                    setHeaderHeight(entry.contentRect.height);
                }
            });
            resizeObserver.observe(header);
            setHeaderHeight(header.clientHeight);
            return ()=>{
                resizeObserver.disconnect();
            };
        }
    }, []);
    return {
        headerHeight
    };
};
}),
"[project]/components/layout/header/BrandKit/_svg/Download.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Download
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Download() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "20",
        viewBox: "0 0 20 20",
        width: "20",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            className: "group-hover:stroke-heat-100 duration-[200ms] transition-all",
            d: "M12.8334 10.8334L10.4715 13.1953C10.2111 13.4557 9.78904 13.4557 9.52869 13.1953L7.16675 10.8334M10.0001 3.83337V13.1667M14.8334 16.1667H5.16675",
            stroke: "#262626",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.25"
        }, void 0, false, {
            fileName: "[project]/components/layout/header/BrandKit/_svg/Download.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/header/BrandKit/_svg/Download.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/header/BrandKit/_svg/Guidelines.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Guidelines
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Guidelines() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "20",
        viewBox: "0 0 20 20",
        width: "20",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            className: "group-hover:stroke-heat-100 duration-[200ms] transition-all",
            d: "M10.0001 7.16663C10.0001 6.06206 10.8955 5.16663 12.0001 5.16663H15.8334C16.3857 5.16663 16.8334 5.61434 16.8334 6.16663V13.8333C16.8334 14.3856 16.3857 14.8333 15.8334 14.8333H12.1847C11.7311 14.8333 11.2865 14.9427 10.9006 15.1812C10.5148 15.4197 10.2029 15.7609 10.0001 16.1666M10.0001 7.16663C10.0001 6.06206 9.10465 5.16663 8.00008 5.16663H4.16675C3.61446 5.16663 3.16675 5.61434 3.16675 6.16663V13.8333C3.16675 14.3856 3.61446 14.8333 4.16675 14.8333H7.81541C8.26902 14.8333 8.71367 14.9427 9.09953 15.1812C9.48539 15.4197 9.79722 15.7609 10.0001 16.1666M10.0001 7.16663V16.1666",
            stroke: "#262626",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.25"
        }, void 0, false, {
            fileName: "[project]/components/layout/header/BrandKit/_svg/Guidelines.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/header/BrandKit/_svg/Guidelines.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/header/BrandKit/_svg/Icon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Icon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "20",
        viewBox: "0 0 20 20",
        width: "20",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            className: "group-hover:fill-heat-100 duration-[200ms] transition-all",
            d: "M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z",
            fill: "#262626"
        }, void 0, false, {
            fileName: "[project]/components/layout/header/BrandKit/_svg/Icon.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/header/BrandKit/_svg/Icon.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/header/BrandKit/BrandKit.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeaderBrandKit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$copy$2d$to$2d$clipboard$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/copy-to-clipboard/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$firecrawl$2d$icon$2f$firecrawl$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/firecrawl-icon/firecrawl-icon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$HeaderContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/HeaderContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cn.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$BrandKit$2f$_svg$2f$Download$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/BrandKit/_svg/Download.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$BrandKit$2f$_svg$2f$Guidelines$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/BrandKit/_svg/Guidelines.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$BrandKit$2f$_svg$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/BrandKit/_svg/Icon.tsx [app-ssr] (ecmascript)");
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
function HeaderBrandKit() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { dropdownContent, clearDropdown } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$HeaderContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHeaderContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.addEventListener("click", ()=>{
            setOpen(false);
        });
    }, [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dropdownContent) {
            setOpen(false);
        }
    }, [
        dropdownContent
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full flex items-center justify-start relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                className: "flex items-center gap-6 brand-kit-menu",
                href: "/",
                onContextMenu: (e)=>{
                    e.preventDefault();
                    setOpen(!open);
                    if (!open) clearDropdown(true);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$firecrawl$2d$icon$2f$firecrawl$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        className: "size-50 top-7 relative"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold font-sans text-xl tracking-tight text-gray-800 ml-4",
                        children: "Research Workflow"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                initial: false,
                mode: "popLayout",
                children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Menu, {
                    setOpen: setOpen
                }, void 0, false, {
                    fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                    lineNumber: 52,
                    columnNumber: 18
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
const Menu = ({ setOpen })=>{
    const backgroundRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const t = e.target;
        const target = t instanceof HTMLButtonElement ? t : t.closest("button");
        if (backgroundRef.current) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(backgroundRef.current, {
                scale: 0.98,
                opacity: 1
            }).then(()=>{
                if (backgroundRef.current) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(backgroundRef.current, {
                        scale: 1
                    });
                }
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(backgroundRef.current, {
                y: target.offsetTop - 4
            }, {
                ease: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.1, 0.1, 0.25, 1),
                duration: 0.2
            });
        }
    }, []);
    const onMouseLeave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(()=>{
            if (backgroundRef.current) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["animate"])(backgroundRef.current, {
                    scale: 1,
                    opacity: 0
                });
            }
        }, 100);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)"
        },
        className: "absolute w-220 whitespace-nowrap rounded-16 p-4 bg-white left-0 top-[calc(100%+8px)] z-[2000] border border-border-faint",
        exit: {
            opacity: 0,
            y: 8,
            scale: 0.98,
            filter: "blur(1px)"
        },
        initial: {
            opacity: 0,
            y: -6,
            filter: "blur(1px)"
        },
        style: {
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.04)"
        },
        transition: {
            ease: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.1, 0.1, 0.25, 1),
            duration: 0.2
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 opacity-0 z-[2] pointer-events-none inset-x-4 bg-black-alpha-4 rounded-8 h-32",
                ref: backgroundRef
            }, void 0, false, {
                fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                onClick: ()=>{
                    window.open("/", "_blank");
                    setOpen(false);
                },
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-16 h-16",
                        fill: "none",
                        viewBox: "0 0 16 16",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M12 4.5V12.5C12 13.0523 11.5523 13.5 11 13.5H4C3.44772 13.5 3 13.0523 3 12.5V4.5C3 3.94772 3.44772 3.5 4 3.5H7.5M10.5 2.5H13.5M13.5 2.5V5.5M13.5 2.5L8.5 7.5",
                            stroke: "currentColor",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "1.25"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Open in new tab"
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-8 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-1 w-full bg-black-alpha-5"
                }, void 0, false, {
                    fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                onClick: ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$copy$2d$to$2d$clipboard$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(`<svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
    fill="#262626"
  />
</svg>`);
                    setOpen(false);
                },
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$BrandKit$2f$_svg$2f$Icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Copy logo as SVG"
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                onClick: ()=>{
                    setOpen(false);
                },
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$BrandKit$2f$_svg$2f$Download$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Download brand assets"
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-8 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-1 w-full bg-black-alpha-5"
                }, void 0, false, {
                    fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                    lineNumber: 186,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                onClick: ()=>{
                    setOpen(false);
                },
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$BrandKit$2f$_svg$2f$Guidelines$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Visit brand guidelines"
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const Button = (attributes)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ...attributes,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex gap-8 w-full items-center text-label-small group text-accent-black p-6", attributes.className),
        children: attributes.children
    }, void 0, false, {
        fileName: "[project]/components/layout/header/BrandKit/BrandKit.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/layout/header/Wrapper/Wrapper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeaderWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cn.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function HeaderWrapper({ children }) {
    const [shouldShrink, setShouldShrink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const heroContentHeight = document.getElementById("hero-content")?.clientHeight;
        const triggerTop = heroContentHeight ? heroContentHeight : 100;
        const onScroll = ()=>{
            setShouldShrink(window.scrollY > triggerTop);
        };
        onScroll();
        window.addEventListener("scroll", onScroll);
    }, [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("container lg:px-56 px-16 flex justify-between transition-[padding] duration-[200ms] items-center", shouldShrink ? "py-20" : "py-20 lg:py-34"),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/layout/header/Wrapper/Wrapper.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @ts-nocheck
__turbopack_context__.s([
    "default",
    ()=>HeaderDropdownWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$layout$2f$curvy$2d$rect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/layout/curvy-rect.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$HeaderContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header/HeaderContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$lockBody$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/lockBody.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$layout$2f$animated$2d$height$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/layout/animated-height.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function HeaderDropdownWrapper() {
    const { dropdownContent, resetDropdownTimeout, clearDropdown, dropdownKey, headerHeight, headerTop } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2f$HeaderContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useHeaderContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$lockBody$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lockBody"])("header-dropdown", !!dropdownContent);
    }, [
        dropdownContent
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: dropdownContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            animate: {
                opacity: 1
            },
            className: "h-screen w-screen fixed left-0 z-[2000] bg-black-alpha-40",
            exit: {
                opacity: 0,
                transition: {
                    duration: 0.3,
                    delay: 0.1,
                    ease: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.4, 0, 0.2, 1)
                }
            },
            initial: {
                opacity: 0
            },
            style: {
                top: headerTop.current + headerHeight.current + 1
            },
            transition: {
                duration: 0.3,
                ease: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.4, 0, 0.2, 1)
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overlay",
                    onClick: ()=>{
                        if (window.innerWidth < 996) {
                            clearDropdown(true);
                        }
                    },
                    onMouseEnter: ()=>{
                        if (window.innerWidth > 996) {
                            clearDropdown(true);
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$layout$2f$animated$2d$height$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    animate: {
                        transition: {
                            duration: 0.5,
                            ease: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.4, 0, 0.2, 1)
                        }
                    },
                    className: "overflow-clip relative",
                    exit: {
                        height: 0,
                        transition: {
                            duration: 0.3,
                            ease: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.4, 0, 0.2, 1)
                        }
                    },
                    initial: {
                        height: 0
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "popLayout",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "bg-background-base hide-scrollbar relative overflow-x-clip overflow-y-auto",
                            style: {
                                maxHeight: `calc(100vh - ${headerTop.current + headerHeight.current + 1}px)`
                            },
                            onMouseEnter: resetDropdownTimeout,
                            onMouseLeave: ()=>{
                                if (window.innerWidth < 996) return;
                                clearDropdown();
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cmw-[1112px] absolute h-full pointer-events-none top-0 border-x border-border-faint",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$layout$2f$curvy$2d$rect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Connector"], {
                                            className: "absolute -left-[11.5px] -top-11"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
                                            lineNumber: 84,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$layout$2f$curvy$2d$rect$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Connector"], {
                                            className: "absolute -right-[11.5px] -top-11"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
                                            lineNumber: 85,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
                                    lineNumber: 83,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    animate: {
                                        opacity: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        pointerEvents: "none"
                                    },
                                    initial: {
                                        opacity: 0
                                    },
                                    transition: {
                                        duration: 0.3,
                                        ease: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cubicBezier"])(0.4, 0, 0.2, 1)
                                    },
                                    children: dropdownContent
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, dropdownKey, true, {
                            fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
                            lineNumber: 71,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
                        lineNumber: 70,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
                    lineNumber: 59,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
            lineNumber: 28,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/header/Dropdown/Wrapper/Wrapper.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/layout/header/Github/_svg/GithubIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GithubIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function GithubIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        fill: "none",
        height: "20",
        viewBox: "0 0 20 20",
        width: "20",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            clipRule: "evenodd",
            d: "M9.97616 2C5.56555 2 2 5.59184 2 10.0354C2 13.5874 4.28457 16.5941 7.45388 17.6583C7.85012 17.7383 7.99527 17.4854 7.99527 17.2727C7.99527 17.0864 7.9822 16.4478 7.9822 15.7825C5.76343 16.2616 5.30139 14.8247 5.30139 14.8247C4.94482 13.8934 4.41649 13.654 4.41649 13.654C3.69029 13.1618 4.46939 13.1618 4.46939 13.1618C5.27494 13.215 5.69763 13.9866 5.69763 13.9866C6.41061 15.2104 7.55951 14.8647 8.02171 14.6518C8.08767 14.1329 8.2991 13.7737 8.52359 13.5742C6.75396 13.3879 4.89208 12.6962 4.89208 9.60963C4.89208 8.73159 5.20882 8.01322 5.71069 7.45453C5.63151 7.25502 5.35412 6.43004 5.79004 5.32588C5.79004 5.32588 6.46351 5.11298 7.98204 6.15069C8.63218 5.9748 9.30265 5.88532 9.97616 5.88457C10.6496 5.88457 11.3362 5.9778 11.9701 6.15069C13.4888 5.11298 14.1623 5.32588 14.1623 5.32588C14.5982 6.43004 14.3207 7.25502 14.2415 7.45453C14.7566 8.01322 15.0602 8.73159 15.0602 9.60963C15.0602 12.6962 13.1984 13.3745 11.4155 13.5742C11.7061 13.8269 11.9569 14.3058 11.9569 15.0642C11.9569 16.1417 11.9438 17.0065 11.9438 17.2725C11.9438 17.4854 12.0891 17.7383 12.4852 17.6584C15.6545 16.594 17.9391 13.5874 17.9391 10.0354C17.9522 5.59184 14.3736 2 9.97616 2Z",
            fill: "#262626",
            fillOpacity: "0.48",
            fillRule: "evenodd"
        }, void 0, false, {
            fileName: "[project]/components/layout/header/Github/_svg/GithubIcon.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/header/Github/_svg/GithubIcon.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ui/shadcn/tabs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cn.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Tabs = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const TabsList = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["List"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center justify-center gap-4 border-b border-border-faint px-16 text-body-small text-black-alpha-48", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/shadcn/tabs.tsx",
        lineNumber: 14,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TabsList.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["List"].displayName;
const TabsTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-12 py-6 text-body-small text-black-alpha-48 transition-colors data-[state=active]:border-heat-100 data-[state=active]:text-heat-100", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/shadcn/tabs.tsx",
        lineNumber: 29,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TabsTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const TabsContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("mt-8", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/shadcn/tabs.tsx",
        lineNumber: 44,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
TabsContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
;
}),
"[project]/components/ui/shadcn/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cn.ts [app-ssr] (ecmascript)");
;
;
;
;
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ variant = "secondary", size = "large", disabled, isLoading = false, loadingLabel = "Loading…", ...attrs }, ref)=>{
    const isNonInteractive = Boolean(disabled || isLoading);
    // Focus ring adapts to light/dark variants
    const focusRing = variant === "primary" ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white" : "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ...attrs,
        ref: ref,
        type: attrs.type ?? "button",
        "aria-disabled": isNonInteractive || undefined,
        "aria-busy": isLoading || undefined,
        "aria-live": isLoading ? "polite" : undefined,
        "data-state": isLoading ? "loading" : isNonInteractive ? "disabled" : "idle",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(attrs.className, "flex items-center justify-center button relative [&>*]:relative", "text-label-medium lg-max:[&_svg]:size-24", `button-${variant} group/button`, focusRing, // Shared non-interactive styles
        "disabled:cursor-not-allowed", isNonInteractive && "cursor-not-allowed", // Size - default to large as shown in the example
        size === "default" && "rounded-8 px-10 py-6 gap-4", size === "large" && "rounded-10 px-12 py-8 gap-6", // Primary variant (orange/heat)
        variant === "primary" && [
            "text-accent-white",
            // Hover/active only when interactive
            !isNonInteractive && "hover:bg-[color:var(--heat-90)] active:[scale:0.995]",
            // Disabled: dim a bit, no hover, dim overlay bg layer if present
            "disabled:opacity-80",
            "disabled:[&_.button-background]:opacity-70"
        ], // Secondary variant (grey)
        variant === "secondary" && [
            "text-accent-black",
            !isNonInteractive && "active:[scale:0.99] active:bg-black-alpha-7",
            "bg-black-alpha-4",
            !isNonInteractive && "hover:bg-black-alpha-6",
            // Disabled: lighter fill + muted text, no hover
            "disabled:bg-black-alpha-3",
            "disabled:text-black-alpha-48",
            "disabled:hover:bg-black-alpha-3"
        ], // Outline variant
        variant === "outline" && [
            "bg-transparent border border-border-base text-accent-black",
            !isNonInteractive && "hover:bg-black-alpha-2 active:bg-black-alpha-4",
            "disabled:opacity-50"
        ]),
        disabled: isNonInteractive,
        children: [
            variant === "primary" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overlay button-background !absolute"
            }, void 0, false, {
                fileName: "[project]/components/ui/shadcn/button.tsx",
                lineNumber: 94,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-16 h-16 border-2 rounded-full animate-spin", variant === "primary" ? "border-white/30 border-t-white" : "border-black/30 border-t-black"),
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/components/ui/shadcn/button.tsx",
                lineNumber: 99,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: loadingLabel
            }, void 0, false, {
                fileName: "[project]/components/ui/shadcn/button.tsx",
                lineNumber: 111,
                columnNumber: 23
            }, ("TURBOPACK compile-time value", void 0)),
            attrs.children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/shadcn/button.tsx",
        lineNumber: 36,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
const __TURBOPACK__default__export__ = Button;
}),
];

//# sourceMappingURL=components_6ccd92a6._.js.map