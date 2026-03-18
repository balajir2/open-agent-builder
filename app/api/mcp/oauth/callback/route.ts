import { NextRequest, NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex/client";
import { api } from "@/convex/_generated/api";

export const dynamic = "force-dynamic";

/**
 * GET /api/mcp/oauth/callback?code=X&state=Y
 *
 * OAuth 2.0 callback handler. The OAuth provider redirects here after user authorization.
 * Exchanges the authorization code for tokens, stores them encrypted, and closes the popup.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Handle OAuth errors from the provider
  if (error) {
    console.error("[OAuth Callback] Provider error:", error, errorDescription);
    return renderPopupResponse({
      success: false,
      error: errorDescription || error,
    });
  }

  if (!code || !state) {
    return renderPopupResponse({
      success: false,
      error: "Missing code or state parameter",
    });
  }

  try {
    const convex = getConvexClient();

    // Consume the state record (single-use, validates CSRF)
    const stateRecord = await (convex as any).mutation(api.mcpOAuthStates.consumeState, {
      state,
    });

    if (!stateRecord) {
      return renderPopupResponse({
        success: false,
        error: "Invalid or expired OAuth state. Please try again.",
      });
    }

    const { userId, mcpServerId, encryptedCodeVerifier, oauthConfig } = stateRecord;

    // Decrypt code_verifier for the token exchange
    const { decrypt } = await import("@/convex/lib/encryption");
    const codeVerifier = decrypt(encryptedCodeVerifier);

    // If no mcpServerId yet (new server), create the MCP server first
    let serverId = mcpServerId;
    if (!serverId && oauthConfig.mcpName && oauthConfig.mcpUrl) {
      // We need an authenticated client for this mutation
      const { getAuthenticatedConvexClient } = await import("@/lib/convex/client");
      try {
        const authClient = await getAuthenticatedConvexClient();
        serverId = await authClient.mutation(api.mcpServers.addMCPServer, {
          name: oauthConfig.mcpName,
          url: oauthConfig.mcpUrl,
          authType: "oauth",
          category: "custom",
          oauthConfig: {
            authUrl: oauthConfig.authUrl,
            tokenUrl: oauthConfig.tokenUrl,
            clientId: oauthConfig.clientId,
            encryptedClientSecret: oauthConfig.encryptedClientSecret,
            scopes: oauthConfig.scopes,
          },
        });
      } catch (err) {
        console.error("[OAuth Callback] Failed to create MCP server:", err);
        return renderPopupResponse({
          success: false,
          error: "Failed to create MCP server record",
        });
      }
    }

    if (!serverId) {
      return renderPopupResponse({
        success: false,
        error: "No MCP server ID available",
      });
    }

    // Exchange code for tokens via Convex action (handles encryption)
    await (convex as any).action(api.mcpOAuthTokensActions.exchangeCodeForTokens, {
      userId,
      mcpServerId: serverId,
      code,
      tokenUrl: oauthConfig.tokenUrl,
      clientId: oauthConfig.clientId,
      encryptedClientSecret: oauthConfig.encryptedClientSecret,
      codeVerifier,
      redirectUri: oauthConfig.redirectUri,
    });

    // Update MCP server connection status
    try {
      const { getAuthenticatedConvexClient } = await import("@/lib/convex/client");
      const authClient = await getAuthenticatedConvexClient();
      await authClient.mutation(api.mcpServers.updateMCPServer, {
        id: serverId,
        connectionStatus: "connected",
        // Store OAuth config on the server if not already there
        oauthConfig: {
          authUrl: oauthConfig.authUrl,
          tokenUrl: oauthConfig.tokenUrl,
          clientId: oauthConfig.clientId,
          encryptedClientSecret: oauthConfig.encryptedClientSecret,
          scopes: oauthConfig.scopes,
        },
      });
    } catch (err) {
      console.warn("[OAuth Callback] Failed to update server status:", err);
    }

    return renderPopupResponse({
      success: true,
      mcpServerId: serverId,
    });
  } catch (error) {
    console.error("[OAuth Callback] Error:", error);
    return renderPopupResponse({
      success: false,
      error: error instanceof Error ? error.message : "Token exchange failed",
    });
  }
}

/**
 * Renders an HTML page that sends a postMessage to the opener and closes the popup.
 */
function renderPopupResponse(data: { success: boolean; mcpServerId?: string; error?: string }) {
  const html = `<!DOCTYPE html>
<html>
<head><title>OAuth ${data.success ? "Success" : "Error"}</title></head>
<body>
  <p>${data.success ? "Connected successfully! This window will close." : `Error: ${data.error}`}</p>
  <script>
    try {
      if (window.opener) {
        window.opener.postMessage(${JSON.stringify({
          type: "mcp-oauth-callback",
          ...data,
        })}, "*");
        setTimeout(() => window.close(), 1000);
      } else {
        document.body.innerHTML += '<p>You can close this window.</p>';
      }
    } catch(e) {
      document.body.innerHTML += '<p>You can close this window.</p>';
    }
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
