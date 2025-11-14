import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get a UI configuration for a workflow
export const getConfigForWorkflow = query({
  args: { workflowId: v.string() },
  handler: async (ctx, { workflowId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const config = await ctx.db
      .query("uiBuilderConfigurations")
      .withIndex("by_workflow_user", (q) => 
        q.eq("workflowId", workflowId).eq("userId", identity.subject)
      )
      .first();

    return config;
  },
});

// Save a UI configuration for a workflow
export const saveConfig = mutation({
  args: {
    workflowId: v.string(),
    components: v.array(v.any()),
    workflowInputBindings: v.any(),
  },
  handler: async (ctx, { workflowId, components, workflowInputBindings }) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new Error("Unauthorized: must be authenticated to save configurations");
    }

    // Check if config already exists for this workflow and user
    const existing = await ctx.db
      .query("uiBuilderConfigurations")
      .withIndex("by_workflow_user", (q) => 
        q.eq("workflowId", workflowId).eq("userId", identity.subject)
      )
      .first();

    if (existing) {
      // Update existing config
      await ctx.db.patch(existing._id, {
        components,
        workflowInputBindings,
        updatedAt: new Date().toISOString(),
      });
      return existing._id;
    } else {
      // Create new config
      const newId = await ctx.db.insert("uiBuilderConfigurations", {
        workflowId,
        userId: identity.subject,
        components,
        workflowInputBindings,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return newId;
    }
  },
});

// Delete a UI configuration
export const deleteConfig = mutation({
  args: { id: v.id("uiBuilderConfigurations") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Verify ownership
    const config = await ctx.db.get(id);
    if (!config || config.userId !== identity?.subject) {
      throw new Error("Unauthorized: configuration not found or belongs to another user");
    }

    await ctx.db.delete(id);
    return { success: true };
  },
});