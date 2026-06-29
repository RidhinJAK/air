"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { quote: "AirQuery eliminated our BI backlog overnight. Finance self-serves questions that used to take weeks.", name: "Sarah Kim", role: "VP Finance", co: "TechCorp" },
  { quote: "The deterministic guarantee changed everything. Same answer every time — sourced and auditable.", name: "Marcus Lee", role: "Head of Data", co: "ScaleUp" },
  { quote: "We embedded AirQuery via API in an afternoon. Our customers get analytics-grade answers.", name: "Jessica Liu", role: "CTO", co: "DataFlow" },
  { quote: "The Slack integration is the killer feature. @airquery in any channel — decisions happen in threads.", name: "David Park", role: "Sales Ops", co: "GrowthEngine" },
];

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % testimonials.length), 7000); return () => clearInterval(t); }, []);
  const t = testimonials[i];

  return (
    <section className="relative py-40 lg:py-56 overflow-hidden">
      {/* Giant quotation mark — architectural backdrop */}
      <div className="absolute top-[10%] -left-[8vw] text-[50vw] type-massive text-bone/[0.012] leading-none select-none pointer-events-none" aria-hidden="true">
        &ldquo;
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <p className="type-caption text-bone-ghost mb-16 lg:mb-24">Voices</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(6px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Quote — full width, massive type */}
            <blockquote className="text-[clamp(1.6rem,4vw,3.2rem)] type-heading text-bone leading-[1.1] mb-16 max-w-[28ch]">
              {t.quote}
            </blockquote>

            {/* Attribution — offset right */}
            <div className="lg:ml-[40%] flex items-center gap-5">
              <div className="w-12 h-px bg-lux/30" />
              <div>
                <p className="text-[14px] font-semibold text-bone">{t.name}</p>
                <p className="text-[12px] text-bone-ghost">{t.role}, {t.co}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots — minimal, bottom-right */}
        <div className="mt-20 lg:mt-32 flex items-center gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className="relative h-[2px] overflow-hidden rounded-full transition-all duration-500"
              style={{ width: idx === i ? 48 : 16 }}
            >
              <div className="absolute inset-0 bg-bone-faint/15" />
              {idx === i && (
                <motion.div
                  className="absolute inset-0 bg-lux/50"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
