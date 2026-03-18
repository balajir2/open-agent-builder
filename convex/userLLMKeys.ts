/**
 * Convex functions for managing user LLM API keys
 * Keys are encrypted and stored per-user
 *
 * SECURITY: All public functions derive userId from ctx.auth.
 * Internal functions accept userId as args (not callable from clients).
 */

import { v } from "convex/values";
import { mutation, query, internalQuery, internalMutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

/**
 * Get the authenticated user's ID or throw.
 */
async function requireAuth(ctx: any): Promise<string> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.subject) {
    throw new Error("Authentication required");
  }
  return identity.subject;
}

/**
 * Get all LLM keys for the authenticated user (metadata only, no decryption)
 */
export const getUserLLMKeys = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) return [];
    const userId = identity.subject;

    const keys = await ctx.db
      .query("userLLMKeys")
      .withIndex("by_userId", (q: any) => q.eq("userId", userId))
      .collect();

    // Don't return the actual encrypted keys, just metadata
    return keys.map(key => ({
      _id: key._id,
      provider: key.provider,
      keyPrefix: key.keyPrefix,
      label: key.label,
      isActive: key.isActive,
      createdAt: key.createdAt,
      updatedAt: key.updatedAt,
      lastUsedAt: key.lastUsedAt,
      usageCount: key.usageCount,
    }));
  },
});

/**
 * Delete a user's LLM API key — ownership enforced via auth
 */
export const deleteLLMKey = mutation({
  args: {
    id: v.id("userLLMKeys"),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const key = await ctx.db.get(args.id);

    if (!key || key.userId !== userId) {
      throw new Error("Key not found or unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});

/**
 * Toggle active state of a key — ownership enforced via auth
 */
export const toggleKeyActive = mutation({
  args: {
    id: v.id("userLLMKeys"),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const key = await ctx.db.get(args.id);

    if (!key || key.userId !== userId) {
      throw new Error("Key not found or unauthorized");
    }

    const now = new Date().toISOString();

    // If activating this key, deactivate others for same provider
    if (!key.isActive) {
      const otherKeys = await ctx.db
        .query("userLLMKeys")
        .withIndex("by_userProvider", (q: any) =>
          q.eq("userId", userId).eq("provider", key.provider)
        )
        .collect();

      for (const otherKey of otherKeys) {
        if (otherKey._id !== args.id && otherKey.isActive) {
          await ctx.db.patch(otherKey._id, {
            isActive: false,
            updatedAt: now,
          });
        }
      }
    }

    await ctx.db.patch(args.id, {
      isActive: !key.isActive,
      updatedAt: now,
    });
  },
});

/**
 * Update usage stats for a key — ownership enforced via auth
 */
export const updateKeyUsage = mutation({
  args: {
    provider: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    const key = await ctx.db
      .query("userLLMKeys")
      .withIndex("by_userProvider", (q: any) =>
        q.eq("userId", userId).eq("provider", args.provider)
      )
      .filter((q: any) => q.eq(q.field("isActive"), true))
      .first();

    if (key) {
      const now = new Date().toISOString();
      await ctx.db.patch(key._id, {
        lastUsedAt: now,
        usageCount: (key.usageCount || 0) + 1,
      });
    }
  },
});

// Internal query to get encrypted key (called from action — not publicly callable)
export const getEncryptedKey = internalQuery({
  args: {
    userId: v.string(),
    provider: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userLLMKeys")
      .withIndex("by_userProvider", (q: any) =>
        q.eq("userId", args.userId).eq("provider", args.provider)
      )
      .filter((q: any) => q.eq(q.field("isActive"), true))
      .first();
  },
});

// Internal mutation to upsert LLM key (called from action — not publicly callable)
export const upsertKey = internalMutation({
  args: {
    userId: v.string(),
    provider: v.string(),
    encryptedKey: v.string(),
    keyPrefix: v.string(),
    label: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();

    // Check if user already has a key for this provider
    const existingKey = await ctx.db
      .query("userLLMKeys")
      .withIndex("by_userProvider", (q: any) =>
        q.eq("userId", args.userId).eq("provider", args.provider)
      )
      .first();

    if (existingKey) {
      // Update existing key
      await ctx.db.patch(existingKey._id, {
        encryptedKey: args.encryptedKey,
        keyPrefix: args.keyPrefix,
        label: args.label || existingKey.label,
        isActive: true,
        updatedAt: now,
      });

      // Deactivate other keys for this provider
      const otherKeys = await ctx.db
        .query("userLLMKeys")
        .withIndex("by_userProvider", (q: any) =>
          q.eq("userId", args.userId).eq("provider", args.provider)
        )
        .collect();

      for (const key of otherKeys) {
        if (key._id !== existingKey._id) {
          await ctx.db.patch(key._id, { isActive: false });
        }
      }

      return existingKey._id;
    } else {
      // Create new key
      const id = await ctx.db.insert("userLLMKeys", {
        userId: args.userId,
        provider: args.provider,
        encryptedKey: args.encryptedKey,
        keyPrefix: args.keyPrefix,
        label: args.label,
        isActive: true,
        createdAt: now,
        updatedAt: now,
        usageCount: 0,
      });

      return id;
    }
  },
});
