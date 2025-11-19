"use node";

/**
 * Convex actions for managing user LLM API keys with encryption
 * Keys are encrypted and stored per-user
 */

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { encrypt, decrypt, maskKey } from "./lib/encryption";

/**
 * Get active key for a specific provider (with decryption)
 */
export const getActiveKey = action({
  args: {
    userId: v.string(),
    provider: v.string(),
  },
  handler: async (ctx, args) => {
    const key = await ctx.runQuery(internal.userLLMKeys.getEncryptedKey, {
      userId: args.userId,
      provider: args.provider,
    });

    if (!key) return null;

    // Return decrypted key for use
    return {
      _id: key._id,
      provider: key.provider,
      apiKey: decrypt(key.encryptedKey),
      label: key.label,
    };
  },
});

/**
 * Add or update a user's LLM API key (with encryption)
 */
export const upsertLLMKey = action({
  args: {
    userId: v.string(),
    provider: v.string(),
    apiKey: v.string(),
    label: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const encryptedKey = encrypt(args.apiKey);
    const keyPrefix = maskKey(args.apiKey);

    return await ctx.runMutation(internal.userLLMKeys.upsertKey, {
      userId: args.userId,
      provider: args.provider,
      encryptedKey,
      keyPrefix,
      label: args.label,
    });
  },
});
