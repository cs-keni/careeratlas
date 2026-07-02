import type { CareerPath } from "./types";

/**
 * The seven career paths. These are possibilities, not rails — multiclassing
 * between them is normal and often how the best careers are built.
 */
export const careerPaths: CareerPath[] = [
  {
    id: "technical",
    name: "Technical Expert",
    shortName: "Technical",
    slug: "technical",
    tagline: "Master the craft. Become the engineer other engineers ask.",
    accentVar: "--path-technical",
    overview:
      "The classic individual-contributor ladder. You go deep on security system design — access control, video, intrusion, and the construction documents that make them real — until your technical judgment becomes the product. This path ends in Principal Engineer or named Subject Matter Expert, where your reputation wins work and your review is the final word.",
    ladder: ["jr-pse", "pse", "senior-pse", "lead-pse", "principal-pse", "technical-sme"],
    skillsToPrioritize: [
      "Revit and construction documentation mastery",
      "System architecture (head-ends, networks, storage)",
      "Codes, standards, and Division 28 fluency",
      "Design QA/QC and mentorship",
    ],
    certifications: ["PSP first, CPP later", "Vendor design certifications as they come up"],
    tools: ["Revit", "Bluebeam Revu", "AutoCAD", "Axis Site Designer", "Autodesk Construction Cloud"],
    exampleProjects: [
      "Full security package for a new courthouse or hospital",
      "Campus-wide video system replacement design",
      "Standards library and typical details for your office",
    ],
    pros: [
      "Deep mastery is durable and portable",
      "No forced move into management",
      "Respect compounds — senior ICs are rare and valued",
    ],
    cons: [
      "Slower salary curve than management/sales at the top end",
      "Production work (drawings, specs) dominates for years",
    ],
    goodFor: [
      "People who love the craft itself",
      "Those who want expertise, not headcount, as their leverage",
    ],
    csAdvantages: [
      "Software-style rigor (versioning, review culture, automation) makes you faster and cleaner than average",
      "Networked-system depth is increasingly the hard part of physical security design",
    ],
    risks: [
      "Specializing in a niche that shrinks (bet on converged/networked systems, not legacy analog)",
    ],
  },
  {
    id: "consulting",
    name: "Security Consultant",
    shortName: "Consulting",
    slug: "consulting",
    tagline: "Advise before anyone draws. Shape what gets built.",
    accentVar: "--path-consulting",
    overview:
      "You move upstream: assessments, strategy, technology roadmaps, and basis-of-design work. Clients pay for your judgment and your writing, not your drawings. This path rewards communication as much as technical depth, and ends in principal/advisor roles owning executive relationships.",
    ladder: ["pse", "sec-tech-consultant", "senior-consultant", "design-lead", "principal-consultant", "client-advisor"],
    skillsToPrioritize: [
      "Risk assessment methodology",
      "Professional writing and presentation",
      "Facilitation and stakeholder management",
      "Broad platform/vendor landscape knowledge",
    ],
    certifications: ["PSP, then CPP (CPP carries weight with executives)"],
    tools: ["Assessment frameworks", "Bluebeam", "The Microsoft Office suite, wielded seriously"],
    exampleProjects: [
      "Enterprise security technology roadmap for a Fortune 500",
      "Multi-campus risk and vulnerability assessment",
      "Owner's-side design review of an integrator proposal",
    ],
    pros: [
      "High client exposure builds a strong personal network",
      "Variety — new problems, sectors, and buildings constantly",
      "Natural springboard to advisor and executive roles",
    ],
    cons: [
      "Travel can be significant",
      "Less hands-on building; deliverables are documents",
    ],
    goodFor: ["Strong communicators", "People energized by clients and variety"],
    csAdvantages: [
      "Stakeholder communication and technical documentation are your stated strengths — this path monetizes them directly",
    ],
    risks: ["Drifting too far from technical depth erodes credibility — keep a foot in design"],
  },
  {
    id: "delivery",
    name: "Project / Delivery Leader",
    shortName: "Delivery",
    slug: "delivery",
    tagline: "Own outcomes. Run the projects, then the portfolio, then the team.",
    accentVar: "--path-delivery",
    overview:
      "The management ladder. You trade drawing production for orchestration: schedules, fees, clients, and eventually people. It runs from Project Engineer through PM and Program Manager to Discipline Lead — the equivalent of the engineering-manager-to-director track in software.",
    ladder: ["jr-pse", "project-engineer", "project-manager", "security-pm", "program-manager", "discipline-lead"],
    skillsToPrioritize: [
      "Budget and schedule management",
      "Negotiation and client management",
      "Delegation and team leadership",
      "Contract and fee literacy",
    ],
    certifications: ["PMP (the anchor cert)", "CPP later for security-leadership credibility"],
    tools: ["MS Project / Primavera P6", "Autodesk Construction Cloud", "ERP/financial systems"],
    exampleProjects: [
      "Deliver a multi-discipline federal project on budget",
      "Run a 20-site access control rollout program",
      "Turn around a troubled project",
    ],
    pros: ["Fastest route to organizational influence and P&L ownership", "Salary ceiling rises with scope"],
    cons: ["Technical skills fade without deliberate effort", "You own every problem, including people problems"],
    goodFor: ["Natural organizers", "People who get energy from unblocking others"],
    csAdvantages: [
      "Agile/standup instincts translate to coordination meetings and issue tracking",
      "You can build the tracking tooling other PMs wish they had",
    ],
    risks: ["Moving into management before your technical foundation is set caps your credibility — don't rush it"],
  },
  {
    id: "critical-infra",
    name: "Data Center / Critical Infrastructure",
    shortName: "Data Center / CI",
    slug: "critical-infrastructure",
    tagline: "Protect what can't go down. The highest-stakes buildings on earth.",
    accentVar: "--path-critical-infra",
    overview:
      "Specialize in the buildings where security failures are existential: data centers, utilities, energy, transport. Hyperscale data center construction is one of the hottest markets in the built environment, and security engineers who know its standards and pace are scarce. Ends in portfolio architecture and global standards ownership.",
    ladder: ["pse", "dc-security-engineer", "ci-consultant", "ci-systems-lead", "global-standards-lead"],
    skillsToPrioritize: [
      "Layered security design (perimeter → mantrap → rack)",
      "Compliance frameworks and audit-grade documentation",
      "Redundancy and uptime-driven thinking",
      "Client global standards fluency",
    ],
    certifications: ["PSP", "CPP at senior levels", "Sector frameworks knowledge (e.g., NERC CIP awareness)"],
    tools: ["Revit", "ACC", "Client standards portals", "Compliance tooling"],
    exampleProjects: [
      "Hyperscale data center campus security design",
      "Substation physical security upgrade program",
      "Global standard authored for a cloud provider",
    ],
    pros: [
      "Booming market with premium rates (especially data centers)",
      "Repeatable expertise across a huge pipeline of similar projects",
      "Jacobs plays heavily in this market — the on-ramp is at your desk",
    ],
    cons: ["Standards-driven work can feel repetitive", "NDAs and confidentiality limit what you can show"],
    goodFor: ["People who like rigor, scale, and high stakes", "Detail-driven engineers"],
    csAdvantages: [
      "You inherently understand what data centers protect — that context makes client conversations easier",
    ],
    risks: ["Market concentration: heavy exposure to a few hyperscaler clients' capex cycles"],
  },
  {
    id: "corporate",
    name: "Corporate / In-House Security",
    shortName: "Corporate",
    slug: "corporate",
    tagline: "Switch to the owner's side. Run security, don't just design it.",
    accentVar: "--path-corporate",
    overview:
      "Move in-house to own a company's security program: systems, operations, budgets, and eventually an executive seat. The perspective flips from 'deliver the project' to 'live with the system' — design experience makes you a far better operator. Ends at Director level, adjacent to the CSO track.",
    ladder: ["pse", "corp-analyst", "physec-manager", "regional-manager", "director-sectech"],
    skillsToPrioritize: [
      "Platform administration and operations",
      "Budgeting and vendor management",
      "Policy and SOP writing",
      "Incident and investigations support",
    ],
    certifications: ["APP early", "PSP", "CPP (near-mandatory for director roles)"],
    tools: ["Enterprise ACS/VMS platforms", "PSIM/dashboards", "GSOC tooling"],
    exampleProjects: [
      "Own badging and access governance for a campus",
      "Consolidate three legacy systems after an acquisition",
      "Stand up metrics/reporting for the security program",
    ],
    pros: ["Stability, one employer, deep ownership", "Clear executive ladder", "No billability pressure"],
    cons: ["Slower pace than consulting", "Progress can bottleneck on org structure — fewer rungs"],
    goodFor: ["People who want to own outcomes long-term", "Operators more than producers"],
    csAdvantages: ["IT troubleshooting background covers the hardest daily work — systems health and integrations"],
    risks: ["Skills can narrow to one company's stack; stay active in ASIS to keep market visibility"],
  },
  {
    id: "integration",
    name: "Systems Integration",
    shortName: "Integration",
    slug: "integration",
    tagline: "Make it real. Build, program, and commission the systems.",
    accentVar: "--path-integration",
    overview:
      "The hands-on branch: integrator- and manufacturer-side roles where you engineer, configure, and commission actual systems — then graduate into solutions engineering, pre-sales, or enterprise integration architecture. The most product-centric path, with a sales-adjacent upper tier.",
    ladder: ["pse", "systems-designer", "systems-integrator", "solutions-engineer", "presales-engineer", "integration-architect"],
    skillsToPrioritize: [
      "Product-level platform mastery (Lenel, Genetec, CCURE, Axis...)",
      "Servers, databases, and networking",
      "Commissioning and field troubleshooting",
      "Demos and technical storytelling (upper tier)",
    ],
    certifications: ["Vendor certifications (the currency of this path)", "CTS if AV-adjacent", "Network+ or similar"],
    tools: ["Platform admin consoles", "SQL/Windows Server", "AutoCAD", "Estimating software"],
    exampleProjects: [
      "Commission an enterprise access control migration",
      "Build a cross-platform integration via APIs",
      "Win a major pursuit with a demo you architected",
    ],
    pros: ["Deeply marketable, hands-on skills", "Pre-sales roles can out-earn consulting", "You see systems actually work"],
    cons: ["Field/travel time", "Integrator margins can mean pace pressure", "A/E design experience partially resets"],
    goodFor: ["Tinkerers and builders", "People who'd rather configure than document"],
    csAdvantages: ["APIs, SQL, and server config are the exact skills integrators struggle to hire"],
    risks: ["Vendor-specific expertise ages — recertify and diversify platforms"],
  },
  {
    id: "cyber-physical",
    name: "Cyber-Physical / Software-Adjacent",
    shortName: "Cyber-Physical",
    slug: "cyber-physical",
    tagline: "Your CS degree's home turf. Where buildings meet software.",
    accentVar: "--path-cyber",
    overview:
      "The convergence branch — and your natural advantage. Physical security is becoming a networked, API-driven, data-producing discipline, and it desperately needs people who can code. This path runs through automation, data/analytics, and OT/IoT security, and can end back in pure software: building the platforms the industry runs on.",
    ladder: ["pse", "integration-specialist", "automation-engineer", "data-analytics-engineer", "ot-iot-specialist", "platform-product-engineer"],
    skillsToPrioritize: [
      "Keep programming sharp (Python/TypeScript)",
      "Networking and security hardening for devices",
      "Platform APIs and integration patterns",
      "Data pipelines and visualization",
    ],
    certifications: ["Vendor certs", "Network+ / security certs as relevant", "PSP to anchor physical credibility"],
    tools: ["Platform APIs/SDKs", "Wireshark", "Grafana/Power BI", "Git — you never left"],
    exampleProjects: [
      "Automate camera provisioning and health monitoring firm-wide",
      "Occupancy analytics from access control events",
      "Smart-building security architecture for a new HQ",
    ],
    pros: [
      "Rarest skill combination in the industry — commands a premium",
      "Optionality: exit ramps to software, cyber, or proptech anytime",
      "The industry trend line points exactly here",
    ],
    cons: [
      "Role definitions are fuzzy; you may have to invent your own job",
      "Fewer established ladders — progression takes self-direction",
    ],
    goodFor: ["You, specifically. This is the multiclass build your background sets up."],
    csAdvantages: [
      "Everything: coding, IT, automation, and web development all apply directly",
      "Two-domain fluency (construction + software) is the moat",
    ],
    risks: [
      "Straddling domains can read as 'not a real X' to gatekeepers — earn the physical credentials (PSP) to close that gap",
    ],
  },
];

export const pathById = new Map(careerPaths.map((p) => [p.id, p]));
export const pathBySlug = new Map(careerPaths.map((p) => [p.slug, p]));
