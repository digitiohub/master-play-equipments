// shortcut: in-memory per-instance limiter; fine for one container, swap for Redis/Mongo TTL if you scale out.
const hits = new Map<string, number[]>();
export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) { hits.set(key, arr); return false; }
  arr.push(now); hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return true;
}
export const ipOf = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
