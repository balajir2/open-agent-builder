/**
 * Convex Authentication Configuration
 *
 * Configures Azure AD as the authentication provider for Convex
 */

export default {
  providers: [
    {
      // The issuer URL for Azure AD
      // Format: https://login.microsoftonline.com/<Tenant_ID>/v2.0
      domain: "https://login.microsoftonline.com/9d343c00-4814-47eb-abcd-e3a0761d628b/v2.0",
      applicationID: process.env.AUTH_MICROSOFT_ID, // Matches the client ID in the JWT
    },
  ],
};
