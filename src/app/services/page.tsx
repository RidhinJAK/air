"use client";
import { AnimateIn } from "@/components/AnimateIn";
import { motion } from "framer-motion";

const services = [
  { n: "01", t: "Thinkbox Engine", d: "Neuro-symbolic reasoning combining LLM pattern recognition with verified business rules.", tags: ["6-mode reasoning", "Confidence scoring", "Custom rules"] },
  { n: "02", t: "Wise App", d: "@airquery in Slack or Teams. Sourced answer in seconds, without leaving the conversation.", tags: ["Slack", "Teams", "Alerts", "Pins"] },
  { n: "03", t: "Analytics Workspace", d: "Ask in plain language, get visual answers with charts, distributions, and reasoning traces.", tags: ["Natural language", "Auto-charts", "Shareable"] },
  { n: "04", t: "API & SDKs", d: "A single endpoint — SQL, English, or MCP. Ship deterministic analytics in your product.", tags: ["REST", "Python", "TypeScript", "MCP"] },
  { n: "05", t: "Data Integrations", d: "Query your warehouse directly. No copies, no movement, no surprise bills.", tags: ["15+ connectors", "Zero-copy", "dbt native"] },
  { n: "06", t: "Enterprise Security", d: "SOC 2, SSO/SAML, RBAC, audit logs. On-premise available.", tags: ["SOC 2", "SSO", "RBAC", "On-prem"] },
];

const integrations = ["Snowflake", "BigQuery", "Databricks", "Redshift", "PostgreSQL", "MySQL", "dbt", "Oracle", "MongoDB", "DuckDB"];

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="py-24 lg:py-40 border-b border-bone-faint/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp">
            <p className="type-caption text-bone-ghost mb-10">Services</p>
            <h1 className="type-massive text-[clamp(3rem,7vw,6rem)] text-bone max-w-[14ch]">
              The complete intelligence platform
            </h1>
          </AnimateIn>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {services.map((s, i) => (
            <AnimateIn key={s.n} variant="fadeUp" delay={i * 0.03}>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-12 gap-6 py-12 lg:py-16 border-b border-bone-faint/8 group cursor-default">
                <div className="lg:col-span-1"><span className="type-mono text-bone-ghost/30">{s.n}</span></div>
                <div className="lg:col-span-4"><h3 className="text-[clamp(1.5rem,3vw,2.2rem)] type-heading text-bone group-hover:text-lux transition-colors duration-500">{s.t}</h3></div>
                <div className="lg:col-span-4"><p className="text-[14px] type-body text-bone-muted">{s.d}</p></div>
                <div className="lg:col-span-3 flex flex-wrap gap-1.5 items-start">
                  {s.tags.map((t) => <span key={t} className="px-2 py-1 rounded-md bg-void-card border border-bone-faint/8 text-[10px] type-mono text-bone-ghost">{t}</span>)}
                </div>
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-bone-faint/8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-12">
          <AnimateIn variant="fadeUp"><h2 className="text-2xl type-heading text-bone">Integrations</h2></AnimateIn>
        </div>
        <div className="overflow-hidden">
          <motion.div animate={{ x: [0, -800] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex gap-3 w-max">
            {[...integrations, ...integrations, ...integrations].map((n, i) => (
              <div key={`${n}-${i}`} className="px-6 py-3 rounded-full border border-bone-faint/10 text-[13px] text-bone-muted whitespace-nowrap hover:border-lux-border hover:text-lux transition-all duration-300">{n}</div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
