// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  // Izinkan akses ke path root utama (/)
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Mengarahkan pengguna yang sudah login dari halaman auth ke dashboard
  if (
    isLoggedIn &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Mengarahkan pengguna yang belum login dari halaman dashboard ke login
  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Konfigurasi middleware hanya berjalan pada routes ini
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
