"use client";
import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState<"idle"|"loading"|"error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setStatus("loading"); setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try { const r = await fetch("/api/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); const j = await r.json(); if (r.ok) router.push("/dashboard"); else { setError(j.error||"Failed"); setStatus("error"); } } catch { setError("Error"); setStatus("error"); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="absolute inset-0 grain pointer-events-none z-0" />
      <AnimateIn variant="scale" className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-6 h-6 rounded-md bg-lux flex items-center justify-center"><svg viewBox="0 0 20 20" fill="none" className="w-3 h-3"><path d="M4 16L10 4L16 16" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11H13" stroke="#050505" strokeWidth="2.5" strokeLinecap="round"/></svg></div>
            <span className="text-[14px] font-semibold text-bone tracking-tight">airquery</span>
          </Link>
          <h1 className="text-2xl type-heading text-bone mb-1">Create account</h1>
          <p className="text-[13px] text-bone-ghost">100 free queries. No credit card.</p>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <div><label htmlFor="name" className="type-caption text-bone-ghost mb-2 block">Name</label><input id="name" name="name" required placeholder="Jane Smith" className="w-full px-4 py-3 rounded-xl bg-void-card border border-bone-faint/10 text-[14px] text-bone placeholder:text-bone-faint focus:outline-none focus:border-lux-border transition-colors" /></div>
          <div><label htmlFor="email" className="type-caption text-bone-ghost mb-2 block">Email</label><input id="email" name="email" type="email" required placeholder="you@company.com" className="w-full px-4 py-3 rounded-xl bg-void-card border border-bone-faint/10 text-[14px] text-bone placeholder:text-bone-faint focus:outline-none focus:border-lux-border transition-colors" /></div>
          <div><label htmlFor="password" className="type-caption text-bone-ghost mb-2 block">Password</label>
            <div className="relative"><input id="password" name="password" type={showPw?"text":"password"} required minLength={8} placeholder="Min 8 characters" className="w-full px-4 py-3 rounded-xl bg-void-card border border-bone-faint/10 text-[14px] text-bone placeholder:text-bone-faint focus:outline-none focus:border-lux-border transition-colors pr-14" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-bone-ghost hover:text-bone transition-colors" aria-label="Toggle">{showPw?"Hide":"Show"}</button>
            </div>
          </div>
          {error && <p className="text-[12px] text-red-400 bg-red-400/5 px-4 py-2 rounded-lg">{error}</p>}
          <button type="submit" disabled={status==="loading"} className="w-full text-[11px] font-semibold tracking-wide uppercase bg-lux text-void py-3 rounded-full hover:bg-lux/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {status==="loading" && <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin" />}Create account
          </button>
        </form>
        <p className="text-center text-[13px] text-bone-ghost mt-8">Have an account? <Link href="/login" className="text-lux hover:underline underline-offset-4 font-medium">Sign in</Link></p>
      </AnimateIn>
    </div>
  );
}
