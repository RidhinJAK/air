"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn } from "@/components/AnimateIn";

const faqs = [
  { q: "How is AirQuery different from ChatGPT on my data?", a: "LLMs hallucinate, give different answers each time, and can't explain reasoning. AirQuery uses Thinkbox — a neuro-symbolic engine grounding AI in verified business rules. Same question, same answer. Always." },
  { q: "What is Deterministic Intelligence?", a: "AI + Human Intelligence = DI. Every answer is grounded in your verified semantic model, uses metrics your team agreed on, and produces identical results for identical queries." },
  { q: "Which data sources are supported?", a: "Snowflake, BigQuery, Databricks, Redshift, PostgreSQL, MySQL, MongoDB, SQL Server, DuckDB, Oracle, Athena, Azure Synapse, and any JDBC-compatible database. Plus dbt models and Iceberg." },
  { q: "How does the Slack integration work?", a: "Install the Wise App, @airquery in any channel or thread. A reasoned, sourced answer appears in seconds. Pin answers, set alerts, share results." },
  { q: "Is my data secure?", a: "AirQuery queries in place — no copies, no movement. SOC 2 compliant, SSO/SAML, RBAC, complete audit logs. Enterprise can deploy on-premise." },
  { q: "Can I try it free?", a: "Yes. Starter is free forever — 100 queries/month, 1 data source, no credit card." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-32 lg:py-48">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header — full width, then offset Q&A below */}
        <AnimateIn variant="fadeUp" className="mb-20 lg:mb-28">
          <p className="type-caption text-bone-ghost mb-6">FAQ</p>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] type-heading text-bone max-w-[14ch]">
            Common questions
          </h2>
        </AnimateIn>

        {/* Two-column asymmetric: numbers left, Q&A right */}
        <div className="lg:ml-[16%]">
          {faqs.map((faq, i) => (
            <AnimateIn key={i} variant="fadeUp" delay={i * 0.03}>
              <div className={`border-t transition-colors duration-500 ${open === i ? "border-lux/15" : "border-bone-faint/8"}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start gap-6 lg:gap-10 py-7 text-left group"
                  aria-expanded={open === i}
                >
                  {/* Number */}
                  <span className={`type-mono shrink-0 mt-1.5 transition-colors duration-500 ${open === i ? "text-lux" : "text-bone-faint/30"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}
                  <span className={`text-[15px] lg:text-[17px] font-medium flex-1 pr-8 transition-colors duration-500 ${open === i ? "text-lux" : "text-bone group-hover:text-bone-soft"}`}>
                    {faq.q}
                  </span>

                  {/* Toggle — line morphing */}
                  <div className="shrink-0 mt-2 w-4 h-4 relative">
                    <motion.span
                      animate={{ rotate: open === i ? 180 : 0, opacity: open === i ? 0 : 1 }}
                      className="absolute top-1/2 left-0 w-full h-[1.5px] bg-bone-ghost -translate-y-1/2"
                    />
                    <motion.span
                      animate={{ rotate: open === i ? 0 : 90 }}
                      className="absolute top-1/2 left-0 w-full h-[1.5px] bg-bone-ghost -translate-y-1/2"
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-[calc(2rem+24px)] lg:pl-[calc(2.5rem+40px)] pb-8 pr-12">
                        <p className="text-[14px] type-body text-bone-muted max-w-xl">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimateIn>
          ))}
          <div className="border-t border-bone-faint/8" />
        </div>
      </div>
    </section>
  );
}
