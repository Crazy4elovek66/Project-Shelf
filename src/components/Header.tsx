"use client";

import { Mail, Send } from "lucide-react";
import { CONTACTS } from "@/data/contacts";

const navItems = [
  { label: "Проекты", href: "#projects" },
  { label: "Навыки", href: "#skills" },
  { label: "Подход", href: "#process" },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-graphite/70 backdrop-blur-2xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold tracking-normal text-pearl">
          Project Shelf
        </a>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            aria-label="Открыть Telegram"
            href={CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-slate-200 transition hover:border-cyan-200/40 hover:text-white"
          >
            <Send size={18} className="-ml-0.5 mt-0.5" />
          </a>
          <button
            type="button"
            aria-label="Написать на почту"
            onClick={() => {
              navigator.clipboard.writeText(CONTACTS.email);
              window.dispatchEvent(
                new CustomEvent("show-toast", {
                  detail: `Email ${CONTACTS.email} скопирован!`,
                }),
              );
            }}
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-slate-200 transition hover:border-cyan-200/40 hover:text-white"
          >
            <Mail size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
