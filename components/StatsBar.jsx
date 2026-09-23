"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { count: 11566, suffix: "+", label: "Production Business" },
  { count: 104, suffix: "+", label: "Formats & Recharges" },
  { count: 131, suffix: "+", label: "Business Relations" },
  { count: 55, suffix: "%", label: "See Activities" },
];

const LOGOS = ["TRAIA", "Inflige!", "Refies", "Communcy", "ORA", "Boolgey"];

export default function StatsBar() {
  const refs = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tweens = [];
    const triggers = [];

    refs.current.forEach((el, idx) => {
      if (!el) return;
      const stat = STATS[idx];
      const numEl = el.querySelector(".stat-num");

      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: stat.count,
        duration: 1.6,
        ease: "power2.out",
        paused: true,
        onUpdate: () => {
          numEl.textContent = Math.round(obj.val).toLocaleString() + stat.suffix;
        },
      });
      tweens.push(tween);

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          // Scrolling down: count up fresh each time it comes into view.
          onEnter: () => tween.restart(),
          // Scrolling back up past the stats bar: reset silently while
          // off-screen so the counters replay from 0 next time.
          onLeaveBack: () => {
            tween.pause(0);
            numEl.textContent = "0" + stat.suffix;
          },
        })
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {STATS.map((s, i) => (
          <div
            className="stat"
            key={s.label}
            ref={(el) => (refs.current[i] = el)}
          >
            <span className="stat-num">0</span>
            <span className="stat-label">
              {s.label}
            </span>
          </div>
        ))}

        <div className="logo-strip">
          <span className="logo-strip-label">Proudly selected by leading businesses</span>
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
