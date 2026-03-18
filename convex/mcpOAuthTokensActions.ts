"use node";

/**
 * MCP OAuth Token Actions - Server-side actions with encryption/decryption.
 *
 * SECURITY:
 * - All token exchange/refresh happens server-side
 * - Tokens encrypted before storage, decrypted only when needed
 * - Client secrets decrypted only during token requests
 */

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { encrypt, decrypt } from "./lib/encryption";

// Exchange authorization code for tokens and store them (public — called from API route callback)
export const exchangeCodeForTokens = action({
  args: {
    userId: v.string(),
    mcpServerId: v.id("mcpServers"),
    code: v.string(),
    tokenUrl: v.string(),
    clientId: v.string(),
    encryptedClientSecret: v.optional(v.string()),
    codeVerifier: v.string(),
    redirectUri: v.string(),
  },
  handler: async (ctx, args) => {
    const clientSecret = args.encryptedClientSecret
      ? decrypt(args.encryptedClientSecret)
      : undefined;

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: args.code,
      redirect_uri: args.redirectUri,
      client_id: args.clientId,
      code_verifier: args.codeVerifier,
    });
    if (clientSecret) {
      body.set("client_secret", clientSecret);
    }

    const response = await fetch(args.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[OAuth] Token exchange failed:", response.status, errorText);
      throw new Error(`Token exchange failed (${response.status}): ${errorText}`);
    }

    const tokenData = await response.json();

    const encryptedAccessToken = encrypt(tokenData.access_token);
    const encryptedRefreshToken = tokenData.refresh_token
      ? encrypt(tokenData.refresh_token)
      : undefined;

    const expiresIn = tokenData.expires_in || 3600;
    const expiresAt = Date.now() + expiresIn * 1000;

    await ctx.runMutation(internal.mcpOAuthTokens.storeTokens, {
      userId: args.userId,
      mcpServerId: args.mcpServerId,
      encryptedAccessToken,
      encryptedRefreshToken,
      expiresAt,
      tokenType: tokenData.token_type || "Bearer",
      scope: tokenData.scope,
    });

    return { success: true, expiresAt, scope: tokenData.scope };
  },
});

// Refresh an expired access token using refresh_token
export const refreshAccessToken = internalAction({
  args: {
    userId: v.string(),
    mcpServerId: v.id("mcpServers"),
    tokenUrl: v.string(),
    clientId: v.string(),
    encryptedClientSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const tokens: any = await ctx.runQuery(internal.mcpOAuthTokens.getEncryptedTokens, {
      userId: args.userId,
      mcpServerId: args.mcpServerId,
    });

    if (!tokens?.encryptedRefreshToken) {
      throw new Error("No refresh token available");
    }

    const refreshToken = decrypt(tokens.encryptedRefreshToken);
    const clientSecret = args.encryptedClientSecret
      ? decrypt(args.encryptedClientSecret)
      : undefined;

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: args.clientId,
    });
    if (clientSecret) {
      body.set("client_secret", clientSecret);
    }

    const response = await fetch(args.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[OAuth] Token refresh failed:", response.status, errorText);
      throw new Error(`Token refresh failed (${response.status}): ${errorText}`);
    }

    const tokenData = await response.json();

    const encryptedAccessToken = encrypt(tokenData.access_token);
    const encryptedRefreshToken = tokenData.refresh_token
      ? encrypt(tokenData.refresh_token)
      : undefined;

    const expiresIn = tokenData.expires_in || 3600;
    const expiresAt = Date.now() + expiresIn * 1000;

    await ctx.runMutation(internal.mcpOAuthTokens.storeTokens, {
      userId: args.userId,
      mcpServerId: args.mcpServerId,
      encryptedAccessToken,
      encryptedRefreshToken,
      expiresAt,
      tokenType: tokenData.token_type || "Bearer",
      scope: tokenData.scope,
    });

    return {
      accessToken: tokenData.access_token,
      expiresAt,
    };
  },
});

// Get a valid (decrypted) access token, refreshing if needed (public — called from resolver)
// Looks up the server's oauthConfig internally so the caller only needs userId + mcpServerId.
export const getValidAccessToken = action({
  args: {
    userId: v.string(),
    mcpServerId: v.id("mcpServers"),
  },
  handler: async (ctx, args) => {
    const tokens: any = await ctx.runQuery(internal.mcpOAuthTokens.getEncryptedTokens, {
      userId: args.userId,
      mcpServerId: args.mcpServerId,
    });

    if (!tokens) return null;

    // If token still valid (with 5 min buffer), decrypt and return
    const bufferMs = 5 * 60 * 1000;
    if (Date.now() < tokens.expiresAt - bufferMs) {
      return {
        accessToken: decrypt(tokens.encryptedAccessToken),
        expiresAt: tokens.expiresAt,
      };
    }

    // Token expired or near-expiry — look up server config for refresh
    if (tokens.encryptedRefreshToken) {
      const server: any = await ctx.runQuery(internal.mcpServers.getServerInternal, {
        id: args.mcpServerId,
      });

      if (!server?.oauthConfig) {
        console.error("[OAuth] No oauthConfig on server for refresh");
        return null;
      }

      try {
        const refreshed: any = await ctx.runAction(internal.mcpOAuthTokensActions.refreshAccessToken, {
          userId: args.userId,
          mcpServerId: args.mcpServerId,
          tokenUrl: server.oauthConfig.tokenUrl,
          clientId: server.oauthConfig.clientId,
          encryptedClientSecret: server.oauthConfig.encryptedClientSecret,
        });
        return refreshed;
      } catch (err) {
        console.error("[OAuth] Auto-refresh failed:", err);
        return null;
      }
    }

    // No refresh token and access token expired
    return null;
  },
});

// Client Credentials flow: get token without user interaction
export const clientCredentialsGrant = internalAction({
  args: {
    userId: v.string(),
    mcpServerId: v.id("mcpServers"),
    tokenUrl: v.string(),
    clientId: v.string(),
    encryptedClientSecret: v.string(),
    scopes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const clientSecret = decrypt(args.encryptedClientSecret);

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: args.clientId,
      client_secret: clientSecret,
    });
    if (args.scopes) {
      body.set("scope", args.scopes);
    }

    const response = await fetch(args.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Client credentials grant failed (${response.status}): ${errorText}`);
    }

    const tokenData = await response.json();

    const encryptedAccessToken = encrypt(tokenData.access_token);
    const expiresIn = tokenData.expires_in || 3600;
    const expiresAt = Date.now() + expiresIn * 1000;

    await ctx.runMutation(internal.mcpOAuthTokens.storeTokens, {
      userId: args.userId,
      mcpServerId: args.mcpServerId,
      encryptedAccessToken,
      expiresAt,
      tokenType: tokenData.token_type || "Bearer",
      scope: tokenData.scope,
    });

    return { success: true, expiresAt, scope: tokenData.scope };
  },
});
