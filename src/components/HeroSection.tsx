"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Terminal, Send, Crown } from "lucide-react";
import { CONTACTS } from "@/data/contacts";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVolgogradHovered, setIsVolgogradHovered] = useState(false);

  // Mouse Parallax coordinates for kinetic typography
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Offset layers
  const echoX = useTransform(smoothX, [-400, 400], [-12, 12]);
  const echoY = useTransform(smoothY, [-400, 400], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="top"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-24 md:pt-32 pb-12 overflow-hidden"
    >
      <div className="section-shell">
        {/* HUD Technical Coordinate Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-8 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-wider">SYS.ARCH</span>
            <span className="text-white/20">/</span>

            {/* VOLGOGRAD with Crown Easter Egg */}
            <span
              onMouseEnter={() => setIsVolgogradHovered(true)}
              onMouseLeave={() => setIsVolgogradHovered(false)}
              className="relative cursor-pointer select-none text-white hover:text-white transition-colors py-0.5 inline-flex items-center gap-1 group"
            >
              <span className="border-b border-dashed border-white/40 group-hover:border-white">
                VOLGOGRAD
              </span>

              {/* Floating Minimalist Outline Crown Easter Egg */}
              <AnimatePresence>
                {isVolgogradHovered && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.85 }}
                    animate={{ opacity: 1, y: -16, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 450, damping: 22 }}
                    className="absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none text-white flex items-center justify-center"
                    aria-label="Volgograd Hero Crown"
                  >
                    <Crown size={15} strokeWidth={1.8} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>

            <span>→ REMOTE</span>
            <span className="text-white/20 hidden sm:inline">/</span>
            <span className="hidden sm:inline text-zinc-500">UTC+3 MOSCOW</span>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.04] px-3 py-1 text-[11px] font-mono text-zinc-300">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            <span className="tracking-wide text-white">ONLINE // AVAILABLE FOR AI & FULL-STACK</span>
          </div>
        </div>

        {/* Main Monochromatic Kinetic Display Typography Hero */}
        <div className="relative py-4 lg:py-6">
          {/* Technical crosshairs (+) */}
          <span className="absolute -top-2 -left-2 text-white/20 font-mono text-sm select-none">+</span>
          <span className="absolute -top-2 -right-2 text-white/20 font-mono text-sm select-none">+</span>

          {/* Multilayer kinetic typography */}
          <div className="relative select-none">
            {/* Outline Echo Parallax Layer */}
            <motion.div
              style={{ x: echoX, y: echoY }}
              className="absolute inset-0 pointer-events-none hidden sm:block opacity-35 will-change-transform"
              aria-hidden="true"
            >
              <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight uppercase leading-[0.92] text-stroke-echo">
                <div>FULL-STACK</div>
                <div>AI DEVELOPER</div>
              </h1>
            </motion.div>

            {/* Front Solid Monochrome Typography Layer */}
            <h1 className="relative z-10 font-display text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight uppercase leading-[0.92] text-white">
              <span className="block text-white">
                FULL-STACK
              </span>
              <span className="block text-zinc-300">
                AI DEVELOPER
              </span>
            </h1>
          </div>

          {/* Subtitle / Engineer Offer and Identity */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-lg sm:text-xl font-bold text-white leading-snug">
                Архитектура мультиагентных систем, отказоустойчивые LLM-роутеры, Telegram Mini Apps и веб-интерфейсы.
              </p>
              <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-400 font-mono">
                Привет, я <span className="text-white font-bold">Илья (idleON)</span>. Разрабатываю практические AI-инструменты и Full-Stack веб-сервисы с 100% открытым кодом: от компьютерного зрения в OpenCV до сложных prompt-пайплайнов и реактивных интерфейсов на Next.js 15.
              </p>
            </div>

            {/* Micro stats counter */}
            <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-6 font-mono text-xs border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
              <div>
                <div className="text-2xl font-bold font-mono text-white">6+</div>
                <div className="text-zinc-500 uppercase text-[10px]">КЕЙСОВ В ПРОДЕ</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-mono text-white">24/7</div>
                <div className="text-zinc-500 uppercase text-[10px]">АВТОНОМНЫЕ ПАЙПЛАЙНЫ</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-mono text-white">7-14д</div>
                <div className="text-zinc-500 uppercase text-[10px]">СРОК СБОРКИ MVP</div>
              </div>
            </div>
          </div>

          {/* Minimalist High-Contrast Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-xs font-mono font-bold text-black transition-all hover:bg-zinc-200 shadow-md"
            >
              <span>&gt;_ СМОТРЕТЬ КЕЙСЫ (01-06)</span>
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("console")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-6 py-3.5 text-xs font-mono font-bold text-white transition-all hover:bg-white hover:text-black hover:border-white"
            >
              <Terminal size={14} />
              <span>[/] AI-КОНСОЛЬ</span>
            </button>

            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-transparent px-5 py-3.5 text-xs font-mono text-zinc-300 transition-all hover:border-white hover:text-white"
            >
              <Send size={13} />
              <span>^S СВЯЗАТЬСЯ</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
