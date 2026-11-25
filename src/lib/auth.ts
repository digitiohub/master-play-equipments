import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const COOKIE = "mp_admin";
const secret = () => {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 32) throw new Error("JWT_SECRET must be set (32+ chars)");
  return new TextEncoder().encode(s);
};

export const signToken = (sub: string) =>
  new SignJWT({}).setProtectedHeader({ alg: "HS256" }).setSubject(sub).setIssuedAt().setExpirationTime("7d").sign(secret());

export async function verifyToken(token?: string) {
  if (!token) return null;
  try { return (await jwtVerify(token, secret())).payload.sub ?? null; } catch { return null; }
}

export async function getAdmin() {
  return verifyToken((await cookies()).get(COOKIE)?.value);
}

export const cookieOpts = {
  httpOnly: true, sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 7,
  secure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === "true" : process.env.NODE_ENV === "production",
};
