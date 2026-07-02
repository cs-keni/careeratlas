import type { Metadata } from "next";
import { certifications } from "@/data/certifications";
import { CertificationBadge } from "@/components/certs/CertificationBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Certification Roadmap",
  description:
    "Unlockable badges: APP, PSP, CPP, PMP, RCDD, and vendor certifications for physical security engineers.",
};

const order: Record<string, number> = { foundation: 0, professional: 1, expert: 2, adjacent: 3, vendor: 4 };

export default function CertificationsPage() {
  const sorted = [...certifications].sort(
    (a, b) => order[a.level] - order[b.level] || a.difficulty - b.difficulty,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeading kicker="Achievements" title="Certification Roadmap">
        The badge progression for this profession. The ASIS track (APP → PSP →
        CPP) is the spine; PMP, RCDD, and vendor certs are situational
        unlocks depending on your path. Requirements below were checked against
        the cited sources in July 2026 — always verify the current handbook
        before applying.
      </SectionHeading>

      {/* The ASIS spine, visualized */}
      <Reveal>
        <div className="card mb-10 p-6">
          <p className="rune mb-4 text-brass">The ASIS Progression</p>
          <div className="flex flex-col items-stretch gap-2 font-mono text-sm sm:flex-row sm:items-center">
            {[
              ["◈ APP", "~1 yr exp", "var(--path-cyber)"],
              ["⬢ PSP", "~3–5 yrs exp", "var(--path-technical)"],
              ["✦ CPP", "~7–9 yrs exp", "var(--brass)"],
            ].map(([label, sub, color], i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                {i > 0 && <span className="hidden text-muted sm:block">──▶</span>}
                <div
                  className="flex-1 rounded-md border px-4 py-3 text-center"
                  style={{ borderColor: color as string }}
                >
                  <p style={{ color: color as string }}>{label}</p>
                  <p className="mt-1 text-xs text-muted">{sub} · est.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((cert, i) => (
          <Reveal key={cert.id} delay={0.04 * (i % 2)}>
            <CertificationBadge cert={cert} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
