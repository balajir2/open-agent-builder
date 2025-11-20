// app/api/upload/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL;
    if (!convexUrl) {
      console.error("[/api/upload] MISSING NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL");
      return NextResponse.json({ error: "Missing NEXT_PUBLIC_CONVEX_UPLOAD_ACTION_URL" }, { status: 500 });
    }

    console.log("[/api/upload] forwarding to:", convexUrl);

    // Read full body (avoid duplex requirement)
    const bodyArrayBuffer = await request.arrayBuffer();

    const headers = new Headers(request.headers);
    headers.delete("host");

    const resp = await fetch(convexUrl, {
      method: "POST",
      headers,
      body: bodyArrayBuffer,
    });

    const respText = await resp.text();
    const respHeaders: Record<string,string> = {};
    resp.headers.forEach((v,k) => { respHeaders[k] = v; });

    console.log("[/api/upload] convex status:", resp.status, "body:", respText.slice(0,2000));
    return NextResponse.json({ status: resp.status, headers: respHeaders, body: respText }, { status: Math.max(200, Math.min(499, resp.status)) });
  } catch (err: any) {
    console.error("[/api/upload] proxy error:", err);
    return NextResponse.json({ error: "Proxy fetch failed", message: String(err?.message ?? err) }, { status: 500 });
  }
}
