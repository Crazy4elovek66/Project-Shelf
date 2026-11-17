"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { useLanguageMode } from "@/context/LanguageModeContext";
import { SmoothModeText } from "./SmoothModeText";

export function ProjectPreviewStrip() {
  const { isSimple } = useLanguageMode();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const selectProject = (index: number) => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.dispatchEvent(new CustomEvent("select-project-tab", { detail: index }));
  };

  return (
    <section className="py-12 border-b border-white/10 relative">
      <div className="section-shell">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-wider">
            <span className="text-white font-bold">&gt;_</span>
            <SmoothModeText as="span">
              {isSimple
                ? `КАТАЛОГ ПРОЕКТОВ // 01 – 0${projects.length} КРАТКИЙ ОБЗОР`
                : `КАТАЛОГ ПРОЕКТОВ // 01 – 0${projects.length} БЫСТРОЕ ОЗНАКОМЛЕНИЕ`}
            </SmoothModeText>
          </div>
          <SmoothModeText as="span" className="hidden sm:inline-block font-mono text-[11px] text-zinc-500">
            {isSimple ? "Нажмите на строку для подробностей ↓" : "Клик открывает проект в терминале инспектора ↓"}
          </SmoothModeText>
        </div>

        {/* Clean Monochromatic Horizontal Strip Rows */}
        <div className="divide-y divide-white/5 border border-white/10 rounded-xl bg-[#09090C] overflow-hidden">
          {projects.map((project, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={project.title}
                onClick={() => selectProject(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative px-5 py-4 cursor-pointer transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-3 select-none"
              >
                {/* Sliding Hover Highlight Background */}
                {isHovered && (
                  <motion.div
                    layoutId="previewStripHover"
                    className="absolute inset-0 z-0 bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}

                {/* Left: Code, Title, Essence */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0">
                  <span className="font-pixel text-xs text-zinc-500 group-hover:text-white transition-colors w-12">
                    [/] 0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h4 className="font-mono text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {project.title}
                      </h4>
                      <span className="rounded border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[9px] font-mono text-zinc-400">
                        {project.status}
                      </span>
                    </div>
                    <SmoothModeText as="p" className="font-mono text-xs text-zinc-400 truncate mt-0.5 max-w-xl">
                      {isSimple && project.simpleDescription
                        ? project.simpleDescription
                        : project.description}
                    </SmoothModeText>
                  </div>
                </div>

                {/* Right: Stack Tags and Arrow */}
                <div className="relative z-10 flex items-center justify-between md:justify-end gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="size-7 rounded border border-white/10 bg-white/[0.02] flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all">
                    <ArrowUpRight size={13} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
