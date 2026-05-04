"use client";

import { ArrowDown, Briefcase, Mail, Sparkles } from "lucide-react";
import type { MouseEvent } from "react";
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

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="section-shell grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-slate-300">
              <Sparkles size={16} className="text-cyan-200" />
              Личная витрина проектов
            </div>
            <p className="mb-4 font-display text-sm uppercase text-cyan-100/80">Портфолио</p>
            <h1 className="font-display text-5xl font-semibold leading-[1.03] tracking-normal text-white sm:text-7xl">
              Project Shelf
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-200">
              Создаю Telegram-ботов, веб-сервисы и инструменты автоматизации.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Здесь собраны мои работы: от интеграций с API до экспериментов с AI. Рассказываю о
              сути задач, используемом стеке и прикладываю ссылки на код.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                aria-label="Перейти к блоку проектов"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-cyan-100 sm:w-auto sm:min-w-[200px]"
              >
                Смотреть проекты
                <ArrowDown size={17} />
              </a>
              <a
                href={CONTACTS.hh_resume}
                aria-label="Открыть резюме на HH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/40 hover:bg-white/10 sm:w-auto sm:min-w-[200px]"
              >
                <Briefcase size={17} />
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-200/40 hover:text-white sm:w-auto sm:min-w-[200px]"
              >
                <Mail size={17} />
                Связаться
              </button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="glass-panel relative overflow-hidden rounded-[28px] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(110,231,249,0.20),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(188,167,255,0.18),transparent_36%)]" />
            <div className="relative grid gap-4">
              {projects.map((project, index) => (
                <a
                  key={project.title}
                  href={`#${getProjectId(project.title)}`}
                  onClick={(event) => scrollToProject(event, getProjectId(project.title))}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/22 px-4 py-4 transition hover:translate-x-1 hover:border-cyan-200/30 hover:bg-white/[0.07]"
                >
                  <span className="text-sm font-medium text-slate-100 transition group-hover:text-cyan-200">
                    {project.title}
                  </span>
                  <span className="text-xs text-slate-500">0{index + 1}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
