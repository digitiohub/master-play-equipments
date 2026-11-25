import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { connectDB } from "@/lib/db";
import { GalleryModel } from "@/models";
import { getAdmin } from "@/lib/auth";
import { uploadDir } from "@/lib/gallery";
import { categories } from "@/data/categories";

export async function GET() {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  return NextResponse.json({ items: await GalleryModel.find().sort({ createdAt: -1 }).lean() });
}

export async function POST(req: Request) {
  if (!(await getAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || !/^image\/(jpeg|png|webp)$/.test(file.type)) return NextResponse.json({ error: "Upload a JPG, PNG or WebP image" }, { status: 400 });
  if (file.size > 12 * 1024 * 1024) return NextResponse.json({ error: "Image must be under 12 MB" }, { status: 400 });
  const category = String(form?.get("category") ?? "");
  const caption = String(form?.get("caption") ?? "").slice(0, 160);
  try {
    // Re-encode: strips metadata, caps size, and guarantees the stored bytes are really an image.
    const { data, info } = await sharp(Buffer.from(await file.arrayBuffer())).rotate().resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true });
    const name = `${randomUUID()}.webp`;
    await mkdir(uploadDir(), { recursive: true });
    await writeFile(path.join(uploadDir(), name), data);
    await connectDB();
    const doc = await GalleryModel.create({ file: name, caption, category: categories.some((c) => c.slug === category) ? category : "", w: info.width, h: info.height });
    return NextResponse.json({ item: doc }, { status: 201 });
  } catch (e) {
    console.error("upload failed", e);
    return NextResponse.json({ error: "Could not process that image" }, { status: 500 });
  }
}
