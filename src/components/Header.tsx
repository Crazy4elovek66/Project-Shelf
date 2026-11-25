"use client";

import { useEffect, useState } from "react";
import { m, useAnimationControls } from "framer-motion";
import { Terminal, Send, Mail, Sparkles } from "lucide-react";
import { CONTACTS } from "@/data/contacts";
import { copyToClipboard } from "@/lib/clipboard";
import { useLanguageMode } from "@/context/LanguageModeContext";
import { useKwork } from "@/context/KworkModeContext";

export function Header() {
  const { mode, isSimple, setMode } = useLanguageMode();
  const { hideContacts } = useKwork();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("engineering");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems = isSimple
    ? [
        { label: "[/] ОБО МНЕ", href: "#engineering", id: "engineering" },
        { label: "[/] ПРОЕКТЫ", href: "#projects", id: "projects" },
        { label: "[/] ВОПРОСЫ", href: "#console", id: "console" },
        ...(!hideContacts ? [{ label: "[/] СВЯЗЬ", href: "#contacts", id: "contacts" }] : []),
      ]
    : [
        { label: "[/] СТЕК", href: "#engineering", id: "engineering" },
        { label: "[/] КЕЙСЫ", href: "#projects", id: "projects" },
        { label: "[/] AI-КОНСОЛЬ", href: "#console", id: "console" },
        ...(!hideContacts ? [{ label: "[/] КОНТАКТЫ", href: "#contacts", id: "contacts" }] : []),
      ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
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

    const sectionIds = ["engineering", "projects", "console", ...(!hideContacts ? ["contacts"] : [])];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [hideContacts]);

  const openCli = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const copyTelegram = async () => {
    const ok = await copyToClipboard(CONTACTS.telegram);
    if (ok) {
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: `Telegram ${CONTACTS.telegramHandle} скопирован в буфер!`,
        }),
      );
    }
  };

  const copyEmail = async () => {
    const ok = await copyToClipboard(CONTACTS.email);
    if (ok) {
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: `Email ${CONTACTS.email} скопирован в буфер!`,
        }),
      );
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${isScrolled ? "top-3 px-3 sm:px-4" : "top-0 px-0"
        }`}
    >
      <div
        className={`flex w-full items-center justify-between gap-2 transition-all duration-300 ${isScrolled
          ? "section-shell rounded-xl border border-white/15 bg-[#08080A]/90 px-3 sm:px-6 py-2.5 shadow-2xl backdrop-blur-2xl"
          : "section-shell border-b border-white/10 bg-[#050505]/80 px-3 sm:px-4 py-3.5 backdrop-blur-xl"
          }`}
      >
        {/* Left: Clean Text Logo without iO box + MechanicalKeycap */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-center gap-2 font-mono text-sm sm:text-base font-bold tracking-tight text-white transition-opacity hover:opacity-80"
          >
            <span>idleON</span>
            <span className="text-white/30 font-mono text-xs">{"//"}</span>
            <span className="font-mono text-xs text-white/90 font-medium">AI</span>
          </a>

          {/* Mechanical Keyboard Keycap Indicator */}
          <MechanicalKeycap />
        </div>

        {/* Center: Monochromatic Desktop Terminal Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-mono">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-lg transition-colors duration-200 ${isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="relative z-10">{item.label}</span>
                {hoveredIndex === index && (
                  <m.span
                    layoutId="navHover"
                    className="absolute inset-0 z-0 rounded-lg bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {isActive && (
                  <m.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 z-0 rounded-lg bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: CLI Launcher Button >_ CLI [ / ] + Mode Switch + Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mode Switch: ПО-ПРОСТОМУ / ДЛЯ ГИКОВ */}
          <div className="relative inline-flex h-7 items-center rounded-lg border border-white/25 bg-[#0E0E12] p-0.5 text-[10px] sm:text-[11px] font-mono select-none overflow-hidden animate-toggle-shell">
            <button
              type="button"
              onClick={() => setMode("simple")}
              className={`relative z-10 px-2 sm:px-2.5 py-0.5 font-bold transition-colors cursor-pointer rounded-md overflow-hidden ${
                isSimple ? "text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {isSimple && (
                <m.span
                  layoutId="mode-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-md bg-white shadow-sm"
                />
              )}
              {!isSimple && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-toggle-sheen z-0"
                />
              )}
              <span className="relative z-10 whitespace-nowrap">ПО-ПРОСТОМУ</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("tech")}
              className={`relative z-10 flex items-center px-2 sm:px-2.5 py-0.5 font-bold transition-colors cursor-pointer rounded-md overflow-hidden ${
                !isSimple ? "text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {!isSimple && (
                <m.span
                  layoutId="mode-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-md bg-white shadow-sm"
                />
              )}
              {isSimple && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-toggle-sheen z-0"
                />
              )}
              <span className="relative z-10 whitespace-nowrap">ДЛЯ ГИКОВ</span>
            </button>
          </div>

          {/* CLI Terminal Launcher */}
          <button
            type="button"
            onClick={openCli}
            aria-label="Открыть терминальный навигатор (нажмите / или Alt+K)"
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/[0.04] px-2.5 sm:px-3 py-1.5 text-xs font-mono text-white transition-all hover:bg-white hover:text-black hover:border-white group"
            title="Быстрый CLI-лаунчер (клавиша /)"
          >
            <span className="text-zinc-400 group-hover:text-black font-pixel text-[10px]">&gt;_</span>
            <span className="font-bold tracking-wider">CLI</span>
            <span className="rounded bg-white/10 group-hover:bg-black/10 px-1 py-0.2 text-[10px] text-zinc-300 group-hover:text-black font-mono">
              [ / ]
            </span>
          </button>

          {/* Quick Contacts Actions - Hidden in Kwork mode */}
          {!hideContacts && (
            <>
              {/* Quick Copy Telegram */}
              <button
                type="button"
                onClick={copyTelegram}
                aria-label="Скопировать контакт Telegram"
                className="grid size-7 sm:size-8 place-items-center rounded-lg border border-white/15 bg-white/[0.03] text-zinc-300 transition hover:border-white hover:text-white hover:bg-white/10"
                title="Скопировать Telegram"
              >
                <Send size={13} className="-ml-0.5" />
              </button>

              {/* Quick Copy Email */}
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Скопировать почту"
                className="hidden md:grid size-8 place-items-center rounded-lg border border-white/15 bg-white/[0.03] text-zinc-300 transition hover:border-white hover:text-white hover:bg-white/10"
                title="Скопировать Email"
              >
                <Mail size={13} />
              </button>

              {/* Direct Contact Button */}
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-mono font-bold text-black transition hover:bg-zinc-200"
              >
                <span>{isSimple ? "НАПИСАТЬ" : "СВЯЗАТЬСЯ"}</span>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// Interactive Mechanical Keycap Component with Single Press Impulse & Smooth Scroll Top
function MechanicalKeycap() {
  const keyControls = useAnimationControls();

  const triggerKeyPress = () => {
    keyControls.start({
      y: [0, 3, 0],
      scale: [1, 0.97, 1],
      transition: { duration: 0.26, times: [0, 0.45, 1], ease: "easeOut" },
    });
  };

  return (
    <m.button
      type="button"
      animate={keyControls}
      onMouseEnter={triggerKeyPress}
      onClick={() => {
        triggerKeyPress();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Наверх"
      title="Наверх"
      className="inline-flex h-7 min-w-[34px] items-center justify-center rounded-md border border-white/20 border-b-[3px] border-b-zinc-500 bg-[#121215] px-2 font-mono text-xs font-semibold tracking-tight text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors duration-150 hover:border-white/40 hover:bg-[#19191E] hover:text-white cursor-pointer select-none"
    >
      &gt;_
    </m.button>
  );
}
