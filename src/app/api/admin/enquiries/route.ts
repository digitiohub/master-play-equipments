import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { EnquiryModel } from "@/models";
import { getAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sp = new URL(req.url).searchParams;
  const status = sp.get("status");
  const q = sp.get("q")?.trim();
  const filter: Record<string, unknown> = {};
  if (status && ["new", "contacted", "closed"].includes(status)) filter.status = status;
  if (q) { const re = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"); filter.$or = [{ name: re }, { email: re }, { phone: re }, { organization: re }, { product: re }]; }
  await connectDB();
  const [items, counts] = await Promise.all([
    EnquiryModel.find(filter).sort({ createdAt: -1 }).limit(300).lean(),
    EnquiryModel.aggregate([{ $group: { _id: "$status", n: { $sum: 1 } } }]),
  ]);
  return NextResponse.json({ items, counts: Object.fromEntries(counts.map((c) => [c._id, c.n])) });
}
