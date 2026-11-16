"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, CornerDownLeft, Terminal, Send, Mail, Github, Briefcase, Sparkles, Layers } from "lucide-react";
import { projects, getProjectId } from "@/data/projects";
import { CONTACTS } from "@/data/contacts";

type PaletteItem = {
  id: string;
  category: "Проекты" | "Навигация" | "Команды";
  code?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon: typeof Search;
  action: () => void;
};

export function CommandPaletteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Key listeners: Slash (/), Alt+K, and CustomEvent "open-command-palette"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is already typing in an input/textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      // Open on '/' (when not in an input)
      if (e.key === "/" && !isInput && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Open on Alt+K
      if (e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Close on Escape
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: `${label} скопирован в буфер!`,
      }),
    );
  };

  // Build items list
  const allItems: PaletteItem[] = [
    // Navigation
    {
      id: "nav-projects",
      category: "Навигация",
      code: "NAV_01",
      title: "Проекты и реализации",
      subtitle: "Оболочка AI Architect Terminal с 6 проектами",
      icon: Layers,
      action: () => scrollTo("projects"),
    },
    {
      id: "nav-engineering",
      category: "Навигация",
      code: "NAV_02",
      title: "Инженерная база и стек",
      subtitle: "Видео-портрет, направления и фильтруемый стек",
      icon: Terminal,
      action: () => scrollTo("engineering"),
    },
    {
      id: "nav-console",
      category: "Навигация",
      code: "NAV_03",
      title: "AI-консоль архитектора",
      subtitle: "Интерактивный симулятор архитектурных решений",
      icon: Sparkles,
      action: () => scrollTo("console"),
    },
    {
      id: "nav-contacts",
      category: "Навигация",
      code: "NAV_04",
      title: "Контакты для связи",
      subtitle: "Telegram, Email, GitHub, резюме",
      icon: Send,
      action: () => scrollTo("contacts"),
    },

    // Projects
    ...projects.map((p, idx) => ({
      id: `proj-${p.title}`,
      category: "Проекты" as const,
      code: `0${idx + 1}`,
      title: p.title,
      subtitle: p.description,
      badge: p.status,
      icon: Terminal,
      action: () => {
        scrollTo("projects");
        window.dispatchEvent(new CustomEvent("select-project-tab", { detail: idx }));
      },
    })),

    // Commands
    {
      id: "cmd-tg",
      category: "Команды",
      code: "EXEC",
      title: "Написать в Telegram",
      subtitle: CONTACTS.telegramHandle,
      badge: "< 15 мин",
      icon: Send,
      action: () => {
        window.open(CONTACTS.telegram, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "cmd-copy-tg",
      category: "Команды",
      code: "CLIP",
      title: "Скопировать Telegram",
      subtitle: CONTACTS.telegramHandle,
      icon: Send,
      action: () => copyText(CONTACTS.telegram, "Telegram"),
    },
    {
      id: "cmd-copy-email",
      category: "Команды",
      code: "CLIP",
      title: "Скопировать Email",
      subtitle: CONTACTS.email,
      icon: Mail,
      action: () => copyText(CONTACTS.email, "Email"),
    },
    {
      id: "cmd-github",
      category: "Команды",
      code: "HTTP",
      title: "Открыть GitHub профиль",
      subtitle: "Crazy4elovek66 // Все открытые исходники",
      badge: "Open Source",
      icon: Github,
      action: () => {
        window.open(CONTACTS.github, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "cmd-hh",
      category: "Команды",
      code: "HTTP",
      title: "Открыть резюме на HeadHunter",
      subtitle: "Подробный опыт и образование",
      icon: Briefcase,
      action: () => {
        window.open(CONTACTS.hh_resume, "_blank");
        setIsOpen(false);
      },
    },
  ];

  // Filtering
  const filteredItems = query.trim()
    ? allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
        item.category.toLowerCase().includes(query.toLowerCase()),
    )
    : allItems;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Dialog Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-2xl rounded-xl border border-white/20 bg-[#0B0B0D] shadow-2xl overflow-hidden flex flex-col font-mono"
          >
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#121215] text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="ml-2 font-bold text-white tracking-wider">&gt;_ CLI NAVIGATOR // IDLEON</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                <span>[ / ] ИЛИ [ Alt+K ]</span>
                <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-zinc-300">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Terminal Prompt Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#070709]">
              <span className="text-white font-bold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ввод команды или поиск по проектам, навыкам, контактам..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-600 focus:outline-none font-mono"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-zinc-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-500 font-mono">
                  [!] Команда или проект «{query}» не найдены в индексе
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors font-mono ${isSelected
                        ? "bg-white text-black"
                        : "text-zinc-300 hover:bg-white/[0.04]"
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.code && (
                          <span
                            className={`text-xs font-bold px-1.5 py-0.5 rounded ${isSelected
                              ? "bg-black text-white"
                              : "bg-white/10 text-zinc-400"
                              }`}
                          >
                            {item.code}
                          </span>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm truncate">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span
                                className={`rounded px-1.5 py-0.2 text-[9px] uppercase ${isSelected
                                  ? "bg-black/20 text-black font-bold"
                                  : "border border-white/15 text-zinc-400"
                                  }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p
                              className={`text-[11px] truncate mt-0.5 ${isSelected ? "text-zinc-700" : "text-zinc-500"
                                }`}
                            >
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs shrink-0 ml-3">
                        <span
                          className={`text-[10px] uppercase ${isSelected ? "text-zinc-700" : "text-zinc-600"
                            }`}
                        >
                          {item.category}
                        </span>
                        {isSelected && <CornerDownLeft size={13} className="text-black" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Terminal Window Footer */}
            <div className="px-4 py-2 border-t border-white/10 bg-[#070709] flex items-center justify-between text-[11px] text-zinc-500">
              <div className="flex items-center gap-4">
                <span>[↑↓] ВЫБОР</span>
                <span>[ENTER] ЗАПУСК</span>
                <span>[ESC] ВЫХОД</span>
              </div>
              <span className="text-zinc-600">IDLEON_CLI_OS v3.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
