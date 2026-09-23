"use client";

import { useEffect, useState } from "react";
import { getTheme, toggleTheme, THEME_CHANGE_EVENT } from "./theme";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState("light");

  useEffect(() => {
    setThemeState(getTheme());
    setMounted(true);

    const onChange = (e) => setThemeState(e.detail.theme);
    window.addEventListener(THEME_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setThemeState(toggleTheme())}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
