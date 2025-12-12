import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        MicrosoftEntraID({
            id: "azure-ad",
            clientId: process.env.AUTH_MICROSOFT_ID,
            clientSecret: process.env.AUTH_MICROSOFT_SECRET,
            issuer: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_TENANT_ID}/v2.0`,
            authorization: { params: { scope: "openid profile email User.Read" } },
        }),
    ],
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
})
