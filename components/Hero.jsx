"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import StatsBar from "./StatsBar";
import HeroMonument from "./HeroMonument";

export default function Hero() {
  const breadcrumbRef = useRef(null);
  const lineRefs = useRef([]);
  const subRef = useRef(null);
  const ctasRef = useRef(null);

  /* Entrance choreography timed off the reference video's first ~1s:
     the headline lines cascade in one after another, then the subtext
     and CTAs. The monument is deliberately NOT faded in here — in the
     clip the Z is already standing at frame zero and only the copy and
     the chips animate on. Its orbit, chip entrance and plinth bloom are
     driven inside HeroMonument off the render clock. */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(breadcrumbRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power1.out" }, 0)
      .fromTo(lineRefs.current[0], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
      .fromTo(lineRefs.current[1], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.15)
      .fromTo(lineRefs.current[2], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.3)
      .fromTo(subRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.38)
      .fromTo(ctasRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" }, 0.42);

    return () => tl.kill();
  }, []);

  return (
    <section className="hero">
      {/* Backdrop is the photographed lobby, deliberately soft — the
          monument in front of it is real geometry, so the depth-of-field
          split reads as intentional and keeps the subject the only
          sharp thing in frame. */}
      <div className="hero-stage">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-scene.png" alt="" aria-hidden="true" />
        </div>

        <div className="hero-monument">
          <HeroMonument />
        </div>

        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow" ref={breadcrumbRef}>
              People <span>›</span> Confidence <span>›</span> Details
            </p>
            <h1 className="hero-title">
              <span className="title-line" ref={(el) => (lineRefs.current[0] = el)}>HR, Simplified.</span>
              <span className="title-line" ref={(el) => (lineRefs.current[1] = el)}>People, Empowered.</span>
              <span className="title-line accent" ref={(el) => (lineRefs.current[2] = el)}>A Brighter Tomorrow.</span>
            </h1>
            <p className="hero-sub" ref={subRef}>
              ZenlyHR brings timeless and central HR solutions
              together — unifying people, payroll and compliance into one
              confident, connected experience your whole organization can
              rely on.
            </p>
            <div className="hero-ctas" ref={ctasRef}>
              <a href="#" className="btn btn-solid btn-lg">
                Request a demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button className="btn btn-play">
                <span className="play-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                Watch overview
              </button>
            </div>
          </div>
        </div>
      </div>

      <StatsBar />
    </section>
  );
}
