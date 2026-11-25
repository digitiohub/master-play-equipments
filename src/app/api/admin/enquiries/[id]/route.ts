import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { EnquiryModel } from "@/models";
import { getAdmin } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };
export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const b = z.object({ status: z.enum(["new", "contacted", "closed"]) }).safeParse(await req.json().catch(() => null));
  if (!isValidObjectId(id) || !b.success) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await connectDB();
  await EnquiryModel.findByIdAndUpdate(id, { status: b.data.status });
  return NextResponse.json({ ok: true });
}
export async function DELETE(_: Request, { params }: Ctx) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await connectDB();
  await EnquiryModel.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
