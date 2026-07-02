import type { PathId, Tier } from "@/data/types";

/** Resolve a path id to its CSS accent color. Trunk nodes get brass. */
export function pathColor(path: PathId | "shared"): string {
  if (path === "shared") return "var(--brass)";
  const map: Record<PathId, string> = {
    technical: "var(--path-technical)",
    consulting: "var(--path-consulting)",
    delivery: "var(--path-delivery)",
    "critical-infra": "var(--path-critical-infra)",
    corporate: "var(--path-corporate)",
    integration: "var(--path-integration)",
    "cyber-physical": "var(--path-cyber)",
  };
  return map[path];
}

/** Hex values for contexts that can't resolve CSS vars (e.g. SVG minimap fills). */
export function pathHex(path: PathId | "shared"): string {
  if (path === "shared") return "#c9a353";
  const map: Record<PathId, string> = {
    technical: "#7ba7d9",
    consulting: "#c56b77",
    delivery: "#e3b341",
    "critical-infra": "#4fb3a6",
    corporate: "#9d8cd9",
    integration: "#e08a4e",
    "cyber-physical": "#6fcf97",
  };
  return map[path];
}

export const tierLabels: Record<Tier, string> = {
  base: "Base Class",
  advanced: "Advanced Class",
  specialist: "Specialist Class",
  leadership: "Leadership Class",
};
