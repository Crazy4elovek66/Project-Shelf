"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

export function Toast() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setMessage(customEvent.detail);
      setTimeout(() => setMessage(""), 3000);
    };

    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-6 z-[100] flex items-center gap-3 rounded-2xl border border-white/10 bg-[#080A10]/95 px-5 py-3.5 shadow-glow backdrop-blur-md"
        >
          <div className="grid size-6 place-items-center rounded-full bg-cyan-400/20 text-cyan-200">
            <Check size={14} />
          </div>
          <span className="text-sm font-medium text-slate-200">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
