"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white">
            <div className="w-full max-w-md space-y-8 px-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        Welcome
                    </h1>
                    <p className="text-gray-700">
                        Sign in to continue to your workspace
                    </p>
                </div>

                {/* Sign in card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-6">
                    {/* Microsoft Sign In Button */}
                    <button
                        onClick={() => signIn("azure-ad", { callbackUrl })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                        {/* Microsoft Logo */}
                        <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
                            <rect width="11" height="11" fill="#F25022" />
                            <rect x="12" width="11" height="11" fill="#7FBA00" />
                            <rect y="12" width="11" height="11" fill="#00A4EF" />
                            <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
                        </svg>
                        <span>Continue with Microsoft</span>
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-gray-500">Secure SSO Authentication</span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Secure</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Fast</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Trusted</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600">
                    Protected by Azure Active Directory
                </p>
            </div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center">Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}
