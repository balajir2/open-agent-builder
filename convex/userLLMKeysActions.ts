"use node";

/**
 * Convex actions for managing user LLM API keys with encryption
 *
 * SECURITY: All public actions derive userId from ctx.auth.
 * Decryption only returns keys for the authenticated user.
 */

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { encrypt, decrypt, maskKey } from "./lib/encryption";

/**
 * Get active key for a specific provider (with decryption)
 * SECURITY: userId derived from auth — cannot read another user's keys
 */
export const getActiveKey = action({
  args: {
    provider: v.string(),
  },
  handler: async (ctx, args): Promise<{ _id: any; provider: string; apiKey: string; label?: string } | null> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) {
      throw new Error("Authentication required");
    }
    const userId = identity.subject;

    const key: any = await ctx.runQuery(internal.userLLMKeys.getEncryptedKey, {
      userId,
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
 * SECURITY: userId derived from auth — cannot write to another user's keys
 */
export const upsertLLMKey = action({
  args: {
    provider: v.string(),
    apiKey: v.string(),
    label: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<any> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) {
      throw new Error("Authentication required");
    }
    const userId = identity.subject;

    const encryptedKey = encrypt(args.apiKey);
    const keyPrefix = maskKey(args.apiKey);

    return await ctx.runMutation(internal.userLLMKeys.upsertKey, {
      userId,
      provider: args.provider,
      encryptedKey,
      keyPrefix,
      label: args.label,
    });
  },
});
