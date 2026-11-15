"use client";

import { CONTACTS, contactItems } from "@/data/contacts";
import { ArrowUpRight, Copy, Mail, Send, Github, Briefcase, Sparkles, Check } from "lucide-react";
import { useState } from "react";

const marqueeRow1 = [
  "АВТОНОМНЫЕ AI-ПАЙПЛАЙНЫ 24/7",
  "ЧИСТАЯ АРХИТЕКТУРА & TS",
  "БЫСТРЫЙ ВЫХОД В MVP ЗА 7-14 ДНЕЙ",
  "ОТСЕВ ШУМА & ДЕДУПЛИКАЦИЯ",
  "LLM FALLBACK ROUTING БЕЗ ПАДЕНИЙ",
  "TELEGRAM MINI APPS ПОД КЛЮЧ",
  "100% ОТКРЫТЫЙ И ЧИСТЫЙ КОД",
];

const marqueeRow2 = [
  "COMPUTER VISION & MEDIAPIPE FACE MESH",
  "NEXT.JS 15 APP ROUTER & REACT 19",
  "SUPABASE POSTGRESQL & EDGE FUNCTIONS",
  "АППАРАТНЫЙ РЕНДЕР FFMPEG NVENC",
  "ОТВЕТ В TELEGRAM ЗА 15 МИНУТ",
  "ИНТЕГРАЦИЯ ПЛАТЕЖЕЙ & WEBHOOKS",
];

export function ContactSection() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2500);

    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: `${label} скопирован в буфер обмена!`,
      }),
    );
  };

  return (
    <section id="contacts" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-accentCyan/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* DUAL KINETIC MARQUEE BANNER */}
      <div className="w-full mb-20 space-y-3 overflow-hidden select-none border-y border-white/10 py-5 bg-[#07090E]">
        {/* Row 1: Leftward infinite marquee */}
        <div className="marquee-track flex w-max gap-8 animate-marquee-left">
          {[...marqueeRow1, ...marqueeRow1].map((text, idx) => (
            <div key={idx} className="flex items-center gap-6 font-mono text-xs font-bold text-slate-300">
              <span className="hover:text-accentCyan transition-colors">{text}</span>
              <span className="text-accentCyan/40 text-[10px]">✦</span>
            </div>
          ))}
        </div>

        {/* Row 2: Rightward infinite marquee */}
        <div className="marquee-track flex w-max gap-8 animate-marquee-right">
          {[...marqueeRow2, ...marqueeRow2].map((text, idx) => (
            <div key={idx} className="flex items-center gap-6 font-mono text-xs font-semibold text-slate-400">
              <span className="hover:text-accentEmerald transition-colors">{text}</span>
              <span className="text-accentEmerald/40 text-[10px]">■</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-shell">
        {/* Main CTA Container */}
        <div className="rounded-3xl border border-white/10 bg-[#0C0D12] p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          {/* Decorative Corner Accents */}
          <div className="absolute -top-24 -right-24 size-80 rounded-full bg-accentCyan/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-accentViolet/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Headline & Pitch */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-accentEmerald/30 bg-accentEmerald/10 px-3.5 py-1 text-xs font-mono text-accentEmerald mb-4">
                <span className="size-2 rounded-full bg-accentEmerald animate-pulse shadow-[0_0_8px_#10b981]" />
                <span>ОТКРЫТ К СОТРУДНИЧЕСТВУ // ИНЖЕНЕРНЫМ ПРОЕКТАМ</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                Давайте соберем ваш следующий продукт
              </h2>

              <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-xl">
                Ищете Full-Stack разработчика или AI Systems инженера для создания Telegram Mini App, автоматизации видео-конвейеров или интеграции мультиагентных систем?
              </p>

              <div className="mt-6 flex flex-wrap gap-4 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-accentCyan font-bold">✓</span>
                  <span>Быстрый старт за 24ч</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-accentCyan font-bold">✓</span>
                  <span>Фиксированные сроки MVP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-accentCyan font-bold">✓</span>
                  <span>Прямая связь в Telegram</span>
                </div>
              </div>
            </div>

            {/* Right Contact Cards Matrix */}
            <div className="lg:col-span-5 grid gap-3">
              {contactItems.map((contact) => {
                const isCopied = copiedKey === contact.label;
                return (
                  <div
                    key={contact.label}
                    className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center justify-between transition-all hover:border-accentCyan/40 hover:bg-white/[0.05]"
                  >
                    <a
                      href={contact.href}
                      target={contact.type === "email" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 min-w-0 flex-1"
                    >
                      <div className="size-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-300 group-hover:text-accentCyan group-hover:border-accentCyan/40 transition-colors shrink-0">
                        {contact.label.includes("Telegram") && <Send size={16} />}
                        {contact.label.includes("GitHub") && <Github size={16} />}
                        {contact.label.includes("Email") && <Mail size={16} />}
                        {contact.label.includes("HH") && <Briefcase size={16} />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm font-semibold text-white">
                            {contact.label}
                          </span>
                          <span className="font-mono text-[10px] text-accentCyan">
                            {contact.badge}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-slate-400 truncate mt-0.5">
                          {contact.value}
                        </p>
                      </div>
                    </a>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(contact.copyValue, contact.label)}
                        className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:border-accentCyan/30 transition-colors"
                        title="Скопировать в буфер"
                      >
                        {isCopied ? <Check size={14} className="text-accentEmerald" /> : <Copy size={14} />}
                      </button>
                      <a
                        href={contact.href}
                        target={contact.type === "email" ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:border-accentCyan/30 transition-colors"
                        title="Открыть ссылку"
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
