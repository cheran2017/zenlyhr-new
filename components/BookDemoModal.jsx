"use client";

import { useEffect, useState } from "react";
import { BOOK_DEMO_EVENT } from "./bookDemoEvents";

export default function BookDemoModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setSubmitted(false);
      setOpen(true);
    };
    window.addEventListener(BOOK_DEMO_EVENT, onOpen);
    return () => window.removeEventListener(BOOK_DEMO_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="book-demo-title">
        <button className="modal-close" aria-label="Close" onClick={() => setOpen(false)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {submitted ? (
          <div className="modal-success">
            <div className="modal-success-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Thanks — we&apos;ll be in touch.</h3>
            <p>A ZenlyHR specialist will reach out shortly to schedule your demo.</p>
            <button className="btn btn-solid" onClick={() => setOpen(false)}>Close</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Let&apos;s talk</p>
            <h3 id="book-demo-title" className="modal-title">Book a demo</h3>
            <p className="modal-sub">
              Tell us a bit about your team and we&apos;ll set up a walkthrough tailored to your HR needs.
            </p>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  Full name
                  <input type="text" name="name" placeholder="Jane Doe" required />
                </label>
                <label>
                  Work email
                  <input type="email" name="email" placeholder="jane@company.com" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Company
                  <input type="text" name="company" placeholder="Company Inc." required />
                </label>
                <label>
                  <span>Phone <span className="optional">(optional)</span></span>
                  <input type="tel" name="phone" placeholder="+1 (555) 000-0000" />
                </label>
              </div>
              <label>
                What are you looking to solve?
                <textarea name="message" rows={3} placeholder="Tell us about your team and current HR challenges" />
              </label>

              <button type="submit" className="btn btn-solid btn-lg modal-submit">
                Request a demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
