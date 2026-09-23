"use client";

import Link from "next/link";
import { openBookDemo } from "./bookDemoEvents";
import { SOLUTIONS } from "./solutionsData";
import FeatureIcon from "./FeatureIcon";

export default function ServiceDetail({ service }) {
  const related = SOLUTIONS.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main className="service-page">
      <section className="service-hero">
        <div className="section-inner">
          <Link href="/#solutions" className="service-back">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All solutions
          </Link>
          <p className="eyebrow">Solutions · {service.shortLabel}</p>
          <h1 className="service-title">{service.title}</h1>
          <p className="service-lede">{service.summary}</p>
          <div className="service-hero-ctas">
            <button type="button" className="btn btn-solid btn-lg" onClick={openBookDemo}>
              Book a demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="service-features">
        <div className="section-inner">
          <h2 className="section-title">What&apos;s included</h2>
          <div className="service-feature-grid">
            {service.highlights.map((h) => (
              <div className="service-feature-card" key={h.title}>
                <div className="service-feature-icon">
                  <FeatureIcon name={h.icon} />
                </div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-related">
        <div className="section-inner">
          <h2 className="section-title">Explore other solutions</h2>
          <div className="service-related-grid">
            {related.map((s) => (
              <Link href={`/solutions/${s.slug}`} className="service-related-card" key={s.slug}>
                <div className="service-related-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" />
                </div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="section-inner service-cta-inner">
          <div>
            <h2 className="section-title">Ready to see {service.title} in action?</h2>
            <p>Book a short walkthrough with our team — no commitment required.</p>
          </div>
          <button type="button" className="btn btn-teal btn-lg" onClick={openBookDemo}>
            Book a demo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}
