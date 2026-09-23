/* Small line-icon set for the "What's included" cards on each service
   page. Keyed by name so solutionsData.js can reference one per
   highlight without importing SVG markup into the data file. */

const PATHS = {
  asset: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M4 7.5l8 4.5 8-4.5" />
      <path d="M12 12v9" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 12h4l2 3h4l2-3h4" />
      <path d="M4 12l1.5-7h13L20 12" />
      <path d="M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6" />
    </>
  ),
  badge: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <circle cx="9.5" cy="11" r="2" />
      <path d="M8 16h3M14 10h4M14 14h4" />
    </>
  ),
  automation: (
    <>
      <path d="M4 12a8 8 0 0113.66-5.66M20 12a8 8 0 01-13.66 5.66" />
      <path d="M17 3v4h-4M7 21v-4h4" />
    </>
  ),
  survey: (
    <>
      <path d="M4 5h16v10H8l-4 4V5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  star: <path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.1 1.4-6.3-4.8-4.3 6.4-.6L12 3z" />,
  insights: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" />
      <path d="M4 13l6-5 4 3 6-6" />
    </>
  ),
  checklist: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 6l1.3 1.3L7 5.6M4 12l1.3 1.3L7 11.6M4 18l1.3 1.3L7 17.6" />
    </>
  ),
  flag: (
    <>
      <path d="M6 3v18" />
      <path d="M6 4h11l-3 4 3 4H6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5v-15z" />
      <path d="M4 20.5A2.5 2.5 0 016.5 18H20" />
    </>
  ),
  path: (
    <>
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="5" r="2" />
      <path d="M7 17.5L17 6.5" strokeDasharray="3 3" />
    </>
  ),
  bell: (
    <>
      <path d="M6 10a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10z" />
      <path d="M10 19a2 2 0 004 0" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.7 5.3 3.7 8.5s-1.3 6.1-3.7 8.5c-2.4-2.4-3.7-5.3-3.7-8.5S9.6 5.9 12 3.5z" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.5 3.5-6 7-6s7 2.5 7 6" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 12h5M9.5 16h5" />
    </>
  ),
  currency: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v10M9.5 9.5c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8-1 1.5-2.5 1.8-2.5.8-2.5 1.9 1 1.8 2.5 1.8 2.5-.8 2.5-1.8" />
    </>
  ),
  pipeline: (
    <>
      <rect x="3.5" y="4" width="5" height="16" rx="1" />
      <rect x="9.5" y="4" width="5" height="10" rx="1" />
      <rect x="15.5" y="4" width="5" height="13" rx="1" />
    </>
  ),
  scorecard: (
    <>
      <path d="M5 7h9M5 12h9M5 17h6" />
      <circle cx="19" cy="17" r="2.4" />
      <path d="M18 17l.8.8L20.2 16" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 10v4h3l7 4V6l-7 4H3z" />
      <path d="M15 9a4 4 0 010 6" />
      <path d="M18 6.5a7 7 0 010 11" />
    </>
  ),
  signature: (
    <>
      <path d="M4 19c3-1 5-2 6.5-3.5L18 8c1-1 1-2.5 0-3.5s-2.5-1-3.5 0l-7.5 7.5C5.5 13.5 4.5 15.5 4 19z" />
      <path d="M4 19h4" />
    </>
  ),
  filing: (
    <>
      <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      <path d="M9 13h6" />
    </>
  ),
  ticket: (
    <>
      <path d="M6 3h12v18l-2-1.4L14 21l-2-1.4L10 21l-2-1.4L6 21V3z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  audio: (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16 9a4 4 0 010 6M18.5 7a7.5 7.5 0 010 10" />
    </>
  ),
  keyboard: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M7 14h10" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 5v14M12 5v14M19 5v14" />
      <circle cx="5" cy="10" r="1.6" />
      <circle cx="12" cy="16" r="1.6" />
      <circle cx="19" cy="7" r="1.6" />
    </>
  ),
  devices: (
    <>
      <rect x="3" y="5" width="13" height="9" rx="1.4" />
      <path d="M8 18h6" />
      <rect x="17.5" y="8" width="4.5" height="8" rx="1" />
    </>
  ),
  template: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M3.5 9.5h17M9.5 9.5v11" />
    </>
  ),
  history: (
    <>
      <path d="M4 8a8 8 0 112 8.9" />
      <path d="M4 4v4h4" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  "check-badge": (
    <>
      <path d="M12 3l2.2 1.3 2.6-.2 1 2.4 2.4 1-.2 2.6L21 12l-1.3 2.2.2 2.6-2.4 1-1 2.4-2.6-.2L12 21l-2.2-1.3-2.6.2-1-2.4-2.4-1 .2-2.6L3 12l1.3-2.2-.2-2.6 2.4-1 1-2.4 2.6.2L12 3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  export: (
    <>
      <path d="M12 3v12M8 7l4-4 4 4" />
      <path d="M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4" />
    </>
  ),
};

export default function FeatureIcon({ name }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[name] || PATHS["check-badge"]}
    </svg>
  );
}
