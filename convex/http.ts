// convex/http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import uploadFile from "./http/uploadFile";

const router = httpRouter();

const ALLOWED_ORIGIN = "*"; // during dev you can use "*" or "http://localhost:3000". Use strict origin in production.

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
  };
}

// Lightweight helper to return JSON with CORS
function jsonWithCors(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(), "Content-Type": "application/json" },
  });
}

// OPTIONS preflight for the upload route
router.route({
  path: "/http/uploadFile",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }),
});

// POST handler for upload
router.route({
  path: "/http/uploadFile",
  method: "POST",
  handler: uploadFile,
});

export default router;
