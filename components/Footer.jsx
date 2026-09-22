export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-inner footer-inner">
        <a href="#" className="brand">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="9" fill="#20281f" />
            <path d="M10 10H22L11 22H23" stroke="#8fae5d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>ZenlyHR</span>
        </a>
        <p className="footer-copy">
          © {new Date().getFullYear()} ZenlyHR. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
