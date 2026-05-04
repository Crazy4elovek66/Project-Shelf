import { getProjectId, projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <div className="section-shell">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-medium text-cyan-100/80">Проекты</p>
            <h2 className="font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Практические реализации и пет-проекты.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Каждый проект здесь показывает конкретную задачу: от ботов и API до интерфейсов,
              автоматизации и проверки продуктовых идей.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <div key={project.title} id={getProjectId(project.title)}>
              <Reveal delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
