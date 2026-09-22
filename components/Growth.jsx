"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Chart from "chart.js/auto";

const LABELS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const DATA = [10, 22, 18, 30, 45, 38, 52, 60, 55, 70, 82, 90];

const GROWTH_PERCENT = 32;

export default function Growth() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const visualRef = useRef(null);
  const chartBadgeRef = useRef(null);
  const floatValueRef = useRef(null);
  const floatProgressRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: LABELS,
        datasets: [
          {
            label: "Employee engagement",
            data: DATA,
            borderColor: "#5c7a3f",
            backgroundColor: (ctx) => {
              const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220);
              g.addColorStop(0, "rgba(92,122,63,0.35)");
              g.addColorStop(1, "rgba(92,122,63,0)");
              return g;
            },
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#5c7a3f",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: "#eee" }, ticks: { color: "#9a9a8c" } },
          x: { grid: { display: false }, ticks: { color: "#9a9a8c" } },
        },
        animation: { duration: 1400, easing: "easeOutQuart" },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (!visualRef.current) return;
    const els = visualRef.current.querySelectorAll(".float-card, .float-icon");

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
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
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
          observer.disconnect();
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(visualRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="growth" id="growth">
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
            <canvas ref={canvasRef} height={220}></canvas>
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
