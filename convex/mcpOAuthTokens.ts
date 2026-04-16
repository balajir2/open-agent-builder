/**
 * MCP OAuth Tokens - Queries and mutations for OAuth token management.
 *
 * SECURITY:
 * - Public queries return metadata only (no secrets)
 * - Ownership enforced via userId from auth context
 * - Encryption/decryption happens in actions (mcpOAuthTokensActions.ts)
 */

import { v } from "convex/values";
import { query, mutation, internalQuery, internalMutation } from "./_generated/server";

// ──────────────────────────────────────────────
// Public Queries (metadata only, no secrets)
// ──────────────────────────────────────────────

// Get OAuth token status for a specific MCP server (no secrets returned)
export const getTokenStatus = query({
  args: {
    mcpServerId: v.id("mcpServers"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) return null;

    const token = await ctx.db
      .query("mcpOAuthTokens")
      .withIndex("by_userServer", (q) =>
        q.eq("userId", identity.subject).eq("mcpServerId", args.mcpServerId)
      )
      .first();

    if (!token) return { status: "not_connected" as const };

    const isExpired = Date.now() > token.expiresAt;
    const hasRefreshToken = !!token.encryptedRefreshToken;

    return {
      status: isExpired ? ("expired" as const) : ("connected" as const),
      expiresAt: token.expiresAt,
      hasRefreshToken,
      scope: token.scope,
      updatedAt: token.updatedAt,
    };
  },
});

// ──────────────────────────────────────────────
// Public Mutations (ownership enforced)
// ──────────────────────────────────────────────

// Disconnect: delete OAuth tokens for a server
export const deleteTokens = mutation({
  args: {
    mcpServerId: v.id("mcpServers"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) throw new Error("Authentication required");

    const token = await ctx.db
      .query("mcpOAuthTokens")
      .withIndex("by_userServer", (q) =>
        q.eq("userId", identity.subject).eq("mcpServerId", args.mcpServerId)
      )
      .first();

    if (token) {
      await ctx.db.delete(token._id);
    }
  },
});

// ──────────────────────────────────────────────
// Internal Queries/Mutations (server-side only)
// ──────────────────────────────────────────────

// Get encrypted tokens for execution path (internal only)
export const getEncryptedTokens = internalQuery({
  args: {
    userId: v.string(),
    mcpServerId: v.id("mcpServers"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("mcpOAuthTokens")
      .withIndex("by_userServer", (q) =>
        q.eq("userId", args.userId).eq("mcpServerId", args.mcpServerId)
      )
      .first();
  },
});

// Get encrypted tokens by mcpServerId only — for shared servers (any user's token)
export const getEncryptedTokensByServer = internalQuery({
  args: {
    mcpServerId: v.id("mcpServers"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("mcpOAuthTokens")
      .withIndex("by_mcpServer", (q) =>
        q.eq("mcpServerId", args.mcpServerId)
      )
      .first();
  },
});

// Store or update encrypted tokens (internal only)
export const storeTokens = internalMutation({
  args: {
    userId: v.string(),
    mcpServerId: v.id("mcpServers"),
    encryptedAccessToken: v.string(),
    encryptedRefreshToken: v.optional(v.string()),
    expiresAt: v.number(),
    tokenType: v.optional(v.string()),
    scope: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("mcpOAuthTokens")
      .withIndex("by_userServer", (q) =>
        q.eq("userId", args.userId).eq("mcpServerId", args.mcpServerId)
      )
      .first();

    const now = new Date().toISOString();

    if (existing) {
      await ctx.db.patch(existing._id, {
        encryptedAccessToken: args.encryptedAccessToken,
        encryptedRefreshToken: args.encryptedRefreshToken ?? existing.encryptedRefreshToken,
        expiresAt: args.expiresAt,
        tokenType: args.tokenType,
        scope: args.scope,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("mcpOAuthTokens", {
      userId: args.userId,
      mcpServerId: args.mcpServerId,
      encryptedAccessToken: args.encryptedAccessToken,
      encryptedRefreshToken: args.encryptedRefreshToken,
      expiresAt: args.expiresAt,
      tokenType: args.tokenType,
      scope: args.scope,
      createdAt: now,
      updatedAt: now,
    });
  },
});
