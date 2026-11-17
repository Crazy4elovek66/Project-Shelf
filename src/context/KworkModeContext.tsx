"use client";

import { createContext, useContext, ReactNode } from "react";
import { useKworkMode } from "@/hooks/useKworkMode";

interface KworkModeContextType {
  hideContacts: boolean;
}

const KworkModeContext = createContext<KworkModeContextType>({
  hideContacts: true, // Default to true for Anti-FOUC
});

export function KworkModeProvider({ children }: { children: ReactNode }) {
  const hideContacts = useKworkMode();

  return (
    <KworkModeContext.Provider value={{ hideContacts }}>
      {children}
    </KworkModeContext.Provider>
  );
}

export function useKwork(): KworkModeContextType {
  return useContext(KworkModeContext);
}
