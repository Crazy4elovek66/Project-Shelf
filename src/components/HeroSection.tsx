"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Bot, Send, Terminal, Sparkles, Activity } from "lucide-react";
import { CONTACTS } from "@/data/contacts";
import { FannedProjectDeck } from "./FannedProjectDeck";

const tickerItems = [
  "NEXT.JS 15",
  "REACT 19",
  "PYTHON 3.12",
  "MULTI-AGENT SYSTEMS",
  "TELEGRAM MINI APPS",
  "OPENCV & MEDIAPIPE",
  "FASTAPI",
  "SUPABASE POSTGRESQL",
  "LLM FALLBACK ROUTING",
  "WHISPER STT",
  "FFMPEG PIPELINES",
  "FRAMER MOTION",
  "DOCKER & LINUX VPS",
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax coordinates for kinetic typography
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Offset layers
  const echoX = useTransform(smoothX, [-400, 400], [-14, 14]);
  const echoY = useTransform(smoothY, [-400, 400], [-8, 8]);
  const glowX = useTransform(smoothX, [-400, 400], [-22, 22]);
  const glowY = useTransform(smoothY, [-400, 400], [-12, 12]);

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
      {/* Background ambient lighting */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-gradient-to-b from-accentCyan/12 via-accentViolet/8 to-transparent rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="section-shell">
        {/* HUD Technical Coordinate Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-8 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-accentCyan font-bold">SYS.ARCH</span>
            <span className="text-white/20">/</span>
            <span>VOLZHSKY → REMOTE</span>
            <span className="text-white/20 hidden sm:inline">/</span>
            <span className="hidden sm:inline text-slate-500">UTC+3 MOSCOW</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-accentEmerald/30 bg-accentEmerald/10 px-3 py-1 text-[11px] font-mono text-accentEmerald">
            <span className="size-2 rounded-full bg-accentEmerald animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="tracking-wide">ONLINE // AVAILABLE FOR AI & FULL-STACK</span>
          </div>
        </div>

        {/* Main Kinetic Display Typography Hero */}
        <div className="relative py-4 lg:py-8">
          {/* Technical crosshairs (+) */}
          <span className="absolute -top-2 -left-2 text-white/30 font-mono text-sm select-none">+</span>
          <span className="absolute -top-2 -right-2 text-white/30 font-mono text-sm select-none">+</span>

          {/* Multilayer kinetic typography */}
          <div className="relative select-none">
            {/* Outline Echo Parallax Layer (behind) */}
            <motion.div
              style={{ x: echoX, y: echoY }}
              className="absolute inset-0 pointer-events-none hidden sm:block opacity-40 will-change-transform"
              aria-hidden="true"
            >
              <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight uppercase leading-[0.95] text-stroke-cyan">
                <div>FULL-STACK</div>
                <div>AI DEVELOPER</div>
              </h1>
            </motion.div>

            {/* Glowing Depth Parallax Layer */}
            <motion.div
              style={{ x: glowX, y: glowY }}
              className="absolute inset-0 pointer-events-none hidden sm:block opacity-20 will-change-transform"
              aria-hidden="true"
            >
              <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight uppercase leading-[0.95] text-stroke-echo">
                <div>FULL-STACK</div>
                <div>AI DEVELOPER</div>
              </h1>
            </motion.div>

            {/* Front Solid Typography Layer */}
            <h1 className="relative z-10 font-display text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight uppercase leading-[0.95] text-white">
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                FULL-STACK
              </span>
              <span className="block bg-gradient-to-r from-accentCyan via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                AI DEVELOPER
              </span>
            </h1>
          </div>

          {/* Subtitle / Engineer Offer and Identity */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-display text-xl sm:text-2xl font-semibold text-slate-100 leading-snug">
                Архитектура мультиагентных систем, отказоустойчивые LLM-роутеры, Telegram Mini Apps и кинетические веб-интерфейсы.
              </p>
              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-400 font-sans">
                Привет, я <span className="text-white font-medium">Илья (idleON)</span>. Разрабатываю практические AI-инструменты и Full-Stack веб-сервисы с 100% открытым кодом: от компьютерного зрения в OpenCV до сложных prompt-пайплайнов и реактивных интерфейсов на Next.js 15.
              </p>
            </div>

            {/* Micro stats counter */}
            <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-6 font-mono text-xs border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
              <div>
                <div className="text-2xl font-bold font-display text-white">6+</div>
                <div className="text-slate-500 uppercase text-[10px]">Кейсов в портфолио</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-display text-accentCyan">24/7</div>
                <div className="text-slate-500 uppercase text-[10px]">Автономные пайплайны</div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-display text-accentEmerald">7-14д</div>
                <div className="text-slate-500 uppercase text-[10px]">Срок запуска MVP</div>
              </div>
            </div>
          </div>

          {/* CTA Magnetic Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-glow transition-all hover:bg-accentCyan hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
            >
              <span>Смотреть проекты (01-06)</span>
              <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("console")}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-accentCyan/50 hover:bg-accentCyan/10 backdrop-blur-md"
            >
              <Terminal size={15} className="text-accentCyan" />
              <span>Запустить AI-консоль</span>
            </button>

            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3.5 text-sm font-semibold text-slate-300 transition-all hover:border-accentEmerald/40 hover:text-white"
            >
              <Send size={14} className="text-accentEmerald" />
              <span>Обсудить проект</span>
            </a>
          </div>
        </div>

        {/* Technology Marquee Ticker */}
        <div className="mt-8 border-y border-white/10 py-3 overflow-hidden select-none">
          <div className="marquee-track flex w-max gap-8 animate-marquee-left">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 font-mono text-xs text-slate-400">
                <span className="hover:text-white transition-colors">{item}</span>
                <span className="text-accentCyan/50 text-[10px]">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Zone: Fanned Project Deck */}
        <FannedProjectDeck />
      </div>
    </section>
  );
}
