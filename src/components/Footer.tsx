"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { CONTACTS } from "@/data/contacts";
import { useLanguageMode } from "@/context/LanguageModeContext";
import { SmoothModeText } from "./SmoothModeText";

const stackPills = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "Python 3.12",
  "OpenCV",
  "aiogram",
  "Supabase",
  "Framer Motion",
  "Docker",
  "Tailwind CSS",
  "FFmpeg",
  "Whisper STT",
];

export function Footer() {
  const { isSimple } = useLanguageMode();
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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
    <footer className="bg-[#050505] pt-16 pb-12 relative overflow-hidden select-none font-mono">
      <div className="section-shell">
        {/* Top: Massive Kinetic Display Typography */}
        <div className="pb-12 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <SmoothModeText as="span" className="text-xs text-zinc-500 uppercase tracking-widest block mb-2">
                {isSimple ? "// РАЗРАБОТКА ИИ И ВЕБ-СЕРВИСОВ" : "// ARCHITECTURE & FULL-STACK ENGINEERING"}
              </SmoothModeText>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight text-white leading-none uppercase">
                <span className="block text-stroke-echo hover:text-white transition-colors duration-300">
                  LET&apos;S BUILD
                </span>
                <span className="block text-white">
                  IDLEON {"//"} AI
                </span>
              </h2>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group self-start lg:self-end flex items-center gap-3 rounded-lg border border-white/20 bg-white/[0.04] px-5 py-3 text-xs font-bold text-zinc-300 hover:border-white hover:text-white hover:bg-white/10 transition-all shadow-sm cursor-pointer"
            >
              <span>{isSimple ? "НАВЕРХ [ ^ ]" : "НАВЕРХ [ ^ ]"}</span>
              <div className="size-5 rounded bg-white/10 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
                <ArrowUp size={11} />
              </div>
            </button>
          </div>
        </div>

        {/* Middle: Monochromatic Tech Pills */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <SmoothModeText as="span" className="text-xs text-zinc-500 uppercase tracking-wider">
            {isSimple ? "Используемые технологии:" : "Производственный стек:"}
          </SmoothModeText>
          <div className="flex flex-wrap gap-1.5">
            {stackPills.map((pill) => (
              <span
                key={pill}
                className="rounded border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-400 hover:border-white hover:text-white transition-colors"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: Telemetry, Timezone, Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            <SmoothModeText as="span" className="text-zinc-400">
              {isSimple ? "СТАТУС: ГОТОВ К СОТРУДНИЧЕСТВУ" : "SYS_STATUS: ALL SYSTEMS OPERATIONAL"}
            </SmoothModeText>
            <span className="text-white/20">/</span>
            <span>VOLGOGRAD: {timeStr || "12:00:00"} MSK</span>
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
