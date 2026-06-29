"use client";

import { motion } from "framer-motion";
import { AnimateIn } from "@/components/AnimateIn";
import Link from "next/link";

const plans = [
  { name: "Starter", price: "Free", sub: "forever", items: ["100 queries/mo", "1 source", "Basic trace", "Community"], accent: false },
  { name: "Pro", price: "$99", sub: "/mo", items: ["Unlimited queries", "5 sources", "Full trace", "Slack & Teams", "API", "Custom Thinkboxes"], accent: true },
  { name: "Enterprise", price: "Custom", sub: "let's talk", items: ["Everything in Pro", "Unlimited sources", "SSO & SAML", "Dedicated CSM", "On-premise", "SLA"], accent: false },
];

export function PricingPreview() {
  return (
    <section className="relative py-32 lg:py-48">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header — massive left, description right */}
        <AnimateIn variant="fadeUp" className="mb-20 lg:mb-28">
          <div className="lg:flex lg:items-end lg:justify-between gap-12">
            <div>
              <p className="type-caption text-bone-ghost mb-6">Pricing</p>
              <h2 className="text-[clamp(3rem,7vw,5.5rem)] type-massive text-bone">
                Start free.<br/><span className="text-lux">Scale with trust.</span>
              </h2>
            </div>
            <p className="text-[13px] text-bone-muted max-w-xs mt-6 lg:mt-0 type-body">
              No credit card. No surprise bills.
            </p>
          </div>
        </AnimateIn>

        {/* Plans — the Pro plan visually dominates */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-0 items-stretch">
          {/* Starter — left, compact */}
          <AnimateIn variant="fadeUp" className="lg:col-span-3">
            <div className="h-full rounded-2xl lg:rounded-r-none bg-void-card p-7 lg:p-8 flex flex-col edge-light relative overflow-hidden">
              <div className="absolute inset-0 grain pointer-events-none" />
              <div className="relative z-10 flex-1 flex flex-col">
                <p className="text-[12px] text-bone-ghost mb-1">{plans[0].name}</p>
                <p className="text-[clamp(2rem,4vw,3rem)] type-massive text-bone mb-1">{plans[0].price}</p>
                <p className="text-[11px] text-bone-faint mb-8">{plans[0].sub}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plans[0].items.map(it => (
                    <li key={it} className="flex items-center gap-2 text-[12px] text-bone-muted">
                      <span className="w-1 h-1 rounded-full bg-bone-faint" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block text-center text-[11px] tracking-[0.06em] uppercase text-bone-muted border border-bone-faint/15 py-2.5 rounded-full hover:border-lux/20 hover:text-lux transition-all duration-300">Start free</Link>
              </div>
            </div>
          </AnimateIn>

          {/* Pro — center, elevated, lime */}
          <AnimateIn variant="fadeUp" delay={0.1} className="lg:col-span-6">
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-2xl bg-lux relative overflow-hidden shadow-[0_20px_60px_rgba(200,255,0,0.08)]">
              <div className="absolute inset-0 grain pointer-events-none" />
              <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col text-void">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-void text-lux text-[9px] font-semibold tracking-[0.1em] uppercase mb-3">Recommended</span>
                    <p className="text-[12px] text-void/50">{plans[1].name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[clamp(2.5rem,5vw,4rem)] type-massive text-void">{plans[1].price}</p>
                    <p className="text-[11px] text-void/40">{plans[1].sub}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 flex-1">
                  {plans[1].items.map(it => (
                    <div key={it} className="flex items-center gap-2 text-[13px] text-void/70">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-void/50 shrink-0"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {it}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="block text-center text-[11px] font-semibold tracking-[0.06em] uppercase bg-void text-lux py-3 rounded-full hover:bg-void/90 transition-colors">Start trial</Link>
              </div>
            </motion.div>
          </AnimateIn>

          {/* Enterprise — right, compact */}
          <AnimateIn variant="fadeUp" delay={0.2} className="lg:col-span-3">
            <div className="h-full rounded-2xl lg:rounded-l-none bg-void-card p-7 lg:p-8 flex flex-col edge-light relative overflow-hidden">
              <div className="absolute inset-0 grain pointer-events-none" />
              <div className="relative z-10 flex-1 flex flex-col">
                <p className="text-[12px] text-bone-ghost mb-1">{plans[2].name}</p>
                <p className="text-[clamp(2rem,4vw,3rem)] type-massive text-bone mb-1">{plans[2].price}</p>
                <p className="text-[11px] text-bone-faint mb-8">{plans[2].sub}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plans[2].items.map(it => (
                    <li key={it} className="flex items-center gap-2 text-[12px] text-bone-muted">
                      <span className="w-1 h-1 rounded-full bg-bone-faint" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block text-center text-[11px] tracking-[0.06em] uppercase text-bone-muted border border-bone-faint/15 py-2.5 rounded-full hover:border-lux/20 hover:text-lux transition-all duration-300">Contact sales</Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
