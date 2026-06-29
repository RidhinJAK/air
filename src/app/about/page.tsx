"use client";
import { AnimateIn } from "@/components/AnimateIn";
import { motion } from "framer-motion";

const team = [
  { name: "Alex Chen", role: "CEO", i: "AC" }, { name: "Priya Sharma", role: "CTO", i: "PS" },
  { name: "James Miller", role: "VP Eng", i: "JM" }, { name: "Elena Rodriguez", role: "VP Product", i: "ER" },
  { name: "David Kim", role: "Head of AI", i: "DK" }, { name: "Sarah Johnson", role: "Head of Design", i: "SJ" },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-24 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp">
            <p className="type-caption text-bone-ghost mb-10">About</p>
          </AnimateIn>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <AnimateIn variant="fadeUp" className="lg:col-span-7">
              <h1 className="type-massive text-[clamp(3rem,7vw,6.5rem)] text-bone">
                We believe analytics should be{" "}
                <span className="text-lux">deterministic</span>
              </h1>
            </AnimateIn>
            <AnimateIn variant="fadeUp" delay={0.15} className="lg:col-span-5 flex items-end">
              <p className="text-[15px] type-body text-bone-muted max-w-md">
                Pure AI hallucinates. Pure BI is too slow. AirQuery created a third way — Deterministic Intelligence — by combining AI with verified human knowledge.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            <AnimateIn variant="fadeLeft" className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-4">
                <p className="type-caption text-lux mb-6">The equation</p>
                {[
                  { k: "AI", v: "Language understanding" },
                  { k: "+", v: "" },
                  { k: "HI", v: "Human intelligence" },
                  { k: "=", v: "" },
                  { k: "DI", v: "Deterministic Intelligence" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className={item.k === "+" || item.k === "=" ? "text-[24px] text-bone-ghost/30 font-light py-1" : `p-5 rounded-xl ${item.k === "DI" ? "bg-lux/10 border border-lux-border" : "bg-void-card border border-bone-faint/8"}`}>
                    {item.k === "+" || item.k === "=" ? item.k : (
                      <><span className={`text-[20px] font-bold ${item.k === "DI" ? "text-lux" : "text-bone"}`}>{item.k}</span><p className="text-[12px] text-bone-ghost mt-1">{item.v}</p></>
                    )}
                  </motion.div>
                ))}
              </div>
            </AnimateIn>
            <AnimateIn variant="fadeRight" className="lg:col-span-8 space-y-8">
              <p className="text-[20px] type-subhead text-bone">AirQuery was founded on a simple insight: when the CFO asks &ldquo;why did revenue drop?&rdquo;, the answer should be the same whether you ask on Monday or Friday.</p>
              <p className="text-[15px] type-body text-bone-muted">We built Thinkbox — a neuro-symbolic reasoning engine that combines LLM pattern recognition with verified business rules. The result: analytics grounded in your verified semantic model, where every step of reasoning is visible, and the same input always produces the same answer.</p>
              <p className="text-[15px] type-body text-bone-muted">Think of Thinkbox as a living hypergraph model that encodes your team&apos;s domain expertise — the metrics you&apos;ve agreed on, the relationships in your data, and the rules that define what each number truly means.</p>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 border-t border-bone-faint/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp" className="mb-16"><p className="type-caption text-bone-ghost mb-6">Team</p><h2 className="text-[clamp(2rem,4vw,3.5rem)] type-heading text-bone">The people behind AirQuery</h2></AnimateIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {team.map((m, i) => (
              <AnimateIn key={m.name} variant="fadeUp" delay={i * 0.05}>
                <div className="group cursor-default">
                  <div className="aspect-[3/4] rounded-2xl bg-void-card border border-bone-faint/8 flex items-center justify-center mb-3 group-hover:border-lux-border/30 group-hover:bg-void-hover transition-all duration-500 overflow-hidden relative edge-light">
                    <div className="absolute inset-0 grain pointer-events-none" />
                    <span className="text-3xl font-bold text-bone-faint/20 group-hover:text-lux/30 transition-colors duration-500 relative z-10">{m.i}</span>
                  </div>
                  <p className="text-[13px] font-medium text-bone">{m.name}</p>
                  <p className="text-[11px] text-bone-ghost">{m.role}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
