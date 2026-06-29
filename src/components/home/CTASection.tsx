"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmax] h-[40vmax] bg-lux/[0.02] blur-[120px] rounded-full" />
      </div>
      <div className="absolute inset-0 grain pointer-events-none" />

      <motion.div style={{ scale, opacity }} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
        {/* Formula */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {["AI", "+", "HI", "=", "DI"].map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.6 }}
              className={`type-mono text-[13px] ${item === "DI" ? "text-lux font-bold" : "text-bone-faint"}`}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <h2 className="type-massive text-[clamp(3rem,9vw,9rem)] text-bone mb-6 max-w-[16ch] mx-auto">
          Ready to<br /><span className="text-lux">trust</span>?
        </h2>

        <p className="text-[14px] type-body text-bone-muted mb-14 max-w-sm mx-auto">
          No credit card. Free to try. Join 2,000+ teams.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] uppercase bg-lux text-void px-8 py-4 rounded-full overflow-hidden active:scale-[0.97] transition-transform duration-200"
          >
            <span className="relative z-10">Start for free</span>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="relative z-10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M3 10L10 3M10 3H4.5M10 3V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
          <Link href="/contact" className="text-[12px] text-bone-ghost hover:text-bone transition-colors px-3 py-4">
            Talk to sales →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
