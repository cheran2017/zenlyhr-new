export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-inner footer-inner">
        <a href="#" className="brand" aria-label="Zenly HR">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/zenlylogowhite.png"
            alt="Zenly HR"
            style={{ height: "30px", width: "auto", display: "block" }}
          />
        </a>
        <p className="footer-copy">
          © {new Date().getFullYear()} ZenlyHR. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
