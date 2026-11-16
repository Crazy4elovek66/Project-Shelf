"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguageMode } from "@/context/LanguageModeContext";

export function SmoothModeText({
  children,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4";
}) {
  const { mode } = useLanguageMode();
  const Component = motion[as];

  return (
    <AnimatePresence initial={false} mode="wait">
      <Component
        key={mode}
        initial={{ opacity: 0, y: 3, filter: "blur(3px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -3, filter: "blur(3px)" }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </Component>
    </AnimatePresence>
  );
}
