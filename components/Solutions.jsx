"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* Icon art is cropped directly from the reference video's
   "Our Solutions" frame (frame_006.png) — pixel-exact match. */
const SOLUTIONS = [
  { icon: "/icons/chair.png", title: "Office & Administration", desc: "Streamline day-to-day office operations and admin workflows." },
  { icon: "/icons/shield.png", title: "Employee Engagement", desc: "Employee surveys, recognition, and culture-building tools." },
  { icon: "/icons/gradcap.png", title: "Learning & HR", desc: "Employee onboarding, training and career development." },
  { icon: "/icons/globe.png", title: "Global HR", desc: "Manage distributed teams and multi-country compliance." },
  { icon: "/icons/chair2.png", title: "Talent Acquisition", desc: "Focused sourcing, interviewing and hiring pipelines." },
  { icon: "/icons/barchart.png", title: "Payroll & Processing", desc: "Accurate, on-time payroll processing and reporting." },
  { icon: "/icons/monitor.png", title: "Accessibility", desc: "Inclusive tools that support diverse and remote teams." },
  { icon: "/icons/doc.png", title: "Compliance Design", desc: "Policy templates and audit-ready documentation." },
];

/* The reference clip shows all 8 cards at once as 2 rows of 4. */
const PAGE_SIZE = 8;
const PAGE_COUNT = Math.ceil(SOLUTIONS.length / PAGE_SIZE);

export default function Solutions() {
  const [page, setPage] = useState(0);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".solution-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" }
    );
  }, [page]);

  const items = SOLUTIONS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section className="solutions" id="solutions">
      <div className="section-inner">
        <p className="eyebrow center">What we offer</p>
        <h2 className="section-title center">Our Solutions</h2>

        <div className="solutions-grid" ref={gridRef}>
          {items.map((item) => (
            <div className="solution-card" key={item.title}>
              <div className="solution-icon">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt="" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href="#" className="card-link">
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="dots" hidden={PAGE_COUNT < 2}>
          {Array.from({ length: PAGE_COUNT }).map((_, i) => (
            <button
              key={i}
              className={i === page ? "active" : ""}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
