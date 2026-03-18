import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getConvexClient } from "@/lib/convex/client";
import { api } from "@/convex/_generated/api";
import crypto from "crypto";

export const dynamic = "force-dynamic";

/**
 * POST /api/mcp/oauth/authorize
 *
 * Initiates the OAuth 2.0 Authorization Code flow for an MCP server.
 * Generates PKCE + state parameters, stores them, and returns the auth URL.
 *
 * Body: { mcpServerId?, authUrl, tokenUrl, clientId, clientSecret?, scopes?, mcpName?, mcpUrl? }
 * Returns: { authUrl: string, state: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const userId = session.user.id;

    const body = await request.json();
    const { mcpServerId, authUrl, tokenUrl, clientId, clientSecret, scopes, mcpName, mcpUrl } = body;

    if (!authUrl || !tokenUrl || !clientId) {
      return NextResponse.json(
        { error: "authUrl, tokenUrl, and clientId are required" },
        { status: 400 }
      );
    }

    // Generate PKCE parameters
    const codeVerifier = crypto.randomBytes(32).toString("base64url");
    const codeChallenge = crypto
      .createHash("sha256")
      .update(codeVerifier)
      .digest("base64url");

    // Generate random state for CSRF protection
    const state = crypto.randomBytes(32).toString("base64url");

    // Encrypt code_verifier and client_secret before storing
    // We need to call a Convex action for encryption since it requires Node.js runtime
    // But the encryption module is server-side only. Since we're in a Next.js API route,
    // we can import it directly.
    const { encrypt } = await import("@/convex/lib/encryption");
    const encryptedCodeVerifier = encrypt(codeVerifier);
    const encryptedClientSecret = clientSecret ? encrypt(clientSecret) : undefined;

    // Determine redirect URI
    const origin = request.headers.get("origin") || request.headers.get("referer")?.replace(/\/[^/]*$/, "") || "";
    const redirectUri = `${origin}/api/mcp/oauth/callback`;

    // Store state in Convex (10 min TTL)
    const convex = getConvexClient();
    await (convex as any).mutation(api.mcpOAuthStates.createState, {
      state,
      userId,
      mcpServerId: mcpServerId || undefined,
      encryptedCodeVerifier,
      oauthConfig: {
        authUrl,
        tokenUrl,
        clientId,
        encryptedClientSecret,
        scopes,
        redirectUri,
        mcpName,
        mcpUrl,
      },
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    // Build authorization URL
    const authParams = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });
    if (scopes) {
      authParams.set("scope", scopes);
    }

    const fullAuthUrl = `${authUrl}?${authParams.toString()}`;

    return NextResponse.json({
      authUrl: fullAuthUrl,
      state,
      redirectUri,
    });
  } catch (error) {
    console.error("[OAuth Authorize] Error:", error);
    return NextResponse.json(
      { error: "Failed to initiate OAuth flow" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/mcp/oauth/authorize with grant_type=client_credentials
 * For server-to-server OAuth (no user interaction)
 *
 * Body: { mcpServerId, tokenUrl, clientId, clientSecret, scopes?, grantType: "client_credentials" }
 */
