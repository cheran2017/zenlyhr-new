"use client";

import { useEffect, useState } from "react";

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
          <a href="#" className="nav-link nav-link--active">Home</a>
          <a href="#solutions" className="nav-link" onClick={() => setOpen(false)}>Solutions</a>
          <a href="#growth" className="nav-link" onClick={() => setOpen(false)}>
            Platform
            <span className="nav-badge">Live</span>
          </a>
          <a href="#about" className="nav-link" onClick={() => setOpen(false)}>About</a>
        </nav>

        <div className="nav-actions">
          <button className="search-pill" aria-label="Search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="search-text">Search...</span>
            <kbd className="search-kbd">⌘K</kbd>
          </button>
          <a href="#" className="nav-signin">Sign in</a>
          <a href="#solutions" className="btn btn-solid btn-nav">
            Request demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
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
