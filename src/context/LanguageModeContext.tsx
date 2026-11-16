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
  mode: "tech",
  isSimple: false,
  toggleMode: () => {},
  setMode: () => {},
});

export function LanguageModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<LanguageMode>("tech");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "simple" || saved === "tech") {
        setModeState(saved);
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
    setMode(mode === "tech" ? "simple" : "tech");
  };

  const value: LanguageModeContextType = {
    // Before mounting on the client, always use "tech" to ensure 100% hydration match with SSR
    mode: isMounted ? mode : "tech",
    isSimple: isMounted && mode === "simple",
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
