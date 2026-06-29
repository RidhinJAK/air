"use client";
import { AnimateIn } from "@/components/AnimateIn";
import Link from "next/link";

const posts = [
  { slug: "introducing-thinkbox", title: "Introducing Thinkbox — The Neuro-Symbolic Reasoning Engine", cat: "Product", date: "Jan 15, 2026", read: "8 min" },
  { slug: "ai-hi-di", title: "AI + HI = DI: Why Deterministic Intelligence Matters", cat: "Thought Leadership", date: "Jan 10, 2026", read: "12 min" },
  { slug: "wise-app-launch", title: "The Wise App: Analytics Inside Slack & Teams", cat: "Product", date: "Jan 5, 2026", read: "6 min" },
  { slug: "enterprise-security", title: "Enterprise-Grade Security at Every Layer", cat: "Engineering", date: "Dec 28, 2025", read: "10 min" },
  { slug: "snowflake-integration", title: "Deep Dive: AirQuery + Snowflake", cat: "Engineering", date: "Dec 20, 2025", read: "15 min" },
  { slug: "customer-story-techcorp", title: "How TechCorp Eliminated Their BI Backlog", cat: "Case Study", date: "Dec 15, 2025", read: "7 min" },
];

export default function BlogPage() {
  return (
    <div className="pt-20">
      <section className="py-24 lg:py-40 border-b border-bone-faint/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <AnimateIn variant="fadeUp">
            <p className="type-caption text-bone-ghost mb-10">Blog</p>
            <h1 className="type-massive text-[clamp(3rem,7vw,6rem)] text-bone max-w-[14ch]">Insights &<br/>updates</h1>
          </AnimateIn>
        </div>
      </section>

      <section className="py-4">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Featured */}
          <AnimateIn variant="fadeUp">
            <Link href={`/blog/${posts[0].slug}`} className="group block py-12 lg:py-16 border-b border-bone-faint/8">
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  <span className="type-caption text-lux mb-4 block">{posts[0].cat}</span>
                  <h2 className="text-[clamp(1.8rem,4vw,3rem)] type-heading text-bone group-hover:text-lux transition-colors duration-500">{posts[0].title}</h2>
                </div>
                <div className="lg:col-span-4 flex items-end justify-between">
                  <span className="type-mono text-bone-ghost/40">{posts[0].date} · {posts[0].read}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-bone-ghost/30 group-hover:text-lux group-hover:rotate-45 transition-all duration-500"><path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </Link>
          </AnimateIn>
          {posts.slice(1).map((p, i) => (
            <AnimateIn key={p.slug} variant="fadeUp" delay={i * 0.03}>
              <Link href={`/blog/${p.slug}`} className="group block py-8 border-b border-bone-faint/8">
                <div className="grid lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-2"><span className="type-caption text-lux">{p.cat}</span></div>
                  <div className="lg:col-span-7"><h3 className="text-[16px] font-semibold text-bone group-hover:text-lux transition-colors duration-300">{p.title}</h3></div>
                  <div className="lg:col-span-3 flex items-center justify-between"><span className="type-mono text-bone-ghost/40">{p.date}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-bone-ghost/20 group-hover:text-lux transition-colors"><path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </section>
    </div>
  );
}
