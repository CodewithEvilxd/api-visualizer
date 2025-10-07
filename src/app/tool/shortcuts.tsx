"use client";

import { useEffect } from "react";

export function useToolShortcuts(actions: { beautify: () => void; copy: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMod = navigator.platform.includes("Mac") ? e.metaKey : e.ctrlKey;
      if (!isMod) return;
      if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        actions.beautify();
      }
      if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        actions.copy();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [actions]);
}


