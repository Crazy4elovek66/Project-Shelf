"use client";

import { motion } from "framer-motion";
import { workSteps } from "@/data/skills";
import { GitBranch, Workflow, CheckCircle, Zap } from "lucide-react";

export function WorkProcessSection() {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-accentViolet/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="section-shell">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-mono text-slate-300 mb-3">
              <Workflow size={13} className="text-accentCyan" />
              <span>ИНЖЕНЕРНЫЙ ПАЙПЛАЙН // 4 ЭТАПА РАЗРАБОТКИ</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              Как устроен рабочий процесс
            </h2>
          </div>
          <p className="max-w-md text-sm font-mono text-slate-400 leading-relaxed">
            От декомпозиции бизнес-требований до стабильного продакшена за 7-14 дней. Никакого хаоса — прозрачные контрольные точки и предсказуемый результат.
          </p>
        </div>

        {/* Process Flow Layout */}
        <div className="relative">
          {/* Animated Connecting SVG Stream on Desktop */}
          <div className="hidden lg:block absolute top-[52px] inset-x-8 h-1 z-0 pointer-events-none">
            <svg className="w-full h-2" viewBox="0 0 1000 8" fill="none" preserveAspectRatio="none">
              <line x1="0" y1="4" x2="1000" y2="4" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
              <motion.line
                x1="0"
                y1="4"
                x2="1000"
                y2="4"
                stroke="url(#process-gradient)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="process-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 4 Process Nodes Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {workSteps.map((step, idx) => (
              <div
                key={step.step}
                className="rounded-3xl border border-white/10 bg-[#0C0D12] p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-accentCyan/30 group"
              >
                <div>
                  {/* Step Beacon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="size-11 rounded-2xl border border-white/15 bg-white/[0.04] flex items-center justify-center font-mono text-sm font-bold text-white group-hover:border-accentCyan group-hover:text-accentCyan group-hover:bg-accentCyan/10 transition-colors shadow-sm">
                      {step.step}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 uppercase">
                      ФАЗА 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-accentCyan transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                    {step.text}
                  </p>
                </div>

                {/* Step Tags */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Principle Banner */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0C0D12] via-[#13151E] to-[#0C0D12] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3 rounded-2xl border border-accentCyan/30 bg-accentCyan/10 text-accentCyan shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-white">
                AI как мультипликатор скорости, но инженерный контроль за человеком
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-sans max-w-2xl">
                Использую передовые LLM и генеративные инструменты для десятикратного ускорения прототипирования и тестов, но архитектуру, безопасность и надежность проверяю лично.
              </p>
            </div>
          </div>
          <div className="font-mono text-xs text-accentEmerald border border-accentEmerald/30 bg-accentEmerald/10 rounded-full px-4 py-1.5 shrink-0 self-start sm:self-auto">
            100% RELIABILITY GUARANTEE
          </div>
        </div>
      </div>
    </section>
  );
}
