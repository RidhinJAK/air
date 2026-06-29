"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.6]);

  // Cursor-reactive ambient light
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative min-h-[200vh]">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Cursor-reactive ambient light */}
        <motion.div
          className="absolute w-[70vmax] h-[70vmax] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200,255,0,0.035) 0%, transparent 60%)",
            left: useTransform(springX, v => `${v * 100 - 35}%`),
            top: useTransform(springY, v => `${v * 100 - 35}%`),
          }}
        />

        {/* Grain */}
        <div className="absolute inset-0 grain pointer-events-none z-[2]" />

        {/* Scroll darkening overlay */}
        <motion.div className="absolute inset-0 bg-void z-[3] pointer-events-none" style={{ opacity: overlayOpacity }} />

        {/* Top half: typography */}
        <motion.div style={{ y: textY }} className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-10 max-w-[1400px] mx-auto">
          {/* Staggered entrance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-[6px] w-[6px]">
                <span className="absolute inset-0 rounded-full bg-lux animate-[breathe_3s_ease-in-out_infinite]" />
              </span>
              <span className="type-caption text-bone-ghost">Thinkbox v2 — now available</span>
            </div>
          </motion.div>

          {/* Main headline — stacked with overlap */}
          <div className="relative">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="type-massive text-[clamp(3.5rem,11vw,10rem)] text-bone">
                Analytics
              </h1>
            </motion.div>
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="-mt-[0.08em]"
            >
              <h1 className="type-massive text-[clamp(3.5rem,11vw,10rem)]">
                <span className="text-bone">that </span>
                <span className="text-lux relative">
                  think
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -bottom-[0.02em] left-0 right-0 h-[2px] bg-lux/25 origin-left"
                  />
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Subtext — pushed far right, creating asymmetry */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 lg:mt-16 flex justify-end"
          >
            <div className="max-w-sm lg:max-w-md">
              <p className="text-[14px] type-body text-bone-muted mb-8">
                The first analytics agent with neuro-symbolic reasoning.
                Your question + your rules = the same trusted answer, every time.
              </p>
              <div className="flex items-center gap-5">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] uppercase bg-lux text-void px-6 py-3.5 rounded-full overflow-hidden active:scale-[0.97] transition-transform duration-200"
                >
                  <span className="relative z-10">Start free</span>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="relative z-10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><path d="M2 9L9 2M9 2H3.5M9 2V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {/* Hover sweep */}
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </Link>
                <Link href="/about" className="text-[12px] text-bone-ghost hover:text-bone transition-colors duration-300">
                  How it works
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating product window — enters from below as you scroll */}
        <motion.div
          style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
          className="absolute bottom-0 left-6 right-6 lg:left-10 lg:right-10 z-20 max-w-[1400px] mx-auto"
        >
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-t-2xl bg-void-elevated overflow-hidden edge-light shadow-[0_-20px_80px_rgba(0,0,0,0.5)]"
          >
            {/* Chrome */}
            <div className="flex items-center h-9 px-4 border-b border-white/[0.04]">
              <div className="flex gap-[6px]">
                <div className="w-[8px] h-[8px] rounded-full bg-white/[0.07]" />
                <div className="w-[8px] h-[8px] rounded-full bg-white/[0.07]" />
                <div className="w-[8px] h-[8px] rounded-full bg-white/[0.07]" />
              </div>
              <span className="flex-1 text-center type-mono text-bone-faint/40">airquery workspace</span>
            </div>

            {/* Content */}
            <div className="p-5 lg:p-7 grid lg:grid-cols-12 gap-5">
              {/* Sidebar */}
              <div className="hidden lg:flex lg:col-span-3 flex-col border-r border-white/[0.04] pr-5 gap-1.5">
                <p className="type-caption text-bone-faint mb-2">Thinkboxes</p>
                {["Executive Sales", "Finance Q2", "Product Usage"].map((t, i) => (
                  <div key={t} className={`px-3 py-2 rounded-lg text-[11px] transition-colors ${
                    i === 0 ? "bg-lux/[0.06] text-lux border border-lux/[0.1]" : "text-bone-faint hover:text-bone-ghost"
                  }`}>{t}</div>
                ))}
              </div>

              {/* Chat */}
              <div className="lg:col-span-9 flex flex-col justify-center gap-4">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center text-[9px] font-bold text-bone-faint shrink-0">M</div>
                  <div className="bg-white/[0.03] rounded-xl rounded-tl-sm px-4 py-2.5">
                    <p className="text-[12px] text-bone-soft">Why did APAC revenue drop last quarter?</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-lux flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="none" className="w-3 h-3"><path d="M4 16L10 4L16 16" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11H13" stroke="#050505" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-white/[0.03] rounded-xl rounded-tl-sm px-4 py-2.5">
                      <p className="text-[12px] text-bone-soft leading-relaxed">
                        APAC revenue fell <strong className="text-bone">22%</strong> in Q2 — 3 enterprise churns in Singapore totalling <strong className="text-bone">$840k ARR</strong>. Renewal risk: <span className="text-amber-400">High</span>.
                      </p>
                    </div>
                    <div className="flex gap-1.5 ml-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-lux/[0.06] text-lux text-[9px] font-semibold tracking-wider uppercase">✓ 99%</span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.03] text-[9px] text-bone-faint type-mono">3 sources</span>
                      <span className="px-2 py-0.5 rounded bg-white/[0.03] text-[9px] text-bone-faint type-mono">deterministic</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
