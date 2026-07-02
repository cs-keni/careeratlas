import type { Metadata } from "next";
import { comparisonRows, conceptMap } from "@/data/comparison";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "SWE ↔ PSE",
  description:
    "A Rosetta stone mapping software engineering careers and concepts to physical security engineering.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <SectionHeading kicker="Rosetta Stone" title="Software ↔ Physical Security">
        You&apos;re not starting over — you&apos;re porting to a new platform. Every
        role and concept you know has a counterpart here.
      </SectionHeading>

      {/* Role ladder mapping */}
      <section className="mb-16 space-y-3">
        {comparisonRows.map((row, i) => (
          <Reveal key={row.swe} delay={0.03 * i}>
            <div className="card grid gap-3 p-5 sm:grid-cols-[1fr_auto_1fr]">
              <div>
                <p className="rune mb-1 text-[var(--path-cyber)]">Software World</p>
                <p className="font-display text-lg text-parchment">{row.swe}</p>
              </div>
              <div className="hidden items-center font-mono text-brass sm:flex" aria-hidden>
                ⇄
              </div>
              <div>
                <p className="rune mb-1 text-[var(--path-technical)]">Physical Security World</p>
                <p className="font-display text-lg text-parchment">{row.pse}</p>
              </div>
              <p className="border-t border-[var(--line)] pt-3 text-sm leading-relaxed text-parchment-dim sm:col-span-3">
                {row.note}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Concept quick-map */}
      <Reveal>
        <section className="card overflow-hidden">
          <div className="border-b border-[var(--line)] p-5">
            <p className="rune text-brass">Concept Quick-Map</p>
            <p className="mt-1 text-sm text-parchment-dim">
              Vocabulary that transfers one-to-one.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="rune p-4 text-left text-[var(--path-cyber)]">You know it as…</th>
                  <th className="rune p-4 text-left text-[var(--path-technical)]">Here it&apos;s…</th>
                </tr>
              </thead>
              <tbody>
                {conceptMap.map((row) => (
                  <tr
                    key={row.swe}
                    className="border-b border-[var(--line)] transition-colors last:border-0 hover:bg-ink-800/50"
                  >
                    <td className="p-4 font-mono text-parchment-dim">{row.swe}</td>
                    <td className="p-4 text-parchment">{row.pse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
