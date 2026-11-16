"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type LanguageMode = "tech" | "simple";

interface LanguageModeContextType {
  mode: LanguageMode;
  isSimple: boolean;
  toggleMode: () => void;
  setMode: (mode: LanguageMode) => void;
}

const STORAGE_KEY = "idleon-content-mode";

const LanguageModeContext = createContext<LanguageModeContextType>({
  mode: "simple",
  isSimple: true,
  toggleMode: () => {},
  setMode: () => {},
});

export function LanguageModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<LanguageMode>("simple");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "tech") {
        setModeState("tech");
      } else if (saved === "simple") {
        setModeState("simple");
      }
    } catch {
      // localStorage may fail in restricted/private browser modes
    }
  }, []);

  const setMode = (newMode: LanguageMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // ignore
    }
  };

  const toggleMode = () => {
    setMode(mode === "simple" ? "tech" : "simple");
  };

  const value: LanguageModeContextType = {
    // Both SSR and initial client render start with "simple" (zero hydration mismatch)
    mode: isMounted ? mode : "simple",
    isSimple: isMounted ? mode === "simple" : true,
    toggleMode,
    setMode,
  };

  return (
    <LanguageModeContext.Provider value={value}>
      {children}
    </LanguageModeContext.Provider>
  );
}

export function useLanguageMode() {
  const context = useContext(LanguageModeContext);
  if (!context) {
    throw new Error("useLanguageMode must be used within a LanguageModeProvider");
  }
  return context;
}
