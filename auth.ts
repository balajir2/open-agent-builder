import NextAuth, { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

export const authOptions: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AUTH_MICROSOFT_ID!,
            clientSecret: process.env.AUTH_MICROSOFT_SECRET!,
            tenantId: process.env.AUTH_MICROSOFT_TENANT_ID,
        }),
    ],
    pages: {
        signIn: '/sign-in',
        error: '/auth/error',
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.idToken = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            // @ts-ignore // Extend type in real app
            session.idToken = token.idToken;
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
}

export default NextAuth(authOptions)
