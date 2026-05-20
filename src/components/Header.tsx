"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { CONTACTS } from "@/data/contacts";

const navItems = [
  { label: "Проекты", href: "#projects" },
  { label: "Навыки", href: "#skills" },
  { label: "Подход", href: "#process" },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    const sections = ["projects", "skills", "process", "contacts"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ${
        isScrolled
          ? "top-3 px-4"
          : "top-0 px-0"
      }`}
    >
      <div
        className={`flex w-full items-center justify-between transition-all duration-500 ${
          isScrolled
            ? "section-shell rounded-full border border-white/10 bg-[#070a13]/45 px-6 py-2 shadow-2xl backdrop-blur-xl"
            : "section-shell border-b border-white/10 bg-graphite/70 px-4 py-4 backdrop-blur-2xl"
        }`}
      >
        <a href="#top" className="font-display text-lg font-semibold tracking-normal text-pearl">
          Project Shelf
        </a>
        <nav className="hidden items-center gap-1 text-sm text-slate-300 md:flex">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 transition-colors duration-300 ${
                  isActive ? "text-white font-medium" : "hover:text-white"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="relative z-10">{item.label}</span>
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 z-0 rounded-full bg-white/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute bottom-0 inset-x-4 h-[2px] bg-cyan-200"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
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
            aria-label="Скопировать email"
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
