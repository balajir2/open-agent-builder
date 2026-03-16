"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth } from "convex/react";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useMemo, useCallback } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <SessionProvider refetchInterval={4 * 60} refetchOnWindowFocus={true}>
            <ConvexAuthBridge>
                {children}
            </ConvexAuthBridge>
        </SessionProvider>
    );
}

function ConvexAuthBridge({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();

    const useAuth = useCallback(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useMemo(() => ({
            isLoading: status === "loading",
            isAuthenticated: status === "authenticated",
            fetchAccessToken: async () => {
                // @ts-ignore
                return session?.idToken ?? null;
            },
        }), []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, status]);

    // When not authenticated and not loading, skip ConvexProviderWithAuth entirely
    // to prevent it from polling fetchAccessToken in a loop
    if (status === "unauthenticated") {
        return (
            <ConvexProvider client={convex}>
                {children}
            </ConvexProvider>
        );
    }

    return (
        <ConvexProviderWithAuth client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithAuth>
    );
}
