import { workSteps } from "@/data/skills";
import { Reveal } from "./Reveal";

export function WorkProcessSection() {
  return (
    <section id="process" className="py-24">
      <div className="section-shell">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-medium text-cyan-100/80">Как я работаю</p>
            <h2 className="font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              От идеи до рабочей версии без лишнего шума.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-5">
          {workSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <div className="glass-panel relative h-full rounded-2xl p-6">
                <span className="mb-8 inline-grid size-10 place-items-center rounded-full border border-cyan-200/25 bg-cyan-200/10 text-sm font-semibold text-cyan-100">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.18}>
          <div className="glass-panel mt-6 rounded-2xl p-6 text-base leading-8 text-slate-300">
            AI-инструменты использую как ускоритель анализа, разработки и отладки, но результат
            проверяю сам: смотрю на логику, поведение, ошибки и пригодность решения для реального
            сценария.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
