import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

/**
 * Centralized MCP Server Registry Operations
 * Single source of truth for all MCP configurations
 */

// Get all MCP servers for a user
export const listUserMCPs = query({
  args: {
    userId: v.string(),
  },
  handler: async ({ db }, { userId }) => {
    const servers = await db
      .query("mcpServers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();
    return servers;
  },
});

// Get enabled MCP servers for a user
export const getEnabledMCPs = query({
  args: {
    userId: v.string(),
  },
  handler: async ({ db }, { userId }) => {
    const servers = await db
      .query("mcpServers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("enabled"), true))
      .collect();
    return servers;
  },
});

// Get a single MCP server by ID
export const getMCPServer = query({
  args: {
    id: v.id("mcpServers"),
  },
  handler: async ({ db }, { id }) => {
    return await db.get(id);
  },
});

// Get multiple MCP servers by IDs
export const getMCPServersByIds = query({
  args: {
    ids: v.array(v.id("mcpServers")),
  },
  handler: async ({ db }, { ids }) => {
    const servers = await Promise.all(
      ids.map(id => db.get(id))
    );
    return servers.filter(Boolean);
  },
});

// Add a new MCP server
export const addMCPServer = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    url: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    authType: v.string(),
    accessToken: v.optional(v.string()),
    tools: v.optional(v.array(v.string())),
    headers: v.optional(v.any()),
  },
  handler: async ({ db }, args) => {
    const serverId = await db.insert("mcpServers", {
      ...args,
      connectionStatus: "untested",
      enabled: true,
      isOfficial: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return serverId;
  },
});

// Update MCP server — SECURITY FIX: Added ownership check
export const updateMCPServer = mutation({
  args: {
    id: v.id("mcpServers"),
    name: v.optional(v.string()),
    url: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    authType: v.optional(v.string()),
    accessToken: v.optional(v.string()),
    tools: v.optional(v.array(v.string())),
    connectionStatus: v.optional(v.string()),
    lastTested: v.optional(v.string()),
    lastError: v.optional(v.string()),
    enabled: v.optional(v.boolean()),
    headers: v.optional(v.any()),
  },
  handler: async (ctx, { id, ...updates }) => {
    // Get authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: You must be logged in to update MCP servers");
    }

    // Get the MCP server
    const server = await ctx.db.get(id);
    if (!server) {
      throw new Error("MCP server not found");
    }

    // Check ownership
    if (server.userId !== identity.subject) {
      throw new Error("Unauthorized: You can only update your own MCP servers");
    }

    // Update the server
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return id;
  },
});

// Delete MCP server — SECURITY FIX: Added ownership check
export const deleteMCPServer = mutation({
  args: {
    id: v.id("mcpServers"),
  },
  handler: async (ctx, { id }) => {
    // Get authenticated user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: You must be logged in to delete MCP servers");
    }

    // Get the MCP server
    const server = await ctx.db.get(id);
    if (!server) {
      throw new Error("MCP server not found");
    }

    // Check ownership
    if (server.userId !== identity.subject) {
      throw new Error("Unauthorized: You can only delete your own MCP servers");
    }

    // Delete the server
    await ctx.db.delete(id);
    return { success: true };
  },
});

// New test-only mutation for cleaning up test data using a secure secret
export const deleteMCPServerForTest = mutation({
    args: {
        id: v.id("mcpServers"),
        secret: v.string(),
    },
    handler: async (ctx, { id, secret }) => {
        const testSecret = process.env.CONVEX_TEST_SECRET;
        if (!testSecret || secret !== testSecret) {
            throw new Error("Unauthorized: Invalid test secret provided. Make sure CONVEX_TEST_SECRET is set as a Convex environment variable and passed correctly from tests.");
        }

        const server = await ctx.db.get(id);
        if (!server) {
            return { success: true, message: "Server not found, presumed deleted." };
        }

        await ctx.db.delete(id);
        return { success: true };
    },
});

// Test MCP connection and discover tools
export const testConnection = action({
  args: {
    id: v.id("mcpServers"),
  },
  handler: async ({ runMutation, runQuery }, { id }): Promise<{ serverId: any; needsTest: boolean; server: any }> => {
    const server: any = await runQuery(api.mcpServers.getMCPServer, { id });

    if (!server) {
      throw new Error("MCP server not found");
    }

    try {
      // This will be called from the frontend which will do the actual connection test
      // The frontend will then update the server with the results
      return {
        serverId: id,
        needsTest: true,
        server
      };
    } catch (error) {
      await runMutation(api.mcpServers.updateMCPServer, {
        id,
        connectionStatus: "error",
        lastTested: new Date().toISOString(),
        lastError: error instanceof Error ? error.message : "Unknown error"
      });
      throw error;
    }
  }
});

// Seed official MCP servers (run once on first user setup)
export const seedOfficialMCPs = mutation({
  args: {
    userId: v.string(),
  },
  handler: async ({ db }, { userId }) => {
    // Check if user already has official MCPs
    const existing = await db
      .query("mcpServers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isOfficial"), true))
      .first();

    if (existing) {
      return { message: "Official MCPs already seeded" };
    }

    // Official MCP configuration - Only Firecrawl
    const officialMCPs = [
      {
        name: "Firecrawl",
        url: "https://mcp.firecrawl.dev/{FIRECRAWL_API_KEY}/v2/mcp",
        description: "Web scraping, searching, and data extraction (API key required)",
        category: "web",
        authType: "api-key",
        tools: [
          "firecrawl_scrape",
          "firecrawl_search",
          "firecrawl_crawl",
          "firecrawl_map",
          "firecrawl_batch_scrape",
          "firecrawl_extract",
          "firecrawl_check_crawl_status"
        ],
      },
    ];

    // Insert official MCPs for the user
    const insertedIds = await Promise.all(
      officialMCPs.map(mcp =>
        db.insert("mcpServers", {
          userId,
          ...mcp,
          connectionStatus: "untested",
          enabled: true, // Firecrawl enabled by default
          isOfficial: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      )
    );

    return { message: "Official MCPs seeded", count: insertedIds.length };
  },
});

// Toggle MCP enabled status
export const toggleMCPEnabled = mutation({
  args: {
    id: v.id("mcpServers"),
  },
  handler: async ({ db }, { id }) => {
    const server = await db.get(id);
    if (!server) {
      throw new Error("MCP server not found");
    }

    await db.patch(id, {
      enabled: !server.enabled,
      updatedAt: new Date().toISOString(),
    });

    return { enabled: !server.enabled };
  },
});

// Update connection status after testing
export const updateConnectionStatus = mutation({
  args: {
    id: v.id("mcpServers"),
    status: v.string(),
    tools: v.optional(v.array(v.string())),
    error: v.optional(v.string()),
  },
  handler: async ({ db }, { id, status, tools, error }) => {
    await db.patch(id, {
      connectionStatus: status,
      tools,
      lastTested: new Date().toISOString(),
      lastError: error,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  },
});

// Clean up non-Firecrawl official MCPs
export const cleanupOfficialMCPs = mutation({
  args: {
    userId: v.string(),
  },
  handler: async ({ db }, { userId }) => {
    // Find all official MCPs for the user
    const officialMCPs = await db
      .query("mcpServers")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isOfficial"), true))
      .collect();

    // Delete any that are not Firecrawl
    let deletedCount = 0;
    for (const mcp of officialMCPs) {
      if (mcp.name !== "Firecrawl") {
        await db.delete(mcp._id);
        deletedCount++;
      }
    }

    return { message: `Cleaned up ${deletedCount} non-Firecrawl official MCPs` };
  },
});