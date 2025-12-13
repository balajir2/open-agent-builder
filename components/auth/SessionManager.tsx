"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionManager() {
    const { data: session } = useSession();

    useEffect(() => {
        // @ts-ignore
        if (!session?.idToken) return;

        try {
            // 1. Decode the ID token to find the expiration time (exp)
            // We don't need a heavy library like jwt-decode; basic base64 decoding works for reading claims.
            // @ts-ignore
            const parts = session.idToken.split(".");
            if (parts.length !== 3) return;

            const payload = JSON.parse(atob(parts[1]));
            const exp = payload.exp * 1000; // Convert to milliseconds
            const now = Date.now();
            const timeRemaining = exp - now;

            console.log(`[SessionManager] Token expires in ${Math.round(timeRemaining / 1000 / 60)} minutes (${new Date(exp).toLocaleTimeString()})`);

            // 2. If already expired, sign out immediately
            if (timeRemaining <= 0) {
                console.warn("[SessionManager] Token expired. Signing out...");
                signOut({ callbackUrl: "/" });
                return;
            }

            // 3. Set a timer to sign out when the token expires
            // We subtract a small buffer (e.g., 5 seconds) to be safe
            const timeout = setTimeout(() => {
                console.warn("[SessionManager] Token expiration reached. Signing out...");
                signOut({ callbackUrl: "/" });
            }, timeRemaining - 5000);

            return () => clearTimeout(timeout);
        } catch (error) {
            console.error("[SessionManager] Error checking token expiration:", error);
        }
    }, [session]);

    return null; // This component renders nothing
}
