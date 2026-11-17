"use client";

import { useEffect, useState } from "react";

export const KWORK_STORAGE_KEY = "idleon_kwork_mode";

export function useKworkMode(): boolean {
  // Default to true so contacts NEVER flash on SSR or initial hydration (Anti-FOUC)
  const [hideContacts, setHideContacts] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const url = new URL(window.location.href);
      const refParam = url.searchParams.get("ref")?.toLowerCase();

      if (refParam === "reset") {
        window.localStorage.removeItem(KWORK_STORAGE_KEY);
        url.searchParams.delete("ref");
        const cleanResetUrl = `${url.pathname}${url.search}${url.hash}`;
        window.history.replaceState({}, document.title, cleanResetUrl);
        setHideContacts(false);
        return;
      }

      const isKworkRef = refParam === "kwork";
      const isPersisted = window.localStorage.getItem(KWORK_STORAGE_KEY) === "true";

      if (isKworkRef || isPersisted) {
        window.localStorage.setItem(KWORK_STORAGE_KEY, "true");
        setHideContacts(true);

        if (isKworkRef) {
          url.searchParams.delete("ref");
          const cleanUrl = `${url.pathname}${url.search}${url.hash}`;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      } else {
        setHideContacts(false);
      }
    } catch {
      // Fallback: if localStorage is restricted
      setHideContacts(false);
    }
  }, []);

  return hideContacts;
}
