import { v } from "convex/values";
import { mutation, query, internalQuery, internalMutation } from "./_generated/server";

/**
 * Get all Tool keys for a user (metadata only, no decryption)
 */
export const getUserToolKeys = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const keys = await ctx.db
            .query("userToolKeys")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .collect();

        // Don't return the actual encrypted keys, just metadata
        return keys.map(key => ({
            _id: key._id,
            toolId: key.toolId,
            keyPrefix: key.keyPrefix,
            isActive: key.isActive,
            createdAt: key.createdAt,
            updatedAt: key.updatedAt,
        }));
    },
});

/**
 * Delete a user's Tool API key
 */
export const deleteToolKey = mutation({
    args: {
        id: v.id("userToolKeys"),
        userId: v.string(), // For authorization
    },
    handler: async (ctx, args) => {
        const key = await ctx.db.get(args.id);

        if (!key || key.userId !== args.userId) {
            throw new Error("Key not found or unauthorized");
        }

        await ctx.db.delete(args.id);
    },
});

// Internal query to get encrypted key (called from action)
export const getEncryptedKey = internalQuery({
    args: {
        userId: v.string(),
        toolId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("userToolKeys")
            .withIndex("by_userTool", (q) =>
                q.eq("userId", args.userId).eq("toolId", args.toolId)
            )
            .first();
    },
});

// Internal mutation to upsert Tool key (called from action)
export const upsertKey = internalMutation({
    args: {
        userId: v.string(),
        toolId: v.string(),
        encryptedKey: v.string(),
        keyPrefix: v.string(),
    },
    handler: async (ctx, args) => {
        const now = new Date().toISOString();

        // Check if user already has a key for this tool
        const existingKey = await ctx.db
            .query("userToolKeys")
            .withIndex("by_userTool", (q) =>
                q.eq("userId", args.userId).eq("toolId", args.toolId)
            )
            .first();

        if (existingKey) {
            // Update existing key
            await ctx.db.patch(existingKey._id, {
                encryptedKey: args.encryptedKey,
                keyPrefix: args.keyPrefix,
                isActive: true,
                updatedAt: now,
            });
            return existingKey._id;
        } else {
            // Create new key
            const id = await ctx.db.insert("userToolKeys", {
                userId: args.userId,
                toolId: args.toolId,
                encryptedKey: args.encryptedKey,
                keyPrefix: args.keyPrefix,
                isActive: true,
                createdAt: now,
                updatedAt: now,
            });
            return id;
        }
    },
});
