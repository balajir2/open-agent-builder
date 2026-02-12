import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Save a checkpoint to the database.
 */
export const saveCheckpoint = mutation({
    args: {
        threadId: v.string(),
        checkpoint: v.any(),
        metadata: v.any(),
        parentConfig: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const { threadId, checkpoint, metadata, parentConfig } = args;

        const checkpointId = checkpoint.id;

        // Store the checkpoint
        const id = await ctx.db.insert("checkpoints", {
            threadId,
            checkpointId,
            checkpoint,
            metadata,
            parentConfig,
            createdAt: new Date().toISOString(),
        });

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
