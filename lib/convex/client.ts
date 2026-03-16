
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";

let convexClient: ConvexHttpClient | null = null;

/**
 * Get an unauthenticated Convex client
 * Use getAuthenticatedConvexClient() when user auth is needed
 */
export function getConvexClient(): ConvexHttpClient {
  if (!convexClient) {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (!url) {
      throw new Error(
        'Convex URL not configured. ' +
        'Please add NEXT_PUBLIC_CONVEX_URL to .env.local'
      );
    }

    try {
      convexClient = new ConvexHttpClient(url);
    } catch (error) {
      console.error('Failed to initialize Convex client:', error);
      throw new Error(`Convex client initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return convexClient;
}

/**
 * Get an authenticated Convex client with NextAuth token
 * This ensures userId is properly set in Convex context
 */
export async function getAuthenticatedConvexClient(): Promise<ConvexHttpClient> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!url) {
    throw new Error(
      'Convex URL not configured. ' +
      'Please add NEXT_PUBLIC_CONVEX_URL to .env.local'
    );
  }

  const client = new ConvexHttpClient(url);

  // In test environments (like Playwright), we don't want to initialize NextAuth.
  // The tests that need auth should use admin keys directly.
  if (process.env.NODE_ENV === "test" || process.env.CI) {
    console.warn("Skipping NextAuth initialization in test/CI environment.");
    return client;
  }

  try {
    // Dynamically import auth only when not in a test environment
    const { getServerSession } = await import("next-auth");
    const { authOptions } = await import("@/auth");
    // Get NextAuth session
    const session = await getServerSession(authOptions);
    // @ts-ignore - idToken is added in auth.ts callbacks
    const token = session?.idToken;

    // Set the authentication token — fail closed if unavailable
    if (token) {
      client.setAuth(token);
    } else {
      throw new Error('Authentication required: No NextAuth token available');
    }
  } catch (error) {
    // Re-throw auth errors as-is; wrap unexpected errors
    if (error instanceof Error && error.message.startsWith('Authentication required')) {
      throw error;
    }
    throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return client;
}

/**
 * Check if Convex is configured
 */
export function isConvexConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_CONVEX_URL;
}

// Export API for convenience
export { api };
export type { ConvexHttpClient };
