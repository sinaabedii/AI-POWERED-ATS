import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Note: In a real application, you would verify the auth token here
// For this demo, we're using client-side auth with Zustand
// This middleware is a placeholder for server-side auth protection

export function middleware(request: NextRequest) {
  // For now, just pass through all requests
  // In production, you would check for auth cookies/tokens here
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
