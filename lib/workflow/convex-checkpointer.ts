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

/**
 * Convex Checkpoint Saver for LangGraph
 * 
 * Persists workflow state in Convex to support resumption across requests.
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

        const checkpoints = await this.client.query(api.checkpoints.listCheckpoints, {
            threadId,
        });

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

        await this.client.mutation(api.checkpoints.saveCheckpoint, {
            threadId,
            checkpoint,
            metadata,
            parentConfig: config.configurable?.parent_config,
        });

        return {
            configurable: {
                thread_id: threadId,
                checkpoint_id: checkpoint.id,
            },
        };
    }

    /**
     * Store intermediate writes linked to a checkpoint.
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

        await this.client.mutation(api.checkpoints.saveWrites, {
            threadId,
            checkpointId,
            taskId,
            writes,
        });
    }

    /**
     * Delete a thread and its checkpoints.
     */
    async deleteThread(threadId: string): Promise<void> {
        await this.client.mutation(api.checkpoints.deleteThread, {
            threadId,
        });
    }
}
