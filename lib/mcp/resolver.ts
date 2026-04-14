/**
 * MCP Resolver
 * Fetches MCP configurations from Convex at runtime
 * This ensures executors always use the latest configuration
 *
 * Supports OAuth: for servers with authType="oauth", fetches a valid
 * access token (auto-refreshing if needed) and injects it as the auth token.
 */

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Create a Convex client for server-side usage
const getConvexClient = () => {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    console.error('NEXT_PUBLIC_CONVEX_URL not configured');
    return null;
  }
  return new ConvexHttpClient(url);
};

/**
 * Resolve multiple MCP server IDs to their full configurations.
 * For OAuth servers, injects a fresh access token.
 *
 * @param serverIds - Array of Convex mcpServers document IDs
 * @param userId - Optional user ID for OAuth token resolution
 */
export async function resolveMCPServers(serverIds: string[], userId?: string): Promise<any[]> {
  if (!serverIds || serverIds.length === 0) {
    return [];
  }

  // Handle legacy format (full config objects instead of IDs)
  if (typeof serverIds[0] === 'object') {
    console.log('✅ Using legacy mcpTools format (already resolved)');
    return serverIds; // Already resolved
  }

  const convex = getConvexClient();
  if (!convex) {
    console.warn('Convex not configured, returning empty MCP servers');
    return [];
  }

  try {
    // Fetch server configurations via action (doesn't require auth token on client).
    // The action uses internal queries and enforces ownership via userId param.
    const servers = userId
      ? await convex.action(api.mcpServers.getServersForExecution, {
          userId,
          ids: serverIds as Id<"mcpServers">[],
        }) as any[]
      : await convex.query(api.mcpServers.getMCPServersByIds, {
          ids: serverIds as Id<"mcpServers">[],
        });

    // Transform to the format expected by executors
    const resolved = await Promise.all(
      servers.filter((s): s is NonNullable<typeof s> => !!s).map(async (server) => {
        let accessToken: string | undefined;

        // For OAuth servers, get a valid access token (auto-refreshes if needed)
        if (server.authType === "oauth" && userId) {
          try {
            const tokenResult = await convex.action(
              api.mcpOAuthTokensActions.getValidAccessToken,
              {
                userId,
                mcpServerId: server._id as Id<"mcpServers">,
              }
            );
            if (tokenResult) {
              accessToken = (tokenResult as any).accessToken;
            } else {
              console.warn(`[MCP Resolver] No valid OAuth token for server "${server.name}"`);
            }
          } catch (err) {
            console.error(`[MCP Resolver] OAuth token error for "${server.name}":`, err);
          }
        }

        return {
          _id: server._id,
          name: server.name,
          url: server.url,
          description: server.description,
          authType: server.authType,
          accessToken,
          availableTools: server.tools || [],
          headers: server.headers,
        };
      })
    );

    return resolved;
  } catch (error) {
    console.error('Error resolving MCP servers:', error);
    return [];
  }
}

/**
 * Resolve a single MCP server ID to its configuration
 */
export async function resolveMCPServer(serverId: string): Promise<any | null> {
  if (!serverId) {
    return null;
  }

  const convex = getConvexClient();
  if (!convex) {
    console.warn('Convex not configured, cannot resolve MCP server');
    return null;
  }

  try {
    const server = await convex.query(api.mcpServers.getMCPServer, {
      id: serverId as Id<"mcpServers">,
    });

    if (!server) {
      return null;
    }

    return {
      name: server.name,
      url: server.url,
      description: server.description,
      authType: server.authType,
      accessToken: server.accessToken,
      availableTools: server.tools || [],
      headers: server.headers,
    };
  } catch (error) {
    console.error('Error resolving MCP server:', error);
    return null;
  }
}

/**
 * Helper to check if a node is using the old mcpTools format
 * and migrate it to the new mcpServerIds format
 */
export function migrateMCPData(data: any): any {
  // If using old format with full configs, return as-is for backward compatibility
  if (data.mcpTools && Array.isArray(data.mcpTools)) {
    console.warn('Node using legacy mcpTools format. Consider migrating to mcpServerIds.');
    return data;
  }

  // New format uses mcpServerIds
  return data;
}