"use client";

import { projects, getProjectId } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Sparkles, Layers } from "lucide-react";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background radial accent */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accentCyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="section-shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-mono text-slate-300 mb-3">
              <Layers size={13} className="text-accentCyan" />
              <span>STACKING SHOWCASE // 01 - 06 ИНЖЕНЕРНЫХ ДОСЬЕ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Проекты и реализации
            </h2>
          </div>
          <p className="max-w-md text-sm font-mono text-slate-400 leading-relaxed">
            Карточки складываются друг на друга при скролле. Каждый кейс снабжен архитектурным описанием, скриншотами, интерактивной симуляцией и ссылками на открытый код.
          </p>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative">
          {projects.map((project, index) => (
            <div key={project.title} id={getProjectId(project.title)} className="scroll-mt-28">
              <ProjectCard project={project} index={index} total={projects.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
