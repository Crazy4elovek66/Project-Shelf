"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu, Sparkles, Layers, Terminal, Video, Database, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { skillGroups, skillRelations, skillFilterTabs, type SkillCategory } from "@/data/skills";
import { CONTACTS } from "@/data/contacts";

type ArchitectureTrack = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  icon: typeof Cpu;
  deliverables: string[];
  techStack: string[];
  architectureNote: string;
  businessImpact: string;
};

const tracks: ArchitectureTrack[] = [
  {
    id: "track-1",
    code: "01",
    title: "AI Agents & LLM Pipelines",
    subtitle: "Мультиагентные системы, RAG, fallback-роутинг и prompt-архитектура",
    icon: Cpu,
    deliverables: [
      "Мультипровайдерный роутер с отказоустойчивостью 99.9% (fallback между Mistral, Claude, GPT)",
      "Prompt-кондиционирование с валидацией структуры JSON и ролевыми контрактами",
      "Векторное хранилище и контекстная семантическая память в Supabase PostgreSQL",
      "Автономные разговорные агенты с сохранением персоналии и настроения",
    ],
    techStack: ["OpenRouter API", "Multi-Agent Router", "Prompt Engineering", "Whisper STT", "Supabase pgvector"],
    architectureNote:
      "Каскадный роутинг запросов с автоматическим перехватом таймаутов и ошибок провайдеров. Семантическое кэширование снижает стоимость инференса на 40%+.",
    businessImpact: "Бесперебойная генерация длинных ответов без падений в пиковые часы нагрузок.",
  },
  {
    id: "track-2",
    code: "02",
    title: "Full-Stack Web & Telegram Mini Apps",
    subtitle: "Next.js 15, React 19, TypeScript, aiogram, Telegram WebApp API",
    icon: Layers,
    deliverables: [
      "Telegram Mini Apps с нативным интерфейсом, тактильным haptic feedback и авторизацией",
      "Next.js 15 App Router с серверным рендерингом и оптимизацией бандла",
      "Сложные финансовые и аналитические калькуляторы с реактивным пересчетом",
      "Интеграция Telegram Bot API (aiogram) с вебхуками и асинхронными очередями",
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Telegram WebApp API"],
    architectureNote:
      "Гибридная SSR/CSR архитектура с минимальным JS-бандлом, HMAC-валидацией сессий Telegram и мгновенным откликом интерактивных элементов (< 16мс).",
    businessImpact: "Конверсия в целевое действие в 3-5 раз выше классических веб-сайтов.",
  },
  {
    id: "track-3",
    code: "03",
    title: "Computer Vision & Media Automation",
    subtitle: "OpenCV, Caffe DNN, MediaPipe, аппаратный FFmpeg рендеринг",
    icon: Video,
    deliverables: [
      "Автоматизированный захват стримов и нарезка хайлайтов в вертикальный формат 9:16",
      "Трехэтапная гибридная детекция лиц спикера (Haar каскады + Caffe DNN + MediaPipe)",
      "Алгоритмическое сглаживание траектории кропа без рывков виртуальной камеры",
      "Аппаратный рендеринг видео в FFmpeg с автопубликацией в Telegram и соцсети",
    ],
    techStack: ["Python", "OpenCV", "Caffe DNN", "MediaPipe Face Mesh", "FFmpeg", "AsyncIO"],
    architectureNote:
      "Каскадный видеоконвейер: отсев пустых кадров на легковесных Haar-каскадах, точный трекинг нейросетью Caffe и аппаратное кодирование через FFmpeg NVENC.",
    businessImpact: "Полная автоматизация создания виральных Shorts/Reels без монтажера.",
  },
  {
    id: "track-4",
    code: "04",
    title: "Parsers, Data Pipelines & Infrastructure",
    subtitle: "Асинхронный парсинг, дедупликация, PostgreSQL, Linux VPS, CI/CD",
    icon: Database,
    deliverables: [
      "Асинхронные парсеры (HH API, Twitch API) с устойчивостью к блокировкам и лимитам",
      "Многоступенчатая фильтрация спама, колл-центров и нерелевантных данных",
      "Синхронизация схем PostgreSQL, миграции и дедупликация по хэшам",
      "Развертывание в Docker на Linux VPS, настройка CI/CD и мониторинга",
    ],
    techStack: ["Supabase", "PostgreSQL", "SQLite", "Docker", "Linux VPS", "Vercel", "Git/GitHub"],
    architectureNote:
      "Отказоустойчивые асинхронные воркеры на AsyncIO с экспоненциальной задержкой повторов (exponential backoff), кэшированием в SQLite и репликацией в Supabase.",
    businessImpact: "Отсев 85%+ информационного шума и доставка релевантных данных за секунды.",
  },
];

export function CapabilitiesSection() {
  const [expandedTrack, setExpandedTrack] = useState<string>("track-1");
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Filter skills based on tab
  const filteredGroups = skillGroups.filter((group) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "ai") return group.category === "ai";
    if (activeCategory === "frontend") return group.category === "frontend";
    if (activeCategory === "backend") return group.category === "backend" || group.category === "infra";
    return true;
  });

  return (
    <section id="capabilities" className="relative pt-12 pb-24 overflow-hidden">
      {/* ======================================================== */}
      {/* BLOCK A: EDITORIAL LIGHT / SILVER WIPE CONTRAST SECTION */}
      {/* ======================================================== */}
      <div className="w-full bg-[#F3F4F6] text-[#09090B] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#E5E7EB] shadow-2xl relative">
        <div className="section-shell">
          {/* Header of Editorial Light Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#09090B]/10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#09090B]/15 bg-[#09090B]/5 px-3.5 py-1 text-xs font-mono text-[#09090B] mb-3">
                <span className="size-1.5 rounded-full bg-[#09090B]" />
                <span>01-04 // ИНЖЕНЕРНЫЕ НАПРАВЛЕНИЯ И АРХИТЕКТУРА</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#09090B] uppercase">
                Архитектурные направления
              </h2>
            </div>
            <p className="max-w-md text-sm font-sans text-[#4B5563] leading-relaxed">
              Резкий контраст после темного экрана — фокус на инженерной дисциплине. Каждое направление подкреплено работающими прототипами и коммерческим кодом.
            </p>
          </div>

          {/* Accordion Rows 01-04 */}
          <div className="divide-y divide-[#09090B]/10">
            {tracks.map((track) => {
              const isExpanded = expandedTrack === track.id;
              const Icon = track.icon;

              return (
                <div key={track.id} className="py-6 sm:py-8 transition-colors">
                  {/* Row Header Button */}
                  <button
                    onClick={() => setExpandedTrack(isExpanded ? "" : track.id)}
                    className="w-full text-left flex items-start sm:items-center justify-between gap-4 group cursor-pointer focus:outline-none"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0">
                      <span className="font-display text-3xl sm:text-4xl font-bold font-mono text-[#09090B]/40 group-hover:text-[#09090B] transition-colors">
                        {track.code}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#09090B] group-hover:text-sky-600 transition-colors">
                            {track.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-[#4B5563] mt-1 line-clamp-1 font-sans">
                          {track.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 mt-1 sm:mt-0">
                      <span className="hidden md:inline-block font-mono text-xs text-[#09090B]/60 group-hover:text-[#09090B]">
                        {isExpanded ? "СВЕРНУТЬ" : "ДЕТАЛИ АРХИТЕКТУРЫ"}
                      </span>
                      <div
                        className={`size-9 rounded-full border border-[#09090B]/15 flex items-center justify-center transition-transform duration-300 ${
                          isExpanded ? "rotate-180 bg-[#09090B] text-white" : "group-hover:border-[#09090B]/40"
                        }`}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-8 pb-4 grid gap-6 lg:grid-cols-12 font-sans">
                          {/* Deliverables column */}
                          <div className="lg:col-span-7 bg-white/70 p-6 rounded-2xl border border-[#09090B]/10 shadow-sm">
                            <span className="font-mono text-xs text-[#09090B] font-bold uppercase tracking-wider block mb-4">
                              Ключевые инженерные решения:
                            </span>
                            <ul className="space-y-3">
                              {track.deliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#1F2937] leading-relaxed">
                                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Architecture & Business impact column */}
                          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                            <div className="bg-[#E5E7EB]/80 p-5 rounded-2xl border border-[#09090B]/10">
                              <span className="font-mono text-xs text-[#09090B] font-bold uppercase tracking-wider block mb-2">
                                Особенности реализации:
                              </span>
                              <p className="text-xs text-[#374151] leading-relaxed">
                                {track.architectureNote}
                              </p>
                              <div className="mt-3 pt-3 border-t border-[#09090B]/10 text-xs font-medium text-[#09090B]">
                                <span className="font-mono text-sky-700 font-bold">Бизнес-эффект:</span> {track.businessImpact}
                              </div>
                            </div>

                            {/* Tech Stack Pills */}
                            <div>
                              <span className="font-mono text-[11px] text-[#6B7280] uppercase tracking-wider block mb-2">
                                Стек технологий:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {track.techStack.map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded-md border border-[#09090B]/15 bg-white px-2.5 py-1 text-xs font-mono font-medium text-[#111827] shadow-sm"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BLOCK B: DARK OBSIDIAN BENTO GRID OF PROFILE & STACK */}
      {/* ======================================================== */}
      <div className="section-shell pt-24">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-mono text-slate-300 mb-3">
            <Sparkles size={13} className="text-accentCyan" />
            <span>ПРОФИЛЬ РАЗРАБОТЧИКА // ТЕХНОЛОГИЧЕСКАЯ МАТРИЦА</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Инженерная база и стек навыков
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Bento Card 1: Developer Profile Card (Embeds portrait organically!) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0C0D12] p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl group">
            {/* Background Cyber Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accentCyan/10 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accentViolet/10 rounded-full blur-[70px] pointer-events-none" />

            {/* Top Identity Meta */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-accentCyan font-bold tracking-wider uppercase">
                  LEAD ENGINEER // idleON
                </span>
                <span className="rounded-full border border-accentEmerald/30 bg-accentEmerald/10 px-2.5 py-0.5 text-[10px] font-mono text-accentEmerald">
                  OPEN TO WORK
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                Илья // Full-Stack AI Developer
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                Волжский, Россия · Работаю удаленно с любыми часовыми поясами. Специализируюсь на автономных AI-пайплайнах, отказоустойчивых LLM-роутерах и Next.js интерфейсах.
              </p>
            </div>

            {/* Middle: Organically Embedded Portrait with Bottom Fade Mask */}
            <div className="relative my-6 w-full h-[260px] rounded-2xl border border-white/10 bg-gradient-to-b from-[#13151E] to-[#050507] overflow-hidden flex items-end justify-center">
              {/* Technical Grid inside portrait box */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <Image
                src="/images/hero-portrait-cutout.png"
                alt="Илья - Full-Stack AI Developer"
                width={380}
                height={500}
                priority
                className="relative z-10 h-auto max-h-[280px] w-auto object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              />

              {/* Gradient edge overlays */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0C0D12] to-transparent z-20 pointer-events-none" />

              {/* Status pill over portrait */}
              <div className="absolute top-3 left-3 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 backdrop-blur-md font-mono text-[10px] text-slate-300">
                <span className="size-1.5 rounded-full bg-accentEmerald animate-pulse" />
                <span>ACTIVE DEV SESSION</span>
              </div>
            </div>

            {/* Bottom Metrics Matrix */}
            <div className="relative z-10 grid grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono">
              <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xl font-bold font-display text-white">6+</div>
                <div className="text-[10px] text-slate-400">Проектов в проде</div>
              </div>
              <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xl font-bold font-display text-accentCyan">24/7</div>
                <div className="text-[10px] text-slate-400">Автономные боты</div>
              </div>
              <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xl font-bold font-display text-accentEmerald">7-14д</div>
                <div className="text-[10px] text-slate-400">Срок сборки MVP</div>
              </div>
              <div className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-xl font-bold font-display text-accentViolet">100%</div>
                <div className="text-[10px] text-slate-400">Открытый код</div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Interactive Filterable Skill Matrix */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0C0D12] p-6 lg:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                  Фильтрация технологий:
                </span>
                <div className="flex flex-wrap gap-1.5 p-1 rounded-full border border-white/10 bg-[#13151E]">
                  {skillFilterTabs.map((tab) => {
                    const isActive = activeCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveCategory(tab.id)}
                        className={`relative px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                          isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="relative z-10">{tab.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeSkillTab"
                            className="absolute inset-0 z-0 rounded-full bg-accentCyan/20 border border-accentCyan/40"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Skills Matrix Groups */}
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {filteredGroups.map((group) => (
                    <motion.div
                      key={group.title}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                    >
                      <h4 className="font-mono text-xs font-bold text-accentCyan mb-3 uppercase tracking-wider flex items-center justify-between">
                        <span>{group.title}</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {group.items.length} навыков
                        </span>
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => {
                          const isHovered = hoveredSkill === item;
                          const isRelated = hoveredSkill && skillRelations[hoveredSkill]?.includes(item);
                          const hasActiveHover = hoveredSkill !== null;

                          let badgeClass = "border-white/10 bg-white/[0.04] text-slate-300";
                          if (hasActiveHover) {
                            if (isHovered) {
                              badgeClass =
                                "border-accentCyan bg-accentCyan/20 text-white shadow-[0_0_16px_rgba(56,189,248,0.35)] scale-105";
                            } else if (isRelated) {
                              badgeClass =
                                "border-accentViolet bg-accentViolet/20 text-accentViolet shadow-[0_0_14px_rgba(139,92,246,0.25)] scale-102";
                            } else {
                              badgeClass = "border-white/5 bg-white/[0.01] text-slate-600 opacity-30";
                            }
                          }

                          return (
                            <span
                              key={item}
                              onMouseEnter={() => setHoveredSkill(item)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer select-none ${badgeClass}`}
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

            {/* Relationship Helper Note */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-accentCyan" />
                <span>Наведите на технологию для подсветки архитектурных связей</span>
              </span>
              <span className="hidden sm:inline text-slate-400">
                Связанные: <span className="text-accentViolet">фиолетовый</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
