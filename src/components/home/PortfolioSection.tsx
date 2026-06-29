"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimateIn } from "@/components/AnimateIn";

const cases = [
  { title: "Revenue Forecast Engine", tag: "Finance", metric: "−34%", sub: "forecast error", desc: "Fortune 500 retail — predictive analytics grounded in Thinkbox." },
  { title: "Pipeline Intelligence", tag: "Sales", metric: "+28%", sub: "close rate", desc: "SaaS — AI deal scoring with verified metrics." },
  { title: "Supply Chain Visibility", tag: "Supply Chain", metric: "$12M", sub: "saved annually", desc: "Manufacturing — end-to-end, zero data copies." },
  { title: "Churn Prediction", tag: "Product", metric: "−41%", sub: "churn rate", desc: "Subscription — deterministic retention signals." },
];

export function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative py-32 lg:py-48">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header — dramatic offset */}
        <AnimateIn variant="fadeUp" className="mb-20 lg:mb-32">
          <p className="type-caption text-bone-ghost mb-6">Impact</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-[clamp(3rem,7vw,6rem)] type-massive text-bone leading-none">
              Real<br/>results
            </h2>
            <p className="text-[13px] text-bone-muted max-w-xs lg:text-right type-body">
              Deterministic intelligence delivering measurable outcomes across industries.
            </p>
          </div>
        </AnimateIn>

        {/* Bento-style asymmetric layout — no two items look the same */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Featured case — spans 7 columns, tall */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0.1, 0.6], [40, -20]) }}
            className="lg:col-span-7 lg:row-span-2"
          >
            <AnimateIn variant="fadeUp">
              <div className="relative h-full min-h-[400px] lg:min-h-[560px] rounded-2xl bg-void-card overflow-hidden edge-light group cursor-default">
                <div className="absolute inset-0 grain pointer-events-none" />
                {/* Metric as massive background element */}
                <span className="absolute -bottom-[0.1em] -right-[0.05em] text-[min(35vw,280px)] type-massive text-lux/[0.04] leading-none select-none pointer-events-none">
                  {cases[0].metric}
                </span>
                <div className="relative z-10 h-full flex flex-col justify-between p-7 lg:p-10">
                  <div className="flex justify-between items-start">
                    <span className="type-caption text-lux">{cases[0].tag}</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-bone-faint/20 group-hover:text-lux group-hover:rotate-45 transition-all duration-700"><path d="M5 13L13 5M13 5H6.5M13 5V11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <p className="text-[clamp(3.5rem,8vw,6rem)] type-massive text-lux leading-none mb-3">{cases[0].metric}</p>
                    <p className="type-mono text-bone-faint mb-6">{cases[0].sub}</p>
                    <h3 className="text-[20px] font-semibold text-bone mb-2 group-hover:text-lux transition-colors duration-500">{cases[0].title}</h3>
                    <p className="text-[13px] text-bone-muted">{cases[0].desc}</p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </motion.div>

          {/* Remaining cases — 5 columns, stacked */}
          {cases.slice(1).map((c, i) => (
            <motion.div
              key={c.title}
              style={{ y: useTransform(scrollYProgress, [0.15 + i * 0.05, 0.6 + i * 0.05], [60 + i * 20, 0]) }}
              className="lg:col-span-5"
            >
              <AnimateIn variant="fadeUp" delay={i * 0.08}>
                <div className="relative rounded-2xl bg-void-card overflow-hidden edge-light group cursor-default p-6 lg:p-7">
                  <div className="absolute inset-0 grain pointer-events-none" />
                  <div className="relative z-10 flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <span className="type-caption text-lux block mb-4">{c.tag}</span>
                      <p className="text-[clamp(2rem,4vw,3rem)] type-massive text-lux leading-none mb-1">{c.metric}</p>
                      <p className="type-mono text-bone-faint mb-4">{c.sub}</p>
                      <h3 className="text-[15px] font-semibold text-bone mb-1 group-hover:text-lux transition-colors duration-500">{c.title}</h3>
                      <p className="text-[12px] text-bone-muted">{c.desc}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-bone-faint/20 group-hover:text-lux group-hover:rotate-45 transition-all duration-700 mt-1"><path d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </AnimateIn>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
