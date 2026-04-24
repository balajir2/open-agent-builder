"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";

/**
 * SessionManager — proactive token refresh instead of aggressive logout.
 *
 * Monitors the Azure AD id_token expiration embedded in the NextAuth session
 * and triggers a session refresh (via `update()`) before expiry.
 *
 * Sign-out only occurs when:
 *  1. The server-side JWT callback sets `session.error = 'RefreshAccessTokenError'`
 *  2. The token has been expired for >2 minutes with no successful refresh
 *  3. A stale session cookie survives after AUTH_SECRET rotation (see below)
 */
export default function SessionManager() {
    const { data: session, status, update } = useSession();
    const refreshAttemptedRef = useRef(false);
    const staleCookieClearedRef = useRef(false);

    // Stale-cookie sanitizer — runs at most once per session.
    //
    // If AUTH_SECRET is rotated in Vercel, existing session cookies can no
    // longer be decrypted. NextAuth silently returns status "unauthenticated"
    // but does NOT clear the now-undecryptable cookie. Any transient state
    // flap thereafter can cause the UI to retry auth in a loop because the
    // stale cookie keeps producing the same bad result on every request.
    //
    // Detect that pattern (status === "unauthenticated" but a NextAuth
    // cookie is still present) and actively clear it by calling signOut with
    // redirect:false. That terminates the loop cleanly and the user sees the
    // normal signed-out UI.
    useEffect(() => {
        if (status !== "unauthenticated" || staleCookieClearedRef.current) return;
        if (typeof document === "undefined") return;

        const nextAuthCookie = document.cookie
            .split(";")
            .some((c) =>
                /^\s*(?:__Secure-)?(?:next-auth|authjs)\.session-token/.test(c)
            );

        if (nextAuthCookie) {
            staleCookieClearedRef.current = true;
            console.warn(
                "[SessionManager] Detected stale NextAuth cookie with no valid session. Clearing."
            );
            signOut({ redirect: false });
        }
    }, [status]);

    // Handle refresh error — sign out gracefully
    useEffect(() => {
        // Only act if there's an active session with an error
        // @ts-ignore — error is set in auth.ts session callback
        if (session?.user && session?.error === "RefreshAccessTokenError") {
            console.warn("[SessionManager] Refresh token failed. Redirecting to sign-in...");
            signOut({ callbackUrl: "/sign-in" });
        }
    }, [session]);

    // Monitor token expiry and trigger proactive refresh
    useEffect(() => {
        // No session or no token — nothing to monitor
        // @ts-ignore
        const idToken = session?.idToken;
        if (!session?.user || !idToken) return;

        let exp: number;
        try {
            const parts = idToken.split(".");
            if (parts.length !== 3) return;
            const payload = JSON.parse(atob(parts[1]));
            exp = payload.exp * 1000; // Convert to milliseconds
        } catch {
            console.error("[SessionManager] Failed to decode idToken");
            return;
        }

        const now = Date.now();
        const timeRemaining = exp - now;
        const minutesRemaining = Math.round(timeRemaining / 1000 / 60);

        console.log(
            `[SessionManager] Token expires in ${minutesRemaining} minutes (${new Date(exp).toLocaleTimeString()})`
        );

        // If token expired for more than 2 minutes and no refresh came through, sign out
        if (timeRemaining < -2 * 60 * 1000) {
            console.warn("[SessionManager] Token expired >2 min ago with no refresh. Signing out...");
            signOut({ callbackUrl: "/sign-in" });
            return;
        }

        // If already expired (but within 2 min), trigger an immediate refresh
        if (timeRemaining <= 0) {
            if (!refreshAttemptedRef.current) {
                console.log("[SessionManager] Token just expired. Triggering refresh...");
                refreshAttemptedRef.current = true;
                update();
            }
            return;
        }

        // Reset the refresh-attempted flag when we get a fresh token
        refreshAttemptedRef.current = false;

        // Schedule a proactive refresh 10 minutes before expiry
        const REFRESH_AHEAD_MS = 10 * 60 * 1000; // 10 minutes
        const refreshIn = Math.max(timeRemaining - REFRESH_AHEAD_MS, 0);

        const refreshTimer = setTimeout(() => {
            console.log("[SessionManager] Triggering proactive token refresh...");
            update();
        }, refreshIn);

        return () => clearTimeout(refreshTimer);
    }, [session, update]);

    return null; // This component renders nothing
}
