// convex/http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

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
  handler: httpAction(async (ctx, req: any) => {
    try {
      // Detect multipart form-data first
      const contentTypeHeader =
        (req && req.headers && (req.headers.get?.("content-type") ?? req.headers["content-type"])) ||
        "";

      let blob: any = null;
      let filename = "upload";
      let contentTypeOut = "application/octet-stream";
      let size: number | undefined = undefined;

      if (typeof contentTypeHeader === "string" && contentTypeHeader.startsWith("multipart/form-data")) {
        const form = await (req as any).formData();
        const file = form.get("file") as any | null;
        const maybeName = form.get("filename") as string | null;

        if (!file) {
          return new Response(JSON.stringify({ error: "Missing file field" }), { status: 400, headers: corsHeaders() });
        }

        blob = file;
        if (maybeName) filename = maybeName;
        if ((file as any).name) filename = (file as any).name;
        if ((file as any).size) size = (file as any).size;
        if ((file as any).type) contentTypeOut = (file as any).type;
      } else {
        // Fallback: raw body
        blob = await (req as any).blob();
        const urlFilename = (req as any).url ? new URL((req as any).url).searchParams.get("filename") : null;
        if (urlFilename) filename = urlFilename;
        contentTypeOut = (req as any).headers?.get?.("content-type") || contentTypeOut;
      }

      if (!blob) {
        return new Response(JSON.stringify({ error: "No file provided" }), { status: 400, headers: corsHeaders() });
      }

      // Store in Convex storage
      const storageId = await ctx.storage.store(blob);

      return jsonWithCors({
        storageId,
        originalFilename: filename,
        size,
        contentType: contentTypeOut,
      }, 200);
    } catch (err: any) {
      console.error("uploadFile action error:", err?.stack ?? err);
      return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders() });
    }
  }),
});

export default router;
