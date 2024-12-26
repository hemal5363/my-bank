import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { URL_CONSTANTS } from "./constants";

const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET); // The secret should be encoded to Uint8Array for jose

export async function middleware(request: NextRequest) {
  if (request.url.startsWith(`${request.nextUrl.origin}/api/`)) {
    const token = request.headers.get("Authorization");

    if (!token) {
      return NextResponse.redirect(new URL(URL_CONSTANTS.LOGIN, request.url));
    }

    try {
      await jwtVerify(token, secretKey);

      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL(URL_CONSTANTS.LOGIN, request.url));
    }
  }

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
