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
        <a href="#" className="brand">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="9" fill="#20281f" />
            <path
              d="M10 10H22L11 22H23"
              stroke="#8fae5d"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>ZenlyHR</span>
        </a>

        <nav className={`nav-links${open ? " nav-links--open" : ""}`}>
          <a href="#">Home</a>
          <a href="#solutions">Solutions</a>
          <a href="#growth">Products</a>
          <a href="#">About</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <a href="#" className="btn btn-ghost">Sign in</a>
          <a href="#" className="btn btn-solid">Sign up</a>
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
