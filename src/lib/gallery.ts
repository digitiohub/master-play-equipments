import { connectDB } from "./db";
import { GalleryModel } from "@/models";
import { categories } from "@/data/categories";
import type { GalleryImage } from "@/data/products";

export const uploadDir = () => process.env.UPLOAD_DIR || "./data/uploads";

// Admin-uploaded photos; the site keeps working (static gallery only) if the database is unreachable.
export async function getUploadedGallery(): Promise<GalleryImage[]> {
  try {
    await connectDB();
    const docs = await GalleryModel.find().sort({ createdAt: -1 }).lean<{ file: string; caption: string; category: string; w: number; h: number }[]>();
    return docs.map((d) => {
      const c = categories.find((x) => x.slug === d.category);
      return { src: `/uploads/${d.file}`, alt: d.caption || "Master Play installation", category: c?.slug ?? "installations", categoryName: c?.name ?? "Latest installations", w: d.w, h: d.h };
    });
  } catch { return []; }
}
