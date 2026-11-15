"use client";

import { useState } from "react";
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
  Sparkles,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { StatusBadge, TechBadge } from "./Badges";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const images = project.images && project.images.length > 0 ? project.images : project.imageUrl ? [project.imageUrl] : [];
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"screenshot" | "mockup">("screenshot");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasRepo = Boolean(project.repoUrl);
  const hasDemo = Boolean(project.demoUrl);
  const isTelegram = Boolean(
    project.repoUrl?.includes("t.me") || project.repoUrl?.includes("telegram"),
  );

  const stickyTop = 84 + index * 14;

  return (
    <>
      <article
        style={{ top: `${stickyTop}px` }}
        className="sticky z-[10] w-full rounded-3xl border border-white/10 bg-[#0C0D12]/95 backdrop-blur-2xl shadow-2xl p-5 sm:p-7 lg:p-8 mb-8 transition-all duration-300 hover:border-accentCyan/40 will-change-transform"
      >
        {/* Card Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl sm:text-3xl font-black text-accentCyan">
              0{index + 1}
            </span>
            <span className="text-white/20 font-mono text-xl">/</span>
            <div>
              <span className="font-mono text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider block">
                {project.categoryLabel || project.visual.label}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mt-0.5">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            {project.updatedAt && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-slate-300">
                <Calendar size={11} className="text-accentCyan" />
                <span>{project.updatedAt}</span>
              </span>
            )}
          </div>
        </div>

        {/* Card Grid Content: Left Gallery & Right Technical Dossier */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* LEFT: Multi-Screenshot Gallery or Animated Mockup */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-3">
            {/* View Mode Switcher (Screenshot vs Interactive Simulation) */}
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-[#13151E]">
                <button
                  type="button"
                  onClick={() => setViewMode("screenshot")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                    viewMode === "screenshot"
                      ? "bg-white/10 text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <ImageIcon size={12} />
                  <span>Скриншоты ({images.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("mockup")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-colors ${
                    viewMode === "mockup"
                      ? "bg-white/10 text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Code2 size={12} />
                  <span>Симуляция UI</span>
                </button>
              </div>

              {viewMode === "screenshot" && images.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="Увеличить скриншот"
                  className="flex items-center gap-1 text-slate-400 hover:text-accentCyan transition-colors p-1"
                  title="Увеличить в полном размере"
                >
                  <Maximize2 size={13} />
                  <span className="hidden sm:inline">Зум</span>
                </button>
              )}
            </div>

            {/* Media Container */}
            <div className="relative min-h-[280px] sm:min-h-[320px] rounded-2xl border border-white/10 bg-[#07090E] overflow-hidden flex items-center justify-center">
              {viewMode === "screenshot" && images.length > 0 ? (
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative w-full h-full min-h-[280px] sm:min-h-[320px] cursor-zoom-in group"
                >
                  <Image
                    src={images[activeImageIdx]}
                    alt={`${project.title} screenshot ${activeImageIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-mono text-slate-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    Клик для зума 🔍
                  </div>
                </div>
              ) : (
                <div className="w-full h-full p-2">
                  <ProjectVisual project={project} />
                </div>
              )}
            </div>

            {/* Thumbnail dots / selector if multiple screenshots */}
            {viewMode === "screenshot" && images.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      activeImageIdx === idx
                        ? "w-8 bg-accentCyan"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Показать скриншот ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Technical Dossier */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Architecture & Problem Description */}
              <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-sans">
                {project.description}
              </p>

              {/* Architecture Note */}
              {project.architectureNote && (
                <div className="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] font-mono text-xs text-slate-300 leading-relaxed">
                  <span className="text-accentCyan font-bold block mb-1">
                    АРХИТЕКТУРНОЕ ЯДРО //
                  </span>
                  {project.architectureNote}
                </div>
              )}

              {/* Key Metrics Badge */}
              {project.metrics && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-accentEmerald/30 bg-accentEmerald/10 px-3 py-1 font-mono text-[11px] text-accentEmerald">
                  <Sparkles size={12} />
                  <span>{project.metrics}</span>
                </div>
              )}

              {/* 2x2 Feature Matrix */}
              <div className="mt-5">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-2.5">
                  Реализованный функционал:
                </span>
                <div className="grid gap-2 sm:grid-cols-2 text-xs text-slate-300 font-sans">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-accentCyan shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Badges */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
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
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2.5 text-xs font-mono font-semibold text-white transition hover:border-accentCyan/50 hover:bg-accentCyan/10 hover:text-white"
                >
                  {isTelegram ? <Send size={14} className="text-accentEmerald" /> : <Github size={14} />}
                  <span>{isTelegram ? "Протестировать в Telegram" : "Открыть репозиторий"}</span>
                  <ArrowUpRight size={13} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-mono text-slate-500">
                  Репозиторий скоро появится
                </span>
              )}

              {hasDemo && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-mono font-bold text-slate-950 transition hover:bg-accentCyan shadow-glow"
                >
                  <ExternalLink size={14} />
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
      </article>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && images.length > 0 && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl max-h-[90vh] w-full rounded-2xl overflow-hidden border border-white/20 bg-[#0C0D12] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#13151E]">
                <div className="flex items-center gap-2 font-mono text-xs text-white">
                  <span className="text-accentCyan font-bold">{project.title}</span>
                  <span className="text-slate-500">{"//"} Скриншот {activeImageIdx + 1} из {images.length}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative w-full h-[70vh] bg-black/50">
                <Image
                  src={images[activeImageIdx]}
                  alt={project.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              {images.length > 1 && (
                <div className="flex items-center justify-center gap-2 p-3 border-t border-white/10 bg-[#0C0D12]">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeImageIdx === idx ? "w-8 bg-accentCyan" : "w-2 bg-white/20"
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
