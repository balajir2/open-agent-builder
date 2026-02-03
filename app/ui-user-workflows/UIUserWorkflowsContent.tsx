"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from '@/components/shared/auth-helpers';
import { UserMenu } from "@/components/shared/UserMenu";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import HeaderBrandKit from "@/components/shared/header/BrandKit/BrandKit";
import HeaderWrapper from "@/components/shared/header/Wrapper/Wrapper";
import HeaderDropdownWrapper from "@/components/shared/header/Dropdown/Wrapper/Wrapper";
import ButtonUI from "@/components/ui/shadcn/button";
import GithubIcon from "@/components/shared/header/Github/_svg/GithubIcon";
import { Connector } from "@/components/shared/layout/curvy-rect";
import UsersUI from "@/components/ui-user/UsersUI"

export default function UIUserWorkflowsContent() {
    const searchParams = useSearchParams();
    const [workflow, setWorkflow] = useState<any>(null);
    const router = useRouter();
    useEffect(() => {
        const id = searchParams.get("workflow");
        if (!id) return;

        fetch(`/api/workflows/${id}`)
            .then((res) => res.json())
            .then(setWorkflow)
            .catch(console.error);
    }, [searchParams]);


    return (
        <div className="min-h-screen bg-background-base">
            {/* Header/Navigation Section */}
            <HeaderDropdownWrapper />

            <div className="sticky top-0 left-0 w-full z-[101] bg-background-base header">
                <div className="absolute top-0 cmw-container border-x border-border-faint h-full pointer-events-none" />

                <div className="h-1 bg-border-faint w-full left-0 -bottom-1 absolute" />

                <div className="cmw-container absolute h-full pointer-events-none top-0">
                    <Connector className="absolute -left-[10.5px] -bottom-11" />
                    <Connector className="absolute -right-[10.5px] -bottom-11" />
                </div>

                <HeaderWrapper>
                    <div className="max-w-[900px] mx-auto w-full flex justify-between items-center">
                        <div className="flex gap-24 items-center">
                            <HeaderBrandKit />
                        </div>

                        <div className="flex gap-8 items-center">
                            {/* Back to Home */}
                            <ButtonUI variant="primary" onClick={() => router.push('/')}>
                                Back to Home
                            </ButtonUI>

                            {/* GitHub Template Button */}
                            <a
                                className="contents"
                                href="https://github.com/firecrawl/firecrawl"
                                target="_blank"
                            >
                                <ButtonUI variant="secondary">
                                    <GithubIcon />
                                    Use this Template
                                </ButtonUI>
                            </a>

                            {/* Clerk Auth */}
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="px-16 py-8 bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white rounded-8 text-body-medium font-medium shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:brightness-110 transition-all active:scale-[0.98]">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>

                            <SignedIn>
                                <UserMenu />
                            </SignedIn>
                        </div>
                    </div>
                </HeaderWrapper>
            </div>

            {/* Main UI Builder Content */}
            <SignedIn>
                <UsersUI />
            </SignedIn>

            <SignedOut>
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Sign in to use the UI Builder</h2>
                        <SignInButton mode="modal">
                            <button className="px-24 py-12 bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white rounded-8 text-body-medium font-medium shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:brightness-110 transition-all active:scale-[0.98]">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </div>
            </SignedOut>
        </div>
    );
}
