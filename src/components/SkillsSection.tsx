import { skillGroups } from "@/data/skills";
import { TechBadge } from "./Badges";
import { Reveal } from "./Reveal";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <div className="section-shell">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-medium text-cyan-100/80">Навыки и стек</p>
              <h2 className="font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                Технологии, с которыми я работал в проектах и экспериментах.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-400">
              Это рабочий стек для практических задач: веб-интерфейсы, боты, интеграции,
              автоматизация, AI-инструменты и упаковка MVP.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.06}>
              <div className="glass-panel h-full rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechBadge key={item}>{item}</TechBadge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
