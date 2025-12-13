import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define public routes that don't require authentication
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/api/public") ||
    pathname.startsWith("/api/config") ||
    pathname.startsWith("/api/templates") ||
    pathname.startsWith("/api/mcp") ||
    pathname.startsWith("/api/test-mcp-connection") ||
    pathname.startsWith("/api/auth");

  // Define API routes that require API key authentication (bypass auth check here)
  const isApiKeyRoute =
    pathname.match(/^\/api\/workflows\/[^/]+\/execute/) ||
    pathname.match(/^\/api\/workflows\/[^/]+\/execute-stream/) ||
    pathname.match(/^\/api\/workflows\/[^/]+\/resume/);

  // Allow public routes and API key routes
  if (isPublicRoute || isApiKeyRoute) {
    return NextResponse.next();
  }

  // For protected routes, check for session cookie
  const sessionToken = request.cookies.get('authjs.session-token') ||
                      request.cookies.get('__Secure-authjs.session-token');

  if (!sessionToken) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
