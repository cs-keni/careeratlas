import Link from "next/link";
import type { CareerPath } from "@/data/types";
import { nodeById } from "@/data/careerNodes";
import { pathColor } from "@/lib/pathColors";
import { formatSalary } from "@/components/ui/EstimateTag";
import { TierBadge } from "@/components/ui/TierBadge";
import { Reveal } from "@/components/ui/Reveal";

function ListBlock({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="card p-5">
      <p className="rune mb-3" style={{ color }}>{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-parchment-dim">
            <span className="mt-0.5 shrink-0 font-mono text-xs" style={{ color }}>▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PathDetail({ path }: { path: CareerPath }) {
  const color = pathColor(path.id);
  const ladder = path.ladder
    .map((id) => nodeById.get(id))
    .filter((n) => n !== undefined);

  return (
    <div className="space-y-12">
      {/* Role ladder */}
      <Reveal>
        <section>
          <p className="rune mb-5" style={{ color }}>◆ Role Ladder</p>
          <ol className="relative space-y-3 border-l pl-6" style={{ borderColor: color }}>
            {ladder.map((role, i) => (
              <li key={role.id} className="relative">
                <span
                  className="absolute -left-[1.85rem] top-4 h-2.5 w-2.5 rounded-full border-2"
                  style={{ borderColor: color, background: i === 0 ? color : "var(--ink-950)" }}
                />
                <div className="card flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="font-display text-parchment">{role.title}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">
                      {role.yearsExperience}
                      {role.salaryEstimate &&
                        ` · ${formatSalary(role.salaryEstimate.min, role.salaryEstimate.max)}`}{" "}
                      · est.
                    </p>
                  </div>
                  <TierBadge tier={role.tier} color={color} />
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-muted">
            Explore these nodes interactively on the{" "}
            <Link href="/tree" className="text-brass underline-offset-2 hover:underline">
              skill tree
            </Link>
            .
          </p>
        </section>
      </Reveal>

      {/* Grid of detail blocks */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Reveal><ListBlock title="⬦ Skills to Prioritize" items={path.skillsToPrioritize} color={color} /></Reveal>
        <Reveal delay={0.05}><ListBlock title="⬦ Certifications to Pursue" items={path.certifications} color={color} /></Reveal>
        <Reveal delay={0.1}><ListBlock title="⬦ Tools to Learn" items={path.tools} color={color} /></Reveal>
        <Reveal delay={0.15}><ListBlock title="⬦ Example Projects & Tasks" items={path.exampleProjects} color={color} /></Reveal>
      </section>

      {/* Pros / cons */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Reveal><ListBlock title="▲ Pros" items={path.pros} color="var(--path-cyber)" /></Reveal>
        <Reveal delay={0.05}><ListBlock title="▼ Cons" items={path.cons} color="var(--path-consulting)" /></Reveal>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal><ListBlock title="⬦ Who This Path Is Good For" items={path.goodFor} color={color} /></Reveal>
        <Reveal delay={0.05}><ListBlock title="⬦ How Your CS Background Helps" items={path.csAdvantages} color={color} /></Reveal>
        <Reveal delay={0.1}><ListBlock title="⬦ Risks & Tradeoffs" items={path.risks} color={color} /></Reveal>
      </section>
    </div>
  );
}
