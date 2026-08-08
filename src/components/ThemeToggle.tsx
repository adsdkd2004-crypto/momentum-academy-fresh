"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("ma-theme");
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ma-theme", next ? "dark" : "light");
  };

  if (!mounted) return <div className="h-10 w-10" />;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-700/15 text-navy-700 transition hover:bg-navy-50 dark:border-white/15 dark:text-paper dark:hover:bg-white/10"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
