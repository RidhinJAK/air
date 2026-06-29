"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const v: Record<string, Variants> = {
  fadeUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  fadeLeft: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  maskUp: { hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" }, visible: { opacity: 1, clipPath: "inset(0% 0 0 0)" } },
};

export function AnimateIn({ children, variant = "fadeUp", delay = 0, duration = 0.9, className = "" }: {
  children: ReactNode; variant?: keyof typeof v; delay?: number; duration?: number; className?: string;
}) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
      variants={v[variant]} transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}
