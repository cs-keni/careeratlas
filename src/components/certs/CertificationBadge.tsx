import type { Certification } from "@/data/types";

const levelStyles: Record<Certification["level"], { label: string; color: string }> = {
  foundation: { label: "Foundation", color: "var(--path-cyber)" },
  professional: { label: "Professional", color: "var(--path-technical)" },
  expert: { label: "Expert", color: "var(--brass)" },
  adjacent: { label: "Adjacent", color: "var(--path-corporate)" },
  vendor: { label: "Vendor", color: "var(--path-integration)" },
};

function DifficultyPips({ level, color }: { level: number; color: string }) {
  return (
    <span className="flex items-center gap-1" title={`Difficulty ${level}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rotate-45"
          style={{ background: i < level ? color : "var(--ink-800)" }}
        />
      ))}
    </span>
  );
}

export function CertificationBadge({ cert }: { cert: Certification }) {
  const { label, color } = levelStyles[cert.level];

  return (
    <article className="card group flex flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        {/* The badge medallion */}
        <div
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          style={{ borderColor: color, color, boxShadow: `0 0 20px -6px ${color}` }}
          aria-hidden
        >
          {cert.badge}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rune rounded-full border px-2.5 py-1" style={{ borderColor: color, color }}>
            {label}
          </span>
          <DifficultyPips level={cert.difficulty} color={color} />
        </div>
      </div>

      <h3 className="mt-4 font-display text-xl text-parchment">{cert.name}</h3>
      <p className="text-sm text-parchment-dim">{cert.fullName}</p>
      <p className="rune mt-1 text-muted">{cert.issuer}</p>

      <p className="mt-4 text-sm leading-relaxed text-parchment-dim">{cert.whyItMatters}</p>

      <div className="mt-4 rounded-md border border-[var(--line)] bg-ink-950/50 p-4">
        <p className="rune mb-2 text-brass">Unlock Requirements</p>
        <ul className="space-y-1.5">
          {cert.requirements.map((req) => (
            <li key={req} className="flex gap-2 text-xs leading-relaxed text-parchment-dim">
              <span className="mt-0.5 shrink-0 text-brass">⬦</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="rune mb-1 text-muted">When to pursue</p>
        <p className="text-sm text-parchment-dim">{cert.whenToPursue}</p>
      </div>

      {cert.domains && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {cert.domains.map((d) => (
            <span key={d} className="rounded bg-ink-800 px-2 py-1 font-mono text-[0.65rem] text-parchment-dim">
              {d}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4">
        {cert.sources && (
          <p className="text-xs text-muted">
            Sources:{" "}
            {cert.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && " · "}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass underline-offset-2 hover:underline"
                >
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        )}
        {!cert.requirementsVerified && (
          <p className="rune mt-2 text-muted">⚠ verify current requirements at the source</p>
        )}
      </div>
    </article>
  );
}
