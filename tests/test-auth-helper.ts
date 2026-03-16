/**
 * Test Authentication Helper
 *
 * Provides utilities for authenticating Convex clients in tests.
 * Generates test JWT tokens that match Convex's authentication requirements.
 */

import jwt from 'jsonwebtoken';

/**
 * Generate a test JWT token for Convex authentication
 *
 * @param userId - User ID for the test
 * @param options - Additional JWT options
 * @returns JWT token string
 */
export function generateTestJWT(
  userId: string = 'test-user',
  options: {
    expiresIn?: string | number;
    issuer?: string;
    audience?: string;
  } = {}
): string {
  const {
    expiresIn = '1h',
    issuer = 'https://login.microsoftonline.com/9d343c00-4814-47eb-abcd-e3a0761d628b/v2.0',
    audience = 'ae523d36-4249-4257-b3b0-6108971fed2b',
  } = options;

  // Use AUTH_SECRET or CONVEX_TEST_SECRET for signing
  const secret = process.env.AUTH_SECRET || process.env.CONVEX_TEST_SECRET || 'test-secret';

  // Create JWT payload matching Azure AD format
  const payload = {
    sub: userId,
    aud: audience,
    iss: issuer,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (typeof expiresIn === 'number' ? expiresIn : 3600),
    email: `${userId}@test.local`,
    name: `Test User ${userId}`,
  };

  return jwt.sign(payload, secret, { algorithm: 'HS256' });
}

/**
 * Set test authentication for a Convex HTTP client
 * Uses admin authentication to bypass Azure AD token verification in tests
 *
 * @param client - Convex HTTP client
 * @param userId - User ID for the test (not used with admin auth)
 */
export function setTestAuth(client: any, userId: string = 'test-user'): void {
  // For testing, use admin authentication which bypasses OIDC verification
  // The CONVEX_DEPLOY_KEY provides admin access for test environments
  const adminSecret = process.env.CONVEX_DEPLOY_KEY || process.env.CONVEX_TEST_SECRET;

  if (!adminSecret) {
    throw new Error('CONVEX_DEPLOY_KEY or CONVEX_TEST_SECRET required for test authentication');
  }

  // Pass actingAsIdentity so ctx.auth.getUserIdentity() returns a valid identity
  // This allows requireAuth() to extract the userId from identity.subject
  client.setAdminAuth(adminSecret, {
    subject: userId,
    issuer: 'https://test.local',
    email: `${userId}@test.local`,
    name: `Test User ${userId}`,
  });
}

/**
 * Get Authorization header for API requests
 *
 * @param userId - User ID for the test
 * @returns Authorization header object
 */
export function getTestAuthHeader(userId: string = 'test-user'): { Authorization: string } {
  const token = generateTestJWT(userId);
  return { Authorization: `Bearer ${token}` };
}
