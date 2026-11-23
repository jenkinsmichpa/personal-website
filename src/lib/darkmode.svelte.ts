import type { Attachment } from "svelte/attachments";
import { MediaQuery } from "svelte/reactivity";

type ThemeMode = "dark" | "light";

let systemDark: MediaQuery | undefined;

function systemPrefersDark(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  systemDark ??= new MediaQuery("(prefers-color-scheme: dark)");
  return systemDark.current;
}

function readStoredTheme(): ThemeMode | null {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

function writeStoredTheme(value: ThemeMode): void {
  try {
    localStorage.setItem("theme", value);
  } catch {
    return;
  }
}

function applyTheme(dark: boolean): void {
  if (typeof document === "undefined") {
    return;
  }
  const mode: ThemeMode = dark ? "dark" : "light";
  document.documentElement.dataset.mode = mode;
  document.documentElement.style.colorScheme = mode;
}

class ThemeStore {
  stored = $state<ThemeMode | null>(null);

  get isDark(): boolean {
    if (this.stored) {
      return this.stored === "dark";
    }
    return systemPrefersDark();
  }
}

export const theme = new ThemeStore();

export function initTheme(): void {
  if (typeof window === "undefined") {
    return;
  }
  theme.stored = readStoredTheme();
  applyTheme(theme.isDark);
}

export function themeAttachment(dark: boolean): Attachment {
  return () => {
    applyTheme(dark);
  };
}

export function toggleTheme(): void {
  theme.stored = theme.isDark ? "light" : "dark";
  writeStoredTheme(theme.stored);
}
