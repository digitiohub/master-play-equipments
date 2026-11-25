import mongoose from "mongoose";

const g = globalThis as unknown as { _mongo?: { conn: typeof mongoose | null; p: Promise<typeof mongoose> | null } };
const cache = (g._mongo ??= { conn: null, p: null });

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (cache.conn) return cache.conn;
  cache.p ??= mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 8000 });
  try { cache.conn = await cache.p; } catch (e) { cache.p = null; throw e; }
  return cache.conn;
}
