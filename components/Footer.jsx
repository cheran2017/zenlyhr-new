"use client";

import { openBookDemo } from "./bookDemoEvents";

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Top CTA Banner */}
      <div className="section-inner footer-cta-wrap">
        <div className="footer-cta-card">
          <div className="footer-cta-content">
            <span className="footer-cta-eyebrow">Ready for a brighter tomorrow?</span>
            <h3 className="footer-cta-title">Simplify your HR operations with ZenlyHR.</h3>
            <p className="footer-cta-sub">
              Unify payroll, benefits, onboarding, and compliance into one connected experience your entire team will love.
            </p>
          </div>
          <div className="footer-cta-actions">
            <button type="button" className="btn btn-solid btn-lg" onClick={openBookDemo}>
              Request a demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="btn btn-ghost-white btn-lg" onClick={openBookDemo}>
              Contact sales
            </button>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="section-inner footer-main-grid">
        <div className="footer-brand-col">
          <a href="#" className="footer-brand" aria-label="Zenly HR">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/zenlylogowhite.png"
              alt="Zenly HR"
              style={{ height: "32px", width: "auto", display: "block" }}
            />
          </a>
          <p className="footer-brand-tagline">
            Timeless and central HR solutions built for confidence, clarity, and growth across every employee journey.
          </p>
          <div className="footer-status-pill">
            <span className="status-indicator"></span>
            <span>All systems operational</span>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-heading">Platform</h4>
          <ul className="footer-col-links">
            <li><a href="#solutions">Office & Administration</a></li>
            <li><a href="#solutions">Employee Engagement</a></li>
            <li><a href="#solutions">Learning & Development</a></li>
            <li><a href="#solutions">Global Payroll & HR</a></li>
            <li><a href="#solutions">Talent Acquisition</a></li>
            <li><a href="#solutions">Compliance Design</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-heading">Solutions</h4>
          <ul className="footer-col-links">
            <li><a href="#growth">Continuous Growth</a></li>
            <li><a href="#">Mid-market Organizations</a></li>
            <li><a href="#">Distributed & Remote Teams</a></li>
            <li><a href="#">Multi-state Compliance</a></li>
            <li><a href="#">Enterprise Security</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-heading">Resources</h4>
          <ul className="footer-col-links">
            <li><a href="#">HR Knowledge Base</a></li>
            <li><a href="#">Compliance Guides 2026</a></li>
            <li><a href="#">Customer Stories</a></li>
            <li><a href="#">API Documentation</a></li>
            <li><a href="#">System Status</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-heading">Company</h4>
          <ul className="footer-col-links">
            <li><a href="#">About ZenlyHR</a></li>
            <li><a href="#">Leadership</a></li>
            <li><a href="#">Careers <span className="footer-badge">Hiring</span></a></li>
            <li><a href="#">Press & Media</a></li>
            <li><a href="#">Privacy & Trust</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="section-inner footer-bottom-bar">
        <p className="footer-copy">
          © {new Date().getFullYear()} ZenlyHR Inc. All rights reserved. Built with precision for modern workplaces.
        </p>
        <div className="footer-legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Security</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
