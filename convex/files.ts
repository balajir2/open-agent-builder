import { v } from "convex/values";
import { query } from "./_generated/server";

export const getDownloadUrl = query({
    args: { storageId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    },
});

export const getFileMetadata = query({
    args: { storageId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.storage.getMetadata(args.storageId);
    },
});
