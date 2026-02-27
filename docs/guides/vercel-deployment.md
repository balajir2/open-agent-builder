# Vercel Deployment Assessment

## Compatibility Status: ✅ Compatible
The application is built with **Next.js 16** and **Convex**, which is a standard stack for Vercel deployments. However, there are specific configurations required to handle long-running AI agents.

## 1. Core Configuration
*   **Framework:** Next.js (Native support)
*   **Database:** Convex (Managed service, connects via Env Vars)
*   **Build Command:** `npm run build` (Standard)

## 2. Critical Considerations

### ⏳ Serverless Timeouts (Agent Execution)
AI agents often take longer than the default Vercel Serverless Function timeout (10s for Hobby, 60s for Pro).
*   **Risk:** Routes like `/api/execute-agent` and `/api/workflows/[id]/execute` may time out if the agent performs complex reasoning or web searches.
*   **Solution 1 (Config):** Increase `maxDuration` in your route handlers.
    ```typescript
    // app/api/execute-agent/route.ts
    export const maxDuration = 60; // Set to 300 for Pro plan
    ```
*   **Solution 2 (Architecture):** Use the streaming endpoints (`/api/workflows/[id]/execute-stream`) which keep the connection open and avoid hard timeouts.

### 🔑 Environment Variables
You must configure the following in Vercel Project Settings:
*   **Convex:** `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL` (Get these from your Convex dashboard)
*   **LLM Keys:** `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`, etc.
*   **Tool Keys:** `TAVILY_API_KEY`, `BROWSERLESS_API_KEY`, etc.
*   **Auth:** `AUTH_MICROSOFT_ID`, `AUTH_MICROSOFT_SECRET`, `AUTH_MICROSOFT_TENANT_ID`, `AUTH_SECRET`

### 📦 External Packages
The `next.config.js` is already configured to handle external packages like `@langchain/langgraph` and `redis`.
```javascript
serverExternalPackages: [
  '@langchain/langgraph',
  // ...
]
```

## 3. Deployment Steps
1.  **Push to GitHub.**
2.  **Import in Vercel.**
3.  **Configure Environment Variables.**
4.  **Deploy.**
5.  **Convex:** Ensure your Convex production deployment is active (`npx convex deploy`).

## 4. Recommendation
For the best experience, use the **Pro** plan on Vercel to allow for 5-minute timeouts, or strictly use the **Streaming** endpoints for agent execution.
