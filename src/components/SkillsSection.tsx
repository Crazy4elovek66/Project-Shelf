"use client";

import { useState, useRef } from "react";
import { skillGroups } from "@/data/skills";
import { TechBadge } from "./Badges";
import { Reveal } from "./Reveal";

// Карта связей между навыками для интерактивного подсвечивания
const skillRelations: Record<string, string[]> = {
  "React": ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
  "Next.js": ["React", "TypeScript", "Tailwind CSS", "Vercel"],
  "Tailwind CSS": ["React", "Next.js"],
  "TypeScript": ["React", "Next.js", "Node.js"],
  "Python": ["Telegram Bot API", "HH API", "Twitch API", "FFmpeg"],
  "Node.js": ["TypeScript", "REST API"],
  "Telegram Bot API": ["Python", "HH API", "Twitch API"],
  "HH API": ["Python", "Telegram Bot API"],
  "Twitch API": ["Python", "Telegram Bot API"],
  "REST API": ["Node.js", "Python", "Supabase"],
  "ChatGPT": ["Gemini", "Prompt Engineering", "AI-assisted development"],
  "Gemini": ["ChatGPT", "Prompt Engineering", "AI-assisted development"],
  "Prompt Engineering": ["ChatGPT", "Gemini", "AI-assisted development"],
  "AI-assisted development": ["ChatGPT", "Gemini", "Prompt Engineering"],
  "Supabase": ["React", "Next.js", "REST API", "SQLite"],
  "Vercel": ["Next.js", "React", "Git", "GitHub"],
  "Git": ["GitHub", "Vercel"],
  "GitHub": ["Git", "Vercel"],
  "FFmpeg": ["Python", "AutoClip"],
};

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="section-shell">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end mb-16">
            <div>
              <p className="mb-3 text-sm font-medium text-cyan-400 font-bold">Навыки и стек</p>
              <h2 className="font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                Технологии, с которыми я работал в проектах и экспериментах.
              </h2>
            </div>
            <p className="text-lg leading-8 text-slate-400">
              Это рабочий стек для практических задач: веб-интерфейсы, боты, интеграции,
              автоматизация, ИИ-инструменты и упаковка MVP.
            </p>
          </div>
        </Reveal>

        {/* Bento Grid для навыков */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {skillGroups.map((group, index) => {
            // Асимметричное распределение ширины колонок в Bento Grid
            // 0: Фронтенд (col-span-4)
            // 1: Бэкенд (col-span-4)
            // 2: API (col-span-4)
            // 3: ИИ и автоматизация (col-span-6)
            // 4: Инструменты (col-span-6)
            const bentoSpan = 
              index === 0 ? "lg:col-span-4" :
              index === 1 ? "lg:col-span-4" :
              index === 2 ? "lg:col-span-4" :
              index === 3 ? "lg:col-span-6" :
              "lg:col-span-6";

            return (
              <div key={group.title} className={`${bentoSpan} sm:col-span-1`}>
                <Reveal delay={index * 0.06}>
                  <TiltCard>
                    <h3 className="text-lg font-semibold text-white mb-5">{group.title}</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((item) => {
                        const isCurrentHovered = hoveredSkill === item;
                        const isRelated = hoveredSkill && skillRelations[hoveredSkill]?.includes(item);
                        const hasActiveHover = hoveredSkill !== null;
                        
                        let badgeStyle = "border-white/10 bg-white/[0.04] text-slate-300";
                        if (hasActiveHover) {
                          if (isCurrentHovered) {
                            badgeStyle = "border-cyan-400 bg-cyan-400/10 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.15)]";
                          } else if (isRelated) {
                            badgeStyle = "border-purple-400 bg-purple-400/10 text-purple-200 shadow-[0_0_15px_rgba(157,78,221,0.12)]";
                          } else {
                            badgeStyle = "border-white/5 bg-white/[0.01] text-slate-600 opacity-40";
                          }
                        }

                        return (
                          <span
                            key={item}
                            className={`rounded-full border px-3 py-1.5 text-xs transition-all duration-300 cursor-pointer ${badgeStyle}`}
                            onMouseEnter={() => setHoveredSkill(item)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </TiltCard>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Компонент карточки с эффектом 3D-Tilt
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Отключаем на мобильных/тач устройствах
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10; // наклон по оси X
    const angleY = (x - xc) / 10; // наклон по оси Y

    setTransformStyle(`perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`);
    
    // Обновляем CSS переменные для Glow эффекта
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      className="glass-panel h-full rounded-[24px] p-6 lg:p-8 transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}
