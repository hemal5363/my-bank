// middleware.js (or middleware.ts for TypeScript)

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Using jose for JWT verification

const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET); // The secret should be encoded to Uint8Array for jose

export async function middleware(request: NextRequest) {
  // Check if the request is for an API route
  if (request.url.startsWith(`${request.nextUrl.origin}/api/`)) {
    // Get the token from cookies or headers
    const token = request.headers.get("Authorization");

    // If there's no token, or the token is invalid, redirect to the login page
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verify the token using jose library
      await jwtVerify(token, secretKey);

      // If the token is valid, continue the request
      return NextResponse.next();
    } catch (err) {
      // If token is invalid, redirect to login page
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If the request is not an API request, just proceed without any middleware action
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/account",
    "/api/accountHistory",
    "/api/dashboard",
    "/api/expenseType",
  ], // Apply this middleware only to API routes
};
