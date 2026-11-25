"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { loginSchema } from "@/lib/validators";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import type { z } from "zod";

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });
  const onSubmit = handleSubmit(async (d) => {
    setErr("");
    const r = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
    if (r.ok) { router.replace("/admin"); router.refresh(); } else setErr((await r.json().catch(() => ({}))).error || "Login failed");
  });
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form onSubmit={onSubmit} noValidate className="w-full max-w-sm rounded-[3px] bg-white p-8 shadow-xl">
        <Logo />
        <h1 className="mt-8 text-2xl font-semibold text-navy">Admin sign in</h1>
        <div className="mt-6 grid gap-5">
          <Field id="email" label="Email" error={errors.email && "Enter a valid email"}><Input id="email" type="email" autoComplete="username" {...register("email")} /></Field>
          <Field id="password" label="Password" error={errors.password && "Enter your password"}><Input id="password" type="password" autoComplete="current-password" {...register("password")} /></Field>
          {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
          <Button type="submit" size="lg" disabled={isSubmitting}>{isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden />}Sign in</Button>
        </div>
      </form>
    </main>
  );
}
