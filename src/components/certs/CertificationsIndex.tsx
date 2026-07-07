"use client";

import { certifications } from "@/data/certifications";
import { CERT_PROGRESS_KEY, useStoredMap } from "@/lib/storage";
import { isCertProgress, type CertProgress } from "@/lib/certProgress";
import { CertificationBadge } from "./CertificationBadge";
import { Reveal } from "@/components/ui/Reveal";

const order: Record<string, number> = { foundation: 0, professional: 1, expert: 2, adjacent: 3, vendor: 4 };

// Static module data — sorted once, not per render (this client component
// re-renders on every tracking click).
const sorted = [...certifications].sort(
  (a, b) => order[a.level] - order[b.level] || a.difficulty - b.difficulty,
);

/** Ids must exist in `certifications` — enforced by CertificationsIndex.test. */
export const asisSpine: { id: string; label: string; sub: string; color: string }[] = [
  { id: "app", label: "◈ APP", sub: "~1 yr exp", color: "var(--path-cyber)" },
  { id: "psp", label: "⬢ PSP", sub: "~3–5 yrs exp", color: "var(--path-technical)" },
  { id: "cpp", label: "✦ CPP", sub: "~7–9 yrs exp", color: "var(--brass)" },
];

/**
 * Client shell for /certifications: owns the ONE cert-progress map (a single
 * hook instance, so badge writes never race each other) and feeds every badge.
 */
export function CertificationsIndex() {
  const { map, set, hydrated } = useStoredMap<CertProgress>(
    CERT_PROGRESS_KEY,
    isCertProgress,
  );

  const earnedCount = certifications.filter((c) => map[c.id] === "earned").length;
  // Render stored state only after hydration so server HTML and first client
  // paint agree; states then apply at rest, without transition pop-in.
  const progressOf = (id: string) => (hydrated ? map[id] : undefined);

  return (
    <>
      {/* The ASIS spine, visualized */}
      <Reveal>
        <div className="card mb-10 p-6">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <p className="rune text-brass">The ASIS Progression</p>
            {/* Live only after hydration, so the 0 → N flip on page load is
                not announced to screen readers — only real changes are. */}
            <p className="rune text-muted" aria-live={hydrated ? "polite" : "off"}>
              <span className="text-brass">{hydrated ? earnedCount : 0}</span> of{" "}
              {certifications.length} earned
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-2 font-mono text-sm sm:flex-row sm:items-center">
            {asisSpine.map(({ id, label, sub, color }, i) => {
              const earned = progressOf(id) === "earned";
              return (
                <div key={id} className="flex flex-1 items-center gap-2">
                  {i > 0 && <span className="hidden text-muted sm:block">──▶</span>}
                  <div
                    className="flex-1 rounded-md border px-4 py-3 text-center transition-colors duration-300"
                    style={{
                      borderColor: earned ? "var(--brass-bright)" : color,
                      background: earned
                        ? `color-mix(in srgb, ${color} 18%, transparent)`
                        : undefined,
                      boxShadow: earned ? `0 0 20px -8px ${color}` : undefined,
                    }}
                  >
                    <p style={{ color }}>{label}</p>
                    <p className="mt-1 text-xs text-muted">
                      {earned ? "Earned ✓" : `${sub} · est.`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted">
            Progress is saved in your browser. Use the tracker on each badge to
            chart Planned → In Progress → Earned.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((cert, i) => (
          <Reveal key={cert.id} delay={0.04 * (i % 2)}>
            <CertificationBadge
              cert={cert}
              progress={progressOf(cert.id)}
              onCycle={(next) => set(cert.id, next)}
            />
          </Reveal>
        ))}
      </div>
    </>
  );
}
