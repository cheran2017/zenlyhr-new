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
  const pinWrapperRef = useRef(null);
  const stageRef = useRef(null);
  const visualRef = useRef(null);
  const copyRef = useRef(null);
  const statsRef = useRef(null);

  const breadcrumbRef = useRef(null);
  const lineRefs = useRef([]);
  const subRef = useRef(null);
  const ctasRef = useRef(null);

  useEffect(() => {
    // 1. Entrance choreography on page load
    const entranceTl = gsap.timeline({ delay: 0.1 });

    entranceTl
      .fromTo(breadcrumbRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" }, 0)
      .fromTo(lineRefs.current[0], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.05)
      .fromTo(lineRefs.current[1], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.2)
      .fromTo(lineRefs.current[2], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.35)
      .fromTo(subRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }, 0.42)
      .fromTo(ctasRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" }, 0.48);

    // 2. GSAP ScrollTrigger sequence: focus to Z monument before moving to solutions
    const isMobile = window.matchMedia("(max-width: 980px)").matches;
    let scrollTl = null;

    if (!isMobile && pinWrapperRef.current && visualRef.current && copyRef.current) {
      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        // Phase 1: Left-hand copy and stats smoothly fade out
        .to(
          copyRef.current,
          {
            opacity: 0,
            x: -75,
            filter: "blur(4px)",
            ease: "power2.inOut",
            duration: 0.35,
          },
          0
        )
        .to(
          statsRef.current,
          {
            opacity: 0,
            y: 35,
            ease: "power2.inOut",
            duration: 0.28,
          },
          0
        )
        // Phase 2: Visual stage zooms in and shifts to center on the 3D Z monument
        .to(
          visualRef.current,
          {
            scale: 1.68,
            xPercent: -17,
            yPercent: 3,
            ease: "power2.inOut",
            duration: 0.65,
          },
          0
        )
        // Phase 3: Hold the centered Z view so the user appreciates the 3D showcase
        .to({}, { duration: 0.35 });
    }

    return () => {
      entranceTl.kill();
      scrollTl?.scrollTrigger?.kill();
      scrollTl?.kill();
    };
  }, []);

  return (
    <div className="hero-pinned-wrap" ref={pinWrapperRef}>
      <section className="hero">
        <div className="hero-stage" ref={stageRef}>
          {/* Native studio background effect — ambient radial glow, studio lighting & floor lines */}
          <div className="hero-native-bg">
            <div className="native-bg-glow" />
            <div className="native-bg-beam" />
            <div className="native-bg-grid" />
            <div className="native-bg-floor" />
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
      </section>
    </div>
  );
}
