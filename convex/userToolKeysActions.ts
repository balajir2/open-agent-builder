"use node";

/**
 * Convex actions for managing user Tool API keys with encryption
 *
 * SECURITY: All public actions derive userId from ctx.auth.
 * Decryption only returns keys for the authenticated user.
 */

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { encrypt, decrypt, maskKey } from "./lib/encryption";

/**
 * Get active key for a specific tool (with decryption)
 * SECURITY: userId derived from auth — cannot read another user's keys
 */
export const getActiveKey = action({
    args: {
        toolId: v.string(),
    },
    handler: async (ctx, args): Promise<{ _id: any; toolId: string; apiKey: string } | null> => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity?.subject) {
            throw new Error("Authentication required");
        }
        const userId = identity.subject;

        const key: any = await ctx.runQuery(internal.userToolKeys.getEncryptedKey, {
            userId,
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
 * SECURITY: userId derived from auth — cannot write to another user's keys
 */
export const upsertToolKey = action({
    args: {
        toolId: v.string(),
        apiKey: v.string(),
    },
    handler: async (ctx, args): Promise<any> => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity?.subject) {
            throw new Error("Authentication required");
        }
        const userId = identity.subject;

        const encryptedKey = encrypt(args.apiKey);
        const keyPrefix = maskKey(args.apiKey);

        return await ctx.runMutation(internal.userToolKeys.upsertKey, {
            userId,
            toolId: args.toolId,
            encryptedKey,
            keyPrefix,
        });
    },
});
