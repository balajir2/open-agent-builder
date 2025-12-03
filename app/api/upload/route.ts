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

    // Forward Convex response directly
    const respJson = await resp.json();  // ← Convex returns proper JSON

    console.log("[/api/upload] ✅ Upload successful, response:", {
      status: resp.status,
      hasStorageId: !!respJson.storageId,
      storageId: respJson.storageId,
      filename: respJson.originalFilename,
      size: respJson.size
    });

    return NextResponse.json(respJson, {
      status: resp.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    console.error("[/api/upload] proxy error:", err);
    return NextResponse.json(
      { error: "Proxy fetch failed", message: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
