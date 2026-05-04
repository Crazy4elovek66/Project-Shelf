import { Brain, Code2, Wrench } from "lucide-react";
import { Reveal } from "./Reveal";

const points = [
  {
    icon: Brain,
    title: "Разбираюсь в задаче",
    text: "Смотрю на логику продукта, ограничения и сценарии, а не только на набор технологий.",
  },
  {
    icon: Code2,
    title: "Собираю рабочие MVP",
    text: "Проверяю идею через практическую реализацию: API, интерфейсы, боты, интеграции и хранение данных.",
  },
  {
    icon: Wrench,
    title: "Довожу до ясности",
    text: "Тестирую, отлаживаю, упрощаю спорные места и использую AI-инструменты как ускоритель работы.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="section-shell">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-medium text-cyan-100/80">Кто я?</p>
              <h2 className="font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                Начинающий IT-специалист, который растет через реальные проекты.
              </h2>
            </div>
            <div className="text-lg leading-8 text-slate-300 lg:mt-[34px]">
              Мне интересны роли на стыке технической поддержки, QA, автоматизации,
              веб-разработки и AI-assisted development. Я умею разбираться в задачах, работать с
              API, собирать MVP, тестировать поведение проекта и дорабатывать результат до
              понятной формы.
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {points.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.08}>
              <div className="glass-panel h-full rounded-2xl p-6">
                <point.icon className="mb-5 text-cyan-100" size={24} />
                <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
