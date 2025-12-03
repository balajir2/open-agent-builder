// convex/http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import uploadFile from "./http/uploadFile";

const router = httpRouter();

// SECURITY FIX: Use environment-specific CORS configuration
// Wildcard "*" was a security vulnerability allowing any origin to make requests
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.NEXT_PUBLIC_CONVEX_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
].filter(Boolean) as string[];

function corsHeaders(origin?: string | null) {
  // Check if the origin is allowed
  const isAllowed = origin && ALLOWED_ORIGINS.some(allowed => {
    // Support exact match or wildcard subdomain match
    if (allowed === origin) return true;
    // Allow any Convex subdomain
    if (allowed && origin.includes('.convex.cloud') || origin.includes('.convex.site')) return true;
    return false;
  });

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0] || 'http://localhost:3000',
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Vary": "Origin", // Important: tells caches that response varies by Origin header
  };
}

// Lightweight helper to return JSON with CORS
function jsonWithCors(body: any, status = 200, origin?: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

// OPTIONS preflight for the upload route
router.route({
  path: "/http/uploadFile",
  method: "OPTIONS",
  handler: httpAction(async (ctx, request) => {
    const origin = request.headers.get('origin');
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }),
});

// POST handler for upload
router.route({
  path: "/http/uploadFile",
  method: "POST",
  handler: uploadFile,
});

export default router;
