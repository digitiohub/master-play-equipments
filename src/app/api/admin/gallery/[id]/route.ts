import { NextResponse } from "next/server";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { GalleryModel } from "@/models";
import { getAdmin } from "@/lib/auth";
import { uploadDir } from "@/lib/gallery";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await connectDB();
  const doc = await GalleryModel.findByIdAndDelete(id);
  if (doc) await unlink(path.join(uploadDir(), path.basename(doc.file))).catch(() => {});
  return NextResponse.json({ ok: true });
}
