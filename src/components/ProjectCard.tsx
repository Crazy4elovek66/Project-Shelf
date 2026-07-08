import { ExternalLink, Github, Send } from "lucide-react";
import type { Project } from "@/data/projects";
import { StatusBadge, TechBadge } from "./Badges";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({ project }: { project: Project }) {
  const hasRepo = Boolean(project.repoUrl);
  const hasDemo = Boolean(project.demoUrl);
  const isTelegram = Boolean(project.repoUrl?.includes("t.me") || project.repoUrl?.includes("telegram"));

  return (
    <article className="glass-panel group grid h-full overflow-hidden rounded-3xl p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 lg:grid-cols-[0.86fr_1.14fr]">
      <ProjectVisual project={project} />
      <div className="flex flex-col p-2 pt-5 lg:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold tracking-normal text-white">
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} />
            {project.updatedAt && (
              <span className="rounded-full border border-slate-500/20 bg-slate-500/10 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                обновлено: {project.updatedAt}
              </span>
            )}
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-300">{project.description}</p>
        <div className="mt-5">
          <p className="mb-3 text-sm font-medium text-slate-200">Основной функционал</p>
          <ul className="grid gap-2 text-sm leading-6 text-slate-400 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-cyan-200" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {hasRepo ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-200/40"
            >
              {isTelegram ? <Send size={16} /> : <Github size={16} />}
              {isTelegram ? "Протестировать" : "Открыть репозиторий"}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-500 opacity-60 cursor-not-allowed select-none">
              Репозиторий скоро появится
            </span>
          )}
          {hasDemo && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
            >
              <ExternalLink size={16} />
              Смотреть проект
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
