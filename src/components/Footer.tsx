"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Sparkles, Terminal, Heart } from "lucide-react";
import { CONTACTS } from "@/data/contacts";

const stackPills = [
  { label: "Next.js 15", color: "hover:border-white hover:text-white" },
  { label: "React 19", color: "hover:border-cyan-400 hover:text-cyan-400" },
  { label: "TypeScript", color: "hover:border-blue-400 hover:text-blue-400" },
  { label: "Python", color: "hover:border-yellow-400 hover:text-yellow-400" },
  { label: "OpenCV", color: "hover:border-emerald-400 hover:text-emerald-400" },
  { label: "aiogram", color: "hover:border-sky-400 hover:text-sky-400" },
  { label: "Supabase", color: "hover:border-emerald-400 hover:text-emerald-400" },
  { label: "Framer Motion", color: "hover:border-purple-400 hover:text-purple-400" },
  { label: "Docker", color: "hover:border-blue-400 hover:text-blue-400" },
  { label: "Tailwind CSS", color: "hover:border-cyan-400 hover:text-cyan-400" },
];

export function Footer() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatter in Europe/Moscow timezone (UTC+3)
      const formatted = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now);
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#050507] pt-16 pb-12 relative overflow-hidden select-none">
      <div className="section-shell">
        {/* Top: Massive Kinetic Display Typography */}
        <div className="pb-12 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-accentCyan uppercase tracking-widest block mb-2">
                {"//"} ARCHITECTURE & FULL-STACK ENGINEERING
              </span>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight text-white leading-none uppercase">
                <span className="block text-stroke-echo hover:text-white transition-colors duration-300">
                  LET&apos;S BUILD
                </span>
                <span className="block text-white hover:text-accentCyan transition-colors duration-300">
                  IDLEON {"//"} AI
                </span>
              </h2>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group self-start lg:self-end flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 font-mono text-xs text-slate-300 hover:border-accentCyan/50 hover:text-white transition-all shadow-sm"
            >
              <span>НАВЕРХ</span>
              <div className="size-6 rounded-full bg-white/10 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
                <ArrowUp size={12} />
              </div>
            </button>
          </div>
        </div>

        {/* Middle: Interactive Tech Pills */}
        <div className="py-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
            Производственный стек:
          </span>
          <div className="flex flex-wrap gap-2">
            {stackPills.map((pill) => (
              <span
                key={pill.label}
                className={`rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-xs text-slate-400 transition-colors ${pill.color}`}
              >
                {pill.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Telemetry, Timezone, Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex size-2 rounded-full bg-accentEmerald animate-pulse" />
            <span className="text-slate-400">SYS_STATUS: ALL SYSTEMS OPERATIONAL</span>
            <span className="text-white/20">/</span>
            <span>VOLZHSKY: {timeStr || "12:00:00"} MSK</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={CONTACTS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Telegram
            </a>
            <span>© {new Date().getFullYear()} idleON (Илья)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
