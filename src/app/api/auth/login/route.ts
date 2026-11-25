import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { AdminModel } from "@/models";
import { loginSchema } from "@/lib/validators";
import { COOKIE, cookieOpts, signToken } from "@/lib/auth";
import { ipOf, rateLimit } from "@/lib/rateLimit";

const DUMMY = bcrypt.hashSync("unused-password", 12); // equalises timing for unknown emails

export async function POST(req: Request) {
  if (!rateLimit(`login:${ipOf(req)}`, 10, 15 * 60_000)) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const p = loginSchema.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Enter your email and password" }, { status: 400 });
  try {
    await connectDB();
    // First run: create the admin from env so no default password ever ships.
    if ((await AdminModel.estimatedDocumentCount()) === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD)
      await AdminModel.create({ email: process.env.ADMIN_EMAIL, passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12) });
    const admin = await AdminModel.findOne({ email: p.data.email.toLowerCase() });
    const ok = await bcrypt.compare(p.data.password, admin?.passwordHash ?? DUMMY);
    if (!admin || !ok) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, await signToken(String(admin._id)), cookieOpts);
    return res;
  } catch (e) {
    console.error("login failed", e);
    return NextResponse.json({ error: "Server error — check database connection" }, { status: 500 });
  }
}
