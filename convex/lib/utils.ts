/**
 * Shared utilities for Convex (works in both V8 and Node runtimes)
 */

/**
 * Hash a string using SHA-256 (Web Crypto API)
 * Compatible with both V8 (Queries/Mutations) and Node.js (Actions) runtimes.
 */
export async function hashString(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
