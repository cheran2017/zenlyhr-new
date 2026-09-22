"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsBar from "./StatsBar";
import HeroMonument from "./HeroMonument";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef(null);
  const visualRef = useRef(null);
  const burstRef = useRef(null);
  const copyRef = useRef(null);
  const statsRef = useRef(null);

  const breadcrumbRef = useRef(null);
  const lineRefs = useRef([]);
  const subRef = useRef(null);
  const ctasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Entrance choreography on page load
      const entranceTl = gsap.timeline({ delay: 0.05 });

      if (breadcrumbRef.current) {
        entranceTl.fromTo(breadcrumbRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }, 0);
      }
      lineRefs.current.forEach((el, i) => {
        if (el) {
          entranceTl.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.05 + i * 0.12);
        }
      });
      if (subRef.current) {
        entranceTl.fromTo(subRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" }, 0.35);
      }
      if (ctasRef.current) {
        entranceTl.fromTo(ctasRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }, 0.42);
      }

      // 2. GSAP ScrollTrigger sequence: focus to Z monument and flare pedestal glow before moving to solutions
      const isMobile = window.matchMedia("(max-width: 980px)").matches;

      if (!isMobile && containerRef.current && visualRef.current && copyRef.current) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        scrollTl
          // Phase 1: Left-hand copy and stats smoothly fade out
          .to(
            copyRef.current,
            {
              opacity: 0,
              x: -70,
              filter: "blur(5px)",
              ease: "power1.inOut",
              duration: 0.35,
            },
            0
          )
          .to(
            statsRef.current,
            {
              opacity: 0,
              y: 35,
              ease: "power1.inOut",
              duration: 0.28,
            },
            0
          )
          // Phase 2: Radiant pedestal light glow flares open behind the 3D Z
          .to(
            burstRef.current,
            {
              scale: 1.55,
              opacity: 1,
              xPercent: -24.5,
              filter: "brightness(1.3)",
              ease: "power2.out",
              duration: 0.65,
            },
            0
          )
          // Phase 3: Visual stage zooms in and centers cleanly on the 3D Z monument with generous top headroom
          .to(
            visualRef.current,
            {
              scale: 1.34,
              xPercent: -24.5,
              yPercent: 7,
              ease: "power1.inOut",
              duration: 0.65,
            },
            0
          )
          // Phase 4: Hold the centered Z view so the user appreciates the 3D showcase
          .to({}, { duration: 0.35 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-scroll-container" ref={containerRef}>
      <div className="hero-sticky-frame">
        <div className="hero-stage">
          {/* Native studio background effect — ambient radial glow, grid & floor lines */}
          <div className="hero-native-bg">
            <div className="native-bg-glow" />
            <div className="native-bg-grid" />
            <div className="native-bg-floor" />
          </div>

          {/* Pedestal volumetric glow burst — animates and flares during Z zoom */}
          <div className="hero-pedestal-burst" ref={burstRef}>
            <div className="burst-core" />
            <div className="burst-rays" />
            <div className="burst-ambient" />
          </div>

          {/* Scalable visual container holding the 3D monument */}
          <div className="hero-visual" ref={visualRef}>
            <div className="hero-monument">
              <HeroMonument />
            </div>
          </div>

          <div className="hero-inner">
            <div className="hero-copy" ref={copyRef}>
              <p className="eyebrow" ref={breadcrumbRef}>
                People <span>›</span> Confidence <span>›</span> Details
              </p>
              <h1 className="hero-title">
                <span className="title-line" ref={(el) => (lineRefs.current[0] = el)}>
                  HR, Simplified.
                </span>
                <span className="title-line" ref={(el) => (lineRefs.current[1] = el)}>
                  People, Empowered.
                </span>
                <span className="title-line accent" ref={(el) => (lineRefs.current[2] = el)}>
                  A Brighter Tomorrow.
                </span>
              </h1>
              <p className="hero-sub" ref={subRef}>
                ZenlyHR brings timeless and central HR solutions together — unifying
                people, payroll and compliance into one confident, connected experience
                your whole organization can rely on.
              </p>
              <div className="hero-ctas" ref={ctasRef}>
                <a href="#solutions" className="btn btn-solid btn-lg">
                  Request a demo
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <button className="btn btn-play">
                  <span className="play-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  Watch overview
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-stats-wrap" ref={statsRef}>
          <StatsBar />
        </div>
      </div>
    </div>
  );
}
