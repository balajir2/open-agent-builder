import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { hashString } from "./lib/encryption";

/**
 * API Key Management for Secure Workflow API Access
 */

// List user's API keys (without actual key values)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("apiKeys")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("revokedAt"), undefined))
      .order("desc")
      .collect();
  },
});

// Revoke API key
export const revoke = mutation({
  args: { id: v.id("apiKeys") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const apiKey = await ctx.db.get(args.id);
    if (!apiKey) {
      throw new Error("API key not found");
    }

    if (apiKey.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.id, {
      revokedAt: new Date().toISOString(),
    });

    return { success: true };
  },
});

// Internal mutation to create API key (called from action)
export const createApiKey = internalMutation({
  args: {
    key: v.string(),
    keyPrefix: v.string(),
    userId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("apiKeys", {
      key: args.key,
      keyPrefix: args.keyPrefix,
      userId: args.userId,
      name: args.name,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    });
  },
});

// Internal mutation to verify and update API key (called from action)
export const verifyAndUpdateApiKey = internalMutation({
  args: { keyHash: v.string() },
  handler: async (ctx, args) => {
    const apiKey = await ctx.db
      .query("apiKeys")
      .withIndex("by_key", (q) => q.eq("key", args.keyHash))
      .first();

    if (!apiKey) {
      return { valid: false, error: "Invalid API key" };
    }

    if (apiKey.revokedAt) {
      return { valid: false, error: "API key revoked" };
    }

    if (apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date()) {
      return { valid: false, error: "API key expired" };
    }

    // Update usage stats
    await ctx.db.patch(apiKey._id, {
      lastUsedAt: new Date().toISOString(),
      usageCount: apiKey.usageCount + 1,
    });

    return {
      valid: true,
      userId: apiKey.userId,
    };
  },
});


