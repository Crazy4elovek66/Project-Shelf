"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Command, X, ArrowRight, CornerDownLeft, Terminal, Send, Mail, Github, Briefcase, ExternalLink, Sparkles } from "lucide-react";
import { projects, getProjectId } from "@/data/projects";
import { CONTACTS } from "@/data/contacts";

type PaletteItem = {
  id: string;
  category: "Проекты" | "Навигация" | "Действия" | "AI-консоль";
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

  // Open / Close events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
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
  }, []);

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
      title: "Смотреть проекты (01-06)",
      subtitle: "Sticky Stacking карточки всех кейсов",
      icon: Sparkles,
      action: () => scrollTo("projects"),
    },
    {
      id: "nav-capabilities",
      category: "Навигация",
      title: "Компетенции и стек",
      subtitle: "Светлая архитектурная секция + Bento профиль",
      icon: Terminal,
      action: () => scrollTo("capabilities"),
    },
    {
      id: "nav-console",
      category: "Навигация",
      title: "AI-консоль архитектора",
      subtitle: "Интерактивный AI Twin с телеметрией",
      icon: Terminal,
      action: () => scrollTo("console"),
    },
    {
      id: "nav-process",
      category: "Навигация",
      title: "Процесс разработки",
      subtitle: "4 этапа от идеи до продакшена",
      icon: ArrowRight,
      action: () => scrollTo("process"),
    },
    {
      id: "nav-contacts",
      category: "Навигация",
      title: "Контакты для связи",
      subtitle: "Telegram, Email, GitHub, HH",
      icon: Send,
      action: () => scrollTo("contacts"),
    },

    // Projects
    ...projects.map((p, idx) => ({
      id: `proj-${p.title}`,
      category: "Проекты" as const,
      title: `0${idx + 1} // ${p.title}`,
      subtitle: p.description,
      badge: p.status,
      icon: Sparkles,
      action: () => scrollTo(getProjectId(p.title)),
    })),

    // Actions
    {
      id: "action-tg",
      category: "Действия",
      title: "Написать в Telegram",
      subtitle: CONTACTS.telegramHandle,
      badge: "Быстрый ответ",
      icon: Send,
      action: () => {
        window.open(CONTACTS.telegram, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "action-copy-tg",
      category: "Действия",
      title: "Скопировать Telegram",
      subtitle: CONTACTS.telegramHandle,
      icon: Send,
      action: () => copyText(CONTACTS.telegram, "Telegram"),
    },
    {
      id: "action-copy-email",
      category: "Действия",
      title: "Скопировать Email",
      subtitle: CONTACTS.email,
      icon: Mail,
      action: () => copyText(CONTACTS.email, "Email"),
    },
    {
      id: "action-github",
      category: "Действия",
      title: "Открыть GitHub профиль",
      subtitle: "Crazy4elovek66",
      badge: "Open Source",
      icon: Github,
      action: () => {
        window.open(CONTACTS.github, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "action-hh",
      category: "Действия",
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
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/15 bg-[#0C0D12] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#13151E]">
              <Search size={18} className="text-accentCyan shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Поиск по проектам, навыкам, консоли или контактам..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-slate-500 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
              <kbd className="hidden sm:inline-block rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center font-mono text-xs text-slate-500">
                  Ничего не найдено по запросу «{query}»
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors font-sans ${
                        isSelected
                          ? "bg-white/10 text-white"
                          : "text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg ${isSelected ? "bg-accentCyan/20 text-accentCyan" : "bg-white/5 text-slate-400"}`}>
                          <Icon size={15} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate">{item.title}</span>
                            {item.badge && (
                              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.subtitle && (
                            <p className="text-xs text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 shrink-0 ml-3">
                        <span className="text-[10px]">{item.category}</span>
                        {isSelected && <CornerDownLeft size={13} className="text-accentCyan" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Footer Hotkeys */}
            <div className="px-4 py-2.5 border-t border-white/10 bg-[#07090E] flex items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-4">
                <span>↑↓ Навигация</span>
                <span>↵ Выбрать</span>
              </div>
              <span>idleON // Command Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
