// convex/http/uploadFile.ts
import { httpAction } from "../_generated/server";

/**
 * HTTP action to accept a file upload (multipart/form-data or raw body),
 * store it in Convex storage, and return { storageId, originalFilename, size, contentType }.
 *
 * Note: we DO NOT pass `filename` as metadata to ctx.storage.store because the
 * generated ctx.storage types may not accept arbitrary metadata keys.
 * Instead we return the filename in the HTTP response for the client to consume.
 */

// SECURITY FIX: CORS configuration (imported from parent)
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.NEXT_PUBLIC_CONVEX_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
].filter(Boolean) as string[];

function corsHeaders(origin?: string | null) {
  const isAllowed = origin && ALLOWED_ORIGINS.some(allowed => {
    if (allowed === origin) return true;
    if (allowed && origin.includes('.convex.cloud') || origin.includes('.convex.site')) return true;
    return false;
  });

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0] || 'http://localhost:3000',
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Vary": "Origin",
  };
}

export default httpAction(async (ctx, req: any) => {
  const origin = req.headers?.get?.('origin') ?? null;
  try {
    const headers = (req && req.headers) ?? {};
    const getHeader = (k: string) =>
      typeof headers.get === "function" ? headers.get(k) : headers[k?.toLowerCase?.()] ?? null;
    const contentTypeHeader = (getHeader("content-type") || "").toString();

    let blobLike: any = null;
    let filename = "upload";
    let contentTypeOut = "application/octet-stream";
    let size: number | undefined = undefined;

    if (typeof contentTypeHeader === "string" && contentTypeHeader.startsWith("multipart/form-data")) {
      const form = await (req as any).formData();
      const fileField = form.get("file") as any | null;
      const maybeName = form.get("filename") as any | null;

      if (!fileField) {
        return new Response(JSON.stringify({ error: "Missing 'file' field in multipart/form-data" }), {
          status: 400,
          headers: { ...corsHeaders(origin), "Content-Type": "application/json" }
        });
      }

      blobLike = fileField;
      if (maybeName && typeof maybeName === "string") filename = maybeName;
      if ((fileField as any).name) filename = (fileField as any).name;
      if ((fileField as any).size) size = (fileField as any).size;
      if ((fileField as any).type) contentTypeOut = (fileField as any).type;
    } else {
      if (typeof (req as any).arrayBuffer === "function") {
        const arr = await (req as any).arrayBuffer();
        blobLike = new Uint8Array(arr);
        size = arr.byteLength;
        const qFilename = (req as any).url ? (() => {
          try {
            return new URL((req as any).url).searchParams.get("filename");
          } catch { return null; }
        })() : null;
        if (qFilename) filename = qFilename;
        contentTypeOut = getHeader("content-type") || contentTypeOut;
      } else if (typeof (req as any).blob === "function") {
        blobLike = await (req as any).blob();
        if ((blobLike as any).size) size = (blobLike as any).size;
        if ((blobLike as any).type) contentTypeOut = (blobLike as any).type;
      } else {
        return new Response(JSON.stringify({ error: "Unsupported request body type; cannot read file" }), {
          status: 400,
          headers: { ...corsHeaders(origin), "Content-Type": "application/json" }
        });
      }
    }

    if (!blobLike) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" }
      });
    }

    // ---- IMPORTANT: do NOT pass unknown metadata object here (TypeScript error) ----
    // const storageId = await ctx.storage.store(blobLike, { filename }); // <-- causes TS error
    // Instead, store only the blob and return filename in the response
    const storageId = await ctx.storage.store(blobLike);

    return new Response(JSON.stringify({
      storageId,
      originalFilename: filename,
      size,
      contentType: contentTypeOut,
    }), {
      status: 200,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" }
    });
  } catch (err: any) {
    console.error("uploadFile action error:", err?.stack ?? err);
    return new Response(JSON.stringify({ error: String(err) || "Upload failed" }), {
      status: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" }
    });
  }
});
