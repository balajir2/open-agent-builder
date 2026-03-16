import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define public routes that don't require authentication
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/ui-user-workflows") || // Allow UI for Workflows - uses client-side auth
    // pathname.startsWith("/ui-builder") || // Allow UI Builder - uses client-side auth
    pathname.startsWith("/workflow-runner") || // Allow workflow runner - uses client-side auth
    pathname.startsWith("/api/public") ||
    pathname.startsWith("/api/config") ||
    pathname.startsWith("/api/templates") ||
    pathname.startsWith("/api/mcp") ||
    pathname.startsWith("/api/test-mcp-connection") ||
    pathname.startsWith("/api/upload") || // Allow file upload - proxies to Convex HTTP action with CORS
    pathname.startsWith("/api/auth") ||
    pathname === "/api/workflows" || // Allow GET listing — route handles auth fallback gracefully
    pathname.startsWith("/api/vector-db"); // Allow vector-db test queries

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
  // NextAuth v4 uses 'next-auth.session-token', Auth.js v5 uses 'authjs.session-token'
  // Large JWTs are chunked into .0, .1, .2 etc. — check the first chunk too
  const sessionToken = request.cookies.get('next-auth.session-token') ||
    request.cookies.get('next-auth.session-token.0') ||       // Chunked session (large JWT)
    request.cookies.get('__Secure-next-auth.session-token') ||
    request.cookies.get('__Secure-next-auth.session-token.0') || // Chunked session (HTTPS)
    request.cookies.get('authjs.session-token') ||
    request.cookies.get('authjs.session-token.0') ||           // Chunked session (Auth.js v5)
    request.cookies.get('__Secure-authjs.session-token') ||
    request.cookies.get('__Secure-authjs.session-token.0');    // Chunked session (Auth.js v5 HTTPS)

  if (!sessionToken) {
    // For API routes, return 401 instead of redirecting
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }

    // For page routes, redirect to sign-in
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
