"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem("aq-c")) { const t = setTimeout(() => setShow(true), 4000); return () => clearTimeout(t); } }, []);
  const accept = () => { localStorage.setItem("aq-c", "1"); setShow(false); };
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:max-w-xs z-50">
          <div className="bg-void-card border border-bone-faint/10 rounded-2xl p-5 shadow-2xl shadow-black/40">
            <p className="text-[12px] text-bone-muted leading-relaxed mb-4">We use cookies for analytics and to improve your experience.</p>
            <div className="flex gap-2">
              <button onClick={accept} className="text-[11px] font-semibold uppercase tracking-wide bg-lux text-void px-4 py-2 rounded-full hover:bg-lux/90 transition-all">Accept</button>
              <button onClick={accept} className="text-[11px] text-bone-ghost px-3 py-2 rounded-full hover:text-bone transition-colors">Decline</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
