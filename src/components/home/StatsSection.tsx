"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion, useScroll, useTransform } from "framer-motion";

function Counter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let step = 0; const steps = 45; const inc = target / steps;
    const timer = setInterval(() => { step++; setVal(Math.min(step * inc, target)); if (step >= steps) clearInterval(timer); }, 40);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString()}{suffix}</span>;
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const stats = [
    { val: 2000, suffix: "+", label: "Data teams trust us", dec: 0 },
    { val: 99.9, suffix: "%", label: "Uptime SLA guaranteed", dec: 1 },
    { val: 50, suffix: "M", label: "Queries answered", dec: 0 },
    { val: 0.4, suffix: "s", label: "Average response time", dec: 1 },
  ];

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      {/* Horizontal scrolling numbers as background texture */}
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none select-none"
      >
        <span className="text-[25vw] type-massive text-bone/[0.015] leading-none">
          2,000+ &nbsp; 99.9% &nbsp; 50M+ &nbsp; 0.4s
        </span>
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Staggered asymmetric layout — not a grid */}
        <div className="space-y-20 lg:space-y-0 lg:flex lg:flex-wrap lg:items-baseline lg:gap-x-16 lg:gap-y-24">
          {stats.map((s, i) => {
            const offsets = ["lg:mt-0", "lg:mt-32", "lg:mt-8", "lg:mt-48"];
            const widths = ["lg:w-[22%]", "lg:w-[26%]", "lg:w-[20%]", "lg:w-[24%]"];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`${offsets[i]} ${widths[i]}`}
              >
                <p className="text-[clamp(3rem,7vw,5.5rem)] type-massive text-lux mb-3">
                  <Counter target={s.val} suffix={s.suffix} decimals={s.dec} />
                </p>
                <div className="w-8 h-px bg-lux/20 mb-3" />
                <p className="text-[13px] text-bone-muted">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
