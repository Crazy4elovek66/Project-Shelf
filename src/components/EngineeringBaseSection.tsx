"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Layers, Video, Database, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { skillGroups, skillRelations, skillFilterTabs, type SkillCategory } from "@/data/skills";
import { SeamlessPortraitVideo } from "./SeamlessPortraitVideo";
import { useLanguageMode } from "@/context/LanguageModeContext";

const techDirections = [
  {
    code: "01",
    title: "AI Agents & Multi-LLM Pipelines",
    summary: "Отказоустойчивый роутинг (Mistral/Claude/GPT), prompt-архитектура, семантическая память в Supabase.",
    icon: Cpu,
  },
  {
    code: "02",
    title: "Full-Stack Web & Telegram Mini Apps",
    summary: "Next.js 15, React 19, TypeScript, aiogram, нативная интеграция в Telegram с haptic feedback.",
    icon: Layers,
  },
  {
    code: "03",
    title: "Computer Vision & Media Automation",
    summary: "OpenCV, Caffe DNN, MediaPipe Face Mesh, автоматическая нарезка 9:16 и аппаратный FFmpeg рендеринг.",
    icon: Video,
  },
  {
    code: "04",
    title: "Parsers, Data Pipelines & Infrastructure",
    summary: "Асинхронные воркеры на AsyncIO, отсев 85%+ спама и шума, PostgreSQL, Linux VPS, Docker.",
    icon: Database,
  },
];

const simpleDirections = [
  {
    code: "01",
    title: "Умные боты и ассистенты с ИИ",
    summary: "Создание чат-ботов и консультантов, которые понимают запросы клиентов, отвечают без сбоев и помогают бизнесу.",
    icon: Cpu,
  },
  {
    code: "02",
    title: "Сайты и сервисы внутри Telegram",
    summary: "Современные быстрые веб-приложения и Telegram Mini Apps, которые открываются в один клик прямо в мессенджере.",
    icon: Layers,
  },
  {
    code: "03",
    title: "Автоматизация видео и медиа",
    summary: "Автоматическая нарезка видеороликов под формат смартфона, распознавание лиц и подготовка контента без монтажера.",
    icon: Video,
  },
  {
    code: "04",
    title: "Сбор данных и автопилот рутины",
    summary: "Сбор нужной информации из интернета, фильтрация спама и надежная работа программ на сервере 24/7.",
    icon: Database,
  },
];

export function EngineeringBaseSection() {
  const { isSimple } = useLanguageMode();
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const coreDirections = isSimple ? simpleDirections : techDirections;

  const filteredGroups = skillGroups.filter((group) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "ai") return group.category === "ai";
    if (activeCategory === "frontend") return group.category === "frontend";
    if (activeCategory === "backend") return group.category === "backend" || group.category === "infra";
    return true;
  });

  return (
    <section id="engineering" className="py-24 border-b border-white/10 relative">
      <div className="section-shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-mono text-zinc-300 mb-3">
              <span className="font-pixel text-[10px] text-white">[ / ]</span>
              <span>{isSimple ? "ОБО МНЕ // НАВЫКИ И ВОЗМОЖНОСТИ" : "ИНЖЕНЕРНАЯ БАЗА // ПРОФИЛЬ И СТЕК"}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              {isSimple ? "Обо мне и мои возможности" : "Инженерная база и стек навыков"}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-mono text-zinc-400 leading-relaxed">
            {isSimple
              ? "Комплексный подход: от идеи и логики до готового работающего продукта для вас и ваших клиентов."
              : "Практический стек для создания автономных AI-систем, Telegram-ботов и высоконагруженных веб-сервисов."}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-12 items-stretch font-mono">
          {/* LEFT: Developer Profile Card with Seamless Video */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0B0B0E] p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-white tracking-wider">
                  {isSimple ? ">_ РАЗРАБОТЧИК // ИЛЬЯ" : ">_ LEAD ENGINEER // IDLEON"}
                </span>
                <span className="rounded border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[10px] text-zinc-300">
                  {isSimple ? "ОТКРЫТ К ЗАКАЗАМ" : "OPEN FOR WORK"}
                </span>
              </div>
              <h3 className="font-mono text-xl sm:text-2xl font-bold text-white leading-tight">
                {isSimple ? "Илья // Создатель ИИ и веб-сервисов" : "Илья // Full-Stack AI Developer"}
              </h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {isSimple
                  ? "Волгоград, Россия · Работаю удаленно с любыми городами и странами. Создаю Telegram-ботов, сайты и системы на базе нейросетей под ключ."
                  : "Волгоград, Россия · Работаю удаленно с любыми часовыми поясами. Разрабатываю отказоустойчивые LLM-роутеры, Telegram Mini Apps и веб-сервисы."}
              </p>
            </div>

            {/* Seamless Video Portrait Box */}
            <div className="my-6">
              <SeamlessPortraitVideo />
            </div>

            {/* Bottom 4 Key Metrics */}
            <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10 text-xs">
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                <div className="text-xl font-bold text-white">6+</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  {isSimple ? "ГОТОВЫХ ПРОЕКТОВ" : "ПРОЕКТОВ В ПРОДЕ"}
                </div>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                <div className="text-xl font-bold text-white">24/7</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  {isSimple ? "РАБОТАЮТ 24/7" : "АВТОНОМНЫЕ БОТЫ"}
                </div>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                <div className="text-xl font-bold text-white">7-14д</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  {isSimple ? "СРОК ЗАПУСКА" : "СРОК СБОРКИ MVP"}
                </div>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                <div className="text-xl font-bold text-white">100%</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  {isSimple ? "ЧЕСТНЫЙ ПОДХОД" : "ОТКРЫТЫЙ КОД"}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Architecture Directions & Filterable Skill Matrix */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Core Engineering Directions Strip */}
            <div className="rounded-2xl border border-white/10 bg-[#0B0B0E] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 text-xs">
                <span className="font-bold text-white tracking-wider uppercase">
                  {isSimple ? "Ключевые направления разработки:" : "Ключевые архитектурные направления:"}
                </span>
                <span className="text-zinc-500 text-[10px]">
                  {isSimple ? "4 НАПРАВЛЕНИЯ" : "4 НАПРАВЛЕНИЯ"}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {coreDirections.map((dir) => {
                  const Icon = dir.icon;
                  return (
                    <div
                      key={dir.code}
                      className="p-3 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-between hover:border-white/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-pixel text-[10px] text-white/60">
                          {dir.code}
                        </span>
                        <h4 className="font-bold text-xs text-white leading-tight">
                          {dir.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        {dir.summary}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filterable Skill Matrix */}
            <div className="rounded-2xl border border-white/10 bg-[#0B0B0E] p-6 shadow-xl flex-1 flex flex-col justify-between">
              <div>
                {/* Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {isSimple ? "Используемые технологии:" : "Матрица технологий:"}
                  </span>
                  <div className="flex flex-wrap gap-1 p-0.5 rounded-lg border border-white/10 bg-[#141418]">
                    {skillFilterTabs.map((tab) => {
                      const isActive = activeCategory === tab.id;
                      const tabLabel = isSimple
                        ? tab.id === "all"
                          ? "Все"
                          : tab.id === "ai"
                          ? "Нейросети"
                          : tab.id === "frontend"
                          ? "Интерфейсы"
                          : "Сервер и базы"
                        : tab.label;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveCategory(tab.id)}
                          className={`relative px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                            isActive
                              ? "bg-white text-black font-bold"
                              : "text-zinc-400 hover:text-white"
                          }`}
                        >
                          {tabLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Skill Badges */}
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredGroups.map((group) => (
                      <motion.div
                        key={group.title}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-zinc-300 mb-2.5 uppercase">
                          <span>{group.title}</span>
                          <span className="text-[10px] text-zinc-500 font-normal">
                            {group.items.length} навыков
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => {
                            const isHovered = hoveredSkill === item;
                            const isRelated = hoveredSkill && skillRelations[hoveredSkill]?.includes(item);
                            const hasActiveHover = hoveredSkill !== null;

                            let badgeClass = "border-white/10 bg-white/[0.03] text-zinc-300";
                            if (hasActiveHover) {
                              if (isHovered) {
                                badgeClass = "border-white bg-white text-black font-bold scale-105 shadow-md";
                              } else if (isRelated) {
                                badgeClass = "border-white/40 bg-white/20 text-white font-bold scale-102";
                              } else {
                                badgeClass = "border-white/5 bg-transparent text-zinc-600 opacity-40";
                              }
                            }

                            return (
                              <span
                                key={item}
                                onMouseEnter={() => setHoveredSkill(item)}
                                onMouseLeave={() => setHoveredSkill(null)}
                                className={`rounded px-2.5 py-1 text-xs transition-all duration-150 cursor-pointer select-none ${badgeClass}`}
                              >
                                {item}
                              </span>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Relations Footer Note */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
                <span>
                  {isSimple
                    ? "Наведите на технологию, чтобы увидеть связанные инструменты"
                    : "Наведите курсор на технологию для подсветки архитектурных связей"}
                </span>
                <span className="hidden sm:inline text-zinc-400">
                  {isSimple ? "Связанные подсвечиваются" : "Связанные подсвечиваются ярче"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
