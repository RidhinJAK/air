"use client";
import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setStatus("loading");
    const f = e.currentTarget; const data = Object.fromEntries(new FormData(f));
    try { const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); if (r.ok) { setStatus("success"); f.reset(); } else setStatus("error"); } catch { setStatus("error"); }
  };

  return (
    <div className="pt-20">
      <section className="py-24 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <AnimateIn variant="fadeUp" className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="type-caption text-bone-ghost mb-10">Contact</p>
                <h1 className="type-massive text-[clamp(3rem,6vw,5rem)] text-bone mb-8">Let&apos;s talk</h1>
                <p className="text-[15px] type-body text-bone-muted mb-16">Ready for deterministic analytics? We typically respond within 24 hours.</p>
                <div className="space-y-6">
                  {[{ l: "Email", v: "hello@airquery.com" }, { l: "Location", v: "San Francisco, CA" }, { l: "Response", v: "< 24 hours" }].map(i => (
                    <div key={i.l}><p className="type-caption text-bone-ghost mb-1">{i.l}</p><p className="text-[14px] text-bone font-medium">{i.v}</p></div>
                  ))}
                </div>
              </div>
            </AnimateIn>
            <AnimateIn variant="fadeUp" delay={0.1} className="lg:col-span-7">
              <div className="rounded-2xl bg-void-card border border-bone-faint/8 p-8 lg:p-12 edge-light relative overflow-hidden">
                <div className="absolute inset-0 grain pointer-events-none" />
                {status === "success" ? (
                  <div className="relative z-10 text-center py-20">
                    <div className="w-12 h-12 rounded-full bg-lux/10 border border-lux-border flex items-center justify-center mx-auto mb-4">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-lux"><path d="M5 10L9 14L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <h3 className="text-xl font-semibold text-bone mb-2">Message sent</h3>
                    <p className="text-[14px] text-bone-muted">We&apos;ll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="relative z-10 space-y-8">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div><label htmlFor="name" className="type-caption text-bone-ghost mb-3 block">Name</label><input id="name" name="name" required placeholder="Jane Smith" className="w-full bg-transparent border-b border-bone-faint/15 text-[14px] text-bone placeholder:text-bone-faint py-3 focus:outline-none focus:border-lux transition-colors" /></div>
                      <div><label htmlFor="email" className="type-caption text-bone-ghost mb-3 block">Email</label><input id="email" name="email" type="email" required placeholder="jane@company.com" className="w-full bg-transparent border-b border-bone-faint/15 text-[14px] text-bone placeholder:text-bone-faint py-3 focus:outline-none focus:border-lux transition-colors" /></div>
                    </div>
                    <div><label htmlFor="company" className="type-caption text-bone-ghost mb-3 block">Company</label><input id="company" name="company" placeholder="Acme Inc" className="w-full bg-transparent border-b border-bone-faint/15 text-[14px] text-bone placeholder:text-bone-faint py-3 focus:outline-none focus:border-lux transition-colors" /></div>
                    <div><label htmlFor="message" className="type-caption text-bone-ghost mb-3 block">Message</label><textarea id="message" name="message" required rows={4} placeholder="Tell us about your analytics needs..." className="w-full bg-transparent border-b border-bone-faint/15 text-[14px] text-bone placeholder:text-bone-faint py-3 focus:outline-none focus:border-lux transition-colors resize-none" /></div>
                    {status === "error" && <p className="text-[12px] text-red-400">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={status === "loading"} className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase bg-lux text-void px-6 py-3 rounded-full hover:bg-lux/90 active:scale-[0.97] transition-all disabled:opacity-50">
                      {status === "loading" ? <span className="w-4 h-4 border-2 border-void/30 border-t-void rounded-full animate-spin" /> : null}
                      {status === "loading" ? "Sending..." : "Send message"}
                    </button>
                  </form>
                )}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </div>
  );
}
