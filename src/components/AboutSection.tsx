"use client";

import { useState, useEffect, useRef } from "react";
import { Brain, Code2, Wrench, Sparkles, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

const logPool = [
  "> Инициализация сборки MVP...",
  "> Загрузка окружения... Успешно",
  "> Подключение базы данных Supabase...",
  "> Синхронизация схем PostgreSQL... Готово",
  "> Интеграция Telegram Bot API... OK",
  "> Сборка Next.js приложения...",
  "> Оптимизация бандла и картинок...",
  "> Запуск dev-сервера на порту 3000...",
  " СТАТУС: СИСТЕМА АКТИВНА И ГОТОВА"
];

export function AboutSection() {
  // Стейты для интерактива
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Terminal state
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const terminalInterval = useRef<NodeJS.Timeout | null>(null);

  // Слайдер сложности
  const [complexity, setComplexity] = useState(60);

  // Логика терминала при наведении
  useEffect(() => {
    if (hoveredCard === 1) {
      setTerminalLines([logPool[0]]);
      let index = 1;
      terminalInterval.current = setInterval(() => {
        if (index < logPool.length) {
          const lineToAdd = logPool[index];
          setTerminalLines(prev => [...prev, lineToAdd]);
          index++;
        } else {
          if (terminalInterval.current) clearInterval(terminalInterval.current);
        }
      }, 500);
    } else {
      if (terminalInterval.current) {
        clearInterval(terminalInterval.current);
      }
      setTerminalLines([]);
    }
    return () => {
      if (terminalInterval.current) clearInterval(terminalInterval.current);
    };
  }, [hoveredCard]);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="section-shell">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start mb-16">
            <div>
              <p className="mb-3 text-sm font-medium text-cyan-400 font-bold">Кто я?</p>
              <h2 className="font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                Начинающий IT-специалист, который растет через реальные проекты.
              </h2>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-sm font-medium text-cyan-300">
                <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
                В IT-направлении с сентября 2024
              </div>
            </div>
            <div className="text-lg leading-8 text-slate-300 lg:mt-[34px]">
              Мне интересны роли на стыке технической поддержки, QA, автоматизации,
              веб-разработки и AI-assisted development. Я умею разбираться в задачах, работать с
              API, собирать MVP, тестировать поведение проекта и дорабатывать результат до
              понятной формы.
            </div>
          </div>
        </Reveal>

        {/* Bento Grid карточек */}
        <div className="grid gap-6 md:grid-cols-3">
          
          {/* Карточка 1: Разбираюсь в задаче (SVG граф) */}
          <div 
            className="glass-panel rounded-3xl p-6 flex flex-col justify-between min-h-[380px] overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Brain size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">Разбираюсь в задаче</h3>
              </div>
              <p className="text-sm leading-6 text-slate-400">
                Смотрю на логику продукта, ограничения и сценарии, а не только на набор технологий.
              </p>
            </div>

            {/* Визуализация графа процессов */}
            <div className="relative h-40 w-full mt-6 bg-black/10 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full p-4" viewBox="0 0 300 120">
                {/* Соединительные линии */}
                <path d="M 50 60 L 115 35" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <path d="M 50 60 L 115 85" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <path d="M 115 35 L 185 35" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <path d="M 115 85 L 185 85" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <path d="M 185 35 L 250 60" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <path d="M 185 85 L 250 60" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

                {/* Анимированные импульсы при наведении */}
                {hoveredCard === 0 && (
                  <>
                    <motion.path 
                      d="M 50 60 L 115 85 L 185 85 L 250 60 L 185 35 L 115 35 Z" 
                      fill="none"
                      stroke="url(#cyan-grad)"
                      strokeWidth="2"
                      strokeDasharray="60 360"
                      animate={{ strokeDashoffset: [420, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path 
                      d="M 50 60 L 115 85 L 185 85 L 250 60 L 185 35 L 115 35 Z" 
                      fill="none"
                      stroke="url(#purple-grad)"
                      strokeWidth="2"
                      strokeDasharray="60 360"
                      animate={{ strokeDashoffset: [420, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                    />
                  </>
                )}

                {/* Градиенты */}
                <defs>
                  <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00f2fe" stopOpacity="0" />
                    <stop offset="50%" stopColor="#00f2fe" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9d4edd" stopOpacity="0" />
                    <stop offset="50%" stopColor="#9d4edd" stopOpacity="1" />
                    <stop offset="100%" stopColor="#9d4edd" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Узлы */}
                <circle cx="50" cy="60" r="6" fill="#475569" className="transition-all duration-300 group-hover:fill-cyan-400" />
                <circle cx="115" cy="35" r="5" fill="#475569" className="transition-all duration-300 group-hover:fill-slate-300" />
                <circle cx="115" cy="85" r="5" fill="#475569" className="transition-all duration-300 group-hover:fill-slate-300" />
                <circle cx="185" cy="35" r="5" fill="#475569" className="transition-all duration-300 group-hover:fill-slate-300" />
                <circle cx="185" cy="85" r="5" fill="#475569" className="transition-all duration-300 group-hover:fill-slate-300" />
                <circle cx="250" cy="60" r="6" fill="#475569" className="transition-all duration-300 group-hover:fill-purple-500" />

                {/* Подписи к узлам */}
                <text x="50" y="46" textAnchor="middle" className="text-[8px] fill-slate-500 font-mono transition-colors group-hover:fill-slate-400">Идея</text>
                <text x="115" y="22" textAnchor="middle" className="text-[8px] fill-slate-500 font-mono transition-colors group-hover:fill-slate-400">Анализ</text>
                <text x="185" y="22" textAnchor="middle" className="text-[8px] fill-slate-500 font-mono transition-colors group-hover:fill-slate-400">Лимиты</text>
                <text x="250" y="46" textAnchor="middle" className="text-[8px] fill-slate-500 font-mono transition-colors group-hover:fill-slate-400">Продукт</text>
                <text x="115" y="101" textAnchor="middle" className="text-[8px] fill-slate-500 font-mono transition-colors group-hover:fill-slate-400">Сценарии</text>
                <text x="185" y="101" textAnchor="middle" className="text-[8px] fill-slate-500 font-mono transition-colors group-hover:fill-slate-400">Логика</text>
              </svg>
            </div>
          </div>

          {/* Карточка 2: Собираю рабочие MVP (Терминал) */}
          <div 
            className="glass-panel rounded-3xl p-6 flex flex-col justify-between min-h-[380px] overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <Code2 size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">Собираю рабочие MVP</h3>
              </div>
              <p className="text-sm leading-6 text-slate-400">
                Проверяю идею через практическую реализацию: API, веб-интерфейсы, боты и хранение данных.
              </p>
            </div>

            {/* Визуализация терминала */}
            <div className="relative h-40 w-full mt-6 bg-[#030508]/80 rounded-2xl border border-white/5 p-3 font-mono text-[9px] text-green-400 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-slate-500 shrink-0">
                <div className="flex items-center gap-1">
                  <Terminal size={10} />
                  <span>bash - mvp-builder</span>
                </div>
                <div className="flex gap-1">
                  <span className="size-1.5 rounded-full bg-red-500/60" />
                  <span className="size-1.5 rounded-full bg-yellow-500/60" />
                  <span className="size-1.5 rounded-full bg-green-500/60" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col gap-1 overflow-hidden leading-relaxed">
                {terminalLines.length === 0 ? (
                  <span className="text-slate-500 animate-pulse">Наведите курсор для запуска сборки...</span>
                ) : (
                  terminalLines.map((line, idx) => (
                    <div key={idx} className={line && line.startsWith(" СТАТУС") ? "text-cyan-400 font-bold mt-1" : "text-emerald-400"}>
                      {line}
                    </div>
                  ))
                )}
                {terminalLines.length > 0 && terminalLines.length < logPool.length && (
                  <span className="inline-block w-1.5 h-3 bg-green-400 animate-terminal-blink" />
                )}
              </div>
            </div>
          </div>

          {/* Карточка 3: Довожу до ясности (Слайдер сложности) */}
          <div 
            className="glass-panel rounded-3xl p-6 flex flex-col justify-between min-h-[380px] overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Wrench size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">Довожу до ясности</h3>
              </div>
              <p className="text-sm leading-6 text-slate-400">
                Тестирую, отлаживаю, упрощаю спорные места и использую AI-инструменты как ускоритель работы.
              </p>
            </div>

            {/* Визуализация слайдера и адаптивного SVG */}
            <div className="relative h-40 w-full mt-6 bg-black/10 rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 flex items-center justify-center">
                <svg className="w-full h-16" viewBox="0 0 200 60">
                  {/* Запутанный путь, сглаживающийся по мере увеличения слайдера */}
                  <motion.path
                    d={
                      complexity < 30
                        ? "M 10 30 Q 25 10 45 35 Q 60 50 80 25 Q 95 10 115 40 Q 135 50 150 20 Q 165 10 175 45 Q 182 50 190 30"
                        : complexity < 70
                        ? "M 10 30 Q 55 15 100 35 Q 145 45 190 30"
                        : "M 10 30 L 190 30"
                    }
                    fill="none"
                    stroke={complexity > 70 ? "#10b981" : complexity > 30 ? "#9d4edd" : "#ef4444"}
                    strokeWidth="2.5"
                    layout
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  />
                  <circle cx="10" cy="30" r="4" fill="#fff" />
                  <circle cx="190" cy="30" r="4" fill="#fff" />
                </svg>
              </div>

              {/* Слайдер */}
              <div className="space-y-2 shrink-0">
                <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase">
                  <span>Сложно</span>
                  <span className={complexity > 70 ? "text-emerald-400 font-bold" : complexity > 30 ? "text-purple-400" : "text-red-400"}>
                    {complexity > 70 ? "Просто" : complexity > 30 ? "В процессе" : "Хаос"}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="90" 
                  value={complexity} 
                  onChange={(e) => setComplexity(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                  aria-label="Регулировка сложности"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
