"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOLUTIONS } from "./solutionsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Solutions() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Reveal section title & eyebrow when scrolled into view
      gsap.fromTo(
        ".solutions-header",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Cascade cards in on scroll
      const cards = gridRef.current?.querySelectorAll(".solution-card");
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 42, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Icons pop in with a little bounce, slightly behind each card's own entrance
      const icons = gridRef.current?.querySelectorAll(".solution-icon img");
      if (icons && icons.length) {
        gsap.fromTo(
          icons,
          { opacity: 0, scale: 0.4, rotate: -12 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.7,
            stagger: 0.07,
            delay: 0.12,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="solutions" id="solutions" ref={sectionRef}>
      <div className="section-inner">
        <div className="solutions-header">
          <h2 className="section-title center">Our Solutions</h2>
        </div>

        <div className="solutions-grid" ref={gridRef}>
          {SOLUTIONS.map((item) => (
            <div className="solution-card" key={item.slug}>
              <div className="solution-icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt="" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <Link href={`/solutions/${item.slug}`} className="card-link">
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
