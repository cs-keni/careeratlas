/**
 * CareerAtlas data model.
 *
 * Everything on the site is driven by plain TypeScript data in this folder.
 * To add a role: add a CareerNode to careerNodes.ts (id, path, tier, position)
 * and reference it from another node's `nextRoles` to draw the edge.
 */

export type PathId =
  | "technical"
  | "consulting"
  | "delivery"
  | "critical-infra"
  | "corporate"
  | "integration"
  | "cyber-physical";

/** RPG-flavored tiers, mapped to professional levels. */
export type Tier = "base" | "advanced" | "specialist" | "leadership";

export interface SalaryEstimate {
  /** USD per year, low end. Rough estimate only. */
  min: number;
  /** USD per year, high end. Rough estimate only. */
  max: number;
  note?: string;
}

export interface CareerNode {
  id: string;
  title: string;
  tier: Tier;
  /** "shared" = trunk nodes that belong to every path. */
  path: PathId | "shared";
  category?: string;
  description: string;
  /** Always phrased as an estimate, e.g. "~0–2 yrs". */
  yearsExperience: string;
  responsibilities: string[];
  requiredSkills: string[];
  recommendedSkills?: string[];
  tools: string[];
  /** Certification ids from certifications.ts, or free-form names. */
  certifications: string[];
  unlockRequirements: string[];
  /** Node ids — edges in the tree are derived from these. */
  nextRoles: string[];
  salaryEstimate?: SalaryEstimate;
  /** "Recommended quests" — concrete actions to level toward/into this role. */
  quests?: string[];
  csBackgroundAdvantages?: string[];
  risks?: string[];
  /** Graph layout position for React Flow. */
  position: { x: number; y: number };
}

export interface CareerPath {
  id: PathId;
  name: string;
  /** Compact label for legends/filters. */
  shortName: string;
  slug: string;
  tagline: string;
  /** CSS custom property name carrying this path's accent color. */
  accentVar: string;
  overview: string;
  /** Node ids in ladder order (excluding shared trunk nodes). */
  ladder: string[];
  skillsToPrioritize: string[];
  certifications: string[];
  tools: string[];
  exampleProjects: string[];
  pros: string[];
  cons: string[];
  goodFor: string[];
  csAdvantages: string[];
  risks: string[];
}

export type CertLevel = "foundation" | "professional" | "expert" | "adjacent" | "vendor";

export interface Certification {
  /** Stable, globally unique id — cert progress is stored against this
   * (careeratlas:v1:cert-progress), so never reuse or repurpose an id once
   * shipped (retire it instead). */
  id: string;
  /** Short name, e.g. "PSP". */
  name: string;
  fullName: string;
  issuer: string;
  level: CertLevel;
  /** 1 (approachable) – 5 (major undertaking). */
  difficulty: 1 | 2 | 3 | 4 | 5;
  whenToPursue: string;
  /** Eligibility bullets. Only verified facts; otherwise say "verify". */
  requirements: string[];
  requirementsVerified: boolean;
  sources?: { label: string; url: string }[];
  domains?: string[];
  whyItMatters: string;
  /** Single glyph/emoji used on the badge. */
  badge: string;
}

export type CodexCategory =
  | "Design Software"
  | "Security Systems"
  | "Infrastructure"
  | "Documents & Standards";

export interface CodexEntry {
  id: string;
  name: string;
  category: CodexCategory;
  what: string;
  whyItMatters: string;
  howYoullUseIt: string;
  /** Mapping to a familiar software-engineering concept. */
  swAnalogy?: string;
  learnFirst?: string[];
}

export type QuestType = "main" | "side";

export interface Quest {
  /** Stable, globally unique id — progress is stored against this, so never
   * reuse or repurpose an id once shipped (retire it instead). */
  id: string;
  title: string;
  detail: string;
  type: QuestType;
}

export interface QuestPhase {
  id: string;
  label: string;
  timeframe: string;
  theme: string;
  quests: Quest[];
}

export interface ComparisonRow {
  swe: string;
  pse: string;
  note: string;
}
