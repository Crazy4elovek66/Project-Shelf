"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Terminal, Send } from "lucide-react";
import { CONTACTS } from "@/data/contacts";
import { useLanguageMode } from "@/context/LanguageModeContext";
import { SmoothModeText } from "./SmoothModeText";

export function HeroSection() {
  const { isSimple } = useLanguageMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const [isVolgogradHovered, setIsVolgogradHovered] = useState(false);

  // Synchronize left and right hands video layers frame-perfectly
  useEffect(() => {
    const v1 = leftVideoRef.current;
    const v2 = rightVideoRef.current;
    if (!v1 || !v2) return;

    const syncVideos = () => {
      if (Math.abs(v1.currentTime - v2.currentTime) > 0.04) {
        v2.currentTime = v1.currentTime;
      }
    };

    const handlePlay = () => {
      v2.play().catch(() => {});
    };

    const handlePause = () => {
      v2.pause();
    };

    v1.addEventListener("timeupdate", syncVideos);
    v1.addEventListener("play", handlePlay);
    v1.addEventListener("pause", handlePause);

    if (!v1.paused && v2.paused) {
      v2.play().catch(() => {});
    }

    return () => {
      v1.removeEventListener("timeupdate", syncVideos);
      v1.removeEventListener("play", handlePlay);
      v1.removeEventListener("pause", handlePause);
    };
  }, []);

  // Mouse Parallax coordinates for kinetic typography
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Offset layers: horizontal [-20, 20] and vertical [-10, 10] (half strength of X)
  const echoX = useTransform(smoothX, [-400, 400], [-20, 20]);
  const echoY = useTransform(smoothY, [-400, 400], [-10, 10]);
  const deepEchoX = useTransform(smoothX, [-400, 400], [-32, 32]);
  const deepEchoY = useTransform(smoothY, [-400, 400], [-16, 16]);

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
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-16 sm:pt-[72px] pb-1 sm:pb-1.5 lg:pb-2 overflow-x-clip"
    >
      {/* HUD Technical Coordinate Top Bar (Overlaying the upper area of hands, z-30) */}
      <div className="pointer-events-none absolute inset-x-0 top-[90px] sm:top-[88px] lg:top-[96px] z-30">
        <div className="section-shell">
          <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <SmoothModeText as="span" className="text-white font-bold tracking-wider">
                {isSimple ? "ЛОКАЦИЯ" : "SYS.ARCH"}
              </SmoothModeText>
              <span className="text-white/20">/</span>

              {/* VOLGOGRAD with Full-Width Contour Crown Easter Egg */}
              <span
                onMouseEnter={() => setIsVolgogradHovered(true)}
                onMouseLeave={() => setIsVolgogradHovered(false)}
                className="relative inline-flex items-center text-zinc-100 border-b border-dashed border-white/35 pb-0.5 cursor-pointer select-none"
              >
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 7, scale: 0.9 }}
                  animate={
                    isVolgogradHovered
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 7, scale: 0.9 }
                  }
                  transition={{ type: "spring", stiffness: 360, damping: 24 }}
                  className="pointer-events-none absolute bottom-full left-0 right-0 mb-1 flex w-full justify-center text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.45)] z-40"
                >
                  <svg
                    viewBox="0 0 120 28"
                    fill="none"
                    className="w-full h-5 overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M4 23L12 7L36 17L60 3L84 17L108 7L116 23H4Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="4"
                      y1="26.5"
                      x2="116"
                      y2="26.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.span>
                VOLGOGRAD
              </span>

              <span>→ REMOTE</span>
              <span className="text-white/20 hidden sm:inline">/</span>
              <span className="hidden sm:inline text-zinc-500">UTC+3 MOSCOW</span>
            </div>

            <div className="flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.04] px-3 py-1 text-[11px] font-mono text-zinc-300">
              <span
                aria-hidden="true"
                className="inline-block font-mono text-sm font-bold leading-none text-white animate-terminal-blink"
              >
                _
              </span>
              <SmoothModeText as="span" className="tracking-wide text-white">
                {isSimple ? "ДОСТУПЕН ДЛЯ НОВЫХ ПРОЕКТОВ" : "ONLINE // AVAILABLE FOR AI & FULL-STACK"}
              </SmoothModeText>
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell relative">
        {/* Layer 1: Left Hand (Robot) behind FULL-STACK (z-10) */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-20 -mb-4 w-screen select-none sm:-mt-[13vw] sm:-mb-[15.5vw] z-10"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        >
          <video
            ref={leftVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            onLoadedMetadata={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.volume = 0;
            }}
            className="block h-auto w-full mix-blend-screen contrast-[1.28] brightness-[1.06] select-none"
          >
            <source src="/videos/hero-hands-loop.webm" type="video/webm" />
            <source src="/videos/hero-hands-loop.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Layer 3: Right Hand (Human) above AI DEVELOPER (z-30) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-20 -mb-4 w-screen select-none sm:-mt-[13vw] sm:-mb-[15.5vw] z-30"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        >
          <video
            ref={rightVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            onLoadedMetadata={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.volume = 0;
            }}
            className="block h-auto w-full mix-blend-screen contrast-[1.28] brightness-[1.06] select-none"
          >
            <source src="/videos/hero-hands-loop.webm" type="video/webm" />
            <source src="/videos/hero-hands-loop.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Main Monochromatic Kinetic Display Typography Hero */}
        <div className="relative z-20 -mt-12 sm:-mt-[18vw] md:-mt-[21vw] lg:-mt-[23.5vw] xl:-mt-[25.5vw] py-0.5">
          {/* Technical crosshairs (+) */}
          <span className="absolute -top-2 -left-2 text-white/20 font-mono text-sm select-none z-10">+</span>
          <span className="absolute -top-2 -right-2 text-white/20 font-mono text-sm select-none z-10">+</span>

          {/* Multilayer kinetic typography */}
          <div className="relative select-none z-10">
            {/* Deep Outline Echo Layer */}
            <motion.div
              style={{ x: deepEchoX, y: deepEchoY }}
              className="absolute inset-0 pointer-events-none hidden sm:block opacity-20 will-change-transform"
              aria-hidden="true"
            >
              <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight uppercase leading-[0.88] text-stroke-echo-deep">
                <div>FULL-STACK</div>
                <div>AI DEVELOPER</div>
              </h1>
            </motion.div>

            {/* Bright Outline Echo Parallax Layer */}
            <motion.div
              style={{ x: echoX, y: echoY }}
              className="absolute inset-0 pointer-events-none hidden sm:block opacity-45 will-change-transform"
              aria-hidden="true"
            >
              <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight uppercase leading-[0.88] text-stroke-echo">
                <div>FULL-STACK</div>
                <div>AI DEVELOPER</div>
              </h1>
            </motion.div>

            {/* Front Solid Monochrome Typography Layer */}
            <h1 className="relative z-10 font-display text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight uppercase leading-[0.88] text-white">
              <span
                className="block text-white"
                style={{
                  textShadow:
                    "0 2px 10px rgba(5, 5, 5, 0.96), 0 0 22px rgba(5, 5, 5, 0.92), 0 0 2px rgba(5, 5, 5, 1)",
                }}
              >
                FULL-STACK
              </span>
              <span className="block text-zinc-300">
                AI DEVELOPER
              </span>
            </h1>
          </div>

          {/* Subtitle / Engineer Offer and Identity */}
          <div className="mt-2.5 sm:mt-3 grid gap-3 lg:grid-cols-12 lg:items-end relative z-10">
            <div className="lg:col-span-8">
              <SmoothModeText as="div">
                <p className="font-mono text-base sm:text-lg lg:text-xl font-bold text-white leading-snug">
                  {isSimple
                    ? "Создаю умных ботов, сайты и веб-приложения с нейросетью, которые автоматизируют рутину, экономят время и помогают бизнесу расти."
                    : "Архитектура мультиагентных систем, отказоустойчивые LLM-роутеры, Telegram Mini Apps и веб-интерфейсы."}
                </p>
                <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-400 font-mono">
                  {isSimple ? (
                    <>
                      Привет, я <span className="text-white font-bold">Илья</span>. Помогаю предпринимателям и компаниям внедрять искусственный интеллект: создаю ботов в Telegram, современные сайты и системы автоматизации под ключ.
                    </>
                  ) : (
                    <>
                      Привет, я <span className="text-white font-bold">Илья (idleON)</span>. Разрабатываю практические AI-инструменты и Full-Stack веб-сервисы с 100% открытым кодом: от компьютерного зрения в OpenCV до сложных prompt-пайплайнов и реактивных интерфейсов на Next.js 15.
                    </>
                  )}
                </p>
              </SmoothModeText>
            </div>

            {/* Micro stats counter */}
            <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-6 font-mono text-xs border-t lg:border-t-0 border-white/10 pt-2 lg:pt-0">
              <div>
                <div className="text-2xl font-bold font-mono text-white">6+</div>
                <SmoothModeText as="div" className="text-zinc-500 uppercase text-[10px]">
                  {isSimple ? "ГОТОВЫХ ПРОЕКТОВ" : "КЕЙСОВ В ПРОДЕ"}
                </SmoothModeText>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-mono text-white">24/7</div>
                <SmoothModeText as="div" className="text-zinc-500 uppercase text-[10px]">
                  {isSimple ? "РАБОТА БЕЗ СБОЕВ" : "АВТОНОМНЫЕ ПАЙПЛАЙНЫ"}
                </SmoothModeText>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-mono text-white">7-14д</div>
                <SmoothModeText as="div" className="text-zinc-500 uppercase text-[10px]">
                  {isSimple ? "СРОК ЗАПУСКА" : "СРОК СБОРКИ MVP"}
                </SmoothModeText>
              </div>
            </div>
          </div>

          {/* Minimalist High-Contrast Action Buttons */}
          <div className="mt-3 sm:mt-3.5 flex flex-wrap items-center gap-2.5 sm:gap-3 relative z-10">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-xs font-mono font-bold text-black transition-all hover:bg-zinc-200 shadow-md cursor-pointer"
            >
              <SmoothModeText as="span">
                {isSimple ? ">_ СМОТРЕТЬ РАБОТЫ" : ">_ СМОТРЕТЬ КЕЙСЫ (01-06)"}
              </SmoothModeText>
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("console")}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-6 py-3.5 text-xs font-mono font-bold text-white transition-all hover:bg-white hover:text-black hover:border-white cursor-pointer"
            >
              <Terminal size={14} />
              <SmoothModeText as="span">
                {isSimple ? "[/] ЗАДАТЬ ВОПРОС ИИ" : "[/] AI-КОНСОЛЬ"}
              </SmoothModeText>
            </button>

            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-transparent px-5 py-3.5 text-xs font-mono text-zinc-300 transition-all hover:border-white hover:text-white"
            >
              <Send size={13} />
              <SmoothModeText as="span">
                {isSimple ? "^S НАПИСАТЬ МНЕ" : "^S СВЯЗАТЬСЯ"}
              </SmoothModeText>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
