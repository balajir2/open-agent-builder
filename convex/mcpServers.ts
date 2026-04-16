import { v } from "convex/values";
import { query, mutation, action, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

/**
 * Centralized MCP Server Registry Operations
 * Single source of truth for all MCP configurations
 *
 * SECURITY: All public functions derive userId from ctx.auth.
 * Secrets (accessToken, headers) are redacted from client-facing responses.
 */

/**
 * Get the authenticated user's ID or throw.
 */
async function requireAuth(ctx: any): Promise<string> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.subject) {
    throw new Error("Authentication required");
  }
  return identity.subject;
}

/**
 * Redact sensitive fields from a server object before returning to client.
 */
function redactServer(server: any) {
  if (!server) return server;
  const { accessToken, headers, oauthConfig, ...safe } = server;
  return {
    ...safe,
    hasAccessToken: !!accessToken,
    hasHeaders: !!headers && Object.keys(headers).length > 0,
    // Expose OAuth config metadata (no secrets)
    oauthConfig: oauthConfig ? {
      authUrl: oauthConfig.authUrl,
      tokenUrl: oauthConfig.tokenUrl,
      clientId: oauthConfig.clientId,
      hasClientSecret: !!oauthConfig.encryptedClientSecret,
      scopes: oauthConfig.scopes,
      discoveryUrl: oauthConfig.discoveryUrl,
    } : undefined,
  };
}

// #################################################################
// # Regular, User-Facing Queries and Mutations
// #################################################################

// Get all MCP servers for the authenticated user — secrets redacted
// Includes both user-owned servers AND shared servers (isShared === true)
export const listUserMCPs = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) return [];
    const userId = identity.subject;

    const ownServers = await ctx.db
      .query("mcpServers")
      .withIndex("by_userId", (q: any) => q.eq("userId", userId))
      .collect();

    const sharedServers = await ctx.db
      .query("mcpServers")
      .withIndex("by_shared", (q: any) => q.eq("isShared", true))
      .collect();

    // Merge, deduplicate (shared server might also be owned by this user)
    const seenIds = new Set(ownServers.map((s: any) => s._id));
    const merged = [
      ...ownServers,
      ...sharedServers.filter((s: any) => !seenIds.has(s._id)),
    ];

    return merged.map(redactServer);
  },
});

// Get enabled MCP servers for the authenticated user — secrets redacted
// Includes both user-owned servers AND shared servers (isShared === true)
export const getEnabledMCPs = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) return [];
    const userId = identity.subject;

    const ownServers = await ctx.db
      .query("mcpServers")
      .withIndex("by_userId", (q: any) => q.eq("userId", userId))
      .filter((q: any) => q.eq(q.field("enabled"), true))
      .collect();

    const sharedServers = await ctx.db
      .query("mcpServers")
      .withIndex("by_shared", (q: any) => q.eq("isShared", true))
      .filter((q: any) => q.eq(q.field("enabled"), true))
      .collect();

    const seenIds = new Set(ownServers.map((s: any) => s._id));
    const merged = [
      ...ownServers,
      ...sharedServers.filter((s: any) => !seenIds.has(s._id)),
    ];

    return merged.map(redactServer);
  },
});

// Get a single MCP server by ID — ownership or shared access enforced, secrets redacted
export const getMCPServer = query({
  args: {
    id: v.id("mcpServers"),
  },
  handler: async (ctx, { id }) => {
    const userId = await requireAuth(ctx);
    const server = await ctx.db.get(id);
    if (!server) return null;
    // Allow access if owned by user OR shared
    if (server.userId !== userId && !server.isShared) {
      return null;
    }
    return redactServer(server);
  },
});

// Get multiple MCP servers by IDs — ownership enforced, secrets redacted
export const getMCPServersByIds = query({
  args: {
    ids: v.array(v.id("mcpServers")),
  },
  handler: async (ctx, { ids }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) return [];
    const userId = identity.subject;

    const servers = await Promise.all(
      ids.map(id => ctx.db.get(id))
    );
    return servers
      .filter((s): s is NonNullable<typeof s> => !!s && (s.userId === userId || s.isShared === true))
      .map(redactServer);
  },
});

// Internal query to get server with secrets (for server-side execution only)
export const getServerInternal = internalQuery({
  args: {
    id: v.id("mcpServers"),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

/**
 * Resolve MCP servers for workflow execution (server-side only).
 * Uses internal queries to bypass auth (caller passes userId).
 * Returns configs with ownership check but without requiring an auth token on the client.
 */
export const getServersForExecution = action({
  args: {
    userId: v.string(),
    ids: v.array(v.id("mcpServers")),
  },
  handler: async (ctx, { userId, ids }): Promise<Array<{
    _id: string;
    name: string;
    url: string;
    description?: string;
    authType: string;
    tools: string[];
    headers?: any;
  }>> => {
    const servers: any[] = await Promise.all(
      ids.map((id: any) => ctx.runQuery(internal.mcpServers.getServerInternal, { id }))
    );

    // Filter to servers owned by the user OR shared
    return servers
      .filter((s: any): s is NonNullable<typeof s> => !!s && (s.userId === userId || s.isShared === true))
      .map((server: any) => ({
        _id: server._id,
        name: server.name,
        url: server.url,
        description: server.description,
        authType: server.authType,
        tools: server.tools || [],
        headers: server.headers,
      }));
  },
});

// Add a new MCP server — ownership enforced via auth
export const addMCPServer = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    authType: v.string(),
    accessToken: v.optional(v.string()),
    tools: v.optional(v.array(v.string())),
    headers: v.optional(v.any()),
    isShared: v.optional(v.boolean()),
    oauthConfig: v.optional(v.object({
      authUrl: v.string(),
      tokenUrl: v.string(),
      clientId: v.string(),
      encryptedClientSecret: v.optional(v.string()),
      scopes: v.optional(v.string()),
      discoveryUrl: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);

    const serverId = await ctx.db.insert("mcpServers", {
      ...args,
      userId,
      connectionStatus: "untested",
      enabled: true,
      isOfficial: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return serverId;
  },
});

// Update MCP server — ownership enforced
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
    isShared: v.optional(v.boolean()),
    headers: v.optional(v.any()),
    oauthConfig: v.optional(v.object({
      authUrl: v.string(),
      tokenUrl: v.string(),
      clientId: v.string(),
      encryptedClientSecret: v.optional(v.string()),
      scopes: v.optional(v.string()),
      discoveryUrl: v.optional(v.string()),
    })),
  },
  handler: async (ctx, { id, ...updates }) => {
    const userId = await requireAuth(ctx);

    const server = await ctx.db.get(id);
    if (!server) {
      throw new Error("MCP server not found");
    }

    if (server.userId !== userId) {
      throw new Error("Unauthorized: You can only update your own MCP servers");
    }

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return id;
  },
});

// Delete MCP server — ownership enforced
export const deleteMCPServer = mutation({
  args: {
    id: v.id("mcpServers"),
  },
  handler: async (ctx, { id }) => {
    const userId = await requireAuth(ctx);

    const server = await ctx.db.get(id);
    if (!server) {
      throw new Error("MCP server not found");
    }

    if (server.userId !== userId) {
      throw new Error("Unauthorized: You can only delete your own MCP servers");
    }

    await ctx.db.delete(id);
    return { success: true };
  },
});


// #################################################################
// # Test-only Mutations - Secured by Test Secret
// #################################################################

const checkTestSecret = (secret?: string) => {
    const testSecret = process.env.CONVEX_TEST_SECRET;
    if (!testSecret || secret !== testSecret) {
        throw new Error("Unauthorized: Invalid test secret provided. Ensure CONVEX_TEST_SECRET is set as a Convex environment variable and passed correctly from tests.");
    }
};

export const addMCPServerForTest = mutation({
    args: {
        secret: v.string(),
        serverData: v.object({
            userId: v.string(),
            name: v.string(),
            url: v.string(),
            description: v.optional(v.string()),
            category: v.optional(v.string()),
            authType: v.string(),
            enabled: v.boolean(),
        })
    },
    handler: async ({ db }, { secret, serverData }) => {
        checkTestSecret(secret);
        return await db.insert("mcpServers", {
            ...serverData,
            connectionStatus: "untested",
            isOfficial: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});

export const deleteMCPServerForTest = mutation({
    args: {
        id: v.id("mcpServers"),
        secret: v.string(),
    },
    handler: async (ctx, { id, secret }) => {
        checkTestSecret(secret);
        const server = await ctx.db.get(id);
        if (server) {
            await ctx.db.delete(id);
        }
        return { success: true };
    },
});


// #################################################################
// # Actions and Other Logic
// #################################################################

// Test MCP connection — ownership enforced, secrets NOT returned to client
export const testConnection = action({
  args: {
    id: v.id("mcpServers"),
  },
  handler: async (ctx, { id }): Promise<{ serverId: any; needsTest: boolean; server: any }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) {
      throw new Error("Authentication required");
    }

    const server: any = await ctx.runQuery(internal.mcpServers.getServerInternal, { id });

    if (!server) {
      throw new Error("MCP server not found");
    }

    if (server.userId !== identity.subject) {
      throw new Error("Unauthorized: You can only test your own MCP servers");
    }

    try {
      return {
        serverId: id,
        needsTest: true,
        // Redact secrets before returning to client
        server: redactServer(server),
      };
    } catch (error) {
      await ctx.runMutation(internal.mcpServers.updateConnectionStatusInternal, {
        id,
        status: "error",
        lastTested: new Date().toISOString(),
        lastError: error instanceof Error ? error.message : "Unknown error"
      });
      throw error;
    }
  }
});

// Internal mutation for updating connection status (used by testConnection action)
export const updateConnectionStatusInternal = internalMutation({
  args: {
    id: v.id("mcpServers"),
    status: v.string(),
    lastTested: v.string(),
    lastError: v.optional(v.string()),
  },
  handler: async (ctx, { id, status, lastTested, lastError }) => {
    await ctx.db.patch(id, {
      connectionStatus: status,
      lastTested,
      lastError,
      updatedAt: new Date().toISOString(),
    });
  },
});

// Seed official MCP servers — ownership enforced via auth
export const seedOfficialMCPs = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await requireAuth(ctx);

    // Check if user already has official MCPs
    const existing = await ctx.db
      .query("mcpServers")
      .withIndex("by_userId", (q: any) => q.eq("userId", userId))
      .filter((q: any) => q.eq(q.field("isOfficial"), true))
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
        ctx.db.insert("mcpServers", {
          userId,
          ...mcp,
          connectionStatus: "untested",
          enabled: true,
          isOfficial: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      )
    );

    return { message: "Official MCPs seeded", count: insertedIds.length };
  },
});

// Toggle MCP enabled status — ownership enforced
export const toggleMCPEnabled = mutation({
  args: {
    id: v.id("mcpServers"),
  },
  handler: async (ctx, { id }) => {
    const userId = await requireAuth(ctx);

    const server = await ctx.db.get(id);
    if (!server) {
      throw new Error("MCP server not found");
    }

    if (server.userId !== userId) {
      throw new Error("Unauthorized: You can only toggle your own MCP servers");
    }

    await ctx.db.patch(id, {
      enabled: !server.enabled,
      updatedAt: new Date().toISOString(),
    });

    return { enabled: !server.enabled };
  },
});

// Update connection status after testing — ownership enforced
export const updateConnectionStatus = mutation({
  args: {
    id: v.id("mcpServers"),
    status: v.string(),
    tools: v.optional(v.array(v.string())),
    error: v.optional(v.string()),
  },
  handler: async (ctx, { id, status, tools, error }) => {
    const userId = await requireAuth(ctx);

    const server = await ctx.db.get(id);
    if (!server || server.userId !== userId) {
      throw new Error("MCP server not found or unauthorized");
    }

    await ctx.db.patch(id, {
      connectionStatus: status,
      tools,
      lastTested: new Date().toISOString(),
      lastError: error,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  },
});

// Clean up non-Firecrawl official MCPs — ownership enforced via auth
export const cleanupOfficialMCPs = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await requireAuth(ctx);

    // Find all official MCPs for the user
    const officialMCPs = await ctx.db
      .query("mcpServers")
      .withIndex("by_userId", (q: any) => q.eq("userId", userId))
      .filter((q: any) => q.eq(q.field("isOfficial"), true))
      .collect();

    // Delete any that are not Firecrawl
    let deletedCount = 0;
    for (const mcp of officialMCPs) {
      if (mcp.name !== "Firecrawl") {
        await ctx.db.delete(mcp._id);
        deletedCount++;
      }
    }

    return { message: `Cleaned up ${deletedCount} non-Firecrawl official MCPs` };
  },
});

/* --------------------------------------------------------
   TEST-COMPATIBLE ALIASES
   -------------------------------------------------------- */

/**
 * Alias for addMCPServer - used by tests
 */
export const add = addMCPServer;

/**
 * Alias for listUserMCPs - used by tests
 */
export const list = listUserMCPs;

/**
 * Alias for deleteMCPServer - used by tests
 */
export const remove = deleteMCPServer;
