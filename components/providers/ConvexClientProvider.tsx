"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth } from "convex/react";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useMemo } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function useAuthFromNextAuth() {
    const { data: session, status } = useSession();

    return useMemo(() => ({
        isLoading: status === "loading",
        isAuthenticated: status === "authenticated",
        fetchAccessToken: async () => {
            // @ts-ignore - idToken is added by NextAuth JWT callback
            return session?.idToken ?? null;
        },
    }), [session, status]);
}

export default function ConvexClientProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <SessionProvider refetchInterval={4 * 60} refetchOnWindowFocus={true}>
            <ConvexProviderWithAuth client={convex} useAuth={useAuthFromNextAuth}>
                {children}
            </ConvexProviderWithAuth>
        </SessionProvider>
    );
}
