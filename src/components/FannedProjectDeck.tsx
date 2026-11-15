"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects, getProjectId, type Project } from "@/data/projects";

export function FannedProjectDeck() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = projects.length;
  // Arc angles from -13deg to +13deg
  const getAngle = (index: number) => {
    if (total <= 1) return 0;
    const step = 26 / (total - 1);
    return -13 + index * step;
  };

  // Horizontal offset to spread them across the container
  const getXOffset = (index: number) => {
    const center = (total - 1) / 2;
    return (index - center) * 64; // px
  };

  const getYOffset = (index: number) => {
    const center = (total - 1) / 2;
    const distFromCenter = Math.abs(index - center);
    // Slight arch upwards in center, down on sides
    return distFromCenter * distFromCenter * 6; // px
  };

  const scrollToProject = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative w-full pt-10 pb-6">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 uppercase">
          <Sparkles size={13} className="text-accentCyan" />
          <span>FANNED PROJECT DECK // {total} ИНЖЕНЕРНЫХ КЕЙСОВ</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500">
          Наведите для раскрытия стека · Клик для перехода
        </span>
      </div>

      {/* DESKTOP: FANNED ARC DECK (md and up) */}
      <div className="relative hidden md:flex items-center justify-center min-h-[390px] w-full overflow-visible py-8">
        <div className="relative flex items-center justify-center w-full max-w-[960px] h-[340px]">
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const angle = getAngle(index);
            const xOffset = getXOffset(index);
            const yOffset = getYOffset(index);
            const projectId = getProjectId(project.title);

            return (
              <motion.div
                key={project.title}
                initial={false}
                animate={{
                  rotate: isHovered ? 0 : angle,
                  x: isHovered ? xOffset * 1.15 : xOffset,
                  y: isHovered ? -34 : yOffset,
                  scale: isHovered ? 1.08 : 1,
                  zIndex: isHovered ? 40 : 10 + index,
                }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 26,
                  mass: 0.8,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => scrollToProject(projectId)}
                className="absolute top-0 w-[240px] h-[330px] rounded-2xl cursor-pointer select-none group border border-white/10 bg-[#0C0D12] shadow-2xl backdrop-blur-xl overflow-hidden will-change-transform"
                style={{
                  transformOrigin: "bottom center",
                }}
              >
                {/* Background Screenshot with Gradient Mask */}
                <div className="absolute inset-0 z-0">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="240px"
                      className="object-cover object-top opacity-35 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-45"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12] via-[#0C0D12]/85 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.visual.accent} opacity-10 group-hover:opacity-20 transition-opacity`} />
                </div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                  {/* Top: Index & Status */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-accentCyan transition-colors">
                      0{index + 1}
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                      {project.status}
                    </span>
                  </div>

                  {/* Middle: Category & Title */}
                  <div className="mt-auto mb-2">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-accentCyan mb-1 line-clamp-1">
                      {project.categoryLabel || project.visual.label}
                    </p>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-accentCyan transition-colors leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  {/* Bottom: Stack tags and Quick Link */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/5 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
                      <span>Смотреть кейс</span>
                      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Glowing Border Highlight */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-accentCyan/40 pointer-events-none transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MOBILE: SMOOTH HORIZONTAL SNAP CAROUSEL (< 768px) */}
      <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-3.5 pb-4 px-1 no-scrollbar">
        {projects.map((project, index) => {
          const projectId = getProjectId(project.title);
          return (
            <div
              key={project.title}
              onClick={() => scrollToProject(projectId)}
              className="snap-center shrink-0 w-[240px] h-[300px] rounded-2xl border border-white/10 bg-[#0C0D12] p-4 flex flex-col justify-between relative overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 z-0">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="240px"
                    className="object-cover object-top opacity-30"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D12] via-[#0C0D12]/80 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accentCyan">
                  0{index + 1}
                </span>
                <span className="rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                  {project.status}
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <p className="font-mono text-[9px] uppercase tracking-wider text-accentCyan mb-1">
                  {project.categoryLabel || project.visual.label}
                </p>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-white/5 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-accentCyan">
                  <span>Перейти к проекту</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
