/* Single source of truth for the 8 services — used by the Solutions grid,
   the orbiting cards around the hero's 3D Z monument, and each service's
   own detail page, so all three stay in sync automatically. Each
   highlight's `icon` key maps to a glyph in FeatureIcon.jsx. */

export const SOLUTIONS = [
  {
    slug: "office-administration",
    icon: "/icons/chair.png",
    title: "Office & Administration",
    shortLabel: "Admin",
    dot: "#4a6741",
    desc: "Streamline day-to-day office operations and admin workflows.",
    summary:
      "Centralize the everyday admin work that keeps an office running — assets, visitors, facilities, and requests — in one connected workspace.",
    highlights: [
      { icon: "asset", title: "Facilities & asset tracking", desc: "Log equipment, desks, and office resources, and see who has what at a glance." },
      { icon: "inbox", title: "Digital request desk", desc: "Employees submit IT, facilities, and admin requests without another spreadsheet or email thread." },
      { icon: "badge", title: "Visitor & access management", desc: "Pre-register guests, issue digital passes, and keep a clean audit trail." },
      { icon: "automation", title: "Admin task automation", desc: "Recurring office tasks — badge renewals, supply reorders, maintenance — run on autopilot." },
    ],
  },
  {
    slug: "employee-engagement",
    icon: "/icons/shield.png",
    title: "Employee Engagement",
    shortLabel: "Engagement",
    dot: "#008080",
    desc: "Employee surveys, recognition, and culture-building tools.",
    summary:
      "Understand how your teams really feel and turn that signal into action with surveys, recognition, and culture tools built for busy managers.",
    highlights: [
      { icon: "survey", title: "Pulse & lifecycle surveys", desc: "Short, frequent check-ins plus onboarding and exit surveys, benchmarked automatically." },
      { icon: "star", title: "Peer recognition", desc: "Public kudos tied to company values, visible across the team feed." },
      { icon: "insights", title: "Manager insights", desc: "Engagement trends broken down by team, tenure, and location — before they become attrition." },
      { icon: "checklist", title: "Action planning", desc: "Turn survey themes into tracked follow-up plans with owners and due dates." },
    ],
  },
  {
    slug: "learning-hr",
    icon: "/icons/gradcap.png",
    title: "Learning & HR",
    shortLabel: "Learning",
    dot: "#5b8def",
    desc: "Employee onboarding, training and career development.",
    summary:
      "Onboard new hires faster and grow the ones you already have with structured learning paths tied to real career development.",
    highlights: [
      { icon: "flag", title: "Guided onboarding journeys", desc: "Role-based checklists, paperwork, and training assigned automatically on day one." },
      { icon: "book", title: "Course library & tracking", desc: "Assign internal or third-party courses and track completion in one dashboard." },
      { icon: "path", title: "Career pathing", desc: "Map skills to roles so employees can see what's next and managers can plan succession." },
      { icon: "bell", title: "Certification reminders", desc: "Automatic renewal alerts for compliance training and professional certifications." },
    ],
  },
  {
    slug: "global-hr",
    icon: "/icons/globe.png",
    title: "Global HR",
    shortLabel: "Global HR",
    dot: "#009688",
    desc: "Manage distributed teams and multi-country compliance.",
    summary:
      "Run HR consistently for distributed teams across borders — local compliance, multi-currency payroll data, and one global view.",
    highlights: [
      { icon: "globe", title: "Multi-country compliance", desc: "Local statutory rules, contracts, and holiday calendars kept current by region." },
      { icon: "profile", title: "Unified employee records", desc: "One profile per employee regardless of country, entity, or local system." },
      { icon: "document", title: "Localized policies", desc: "Publish handbooks and policies per country while keeping global consistency." },
      { icon: "currency", title: "Currency-aware reporting", desc: "Headcount and cost reporting that rolls up cleanly across currencies and entities." },
    ],
  },
  {
    slug: "talent-acquisition",
    icon: "/icons/chair2.png",
    title: "Talent Acquisition",
    shortLabel: "Hiring",
    dot: "#e5973f",
    desc: "Focused sourcing, interviewing and hiring pipelines.",
    summary:
      "Move candidates from application to offer faster with a hiring pipeline your recruiters and hiring managers actually enjoy using.",
    highlights: [
      { icon: "pipeline", title: "Pipeline & scheduling", desc: "Kanban-style pipelines with automated interview scheduling and reminders." },
      { icon: "scorecard", title: "Structured scorecards", desc: "Consistent, bias-aware interview scorecards for every role." },
      { icon: "megaphone", title: "Careers page & sourcing", desc: "A branded careers page plus one-click posting to major job boards." },
      { icon: "signature", title: "Offer & e-signature", desc: "Generate offer letters and collect signatures without leaving the platform." },
    ],
  },
  {
    slug: "payroll-processing",
    icon: "/icons/barchart.png",
    title: "Payroll & Processing",
    shortLabel: "Payroll",
    dot: "#20b2aa",
    desc: "Accurate, on-time payroll processing and reporting.",
    summary:
      "Run accurate, on-time payroll with automatic tax calculations, deductions, and reporting — without the end-of-month scramble.",
    highlights: [
      { icon: "automation", title: "Automated pay runs", desc: "Salaries, overtime, and deductions calculated automatically each cycle." },
      { icon: "filing", title: "Tax & compliance filing", desc: "Statutory filings generated and tracked so nothing slips past a deadline." },
      { icon: "ticket", title: "Payslip self-service", desc: "Employees access payslips, tax documents, and year-end forms anytime." },
      { icon: "insights", title: "Finance-ready reporting", desc: "Payroll exports that reconcile cleanly with your general ledger." },
    ],
  },
  {
    slug: "accessibility",
    icon: "/icons/monitor.png",
    title: "Accessibility",
    shortLabel: "Accessibility",
    dot: "#5b8def",
    desc: "Inclusive tools that support diverse and remote teams.",
    summary:
      "Give every employee — regardless of ability, location, or device — a workspace that's genuinely easy to use.",
    highlights: [
      { icon: "audio", title: "Screen-reader friendly", desc: "Every workflow tested against WCAG 2.1 AA standards." },
      { icon: "keyboard", title: "Keyboard-first navigation", desc: "Complete the most common HR tasks without ever touching a mouse." },
      { icon: "sliders", title: "Flexible display options", desc: "Adjustable text size, contrast, and motion settings per employee." },
      { icon: "devices", title: "Multi-device support", desc: "A consistent experience on desktop, tablet, and mobile." },
    ],
  },
  {
    slug: "compliance-design",
    icon: "/icons/doc.png",
    title: "Compliance Design",
    shortLabel: "Compliance",
    dot: "#008080",
    desc: "Policy templates and audit-ready documentation.",
    summary:
      "Turn policy into practice with ready-to-use templates, version history, and an audit trail you can hand to a regulator with confidence.",
    highlights: [
      { icon: "template", title: "Policy template library", desc: "Pre-built, editable templates for the policies most teams need first." },
      { icon: "history", title: "Version-controlled handbooks", desc: "Every policy change tracked, dated, and attributable." },
      { icon: "check-badge", title: "Acknowledgement tracking", desc: "See exactly who has read and signed off on which policy version." },
      { icon: "export", title: "Audit-ready exports", desc: "One-click evidence packs for internal or external audits." },
    ],
  },
];

export function getSolutionBySlug(slug) {
  return SOLUTIONS.find((s) => s.slug === slug);
}
