"use client";

import { motion } from "framer-motion";
import { workSteps } from "@/data/skills";
import { Reveal } from "./Reveal";

export function WorkProcessSection() {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="section-shell">
        <Reveal>
          <div className="mb-16 max-w-3xl">
            <p className="mb-3 text-sm font-medium text-cyan-400 font-bold">Как я работаю</p>
            <h2 className="font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              От идеи до рабочей версии без лишнего шума.
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* SVG-линия соединитель на десктопе */}
          <div className="absolute top-11 left-0 right-0 hidden lg:block h-0.5 z-0">
            <svg className="w-full h-1" viewBox="0 0 1000 4" fill="none" preserveAspectRatio="none">
              <line x1="0" y1="2" x2="1000" y2="2" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              <motion.line 
                x1="0" 
                y1="2" 
                x2="1000" 
                y2="2" 
                stroke="url(#process-glow)" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="process-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f2fe" />
                  <stop offset="50%" stopColor="#9d4edd" />
                  <stop offset="100%" stopColor="#ff007f" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid gap-6 lg:grid-cols-5 relative z-10">
            {workSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.12}>
                <div className="glass-panel relative h-full rounded-3xl p-6 flex flex-col justify-start group hover:border-cyan-400/20">
                  <div className="relative mb-8 flex items-center justify-between lg:block">
                    <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/5 text-sm font-semibold text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.05)] transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_15px_rgba(0,242,254,0.15)]">
                      {index + 1}
                    </span>
                    <span className="text-slate-600 font-mono text-xs lg:hidden">Шаг 0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200 transition-colors">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="glass-panel mt-10 rounded-3xl p-6 text-base leading-8 text-slate-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="p-2 rounded-xl bg-cyan-400/10 text-cyan-400 shrink-0">
                ⚡
              </span>
              <span>
                AI-инструменты использую как ускоритель анализа, разработки и отладки, но результат
                проверяю сам: смотрю на логику, поведение, ошибки и пригодность решения для реального
                сценария.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
