(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/useDebouncedEffect.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useDebouncedEffect",
    ()=>useDebouncedEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const DEFAULT_CONFIG = {
    timeout: 0,
    ignoreInitialCall: true
};
function useDebouncedEffect(callback, config, deps = []) {
    _s();
    let currentConfig;
    if (typeof config === 'object') {
        currentConfig = {
            ...DEFAULT_CONFIG,
            ...config
        };
    } else {
        currentConfig = {
            ...DEFAULT_CONFIG,
            timeout: config
        };
    }
    const { timeout, ignoreInitialCall } = currentConfig;
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        firstTime: true
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDebouncedEffect.useEffect": ()=>{
            const { firstTime } = data.current;
            if (firstTime && ignoreInitialCall) {
                data.current.firstTime = false;
                return;
            }
            let clearFunc;
            const handler = setTimeout({
                "useDebouncedEffect.useEffect.handler": ()=>{
                    clearFunc = callback() ?? undefined;
                }
            }["useDebouncedEffect.useEffect.handler"], timeout);
            return ({
                "useDebouncedEffect.useEffect": ()=>{
                    clearTimeout(handler);
                    if (clearFunc && typeof clearFunc === 'function') {
                        clearFunc();
                    }
                }
            })["useDebouncedEffect.useEffect"];
        }
    }["useDebouncedEffect.useEffect"], [
        callback,
        ignoreInitialCall,
        timeout,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ...deps
    ]);
}
_s(useDebouncedEffect, "fElq841d7zS3Y7P/efoJQwhT/xs=");
const __TURBOPACK__default__export__ = useDebouncedEffect;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/shared/pixi/Pixi.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Pixi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/nanoid/index.browser.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$app$2f$Application$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/app/Application.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebouncedEffect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useDebouncedEffect.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cn.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$pixi$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/pixi/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Pixi({ tickers, onInitialized, onBeforeInitialized, canvasAttrs, initOptions, fps = 60, resolution: resolutionFromParams = 1, smartStop = true }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebouncedEffect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "Pixi.useDebouncedEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const cleanupFunctions = [];
            canvas.style.opacity = "0";
            onBeforeInitialized?.({
                canvas
            });
            const resolution = window.devicePixelRatio || 1;
            const app = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$app$2f$Application$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Application"]();
            cleanupFunctions.push({
                "Pixi.useDebouncedEffect": ()=>{
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$pixi$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDestroyed"])(app)) return;
                    app.destroy({}, {
                        children: true,
                        context: true,
                        style: true
                    });
                    canvas.style.opacity = "0";
                }
            }["Pixi.useDebouncedEffect"]);
            ({
                "Pixi.useDebouncedEffect": async ()=>{
                    await app.init({
                        canvas: canvas,
                        resolution: resolution * resolutionFromParams,
                        width: canvas.clientWidth,
                        height: canvas.clientHeight,
                        antialias: false,
                        hello: false,
                        autoStart: true,
                        sharedTicker: false,
                        clearBeforeRender: true,
                        eventMode: "passive",
                        ...initOptions
                    });
                    let tickerCount = 0;
                    const originalAdd = app.ticker.add;
                    if (fps !== Infinity) {
                        app.ticker.maxFPS = fps;
                    }
                    app.ticker.safeAdd = ({
                        "Pixi.useDebouncedEffect": function(...args) {
                            if (!app.ticker) return undefined;
                            tickerCount += 1;
                            if (tickerCount === 1 && smartStop) startTicker();
                            return originalAdd.apply(app.ticker, args);
                        }
                    })["Pixi.useDebouncedEffect"];
                    const originalRemove = app.ticker.remove;
                    app.ticker.safeRemove = ({
                        "Pixi.useDebouncedEffect": function(...args) {
                            if (!app.ticker) return undefined;
                            tickerCount -= 1;
                            if (tickerCount === 0 && smartStop) stopTicker();
                            return originalRemove.apply(app.ticker, args);
                        }
                    })["Pixi.useDebouncedEffect"];
                    const activeAnimations = [];
                    const startTicker = {
                        "Pixi.useDebouncedEffect.startTicker": ()=>{
                            app.ticker.start();
                            activeAnimations.forEach({
                                "Pixi.useDebouncedEffect.startTicker": (animation)=>{
                                    animation.play();
                                }
                            }["Pixi.useDebouncedEffect.startTicker"]);
                        }
                    }["Pixi.useDebouncedEffect.startTicker"];
                    const stopTicker = {
                        "Pixi.useDebouncedEffect.stopTicker": ()=>{
                            app.ticker.stop();
                            activeAnimations.forEach({
                                "Pixi.useDebouncedEffect.stopTicker": (animation)=>{
                                    animation.pause();
                                }
                            }["Pixi.useDebouncedEffect.stopTicker"]);
                        }
                    }["Pixi.useDebouncedEffect.stopTicker"];
                    app.animate = ({
                        "Pixi.useDebouncedEffect": (...args)=>{
                            const animation = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"](...args);
                            activeAnimations.push(animation);
                            animation.finished.then({
                                "Pixi.useDebouncedEffect": ()=>{
                                    activeAnimations.splice(activeAnimations.indexOf(animation), 1);
                                }
                            }["Pixi.useDebouncedEffect"]);
                            return animation;
                        }
                    })["Pixi.useDebouncedEffect"];
                    for (const ticker of tickers){
                        ticker({
                            app,
                            canvas
                        });
                    }
                    app.stage.interactive = false;
                    app.stage.cullable = true;
                    app.stage.sortableChildren = false;
                    app.stage.interactiveChildren = false;
                    app.render();
                    setTimeout({
                        "Pixi.useDebouncedEffect": ()=>{
                            onInitialized?.({
                                canvas
                            });
                            canvas.style.opacity = "1";
                        }
                    }["Pixi.useDebouncedEffect"], 100);
                    const observer = new IntersectionObserver({
                        "Pixi.useDebouncedEffect": ([entry])=>{
                            if (entry.isIntersecting) {
                                if (tickerCount !== 0 || !smartStop) startTicker();
                            } else {
                                stopTicker();
                            }
                        }
                    }["Pixi.useDebouncedEffect"]);
                    const resizeObserver = new ResizeObserver({
                        "Pixi.useDebouncedEffect": ()=>{
                            app.renderer.resize(canvas.clientWidth, canvas.clientHeight);
                            app.renderer.render(app.stage);
                        }
                    }["Pixi.useDebouncedEffect"]);
                    observer.observe(canvas);
                    resizeObserver.observe(canvas);
                    cleanupFunctions.push({
                        "Pixi.useDebouncedEffect": ()=>{
                            resizeObserver.disconnect();
                            observer.disconnect();
                        }
                    }["Pixi.useDebouncedEffect"]);
                }
            })["Pixi.useDebouncedEffect"]();
            return ({
                "Pixi.useDebouncedEffect": ()=>{
                    cleanupFunctions.forEach({
                        "Pixi.useDebouncedEffect": (fn)=>fn()
                    }["Pixi.useDebouncedEffect"]);
                }
            })["Pixi.useDebouncedEffect"];
        }
    }["Pixi.useDebouncedEffect"], {
        timeout: 1,
        ignoreInitialCall: false
    }, []);
    const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Pixi.useMemo[key]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$index$2e$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["nanoid"])();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Pixi.useMemo[key]"], [
        tickers
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("canvas", {
        ...canvasAttrs,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(canvasAttrs?.className),
        key: key,
        ref: canvasRef,
        style: {
            ...canvasAttrs?.style,
            opacity: 0
        },
        __source: {
            fileName: "[project]/components/shared/pixi/Pixi.tsx",
            lineNumber: 211,
            columnNumber: 5
        },
        __self: this
    });
}
_s(Pixi, "tKgjJhs0y2TYjcXMgkVpZtFKZZw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useDebouncedEffect$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Pixi;
var _c;
__turbopack_context__.k.register(_c, "Pixi");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/nanoid/url-alphabet/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "urlAlphabet",
    ()=>urlAlphabet
]);
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
}),
"[project]/node_modules/nanoid/index.browser.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/* @ts-self-types="./index.d.ts" */ __turbopack_context__.s([
    "customAlphabet",
    ()=>customAlphabet,
    "customRandom",
    ()=>customRandom,
    "nanoid",
    ()=>nanoid,
    "random",
    ()=>random
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$url$2d$alphabet$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanoid/url-alphabet/index.js [app-client] (ecmascript)");
;
;
let random = (bytes)=>crypto.getRandomValues(new Uint8Array(bytes));
let customRandom = (alphabet, defaultSize, getRandom)=>{
    let mask = (2 << Math.log2(alphabet.length - 1)) - 1;
    let step = -~(1.6 * mask * defaultSize / alphabet.length);
    return (size = defaultSize)=>{
        let id = '';
        while(true){
            let bytes = getRandom(step);
            let j = step | 0;
            while(j--){
                id += alphabet[bytes[j] & mask] || '';
                if (id.length >= size) return id;
            }
        }
    };
};
let customAlphabet = (alphabet, size = 21)=>customRandom(alphabet, size | 0, random);
let nanoid = (size = 21)=>{
    let id = '';
    let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
    while(size--){
        id += __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanoid$2f$url$2d$alphabet$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["urlAlphabet"][bytes[size] & 63];
    }
    return id;
};
}),
"[project]/node_modules/pixi.js/lib/environment/autoDetectEnvironment.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoDetectEnvironment",
    ()=>autoDetectEnvironment,
    "loadEnvironmentExtensions",
    ()=>loadEnvironmentExtensions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/extensions/Extensions.mjs [app-client] (ecmascript)");
;
"use strict";
const environments = [];
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extensions"].handleByNamedList(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtensionType"].Environment, environments);
async function loadEnvironmentExtensions(skip) {
    if (skip) return;
    for(let i = 0; i < environments.length; i++){
        const env = environments[i];
        if (env.value.test()) {
            await env.value.load();
            return;
        }
    }
}
async function autoDetectEnvironment(add) {
    return loadEnvironmentExtensions(!add);
}
;
 //# sourceMappingURL=autoDetectEnvironment.mjs.map
}),
"[project]/node_modules/pixi.js/lib/utils/browser/unsafeEvalSupported.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unsafeEvalSupported",
    ()=>unsafeEvalSupported
]);
"use strict";
let unsafeEval;
function unsafeEvalSupported() {
    if (typeof unsafeEval === "boolean") {
        return unsafeEval;
    }
    try {
        const func = new Function("param1", "param2", "param3", "return param1[param2] === param3;");
        unsafeEval = func({
            a: "b"
        }, "a", "b") === true;
    } catch (_e) {
        unsafeEval = false;
    }
    return unsafeEval;
}
;
 //# sourceMappingURL=unsafeEvalSupported.mjs.map
}),
"[project]/node_modules/pixi.js/lib/rendering/renderers/gl/const.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLEAR",
    ()=>CLEAR
]);
"use strict";
var CLEAR = /* @__PURE__ */ ((CLEAR2)=>{
    CLEAR2[CLEAR2["NONE"] = 0] = "NONE";
    CLEAR2[CLEAR2["COLOR"] = 16384] = "COLOR";
    CLEAR2[CLEAR2["STENCIL"] = 1024] = "STENCIL";
    CLEAR2[CLEAR2["DEPTH"] = 256] = "DEPTH";
    CLEAR2[CLEAR2["COLOR_DEPTH"] = 16640] = "COLOR_DEPTH";
    CLEAR2[CLEAR2["COLOR_STENCIL"] = 17408] = "COLOR_STENCIL";
    CLEAR2[CLEAR2["DEPTH_STENCIL"] = 1280] = "DEPTH_STENCIL";
    CLEAR2[CLEAR2["ALL"] = 17664] = "ALL";
    return CLEAR2;
})(CLEAR || {});
;
 //# sourceMappingURL=const.mjs.map
}),
"[project]/node_modules/pixi.js/lib/rendering/renderers/shared/system/SystemRunner.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SystemRunner",
    ()=>SystemRunner
]);
"use strict";
class SystemRunner {
    /**
   * @param name - The function name that will be executed on the listeners added to this Runner.
   */ constructor(name){
        this.items = [];
        this._name = name;
    }
    /* jsdoc/check-param-names */ /**
   * Dispatch/Broadcast Runner to all listeners added to the queue.
   * @param {...any} params - (optional) parameters to pass to each listener
   */ /* jsdoc/check-param-names */ emit(a0, a1, a2, a3, a4, a5, a6, a7) {
        const { name, items } = this;
        for(let i = 0, len = items.length; i < len; i++){
            items[i][name](a0, a1, a2, a3, a4, a5, a6, a7);
        }
        return this;
    }
    /**
   * Add a listener to the Runner
   *
   * Runners do not need to have scope or functions passed to them.
   * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
   * as the name provided to the Runner when it was created.
   *
   * Eg A listener passed to this Runner will require a 'complete' function.
   *
   * ```ts
   * import { Runner } from 'pixi.js';
   *
   * const complete = new Runner('complete');
   * ```
   *
   * The scope used will be the object itself.
   * @param {any} item - The object that will be listening.
   */ add(item) {
        if (item[this._name]) {
            this.remove(item);
            this.items.push(item);
        }
        return this;
    }
    /**
   * Remove a single listener from the dispatch queue.
   * @param {any} item - The listener that you would like to remove.
   */ remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        return this;
    }
    /**
   * Check to see if the listener is already in the Runner
   * @param {any} item - The listener that you would like to check.
   */ contains(item) {
        return this.items.indexOf(item) !== -1;
    }
    /** Remove all listeners from the Runner */ removeAll() {
        this.items.length = 0;
        return this;
    }
    /** Remove all references, don't use after this. */ destroy() {
        this.removeAll();
        this.items = null;
        this._name = null;
    }
    /**
   * `true` if there are no this Runner contains no listeners
   * @readonly
   */ get empty() {
        return this.items.length === 0;
    }
    /**
   * The name of the runner.
   * @readonly
   */ get name() {
        return this._name;
    }
}
;
 //# sourceMappingURL=SystemRunner.mjs.map
}),
"[project]/node_modules/pixi.js/lib/rendering/renderers/shared/system/AbstractRenderer.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbstractRenderer",
    ()=>AbstractRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$color$2f$Color$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/color/Color.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$environment$2f$autoDetectEnvironment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/environment/autoDetectEnvironment.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$scene$2f$container$2f$Container$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/scene/container/Container.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$browser$2f$unsafeEvalSupported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/utils/browser/unsafeEvalSupported.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$data$2f$uid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/utils/data/uid.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$logging$2f$deprecation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/utils/logging/deprecation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$pool$2f$GlobalResourceRegistry$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/utils/pool/GlobalResourceRegistry.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$gl$2f$const$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/rendering/renderers/gl/const.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$shared$2f$system$2f$SystemRunner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/rendering/renderers/shared/system/SystemRunner.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
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
"use strict";
const defaultRunners = [
    "init",
    "destroy",
    "contextChange",
    "resolutionChange",
    "resetState",
    "renderEnd",
    "renderStart",
    "render",
    "update",
    "postrender",
    "prerender"
];
const _AbstractRenderer = class _AbstractRenderer extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"] {
    /**
   * Set up a system with a collection of SystemClasses and runners.
   * Systems are attached dynamically to this class when added.
   * @param config - the config for the system manager
   */ constructor(config){
        super();
        /** @internal */ this.uid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$data$2f$uid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uid"])("renderer");
        /** @internal */ this.runners = /* @__PURE__ */ Object.create(null);
        /** @internal */ this.renderPipes = /* @__PURE__ */ Object.create(null);
        this._initOptions = {};
        this._systemsHash = /* @__PURE__ */ Object.create(null);
        this.type = config.type;
        this.name = config.name;
        this.config = config;
        const combinedRunners = [
            ...defaultRunners,
            ...this.config.runners ?? []
        ];
        this._addRunners(...combinedRunners);
        this._unsafeEvalCheck();
    }
    /**
   * Initialize the renderer.
   * @param options - The options to use to create the renderer.
   */ async init(options = {}) {
        const skip = options.skipExtensionImports === true ? true : options.manageImports === false;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$environment$2f$autoDetectEnvironment$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadEnvironmentExtensions"])(skip);
        this._addSystems(this.config.systems);
        this._addPipes(this.config.renderPipes, this.config.renderPipeAdaptors);
        for(const systemName in this._systemsHash){
            const system = this._systemsHash[systemName];
            const defaultSystemOptions = system.constructor.defaultOptions;
            options = {
                ...defaultSystemOptions,
                ...options
            };
        }
        options = {
            ..._AbstractRenderer.defaultOptions,
            ...options
        };
        this._roundPixels = options.roundPixels ? 1 : 0;
        for(let i = 0; i < this.runners.init.items.length; i++){
            await this.runners.init.items[i].init(options);
        }
        this._initOptions = options;
    }
    render(args, deprecated) {
        let options = args;
        if (options instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$scene$2f$container$2f$Container$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"]) {
            options = {
                container: options
            };
            if (deprecated) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$logging$2f$deprecation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deprecation"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$logging$2f$deprecation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v8_0_0"], "passing a second argument is deprecated, please use render options instead");
                options.target = deprecated.renderTexture;
            }
        }
        options.target || (options.target = this.view.renderTarget);
        if (options.target === this.view.renderTarget) {
            this._lastObjectRendered = options.container;
            options.clearColor ?? (options.clearColor = this.background.colorRgba);
            options.clear ?? (options.clear = this.background.clearBeforeRender);
        }
        if (options.clearColor) {
            const isRGBAArray = Array.isArray(options.clearColor) && options.clearColor.length === 4;
            options.clearColor = isRGBAArray ? options.clearColor : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$color$2f$Color$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"].shared.setValue(options.clearColor).toArray();
        }
        if (!options.transform) {
            options.container.updateLocalTransform();
            options.transform = options.container.localTransform;
        }
        if (!options.container.visible) {
            return;
        }
        options.container.enableRenderGroup();
        this.runners.prerender.emit(options);
        this.runners.renderStart.emit(options);
        this.runners.render.emit(options);
        this.runners.renderEnd.emit(options);
        this.runners.postrender.emit(options);
    }
    /**
   * Resizes the WebGL view to the specified width and height.
   * @param desiredScreenWidth - The desired width of the screen.
   * @param desiredScreenHeight - The desired height of the screen.
   * @param resolution - The resolution / device pixel ratio of the renderer.
   */ resize(desiredScreenWidth, desiredScreenHeight, resolution) {
        const previousResolution = this.view.resolution;
        this.view.resize(desiredScreenWidth, desiredScreenHeight, resolution);
        this.emit("resize", this.view.screen.width, this.view.screen.height, this.view.resolution);
        if (resolution !== void 0 && resolution !== previousResolution) {
            this.runners.resolutionChange.emit(resolution);
        }
    }
    /**
   * Clears the render target.
   * @param options - The options to use when clearing the render target.
   * @param options.target - The render target to clear.
   * @param options.clearColor - The color to clear with.
   * @param options.clear - The clear mode to use.
   * @advanced
   */ clear(options = {}) {
        const renderer = this;
        options.target || (options.target = renderer.renderTarget.renderTarget);
        options.clearColor || (options.clearColor = this.background.colorRgba);
        options.clear ?? (options.clear = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$gl$2f$const$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CLEAR"].ALL);
        const { clear, clearColor, target } = options;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$color$2f$Color$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"].shared.setValue(clearColor ?? this.background.colorRgba);
        renderer.renderTarget.clear(target, clear, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$color$2f$Color$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"].shared.toArray());
    }
    /** The resolution / device pixel ratio of the renderer. */ get resolution() {
        return this.view.resolution;
    }
    set resolution(value) {
        this.view.resolution = value;
        this.runners.resolutionChange.emit(value);
    }
    /**
   * Same as view.width, actual number of pixels in the canvas by horizontal.
   * @type {number}
   * @readonly
   * @default 800
   */ get width() {
        return this.view.texture.frame.width;
    }
    /**
   * Same as view.height, actual number of pixels in the canvas by vertical.
   * @default 600
   */ get height() {
        return this.view.texture.frame.height;
    }
    // NOTE: this was `view` in v7
    /**
   * The canvas element that everything is drawn to.
   * @type {environment.ICanvas}
   */ get canvas() {
        return this.view.canvas;
    }
    /**
   * the last object rendered by the renderer. Useful for other plugins like interaction managers
   * @readonly
   */ get lastObjectRendered() {
        return this._lastObjectRendered;
    }
    /**
   * Flag if we are rendering to the screen vs renderTexture
   * @readonly
   * @default true
   */ get renderingToScreen() {
        const renderer = this;
        return renderer.renderTarget.renderingToScreen;
    }
    /**
   * Measurements of the screen. (0, 0, screenWidth, screenHeight).
   *
   * Its safe to use as filterArea or hitArea for the whole stage.
   */ get screen() {
        return this.view.screen;
    }
    /**
   * Create a bunch of runners based of a collection of ids
   * @param runnerIds - the runner ids to add
   */ _addRunners(...runnerIds) {
        runnerIds.forEach((runnerId)=>{
            this.runners[runnerId] = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$shared$2f$system$2f$SystemRunner$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SystemRunner"](runnerId);
        });
    }
    _addSystems(systems) {
        let i;
        for(i in systems){
            const val = systems[i];
            this._addSystem(val.value, val.name);
        }
    }
    /**
   * Add a new system to the renderer.
   * @param ClassRef - Class reference
   * @param name - Property name for system, if not specified
   *        will use a static `name` property on the class itself. This
   *        name will be assigned as s property on the Renderer so make
   *        sure it doesn't collide with properties on Renderer.
   * @returns Return instance of renderer
   */ _addSystem(ClassRef, name) {
        const system = new ClassRef(this);
        if (this[name]) {
            throw new Error(`Whoops! The name "${name}" is already in use`);
        }
        this[name] = system;
        this._systemsHash[name] = system;
        for(const i in this.runners){
            this.runners[i].add(system);
        }
        return this;
    }
    _addPipes(pipes, pipeAdaptors) {
        const adaptors = pipeAdaptors.reduce((acc, adaptor)=>{
            acc[adaptor.name] = adaptor.value;
            return acc;
        }, {});
        pipes.forEach((pipe)=>{
            const PipeClass = pipe.value;
            const name = pipe.name;
            const Adaptor = adaptors[name];
            this.renderPipes[name] = new PipeClass(this, Adaptor ? new Adaptor() : null);
            this.runners.destroy.add(this.renderPipes[name]);
        });
    }
    destroy(options = false) {
        this.runners.destroy.items.reverse();
        this.runners.destroy.emit(options);
        if (options === true || typeof options === "object" && options.releaseGlobalResources) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$pool$2f$GlobalResourceRegistry$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlobalResourceRegistry"].release();
        }
        Object.values(this.runners).forEach((runner)=>{
            runner.destroy();
        });
        this._systemsHash = null;
        this.renderPipes = null;
    }
    /**
   * Generate a texture from a container.
   * @param options - options or container target to use when generating the texture
   * @returns a texture
   */ generateTexture(options) {
        return this.textureGenerator.generateTexture(options);
    }
    /**
   * Whether the renderer will round coordinates to whole pixels when rendering.
   * Can be overridden on a per scene item basis.
   */ get roundPixels() {
        return !!this._roundPixels;
    }
    /**
   * Overridable function by `pixi.js/unsafe-eval` to silence
   * throwing an error if platform doesn't support unsafe-evals.
   * @private
   * @ignore
   */ _unsafeEvalCheck() {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$browser$2f$unsafeEvalSupported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unsafeEvalSupported"])()) {
            throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.");
        }
    }
    /**
   * Resets the rendering state of the renderer.
   * This is useful when you want to use the WebGL context directly and need to ensure PixiJS's internal state
   * stays synchronized. When modifying the WebGL context state externally, calling this method before the next Pixi
   * render will reset all internal caches and ensure it executes correctly.
   *
   * This is particularly useful when combining PixiJS with other rendering engines like Three.js:
   * ```js
   * // Reset Three.js state
   * threeRenderer.resetState();
   *
   * // Render a Three.js scene
   * threeRenderer.render(threeScene, threeCamera);
   *
   * // Reset PixiJS state since Three.js modified the WebGL context
   * pixiRenderer.resetState();
   *
   * // Now render Pixi content
   * pixiRenderer.render(pixiScene);
   * ```
   * @advanced
   */ resetState() {
        this.runners.resetState.emit();
    }
};
/** The default options for the renderer. */ _AbstractRenderer.defaultOptions = {
    /**
   * Default resolution / device pixel ratio of the renderer.
   * @default 1
   */ resolution: 1,
    /**
   * Should the `failIfMajorPerformanceCaveat` flag be enabled as a context option used in the `isWebGLSupported`
   * function. If set to true, a WebGL renderer can fail to be created if the browser thinks there could be
   * performance issues when using WebGL.
   *
   * In PixiJS v6 this has changed from true to false by default, to allow WebGL to work in as many
   * scenarios as possible. However, some users may have a poor experience, for example, if a user has a gpu or
   * driver version blacklisted by the
   * browser.
   *
   * If your application requires high performance rendering, you may wish to set this to false.
   * We recommend one of two options if you decide to set this flag to false:
   *
   * 1: Use the Canvas renderer as a fallback in case high performance WebGL is
   *    not supported.
   *
   * 2: Call `isWebGLSupported` (which if found in the utils package) in your code before attempting to create a
   *    PixiJS renderer, and show an error message to the user if the function returns false, explaining that their
   *    device & browser combination does not support high performance WebGL.
   *    This is a much better strategy than trying to create a PixiJS renderer and finding it then fails.
   * @default false
   */ failIfMajorPerformanceCaveat: false,
    /**
   * Should round pixels be forced when rendering?
   * @default false
   */ roundPixels: false
};
let AbstractRenderer = _AbstractRenderer;
;
 //# sourceMappingURL=AbstractRenderer.mjs.map
}),
"[project]/node_modules/pixi.js/lib/utils/browser/isWebGLSupported.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isWebGLSupported",
    ()=>isWebGLSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$environment$2f$adapter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/environment/adapter.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$shared$2f$system$2f$AbstractRenderer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/rendering/renderers/shared/system/AbstractRenderer.mjs [app-client] (ecmascript)");
;
;
"use strict";
let _isWebGLSupported;
function isWebGLSupported(failIfMajorPerformanceCaveat) {
    if (_isWebGLSupported !== void 0) return _isWebGLSupported;
    _isWebGLSupported = (()=>{
        const contextOptions = {
            stencil: true,
            failIfMajorPerformanceCaveat: failIfMajorPerformanceCaveat ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$shared$2f$system$2f$AbstractRenderer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbstractRenderer"].defaultOptions.failIfMajorPerformanceCaveat
        };
        try {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$environment$2f$adapter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAdapter"].get().getWebGLRenderingContext()) {
                return false;
            }
            const canvas = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$environment$2f$adapter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAdapter"].get().createCanvas();
            let gl = canvas.getContext("webgl", contextOptions);
            const success = !!gl?.getContextAttributes()?.stencil;
            if (gl) {
                const loseContext = gl.getExtension("WEBGL_lose_context");
                if (loseContext) {
                    loseContext.loseContext();
                }
            }
            gl = null;
            return success;
        } catch (_e) {
            return false;
        }
    })();
    return _isWebGLSupported;
}
;
 //# sourceMappingURL=isWebGLSupported.mjs.map
}),
"[project]/node_modules/pixi.js/lib/utils/browser/isWebGPUSupported.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isWebGPUSupported",
    ()=>isWebGPUSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$environment$2f$adapter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/environment/adapter.mjs [app-client] (ecmascript)");
;
"use strict";
let _isWebGPUSupported;
async function isWebGPUSupported(options = {}) {
    if (_isWebGPUSupported !== void 0) return _isWebGPUSupported;
    _isWebGPUSupported = await (async ()=>{
        const gpu = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$environment$2f$adapter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMAdapter"].get().getNavigator().gpu;
        if (!gpu) {
            return false;
        }
        try {
            const adapter = await gpu.requestAdapter(options);
            await adapter.requestDevice();
            return true;
        } catch (_e) {
            return false;
        }
    })();
    return _isWebGPUSupported;
}
;
 //# sourceMappingURL=isWebGPUSupported.mjs.map
}),
"[project]/node_modules/pixi.js/lib/rendering/renderers/autoDetectRenderer.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoDetectRenderer",
    ()=>autoDetectRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$browser$2f$isWebGLSupported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/utils/browser/isWebGLSupported.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$browser$2f$isWebGPUSupported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/utils/browser/isWebGPUSupported.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$shared$2f$system$2f$AbstractRenderer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/rendering/renderers/shared/system/AbstractRenderer.mjs [app-client] (ecmascript)");
;
;
;
"use strict";
const renderPriority = [
    "webgl",
    "webgpu",
    "canvas"
];
async function autoDetectRenderer(options) {
    let preferredOrder = [];
    if (options.preference) {
        preferredOrder.push(options.preference);
        renderPriority.forEach((item)=>{
            if (item !== options.preference) {
                preferredOrder.push(item);
            }
        });
    } else {
        preferredOrder = renderPriority.slice();
    }
    let RendererClass;
    let finalOptions = {};
    for(let i = 0; i < preferredOrder.length; i++){
        const rendererType = preferredOrder[i];
        if (rendererType === "webgpu" && await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$browser$2f$isWebGPUSupported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWebGPUSupported"])()) {
            const { WebGPURenderer } = await __turbopack_context__.A("[project]/node_modules/pixi.js/lib/rendering/renderers/gpu/WebGPURenderer.mjs [app-client] (ecmascript, async loader)");
            RendererClass = WebGPURenderer;
            finalOptions = {
                ...options,
                ...options.webgpu
            };
            break;
        } else if (rendererType === "webgl" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$browser$2f$isWebGLSupported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWebGLSupported"])(options.failIfMajorPerformanceCaveat ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$shared$2f$system$2f$AbstractRenderer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbstractRenderer"].defaultOptions.failIfMajorPerformanceCaveat)) {
            const { WebGLRenderer } = await __turbopack_context__.A("[project]/node_modules/pixi.js/lib/rendering/renderers/gl/WebGLRenderer.mjs [app-client] (ecmascript, async loader)");
            RendererClass = WebGLRenderer;
            finalOptions = {
                ...options,
                ...options.webgl
            };
            break;
        } else if (rendererType === "canvas") {
            finalOptions = {
                ...options
            };
            throw new Error("CanvasRenderer is not yet implemented");
        }
    }
    delete finalOptions.webgpu;
    delete finalOptions.webgl;
    if (!RendererClass) {
        throw new Error("No available renderer for the current environment");
    }
    const renderer = new RendererClass();
    await renderer.init(finalOptions);
    return renderer;
}
;
 //# sourceMappingURL=autoDetectRenderer.mjs.map
}),
"[project]/node_modules/pixi.js/lib/utils/const.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DATA_URI",
    ()=>DATA_URI,
    "VERSION",
    ()=>VERSION
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$node_modules$2f$eventemitter3$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/node_modules/eventemitter3/index.mjs [app-client] (ecmascript) <locals>");
;
"use strict";
const DATA_URI = /^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;
const VERSION = "8.14.3";
;
 //# sourceMappingURL=const.mjs.map
}),
"[project]/node_modules/pixi.js/lib/utils/global/globalHooks.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApplicationInitHook",
    ()=>ApplicationInitHook,
    "RendererInitHook",
    ()=>RendererInitHook
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/extensions/Extensions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$const$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/utils/const.mjs [app-client] (ecmascript) <locals>");
;
;
"use strict";
class ApplicationInitHook {
    static init() {
        globalThis.__PIXI_APP_INIT__?.(this, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$const$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["VERSION"]);
    }
    static destroy() {}
}
/** @ignore */ ApplicationInitHook.extension = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtensionType"].Application;
class RendererInitHook {
    constructor(renderer){
        this._renderer = renderer;
    }
    init() {
        globalThis.__PIXI_RENDERER_INIT__?.(this._renderer, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$const$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["VERSION"]);
    }
    destroy() {
        this._renderer = null;
    }
}
/** @ignore */ RendererInitHook.extension = {
    type: [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtensionType"].WebGLSystem,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtensionType"].WebGPUSystem
    ],
    name: "initHook",
    priority: -10
};
;
 //# sourceMappingURL=globalHooks.mjs.map
}),
"[project]/node_modules/pixi.js/lib/app/Application.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Application",
    ()=>Application
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/extensions/Extensions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$autoDetectRenderer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/rendering/renderers/autoDetectRenderer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$scene$2f$container$2f$Container$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/scene/container/Container.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$global$2f$globalHooks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/utils/global/globalHooks.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$logging$2f$deprecation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pixi.js/lib/utils/logging/deprecation.mjs [app-client] (ecmascript)");
;
;
;
;
;
"use strict";
const _Application = class _Application {
    constructor(...args){
        /**
     * The root display container for your application.
     * All visual elements should be added to this container or its children.
     * @example
     * ```js
     * // Create a sprite and add it to the stage
     * const sprite = Sprite.from('image.png');
     * app.stage.addChild(sprite);
     *
     * // Create a container for grouping objects
     * const container = new Container();
     * app.stage.addChild(container);
     * ```
     */ this.stage = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$scene$2f$container$2f$Container$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"]();
        if (args[0] !== void 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$logging$2f$deprecation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deprecation"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$logging$2f$deprecation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v8_0_0"], "Application constructor options are deprecated, please use Application.init() instead.");
        }
    }
    /**
   * Initializes the PixiJS application with the specified options.
   *
   * This method must be called after creating a new Application instance.
   * @param options - Configuration options for the application and renderer
   * @returns A promise that resolves when initialization is complete
   * @example
   * ```js
   * const app = new Application();
   *
   * // Initialize with custom options
   * await app.init({
   *     width: 800,
   *     height: 600,
   *     backgroundColor: 0x1099bb,
   *     preference: 'webgl', // or 'webgpu'
   * });
   * ```
   */ async init(options) {
        options = {
            ...options
        };
        this.stage || (this.stage = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$scene$2f$container$2f$Container$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Container"]());
        this.renderer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$rendering$2f$renderers$2f$autoDetectRenderer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autoDetectRenderer"])(options);
        _Application._plugins.forEach((plugin)=>{
            plugin.init.call(this, options);
        });
    }
    /**
   * Renders the current stage to the screen.
   *
   * When using the default setup with {@link TickerPlugin} (enabled by default), you typically don't need to call
   * this method directly as rendering is handled automatically.
   *
   * Only use this method if you've disabled the {@link TickerPlugin} or need custom
   * render timing control.
   * @example
   * ```js
   * // Example 1: Default setup (TickerPlugin handles rendering)
   * const app = new Application();
   * await app.init();
   * // No need to call render() - TickerPlugin handles it
   *
   * // Example 2: Custom rendering loop (if TickerPlugin is disabled)
   * const app = new Application();
   * await app.init({ autoStart: false }); // Disable automatic rendering
   *
   * function animate() {
   *     app.render();
   *     requestAnimationFrame(animate);
   * }
   * animate();
   * ```
   */ render() {
        this.renderer.render({
            container: this.stage
        });
    }
    /**
   * Reference to the renderer's canvas element. This is the HTML element
   * that displays your application's graphics.
   * @readonly
   * @type {HTMLCanvasElement}
   * @example
   * ```js
   * // Create a new application
   * const app = new Application();
   * // Initialize the application
   * await app.init({...});
   * // Add canvas to the page
   * document.body.appendChild(app.canvas);
   *
   * // Access the canvas directly
   * console.log(app.canvas); // HTMLCanvasElement
   * ```
   */ get canvas() {
        return this.renderer.canvas;
    }
    /**
   * Reference to the renderer's canvas element.
   * @type {HTMLCanvasElement}
   * @deprecated since 8.0.0
   * @see {@link Application#canvas}
   */ get view() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$logging$2f$deprecation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deprecation"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$logging$2f$deprecation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["v8_0_0"], "Application.view is deprecated, please use Application.canvas instead.");
        return this.renderer.canvas;
    }
    /**
   * Reference to the renderer's screen rectangle. This represents the visible area of your application.
   *
   * It's commonly used for:
   * - Setting filter areas for full-screen effects
   * - Defining hit areas for screen-wide interaction
   * - Determining the visible bounds of your application
   * @readonly
   * @example
   * ```js
   * // Use as filter area for a full-screen effect
   * const blurFilter = new BlurFilter();
   * sprite.filterArea = app.screen;
   *
   * // Use as hit area for screen-wide interaction
   * const screenSprite = new Sprite();
   * screenSprite.hitArea = app.screen;
   *
   * // Get screen dimensions
   * console.log(app.screen.width, app.screen.height);
   * ```
   * @see {@link Rectangle} For all available properties and methods
   */ get screen() {
        return this.renderer.screen;
    }
    /**
   * Destroys the application and all of its resources.
   *
   * This method should be called when you want to completely
   * clean up the application and free all associated memory.
   * @param rendererDestroyOptions - Options for destroying the renderer:
   *  - `false` or `undefined`: Preserves the canvas element (default)
   *  - `true`: Removes the canvas element
   *  - `{ removeView: boolean }`: Object with removeView property to control canvas removal
   * @param options - Options for destroying the application:
   *  - `false` or `undefined`: Basic cleanup (default)
   *  - `true`: Complete cleanup including children
   *  - Detailed options object:
   *    - `children`: Remove children
   *    - `texture`: Destroy textures
   *    - `textureSource`: Destroy texture sources
   *    - `context`: Destroy WebGL context
   * @example
   * ```js
   * // Basic cleanup
   * app.destroy();
   *
   * // Remove canvas and do complete cleanup
   * app.destroy(true, true);
   *
   * // Remove canvas with explicit options
   * app.destroy({ removeView: true }, true);
   *
   * // Detailed cleanup with specific options
   * app.destroy(
   *     { removeView: true },
   *     {
   *         children: true,
   *         texture: true,
   *         textureSource: true,
   *         context: true
   *     }
   * );
   * ```
   * > [!WARNING] After calling destroy, the application instance should no longer be used.
   * > All properties will be null and further operations will throw errors.
   */ destroy(rendererDestroyOptions = false, options = false) {
        const plugins = _Application._plugins.slice(0);
        plugins.reverse();
        plugins.forEach((plugin)=>{
            plugin.destroy.call(this);
        });
        this.stage.destroy(options);
        this.stage = null;
        this.renderer.destroy(rendererDestroyOptions);
        this.renderer = null;
    }
};
/**
 * Collection of installed plugins.
 * @internal
 */ _Application._plugins = [];
let Application = _Application;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extensions"].handleByList(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExtensionType"].Application, Application._plugins);
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$extensions$2f$Extensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extensions"].add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pixi$2e$js$2f$lib$2f$utils$2f$global$2f$globalHooks$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApplicationInitHook"]);
;
 //# sourceMappingURL=Application.mjs.map
}),
]);

//# sourceMappingURL=_f65a0e23._.js.map