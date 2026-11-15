"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Play, CheckCircle2, ArrowRight, CornerDownLeft, Sparkles, RefreshCw, Send } from "lucide-react";
import { CONTACTS } from "@/data/contacts";
import { getProjectId } from "@/data/projects";

type Scenario = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  relatedProjectId?: string;
  relatedAction?: {
    label: string;
    url?: string;
    targetId?: string;
  };
  telemetry: {
    model: string;
    latency: string;
    ttft: string;
    tps: string;
    pipeline: string;
  };
  responseChunks: string[];
};

const scenarios: Scenario[] = [
  {
    id: "agents-routing",
    code: "01",
    title: "Архитектура AI-агентов и мультипровайдерный роутинг",
    subtitle: "Отказоустойчивость, fallback-шлюзы и оркестрация контекста",
    relatedProjectId: "Магия Бабушки",
    relatedAction: {
      label: "Изучить Case Study (Babushka Magic) →",
      targetId: "project-магия-бабушки",
    },
    telemetry: {
      model: "router-v2.4 // multi-provider",
      latency: "38ms",
      ttft: "24ms",
      tps: "92 tok/s",
      pipeline: "openrouter(mistral-large -> claude-3.5 -> gpt-4o)",
    },
    responseChunks: [
      "[INIT] Анализ графа запроса... Запуск мультипровайдерного роутера.",
      "\nКлючевая проблема коммерческих AI-систем — нестабильность API отдельных провайдеров (rate limits, 502/504 ошибки, деградация генерации).",
      "\nМое решение на примере коммерческих кейсов (Магия Бабушки, Twitch AI Viewers):",
      "\n1. Fallback-архитектура: Автоматический каскадный роутинг. При сбое первичной модели (или превышении latency > 4c) запрос бесшовно передается резервной без потери сессии пользователя.",
      "\n2. Prompt-кондиционирование: Жесткий контракт системных инструкций с разделением ролей (system / developer / user) и валидацией JSON/структуры на выходе.",
      "\n3. Долговременная память: Семантическое кэширование и контекстные векторы в PostgreSQL/Supabase.",
      "\nРезультат: 99.9% аптайм генерации даже в часы пиковых нагрузок.",
    ],
  },
  {
    id: "autoclip-cv",
    code: "02",
    title: "Кейс AutoClip: Computer Vision + автоматизация Shorts",
    subtitle: "Трехэтапный трекинг лиц, FFmpeg аппаратный рендер и 9:16",
    relatedProjectId: "AutoClip",
    relatedAction: {
      label: "Смотреть карточку AutoClip →",
      targetId: "project-autoclip",
    },
    telemetry: {
      model: "cv-pipeline // caffe-dnn + mediapipe",
      latency: "18ms/frame",
      ttft: "12ms",
      tps: "58 fps",
      pipeline: "opencv_haar -> caffe_dnn -> mediapipe -> ffmpeg_nvenc",
    },
    responseChunks: [
      "[INIT] Загрузка конвейера компьютерного зрения OpenCV + MediaPipe...",
      "\nКак автоматизировать производство вертикального видео без участия монтажера?",
      "\n1. Трехэтапная гибридная детекция: Быстрый фильтр OpenCV Haar каскадов отсекает пустые кадры; Caffe DNN находит лица при плохом освещении; MediaPipe Face Mesh точно удерживает фокус на глазах спикера.",
      "\n2. Экспоненциальное сглаживание: Координаты кропа фильтруются алгоритмом сглаживания — виртуальная камера плавно сопровождает спикера без рывков и дрожания.",
      "\n3. Пакетная сборка в FFmpeg: Автоматический захват аудиопотока, наложение субтитров и экспорт в 1080x1920 с автопостингом в Telegram-канал.",
      "\nРезультат: Автоматизация 100% рутины нарезки хайлайтов со стримов.",
    ],
  },
  {
    id: "fullstack-tma",
    code: "03",
    title: "Full-Stack Web & Telegram Mini Apps под ключ",
    subtitle: "Next.js 15, React 19, TypeScript, aiogram, Supabase",
    relatedProjectId: "ProfitCheck",
    relatedAction: {
      label: "Протестировать ProfitCheck в Telegram →",
      url: "https://t.me/ProfitCheckkbot",
    },
    telemetry: {
      model: "tma-engine // nextjs15 + aiogram",
      latency: "16ms",
      ttft: "8ms",
      tps: "120 fps",
      pipeline: "telegram_webapp_sdk -> next15_ssr -> supabase_edge",
    },
    responseChunks: [
      "[INIT] Инициализация окружения Telegram Mini Apps & Web Services...",
      "\nTelegram WebApp — это полноценные веб-приложения внутри мессенджера с конверсией в 3-5 раз выше стандартных сайтов за счет отсутствия авторизации и бесшовных платежей.",
      "\nЧто я собираю в связке Next.js + Telegram Bot API:",
      "\n1. Бесшовная аутентификация: Верификация initData на бэкенде через HMAC-SHA256, привязка пользователя к сессии в Supabase.",
      "\n2. Кинетический UI: Отзывчивый интерфейс с haptic feedback (виброоткликом), темной темой под Telegram и 60 FPS spring-анимациями.",
      "\n3. Реактивная синхронизация: Мгновенное обновление данных между ботом и WebApp через WebSockets/Server-Sent Events.",
    ],
  },
  {
    id: "workflow-terms",
    code: "04",
    title: "Стек, сроки MVP и формат сотрудничества",
    subtitle: "От архитектуры до продакшена за 7-14 дней",
    relatedAction: {
      label: "Написать в Telegram @Crazy4elovek →",
      url: CONTACTS.telegram,
    },
    telemetry: {
      model: "system-lead // agile-mvp",
      latency: "0ms",
      ttft: "instant",
      tps: "100%",
      pipeline: "decompose -> architecture -> prototype -> test -> deploy",
    },
    responseChunks: [
      "[INIT] Подготовка проектного регламента и условий работы...",
      "\nФормат взаимодействия:",
      "\n• Срок сборки MVP: от 7 до 14 рабочих дней (в зависимости от объема API и архитектуры).",
      "\n• Прозрачность: 100% чистый Git-репозиторий, ежедневные демо-апдейты, подробный README со схемой архитектуры.",
      "\n• Технический стек: Next.js 15, React 19, TypeScript, Python, aiogram, FastAPI, Supabase, PostgreSQL, Docker, Vercel.",
      "\n• Гарантия: Бесплатная пост-релизная поддержка и отладка в течение 14 дней после деплоя.",
      "\nГотовы обсудить задачу? Напишите напрямую в Telegram — отвечу в течение 15 минут.",
    ],
  },
];

export function AiConsoleSection() {
  const [selectedId, setSelectedId] = useState<string>(scenarios[0].id);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentScenario = scenarios.find((s) => s.id === selectedId) || scenarios[0];

  const startStreaming = (scenario: Scenario) => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    setIsStreaming(true);
    setDisplayedText("");

    const fullText = scenario.responseChunks.join("");
    let charIndex = 0;

    // Typewriter streaming chunk by chunk
    streamTimerRef.current = setInterval(() => {
      charIndex += 4;
      if (charIndex >= fullText.length) {
        setDisplayedText(fullText);
        setIsStreaming(false);
        if (streamTimerRef.current) clearInterval(streamTimerRef.current);
      } else {
        setDisplayedText(fullText.slice(0, charIndex));
      }
    }, 18);
  };

  useEffect(() => {
    const scenario = scenarios.find((s) => s.id === selectedId) || scenarios[0];
    startStreaming(scenario);
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, [selectedId]);

  const handleActionClick = (action: Scenario["relatedAction"]) => {
    if (!action) return;
    if (action.url) {
      window.open(action.url, "_blank");
    } else if (action.targetId) {
      const el = document.getElementById(action.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section id="console" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accentCyan/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="section-shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accentCyan/30 bg-accentCyan/10 px-3.5 py-1 text-xs font-mono text-accentCyan mb-3">
              <Terminal size={13} />
              <span>INTERACTIVE AI TWIN // ASK ARCHITECTURE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Интерактивная AI-консоль архитектора
            </h2>
          </div>
          <p className="max-w-md text-sm font-mono text-slate-400">
            Симулятор архитектурных решений. Выберите инженерный сценарий для мгновенного стриминга ответа и телеметрии пайплайна.
          </p>
        </div>

        {/* Console Layout: Grid with Scenario Selectors + Terminal Box */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Left Column: Preset Scenarios */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-1 px-1">
              Выберите сценарий диалога:
            </span>
            {scenarios.map((scenario) => {
              const isSelected = scenario.id === selectedId;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedId(scenario.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden group ${
                    isSelected
                      ? "border-accentCyan/50 bg-[#0C0D12] shadow-[0_0_24px_rgba(56,189,248,0.12)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeScenarioPill"
                      className="absolute inset-y-0 left-0 w-1 bg-accentCyan"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-accentCyan">
                      {"//"} {scenario.code}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 group-hover:text-slate-400">
                      {isSelected ? "АКТИВЕН" : "ВЫБРАТЬ →"}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-semibold text-white group-hover:text-accentCyan transition-colors leading-snug">
                    {scenario.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                    {scenario.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Terminal Window */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#07090E] shadow-2xl overflow-hidden flex flex-col min-h-[460px]">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0C0D12]">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-red-500/80" />
                <div className="size-3 rounded-full bg-amber-500/80" />
                <div className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400 hidden sm:inline">
                  idleon-ai-twin@node-01: ~
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-accentCyan">
                <Cpu size={12} />
                <span>{currentScenario.telemetry.model}</span>
              </div>
            </div>

            {/* Telemetry Status Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 py-2 border-b border-white/5 bg-black/40 font-mono text-[10px] text-slate-400">
              <div>
                <span className="text-slate-600">TTFT:</span>{" "}
                <span className="text-accentEmerald font-bold">{currentScenario.telemetry.ttft}</span>
              </div>
              <div>
                <span className="text-slate-600">LATENCY:</span>{" "}
                <span className="text-accentCyan font-bold">{currentScenario.telemetry.latency}</span>
              </div>
              <div>
                <span className="text-slate-600">SPEED:</span>{" "}
                <span className="text-white font-bold">{currentScenario.telemetry.tps}</span>
              </div>
              <div className="truncate">
                <span className="text-slate-600">STATUS:</span>{" "}
                <span className="text-accentEmerald">VERIFIED</span>
              </div>
            </div>

            {/* Pipeline Route Badge */}
            <div className="px-4 py-1.5 border-b border-white/5 bg-white/[0.01] font-mono text-[10px] text-slate-500 flex items-center gap-2">
              <span className="text-accentCyan">маршрут:</span>
              <span className="truncate text-slate-400">{currentScenario.telemetry.pipeline}</span>
            </div>

            {/* Terminal Body Content */}
            <div className="p-5 flex-1 font-mono text-xs leading-relaxed text-slate-200 overflow-y-auto whitespace-pre-wrap select-text">
              {displayedText}
              {isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-accentCyan animate-terminal-blink align-middle" />
              )}
            </div>

            {/* Action Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0C0D12] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <Sparkles size={13} className="text-accentCyan" />
                <span>Готов к реализации аналогичной архитектуры</span>
              </div>

              <div className="flex items-center gap-2">
                {currentScenario.relatedAction && (
                  <button
                    onClick={() => handleActionClick(currentScenario.relatedAction)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accentCyan/40 bg-accentCyan/10 px-3.5 py-1.5 text-xs font-mono text-accentCyan hover:bg-accentCyan hover:text-slate-950 transition-colors"
                  >
                    <span>{currentScenario.relatedAction.label}</span>
                  </button>
                )}
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-mono font-bold text-slate-950 hover:bg-accentEmerald hover:text-white transition-colors"
                >
                  <Send size={11} />
                  <span>Обсудить задачу</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
