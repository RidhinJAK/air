"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Main nav bar */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className={`mx-4 lg:mx-8 px-5 lg:px-6 h-12 flex items-center justify-between rounded-full transition-all duration-700 ${
          scrolled
            ? "mat-glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : ""
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Home">
            <div className="w-[22px] h-[22px] rounded-md bg-lux flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <svg viewBox="0 0 20 20" fill="none" className="w-3 h-3">
                <path d="M4 16L10 4L16 16" stroke="#050505" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11H13" stroke="#050505" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[14px] font-semibold tracking-[-0.02em] text-bone hidden sm:inline">airquery</span>
          </Link>

          {/* Center links — desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-3 py-1.5 text-[12px] text-bone-muted hover:text-bone transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-lux scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-full flex items-center justify-center text-bone-ghost hover:text-bone transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="2.5" fill="currentColor"/><path d="M6.5 1V2.5M6.5 10.5V12M1 6.5H2.5M10.5 6.5H12M2.7 2.7l1 1M9.3 9.3l1 1M2.7 10.3l1-1M9.3 3.7l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11.5 8.5a5 5 0 01-7-7 5 5 0 107 7z" fill="currentColor"/></svg>
              )}
            </button>

            <Link href="/login" className="hidden md:flex text-[12px] text-bone-muted hover:text-bone transition-colors px-3 py-1.5">
              Sign in
            </Link>

            <Link
              href="/contact"
              className="hidden md:flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase bg-lux text-void px-4 py-2 rounded-full hover:bg-lux/90 active:scale-[0.97] transition-all duration-200"
            >
              Get started
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-bone-ghost"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[5px]">
                <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="block w-4 h-[1.5px] bg-current origin-center" />
                <motion.span animate={{ opacity: open ? 0 : 1 }} className="block w-4 h-[1.5px] bg-current" />
                <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="block w-4 h-[1.5px] bg-current origin-center" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-void flex flex-col justify-center px-8"
          >
            <nav className="space-y-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-[clamp(2rem,8vw,4rem)] type-massive text-bone hover:text-lux transition-colors duration-300 py-2"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-16 flex gap-4"
            >
              <Link href="/login" onClick={() => setOpen(false)} className="text-[12px] text-bone-ghost hover:text-bone transition-colors">Sign in</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="text-[12px] text-lux font-medium">Get started →</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
