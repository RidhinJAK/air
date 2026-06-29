"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export function BackToTop() {
  const [s, setS] = useState(false);
  useEffect(() => { const h = () => setS(window.scrollY > 800); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <AnimatePresence>
      {s && (
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-void-card border border-bone-faint/10 flex items-center justify-center hover:border-lux-border hover:bg-void-hover transition-all duration-300 group"
          aria-label="Back to top">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-bone-ghost group-hover:text-lux transition-colors"><path d="M6 10V2M6 2L2.5 5.5M6 2L9.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
