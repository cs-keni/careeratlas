import type { Certification } from "./types";

/**
 * Certification roadmap. Requirements below were checked against the cited
 * sources in July 2026. ALWAYS verify against the current ASIS/PMI/BICSI
 * handbooks before applying — eligibility rules change.
 */
export const certifications: Certification[] = [
  {
    id: "asis-membership",
    name: "ASIS",
    fullName: "ASIS International Membership",
    issuer: "ASIS International",
    level: "foundation",
    difficulty: 1,
    whenToPursue: "Now. Join in your first months — student/young-professional rates exist, and Jacobs may reimburse.",
    requirements: ["Open to security professionals — membership, not a certification"],
    requirementsVerified: true,
    sources: [{ label: "ASIS International", url: "https://www.asisonline.org/" }],
    whyItMatters:
      "The professional home of physical security. Local chapter meetings (Portland has one) are where you meet mentors, integrators, and future employers — and it's the gateway to APP/PSP/CPP.",
    badge: "🛡",
  },
  {
    id: "app",
    name: "APP",
    fullName: "Associate Protection Professional",
    issuer: "ASIS International",
    level: "foundation",
    difficulty: 2,
    whenToPursue: "Around your 1-year mark — it's designed for early-career security professionals.",
    requirements: [
      "1+ year of related, compensated security experience — or 6 months plus a related approved certification",
      "Agree to the ASIS Certification Code of Conduct",
    ],
    requirementsVerified: true,
    sources: [
      { label: "ASIS — APP", url: "https://www.asisonline.org/certification/associate-protection-professional-app/" },
      { label: "ASIS — Apply", url: "https://www.asisonline.org/certification/apply-for-certification/" },
    ],
    domains: ["Security fundamentals", "Business operations", "Risk management", "Response management"],
    whyItMatters:
      "Your first badge: signals commitment early, forces you to learn the field's vocabulary broadly, and is the natural stepping stone to PSP.",
    badge: "◈",
  },
  {
    id: "psp",
    name: "PSP",
    fullName: "Physical Security Professional",
    issuer: "ASIS International",
    level: "professional",
    difficulty: 4,
    whenToPursue: "Once you clear the experience bar (~3–5 yrs). THE certification for this specific job.",
    requirements: [
      "3–5 years of physical security experience (ASIS lists tiered options — verify the current Certification Handbook for the exact education/experience combinations)",
      "No disqualifying criminal history; agree to the Code of Conduct",
    ],
    requirementsVerified: true,
    sources: [
      { label: "ASIS — PSP", url: "https://www.asisonline.org/certification/physical-security-professional/" },
      { label: "ASIS — Apply", url: "https://www.asisonline.org/certification/apply-for-certification/" },
    ],
    domains: ["Physical security assessment", "Design, integration & application of systems", "Implementation of measures"],
    whyItMatters:
      "The exam is literally your job: assessments, system design, implementation. It's the credential clients and employers look for on physical security engineers — your highest-value cert.",
    badge: "⬢",
  },
  {
    id: "cpp",
    name: "CPP",
    fullName: "Certified Protection Professional",
    issuer: "ASIS International",
    level: "expert",
    difficulty: 5,
    whenToPursue: "Mid-career (~7+ yrs), when you're moving toward leadership, consulting, or management.",
    requirements: [
      "7 years of security experience with a bachelor's degree or higher (9 years without)",
      "Including 3 years in 'responsible charge' of a security function",
      "Code of Conduct; verify current handbook before applying",
    ],
    requirementsVerified: true,
    sources: [
      { label: "ASIS — CPP", url: "https://www.asisonline.org/certification/certified-protection-professional-cpp/" },
      { label: "ASIS — Apply", url: "https://www.asisonline.org/certification/apply-for-certification/" },
    ],
    domains: ["Security principles & practices", "Business principles", "Investigations", "Personnel security", "Physical security", "Information security", "Crisis management"],
    whyItMatters:
      "The 'gold standard' management-level security credential. Expected at director/principal levels; the capstone of the ASIS track.",
    badge: "✦",
  },
  {
    id: "pmp",
    name: "PMP",
    fullName: "Project Management Professional",
    issuer: "Project Management Institute (PMI)",
    level: "adjacent",
    difficulty: 4,
    whenToPursue: "If/when you lean toward the Project/Delivery path — typically ~4–6 yrs in, before a PM role.",
    requirements: [
      "Four-year degree + 36 months of project management experience, OR high-school/associate + 60 months",
      "35 hours of project management education (or CAPM)",
      "Verify current PMI requirements before applying",
    ],
    requirementsVerified: true,
    sources: [
      { label: "PMI — PMP", url: "https://www.pmi.org/certifications/project-management-pmp" },
    ],
    whyItMatters:
      "The anchor credential of the delivery path — often an explicit expectation for PM roles at A/E firms like Jacobs.",
    badge: "▲",
  },
  {
    id: "rcdd",
    name: "RCDD",
    fullName: "Registered Communications Distribution Designer",
    issuer: "BICSI",
    level: "adjacent",
    difficulty: 4,
    whenToPursue: "Optional, mid-career — if you go deep on low-voltage/telecom infrastructure design.",
    requirements: [
      "One of: 2 yrs ICT design experience + a current BICSI certification; 2 yrs experience + 2 yrs ICT higher education; or 5 yrs verifiable ICT experience",
      "Verify the current BICSI RCDD handbook",
    ],
    requirementsVerified: true,
    sources: [{ label: "BICSI — RCDD", url: "https://www.bicsi.org/education-certification/certification/rcdd" }],
    whyItMatters:
      "The premier structured-cabling design credential. Security rides on the ICT infrastructure RCDDs design — valuable if your work overlaps heavily with telecom, otherwise a nice-to-have.",
    badge: "◆",
  },
  {
    id: "cts",
    name: "CTS",
    fullName: "Certified Technology Specialist",
    issuer: "AVIXA",
    level: "adjacent",
    difficulty: 3,
    whenToPursue: "Only if your work drifts into audiovisual / integrated-experience systems.",
    requirements: ["Recommended (not strictly required) AV industry experience — see AVIXA's current guide"],
    requirementsVerified: false,
    sources: [{ label: "AVIXA — CTS", url: "https://www.avixa.org/training-certification/certification/cts" }],
    whyItMatters:
      "AV and security increasingly share networks and control systems. Situational — skip unless AV scope lands on your desk.",
    badge: "◉",
  },
  {
    id: "network-plus",
    name: "Network+",
    fullName: "CompTIA Network+",
    issuer: "CompTIA",
    level: "adjacent",
    difficulty: 2,
    whenToPursue: "Optional early pickup — likely easy for you and instantly credible with IT stakeholders.",
    requirements: ["No formal prerequisites (experience recommended by CompTIA)"],
    requirementsVerified: false,
    sources: [{ label: "CompTIA — Network+", url: "https://www.comptia.org/certifications/network" }],
    whyItMatters:
      "Modern security systems are IP systems. With your background this is low effort, and it formalizes the networking credibility the cyber-physical path is built on.",
    badge: "⬡",
  },
  {
    id: "vendor-certs",
    name: "Vendor Certs",
    fullName: "Manufacturer Certifications (Axis, Genetec, Lenel, Software House…)",
    issuer: "Various manufacturers",
    level: "vendor",
    difficulty: 2,
    whenToPursue: "Continuously, as projects expose you to platforms. Often free or employer-funded.",
    requirements: [
      "Typically: complete vendor training courses + pass an exam (e.g., Axis Certified Professional; Genetec, LenelS2, Software House programs)",
      "Requirements vary by vendor — check each program",
    ],
    requirementsVerified: false,
    sources: [
      { label: "Axis Communications Academy", url: "https://www.axis.com/learning/academy" },
      { label: "Genetec Technical Certifications", url: "https://www.genetec.com/services/technical-training" },
    ],
    whyItMatters:
      "The working currency of the integration path, and useful everywhere: specifying a platform is easier when you're certified on it. Axis Site Designer training pairs directly with your supervisor's study list.",
    badge: "⚙",
  },
  {
    id: "software-training",
    name: "Design Tools",
    fullName: "Bluebeam / Autodesk / Axis Training Paths",
    issuer: "Bluebeam, Autodesk, Axis",
    level: "foundation",
    difficulty: 1,
    whenToPursue: "Right now — this is your supervisor's study list, and your first-90-days material.",
    requirements: [
      "No prerequisites: Bluebeam University (Revu), Autodesk learning paths + certifications (Revit, AutoCAD, ACC), Axis Communications Academy (Site Designer)",
    ],
    requirementsVerified: false,
    sources: [
      { label: "Bluebeam University", url: "https://www.bluebeam.com/training/" },
      { label: "Autodesk Learning", url: "https://www.autodesk.com/learning" },
      { label: "Axis Academy", url: "https://www.axis.com/learning/academy" },
    ],
    whyItMatters:
      "Not resume badges — daily survival tools. Fluency here is what makes your first year go well.",
    badge: "✎",
  },
];

export const certById = new Map(certifications.map((c) => [c.id, c]));
