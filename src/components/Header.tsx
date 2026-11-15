"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Mail, Send, Sparkles } from "lucide-react";
import { CONTACTS } from "@/data/contacts";

const navItems = [
  { label: "Кейсы", href: "#projects", id: "projects" },
  { label: "Компетенции", href: "#capabilities", id: "capabilities" },
  { label: "AI-консоль", href: "#console", id: "console" },
  { label: "Процесс", href: "#process", id: "process" },
  { label: "Контакты", href: "#contacts", id: "contacts" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("projects");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sectionIds = ["projects", "capabilities", "console", "process", "contacts"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const copyTelegram = () => {
    navigator.clipboard.writeText(CONTACTS.telegram);
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: `Telegram ${CONTACTS.telegramHandle} скопирован в буфер!`,
      }),
    );
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACTS.email);
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: `Email ${CONTACTS.email} скопирован в буфер!`,
      }),
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-300 ${
        isScrolled ? "top-3 px-3 sm:px-4" : "top-0 px-0"
      }`}
    >
      <div
        className={`flex w-full items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "section-shell rounded-full border border-white/10 bg-[#0C0D12]/85 px-4 sm:px-6 py-2.5 shadow-dock backdrop-blur-2xl"
            : "section-shell border-b border-white/10 bg-[#050507]/80 px-4 py-3.5 backdrop-blur-xl"
        }`}
      >
        {/* Left: Brand Monogram & Live Status Indicator */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-display text-sm sm:text-base font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <div className="flex size-7 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-accentCyan group-hover:border-accentCyan/50 transition-colors">
            <span className="font-mono text-xs font-black">iO</span>
          </div>
          <div className="flex items-center gap-2">
            <span>idleON</span>
            <span className="text-white/20 font-mono text-xs">{"//"}</span>
            <span className="font-mono text-xs text-accentCyan font-medium">AI</span>
          </div>
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accentEmerald opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accentEmerald" />
          </span>
        </a>

        {/* Center: Desktop Navigation Dock */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-mono">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 ${
                  isActive ? "text-white font-semibold" : "text-slate-400 hover:text-white"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="relative z-10">{item.label}</span>
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 z-0 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 z-0 rounded-full bg-white/10 border border-white/15 shadow-[0_0_12px_rgba(255,255,255,0.06)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Quick actions & Palette */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Palette Trigger Ctrl+K */}
          <button
            type="button"
            onClick={openPalette}
            aria-label="Открыть командную палитру (Ctrl+K)"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 sm:px-3 py-1.5 text-xs font-mono text-slate-300 transition-all hover:border-accentCyan/40 hover:text-white hover:bg-white/[0.08]"
          >
            <Command size={13} className="text-accentCyan" />
            <span className="hidden sm:inline">Палитра</span>
            <kbd className="hidden md:inline rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-slate-400 font-sans">
              ⌘K
            </kbd>
          </button>

          {/* Quick Copy Telegram */}
          <button
            type="button"
            onClick={copyTelegram}
            aria-label="Скопировать контакт Telegram"
            className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-accentCyan/40 hover:text-white hover:bg-white/[0.08]"
            title="Скопировать Telegram"
          >
            <Send size={13} className="-ml-0.5" />
          </button>

          {/* Quick Copy Email */}
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Скопировать почту"
            className="hidden sm:grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-accentCyan/40 hover:text-white hover:bg-white/[0.08]"
            title="Скопировать Email"
          >
            <Mail size={13} />
          </button>

          {/* CTA Button */}
          <a
            href={CONTACTS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-accentCyan shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            <Sparkles size={12} />
            <span>Обсудить</span>
          </a>
        </div>
      </div>
    </header>
  );
}
