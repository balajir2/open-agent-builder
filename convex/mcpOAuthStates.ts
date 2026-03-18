import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * MCP OAuth States - Temporary CSRF/PKCE state during OAuth authorization flow.
 * States are single-use and expire after 10 minutes.
 */

// Create a new OAuth state record
export const createState = mutation({
  args: {
    state: v.string(),
    userId: v.string(),
    mcpServerId: v.optional(v.id("mcpServers")),
    codeVerifier: v.string(),
    oauthConfig: v.any(),
    expiresAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mcpOAuthStates", {
      state: args.state,
      userId: args.userId,
      mcpServerId: args.mcpServerId,
      codeVerifier: args.codeVerifier,
      oauthConfig: args.oauthConfig,
      expiresAt: args.expiresAt,
      createdAt: new Date().toISOString(),
    });
  },
});

// Consume a state record (single-use: find, validate, delete)
export const consumeState = mutation({
  args: {
    state: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("mcpOAuthStates")
      .withIndex("by_state", (q) => q.eq("state", args.state))
      .first();

    if (!record) return null;

    // Delete immediately (single-use)
    await ctx.db.delete(record._id);

    // Check expiration
    if (Date.now() > record.expiresAt) {
      return null;
    }

    return record;
  },
});

// Cleanup expired states (garbage collection)
export const cleanupExpired = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const expired = await ctx.db
      .query("mcpOAuthStates")
      .withIndex("by_expiration", (q) => q.lt("expiresAt", now))
      .collect();

    for (const record of expired) {
      await ctx.db.delete(record._id);
    }
    return expired.length;
  },
});
