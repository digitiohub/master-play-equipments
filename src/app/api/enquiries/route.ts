import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { enquirySchema } from "@/lib/validators";
import { EnquiryModel } from "@/models";
import { ipOf, rateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  if (!rateLimit(`enq:${ipOf(req)}`, 5, 10 * 60_000)) return NextResponse.json({ error: "Too many enquiries — please wait a few minutes or call us." }, { status: 429 });
  const parsed = enquirySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid details" }, { status: 400 });
  const { website, ...data } = parsed.data;
  if (website) return NextResponse.json({ ok: true }); // honeypot tripped: pretend success to bots
  try {
    await connectDB();
    await EnquiryModel.create(data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("enquiry save failed", e);
    return NextResponse.json({ error: "We couldn't save your enquiry right now. Please WhatsApp or call us." }, { status: 503 });
  }
}
