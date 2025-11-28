"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { generateSecureToken } from "./lib/encryption";
import { hashString } from "./lib/utils";

// Hash function for API keys using SHA-256
async function hashKey(key: string): Promise<string> {
  return await hashString(key);
}

// Generate new API key
export const generate = action({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args): Promise<{ id: any; key: string; keyPrefix: string; name: string }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Generate secure key
    const key = `sk_live_${generateSecureToken(32)}`;
    const keyHash = await hashKey(key);
    const keyPrefix = key.substring(0, 15) + "...";

    const apiKeyId: any = await ctx.runMutation(internal.apiKeys.createApiKey, {
      key: keyHash,
      keyPrefix,
      userId: identity.subject,
      name: args.name,
    });

    // Return plain key ONCE (never shown again!)
    return {
      id: apiKeyId,
      key, // Only time user sees this!
      keyPrefix,
      name: args.name,
    };
  },
});

// Verify API key (called by middleware)
export const verify = action({
  args: { key: v.string() },
  handler: async (ctx, args): Promise<any> => {
    const keyHash = await hashKey(args.key);
    return await ctx.runMutation(internal.apiKeys.verifyAndUpdateApiKey, {
      keyHash,
    });
  },
});
