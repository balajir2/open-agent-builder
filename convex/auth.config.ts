/**
 * Convex Authentication Configuration
 *
 * Configures Azure AD as the authentication provider for Convex
 */

export default {
  providers: [
    {
      // The issuer URL for Azure AD
      // Azure AD v2.0 OIDC Configuration
      // Issuer: https://login.microsoftonline.com/9d343c00-4814-47eb-abcd-e3a0761d628b/v2.0
      domain: "https://login.microsoftonline.com/9d343c00-4814-47eb-abcd-e3a0761d628b/v2.0",
      // Application ID (Audience)
      applicationID: "ae523d36-4249-4257-b3b0-6108971fed2b",
    },
  ],
};
