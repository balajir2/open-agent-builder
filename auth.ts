import NextAuth, { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

/**
 * Refreshes the access token using the refresh token
 */
async function refreshAccessToken(token: any) {
    try {
        const tenantId = process.env.AUTH_MICROSOFT_TENANT_ID;
        const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.AUTH_MICROSOFT_ID!,
                client_secret: process.env.AUTH_MICROSOFT_SECRET!,
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken,
                scope: 'openid profile email offline_access',
            }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw new Error(`Token refresh failed: ${refreshedTokens.error_description || response.statusText}`);
        }

        console.log('[Auth] ✅ Token refreshed successfully');

        return {
            ...token,
            idToken: refreshedTokens.id_token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.error('[Auth] ❌ Error refreshing access token:', error);

        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AUTH_MICROSOFT_ID!,
            clientSecret: process.env.AUTH_MICROSOFT_SECRET!,
            tenantId: process.env.AUTH_MICROSOFT_TENANT_ID,
            authorization: {
                params: {
                    scope: 'openid profile email offline_access',
                },
            },
        }),
    ],
    pages: {
        signIn: '/sign-in',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // Initial sign in
            if (account && user) {
                return {
                    ...token,
                    idToken: account.id_token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000,
                };
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            // Access token has expired, try to refresh it
            console.log('[Auth] Access token expired, refreshing...');
            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            // @ts-ignore
            session.idToken = token.idToken;
            // @ts-ignore
            session.accessToken = token.accessToken;
            // @ts-ignore
            session.error = token.error;

            if (session.user && token.sub) {
                // @ts-ignore - extending session.user with id property
                session.user.id = token.sub;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // If it's a relative URL, prepend the baseUrl
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`;
            }

            // If it's an absolute URL on the same origin, allow it
            try {
                const urlObj = new URL(url);
                const baseUrlObj = new URL(baseUrl);
                if (urlObj.origin === baseUrlObj.origin) {
                    return url;
                }
            } catch (e) {
                // Invalid URL, fallback to baseUrl
            }

            // For security, redirect to baseUrl for external URLs
            return baseUrl;
        },
    },
}

export default NextAuth(authOptions)
