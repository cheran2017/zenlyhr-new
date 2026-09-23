"use client";

import { useEffect, useState } from "react";
import { openBookDemo } from "./bookDemoEvents";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 8);

      // Hide header when scrolling down past top fold, reveal when scrolling up or at top
      if (currentScrollY <= 20) {
        setHidden(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down -> hide
        setHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> reveal
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav${scrolled ? " scrolled" : ""}${hidden ? " nav--hidden" : ""}`}>
      <div className="nav-inner">
        <a href="#" className="brand" aria-label="Zenly HR">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/client-logo.png"
            alt="Zenly HR"
            className="brand-logo"
          />
        </a>

        <nav className={`nav-links${open ? " nav-links--open" : ""}`}>
          <a href="#" className="nav-link nav-link--active has-caret">
            Home
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#solutions" className="nav-link" onClick={() => setOpen(false)}>Solutions</a>
          <a href="#growth" className="nav-link" onClick={() => setOpen(false)}>Products</a>
          <a href="#about" className="nav-link" onClick={() => setOpen(false)}>About</a>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <button type="button" className="btn btn-solid" onClick={openBookDemo}>
            Book a demo
          </button>
          <button
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
