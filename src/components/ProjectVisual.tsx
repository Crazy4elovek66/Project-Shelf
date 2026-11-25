"use client";

import { memo, useState, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Sparkles,
  Check,
  Send,
  Play,
  TrendingUp,
  Shield,
  Layers,
  Cpu,
  Flame,
  Radio,
  ShoppingBag,
  Swords,
  Clock,
  Eye,
  Sliders,
  Terminal,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { useLanguageMode } from "@/context/LanguageModeContext";

export const ProjectVisual = memo(function ProjectVisual({ project }: { project: Project }) {
  const { isSimple } = useLanguageMode();
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((k) => k + 1);
  };

  return (
    <div className="relative w-full rounded-2xl border border-white/15 bg-[#09090D] shadow-2xl overflow-hidden font-mono text-xs select-none">
      {/* Top Sandbox Status Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#121216] text-[11px]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white tracking-wider">
            {isSimple ? "ИНТЕРАКТИВНОЕ ДЕМО" : "LIVE SANDBOX // PROTOTYPE"}
          </span>
          <span className="hidden sm:inline text-zinc-500">
            [{project.title}]
          </span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded border border-white/15 bg-white/[0.04] px-2.5 py-1 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white transition-all cursor-pointer text-[10px]"
          title="Сбросить состояние песочницы"
        >
          <RotateCcw size={11} />
          <span>{isSimple ? "СБРОС" : "RESET"}</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-4 sm:p-6 min-h-[440px] flex flex-col justify-center">
        <ProjectInteractiveSandbox
          key={resetKey}
          title={project.title}
          isSimple={isSimple}
        />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="px-4 py-2 border-t border-white/10 bg-[#0E0E12] flex items-center justify-between text-[10px] text-zinc-500">
        <span className="truncate">
          {isSimple
            ? "Нажимайте на кнопки в блоке выше для проверки работы"
            : "Click interactive triggers to test real-time state machine"}
        </span>
        <span className="shrink-0 text-zinc-400 font-bold ml-2">
          {project.visual.label}
        </span>
      </div>
    </div>
  );
});

function ProjectInteractiveSandbox({
  title,
  isSimple,
}: {
  title: Project["title"];
  isSimple: boolean;
}) {
  switch (title) {
    case "JobRadar":
      return <JobRadarSandbox isSimple={isSimple} />;
    case "Ракомания":
      return <RakomaniaSandbox isSimple={isSimple} />;
    case "DotaOverlay":
      return <DotaOverlaySandbox isSimple={isSimple} />;
    case "Twitch AI Viewers":
      return <TwitchAiSandbox isSimple={isSimple} />;
    case "Aura.net":
      return <AuraNetSandbox isSimple={isSimple} />;
    case "ProfitCheck":
      return <ProfitCheckSandbox isSimple={isSimple} />;
    case "AutoClip":
      return <AutoClipSandbox isSimple={isSimple} />;
    case "Магия Бабушки":
      return <BabushkaMagicSandbox isSimple={isSimple} />;
    default:
      return <JobRadarSandbox isSimple={isSimple} />;
  }
}

// -------------------------------------------------------------
// 1. JobRadar Sandbox
// -------------------------------------------------------------
function JobRadarSandbox({ isSimple }: { isSimple: boolean }) {
  const [selectedStack, setSelectedStack] = useState<"python" | "qa" | "react">("python");
  const [isSearching, setIsSearching] = useState(false);
  const [applied, setApplied] = useState(false);

  const jobsData = {
    python: {
      role: "Senior AI / Backend Engineer",
      salary: "350 000 — 480 000 ₽",
      company: "DeepTech AI Lab",
      score: "98/100",
      skills: ["Python", "FastAPI", "LLM", "PostgreSQL"],
    },
    qa: {
      role: "Lead QA Automation Engineer",
      salary: "240 000 — 320 000 ₽",
      company: "Fintech Platform",
      score: "94/100",
      skills: ["Python", "Pytest", "Docker", "CI/CD"],
    },
    react: {
      role: "Full-Stack Next.js Developer",
      salary: "280 000 — 380 000 ₽",
      company: "Highload Systems",
      score: "96/100",
      skills: ["TypeScript", "Next.js", "React 19", "Tailwind"],
    },
  };

  const handleSelectStack = (stack: "python" | "qa" | "react") => {
    setSelectedStack(stack);
    setIsSearching(true);
    setApplied(false);
    setTimeout(() => setIsSearching(false), 600);
  };

  const currentJob = jobsData[selectedStack];

  return (
    <div className="space-y-4 max-w-lg mx-auto w-full">
      {/* Stack Switcher */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl border border-white/10 bg-[#121216]">
        {(["python", "qa", "react"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleSelectStack(s)}
            className={`flex-1 py-1.5 rounded-lg text-center font-bold text-[11px] transition-all cursor-pointer ${
              selectedStack === s
                ? "bg-white text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {s === "python" ? "Python / AI" : s === "qa" ? "QA Auto" : "Web / Next"}
          </button>
        ))}
      </div>

      {/* Live Pipeline / Radar State */}
      <div className="rounded-xl border border-white/10 bg-[#060608] p-4 relative overflow-hidden">
        {isSearching ? (
          <div className="py-8 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <Radio size={24} className="text-cyan-400 animate-spin" />
            <span className="text-xs">
              {isSimple ? "Сканирование HH API и отсев спама..." : "Parsing HH API & applying deduplication hash..."}
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold">
                  AI MATCH: {currentJob.score}
                </span>
                <h4 className="font-bold text-white text-sm sm:text-base mt-1.5">
                  {currentJob.role}
                </h4>
                <p className="text-zinc-400 text-xs">{currentJob.company} {"//"} Удаленно</p>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold text-xs sm:text-sm">
                  {currentJob.salary}
                </span>
                <div className="text-[10px] text-zinc-500 mt-1">Сегодня, 10:45</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentJob.skills.map((sk) => (
                <span
                  key={sk}
                  className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-300"
                >
                  {sk}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">
                {isSimple ? "Автофильтр колл-центров: Пройден" : "Spam & callcenter filter: PASSED"}
              </span>

              <button
                type="button"
                onClick={() => setApplied(true)}
                disabled={applied}
                className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  applied
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {applied ? (
                  <>
                    <Check size={12} />
                    <span>Отклик отправлен!</span>
                  </>
                ) : (
                  <>
                    <Send size={11} />
                    <span>Откликнуться</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Ракомания Sandbox
// -------------------------------------------------------------
function RakomaniaSandbox({ isSimple }: { isSimple: boolean }) {
  const [portion, setPortion] = useState<"medium" | "large">("medium");
  const [spices, setSpices] = useState(true);
  const [orderStep, setOrderStep] = useState<"config" | "cooking" | "delivering" | "done">("config");

  const basePrice = portion === "medium" ? 2200 : 3400;
  const totalPrice = basePrice + (spices ? 200 : 0);

  const handleOrder = () => {
    setOrderStep("cooking");
    setTimeout(() => {
      setOrderStep("delivering");
      setTimeout(() => {
        setOrderStep("done");
      }, 1800);
    }, 1400);
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto w-full">
      {orderStep === "config" ? (
        <div className="rounded-xl border border-white/10 bg-[#07070A] p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-white text-sm">
              🦞 РАКОМАНИЯ // Telegram WebApp
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Кухня онлайн
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] text-zinc-400">Выберите размер раков:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPortion("medium")}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  portion === "medium"
                    ? "border-amber-400 bg-amber-400/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                <div className="font-bold text-xs">1 кг // Средние</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">30-40 шт/кг · 2 200 ₽</div>
              </button>

              <button
                type="button"
                onClick={() => setPortion("large")}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  portion === "large"
                    ? "border-amber-400 bg-amber-400/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                <div className="font-bold text-xs">2 кг // Крупные</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">20-25 шт/кг · 3 400 ₽</div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Flame size={14} className="text-amber-400" />
              <span className="text-xs text-white">Фирменная варка с яблоком и укропом</span>
            </div>
            <button
              type="button"
              onClick={() => setSpices(!spices)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                spices ? "bg-amber-400 text-black" : "bg-white/10 text-zinc-400"
              }`}
            >
              {spices ? "+200 ₽ (ВКЛ)" : "Без варки"}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div>
              <span className="text-[10px] text-zinc-500 block">
                {isSimple ? "Геозона доставки Shapely: Зона 1 (Центр)" : "Shapely Geozone Poly: Zone 1 (Center)"}
              </span>
              <span className="text-sm font-bold text-white">Итого: {totalPrice} ₽</span>
            </div>
            <button
              type="button"
              onClick={handleOrder}
              className="bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag size={13} />
              <span>Оформить заказ</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-[#07070A] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-white text-xs">ТРЕКИНГ ЗАКАЗА #RK-8491</span>
            <span className="text-emerald-400 font-bold text-xs">{totalPrice} ₽</span>
          </div>

          {/* Stepper */}
          <div className="space-y-3">
            {[
              { id: "cooking", label: "01. Варка на кухне (партия 8 раков)", time: "14:30" },
              { id: "delivering", label: "02. Курьер назначен и в пути (Lada Granta)", time: "14:48" },
              { id: "done", label: "03. Заказ доставлен до двери", time: "15:15" },
            ].map((st, i) => {
              const isPast =
                orderStep === "done" ||
                (orderStep === "delivering" && i <= 1) ||
                (orderStep === "cooking" && i === 0);
              const isCurrent = orderStep === st.id;

              return (
                <div key={st.id} className="flex items-center gap-3">
                  <div
                    className={`size-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isPast
                        ? "bg-emerald-500 text-black"
                        : isCurrent
                        ? "bg-white text-black animate-pulse"
                        : "bg-white/10 text-zinc-500"
                    }`}
                  >
                    {isPast ? <Check size={12} strokeWidth={3} /> : i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs block ${isPast ? "text-white font-bold" : "text-zinc-500"}`}>
                      {st.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{st.time}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setOrderStep("config")}
              className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Сделать новый заказ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 3. DotaOverlay Sandbox
// -------------------------------------------------------------
function DotaOverlaySandbox({ isSimple }: { isSimple: boolean }) {
  const [selectedOpponent, setSelectedOpponent] = useState<"pa" | "storm" | "slark">("pa");

  const metaData = {
    pa: {
      hero: "Phantom Assassin",
      winrate: "48.2%",
      alliedWinrate: "57.8%",
      threat: "КРИТИЧЕСКИЙ (BKB + Deso)",
      bestCounters: ["Anti-Mage", "Lion (Finger Burst)", "Doom (Lockdown)"],
      itemsToBuy: ["Monkey King Bar (MKB)", "Blade Mail", "Silver Edge (Break)"],
    },
    storm: {
      hero: "Storm Spirit",
      winrate: "51.0%",
      alliedWinrate: "55.4%",
      threat: "ВЫСОКИЙ (Orchid + Zip)",
      bestCounters: ["Silencer (Global)", "Disruptor (Static Storm)", "Bane"],
      itemsToBuy: ["Orchid Malevolence", "Scythe of Vyse (Hex)", "BKB"],
    },
    slark: {
      hero: "Slark",
      winrate: "49.5%",
      alliedWinrate: "54.2%",
      threat: "СРЕДНИЙ (Essence Shift)",
      bestCounters: ["Bloodseeker (Rupture)", "Axe (Call)", "Legion Commander"],
      itemsToBuy: ["Force Staff (Kite)", "Ghost Scepter", "Halberd (Disarm)"],
    },
  };

  const current = metaData[selectedOpponent];

  return (
    <div className="space-y-4 max-w-lg mx-auto w-full">
      {/* Target Selector */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl border border-white/10 bg-[#121216]">
        <span className="text-[10px] text-zinc-500 ml-2 hidden sm:inline">Пик врага:</span>
        {(["pa", "storm", "slark"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setSelectedOpponent(k)}
            className={`flex-1 py-1.5 rounded-lg text-center font-bold text-[11px] transition-all cursor-pointer ${
              selectedOpponent === k
                ? "bg-red-500/20 text-red-200 border border-red-500/40"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {k === "pa" ? "P. Assassin" : k === "storm" ? "Storm Spirit" : "Slark"}
          </button>
        ))}
      </div>

      {/* Live Overlay HUD */}
      <div className="rounded-xl border border-red-500/30 bg-[#0B080A] p-4 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Swords size={14} className="text-red-400" />
            <span className="font-bold text-white text-xs">{current.hero.toUpperCase()}</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            VAC-SAFE // GSI OK
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[10px] text-zinc-500 block">Прогноз винрейта союзников:</span>
            <span className="text-base font-bold text-emerald-400">{current.alliedWinrate}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
            <span className="text-[10px] text-zinc-500 block">Уровень опасности врага:</span>
            <span className="text-xs font-bold text-red-400 mt-1 block">{current.threat}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] text-zinc-400 block font-bold">ТОП КОНТРПИКИ В ЭТОМ ДРАФТЕ:</span>
          <div className="flex flex-wrap gap-1.5">
            {current.bestCounters.map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[10px] font-bold"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 pt-1 border-t border-white/10">
          <span className="text-[10px] text-zinc-400 block font-bold">РЕКОМЕНДОВАННЫЙ ЗАКУП:</span>
          <div className="flex flex-wrap gap-1.5">
            {current.itemsToBuy.map((it) => (
              <span
                key={it}
                className="px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[10px]"
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. Twitch AI Viewers Sandbox
// -------------------------------------------------------------
function TwitchAiSandbox({ isSimple }: { isSimple: boolean }) {
  const [messages, setMessages] = useState<Array<{ user: string; text: string; role: string }>>([
    { user: "AI_Sniper", text: "Смотрим внимательно, позиция опасная", role: "Аналитик" },
    { user: "HypeBoy_AI", text: "ПОГНАЛИ! Тащи этот раунд 🔥", role: "Хайпер" },
  ]);

  const triggerEvent = (type: "clutch" | "fail") => {
    if (type === "clutch") {
      setMessages((prev) => [
        ...prev.slice(-3),
        { user: "AI_Sniper", text: "НЕВЕРОЯТНЫЙ КЛАТЧ! Реакция 180мс, чистый скилл!", role: "Аналитик" },
        { user: "HypeBoy_AI", text: "АААААА КАК ОН ЭТО ЗАБРАЛ?! ЧАТ В ОГНЕ 🔥🔥🔥", role: "Хайпер" },
        { user: "Memer_9000", text: "Противники в шоке удаляют игру 😂", role: "Мемодел" },
      ]);
    } else {
      setMessages((prev) => [
        ...prev.slice(-3),
        { user: "Memer_9000", text: "Эпичный фейл года 💀 Срочно в нарезку!", role: "Мемодел" },
        { user: "AI_Sniper", text: "Ошибся с таймингом гранаты на 0.4 сек, бывает", role: "Аналитик" },
        { user: "HypeBoy_AI", text: "Ничего, в следующем раунде отыграемся!", role: "Хайпер" },
      ]);
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto w-full">
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-zinc-500">Событие стрима:</span>
        <button
          type="button"
          onClick={() => triggerEvent("clutch")}
          className="flex-1 py-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white hover:text-black font-bold text-xs transition-all cursor-pointer"
        >
          🔥 Клатч 1v3
        </button>
        <button
          type="button"
          onClick={() => triggerEvent("fail")}
          className="flex-1 py-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white hover:text-black font-bold text-xs transition-all cursor-pointer"
        >
          💀 Смешной фейл
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#07070A] p-4 space-y-2.5 max-h-56 overflow-y-auto">
        <div className="text-[10px] text-zinc-500 border-b border-white/10 pb-1 flex justify-between">
          <span>ЖИВОЙ ЧАТ // TWITCH STT + LLM AGENTS</span>
          <span className="text-emerald-400">Whisper: 18ms</span>
        </div>
        {messages.map((m, idx) => (
          <div key={idx} className="text-xs leading-relaxed flex items-start gap-2">
            <span className="text-cyan-400 font-bold shrink-0">[{m.user}]:</span>
            <span className="text-zinc-200">{m.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. Aura.net Sandbox
// -------------------------------------------------------------
function AuraNetSandbox({ isSimple }: { isSimple: boolean }) {
  const [aura, setAura] = useState(1420);
  const [rank, setRank] = useState(3);

  const changeAura = (delta: number) => {
    setAura((prev) => {
      const next = prev + delta;
      if (next > 1500) setRank(1);
      else if (next > 1400) setRank(2);
      else setRank(4);
      return next;
    });
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto w-full">
      <div className="rounded-xl border border-white/15 bg-[#09090D] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center font-bold text-black text-xs">
              AN
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Alex // Full-Stack Lead</h4>
              <span className="text-[10px] text-zinc-500">Telegram Social Rating</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-400">РАНГ #{rank}</span>
            <div className="text-[10px] text-zinc-500">в сообществе</div>
          </div>
        </div>

        <div className="text-center py-2">
          <div className="text-3xl font-black font-mono text-white tracking-tight">
            {aura} <span className="text-cyan-400 text-lg">AURA</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
            <m.div
              className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full"
              style={{ width: `${Math.min(100, Math.max(10, (aura / 2000) * 100))}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => changeAura(10)}
            className="py-2 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-bold hover:bg-emerald-500 hover:text-black transition-all cursor-pointer text-xs"
          >
            +10 AURA (Респект)
          </button>
          <button
            type="button"
            onClick={() => changeAura(-10)}
            className="py-2 px-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 font-bold hover:bg-rose-500 hover:text-black transition-all cursor-pointer text-xs"
          >
            -10 AURA (Сломал прод)
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. ProfitCheck Sandbox
// -------------------------------------------------------------
function ProfitCheckSandbox({ isSimple }: { isSimple: boolean }) {
  const [dealSum, setDealSum] = useState(30000);
  const [isUrgent, setIsUrgent] = useState(false);

  const multiplier = isUrgent ? 1.4 : 1.0;
  const gross = Math.round(dealSum * multiplier);
  const platformFee = Math.round(gross * 0.1);
  const withdrawalFee = Math.round(gross * 0.03);
  const netProfit = gross - platformFee - withdrawalFee;

  return (
    <div className="space-y-4 max-w-lg mx-auto w-full">
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-zinc-500">Сумма заказа:</span>
        {[20000, 35000, 50000].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setDealSum(val)}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              dealSum === val
                ? "bg-white text-black"
                : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            {val.toLocaleString()} ₽
          </button>
        ))}
        <button
          type="button"
          onClick={() => setIsUrgent(!isUrgent)}
          className={`ml-auto px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
            isUrgent ? "bg-amber-400 text-black" : "bg-white/10 text-zinc-400"
          }`}
        >
          {isUrgent ? "Срочный x1.4" : "Обычный"}
        </button>
      </div>

      <div className="rounded-xl border border-white/15 bg-[#09090D] p-4 space-y-3">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <span className="text-zinc-400 text-xs">Итоговая цена клиенту:</span>
          <span className="text-base font-bold text-white">{gross.toLocaleString()} ₽</span>
        </div>

        <div className="space-y-1.5 text-[11px] text-zinc-400">
          <div className="flex justify-between">
            <span>Комиссия биржи / сервиса (10%):</span>
            <span className="text-rose-400">-{platformFee.toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between">
            <span>Комиссия на вывод (3%):</span>
            <span className="text-rose-400">-{withdrawalFee.toLocaleString()} ₽</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <span className="text-xs font-bold text-white">Чистая прибыль:</span>
          <span className="text-lg font-black text-emerald-400 font-mono">
            +{netProfit.toLocaleString()} ₽
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. AutoClip Sandbox
// -------------------------------------------------------------
function AutoClipSandbox({ isSimple }: { isSimple: boolean }) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [isRunning, setIsRunning] = useState(false);

  const startPipeline = () => {
    setIsRunning(true);
    setStep(1);
    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        setStep(3);
        setIsRunning(false);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto w-full">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">Конвейер нарезки 9:16 Shorts</span>
        <button
          type="button"
          onClick={startPipeline}
          disabled={isRunning}
          className="bg-white text-black hover:bg-zinc-200 px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Play size={11} />
          <span>{isRunning ? "Обработка..." : "Запустить клиппинг"}</span>
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#07070A] p-4 space-y-3">
        {[
          { num: 1, title: "Детекция звукового всплеска", detail: "Аудио-пик +18dB на 14:20" },
          { num: 2, title: "MediaPipe Face Mesh трекинг", detail: "Удержание лица в 9:16 рамке" },
          { num: 3, title: "Аппаратный рендер FFmpeg", detail: "Готово: short_clip_01.mp4" },
        ].map((s) => (
          <div
            key={s.num}
            className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
              step >= s.num
                ? "border-emerald-500/30 bg-emerald-500/10 text-white"
                : "border-white/5 bg-white/[0.02] text-zinc-500"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`size-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= s.num ? "bg-emerald-500 text-black" : "bg-white/10 text-zinc-400"
              }`}>
                {step >= s.num ? "✓" : s.num}
              </span>
              <span className="text-xs font-bold">{s.title}</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">{s.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 8. Магия Бабушки Sandbox
// -------------------------------------------------------------
const BABUSHKA_TEXTS = {
  coffee: "Вижу по кофейной гуще: проект твой сложный, но к концу недели ждет тебя уверенный релиз и довольный заказчик!",
  tarot: "Выпала карта «Колесница»: пора двигаться вперед без сомнений, все сервисы выдержат нагрузку!",
  palm: "Линия ума глубокая и четкая: архитектура надежная, базы данных настроены без единого узкого места.",
};

function BabushkaMagicSandbox({ isSimple }: { isSimple: boolean }) {
  const [mode, setMode] = useState<"coffee" | "tarot" | "palm">("coffee");
  const [streamText, setStreamText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startOracle = useCallback((m: "coffee" | "tarot" | "palm") => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setMode(m);
    setStreamText("");
    setIsTyping(true);

    const full = BABUSHKA_TEXTS[m];
    let i = 0;
    intervalRef.current = setInterval(() => {
      i += 3;
      if (i >= full.length) {
        setStreamText(full);
        setIsTyping(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setStreamText(full.slice(0, i));
      }
    }, 25);
  }, []);

  useEffect(() => {
    startOracle("coffee");
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startOracle]);

  return (
    <div className="space-y-4 max-w-lg mx-auto w-full">
      <div className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-[#121216]">
        {(["coffee", "tarot", "palm"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => startOracle(m)}
            className={`flex-1 py-1.5 rounded-lg text-center font-bold text-xs transition-all cursor-pointer ${
              mode === m ? "bg-white text-black" : "text-zinc-400 hover:text-white"
            }`}
          >
            {m === "coffee" ? "Кофе" : m === "tarot" ? "Таро" : "Ладонь"}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-purple-500/30 bg-[#0B0810] p-4 space-y-3 min-h-[140px] flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-[10px] text-zinc-400">
          <span>🔮 БАБУШКА MAGIC // LLM ORACLE</span>
          <span className="text-purple-300 font-bold">Claude 3.5 Sonnet</span>
        </div>

        <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-mono">
          {streamText}
          {isTyping && <span className="inline-block w-2 h-3.5 bg-purple-300 ml-1 animate-pulse" />}
        </p>

        <div className="text-[10px] text-zinc-500 pt-1 border-t border-white/5 flex justify-between">
          <span>Сессия сохранена в PostgreSQL</span>
          <span>Latency: 22ms</span>
        </div>
      </div>
    </div>
  );
}
