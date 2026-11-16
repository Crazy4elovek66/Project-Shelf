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
import { ProjectVisual } from "./ProjectVisual";

const tabNames = [
  "01_jobradar.py",
  "02_twitch_ai.py",
  "03_aura_net.tsx",
  "04_profitcheck.tsx",
  "05_autoclip.py",
  "06_babushka_magic.ts",
];

export function ProjectsTerminalSection() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"inspector" | "all">("inspector");

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
              <span>PROJECT INSPECTOR // 01 – 06 ИНЖЕНЕРНЫХ КЕЙСОВ</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              Проекты и реализации
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("inspector")}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                viewMode === "inspector"
                  ? "bg-white text-black font-bold"
                  : "border border-white/15 text-zinc-400 hover:text-white"
              }`}
            >
              ТЕРМИНАЛ
            </button>
            <button
              onClick={() => setViewMode("all")}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                viewMode === "all"
                  ? "bg-white text-black font-bold"
                  : "border border-white/15 text-zinc-400 hover:text-white"
              }`}
            >
              ВСЕ 6 КЕЙСОВ
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
                  idleon@architect:~/projects$ inspect
                </span>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={prevProject}
                  aria-label="Предыдущий проект"
                  className="flex items-center gap-1 rounded border border-white/15 bg-white/[0.03] px-2 py-1 text-zinc-300 hover:bg-white hover:text-black transition-colors"
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
                  className="flex items-center gap-1 rounded border border-white/15 bg-white/[0.03] px-2 py-1 text-zinc-300 hover:bg-white hover:text-black transition-colors"
                >
                  <span>NEXT</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* File Tabs Bar */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-[#0E0E12] overflow-x-auto no-scrollbar text-xs">
              {tabNames.map((tab, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
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

// Subcomponent: Project Inspector Details with Smart Vertical/Horizontal Image Frame
function SingleProjectInspector({ project, index }: { project: Project; index: number }) {
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
  const [isVerticalImage, setIsVerticalImage] = useState(false);

  // Check if current image is vertical based on URL or image load
  useEffect(() => {
    setActiveImageIdx(0);
    const currentSrc = images[0] || "";
    if (currentSrc.includes("JobRadar") || currentSrc.includes("Magic")) {
      setIsVerticalImage(true);
    } else {
      setIsVerticalImage(false);
    }
  }, [project.title, images]);

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
          <div className="relative min-h-[340px] sm:min-h-[400px] rounded-xl border border-white/10 bg-[#050507] p-4 flex items-center justify-center overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

            {viewMode === "screenshot" && images.length > 0 ? (
              isVerticalImage ? (
                /* SMART VERTICAL SMARTPHONE FRAME (For Telegram Bots / Mobile Apps) */
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative z-10 w-[220px] sm:w-[240px] aspect-[9/19] rounded-[28px] border-[3px] border-zinc-700 bg-black shadow-2xl overflow-hidden cursor-zoom-in group flex flex-col"
                >
                  {/* Phone Speaker Notch */}
                  <div className="h-5 bg-black flex items-center justify-center shrink-0 border-b border-zinc-800">
                    <div className="w-12 h-1 rounded-full bg-zinc-800" />
                  </div>

                  {/* Screenshot filling frame naturally without cropping */}
                  <div className="relative flex-1 w-full bg-black">
                    <Image
                      src={images[activeImageIdx]}
                      alt={`${project.title} mobile screenshot`}
                      fill
                      sizes="240px"
                      className="object-contain object-top"
                      onLoadingComplete={(img) => {
                        if (img.naturalHeight > img.naturalWidth) {
                          setIsVerticalImage(true);
                        }
                      }}
                    />
                  </div>

                  {/* Bottom Phone Bar */}
                  <div className="h-3 bg-black flex items-center justify-center shrink-0">
                    <div className="w-16 h-1 rounded-full bg-zinc-700" />
                  </div>

                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ) : (
                /* SMART HORIZONTAL DESKTOP / WEB FRAME */
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative z-10 w-full max-w-[500px] aspect-[16/10] rounded-xl border border-zinc-700 bg-black shadow-2xl overflow-hidden cursor-zoom-in group flex flex-col"
                >
                  {/* Browser Bar */}
                  <div className="h-6 bg-[#16161A] border-b border-zinc-800 flex items-center px-3 gap-1.5 shrink-0">
                    <span className="size-2 rounded-full bg-zinc-600" />
                    <span className="size-2 rounded-full bg-zinc-600" />
                    <span className="size-2 rounded-full bg-zinc-600" />
                    <span className="ml-2 font-mono text-[9px] text-zinc-500 truncate">
                      https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.app
                    </span>
                  </div>

                  <div className="relative flex-1 w-full bg-black">
                    <Image
                      src={images[activeImageIdx]}
                      alt={`${project.title} desktop screenshot`}
                      fill
                      sizes="500px"
                      className="object-cover object-top"
                      onLoadingComplete={(img) => {
                        if (img.naturalHeight > img.naturalWidth) {
                          setIsVerticalImage(true);
                        }
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              )
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
          <div>
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-pixel text-white font-bold">[/] 0{index + 1}</span>
                <span className="text-zinc-600">{"//"}</span>
                <span className="text-zinc-400 uppercase text-[10px]">
                  {project.categoryLabel || project.visual.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded border border-white/20 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white">
                  {project.status}
                </span>
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
              {project.description}
            </p>

            {/* Architecture Note */}
            {project.architectureNote && (
              <div className="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-zinc-300 leading-relaxed">
                <span className="text-white font-bold block mb-1">
                  АРХИТЕКТУРНОЕ ЯДРО //
                </span>
                {project.architectureNote}
              </div>
            )}

            {/* Key Metrics */}
            {project.metrics && (
              <div className="mt-3 inline-flex items-center gap-2 rounded border border-white/20 bg-white/[0.04] px-3 py-1 text-xs text-white">
                <span className="text-zinc-400">МЕТРИКА:</span>
                <span>{project.metrics}</span>
              </div>
            )}

            {/* Features */}
            <div className="mt-5">
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                Реализованный функционал:
              </span>
              <div className="grid gap-2 sm:grid-cols-2 text-xs text-zinc-300">
                {project.features.map((feature) => (
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
          </div>

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
                <span>{isTelegram ? "Протестировать в Telegram" : "Открыть репозиторий"}</span>
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
                  {project.demoUrl?.endsWith(".md")
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
