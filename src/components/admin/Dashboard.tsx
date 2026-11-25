"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, Trash2, Upload } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

type Enquiry = { _id: string; name: string; organization?: string; email: string; phone: string; product?: string; location?: string; message?: string; source?: string; status: "new" | "contacted" | "closed"; createdAt: string };
type GItem = { _id: string; file: string; caption: string; category: string };
const statuses = ["new", "contacted", "closed"] as const;
const badge: Record<string, string> = { new: "bg-orange text-navy-deep", contacted: "bg-lime text-navy-deep", closed: "bg-navy/10 text-navy" };

export function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"enquiries" | "gallery">("enquiries");
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.replace("/admin/login"); router.refresh(); };
  return (
    <>
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <button onClick={logout} className="flex h-10 items-center gap-2 px-2 text-sm font-semibold text-navy hover:text-orange-ink"><LogOut className="size-4" aria-hidden />Sign out</button>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div role="tablist" aria-label="Admin sections" className="mb-8 flex gap-2">
          {(["enquiries", "gallery"] as const).map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("h-11 rounded-[3px] px-5 font-display font-semibold capitalize", tab === t ? "bg-navy text-white" : "bg-white text-navy")}>{t}</button>)}
        </div>
        {tab === "enquiries" ? <Enquiries /> : <GalleryAdmin />}
      </div>
    </>
  );
}

function Enquiries() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const load = useCallback(async () => {
    const r = await fetch(`/api/admin/enquiries?status=${status}&q=${encodeURIComponent(q)}`);
    if (!r.ok) return setErr("Could not load enquiries");
    const j = await r.json(); setItems(j.items); setCounts(j.counts); setErr("");
  }, [status, q]);
  useEffect(() => { const t = setTimeout(load, 200); return () => clearTimeout(t); }, [load]);
  const setS = async (id: string, s: string) => { await fetch(`/api/admin/enquiries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: s }) }); load(); };
  const del = async (id: string) => { if (confirm("Delete this enquiry permanently?")) { await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" }); load(); } };
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {statuses.map((s) => <button key={s} onClick={() => setStatus(status === s ? "" : s)} aria-pressed={status === s} className={cn("rounded-[3px] bg-white p-4 text-left ring-2 transition", status === s ? "ring-orange" : "ring-transparent")}><p className="font-display text-3xl font-bold text-navy">{counts[s] ?? 0}</p><p className="eyebrow mt-1 text-[11px] text-ink/60">{s}</p></button>)}
      </div>
      <label className="mt-6 block"><span className="sr-only">Search enquiries</span><input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Search name, email, phone, product…" className="h-12 w-full rounded-[3px] border border-navy/15 bg-white px-4 text-base focus:border-orange focus:outline-none" /></label>
      {err && <p role="alert" className="mt-4 text-red-600">{err}</p>}
      <ul className="mt-6 grid gap-3">
        {items.map((e) => (
          <li key={e._id} className="rounded-[3px] bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-navy">{e.name}{e.organization && <span className="font-normal text-ink/60"> · {e.organization}</span>}</p>
                <p className="mt-1 flex flex-wrap gap-x-4 text-sm"><a className="text-orange-ink hover:underline" href={`tel:${e.phone}`}>{e.phone}</a><a className="break-all text-orange-ink hover:underline" href={`mailto:${e.email}`}>{e.email}</a></p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("rounded-[3px] px-2 py-1 text-xs font-bold uppercase", badge[e.status])}>{e.status}</span>
                <select aria-label="Change status" value={e.status} onChange={(ev) => setS(e._id, ev.target.value)} className="h-10 rounded-[3px] border border-navy/15 bg-white px-2 text-sm">{statuses.map((s) => <option key={s}>{s}</option>)}</select>
                <button aria-label={`Delete enquiry from ${e.name}`} onClick={() => del(e._id)} className="grid size-10 place-items-center text-ink/50 hover:text-red-600"><Trash2 className="size-4" /></button>
              </div>
            </div>
            <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              {e.product && <div><dt className="inline text-ink/50">Interest: </dt><dd className="inline">{e.product}</dd></div>}
              {e.location && <div><dt className="inline text-ink/50">Location: </dt><dd className="inline">{e.location}</dd></div>}
            </dl>
            {e.message && <p className="mt-3 whitespace-pre-wrap rounded-[3px] bg-paper p-3 text-sm">{e.message}</p>}
            <p className="mt-3 text-xs text-ink/50">{new Date(e.createdAt).toLocaleString("en-IN")} · {e.source}</p>
          </li>
        ))}
        {!items.length && !err && <li className="py-16 text-center text-ink/60">No enquiries yet.</li>}
      </ul>
    </div>
  );
}

function GalleryAdmin() {
  const [items, setItems] = useState<GItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const load = useCallback(async () => { const r = await fetch("/api/admin/gallery"); if (r.ok) setItems((await r.json()).items); }, []);
  useEffect(() => { load(); }, [load]);
  async function upload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const form = e.currentTarget;
    const r = await fetch("/api/admin/gallery", { method: "POST", body: new FormData(form) });
    if (r.ok) { form.reset(); load(); } else setErr((await r.json().catch(() => ({}))).error || "Upload failed");
    setBusy(false);
  }
  const del = async (id: string) => { if (confirm("Remove this photo from the gallery?")) { await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" }); load(); } };
  const inp = "h-12 w-full rounded-[3px] border border-navy/15 bg-white px-3 text-base focus:border-orange focus:outline-none";
  return (
    <div>
      <form onSubmit={upload} className="grid gap-3 rounded-[3px] bg-white p-5 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
        <label className="block text-sm font-semibold text-navy">Photo (JPG/PNG/WebP, ≤12 MB)<input required name="file" type="file" accept="image/jpeg,image/png,image/webp" className={`${inp} mt-1 pt-2.5`} /></label>
        <label className="block text-sm font-semibold text-navy">Caption<input name="caption" maxLength={160} className={`${inp} mt-1`} /></label>
        <label className="block text-sm font-semibold text-navy">Category<select name="category" className={`${inp} mt-1`}><option value="">Latest installations</option>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label>
        <Button type="submit" size="lg" disabled={busy}><Upload className="size-4" aria-hidden />{busy ? "Uploading…" : "Upload"}</Button>
      </form>
      {err && <p role="alert" className="mt-3 text-red-600">{err}</p>}
      <p className="mt-4 text-sm text-ink/60">Uploaded photos appear on the public Projects page within about a minute.</p>
      <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((i) => (
          <li key={i._id} className="overflow-hidden rounded-[3px] bg-white">
            <div className="relative aspect-square"><Image src={`/uploads/${i.file}`} alt={i.caption || "Gallery photo"} fill sizes="25vw" className="object-cover" /></div>
            <div className="flex items-center justify-between gap-2 p-3 text-sm"><span className="truncate">{i.caption || "—"}</span><button aria-label="Delete photo" onClick={() => del(i._id)} className="grid size-9 shrink-0 place-items-center text-ink/50 hover:text-red-600"><Trash2 className="size-4" /></button></div>
          </li>
        ))}
        {!items.length && <li className="col-span-full py-16 text-center text-ink/60">No uploaded photos yet.</li>}
      </ul>
    </div>
  );
}
