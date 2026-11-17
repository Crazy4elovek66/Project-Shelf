"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Send,
  Calendar,
  Maximize2,
  X,
  Code2,
  Image as ImageIcon,
  CheckCircle2,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Smartphone,
  Monitor,
} from "lucide-react";
import { projects, getProjectId, type Project } from "@/data/projects";
import { StatusBadge } from "./Badges";
import { ProjectVisual } from "./ProjectVisual";
import { useLanguageMode } from "@/context/LanguageModeContext";
import { SmoothModeText } from "./SmoothModeText";

const tabNames = [
  "01_jobradar.py",
  "02_twitch_ai.py",
  "03_aura_net.tsx",
  "04_profitcheck.tsx",
  "05_autoclip.py",
  "06_babushka_magic.ts",
  "07_rakomania.py",
  "08_dota_overlay.ts",
];

export function ProjectsTerminalSection() {
  const { isSimple } = useLanguageMode();
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"inspector" | "all">("inspector");

  const simpleTabNames = [
    "01. JobRadar",
    "02. Twitch AI",
    "03. Aura.net",
    "04. ProfitCheck",
    "05. AutoClip",
    "06. Магия Бабушки",
    "07. Ракомания",
    "08. DotaOverlay",
  ];

  const currentTabs = isSimple ? simpleTabNames : tabNames;

  // Listen to select-project-tab custom event
  useEffect(() => {
    const handleSelectTab = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === "number" && customEvent.detail >= 0 && customEvent.detail < projects.length) {
        setActiveProjectIdx(customEvent.detail);
        setViewMode("inspector");
      }
    };

    window.addEventListener("select-project-tab", handleSelectTab);
    return () => window.removeEventListener("select-project-tab", handleSelectTab);
  }, []);

  const project = projects[activeProjectIdx];

  const nextProject = () => {
    setActiveProjectIdx((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProjectIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-24 border-b border-white/10 relative font-mono">
      <div className="section-shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300 mb-3">
              <span className="font-pixel text-[10px] text-white">[ / ]</span>
              <SmoothModeText as="span">
                {isSimple
                  ? "ИНСПЕКТОР ПРОЕКТОВ // 01 – 06 РАБОТ"
                  : "PROJECT INSPECTOR // 01 – 06 ИНЖЕНЕРНЫХ КЕЙСОВ"}
              </SmoothModeText>
            </div>
            <SmoothModeText as="h2" className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              {isSimple ? "Примеры работ и результаты" : "Проекты и реализации"}
            </SmoothModeText>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("inspector")}
              className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                viewMode === "inspector"
                  ? "bg-white text-black font-bold"
                  : "border border-white/15 text-zinc-400 hover:text-white"
              }`}
            >
              <SmoothModeText as="span">
                {isSimple ? "ИНСПЕКТОР" : "ТЕРМИНАЛ"}
              </SmoothModeText>
            </button>
            <button
              onClick={() => setViewMode("all")}
              className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer ${
                viewMode === "all"
                  ? "bg-white text-black font-bold"
                  : "border border-white/15 text-zinc-400 hover:text-white"
              }`}
            >
              <SmoothModeText as="span">
                {isSimple ? "ВСЕ 6 ПРОЕКТОВ" : "ВСЕ 6 КЕЙСОВ"}
              </SmoothModeText>
            </button>
          </div>
        </div>

        {/* MODE 1: INTERACTIVE AI ARCHITECT TERMINAL INSPECTOR */}
        {viewMode === "inspector" && (
          <div className="rounded-2xl border border-white/15 bg-[#09090C] shadow-2xl overflow-hidden flex flex-col">
            {/* Terminal Window Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-[#121215] text-xs">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="ml-2 font-bold text-white tracking-wide">
                  {isSimple ? "idleon@portfolio:~/projects$ view" : "idleon@architect:~/projects$ inspect"}
                </span>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={prevProject}
                  aria-label="Предыдущий проект"
                  className="flex items-center gap-1 rounded border border-white/15 bg-white/[0.03] px-2 py-1 text-zinc-300 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronLeft size={13} />
                  <span>PREV</span>
                </button>
                <span className="text-zinc-500 px-1 font-bold">
                  {activeProjectIdx + 1}/{projects.length}
                </span>
                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Следующий проект"
                  className="flex items-center gap-1 rounded border border-white/15 bg-white/[0.03] px-2 py-1 text-zinc-300 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <span>NEXT</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* File Tabs Bar */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-[#0E0E12] overflow-x-auto no-scrollbar text-xs">
              {currentTabs.map((tab, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-[#18181D] text-white border border-white/20 font-bold"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="text-zinc-600 font-pixel text-[10px]">[/]</span>
                    <span>{tab}</span>
                  </button>
                );
              })}
            </div>

            {/* Terminal Body: Project Inspector Detail */}
            <div className="p-6 sm:p-8">
              <SingleProjectInspector project={project} index={activeProjectIdx} />
            </div>
          </div>
        )}

        {/* MODE 2: ALL 6 PROJECTS LIST VIEW */}
        {viewMode === "all" && (
          <div className="space-y-8">
            {projects.map((p, idx) => (
              <div
                key={p.title}
                id={getProjectId(p.title)}
                className="rounded-2xl border border-white/15 bg-[#09090C] p-6 sm:p-8 shadow-xl"
              >
                <SingleProjectInspector project={p} index={idx} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Adaptive Screenshot Frame: Desktop Browser (>= 1.15), Telegram Desktop (0.78 - 1.15), or Phone (< 0.78)
function AdaptiveScreenshotFrame({
  src,
  alt,
  title,
  onClick,
}: {
  src: string;
  alt: string;
  title: string;
  onClick: () => void;
}) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!src) return;
    const img = new window.Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    } else {
      img.onload = () => {
        setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
    }
  }, [src]);

  const defaultRatio = src.includes("JobRadar1")
    ? 1.05
    : src.includes("JobRadar2") || src.includes("ProfitCheck") || src.includes("Magic")
    ? 9 / 19.5
    : 1.6;

  const ratio = dimensions ? dimensions.width / dimensions.height : defaultRatio;

  // Case 1: Wide Desktop / Web Mockup (ratio >= 1.15)
  if (ratio >= 1.15) {
    return (
      <div
        onClick={onClick}
        className="relative z-10 w-full max-w-[520px] aspect-[16/10] rounded-xl border border-white/15 bg-black shadow-2xl overflow-hidden cursor-zoom-in group flex flex-col transition-all duration-300 hover:border-white/30 select-none no-select-media"
      >
        <div className="h-6 bg-[#16161A] border-b border-white/10 flex items-center px-3 gap-1.5 shrink-0 select-none">
          <span className="size-2 rounded-full bg-zinc-600" />
          <span className="size-2 rounded-full bg-zinc-600" />
          <span className="size-2 rounded-full bg-zinc-600" />
          <span className="ml-2 font-mono text-[9px] text-zinc-500 truncate select-none">
            https://{title.toLowerCase().replace(/[^a-z0-9]/g, "")}.app
          </span>
        </div>
        <div className="relative flex-1 w-full bg-black select-none">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="520px"
            draggable={false}
            className="object-cover object-top select-none pointer-events-none no-select-media"
          />
        </div>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    );
  }

  // Case 2: Telegram Desktop / Square Messenger Window (0.78 <= ratio < 1.15)
  if (ratio >= 0.78) {
    return (
      <div
        onClick={onClick}
        className="relative z-10 w-full max-w-[460px] rounded-xl border border-white/15 bg-[#09090B] shadow-2xl overflow-hidden cursor-zoom-in group flex flex-col transition-all duration-300 hover:border-white/30 select-none no-select-media"
        style={{ aspectRatio: `${ratio}` }}
      >
        <div className="h-6 bg-[#16161C] border-b border-white/10 flex items-center px-3 gap-2 shrink-0 select-none">
          <div className="size-2 rounded-full bg-emerald-500/80" />
          <span className="font-mono text-[9px] text-zinc-400 font-bold truncate select-none">
            Telegram Desktop // {title}
          </span>
          <div className="ml-auto flex items-center gap-1.5 text-zinc-600 text-[9px] select-none">
            <span>—</span>
            <span>□</span>
            <span>✕</span>
          </div>
        </div>
        <div className="relative flex-1 w-full bg-black select-none">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="460px"
            draggable={false}
            className="object-contain object-top select-none pointer-events-none no-select-media"
          />
        </div>
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    );
  }

  // Case 3: Adaptive Smartphone Frame (ratio < 0.78)
  return (
    <div
      onClick={onClick}
      style={{ aspectRatio: `${ratio}` }}
      className="relative z-10 mx-auto flex h-[430px] sm:h-[470px] lg:h-[500px] w-auto max-w-full items-center justify-center rounded-[28px] border border-white/25 bg-[#09090B] p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.9)] cursor-zoom-in group transition-all duration-300 hover:border-white/40 select-none no-select-media"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-2.5 left-1/2 z-20 h-1 w-12 -translate-x-1/2 rounded-full bg-white/20 select-none"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#050505] select-none">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="340px"
          draggable={false}
          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.01] select-none pointer-events-none no-select-media"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2.5 left-1/2 z-20 h-1 w-16 -translate-x-1/2 rounded-full bg-white/20 select-none"
      />
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 rounded-[28px]" />
    </div>
  );
}

// Subcomponent: Project Inspector Details with Smart Vertical/Horizontal Image Frame
function SingleProjectInspector({ project, index }: { project: Project; index: number }) {
  const { isSimple } = useLanguageMode();
  const images = useMemo(() => {
    return project.images && project.images.length > 0
      ? project.images
      : project.imageUrl
      ? [project.imageUrl]
      : [];
  }, [project.images, project.imageUrl]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"screenshot" | "mockup">("screenshot");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [project.title]);

  const hasRepo = Boolean(project.repoUrl);
  const hasDemo = Boolean(project.demoUrl);
  const isTelegram = Boolean(
    project.repoUrl?.includes("t.me") || project.repoUrl?.includes("telegram"),
  );

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-12 items-stretch font-mono">
        {/* LEFT COLUMN: SMART MEDIA FRAME */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          {/* Media Header Controls */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 p-0.5 rounded-lg border border-white/10 bg-[#121215]">
              <button
                type="button"
                onClick={() => setViewMode("screenshot")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                  viewMode === "screenshot"
                    ? "bg-white text-black font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <ImageIcon size={12} />
                <span>СКРИНШОТ ({images.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("mockup")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                  viewMode === "mockup"
                    ? "bg-white text-black font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Code2 size={12} />
                <span>СИМУЛЯЦИЯ</span>
              </button>
            </div>

            {viewMode === "screenshot" && images.length > 0 && (
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="flex items-center gap-1 text-zinc-400 hover:text-white text-xs"
                title="Полноэкранный зум"
              >
                <Maximize2 size={12} />
                <span className="hidden sm:inline">ЗУМ</span>
              </button>
            )}
          </div>

          {/* Media Stage Canvas */}
          <div className="relative min-h-[470px] sm:min-h-[510px] lg:min-h-[540px] rounded-xl border border-white/10 bg-[#050507] p-4 flex items-center justify-center overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {viewMode === "screenshot" && images.length > 0 ? (
              <AdaptiveScreenshotFrame
                src={images[activeImageIdx]}
                alt={`${project.title} screenshot`}
                title={project.title}
                onClick={() => setIsLightboxOpen(true)}
              />
            ) : (
              /* Simulation UI Mode from ProjectVisual */
              <div className="relative z-10 w-full">
                <ProjectVisual project={project} />
              </div>
            )}
          </div>

          {/* Screenshot dots switcher */}
          {viewMode === "screenshot" && images.length > 1 && (
            <div className="flex items-center justify-center gap-2 pt-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImageIdx === idx ? "w-8 bg-white" : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Скриншот ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: TECHNICAL DOSSIER */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <SmoothModeText as="div">
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-pixel text-white font-bold">[/] 0{index + 1}</span>
                <span className="text-zinc-600">{"//"}</span>
                <span className="text-zinc-400 uppercase text-[10px]">
                  {isSimple && project.simpleCategoryLabel
                    ? project.simpleCategoryLabel
                    : project.categoryLabel || project.visual.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={project.status} />
                {project.updatedAt && (
                  <span className="rounded border border-white/10 px-2 py-0.5 text-[10px] text-zinc-400">
                    {project.updatedAt}
                  </span>
                )}
              </div>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              {project.title}
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
              {isSimple && project.simpleDescription
                ? project.simpleDescription
                : project.description}
            </p>

            {/* Architecture Note */}
            {(project.architectureNote || project.simpleArchitectureNote) && (
              <div className="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-zinc-300 leading-relaxed">
                <span className="text-white font-bold block mb-1">
                  {isSimple ? "КАК ЭТО РАБОТАЕТ //" : "АРХИТЕКТУРНОЕ ЯДРО //"}
                </span>
                {isSimple && project.simpleArchitectureNote
                  ? project.simpleArchitectureNote
                  : project.architectureNote}
              </div>
            )}

            {/* Key Metrics */}
            {(project.metrics || project.simpleMetrics) && (
              <div className="mt-3 inline-flex items-center gap-2 rounded border border-white/20 bg-white/[0.04] px-3 py-1 text-xs text-white">
                <span className="text-zinc-400">
                  {isSimple ? "РЕЗУЛЬТАТ:" : "МЕТРИКА:"}
                </span>
                <span>
                  {isSimple && project.simpleMetrics
                    ? project.simpleMetrics
                    : project.metrics}
                </span>
              </div>
            )}

            {/* Features */}
            <div className="mt-5">
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                {isSimple ? "Что умеет проект:" : "Реализованный функционал:"}
              </span>
              <div className="grid gap-2 sm:grid-cols-2 text-xs text-zinc-300">
                {(isSimple && project.simpleFeatures
                  ? project.simpleFeatures
                  : project.features
                ).map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <span className="text-white font-bold mt-0.5">✓</span>
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Tags */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </SmoothModeText>

          {/* Action Buttons */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
            {hasRepo ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-black transition hover:bg-zinc-200"
              >
                {isTelegram ? <Send size={13} /> : <Github size={13} />}
                <span>
                  {isTelegram
                    ? isSimple
                      ? "Открыть в Telegram"
                      : "Протестировать в Telegram"
                    : isSimple
                    ? "Исходный код (GitHub)"
                    : "Открыть репозиторий"}
                </span>
                <ArrowUpRight size={13} />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs text-zinc-500">
                Репозиторий скоро появится
              </span>
            )}

            {hasDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/10 hover:border-white"
              >
                <ExternalLink size={13} />
                <span>
                  {isSimple
                    ? "Подробнее о проекте"
                    : project.demoUrl?.endsWith(".md")
                    ? "Архитектура (Case Study)"
                    : "Смотреть проект"}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && images.length > 0 && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl max-h-[90vh] w-full rounded-xl overflow-hidden border border-white/20 bg-[#0B0B0D] shadow-2xl flex flex-col font-mono"
            >
              <div className="flex items-center justify-between p-3 border-b border-white/10 bg-[#141418]">
                <div className="flex items-center gap-2 text-xs text-white">
                  <span className="font-bold">{project.title}</span>
                  <span className="text-zinc-500">
                    {"//"} Скриншот {activeImageIdx + 1} из {images.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1 rounded text-zinc-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative w-full h-[72vh] bg-black p-4 flex items-center justify-center">
                <Image
                  src={images[activeImageIdx]}
                  alt={project.title}
                  fill
                  className="object-contain"
                />
              </div>

              {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 p-3 border-t border-white/10 bg-[#0B0B0D]">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeImageIdx === idx ? "w-8 bg-white" : "w-2 bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
