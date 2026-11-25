"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CommandPaletteModal = dynamic(
  () => import("./CommandPaletteModal").then((m) => m.CommandPaletteModal),
  { ssr: false }
);

export function CommandPaletteLauncher() {
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        Boolean(target?.isContentEditable);

      if (
        (e.key === "/" && !isInput && !e.ctrlKey && !e.metaKey && !e.altKey) ||
        (e.altKey && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        setHasOpened(true);
        // Dispatch after mount if already loaded, or CommandPaletteModal opens on initialOpen
        requestAnimationFrame(() => {
          window.dispatchEvent(new CustomEvent("open-command-palette"));
        });
      }
    };

    const handleCustomOpen = () => {
      setHasOpened(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  if (!hasOpened) return null;

  return <CommandPaletteModal initialOpen />;
}
