import { readFile } from "node:fs/promises";
import path from "node:path";
import { uploadDir } from "@/lib/gallery";

// Serves files from the persistent volume. basename() blocks path traversal.
export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const name = path.basename((await params).path.join("/"));
  if (!/\.webp$/.test(name)) return new Response("Not found", { status: 404 });
  try {
    const buf = await readFile(path.join(uploadDir(), name));
    return new Response(new Uint8Array(buf), { headers: { "Content-Type": "image/webp", "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch { return new Response("Not found", { status: 404 }); }
}
