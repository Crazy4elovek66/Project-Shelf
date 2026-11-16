"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Cpu, Sparkles, Send } from "lucide-react";
import { CONTACTS } from "@/data/contacts";

type Scenario = {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  relatedAction?: {
    label: string;
    url?: string;
    targetTab?: number;
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
    relatedAction: {
      label: "Изучить Case Study (Babushka Magic) →",
      targetTab: 5,
    },
    telemetry: {
      model: "router-v3.0 // multi-provider",
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
    relatedAction: {
      label: "Смотреть карточку AutoClip →",
      targetTab: 4,
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

  const startStreaming = (scenario: Scenario) => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    setIsStreaming(true);
    setDisplayedText("");

    const fullText = scenario.responseChunks.join("");
    let charIndex = 0;

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

  const currentScenario = scenarios.find((s) => s.id === selectedId) || scenarios[0];

  const handleActionClick = (action: Scenario["relatedAction"]) => {
    if (!action) return;
    if (action.url) {
      window.open(action.url, "_blank");
    } else if (typeof action.targetTab === "number") {
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.dispatchEvent(new CustomEvent("select-project-tab", { detail: action.targetTab }));
    }
  };

  return (
    <section id="console" className="py-24 border-b border-white/10 relative font-mono">
      <div className="section-shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300 mb-3">
              <Terminal size={13} />
              <span>INTERACTIVE AI TWIN // ASK ARCHITECTURE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              Интерактивная AI-консоль архитектора
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Симулятор архитектурных решений. Выберите инженерный сценарий для мгновенного стриминга ответа и телеметрии пайплайна.
          </p>
        </div>

        {/* Console Layout */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Left Column: Preset Scenarios */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1 px-1">
              Выберите сценарий диалога:
            </span>
            {scenarios.map((scenario) => {
              const isSelected = scenario.id === selectedId;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedId(scenario.id)}
                  className={`text-left p-4 rounded-xl border transition-all text-xs relative overflow-hidden group ${
                    isSelected
                      ? "border-white bg-[#141418] text-white shadow-lg"
                      : "border-white/10 bg-[#09090C] text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white">
                      {"//"} {scenario.code}
                    </span>
                    <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300">
                      {isSelected ? "[ АКТИВЕН ]" : "[ ВЫБРАТЬ ]"}
                    </span>
                  </div>
                  <h3 className="font-bold text-white leading-snug">
                    {scenario.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-zinc-400 line-clamp-1">
                    {scenario.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Terminal Window */}
          <div className="lg:col-span-7 rounded-xl border border-white/15 bg-[#07070A] shadow-2xl overflow-hidden flex flex-col min-h-[440px]">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#121215] text-xs">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
                <span className="size-2 rounded-full bg-white/20" />
                <span className="ml-2 text-zinc-400 hidden sm:inline">
                  idleon-ai-twin@node-01: ~
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-bold">
                <Cpu size={12} />
                <span>{currentScenario.telemetry.model}</span>
              </div>
            </div>

            {/* Telemetry Status Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 py-2 border-b border-white/5 bg-black/40 text-[10px] text-zinc-400">
              <div>
                <span className="text-zinc-600">TTFT:</span>{" "}
                <span className="text-white font-bold">{currentScenario.telemetry.ttft}</span>
              </div>
              <div>
                <span className="text-zinc-600">LATENCY:</span>{" "}
                <span className="text-white font-bold">{currentScenario.telemetry.latency}</span>
              </div>
              <div>
                <span className="text-zinc-600">SPEED:</span>{" "}
                <span className="text-white font-bold">{currentScenario.telemetry.tps}</span>
              </div>
              <div className="truncate">
                <span className="text-zinc-600">STATUS:</span>{" "}
                <span className="text-zinc-300">VERIFIED</span>
              </div>
            </div>

            {/* Pipeline Route Badge */}
            <div className="px-4 py-1.5 border-b border-white/5 bg-white/[0.01] text-[10px] text-zinc-500 flex items-center gap-2">
              <span className="text-white font-bold">маршрут:</span>
              <span className="truncate text-zinc-400">{currentScenario.telemetry.pipeline}</span>
            </div>

            {/* Terminal Body Content */}
            <div className="p-5 flex-1 text-xs leading-relaxed text-zinc-200 overflow-y-auto whitespace-pre-wrap select-text">
              {displayedText}
              {isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-white animate-terminal-blink align-middle" />
              )}
            </div>

            {/* Action Footer */}
            <div className="p-4 border-t border-white/10 bg-[#0E0E12] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <Sparkles size={13} className="text-white" />
                <span>Готов к реализации аналогичной архитектуры</span>
              </div>

              <div className="flex items-center gap-2">
                {currentScenario.relatedAction && (
                  <button
                    onClick={() => handleActionClick(currentScenario.relatedAction)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/[0.04] px-3.5 py-1.5 font-bold text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <span>{currentScenario.relatedAction.label}</span>
                  </button>
                )}
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 font-bold text-black hover:bg-zinc-200 transition-colors"
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
