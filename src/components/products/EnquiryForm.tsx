"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { enquirySchema, type EnquiryInput } from "@/lib/validators";
import { categories } from "@/data/categories";
import { waLink } from "@/lib/site";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; msg: string };

export function EnquiryForm({ defaultProduct = "", source = "contact-form", compact, dark }: { defaultProduct?: string; source?: string; compact?: boolean; dark?: boolean }) {
  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", organization: "", email: "", phone: "", product: defaultProduct, location: "", message: "", source, website: "" },
  });
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(data: EnquiryInput) {
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, source }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "We couldn't send your enquiry. Please try WhatsApp or call us.");
      setState({ kind: "ok" });
      reset();
    } catch (e) {
      setState({ kind: "error", msg: e instanceof Error ? e.message : "Something went wrong." });
    }
  }

  const whatsapp = () => {
    const v = getValues();
    const lines = [`Hello Master Play Equipments, I'd like a quotation.`, v.name && `Name: ${v.name}`, v.organization && `Organization: ${v.organization}`, v.product && `Interested in: ${v.product}`, v.location && `Project location: ${v.location}`, v.message && `Details: ${v.message}`].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  if (state.kind === "ok")
    return (
      <div role="status" className={`py-10 ${dark ? "text-white" : "text-navy"}`}>
        <CheckCircle2 className="size-12 text-lime-ink" aria-hidden />
        <h3 className="mt-4 text-2xl font-semibold">Enquiry received.</h3>
        <p className="mt-2 max-w-sm opacity-75">Thank you — our team will get back to you shortly. For anything urgent, call or WhatsApp us directly.</p>
        <Button variant="dark" className="mt-6" onClick={() => setState({ kind: "idle" })}>Send another enquiry</Button>
      </div>
    );

  const e = (k: keyof EnquiryInput) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const sending = state.kind === "sending";
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`grid gap-x-8 gap-y-5 ${compact ? "" : "sm:grid-cols-2"} ${dark ? "text-white [&_input]:text-white [&_select]:text-white [&_textarea]:text-white [&_input]:border-white/25 [&_select]:border-white/25 [&_textarea]:border-white/25 [&_option]:text-ink" : ""}`}>
      <Field id="name" label="Name" required error={errors.name?.message} dark={dark}><Input id="name" autoComplete="name" {...e("name")} {...register("name")} /></Field>
      <Field id="organization" label="Company / Organization" error={errors.organization?.message} dark={dark}><Input id="organization" autoComplete="organization" {...register("organization")} /></Field>
      <Field id="email" label="Email" required error={errors.email?.message} dark={dark}><Input id="email" type="email" autoComplete="email" {...e("email")} {...register("email")} /></Field>
      <Field id="phone" label="Phone number" required error={errors.phone?.message} dark={dark}><Input id="phone" type="tel" autoComplete="tel" inputMode="tel" {...e("phone")} {...register("phone")} /></Field>
      <Field id="product" label="Product interest" error={errors.product?.message} dark={dark}>
        <Select id="product" {...register("product")}>
          <option value="">Select a category…</option>
          {defaultProduct && !categories.some((c) => c.name === defaultProduct) && <option value={defaultProduct}>{defaultProduct}</option>}
          {categories.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
          <option value="Not sure yet">Not sure yet</option>
        </Select>
      </Field>
      <Field id="location" label="Project location" error={errors.location?.message} dark={dark}><Input id="location" autoComplete="address-level2" placeholder="City / State" {...register("location")} /></Field>
      <div className={compact ? "" : "sm:col-span-2"}>
        <Field id="message" label="Message" error={errors.message?.message} dark={dark}><Textarea id="message" rows={3} placeholder="Tell us about your space, age group and quantity…" {...register("message")} /></Field>
      </div>
      {/* honeypot: hidden from people, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>
      {state.kind === "error" && <p role="alert" className="rounded-[3px] bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">{state.msg}</p>}
      <div className={`flex flex-wrap gap-3 ${compact ? "" : "sm:col-span-2"}`}>
        <Button type="submit" size="lg" disabled={sending} arrow={!sending}>{sending ? <><Loader2 className="size-4 animate-spin" aria-hidden />Sending…</> : "Send enquiry"}</Button>
        <Button type="button" size="lg" variant={dark ? "outline" : "dark"} onClick={whatsapp}><MessageCircle className="size-4" aria-hidden />WhatsApp instead</Button>
      </div>
    </form>
  );
}
