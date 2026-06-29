"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    num: "01",
    label: "THINKBOX",
    title: "Neuro-symbolic reasoning",
    body: "A living knowledge graph that encodes your metrics, relationships, and business rules. Where AI guesses, Thinkbox reasons.",
    detail: "decomposive → deductive → abductive → inductive → reflective → analogical",
  },
  {
    num: "02",
    label: "DETERMINISTIC",
    title: "Same question, same answer",
    body: "Every response is grounded in your verified semantic model. No hallucinations. No variance. The only kind of analytics worth betting the business on.",
    detail: "confidence scores · source citations · complete reasoning traces",
  },
  {
    num: "03",
    label: "WISE APP",
    title: "Where your team already talks",
    body: "@airquery in any Slack channel or Teams thread. A reasoned, sourced answer appears in seconds.",
    detail: "slack · teams · threads · alerts · pins · mentions",
  },
];

function Feature({ f, index }: { f: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleX = useTransform(scrollYProgress, [0.1, 0.5], [80, 0]);
  const titleOp = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const bodyOp = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.25, 0.5], [40, 0]);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.6], [0, 1]);
  // Alternate alignment: first left-heavy, second right-heavy, third centered
  const layouts = [
    "lg:grid-cols-[1fr_2fr] lg:gap-20",
    "lg:grid-cols-[2fr_1fr] lg:gap-20",
    "lg:grid-cols-[1fr_1.5fr_0.5fr] lg:gap-16",
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-40">
      {/* Top divider — animated width */}
      <motion.div
        className="absolute top-0 left-0 h-px bg-lux/15 origin-left"
        style={{ scaleX: lineScale, width: "100%" }}
      />

      <div className={`grid ${layouts[index]} items-end gap-8`}>
        {/* Number — oversized ghost watermark */}
        {index === 2 && (
          <div className="hidden lg:block">
            <motion.span style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 0.04]) }}
              className="text-[20vw] type-massive text-bone leading-none select-none block -mb-[0.1em]">
              {f.num}
            </motion.span>
          </div>
        )}

        {/* Title column */}
        <div className={index === 1 ? "lg:order-2" : ""}>
          <motion.div style={{ x: titleX, opacity: titleOp }}>
            <span className="type-caption text-lux block mb-4">{f.label}</span>
            <h3 className="text-[clamp(2rem,5vw,4rem)] type-heading text-bone">
              {f.title}
            </h3>
          </motion.div>
        </div>

        {/* Body column */}
        <div className={index === 1 ? "lg:order-1" : ""}>
          <motion.div style={{ y: bodyY, opacity: bodyOp }}>
            <p className="text-[14px] type-body text-bone-muted mb-6 max-w-md">{f.body}</p>
            <p className="type-mono text-bone-faint">{f.detail}</p>
          </motion.div>
        </div>

        {/* Ghost number for first two */}
        {index < 2 && (
          <motion.span
            style={{ opacity: useTransform(scrollYProgress, [0.2, 0.5], [0, 0.03]) }}
            className="absolute -right-[5%] top-1/2 -translate-y-1/2 text-[30vw] type-massive text-bone leading-none select-none pointer-events-none hidden lg:block"
          >
            {f.num}
          </motion.span>
        )}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {features.map((f, i) => (
          <Feature key={f.num} f={f} index={i} />
        ))}
      </div>
    </section>
  );
}
