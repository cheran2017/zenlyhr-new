"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const STATS = [
  { count: 11566, suffix: "+", label: "Production Businesses" },
  { count: 104, suffix: "+", label: "Formats & Exchanges" },
  { count: 131, suffix: "+", label: "Business Relations" },
  { count: 55, suffix: "%", label: "Satisfaction Rate" },
];

const LOGOS = ["PARTNER", "ORBIT", "REFINE", "ECOMMERCE CO", "QRA", "BAYLEY"];

export default function StatsBar() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.dataset.idx);
          const stat = STATS[idx];
          const numEl = entry.target.querySelector(".stat-num");
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.count,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              numEl.textContent = Math.round(obj.val).toLocaleString() + stat.suffix;
            },
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div
            className="stat"
            key={s.label}
            data-idx={i}
            ref={(el) => (refs.current[i] = el)}
          >
            <span className="stat-num">0</span>
            <span className="stat-label">
              {s.label}
            </span>
          </div>
        ))}

        <div className="logo-strip">
          <span className="logo-strip-label">Trusted by leading businesses</span>
          <div className="logos">
            {LOGOS.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
