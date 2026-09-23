"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureIcon from "./FeatureIcon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Card fan-out spacing, in px — kept in JS since the GSAP tween below
   needs the same numbers CSS uses to center each card. */
const CARD_WIDTH = 280;
const CARD_GAP = 28;
const STEP = CARD_WIDTH + CARD_GAP;

const REASONS = [
  {
    icon: "asset",
    title: "All-in-one platform",
    desc: "Payroll, compliance, onboarding, and people data live in one system instead of five disconnected tools.",
  },
  {
    icon: "check-badge",
    title: "Always audit-ready",
    desc: "Every policy, filing, and record is versioned and timestamped, so you're never scrambling before an audit.",
  },
  {
    icon: "survey",
    title: "Support that actually responds",
    desc: "A dedicated team that answers in hours, not a ticket queue that swallows your questions.",
  },
  {
    icon: "insights",
    title: "Built to scale with you",
    desc: "From your first ten hires to your thousandth, the same system keeps working — no re-platforming later.",
  },
];

/* Symmetric fan: two cards left of center, two right, evenly spaced. */
const OFFSETS = REASONS.map((_, i) => (i - (REASONS.length - 1) / 2) * STEP);

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveals normally, like every other section on the page.
      gsap.fromTo(
        ".why-choose-header",
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

      // Cards start stacked dead-center and fan out the moment the
      // section scrolls into view — a quick, fixed-duration reveal
      // (not tied to how far you scroll) so it plays out immediately
      // instead of requiring a long scroll to complete. Reverses back
      // to stacked if you scroll back up past the section, same as
      // every other reveal on the page.
      const cards = cardsRef.current?.querySelectorAll(".why-card");
      if (!cards || !cards.length) return;

      gsap.matchMedia().add("(min-width: 980px)", () => {
        gsap.fromTo(
          cards,
          { x: 0, opacity: 0, scale: 0.9 },
          {
            x: (i) => OFFSETS[i],
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="why-choose" id="why-choose" ref={sectionRef}>
      <div className="section-inner why-choose-header">
        <p className="eyebrow center">Why ZenlyHR</p>
        <h2 className="section-title center">Why choose us</h2>
      </div>

      <div className="why-choose-cards" ref={cardsRef}>
        {REASONS.map((r, i) => (
          <div
            className="why-card"
            key={r.title}
            style={{ zIndex: 10 - Math.abs(i - (REASONS.length - 1) / 2) }}
          >
            <div className="why-card-icon">
              <FeatureIcon name={r.icon} />
            </div>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
