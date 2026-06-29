"use client";
import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  { name: "Starter", price: { m: "Free", a: "Free" }, sub: "forever", features: { "Queries / month": "100", "Data sources": "1", "Trace": "Basic", "Workspace": "✓", "Slack / Teams": "—", "API": "—", "Thinkboxes": "—", "SSO": "—" }, accent: false },
  { name: "Pro", price: { m: "$99", a: "$79" }, sub: "/mo", features: { "Queries / month": "∞", "Data sources": "5", "Trace": "Full", "Workspace": "✓", "Slack / Teams": "✓", "API": "✓", "Thinkboxes": "3", "SSO": "—" }, accent: true },
  { name: "Enterprise", price: { m: "Custom", a: "Custom" }, sub: "let's talk", features: { "Queries / month": "∞", "Data sources": "∞", "Trace": "Full+", "Workspace": "✓", "Slack / Teams": "✓", "API": "✓", "Thinkboxes": "∞", "SSO": "✓" }, accent: false },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="pt-20">
      <section className="py-24 lg:py-40 border-b border-bone-faint/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp">
            <p className="type-caption text-bone-ghost mb-10">Pricing</p>
            <h1 className="type-massive text-[clamp(3rem,7vw,5.5rem)] text-bone max-w-[14ch] mb-10">Simple, transparent</h1>
            <div className="flex items-center gap-3">
              <span className={`text-[12px] ${!annual ? "text-bone" : "text-bone-ghost"}`}>Monthly</span>
              <button onClick={() => setAnnual(!annual)} className={`relative w-11 h-6 rounded-full transition-colors ${annual ? "bg-lux" : "bg-bone-faint/20"}`} aria-label="Toggle billing">
                <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow transition-all ${annual ? "left-[22px] bg-void" : "left-0.5 bg-bone"}`} />
              </button>
              <span className={`text-[12px] ${annual ? "text-bone" : "text-bone-ghost"}`}>Annual <span className="text-lux text-[10px] ml-1">−20%</span></span>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((p, i) => (
              <AnimateIn key={p.name} variant="fadeUp" delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
                  className={`relative h-full rounded-2xl overflow-hidden ${p.accent ? "bg-lux" : "bg-void-card border border-bone-faint/8 edge-light"}`}>
                  <div className="absolute inset-0 grain pointer-events-none" />
                  <div className={`relative z-10 p-8 lg:p-10 h-full flex flex-col ${p.accent ? "text-void" : ""}`}>
                    {p.accent && <span className="inline-flex self-start px-2 py-0.5 rounded-full bg-void text-lux text-[10px] font-semibold tracking-wide uppercase mb-4">Popular</span>}
                    <p className={`text-[12px] font-medium mb-1 ${p.accent ? "text-void/60" : "text-bone-ghost"}`}>{p.name}</p>
                    <div className="mb-8">
                      <span className={`text-[clamp(2.5rem,4vw,3.5rem)] type-massive ${p.accent ? "text-void" : "text-bone"}`}>{annual ? p.price.a : p.price.m}</span>
                      <span className={`text-[12px] ml-1.5 ${p.accent ? "text-void/40" : "text-bone-ghost"}`}>{p.sub}</span>
                    </div>
                    <div className="space-y-3 mb-8 flex-1">
                      {Object.entries(p.features).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between">
                          <span className={`text-[13px] ${p.accent ? "text-void/60" : "text-bone-muted"}`}>{k}</span>
                          <span className={`text-[13px] font-medium ${v === "—" ? (p.accent ? "text-void/20" : "text-bone-faint/30") : v === "✓" ? "text-lux" : (p.accent ? "text-void" : "text-bone")}`}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" className={`block text-center text-[11px] font-semibold tracking-wide uppercase py-3 rounded-full transition-all ${p.accent ? "bg-void text-lux hover:bg-void/90" : "border border-bone-faint/15 text-bone hover:border-lux-border hover:text-lux"}`}>
                      {i === 2 ? "Contact sales" : i === 1 ? "Start trial" : "Start free"}
                    </Link>
                  </div>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
