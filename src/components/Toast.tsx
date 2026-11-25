"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check } from "lucide-react";

export function Toast() {
  const [message, setMessage] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setMessage(customEvent.detail);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setMessage(""), 2800);
    };

    window.addEventListener("show-toast", handleToast);
    return () => {
      window.removeEventListener("show-toast", handleToast);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <m.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-[100] flex items-center gap-3 rounded-xl border border-white/25 bg-[#09090B]/95 px-4 py-3 font-mono text-xs text-zinc-100 shadow-[0_16px_40px_rgba(0,0,0,0.9)] backdrop-blur-md"
          style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="grid size-5 place-items-center rounded border border-white/20 bg-white/10 text-white">
            <Check size={12} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              [OK] // BUFFER_SYNC
            </span>
            <span className="text-xs font-mono text-white">{message}</span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
