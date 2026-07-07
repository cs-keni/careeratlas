/**
 * Certification tracking states. Atlas-native language — a cert is Planned,
 * In Progress, or Earned; never "completed". Absence from the stored map
 * means untracked.
 */
export type CertProgress = "planned" | "in-progress" | "earned";

export function isCertProgress(value: unknown): value is CertProgress {
  return value === "planned" || value === "in-progress" || value === "earned";
}

export const certProgressLabels: Record<CertProgress, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  earned: "Earned",
};

/** The cycle-button order: untracked → Planned → In Progress → Earned → untracked. */
export function nextCertProgress(
  current: CertProgress | undefined,
): CertProgress | null {
  switch (current) {
    case undefined:
      return "planned";
    case "planned":
      return "in-progress";
    case "in-progress":
      return "earned";
    case "earned":
      return null;
  }
}
