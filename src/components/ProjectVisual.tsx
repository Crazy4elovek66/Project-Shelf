"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

export function ProjectVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-30px", amount: 0.1 });

  return (
    <div 
      ref={ref} 
      className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-0 flex items-center justify-center"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.visual.accent} opacity-10`} />

      <div className="absolute inset-0 flex items-center justify-center p-4 transition-transform duration-700 group-hover:scale-102">
        <ProjectMockup title={project.title} active={isInView} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#030508] via-transparent to-transparent opacity-90" />

      <div className="pointer-events-none absolute bottom-5 left-5 z-20">
        <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-slate-200 backdrop-blur-md font-mono uppercase tracking-wider">
          {project.visual.label}
        </span>
      </div>
    </div>
  );
}

function ProjectMockup({ title, active }: { title: Project["title"]; active: boolean }) {
  switch (title) {
    case "JobRadar":
      return <JobRadarMockup active={active} />;
    case "ProfitCheck":
      return <ProfitCheckMockup active={active} />;
    case "Twitch AI Viewers":
      return <TwitchMockup active={active} />;
    case "Aura.net":
      return <AuraNetMockup active={active} />;
    case "AutoClip":
      return <AutoClipMockup active={active} />;
    default:
      return <FallbackMockup />;
  }
}

function TelegramShell({
  botName,
  avatarClassName,
  children,
}: {
  botName: string;
  avatarClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[232px] w-full max-w-[340px] flex-col overflow-hidden rounded-xl border border-[#263341] bg-[#0b111b] shadow-2xl">
      <div className="flex h-11 shrink-0 items-center gap-2.5 border-b border-black/40 bg-[#17212b] px-3">
        <div className={`size-8 rounded-full ${avatarClassName}`} />
        <div className="min-w-0">
          <div className="truncate text-[11px] font-semibold leading-none text-white">{botName}</div>
          <div className="mt-1 text-[9px] leading-none text-[#75b7ed]">бот</div>
        </div>
        <div className="ml-auto flex items-center gap-3 text-[#7d8b9a]">
          <div className="size-3 rounded-full border-2 border-current" />
          <div className="h-4 w-1 rounded-full bg-current opacity-70" />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-1.5 overflow-hidden p-2.5">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#7ea0bf_1px,transparent_1px)] [background-size:14px_14px]" />
        <div className="relative z-10 flex flex-1 flex-col gap-1.5 justify-end">{children}</div>
      </div>

      <div className="flex h-10 shrink-0 items-center gap-2 border-t border-black/40 bg-[#17212b] px-2.5">
        <div className="relative size-5 rounded-full border-2 border-[#7b8794] after:absolute after:-right-1 after:top-1 after:h-3 after:w-1 after:rounded-full after:border-r-2 after:border-[#7b8794]" />
        <div className="flex h-6 flex-1 items-center rounded-full bg-[#202b38] px-3">
          <div className="h-1.5 w-20 rounded bg-[#7b8794]/70" />
        </div>
      </div>
    </div>
  );
}

function JobRadarMockup({ active }: { active: boolean }) {
  const [pulsePoints, setPulsePoints] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setPulsePoints((prev) => {
        const next = [...prev, {
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          id: Date.now()
        }];
        if (next.length > 5) next.shift();
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <TelegramShell botName="JobRadar" avatarClassName="bg-gradient-to-br from-slate-600 via-slate-800 to-emerald-900">
      {/* Анимированный экран радара */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <div className="relative size-28 rounded-full border border-emerald-500/10 flex items-center justify-center overflow-hidden">
          {/* Вращающийся луч */}
          {active && (
            <div className="absolute inset-0 origin-center animate-radar-spin bg-[conic-gradient(from_0deg,transparent_60%,rgba(16,185,129,0.25)_100%)] rounded-full" />
          )}
          {/* Сетка радара */}
          <div className="absolute size-20 rounded-full border border-emerald-500/15" />
          <div className="absolute size-12 rounded-full border border-emerald-500/20" />
          <div className="absolute h-full w-[1px] bg-emerald-500/10" />
          <div className="absolute w-full h-[1px] bg-emerald-500/10" />
          
          {/* Пульсирующие точки найденных вакансий */}
          <AnimatePresence>
            {active && pulsePoints.map((pt) => (
              <motion.div
                key={pt.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute size-2.5 rounded-full bg-emerald-400"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Проплывающие карточки вакансий в чате */}
      <div className="absolute bottom-2 inset-x-2.5 z-10 flex flex-col gap-1.5">
        <div className="w-[85%] rounded-xl rounded-tl-md bg-[#182636] p-2.5 shadow-md border border-white/5">
          <div className="flex items-center gap-1.5 mb-1.5 shrink-0">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="h-2 w-20 rounded bg-white/70" />
          </div>
          <div className="h-1.5 w-[90%] rounded bg-white/40" />
          <div className="mt-1 h-1.5 w-[70%] rounded bg-white/30" />
        </div>
      </div>
    </TelegramShell>
  );
}

function ProfitCheckMockup({ active }: { active: boolean }) {
  const [price, setPrice] = useState("");
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    if (!active) {
      setPrice("");
      setMargin(0);
      return;
    }

    let isMounted = true;
    
    const runSimulation = async () => {
      while (isMounted) {
        // Очистка
        setPrice("");
        setMargin(0);
        await new Promise((r) => setTimeout(r, 800));

        // Печатаем "700+1000"
        const text = "700+1000";
        for (let i = 1; i <= text.length; i++) {
          if (!isMounted) return;
          setPrice(text.slice(0, i));
          await new Promise((r) => setTimeout(r, 150));
        }

        await new Promise((r) => setTimeout(r, 400));

        // Нарастание маржи до 1000
        const duration = 1200;
        const steps = 30;
        const stepTime = duration / steps;
        for (let i = 1; i <= steps; i++) {
          if (!isMounted) return;
          setMargin(Math.floor((1000 / steps) * i));
          await new Promise((r) => setTimeout(r, stepTime));
        }

        await new Promise((r) => setTimeout(r, 3000));
      }
    };

    runSimulation();

    return () => {
      isMounted = false;
    };
  }, [active]);

  return (
    <TelegramShell botName="ProfitCheck" avatarClassName="bg-[radial-gradient(circle_at_35%_35%,#f8d38a,#6d4322_48%,#14161b_72%)]">
      <div className="w-[85%] rounded-2xl rounded-tl-md bg-[#182636] p-3 border border-white/5 space-y-2">
        <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between border-b border-white/5 pb-1">
          <span>Калькулятор цены</span>
          <span className="text-emerald-400 font-bold">Активен</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[9px] text-slate-500">
            <span>Ввод:</span>
            <span className="text-white font-mono">{price || "|"}</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-400"
              initial={{ width: 0 }}
              animate={active ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
            />
          </div>
        </div>
        <div className="pt-1 flex items-center justify-between border-t border-white/5 font-mono">
          <span className="text-[9px] text-slate-400">Чистая прибыль:</span>
          <span className="text-xs text-emerald-400 font-black">+{margin} ₽</span>
        </div>
      </div>
    </TelegramShell>
  );
}

const mockUsers = ["Алиса", "Максим", "Елена", "Денис", "Анна", "Влад"];
const mockTexts = [
  "Стрим просто огонь! 🔥",
  "Отличная архитектура проекта.",
  "А бот реагирует на голос?",
  "STT модель работает супер.",
  "Интересный концепт Twitch AI.",
  "Крутая реализация ботов!"
];

function TwitchMockup({ active }: { active: boolean }) {
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; id: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (!active) {
      setChatMessages([]);
      return;
    }

    // Инициализация парой сообщений
    setChatMessages([
      { sender: "Система", text: "Подключение к Twitch чату...", id: nextId.current++ },
      { sender: "Бот-Ассистент", text: "ИИ-модель активна", id: nextId.current++ }
    ]);

    const interval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
      
      setChatMessages((prev) => {
        const next = [...prev, { sender: randomUser, text: randomText, id: nextId.current++ }];
        if (next.length > 4) next.shift();
        return next;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex h-[224px] w-full max-w-[360px] overflow-hidden rounded-xl border border-[#272846] bg-[#0d0d15] shadow-2xl relative">
      {/* Главный экран стрима */}
      <div className="flex flex-1 flex-col p-3 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-4 rounded-sm border-2 border-[#8c34ff] bg-[#261044] flex items-center justify-center">
            <span className="text-[7px] text-purple-300">T</span>
          </div>
          <div className="h-3 w-28 rounded bg-white/80" />
          {/* Индикатор LIVE */}
          <div className="ml-auto flex items-center gap-1.5 rounded bg-red-600/20 px-2 py-0.5 border border-red-600/40">
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[7px] font-black tracking-wider text-red-400 uppercase">В эфире</span>
          </div>
        </div>

        {/* Чат ботов */}
        <div className="flex-1 flex flex-col justify-end bg-black/40 rounded-lg p-2 border border-white/5 overflow-hidden font-mono text-[9px]">
          <div className="flex flex-col gap-1.5">
            <AnimatePresence initial={false}>
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex flex-col border-l-2 border-purple-500/40 pl-1.5"
                >
                  <span className="text-purple-400 font-bold text-[8px]">{msg.sender}</span>
                  <span className="text-slate-300">{msg.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Боковая панель */}
      <div className="flex w-[26%] flex-col border-l border-[#2a2b43] bg-[#121219] p-2 shrink-0">
        <div className="h-1.5 w-12 rounded bg-slate-700/60 mb-2 shrink-0" />
        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="h-1.5 w-14 rounded bg-slate-800" />
          <div className="h-1.5 w-10 rounded bg-slate-800" />
          <div className="h-1.5 w-12 rounded bg-slate-800" />
        </div>
        <div className="h-5 rounded bg-purple-600/20 border border-purple-500/20 text-[7px] text-purple-300 font-mono font-bold flex items-center justify-center shrink-0">
          AI SYSTEM
        </div>
      </div>
    </div>
  );
}

function AuraNetMockup({ active }: { active: boolean }) {
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="relative h-[224px] w-full max-w-[360px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
      {/* Неоновая сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.08)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* Декоративная подсветка */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 size-44 rounded-full bg-purple-500/10 blur-2xl" />

      <div className="absolute inset-x-0 top-0 flex h-10 items-center border-b border-white/10 px-3 z-10 bg-black/60 backdrop-blur-md">
        <div className="text-[11px] font-black leading-none text-[#a63cff]">AURA<span className="text-white/70">.NET</span></div>
        <div className="ml-auto flex gap-1.5">
          <div className="h-4.5 w-11 rounded border border-white/10" />
          <div className="h-4.5 w-12 rounded border border-[#a63cff]/50 bg-[#a63cff]/15 flex items-center justify-center">
            <span className="size-1 rounded-full bg-[#a63cff] animate-ping" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center pt-8">
        <div className="mb-2 rounded-full border border-purple-500/40 bg-purple-950/20 px-4 py-1 text-[9px] font-bold text-purple-300 shadow-[0_0_15px_rgba(168,85,247,.1)]">
          Бета · ранний доступ
        </div>
        <div className="text-center text-[40px] font-black leading-none tracking-tight text-white">
          AURA<span className="text-purple-400">.NET</span>
        </div>
        <div className="mt-2 h-1 w-28 rounded bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 bg-purple-500"
            initial={{ left: "-100%", width: "100%" }}
            animate={active ? { left: ["-100%", "100%"] } : { left: "-100%" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-5 flex gap-2.5">
          <div className="h-7 w-20 rounded bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,.4)] flex items-center justify-center text-[8px] font-bold text-white uppercase tracking-wider">Открыть</div>
          <div className="h-7 w-20 rounded border border-white/15 bg-black/20" />
        </div>
      </div>

      {/* Пульсирующие волны сети */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={pulseCount}
            initial={{ opacity: 0.5, scale: 0.6 }}
            animate={{ opacity: 0, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0 border border-purple-500/20 rounded-xl pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

const statuses = [
  "Импорт медиа...",
  "Анализ видеоряда...",
  "Нарезка клипов...",
  "Рендеринг аудио...",
  "Обработка клипа №1...",
  "Завершено!"
];

function AutoClipMockup({ active }: { active: boolean }) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      setStatusIdx(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setStatusIdx(0);
          return 0;
        }
        const next = prev + 1.5;
        // Переключение статусов на основе прогресса
        const step = Math.floor((next / 100) * statuses.length);
        if (step < statuses.length) setStatusIdx(step);
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex h-[224px] w-full max-w-[360px] flex-col overflow-hidden rounded-xl border border-[#444] bg-[#1e1e1e] shadow-2xl font-mono text-[8px]">
      <div className="flex h-6 items-center border-b border-[#333] bg-[#141414] px-2.5 shrink-0">
        <div className="mr-2 size-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-purple-500" />
        <div className="h-1.5 w-24 rounded bg-white/70" />
        <div className="ml-auto flex gap-1.5">
          <div className="size-1.5 rounded-full bg-slate-600" />
          <div className="size-1.5 rounded-full bg-slate-600" />
        </div>
      </div>

      <div className="flex border-b border-[#333] bg-[#222] text-slate-500 shrink-0">
        <div className="h-6 border-r border-[#333] px-3 pt-1.5 bg-[#2d2d2d] text-white">Редактор</div>
        <div className="h-6 border-r border-[#333] px-3 pt-1.5">Логи</div>
      </div>

      <div className="p-2 space-y-2 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Прогресс рендеринга */}
        <div className="bg-black/40 border border-white/5 rounded p-2 space-y-1.5 shrink-0">
          <div className="flex justify-between items-center text-[7px]">
            <span className="text-slate-400">Процесс нарезки</span>
            <span className={progress >= 100 ? "text-emerald-400 font-bold" : "text-purple-400 animate-pulse"}>
              {statuses[statusIdx]}
            </span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative">
            <div className="h-full bg-purple-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Псевдо-таблица клипов */}
        <div className="flex-1 border border-white/5 rounded bg-black/20 overflow-hidden flex flex-col">
          <div className="grid grid-cols-4 border-b border-white/5 bg-black/40 p-1 font-bold text-slate-500">
            <span>Файл</span>
            <span>Таймкод</span>
            <span>Вес</span>
            <span>Статус</span>
          </div>
          <div className="flex-1 flex flex-col justify-start">
            <div className="grid grid-cols-4 p-1 text-slate-300 border-b border-white/5 bg-black/10">
              <span className="truncate">clip_01.mp4</span>
              <span>00:12 - 00:24</span>
              <span>12 MB</span>
              <span className={progress > 30 ? "text-emerald-400 font-bold" : "text-purple-400 animate-pulse"}>
                {progress > 30 ? "Готово" : "Рендер"}
              </span>
            </div>
            <div className="grid grid-cols-4 p-1 text-slate-300 border-b border-white/5">
              <span className="truncate">clip_02.mp4</span>
              <span>01:45 - 02:08</span>
              <span>24 MB</span>
              <span className={progress > 60 ? "text-emerald-400 font-bold" : progress > 30 ? "text-purple-400 animate-pulse" : "text-slate-600"}>
                {progress > 60 ? "Готово" : progress > 30 ? "Рендер" : "Ожидание"}
              </span>
            </div>
            <div className="grid grid-cols-4 p-1 text-slate-300">
              <span className="truncate">clip_03.mp4</span>
              <span>03:10 - 03:32</span>
              <span>18 MB</span>
              <span className={progress >= 100 ? "text-emerald-400 font-bold" : progress > 60 ? "text-purple-400 animate-pulse" : "text-slate-600"}>
                {progress >= 100 ? "Готово" : progress > 60 ? "Рендер" : "Ожидание"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FallbackMockup() {
  return (
    <div className="grid size-32 place-items-center rounded-2xl border border-white/10 bg-black/5">
      <div className="size-16 rounded-full border border-cyan-500/10" />
    </div>
  );
}
