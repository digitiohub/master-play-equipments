import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Gate /admin pages (redirect) and /api/admin (401). Handlers re-check the token themselves.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  const token = req.cookies.get("mp_admin")?.value;
  let ok = false;
  try { if (token && process.env.JWT_SECRET) { await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET)); ok = true; } } catch {}
  if (ok) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.redirect(new URL("/admin/login", req.url));
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
