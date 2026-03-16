import { internalMutation } from "./_generated/server";

/**
 * Admin functions for database management
 * All functions are internal-only to prevent public access.
 */

// Clear all workflows — internal only, not callable from public clients
export const clearAllWorkflows = internalMutation({
  args: {},
  handler: async ({ db }) => {
    const workflows = await db.query("workflows").collect();
    let deleted = 0;

    for (const workflow of workflows) {
      await db.delete(workflow._id);
      deleted++;
    }

    return { deleted };
  },
});
