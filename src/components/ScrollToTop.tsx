"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          type="button"
          aria-label="Вернуться наверх"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-slate-200 shadow-card backdrop-blur-md transition hover:border-cyan-200/40 hover:bg-white/10 hover:text-cyan-200 touch-manipulation"
          style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <ArrowUp size={20} />
        </m.button>
      )}
    </AnimatePresence>
  );
}
