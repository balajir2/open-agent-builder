"use client";

import WorkflowRunnerUI from "@/components/workflow-runner/WorkflowRunnerUI";
import { SignedIn, SignedOut, SignInButton } from "@/components/shared/auth-helpers";
import { UserMenu } from "@/components/shared/UserMenu";
import HeaderBrandKit from "@/components/layout/header/BrandKit/BrandKit";
import HeaderWrapper from "@/components/layout/header/Wrapper/Wrapper";
import HeaderDropdownWrapper from "@/components/layout/header/Dropdown/Wrapper/Wrapper";
import ButtonUI from "@/components/ui/shadcn/button";
import GithubIcon from "@/components/layout/header/Github/_svg/GithubIcon";
import { Connector } from "@/components/shared/layout/curvy-rect";
import { HeaderProvider } from "@/components/layout/header/HeaderContext";

export default function WorkflowRunnerPage() {
  return (
    <HeaderProvider>
      <div className="min-h-screen bg-background-base">
        {/* Header/Navigation Section */}
        <HeaderDropdownWrapper />

        <div className="sticky top-0 left-0 w-full z-[101] bg-background-base header border-b border-border-faint">
          {/* Edge borders for visual continuity */}
          <div className="absolute top-0 cmw-container border-x border-border-faint h-full pointer-events-none" />

          {/* Bottom line under header */}
          <div className="h-1 bg-border-faint w-full left-0 -bottom-1 absolute" />

          {/* Decorative curved connectors */}
          <div className="cmw-container absolute h-full pointer-events-none top-0">
            <Connector className="absolute -left-[10.5px] -bottom-11" />
            <Connector className="absolute -right-[10.5px] -bottom-11" />
          </div>

          {/* ---------- HEADER CONTENT ---------- */}
          <HeaderWrapper>
            {/* The container below ensures perfect alignment with WorkflowRunnerUI panels */}
            <div className="px-16 sm:px-32 lg:px-64 mx-auto w-full flex justify-between items-center h-16">
              {/* LEFT SIDE — Brand */}
              <div className="flex items-center">
                <HeaderBrandKit />
              </div>

              {/* RIGHT SIDE — Buttons + Profile */}
              <div className="flex items-center gap-6">
                {/* GitHub Template Button */}
                <a
                  className="contents"
                  href="https://github.com/firecrawl/firecrawl"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ButtonUI variant="secondary">
                    <GithubIcon />
                    Use this Template
                  </ButtonUI>
                </a>

                {/* Clerk Auth Controls */}
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-16 py-8 bg-heat-100 hover:bg-heat-200 text-white rounded-8 text-body-medium font-medium transition-all active:scale-[0.98]">
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
          {/* ---------- END HEADER CONTENT ---------- */}
        </div>

        {/* Main Workflow Runner UI (Visible when signed in) */}
        <SignedIn>
          <WorkflowRunnerUI />
        </SignedIn>

        {/* Sign-in prompt when logged out */}
        <SignedOut>
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Sign in to use the Workflow Runner
              </h2>
              <SignInButton mode="modal">
                <button className="px-24 py-12 bg-heat-100 hover:bg-heat-200 text-white rounded-8 text-body-medium font-medium transition-all active:scale-[0.98]">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>
      </div>
    </HeaderProvider >
  );
}
