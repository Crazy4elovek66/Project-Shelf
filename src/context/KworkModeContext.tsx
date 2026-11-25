"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useKworkMode } from "@/hooks/useKworkMode";

interface KworkModeContextType {
  hideContacts: boolean;
}

const KworkModeContext = createContext<KworkModeContextType>({
  hideContacts: true, // Default to true for Anti-FOUC
});

export function KworkModeProvider({ children }: { children: ReactNode }) {
  const hideContacts = useKworkMode();
  const value = useMemo(() => ({ hideContacts }), [hideContacts]);

  return (
    <KworkModeContext.Provider value={value}>
      {children}
    </KworkModeContext.Provider>
  );
}

export function useKwork(): KworkModeContextType {
  return useContext(KworkModeContext);
}
