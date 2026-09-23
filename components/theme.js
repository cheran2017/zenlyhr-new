export const THEME_STORAGE_KEY = "zenlyhr-theme";
export const THEME_CHANGE_EVENT = "zenlyhr-theme-change";

export function getTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") || "light";
}

export function setTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (private mode, disabled storage) — theme just won't persist
  }
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }));
}

export function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/* Reads a CSS custom property's *current* value — i.e. whichever theme
   is active right now — so canvas-based rendering (Chart.js, the hero's
   WebGL scene) can match the page instead of being stuck with whatever
   was hardcoded at mount time. */
export function readCSSVar(name) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
