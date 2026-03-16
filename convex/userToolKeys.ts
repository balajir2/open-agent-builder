import { v } from "convex/values";
import { mutation, query, internalQuery, internalMutation, action } from "./_generated/server";
import { internal } from "./_generated/api";

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
 * Get all Tool keys for the authenticated user (metadata only, no decryption)
 */
export const getUserToolKeys = query({
    args: {},
    handler: async (ctx) => {
        const userId = await requireAuth(ctx);

        const keys = await ctx.db
            .query("userToolKeys")
            .withIndex("by_userId", (q: any) => q.eq("userId", userId))
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
 * Delete a user's Tool API key — ownership enforced via auth
 */
export const deleteToolKey = mutation({
    args: {
        id: v.id("userToolKeys"),
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

// Internal query to get encrypted key (called from action — not publicly callable)
export const getEncryptedKey = internalQuery({
    args: {
        userId: v.string(),
        toolId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("userToolKeys")
            .withIndex("by_userTool", (q: any) =>
                q.eq("userId", args.userId).eq("toolId", args.toolId)
            )
            .first();
    },
});

// Internal mutation to upsert Tool key (called from action — not publicly callable)
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
            .withIndex("by_userTool", (q: any) =>
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

// Internal query to get all user keys for a user
export const getAllUserKeys = internalQuery({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("userToolKeys")
            .withIndex("by_userId", (q: any) => q.eq("userId", args.userId))
            .collect();
    },
});

/**
 * Get configured tools status (system + user keys combined)
 * SECURITY: userId derived from auth
 */
export const getConfiguredToolsStatus = action({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity?.subject) {
            throw new Error("Authentication required");
        }
        const userId = identity.subject;

        // Get all user keys via internal query
        const allUserKeys = await ctx.runQuery(internal.userToolKeys.getAllUserKeys, {
            userId,
        });

        const configuredToolIds = new Set<string>();
        const toolSources: Record<string, 'system' | 'user'> = {};

        // Add user-configured tools
        allUserKeys.forEach((key: any) => {
            if (key.isActive) {
                configuredToolIds.add(key.toolId);
                toolSources[key.toolId] = 'user';
            }
        });

        // Check system-level keys
        const systemToolMap: Record<string, string> = {
            'firecrawl': 'FIRECRAWL_API_KEY',
            'tavily-search': 'TAVILY_API_KEY',
            'serper-search': 'SERPER_API_KEY',
            'serpapi-search': 'SERPAPI_API_KEY',
            'scraperapi': 'SCRAPERAPI_API_KEY',
            'browserless': 'BROWSERLESS_API_KEY',
            'gamma-api': 'GAMMA_API_KEY',
            'e2b': 'E2B_API_KEY',
            'arcade': 'ARCADE_API_KEY',
        };

        Object.entries(systemToolMap).forEach(([toolId, envKey]) => {
            if (process.env[envKey] && !configuredToolIds.has(toolId)) {
                configuredToolIds.add(toolId);
                toolSources[toolId] = 'system';
            }
        });

        return {
            configuredToolIds: Array.from(configuredToolIds),
            toolSources,
        };
    },
});
