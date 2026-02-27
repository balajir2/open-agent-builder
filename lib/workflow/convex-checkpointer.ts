import { BaseCheckpointSaver } from "@langchain/langgraph";
import type {
    Checkpoint,
    CheckpointMetadata,
    CheckpointTuple

} from "@langchain/langgraph";
import { RunnableConfig } from "@langchain/core/runnables";
import { ConvexClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

type ChannelVersion = number | string;
type ChannelVersions = Record<string, ChannelVersion>;
type PendingWriteValue = unknown;
type PendingWrite<Channel = string> = [Channel, PendingWriteValue];

/** Maximum JSON size (in bytes) for a single Convex document. Convex limit is 1MB. */
const MAX_CHECKPOINT_BYTES = 900_000; // 900KB, leave headroom

/** Progressive string truncation limits — tried in order until the data fits */
const TRUNCATION_LEVELS = [500, 200, 100, 50];

/** Max array items to keep at the most aggressive truncation level */
const MAX_ARRAY_ITEMS_AGGRESSIVE = 20;

/**
 * Deep-clone an object and truncate any string values that exceed `maxLen`.
 * File objects (with storageId) have their `content` and `text` fields replaced
 * with a short placeholder so the checkpoint stays within Convex size limits.
 *
 * When `trimArrays` is true, large arrays (>MAX_ARRAY_ITEMS_AGGRESSIVE) are
 * trimmed to keep only the last N items. This handles chatHistory and messages
 * that grow unbounded during long-running workflows.
 */
function truncateStateForCheckpoint(obj: any, maxLen = 500, trimArrays = false): any {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'string') {
        if (obj.length > maxLen) {
            return obj.slice(0, maxLen) + `...[truncated, ${obj.length} chars total]`;
        }
        return obj;
    }

    if (Array.isArray(obj)) {
        let items = obj;
        // Trim large arrays to last N items when in aggressive mode
        if (trimArrays && items.length > MAX_ARRAY_ITEMS_AGGRESSIVE) {
            items = items.slice(-MAX_ARRAY_ITEMS_AGGRESSIVE);
        }
        return items.map(item => truncateStateForCheckpoint(item, maxLen, trimArrays));
    }

    if (typeof obj === 'object') {
        // File objects with storageId: strip extracted content to save space
        if (obj.storageId && (obj.content || obj.text)) {
            return {
                ...obj,
                content: `[file content truncated for checkpoint, ${(obj.content || '').length} chars]`,
                text: `[file text truncated for checkpoint, ${(obj.text || '').length} chars]`,
            };
        }

        const result: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = truncateStateForCheckpoint(value, maxLen, trimArrays);
        }
        return result;
    }

    return obj;
}

/**
 * Ensure a checkpoint payload fits within Convex document size limits.
 * Uses progressive truncation — tries increasingly aggressive string limits
 * (500 → 200 → 100 → 50 chars) and finally trims large arrays if needed.
 */
function fitCheckpointToSizeLimit(checkpoint: any): any {
    const raw = JSON.stringify(checkpoint);
    if (raw.length <= MAX_CHECKPOINT_BYTES) {
        return checkpoint; // fits as-is
    }

    console.warn(
        `[Checkpointer] Checkpoint too large (${(raw.length / 1024).toFixed(0)}KB), ` +
        `truncating to fit within ${(MAX_CHECKPOINT_BYTES / 1024).toFixed(0)}KB limit`
    );

    // Progressive truncation: try increasingly aggressive limits
    for (let i = 0; i < TRUNCATION_LEVELS.length; i++) {
        const limit = TRUNCATION_LEVELS[i];
        const trimArrays = i >= TRUNCATION_LEVELS.length - 1; // trim arrays at most aggressive level
        const truncated = truncateStateForCheckpoint(checkpoint, limit, trimArrays);
        const size = JSON.stringify(truncated).length;

        if (size <= MAX_CHECKPOINT_BYTES) {
            console.warn(
                `[Checkpointer] Truncated at ${limit}-char limit ` +
                `(${(size / 1024).toFixed(0)}KB)${trimArrays ? ' with array trimming' : ''}`
            );
            return truncated;
        }
    }

    // Last resort: most aggressive truncation with array trimming
    const lastResort = truncateStateForCheckpoint(checkpoint, 30, true);
    const lastResortSize = JSON.stringify(lastResort).length;
    console.warn(
        `[Checkpointer] Last-resort truncation at 30-char limit ` +
        `(${(lastResortSize / 1024).toFixed(0)}KB). ` +
        `Checkpoint may be incomplete — workflow resume capability is limited.`
    );
    return lastResort;
}

/**
 * Convex Checkpoint Saver for LangGraph
 *
 * Persists workflow state in Convex to support resumption across requests.
 *
 * Checkpoint save failures are caught and logged as warnings so they don't
 * crash the workflow execution. This is important because large workflows
 * with file contents can exceed Convex's 1MB document size limit.
 */
export class ConvexCheckpointSaver extends BaseCheckpointSaver {
    private client: ConvexClient;

    constructor(convexUrl: string) {
        super();
        this.client = new ConvexClient(convexUrl);
    }

    /**
     * Get a checkpoint for a given configuration.
     */
    async getTuple(config: RunnableConfig): Promise<CheckpointTuple | undefined> {
        const threadId = config.configurable?.thread_id;
        const checkpointId = config.configurable?.checkpoint_id;

        if (!threadId) {
            return undefined;
        }

        try {
            const checkpointDoc = await this.client.query(api.checkpoints.getCheckpoint, {
                threadId,
                checkpointId,
            });

            if (!checkpointDoc) {
                return undefined;
            }

            return {
                config: {
                    configurable: {
                        thread_id: threadId,
                        checkpoint_id: checkpointDoc.checkpointId || checkpointDoc._id,
                    },
                },
                checkpoint: checkpointDoc.checkpoint as Checkpoint,
                metadata: checkpointDoc.metadata as CheckpointMetadata,
                parentConfig: checkpointDoc.parentConfig as RunnableConfig | undefined,
                pendingWrites: checkpointDoc.pendingWrites as any[],
            };
        } catch (error) {
            console.warn('[Checkpointer] Failed to get checkpoint, continuing without:', error);
            return undefined;
        }
    }

    /**
     * List checkpoints for a given configuration.
     */
    async *list(
        config: RunnableConfig,
        options?: Record<string, any>
    ): AsyncGenerator<CheckpointTuple> {
        const threadId = config.configurable?.thread_id;

        if (!threadId) {
            return;
        }

        let checkpoints;
        try {
            checkpoints = await this.client.query(api.checkpoints.listCheckpoints, {
                threadId,
            });
        } catch (error) {
            console.warn('[Checkpointer] Failed to list checkpoints:', error);
            return;
        }

        // Simple limit implementation if needed, but Convex collect() usually handles reasonable amounts
        const limit = options?.limit || checkpoints.length;

        for (const doc of checkpoints.slice(0, limit)) {
            yield {
                config: {
                    configurable: {
                        thread_id: threadId,
                        checkpoint_id: doc.checkpointId || doc._id,
                    },
                },
                checkpoint: doc.checkpoint as Checkpoint,
                metadata: doc.metadata as CheckpointMetadata,
                parentConfig: doc.parentConfig as RunnableConfig | undefined,
            };
        }
    }

    /**
     * Save a checkpoint.
     *
     * Errors are caught and logged as warnings to prevent checkpoint failures
     * from crashing workflow execution. Large state data is automatically
     * truncated to fit within Convex document size limits.
     */
    async put(
        config: RunnableConfig,
        checkpoint: Checkpoint,
        metadata: CheckpointMetadata,
        _newVersions: ChannelVersions
    ): Promise<RunnableConfig> {
        const threadId = config.configurable?.thread_id;

        if (!threadId) {
            throw new Error("thread_id is required to save a checkpoint");
        }

        try {
            // Truncate checkpoint data if it exceeds Convex size limits
            const safeCheckpoint = fitCheckpointToSizeLimit(checkpoint);
            const safeMetadata = fitCheckpointToSizeLimit(metadata);

            await this.client.mutation(api.checkpoints.saveCheckpoint, {
                threadId,
                checkpoint: safeCheckpoint,
                metadata: safeMetadata,
                parentConfig: config.configurable?.parent_config,
            });
        } catch (error) {
            // Log but don't throw — checkpoint save failures should not crash the workflow.
            // The workflow can still complete successfully; only resume capability is affected.
            console.warn(
                `[Checkpointer] Failed to save checkpoint for thread ${threadId}:`,
                error instanceof Error ? error.message : error
            );
        }

        return {
            configurable: {
                thread_id: threadId,
                checkpoint_id: checkpoint.id,
            },
        };
    }

    /**
     * Store intermediate writes linked to a checkpoint.
     *
     * Errors are caught and logged as warnings to prevent write failures
     * from crashing workflow execution.
     */
    async putWrites(
        config: RunnableConfig,
        writes: PendingWrite[],
        taskId: string
    ): Promise<void> {
        const threadId = config.configurable?.thread_id;
        const checkpointId = config.configurable?.checkpoint_id;

        if (!threadId || !checkpointId) {
            throw new Error("thread_id and checkpoint_id are required to save writes");
        }

        try {
            // Truncate writes if they contain large data
            const safeWrites = writes.map(([channel, value]) => [
                channel,
                fitCheckpointToSizeLimit(value),
            ]) as PendingWrite[];

            await this.client.mutation(api.checkpoints.saveWrites, {
                threadId,
                checkpointId,
                taskId,
                writes: safeWrites,
            });
        } catch (error) {
            console.warn(
                `[Checkpointer] Failed to save writes for thread ${threadId}:`,
                error instanceof Error ? error.message : error
            );
        }
    }

    /**
     * Delete a thread and its checkpoints.
     */
    async deleteThread(threadId: string): Promise<void> {
        try {
            await this.client.mutation(api.checkpoints.deleteThread, {
                threadId,
            });
        } catch (error) {
            console.warn(
                `[Checkpointer] Failed to delete thread ${threadId}:`,
                error instanceof Error ? error.message : error
            );
        }
    }
}
