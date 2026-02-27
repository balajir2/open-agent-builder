import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/** Max approximate size (in bytes) for a checkpoint document to avoid Convex 1MB limit */
const MAX_DOC_SIZE = 900_000;

/**
 * Recursively truncate large string values in an object to reduce document size.
 * File objects (with storageId) have content/text replaced with placeholders.
 */
function truncateLargeValues(obj: any, maxStringLen = 500): any {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj === 'string') {
        if (obj.length > maxStringLen) {
            return obj.slice(0, maxStringLen) + `...[truncated, ${obj.length} chars]`;
        }
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => truncateLargeValues(item, maxStringLen));
    }
    if (typeof obj === 'object') {
        if (obj.storageId && (obj.content || obj.text)) {
            return {
                ...obj,
                content: `[truncated for storage, ${(obj.content || '').length} chars]`,
                text: `[truncated for storage, ${(obj.text || '').length} chars]`,
            };
        }
        const result: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = truncateLargeValues(value, maxStringLen);
        }
        return result;
    }
    return obj;
}

/**
 * Save a checkpoint to the database.
 * Automatically truncates large values if the document would exceed Convex size limits.
 */
export const saveCheckpoint = mutation({
    args: {
        threadId: v.string(),
        checkpoint: v.any(),
        metadata: v.any(),
        parentConfig: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        let { threadId, checkpoint, metadata, parentConfig } = args;

        const checkpointId = checkpoint.id;

        // Build the document and check its approximate size
        let doc = {
            threadId,
            checkpointId,
            checkpoint,
            metadata,
            parentConfig,
            createdAt: new Date().toISOString(),
        };

        const approxSize = JSON.stringify(doc).length;
        if (approxSize > MAX_DOC_SIZE) {
            console.warn(
                `[Checkpoints] Document too large (${(approxSize / 1024).toFixed(0)}KB), ` +
                `truncating to fit within ${(MAX_DOC_SIZE / 1024).toFixed(0)}KB limit`
            );
            doc = {
                threadId,
                checkpointId,
                checkpoint: truncateLargeValues(checkpoint),
                metadata: truncateLargeValues(metadata),
                parentConfig: truncateLargeValues(parentConfig),
                createdAt: doc.createdAt,
            };
        }

        const id = await ctx.db.insert("checkpoints", doc);
        return id;
    },
});

/**
 * Save intermediate writes for a checkpoint.
 */
export const saveWrites = mutation({
    args: {
        threadId: v.string(),
        checkpointId: v.string(),
        taskId: v.string(),
        writes: v.array(v.any()), // [channel, value][]
    },
    handler: async (ctx, args) => {
        const { threadId, checkpointId, taskId, writes } = args;

        for (let i = 0; i < writes.length; i++) {
            const [channel, value] = writes[i];
            await ctx.db.insert("checkpoint_writes", {
                threadId,
                checkpointId,
                taskId,
                idx: i,
                channel,
                value,
            });
        }
    },
});

/**
 * Get a specific checkpoint or the latest one for a thread.
 */
export const getCheckpoint = query({
    args: {
        threadId: v.string(),
        checkpointId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { threadId, checkpointId } = args;

        let checkpointDoc;
        if (checkpointId) {
            checkpointDoc = await ctx.db
                .query("checkpoints")
                .withIndex("by_thread", (q) => q.eq("threadId", threadId))
                .filter((q) => q.eq(q.field("checkpointId"), checkpointId))
                .first();
        } else {
            checkpointDoc = await ctx.db
                .query("checkpoints")
                .withIndex("by_thread", (q) => q.eq("threadId", threadId))
                .order("desc")
                .first();
        }

        if (!checkpointDoc) return null;

        // Get pending writes for this checkpoint
        const writes = await ctx.db
            .query("checkpoint_writes")
            .withIndex("by_thread_checkpoint", (q) =>
                q.eq("threadId", threadId).eq("checkpointId", checkpointDoc.checkpointId!)
            )
            .collect();

        const pendingWrites = writes.map((w) => [w.taskId, w.channel, w.value]);

        return {
            ...checkpointDoc,
            pendingWrites,
        };
    },
});

/**
 * List all checkpoints for a thread.
 */
export const listCheckpoints = query({
    args: {
        threadId: v.string(),
    },
    handler: async (ctx, args) => {
        const { threadId } = args;

        return await ctx.db
            .query("checkpoints")
            .withIndex("by_thread", (q) => q.eq("threadId", threadId))
            .order("desc")
            .collect();
    },
});

/**
 * Delete a thread and all its checkpoints and writes.
 */
export const deleteThread = mutation({
    args: {
        threadId: v.string(),
    },
    handler: async (ctx, args) => {
        const { threadId } = args;

        const checkpoints = await ctx.db
            .query("checkpoints")
            .withIndex("by_thread", (q) => q.eq("threadId", threadId))
            .collect();

        const writes = await ctx.db
            .query("checkpoint_writes")
            .withIndex("by_thread_checkpoint", (q) => q.eq("threadId", threadId))
            .collect();

        for (const doc of checkpoints) {
            await ctx.db.delete(doc._id);
        }

        for (const doc of writes) {
            await ctx.db.delete(doc._id);
        }
    },
});
