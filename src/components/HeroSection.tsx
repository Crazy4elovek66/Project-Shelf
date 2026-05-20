"use client";

import { ArrowDown, Briefcase, Mail, Sparkles } from "lucide-react";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { CONTACTS } from "@/data/contacts";
import { getProjectId, projects } from "@/data/projects";
import { Reveal } from "./Reveal";

export function HeroSection() {
  const scrollToProject = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const titleText = "Project Shelf";
  const titleLetters = Array.from(titleText);

  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute left-1/2 top-28 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="section-shell py-12 flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-stretch w-full">
        {/* Карточка 1: Описание и кнопки */}
        <div className="glass-panel col-span-8 rounded-[32px] p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-50" />
          <div className="relative z-10">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-slate-300">
                <Sparkles size={14} className="text-cyan-400 animate-pulse" />
                Личная витрина проектов
              </div>
            </Reveal>

            <motion.h1
              variants={letterContainerVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-5xl font-bold leading-[1.03] tracking-normal text-white sm:text-7xl flex flex-wrap"
            >
              {titleLetters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className={`inline-block origin-bottom ${char === " " ? "w-4" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                Создаю Telegram-ботов, веб-сервисы и инструменты автоматизации.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Здесь собраны мои работы: от интеграций с API до экспериментов с ИИ. Рассказываю о
                сути задач, используемом стеке и прикладываю ссылки на открытый код.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#projects"
                  onClick={(e) => scrollToProject(e, "projects")}
                  aria-label="Перейти к блоку проектов"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-cyan-100 sm:w-auto sm:min-w-[180px]"
                >
                  Смотреть проекты
                  <ArrowDown size={16} />
                </a>
                <a
                  href={CONTACTS.hh_resume}
                  aria-label="Открыть резюме на HH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/10 sm:w-auto sm:min-w-[180px]"
                >
                  <Briefcase size={16} />
                  Открыть резюме
                </a>
                <button
                  type="button"
                  aria-label="Скопировать email для связи"
                  onClick={() => {
                    navigator.clipboard.writeText(CONTACTS.email);
                    window.dispatchEvent(
                      new CustomEvent("show-toast", {
                        detail: `Email ${CONTACTS.email} скопирован!`,
                      }),
                    );
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white sm:w-auto sm:min-w-[180px]"
                >
                  <Mail size={16} />
                  Связаться
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Карточка 2: Быстрый хаб проектов */}
        <div className="glass-panel col-span-4 rounded-[32px] p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-50" />
          <div className="relative z-10 w-full">
            <Reveal delay={0.15}>
              <p className="mb-6 font-display text-xs uppercase tracking-wider text-cyan-400 font-bold">Быстрый навигатор</p>
              <div className="grid gap-3 w-full">
                {projects.map((project, index) => (
                  <a
                    key={project.title}
                    href={`#${getProjectId(project.title)}`}
                    onClick={(event) => scrollToProject(event, getProjectId(project.title))}
                    className="group flex items-center justify-between rounded-2xl border border-white/5 bg-black/15 px-4 py-3.5 transition hover:translate-x-1.5 hover:border-cyan-500/30 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
                      <span className="text-sm font-medium text-slate-200 transition group-hover:text-cyan-400">
                        {project.title}
                      </span>
                    </div>
                    <span className="text-[10px] rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 text-slate-500 transition group-hover:border-cyan-500/20 group-hover:text-cyan-400">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
