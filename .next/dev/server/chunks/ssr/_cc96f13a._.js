module.exports = [
"[project]/node_modules/pixi.js/lib/environment-browser/browserAll.mjs [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_ca75c842._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/pixi.js/lib/environment-browser/browserAll.mjs [app-ssr] (ecmascript)");
    });
});
}),
"[project]/node_modules/pixi.js/lib/environment-webworker/webworkerAll.mjs [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_pixi_js_lib_aa59d10c._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/pixi.js/lib/environment-webworker/webworkerAll.mjs [app-ssr] (ecmascript)");
    });
});
}),
"[project]/components/shared/pixi/Pixi.tsx [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_pixi_js_lib_rendering_renderers_4ef04a67._.js",
  "server/chunks/ssr/[root-of-the-server]__c0db50fe._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/components/shared/pixi/Pixi.tsx [app-ssr] (ecmascript)");
    });
});
}),
];