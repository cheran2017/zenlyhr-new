"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Chart from "chart.js/auto";
import { readCSSVar, THEME_CHANGE_EVENT } from "./theme";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LABELS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const DATA = [10, 22, 18, 30, 45, 38, 52, 60, 55, 70, 82, 90];

const GROWTH_PERCENT = 32;

/* Chart.js paints to a canvas, so its colors are plain JS strings, not
   CSS — they don't inherit the page's light/dark variables for free.
   Reading the current custom properties here (and again on every theme
   change) keeps the chart in sync instead of staying stuck with
   whichever theme was active when it first mounted. */
function chartThemeColors() {
  const teal = readCSSVar("--teal") || "#008080";
  const tealRgb = readCSSVar("--teal-rgb") || "0, 128, 128";
  const surface = readCSSVar("--surface") || "#ffffff";
  const line = readCSSVar("--line") || "#e2e8f0";
  const muted = readCSSVar("--text-muted") || "#64748b";
  return { teal, tealRgb, surface, line, muted };
}

function applyChartTheme(chart) {
  if (!chart) return;
  const { teal, tealRgb, surface, line, muted } = chartThemeColors();
  const dataset = chart.data.datasets[0];
  dataset.borderColor = teal;
  dataset.pointBorderColor = teal;
  dataset.pointBackgroundColor = surface;
  dataset.backgroundColor = (ctx) => {
    const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220);
    g.addColorStop(0, `rgba(${tealRgb}, 0.28)`);
    g.addColorStop(1, `rgba(${tealRgb}, 0)`);
    return g;
  };
  chart.options.scales.y.grid.color = line;
  chart.options.scales.y.ticks.color = muted;
  chart.options.scales.x.ticks.color = muted;
  chart.update();
}

export default function Growth() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const visualRef = useRef(null);
  const chartBadgeRef = useRef(null);
  const floatValueRef = useRef(null);
  const floatProgressRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const { teal, tealRgb, surface, line, muted } = chartThemeColors();
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: LABELS,
        datasets: [
          {
            label: "Employee engagement",
            data: DATA,
            borderColor: teal,
            backgroundColor: (ctx) => {
              const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220);
              g.addColorStop(0, `rgba(${tealRgb}, 0.28)`);
              g.addColorStop(1, `rgba(${tealRgb}, 0)`);
              return g;
            },
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: surface,
            pointBorderColor: teal,
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 150,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: line }, ticks: { color: muted } },
          x: { grid: { display: false }, ticks: { color: muted } },
        },
        animation: { duration: 1200, easing: "easeOutQuart" },
      },
    });

    const onThemeChange = () => applyChartTheme(chartRef.current);
    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
      chartRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal the copy column line by line as the section scrolls into view
      gsap.fromTo(
        ".growth-copy > *",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Reveal the photo, slightly behind the copy
      gsap.fromTo(
        ".photo-frame",
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!visualRef.current) return;
    const els = visualRef.current.querySelectorAll(".float-card, .float-icon");
    const floatingTweens = [];

    const countUp = (el) => {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: GROWTH_PERCENT,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `+${Math.round(obj.val)}%`;
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            onComplete: () => {
              const card = visualRef.current?.querySelector(".float-card");
              const bulb = visualRef.current?.querySelector(".float-icon--bulb");
              const bars = visualRef.current?.querySelector(".float-icon--bars");

              if (card) {
                floatingTweens.push(
                  gsap.to(card, {
                    y: -8,
                    duration: 2.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                  })
                );
              }
              if (bulb) {
                floatingTweens.push(
                  gsap.to(bulb, {
                    y: -10,
                    duration: 2.4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 0.2,
                  })
                );
              }
              if (bars) {
                floatingTweens.push(
                  gsap.to(bars, {
                    y: 7,
                    duration: 3.1,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 0.4,
                  })
                );
              }
            },
          });
          countUp(chartBadgeRef.current);
          countUp(floatValueRef.current);
          if (floatProgressRef.current) {
            gsap.fromTo(
              floatProgressRef.current,
              { width: "0%" },
              { width: "64%", duration: 1.5, ease: "power2.out" }
            );
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(visualRef.current);
    return () => {
      observer.disconnect();
      floatingTweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="growth" id="growth" ref={sectionRef}>
      <div className="section-inner growth-grid">
        <div className="growth-copy">
          <p className="eyebrow">Continuous Growth</p>
          <h2 className="section-title">Continuous Growth</h2>
          <p className="growth-sub">
            See how employee engagement compounds over time as
            teams adopt ZenlyHR — track the metrics that matter, month over
            month.
          </p>

          <div className="chart-card">
            <div className="chart-canvas-wrap">
              <canvas ref={canvasRef}></canvas>
            </div>
            <div className="chart-badge" ref={chartBadgeRef}>+0%</div>
          </div>

          <a href="#" className="btn btn-solid">
            Explore more insights
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="growth-visual" ref={visualRef}>
          <div className="photo-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/growth-photo.png" alt="Employee using ZenlyHR on a tablet" />
          </div>

          <div className="float-card float-card--engagement">
            <span className="float-card-title">Employee Engagement</span>
            <span className="float-card-value" ref={floatValueRef}>+0%</span>
            <div className="float-progress"><span ref={floatProgressRef} style={{ width: "0%" }}></span></div>
            <div className="float-milestones">
              <span>1Q</span><span>1H</span><span>1Y</span><span>2Y</span><span>5Y</span>
            </div>
          </div>

          <div className="float-icon float-icon--bulb">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3 11.2c.5.4.8 1 .8 1.6v.2h4.4v-.2c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="float-icon float-icon--bars">
            <svg width="26" height="20" viewBox="0 0 24 18" fill="none">
              <rect x="1" y="10" width="4" height="7" rx="1" fill="currentColor" />
              <rect x="8" y="5" width="4" height="12" rx="1" fill="currentColor" />
              <rect x="15" y="0" width="4" height="17" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
