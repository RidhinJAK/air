"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Ask", body: "Plain language. Workspace, Slack, Teams, or API.", visual: "input" },
  { num: "02", title: "Reason", body: "Thinkbox decomposes, deduces, reflects. AI + verified rules.", visual: "process" },
  { num: "03", title: "Trust", body: "Deterministic answer. Confidence, sources, full trace.", visual: "output" },
  { num: "04", title: "Act", body: "Share, alert, export, embed. Anywhere.", visual: "action" },
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Horizontal pan across steps
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-75%"]);

  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <p className="type-caption text-bone-ghost mb-6">Process</p>
          <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] type-heading text-bone max-w-[18ch]">
            From question to<br /><span className="text-lux">trusted answer</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <div ref={ref} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 lg:gap-10 pl-6 lg:pl-10 pr-[30vw]">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative shrink-0 w-[85vw] sm:w-[70vw] lg:w-[40vw] h-[65vh] rounded-2xl bg-void-card overflow-hidden edge-light group"
              >
                <div className="absolute inset-0 grain pointer-events-none" />
                <div className="relative z-10 h-full flex flex-col p-7 lg:p-10">
                  {/* Top: number + label */}
                  <div className="flex items-start justify-between mb-auto">
                    <span className="type-mono text-bone-faint/40">{step.num}</span>
                    <span className="type-caption text-lux">{step.title}</span>
                  </div>

                  {/* Center: unique visual per step */}
                  <div className="flex-1 flex items-center justify-center py-8">
                    {step.visual === "input" && (
                      <div className="w-full max-w-xs">
                        <div className="bg-white/[0.03] rounded-lg px-4 py-3 flex items-center gap-3 border border-white/[0.04]">
                          <motion.div
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="w-[2px] h-5 bg-lux rounded-full"
                          />
                          <span className="text-[12px] text-bone-ghost">Why did APAC revenue drop...</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {["Slack", "Teams", "API"].map(t => (
                            <span key={t} className="px-2 py-1 rounded bg-white/[0.03] text-[9px] text-bone-faint type-mono">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {step.visual === "process" && (
                      <div className="space-y-4 w-full max-w-xs">
                        {["Decompose", "Deduce", "Reflect", "Verify"].map((s, j) => (
                          <div key={s} className="flex items-center gap-3">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${55 + j * 12}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + j * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                              className="h-[2px] bg-gradient-to-r from-lux/30 to-transparent rounded-full"
                            />
                            <span className="type-mono text-bone-faint/40 shrink-0">{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {step.visual === "output" && (
                      <div className="text-center">
                        <div className="relative inline-block mb-4">
                          <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(200,255,0,0.06)" strokeWidth="3" />
                            <motion.circle
                              cx="50" cy="50" r="42" fill="none"
                              stroke="rgba(200,255,0,0.5)" strokeWidth="3" strokeLinecap="round"
                              strokeDasharray={264}
                              initial={{ strokeDashoffset: 264 }}
                              whileInView={{ strokeDashoffset: 2.64 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[16px] font-bold text-lux">99%</span>
                        </div>
                        <p className="type-mono text-bone-faint/40">confidence · verified</p>
                      </div>
                    )}
                    {step.visual === "action" && (
                      <div className="flex flex-wrap gap-2 justify-center max-w-xs">
                        {["Share", "Pin", "Alert", "Export", "Embed", "API"].map((a, j) => (
                          <motion.span
                            key={a}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.1 }}
                            className="px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.04] text-[11px] text-bone-muted hover:border-lux/20 hover:text-lux transition-all duration-300"
                          >
                            {a}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom: description */}
                  <p className="text-[14px] type-body text-bone-muted">{step.body}</p>
                </div>

                {/* Step number as giant watermark */}
                <span className="absolute -bottom-[0.15em] -right-[0.05em] text-[30vh] type-massive text-bone/[0.015] leading-none select-none pointer-events-none">
                  {step.num}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Progress indicator */}
          <div className="absolute bottom-10 left-6 lg:left-10 flex items-center gap-3">
            <motion.div className="w-16 h-[2px] bg-bone-faint/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-lux/40 rounded-full" style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} />
            </motion.div>
            <span className="type-mono text-bone-faint/30">scroll →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
