"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";

export function SignedIn({ children }: { children: ReactNode }) {
    const { status } = useSession();

    // Test bypass for E2E tests
    if (typeof window !== 'undefined' && window.localStorage.getItem('test-auth-bypass') === 'true') {
        return <>{children}</>;
    }

    if (status === "authenticated") {
        return <>{children}</>;
    }
    return null;
}

export function SignedOut({ children }: { children: ReactNode }) {
    const { status } = useSession();
    if (status === "unauthenticated") {
        return <>{children}</>;
    }
    return null;
}

export function SignInButton({ children, mode }: { children: ReactNode; mode?: string }) {
    return (
        <Link href="/sign-in">
            {children}
        </Link>
    );
}
