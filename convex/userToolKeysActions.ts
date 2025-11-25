"use node";

/**
 * Convex actions for managing user Tool API keys with encryption
 * Keys are encrypted and stored per-user
 */

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { encrypt, decrypt, maskKey } from "./lib/encryption";

/**
 * Get active key for a specific tool (with decryption)
 */
export const getActiveKey = action({
    args: {
        userId: v.string(),
        toolId: v.string(),
    },
    handler: async (ctx, args): Promise<{ _id: any; toolId: string; apiKey: string } | null> => {
        const key: any = await ctx.runQuery(internal.userToolKeys.getEncryptedKey, {
            userId: args.userId,
            toolId: args.toolId,
        });

        if (!key) return null;

        // Return decrypted key for use
        return {
            _id: key._id,
            toolId: key.toolId,
            apiKey: decrypt(key.encryptedKey),
        };
    },
});

/**
 * Add or update a user's Tool API key (with encryption)
 */
export const upsertToolKey = action({
    args: {
        userId: v.string(),
        toolId: v.string(),
        apiKey: v.string(),
    },
    handler: async (ctx, args): Promise<any> => {
        const encryptedKey = encrypt(args.apiKey);
        const keyPrefix = maskKey(args.apiKey);

        return await ctx.runMutation(internal.userToolKeys.upsertKey, {
            userId: args.userId,
            toolId: args.toolId,
            encryptedKey,
            keyPrefix,
        });
    },
});
