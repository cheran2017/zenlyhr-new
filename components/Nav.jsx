"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav${scrolled ? " scrolled" : ""}`}>
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
