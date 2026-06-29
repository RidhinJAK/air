"use client";

import Link from "next/link";
import { AnimateIn } from "./AnimateIn";
import { motion } from "framer-motion";

const cols = [
  { title: "Product", links: [{ l: "Thinkbox", h: "/services" }, { l: "Wise App", h: "/services" }, { l: "API", h: "/services" }, { l: "Pricing", h: "/pricing" }] },
  { title: "Company", links: [{ l: "About", h: "/about" }, { l: "Blog", h: "/blog" }, { l: "Careers", h: "/about" }, { l: "Contact", h: "/contact" }] },
  { title: "Legal", links: [{ l: "Privacy", h: "/" }, { l: "Terms", h: "/" }, { l: "Security", h: "/" }] },
];

export function Footer() {
  return (
    <footer className="relative border-t border-bone-faint/10 overflow-hidden">
      {/* Newsletter */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28 border-b border-bone-faint/10">
        <AnimateIn variant="fadeUp">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <p className="type-caption text-lux mb-6">Stay informed</p>
              <h3 className="text-[clamp(1.8rem,3.5vw,3rem)] type-heading text-bone">
                Weekly insights on<br />deterministic intelligence
              </h3>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const f = e.currentTarget;
                const email = new FormData(f).get("email") as string;
                await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
                f.reset();
              }}
              className="flex gap-2 max-w-md"
            >
              <input
                type="email" name="email" required placeholder="you@company.com"
                className="flex-1 bg-transparent border-b border-bone-faint/30 text-[14px] text-bone placeholder:text-bone-ghost py-3 focus:outline-none focus:border-lux transition-colors"
              />
              <button type="submit" className="text-[11px] font-semibold tracking-wide uppercase bg-lux text-void px-5 py-3 rounded-full hover:bg-lux/90 active:scale-[0.97] transition-all whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </AnimateIn>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-5 h-5 rounded-[4px] bg-lux flex items-center justify-center">
                <svg viewBox="0 0 20 20" fill="none" className="w-3 h-3"><path d="M4 16L10 4L16 16" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11H13" stroke="#050505" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <span className="text-[13px] font-semibold text-bone tracking-tight">airquery</span>
            </Link>
            <p className="text-[12px] text-bone-ghost leading-relaxed max-w-[180px]">
              Deterministic Intelligence.<br/>Same question. Same answer.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="type-caption text-bone-ghost mb-5">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.l}><Link href={l.h} className="text-[13px] text-bone-muted hover:text-bone transition-colors duration-200">{l.l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom marquee + copyright */}
      <div className="border-t border-bone-faint/10 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12 py-4 whitespace-nowrap w-max"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-[11px] text-bone-faint/60 tracking-widest uppercase">
              AI + HI = DI · Deterministic Intelligence · airquery
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-[11px] text-bone-faint">© {new Date().getFullYear()} AirQuery Inc.</span>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Cookies"].map((t) => (
            <Link key={t} href="/" className="text-[11px] text-bone-faint hover:text-bone-ghost transition-colors">{t}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
