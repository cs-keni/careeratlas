import Link from "next/link";
import { careerPaths } from "@/data/paths";
import { nodeById } from "@/data/careerNodes";
import { pathColor } from "@/lib/pathColors";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ── Hero ── */}
      <section className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div>
            <p className="rune mb-4 text-brass">
              ✦ Security Career Atlas · Field Guide No. 1
            </p>
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-parchment sm:text-6xl">
              You&apos;ve unlocked
              <br />
              your <span className="italic text-brass">base class</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment-dim">
              Every profession hides a skill tree. This atlas maps the one that
              begins at{" "}
              <strong className="text-parchment">Jr Physical Security Engineer</strong>{" "}
              — seven branches through technical mastery, consulting, project
              leadership, critical infrastructure, corporate security,
              integration, and the cyber-physical frontier.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tree"
                className="rune rounded-md bg-brass px-5 py-3 text-ink-950 transition-all duration-200 hover:bg-brass-bright hover:shadow-[0_0_24px_-4px_var(--brass)]"
              >
                Open the Skill Tree →
              </Link>
              <Link
                href="/first-90-days"
                className="rune rounded-md border border-[var(--line-strong)] px-5 py-3 text-parchment transition-colors duration-200 hover:bg-ink-800"
              >
                Start the First 90 Days
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Character sheet */}
        <Reveal delay={0.15}>
          <div className="corner-ticks card p-6">
            <p className="rune mb-4 flex items-center justify-between text-brass">
              Character Sheet <span className="font-mono">LV.1</span>
            </p>
            <dl className="space-y-3.5">
              {[
                ["Name", "Kenny Nguyen"],
                ["Guild", "Jacobs · Portland, OR"],
                ["Base Class", "Jr Physical Security Engineer"],
                ["Origin", "Computer Science · Software Engineering"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-2.5">
                  <dt className="rune shrink-0 text-muted">{k}</dt>
                  <dd className="text-right font-mono text-sm text-parchment">{v}</dd>
                </div>
              ))}
              <div>
                <dt className="rune mb-2 text-muted">Carried-Over Traits</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {["IT troubleshooting", "Automation", "Web dev", "Documentation", "Stakeholder comms"].map((t) => (
                    <span key={t} className="rounded bg-ink-800 px-2 py-1 font-mono text-[0.65rem] text-parchment-dim">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <dt className="rune text-muted">Domain XP</dt>
                  <dd className="font-mono text-xs text-brass">just getting started</dd>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-800">
                  <div className="h-full w-[6%] rounded-full bg-brass" />
                </div>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      {/* ── The seven paths ── */}
      <section className="py-12">
        <SectionHeading kicker="The Branches" title="Seven paths from one starting point">
          These aren&apos;t rigid ladders — they&apos;re directions. Real careers zig-zag,
          borrow, and multiclass between them. Click any path for the full field notes.
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careerPaths.map((path, i) => {
            const color = pathColor(path.id);
            const endgame = nodeById.get(path.ladder[path.ladder.length - 1]);
            return (
              <Reveal key={path.id} delay={0.05 * (i % 3)}>
                <Link
                  href={`/paths/${path.slug}`}
                  className="card group block h-full p-6"
                  style={{ borderTopColor: color, borderTopWidth: 2 }}
                >
                  <div className="rune flex items-center gap-2" style={{ color }}>
                    <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                    Path {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-parchment">{path.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-parchment-dim">{path.tagline}</p>
                  <div className="mt-5 border-t border-[var(--line)] pt-4">
                    <p className="rune text-muted">Endgame</p>
                    <p className="mt-1 font-mono text-sm text-parchment">
                      {endgame?.title ?? "—"}
                    </p>
                  </div>
                  <p className="rune mt-4 text-muted transition-colors duration-200 group-hover:text-brass">
                    Read the field notes{" "}
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </p>
                </Link>
              </Reveal>
            );
          })}

          {/* Multiclass card fills the 8th slot */}
          <Reveal delay={0.1}>
            <div className="card flex h-full flex-col justify-center border-dashed p-6 text-center">
              <p className="font-mono text-2xl text-brass">✦</p>
              <h3 className="mt-2 font-display text-2xl text-parchment">Multiclass</h3>
              <p className="mt-2 text-sm leading-relaxed text-parchment-dim">
                The strongest builds combine branches — a technical foundation
                with consulting charisma, or delivery discipline with a
                cyber-physical spec. Paths are palettes, not prisons.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How to use ── */}
      <section className="py-12">
        <SectionHeading kicker="How to Use This Atlas" title="Three ways in" />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Explore the tree",
              body: "Pan the full class tree, click nodes for stats — responsibilities, skills, salaries, unlock requirements, and quests.",
              href: "/tree",
              cta: "Skill Tree",
            },
            {
              n: "02",
              title: "Study the codex",
              body: "Bluebeam, Revit, Division 28, PoE, door hardware — every tool and domain, each with a software-engineering analogy.",
              href: "/codex",
              cta: "Tools & Skills Codex",
            },
            {
              n: "03",
              title: "Run the questline",
              body: "A concrete first-week-to-first-year roadmap with main and side quests, and progress that saves as you check things off.",
              href: "/first-90-days",
              cta: "First 90 Days",
            },
          ].map((step, i) => (
            <Reveal key={step.n} delay={0.06 * i}>
              <Link href={step.href} className="card group block h-full p-6">
                <p className="font-mono text-sm text-brass">{step.n}</p>
                <h3 className="mt-2 font-display text-xl text-parchment">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-parchment-dim">{step.body}</p>
                <p className="rune mt-4 text-muted group-hover:text-brass">{step.cta} →</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Coming from software ── */}
      <Reveal>
        <section className="my-12 rounded-xl border border-[var(--line-strong)] bg-gradient-to-br from-ink-900 to-ink-850 p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="rune mb-2 text-brass">◆ Respec, Not Restart</p>
              <h2 className="font-display text-2xl text-parchment sm:text-3xl">
                Coming from software? Your XP carries over.
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-parchment-dim">
                Physical security is becoming a networked, API-driven discipline —
                and it&apos;s short on people who can code. See how every software
                role and concept maps onto this field.
              </p>
            </div>
            <Link
              href="/compare"
              className="rune shrink-0 rounded-md border border-[var(--line-strong)] px-5 py-3 text-parchment transition-colors hover:bg-ink-800"
            >
              SWE ↔ PSE Map →
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
