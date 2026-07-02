import type { ComparisonRow } from "./types";

/** Rosetta stone: software engineering careers → physical security engineering. */
export const comparisonRows: ComparisonRow[] = [
  {
    swe: "Jr Software Engineer",
    pse: "Jr Physical Security Engineer",
    note: "Same energy: learn the toolchain, work under review, ask good questions. PRs become drawing markups; the codebase becomes the drawing set.",
  },
  {
    swe: "Software Engineer",
    pse: "Physical Security Engineer",
    note: "Independent feature ownership becomes independent design-package ownership: you ship complete, buildable systems with light supervision.",
  },
  {
    swe: "Senior Software Engineer",
    pse: "Senior Physical Security Engineer",
    note: "Multi-project technical leadership, mentoring, and architecture decisions. Code review culture maps directly to design QA/QC.",
  },
  {
    swe: "Staff / Principal Engineer",
    pse: "Principal Engineer / Technical SME",
    note: "The IC apex: org-wide influence, gnarliest problems, reputation that wins work. 'Named SME' is the physical world's 'the person who wrote the framework.'",
  },
  {
    swe: "Engineering Manager → Director",
    pse: "Project Manager → Program Manager → Discipline Lead",
    note: "People, budgets, and delivery instead of code. One difference: PM here is a distinct craft (fees, contracts, construction phases) with its own cert (PMP).",
  },
  {
    swe: "Forward Deployed Engineer / Solutions Architect",
    pse: "Security Technology Consultant / Client-Facing Design Lead",
    note: "Embedded with clients, translating needs into architectures. Assessments and basis-of-design docs are your discovery phase and RFC.",
  },
  {
    swe: "DevOps / Infrastructure Engineer",
    pse: "Systems Integration / Low-Voltage / Networked Systems",
    note: "The 'make it actually run' discipline: servers, networks, deployments, monitoring — except some of your deployments are physically bolted to doors.",
  },
  {
    swe: "Cybersecurity Engineer",
    pse: "Cyber-Physical / OT / IoT / Security Platform Path",
    note: "Convergence is the frontier: hardening building networks, securing devices, and building the platforms — where your two worlds literally merge.",
  },
];

/** Concepts that transfer 1:1 — quick-hit vocabulary mapping. */
export const conceptMap: ComparisonRow[] = [
  { swe: "Pull request review", pse: "Drawing markup / QC review (Bluebeam)", note: "" },
  { swe: "API contract / spec", pse: "Division 28 specification", note: "" },
  { swe: "Architecture diagram", pse: "Riser diagram / one-line schematic", note: "" },
  { swe: "GitHub / repo", pse: "Autodesk Construction Cloud", note: "" },
  { swe: "Manifest / lockfile", pse: "Device schedule", note: "" },
  { swe: "AuthN/AuthZ", pse: "Access control system", note: "" },
  { swe: "Monitoring & alerting", pse: "Intrusion detection / GSOC", note: "" },
  { swe: "Release / deploy", pse: "Issue for construction / commissioning", note: "" },
  { swe: "Tech debt", pse: "Legacy analog systems awaiting migration", note: "" },
  { swe: "Sprint / standup", pse: "Project phase / coordination meeting", note: "" },
];
