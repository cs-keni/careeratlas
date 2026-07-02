import type { CodexEntry } from "@/data/types";

const categoryColors: Record<CodexEntry["category"], string> = {
  "Design Software": "var(--path-technical)",
  "Security Systems": "var(--path-consulting)",
  Infrastructure: "var(--path-critical-infra)",
  "Documents & Standards": "var(--path-delivery)",
};

export function SkillCodexCard({ entry }: { entry: CodexEntry }) {
  const color = categoryColors[entry.category];

  return (
    <article id={entry.id} className="card scroll-mt-24 p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl text-parchment">{entry.name}</h3>
        <span className="rune shrink-0 rounded-full border px-2.5 py-1" style={{ borderColor: color, color }}>
          {entry.category}
        </span>
      </div>

      <dl className="mt-4 space-y-4">
        <div>
          <dt className="rune mb-1" style={{ color }}>What it is</dt>
          <dd className="text-sm leading-relaxed text-parchment-dim">{entry.what}</dd>
        </div>
        <div>
          <dt className="rune mb-1" style={{ color }}>Why it matters</dt>
          <dd className="text-sm leading-relaxed text-parchment-dim">{entry.whyItMatters}</dd>
        </div>
        <div>
          <dt className="rune mb-1" style={{ color }}>How you&apos;ll use it</dt>
          <dd className="text-sm leading-relaxed text-parchment-dim">{entry.howYoullUseIt}</dd>
        </div>
        {entry.swAnalogy && (
          <div className="rounded-md border border-[var(--line)] bg-ink-950/50 p-3">
            <dt className="rune mb-1 text-brass">⌘ In software terms</dt>
            <dd className="text-sm italic leading-relaxed text-parchment-dim">{entry.swAnalogy}</dd>
          </div>
        )}
        {entry.learnFirst && (
          <div>
            <dt className="rune mb-2" style={{ color }}>Learn first</dt>
            <dd className="flex flex-wrap gap-1.5">
              {entry.learnFirst.map((item) => (
                <span key={item} className="rounded bg-ink-800 px-2 py-1 font-mono text-[0.7rem] text-parchment-dim">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}
