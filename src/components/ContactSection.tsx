"use client";

import { useState } from "react";
import { CONTACTS, contactItems } from "@/data/contacts";
import { ArrowUpRight, Copy, Mail, Send, Github, Briefcase, Check } from "lucide-react";
import { useLanguageMode } from "@/context/LanguageModeContext";

export function ContactSection() {
  const { isSimple } = useLanguageMode();
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
    <section id="contacts" className="py-24 border-b border-white/10 relative font-mono">
      <div className="section-shell">
        {/* Main Monochromatic Container */}
        <div className="rounded-2xl border border-white/15 bg-[#09090C] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Headline & Pitch */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/[0.04] px-3 py-1 text-xs text-white mb-4">
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                <span>
                  {isSimple
                    ? "СВЯЗЬ И ЗАКАЗ // ОТКРЫТ К СОТРУДНИЧЕСТВУ"
                    : "ОТКРЫТ К СОТРУДНИЧЕСТВУ // ИНЖЕНЕРНЫМ ПРОЕКТАМ"}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                {isSimple ? "Готовы запустить ваш проект или бота?" : "Давайте соберем ваш следующий продукт"}
              </h2>

              <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                {isSimple
                  ? "Напишите мне в Telegram или на почту — обсудим вашу задачу, сроки и рассчитаем точную стоимость реализации."
                  : "Ищете Full-Stack разработчика или AI Systems инженера для создания Telegram Mini App, автоматизации видео-конвейеров или интеграции мультиагентных систем?"}
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold">✓</span>
                  <span>{isSimple ? "Ответ в течение 15 минут" : "Быстрый старт за 24ч"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold">✓</span>
                  <span>{isSimple ? "Запуск за 7-14 рабочих дней" : "Фиксированные сроки MVP (7-14д)"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold">✓</span>
                  <span>{isSimple ? "Понятный результат для бизнеса" : "Прямая связь в Telegram"}</span>
                </div>
              </div>
            </div>

            {/* Right Contact Cards Matrix */}
            <div className="lg:col-span-5 grid gap-2.5">
              {contactItems.map((contact) => {
                const isCopied = copiedKey === contact.label;
                return (
                  <div
                    key={contact.label}
                    className="group rounded-xl border border-white/10 bg-[#121215] p-3.5 flex items-center justify-between transition-all hover:border-white/30 hover:bg-[#18181D]"
                  >
                    <a
                      href={contact.href}
                      target={contact.type === "email" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 min-w-0 flex-1"
                    >
                      <div className="size-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:border-white/30 transition-colors shrink-0">
                        {contact.label.includes("Telegram") && <Send size={15} />}
                        {contact.label.includes("GitHub") && <Github size={15} />}
                        {contact.label.includes("Email") && <Mail size={15} />}
                        {contact.label.includes("HH") && <Briefcase size={15} />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {contact.label}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            {contact.badge}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 truncate mt-0.5">
                          {contact.value}
                        </p>
                      </div>
                    </a>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(contact.copyValue, contact.label)}
                        className="p-1.5 rounded border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                        title="Скопировать в буфер"
                      >
                        {isCopied ? <Check size={13} className="text-white" /> : <Copy size={13} />}
                      </button>
                      <a
                        href={contact.href}
                        target={contact.type === "email" ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="p-1.5 rounded border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                        title="Открыть ссылку"
                      >
                        <ArrowUpRight size={13} />
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
