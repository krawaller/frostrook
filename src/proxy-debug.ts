import { type NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  // Minimal proxy for debugging
  console.log('Proxy running for:', request.nextUrl.pathname);

  // Just pass through without any authentication for now
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
