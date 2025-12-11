import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // Define public routes that don't require authentication
  const isPublicRoute =
    nextUrl.pathname === "/" ||
    nextUrl.pathname.startsWith("/sign-in") ||
    nextUrl.pathname.startsWith("/sign-up") ||
    nextUrl.pathname.startsWith("/api/public") ||
    nextUrl.pathname.startsWith("/api/config") ||
    nextUrl.pathname.startsWith("/api/templates") ||
    nextUrl.pathname.startsWith("/api/mcp") ||
    nextUrl.pathname.startsWith("/api/test-mcp-connection") ||
    nextUrl.pathname.startsWith("/api/auth");

  // Define API routes that require API key authentication (bypass auth check here)
  const isApiKeyRoute =
    nextUrl.pathname.match(/^\/api\/workflows\/[^/]+\/execute/) ||
    nextUrl.pathname.match(/^\/api\/workflows\/[^/]+\/execute-stream/) ||
    nextUrl.pathname.match(/^\/api\/workflows\/[^/]+\/resume/);

  // API key routes bypass auth (will be validated in the route handler)
  if (isApiKeyRoute) {
    return;
  }

  // Protect all routes except public ones
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
